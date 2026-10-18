import {coverageSources} from "./coverage-sources";
import {portugueseSources} from "./portuguese-sources";
import {readingSources} from "./reading-sources";
import {engineeringSources} from "./engineering-content";
import {booksRequest} from "./books-server";
import {bookReferences, bookQuestions,referencedQuestions,type BookRecord} from "./book-catalogue";
import { notebookSources } from "./content-notebook-expansion";
import { subjects, topics } from "./study-data";
import { questions } from "./question-bank";
import { sources as researchedSources } from "./researched-content";
import { calculusSources } from "./calculus-content";
const sources = [...researchedSources, ...calculusSources, ...notebookSources, ...engineeringSources, ...readingSources, ...coverageSources, ...portugueseSources];
import type { Catalogue } from "./catalogue-types";
let bookCache:{expires:number;questions:typeof bookQuestions;books:typeof bookReferences}|undefined;
async function loadBooks(){
 if(bookCache&&bookCache.expires>Date.now())return bookCache;
 try{const live=await booksRequest({action:"catalogue"},5000);
 if(!Array.isArray(live.records)||!Array.isArray(live.books))throw new Error("Invalid catalogue");
 const books=live.books as typeof bookReferences;
 const remote=referencedQuestions(live.records as BookRecord[],books);
 bookCache={expires:Date.now()+300000,books,questions:[...new Map([...bookQuestions,...remote].map(q=>[q.id,q])).values()]};
 }catch{bookCache={expires:Date.now()+30000,books:bookReferences,questions:bookQuestions};}
 return bookCache;
}
const release = "catalogue-2026-10-17-concepts-v1";
let cachedCatalogue:{expires:number;data:Catalogue}|undefined;
// Public catalogue only; never cache study state or user annotations.
// Schema belongs to Drizzle. This atomic, idempotent bootstrap only inserts data.
export async function loadCatalogue(db: D1Database): Promise<Catalogue> {
 if(cachedCatalogue&&cachedCatalogue.expires>Date.now())return cachedCatalogue.data;
 const ready = await db.prepare("SELECT id FROM catalogue_releases WHERE id = ?").bind(release).first();
 if (!ready) {
  const statements: D1PreparedStatement[] = [];
  function insert(table: string, columns: string[], keys: string[], rows: unknown[]) {
   for(let i=0;i<rows.length;i+=40) {
    const expressions = keys.map(k => k === "$index" ? "CAST(key AS INTEGER)" : `json_extract(value, '$.${k}')`);
    statements.push(db.prepare(`INSERT INTO ${table} (${columns.join(",")}) SELECT ${expressions.join(",")} FROM json_each(?) WHERE 1 ON CONFLICT(id) DO NOTHING`).bind(JSON.stringify(rows.slice(i,i+40))));
   }
  }
  insert("catalogue_subjects",["id","name","short","color","group_name","position"],["id","name","short","color","group","position"],subjects.map((s,position)=>({...s,position})));
  insert("catalogue_topics",["id","subject_id","name","summary","position"],["id","subject","name","summary","position"],topics.map((t,position)=>({...t,position})));
  insert("catalogue_sources",["id","title","publisher","url","accessed_at"],["id","title","publisher","url","accessedAt"],sources);
  insert("catalogue_questions",["id","topic_id","level","prompt","options","answer","explanation","source_id","position"],["id","topic","level","prompt","options","answer","explanation","sourceId","position"],questions.map((q,position)=>({...q,options:JSON.stringify(q.options),position})));
  statements.push(db.prepare("INSERT INTO catalogue_releases (id, created_at) VALUES (?, ?) ON CONFLICT(id) DO NOTHING").bind(release,new Date().toISOString()));
  await db.batch(statements);
 }
 const results = await db.batch([
  db.prepare('SELECT id, name, short, color, group_name AS "group" FROM catalogue_subjects ORDER BY position'),
  db.prepare('SELECT id, subject_id AS subject, name, summary FROM catalogue_topics ORDER BY position'),
  db.prepare('SELECT q.id, t.subject_id AS subject, q.topic_id AS topic, q.level, q.prompt, q.options, q.answer, q.explanation, q.source_id AS sourceId, 10 AS xp FROM catalogue_questions q JOIN catalogue_topics t ON t.id = q.topic_id ORDER BY q.position'),
  db.prepare('SELECT id, title, publisher, url, accessed_at AS accessedAt FROM catalogue_sources ORDER BY id'),
 ]);
 const books=await loadBooks();
 const base=(results[2].results as Record<string, unknown>[]).map(q=>({...q,id:String(q.id),options:JSON.parse(q.options as string)}));
 const data = { books:books.books, subjects: results[0].results, topics: results[1].results, questions: [...new Map([...base,...books.questions].map(q=>[q.id,q])).values()], sources: results[3].results } as Catalogue;
 cachedCatalogue={expires:Date.now()+60000,data};
 return data;
}
