'use client';
import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {requestedReading} from '@/lib/requested-reading';
export function ReadingList(){
 const [search,setSearch]=useState(''),[count,setCount]=useState(12);
 const norm=(v:string)=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const visible=requestedReading.filter(r=>norm(`${r.title} ${r.author} ${r.category} ${r.status}`).includes(norm(search)));
 return <details className="dashboard-card reading-list"><summary>Lista de referências · {requestedReading.length} materiais</summary><p>Sua lista inclui livros, coleções e acervos de provas. Este catálogo registra o andamento da conferência; uma referência listada não significa que seu PDF esteja disponível.</p><label htmlFor="reading-search">Buscar título, autor ou matéria</label><Input id="reading-search" value={search} onChange={e=>{setSearch(e.target.value);setCount(12)}} placeholder="Ex.: Cálculo, Bechara, História"/><p className="muted-text" role="status">{visible.length} referências</p><div className="book-grid">{visible.slice(0,count).map(r=><article className="book-card" key={r.id}><span className="free-book-category">{r.category} · {r.status}</span><h3>{r.title}</h3><p>{r.author}</p><p className="muted-text">{r.note}</p>{r.url&&<a href={r.url} target="_blank" rel="noreferrer">Consultar publicação / acervo oficial ↗</a>}</article>)}</div>{count<visible.length&&<Button variant="outline" onClick={()=>setCount(v=>v+12)}>Mostrar mais 12</Button>}<p className="muted-text">Para títulos comerciais, adicione sua cópia autorizada em “Adicionar livro ou apostila em PDF”. As questões novas são identificadas como autorais; não representam extração dos 150 materiais.</p></details>
}
export function OfficialReading(){return <section className="dashboard-card"><h2>Leitura e provas nas fontes oficiais</h2><p className="muted-text">Estes acessos abrem o portal da instituição. As marcações feitas no leitor do app não se aplicam a páginas externas.</p><div className="book-grid">{[
['Física Universitária · OpenStax / LibreTexts','Livro digital em português. Cinemática, dinâmica, energia, eletricidade e outros conteúdos.','https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_(OpenStax)'],
['Química Geral para o Enem · CAp-UERJ','3ª edição, 2019. Teoria, questões do Enem e resoluções, em PDF no repositório eduCAPES.','https://educapes.capes.gov.br/bitstream/capes/583363/1/Qu%C3%ADmicaGeralENEM.3ed.2019.Final.pdf'],
['Atlas Geográfico Escolar · IBGE','Versão digital oficial. O PDF completo tem 247 páginas e cerca de 266 MB.','https://atlasescolar.ibge.gov.br/'],
['Cartilha de Redação do Enem 2026','Apresentação e downloads oficiais. O PDF estava temporariamente indisponível durante a conferência.','https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/a-redacao-do-enem-2026-cartilha-do-a-participante'],
['Provas e gabaritos do Enem','Acervo por ano. Na conferência, as provas disponíveis iam até 2025; não foram cadastradas provas de 2026.','https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos'],
['FUVEST · Vestibular 2026','Cadernos das duas fases, gabaritos e respostas esperadas.','https://www.fuvest.br/acervo-vestibular-2026/'],
['Unicamp · provas comentadas','Acervo da Comvest, organizado por ano, com comentários e respostas esperadas.','https://www.comvest.unicamp.br/vestibulares-anteriores/1a-fase-2a-fase-comentadas/']
].map(([title,description,url])=><article className="book-card" key={url}><span className="free-book-category">Fonte oficial · leitura externa</span><h3>{title}</h3><p>{description}</p><a href={url} target="_blank" rel="noreferrer">Abrir leitura oficial ↗</a></article>)}</div></section>}
