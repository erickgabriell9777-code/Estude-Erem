"use client";
import {useState} from 'react';
import {Check,LoaderCircle} from 'lucide-react';
import {QuestionMaterial} from './question-material';
import type {Question} from '@/lib/study-data';

export function NotebookQuestionReference({question,confirmedAnswer,canAnswer=false,onAnswer}:{question:Question;confirmedAnswer?:number;canAnswer?:boolean;onAnswer?:(questionId:string,answer:number)=>Promise<boolean>}) {
 const [selection,setSelection]=useState<number|null>(null);
 const [submitting,setSubmitting]=useState(false);
 const answered=typeof confirmedAnswer==='number'&&Number.isInteger(confirmedAnswer)&&confirmedAnswer>=0&&confirmedAnswer<question.options.length;
 async function selectAnswer(index:number){
  if(!canAnswer||!onAnswer||submitting||answered)return;
  setSelection(index);
  setSubmitting(true);
  try{await onAnswer(question.id,index);}
  finally{setSubmitting(false);}
 }
 return <aside className="notebook-question" aria-label="Questão e alternativas">
  <small>QUESTÃO VINCULADA</small>
  <h2>Alternativas</h2>
  <ol className="notebook-answer-options" aria-label="Alternativas da questão">
   {question.options.map((option,index)=><li key={index} className={answered?(index===question.answer?'correct':index===confirmedAnswer?'incorrect':''):selection===index?'selected':''}>
    <button type="button" className="notebook-answer-choice" disabled={answered||!canAnswer||submitting} aria-pressed={selection===index||confirmedAnswer===index} onClick={()=>void selectAnswer(index)}>
     <span className="notebook-answer-letter">{String.fromCharCode(65+index)}</span><span>{option}</span>
     {submitting&&selection===index?<LoaderCircle size={16} className="animate-spin"/>:answered&&index===confirmedAnswer?<Check size={16}/>:null}
    </button>
    {answered&&index===confirmedAnswer&&<small>Sua resposta</small>}
    {answered&&index===question.answer&&<small>Correta</small>}
   </li>)}
  </ol>
  <details className="notebook-question-prompt"><summary>Ver enunciado</summary><p>{question.prompt}</p><QuestionMaterial id={question.id} reference={false}/></details>
  {answered&&<details className="notebook-answer-feedback"><summary>Ver resolução</summary><p>{question.explanation}</p></details>}
  <p className="notebook-question-note">{answered?'Resposta registrada.':canAnswer?'Toque em uma alternativa para responder e avançar automaticamente.':'Para responder, abra o caderno pelo rascunho durante uma sessão ativa.'}</p>
 </aside>;
}
