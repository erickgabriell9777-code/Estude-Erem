import {z} from 'zod';
export const NOTEBOOK_PAGE_WIDTH=1000;
export const NOTEBOOK_PAGE_HEIGHT=2000;
// Extend the existing coordinate space downwards; saved marks retain their
// original size and position, without scaling or rewriting older notebooks.
const point=z.tuple([z.number().finite().min(0).max(NOTEBOOK_PAGE_WIDTH),z.number().finite().min(0).max(NOTEBOOK_PAGE_HEIGHT)]);
export const inkSchema=z.object({color:z.string().regex(/^#[0-9a-fA-F]{6}$/),width:z.number().min(1).max(24),opacity:z.number().min(.1).max(1),points:z.array(point).min(1).max(2000)}).strict();
export const sheetSchema=z.object({id:z.string().uuid(),name:z.string().trim().min(1).max(80),paper:z.enum(['lined','grid','plain']),dark:z.boolean(),text:z.string().max(5000),strokes:z.array(inkSchema).max(600)}).strict();
export const notebookSchema=z.object({id:z.string().uuid(),revision:z.number().int().min(0),title:z.string().trim().min(1).max(100),subject:z.string().max(100),questionId:z.string().max(100).nullable(),pages:z.array(sheetSchema).min(1).max(30)}).strict().refine(n=>new Set(n.pages.map(p=>p.id)).size===n.pages.length,'Páginas duplicadas.').refine(n=>JSON.stringify(n).length<900000,'Caderno cheio. Crie outro para continuar.');
export type Ink=z.infer<typeof inkSchema>;
export type Sheet=z.infer<typeof sheetSchema>;
export type DrawingNotebook=z.infer<typeof notebookSchema>;
export type NotebookSummary=Pick<DrawingNotebook,'id'|'title'|'subject'|'questionId'|'revision'>&{updatedAt:string};
export const notebookFingerprint=(n:DrawingNotebook)=>JSON.stringify({...n,revision:0});
export function newSheet():Sheet{return{id:crypto.randomUUID(),name:'Página 1',paper:'lined',dark:true,text:'',strokes:[]};}
