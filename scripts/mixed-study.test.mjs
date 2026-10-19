import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createQuestionList} from '../lib/question-selection.ts';
import {inkSchema,notebookSchema,newSheet} from '../lib/drawing-notebooks.ts';
import {recognizeShape} from '../lib/drawing-shapes.ts';

const bank=[...Array.from({length:8},(_,i)=>({id:`p${i}`,subject:'portugues',topic:'topic-01',level:'Fácil'})),...Array.from({length:3},(_,i)=>({id:`m${i}`,subject:'matematica',topic:'topic-02',level:'Fácil'}))];
const settings={subjects:['portugues','matematica'],topics:['topic-01','topic-02'],difficulty:'all',order:'ordered',count:4,mode:'unseen'};
test('short sessions include both selected subjects and redistribute exhausted groups',()=>{
 for(const order of ['ordered','random']){
  const ids=createQuestionList({...settings,order},()=>.4,{},bank);
  assert.equal(ids.length,4);
  assert.equal(ids.filter(id=>id.startsWith('p')).length,2);
  assert.equal(ids.filter(id=>id.startsWith('m')).length,2);
 }
 const all=createQuestionList({...settings,count:11},()=>.4,{},bank);
 assert.equal(new Set(all).size,11);
 assert.deepEqual(createQuestionList({...settings,count:2},()=>.4,{},bank),['p0','m0']);
});
test('mixed sessions honor topic filters, unseen/review mode and practice counts',()=>{
 assert.deepEqual(createQuestionList({...settings,subjects:['matematica'],topics:['topic-02'],count:2},()=>.4,{m0:1},bank),['m1','m2']);
 assert.deepEqual(createQuestionList({...settings,mode:'review',count:2},()=>.4,{p0:5,p1:1,m0:2},bank),['p1','m0']);
 assert.throws(()=>createQuestionList({...settings,count:12},()=>.4,{},bank));
});
test('expanded notebook accepts new lower strokes while preserving old coordinates',()=>{
 const old={color:'#93c5fd',width:3,opacity:1,points:[[12,20],[40,700]]};
 const lower={...old,points:[[40,1750],[1000,2000]]};
 const note={id:crypto.randomUUID(),revision:0,title:'Caderno',subject:'matematica',questionId:null,pages:[{...newSheet(),strokes:[old,lower]}]};
 assert.deepEqual(notebookSchema.parse(note).pages[0].strokes,[old,lower]);
 for(const points of [[[0,2001]],[[1001,0]],[[-1,0]],[[0,NaN]]]) assert.equal(inkSchema.safeParse({...old,points}).success,false);
 const contour=[[100,1000],[200,1000],[300,1000],[300,1100],[300,1200],[200,1200],[100,1200],[100,1100],[100,1000]];
 const shape=recognizeShape(contour,{width:1000,height:2000});
 assert.ok(shape);
 assert.ok(shape.points.every(([,y])=>y>=1000));
});
