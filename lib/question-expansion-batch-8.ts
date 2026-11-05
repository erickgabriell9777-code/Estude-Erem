import type { Question } from "./study-data";

type Row = [string, string[], number, string, "Fácil" | "Médio" | "Difícil"];
const groups: { subject: Question["subject"]; topic: string; prefix: string; sourceId: string; rows: Row[] }[] = [
  {
    subject: "engenharia-economica", topic: "topic-238", prefix: "exp8-taxas", sourceId: "exp7-inflation",
    rows: [
      ["Uma taxa real positiva indica que, após considerar a inflação do período, o rendimento:", ["Aumentou o poder de compra", "Foi necessariamente igual à inflação", "Não teve capitalização", "Foi sempre negativo"], 0, "Taxa real positiva significa crescimento do valor em termos de poder de compra, considerando a inflação do período.", "Fácil"],
      ["Se a inflação anual foi de 6% e a taxa nominal de uma aplicação foi de 6%, a taxa real exata é:", ["6%", "0%", "12%", "−6%"], 1, "Pela relação exata, r = (1,06/1,06) − 1 = 0%.", "Médio"],
      ["Um investimento rende 8% nominalmente enquanto os preços caem 2% no mesmo período. A taxa real exata é:", ["6%", "8%", "10,20% aproximadamente", "−2%"], 2, "r = (1,08/0,98) − 1 ≈ 0,10204, ou 10,20%. A deflação eleva o ganho real.", "Médio"],
      ["Uma taxa efetiva de 6% ao semestre corresponde a uma taxa efetiva anual de aproximadamente:", ["12%", "12,36%", "6,36%", "36%"], 1, "A taxa anual equivalente é (1,06)² − 1 = 0,1236, ou 12,36%.", "Médio"],
      ["Uma taxa efetiva anual de 21% equivale a uma taxa efetiva semestral de:", ["10%", "10,5%", "21%", "42%"], 0, "A taxa semestral é √1,21 − 1 = 1,10 − 1 = 10%.", "Médio"],
      ["Uma taxa nominal anual de 18% com capitalização mensal tem taxa mensal proporcional de:", ["18%", "9%", "1,5%", "0,18%"], 2, "Divide-se a taxa nominal anual pelo número de capitalizações: 18%/12 = 1,5% ao mês.", "Fácil"],
      ["Se a taxa efetiva mensal é 1,5%, a taxa efetiva anual é aproximadamente:", ["18%", "19,56%", "15%", "1,18%"], 1, "A equivalência composta é (1,015)^12 − 1 ≈ 19,56%.", "Médio"],
      ["Uma taxa anual efetiva e uma taxa mensal efetiva são equivalentes quando:", ["Têm o mesmo número escrito", "Produzem o mesmo fator de acumulação em um ano", "A mensal é sempre doze vezes a anual", "Ambas são necessariamente nominais"], 1, "A equivalência exige que os fatores de acumulação coincidam no mesmo horizonte: 1+i_a=(1+i_m)^12.", "Médio"],
      ["Se um índice de preços passa de 200 para 210, a inflação do período é:", ["2%", "5%", "10%", "210%"], 1, "A variação percentual é (210−200)/200 = 0,05, ou 5%.", "Fácil"],
      ["Um salário nominal aumenta de R$ 2.000 para R$ 2.100, enquanto os preços sobem 10%. O salário real:", ["Aumenta 5%", "Permanece igual", "Diminui aproximadamente 4,55%", "Diminui 10%"], 2, "O fator nominal é 1,05 e o fator de preços é 1,10. O fator real é 1,05/1,10 ≈ 0,9545, queda de 4,55%.", "Difícil"],
      ["Para converter um fluxo monetário nominal futuro em valor real de poder de compra da data-base, deve-se:", ["Multiplicar pelo índice de preços futuro", "Dividir pelo fator acumulado de inflação", "Somar a inflação ao fluxo", "Ignorar o período"], 1, "A correção para poder de compra da data-base divide o valor nominal futuro pelo fator de inflação acumulada.", "Médio"],
      ["Uma inflação mensal constante de 1% produz inflação efetiva acumulada em 12 meses de aproximadamente:", ["12%", "12,68%", "1,12%", "24%"], 1, "A inflação composta é (1,01)^12 − 1 ≈ 12,68%, não simplesmente 12%.", "Médio"],
      ["Quando uma taxa nominal é apresentada sem informar a periodicidade de capitalização, a comparação com outra taxa efetiva fica:", ["Completa e imediata", "Ambígua, pois falta uma convenção essencial", "Sempre impossível em qualquer contexto", "Independente do prazo"], 1, "A taxa nominal depende da frequência de capitalização para determinar o rendimento efetivo; sem essa informação, a comparação não é completa.", "Médio"],
      ["Se uma aplicação rende 4% em um trimestre, a taxa efetiva equivalente para dois trimestres é:", ["8%", "8,16%", "4,08%", "16%"], 1, "Dois trimestres compostos: (1,04)^2 − 1 = 0,0816, ou 8,16%.", "Médio"],
      ["Uma taxa real de 3% e inflação de 5% no mesmo período correspondem a uma taxa nominal exata de:", ["8%", "8,15%", "2%", "15%"], 1, "Pela relação de Fisher, (1,03)(1,05) − 1 = 0,0815, ou 8,15%.", "Difícil"]
    ]
  },
  {
    subject: "quimica", topic: "topic-209", prefix: "exp8-acidos", sourceId: "exp7-acids",
    rows: [
      ["A constante de ionização ácida Ka está relacionada:", ["À extensão da ionização de um ácido em equilíbrio", "À massa molar do recipiente", "À velocidade de evaporação da água", "Ao número de nêutrons do ácido"], 0, "Ka é a constante de equilíbrio que quantifica a ionização de um ácido em água; valores maiores indicam maior favorecimento da forma ionizada.", "Fácil"],
      ["Para um ácido fraco HA, a expressão de Ka em solução aquosa é:", ["[HA]/([H₃O⁺][A⁻])", "[H₃O⁺][A⁻]/[HA]", "[H₃O⁺]+[A⁻]+[HA]", "[HA]²"], 1, "A expressão de equilíbrio é Ka = [H₃O⁺][A⁻]/[HA], omitindo a água líquida pura.", "Médio"],
      ["O pKa de um ácido é definido por:", ["log Ka", "−log Ka", "1/Ka", "Ka²"], 1, "Por definição, pKa = −log₁₀ Ka. Quanto menor o pKa, mais forte é o ácido em condições comparáveis.", "Fácil"],
      ["Dois ácidos têm Ka de 10⁻³ e 10⁻⁶. Em condições comparáveis, o ácido com Ka = 10⁻³:", ["É mais forte", "É mais fraco", "Tem pKa maior", "Não se ioniza"], 0, "Um Ka maior indica maior favorecimento da ionização e, portanto, maior força ácida relativa.", "Médio"],
      ["Uma solução tampão é formada, em geral, por:", ["Ácido fraco e sua base conjugada", "Ácido forte e base forte em qualquer proporção", "Somente água destilada", "Sal insolúvel e metal"], 0, "Um tampão contém um par conjugado, como ácido fraco/base conjugada, que resiste a variações moderadas de pH.", "Fácil"],
      ["Ao adicionar pequena quantidade de ácido a um tampão adequado, o componente básico conjugado:", ["Pode consumir parte dos H₃O⁺ adicionados", "Transforma-se sempre em gás", "Deixa de participar do equilíbrio", "Aumenta a temperatura obrigatoriamente"], 0, "A base conjugada reage com parte dos prótons adicionados, reduzindo a variação de pH.", "Médio"],
      ["Na equação de Henderson–Hasselbalch, para um tampão ácido, pH =:", ["pKa + log([base conjugada]/[ácido])", "pKa − [H₃O⁺]", "Ka × pOH", "14 − Ka"], 0, "A forma usual é pH = pKa + log([A⁻]/[HA]), usando concentrações ou atividades compatíveis.", "Médio"],
      ["Quando as concentrações de ácido fraco e base conjugada em um tampão são iguais, a equação de Henderson–Hasselbalch indica:", ["pH = pKa", "pH = 7 sempre", "pH = 14", "pH = 0"], 0, "A razão [A⁻]/[HA] é 1 e log(1)=0; portanto, pH=pKa.", "Médio"],
      ["Em uma titulação de ácido forte por base forte, próximo ao ponto de equivalência a 25 °C, o pH ideal é aproximadamente:", ["2", "5", "7", "12"], 2, "No modelo ideal, o sal formado não sofre hidrólise significativa e a solução no ponto de equivalência é aproximadamente neutra.", "Médio"],
      ["O ponto de equivalência de uma titulação ocorre quando:", ["O indicador muda de cor em qualquer pH", "As quantidades estequiométricas de titulante e analito reagiram", "O volume de titulante é sempre 7 mL", "A solução fica obrigatoriamente colorida"], 1, "A equivalência é definida pela proporção estequiométrica da reação; o ponto final é a mudança observada do indicador.", "Médio"],
      ["Na titulação de um ácido fraco por uma base forte, no ponto de equivalência a solução tende a ser:", ["Ácida", "Básica", "Sempre neutra", "Sem íons"], 1, "A base conjugada do ácido fraco sofre hidrólise e produz OH⁻, tornando o meio básico no modelo usual.", "Difícil"],
      ["Um ácido diprótico pode doar:", ["Um próton por molécula", "Dois prótons por molécula em etapas", "Somente elétrons", "Nenhum próton em água"], 1, "Ácidos dipróticos possuem dois prótons ionizáveis e normalmente apresentam duas etapas de dissociação.", "Fácil"],
      ["O efeito do íon comum pode reduzir a ionização de um ácido fraco porque:", ["O equilíbrio se desloca no sentido dos reagentes", "Aumenta obrigatoriamente a temperatura", "Destrói a constante Ka", "Transforma o ácido em base forte"], 0, "Adicionar um produto do equilíbrio desloca a reação no sentido de formar mais reagente, reduzindo a ionização; Ka permanece constante à temperatura fixa.", "Difícil"],
      ["Uma solução com pH 4 tem concentração de H₃O⁺, no modelo ideal, igual a:", ["10⁻⁴ mol/L", "10⁴ mol/L", "4 mol/L", "10⁻¹⁰ mol/L"], 0, "pH = −log[H₃O⁺]; portanto, [H₃O⁺] = 10⁻⁴ mol/L.", "Fácil"],
      ["Ao diluir um tampão, mantendo a razão entre ácido e base conjugada, o pH ideal:", ["Muda necessariamente para 7", "Permanece aproximadamente igual, embora a capacidade tamponante diminua", "Vai sempre para 0", "Aumenta exatamente duas unidades"], 1, "A razão entre as espécies permanece igual e, pela equação de Henderson–Hasselbalch, o pH pouco muda; a capacidade de neutralizar adições diminui.", "Difícil"]
    ]
  },
  {
    subject: "quimica", topic: "topic-176", prefix: "exp8-cinetica", sourceId: "exp7-kinetics",
    rows: [
      ["Para uma reação de primeira ordem, a meia-vida:", ["Depende da concentração inicial", "É independente da concentração inicial", "É sempre igual a 1 segundo", "Aumenta com a massa do recipiente"], 1, "Na cinética de primeira ordem, t₁/₂ = ln 2/k, não dependendo da concentração inicial.", "Médio"],
      ["Para uma reação de primeira ordem, a expressão integrada pode ser escrita como:", ["ln([A]₀/[A]) = kt", "[A] = [A]₀ + kt", "1/[A] = kt²", "ln[A] = [A]₀t"], 0, "A lei integrada de primeira ordem é ln([A]₀/[A]) = kt, para k constante.", "Médio"],
      ["Para uma reação de ordem zero, a concentração do reagente varia com o tempo segundo:", ["[A] = [A]₀ − kt", "[A] = [A]₀e⁻ᵏᵗ", "1/[A] = [A]₀ + kt", "[A] = kt²"], 0, "Na ordem zero, a velocidade é constante: [A] diminui linearmente com o tempo, enquanto o modelo permanece válido.", "Médio"],
      ["Para uma reação de segunda ordem em A, uma forma integrada comum é:", ["ln[A] = −kt", "1/[A] = 1/[A]₀ + kt", "[A] = [A]₀ − kt", "1/[A]² = kt"], 1, "Para v=k[A]², a forma integrada é 1/[A] = 1/[A]₀ + kt.", "Médio"],
      ["A meia-vida de uma reação de primeira ordem com k = 0,693 min⁻¹ é:", ["0,5 min", "1 min", "2 min", "10 min"], 1, "t₁/₂ = 0,693/k = 0,693/0,693 = 1 minuto.", "Médio"],
      ["A equação de Arrhenius relaciona a constante de velocidade com:", ["Temperatura e energia de ativação", "Somente a pressão atmosférica", "Massa molar e cor", "Volume do recipiente sem temperatura"], 0, "A equação k=Ae^(−Ea/RT) descreve a dependência da constante de velocidade com a temperatura e a energia de ativação.", "Fácil"],
      ["Em um gráfico de ln(k) em função de 1/T, segundo Arrhenius, a inclinação é:", ["Ea/R", "−Ea/R", "R/Ea", "−R/Ea"], 1, "A forma linear é ln k = ln A − (Ea/R)(1/T); a inclinação é −Ea/R.", "Difícil"],
      ["Mantidos os demais fatores, uma energia de ativação menor tende a:", ["Aumentar a constante de velocidade na mesma temperatura", "Diminuir sempre a temperatura", "Alterar a estequiometria global", "Impedir colisões"], 0, "Na equação de Arrhenius, uma barreira menor aumenta o fator exponencial e tende a elevar k na mesma temperatura.", "Médio"],
      ["Em um mecanismo com várias etapas elementares, a etapa lenta costuma:", ["Limitar a velocidade global em modelos simples", "Ser sempre a última etapa", "Não influenciar a velocidade", "Ter energia de ativação nula"], 0, "Em mecanismos simples, a etapa determinante da velocidade é a mais lenta e influencia a lei de velocidade observada.", "Médio"],
      ["Um intermediário reacional é uma espécie que:", ["É consumida em uma etapa e formada em outra", "Aparece necessariamente na equação global final", "É sempre o catalisador inicial", "Não participa do mecanismo"], 0, "Intermediários são formados e consumidos durante o mecanismo e não aparecem na equação global após o cancelamento.", "Médio"],
      ["Um catalisador homogêneo está:", ["Na mesma fase dos reagentes", "Sempre em fase sólida", "Em fase diferente de todos os reagentes", "Fora do sistema reacional"], 0, "Catalisadores homogêneos e reagentes estão na mesma fase; heterogêneos atuam em fase distinta.", "Fácil"],
      ["Se a constante de velocidade dobra ao elevar a temperatura, isso significa que:", ["A reação necessariamente mudou de equação global", "A velocidade pode dobrar para as mesmas concentrações, conforme a lei de velocidade", "A energia de ativação virou zero", "O equilíbrio foi eliminado"], 1, "Como a lei de velocidade contém k, dobrar k dobra a velocidade se as concentrações e a forma da lei permanecerem iguais.", "Médio"],
      ["Para uma reação de primeira ordem, após três meias-vidas resta da concentração inicial:", ["50%", "25%", "12,5%", "6,25%"], 2, "A cada meia-vida resta metade: (1/2)³ = 1/8 = 12,5%.", "Fácil"],
      ["Se uma reação de primeira ordem tem meia-vida de 20 minutos, após 60 minutos a fração restante do reagente é:", ["1/2", "1/4", "1/8", "1/16"], 2, "Sessenta minutos correspondem a três meias-vidas; resta (1/2)³ = 1/8.", "Médio"],
      ["A lei de velocidade de uma reação global deve ser determinada preferencialmente:", ["Pelos coeficientes da equação global em qualquer caso", "Experimentalmente, salvo quando se analisa uma etapa elementar", "Pela cor dos produtos", "Pelo estado físico do recipiente"], 1, "Para reações com múltiplas etapas, os expoentes da lei de velocidade são determinados experimentalmente; coeficientes só dão a lei diretamente para uma etapa elementar.", "Difícil"]
    ]
  }
];

export const expansionBatch8Questions: Question[] = groups.flatMap(group =>
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
