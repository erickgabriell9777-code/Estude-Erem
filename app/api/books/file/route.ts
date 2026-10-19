import {getChatGPTUser} from '../../../chatgpt-auth';
import {booksRequest,bookOwner} from '../../../../lib/books-server';
import {z} from 'zod';
export async function GET(req:Request){
 const user=await getChatGPTUser();if(!user)return Response.json({error:'Entre novamente para ler seus livros.'},{status:401});
 const id=new URL(req.url).searchParams.get('id');if(!z.string().uuid().safeParse(id).success)return new Response('Livro inválido',{status:400});
 const range=req.headers.get('range');if(range&&!/^bytes=\d+-\d*$/.test(range))return new Response('Intervalo inválido',{status:416});
 try{
 const d=await booksRequest({action:'open',id,owner:await bookOwner(user)});
 if(typeof d.url!=='string')throw new Error('Arquivo indisponível');
 const upstream=await fetch(d.url,{headers:range?{Range:range}:{},signal:AbortSignal.timeout(60000)});
 if(!upstream.ok)return new Response('Não foi possível ler o PDF. Reabra o livro.',{status:upstream.status===416?416:503});
 const headers=new Headers({'Content-Type':'application/pdf','Content-Disposition':'inline','Cache-Control':'private, no-store','Vary':'Cookie','X-Content-Type-Options':'nosniff'});
 for(const key of ['Content-Length','Content-Range','Accept-Ranges']){const value=upstream.headers.get(key);if(value)headers.set(key,value);}
 return new Response(upstream.body,{status:upstream.status,headers});
 }catch{return Response.json({error:'Não foi possível abrir este livro na sua conta. Atualize a biblioteca e tente novamente.'},{status:503});}
}
