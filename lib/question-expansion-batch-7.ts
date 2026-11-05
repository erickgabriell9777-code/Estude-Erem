import type { Question } from "./study-data";

type Row = [string, string[], number, string, "Fácil" | "Médio" | "Difícil"];
const groups: { subject: Question["subject"]; topic: string; prefix: string; sourceId: string; rows: Row[] }[] = [
  {
    subject: "engenharia-economica", topic: "topic-238", prefix: "exp7-taxas", sourceId: "exp7-inflation",
    rows: [
      ["Uma taxa nominal anual de 12% com capitalização mensal corresponde a uma taxa mensal proporcional de:", ["0,5%", "1%", "6%", "12%"], 1, "A taxa nominal anual é dividida pelo número de períodos de capitalização: 12% ÷ 12 = 1% ao mês.", "Fácil"],
      ["Quando uma taxa é efetiva, ela representa:", ["A taxa real após descontar a inflação necessariamente", "O crescimento efetivamente acumulado no período indicado", "Uma taxa sem período definido", "Apenas a soma das taxas mensais"], 1, "A taxa efetiva considera a capitalização ocorrida no período. Ela não é automaticamente uma taxa real descontada da inflação.", "Fácil"],
      ["Uma aplicação rende 10% em um ano e a inflação no mesmo período é de 4%. Pela aproximação usual, a taxa real é de cerca de:", ["4%", "6%", "10%", "14%"], 1, "Pela aproximação para taxas moderadas, taxa real ≈ taxa nominal − inflação: 10% − 4% = 6%.", "Fácil"],
      ["Se a taxa nominal anual é 8% e a inflação anual é 8%, a aproximação da taxa real é:", ["0%", "8%", "16%", "64%"], 0, "Pela aproximação, a taxa real é aproximadamente 8% − 8% = 0%. A taxa exata pode diferir ligeiramente.", "Fácil"],
      ["Qual expressão representa a relação exata entre taxa nominal i, taxa real r e inflação π?", ["1 + i = (1 + r)(1 + π)", "i = r + π + 1", "1 + r = i × π", "i = r − π"], 0, "A relação de Fisher é 1 + i = (1 + r)(1 + π), usando taxas em forma decimal para o mesmo período.", "Médio"],
      ["Uma taxa efetiva de 1% ao mês produz, em 12 meses, uma taxa efetiva anual de aproximadamente:", ["12%", "12,00% exatamente", "12,68%", "1,12%"], 2, "A taxa anual equivalente é (1,01)^12 − 1, aproximadamente 0,1268, ou 12,68%.", "Médio"],
      ["Duas taxas são equivalentes quando:", ["Têm sempre o mesmo valor numérico", "Produzem o mesmo montante no mesmo prazo e sob a mesma base de capitalização", "Uma é nominal e a outra é sempre real", "São aplicadas a capitais diferentes sem ajuste"], 1, "Taxas equivalentes geram o mesmo resultado financeiro para o mesmo capital e prazo, respeitadas as convenções de capitalização.", "Médio"],
      ["Uma taxa efetiva trimestral de 3% equivale, em um ano, a uma taxa efetiva de:", ["6%", "9%", "12%", "12,55% aproximadamente"], 3, "A taxa anual equivalente é (1,03)^4 − 1 ≈ 0,1255, ou 12,55%.", "Médio"],
      ["Por que não se deve simplesmente somar quatro taxas trimestrais de 3% para obter a taxa efetiva anual?", ["Porque a capitalização faz os juros incidirem sobre o saldo acumulado", "Porque taxas trimestrais não podem ser comparadas", "Porque o ano tem apenas três trimestres", "Porque a taxa efetiva é sempre menor que 3%"], 0, "Com capitalização composta, cada período incide sobre o montante acumulado. Por isso, a equivalência usa potência, não soma simples.", "Médio"],
      ["Se os preços sobem 5% e a renda nominal sobe 5% no mesmo período, o poder de compra tende a:", ["Aumentar 5%", "Diminuir 5%", "Permanecer aproximadamente estável", "Dobrar"], 2, "Quando renda e nível de preços variam na mesma proporção, o poder de compra tende a permanecer estável.", "Fácil"],
      ["Uma taxa nominal de 15% e inflação de 10% produzem taxa real exata de aproximadamente:", ["4,55%", "5,00%", "10,00%", "25,00%"], 0, "Pela relação exata, r = (1,15 ÷ 1,10) − 1 ≈ 0,04545, ou 4,55%.", "Difícil"],
      ["Uma taxa efetiva mensal de 2% é convertida para taxa efetiva semestral. Qual cálculo deve ser usado?", ["6 × 2%", "(1,02)^6 − 1", "1,02 ÷ 6", "2% − 6"], 1, "Seis períodos mensais compostos equivalem a (1 + 0,02)^6 − 1.", "Médio"],
      ["Se a inflação acumulada supera o aumento nominal de um salário no mesmo período, o salário real:", ["Aumenta", "Permanece necessariamente igual", "Diminui", "Torna-se uma taxa nominal"], 2, "Quando os preços sobem mais que a renda nominal, a quantidade de bens e serviços que a renda compra tende a cair.", "Fácil"],
      ["Uma taxa nominal anual de 24% capitalizada mensalmente tem taxa efetiva anual:", ["24%", "26,82% aproximadamente", "2% exatamente", "48%"], 1, "A taxa mensal proporcional é 2%. A taxa efetiva anual é (1,02)^12 − 1 ≈ 26,82%.", "Difícil"],
      ["Ao comparar propostas de crédito com periodicidades diferentes, a comparação tecnicamente adequada exige:", ["Comparar apenas os números impressos das taxas", "Converter as taxas para uma mesma base temporal e convenção", "Ignorar a capitalização", "Escolher sempre a maior taxa nominal"], 1, "Taxas só podem ser comparadas corretamente quando expressas em uma base temporal e convenção de capitalização compatíveis.", "Médio"]
    ]
  },
  {
    subject: "quimica", topic: "topic-209", prefix: "exp7-acidos", sourceId: "exp7-acids",
    rows: [
      ["Segundo Arrhenius, em solução aquosa um ácido aumenta a concentração de:", ["Íons hidróxido (OH⁻)", "Íons hidrônio (H₃O⁺)", "Átomos metálicos neutros", "Elétrons livres"], 1, "Na definição de Arrhenius, ácidos aumentam a concentração de H⁺ em água, representados mais adequadamente como H₃O⁺.", "Fácil"],
      ["Segundo Arrhenius, uma base em água aumenta a concentração de:", ["H₃O⁺", "OH⁻", "Cl⁻ sempre", "H₂ apenas"], 1, "Bases de Arrhenius aumentam a concentração de íons hidróxido em solução aquosa.", "Fácil"],
      ["Na teoria de Brønsted–Lowry, ácido é a espécie que:", ["Recebe prótons", "Doa prótons", "Doa elétrons obrigatoriamente", "Forma apenas sais insolúveis"], 1, "Um ácido de Brønsted–Lowry é um doador de prótons; uma base é uma receptora de prótons.", "Fácil"],
      ["Na reação NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, a amônia atua como:", ["Ácido, pois doa H⁺", "Base, pois recebe H⁺", "Sal neutro", "Catalisador metálico"], 1, "A molécula NH₃ recebe um próton da água e forma NH₄⁺, comportando-se como base de Brønsted–Lowry.", "Médio"],
      ["Qual par representa um par ácido-base conjugado?", ["HCl e NaCl", "NH₄⁺ e NH₃", "Na⁺ e Cl⁻", "H₂ e O₂"], 1, "NH₄⁺ perde um próton e forma NH₃; as duas espécies diferem por um H⁺ e constituem um par conjugado.", "Médio"],
      ["Uma solução aquosa com pH 3, a 25 °C, é classificada como:", ["Ácida", "Neutra", "Básica", "Sem íons"], 0, "A 25 °C, pH menor que 7 indica solução ácida; pH igual a 7 é neutro e maior que 7 é básico.", "Fácil"],
      ["Em uma solução aquosa diluída a 25 °C, se [H₃O⁺] = 10⁻⁵ mol/L, o pH é:", ["2", "5", "7", "9"], 1, "pH = −log[H₃O⁺]. Para concentração 10⁻⁵ mol/L, pH = 5.", "Médio"],
      ["A 25 °C, uma solução neutra apresenta, aproximadamente:", ["pH 0", "pH 5", "pH 7", "pH 14"], 2, "A 25 °C, a água pura tem [H₃O⁺] e [OH⁻] iguais a 10⁻⁷ mol/L, resultando em pH 7.", "Fácil"],
      ["A neutralização entre um ácido e uma base de Arrhenius geralmente produz:", ["Sal e água", "Apenas oxigênio", "Sempre um metal puro", "Somente gás hidrogênio"], 0, "Em uma neutralização típica, H₃O⁺ e OH⁻ formam água, enquanto os demais íons podem compor um sal.", "Fácil"],
      ["Uma solução de HCl 0,1 mol/L e uma solução de ácido acético 0,1 mol/L têm a mesma concentração formal. Qual afirmação é correta?", ["Ambas são necessariamente bases fortes", "O HCl é ácido forte e o ácido acético é fraco", "O ácido acético se ioniza sempre mais que HCl", "Concentração igual significa força igual"], 1, "HCl ioniza-se praticamente por completo em água, enquanto o ácido acético estabelece equilíbrio de ionização parcial. Força e concentração são conceitos distintos.", "Médio"],
      ["A afirmação “ácido forte é sempre concentrado” está:", ["Correta, pois força e concentração são sinônimos", "Incorreta, pois força descreve ionização e concentração descreve quantidade por volume", "Correta apenas para soluções coloridas", "Incorreta porque ácidos não formam íons"], 1, "Força ácida está relacionada ao grau de ionização; concentração indica quantidade de soluto por volume. Um ácido forte pode estar diluído.", "Médio"],
      ["Uma substância anfótera pode:", ["Atuar como ácido ou base, conforme o meio", "Atuar somente como ácido", "Atuar somente como base", "Não participar de reações ácido-base"], 0, "Espécies anfóteras podem doar ou receber prótons dependendo da espécie com que reagem e das condições.", "Médio"],
      ["Se uma solução tem pOH = 4 a 25 °C, seu pH é:", ["4", "7", "10", "14"], 2, "A 25 °C, pH + pOH = 14. Logo, pH = 14 − 4 = 10.", "Médio"],
      ["Ao adicionar água a uma solução ácida, sem adicionar outra substância, o pH geralmente:", ["Diminui em direção a valores ainda mais ácidos", "Aumenta em direção a 7", "Torna-se sempre 14", "Permanece obrigatoriamente igual"], 1, "A diluição reduz a concentração de H₃O⁺ e, em condições usuais, eleva o pH em direção à neutralidade.", "Médio"],
      ["Um indicador ácido-base muda de cor em determinada faixa de pH. Para interpretar o resultado, é necessário:", ["Conhecer a faixa de viragem do indicador", "Supor que toda cor significa pH 7", "Ignorar a temperatura e a solução", "Usar o indicador como reagente que neutraliza tudo"], 0, "Cada indicador apresenta uma faixa de transição característica; a cor observada deve ser comparada com essa faixa.", "Difícil"]
    ]
  },
  {
    subject: "quimica", topic: "topic-176", prefix: "exp7-cinetica", sourceId: "exp7-kinetics",
    rows: [
      ["A cinética química estuda principalmente:", ["A velocidade das reações e os fatores que a influenciam", "Apenas a cor dos reagentes", "Somente a massa dos recipientes", "A classificação dos elementos por número atômico"], 0, "A cinética química investiga velocidades de reação, mecanismos e fatores que alteram a rapidez dos processos.", "Fácil"],
      ["Em geral, elevar a temperatura de uma reação aumenta sua velocidade porque:", ["Diminui a energia cinética das partículas", "Aumenta a fração de colisões com energia suficiente para reagir", "Elimina todas as colisões", "Transforma todo reagente em catalisador"], 1, "Com maior temperatura, aumenta a energia cinética média e a fração de colisões que supera a energia de ativação.", "Fácil"],
      ["Um catalisador acelera uma reação ao:", ["Aumentar a energia de ativação", "Fornecer um caminho reacional alternativo com menor energia de ativação", "Ser consumido integralmente como reagente", "Alterar a variação de entalpia da reação"], 1, "O catalisador oferece um mecanismo alternativo de menor energia de ativação e é regenerado ao longo do mecanismo global.", "Fácil"],
      ["A presença de um catalisador altera, em geral, a posição do equilíbrio químico?", ["Sim, desloca sempre para os produtos", "Sim, desloca sempre para os reagentes", "Não; acelera a chegada ao equilíbrio sem alterar sua constante", "Elimina o equilíbrio"], 2, "Um catalisador acelera as reações direta e inversa, permitindo atingir o equilíbrio mais rapidamente, mas não altera a constante de equilíbrio.", "Médio"],
      ["Para muitos sólidos reagentes, triturar o material aumenta a velocidade porque:", ["Reduz a área de contato", "Aumenta a área superficial disponível para colisões", "Diminui o número de partículas", "Impede a transferência de energia"], 1, "A fragmentação aumenta a área superficial exposta, favorecendo o contato entre reagentes.", "Fácil"],
      ["Segundo a teoria das colisões, uma colisão efetiva exige:", ["Qualquer contato, independentemente da energia", "Energia suficiente e orientação adequada", "Ausência total de movimento", "Temperatura obrigatoriamente igual a zero"], 1, "Nem toda colisão gera reação: as partículas precisam colidir com energia suficiente e orientação favorável.", "Médio"],
      ["A energia de ativação é:", ["A energia mínima necessária para que uma etapa reacional ocorra", "A energia total armazenada no recipiente", "A temperatura final da mistura", "A energia liberada apenas pelos produtos"], 0, "A energia de ativação é a barreira energética que precisa ser superada para que a transformação ocorra pelo caminho considerado.", "Fácil"],
      ["Se a concentração de um reagente aumenta e a lei de velocidade é v = k[A], mantendo-se a temperatura, a velocidade:", ["Cai pela metade", "Dobra se [A] dobrar", "Permanece sempre zero", "Fica independente de [A]"], 1, "A reação é de primeira ordem em A; a velocidade é diretamente proporcional à concentração de A.", "Médio"],
      ["Para uma lei de velocidade v = k[A]², se [A] for duplicada, mantendo os demais fatores:", ["A velocidade dobra", "A velocidade quadruplica", "A velocidade cai pela metade", "A velocidade não muda"], 1, "Como a velocidade depende do quadrado de [A], duplicar a concentração multiplica a velocidade por 2² = 4.", "Médio"],
      ["Na lei v = k[A][B]², a ordem global da reação é:", ["1", "2", "3", "4"], 2, "A ordem global é a soma dos expoentes: 1 + 2 = 3.", "Médio"],
      ["Uma reação apresenta menor velocidade quando a temperatura diminui, em condições comparáveis. Isso ocorre principalmente porque:", ["Há menor fração de colisões com energia acima da barreira de ativação", "A energia de ativação fica necessariamente negativa", "As partículas deixam de existir", "O catalisador passa a ser produto"], 0, "A redução da temperatura diminui a energia cinética média e a fração de colisões capazes de superar a energia de ativação.", "Médio"],
      ["Em uma reação heterogênea entre um sólido e um gás, aumentar a área exposta do sólido tende a:", ["Aumentar a velocidade, se os demais fatores forem mantidos", "Impedir qualquer colisão", "Reduzir sempre a concentração do gás a zero", "Alterar a identidade dos elementos"], 0, "Maior área exposta permite mais contatos entre as fases e pode elevar a velocidade da reação.", "Médio"],
      ["Um gráfico de concentração de reagente em função do tempo geralmente apresenta, durante seu consumo:", ["Aumento contínuo da concentração do reagente", "Redução da concentração do reagente", "Concentração obrigatoriamente constante", "Mudança da unidade de medida a cada instante"], 1, "À medida que o reagente é consumido, sua concentração tende a diminuir; a inclinação do gráfico relaciona-se à velocidade.", "Fácil"],
      ["Se um catalisador reduz a energia de ativação de uma reação, o perfil energético dos reagentes e produtos:", ["Passa a ter necessariamente produtos com energia menor", "Mantém os níveis energéticos inicial e final, mas apresenta barreira menor", "Inverte a reação espontaneamente", "Deixa de conservar energia"], 1, "O catalisador modifica o caminho e a barreira cinética, não a diferença de energia entre reagentes e produtos.", "Difícil"],
      ["Em um experimento, a velocidade inicial é medida usando diferentes concentrações e mantendo a temperatura constante. Esse procedimento permite investigar:", ["A lei de velocidade e a ordem em relação aos reagentes", "A massa atômica dos recipientes", "A cor universal de todos os produtos", "A posição geográfica do laboratório"], 0, "Comparar velocidades iniciais com concentrações variadas permite determinar experimentalmente os expoentes da lei de velocidade.", "Médio"]
    ]
  }
];

export const expansionBatch7Questions: Question[] = groups.flatMap(group =>
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
