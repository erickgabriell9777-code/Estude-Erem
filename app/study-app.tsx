"use client";
import {TopicIntroduction} from "./topic-introduction";
import {AnswerFeedback} from "./answer-feedback";
import {TopicProgress} from "./topic-progress";
import {QuestionMaterial} from "./question-material";

import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Timer, Menu, Star, StickyNote, Route, Lightbulb, NotebookPen, Home, Trophy, Palette, ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight, CircleHelp, GraduationCap, History, Layers3, ListOrdered, Loader2, RotateCcw, Settings2, Shuffle, SlidersHorizontal, Sparkles, Target, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./app-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./app-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster, toast } from "sonner";
import type { Catalogue } from "@/lib/catalogue-types";
import { defaultSettings, eligibleQuestions, type Settings } from "@/lib/question-selection";
import type {Action,StudyState} from "@/lib/study-model";
import {initialState} from "@/lib/initial-study-state";

import { Textarea } from "@/components/ui/textarea";
import { BooksPage, BookReferenceHint } from "./books-page";
import { LearningPage, SavedPage } from "./learning-pages";
import { NotebookPage } from "./notebook-page";
import { HomePage, XpPage, ProfilePage, SettingsPage, type MainView as View } from "./study-pages";
import { defaultAppearance, type Appearance } from "@/lib/study-preferences";
const DrawingNotebookWorkspace=lazy(()=>import("./drawing-notebook").then(m=>({default:m.DrawingNotebookWorkspace})));
const StudyTools=lazy(()=>import("./study-tools").then(m=>({default:m.StudyTools})));
const navigation = [{id:"home",label:"Início",icon:Home},{id:"path",label:"Trilhas",icon:Route},{id:"books",label:"Livros",icon:BookOpen},{id:"saved",label:"Materiais",icon:Star},{id:"errors",label:"Revisões",icon:NotebookPen},{id:"xp",label:"Caminho de XP",icon:Trophy},{id:"history",label:"Progresso",icon:History},{id:"profile",label:"Perfil",icon:UserRound},{id:"settings",label:"Configurações",icon:Palette}] as const;
const navigationGroups = [
  {label:"ESTUDAR",ids:["home","path","books"]},
  {label:"ORGANIZAR",ids:["saved","errors","history"]},
  {label:"MINHA CONTA",ids:["xp","profile","settings"]},
] as const;
type Envelope = { state: StudyState; revision: number; error?: string; catalogue?: Catalogue };
const difficultyChoices = [ { value: "all", title: "Misturada", text: "Um pouco de cada", icon: "◈" }, { value: "Fácil", title: "Fácil", text: "Comece pela base", icon: "Ⅰ" }, { value: "Médio", title: "Média", text: "Avance um passo", icon: "Ⅱ" }, { value: "Difícil", title: "Difícil", text: "Teste o que aprendeu", icon: "Ⅲ" } ];

export default function StudyApp({accountLogin=false}:{accountLogin?:boolean}) {
  useEffect(()=>{
    const viewport=window.visualViewport;
    const update=()=>{document.documentElement.style.setProperty('--app-visible-height',`${viewport?.height??window.innerHeight}px`);document.documentElement.style.setProperty('--app-visible-top',`${viewport?.offsetTop??0}px`);};
    update();viewport?.addEventListener('resize',update);viewport?.addEventListener('scroll',update);window.addEventListener('resize',update);
    return()=>{viewport?.removeEventListener('resize',update);viewport?.removeEventListener('scroll',update);window.removeEventListener('resize',update);};
  },[]);
  const [menuOpen,setMenuOpen]=useState(false);
  const [resource,setResource]=useState<{section:string;topic?:string;question?:string}|null>(null);
  const [toolsLoaded,setToolsLoaded]=useState(false);
  useEffect(()=>{const id=setTimeout(()=>setToolsLoaded(true),2000);return()=>clearTimeout(id);},[]);
  const openResource=(section:string,topic?:string,question?:string)=>{const open=()=>{setToolsLoaded(true);setResource({section,topic,question});}; if(["exam","flashcard","daily"].includes(section)) requestTransition(open); else open();};
  const [envelope, setEnvelope] = useState<Envelope>({ state: initialState(), revision: 0 });
  const [catalogue, setCatalogue] = useState<Catalogue>({subjects: [], topics: [], questions: [], sources: []});
  const {subjects, topics, questions, sources} = catalogue;
  const subjectName = (id: string) => subjects.find(s => s.id === id)?.name ?? id;
  const latest = useRef(envelope);
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings });
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const [view, setView] = useState<View>("home");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);
  const [answer, setAnswer] = useState<string>("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [appearanceDraft, setAppearanceDraft] = useState<Appearance>({...defaultAppearance});
  const [name, setName] = useState("");
  const [notebookContext,setNotebookContext]=useState<string|null>(null);
  const [introTopic,setIntroTopic]=useState<string|null>(null);
  const [noteId,setNoteId] = useState<string|null>(null);
  const [noteDrafts,setNoteDrafts] = useState<Record<string,string>>({});
  const [topicOpen, setTopicOpen] = useState<string | null>(null);
  const [discardOpen, setDiscardOpen] = useState(false);
  const pendingTransition = useRef<(()=>void)|null>(null);
  function requestTransition(proceed:()=>void) { const current=latest.current.state.session; if(current&&!current.completedAt){pendingTransition.current=proceed;setDiscardOpen(true);} else proceed(); }
  const [reviewAll, setReviewAll] = useState(false);
  const state = envelope.state;
  const session = state.session;
  const savedAppearance = state.appearance ?? defaultAppearance;
  const appearance = view === "settings" ? appearanceDraft : savedAppearance;
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = appearance.mode; root.dataset.accent = appearance.accent;
    root.dataset.largeText = String(appearance.largeText); root.dataset.reducedMotion = String(appearance.reducedMotion);
    root.classList.toggle("dark", appearance.mode !== "light");
  }, [appearance]);
  const go = (target: View) => { const proceed=()=>{if(target === "profile") setName(state.name); if(target === "settings") setAppearanceDraft(state.appearance ?? {...defaultAppearance}); setView(target); window.scrollTo({top:0,behavior:"instant"});}; if((view==="quiz"&&target!=="quiz")||target==="setup") requestTransition(proceed); else proceed(); };
  const applyEnvelope = useCallback((value: Envelope) => { latest.current = value; setEnvelope(value); }, []);
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/study", { cache: "no-store" });
      const data = await response.json() as Envelope;
      if(!response.ok) throw new Error(data.error ?? "Não foi possível carregar.");
      if(!data.catalogue) throw new Error("Não foi possível carregar o banco de perguntas.");
      setCatalogue(data.catalogue);
      applyEnvelope(data); setAppearanceDraft(data.state.appearance ?? {...defaultAppearance}); setSettings(data.state.lastSettings);
      if(data.state.session && !data.state.session.completedAt) { const i = data.state.session.questions.findIndex((id: string) => !Object.hasOwn(data.state.session!.answers, id)); setQuestionIndex(Math.max(0, i)); }
    } catch(e) { setError(e instanceof Error ? e.message : "Não foi possível carregar seus estudos."); }
    finally { setLoading(false); }
  }, [applyEnvelope]);
  useEffect(() => { void load(); }, [load]);

  const mutate = useCallback(async (action: Action) => {
    if(inFlight.current) return null;
    inFlight.current = true; setBusy(true);
    try {
      const response = await fetch("/api/study", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ revision: latest.current.revision, action }) });
      const data = await response.json() as Envelope;
      if(!response.ok) {
        if(data.state) { applyEnvelope(data); if(action.type !== "appearance" && action.type !== "profile" && action.type !== "save_question") { if(data.state.session && !data.state.session.completedAt) { setQuestionIndex(Math.max(0, data.state.session.questions.findIndex(id => !Object.hasOwn(data.state.session!.answers, id)))); setView("quiz"); setAnswer(""); } else setView(data.state.session?.completedAt ? "result" : "setup"); } }
        throw new Error(data.error ?? "Não foi possível salvar. Tente novamente.");
      }
      applyEnvelope(data); return data as Envelope;
    } catch(e) { toast.error(e instanceof Error ? e.message : "Falha de conexão. Sua escolha continua na tela; tente novamente."); return null; }
    finally { inFlight.current = false; setBusy(false); }
  }, [applyEnvelope]);

  const available = useMemo(() => eligibleQuestions(settings, questions, state.seenCounts ?? Object.fromEntries(Object.keys(state.session?.answers ?? {}).map(id => [id, 1]))).length, [settings, questions, state.seenCounts, state.session]);
  const selectedSubjects = subjects.filter(s => settings.subjects.includes(s.id));
  const selectedTopics = topics.filter(t => settings.topics.includes(t.id));
  const effectiveCount = Math.min(settings.count, available);
  const active = !!session && !session.completedAt;
  const current = session ? questions.find(q => q.id === session.questions[questionIndex]) : undefined;
  const confirmed = !!session && !!current && Object.hasOwn(session.answers, current.id);
  const correctCount = session ? session.questions.filter(id => Object.hasOwn(session.answers, id) && session.answers[id] === questions.find(q => q.id === id)?.answer).length : 0;
  const topicInfo = topics.find(t => t.id === topicOpen);
  const toggleSubject = (id: string, checked: boolean) => setSettings(s => ({ ...s, subjects: checked ? [...new Set([...s.subjects, id])] : s.subjects.filter(x => x !== id), topics: checked ? [...new Set([...s.topics, ...topics.filter(t => t.subject === id).map(t => t.id)])] : s.topics.filter(x => topics.find(t => t.id === x)?.subject !== id) }));
  const toggleTopic = (id: string, checked: boolean) => setSettings(s => ({ ...s, topics: checked ? [...s.topics, id] : s.topics.filter(x => x !== id) }));
  const openProfile = () => { setName(state.name); go("profile"); };
  const moveStep = (n: number) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const start = async () => {
    if(active) { requestTransition(()=>{setView("setup");setAnswer("");}); return; }
    if(available < 1 || effectiveCount < 1) return;
    const result = await mutate({ type: "start", settings: { ...settings, count: effectiveCount } });
    if(result) { setQuestionIndex(0); setAnswer(""); setReviewAll(false); setView("quiz"); window.scrollTo(0, 0); }
  };
  const reviewErrors = async (questionIds:string[]) => {
    requestTransition(()=>{void (async()=>{const result=await mutate({type:"review_errors",questionIds});if(result){setQuestionIndex(0);setAnswer("");setReviewAll(false);setView("quiz");window.scrollTo(0,0);}})();});
  };
  const practiceSaved = async (questionIds:string[]) => {
    requestTransition(()=>{void (async()=>{const result=await mutate({type:"practice_saved",questionIds});if(result){setQuestionIndex(0);setAnswer("");setReviewAll(false);setView("quiz");window.scrollTo(0,0);}})();});
  };
  const favorite = async (questionId:string,value:boolean) => {
    const result=await mutate({type:"save_question",questionId,favorite:value});
    if(result) toast.success(value?"Questão favoritada.":"Favorito removido. Anotações mantidas.");
  };
  const prepareTopic = (id:string) => {
    const topic=topics.find(t=>t.id===id); if(!topic) return;
    const seen=state.seenCounts??Object.fromEntries(Object.keys(state.session?.answers??{}).map(id=>[id,1]));
    const fresh=questions.filter(q=>q.topic===id&&!(seen[q.id]??0)).length;
    setSettings({subjects:[topic.subject],topics:[id],difficulty:"all",order:"ordered",count:Math.min(5,fresh||questions.filter(q=>q.topic===id).length),mode:fresh?"unseen":"review"});
    setStep(2);go("setup");
  };
  const prepareSubjects = () => {
    if(!settings.subjects.length) return;
    requestTransition(()=>{
      setStep(1);
      setView("setup");
      window.scrollTo({top:0,behavior:"instant"});
    });
  };
  const resume = () => { if(!session) return; setQuestionIndex(Math.max(0, session.questions.findIndex(id => !Object.hasOwn(session.answers, id)))); setAnswer(""); setView("quiz"); window.scrollTo(0, 0); };
  const confirm = async () => {
    if(!session || !current || answer === "") return;
    await mutate({ type: "answer", sessionId: session.id, questionId: current.id, answer: Number(answer) });
  };
  const next = () => { if(!session) return; if(questionIndex === session.questions.length - 1) { setView("result"); } else { setQuestionIndex(i => i + 1); setAnswer(""); } window.scrollTo(0, 0); };

  useEffect(() => {
    const context = (document as unknown as { modelContext?: { registerTool: (tool: unknown, options: { signal: AbortSignal }) => unknown } }).modelContext;
    if(!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: unknown) => { try { Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch {} };
    register({ name: "get_study_options", title: "Consultar matérias e assuntos", description: "Consulta matérias, assuntos, níveis e a seleção atual, sem iniciar uma sessão.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute: () => ({ subjects, topics, selection: settingsRef.current, availableQuestions: eligibleQuestions(settingsRef.current, questions, latest.current.state.seenCounts ?? {}).length }) });
    register({ name: "configure_study_session", title: "Preparar sessão de estudo", description: "Prepara os filtros visíveis para revisão pela pessoa. Não inicia a sessão nem registra respostas.", inputSchema: { type: "object", properties: { subjectIds: { type: "array", items: { type: "string" } }, topicIds: { type: "array", items: { type: "string" } }, difficulty: { type: "string", enum: ["all", "Fácil", "Médio", "Difícil"] }, order: { type: "string", enum: ["ordered", "random"] }, count: { type: "integer", minimum: 1, maximum: questions.length } }, required: ["subjectIds", "topicIds", "difficulty", "order", "count"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute: (raw: unknown) => {
      if(!raw || typeof raw !== "object") throw new Error("Seleção inválida.");
      const x = raw as { subjectIds: string[]; topicIds: string[]; difficulty: Settings["difficulty"]; order: Settings["order"]; count: number };
      if(Object.keys(x).some(k => !["subjectIds", "topicIds", "difficulty", "order", "count"].includes(k)) || !Array.isArray(x.subjectIds) || !Array.isArray(x.topicIds) || !x.subjectIds.length || !x.topicIds.length || new Set(x.subjectIds).size !== x.subjectIds.length || new Set(x.topicIds).size !== x.topicIds.length || x.subjectIds.some(id => !subjects.some(s => s.id === id)) || x.topicIds.some(id => !topics.some(t => t.id === id && x.subjectIds.includes(t.subject))) || !["all", "Fácil", "Médio", "Difícil"].includes(x.difficulty) || !["ordered", "random"].includes(x.order) || !Number.isInteger(x.count)) throw new Error("Confira matérias, assuntos, dificuldade, ordem e quantidade.");
      const candidate: Settings = { subjects: x.subjectIds, topics: x.topicIds, difficulty: x.difficulty, order: x.order, count: x.count };
      const count = eligibleQuestions(candidate, questions, latest.current.state.seenCounts ?? {}).length;
      if(x.count < 1 || x.count > count) throw new Error("Quantidade maior que o banco disponível.");
      if(latest.current.state.session && !latest.current.state.session.completedAt) throw new Error("Há uma sessão em andamento.");
      flushSync(() => { setSettings(candidate); setStep(2); setView("setup"); });
      return { staged: true, started: false, availableQuestions: count, selection: candidate };
    } });
    return () => lifecycle.abort();
  }, [catalogue]);

  return <SidebarProvider><Toaster position="top-center" richColors theme={appearance.mode === "light" ? "light" : "dark"} />
    <Sidebar collapsible="none" className="app-sidebar">
      <SidebarHeader className="brand"><span className="brand-mark">e<span /></span><span>estude<span className="brand-erem">erem</span></span></SidebarHeader>
      <SidebarContent className="sidebar-body"><SidebarMenu>
        {navigationGroups.map(group=><div className="sidebar-group" key={group.label}><p className="nav-caption">{group.label}</p>{group.ids.map(id=>{const item=navigation.find(entry=>entry.id===id)!;return <SidebarMenuItem key={id}><SidebarMenuButton className="nav-item" isActive={view === item.id || (item.id === "home" && ["setup","quiz","result"].includes(view))} onClick={()=>go(item.id)}><item.icon/><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>})}</div>)}
      </SidebarMenu></SidebarContent>
      <SidebarFooter className="sidebar-footer"><button className="profile-row" onClick={openProfile}><span className="avatar">{state.name.slice(0, 1).toUpperCase()}</span><span><strong>{state.name}</strong><small>Meu perfil</small></span><Settings2 size={17} /></button></SidebarFooter>
    </Sidebar>

    <div className="app-main">
      <header className="topbar"><div className="breadcrumb"><span className="mobile-brand">erem<span /></span><span className="desktop-crumb">Meu espaço</span><ChevronRight size={14} /><strong>{navigation.find(item=>item.id===view)?.label ?? "Estudar"}</strong></div><div className="topbar-actions"><button className="icon-button" aria-label="Abrir cronômetro" onClick={()=>openResource("timer")}><Timer size={20}/></button><button className="mobile-history icon-button" aria-label="Abrir menu completo" onClick={() => setMenuOpen(true)}><Menu size={20} /></button><button className="top-avatar" aria-label="Abrir meu perfil" onClick={openProfile}>{state.name.slice(0, 1).toUpperCase()}</button></div></header>
      <main className={`workspace workspace-${view}`} id="main-content">
        {error ? <div className="error-panel" role="alert"><CircleHelp /><h1>Vamos tentar de novo?</h1><p>{error}</p><Button onClick={() => void load()}>Tentar novamente</Button></div> : loading ? <div className="loading-panel" aria-label="Carregando seus estudos"><Skeleton className="h-10 w-72" /><Skeleton className="h-5 w-56" /><div className="subject-grid">{Array.from({ length: 6 }, (_, i) => <Skeleton className="h-32 rounded-2xl" key={i} />)}</div></div> : <>
        {!loading && (toolsLoaded||view==="quiz") && <Suspense fallback={<p role="status">Carregando ferramentas…</p>}><StudyTools catalogue={catalogue} state={state} practice={prepareTopic} review={()=>go("errors")} visible={!!resource} initialSection={resource?.section} onClose={()=>setResource(null)} contextTopic={resource?.topic} contextQuestion={resource?.question} showTimer={view==="quiz"}/></Suspense>}
        {view === "path" && <LearningPage state={state} catalogue={catalogue} prepare={setIntroTopic} errors={()=>go("errors")}/>}
        {view === "books" && <BooksPage/>}
        {<div hidden={view !== "saved"}><nav className="context-actions" aria-label="Seus materiais"><Button variant="outline" onClick={()=>setNotebookContext("library")}><NotebookPen size={17}/>Cadernos</Button><Button variant="outline" onClick={()=>openResource("flashcard")}>Flashcards</Button><Button variant="outline" onClick={()=>openResource("summary")}>Resumos</Button><Button variant="outline" onClick={()=>openResource("map")}>Mapas mentais</Button></nav><SavedPage state={state} catalogue={catalogue} busy={busy} edit={setNoteId} toggle={favorite} practice={practiceSaved} resume={resume}/></div>}
        {view === "errors" && <><div className="context-actions"><Button variant="outline" onClick={()=>openResource("analysis")}>Analisar meus erros</Button></div><NotebookPage state={state} catalogue={catalogue} busy={busy} review={reviewErrors} resume={resume} study={()=>go("setup")}/></>}
        {(view === "home" || view === "setup") && <HomePage state={state} catalogue={catalogue} go={go} resume={resume} openResource={openResource} topic={setIntroTopic} selectedSubjects={settings.subjects} toggleSubject={toggleSubject} prepareSubjects={prepareSubjects}/>}
        {view === "xp" && <XpPage state={state} go={go}/>}
        {view === "profile" && <><ProfilePage state={state} name={name} setName={setName} busy={busy} go={go} save={async()=>{const result=await mutate({type:"profile",name:name.trim()}); if(result) toast.success("Perfil atualizado.");}}/><section className="dashboard-card mt-6" aria-label="Sessão da conta"><h2>Sua conta</h2><p className="mb-4">Saia para voltar à tela de entrada. Seu progresso salvo será mantido.</p>{accountLogin ? <form action="/auth/signout" method="post"><Button variant="outline" type="submit" disabled={busy}>Sair da conta</Button></form> : <Button variant="outline" type="button" disabled={busy} onClick={()=>window.location.assign("/cdn-cgi/access/logout")}>Sair da conta</Button>}</section></>}
        {view === "settings" && <SettingsPage draft={appearanceDraft} setDraft={setAppearanceDraft} saved={savedAppearance} busy={busy} save={async()=>{const result=await mutate({type:"appearance",appearance:appearanceDraft}); if(result) toast.success("Aparência salva na sua conta.");}}/>}
        {view === "setup" && <Dialog open onOpenChange={open=>!open&&go("home")}><DialogContent className="session-dialog"><DialogHeader><DialogTitle>Preparar sessão</DialogTitle><DialogDescription>Escolha assuntos, nível e quantidade para praticar.</DialogDescription></DialogHeader>
          <div className="page-heading"><div><p className="eyebrow">SEU PRÓXIMO PASSO</p><h1>O que vamos estudar hoje?</h1><p>Escolha o que quer aprender. A sessão fica do seu jeito.</p></div><span className="catalog-pill"><BookOpen size={16} />{questions.length} questões para começar</span></div>
          {active && <div className="resume-banner"><div><BookOpen size={21} /><span><strong>Seu estudo ficou salvo</strong><small>{Object.keys(session!.answers).length} de {session!.questions.length} questões respondidas</small></span></div><Button onClick={resume}>Continuar sessão <ArrowRight /></Button></div>}
          <div className="setup-layout"><section className="setup-content">
            <nav className="steps" aria-label="Etapas da sessão">{["Matérias", "Assuntos", "Preferências"].map((label, i) => <button key={label} aria-current={step === i ? "step" : undefined} disabled={(i > 0 && !settings.subjects.length) || (i > 1 && !settings.topics.length)} className={`step ${step === i ? "current" : ""} ${step > i ? "done" : ""}`} onClick={() => moveStep(i)}><span>{step > i ? <Check size={14} /> : `0${i + 1}`}</span>{label}{i < 2 && <ChevronRight className="step-arrow" size={16} />}</button>)}</nav>

            {step === 0 && <section className="step-surface"><div className="section-heading"><div><h2>Escolha suas matérias</h2><p>Pode marcar uma ou várias.</p></div><button className="text-button" onClick={() => setSettings(s => ({ ...s, subjects: s.subjects.length === subjects.length ? [] : subjects.map(x => x.id), topics: s.subjects.length === subjects.length ? [] : topics.map(t => t.id) }))}>{settings.subjects.length === subjects.length ? "Limpar seleção" : "Selecionar todas"}</button></div><div className="subject-grid">{subjects.map(s => { const checked = settings.subjects.includes(s.id); return <label className={`subject-card ${checked ? "selected" : ""}`} key={s.id}><div className="subject-card-top"><span className={`subject-symbol ${s.color}`}>{s.short}</span><Checkbox aria-label={`Selecionar ${s.name}`} checked={checked} onCheckedChange={v => toggleSubject(s.id, v === true)} /></div><strong>{s.name}</strong><span className="subject-meta">{s.group}<span>{topics.filter(t => t.subject === s.id).length} assuntos</span></span></label>; })}</div></section>}

            {step === 1 && <section className="step-surface"><div className="section-heading"><div><h2>Em quais assuntos você quer focar?</h2><p>Os assuntos marcados entram na sua sessão.</p></div></div>{settings.subjects.some(id => id === "calculo1" || id === "calculo2") && <div className="study-tip"><span><BookOpen size={19} /></span><div><strong>Cálculo: comece pelo I</strong><p>Os assuntos estão numerados do básico às integrais. Abra o ícone de livro para ler o resumo e as fontes. Para começar, marque os assuntos 01 a 04, dificuldade fácil e ordem por assunto. A divisão entre Cálculo I e II varia por faculdade.</p><a className="text-button" href="https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/syllabus/" target="_blank" rel="noreferrer">Roteiro de referência · MIT OpenCourseWare (inglês)</a></div></div>}{selectedSubjects.map(s => { const list = topics.filter(t => t.subject === s.id); const all = list.every(t => settings.topics.includes(t.id)); return <div className="topic-group" key={s.id}><div className="topic-group-heading"><span className={`subject-symbol small ${s.color}`}>{s.short}</span><h3>{s.name}</h3><button className="text-button" onClick={() => setSettings(v => ({ ...v, topics: all ? v.topics.filter(id => !list.some(t => t.id === id)) : [...new Set([...v.topics, ...list.map(t => t.id)])] }))}>{all ? "Desmarcar" : "Marcar todos"}</button></div>{list.map(t => <div className={`topic-row ${settings.topics.includes(t.id) ? "selected" : ""}`} key={t.id}><label><Checkbox checked={settings.topics.includes(t.id)} onCheckedChange={v => toggleTopic(t.id, v === true)} /><span><strong>{t.name}</strong><small>{questions.filter(q => q.topic === t.id).length} perguntas · fácil, média e difícil</small></span></label><button className="icon-button" aria-label={`Ler sobre ${t.name}`} onClick={() => setTopicOpen(t.id)}><BookOpen size={18} /></button></div>)}</div>; })}</section>}

            {step === 2 && <section className="step-surface preferences"><div className="section-heading"><div><h2>Como você quer praticar?</h2><p>Ajuste a sessão ao seu momento.</p></div></div><fieldset><legend><span>01</span>Qual dificuldade?</legend><RadioGroup value={settings.difficulty} onValueChange={v => setSettings(s => ({ ...s, difficulty: v as Settings["difficulty"] }))} className="difficulty-grid">{difficultyChoices.map(d => <label className={`choice-card ${settings.difficulty === d.value ? "selected" : ""}`} key={d.value}><div><span className="difficulty-icon">{d.icon}</span><RadioGroupItem value={d.value} aria-label={d.title} /></div><strong>{d.title}</strong><small>{d.text}</small></label>)}</RadioGroup></fieldset><fieldset><legend><span>02</span>Em qual ordem?</legend><RadioGroup value={settings.order} onValueChange={v => setSettings(s => ({ ...s, order: v as Settings["order"] }))} className="order-grid"><label className={`order-card ${settings.order === "ordered" ? "selected" : ""}`}><ListOrdered /><span><strong>Na ordem dos assuntos</strong><small>Uma sequência para acompanhar</small></span><RadioGroupItem value="ordered" aria-label="Na ordem dos assuntos" /></label><label className={`order-card ${settings.order === "random" ? "selected" : ""}`}><Shuffle /><span><strong>Aleatória</strong><small>Misture as perguntas selecionadas</small></span><RadioGroupItem value="random" aria-label="Aleatória" /></label></RadioGroup></fieldset><fieldset><legend><span>03</span>Inéditas ou revisão?</legend><RadioGroup value={settings.mode ?? "unseen"} onValueChange={v => setSettings(s => ({...s, mode: v as Settings["mode"]}))} className="order-grid"><label className="order-card"><Sparkles /><span><strong>Só inéditas</strong><small>Perguntas que você ainda não respondeu</small></span><RadioGroupItem value="unseen" aria-label="Só inéditas" /></label><label className="order-card"><RotateCcw /><span><strong>Revisar respondidas</strong><small>Pratique novamente o que já estudou</small></span><RadioGroupItem value="review" aria-label="Revisar respondidas" /></label></RadioGroup></fieldset><fieldset><legend><span>04</span>Quantas perguntas?</legend><div className="quantity-row">{[5, 10, 20].map(n => <button key={n} disabled={n > available} className={`quantity-preset ${effectiveCount === n ? "selected" : ""}`} onClick={() => setSettings(s => ({ ...s, count: n }))}>{n}<small>perguntas</small></button>)}<label className="custom-quantity">Personalizar<input aria-label="Quantidade de perguntas" type="number" min={1} max={available || 1} value={effectiveCount || ""} onChange={e => setSettings(s => ({ ...s, count: e.target.value === "" ? 0 : Math.min(available, Math.max(0, Number(e.target.value))) }))} /></label></div><p className="availability"><CircleHelp size={16} /><span><strong>{available} perguntas disponíveis</strong> com os filtros escolhidos. {settings.mode === "review" ? "Neste modo, entram apenas questões já respondidas." : "Nenhuma questão já respondida entra nesta sessão."}{available === 0 && " Selecione mais assuntos ou alterne entre inéditas e revisão."}</span></p></fieldset></section>}
            <div className="step-footer"><button className="text-button secondary-text" onClick={() => moveStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft size={16} />Voltar</button><span>Etapa {step + 1} de 3</span>{step < 2 ? <Button className="primary-button" disabled={step === 0 ? !settings.subjects.length : !settings.topics.length} onClick={() => moveStep(step + 1)}>{step === 0 ? "Escolher assuntos" : "Personalizar sessão"}<ArrowRight /></Button> : <Button className="primary-button" disabled={!effectiveCount || busy || active} onClick={() => void start()}>{busy ? <Loader2 className="spin" /> : <BookOpen />}Começar a estudar</Button>}</div>
          </section>


          </div>
        </DialogContent></Dialog>}

        {view === "quiz" && session && current && <div className="quiz-layout"><div className="quiz-top"><button className="text-button secondary-text" onClick={() => go("home")}><ArrowLeft size={16} />Sair da atividade</button><span>Questão {questionIndex + 1} de {session.questions.length}</span><Button variant="ghost" aria-label="Abrir rascunho desta questão" title="Abrir rascunho" onClick={()=>setNotebookContext(current.id)}><NotebookPen size={19}/></Button></div><Progress className="quiz-progress" value={Object.keys(session.answers).length / session.questions.length * 100} aria-label="Progresso da sessão" /><div className="question-card"><div className="question-tags"><span className="tag blue">{subjectName(current.subject)}</span><span className="tag neutral">{current.level === "Médio" ? "Média" : current.level}</span></div><p className="question-topic">{topics.find(t => t.id === current.topic)?.name}</p><h1>{current.prompt}</h1><QuestionMaterial id={current.id}/>{current.bookHint&&<BookReferenceHint hint={current.bookHint}/>}<div className="question-help-action"><Button variant="ghost" onClick={()=>openResource("ai",current.topic,current.id)}><CircleHelp size={17}/>Tirar dúvida</Button></div><RadioGroup value={confirmed ? String(session.answers[current.id]) : answer} onValueChange={setAnswer} disabled={confirmed || busy} className="answer-options" aria-label="Alternativas">{current.options.map((option, i) => <label className={`answer-option ${confirmed ? i === current.answer ? "correct" : i === session.answers[current.id] ? "incorrect" : "" : answer === String(i) ? "picked" : ""}`} key={`${current.id}-${i}`}><RadioGroupItem value={String(i)} /><span className="answer-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>{confirmed && i === current.answer && <CheckCircle2 size={20} />}</label>)}</RadioGroup>{confirmed && <div className={`answer-explanation ${session.answers[current.id] === current.answer ? "is-correct" : "is-incorrect"}`} role="status"><small>+{session.answers[current.id] === current.answer ? 10 : 5} XP por esta resposta</small><strong>{session.answers[current.id] === current.answer ? "Resposta certa!" : `A resposta correta é ${String.fromCharCode(65 + current.answer)}.`}</strong><AnswerFeedback question={current} selected={session.answers[current.id]}/>{session.answers[current.id] !== current.answer && <p><NotebookPen size={16} className="inline"/> Questão guardada no seu caderno de erros.</p>}{current.sourceId && sources.filter(s => s.id === current.sourceId).map(s => <p key={s.id}><small>{(current.id.startsWith("coverage-2026-")||current.id.startsWith("portuguese-context-2026-"))?"Questão autoral · Consulte o conceito em:":"Questão original · Referência:"} <a className="underline" href={s.url} target="_blank" rel="noreferrer">{s.publisher} — {s.title}</a></small></p>)}</div>}<div className="question-actions"><span>{confirmed ? "Entenda a explicação antes de seguir." : "Escolha uma alternativa para continuar."}</span><Button className="primary-button" disabled={busy || (!confirmed && answer === "")} onClick={() => confirmed ? next() : void confirm()}>{busy ? <Loader2 className="spin" /> : confirmed ? <ArrowRight /> : <Check />}{confirmed ? questionIndex === session.questions.length - 1 ? "Ver resultado" : "Próxima pergunta" : "Confirmar resposta"}</Button></div></div><div className="quiz-bottom"><span><CheckCircle2 size={16} />{correctCount} {correctCount === 1 ? "acerto" : "acertos"} até agora</span><button className="text-button secondary-text" onClick={() => setDiscardOpen(true)}>Encerrar sessão</button></div></div>}

        {view === "result" && session && session.completedAt && <div className="results"><div className="result-heading"><span className="result-icon"><CheckCircle2 /></span><p className="eyebrow">MAIS UM PASSO DADO</p><h1>Sessão concluída!</h1><p>{correctCount === session.questions.length ? "Você acertou todas. Que tal explorar outro assunto?" : "Cada resposta ajuda a descobrir o que revisar agora."}</p></div><div className="result-stats"><div><strong>{correctCount}<span>/{session.questions.length}</span></strong><p>acertos</p></div><div><strong>{Math.round(correctCount / session.questions.length * 100)}<span>%</span></strong><p>aproveitamento</p></div><div><strong>{session.settings.topics.length}</strong><p>assuntos selecionados</p></div></div><div className="result-actions"><Button className="primary-button" onClick={() => { setView("setup"); moveStep(0); }}>Montar outra sessão <ArrowRight /></Button><Button variant="outline" onClick={() => setReviewAll(v => !v)}>{reviewAll ? "Ocultar revisão" : "Revisar respostas"}<RotateCcw size={16} /></Button></div>{reviewAll && <div className="review-list">{session.questions.map((id, i) => { const q = questions.find(q => q.id === id)!; const right = session.answers[id] === q.answer; return <article key={id} className="review-card"><div><span className={`review-status ${right ? "right" : "wrong"}`}>{right ? <Check size={16} /> : <X size={16} />}</span><span>Questão {i + 1} · {subjectName(q.subject)}</span></div><h3>{q.prompt}</h3><p>Sua resposta: <strong>{q.options[session.answers[id]]}</strong></p>{!right && <p>Resposta correta: <strong>{q.options[q.answer]}</strong></p>}<p className="review-explanation">{q.explanation}</p></article>; })}</div>}</div>}

        {view === "history" && <><nav className="context-actions" aria-label="Análises do progresso"><Button variant="outline" onClick={()=>openResource("charts")}>Gráfico de evolução</Button><Button variant="outline" onClick={()=>openResource("analysis")}>Análise de erros</Button></nav><div className="page-heading"><div><p className="eyebrow">UM PASSO DE CADA VEZ</p><h1>Seu progresso, {state.name}.</h1><p>Veja o que você já praticou e continue de onde parou.</p></div><Button className="primary-button" onClick={() => setView("setup")}>Estudar <ArrowRight /></Button></div><div className="history-stats"><div><span><BookOpen size={20} /></span><strong>{state.stats.answered}</strong><p>perguntas respondidas</p></div><div><span><Target size={20} /></span><strong>{state.stats.answered ? Math.round(state.stats.correct / state.stats.answered * 100) : 0}%</strong><p>de acertos nas tentativas</p></div><div><span><CheckCircle2 size={20} /></span><strong>{state.stats.sessions}</strong><p>sessões concluídas</p></div></div><TopicProgress catalogue={catalogue} state={state} practice={prepareTopic}/><section className="history-panel"><h2>Sessões recentes</h2>{state.history.length ? state.history.map(h => <div className="history-row" key={h.id}><span className="history-book"><BookOpen size={22} /></span><div><strong>{h.subjects.map(subjectName).join(" · ")}</strong><small>{new Date(h.date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></div><span className="history-score"><strong>{h.correct}/{h.total}</strong><small>acertos</small></span></div>) : <Empty className="empty-state"><Layers3 /><EmptyHeader><EmptyTitle>Sua primeira sessão começa aqui</EmptyTitle><EmptyDescription>Escolha uma matéria, pratique e seu resultado aparecerá nesta página.</EmptyDescription></EmptyHeader><Button onClick={() => setView("setup")}>Escolher matérias <ArrowRight /></Button></Empty>}</section></>}
        </>}
        <footer className="app-footer"><span>estude erem</span><span>Seu espaço para aprender.</span></footer>
      </main>
    </div>
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent><DialogHeader><DialogTitle>Seu espaço de estudo</DialogTitle><DialogDescription>Acesse suas matérias, materiais e progresso.</DialogDescription></DialogHeader><nav className="full-menu" aria-label="Todas as páginas">{navigation.map(item=><Button key={item.id} variant={view===item.id?"default":"outline"} onClick={()=>{setMenuOpen(false);go(item.id);}}><item.icon size={18}/>{item.label}</Button>)}</nav></DialogContent></Dialog>
    {introTopic&&<TopicIntroduction id={introTopic} catalogue={catalogue} onClose={()=>setIntroTopic(null)} onPractice={()=>{const id=introTopic;setIntroTopic(null);prepareTopic(id);}}/>}
    {notebookContext&&<Suspense fallback={<div role="status">Abrindo caderno…</div>}><DrawingNotebookWorkspace catalogue={catalogue} question={notebookContext==='library'?undefined:questions.find(q=>q.id===notebookContext)} confirmedAnswers={session?.answers} onClose={()=>setNotebookContext(null)}/></Suspense>}
    <Dialog open={!!noteId} onOpenChange={open=>!open&&setNoteId(null)}><DialogContent><DialogHeader><DialogTitle>Minha anotação</DialogTitle><DialogDescription>{questions.find(q=>q.id===noteId)?.prompt}</DialogDescription></DialogHeader>{noteId&&<form className="note-editor" onSubmit={async e=>{e.preventDefault();const id=noteId;const note=noteDrafts[id]??state.savedQuestions?.[id]?.note??"";const result=await mutate({type:"save_question",questionId:id,note});if(result){setNoteDrafts(d=>{const copy={...d};delete copy[id];return copy;});setNoteId(null);toast.success(note.trim()?"Anotação salva.":"Anotação removida.");}}}><label htmlFor="question-note">O que você quer lembrar?</label><Textarea id="question-note" maxLength={2000} rows={7} value={noteDrafts[noteId]??state.savedQuestions?.[noteId]?.note??""} onChange={e=>setNoteDrafts(d=>({...d,[noteId]:e.target.value}))} placeholder="Escreva sua dúvida, o raciocínio ou uma observação..."/><p className="muted-text">{(noteDrafts[noteId]??state.savedQuestions?.[noteId]?.note??"").length}/2000 caracteres · Salve para manter na sua conta.</p><Button type="submit" disabled={busy||(noteDrafts[noteId]??state.savedQuestions?.[noteId]?.note??"")===(state.savedQuestions?.[noteId]?.note??"")}>{busy?"Salvando…":"Salvar anotação"}</Button></form>}</DialogContent></Dialog>
    <Dialog open={!!topicOpen} onOpenChange={open => !open && setTopicOpen(null)}><DialogContent showCloseButton={false}><button className="dialog-x icon-button" aria-label="Fechar assunto" onClick={() => setTopicOpen(null)}><X size={18} /></button><DialogHeader><DialogTitle>{topicInfo?.name}</DialogTitle><DialogDescription>{topicInfo && subjectName(topicInfo.subject)}</DialogDescription></DialogHeader><p className="topic-summary">{topicInfo?.summary}</p>{sources.filter(source => questions.some(q => q.topic === topicInfo?.id && q.sourceId === source.id)).map(source => <p key={source.id} className="muted-text">Questões originais · Referência: <a className="underline" href={source.url} target="_blank" rel="noreferrer">{source.publisher} — {source.title}</a></p>)}<p className="muted-text">Este assunto tem {questions.filter(q => q.topic === topicInfo?.id).length} perguntas, distribuídas entre fácil, média e difícil.</p><div className="tool-actions"><Button onClick={()=>{const id=topicOpen;setTopicOpen(null);if(id)openResource("guide",id)}}>Estudar passo a passo</Button><Button variant="outline" onClick={() => setTopicOpen(null)}>Fechar</Button></div></DialogContent></Dialog>
    <AlertDialog open={discardOpen} onOpenChange={open=>{if(!busy){setDiscardOpen(open);if(!open)pendingTransition.current=null;}}}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{pendingTransition.current?"Antes de trocar de atividade":"Encerrar esta sessão?"}</AlertDialogTitle><AlertDialogDescription>Escolha continuar na atividade atual ou encerrá-la para seguir. As respostas confirmadas ficam nas suas estatísticas; a sessão encerrada não recebe resultado final.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={busy} onClick={()=>{pendingTransition.current=null;resume();}}>Continuar nesta atividade</AlertDialogCancel><AlertDialogAction onClick={async e => { e.preventDefault(); const result = await mutate({ type: "discard" }); if(result) { const proceed=pendingTransition.current;pendingTransition.current=null;setDiscardOpen(false);setAnswer("");if(proceed)proceed();else setView("home"); } }} disabled={busy}>{busy?"Encerrando…":pendingTransition.current?"Encerrar e continuar":"Encerrar sessão"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    <nav className="mobile-nav" aria-label="Navegação principal">{navigation.filter(item=>["home","books","saved","history"].includes(item.id)).map(item=><button key={item.id} aria-current={view===item.id||(item.id==="home"&&["setup","quiz","result"].includes(view))?"page":undefined} onClick={()=>go(item.id)}><item.icon size={20}/><span>{item.id==="xp"?"XP":item.id==="saved"?"Materiais":item.label}</span></button>)}<button onClick={()=>setMenuOpen(true)} aria-label="Abrir menu completo"><Menu size={20}/><span>Menu</span></button></nav>
  </SidebarProvider>;
}
