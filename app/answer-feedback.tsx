import type {Question} from '@/lib/study-data';
import {conceptReviews} from '@/lib/concept-review';
export function AnswerFeedback({question,selected}:{question:Question;selected:number}){
 const review=conceptReviews[question.id];
 const steps=review?.steps??question.explanation.split(/(?:^|\n|\s)(?=\d+\.\s)/).map(s=>s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
 return <><div className="answer-comparison"><p><strong>Sua resposta:</strong> {question.options[selected]??'Não respondida'}</p>{selected!==question.answer&&<p><strong>Resposta correta:</strong> {question.options[question.answer]}</p>}{review&&<p>{review.reasons[selected]}</p>}</div>{steps.length>1?<ol className="correction-steps">{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>:<p>{question.explanation}</p>}{review&&<details className="question-hints"><summary>Entender todas as alternativas</summary>{question.options.map((o,i)=><p key={i}><strong>{String.fromCharCode(65+i)}. {o}</strong><br/>{review.reasons[i]}</p>)}</details>}</>;
}
