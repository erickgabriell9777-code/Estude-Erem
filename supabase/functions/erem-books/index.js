import { createClient } from 'npm:@supabase/supabase-js@2.116.0';
const url=Deno.env.get('SUPABASE_URL');
const keys=JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS')||'{}');
const db=createClient(url,keys.default||Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),{auth:{persistSession:false,autoRefreshToken:false}});
const bucket=db.storage.from('erem-private-books');
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const hex=bytes=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
async function digest(value){return hex(await crypto.subtle.digest('SHA-256',value));}
function check(error){if(error)throw error;}
Deno.serve(async req=>{
 if(req.method!=='POST')return json({error:'Método inválido.'},405);
 try{
  const token=req.headers.get('x-erem-key')||'';if(token.length!==64)return json({error:'Não autorizado.'},401);
  const hash=await digest(new TextEncoder().encode(token));
  const access=await db.from('erem_backend_access').select('token_hash').eq('id','sites').single();
  if(access.error||access.data.token_hash!==hash)return json({error:'Não autorizado.'},401);
  const raw=await req.text();if(raw.length>16000)return json({error:'Pedido muito grande.'},413);
  const input=JSON.parse(raw),owner=input.owner;
  if(input.action==='catalogue'){
   const [a,b]=await Promise.all([db.from('erem_book_references').select('*'),db.from('erem_book_questions').select('*').order('id').limit(3000)]);check(a.error);check(b.error);return json({books:a.data,records:b.data});
  }
  if(typeof owner!=='string'||!/^email:[a-f0-9]{64}$/.test(owner))return json({error:'Conta inválida.'},400);
  if(input.action==='list'){
   const r=await db.from('erem_books').select('id,title,filename,bytes,reference_id,created_at,status').eq('owner_id',owner).eq('status','ready').order('created_at',{ascending:false});check(r.error);return json({books:r.data});
  }
  if(input.action==='begin'){
   const title=String(input.title||'').trim(),filename=String(input.filename||'');const bytes=input.bytes;
   if(!title||title.length>160||filename.length>200||!filename.toLowerCase().endsWith('.pdf')||!Number.isInteger(bytes)||bytes<5||bytes>52428800)return json({error:'Envie um PDF de até 50 MB, com título.'},400);
   const recent=await db.from('erem_books').select('bytes').eq('owner_id',owner);check(recent.error);
   if(recent.data.length>=100||recent.data.reduce((sum,b)=>sum+Number(b.bytes),0)+bytes>524288000)return json({error:'Sua biblioteca atingiu o limite de 100 arquivos ou 500 MB.'},400);
   const id=crypto.randomUUID(),path=owner.slice(6)+'/'+id+'.pdf';
   const insert=await db.from('erem_books').insert({id,owner_id:owner,title,filename,path,bytes,status:'pending'});check(insert.error);
   const signed=await bucket.createSignedUploadUrl(path);if(signed.error){await db.from('erem_books').delete().eq('owner_id',owner).eq('id',id);throw signed.error;}return json({id,url:signed.data.signedUrl});
  }
  const id=input.id;if(typeof id!=='string'||!/^[-a-f0-9]{36}$/.test(id))return json({error:'Livro inválido.'},400);
  const r=await db.from('erem_books').select('*').eq('owner_id',owner).eq('id',id).maybeSingle();check(r.error);if(!r.data)return json({error:'Livro não encontrado na sua conta.'},404);const book=r.data;
  if(input.action==='finish'){
   if(book.status==='ready')return json({ok:true});
   const file=await bucket.download(book.path);check(file.error);const bytes=await file.data.arrayBuffer();
   if(bytes.byteLength!==Number(book.bytes)||new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-'){
    await bucket.remove([book.path]);await db.from('erem_books').delete().eq('owner_id',owner).eq('id',id);return json({error:'O arquivo não é um PDF válido ou o envio ficou incompleto.'},400);
   }
   const sha=await digest(bytes);const ref=await db.from('erem_book_references').select('id').eq('sha256',sha).maybeSingle();check(ref.error);
   const update=await db.from('erem_books').update({status:'ready',reference_id:ref.data?.id??null}).eq('owner_id',owner).eq('id',id);check(update.error);return json({ok:true,referenceId:ref.data?.id??null});
  }
  if(input.action==='remove'){
   const removed=await bucket.remove([book.path]);check(removed.error);const deleted=await db.from('erem_books').delete().eq('owner_id',owner).eq('id',id);check(deleted.error);return json({ok:true});
  }
  if(input.action==='open'&&book.status==='ready'){
   const signed=await bucket.createSignedUrl(book.path,600);check(signed.error);return json({url:signed.data.signedUrl});
  }
  return json({error:'Ação inválida.'},400);
 }catch(error){console.error('Books request failed',error?.message);return json({error:'Não foi possível acessar os livros. Tente novamente.'},503);}
});
