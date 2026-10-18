import {z} from 'zod';
export const markSchema=z.object({id:z.string().uuid(),page:z.number().int().min(1).max(20000),kind:z.enum(['highlight','underline','note','bookmark']),color:z.enum(['#facc15','#4ade80','#fb7185','#60a5fa']),x:z.number().min(0).max(1),y:z.number().min(0).max(1),w:z.number().min(0).max(1),h:z.number().min(0).max(1),text:z.string().max(2000)}).strict().refine(m=>m.x+m.w<=1.001&&m.y+m.h<=1.001,'Marcação fora da página.');
export type BookMark=z.infer<typeof markSchema>;
export const readingAction=z.discriminatedUnion('action',[
 z.object({action:z.literal('add'),bookId:z.string().uuid(),mark:markSchema}).strict(),
 z.object({action:z.literal('remove'),bookId:z.string().uuid(),id:z.string().uuid()}).strict(),
 z.object({action:z.literal('position'),bookId:z.string().uuid(),page:z.number().int().min(1).max(20000)}).strict(),
]);
