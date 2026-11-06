import { loadCatalogue } from "../../../lib/catalogue";
import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";
import { initialState, reduceStudy, actionSchema, type StudyState } from "../../../lib/study-model";
import { z } from "zod";

export const dynamic = "force-dynamic";
type Row = { state: string; revision: number };
function database() { if(!env.DB) throw new Error("Database unavailable"); return env.DB; }
function json(body: unknown, status = 200) { return Response.json(body, { status, headers: { "Cache-Control": "private, no-store", "Vary": "Cookie" } }); }
async function loadState(userId: string): Promise<Row> {
  const db = database();
  const existing = await db.prepare("SELECT state, revision FROM study_spaces WHERE id = ?").bind(userId).first<Row>();
  if(existing) return existing;
  await db.prepare("INSERT INTO study_spaces (id, state, revision, updated_at) VALUES (?, ?, 0, ?) ON CONFLICT(id) DO NOTHING").bind(userId, JSON.stringify(initialState()), new Date().toISOString()).run();
  const row = await db.prepare("SELECT state, revision FROM study_spaces WHERE id = ?").bind(userId).first<Row>();
  if(!row) throw new Error("State unavailable");
  return row;
}
export async function GET() {
  const user = await getChatGPTUser();
  if(!user) return json({ error: "Entre na sua conta para acessar seus estudos." }, 401);
  try { const catalogue = await loadCatalogue(database()); const row = await loadState(user.userId); const state=JSON.parse(row.state) as StudyState; if(user.email.toLowerCase()==="erickgabriellsilva2008@gmail.com") state.name="Erki"; return json({ state, revision: row.revision, catalogue }); }
  catch(error) { console.error("Study load failed", error); return json({ error: "Não foi possível carregar seus estudos. Tente novamente." }, 503); }
}
const requestSchema = z.object({ revision: z.number().int().min(0), action: z.unknown() }).strict();
export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if(!user) return json({ error: "Sua sessão expirou. Entre novamente." }, 401);
  const origin = request.headers.get("origin");
  if((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "Solicitação não autorizada." }, 403);
  if(!request.headers.get("content-type")?.includes("application/json")) return json({ error: "Formato inválido." }, 415);
  let payload: z.infer<typeof requestSchema>;
  try { const body = await request.text(); if(body.length > 16000) return json({ error: "Solicitação muito grande." }, 413); payload = requestSchema.parse(JSON.parse(body)); }
  catch { return json({ error: "Confira os dados da sua seleção e tente novamente." }, 400); }
  try {
    const catalogue = await loadCatalogue(database());
    const row = await loadState(user.userId);
    if(row.revision !== payload.revision) return json({ error: "Seus estudos foram atualizados em outra aba. Confira e tente novamente.", state: JSON.parse(row.state), revision: row.revision }, 409);
    let state: StudyState;
    try { state = reduceStudy(JSON.parse(row.state), payload.action, new Date(), catalogue); }
    catch(error) { return json({ error: error instanceof Error ? error.message : "Não foi possível concluir esta ação." }, 400); }
    if(user.email.toLowerCase()==="erickgabriellsilva2008@gmail.com") state.name="Erki";
    const result = await database().prepare("UPDATE study_spaces SET state = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?").bind(JSON.stringify(state), new Date().toISOString(), user.userId, row.revision).run();
    if(result.meta.changes !== 1) { const latest = await loadState(user.userId); return json({ error: "Uma atualização chegou antes. Confira e tente novamente.", state: JSON.parse(latest.state), revision: latest.revision }, 409); }
    return json({ state, revision: row.revision + 1 });
  } catch(error) { console.error("Study save failed", error); return json({ error: "Não foi possível salvar. Sua resposta continua na tela; tente novamente." }, 503); }
}
