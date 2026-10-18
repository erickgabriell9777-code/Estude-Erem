import { getRequestUser } from "../lib/request-user";
import type { AppUser } from "../lib/access-auth";

// Compatibility exports for existing API routes. Authentication now comes
// from the Worker and Cloudflare Access, never from ChatGPT identity headers.
export type ChatGPTUser = AppUser;
export async function getChatGPTUser(): Promise<AppUser | null> {
  return getRequestUser();
}

export async function requireChatGPTUser(_returnTo: string): Promise<AppUser> {
  const user = getRequestUser();
  if (user) return user;
  // No anonymous or mock identity fallback, including in local development.
  throw new Error("Authenticated request context is unavailable");
}

export function chatGPTSignInPath(returnTo = "/"): string {
  if (!returnTo.startsWith("/") || returnTo.startsWith("//") || returnTo.includes("\\")) return "/";
  return returnTo;
}

export function chatGPTSignOutPath(): string {
  return "/cdn-cgi/access/logout";
}
