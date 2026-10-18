import {importFreeBook} from '../../../lib/import-free-book';
import {getChatGPTUser} from '../../chatgpt-auth';
import {booksRequest,bookOwner} from '../../../lib/books-server';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie'}});
export async function GET(){const user=await getChatGPTUser();if(!user)return json({error:'Entre na sua conta.'},401);try{return json(await booksRequest({action:'list',owner:await bookOwner(user.email)}));}catch(e){return json({error:e instanceof Error?e.message:'Livros indisponíveis.'},503);}}
export async function POST(req:Request){
 const user=await getChatGPTUser();if(!user)return json({error:'Entre novamente para acessar seus livros.'},401);
 const origin=req.headers.get('origin');if((origin&&origin!==new URL(req.url).origin)||req.headers.get('sec-fetch-site')==='cross-site')return json({error:'Solicitação não autorizada.'},403);
 if(!req.headers.get('content-type')?.includes('application/json'))return json({error:'Formato inválido.'},415);
 try{const body=await req.text();if(body.length>4000)return json({error:'Pedido muito grande.'},413);const input=JSON.parse(body);if(input.action==='import_catalogue')return json({book:await importFreeBook(input.id,await bookOwner(user.email))});
 if(!['begin','finish','open','remove'].includes(input.action))return json({error:'Ação inválida.'},400);
 return json(await booksRequest({...input,owner:await bookOwner(user.email)}));
 }catch(e){return json({error:e instanceof Error?e.message:'Não foi possível concluir.'},400);}
}
