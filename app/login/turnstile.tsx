'use client';
import {useEffect,useRef,useState} from 'react';
type API={render:(element:HTMLElement,options:Record<string,unknown>)=>string;remove:(id:string)=>void};
declare global{interface Window{turnstile?:API}}
let scriptPromise:Promise<void>|undefined;
function load(){
 if(window.turnstile)return Promise.resolve();
 if(scriptPromise)return scriptPromise;
 scriptPromise=new Promise<void>((resolve,reject)=>{
  const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;
  script.onload=()=>window.turnstile?resolve():reject(Error('Turnstile unavailable'));script.onerror=()=>{scriptPromise=undefined;reject(Error('Turnstile unavailable'));};document.head.appendChild(script);
 });return scriptPromise;
}
export function HumanCheck({siteKey,onToken}:{siteKey:string;onToken:(value:string)=>void}){
 const element=useRef<HTMLDivElement>(null),callback=useRef(onToken),[failed,setFailed]=useState(false);callback.current=onToken;
 useEffect(()=>{
  let cancelled=false,id:string|undefined;callback.current('');
  void load().then(()=>{if(cancelled||!element.current)return;id=window.turnstile!.render(element.current,{sitekey:siteKey,action:'erem_auth',size:element.current.clientWidth<300?'compact':'flexible',theme:'auto',callback:(token:string)=>callback.current(token),'expired-callback':()=>callback.current(''),'error-callback':()=>{callback.current('');setFailed(true);}});}).catch(()=>!cancelled&&setFailed(true));
  return()=>{cancelled=true;if(id)window.turnstile?.remove(id);};
 },[siteKey]);
 return <div className="auth-human"><div ref={element}/>{failed&&<p role="alert">Não foi possível carregar a verificação. Atualize a página e tente novamente.</p>}</div>;
}
