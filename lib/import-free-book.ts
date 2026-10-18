import {freeBooks} from './free-books';
import {booksRequest} from './books-server';
import type {UserBook} from './book-types';

export async function importFreeBook(id:unknown,owner:string):Promise<UserBook>{
 const source=freeBooks.find(book=>book.id===id);
 if(!source)throw new Error('Livro não encontrado no catálogo.');
 const filename=`catalogo-${source.id}.pdf`;
 const find=async()=>{const data=await booksRequest({action:'list',owner});return (data.books as UserBook[]).find(book=>book.filename===filename&&book.status==='ready');};
 const existing=await find();if(existing)return existing;
 // Only the reviewed catalogue can select an upstream; never accept arbitrary URLs.
 const response=await fetch(source.url,{signal:AbortSignal.timeout(60000)});
 if(!response.ok||!response.body)throw new Error('A fonte do livro está indisponível. Tente novamente mais tarde.');
 const limit=20*1024*1024;
 if(Number(response.headers.get('content-length'))>limit){await response.body.cancel();throw new Error('Este PDF excede o limite de importação automática.');}
 const reader=response.body.getReader(),chunks:Uint8Array[]=[];let length=0;
 while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>limit){await reader.cancel();throw new Error('Este PDF excede o limite de importação automática.');}chunks.push(value);}
 const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
 if(new TextDecoder().decode(bytes.subarray(0,5))!=='%PDF-')throw new Error('A fonte não retornou um PDF válido.');
 // Recheck after download so a retry can reuse a completed copy.
 const reused=await find();if(reused)return reused;
 const started=await booksRequest({action:'begin',owner,filename,title:source.title,bytes:length});
 if(typeof started.url!=='string'||typeof started.id!=='string')throw new Error('Não foi possível preparar o livro.');
 try{
  const upload=await fetch(started.url,{method:'PUT',headers:{'Content-Type':'application/pdf'},body:bytes,signal:AbortSignal.timeout(60000)});
  if(!upload.ok)throw new Error('Não foi possível salvar o PDF. Tente novamente.');
  await booksRequest({action:'finish',owner,id:started.id});
 }catch(error){await booksRequest({action:'remove',owner,id:started.id}).catch(()=>{});throw error;}
 const book=await find();if(!book)throw new Error('Livro salvo. Atualize a biblioteca para abrir.');return book;
}
