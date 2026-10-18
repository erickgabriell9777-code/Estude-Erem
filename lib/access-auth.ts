import { createRemoteJWKSet, errors, jwtVerify } from "jose";

export type AppUser = {
  userId: string;
  displayName: string;
  email: string;
  fullName: string | null;
};

export type AccessSettings = {
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  EREM_ALLOWED_EMAILS?: string;
};

export type AccessErrorCode =
  | "CONFIG_DOMAIN_MISSING" | "CONFIG_DOMAIN_INVALID"
  | "CONFIG_AUD_MISSING" | "CONFIG_AUD_INVALID"
  | "CONFIG_EMAILS_MISSING" | "CONFIG_EMAILS_INVALID"
  | "SESSION_MISSING" | "SESSION_INVALID" | "SESSION_EXPIRED"
  | "ACCESS_AUDIENCE_MISMATCH" | "ACCESS_ISSUER_MISMATCH"
  | "ACCOUNT_NOT_ALLOWED" | "ACCESS_UNAVAILABLE";

export class AccessError extends Error {
  readonly status: 401 | 403 | 503;
  readonly code: AccessErrorCode;
  constructor(status: 401 | 403 | 503, code: AccessErrorCode = "ACCESS_UNAVAILABLE") {
    super(status === 503 ? "Private access is not configured" : "Access denied");
    this.status = status;
    this.code = code;
  }
}

type KeyResolver = ReturnType<typeof createRemoteJWKSet>;
let keyCache: { issuer: string; keys: KeyResolver } | undefined;

function settings(env: AccessSettings) {
  const domain = typeof env.ACCESS_TEAM_DOMAIN === "string" ? env.ACCESS_TEAM_DOMAIN.trim() : "";
  if (!domain) throw new AccessError(503, "CONFIG_DOMAIN_MISSING");
  // Accept the team hostname or the exact JWKS URL copied from Access. The
  // issuer always remains HTTPS on one cloudflareaccess.com tenant; never
  // derive a trusted issuer, key URL or audience from an incoming token.
  const match = domain.match(/^(?:https:\/\/)?([a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.cloudflareaccess\.com)(?:\/(?:cdn-cgi\/access\/certs\/?)?)?$/i);
  if (!match) throw new AccessError(503, "CONFIG_DOMAIN_INVALID");
  const audience = typeof env.ACCESS_AUD === "string" ? env.ACCESS_AUD.trim() : "";
  // Configuration is supplied by the owner, never by a JWT or request header.
  if (!audience) throw new AccessError(503, "CONFIG_AUD_MISSING");
  if (!/^[a-zA-Z0-9_-]{1,256}$/.test(audience)) throw new AccessError(503, "CONFIG_AUD_INVALID");
  const emails = typeof env.EREM_ALLOWED_EMAILS === "string" ? env.EREM_ALLOWED_EMAILS : "";
  const allowed = emails.split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
  if (!allowed.length) throw new AccessError(503, "CONFIG_EMAILS_MISSING");
  if (allowed.some(email => !/^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/.test(email) || email.includes("*"))) {
    throw new AccessError(503, "CONFIG_EMAILS_INVALID");
  }
  return { issuer: `https://${match[1].toLowerCase()}`, audience, allowed };
}

function accessToken(headers: Headers): string | null {
  // The assertion header takes precedence. A cookie is only a token transport,
  // never proof of identity: both paths go through the same JWT verification.
  const assertion = headers.get("cf-access-jwt-assertion");
  if (assertion !== null) return assertion;
  const cookies = (headers.get("cookie") ?? "").split(";").map(value => value.trim());
  const matches = cookies.filter(value => value.startsWith("CF_Authorization="));
  if (matches.length !== 1) return null;
  return matches[0].slice("CF_Authorization=".length);
}

function remoteKeys(issuer: string): KeyResolver {
  if (keyCache?.issuer === issuer) return keyCache.keys;
  const keys = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`), {
    timeoutDuration: 5000,
    cooldownDuration: 30000,
    cacheMaxAge: 600000,
  });
  keyCache = { issuer, keys };
  return keys;
}

// The optional resolver allows tests with real signatures and no network.
export async function authenticateAccess(
  headers: Headers,
  env: AccessSettings,
  resolver?: Parameters<typeof jwtVerify>[1],
): Promise<AppUser> {
  const { issuer, audience, allowed } = settings(env);
  const token = accessToken(headers);
  if (!token) throw new AccessError(401, "SESSION_MISSING");
  if (token.length > 16384) throw new AccessError(401, "SESSION_INVALID");

  let payload;
  try {
    ({ payload } = await jwtVerify(token, resolver ?? remoteKeys(issuer), {
      issuer,
      audience,
      algorithms: ["RS256"],
      requiredClaims: ["iss", "aud", "exp", "sub", "email"],
      clockTolerance: 0,
    }));
  } catch (error) {
    // Never expose a JWT or verification details in a response or log.
    if (error instanceof errors.JWTExpired) throw new AccessError(401, "SESSION_EXPIRED");
    if (error instanceof errors.JWTClaimValidationFailed && error.claim === "aud") {
      throw new AccessError(401, "ACCESS_AUDIENCE_MISMATCH");
    }
    if (error instanceof errors.JWTClaimValidationFailed && error.claim === "iss") {
      throw new AccessError(401, "ACCESS_ISSUER_MISMATCH");
    }
    throw new AccessError(401, "SESSION_INVALID");
  }
  if (typeof payload.email !== "string" || typeof payload.sub !== "string" || !payload.sub) {
    throw new AccessError(401, "SESSION_INVALID");
  }
  const email = payload.email.toLowerCase();
  if (!allowed.includes(email)) throw new AccessError(403, "ACCOUNT_NOT_ALLOWED");

  // New provider identities have their own namespace. Old study data must be
  // migrated explicitly; never attach it to an unverified email automatically.
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${issuer}\0${payload.sub}`));
  const userId = `cf_${Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("")}`;
  const fullName = typeof payload.name === "string" && payload.name.trim() ? payload.name.trim().slice(0, 120) : null;
  return { userId, email, fullName, displayName: fullName ?? email };
}
