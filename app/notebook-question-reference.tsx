"use client";
import {useState} from 'react';
import {Check} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {QuestionMaterial} from './question-material';
import type {Question} from '@/lib/study-data';

export function NotebookQuestionReference({question,confirmedAnswer,canAnswer=false,onAnswer}:{question:Question;confirmedAnswer?:number;canAnswer?:boolean;onAnswer?:(questionId:string,answer:number)=>Promise<boolean>}) {
 const [selection,setSelection]=useState<number|null>(null);
 const [submitting,setSubmitting]=useState(false);
 const answered=typeof confirmedAnswer==='number'&&Number.isInteger(confirmedAnswer)&&confirmedAnswer>=0&&confirmedAnswer<question.options.length;
 async function confirmAnswer(){
  if(selection===null||!canAnswer||!onAnswer||submitting)return;
  setSubmitting(true);
  try{const accepted=await onAnswer(question.id,selection);if(accepted)setSelection(null);}
  finally{setSubmitting(false);}
 }
 return <aside className="notebook-question" aria-label="Questão e alternativas">
  <small>QUESTÃO VINCULADA</small>
  <h2>Alternativas</h2>
  <ol className="notebook-answer-options" aria-label="Alternativas da questão">
   {question.options.map((option,index)=><li key={index} className={answered?(index===question.answer?'correct':index===confirmedAnswer?'incorrect':''):selection===index?'selected':''}>
    <button type="button" className="notebook-answer-choice" disabled={answered||!canAnswer||submitting} aria-pressed={selection===index} onClick={()=>setSelection(index)}>
     <span className="notebook-answer-letter">{String.fromCharCode(65+index)}</span><span>{option}</span>
     {selection===index&&!answered&&<Check size={16}/>}
    </button>
    {answered&&index===confirmedAnswer&&<small>Sua resposta</small>}
    {answered&&index===question.answer&&<small>Correta</small>}
   </li>)}
  </ol>
  {canAnswer&&!answered&&<Button className="notebook-answer-confirm" disabled={selection===null||submitting} onClick={()=>void confirmAnswer()}>{submitting?'Confirmando…':'Confirmar resposta'}</Button>}
  <details className="notebook-question-prompt"><summary>Ver enunciado</summary><p>{question.prompt}</p><QuestionMaterial id={question.id} reference={false}/></details>
  {answered&&<details className="notebook-answer-feedback"><summary>Ver resolução</summary><p>{question.explanation}</p></details>}
  <p className="notebook-question-note">{answered?'Resposta já registrada.':canAnswer?'Selecione uma alternativa e confirme sem fechar o caderno.':'Para responder, abra o caderno pelo rascunho durante uma sessão ativa.'}</p>
 </aside>;
}
