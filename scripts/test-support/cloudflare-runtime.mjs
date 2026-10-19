// Local integration fixture only. The generated key and users never reach
// production; outbound requests are limited to this fixture's JWKS endpoint.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, readdirSync, realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { generateKeyPair, exportJWK, SignJWT } from "jose";

export const root = fileURLToPath(new URL("../../", import.meta.url));
const require = createRequire(realpathSync(`${root}/node_modules/wrangler/package.json`));
const { Miniflare } = require("miniflare");

export async function createTestRuntime({accountBindings={},outbound}={}) {
  const { publicKey, privateKey } = await generateKeyPair("RS256");
  const jwk = { ...await exportJWK(publicKey), kid: "runtime-test", alg: "RS256" };
  const bindings = {
    EREM_ACCESS_MODE: 'private',
    ACCESS_TEAM_DOMAIN: "https://erem-test.cloudflareaccess.com",
    ACCESS_AUD: "private-app",
    EREM_ALLOWED_EMAILS: "owner@example.com,partner@example.com",
    ...accountBindings,
  };
  const mf = new Miniflare({
    modules: [
      { type: "ESModule", path: `${root}/dist/server/index.js` },
      ...readdirSync(`${root}/dist/server`, { recursive: true })
        .filter(path => path.endsWith(".js") && path !== "index.js")
        .map(path => ({ type: "ESModule", path: `${root}/dist/server/${path}` })),
    ],
    modulesRoot: `${root}/dist/server`,
    modulesRules: [{ type: "ESModule", include: ["**/*.js"] }],
    compatibilityDate: "2026-04-01",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      directory: `${root}/dist/client`, binding: "ASSETS",
      routerConfig: { has_user_worker: true, invoke_user_worker_ahead_of_assets: true },
    },
    bindings,
    d1Databases: { DB: "erem-local-integration-test" },
    cf: false,
    outboundService: async request => {
      if(request.url===`${bindings.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`) return Response.json({ keys: [jwk] });
      if(outbound) return outbound(request,{jwk,privateKey});
      assert.fail(`Unexpected outbound request: ${new URL(request.url).origin}${new URL(request.url).pathname}`);
    },
  });
  try {
    const db = await mf.getD1Database("DB");
    const statements = readdirSync(`${root}/drizzle`).filter(path => path.endsWith(".sql")).sort()
      .flatMap(path => readFileSync(`${root}/drizzle/${path}`, "utf8").split(";")
        .map(sql => sql.replaceAll("--> statement-breakpoint", "").trim()).filter(Boolean));
    await db.batch(statements.map(sql => db.prepare(sql)));
    async function token(email = "owner@example.com", sub = "owner") {
      return new SignJWT({ email, sub, iss: bindings.ACCESS_TEAM_DOMAIN, aud: bindings.ACCESS_AUD })
        .setProtectedHeader({ alg: "RS256", kid: "runtime-test" })
        .setExpirationTime("15m").sign(privateKey);
    }
    return { mf, token };
  } catch (error) {
    await mf.dispose();
    throw error;
  }
}
