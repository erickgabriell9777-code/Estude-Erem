import type {StudyState} from "./study-model";
import {defaultSettings} from "./question-selection";
export function initialState(): StudyState { return { name: "Estudante", lastSettings: { ...defaultSettings }, session: null, stats: { answered: 0, correct: 0, sessions: 0 }, history: [] }; }
