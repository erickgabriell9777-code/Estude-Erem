import { AsyncLocalStorage } from "node:async_hooks";
import type { AppUser } from "./access-auth";

// Server-only context populated by worker.ts after Access/session validation.
// It cannot be supplied by an HTTP header or shared between concurrent users.
const users = new AsyncLocalStorage<AppUser>();
export const withRequestUser = <T>(user: AppUser, callback: () => T): T => users.run(user, callback);
export const getRequestUser = (): AppUser | null => users.getStore() ?? null;
