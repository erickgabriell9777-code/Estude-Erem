/** Only call with the authenticated headers supplied by the Sites dispatcher.
 * Some deployed dispatcher versions supply verified email but no user ID.
 * Missing authenticated email still fails closed; no client input is used.
 */
export async function dispatchIdentity(userId: string | null, email: string | null): Promise<string | null> {
  const verifiedEmail = email?.trim();
  if (!verifiedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(verifiedEmail)) return null;
  if (userId?.trim()) return userId.trim();
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifiedEmail.toLowerCase()));
  return `dispatch-email:${Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("")}`;
}
