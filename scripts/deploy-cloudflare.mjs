import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const wrangler = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));
const config = "dist/server/wrangler.json";
const built = JSON.parse(readFileSync(config, "utf8"));
if (built.name !== "estude-erem" || built.assets?.run_worker_first !== true) {
  throw new Error("Build must target estude-erem and protect static assets. Run pnpm run build first.");
}
function run(args, capture = false) {
  const result = spawnSync(process.execPath, [wrangler, ...args], {
    stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit",
    encoding: "utf8",
    env: { ...process.env, CI: "true", WRANGLER_SEND_METRICS: "false" },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  return result.stdout;
}
// CI provisions/reuses the database but does not write its ID back to config.
// Resolve its exact name after deploy and create a migration-only local config.
if (!process.argv.includes("--migrate-only")) run(["deploy", "--config", config]);
const databases = JSON.parse(run(["d1", "list", "--json", "--config", config], true));
const matches = databases.filter(db => db.name === "estude-erem-db");
if (matches.length !== 1 || !/^[a-f0-9-]{36}$/i.test(matches[0].uuid ?? "")) {
  throw new Error("Could not resolve the exact estude-erem-db database. Check its D1 binding before applying migrations.");
}
const migrationsConfig = ".wrangler/erem-migrations.json";
mkdirSync(".wrangler", { recursive: true });
writeFileSync(migrationsConfig, JSON.stringify({
  name: "estude-erem",
  compatibility_date: built.compatibility_date,
  ...(built.account_id ? { account_id: built.account_id } : {}),
  d1_databases: [{ binding: "DB", database_name: "estude-erem-db", database_id: matches[0].uuid, migrations_dir: resolve("drizzle") }],
}, null, 2));
run(["d1", "migrations", "apply", "DB", "--remote", "--config", migrationsConfig]);
