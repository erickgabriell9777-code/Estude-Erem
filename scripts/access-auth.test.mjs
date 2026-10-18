import assert from "node:assert/strict";
import { test } from "node:test";
import { generateKeyPair, exportJWK, createLocalJWKSet, SignJWT } from "jose";
import { AccessError, authenticateAccess } from "../lib/access-auth.ts";
import { createAccessResponse } from "../lib/access-response.ts";
import { withRequestUser, getRequestUser } from "../lib/request-user.ts";

const { privateKey, publicKey } = await generateKeyPair("RS256");
const jwk = await exportJWK(publicKey);
const keys = createLocalJWKSet({ keys: [{ ...jwk, kid: "test", alg: "RS256" }] });
const config = { ACCESS_TEAM_DOMAIN: "https://erem-test.cloudflareaccess.com", ACCESS_AUD: "private-app", EREM_ALLOWED_EMAILS: "owner@example.com,partner@example.com" };
const claims = { iss: config.ACCESS_TEAM_DOMAIN, aud: config.ACCESS_AUD, sub: "owner-id", email: "owner@example.com", name: "Owner", exp: Math.floor(Date.now() / 1000) + 600 };
async function token(changes = {}, key = privateKey) {
  return new SignJWT({ ...claims, ...changes }).setProtectedHeader({ alg: "RS256", kid: "test" }).sign(key);
}
const headers = t => new Headers({ "cf-access-jwt-assertion": t });
const denied = status => error => error.status === status;

test("valid signed identity; account ID is stable and provider scoped", async () => {
  const user = await authenticateAccess(headers(await token()), config, keys);
  assert.match(user.userId, /^cf_[0-9a-f]{64}$/);
  assert.equal(user.email, "owner@example.com");
  assert.equal((await authenticateAccess(headers(await token({ name: "Changed" })), config, keys)).userId, user.userId);
});

test("missing configuration and wildcard allowlists stay closed", async () => {
  for (const env of [{}, { ...config, EREM_ALLOWED_EMAILS: "" }, { ...config, EREM_ALLOWED_EMAILS: "*@example.com" }, { ...config, ACCESS_TEAM_DOMAIN: "https://attacker.example" }]) {
    await assert.rejects(authenticateAccess(headers(await token()), env, keys), denied(503));
  }
});

test("ChatGPT headers and forged identity headers never authenticate", async () => {
  await assert.rejects(authenticateAccess(new Headers({ "oai-authenticated-user-id": "owner", "oai-authenticated-user-email": "owner@example.com", "x-erem-user-id": "owner" }), config, keys), denied(401));
});

test("wrong issuer/audience, expired, not-yet-valid and missing claims are rejected", async () => {
  for (const changes of [{ iss: "https://other.cloudflareaccess.com" }, { aud: "different-app" }, { exp: 1 }, { exp: undefined }, { email: undefined }, { sub: "" }, { nbf: Math.floor(Date.now()/1000)+600 }]) {
    await assert.rejects(authenticateAccess(headers(await token(changes)), config, keys), denied(401));
  }
});

test("another user's valid token does not grant beta membership", async () => {
  await assert.rejects(authenticateAccess(headers(await token({ email: "stranger@example.com", sub: "other" })), config, keys), denied(403));
});

test("bad signatures, unsigned tokens and malformed input are rejected", async () => {
  const other = await generateKeyPair("RS256");
  for (const value of [await token({}, other.privateKey), "bad.token", `${Buffer.from('{"alg":"none"}').toString('base64url')}.${Buffer.from(JSON.stringify(claims)).toString('base64url')}.`]) {
    await assert.rejects(authenticateAccess(headers(value), config, keys), denied(401));
  }
});

test("request identity stays isolated across concurrent requests", async () => {
  const owner = await authenticateAccess(headers(await token()), config, keys);
  const partner = await authenticateAccess(headers(await token({ email: "partner@example.com", sub: "partner" })), config, keys);
  assert.notEqual(owner.userId, partner.userId);
  assert.equal(getRequestUser(), null);
  const seen = await Promise.all([owner, partner].map(user => withRequestUser(user, async () => {
    await new Promise(resolve => setTimeout(resolve, 5));
    return getRequestUser().userId;
  })));
  assert.deepEqual(seen, [owner.userId, partner.userId]);
  assert.equal(getRequestUser(), null);
});

test("team hostname and JWKS URL normalize without changing a verified identity", async () => {
  const signed = headers(await token());
  const original = await authenticateAccess(signed, config, keys);
  for (const domain of ["erem-test.cloudflareaccess.com", "https://erem-test.cloudflareaccess.com/", "https://erem-test.cloudflareaccess.com/cdn-cgi/access/certs", " EREM-TEST.cloudflareaccess.com "]) {
    const user = await authenticateAccess(signed, { ...config, ACCESS_TEAM_DOMAIN: domain }, keys);
    assert.equal(user.userId, original.userId);
  }
});

test("domain normalization cannot trust another host, insecure URL, credentials or arbitrary path", async () => {
  for (const domain of ["http://erem-test.cloudflareaccess.com", "https://erem-test.cloudflareaccess.com.attacker.example", "https://attacker.example/erem-test.cloudflareaccess.com", "https://user@erem-test.cloudflareaccess.com", "https://erem-test.cloudflareaccess.com:443", "https://erem-test.cloudflareaccess.com/other", "https://erem-test.cloudflareaccess.com?url=https://attacker.example"]) {
    await assert.rejects(authenticateAccess(headers(await token()), { ...config, ACCESS_TEAM_DOMAIN: domain }, keys), error => error.status === 503 && error.code === "CONFIG_DOMAIN_INVALID");
  }
});

test("browser cookie authenticates only with a valid signed and authorized application token", async () => {
  const cookieHeaders = value => new Headers({ cookie: `other=value; CF_Authorization=${value}; theme=dark` });
  const signed = await token();
  assert.equal((await authenticateAccess(cookieHeaders(signed), config, keys)).email, "owner@example.com");
  await assert.rejects(authenticateAccess(cookieHeaders("forged"), config, keys), denied(401));
  await assert.rejects(authenticateAccess(cookieHeaders(await token({ exp: 1 })), config, keys), denied(401));
  await assert.rejects(authenticateAccess(cookieHeaders(await token({ aud: "other-app" })), config, keys), denied(401));
  await assert.rejects(authenticateAccess(cookieHeaders(await token({ email: "stranger@example.com" })), config, keys), denied(403));
  await assert.rejects(authenticateAccess(new Headers({ cookie: `CF_Authorization=${signed}; CF_Authorization=${signed}` }), config, keys), denied(401));
  const conflicting = cookieHeaders(signed);
  conflicting.set("cf-access-jwt-assertion", "forged");
  await assert.rejects(authenticateAccess(conflicting, config, keys), denied(401));
});

test("configuration failures identify the field without allowing partial email addresses", async () => {
  const cases = [
    [{ ...config, ACCESS_TEAM_DOMAIN: undefined }, "CONFIG_DOMAIN_MISSING"],
    [{ ...config, ACCESS_AUD: undefined, ACESS_AUD: config.ACCESS_AUD }, "CONFIG_AUD_MISSING"],
    [{ ...config, ACCESS_AUD: "private app" }, "CONFIG_AUD_INVALID"],
    [{ ...config, EREM_ALLOWED_EMAILS: "" }, "CONFIG_EMAILS_MISSING"],
    [{ ...config, EREM_ALLOWED_EMAILS: "owner" }, "CONFIG_EMAILS_INVALID"],
    [{ ...config, EREM_ALLOWED_EMAILS: "owner@example.com,*@example.com" }, "CONFIG_EMAILS_INVALID"],
  ];
  for (const [env, code] of cases) {
    await assert.rejects(authenticateAccess(headers(await token()), env, keys), error => error.status === 503 && error.code === code);
  }
});

test("expired sessions, wrong application and unapproved accounts have distinct safe errors", async () => {
  for (const [changes, status, code] of [
    [{ exp: 1 }, 401, "SESSION_EXPIRED"],
    [{ aud: "other-app" }, 401, "ACCESS_AUDIENCE_MISMATCH"],
    [{ iss: "https://other.cloudflareaccess.com" }, 401, "ACCESS_ISSUER_MISMATCH"],
    [{ email: "other@example.com" }, 403, "ACCOUNT_NOT_ALLOWED"],
  ]) {
    await assert.rejects(authenticateAccess(headers(await token(changes)), config, keys), error => error.status === status && error.code === code);
  }
});

test("access responses offer recovery, stay uncacheable, and never reflect request data", async () => {
  const signed = await token();
  const request = new Request("https://app.example/?private=never-reflect-this", { headers: headers(signed) });
  const response = createAccessResponse(request, new AccessError(401, "SESSION_EXPIRED"), "1.2.2");
  const html = await response.text();
  assert.equal(response.status, 401);
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.equal(response.headers.get("X-Erem-Access-Code"), "SESSION_EXPIRED");
  assert.match(html, /href="\/cdn-cgi\/access\/logout"/);
  assert.match(html, /Versão 1\.2\.2/);
  for (const secret of [signed, "never-reflect-this", "owner@example.com"]) assert.ok(!html.includes(secret));
  const api = createAccessResponse(new Request("https://app.example/api/study"), new AccessError(503, "CONFIG_EMAILS_INVALID"), "1.2.2");
  assert.equal(api.status, 503);
  assert.equal((await api.json()).code, "CONFIG_EMAILS_INVALID");
  const account = createAccessResponse(request, new AccessError(403, "ACCOUNT_NOT_ALLOWED"), "1.2.2");
  assert.match(await account.text(), /Trocar conta/);
});
