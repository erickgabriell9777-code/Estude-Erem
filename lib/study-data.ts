import {readingUpdateTopics} from "./reading-update";
import {practiceTopics} from "./practice-expansion";
import {readingTopics} from "./reading-sources";
import {moreEngineeringTopics} from "./engineering-more";
import {engineeringTopics} from "./engineering-content";
import {curriculumTopics} from "./curriculum-expansion";
import { notebookTopics } from "./content-notebook-expansion";
import { growthTopics } from "./content-growth";
import { calculusTopics } from "./calculus-content";
import { researchedTopics } from "./researched-content";
import { expandedTopics } from "./expanded-content";
export const subjects = [
  { id: "portugues", name: "Português", short: "Aa", color: "blue", group: "Linguagens" },
  { id: "matematica", name: "Matemática", short: "∑", color: "orange", group: "Exatas" },
  { id: "redacao", name: "Redação", short: "Re", color: "purple", group: "Linguagens" },
  { id: "literatura", name: "Literatura", short: "Li", color: "pink", group: "Linguagens" },
  { id: "historia", name: "História", short: "Hi", color: "orange", group: "Humanas" },
  { id: "geografia", name: "Geografia", short: "Ge", color: "green", group: "Humanas" },
  { id: "biologia", name: "Biologia", short: "Bi", color: "green", group: "Natureza" },
  { id: "fisica", name: "Física", short: "Fi", color: "blue", group: "Natureza" },
  { id: "quimica", name: "Química", short: "Qu", color: "purple", group: "Natureza" },
  { id: "filosofia", name: "Filosofia", short: "Fl", color: "purple", group: "Humanas" },
  { id: "sociologia", name: "Sociologia", short: "So", color: "pink", group: "Humanas" },
  { id: "ingles", name: "Inglês", short: "En", color: "blue", group: "Idiomas" },
  { id: "espanhol", name: "Espanhol", short: "Es", color: "orange", group: "Idiomas" },
  { id: "informatica", name: "Informática", short: "In", color: "blue", group: "Tecnologia" },
  { id: "programacao", name: "Programação", short: "</>", color: "green", group: "Tecnologia" },
  { id: "logica", name: "Raciocínio lógico", short: "Lo", color: "purple", group: "Exatas" },
  { id: "financeira", name: "Educação financeira", short: "$", color: "green", group: "Vida e carreira" },
  { id: "gerais", name: "Conhecimentos gerais", short: "Cg", color: "pink", group: "Vida e carreira" },
  { id: "estatistica", name: "Estatística", short: "Σ", color: "blue", group: "Exatas" },
  { id: "calculo1", name: "Cálculo I", short: "∂", color: "blue", group: "Ensino superior" },
  { id: "calculo2", name: "Cálculo II", short: "∫", color: "purple", group: "Ensino superior" },
  {id:"geometria-analitica",name:"Geometria Analítica",short:"GA",color:"blue",group:"Ensino superior"},
  {id:"engenharia-economica",name:"Engenharia Econômica",short:"EE",color:"green",group:"Ensino superior"},
] as const;
export type SubjectId = typeof subjects[number]["id"];
export type Question = { id: string; subject: SubjectId; level: "Fácil" | "Médio" | "Difícil"; topic: string; prompt: string; options: string[]; answer: number; explanation: string; xp: number; sourceId?: string; bookHint?: import("./book-types").BookHint };
type Row = [SubjectId, string, string[], number, string];
const rows: Row[] = [
  ["portugues", "Em “Nós estudamos todos os dias”, qual é o sujeito?", ["Nós", "Estudamos", "Todos", "Dias"], 0, "O pronome “nós” indica quem pratica a ação de estudar e funciona como sujeito da oração."],
  ["portugues", "Qual frase usa corretamente a crase?", ["Voltei à pé.", "Entreguei à ele.", "Fui à biblioteca.", "Comecei à estudar."], 2, "Em “fui à biblioteca”, a preposição a se une ao artigo a. Não há crase antes de verbo nem em “a pé”."],
  ["portugues", "Em “Embora estivesse cansada, terminou a revisão”, a primeira oração expressa:", ["Causa", "Concessão", "Condição", "Finalidade"], 1, "“Embora” introduz uma concessão: o cansaço poderia impedir a ação, mas ela acontece mesmo assim."],
  ["matematica", "Quanto é 20% de 150?", ["15", "20", "30", "50"], 2, "20% equivale a 0,20. Multiplicando 150 por 0,20, obtemos 30."],
  ["matematica", "Se 3x + 5 = 26, qual é o valor de x?", ["5", "7", "8", "9"], 1, "Subtraia 5 dos dois lados: 3x = 21. Divida por 3: x = 7."],
  ["matematica", "Um produto sobe 20% e depois recebe desconto de 20%. Em relação ao preço inicial, fica:", ["Igual", "4% mais barato", "4% mais caro", "20% mais barato"], 1, "As porcentagens usam bases diferentes. O fator final é 1,20 × 0,80 = 0,96: redução de 4%."],
  ["redacao", "Em um texto argumentativo, a tese é:", ["Uma lista de fontes", "A posição principal defendida", "Qualquer pergunta", "O título obrigatório"], 1, "A tese é a posição central que os argumentos do texto procuram sustentar."],
  ["redacao", "Qual recurso fortalece um argumento?", ["Repetir a tese sem explicar", "Usar somente adjetivos", "Relacionar evidências à ideia defendida", "Evitar exemplos"], 2, "Evidências precisam ser interpretadas e conectadas à tese; apenas citar um dado não basta."],
  ["redacao", "Qual frase apresenta uma generalização sem evidência suficiente?", ["Na turma pesquisada, 12 alunos usam bicicleta.", "O relatório analisou três escolas.", "Um aluno faltou; portanto, todos são desinteressados.", "A conclusão depende dos dados da pesquisa."], 2, "Um caso isolado não permite concluir algo sobre todo um grupo. O argumento generaliza além da evidência."],
  ["literatura", "Uma comparação implícita, como “a vida é uma viagem”, é uma:", ["Metáfora", "Onomatopeia", "Antítese", "Enumeração"], 0, "A metáfora aproxima sentidos sem usar um conectivo comparativo como “tal qual”."],
  ["literatura", "Um narrador em primeira pessoa normalmente:", ["Nunca participa da história", "Narra usando somente “ele”", "Relata a partir de um “eu”", "Sabe obrigatoriamente tudo"], 2, "O narrador em primeira pessoa conta a história a partir de sua perspectiva, como participante ou testemunha."],
  ["literatura", "Dizer que um narrador é pouco confiável significa que:", ["O livro não tem autor", "Seu relato pode distorcer os acontecimentos", "O texto não é ficção", "Não existe enredo"], 1, "O leitor encontra motivos para desconfiar do relato, por limitações, contradições ou interesses do narrador."],
  ["historia", "A Revolução Industrial começou primeiro em qual país?", ["Brasil", "Itália", "Inglaterra", "Japão"], 2, "A industrialização começou na Inglaterra no século XVIII e depois se expandiu para outras regiões."],
  ["historia", "Qual pode ser uma fonte primária para estudar o cotidiano de 1920?", ["Um diário escrito em 1920", "Um resumo escolar de 2020", "Uma resenha recente", "Um filme atual de ficção"], 0, "Um diário produzido na época é um vestígio direto do período. Ainda assim, deve ser analisado criticamente."],
  ["historia", "Qual atitude é adequada ao analisar uma fonte histórica?", ["Ignorar a autoria", "Considerar toda fonte neutra", "Investigar autoria, contexto e propósito", "Usar apenas uma fonte para tudo"], 2, "Contextualizar ajuda a reconhecer perspectivas, interesses e limites das fontes."],
  ["geografia", "Qual movimento da Terra está relacionado à alternância entre dia e noite?", ["Translação", "Rotação", "Precessão", "Erosão"], 1, "A Terra gira em torno de seu próprio eixo. Esse movimento de rotação alterna as áreas iluminadas pelo Sol."],
  ["geografia", "Num mapa de escala 1:100.000, 2 cm representam:", ["200 m", "2 km", "20 km", "200 km"], 1, "2 × 100.000 = 200.000 cm, equivalentes a 2.000 m ou 2 km."],
  ["geografia", "As estações do ano acontecem principalmente devido:", ["À mudança diária da distância ao Sol", "À inclinação do eixo terrestre durante a translação", "À rotação da Lua", "Às marés"], 1, "A inclinação do eixo, combinada à translação, altera a incidência de luz e a duração dos dias ao longo do ano."],
  ["biologia", "Qual estrutura guarda a maior parte do DNA de uma célula eucariótica?", ["Membrana plasmática", "Ribossomo", "Núcleo", "Lisossomo"], 2, "O núcleo abriga a maior parte do material genético. Mitocôndrias e cloroplastos também podem ter DNA próprio."],
  ["biologia", "Na fotossíntese, plantas utilizam energia luminosa para:", ["Produzir matéria orgânica a partir de CO₂ e água", "Transformar oxigênio em ferro", "Eliminar todo o carbono", "Deixar de respirar"], 0, "A fotossíntese armazena energia em moléculas orgânicas. As plantas também realizam respiração celular."],
  ["biologia", "No cruzamento Aa × Aa, com dominância completa, qual a chance de descendente aa?", ["0%", "25%", "50%", "75%"], 1, "As combinações são AA, Aa, Aa e aa. Uma em quatro corresponde a aa: 25%."],
  ["fisica", "Qual é a unidade de força no Sistema Internacional?", ["Joule", "Watt", "Newton", "Metro"], 2, "A força é medida em newtons (N), equivalentes a kg·m/s²."],
  ["fisica", "Um móvel percorre 120 km em 2 horas. Sua velocidade média é:", ["30 km/h", "60 km/h", "120 km/h", "240 km/h"], 1, "Velocidade média é distância dividida pelo tempo: 120 ÷ 2 = 60 km/h."],
  ["fisica", "Uma força resultante de 12 N atua em 3 kg. Qual é a aceleração?", ["4 m/s²", "9 m/s²", "15 m/s²", "36 m/s²"], 0, "Pela segunda lei de Newton, F = m·a. Logo, a = 12/3 = 4 m/s²."],
  ["quimica", "O símbolo químico O representa:", ["Ouro", "Oxigênio", "Ósmio", "Prata"], 1, "O é o símbolo do oxigênio. O símbolo do ouro é Au e o do ósmio é Os."],
  ["quimica", "Um átomo neutro tem 8 prótons. Quantos elétrons ele tem?", ["4", "8", "16", "Não é possível saber"], 1, "Em um átomo neutro, o número de elétrons é igual ao número de prótons."],
  ["quimica", "Qual é a forma balanceada da formação da água?", ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → H₂O", "2H₂ + 2O₂ → H₂O"], 1, "Há 4 átomos de hidrogênio e 2 de oxigênio em cada lado da equação balanceada."],
  ["filosofia", "A ética investiga principalmente:", ["Somente cálculos", "Princípios e critérios das ações humanas", "A classificação de plantas", "Somente regras gramaticais"], 1, "A ética reflete sobre ações, valores, responsabilidades e critérios do que consideramos certo ou errado."],
  ["filosofia", "O diálogo socrático usa perguntas para:", ["Evitar qualquer reflexão", "Examinar crenças e suas justificativas", "Memorizar sem discutir", "Provar que opiniões são fatos"], 1, "As perguntas expõem pressupostos e contradições, incentivando o exame das ideias."],
  ["filosofia", "Atacar a pessoa em vez de examinar seu argumento é conhecido como:", ["Dedução válida", "Analogia", "Ad hominem", "Experimento controlado"], 2, "O ataque pessoal desvia a análise das razões apresentadas para características do interlocutor."],
  ["sociologia", "Socialização é o processo de:", ["Aprender valores e práticas sociais", "Viver sem contato social", "Apagar diferenças culturais", "Estudar apenas números"], 0, "A socialização ocorre nas relações com família, escola, grupos e outras instituições ao longo da vida."],
  ["sociologia", "Etnocentrismo ocorre quando alguém:", ["Busca compreender outra cultura em seu contexto", "Julga outras culturas pelos padrões da própria", "Reconhece a diversidade", "Aprende um novo idioma"], 1, "A perspectiva etnocêntrica toma a própria cultura como referência superior para avaliar outras."],
  ["sociologia", "Duas variáveis aumentarem juntas em uma pesquisa prova que uma causa a outra?", ["Sim, sempre", "Sim, se o gráfico for bonito", "Não; pode haver outros fatores", "Não, porque dados nunca ajudam"], 2, "Correlação não basta para estabelecer causalidade. Outros fatores e o método da pesquisa precisam ser examinados."],
  ["ingles", "Qual palavra significa “livro”?", ["Chair", "Book", "Window", "Pencil"], 1, "“Book” significa livro. “Chair” é cadeira; “window”, janela; “pencil”, lápis."],
  ["ingles", "Complete: “She ___ English every day.”", ["study", "studying", "studies", "to study"], 2, "No presente simples, com she/he/it, “study” passa a “studies”."],
  ["ingles", "Qual frase indica uma ação concluída no passado?", ["I study now.", "I will study tomorrow.", "I studied yesterday.", "I am studying."], 2, "“Studied” está no passado simples, e “yesterday” localiza a ação em ontem."],
  ["espanhol", "“Gracias” significa:", ["Boa noite", "Obrigado / obrigada", "Até amanhã", "Por favor"], 1, "“Gracias” é a expressão de agradecimento em espanhol."],
  ["espanhol", "Complete: “Nosotros ___ estudiantes.”", ["soy", "eres", "somos", "son"], 2, "Com “nosotros”, a forma do verbo ser no presente é “somos”."],
  ["espanhol", "Em espanhol, “apellido” significa:", ["Apelido", "Sobrenome", "Endereço", "Idade"], 1, "“Apellido” é um falso cognato: significa sobrenome. “Apodo” pode corresponder a apelido."],
  ["informatica", "Qual componente armazena temporariamente dados usados por programas?", ["RAM", "Monitor", "Teclado", "Impressora"], 0, "A memória RAM mantém dados em uso e normalmente perde seu conteúdo ao desligar o computador."],
  ["informatica", "Qual prática ajuda a proteger uma conta?", ["Reutilizar a senha em tudo", "Compartilhar códigos de acesso", "Ativar autenticação em dois fatores", "Usar o nome como senha"], 2, "Um segundo fator acrescenta uma etapa de verificação ao acesso, além da senha."],
  ["informatica", "Uma planilha tem 4 em A1, 6 em A2 e 8 em A3. Quanto resulta =SOMA(A1:A3)?", ["10", "14", "18", "468"], 2, "O intervalo A1:A3 inclui as três células. A soma é 4 + 6 + 8 = 18."],
  ["programacao", "Uma variável é usada principalmente para:", ["Dar nome a um valor que o programa utiliza", "Desligar a internet", "Desenhar obrigatoriamente", "Eliminar toda a memória"], 0, "Variáveis permitem referenciar valores e usá-los em expressões e operações."],
  ["programacao", "O que uma estrutura if permite fazer?", ["Repetir para sempre", "Executar um bloco conforme uma condição", "Somar apenas inteiros", "Criar uma senha automaticamente"], 1, "Uma condição decide qual caminho de execução o programa segue."],
  ["programacao", "Começando com total = 0, somamos os valores 1, 2 e 3 em um laço. Qual o total final?", ["3", "5", "6", "123"], 2, "O acumulador passa por 0 → 1 → 3 → 6, somando cada valor ao anterior."],
  ["logica", "Se todas as rosas são flores e esta planta é uma rosa, então:", ["Ela é uma flor", "Todas as flores são rosas", "Ela não é uma flor", "Nada pode ser concluído"], 0, "A planta pertence ao conjunto das rosas, que está incluído no conjunto das flores."],
  ["logica", "Qual é a negação de “Todos os alunos chegaram”?", ["Nenhum aluno chegou", "Pelo menos um aluno não chegou", "Todos saíram", "Alguns chegaram cedo"], 1, "Basta um aluno não ter chegado para que a afirmação universal seja falsa."],
  ["logica", "Se p é verdadeira e q é falsa, qual é o valor de p E q?", ["Verdadeiro", "Falso", "Depende do horário", "Sempre indeterminado"], 1, "Uma conjunção só é verdadeira quando as duas proposições são verdadeiras."],
  ["financeira", "Receita de R$ 800 e despesas de R$ 650 deixam qual saldo?", ["R$ 150", "R$ 650", "R$ 800", "R$ 1.450"], 0, "O saldo é receita menos despesas: 800 − 650 = R$ 150."],
  ["financeira", "Em um exemplo matemático, 10% de desconto sobre R$ 200 resulta em:", ["R$ 190", "R$ 180", "R$ 170", "R$ 20"], 1, "10% de R$ 200 são R$ 20. O preço após o desconto é R$ 180."],
  ["financeira", "Num exemplo de juros compostos de 10% ao período, R$ 100 tornam-se quanto após dois períodos?", ["R$ 110", "R$ 120", "R$ 121", "R$ 200"], 2, "O cálculo é 100 × 1,10 × 1,10 = 121. É um exercício matemático, sem representar uma oferta financeira."],
  ["gerais", "Qual planeta é conhecido como Planeta Vermelho?", ["Vênus", "Marte", "Júpiter", "Netuno"], 1, "Marte tem aparência avermelhada associada a óxidos de ferro em sua superfície."],
  ["gerais", "O instrumento usado para medir a pressão atmosférica é o:", ["Termômetro", "Barômetro", "Cronômetro", "Velocímetro"], 1, "O barômetro mede a pressão exercida pela atmosfera."],
  ["gerais", "Para avaliar uma informação encontrada na internet, o melhor primeiro passo é:", ["Contar emojis", "Confiar só no título", "Verificar autoria, evidências e contexto", "Repassar antes de ler"], 2, "Checar a origem e as evidências, além de comparar fontes confiáveis, ajuda a avaliar a informação."],
];
export const baseQuestions: Question[] = rows.map((r, i) => ({ id: `q-${r[0]}-${i % 3 + 1}`, topic: `topic-${i}`, subject: r[0], level: (["Fácil", "Médio", "Difícil"] as const)[i % 3], prompt: r[1], options: r[2], answer: r[3], explanation: r[4], xp: [15, 25, 40][i % 3] }));
export const subjectName = (id: string) => subjects.find(s => s.id === id)?.name ?? "Estudos";
const topicNames = [
  "Sujeito e predicado", "Crase", "Orações concessivas",
  "Porcentagens", "Equações do 1º grau", "Aumentos e descontos",
  "Tese e ponto de vista", "Construção de argumentos", "Evidências e generalizações",
  "Figuras de linguagem", "Foco narrativo", "Confiabilidade do narrador",
  "Revolução Industrial", "Fontes históricas", "Análise de fontes",
  "Movimentos da Terra", "Escalas cartográficas", "Estações do ano",
  "Estrutura celular", "Fotossíntese", "Genética mendeliana",
  "Grandezas e unidades", "Velocidade média", "Leis de Newton",
  "Elementos químicos", "Estrutura atômica", "Balanceamento de equações",
  "Ética", "Diálogo socrático", "Falácias argumentativas",
  "Socialização", "Cultura e etnocentrismo", "Correlação e causalidade",
  "Vocabulário", "Presente simples", "Passado simples",
  "Expressões do cotidiano", "Verbo ser", "Falsos cognatos",
  "Memória e armazenamento", "Segurança digital", "Fórmulas em planilhas",
  "Variáveis", "Condicionais", "Laços e acumuladores",
  "Dedução e conjuntos", "Negação de proposições", "Conectivos lógicos",
  "Orçamento", "Descontos", "Juros compostos",
  "Sistema Solar", "Instrumentos de medição", "Leitura crítica da informação"
];
export const topics = [...baseQuestions.map((q, i) => ({ id: q.topic, subject: q.subject, name: topicNames[i], summary: q.explanation })), ...expandedTopics, ...researchedTopics, ...calculusTopics, ...growthTopics, ...notebookTopics, ...curriculumTopics, ...engineeringTopics, ...moreEngineeringTopics, ...readingTopics, ...practiceTopics, ...readingUpdateTopics, {id:"topic-1110",subject:"quimica",name:"Estados físicos e transformações da matéria",summary:"Diferencie mudanças de estado e transformações químicas, observando composição e conservação da massa."}];
