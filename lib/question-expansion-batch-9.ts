import type { Question } from "./study-data";

type Row = [string, string[], number, string, "Fácil" | "Médio" | "Difícil"];
const groups: { subject: Question["subject"]; topic: string; prefix: string; sourceId: string; rows: Row[] }[] = [
  {
    subject: "gerais", topic: "topic-52", prefix: "exp9-medicao", sourceId: "exp9-measurement",
    rows: [
      ["Qual instrumento é usado para medir a temperatura de uma pessoa?", ["Barômetro", "Termômetro", "Anemômetro", "Higrômetro"], 1, "O termômetro mede temperatura; modelos clínicos são projetados para faixas adequadas ao corpo humano.", "Fácil"],
      ["Qual instrumento mede a umidade relativa do ar?", ["Higrômetro", "Amperímetro", "Dinamômetro", "Altímetro"], 0, "O higrômetro mede a umidade do ar, frequentemente expressa como umidade relativa.", "Fácil"],
      ["O anemômetro é utilizado para medir:", ["Pressão atmosférica", "Velocidade do vento", "Massa de um objeto", "Temperatura do solo"], 1, "Anemômetros medem a velocidade do vento; alguns modelos também registram direção com sensores associados.", "Fácil"],
      ["Qual instrumento registra a quantidade de chuva acumulada em determinado intervalo?", ["Pluviômetro", "Barômetro", "Voltímetro", "Cronômetro"], 0, "O pluviômetro coleta e mede a precipitação, geralmente em milímetros de lâmina d'água.", "Fácil"],
      ["Para medir a intensidade da corrente elétrica em um circuito, utiliza-se um:", ["Voltímetro", "Amperímetro", "Ohmímetro de temperatura", "Barômetro"], 1, "O amperímetro mede corrente elétrica e deve ser inserido em série no ramo analisado, respeitando a escala e a segurança do circuito.", "Médio"],
      ["O voltímetro mede:", ["Diferença de potencial elétrico", "Corrente elétrica", "Força mecânica", "Pressão do ar"], 0, "O voltímetro mede a tensão, isto é, a diferença de potencial entre dois pontos.", "Fácil"],
      ["Qual instrumento é apropriado para medir a força aplicada a uma mola em um experimento escolar?", ["Dinamômetro", "Higrômetro", "Pluviômetro", "Termômetro"], 0, "O dinamômetro mede força, frequentemente usando a deformação calibrada de uma mola.", "Fácil"],
      ["Uma balança, quando calibrada e usada corretamente, é empregada para determinar:", ["Massa", "Temperatura", "Velocidade", "Pressão atmosférica"], 0, "Balanças são instrumentos de medição de massa; o resultado depende da calibração e das condições de uso.", "Fácil"],
      ["Para medir o volume de um líquido com maior precisão do que um copo graduado comum, pode-se utilizar:", ["Uma proveta graduada", "Um barômetro", "Um anemômetro", "Um amperímetro"], 0, "A proveta é um recipiente graduado usado para medir volumes de líquidos, com leitura adequada do menisco.", "Médio"],
      ["Qual instrumento é utilizado para medir a pressão atmosférica?", ["Barômetro", "Termômetro", "Higrômetro", "Balança"], 0, "O barômetro mede a pressão exercida pela atmosfera.", "Fácil"],
      ["O velocímetro de um veículo indica principalmente:", ["A velocidade instantânea do veículo", "A distância total percorrida desde sua fabricação", "A pressão dos pneus", "A temperatura externa"], 0, "O velocímetro indica a velocidade do veículo naquele momento; o hodômetro registra distância acumulada.", "Fácil"],
      ["Qual instrumento é usado para medir intervalos de tempo em uma experiência?", ["Cronômetro", "Altímetro", "Pluviômetro", "Manômetro"], 0, "O cronômetro mede intervalos de tempo; sua resolução e calibração afetam a incerteza da medição.", "Fácil"],
      ["Um manômetro é utilizado para medir:", ["Pressão de fluidos em sistemas", "Massa de sólidos", "Umidade relativa do ar", "Corrente elétrica"], 0, "Manômetros medem pressão em sistemas, como tubulações e recipientes; o tipo define a referência usada.", "Médio"],
      ["O altímetro determina altitude usando, em muitos modelos, variações de:", ["Pressão atmosférica", "Corrente elétrica doméstica", "Umidade do solo", "Massa do combustível"], 0, "Altímetros barométricos estimam altitude a partir da pressão atmosférica e de uma referência calibrada.", "Médio"],
      ["Ao registrar uma medida, por que é importante informar a unidade?", ["Porque o número sozinho não identifica a grandeza e sua escala", "Porque unidades são sempre opcionais", "Porque a unidade substitui o instrumento", "Porque todas as grandezas usam metros"], 0, "O valor numérico precisa da unidade para comunicar a quantidade medida e permitir comparações coerentes.", "Médio"]
    ]
  },
  {
    subject: "geografia", topic: "topic-15", prefix: "exp9-terra", sourceId: "exp9-earth",
    rows: [
      ["A rotação da Terra é o movimento de:", ["Translação ao redor do Sol", "Giro em torno do próprio eixo", "Mudança da órbita da Lua", "Afastamento contínuo do Sol"], 1, "Rotação é o giro terrestre em torno do próprio eixo e está associada à alternância entre dia e noite.", "Fácil"],
      ["A translação terrestre corresponde ao movimento da Terra:", ["Ao redor do Sol", "Em torno do próprio eixo", "Ao redor de Marte", "Entre os polos magnéticos"], 0, "A translação é o movimento orbital da Terra ao redor do Sol.", "Fácil"],
      ["A alternância entre dia e noite ocorre principalmente devido à:", ["Translação", "Rotação", "Precessão", "Inclinação da órbita lunar"], 1, "A rotação faz diferentes regiões da Terra entrarem e saírem da iluminação solar ao longo do dia.", "Fácil"],
      ["A duração aproximada de um dia solar médio é:", ["12 horas", "24 horas", "30 dias", "365 dias"], 1, "O dia solar médio tem 24 horas, convenção usada na organização civil do tempo.", "Fácil"],
      ["O ano bissexto existe no calendário gregoriano principalmente para:", ["Ajustar o calendário ao período de translação da Terra", "Compensar a rotação da Lua", "Eliminar as estações do ano", "Fazer todos os meses terem 30 dias"], 0, "O ano civil é ajustado periodicamente porque o ano tropical não tem exatamente 365 dias.", "Médio"],
      ["A inclinação do eixo terrestre em relação ao plano orbital é fundamental para explicar:", ["A ocorrência das estações do ano", "A formação diária das marés apenas", "A existência do campo magnético", "A distância fixa entre Terra e Lua"], 0, "A inclinação do eixo, combinada à translação, altera a distribuição anual da luz solar entre os hemisférios.", "Fácil"],
      ["Quando é verão no Hemisfério Sul, em geral é:", ["Verão também no Hemisfério Norte", "Inverno no Hemisfério Norte", "Outono nos dois hemisférios", "Primavera nos dois hemisférios"], 1, "As estações são opostas nos hemisférios porque a inclinação terrestre faz um receber luz mais direta enquanto o outro recebe menos.", "Fácil"],
      ["Os equinócios são datas em que, aproximadamente:", ["O dia e a noite têm duração semelhante em grande parte do planeta", "O Sol não nasce em nenhum lugar", "A Terra fica sem inclinação axial", "O Hemisfério Norte recebe sempre mais luz"], 0, "Nos equinócios, nenhum hemisfério está inclinado de forma predominante em direção ao Sol, e dia e noite têm duração próxima.", "Médio"],
      ["Os solstícios marcam:", ["Os momentos de maior afastamento da Lua", "As situações de maior diferença anual de iluminação entre os hemisférios", "A ausência de rotação terrestre", "O início de cada mês civil"], 1, "Nos solstícios ocorre a maior inclinação de um hemisfério em direção ao Sol ou para longe dele, marcando extremos sazonais.", "Médio"],
      ["A precessão do eixo terrestre é:", ["Uma mudança lenta na orientação do eixo de rotação", "O movimento diário de rotação", "A trajetória anual da Terra ao redor do Sol", "A mudança das fases da Lua"], 0, "A precessão é uma mudança lenta na orientação do eixo terrestre, com ciclo de milhares de anos.", "Difícil"],
      ["A forma da órbita terrestre é aproximadamente:", ["Circular perfeita", "Elíptica, com baixa excentricidade", "Quadrada", "Uma espiral que nunca se fecha"], 1, "A órbita terrestre é uma elipse de baixa excentricidade, próxima de um círculo.", "Médio"],
      ["As estações do ano não são causadas principalmente pela distância Terra-Sol porque:", ["A distância varia pouco e os hemisférios têm estações opostas ao mesmo tempo", "A Terra não se movimenta", "O Sol muda de temperatura a cada mês", "A Lua bloqueia a luz em cada estação"], 0, "A inclinação axial explica as estações: quando um hemisfério está inclinado em direção ao Sol, o outro está inclinado para longe.", "Médio"],
      ["Durante o solstício de junho, qual hemisfério recebe, em geral, maior incidência direta de luz solar?", ["Hemisfério Sul", "Hemisfério Norte", "Os dois igualmente em todas as latitudes", "Nenhum dos hemisférios"], 1, "Em junho, o Hemisfério Norte está inclinado em direção ao Sol e recebe maior incidência direta, iniciando o verão astronômico nessa região.", "Médio"],
      ["O movimento de rotação terrestre ocorre de oeste para leste. Por isso, o Sol aparenta deslocar-se no céu de:", ["Leste para oeste", "Oeste para leste", "Norte para sul sempre", "Sul para norte sempre"], 0, "O movimento aparente diário do Sol é oposto ao sentido da rotação terrestre: nasce aproximadamente a leste e se põe a oeste.", "Médio"],
      ["A duração do dia claro em uma localidade varia ao longo do ano principalmente por causa:", ["Da inclinação do eixo terrestre e da translação", "Da mudança diária da massa da Terra", "Da rotação da Lua", "Da distância entre continentes"], 0, "A inclinação axial e a translação alteram a trajetória aparente do Sol e a duração do período iluminado em cada latitude.", "Médio"]
    ]
  },
  {
    subject: "logica", topic: "topic-46", prefix: "exp9-negacao", sourceId: "exp9-logic",
    rows: [
      ["Qual é a negação lógica de “Todos os livros foram entregues”?", ["Nenhum livro foi entregue", "Pelo menos um livro não foi entregue", "Todos os livros foram perdidos", "Algum livro foi entregue"], 1, "A negação de uma afirmação universal é existencial: basta haver ao menos um livro que não foi entregue.", "Fácil"],
      ["A negação de “Existe um estudante aprovado” é:", ["Todos os estudantes foram aprovados", "Nenhum estudante foi aprovado", "Existe um estudante reprovado", "A maioria foi aprovada"], 1, "Negar “existe pelo menos um” resulta em “não existe nenhum”, isto é, todos não foram aprovados.", "Fácil"],
      ["A negação de “P e Q” é equivalente a:", ["Não P e não Q", "Não P ou não Q", "P ou Q", "P e não Q"], 1, "Pela lei de De Morgan, ¬(P ∧ Q) equivale a (¬P ∨ ¬Q).", "Médio"],
      ["A negação de “P ou Q”, no sentido inclusivo, é:", ["Não P ou não Q", "P e Q", "Não P e não Q", "P implica Q"], 2, "Pela lei de De Morgan, ¬(P ∨ Q) equivale a (¬P ∧ ¬Q).", "Médio"],
      ["A negação de “Se P, então Q” é:", ["Se não P, então não Q", "P e não Q", "Não P e Q", "P ou Q"], 1, "A implicação só é falsa quando P é verdadeira e Q é falsa; essa condição é sua negação.", "Médio"],
      ["Qual expressão é equivalente à negação de “Algum atleta treinou hoje”?", ["Todos os atletas treinaram hoje", "Nenhum atleta treinou hoje", "Algum atleta não treinou hoje", "A maioria treinou hoje"], 1, "A negação de “algum” é “nenhum”: não há atleta que tenha treinado hoje.", "Fácil"],
      ["A negação de “Nenhum relatório está incompleto” é:", ["Todos os relatórios estão incompletos", "Pelo menos um relatório está incompleto", "Nenhum relatório está completo", "A maioria está incompleta"], 1, "Negar “nenhum” equivale a afirmar a existência de pelo menos um caso.", "Médio"],
      ["Se a proposição P é falsa, o valor lógico de ¬P é:", ["Falso", "Verdadeiro", "Indeterminado em qualquer sistema", "Simultaneamente verdadeiro e falso"], 1, "A negação inverte o valor lógico: se P é falsa, ¬P é verdadeira.", "Fácil"],
      ["A dupla negação de uma proposição P, na lógica clássica, é equivalente a:", ["P", "¬P", "Uma contradição", "Uma tautologia independente de P"], 0, "Na lógica clássica, ¬(¬P) tem o mesmo valor lógico de P.", "Fácil"],
      ["A negação de “P e não Q” é:", ["Não P e Q", "Não P ou Q", "P ou não Q", "P e Q"], 1, "Aplicando De Morgan: ¬(P ∧ ¬Q) = ¬P ∨ Q.", "Médio"],
      ["A negação de “P ou não Q” é:", ["Não P e Q", "P e não Q", "Não P ou Q", "P implica Q"], 0, "Aplicando De Morgan: ¬(P ∨ ¬Q) = ¬P ∧ Q.", "Médio"],
      ["Qual é a negação de “Exatamente um dos eventos A e B ocorreu”?", ["A e B ocorreram", "Nenhum ocorreu", "A e B ocorreram ou nenhum ocorreu", "Pelo menos um ocorreu"], 2, "Se exatamente um ocorreu, então a negação é que ambos ocorreram ou que nenhum ocorreu.", "Difícil"],
      ["A negação de “No máximo um dos candidatos foi selecionado” é:", ["Nenhum candidato foi selecionado", "Pelo menos dois candidatos foram selecionados", "Todos foram selecionados", "Exatamente um foi selecionado"], 1, "“No máximo um” permite zero ou um; sua negação exige dois ou mais selecionados.", "Difícil"],
      ["Em um domínio de números inteiros, a negação de “Para todo n, n² é não negativo” é:", ["Para todo n, n² é negativo", "Existe um inteiro n cujo quadrado é negativo", "Existe um inteiro n cujo quadrado não é não negativo", "Nenhum inteiro tem quadrado"], 2, "A negação de ∀n P(n) é ∃n ¬P(n). Aqui, existe n para o qual n² não é não negativo.", "Difícil"],
      ["Qual alternativa descreve corretamente a diferença entre uma proposição e sua negação na lógica clássica?", ["Elas sempre têm o mesmo valor lógico", "Uma é verdadeira exatamente quando a outra é falsa", "Ambas podem ser verdadeiras ao mesmo tempo", "A negação não depende da proposição original"], 1, "Na lógica clássica bivalente, uma proposição e sua negação têm valores lógicos opostos.", "Médio"]
    ]
  }
];

export const expansionBatch9Questions: Question[] = groups.flatMap(group =>
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
