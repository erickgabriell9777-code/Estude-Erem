import type { Question } from "./study-data";

/**
 * Lote autoral 1 da expansão de cobertura.
 * Questões inéditas, com gabarito e justificativa revisados.
 * Os tópicos e assuntos seguem o catálogo existente em study-data.ts.
 */
export const expansionBatch1Questions: Question[] = [
  // Química — topic-1110: Estados físicos e transformações da matéria
  {
    id: "exp1-quimica-estados-01", subject: "quimica", topic: "topic-1110", level: "Fácil",
    prompt: "Ao deixar um cubo de gelo sobre uma bancada, ele passa gradualmente do estado sólido para o líquido. Como se chama essa mudança de estado?",
    options: ["Condensação", "Fusão", "Sublimação", "Solidificação"], answer: 1,
    explanation: "Fusão é a passagem do estado sólido para o líquido. A água continua sendo H₂O; ocorre mudança física, não formação de uma nova substância.", xp: 10
  },
  {
    id: "exp1-quimica-estados-02", subject: "quimica", topic: "topic-1110", level: "Fácil",
    prompt: "A formação de gotículas na parte externa de um copo muito gelado é um exemplo de:",
    options: ["Vaporização", "Fusão", "Condensação", "Sublimação"], answer: 2,
    explanation: "O vapor de água presente no ar perde energia ao tocar a superfície fria e passa para o estado líquido. Essa transformação é a condensação.", xp: 10
  },
  {
    id: "exp1-quimica-estados-03", subject: "quimica", topic: "topic-1110", level: "Médio",
    prompt: "Em determinadas condições, a naftalina sólida diminui de tamanho sem formar uma poça líquida. Qual mudança de estado explica esse fenômeno?",
    options: ["Sublimação", "Solidificação", "Condensação", "Fusão"], answer: 0,
    explanation: "Sublimação é a passagem direta do estado sólido para o gasoso. A substância não precisa passar pelo estado líquido durante esse processo.", xp: 10
  },
  {
    id: "exp1-quimica-estados-04", subject: "quimica", topic: "topic-1110", level: "Médio",
    prompt: "Durante a ebulição de água pura em um recipiente aberto, ao nível do mar, qual afirmação descreve corretamente o processo?",
    options: ["A água transforma-se em oxigênio e hidrogênio", "A temperatura permanece aproximadamente constante enquanto coexistem líquido e vapor", "A massa da água aumenta espontaneamente", "As moléculas deixam de se movimentar"], answer: 1,
    explanation: "Na ebulição de uma substância pura sob pressão constante, a temperatura permanece aproximadamente no ponto de ebulição enquanto ocorre a mudança de estado. A composição química da água não muda.", xp: 10
  },
  {
    id: "exp1-quimica-estados-05", subject: "quimica", topic: "topic-1110", level: "Difícil",
    prompt: "Uma amostra de gelo derrete em um sistema fechado. Considerando que não houve vazamento nem reação química, o que se pode afirmar sobre a massa total do sistema?",
    options: ["Diminui porque o sólido desapareceu", "Aumenta porque surgiu líquido", "Permanece constante, pois ocorreu apenas uma mudança física", "Torna-se nula quando todo o gelo derrete"], answer: 2,
    explanation: "Em um sistema fechado, a massa total se conserva. A mudança de sólido para líquido altera o estado físico, mas não elimina nem cria matéria.", xp: 15
  },

  // Redação — topic-258: Intervenção e diagnóstico do problema
  {
    id: "exp1-redacao-intervencao-01", subject: "redacao", topic: "topic-258", level: "Fácil",
    prompt: "Em uma proposta de intervenção, identificar claramente quem deverá executar uma medida corresponde principalmente a qual elemento?",
    options: ["Agente", "Consequência", "Repertório", "Título"], answer: 0,
    explanation: "O agente é o responsável pela execução da ação proposta. Pode ser, por exemplo, uma secretaria, uma escola ou uma organização, desde que sua atribuição faça sentido no contexto.", xp: 10
  },
  {
    id: "exp1-redacao-intervencao-02", subject: "redacao", topic: "topic-258", level: "Fácil",
    prompt: "Uma redação aponta a baixa participação de jovens em bibliotecas públicas. Antes de propor uma solução, qual procedimento fortalece o diagnóstico?",
    options: ["Repetir o tema com outras palavras", "Identificar causas e grupos afetados com base em informações pertinentes", "Apresentar uma solução sem explicar o problema", "Afirmar que todos os jovens agem da mesma maneira"], answer: 1,
    explanation: "Um diagnóstico consistente delimita o problema, considera possíveis causas e identifica quem é afetado. Isso permite propor uma intervenção relacionada ao que foi analisado.", xp: 10
  },
  {
    id: "exp1-redacao-intervencao-03", subject: "redacao", topic: "topic-258", level: "Médio",
    prompt: "Leia a proposta: “A secretaria municipal de educação deve organizar oficinas de leitura nas escolas, com mediadores capacitados e encontros semanais, para ampliar o acesso dos estudantes à literatura.” Qual trecho apresenta o meio de execução?",
    options: ["A secretaria municipal de educação", "Organizar oficinas de leitura", "Com mediadores capacitados e encontros semanais", "Ampliar o acesso dos estudantes à literatura"], answer: 2,
    explanation: "O meio ou modo detalha como a ação será realizada. Nesse caso, a proposta indica mediadores capacitados e encontros semanais.", xp: 10
  },
  {
    id: "exp1-redacao-intervencao-04", subject: "redacao", topic: "topic-258", level: "Médio",
    prompt: "Uma proposta recomenda campanhas educativas para reduzir o desperdício de água, mas não informa quem as realizará. Qual aspecto precisa ser explicitado para tornar a intervenção mais completa?",
    options: ["O agente responsável", "Uma nova tese sem relação com o tema", "Uma citação decorativa", "A repetição do problema na conclusão"], answer: 0,
    explanation: "Sem agente, não fica claro quem assumirá a responsabilidade pela ação. A proposta deve indicar um responsável plausível e compatível com a medida.", xp: 10
  },
  {
    id: "exp1-redacao-intervencao-05", subject: "redacao", topic: "topic-258", level: "Difícil",
    prompt: "Uma redação identifica que estudantes de áreas rurais enfrentam dificuldade de acesso a materiais didáticos por causa da conectividade limitada. Qual intervenção apresenta maior coerência com esse diagnóstico?",
    options: ["Promover apenas palestras sobre redes sociais nas capitais", "Distribuir materiais impressos e organizar pontos locais de acesso digital, com apoio das escolas e da gestão pública", "Afirmar que o problema será resolvido pela vontade individual", "Substituir o tema por uma discussão sobre entretenimento"], answer: 1,
    explanation: "A proposta responde diretamente à barreira identificada e combina alternativas compatíveis com diferentes condições de conectividade. Também aponta agentes plausíveis para executar as medidas.", xp: 15
  },

  // Geografia — topic-256: Coordenadas geográficas
  {
    id: "exp1-geografia-coordenadas-01", subject: "geografia", topic: "topic-256", level: "Fácil",
    prompt: "A latitude é medida a partir de qual linha imaginária de referência?",
    options: ["Meridiano de Greenwich", "Linha do Equador", "Trópico de Capricórnio", "Círculo Polar Ártico"], answer: 1,
    explanation: "A Linha do Equador corresponde à latitude 0°. As latitudes indicam posições ao norte ou ao sul dessa linha.", xp: 10
  },
  {
    id: "exp1-geografia-coordenadas-02", subject: "geografia", topic: "topic-256", level: "Fácil",
    prompt: "O meridiano de Greenwich é a referência inicial para medir:",
    options: ["Latitude", "Altitude", "Longitude", "Profundidade oceânica"], answer: 2,
    explanation: "Greenwich corresponde à longitude 0°. As longitudes indicam posições a leste ou a oeste desse meridiano.", xp: 10
  },
  {
    id: "exp1-geografia-coordenadas-03", subject: "geografia", topic: "topic-256", level: "Médio",
    prompt: "Um ponto localizado a 18° S e 42° O está situado em quais hemisférios?",
    options: ["Norte e Oriental", "Sul e Ocidental", "Sul e Oriental", "Norte e Ocidental"], answer: 1,
    explanation: "A letra S indica latitude ao sul da Linha do Equador; O indica longitude a oeste de Greenwich. Portanto, o ponto está nos hemisférios Sul e Ocidental.", xp: 10
  },
  {
    id: "exp1-geografia-coordenadas-04", subject: "geografia", topic: "topic-256", level: "Médio",
    prompt: "Dois lugares estão sobre o mesmo meridiano, mas em latitudes diferentes. O que eles compartilham?",
    options: ["A mesma longitude", "A mesma latitude", "A mesma altitude", "A mesma distância do Equador"], answer: 0,
    explanation: "Pontos situados sobre o mesmo meridiano possuem a mesma longitude. Suas latitudes podem variar conforme a distância angular em relação ao Equador.", xp: 10
  },
  {
    id: "exp1-geografia-coordenadas-05", subject: "geografia", topic: "topic-256", level: "Difícil",
    prompt: "Um navio desloca-se de 12° S, 35° O para 12° S, 30° O. Considerando apenas as coordenadas, qual mudança ocorreu?",
    options: ["A latitude aumentou para o norte", "A latitude permaneceu e a longitude mudou para leste", "A latitude mudou para o sul e a longitude permaneceu", "O navio cruzou a Linha do Equador"], answer: 1,
    explanation: "A latitude permaneceu em 12° S. A longitude passou de 35° O para 30° O, aproximando-se do meridiano de Greenwich; portanto, houve deslocamento para leste.", xp: 15
  },

  // Geografia — topic-257: Projeções cartográficas
  {
    id: "exp1-geografia-projecoes-01", subject: "geografia", topic: "topic-257", level: "Fácil",
    prompt: "Por que toda projeção cartográfica apresenta algum tipo de distorção?",
    options: ["Porque a Terra é plana", "Porque é impossível representar toda a superfície curva da Terra em um plano sem alterar propriedades", "Porque os mapas não utilizam escala", "Porque os continentes mudam de posição diariamente"], answer: 1,
    explanation: "Ao representar uma superfície aproximadamente esférica em um plano, alguma propriedade — como área, forma, distância ou direção — precisa ser distorcida.", xp: 10
  },
  {
    id: "exp1-geografia-projecoes-02", subject: "geografia", topic: "topic-257", level: "Fácil",
    prompt: "Uma projeção cartográfica que preserva áreas relativas é classificada como:",
    options: ["Conforme", "Equivalente", "Equidistante em todos os sentidos", "Perspectiva obrigatoriamente"], answer: 1,
    explanation: "Projeções equivalentes preservam a proporção das áreas, embora possam deformar formas e ângulos.", xp: 10
  },
  {
    id: "exp1-geografia-projecoes-03", subject: "geografia", topic: "topic-257", level: "Médio",
    prompt: "Uma projeção conforme é especialmente útil quando se deseja preservar localmente:",
    options: ["Ângulos e formas pequenas", "Todas as áreas sem distorção", "Todas as distâncias entre quaisquer pontos", "O tamanho real de todos os continentes"], answer: 0,
    explanation: "Projeções conformes preservam ângulos localmente e representam formas pequenas com fidelidade relativa. Isso não significa preservar áreas ou distâncias globais.", xp: 10
  },
  {
    id: "exp1-geografia-projecoes-04", subject: "geografia", topic: "topic-257", level: "Médio",
    prompt: "Em uma projeção cilíndrica de Mercator, as áreas próximas aos polos aparecem visualmente ampliadas. Qual cuidado o leitor deve ter?",
    options: ["Concluir que essas regiões possuem necessariamente maior área real", "Comparar áreas considerando a distorção da projeção", "Ignorar a escala e as coordenadas", "Usar o mapa como fotografia sem deformações"], answer: 1,
    explanation: "A projeção de Mercator amplia progressivamente as áreas em altas latitudes. Para comparar tamanhos territoriais, é importante considerar essa distorção e, quando apropriado, usar uma projeção equivalente.", xp: 10
  },
  {
    id: "exp1-geografia-projecoes-05", subject: "geografia", topic: "topic-257", level: "Difícil",
    prompt: "Uma equipe precisa elaborar um mapa temático para comparar a participação territorial de diferentes estados em uma área total. Qual propriedade cartográfica deve receber prioridade?",
    options: ["Preservação das áreas relativas", "Preservação de todos os ângulos", "Ampliação dos territórios em altas latitudes", "Eliminação da escala"], answer: 0,
    explanation: "Para comparar proporções de área, uma projeção equivalente é apropriada porque preserva relações de área. A escolha da projeção deve acompanhar a finalidade do mapa.", xp: 15
  }
];
