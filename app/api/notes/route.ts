import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";
import { noteSchema } from "../../../lib/personal-notes";
import { z } from "zod";
export const dynamic="force-dynamic";
function database(){if(!env.DB)throw new Error("Database unavailable");return env.DB;}
function json(value:unknown,status=200){return Response.json(value,{status,headers:{"Cache-Control":"private, no-store","Vary":"Cookie"}});}
type NoteRow={id:string;title:string;content:string;strokes:string;revision:number;updatedAt:string};
export async function GET(request:Request){
 const user=await getChatGPTUser();if(!user)return json({error:"Entre na sua conta para abrir o caderno."},401);
 try{const id=new URL(request.url).searchParams.get("id"),db=database();
 if(id){if(!z.string().uuid().safeParse(id).success)return json({error:"Anotação inválida."},400);const note=await db.prepare("SELECT id,title,content,strokes,revision,updated_at AS updatedAt FROM personal_notes WHERE user_id = ? AND id = ?").bind(user.userId,id).first<NoteRow>();return note?json({note:{...note,strokes:JSON.parse(note.strokes)}}):json({error:"Anotação não encontrada."},404);}
 const result=await db.prepare("SELECT id,title,revision,updated_at AS updatedAt FROM personal_notes WHERE user_id = ? ORDER BY updated_at DESC").bind(user.userId).all();return json({notes:result.results});
 }catch(e){console.error("Note load failed",e);return json({error:"Não foi possível carregar o caderno. Tente novamente."},503);}
}
export async function POST(request:Request){
 const user=await getChatGPTUser();if(!user)return json({error:"Entre novamente para salvar sua anotação."},401);
 const origin=request.headers.get("origin");if((origin&&origin!==new URL(request.url).origin)||request.headers.get("sec-fetch-site")==="cross-site")return json({error:"Solicitação não autorizada."},403);
 if(!request.headers.get("content-type")?.includes("application/json"))return json({error:"Formato inválido."},415);
 let note:z.infer<typeof noteSchema>;
 try{const body=await request.text();if(body.length>200000)return json({error:"Anotação muito grande. Divida o conteúdo em outra anotação."},413);note=noteSchema.parse(JSON.parse(body));}catch{return json({error:"Confira o título e os limites de texto e desenho antes de salvar."},400);}
 try{const db=database(),now=new Date().toISOString(),strokes=JSON.stringify(note.strokes);
 // Idempotent retries after a lost response must not duplicate or erase a note.
 const existing=await db.prepare("SELECT id,title,content,strokes,revision,updated_at AS updatedAt FROM personal_notes WHERE user_id = ? AND id = ?").bind(user.userId,note.id).first<NoteRow>();
 if(existing&&existing.title===note.title&&existing.content===note.content&&existing.strokes===strokes)return json({note:{...existing,strokes:note.strokes}});
 if((existing?.revision??0)!==note.revision)return json({error:"Esta anotação mudou em outra aba. Seu rascunho foi mantido; salve uma cópia ou reabra a versão salva."},409);
 const result=existing?await db.prepare("UPDATE personal_notes SET title = ?, content = ?, strokes = ?, revision = revision + 1, updated_at = ? WHERE user_id = ? AND id = ? AND revision = ?").bind(note.title,note.content,strokes,now,user.userId,note.id,note.revision).run():await db.prepare("INSERT INTO personal_notes (user_id,id,title,content,strokes,revision,updated_at) VALUES (?,?,?,?,?,1,?) ON CONFLICT(user_id,id) DO NOTHING").bind(user.userId,note.id,note.title,note.content,strokes,now).run();
 if(result.meta.changes!==1)return json({error:"Uma alteração chegou antes. Seu rascunho continua aberto; salve uma cópia."},409);
 return json({note:{...note,revision:note.revision+1,updatedAt:now}});
 }catch(e){console.error("Note save failed",e);return json({error:"Não foi possível salvar. Seu rascunho continua aberto; tente novamente."},503);}
}
