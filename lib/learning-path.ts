import type { Catalogue } from "./catalogue-types";
import type { StudyState } from "./study-model";
import { getMistakes } from "./study-notebook";
const sequence:Record<string,number[]>={
 portugues:[54,0,117,118,55,1,2],matematica:[56,4,3,5,57,119,120],redacao:[121,6,7,8,58,59,122],literatura:[60,10,61,11,9,123,124],historia:[13,14,125,63,62,12,126],geografia:[16,15,17,64,127,128,65],biologia:[18,94,130,129,20,19,66,67],fisica:[21,22,23,69,132,131,68],quimica:[25,24,71,70,26,133,134],filosofia:[28,72,73,29,27,135,136],sociologia:[30,31,74,137,75,138,32],ingles:[33,76,34,139,35,140,93,77],espanhol:[36,37,78,141,79,38,142],informatica:[39,80,81,40,144,143,41],programacao:[42,43,44,145,82,83,146],logica:[47,46,45,85,147,84,148],financeira:[149,48,150,49,86,87,50],gerais:[52,89,152,88,53,51,151],estatistica:[90,91,92,154,153],calculo1:[95,96,97,98,99,155,100,101,102,103,104,105,106,107,156,108,109,110],calculo2:[111,112,157,113,114,115,158,116],
};
export const preparation:Record<string,{text:string;topics:string[]}>={
 calculo1:{text:"Antes de começar: revise frações, equações e potências se essa base ainda estiver difícil.",topics:["topic-56","topic-4","topic-120"]},
 calculo2:{text:"Antes de começar: revise regras de derivação, primitivas e integração por substituição de Cálculo I.",topics:["topic-102","topic-108","topic-110"]},
 estatistica:{text:"Frações e porcentagens ajudam a interpretar proporções e probabilidades.",topics:["topic-56","topic-3"]},
};
export function learningPath(subject:string,catalogue:Catalogue,state:StudyState) {
 const order=(sequence[subject]??[]).map(id=>`topic-${id}`),mistakes=getMistakes(state,catalogue.questions);
 const seen=state.seenCounts??Object.fromEntries(Object.keys(state.session?.answers??{}).map(id=>[id,1]));
 return catalogue.topics.filter(t=>t.subject===subject).sort((a,b)=>{
 const ai=order.indexOf(a.id),bi=order.indexOf(b.id);return (ai<0?999:ai)-(bi<0?999:bi);
 }).map(topic=>{
 const qs=catalogue.questions.filter(q=>q.topic===topic.id),done=qs.filter(q=>(seen[q.id]??0)>0).length;
 const pending=qs.filter(q=>mistakes[q.id]&&!mistakes[q.id].resolvedAt).length;
 const target=Math.min(3,qs.length);
 return {...topic,name:topic.name.replace(/^\d+\s*·\s*/,""),done,total:qs.length,pending,target,practiced:target>0&&done>=target&&pending===0};
 });
}
