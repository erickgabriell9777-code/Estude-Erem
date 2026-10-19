import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../../chatgpt-auth';
import {booksRequest,bookOwner} from '../../../../lib/books-server';
import {readingAction} from '../../../../lib/book-annotations';
import {z} from 'zod';
function database(){if(!env.DB)throw new Error('Banco indisponível');return env.DB;}
const json=(value:unknown,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie'}});
async function owned(user:Parameters<typeof bookOwner>[0],id:string){const result=await booksRequest({action:'list',owner:await bookOwner(user)});return Array.isArray(result.books)&&result.books.some((b:{id:string})=>b.id===id);}
export async function GET(req:Request){
 const user=await getChatGPTUser();if(!user)return json({error:'Entre novamente para ver suas marcações.'},401);
 const id=new URL(req.url).searchParams.get('id');if(!z.string().uuid().safeParse(id).success)return json({error:'Livro inválido.'},400);
 try{if(!await owned(user,id!))return json({error:'Livro não encontrado na sua conta.'},404);
 const results=await database().batch([database().prepare('SELECT data FROM book_marks WHERE user_id=? AND book_id=? ORDER BY created_at').bind(user.userId,id),database().prepare('SELECT page FROM book_reading WHERE user_id=? AND book_id=?').bind(user.userId,id)]);
 return json({marks:(results[0].results as {data:string}[]).map(r=>JSON.parse(r.data)),page:(results[1].results as {page:number}[])[0]?.page??1});
 }catch{return json({error:'Não foi possível carregar suas marcações. Tente novamente.'},503);}
}
export async function POST(req:Request){
 const user=await getChatGPTUser();if(!user)return json({error:'Entre novamente para salvar suas marcações.'},401);
 const origin=req.headers.get('origin');if((origin&&origin!==new URL(req.url).origin)||req.headers.get('sec-fetch-site')==='cross-site')return json({error:'Solicitação não autorizada.'},403);
 if(!req.headers.get('content-type')?.includes('application/json'))return json({error:'Formato inválido.'},415);
 try{const raw=await req.text();if(raw.length>5000)return json({error:'Marcação muito grande.'},413);const a=readingAction.parse(JSON.parse(raw));
 if(!await owned(user,a.bookId))return json({error:'Livro não encontrado na sua conta.'},404);
 if(a.action==='position')await database().prepare('INSERT INTO book_reading(user_id,book_id,page) VALUES(?,?,?) ON CONFLICT(user_id,book_id) DO UPDATE SET page=excluded.page').bind(user.userId,a.bookId,a.page).run();
 if(a.action==='remove')await database().prepare('DELETE FROM book_marks WHERE user_id=? AND book_id=? AND id=?').bind(user.userId,a.bookId,a.id).run();
 if(a.action==='add'){
 const existing=await database().prepare('SELECT data FROM book_marks WHERE user_id=? AND book_id=? AND id=?').bind(user.userId,a.bookId,a.mark.id).first<{data:string}>();
 if(existing){if(existing.data!==JSON.stringify(a.mark))return json({error:'Esta marcação mudou. Reabra o livro.'},409);return json({ok:true});}
 const result=await database().prepare('INSERT INTO book_marks(user_id,book_id,id,data,created_at) SELECT ?,?,?,?,? WHERE (SELECT count(*) FROM book_marks WHERE user_id=? AND book_id=?)<1000 ON CONFLICT(user_id,book_id,id) DO NOTHING').bind(user.userId,a.bookId,a.mark.id,JSON.stringify(a.mark),new Date().toISOString(),user.userId,a.bookId).run();
 if(!result.meta.changes)return json({error:'Limite de 1.000 marcações por livro atingido ou alteração simultânea. Reabra o livro.'},409);
 }
 return json({ok:true});
 }catch(e){return json({error:e instanceof z.ZodError?'Marcação inválida.':'Não foi possível salvar. Sua marcação continua na tela para tentar novamente.'},503);}
}
