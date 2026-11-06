import {env} from "cloudflare:workers";
import {getChatGPTUser} from "../../chatgpt-auth";
export const dynamic="force-dynamic";
function db(){if(!env.DB)throw new Error("Database unavailable");return env.DB;}
function json(body:unknown,status=200){return Response.json(body,{status,headers:{"Cache-Control":"private, no-store","Vary":"Cookie"}});}
async function nameFor(userId:string){try{const row=await db().prepare("SELECT state FROM study_spaces WHERE id=?").bind(userId).first<{state:string}>();if(row){const state=JSON.parse(row.state) as {name?:unknown};if(typeof state.name==="string"&&state.name.trim())return state.name.trim().slice(0,40);}}catch{}return "Estudante";}
async function ensurePlayerId(user:{userId:string;email:string}) {
 const database=db();
 const existing=await database.prepare("SELECT public_id FROM player_ids WHERE user_id=?").bind(user.userId).first<{public_id:string}>();
 if(existing)return existing.public_id;
 // The reserved ID is granted only to the verified, currently allowlisted owner account.
 const reserved=user.email.toLowerCase()==="erickgabriell9777@gmail.com"?"000001":null;
 if(reserved){
  await database.prepare("INSERT OR IGNORE INTO player_ids(user_id,public_id,created_at) VALUES(?,?,?)").bind(user.userId,reserved,new Date().toISOString()).run();
  const row=await database.prepare("SELECT public_id FROM player_ids WHERE user_id=?").bind(user.userId).first<{public_id:string}>();
  if(row)return row.public_id;
  throw new Error("O ID reservado já está associado a outra conta.");
 }
 for(let attempt=0;attempt<30;attempt++){
  const bytes=crypto.getRandomValues(new Uint8Array(4));
  const value=String(((bytes[0]<<24)|(bytes[1]<<16)|(bytes[2]<<8)|bytes[3])>>>0).padStart(10,"0");
  const publicId=(Number(value)%1000000).toString().padStart(6,"0");
  if(publicId==="000001")continue;
  await database.prepare("INSERT OR IGNORE INTO player_ids(user_id,public_id,created_at) VALUES(?,?,?)").bind(user.userId,publicId,new Date().toISOString()).run();
  const row=await database.prepare("SELECT public_id FROM player_ids WHERE user_id=?").bind(user.userId).first<{public_id:string}>();
  if(row)return row.public_id;
 }
 throw new Error("Não foi possível gerar seu ID. Tente novamente.");
}
async function blocked(a:string,b:string){return !!(await db().prepare("SELECT 1 AS found FROM friend_blocks WHERE (blocker_id=? AND blocked_id=?) OR (blocker_id=? AND blocked_id=?) LIMIT 1").bind(a,b,b,a).first());}
async function publicPlayer(userId:string,publicId:string){return {userId,publicId,name:await nameFor(userId)};}
export async function GET(){
 const user=await getChatGPTUser();if(!user)return json({error:"Entre na sua conta para acessar os amigos."},401);
 try{
  const database=db(),myId=await ensurePlayerId(user);
  const [friends,incoming,outgoing,blocks]=await Promise.all([
   database.prepare("SELECT requester_id,recipient_id FROM friend_requests WHERE status='accepted' AND (requester_id=? OR recipient_id=?)").bind(user.userId,user.userId).all<{requester_id:string;recipient_id:string}>(),
   database.prepare("SELECT id,requester_id,created_at FROM friend_requests WHERE recipient_id=? AND status='pending' ORDER BY created_at DESC").bind(user.userId).all<{id:string;requester_id:string;created_at:string}>(),
   database.prepare("SELECT id,recipient_id,created_at FROM friend_requests WHERE requester_id=? AND status='pending' ORDER BY created_at DESC").bind(user.userId).all<{id:string;recipient_id:string;created_at:string}>(),
   database.prepare("SELECT blocked_id FROM friend_blocks WHERE blocker_id=? ORDER BY created_at DESC").bind(user.userId).all<{blocked_id:string}>()
  ]);
  const friendIds=friends.results.map(x=>x.requester_id===user.userId?x.recipient_id:x.requester_id);
  return json({myId,friends:await Promise.all(friendIds.map(async id=>{const row=await database.prepare("SELECT public_id FROM player_ids WHERE user_id=?").bind(id).first<{public_id:string}>();return row?publicPlayer(id,row.public_id):null;})).then(x=>x.filter(Boolean)),incoming:await Promise.all(incoming.results.map(async x=>{const row=await database.prepare("SELECT public_id FROM player_ids WHERE user_id=?").bind(x.requester_id).first<{public_id:string}>();return row?{id:x.id,...await publicPlayer(x.requester_id,row.public_id),createdAt:x.created_at}:null;})).then(x=>x.filter(Boolean)),outgoing:await Promise.all(outgoing.results.map(async x=>{const row=await database.prepare("SELECT public_id FROM player_ids WHERE user_id=?").bind(x.recipient_id).first<{public_id:string}>();return row?{id:x.id,...await publicPlayer(x.recipient_id,row.public_id),createdAt:x.created_at}:null;})).then(x=>x.filter(Boolean)),blocked:await Promise.all(blocks.results.map(async x=>{const row=await database.prepare("SELECT public_id FROM player_ids WHERE user_id=?").bind(x.blocked_id).first<{public_id:string}>();return row?publicPlayer(x.blocked_id,row.public_id):null;})).then(x=>x.filter(Boolean))});
 }catch(error){console.error("Friends load failed",error);return json({error:error instanceof Error?error.message:"Não foi possível carregar seus amigos."},503);}
}
export async function POST(request:Request){
 const user=await getChatGPTUser();if(!user)return json({error:"Entre na sua conta para acessar os amigos."},401);
 if(request.headers.get("origin")&&request.headers.get("origin")!==new URL(request.url).origin)return json({error:"Solicitação não autorizada."},403);
 let body:Record<string,unknown>;try{const raw=await request.text();if(raw.length>3000)return json({error:"Solicitação muito grande."},413);const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return json({error:"Dados inválidos."},400);body=parsed;}catch{return json({error:"Dados inválidos."},400);}
 try{
  const database=db(),myPublicId=await ensurePlayerId(user),action=body.action;
  if(action==="search"){
   const term=typeof body.query==="string"?body.query.trim().slice(0,60):"";
   if(term.length<2)return json({results:[]});
   const rows=await database.prepare("SELECT p.user_id,p.public_id,s.state FROM player_ids p LEFT JOIN study_spaces s ON s.id=p.user_id ORDER BY p.created_at DESC LIMIT 500").all<{user_id:string;public_id:string;state:string|null}>();
   const normalized=term.toLocaleLowerCase("pt-BR"),results=[];
   for(const row of rows.results){if(row.user_id===user.userId||await blocked(user.userId,row.user_id))continue;let display="Estudante";try{const state=JSON.parse(row.state??"{}");if(typeof state.name==="string"&&state.name.trim())display=state.name.trim().slice(0,40);}catch{}if(row.public_id.includes(term)||display.toLocaleLowerCase("pt-BR").includes(normalized)){results.push({publicId:row.public_id,name:display});if(results.length>=20)break;}}
   return json({results,myId:myPublicId});
  }
  if(action==="request"){
   const target=typeof body.publicId==="string"?body.publicId.trim():"";
   if(!/^\\d{6}$/.test(target))return json({error:"Informe um ID de seis dígitos."},400);
   const person=await database.prepare("SELECT user_id FROM player_ids WHERE public_id=?").bind(target).first<{user_id:string}>();
   if(!person)return json({error:"Nenhum jogador encontrado com esse ID."},404);
   if(person.user_id===user.userId)return json({error:"Você não pode enviar solicitação para si mesmo."},409);
   if(await blocked(user.userId,person.user_id))return json({error:"Você bloqueou essa pessoa. Desbloqueie para enviar uma solicitação."},409);
   if(await blocked(person.user_id,user.userId))return json({error:"Não foi possível enviar a solicitação."},403);
   const accepted=await database.prepare("SELECT 1 AS found FROM friend_requests WHERE status='accepted' AND ((requester_id=? AND recipient_id=?) OR (requester_id=? AND recipient_id=?))").bind(user.userId,person.user_id,person.user_id,user.userId).first();
   if(accepted)return json({error:"Vocês já são amigos."},409);
   const reverse=await database.prepare("SELECT id FROM friend_requests WHERE requester_id=? AND recipient_id=? AND status='pending'").bind(person.user_id,user.userId).first<{id:string}>();
   if(reverse){await database.prepare("UPDATE friend_requests SET status='accepted',updated_at=? WHERE id=?").bind(new Date().toISOString(),reverse.id).run();return json({message:"Solicitação aceita automaticamente: vocês já tinham um pedido pendente."});}
   const id=crypto.randomUUID(),now=new Date().toISOString();
   await database.prepare("INSERT OR IGNORE INTO friend_requests(id,requester_id,recipient_id,status,created_at,updated_at) VALUES(?,?,?,'pending',?,?)").bind(id,user.userId,person.user_id,now,now).run();
   return json({message:"Solicitação de amizade enviada."},201);
  }
  if(action==="respond"){
   const id=typeof body.requestId==="string"?body.requestId:"",accept=body.accept===true;
   const result=await database.prepare("SELECT requester_id FROM friend_requests WHERE id=? AND recipient_id=? AND status='pending'").bind(id,user.userId).first<{requester_id:string}>();
   if(!result)return json({error:"Essa solicitação não está mais disponível."},404);
   if(await blocked(user.userId,result.requester_id))return json({error:"Desbloqueie a pessoa antes de aceitar."},409);
   await database.prepare("UPDATE friend_requests SET status=?,updated_at=? WHERE id=? AND recipient_id=? AND status='pending'").bind(accept?"accepted":"declined",new Date().toISOString(),id,user.userId).run();
   return json({message:accept?"Amizade confirmada!":"Solicitação recusada."});
  }
  if(action==="block"){
   const target=typeof body.publicId==="string"?body.publicId:"",person=await database.prepare("SELECT user_id FROM player_ids WHERE public_id=?").bind(target).first<{user_id:string}>();
   if(!person||person.user_id===user.userId)return json({error:"Jogador inválido."},400);
   await database.prepare("INSERT OR IGNORE INTO friend_blocks(blocker_id,blocked_id,created_at) VALUES(?,?,?)").bind(user.userId,person.user_id,new Date().toISOString()).run();
   await database.prepare("DELETE FROM friend_requests WHERE (requester_id=? AND recipient_id=?) OR (requester_id=? AND recipient_id=?)").bind(user.userId,person.user_id,person.user_id,user.userId).run();
   return json({message:"Pessoa bloqueada."});
  }
  if(action==="unblock"){
   const target=typeof body.publicId==="string"?body.publicId:"";
   await database.prepare("DELETE FROM friend_blocks WHERE blocker_id=? AND blocked_id=(SELECT user_id FROM player_ids WHERE public_id=?)").bind(user.userId,target).run();
   return json({message:"Pessoa desbloqueada."});
  }
  if(action==="cancel"){
   const target=typeof body.publicId==="string"?body.publicId:"";
   await database.prepare("DELETE FROM friend_requests WHERE requester_id=? AND recipient_id=(SELECT user_id FROM player_ids WHERE public_id=?) AND status='pending'").bind(user.userId,target).run();
   return json({message:"Solicitação cancelada."});
  }
  if(action==="remove"){
   const target=typeof body.publicId==="string"?body.publicId:"",person=await database.prepare("SELECT user_id FROM player_ids WHERE public_id=?").bind(target).first<{user_id:string}>();
   if(!person)return json({error:"Jogador não encontrado."},404);
   await database.prepare("DELETE FROM friend_requests WHERE status='accepted' AND ((requester_id=? AND recipient_id=?) OR (requester_id=? AND recipient_id=?))").bind(user.userId,person.user_id,person.user_id,user.userId).run();
   return json({message:"Amizade removida."});
  }
  return json({error:"Ação inválida."},400);
 }catch(error){console.error("Friends action failed",error);return json({error:"Não foi possível concluir a ação."},503);}
}
