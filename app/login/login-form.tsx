'use client';
import {useEffect,useState,type FormEvent} from 'react';
import Link from 'next/link';
import {ArrowRight,ArrowLeft,Mail,Phone,BookOpen,LockKeyhole,Loader2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import type {LoginOptions} from '@/lib/account-auth';
import {appVersion} from '@/lib/app-version';
import {HumanCheck} from './turnstile';
type Mode='signin'|'signup'|'recover'|'phone'|'verify'|'reset';
export function LoginForm({options}:{options:LoginOptions}){
 const [mode,setMode]=useState<Mode>('signin'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[phone,setPhone]=useState('+55'),[code,setCode]=useState('');
 const [captchaToken,setCaptchaToken]=useState(''),[challenge,setChallenge]=useState(0),[busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');
 useEffect(()=>{const query=new URLSearchParams(window.location.search);if(query.get('mode')==='reset')setMode('reset');if(query.has('error'))setError('A entrada não foi concluída. Tente novamente.');},[]);
 function change(next:Mode){setMode(next);setError('');setMessage('');setCaptchaToken('');setChallenge(x=>x+1);setPassword('');}
 async function action(name:string,data:Record<string,string>){
  if(busy||!captchaToken)return;
  setBusy(true);setError('');setMessage('');
  try{
   const response=await fetch(`/auth/${name}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,captchaToken})});
   const body=await response.json() as {error?:string;message?:string;redirect?:string;sent?:boolean};
   if(!response.ok)throw Error(body.error??'Não foi possível concluir. Tente novamente.');
   if(body.redirect){const target=new URL(body.redirect,window.location.origin);if(target.origin===window.location.origin||(/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(target.origin)&&target.pathname==='/auth/v1/authorize')){window.location.assign(target.href);return;}throw Error('Não foi possível iniciar a entrada.');}
   if(body.sent)change('verify');
   if(body.message)setMessage(body.message);
   setPassword('');
  }catch(e){setError(e instanceof Error?e.message:'Não foi possível conectar. Tente novamente.');}
  finally{setBusy(false);setCaptchaToken('');setChallenge(x=>x+1);}
 }
 function submit(event:FormEvent){
  event.preventDefault();
  if(mode==='phone')void action('phone',{phone:phone.replace(/[\s()-]/g,'')});
  else if(mode==='verify')void action('verify',{phone:phone.replace(/[\s()-]/g,''),token:code});
  else if(mode==='recover')void action('recover',{email:email.trim()});
  else if(mode==='reset')void action('reset',{password});
  else void action(mode==='signup'?'signup':'password',{email:email.trim(),password});
 }
 const titles={signin:'Bem-vindo de volta.',signup:'Seu estudo começa aqui.',recover:'Recuperar acesso',phone:'Entrar pelo telefone',verify:'Confira seu celular',reset:'Escolha uma nova senha'};
 const labels={signin:'Entrar',signup:'Criar conta',recover:'Enviar instruções',phone:'Receber código',verify:'Confirmar código',reset:'Salvar nova senha'};
 const available=options.email||options.phone||options.google||options.facebook;
 return <main className="auth-screen"><section className="auth-intro" aria-label="Estude Erem"><Link className="auth-brand" href="/">e<span>estude <strong>erem</strong></span></Link><h1>Aprenda no seu ritmo.</h1><p>Suas matérias, livros, questões e cadernos num só lugar.</p><div className="auth-intro-note"><BookOpen size={22}/><span>Continue seus estudos em qualquer aparelho com a sua conta.</span></div></section><section className="auth-card" aria-labelledby="auth-heading"><div className="auth-card-icon"><LockKeyhole size={23}/></div><h2 id="auth-heading">{titles[mode]}</h2><p className="auth-description">{mode==='signup'?'Crie sua conta para guardar seu progresso.':mode==='verify'?`Digite o código enviado para ${phone}.`:mode==='recover'?'Vamos enviar as instruções para o seu e-mail.':'Entre na sua conta para continuar.'}</p>
 {!options.ready||!available?<p className="auth-message" role="status">As opções de entrada estão sendo preparadas. Tente novamente em instantes.</p>:<>
 
 {(mode==='signin'||mode==='signup')&&<>
 {(options.google||options.facebook)&&<div className="auth-social">{options.google&&<Button variant="outline" disabled={busy||!captchaToken} onClick={()=>void action('oauth',{provider:'google'})}><span className="auth-provider-letter" aria-hidden="true">G</span>Continuar com Google</Button>}{options.facebook&&<Button variant="outline" disabled={busy||!captchaToken} onClick={()=>void action('oauth',{provider:'facebook'})}><span className="auth-provider-letter facebook" aria-hidden="true">f</span>Continuar com Facebook</Button>}</div>}
 {options.email&&options.signup&&<div className="auth-tabs" aria-label="Acesso por e-mail"><Button variant={mode==='signin'?'default':'ghost'} aria-pressed={mode==='signin'} disabled={busy} onClick={()=>change('signin')}>Entrar</Button><Button variant={mode==='signup'?'default':'ghost'} aria-pressed={mode==='signup'} disabled={busy} onClick={()=>change('signup')}>Criar conta</Button></div>}
 </>}
 {(options.email||mode==='phone'||mode==='verify'||mode==='reset')&&<form className="auth-form" onSubmit={submit}>
 {(mode==='signin'||mode==='signup'||mode==='recover')&&options.email&&<label><span>E-mail</span><Input name="email" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} disabled={busy} required maxLength={254} placeholder="voce@exemplo.com"/></label>}
 {(mode==='signin'||mode==='signup'||mode==='reset')&&options.email&&<label><span>{mode==='reset'?'Nova senha':'Senha'}</span><Input name="password" type="password" autoComplete={mode==='signin'?'current-password':'new-password'} value={password} onChange={e=>setPassword(e.target.value)} disabled={busy} required minLength={8} maxLength={128}/>{mode==='signup'&&<small>Use pelo menos 8 caracteres.</small>}</label>}
 {mode==='phone'&&<label><span>Telefone com DDD e código do país</span><Input name="phone" type="tel" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+55 11 99999-9999" disabled={busy} required maxLength={25}/></label>}
 {mode==='verify'&&<label><span>Código recebido por SMS</span><Input name="code" autoComplete="one-time-code" inputMode="numeric" value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))} disabled={busy} required pattern="[0-9]{6,10}" maxLength={10}/></label>}
 <Button type="submit" disabled={busy||!captchaToken}>{busy?<Loader2 className="spin" size={18}/>:null}{busy?'Aguarde…':labels[mode]}<ArrowRight size={17}/></Button>
 </form>}
 
 <div className="auth-secondary">{mode==='signin'&&<>{options.email&&<Button variant="ghost" disabled={busy} onClick={()=>change('recover')}><Mail size={16}/>Esqueci minha senha</Button>}{options.phone&&<Button variant="ghost" disabled={busy} onClick={()=>change('phone')}><Phone size={16}/>Entrar por telefone</Button>}</>}{!['signin','signup'].includes(mode)&&<Button variant="ghost" disabled={busy} onClick={()=>change('signin')}><ArrowLeft size={16}/>Voltar para entrar</Button>}</div>
 </>}
 {error&&<p className="auth-error" role="alert">{error}</p>}{message&&<p className="auth-message" role="status">{message}</p>}<footer className="auth-footer">Estude Erem · {appVersion}</footer></section>{options.ready&&available&&<HumanCheck key={challenge} siteKey={options.siteKey} onToken={setCaptchaToken}/>}</main>;
}
