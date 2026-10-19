import {QuestionMaterial} from './question-material';
import type {Question} from '@/lib/study-data';

export function NotebookQuestionReference({question,confirmedAnswer}:{question:Question;confirmedAnswer?:number}) {
 const answered=typeof confirmedAnswer==='number'&&Number.isInteger(confirmedAnswer)&&confirmedAnswer>=0&&confirmedAnswer<question.options.length;
 return <aside className="notebook-question" aria-label="Questão e alternativas">
  <small>QUESTÃO VINCULADA</small>
  <h2>Alternativas</h2>
  <ol className="notebook-answer-options" aria-label="Alternativas da questão">
   {question.options.map((option,index)=><li key={index} className={answered?(index===question.answer?'correct':index===confirmedAnswer?'incorrect':''):''}>
    <span className="notebook-answer-letter">{String.fromCharCode(65+index)}</span><span>{option}</span>
    {answered&&index===confirmedAnswer&&<small>Sua resposta</small>}
    {answered&&index===question.answer&&<small>Correta</small>}
   </li>)}
  </ol>
  <details className="notebook-question-prompt"><summary>Ver enunciado</summary><p>{question.prompt}</p><QuestionMaterial id={question.id} reference={false}/></details>
  {answered&&<details className="notebook-answer-feedback"><summary>Ver resolução</summary><p>{question.explanation}</p></details>}
  <p className="notebook-question-note">{answered?'Resposta já registrada.':'Feche o caderno para marcar sua resposta.'}</p>
 </aside>;
}
