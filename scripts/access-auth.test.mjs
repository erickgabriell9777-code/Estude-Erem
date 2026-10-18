import assert from "node:assert/strict";
import { test } from "node:test";
import { generateKeyPair, exportJWK, createLocalJWKSet, SignJWT } from "jose";
import { authenticateAccess } from "../lib/access-auth.ts";
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
