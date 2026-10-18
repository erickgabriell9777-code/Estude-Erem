import handler from "vinext/server/fetch-handler";
import { AccessError, authenticateAccess } from "./lib/access-auth";
import { withRequestUser } from "./lib/request-user";

export default {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext): Promise<Response> {
    let user;
    try {
      user = await authenticateAccess(request.headers, env);
    } catch (error) {
      const status = error instanceof AccessError ? error.status : 503;
      const message = status === 503
        ? "O acesso privado ainda está sendo configurado."
        : "Entre com uma conta autorizada para acessar o Estude Erem.";
      const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow" };
      if (new URL(request.url).pathname.startsWith("/api/")) {
        return Response.json({ error: message }, { status, headers });
      }
      return new Response(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Estude Erem · Acesso privado</title><style>body{font:17px/1.6 system-ui;background:#f7f6fc;color:#25213b;margin:0;padding:24px;display:grid;min-height:80dvh;place-items:center}main{max-width:30rem}h1{font-size:28px}a{color:#5b40c4}</style><main><h1>Estude Erem</h1><p>${message}</p><p>Esta versão está fechada para testes.</p></main></html>`, {
        status, headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Access protects static assets too, including document resources. Keep
    // assets.run_worker_first enabled; an unprotected request must not bypass us.
    return withRequestUser(user, async () => {
      const cleanHeaders = new Headers(request.headers);
      for (const key of [...cleanHeaders.keys()]) {
        if (key.startsWith("oai-authenticated-user-") || key.startsWith("x-erem-user-")) cleanHeaders.delete(key);
      }
      const response = await handler.fetch(new Request(request, { headers: cleanHeaders }), env, ctx);
      const outgoing = new Response(response.body, response);
      outgoing.headers.set("Cache-Control", "private, no-store");
      outgoing.headers.set("X-Robots-Tag", "noindex, nofollow");
      outgoing.headers.set("X-Content-Type-Options", "nosniff");
      return outgoing;
    });
  },
};
