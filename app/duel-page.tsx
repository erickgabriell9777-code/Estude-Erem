"use client";
import {useCallback,useEffect,useState} from "react";
import {Swords,Copy,Users,ArrowRight,Loader2,Trophy,CheckCircle2,Clock3} from "lucide-react";
import {Button} from "@/components/ui/button";
type Question={prompt:string;options:string[]};
type Room={code:string;status:"waiting"|"active"|"finished";currentIndex:number;total:number;question:Question|null;myAnswer:number|null;opponentAnswered:boolean;scores:{host:number;guest:number};isHost:boolean;opponentJoined:boolean};
export function DuelPage(){
 const [room,setRoom]=useState<Room|null>(null),[code,setCode]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState(""),[copied,setCopied]=useState(false);
 const request=useCallback(async(method:"GET"|"POST",body?:Record<string,unknown>,roomCode?:string)=>{
  const response=await fetch(roomCode?"/api/duel?code="+encodeURIComponent(roomCode):"/api/duel",{method,headers:method==="POST"?{"Content-Type":"application/json"}:undefined,body:body?JSON.stringify(body):undefined,cache:"no-store"});
  const data=await response.json();
  if(!response.ok)throw new Error(data.error??"Não foi possível acessar o duelo.");
  return data as Room;
 },[]);
 const refresh=useCallback(async()=>{if(!room?.code)return;try{const data=await request("GET",undefined,room.code);setRoom(data);setError("");}catch(e){setError(e instanceof Error?e.message:"Falha ao atualizar.");}},[room?.code,request]);
 useEffect(()=>{if(!room?.code||room.status==="finished")return;const id=window.setInterval(()=>{void refresh();},1800);return()=>window.clearInterval(id);},[room?.code,room?.status,refresh]);
 const create=async()=>{setBusy(true);setError("");try{const data=await request("POST",{action:"create"});setRoom(data);}catch(e){setError(e instanceof Error?e.message:"Não foi possível criar.");}finally{setBusy(false);}};
 const join=async()=>{setBusy(true);setError("");try{const data=await request("POST",{action:"join",code:code.trim().toUpperCase()});setRoom(data);}catch(e){setError(e instanceof Error?e.message:"Não foi possível entrar.");}finally{setBusy(false);}};
 const answer=async(choice:number)=>{if(!room)return;setBusy(true);setError("");try{const data=await request("POST",{action:"answer",code:room.code,questionIndex:room.currentIndex,choice});setRoom(data);}catch(e){setError(e instanceof Error?e.message:"Não foi possível enviar.");}finally{setBusy(false);}};
 const copyCode=async()=>{if(!room)return;try{await navigator.clipboard.writeText(room.code);setCopied(true);window.setTimeout(()=>setCopied(false),1800);}catch{setError("Não foi possível copiar. Compartilhe o código manualmente.");}};
 const reset=()=>{setRoom(null);setCode("");setError("");};
 return <div className="duel-page">
  <section className="duel-hero"><span className="duel-hero-icon"><Swords size={27}/></span><p className="eyebrow">DESAFIO ENTRE ESTUDANTES</p><h1>Duelo de perguntas</h1><p>Convide outra pessoa, responda às mesmas perguntas e veja quem consegue mais pontos.</p></section>
  {!room&&<div className="duel-actions">
   <section className="duel-panel"><h2><Swords size={18} className="inline mr-2"/>Criar um duelo</h2><p className="duel-muted">Gere um código exclusivo e envie para a pessoa que você quer desafiar.</p><Button className="primary-button mt-4 w-full" onClick={()=>void create()} disabled={busy}>{busy?<Loader2 className="animate-spin"/>:<Users/>}Criar duelo</Button></section>
   <section className="duel-panel"><h2><Users size={18} className="inline mr-2"/>Entrar em um duelo</h2><p className="duel-muted">Digite o código que a outra pessoa compartilhou com você.</p><input value={code} onChange={e=>setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6))} placeholder="CÓDIGO" maxLength={6} aria-label="Código do duelo"/><Button variant="outline" className="w-full" onClick={()=>void join()} disabled={busy||code.length!==6}>{busy?<Loader2 className="animate-spin"/>:<ArrowRight/>}Entrar no duelo</Button></section>
  </div>}
  {room&&<section className="duel-panel">
   <div className="flex items-center justify-between gap-3 flex-wrap"><div><p className="eyebrow">SALA DE DUELO</p><h2>{room.status==="waiting"?"Aguardando adversário":room.status==="finished"?"Duelo encerrado":"Partida em andamento"}</h2></div><Button variant="outline" size="sm" onClick={reset}>Sair da tela</Button></div>
   <div className="duel-code"><span>{room.code}</span><Button variant="ghost" size="icon" aria-label="Copiar código" onClick={()=>void copyCode()}><Copy size={18}/></Button></div><p className="duel-muted text-center">{copied?"Código copiado!":room.status==="waiting"?"Envie este código para a outra pessoa entrar.":"Compartilhe o código para identificar a sala."}</p>
   <div className="duel-scoreboard"><div className="duel-score"><span>Você</span><strong>{room.isHost?room.scores.host:room.scores.guest}</strong><small>pontos</small></div><span className="font-bold text-muted-foreground">VS</span><div className="duel-score"><span>Adversário</span><strong>{room.isHost?room.scores.guest:room.scores.host}</strong><small>pontos</small></div></div>
   {room.status==="waiting"&&<div className="duel-status flex items-center gap-2"><Clock3 size={18}/>Aguardando a outra pessoa entrar na sala…</div>}
   {room.status==="active"&&room.question&&<><p className="eyebrow mt-5">PERGUNTA {room.currentIndex+1} DE {room.total}</p><div className="duel-question"><h2>{room.question.prompt}</h2><div className="duel-options">{room.question.options.map((option,index)=><button key={index} className="duel-option" disabled={busy||room.myAnswer!==null} onClick={()=>void answer(index)}><span className="duel-option-letter">{String.fromCharCode(65+index)}</span><span>{option}</span></button>)}</div>{room.myAnswer!==null&&<div className="duel-status">{room.opponentAnswered?"Os dois responderam. Preparando a próxima pergunta…":"Resposta enviada! Aguarde seu adversário."}</div>}</div></>}
   {room.status==="finished"&&<div className="duel-status text-center"><Trophy className="inline mr-2"/>{room.scores.host===room.scores.guest?"Empate!":(room.isHost?room.scores.host>room.scores.guest:room.scores.guest>room.scores.host)?"Você venceu o duelo!":"Seu adversário venceu desta vez."}<p className="mt-2 font-normal">Pontuação final: {room.isHost?room.scores.host:room.scores.guest} × {room.isHost?room.scores.guest:room.scores.host}</p><Button className="mt-4" onClick={reset}>Voltar aos duelos</Button></div>}
  </section>}
  {error&&<p className="duel-error" role="alert">{error}</p>}
  <p className="duel-muted mt-5 text-sm"><CheckCircle2 size={15} className="inline mr-1"/>Cada acerto vale 100 pontos. Os dois jogadores recebem as mesmas perguntas.</p>
 </div>;
}
