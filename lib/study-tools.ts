import {z} from 'zod';
export const toolDocument=z.object({id:z.string().uuid(),kind:z.enum(['flashcard','summary','map','reminder']),title:z.string().trim().min(1).max(160),subject:z.string().max(100),content:z.string().max(20000),back:z.string().max(4000).default(''),due:z.string().datetime().nullable().default(null),done:z.boolean().default(false),nodes:z.array(z.object({id:z.string().max(80),parent:z.string().max(80),text:z.string().trim().min(1).max(300)})).max(60).default([]),revision:z.number().int().min(0)}).strict();
export type ToolDocument=z.infer<typeof toolDocument>;
export type ToolAttempt={id:string;kind:'exam'|'daily';day:string;startedAt:string;deadline:string;completedAt:string|null;questions:string[];answers:Record<string,number>;correct:number;total:number;revision:number};
export function localDay(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
export function dailyQuestions(ids:string[],day:string){return [...ids].sort((a,b)=>hash(day+a)-hash(day+b)||a.localeCompare(b)).slice(0,5);}
function hash(s:string){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
export function formatTime(ms:number){const sec=Math.floor(Math.max(0,ms)/1000);return `${String(Math.floor(sec/3600)).padStart(2,'0')}:${String(Math.floor(sec/60)%60).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;}
