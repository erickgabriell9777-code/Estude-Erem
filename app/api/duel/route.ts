import {env} from "cloudflare:workers";
import {getChatGPTUser} from "../../chatgpt-auth";
import {loadCatalogue} from "../../../lib/catalogue";
import type {Catalogue} from "../../../lib/catalogue-types";
export const dynamic="force-dynamic";
type RoomRow={code:string;host_id:string;guest_id:string|null;status:"waiting"|"active"|"finished";questions:string;current_index:number};
type AnswerRow={user_id:string;choice:number;correct:number};
function db(){if(!env.DB)throw new Error("Database unavailable");return env.DB;}
function json(body:unknown,status=200){return Response.json(body,{status,headers:{"Cache-Control":"private, no-store","Vary":"Cookie"}});}
async function roomFor(code:string){return db().prepare("SELECT code,host_id,guest_id,status,questions,current_index FROM duel_rooms WHERE code=?").bind(code).first<RoomRow>();}
async function present(room:RoomRow,userId:string,catalogue:Catalogue){
 const ids=JSON.parse(room.questions) as string[],isHost=room.host_id===userId,index=room.current_index;
 const all=await db().prepare("SELECT user_id,choice,correct FROM duel_answers WHERE code=?").bind(room.code).all<AnswerRow>();
 const score=(id:string|null)=>id?all.results.filter(a=>a.user_id===id&&a.correct===1).length*100:0;
 const opponentId=isHost?room.guest_id:room.host_id;
 const currentAnswers=await db().prepare("SELECT user_id,choice FROM duel_answers WHERE code=? AND question_index=?").bind(room.code,index).all<{user_id:string;choice:number}>();
 const my=currentAnswers.results.find(a=>a.user_id===userId);
 const q=room.status==="active"?catalogue.questions.find(x=>x.id===ids[index]):undefined;
 return {code:room.code,status:room.status,currentIndex:index,total:ids.length,question:q?{prompt:q.prompt,options:q.options}:null,myAnswer:my?.choice??null,opponentAnswered:!!opponentId&&currentAnswers.results.some(a=>a.user_id===opponentId),scores:{host:score(room.host_id),guest:score(room.guest_id)},isHost,opponentJoined:!!room.guest_id};
}
export async function GET(request:Request){
 const user=await getChatGPTUser();if(!user)return json({error:"Entre na sua conta para jogar."},401);
 const code=(new URL(request.url).searchParams.get("code")??"").toUpperCase();
 if(!/^[A-Z0-9]{6}$/.test(code))return json({error:"Código de duelo inválido."},400);
 try{const room=await roomFor(code);if(!room)return json({error:"Duelo não encontrado."},404);if(room.host_id!==user.userId&&room.guest_id!==user.userId)return json({error:"Você não participa deste duelo."},403);return json(await present(room,user.userId,await loadCatalogue(db())));}
 catch(error){console.error("Duel load failed",error);return json({error:"Não foi possível carregar o duelo."},503);}
}
export async function POST(request:Request){
 const user=await getChatGPTUser();if(!user)return json({error:"Entre na sua conta para jogar."},401);
 if(request.headers.get("origin")&&request.headers.get("origin")!==new URL(request.url).origin)return json({error:"Solicitação não autorizada."},403);
 let body:Record<string,unknown>;try{const raw=await request.text();if(raw.length>4000)return json({error:"Solicitação muito grande."},413);const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return json({error:"Dados inválidos."},400);body=parsed;}catch{return json({error:"Dados inválidos."},400);}
 try{
  const database=db(),now=new Date().toISOString();
  if(body.action==="create"){
   const catalogue=await loadCatalogue(database),pool=[...catalogue.questions].sort(()=>Math.random()-.5).slice(0,10);
   if(pool.length<2)return json({error:"Ainda não há perguntas suficientes para criar um duelo."},503);
   let code="";for(let i=0;i<8;i++){const bytes=crypto.getRandomValues(new Uint8Array(6));code=Array.from(bytes,x=>"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[x%32]).join("");if(!await roomFor(code))break;code="";}
   if(!code)return json({error:"Não foi possível gerar o código. Tente novamente."},503);
   await database.prepare("INSERT INTO duel_rooms(code,host_id,status,questions,current_index,created_at,updated_at) VALUES(?,?,'waiting',?,0,?,?)").bind(code,user.userId,JSON.stringify(pool.map(q=>q.id)),now,now).run();
   return json(await present((await roomFor(code))!,user.userId,catalogue),201);
  }
  const code=typeof body.code==="string"?body.code.toUpperCase():"";
  if(!/^[A-Z0-9]{6}$/.test(code))return json({error:"Código de duelo inválido."},400);
  let room=await roomFor(code);if(!room)return json({error:"Duelo não encontrado."},404);
  if(body.action==="join"){
   if(room.host_id===user.userId)return json({error:"Você não pode entrar no próprio duelo com a mesma conta."},409);
   if(room.guest_id&&room.guest_id!==user.userId)return json({error:"Este duelo já tem dois participantes."},409);
   if(room.status!=="waiting"&&room.guest_id!==user.userId)return json({error:"Este duelo já começou."},409);
   if(!room.guest_id){await database.prepare("UPDATE duel_rooms SET guest_id=?,status='active',updated_at=? WHERE code=? AND guest_id IS NULL AND status='waiting'").bind(user.userId,now,code).run();room=await roomFor(code);if(room?.guest_id!==user.userId)return json({error:"Outra pessoa entrou primeiro neste duelo."},409);}
   return json(await present(room!,user.userId,await loadCatalogue(database)));
  }
  if(body.action==="answer"){
   if(room.status!=="active"||(room.host_id!==user.userId&&room.guest_id!==user.userId))return json({error:"Este duelo não está disponível para resposta."},409);
   if(!Number.isInteger(body.questionIndex)||body.questionIndex!==room.current_index||!Number.isInteger(body.choice)||(body.choice as number)<0||(body.choice as number)>3)return json({error:"Resposta inválida ou pergunta desatualizada."},400);
   const catalogue=await loadCatalogue(database),ids=JSON.parse(room.questions) as string[],question=catalogue.questions.find(q=>q.id===ids[room.current_index]);
   if(!question)return json({error:"Pergunta não encontrada."},409);
   await database.prepare("INSERT OR IGNORE INTO duel_answers(code,question_index,user_id,choice,correct,created_at) VALUES(?,?,?,?,?,?)").bind(code,room.current_index,user.userId,body.choice,body.choice===question.answer?1:0,now).run();
   const count=await database.prepare("SELECT COUNT(*) AS count FROM duel_answers WHERE code=? AND question_index=?").bind(code,room.current_index).first<{count:number}>();
   if((count?.count??0)>=2){const last=room.current_index>=ids.length-1;await database.prepare("UPDATE duel_rooms SET current_index=?,status=?,updated_at=? WHERE code=? AND current_index=?").bind(last?room.current_index:room.current_index+1,last?"finished":"active",now,code,room.current_index).run();}
   room=await roomFor(code);return json(await present(room!,user.userId,catalogue));
  }
  return json({error:"Ação desconhecida."},400);
 }catch(error){console.error("Duel action failed",error);return json({error:"Não foi possível concluir a ação do duelo."},503);}
}
