import type { Question, SubjectId } from "./study-data";
export const sources = [
  { id: "stats-pop", title: "Introductory Statistics 2e — 1.1", publisher: "OpenStax / Rice University", url: "https://openstax.org/books/introductory-statistics-2e/pages/1-1-definitions-of-statistics-probability-and-key-terms", accessedAt: "2026-09-14" },
  { id: "stats-data", title: "Introductory Statistics 2e — 1.2", publisher: "OpenStax / Rice University", url: "https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling", accessedAt: "2026-09-14" },
  { id: "stats-center", title: "Introductory Statistics 2e — 2.5", publisher: "OpenStax / Rice University", url: "https://openstax.org/books/introductory-statistics-2e/pages/2-5-measures-of-the-center-of-the-data", accessedAt: "2026-09-14" },
  { id: "english-comparison", title: "Comparative adjectives", publisher: "British Council", url: "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/comparative-adjectives", accessedAt: "2026-09-14" },
  { id: "bio-passive", title: "Biology 2e — 5.2 Passive Transport", publisher: "OpenStax / Rice University", url: "https://openstax.org/books/biology-2e/pages/5-2-passive-transport", accessedAt: "2026-09-14" },
];
// Original questions and explanations; references support concepts, not copied exercises.
type Row = [Question["level"], string, string[], number, string];
export const researchedTopics: {id:string;subject:SubjectId;name:string;summary:string}[] = [];
export const researchedQuestions: Question[] = [];
function add(subject: SubjectId, name: string, summary: string, sourceId: string, rows: Row[]) {
 const topic = `topic-${90 + researchedTopics.length}`;
 researchedTopics.push({id:topic,subject,name,summary});
 rows.forEach(([level,prompt,options,answer,explanation],i) => researchedQuestions.push({id:`research-${topic}-${i}`,subject,topic,level,prompt,options,answer,explanation,sourceId,xp:10}));
}
add("estatistica","População e amostra","Identifique o conjunto estudado e a parte observada.","stats-pop",[
 ["Fácil","Uma escola consulta 24 de seus 360 alunos. Qual é a amostra?",["Os 24 consultados","Os 360 alunos","As salas","Os professores"],0,"A amostra reúne os participantes observados."],
 ["Fácil","Para estudar todos os alunos de uma escola com 360 alunos, 24 são consultados. Qual é a população?",["Só os ausentes","Os 360 alunos","Só os 24","Os responsáveis"],1,"A população é o conjunto que se pretende estudar."],
 ["Médio","A média calculada apenas nos participantes de uma amostra é uma:",["Estatística amostral","População","Variável textual","Certeza universal"],0,"Ela resume dados da amostra."],
 ["Médio","Resumir respostas já coletadas, sem extrapolar, é estatística:",["Inferencial apenas","Descritiva","Sem dados","Aleatória"],1,"A descrição organiza e resume observações."],
 ["Difícil","Estimar uma característica de toda a escola usando uma amostra envolve:",["Somente contagem total","Inferência","Eliminar incertezas","Trocar a população"],1,"Inferir amplia conclusões além dos dados observados, com incerteza."],
]);
add("estatistica","Tipos de dados","Diferencie categorias, contagens e medidas.","stats-data",[
 ["Fácil","O gênero literário preferido é um dado:",["Qualitativo","Contínuo","Uma distância","Uma duração"],0,"A resposta identifica uma categoria."],
 ["Fácil","O número de janelas de uma sala é quantitativo:",["Contínuo","Discreto","Nominal","Sem unidade possível"],1,"Janelas são contadas em valores inteiros."],
 ["Médio","Qual variável é normalmente contínua?",["Quantidade de lápis","Número de turmas","Duração de uma leitura","Cor da capa"],2,"Durações são medidas e podem assumir valores fracionários."],
 ["Médio","Um código numérico identifica cada ônibus. Esse código representa:",["Uma medida de velocidade","Uma categoria","Uma quantidade de passageiros","Uma média"],1,"Números usados como rótulos não viram medidas."],
 ["Difícil","Arredondar comprimentos para centímetros inteiros torna a grandeza originalmente discreta?",["Sim, sempre","Não","Só acima de um metro","Só abaixo de um metro"],1,"O arredondamento limita o registro, não a natureza contínua do comprimento."],
]);
add("estatistica","Média, mediana e moda","Compare diferentes maneiras de resumir valores.","stats-center",[
 ["Fácil","Qual é a média de 6, 12 e 18?",["9","12","18","36"],1,"Some 36 e divida por três."],
 ["Fácil","Qual é a moda de 4, 7, 7, 9?",["4","7","9","27"],1,"Sete aparece mais vezes."],
 ["Médio","Qual é a mediana de 15, 3, 11, 5, 8?",["3","5","8","11"],2,"Ordenando: 3, 5, 8, 11, 15. O centro é 8."],
 ["Médio","Qual é a mediana de 2, 6, 10, 14?",["6","8","10","14"],1,"A média dos dois centrais é (6 + 10)/2."],
 ["Difícil","Em 5, 6, 7, trocar 7 por 70 preserva qual medida?",["Média","Soma","Mediana","Maior valor"],2,"O valor central continua sendo 6; a média muda."],
]);
add("ingles","Comparativos","Compare características e reconheça formas irregulares.","english-comparison",[
 ["Fácil","Complete: A train is usually ___ than a bicycle. (fast)",["faster","fastest","more fast","fastly"],0,"O comparativo regular de fast recebe -er."],
 ["Fácil","Qual palavra liga os elementos de uma comparação em inglês?",["Then","Than","When","Who"],1,"Than introduz o segundo elemento comparado."],
 ["Médio","Complete: This puzzle is ___ than that one. (difficult)",["difficulter","most difficult","more difficult","difficultest"],2,"Adjetivos longos usam more no comparativo."],
 ["Médio","Complete: My new drawing is ___ than my first one. (good)",["gooder","best","better","more good"],2,"Good tem comparativo irregular: better."],
 ["Difícil","Qual comparativo de busy está correto?",["busyer","busier","more busier","busiest"],1,"Consoante + y muda para i antes de -er."],
]);
add("biologia","Osmose e transporte passivo","Entenda trocas pela membrana e movimento da água.","bio-passive",[
 ["Fácil","Na osmose, qual substância atravessa a membrana?",["Água","Somente proteínas","Somente DNA","Somente amido"],0,"Osmose é transporte de água."],
 ["Fácil","A difusão facilitada pode usar:",["Proteínas de membrana","Somente cromossomos","Parede de concreto","Somente luz"],0,"Canais e transportadores auxiliam a passagem."],
 ["Médio","Duas soluções à mesma pressão são separadas por membrana permeável só à água. Inicialmente, a água tende ao lado:",["Com menos soluto","Com mais soluto","Sem membrana","Sem moléculas"],1,"O gradiente favorece o lado com maior concentração de soluto impermeável."],
 ["Médio","No equilíbrio da difusão, as moléculas:",["Param totalmente","Continuam se movendo","Desaparecem","Viraram ATP"],1,"O movimento continua, mas não há fluxo líquido."],
 ["Difícil","Usar uma proteína torna uma difusão necessariamente ativa?",["Sim","Não","Só em plantas","Só à noite"],1,"Transporte facilitado a favor do gradiente pode ser passivo."],
]);
