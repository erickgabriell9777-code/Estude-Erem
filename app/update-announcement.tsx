"use client";
import {useEffect,useState} from "react";
import {Sparkles} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle} from "./app-dialog";
import {appVersion,appBuild} from "@/lib/app-version";
import changelog from "@/lib/changelog.json";

const categories=["Novidades","Melhorias","Correções","Desempenho","Segurança","Acessibilidade"] as const;
const seenKey="estude-erem:last-seen-version";

export default function UpdateAnnouncement({enabled}:{enabled:boolean}) {
 const [open,setOpen]=useState(false);
 useEffect(()=>{
  if(!enabled)return;
  try{setOpen(window.localStorage.getItem(seenKey)!==appVersion);}
  catch{setOpen(true);}
 },[enabled]);
 function dismiss(){
  try{window.localStorage.setItem(seenKey,appVersion);}catch{}
  setOpen(false);
 }
 const release=changelog.find(entry=>entry.version===appVersion);
 return <Dialog open={open} onOpenChange={value=>{if(!value)dismiss();}}>
  <DialogContent className="update-announcement" showCloseButton={false}>
   <DialogHeader>
    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Sparkles size={24}/></div>
    <DialogTitle>O Estude Erem foi atualizado!</DialogTitle>
    <DialogDescription>Confira o que chegou nesta versão antes de continuar seus estudos.</DialogDescription>
   </DialogHeader>
   <div className="update-release-meta">Versão {appVersion} · Build {appBuild}</div>
   <div className="update-release-list">
    {release?categories.map(category=>{
     const items=(release.categories as Record<string,string[]|undefined>)[category];
     return items?.length?<section key={category}><h3>{category}</h3><ul>{items.map((item,index)=><li key={index}>{item}</li>)}</ul></section>:null;
    }):<p>Há uma nova versão do aplicativo disponível.</p>}
   </div>
   <Button className="update-announcement-action" onClick={dismiss}>Entendi, vamos estudar</Button>
  </DialogContent>
 </Dialog>;
}
