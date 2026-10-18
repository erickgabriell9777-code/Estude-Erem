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
      const authenticatedRequest = new Request(request, { headers: cleanHeaders });
      // vinext deliberately leaves its compiled CSS/JS to Workers Static Assets.
      // With run_worker_first, we must forward these requests ourselves AFTER
      // verifying Access. Delegating them to vinext returns 404 and prevents
      // both the styles and the client-side app from loading.
      const response = new URL(request.url).pathname.startsWith("/_next/static/")
        ? await env.ASSETS.fetch(authenticatedRequest)
        : await handler.fetch(authenticatedRequest, env, ctx);
      const outgoing = new Response(response.body, response);
      outgoing.headers.set("Cache-Control", "private, no-store");
      outgoing.headers.set("X-Robots-Tag", "noindex, nofollow");
      outgoing.headers.set("X-Content-Type-Options", "nosniff");
      outgoing.headers.set("X-Erem-Version", appVersion);
      return outgoing;
    });
  },
};
