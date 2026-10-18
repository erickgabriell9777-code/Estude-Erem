export const categories = ["Novidades", "Melhorias", "Correções", "Desempenho", "Segurança", "Acessibilidade"];

export function parseVersion(value) {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d?)\.(0|[1-9]\d?)$/.exec(value);
  if (!match) throw new Error(`Versão inválida: ${value}. Use MAJOR.MINOR.PATCH com MINOR/PATCH entre 0 e 59.`);
  const numbers = match.slice(1).map(Number);
  if (numbers[1] > 59 || numbers[2] > 59 || !Number.isSafeInteger(numbers[0])) {
    throw new Error(`Versão fora dos limites: ${value}.`);
  }
  return numbers;
}

export function nextVersion(current, kind) {
  const [major, minor, patch] = parseVersion(current);
  if (kind === "major") return `${major + 1}.0.0`;
  if (kind === "minor") return minor === 59 ? `${major + 1}.0.0` : `${major}.${minor + 1}.0`;
  if (kind === "patch") {
    if (patch < 59) return `${major}.${minor}.${patch + 1}`;
    return minor === 59 ? `${major + 1}.0.0` : `${major}.${minor + 1}.0`;
  }
  throw new Error("Classifique a atualização como patch, minor ou major.");
}

export function compareVersions(a, b) {
  const x = parseVersion(a), y = parseVersion(b);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
}
