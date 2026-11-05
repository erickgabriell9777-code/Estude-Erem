#!/usr/bin/env node
'use strict';

// Audita o banco real do Estude Erem sem depender do build do site.
// A compilação em memória permite reutilizar os módulos TypeScript originais.
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    fileName: filename,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
  });
  const errors = (output.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error);
  if (errors.length) {
    const message = ts.formatDiagnosticsWithColorAndContext(errors, {
      getCurrentDirectory: process.cwd,
      getCanonicalFileName: value => value,
      getNewLine: () => '\n',
    });
    throw new Error(message);
  }
  module._compile(output.outputText, filename);
};

const { subjects, topics } = require('../lib/study-data.ts');
const { questions } = require('../lib/question-bank.ts');
const sourceModules = [
  ['../lib/researched-content.ts', 'sources'],
  ['../lib/calculus-content.ts', 'calculusSources'],
  ['../lib/content-notebook-expansion.ts', 'notebookSources'],
  ['../lib/engineering-content.ts', 'engineeringSources'],
  ['../lib/reading-sources.ts', 'readingSources'],
  ['../lib/coverage-sources.ts', 'coverageSources'],
  ['../lib/portuguese-sources.ts', 'portugueseSources'],
];
const sources = sourceModules.flatMap(([file, key]) => require(file)[key] ?? []);
const sourceIds = new Set(sources.map(source => source.id));
const target = Number(process.env.EREM_QUESTION_TARGET ?? 80);
if (!Number.isInteger(target) || target < 1) throw new Error('EREM_QUESTION_TARGET deve ser um inteiro positivo.');

const subjectById = new Map(subjects.map(subject => [subject.id, subject]));
const topicById = new Map(topics.map(topic => [topic.id, topic]));
const levels = ['Fácil', 'Médio', 'Difícil'];
const stats = new Map(topics.map(topic => [topic.id, {
  topic,
  total: 0,
  levels: Object.fromEntries(levels.map(level => [level, 0])),
}]));
const subjectStats = new Map(subjects.map(subject => [subject.id, {
  subject,
  total: 0,
  topics: 0,
  belowTarget: 0,
  levels: Object.fromEntries(levels.map(level => [level, 0])),
}]));
const failures = [];
const warnings = [];
const ids = new Set();
const prompts = new Map();

function normalize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[“”„"'’‘]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

for (const question of questions) {
  const label = question.id || '(sem id)';
  if (!question.id || ids.has(question.id)) failures.push(`ID ausente ou duplicado: ${label}`);
  ids.add(question.id);

  const subject = subjectById.get(question.subject);
  const topic = topicById.get(question.topic);
  if (!subject) failures.push(`${label}: matéria desconhecida (${question.subject})`);
  if (!topic) failures.push(`${label}: assunto desconhecido (${question.topic})`);
  if (topic && topic.subject !== question.subject) {
    failures.push(`${label}: matéria não corresponde ao assunto ${topic.id}`);
  }

  if (typeof question.prompt !== 'string' || !question.prompt.trim()) failures.push(`${label}: enunciado vazio`);
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    failures.push(`${label}: a questão precisa ter exatamente 4 alternativas`);
  } else {
    const normalizedOptions = question.options.map(normalize);
    if (normalizedOptions.some(option => !option)) failures.push(`${label}: alternativa vazia`);
    if (new Set(normalizedOptions).size !== 4) failures.push(`${label}: alternativas repetidas`);
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= 4) {
      failures.push(`${label}: índice do gabarito inválido`);
    }
  }
  if (typeof question.explanation !== 'string' || question.explanation.trim().length < 12) {
    failures.push(`${label}: explicação ausente ou curta demais`);
  }
  if (question.sourceId && !sourceIds.has(question.sourceId)) {
    warnings.push(`${label}: fonte não encontrada no catálogo de fontes (${question.sourceId})`);
  }

  const promptKey = normalize(question.prompt ?? '');
  if (promptKey) {
    const previous = prompts.get(promptKey);
    if (previous) warnings.push(`Enunciado repetido: ${previous} / ${label}`);
    else prompts.set(promptKey, label);
  }

  const topicStat = stats.get(question.topic);
  if (topicStat) {
    topicStat.total++;
    if (Object.hasOwn(topicStat.levels, question.level)) topicStat.levels[question.level]++;
    else failures.push(`${label}: dificuldade inválida (${question.level})`);
  }
  const subjectStat = subjectStats.get(question.subject);
  if (subjectStat) {
    subjectStat.total++;
    if (Object.hasOwn(subjectStat.levels, question.level)) subjectStat.levels[question.level]++;
  }
}

for (const { topic, total, levels: distribution } of stats.values()) {
  const subjectStat = subjectStats.get(topic.subject);
  if (subjectStat) {
    subjectStat.topics++;
    if (total < target) subjectStat.belowTarget++;
  }
  if (!total) warnings.push(`Assunto sem questões: ${topic.name} (${topic.id})`);
  else if (total < target) warnings.push(`Cobertura abaixo da meta: ${topic.name} — ${total}/${target}`);
  if (total > 0 && levels.filter(level => distribution[level] > 0).length < 3) {
    warnings.push(`Dificuldades incompletas: ${topic.name} (${levels.filter(level => distribution[level] > 0).join(', ') || 'nenhuma'})`);
  }
}

const duplicateWarnings = warnings.filter(item => item.startsWith('Enunciado repetido:'));
const sparse = [...stats.values()].filter(item => item.total < target).sort((a, b) => a.total - b.total || a.topic.name.localeCompare(b.topic.name));
const counts = [...stats.values()].map(item => item.total);
const average = counts.length ? questions.length / counts.length : 0;
const minimum = counts.length ? Math.min(...counts) : 0;
const maximum = counts.length ? Math.max(...counts) : 0;

console.log('\nESTUDE EREM — AUDITORIA DO BANCO DE QUESTÕES');
console.log('='.repeat(48));
console.log(`Matérias: ${subjects.length} | Assuntos: ${topics.length} | Questões: ${questions.length}`);
console.log(`Meta de cobertura: ${target} questões por assunto | Média: ${average.toFixed(1)} | Mínimo: ${minimum} | Máximo: ${maximum}`);
console.log(`Questões com enunciado repetido: ${duplicateWarnings.length}`);
for (const item of duplicateWarnings) console.log(`- ${item}`);
console.log('\nCOBERTURA POR MATÉRIA');
for (const { subject, total, topics: topicCount, belowTarget, levels: distribution } of subjectStats.values()) {
  console.log(
    `- ${subject.name}: ${total} questões em ${topicCount} assuntos; ${belowTarget} abaixo da meta; ` +
    `Fácil ${distribution['Fácil']} / Médio ${distribution['Médio']} / Difícil ${distribution['Difícil']}`
  );
}
console.log(`\nASSUNTOS QUE PRECISAM DE EXPANSÃO (menos de ${target})`);
if (!sparse.length) console.log('Nenhum. Todos os assuntos atingiram a meta.');
else for (const { topic, total, levels: distribution } of sparse) {
  console.log(
    `- [${topic.subject}] ${topic.name} (${topic.id}): ${total}/${target} — ` +
    `F ${distribution['Fácil']} / M ${distribution['Médio']} / D ${distribution['Difícil']}`
  );
}
console.log(`\nIntegridade: ${failures.length} erro(s) crítico(s), ${warnings.length} aviso(s).`);
if (failures.length) {
  console.error('\nERROS QUE PRECISAM SER CORRIGIDOS');
  for (const item of failures.slice(0, 100)) console.error(`- ${item}`);
  if (failures.length > 100) console.error(`... e mais ${failures.length - 100} erro(s).`);
}
if (process.argv.includes('--strict-coverage') && sparse.length) {
  failures.push(`${sparse.length} assunto(s) ainda não atingiram ${target} questões.`);
}
if (failures.length) process.exitCode = 1;
