export type Appearance = { mode: "light" | "dark" | "black"; accent: "blue" | "green" | "purple" | "orange"; largeText: boolean; reducedMotion: boolean };
export const defaultAppearance: Appearance = {mode:"light",accent:"blue",largeText:false,reducedMotion:false};
// Derived only from server-validated counters. Existing study receives equal credit.
export function xpProgress(stats: {answered:number;correct:number;sessions:number}) {
 const total = stats.answered * 5 + stats.correct * 5 + stats.sessions * 20;
 const level = Math.floor(total / 100) + 1;
 return {total,level,within:total % 100,remaining:100-total%100};
}
