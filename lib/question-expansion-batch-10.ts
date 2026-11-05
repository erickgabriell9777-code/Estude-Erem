import type { Question } from "./study-data";

type Row = [string, string[], number, string, "Fácil" | "Médio" | "Difícil"];
const groups: { subject: Question["subject"]; topic: string; prefix: string; sourceId: string; rows: Row[] }[] = [
  {
    subject: "ingles", topic: "topic-35", prefix: "exp10-past", sourceId: "exp10-past-simple",
    rows: [
      ["Choose the correct past form: “Yesterday, we ___ a film.”", ["watch", "watched", "watches", "watching"], 1, "The regular verb “watch” takes -ed in the simple past: watched.", "Fácil"],
      ["Complete: “She ___ to school last Monday.”", ["go", "goes", "went", "going"], 2, "“Go” is irregular; its simple past form is “went”.", "Fácil"],
      ["Which sentence is a correct negative in the simple past?", ["They didn't visited the museum.", "They don't visit the museum yesterday.", "They didn't visit the museum.", "They not visited the museum."], 2, "After did not/didn't, use the base form of the main verb: didn't visit.", "Médio"],
      ["Choose the correct question in the simple past.", ["Did you see the match?", "Did you saw the match?", "Do you saw the match?", "Were you see the match?"], 0, "The auxiliary “did” carries the past tense, so the main verb stays in its base form: see.", "Médio"],
      ["What is the simple past of “buy”?", ["Buyed", "Bought", "Buys", "Buying"], 1, "“Buy” is irregular; its simple past and past participle forms are “bought”.", "Fácil"],
      ["Which time expression commonly signals the simple past?", ["Every morning", "At the moment", "Two days ago", "Next week"], 2, "“Two days ago” places the event before the present and commonly appears with the simple past.", "Fácil"],
      ["Complete: “I ___ my keys, but then I found them.”", ["lose", "loses", "lost", "losing"], 2, "The past form of “lose” is “lost”.", "Fácil"],
      ["Choose the correct form of the verb “be” for “They ___ at home last night.”", ["was", "were", "are", "be"], 1, "With “they”, the past form of “be” is “were”.", "Fácil"],
      ["Which sentence describes two completed actions in the past?", ["She cooks and eats every day.", "She cooked dinner and washed the dishes.", "She is cooking now.", "She will cook tomorrow."], 1, "Both verbs, “cooked” and “washed”, describe completed past actions.", "Médio"],
      ["In the sentence “He stopped the car”, why is the final consonant doubled in “stopped”?", ["Because every verb doubles its last letter", "Because a short stressed vowel is followed by a single final consonant in this spelling pattern", "Because the verb is irregular", "Because the sentence is a question"], 1, "For many one-syllable consonant-vowel-consonant verbs, the final consonant is doubled before -ed: stop → stopped.", "Difícil"],
      ["Which sentence correctly uses “did” in a question?", ["Where did they went?", "Where they did go?", "Where did they go?", "Where does they go yesterday?"], 2, "In a simple-past question, use did + subject + base form of the verb.", "Médio"],
      ["Choose the correct past form: “The children ___ very happy.”", ["was", "were", "are", "be"], 1, "“Children” is plural, so the past form of “be” is “were”.", "Fácil"],
      ["Which verb is irregular in the simple past?", ["Clean", "Open", "Arrive", "Write"], 3, "“Write” is irregular; its simple past is “wrote”.", "Fácil"],
      ["What is the correct simple-past sentence?", ["Did Maria called you?", "Maria did called you.", "Maria called you.", "Maria call you yesterday."], 2, "An affirmative simple-past sentence normally uses the past form of the main verb without “did”.", "Médio"],
      ["In “When I was young, I played outside every afternoon”, the simple past expresses:", ["A repeated habit in a finished period of life", "An action happening at this exact moment", "A future plan", "A permanent scientific fact"], 0, "The simple past can describe repeated habits in a finished period, as well as completed events.", "Médio"]
    ]
  },
  {
    subject: "ingles", topic: "topic-34", prefix: "exp10-present", sourceId: "exp10-present-simple",
    rows: [
      ["Choose the correct form: “My brother ___ football on Saturdays.”", ["play", "plays", "playing", "played"], 1, "In the present simple, third-person singular subjects take -s or -es: plays.", "Fácil"],
      ["Complete the negative sentence: “I ___ coffee.”", ["doesn't drink", "don't drink", "not drink", "am not drink"], 1, "Use do not/don't with I, you, we and they, followed by the base verb.", "Fácil"],
      ["Choose the correct question.", ["Does she likes music?", "Do she like music?", "Does she like music?", "Is she like music?"], 2, "With she/he/it, use does + subject + base form of the verb.", "Médio"],
      ["Which sentence expresses a general fact?", ["Water boils at about 100°C at standard atmospheric pressure.", "Water boiled yesterday.", "Water is boiling right now.", "Water will boil tomorrow."], 0, "The present simple is commonly used for general facts and scientific statements.", "Fácil"],
      ["Complete: “They usually ___ breakfast at seven.”", ["has", "having", "have", "had"], 2, "With the subject “they”, the present-simple form is “have”.", "Fácil"],
      ["Which adverb usually indicates frequency?", ["Yesterday", "Tomorrow", "Often", "Last year"], 2, "“Often” describes how frequently an action occurs and commonly accompanies the present simple.", "Fácil"],
      ["Choose the correct sentence.", ["He go to work by bus.", "He goes to work by bus.", "He going to work by bus.", "He gone to work by bus."], 1, "With he/she/it, “go” takes -es: goes.", "Fácil"],
      ["Complete: “___ your parents live nearby?”", ["Does", "Do", "Are", "Is"], 1, "Use “do” to form present-simple questions with the plural subject “your parents”.", "Médio"],
      ["Which sentence is grammatically correct?", ["She doesn't speaks French.", "She don't speak French.", "She doesn't speak French.", "She not speak French."], 2, "After doesn't, the main verb remains in its base form: speak.", "Médio"],
      ["In “The train leaves at 8:30”, the present simple refers to:", ["A fixed timetable or schedule", "An event completed last year", "An action happening only now", "An uncertain past event"], 0, "The present simple can describe fixed schedules, such as public transport timetables.", "Médio"],
      ["Choose the correct form: “My teacher ___ English and history.”", ["teach", "teaches", "teaching", "taught"], 1, "“Teach” ends in -ch, so the third-person singular form adds -es: teaches.", "Fácil"],
      ["Which verb is commonly used in the present simple to describe a state rather than an action?", ["Know", "Run", "Swim", "Write"], 0, "“Know” is a stative verb and is commonly used in simple forms to describe a state.", "Médio"],
      ["Complete: “How often ___ you study English?”", ["does", "are", "do", "is"], 2, "With “you”, the present-simple question uses “do”.", "Fácil"],
      ["Which sentence places the frequency adverb in a typical position?", ["She drinks always tea.", "She always drinks tea.", "Always she tea drinks.", "She drinks tea yesterday always."], 1, "Frequency adverbs such as “always” usually appear before the main verb, but after the verb “be”.", "Médio"],
      ["Choose the correct sentence about a routine.", ["He is brushing his teeth every morning.", "He brushes his teeth every morning.", "He brushed his teeth every morning now.", "He brush his teeth yesterday."], 1, "A repeated routine is normally expressed with the present simple: brushes.", "Fácil"]
    ]
  },
  {
    subject: "historia", topic: "topic-12", prefix: "exp10-industrial", sourceId: "exp10-industrial-revolution",
    rows: [
      ["Qual transformação caracteriza a mecanização da indústria têxtil no início da Revolução Industrial?", ["A substituição de máquinas por trabalho exclusivamente manual", "A concentração da produção apenas em oficinas domésticas", "O uso de máquinas para fiar e tecer em maior escala", "O abandono de fibras e tecidos"], 2, "Máquinas de fiar e tecer ampliaram a escala e a produtividade da produção têxtil britânica.", "Médio"],
      ["Qual setor teve papel pioneiro na mecanização industrial britânica?", ["Têxtil", "Aeroespacial", "Informática", "Petroquímico"], 0, "A produção têxtil foi um dos setores pioneiros na mecanização, com máquinas de fiar e tecer.", "Fácil"],
      ["Qual fonte de energia foi central para muitas máquinas a vapor da primeira industrialização?", ["Carvão mineral", "Energia nuclear", "Energia solar fotovoltaica", "Hidrogênio verde"], 0, "O carvão mineral alimentava caldeiras e máquinas a vapor e foi fundamental para a industrialização inicial.", "Fácil"],
      ["A máquina a vapor aperfeiçoada por James Watt contribuiu para:", ["Ampliar o uso de energia mecânica em fábricas e transportes", "Substituir toda a agricultura imediatamente", "Eliminar a necessidade de trabalhadores", "Criar a eletricidade residencial moderna"], 0, "O aperfeiçoamento da máquina a vapor ampliou as possibilidades de mecanização e transporte, embora não tenha eliminado o trabalho humano.", "Médio"],
      ["O sistema fabril se caracteriza principalmente por:", ["Produção concentrada em fábricas, com divisão de tarefas e uso de máquinas", "Produção doméstica sem ferramentas", "Ausência de supervisão e horários", "Produção exclusivamente artesanal"], 0, "O sistema fabril concentrou trabalhadores, máquinas e etapas produtivas em unidades organizadas de produção.", "Fácil"],
      ["Um efeito social importante da industrialização foi:", ["O crescimento de cidades e da população urbana", "O desaparecimento imediato das cidades", "O fim das migrações internas", "A redução universal da população"], 0, "A expansão das fábricas atraiu trabalhadores e contribuiu para o crescimento urbano, embora os processos variassem por região.", "Fácil"],
      ["A divisão do trabalho nas fábricas significava, frequentemente:", ["Que cada trabalhador executava etapas específicas de um processo maior", "Que cada trabalhador produzia sozinho todo o bem", "Que as máquinas eram proibidas", "Que não havia especialização"], 0, "A especialização de tarefas podia elevar a produtividade, mas também tornar o trabalho repetitivo.", "Médio"],
      ["Qual transformação nos transportes esteve associada à industrialização do século XIX?", ["Expansão das ferrovias", "Substituição dos trilhos por redes digitais", "Fim da navegação marítima", "Invenção do automóvel elétrico moderno em massa"], 0, "Ferrovias e locomotivas a vapor ampliaram a circulação de matérias-primas, pessoas e produtos.", "Fácil"],
      ["O crescimento industrial aumentou a demanda por:", ["Matérias-primas, energia e mercados consumidores", "Apenas produtos artesanais locais", "Menos transporte e menos recursos", "Somente trabalho agrícola familiar"], 0, "A produção em maior escala exigia insumos, fontes de energia, logística e mercados para escoar mercadorias.", "Médio"],
      ["Uma consequência das condições de trabalho em muitas fábricas do século XIX foi:", ["A formação de movimentos de trabalhadores por direitos", "A inexistência de conflitos sociais", "A jornada universal de duas horas", "O fim imediato do trabalho infantil"], 0, "Longas jornadas, baixos salários e condições perigosas estimularam associações e movimentos por direitos trabalhistas.", "Médio"],
      ["Por que a industrialização não deve ser descrita como um processo idêntico em todos os países?", ["Porque ocorreu em ritmos e condições econômicas, políticas e sociais diferentes", "Porque todos os países começaram no mesmo ano", "Porque não houve difusão de tecnologias", "Porque a industrialização ocorreu apenas em uma cidade"], 0, "A industrialização se difundiu de forma desigual, dependendo de recursos, instituições, investimentos e relações internacionais.", "Médio"],
      ["A urbanização acelerada durante a industrialização podia produzir:", ["Problemas de habitação, saneamento e infraestrutura", "A eliminação automática da pobreza", "A ausência de poluição", "A redução de toda desigualdade"], 0, "O crescimento rápido das cidades frequentemente superou a capacidade de infraestrutura, gerando problemas sanitários e habitacionais.", "Médio"],
      ["Qual relação entre agricultura e industrialização é historicamente mais adequada?", ["Mudanças agrícolas e industriais interagiram, liberando mão de obra e ampliando mercados", "A agricultura desapareceu antes das fábricas", "A industrialização não teve relação com alimentos", "A produção rural ficou igual em todas as regiões"], 0, "Transformações agrícolas, demográficas, comerciais e tecnológicas contribuíram conjuntamente para a industrialização.", "Difícil"],
      ["A chamada Segunda Revolução Industrial, a partir da segunda metade do século XIX, esteve associada à expansão de:", ["Eletricidade, aço e indústria química", "Moinhos manuais como tecnologia dominante", "Máquinas de pedra pré-históricas", "Computadores pessoais e internet"], 0, "A segunda fase industrial envolveu novas fontes de energia e setores, como eletricidade, aço e química.", "Médio"],
      ["Ao analisar a Revolução Industrial, uma abordagem histórica crítica deve:", ["Considerar ganhos de produção e também impactos sociais e ambientais", "Avaliar apenas a quantidade de máquinas", "Ignorar trabalhadores e cidades", "Supor que todos se beneficiaram igualmente"], 0, "Uma análise histórica abrangente considera produtividade, mudanças sociais, desigualdades, condições de trabalho e impactos ambientais.", "Difícil"]
    ]
  }
];

export const expansionBatch10Questions: Question[] = groups.flatMap(group =>
  group.rows.map(([prompt, options, answer, explanation, level], index) => ({
    id: `${group.prefix}-${String(index + 1).padStart(2, "0")}`,
    subject: group.subject,
    topic: group.topic,
    level,
    prompt,
    options,
    answer,
    explanation,
    xp: level === "Difícil" ? 15 : 10,
    sourceId: group.sourceId
  }))
);
