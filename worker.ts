import handler from "vinext/server/fetch-handler";
import { AccessError, authenticateAccess } from "./lib/access-auth";
import { withRequestUser } from "./lib/request-user";
import { createAccessResponse } from "./lib/access-response";
import { appVersion } from "./lib/app-version";

export default {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext): Promise<Response> {
    let user;
    try {
      user = await authenticateAccess(request.headers, env);
    } catch (error) {
      return createAccessResponse(request, error instanceof AccessError ? error : new AccessError(503), appVersion);
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
