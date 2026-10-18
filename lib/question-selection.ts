import type {Question} from "./study-data";
export type Settings = { subjects: string[]; topics: string[]; difficulty: "all" | "Fácil" | "Médio" | "Difícil"; order: "ordered" | "random"; count: number; mode?: "unseen" | "review" };
export const defaultSettings: Settings = { subjects: [], topics: [], difficulty: "all", order: "ordered", count: 10, mode: "unseen" };
export function eligibleQuestions(settings: Settings, bank: Question[], seenCounts?: Record<string, number>) {
  return bank.filter(q => (!seenCounts || (settings.mode === "review" ? (seenCounts[q.id] ?? 0) > 0 : !(seenCounts[q.id] ?? 0))) && settings.subjects.includes(q.subject) && settings.topics.includes(q.topic) && (settings.difficulty === "all" || q.level === settings.difficulty));
}
