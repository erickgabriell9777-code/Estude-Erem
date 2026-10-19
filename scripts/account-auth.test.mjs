// All providers here are local fixtures. No real account, email or SMS is created.
import assert from 'node:assert/strict';
import test from 'node:test';
import {SignJWT} from 'jose';
import {createTestRuntime} from './test-support/cloudflare-runtime.mjs';

const project='https://erem-auth-test.supabase.co';
const users={
 owner:{id:'11111111-1111-4111-8111-111111111111',email:'owner@example.com'},
 partner:{id:'22222222-2222-4222-8222-222222222222',email:'partner@example.com'},
};
const getCookies=r=>(r.headers.getSetCookie?.()??[r.headers.get('set-cookie')].filter(Boolean)).map(c=>c.split(';')[0]).join('; ');

test('normal accounts: CAPTCHA, provider requests, verified sessions and isolated data',async t=>{
 const seen=[];
 const runtime=await createTestRuntime({accountBindings:{
  EREM_ACCESS_MODE:'accounts',SUPABASE_URL:project,SUPABASE_PUBLISHABLE_KEY:'sb_publishable_local_test_key_1234567890',
  TURNSTILE_SITE_KEY:'local-site-key',TURNSTILE_SECRET_KEY:'local-secret-key',SUPABASE_CAPTCHA_ENABLED:'true',
 },outbound:async(request,{jwk,privateKey})=>{
  const url=new URL(request.url);seen.push(`${request.method} ${url.pathname}`);
  if(url.origin==='https://challenges.cloudflare.com'){
   const body=await request.json();assert.equal(body.secret,'local-secret-key');
   return Response.json({success:['human','wrong-host','wrong-action'].includes(body.response),hostname:body.response==='wrong-host'?'evil.example':'localhost',action:body.response==='wrong-action'?'other':'erem_auth'});
  }
  assert.equal(url.origin,project);
  if(url.pathname==='/auth/v1/settings')return Response.json({external:{email:true,google:true,facebook:false,phone:true},disable_signup:false});
  if(url.pathname==='/auth/v1/.well-known/jwks.json')return Response.json({keys:[jwk]});
  if(['/auth/v1/signup','/auth/v1/otp','/auth/v1/recover'].includes(url.pathname)){
   const body=await request.json();assert.equal(body.gotrue_meta_security?.captcha_token,'human');
   return Response.json(url.pathname.endsWith('/signup')?{...users.partner,aud:'authenticated',identities:[]}:{});
  }
  if(url.pathname==='/auth/v1/verify')return Response.json({code:'otp_expired',msg:'expired'},{status:403,headers:{'X-Supabase-Api-Version':'2024-01-01'}});
  if(url.pathname==='/auth/v1/token'){
   const body=await request.json();
   if(url.searchParams.get('grant_type')==='pkce')return Response.json({code:'bad_code',msg:'Invalid code'},{status:400});
   assert.equal(body.gotrue_meta_security?.captcha_token,'human');
   assert.equal(body.password,'Example-pass123');
   const person=body.email===users.owner.email?users.owner:users.partner;
   const jwt=await new SignJWT({email:person.email,role:'authenticated',is_anonymous:false}).setSubject(person.id).setIssuer(`${project}/auth/v1`).setAudience('authenticated').setProtectedHeader({alg:'RS256',kid:jwk.kid}).setIssuedAt().setExpirationTime('1h').sign(privateKey);
   return Response.json({access_token:jwt,token_type:'bearer',expires_in:3600,refresh_token:'local-refresh',user:{...person,aud:'authenticated',role:'authenticated',email_confirmed_at:new Date().toISOString(),app_metadata:{provider:'email'},user_metadata:{}}});
  }
  if(url.pathname==='/auth/v1/logout')return new Response(null,{status:204});
  if(url.pathname==='/auth/v1/user'){
   const header=request.headers.get('authorization')??'';
   const claims=JSON.parse(Buffer.from(header.split('.')[1]??'','base64url').toString());
   return Response.json({...Object.values(users).find(u=>u.id===claims.sub),aud:'authenticated',email_confirmed_at:new Date().toISOString()});
  }
  assert.fail(`Unexpected auth endpoint: ${url.pathname}`);
 }});
 const {mf,token}=runtime;
 const post=(path,body,headers={})=>mf.dispatchFetch(`https://localhost${path}`,{method:'POST',redirect:'manual',headers:{origin:'https://localhost','content-type':'application/json',...headers},body:JSON.stringify(body)});
 try{
  await t.test('anonymous routes and CSS',async()=>{
   const response=await mf.dispatchFetch('https://localhost/',{redirect:'manual'});assert.equal(response.status,303);assert.equal(response.headers.get('location'),'/login');
   assert.equal((await mf.dispatchFetch('https://localhost/api/study')).status,401);
   const login=await mf.dispatchFetch('https://localhost/login');assert.equal(login.status,200);assert.match(await login.text(),/Bem-vindo de volta/);assert.match(login.headers.get('cache-control'),/no-store/);
  });
  await t.test('cross-site, missing CAPTCHA and disabled social provider are rejected',async()=>{
   assert.equal((await post('/auth/password',{email:users.owner.email,password:'Example-pass123',captchaToken:'human'},{origin:'https://evil.example'})).status,403);
   assert.equal((await post('/auth/password',{email:users.owner.email,password:'Example-pass123'})).status,400);
   assert.equal((await post('/auth/oauth',{provider:'facebook',captchaToken:'human'})).status,409);
   for(const captchaToken of ['invalid','wrong-host','wrong-action'])assert.equal((await post('/auth/oauth',{provider:'google',captchaToken})).status,403);
  });
  await t.test('OAuth sets a secure PKCE cookie and cannot choose a redirect',async()=>{
   const response=await post('/auth/oauth',{provider:'google',captchaToken:'human'});assert.equal(response.status,200);
   const target=new URL((await response.json()).redirect);assert.equal(target.origin,project);assert.equal(target.pathname,'/auth/v1/authorize');assert.equal(target.searchParams.get('redirect_to'),'https://localhost/auth/callback');assert.equal(target.searchParams.get('code_challenge_method'),'s256');
   const cookies=response.headers.get('set-cookie');assert.match(cookies,/HttpOnly/i);assert.match(cookies,/Secure/i);assert.match(cookies,/SameSite=Lax/i);assert.match(cookies,/code-verifier/);
   const callback=await mf.dispatchFetch('https://localhost/auth/callback?code=bad&next=https://evil.example',{redirect:'manual',headers:{cookie:getCookies(response)}});assert.equal(callback.status,303);assert.equal(callback.headers.get('location'),'/login?error=callback');
  });
  await t.test('signup, recovery and SMS wait for verification; incorrect codes do not log in',async()=>{
   const signup=await post('/auth/signup',{email:users.partner.email,password:'Example-pass123',captchaToken:'human'});
   assert.equal(signup.status,200);assert.deepEqual(await signup.json(),{message:'Confira seu e-mail para confirmar o cadastro antes de entrar.'});assert.doesNotMatch(signup.headers.get('set-cookie')??'',/access_token/);
   const recover=await post('/auth/recover',{email:users.partner.email,captchaToken:'human'});assert.equal(recover.status,200);assert.match((await recover.json()).message,/Se este e-mail/);
   const sms=await post('/auth/phone',{phone:'+5511999999999',captchaToken:'human'});assert.equal(sms.status,200);assert.deepEqual(await sms.json(),{sent:true});
   const wrongCode=await post('/auth/verify',{phone:'+5511999999999',token:'111111',captchaToken:'human'});assert.equal(wrongCode.status,400);assert.match((await wrongCode.json()).error,/expirou/);
   assert.equal((await post('/auth/reset',{password:'Example-pass123',captchaToken:'human'})).status,401);
  });
  let ownerCookie,partnerCookie;
  await t.test('password uses native provider CAPTCHA and keeps tokens in HttpOnly cookies',async()=>{
   const before=seen.filter(s=>s.includes('/siteverify')).length;
   const login=await post('/auth/password',{email:users.owner.email,password:'Example-pass123',captchaToken:'human'});assert.equal(login.status,200);assert.deepEqual(await login.json(),{redirect:'/'});
   assert.equal(seen.filter(s=>s.includes('/siteverify')).length,before,'Supabase validates native CAPTCHA; do not consume its single-use token first');
   assert.match(login.headers.get('set-cookie'),/HttpOnly/i);assert.match(login.headers.get('set-cookie'),/Secure/i);ownerCookie=getCookies(login);
   const partner=await post('/auth/password',{email:users.partner.email,password:'Example-pass123',captchaToken:'human'});assert.equal(partner.status,200);partnerCookie=getCookies(partner);
   assert.equal((await mf.dispatchFetch('https://localhost/api/study',{headers:{cookie:'sb-erem-auth-test-auth-token=forged'}})).status,401);
  });
  await t.test('both verified identities preserve owner data and partner stays separate',async()=>{
   const cf=await token();
   const owner=await mf.dispatchFetch('https://localhost/api/study',{headers:{cookie:ownerCookie,'cf-access-jwt-assertion':cf}});assert.equal(owner.status,200);
   const state=await owner.json();assert.ok(state.state);assert.ok(state.catalogue.questions.length);
   const db=await mf.getD1Database('DB');const links=await db.prepare('SELECT * FROM auth_identity_links').all();assert.equal(links.results.length,1);assert.match(links.results[0].app_user_id,/^cf_/);
   const partner=await mf.dispatchFetch('https://localhost/api/study',{headers:{cookie:partnerCookie}});assert.equal(partner.status,200);
   const ids=await db.prepare('SELECT id FROM study_spaces').all();assert.equal(new Set(ids.results.map(x=>x.id)).size,2);
  });
  await t.test('logout clears the browser session',async()=>{
   const response=await post('/auth/signout',{}, {cookie:ownerCookie});assert.equal(response.status,303);assert.equal(response.headers.get('location'),'/login');assert.match(response.headers.get('set-cookie'),/Max-Age=0/i);
  });
 }finally{await mf.dispose();}
});
