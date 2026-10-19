import type {AppUser} from './access-auth';
import { env } from 'cloudflare:workers';
export async function booksRequest(input:Record<string,unknown>,timeout=60000){
 const config=env as unknown as {BOOKS_ENDPOINT?:string;BOOKS_SERVER_KEY?:string};
 if(!config.BOOKS_ENDPOINT||!config.BOOKS_SERVER_KEY)throw new Error('O serviço de livros está indisponível. Tente novamente mais tarde.');
 const response=await fetch(config.BOOKS_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','x-erem-key':config.BOOKS_SERVER_KEY},body:JSON.stringify(input),signal:AbortSignal.timeout(timeout)});
 const data=await response.json() as Record<string,unknown>;if(!response.ok)throw new Error(typeof data.error==='string'?data.error:'Não foi possível acessar os livros.');return data;
}
export async function bookOwner(user:AppUser){const identity=user.userId.startsWith('cf_')?user.email.trim().toLowerCase():`account:${user.userId}`;const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(identity));return 'email:'+Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');}
