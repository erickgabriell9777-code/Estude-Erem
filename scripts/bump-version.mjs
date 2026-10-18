import {readFileSync, writeFileSync} from "node:fs";
import {categories, nextVersion} from "./versioning.mjs";
import {checkVersion} from "./check-version.mjs";

const [kind, ...args] = process.argv.slice(2);
const categoryIndex = args.indexOf("--category"), noteIndex = args.indexOf("--note");
const category = categoryIndex >= 0 ? args[categoryIndex + 1] : undefined;
const note = noteIndex >= 0 ? args[noteIndex + 1]?.trim() : undefined;
if (!["patch", "minor", "major"].includes(kind) || !categories.includes(category) || !note) {
  console.error('Uso: node scripts/bump-version.mjs patch|minor|major --category "Correções" --note "Descrição da alteração"');
  process.exit(1);
}
const packagePath = new URL("../package.json", import.meta.url);
const historyPath = new URL("../lib/changelog.json", import.meta.url);
const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
const history = JSON.parse(readFileSync(historyPath, "utf8"));
checkVersion(pkg, history);
const updated = {...pkg, version:nextVersion(pkg.version, kind), appBuild:pkg.appBuild + 1};
const date = new Intl.DateTimeFormat("en-CA", {timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
const nextHistory = [{version:updated.version,date,categories:{[category]:[note]}},...history];
checkVersion(updated, nextHistory);
writeFileSync(packagePath, JSON.stringify(updated,null,2)+"\n");
writeFileSync(historyPath, JSON.stringify(nextHistory,null,2)+"\n");
console.log(`Versão ${updated.version} · build ${updated.appBuild}. Revise a entrada em lib/changelog.json antes de publicar.`);
