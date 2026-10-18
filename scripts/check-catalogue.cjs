// Compile lib/study-model.ts and lib/coverage-sources.ts to .sites-runtime/books-check (CommonJS, strict) first.
const {DatabaseSync}=require('node:sqlite');const fs=require('node:fs');const assert=require('node:assert/strict');
const root='../.sites-runtime/books-check/';const {questions}=require(root+'question-bank.js');const {subjects,topics}=require(root+'study-data.js');
const sources=[...require(root+'researched-content.js').sources,...require(root+'calculus-content.js').calculusSources,...require(root+'content-notebook-expansion.js').notebookSources,...require(root+'engineering-content.js').engineeringSources,...require(root+'reading-sources.js').readingSources,...require(root+'coverage-sources.js').coverageSources,...require(root+'portuguese-sources.js').portugueseSources];
const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');db.exec(fs.readFileSync('drizzle/0001_lowly_firestar.sql','utf8'));
function insert(table,columns,keys,rows){for(let i=0;i<rows.length;i+=40){const expr=keys.map(k=>`json_extract(value, '$.${k}')`);db.prepare(`INSERT INTO ${table} (${columns.join(',')}) SELECT ${expr.join(',')} FROM json_each(?) WHERE 1 ON CONFLICT(id) DO NOTHING`).run(JSON.stringify(rows.slice(i,i+40)));}}
for(let attempt=0;attempt<2;attempt++){
 db.exec('BEGIN');
 insert('catalogue_subjects',['id','name','short','color','group_name','position'],['id','name','short','color','group','position'],subjects.map((s,position)=>({...s,position})));
 insert('catalogue_topics',['id','subject_id','name','summary','position'],['id','subject','name','summary','position'],topics.map((t,position)=>({...t,position})));
 insert('catalogue_sources',['id','title','publisher','url','accessed_at'],['id','title','publisher','url','accessedAt'],sources);
 insert('catalogue_questions',['id','topic_id','level','prompt','options','answer','explanation','source_id','position'],['id','topic','level','prompt','options','answer','explanation','sourceId','position'],questions.map((q,position)=>({...q,options:JSON.stringify(q.options),position})));
 db.exec('COMMIT');assert.equal(db.prepare('SELECT count(*) AS n FROM catalogue_questions').get().n,6780);
}
assert.equal(new Set(questions.map(q=>q.prompt)).size,questions.length);console.log('Catalogue bootstrap: 6780 unique prompts, foreign keys and repeat insertion passed.');

const {curriculumTopics,curriculumQuestions}=require(root+"curriculum-expansion.js");assert.equal(curriculumTopics.length,24);assert.equal(curriculumQuestions.length,256);assert.equal(topics.length,312);assert.equal(new Set(curriculumQuestions.map(q=>q.subject)).size,21);for(const q of curriculumQuestions){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.answer]);assert.ok(q.explanation);assert.equal(topics.find(t=>t.id===q.topic).subject,q.subject);}
for(let k=1;k<=20;k++){const expected=[5*k+7,(k+2)*(k+4)-6,10*(k+1),2*k+7,2*(k+4),k+2,2*(k+1),27*(k+2)];expected.forEach((answer,i)=>{const q=curriculumQuestions[96+(k-1)*8+i];assert.equal(Number(q.options[q.answer]),answer);});}console.log("Expansion: 24 topics, all 21 subjects, 256 valid questions, 160 numerical answers verified.");

const engineering=require(root+'engineering-content.js');assert.equal(engineering.engineeringQuestions.length,260);assert.equal(engineering.engineeringTopics.length,20);assert.equal(subjects.length,23);for(const q of engineering.engineeringQuestions){assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.answer]);assert.equal(topics.find(t=>t.id===q.topic).subject,q.subject);}for(const t of engineering.engineeringTopics){const pool=engineering.engineeringQuestions.filter(q=>q.topic===t.id);assert.equal(pool.length,13);assert.equal(new Set(pool.map(q=>q.level)).size,3);}console.log('Engineering: 20 topics, 260 questions, 13 per topic, all difficulties verified.');

const more=require(root+'engineering-more.js');assert.equal(more.moreEngineeringTopics.length,10);assert.equal(more.moreEngineeringQuestions.length,160);for(const t of more.moreEngineeringTopics){const qs=more.moreEngineeringQuestions.filter(q=>q.topic===t.id);assert.equal(qs.length,16);assert.equal(new Set(qs.map(q=>q.level)).size,3);for(const q of qs){assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.answer]);assert.equal(t.subject,q.subject);}}console.log('Further expansion: 10 topics, 160 valid questions.');

const cases=require(root+'long-case-questions.js').longCaseQuestions;assert.equal(cases.length,60);for(const q of cases){assert.ok(q.prompt.length>500);assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.answer]);assert.ok(q.explanation.includes('4.'));assert.equal(topics.find(t=>t.id===q.topic).subject,q.subject);}console.log('60 long cases: length, alternatives, topic links and four-step explanations verified.');

const batch=require(root+'reading-batch.js').readingBatchQuestions;
assert.equal(batch.length,24);assert.equal(new Set(batch.map(q=>q.prompt)).size,24);
for(const q of batch){assert.ok(q.prompt.length>300);assert.equal(new Set(q.options).size,4);assert.ok(q.explanation.includes('4.'));assert.equal(topics.find(t=>t.id===q.topic).subject,q.subject);assert.ok(sources.some(s=>s.id===q.sourceId));}
const keys=['Sim; restam R$ 100.','O saldo final seria R$ 250, mas faltam R$ 150 na segunda-feira.','R$ 250 por mês; despesa prevista.','Faltam seis meses, pois ainda precisam juntar R$ 1.800.','Duas embalagens de 1 kg; economia de R$ 1,20.','O parcelamento custa R$ 160 a mais que o pagamento à vista.','R$ 170.','R$ 480; os dois percentuais incidem sobre bases diferentes.','3 km e 45 minutos.','1:50.000; a escala gráfica continua proporcionalmente válida.','24 hectares.','No mapa A; 5 cm em A e 0,2 cm em B.'];
keys.forEach((key,i)=>assert.equal(batch[i].options[batch[i].answer],key));
console.log('Reading batch: 24 contextual questions, 4-step explanations, source links and numeric keys passed.');

const batch2=require(root+'reading-batch2.js').readingBatch2Questions;
assert.equal(batch2.length,24);
for(const q of batch2){assert.ok(q.prompt.length>500);assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.answer]);assert.ok(q.explanation.includes('4.'));assert.equal(topics.find(t=>t.id===q.topic).subject,q.subject);assert.ok(sources.some(s=>s.id===q.sourceId));}
console.log('Batch 2: 24 unique long cases, topic/source integrity and four-step resolutions passed.');

const coverage=require(root+'coverage-batch.js').coverageBatchQuestions;
assert.equal(coverage.length,155);
for(const q of coverage){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.prompt.includes('\n\n'));assert.ok(q.explanation.includes('4.'));assert.equal(topics.find(t=>t.id===q.topic).subject,q.subject);assert.ok(sources.find(s=>s.id===q.sourceId));}
for(const [id,total] of [['fisica',713],['quimica',553],['portugues',310]])assert.equal(questions.filter(q=>q.subject===id).length,total);
console.log('Coverage batch: 155 valid original questions, including 60 passage questions; Physics has 713 and Chemistry has 553 questions.');
const portuguese=require(root+'portuguese-depth.js').portugueseDepthQuestions;
assert.equal(portuguese.length,182);
for(const q of portuguese){assert.equal(q.subject,'portugues');assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.answer]);assert.ok(q.prompt.includes('\n\n'));assert.ok(q.explanation.includes('4.'));assert.ok(sources.some(s=>s.id===q.sourceId));}
for(const id of ['topic-54','topic-55','topic-117','topic-118','topic-159','topic-160','topic-201'])assert.equal(portuguese.filter(q=>q.topic===id).length,26);
console.log('Portuguese depth: 182 original questions, seven topics, reference links and four-step explanations passed.');
