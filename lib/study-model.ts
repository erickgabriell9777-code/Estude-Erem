import { getMistakes, type Mistake } from "./study-notebook";
import type { Appearance } from "./study-preferences";
import { z } from "zod";
import { subjects, topics } from "./study-data";
import { questions, createQuestionList, defaultSettings, type Settings } from "./question-bank";

import type { Catalogue } from "./catalogue-types";
function schemas(catalogue: Pick<Catalogue, "subjects" | "topics" | "questions">) {
const { subjects, topics, questions } = catalogue;
const subjectIds = new Set<string>(subjects.map(s => s.id));
const topicIds = new Set(topics.map(t => t.id));
const settingsSchema = z.object({
  subjects: z.array(z.string().refine(id => subjectIds.has(id))).min(1).max(subjects.length),
  topics: z.array(z.string().refine(id => topicIds.has(id))).min(1).max(topics.length),
  difficulty: z.enum(["all", "Fácil", "Médio", "Difícil"]),
  order: z.enum(["ordered", "random"]),
  mode: z.enum(["unseen", "review"]).optional(),
  count: z.number().int().min(1).max(questions.length),
}).strict().refine(s => new Set(s.subjects).size === s.subjects.length && new Set(s.topics).size === s.topics.length && s.topics.every(id => s.subjects.includes(topics.find(t => t.id === id)!.subject)), "Escolha assuntos das matérias selecionadas.");
const actionSchema = z.discriminatedUnion("type", [
  z.object({type:z.literal("save_question"),questionId:z.string().max(100),favorite:z.boolean().optional(),note:z.string().max(2000).optional()}).strict(),
  z.object({type:z.literal("practice_books"),questionIds:z.array(z.string().max(100)).min(1).max(50)}).strict(),
  z.object({type:z.literal("practice_saved"),questionIds:z.array(z.string().max(100)).min(1).max(50)}).strict(),
  z.object({type:z.literal("review_errors"),questionIds:z.array(z.string().max(100)).min(1).max(50)}).strict(),
  z.object({type:z.literal("hint"),sessionId:z.string().uuid(),questionId:z.string().max(100),reveal:z.union([z.literal(1),z.literal(2)])}).strict(),
  z.object({ type: z.literal("appearance"), appearance: z.object({mode:z.enum(["light","dark","black"]),accent:z.enum(["blue","green","purple","orange"]),largeText:z.boolean(),reducedMotion:z.boolean()}).strict() }).strict(),
  z.object({ type: z.literal("profile"), name: z.string().trim().min(1).max(40) }).strict(),
  z.object({ type: z.literal("start"), settings: settingsSchema }).strict(),
  z.object({ type: z.literal("answer"), sessionId: z.string().uuid(), questionId: z.string().max(100), answer: z.number().int().min(0).max(3) }).strict(),
  z.object({type:z.literal("draft_selection"),subjects:z.array(z.string().refine(id=>subjectIds.has(id))).max(subjects.length),topics:z.array(z.string().refine(id=>topicIds.has(id))).max(topics.length)}).strict().refine(s=>new Set(s.subjects).size===s.subjects.length&&new Set(s.topics).size===s.topics.length&&s.topics.every(id=>s.subjects.includes(topics.find(t=>t.id===id)!.subject)),"Seleção de matérias inválida."),
  z.object({ type: z.literal("discard") }).strict(),
]);
return actionSchema;
}
export const actionSchema = schemas({subjects: [...subjects], topics, questions});
export type Action = z.infer<typeof actionSchema>;
export type Session = { id: string; questions: string[]; answers: Record<string, number>; startedAt: string; completedAt: string | null; settings: Settings; hints?: Record<string,number>; kind?: "errors" | "saved" };
export type StudyState = {
  savedQuestions?: Record<string,{favorite:boolean;note:string;updatedAt:string}>;
  mistakes?: Record<string,Mistake>;
  appearance?: Appearance;
  seenCounts?: Record<string, number>;
  name: string;
  lastSettings: Settings;
  session: Session | null;
  stats: { answered: number; correct: number; sessions: number };
  history: { id: string; date: string; total: number; correct: number; subjects: string[] }[];
};
export {initialState} from "./initial-study-state";
import {initialState} from "./initial-study-state";
export function reduceStudy(input: StudyState, raw: unknown, now = new Date(), catalogue: Pick<Catalogue, "subjects" | "topics" | "questions"> = {subjects: [...subjects],topics,questions}): StudyState {
  const questions = catalogue.questions;
  const action = schemas(catalogue).parse(raw);
  const s = structuredClone(input);
  s.mistakes = getMistakes(s, questions);
  if (!s.seenCounts) {
    s.seenCounts = {};
    // Preserve known answers from the previous version's current/last session.
    for (const id of Object.keys(s.session?.answers ?? {})) s.seenCounts[id] = 1;
  }
  if(action.type === "save_question") {
    if(!questions.some(q=>q.id===action.questionId)) throw new Error("Esta questão não está disponível.");
    const saved=s.savedQuestions??{};
    const existing=saved[action.questionId]??{favorite:false,note:"",updatedAt:now.toISOString()};
    const item={favorite:action.favorite??existing.favorite,note:action.note===undefined?existing.note:action.note.trim(),updatedAt:now.toISOString()};
    const noteSize=Object.entries(saved).reduce((sum,[id,value])=>sum+(id===action.questionId?0:value.note.length),0)+item.note.length;
    if(noteSize>100000) throw new Error("Suas anotações atingiram 100 mil caracteres. Reduza uma anotação para salvar mais conteúdo.");
    if(!item.favorite&&!item.note) delete saved[action.questionId]; else saved[action.questionId]=item;
    s.savedQuestions=saved;return s;
  }
  if(action.type === "practice_saved" || action.type === "practice_books") {
    if(s.session&&!s.session.completedAt) throw new Error("Continue ou encerre a sessão atual antes de praticar as questões salvas.");
    const ids=action.questionIds;
    if(new Set(ids).size!==ids.length||ids.some(id=>!(action.type === "practice_books" ? questions.some(q=>q.id===id&&q.bookHint) : s.savedQuestions?.[id])||!questions.some(q=>q.id===id))) throw new Error("Escolha questões da sua coleção.");
    const selected=ids.map(id=>questions.find(q=>q.id===id)!);
    const settings:Settings={subjects:[...new Set(selected.map(q=>q.subject))],topics:[...new Set(selected.map(q=>q.topic))],difficulty:"all",order:"ordered",count:ids.length,mode:"review"};
    s.session={id:crypto.randomUUID(),questions:ids,answers:{},startedAt:now.toISOString(),completedAt:null,settings,kind:"saved"};return s;
  }
  if(action.type === "appearance") { s.appearance = action.appearance; return s; }
  if(action.type === "profile") { s.name = action.name; return s; }
  if(action.type === "draft_selection") { s.lastSettings.subjects = action.subjects; s.lastSettings.topics = action.topics; return s; }
  if(action.type === "discard") { s.session = null; return s; }
  if(action.type === "review_errors") {
    if(s.session && !s.session.completedAt) throw new Error("Continue ou encerre a sessão atual antes de revisar os erros.");
    const ids=action.questionIds;
    if(new Set(ids).size!==ids.length || ids.some(id=>!questions.some(q=>q.id===id)||!s.mistakes![id]||s.mistakes![id].resolvedAt)) throw new Error("Escolha somente questões pendentes do seu caderno de erros.");
    const selected=ids.map(id=>questions.find(q=>q.id===id)!);
    const settings: Settings = {subjects:[...new Set(selected.map(q=>q.subject))],topics:[...new Set(selected.map(q=>q.topic))],difficulty:"all",order:"ordered",count:ids.length,mode:"review"};
    s.session={id:crypto.randomUUID(),questions:ids,answers:{},startedAt:now.toISOString(),completedAt:null,settings,kind:"errors"};
    return s;
  }
  if(action.type === "start") {
    if(s.session && !s.session.completedAt) throw new Error("Você tem uma sessão em andamento. Continue ou encerre antes de iniciar outra.");
    s.lastSettings = action.settings;
    s.session = { id: crypto.randomUUID(), questions: createQuestionList(action.settings, Math.random, s.seenCounts, questions), answers: {}, settings: action.settings, startedAt: now.toISOString(), completedAt: null };
    return s;
  }
  const session = s.session;
  if(!session || session.id !== action.sessionId) throw new Error("Esta sessão não está mais ativa. Atualize a página.");
  if(action.type === "hint") {
    const next=session.questions.find(id=>!Object.hasOwn(session.answers,id));
    if(session.completedAt || next!==action.questionId) throw new Error("As dicas estão disponíveis para a pergunta atual antes de confirmar a resposta.");
    const current=session.hints?.[next]??0;
    if(action.reveal>current+1) throw new Error("Leia a primeira pista antes de abrir a próxima.");
    session.hints={...session.hints,[next]:Math.max(current,action.reveal)};
    return s;
  }
  if(Object.hasOwn(session.answers, action.questionId)) {
    if(session.answers[action.questionId] !== action.answer) throw new Error("Esta resposta já foi registrada.");
    return s;
  }
  const next = session.questions.find(id => !Object.hasOwn(session.answers, id));
  if(session.completedAt || next !== action.questionId) throw new Error("Responda à pergunta atual antes de continuar.");
  const q = questions.find(q => q.id === next);
  if(!q || action.answer >= q.options.length) throw new Error("Escolha uma das alternativas disponíveis.");
  if(action.answer !== q.answer) {
    s.mistakes[next]={wrongCount:(s.mistakes[next]?.wrongCount??0)+1,lastWrongAnswer:action.answer,lastWrongAt:now.toISOString(),resolvedAt:null};
  } else if(s.mistakes[next]) s.mistakes[next].resolvedAt=now.toISOString();
  session.answers[next] = action.answer;
  s.seenCounts[next] = (s.seenCounts[next] ?? 0) + 1;
  s.stats.answered++;
  if(action.answer === q.answer) s.stats.correct++;
  if(session.questions.every(id => Object.hasOwn(session.answers, id))) {
    session.completedAt = now.toISOString();
    s.stats.sessions++;
    const correct = session.questions.filter(id => questions.find(q => q.id === id)!.answer === session.answers[id]).length;
    s.history.unshift({ id: session.id, date: session.completedAt, total: session.questions.length, correct, subjects: session.settings.subjects });
    s.history = s.history.slice(0, 50);
  }
  return s;
}
