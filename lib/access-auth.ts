import { createRemoteJWKSet, jwtVerify } from "jose";

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

export class AccessError extends Error {
  readonly status: 401 | 403 | 503;
  constructor(status: 401 | 403 | 503) {
    super(status === 503 ? "Private access is not configured" : "Access denied");
    this.status = status;
  }
}

type KeyResolver = ReturnType<typeof createRemoteJWKSet>;
let keyCache: { issuer: string; keys: KeyResolver } | undefined;

function settings(env: AccessSettings) {
  const domain = env.ACCESS_TEAM_DOMAIN?.trim().replace(/\/$/, "");
  const audience = env.ACCESS_AUD?.trim();
  // Configuration is supplied by the owner, never by a JWT or request header.
  if (!domain || !/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(domain) || !audience) {
    throw new AccessError(503);
  }
  const allowed = (env.EREM_ALLOWED_EMAILS ?? "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
  if (!allowed.length || allowed.some(email => !/^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/.test(email) || email.includes("*"))) {
    throw new AccessError(503);
  }
  return { issuer: domain, audience, allowed };
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
  const token = headers.get("cf-access-jwt-assertion");
  if (!token || token.length > 16384) throw new AccessError(401);

  let payload;
  try {
    ({ payload } = await jwtVerify(token, resolver ?? remoteKeys(issuer), {
      issuer,
      audience,
      algorithms: ["RS256"],
      requiredClaims: ["iss", "aud", "exp", "sub", "email"],
      clockTolerance: 0,
    }));
  } catch {
    // Never expose a JWT or verification details in a response or log.
    throw new AccessError(401);
  }
  if (typeof payload.email !== "string" || typeof payload.sub !== "string" || !payload.sub) {
    throw new AccessError(401);
  }
  const email = payload.email.toLowerCase();
  if (!allowed.includes(email)) throw new AccessError(403);

  // New provider identities have their own namespace. Old study data must be
  // migrated explicitly; never attach it to an unverified email automatically.
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${issuer}\0${payload.sub}`));
  const userId = `cf_${Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("")}`;
  const fullName = typeof payload.name === "string" && payload.name.trim() ? payload.name.trim().slice(0, 120) : null;
  return { userId, email, fullName, displayName: fullName ?? email };
}
