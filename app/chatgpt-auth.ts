import { getRequestUser } from "../lib/request-user";
import type { AppUser } from "../lib/access-auth";

// Compatibility exports for existing API routes. Authentication now comes
// from verified Access or a verified Supabase account session, never from headers
// that claim a user ID or a browser-provided email.
export type ChatGPTUser = AppUser;
export async function getChatGPTUser(): Promise<AppUser | null> {
  return getRequestUser();
}

export async function requireChatGPTUser(_returnTo: string): Promise<AppUser> {
  const user = getRequestUser();
  if (user) return user;
  // Only the Worker may establish the verified request identity.
  throw new Error("Authenticated request context is unavailable");
}

export function chatGPTSignInPath(returnTo = "/"): string {
  if (!returnTo.startsWith("/") || returnTo.startsWith("//") || returnTo.includes("\\")) return "/";
  return returnTo;
}

export function chatGPTSignOutPath(): string {
  return "/cdn-cgi/access/logout";
}
