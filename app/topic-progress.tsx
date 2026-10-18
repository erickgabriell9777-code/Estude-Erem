'use client';
import {useMemo,useState} from 'react';
import type {Catalogue} from '@/lib/catalogue-types';
import type {StudyState} from '@/lib/study-model';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {getMistakes} from '@/lib/study-notebook';
export function TopicProgress({catalogue,state,practice}:{catalogue:Catalogue;state:StudyState;practice:(id:string)=>void}){
 const [all,setAll]=useState(false);
 const rows=useMemo(()=>{const mistakes=getMistakes(state,catalogue.questions);const counts=new Map<string,{seen:number;total:number;pending:number}>();for(const q of catalogue.questions){const c=counts.get(q.topic)??{seen:0,total:0,pending:0};c.total++;if(state.seenCounts?.[q.id])c.seen++;if(mistakes[q.id]&&!mistakes[q.id].resolvedAt)c.pending++;counts.set(q.topic,c);}return catalogue.topics.flatMap(t=>{const c=counts.get(t.id);return c&&(c.seen||c.pending)?[{...t,...c}]:[]}).sort((a,b)=>b.pending-a.pending||b.seen-a.seen);},[catalogue,state]);
 return <section className="dashboard-card"><h2>Seu progresso por assunto</h2><p className="muted-text">Questões diferentes respondidas, sem confundir cobertura com domínio. Os assuntos com erros pendentes aparecem primeiro.</p>{!rows.length?<p>Responda suas primeiras questões para acompanhar os assuntos aqui.</p>:<><div className="topic-progress-list">{rows.slice(0,all?rows.length:6).map(t=><article className="topic-progress-row" key={t.id}><header><strong>{t.name}</strong><span>{Math.round(t.seen/t.total*100)}%</span></header><p>{t.seen} de {t.total} questões diferentes · {t.pending} erros pendentes</p><Progress value={t.seen/t.total*100} aria-label={`Cobertura de ${t.name}`}/><Button variant="outline" onClick={()=>practice(t.id)}>Praticar este assunto</Button></article>)}</div>{rows.length>6&&<Button variant="ghost" onClick={()=>setAll(v=>!v)}>{all?'Mostrar menos':'Ver todos os assuntos praticados'}</Button>}</>}</section>;
}
