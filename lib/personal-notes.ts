import { z } from "zod";
export const strokeSchema = z.object({color:z.enum(["#172554","#2563eb","#15803d","#c2410c","#7e22ce"]),width:z.number().int().min(1).max(12),points:z.array(z.tuple([z.number().finite().min(0).max(1000),z.number().finite().min(0).max(700)])).min(1).max(2000)}).strict();
export const noteSchema = z.object({id:z.string().uuid(),revision:z.number().int().min(0),title:z.string().trim().min(1,"Dê um nome à anotação.").max(100),content:z.string().max(20000),strokes:z.array(strokeSchema).max(1000)}).strict().refine(n=>JSON.stringify(n.strokes).length<=150000,"A folha está cheia. Crie outra anotação para continuar o desenho.");
export type Stroke = z.infer<typeof strokeSchema>;
export type PersonalNote = z.infer<typeof noteSchema> & {updatedAt?:string};
export type NoteSummary = Pick<PersonalNote,"id"|"title"|"revision"|"updatedAt">;
