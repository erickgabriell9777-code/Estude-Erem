import {readFileSync} from "node:fs";
import {categories, compareVersions, parseVersion} from "./versioning.mjs";

export function checkVersion(packageData, entries) {
  parseVersion(packageData.version);
  if (!Number.isSafeInteger(packageData.appBuild) || packageData.appBuild < 1) throw new Error("appBuild deve ser um inteiro positivo.");
  if (!Array.isArray(entries) || !entries.length || entries[0].version !== packageData.version) throw new Error("A primeira entrada de Novidades deve corresponder à versão atual.");
  const seen = new Set();
  for (const entry of entries) {
    parseVersion(entry.version);
    if (seen.has(entry.version)) throw new Error(`Entrada repetida: ${entry.version}`);
    seen.add(entry.version);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) throw new Error(`Data inválida em ${entry.version}.`);
    const keys = Object.keys(entry.categories ?? {});
    if (!keys.length || keys.some(k => !categories.includes(k) || !Array.isArray(entry.categories[k]) || !entry.categories[k].length || entry.categories[k].some(s => typeof s !== "string" || !s.trim()))) throw new Error(`Categorias vazias ou inválidas em ${entry.version}.`);
  }
  for (let i = 1; i < entries.length; i++) if (compareVersions(entries[i-1].version, entries[i].version) <= 0) throw new Error("Novidades devem estar em ordem decrescente.");
  return true;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  const entries = JSON.parse(readFileSync(new URL("../lib/changelog.json", import.meta.url), "utf8"));
  checkVersion(pkg, entries);
  console.log(`Versão ${pkg.version} · build ${pkg.appBuild} · ${entries.length} entrada(s) verificadas.`);
}
