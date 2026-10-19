import {createServerClient,parseCookieHeader,serializeCookieHeader,type CookieOptions} from '@supabase/ssr';
import {z} from 'zod';
import {authenticateAccess,type AppUser} from './access-auth';

type Settings={SUPABASE_URL?:string;SUPABASE_PUBLISHABLE_KEY?:string;TURNSTILE_SITE_KEY?:string;TURNSTILE_SECRET_KEY?:string;SUPABASE_CAPTCHA_ENABLED?:string};
export type LoginOptions={ready:boolean;siteKey:string;email:boolean;phone:boolean;google:boolean;facebook:boolean;signup:boolean};
const safeHeaders={'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer'};
const captcha=z.string().min(1).max(2048),email=z.string().trim().email().max(254),password=z.string().min(8).max(128),phone=z.string().regex(/^\+[1-9]\d{7,14}$/);
const schemas={
 password:z.object({email,password,captchaToken:captcha}).strict(),
 signup:z.object({email,password,captchaToken:captcha}).strict(),
 recover:z.object({email,captchaToken:captcha}).strict(),
 phone:z.object({phone,captchaToken:captcha}).strict(),
 verify:z.object({phone,token:z.string().regex(/^\d{6,10}$/),captchaToken:captcha}).strict(),
 oauth:z.object({provider:z.enum(['google','facebook']),captchaToken:captcha}).strict(),
 reset:z.object({password,captchaToken:captcha}).strict(),
};
function project(env:Settings){
 const url=(env.SUPABASE_URL??'').replace(/\/$/,'');
 const key=env.SUPABASE_PUBLISHABLE_KEY??'';
 if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)||!/^sb_publishable_[A-Za-z0-9_-]{16,250}$/.test(key))return null;
 return{url,key};
}
let optionsCache:{url:string;expires:number;external:Record<string,boolean>;signup:boolean}|undefined;
export async function loginOptions(env:Settings):Promise<LoginOptions>{
 const config=project(env),siteKey=env.TURNSTILE_SITE_KEY??'';
 const base={ready:false,siteKey,email:false,phone:false,google:false,facebook:false,signup:false};
 if(!config)return base;
 try{
  if(!optionsCache||optionsCache.url!==config.url||optionsCache.expires<Date.now()){
   const response=await fetch(`${config.url}/auth/v1/settings`,{headers:{apikey:config.key},signal:AbortSignal.timeout(8000)});
   if(!response.ok)return base;
   const data=await response.json() as {external?:Record<string,boolean>;disable_signup?:boolean};
   optionsCache={url:config.url,expires:Date.now()+60000,external:data.external??{},signup:data.disable_signup!==true};
  }
  const {external,signup}=optionsCache;
  const ready=!!siteKey&&!!env.TURNSTILE_SECRET_KEY&&env.SUPABASE_CAPTCHA_ENABLED==='true';
  return{ready,siteKey,email:external.email===true,phone:external.phone===true,google:external.google===true,facebook:external.facebook===true,signup};
 }catch{return base;}
}
function authMessage(code:string|undefined){
 if(code==='email_not_confirmed')return'Confirme seu e-mail antes de entrar.';
 if(code==='over_email_send_rate_limit'||code==='over_sms_send_rate_limit'||code==='over_request_rate_limit')return'Aguarde um pouco antes de tentar novamente.';
 if(code==='captcha_failed')return'Faça a verificação de humano novamente.';
 if(code==='otp_expired')return'O código expirou ou está incorreto. Solicite outro e tente novamente.';
 return'Não foi possível concluir. Confira os dados e tente novamente.';
}
export function createAccountClient(request:Request,env:Settings){
 const config=project(env);if(!config)return null;
 const jar=new Map(parseCookieHeader(request.headers.get('cookie')??'').map(({name,value})=>[name,value??'']));
 const pending=new Map<string,{value:string;options:CookieOptions}>();
 const client=createServerClient(config.url,config.key,{
  cookieOptions:{path:'/',secure:true,httpOnly:true,sameSite:'lax'},
  cookies:{
   getAll:()=>Array.from(jar,([name,value])=>({name,value})),
   setAll:values=>{for(const {name,value,options} of values){jar.set(name,value);pending.set(name,{value,options:{...options,path:'/',secure:true,httpOnly:true,sameSite:'lax'}});}},
  },
 });
 const finish=(response:Response)=>{
  const result=new Response(response.body,response);
  for(const [key,value] of Object.entries(safeHeaders))result.headers.set(key,value);
  for(const [name,{value,options}] of pending)result.headers.append('Set-Cookie',serializeCookieHeader(name,value,options));
  return result;
 };
 return{client,finish};
}
async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');}
export async function accountUser(request:Request,env:Cloudflare.Env,client:NonNullable<ReturnType<typeof createAccountClient>>['client']):Promise<AppUser|null>{
 const {data,error}=await client.auth.getClaims();
 const claims=data?.claims;
 if(error||!claims||claims.role!=='authenticated'||claims.is_anonymous===true||!z.string().uuid().safeParse(claims.sub).success)return null;
 const config=project(env)!;
 if(claims.iss!==`${config.url}/auth/v1`||!(Array.isArray(claims.aud)?claims.aud.includes('authenticated'):claims.aud==='authenticated'))return null;
 const id=`sb_${await digest(`${config.url}\0${claims.sub}`)}`;
 if(!env.DB)throw Error('Database unavailable');
 const existing=await env.DB.prepare('SELECT app_user_id FROM auth_identity_links WHERE auth_user_id=?').bind(id).first<{app_user_id:string}>();
 let userId=existing?.app_user_id??id;
 // Link the old owner space only when BOTH provider identities are proven
 // in the same request and Supabase confirms ownership of the same email.
 if(!existing&&(request.headers.has('cf-access-jwt-assertion')||/(?:^|;\s*)CF_Authorization=/.test(request.headers.get('cookie')??''))){
  let owner:AppUser|null=null;try{owner=await authenticateAccess(request.headers,env);}catch{}
  if(owner&&typeof claims.email==='string'&&owner.email===claims.email.toLowerCase()){
   const verified=await client.auth.getUser();
   if(!verified.error&&verified.data.user?.email_confirmed_at&&verified.data.user.id===claims.sub&&verified.data.user.email?.toLowerCase()===owner.email){
    await env.DB.prepare('INSERT INTO auth_identity_links (auth_user_id,app_user_id,created_at) VALUES (?,?,?) ON CONFLICT DO NOTHING').bind(id,owner.userId,new Date().toISOString()).run();
    const link=await env.DB.prepare('SELECT app_user_id FROM auth_identity_links WHERE auth_user_id=?').bind(id).first<{app_user_id:string}>();
    userId=link?.app_user_id??id;
   }
  }
 }
 const userEmail=typeof claims.email==='string'&&claims.email?claims.email:`${id}@accounts.invalid`;
 return{userId,email:userEmail,fullName:null,displayName:userEmail.endsWith('@accounts.invalid')?'Estudante':userEmail};
}
export async function verifyHuman(request:Request,env:Settings,token:string){
 if(!env.TURNSTILE_SECRET_KEY)return false;
 try{
  const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
   method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(8000),
  });
  if(!response.ok)return false;
  const data=await response.json() as {success?:boolean;hostname?:string;action?:string};
  return data.success===true&&data.hostname===new URL(request.url).hostname&&data.action==='erem_auth';
 }catch{return false;}
}
export async function accountAction(request:Request,env:Settings){
 const path=new URL(request.url).pathname;
 const session=createAccountClient(request,env);
 const finish=session?.finish??((response:Response)=>response);
 const json=(body:unknown,status=200)=>finish(Response.json(body,{status,headers:safeHeaders}));
 const redirect=(path:string)=>finish(new Response(null,{status:303,headers:{...safeHeaders,Location:path}}));
 if(!session)return json({error:'A entrada está sendo preparada. Tente novamente em instantes.'},503);
 if(path==='/auth/callback'){
  if(request.method!=='GET')return json({error:'Método inválido.'},405);
  const url=new URL(request.url),code=url.searchParams.get('code');
  if(!code||code.length>4096)return redirect('/login?error=callback');
  const {error}=await session.client.auth.exchangeCodeForSession(code);
  if(error)return redirect('/login?error=callback');
  return redirect(url.searchParams.get('flow')==='recovery'?'/login?mode=reset':'/');
 }
 if(request.method!=='POST')return json({error:'Método inválido.'},405);
 if(request.headers.get('origin')!==new URL(request.url).origin||request.headers.get('sec-fetch-site')==='cross-site')return json({error:'Solicitação não autorizada.'},403);
 if(path==='/auth/signout'){
  const {error}=await session.client.auth.signOut({scope:'local'});
  return error?json({error:'Não foi possível sair. Tente novamente.'},503):redirect('/login');
 }
 const action=path.slice('/auth/'.length) as keyof typeof schemas;
 if(!Object.hasOwn(schemas,action))return json({error:'Ação inválida.'},404);
 const options=await loginOptions(env);
 if(!options.ready)return json({error:'A entrada está sendo preparada. Tente novamente em instantes.'},503);
 if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'Formato inválido.'},415);
 let body:Record<string,string>;
 try{const raw=await request.text();if(raw.length>8000)return json({error:'Pedido muito grande.'},413);body=schemas[action].parse(JSON.parse(raw)) as Record<string,string>;}catch{return json({error:'Confira os campos e a verificação de humano.'},400);}
 const {client}=session;
 if(action==='oauth'){
  const provider=body.provider as 'google'|'facebook';
  if(!options[provider])return json({error:'Esta opção de entrada ainda não está disponível.'},409);
  if(!await verifyHuman(request,env,body.captchaToken))return json({error:'Faça a verificação de humano novamente.'},403);
  const {data,error}=await client.auth.signInWithOAuth({provider,options:{redirectTo:`${new URL(request.url).origin}/auth/callback`,skipBrowserRedirect:true}});
  if(error||!data.url)return json({error:authMessage(error?.code)},400);
  const target=new URL(data.url),config=project(env)!;
  if(target.origin!==config.url||target.pathname!=='/auth/v1/authorize')return json({error:'Não foi possível iniciar a entrada.'},503);
  return json({redirect:data.url});
 }
 if(action==='verify'||action==='reset'){
  if(!await verifyHuman(request,env,body.captchaToken))return json({error:'Faça a verificação de humano novamente.'},403);
  if(action==='verify'){
   if(!options.phone)return json({error:'A entrada por telefone ainda não está disponível.'},409);
   const {error}=await client.auth.verifyOtp({phone:body.phone,token:body.token,type:'sms'});
   return error?json({error:authMessage(error.code)},400):json({redirect:'/'});
  }
  const verified=await client.auth.getUser();if(verified.error||!verified.data.user)return json({error:'Entre novamente para alterar a senha.'},401);
  const {error}=await client.auth.updateUser({password:body.password});
  return error?json({error:authMessage(error.code)},400):json({redirect:'/'});
 }
 // Supabase validates each Turnstile token once for these native methods.
 // CAPTCHA must be enabled in its Auth settings before accounts go public.
 if(action==='phone'){
  if(!options.phone)return json({error:'A entrada por telefone ainda não está disponível.'},409);
  const {error}=await client.auth.signInWithOtp({phone:body.phone,options:{captchaToken:body.captchaToken}});
  return error?json({error:authMessage(error.code)},400):json({sent:true});
 }
 if(!options.email)return json({error:'A entrada por e-mail ainda não está disponível.'},409);
 if(action==='recover'){
  const {error}=await client.auth.resetPasswordForEmail(body.email,{captchaToken:body.captchaToken,redirectTo:`${new URL(request.url).origin}/auth/callback?flow=recovery`});
  return error?json({error:authMessage(error.code)},400):json({message:'Se este e-mail puder receber a recuperação, você receberá as instruções.'});
 }
 if(action==='signup'){
  if(!options.signup)return json({error:'O cadastro está fechado neste momento.'},409);
  const {data,error}=await client.auth.signUp({email:body.email,password:body.password,options:{captchaToken:body.captchaToken,emailRedirectTo:`${new URL(request.url).origin}/auth/callback`}});
  return error?json({error:authMessage(error.code)},400):json(data.session?{redirect:'/'}:{message:'Confira seu e-mail para confirmar o cadastro antes de entrar.'});
 }
 const {error}=await client.auth.signInWithPassword({email:body.email,password:body.password,options:{captchaToken:body.captchaToken}});
 return error?json({error:authMessage(error.code)},400):json({redirect:'/'});
}
