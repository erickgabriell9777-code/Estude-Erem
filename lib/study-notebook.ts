import type { StudyState } from "./study-model";
import type { Question } from "./study-data";
export type Mistake = {wrongCount:number;lastWrongAnswer:number;lastWrongAt:string;resolvedAt:string|null};
export function getMistakes(state: StudyState, bank: Question[]): Record<string,Mistake> {
 if(state.mistakes) return state.mistakes;
 // Older history stores totals only. Recover only answers that actually remain.
 const result: Record<string,Mistake> = {};
 if(state.session) for(const [id,answer] of Object.entries(state.session.answers)) {
  const q=bank.find(q=>q.id===id);
  if(q&&answer!==q.answer) result[id]={wrongCount:1,lastWrongAnswer:answer,lastWrongAt:state.session.completedAt??state.session.startedAt,resolvedAt:null};
 }
 return result;
}
