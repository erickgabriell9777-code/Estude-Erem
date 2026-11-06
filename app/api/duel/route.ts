import {env} from "cloudflare:workers";
import {getChatGPTUser} from "../../chatgpt-auth";
import {loadCatalogue} from "../../../lib/catalogue";
import type {Catalogue} from "../../../lib/catalogue-types";
export const dynamic="force-dynamic";
type RoomRow={code:string;host_id:string;guest_id:string|null;host_name:string;guest_name:string|null;status:"waiting"|"active"|"finished";questions:string;current_index:number;seconds_per_question:number;question_started_at:string|null;theme_id:string|null;phase:"countdown"|"question"|"break"};
type AnswerRow={user_id:string;choice:number;correct:number};
function db(){if(!env.DB)throw new Error("Database unavailable");return env.DB;}
function json(body:unknown,status=200){return Response.json(body,{status,headers:{"Cache-Control":"private, no-store","Vary":"Cookie"}});}
async function displayName(userId:string,fallback:string){try{const row=await db().prepare("SELECT state FROM study_spaces WHERE id=?").bind(userId).first<{state:string}>();if(row){const state=JSON.parse(row.state) as {name?:unknown};if(typeof state.name==="string"&&state.name.trim())return state.name.trim().slice(0,40);}}catch{}return fallback&&fallback!=="Estudante"&&!fallback.includes("@")?fallback:"Estudante";}
async function roomFor(code:string){return db().prepare("SELECT code,host_id,guest_id,host_name,guest_name,status,questions,current_index,seconds_per_question,question_started_at,theme_id,phase FROM duel_rooms WHERE code=?").bind(code).first<RoomRow>();}
async function advanceRoom(room:RoomRow){
 if(room.status!=="active"||!room.question_started_at)return room;
 const started=Date.parse(room.question_started_at),elapsed=Date.now()-started;
 if(room.phase==="countdown"&&elapsed>=10000){
  await db().prepare("UPDATE duel_rooms SET phase='question',question_started_at=?,updated_at=? WHERE code=? AND phase='countdown' AND question_started_at=?").bind(new Date().toISOString(),new Date().toISOString(),room.code,room.question_started_at).run();
  return (await roomFor(room.code))??room;
 }
 if(room.phase==="break"&&elapsed>=3500){
  const ids=JSON.parse(room.questions) as string[],last=room.current_index>=ids.length-1,now=new Date().toISOString();
  await db().prepare("UPDATE duel_rooms SET current_index=?,status=?,phase=?,question_started_at=?,updated_at=? WHERE code=? AND phase='break' AND question_started_at=?").bind(last?room.current_index:room.current_index+1,last?"finished":"active",last?"break":"question",last?null:now,now,room.code,room.question_started_at).run();
  return (await roomFor(room.code))??room;
 }
 return room;
}
async function present(room:RoomRow,userId:string,catalogue:Catalogue){
 const ids=JSON.parse(room.questions) as string[],isHost=room.host_id===userId,index=room.current_index;
 const all=await db().prepare("SELECT user_id,choice,correct FROM duel_answers WHERE code=?").bind(room.code).all<AnswerRow>();
 const score=(id:string|null)=>id?all.results.filter(a=>a.user_id===id&&a.correct===1).length*10:0;
 const opponentId=isHost?room.guest_id:room.host_id;
 const answers=await db().prepare("SELECT user_id,choice,correct FROM duel_answers WHERE code=? AND question_index=?").bind(room.code,index).all<{user_id:string;choice:number;correct:number}>();
 const mine=answers.results.find(a=>a.user_id===userId),q=room.status==="active"&&room.phase==="question"?catalogue.questions.find(x=>x.id===ids[index]):undefined;
 const started=room.question_started_at?Date.parse(room.question_started_at):Date.now();
 const phaseDuration=room.phase==="countdown"?10000:room.phase==="break"?3500:room.seconds_per_question*1000;
 const phaseRemainingMs=room.status==="active"?Math.max(0,phaseDuration-(Date.now()-started)):0;
 const remainingSeconds=room.phase==="question"?Math.max(0,Math.ceil(phaseRemainingMs/1000)):0;
 let themeIds:string[]=[];try{const parsed=JSON.parse(room.theme_id??"[]");themeIds=Array.isArray(parsed)?parsed.filter((v):v is string=>typeof v==="string"):room.theme_id?[room.theme_id]:[];}catch{themeIds=room.theme_id?[room.theme_id]:[];}
 return {code:room.code,status:room.status,phase:room.phase,currentIndex:index,total:ids.length,question:q?{prompt:q.prompt,options:q.options,correctOption:mine?q.answer:null}:null,myAnswer:room.phase==="question"?mine?.choice??null:null,opponentAnswered:!!opponentId&&answers.results.some(a=>a.user_id===opponentId),scores:{host:score(room.host_id),guest:score(room.guest_id)},isHost,opponentJoined:!!room.guest_id,hostName:room.host_name,guestName:room.guest_name,secondsPerQuestion:room.seconds_per_question,remainingSeconds,phaseRemainingMs,themeIds};
}
export async function GET(request:Request){
 const user=await getChatGPTUser();if(!user)return json({error:"Entre na sua conta para jogar."},401);
 const url=new URL(request.url);
 if(url.searchParams.get("history")==="1"){
  try{
   const rows=await db().prepare("SELECT r.code,r.host_id,r.host_name,r.guest_name,r.created_at,(SELECT COUNT(*)*10 FROM duel_answers a WHERE a.code=r.code AND a.user_id=? AND a.correct=1) AS my_score,(SELECT COUNT(*)*10 FROM duel_answers a WHERE a.code=r.code AND a.user_id<>? AND a.correct=1) AS opponent_score FROM duel_rooms r WHERE (r.host_id=? OR r.guest_id=?) AND r.status='finished' ORDER BY r.created_at DESC LIMIT 30").bind(user.userId,user.userId,user.userId,user.userId).all<{code:string;host_id:string;host_name:string;guest_name:string|null;created_at:string;my_score:number;opponent_score:number}>();
   return json({history:rows.results.map(r=>({code:r.code,opponentName:r.host_id===user.userId?(r.guest_name??"Jogador"):r.host_name,createdAt:r.created_at,myScore:r.my_score,opponentScore:r.opponent_score,result:r.my_score===r.opponent_score?"Empate":r.my_score>r.opponent_score?"Vitória":"Derrota"}))});
  }catch(error){console.error("Duel history failed",error);return json({error:"Não foi possível carregar o histórico."},503);}
 }
 const code=(url.searchParams.get("code")??"").toUpperCase();if(!/^[A-Z0-9]{6}$/.test(code))return json({error:"Código de duelo inválido."},400);
 try{let room=await roomFor(code);if(!room)return json({error:"Duelo não encontrado."},404);if(room.host_id!==user.userId&&room.guest_id!==user.userId)return json({error:"Você não participa deste duelo."},403);room=await advanceRoom(room);return json(await present(room,user.userId,await loadCatalogue(db())));}
 catch(error){console.error("Duel load failed",error);return json({error:"Não foi possível carregar o duelo."},503);}
}
export async function POST(request:Request){
 const user=await getChatGPTUser();if(!user)return json({error:"Entre na sua conta para jogar."},401);
 if(request.headers.get("origin")&&request.headers.get("origin")!==new URL(request.url).origin)return json({error:"Solicitação não autorizada."},403);
 let body:Record<string,unknown>;try{const raw=await request.text();if(raw.length>4000)return json({error:"Solicitação muito grande."},413);const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return json({error:"Dados inválidos."},400);body=parsed;}catch{return json({error:"Dados inválidos."},400);}
 try{
 const database=db(),now=new Date().toISOString();
 if(body.action==="create"){
  const catalogue=await loadCatalogue(database),themeIds=Array.isArray(body.themeIds)?body.themeIds.filter((v):v is string=>typeof v==="string"&&catalogue.subjects.some(s=>s.id===v)):typeof body.themeId==="string"&&body.themeId?[body.themeId]:[];
  const requestedTopicIds=Array.isArray(body.topicIds)?body.topicIds.filter((v):v is string=>typeof v==="string"):[];
  const topicIds=requestedTopicIds.filter(id=>catalogue.topics.some(t=>t.id===id&&(!themeIds.length||themeIds.includes(t.subject))));
  const difficulty=typeof body.difficulty==="string"&&["Fácil","Médio","Difícil"].includes(body.difficulty)?body.difficulty:null;
  const pool=[...catalogue.questions].filter(q=>(!themeIds.length||themeIds.includes(q.subject))&&(!topicIds.length||topicIds.includes(q.topic))&&(!difficulty||q.level===difficulty)).sort(()=>Math.random()-.5),count=Number(body.questionCount),seconds=Number(body.secondsPerQuestion);
  if(!Number.isInteger(count)||count<1||count>30||!Number.isInteger(seconds)||![10,15,20,30,45,60].includes(seconds))return json({error:"Configurações de duelo inválidas."},400);
  const selected=pool.slice(0,Math.min(count,pool.length));if(!selected.length)return json({error:"Não há perguntas disponíveis para essa combinação de matérias, assuntos e dificuldade. Selecione outras opções."},503);
  let code="";for(let i=0;i<8;i++){const bytes=crypto.getRandomValues(new Uint8Array(6));code=Array.from(bytes,x=>"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[x%32]).join("");if(!await roomFor(code))break;code="";}
  if(!code)return json({error:"Não foi possível gerar o código. Tente novamente."},503);
  await database.prepare("INSERT INTO duel_rooms(code,host_id,host_name,status,questions,current_index,seconds_per_question,question_started_at,theme_id,created_at,updated_at) VALUES(?,?,?,'waiting',?,0,?,NULL,?,?,?)").bind(code,user.userId,await displayName(user.userId,user.fullName??user.displayName),JSON.stringify(selected.map(q=>q.id)),seconds,themeIds.length?JSON.stringify(themeIds):null,now,now).run();
  return json(await present((await roomFor(code))!,user.userId,catalogue),201);
 }
 const code=typeof body.code==="string"?body.code.toUpperCase():"";if(!/^[A-Z0-9]{6}$/.test(code))return json({error:"Código de duelo inválido."},400);
 let room=await roomFor(code);if(!room)return json({error:"Duelo não encontrado."},404);room=await advanceRoom(room);
 if(body.action==="join"){
  if(room.host_id===user.userId)return json({error:"Você não pode entrar no próprio duelo com a mesma conta."},409);
  if(room.guest_id&&room.guest_id!==user.userId)return json({error:"Este duelo já tem dois participantes."},409);
  if(room.status!=="waiting"&&room.guest_id!==user.userId)return json({error:"Este duelo já começou."},409);
  if(!room.guest_id){await database.prepare("UPDATE duel_rooms SET guest_id=?,guest_name=?,status='active',phase='countdown',question_started_at=?,updated_at=? WHERE code=? AND guest_id IS NULL AND status='waiting'").bind(user.userId,await displayName(user.userId,user.fullName??user.displayName),now,now,code).run();room=await roomFor(code);if(room?.guest_id!==user.userId)return json({error:"Outra pessoa entrou primeiro neste duelo."},409);}
  return json(await present(room!,user.userId,await loadCatalogue(database)));
 }
 if(body.action==="answer"||body.action==="timeout"){
  if(room.status!=="active"||(room.host_id!==user.userId&&room.guest_id!==user.userId))return json({error:"Este duelo não está disponível para resposta."},409);if(room.phase!=="question")return json({error:room.phase==="countdown"?"O duelo ainda está na contagem regressiva.":"Aguarde o intervalo antes da próxima pergunta."},409);
  if(!Number.isInteger(body.questionIndex)||body.questionIndex!==room.current_index)return json({error:"Pergunta desatualizada."},400);
  const catalogue=await loadCatalogue(database),ids=JSON.parse(room.questions) as string[],question=catalogue.questions.find(q=>q.id===ids[room.current_index]);if(!question)return json({error:"Pergunta não encontrada."},409);
  const already=await database.prepare("SELECT choice FROM duel_answers WHERE code=? AND question_index=? AND user_id=?").bind(code,room.current_index,user.userId).first<{choice:number}>();if(already)return json(await present(room,user.userId,catalogue));
  const started=room.question_started_at?Date.parse(room.question_started_at):Date.now(),expired=Date.now()>=started+room.seconds_per_question*1000,choice=body.action==="timeout"||expired?-1:Number(body.choice);
  if(choice!==-1&&(!Number.isInteger(choice)||choice<0||choice>3))return json({error:"Resposta inválida."},400);
  await database.prepare("INSERT OR IGNORE INTO duel_answers(code,question_index,user_id,choice,correct,created_at) VALUES(?,?,?,?,?,?)").bind(code,room.current_index,user.userId,choice,choice===question.answer?1:0,now).run();
  const count=await database.prepare("SELECT COUNT(*) AS count FROM duel_answers WHERE code=? AND question_index=?").bind(code,room.current_index).first<{count:number}>();
  if((count?.count??0)>=2){await database.prepare("UPDATE duel_rooms SET phase='break',question_started_at=?,updated_at=? WHERE code=? AND current_index=? AND phase='question'").bind(now,now,code,room.current_index).run();}
  room=await roomFor(code);return json(await present(room!,user.userId,catalogue));
 }
 return json({error:"Ação desconhecida."},400);
 }catch(error){console.error("Duel action failed",error);return json({error:"Não foi possível concluir a ação do duelo."},503);}
}