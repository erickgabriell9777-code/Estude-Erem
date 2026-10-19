import type {Question} from "./study-data";
export type Settings = { subjects: string[]; topics: string[]; difficulty: "all" | "Fácil" | "Médio" | "Difícil"; order: "ordered" | "random"; count: number; mode?: "unseen" | "review" };
export const defaultSettings: Settings = { subjects: [], topics: [], difficulty: "all", order: "ordered", count: 10, mode: "unseen" };
export function eligibleQuestions(settings: Settings, bank: Question[], seenCounts?: Record<string, number>) {
  return bank.filter(q => (!seenCounts || (settings.mode === "review" ? (seenCounts[q.id] ?? 0) > 0 : !(seenCounts[q.id] ?? 0))) && settings.subjects.includes(q.subject) && settings.topics.includes(q.topic) && (settings.difficulty === "all" || q.level === settings.difficulty));
}

export function createQuestionList(settings: Settings, random: () => number = Math.random, seenCounts: Record<string, number> = {}, bank: Question[]) {
  const eligible = [...eligibleQuestions(settings, bank, seenCounts)];
  if (!Number.isInteger(settings.count) || settings.count < 1 || settings.count > eligible.length) throw new Error("Não há perguntas suficientes neste modo. Reduza a quantidade, selecione mais assuntos ou altere entre inéditas e revisão.");
  if (settings.order === "random") for (let i = eligible.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [eligible[i], eligible[j]] = [eligible[j], eligible[i]]; }
  // Preserve the existing preference for the least-practiced questions within
  // each subject. A short session must not silently contain only the first one.
  eligible.sort((a, b) => (seenCounts[a.id] ?? 0) - (seenCounts[b.id] ?? 0));
  const groups = new Map<string, Question[]>();
  for (const question of eligible) {
    const group = groups.get(question.subject) ?? [];
    group.push(question); groups.set(question.subject, group);
  }
  const chosen: Question[] = [];
  for (let round = 0; chosen.length < settings.count; round++) {
    for (const group of groups.values()) {
      if (group[round]) chosen.push(group[round]);
      if (chosen.length === settings.count) break;
    }
  }
  if (settings.order === "ordered") {
    const rank = { Fácil: 0, Médio: 1, Difícil: 2 };
    chosen.sort((a,b) => Number(a.topic.slice(6)) - Number(b.topic.slice(6)) || rank[a.level] - rank[b.level]);
  } else {
    for (let i = chosen.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [chosen[i], chosen[j]] = [chosen[j], chosen[i]]; }
  }
  return chosen.map(question => question.id);
}
