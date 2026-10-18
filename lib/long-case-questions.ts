import type {Question} from "./study-data";
// Original multistep cases: 12 reasoning models with five contextual/numerical variants each.
export const longCaseQuestions:Question[] = [
  {
    "id": "long-case-0-1",
    "subject": "geometria-analitica",
    "topic": "topic-226",
    "prompt": "Uma equipe de uma escola técnica precisa transportar material entre dois pontos de um terreno plano. No mapa cartesiano, cada unidade representa 10 metros. O depósito está em A=(2, 4) e o destino está em B=(8, 12). O trajeto atual acompanha primeiro uma rua horizontal e depois uma rua vertical, sempre no sentido do destino, sem desvios.\n\nUm novo corredor permitirá ligar A diretamente a B por um segmento de reta. A equipe faz 10 viagens de ida por dia; o retorno não entra nesta estimativa. Considerando apenas as distâncias descritas e supondo o corredor liberado em todas as viagens, quantos metros serão economizados por dia?",
    "options": [
      "80 m",
      "400 m",
      "1400 m",
      "1000 m"
    ],
    "answer": 1,
    "explanation": "1. Trajeto pelas ruas: (6+8)×10=140 m por ida.\n2. Corredor: √(6²+8²)×10=100 m.\n3. Economia por ida: 40 m.\n4. Em 10 viagens, 40×10=400 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-1-1",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "No projeto de um trilho reto para uma escola técnica, a direção de movimento é representada pelo vetor v=(3,4), e a origem do sistema coincide com o início do trilho. Uma peça encontra-se no ponto P=(2, 11), com coordenadas em metros. O trilho deve ser tratado como uma reta infinita para esta análise, de modo que não há restrição de comprimento.\n\nA peça será deslocada perpendicularmente até o trilho, chegando ao ponto H. Depois, um sensor medirá a distância de H à origem ao longo do trilho. Qual alternativa apresenta, nessa ordem, a distância PH e a distância da origem a H?",
    "options": [
      "5 m e 50 m",
      "5 m e 10 m",
      "10 m e 5 m",
      "25 m e 10 m"
    ],
    "answer": 1,
    "explanation": "1. P·v=25×2 e v·v=25; logo proj_v(P)=2v=(6,8).\n2. P−H=(−4,3), cuja norma é 5.\n3. ‖H‖=2‖v‖=10.\n4. Conferência: (−4,3)·(3,4)=−12+12=0; o deslocamento PH é perpendicular ao trilho.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-2-1",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Um equipamento móvel de uma escola técnica segue a trajetória retilínea r(t)=(2,1,0)+t(1,2,1), com coordenadas em metros e t medido em segundos a partir do início do movimento. Uma barreira de segurança é representada pelo plano x+y+z=11. O equipamento é considerado pontual, move-se com a velocidade indicada na parametrização e não altera sua direção antes de alcançar a barreira.\n\nO sistema deve emitir um alerta quando o equipamento estiver exatamente na barreira. Para programar o alerta, é preciso encontrar o instante de interseção e, em seguida, calcular a coordenada y nesse instante. Qual será essa coordenada y?",
    "options": [
      "2 m",
      "9 m",
      "4 m",
      "5 m"
    ],
    "answer": 3,
    "explanation": "1. Na trajetória, x=2+t, y=1+2t e z=t.\n2. No plano: 2+1+4t=11; portanto t=2.\n3. Substituindo em y: y=1+2×2=5.\n4. Conferência: o ponto (4,5,2) satisfaz x+y+z=11, portanto está no plano.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-3-1",
    "subject": "geometria-analitica",
    "topic": "topic-233",
    "prompt": "Uma equipe de uma escola técnica está delimitando uma região circular de segurança no piso. O levantamento forneceu a equação x²+y²−4x−6y−12=0, com coordenadas em metros. O centro da região ainda não foi marcado no local, e a equipe precisa identificá-lo antes de instalar os sensores.\n\nUm sensor pontual será instalado em S=(5,7). A região permitida inclui tanto o interior quanto a borda do círculo. Após completar os quadrados e comparar a distância do sensor ao centro com o raio, qual é a classificação correta da posição de S?",
    "options": [
      "No centro, pois a distância é zero",
      "Exatamente na borda, pois a distância ao centro é 5 m",
      "No interior, pois a distância ao centro é 3 m",
      "No exterior, pois a distância ao centro é 7 m"
    ],
    "answer": 1,
    "explanation": "1. Complete quadrados: (x−2)²+(y−3)²=25.\n2. Centro=(2,3) e raio=5.\n3. S−C=(3,4), com norma √(9+16)=5.\n4. Distância igual ao raio: sensor na borda.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-4-1",
    "subject": "geometria-analitica",
    "topic": "topic-230",
    "prompt": "Para instalar uma cobertura triangular em uma escola técnica, o projeto define três vértices no espaço: A=(2,2,1), B=(5,2,1) e C=(2,6,4), em metros. A cobertura será uma única peça plana, sem sobreposição. O orçamento é calculado pela área efetiva do triângulo no espaço, e não pela área de sua projeção no piso.\n\nA empresa fornece o material por R$ 40 por metro quadrado e cobra mais R$ 100 de instalação fixa. Desconsidere desperdício, impostos e arredondamentos intermediários. Usando os vetores AB e AC, qual é o custo total da cobertura com a instalação?",
    "options": [
      "500,00 reais",
      "400,00 reais",
      "700,00 reais",
      "300,00 reais"
    ],
    "answer": 1,
    "explanation": "1. AB=(3,0,0) e AC=(0,4,3).\n2. AB×AC=(0,−9,12), de norma 15.\n3. Área triangular=15/2=7,5 m².\n4. Custo=7,5×40+100=400 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-5-1",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Um reservatório esférico de uma escola técnica é descrito por (x−2)²+(y−2)²+(z−3)²=25, em metros. A manutenção pretende instalar um aro circular na interseção entre a superfície do reservatório e o plano horizontal z=6. Considere uma esfera ideal, sem espessura, e um aro exatamente ajustado à seção.\n\nPara fazer o pedido da peça, não basta usar o raio da esfera: é necessário considerar a distância do plano ao centro. Usando a relação entre o raio da esfera, essa distância e o raio da seção, qual deve ser o diâmetro do aro?",
    "options": [
      "6 m",
      "4 m",
      "8 m",
      "10 m"
    ],
    "answer": 2,
    "explanation": "1. Centro=(2,2,3), raio R=5.\n2. O plano z=6 dista d=3 do centro.\n3. Raio da seção: √(R²−d²)=√(25−9)=4.\n4. Diâmetro=2×4=8 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-6-1",
    "subject": "engenharia-economica",
    "topic": "topic-240",
    "prompt": "A direção de uma escola técnica avalia comprar um equipamento por R$ 20000, pagos hoje. O equipamento gerará economias líquidas de operação de R$ 11000 no fim do primeiro ano e R$ 12100 no fim do segundo ano. Além da economia do segundo ano, será vendido nessa mesma data por R$ 2420. Não existem outros custos, receitas, impostos ou valores recuperáveis.\n\nA taxa mínima de atratividade é de 10% ao ano, e todos os fluxos futuros ocorrem no fim dos períodos informados. Pelo critério do valor presente líquido, qual é o VPL do projeto? Lembre-se de somar a venda ao fluxo final antes de descontá-lo.",
    "options": [
      "0,00 reais",
      "2.420,00 reais",
      "-2.000,00 reais",
      "2.000,00 reais"
    ],
    "answer": 3,
    "explanation": "1. Fluxo em t=0: −20000.\n2. VP do ano 1: 11000/1,1=10000.\n3. VP do ano 2: (12100+2420)/1,1²=12000.\n4. VPL=−20000+10000+12000=2000 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-7-1",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "Para modernizar as instalações, uma escola técnica contrata um financiamento de R$ 24000 pelo Sistema de Amortização Constante, em 12 prestações mensais. A taxa é de 1% ao mês sobre o saldo imediatamente anterior a cada pagamento. A primeira prestação vence ao final do primeiro mês, e todas as anteriores à sexta foram pagas corretamente.\n\nO setor financeiro quer reservar o valor exato da sexta prestação. Não há tarifas, seguros, correção monetária, carência ou amortizações extras. Determine primeiro a amortização mensal e o saldo devedor após cinco pagamentos. Qual valor, em reais, deve ser reservado para a sexta prestação?",
    "options": [
      "2.140,00 reais",
      "2.240,00 reais",
      "2.120,00 reais",
      "2.000,00 reais"
    ],
    "answer": 0,
    "explanation": "1. Amortização mensal=24000/12=2000.\n2. Antes da sexta prestação, saldo=24000−5×2000=14000.\n3. Juros=14000×0,01=140.\n4. Prestação=2000+140=2140 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-8-1",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Uma compra de uma escola técnica será financiada em duas prestações anuais iguais, pela Tabela Price. O principal é de R$ 4200, a taxa efetiva é de 10% ao ano e a primeira prestação vence exatamente um ano após a contratação. O contrato não inclui tarifas, seguros nem outros encargos.\n\nPela equivalência financeira, cada prestação é de R$ 2420. Um relatório, porém, precisa separar os juros e a amortização da primeira prestação e informar o saldo logo após seu pagamento. Considerando juros incidentes sobre o principal ainda devido, qual será esse saldo devedor?",
    "options": [
      "2.420,00 reais",
      "2.200,00 reais",
      "1.780,00 reais",
      "2.000,00 reais"
    ],
    "answer": 1,
    "explanation": "1. Juros do primeiro ano=4200×0,1=420.\n2. Amortização=2420−420=2000.\n3. Saldo após pagar=4200−2000=2200.\n4. Conferência: 2200×1,1=2420, igual à segunda prestação.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-9-1",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "A equipe de uma escola técnica precisa escolher entre dois equipamentos que fornecem exatamente o mesmo serviço durante um ano. A alternativa A exige R$ 10000 hoje e gera economia líquida de R$ 11000 no fim do ano. A alternativa B exige R$ 14000 hoje e gera economia líquida de R$ 15840 no fim do ano. Ambos têm valor residual zero.\n\nA taxa mínima de atratividade é de 10% ao ano. Não há diferença de risco, disponibilidade ou capacidade, e apenas uma alternativa pode ser escolhida. Para verificar se o gasto adicional em B se justifica, calcule o VPL incremental de B menos A. Qual é o resultado?",
    "options": [
      "-400,00 reais",
      "0,00 reais",
      "400,00 reais",
      "840,00 reais"
    ],
    "answer": 2,
    "explanation": "1. Investimento adicional=14000−10000=4000.\n2. Ganho adicional=15840−11000=4840.\n3. VPL(B−A)=−4000+4840/1,1=400.\n4. Como é positivo, B é preferida pelo critério, nas hipóteses dadas.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-10-1",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Um contrato de uma escola técnica prevê uma receita daqui a um ano equivalente a R$ 2200 em poder de compra de hoje. A projeção de inflação para o ano é de 10%, e a taxa real de desconto adotada é de 10% ao ano. Não haverá recebimentos antes do vencimento nem custos associados a essa receita.\n\nPara evitar misturar valores reais e nominais, a analista decide primeiro converter a receita para moeda do fim do ano e calcular a taxa nominal equivalente. Em seguida, desconta a receita nominal por essa taxa. Qual valor presente deve obter? Use a relação multiplicativa exata entre as taxas.",
    "options": [
      "2.200,00 reais",
      "2.420,00 reais",
      "1.800,00 reais",
      "2.000,00 reais"
    ],
    "answer": 3,
    "explanation": "1. Receita nominal=2200×1,1=2420.\n2. Taxa nominal=(1,1×1,1)−1=21%.\n3. VP=2420/1,21=2000.\n4. Conferência em termos reais: 2200/1,1=2000.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-11-1",
    "subject": "engenharia-economica",
    "topic": "topic-244",
    "prompt": "Uma unidade produtiva ligada a uma escola técnica vende um único produto por R$ 80 a unidade. O custo variável é de R$ 50 por unidade e os custos fixos mensais somam R$ 12000. A direção pretende obter lucro operacional mensal de R$ 6000, antes de impostos. Considere preços e custos constantes no intervalo de produção analisado.\n\nToda unidade produzida será vendida, não há mudança de estoque, e a capacidade máxima da instalação é de 800 unidades por mês. Quantas unidades devem ser vendidas para atingir o lucro desejado, e essa meta cabe na capacidade informada?",
    "options": [
      "1000 unidades; sim",
      "600 unidades; sim",
      "400 unidades; sim",
      "800 unidades; não"
    ],
    "answer": 1,
    "explanation": "1. Margem unitária=80−50=30 reais.\n2. Receita de contribuição necessária=12000+6000=18000.\n3. Quantidade=18000/30=600.\n4. Como 600≤800, a meta cabe na capacidade.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-0-2",
    "subject": "geometria-analitica",
    "topic": "topic-226",
    "prompt": "Uma equipe de um centro de pesquisas precisa transportar material entre dois pontos de um terreno plano. No mapa cartesiano, cada unidade representa 10 metros. O depósito está em A=(3, 6) e o destino está em B=(9, 14). O trajeto atual acompanha primeiro uma rua horizontal e depois uma rua vertical, sempre no sentido do destino, sem desvios.\n\nUm novo corredor permitirá ligar A diretamente a B por um segmento de reta. A equipe faz 15 viagens de ida por dia; o retorno não entra nesta estimativa. Considerando apenas as distâncias descritas e supondo o corredor liberado em todas as viagens, quantos metros serão economizados por dia?",
    "options": [
      "1500 m",
      "120 m",
      "600 m",
      "2100 m"
    ],
    "answer": 2,
    "explanation": "1. Trajeto pelas ruas: (6+8)×10=140 m por ida.\n2. Corredor: √(6²+8²)×10=100 m.\n3. Economia por ida: 40 m.\n4. Em 15 viagens, 40×15=600 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-1-2",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "No projeto de um trilho reto para um centro de pesquisas, a direção de movimento é representada pelo vetor v=(3,4), e a origem do sistema coincide com o início do trilho. Uma peça encontra-se no ponto P=(5, 15), com coordenadas em metros. O trilho deve ser tratado como uma reta infinita para esta análise, de modo que não há restrição de comprimento.\n\nA peça será deslocada perpendicularmente até o trilho, chegando ao ponto H. Depois, um sensor medirá a distância de H à origem ao longo do trilho. Qual alternativa apresenta, nessa ordem, a distância PH e a distância da origem a H?",
    "options": [
      "25 m e 15 m",
      "5 m e 75 m",
      "5 m e 15 m",
      "15 m e 5 m"
    ],
    "answer": 2,
    "explanation": "1. P·v=25×3 e v·v=25; logo proj_v(P)=3v=(9,12).\n2. P−H=(−4,3), cuja norma é 5.\n3. ‖H‖=3‖v‖=15.\n4. Conferência: (−4,3)·(3,4)=−12+12=0; o deslocamento PH é perpendicular ao trilho.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-2-2",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Um equipamento móvel de um centro de pesquisas segue a trajetória retilínea r(t)=(3,1,0)+t(1,2,1), com coordenadas em metros e t medido em segundos a partir do início do movimento. Uma barreira de segurança é representada pelo plano x+y+z=16. O equipamento é considerado pontual, move-se com a velocidade indicada na parametrização e não altera sua direção antes de alcançar a barreira.\n\nO sistema deve emitir um alerta quando o equipamento estiver exatamente na barreira. Para programar o alerta, é preciso encontrar o instante de interseção e, em seguida, calcular a coordenada y nesse instante. Qual será essa coordenada y?",
    "options": [
      "7 m",
      "3 m",
      "13 m",
      "6 m"
    ],
    "answer": 0,
    "explanation": "1. Na trajetória, x=3+t, y=1+2t e z=t.\n2. No plano: 3+1+4t=16; portanto t=3.\n3. Substituindo em y: y=1+2×3=7.\n4. Conferência: o ponto (6,7,3) satisfaz x+y+z=16, portanto está no plano.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-3-2",
    "subject": "geometria-analitica",
    "topic": "topic-233",
    "prompt": "Uma equipe de um centro de pesquisas está delimitando uma região circular de segurança no piso. O levantamento forneceu a equação x²+y²−6x−8y+0=0, com coordenadas em metros. O centro da região ainda não foi marcado no local, e a equipe precisa identificá-lo antes de instalar os sensores.\n\nUm sensor pontual será instalado em S=(6,8). A região permitida inclui tanto o interior quanto a borda do círculo. Após completar os quadrados e comparar a distância do sensor ao centro com o raio, qual é a classificação correta da posição de S?",
    "options": [
      "No exterior, pois a distância ao centro é 7 m",
      "No centro, pois a distância é zero",
      "Exatamente na borda, pois a distância ao centro é 5 m",
      "No interior, pois a distância ao centro é 3 m"
    ],
    "answer": 2,
    "explanation": "1. Complete quadrados: (x−3)²+(y−4)²=25.\n2. Centro=(3,4) e raio=5.\n3. S−C=(3,4), com norma √(9+16)=5.\n4. Distância igual ao raio: sensor na borda.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-4-2",
    "subject": "geometria-analitica",
    "topic": "topic-230",
    "prompt": "Para instalar uma cobertura triangular em um centro de pesquisas, o projeto define três vértices no espaço: A=(3,2,1), B=(6,2,1) e C=(3,6,4), em metros. A cobertura será uma única peça plana, sem sobreposição. O orçamento é calculado pela área efetiva do triângulo no espaço, e não pela área de sua projeção no piso.\n\nA empresa fornece o material por R$ 60 por metro quadrado e cobra mais R$ 150 de instalação fixa. Desconsidere desperdício, impostos e arredondamentos intermediários. Usando os vetores AB e AC, qual é o custo total da cobertura com a instalação?",
    "options": [
      "450,00 reais",
      "750,00 reais",
      "600,00 reais",
      "1.050,00 reais"
    ],
    "answer": 2,
    "explanation": "1. AB=(3,0,0) e AC=(0,4,3).\n2. AB×AC=(0,−9,12), de norma 15.\n3. Área triangular=15/2=7,5 m².\n4. Custo=7,5×60+150=600 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-5-2",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Um reservatório esférico de um centro de pesquisas é descrito por (x−3)²+(y−2)²+(z−3)²=25, em metros. A manutenção pretende instalar um aro circular na interseção entre a superfície do reservatório e o plano horizontal z=6. Considere uma esfera ideal, sem espessura, e um aro exatamente ajustado à seção.\n\nPara fazer o pedido da peça, não basta usar o raio da esfera: é necessário considerar a distância do plano ao centro. Usando a relação entre o raio da esfera, essa distância e o raio da seção, qual deve ser o diâmetro do aro?",
    "options": [
      "10 m",
      "6 m",
      "4 m",
      "8 m"
    ],
    "answer": 3,
    "explanation": "1. Centro=(3,2,3), raio R=5.\n2. O plano z=6 dista d=3 do centro.\n3. Raio da seção: √(R²−d²)=√(25−9)=4.\n4. Diâmetro=2×4=8 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-6-2",
    "subject": "engenharia-economica",
    "topic": "topic-240",
    "prompt": "A direção de um centro de pesquisas avalia comprar um equipamento por R$ 30000, pagos hoje. O equipamento gerará economias líquidas de operação de R$ 16500 no fim do primeiro ano e R$ 18150 no fim do segundo ano. Além da economia do segundo ano, será vendido nessa mesma data por R$ 3630. Não existem outros custos, receitas, impostos ou valores recuperáveis.\n\nA taxa mínima de atratividade é de 10% ao ano, e todos os fluxos futuros ocorrem no fim dos períodos informados. Pelo critério do valor presente líquido, qual é o VPL do projeto? Lembre-se de somar a venda ao fluxo final antes de descontá-lo.",
    "options": [
      "3.000,00 reais",
      "0,00 reais",
      "3.630,00 reais",
      "-3.000,00 reais"
    ],
    "answer": 0,
    "explanation": "1. Fluxo em t=0: −30000.\n2. VP do ano 1: 16500/1,1=15000.\n3. VP do ano 2: (18150+3630)/1,1²=18000.\n4. VPL=−30000+15000+18000=3000 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-7-2",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "Para modernizar as instalações, um centro de pesquisas contrata um financiamento de R$ 36000 pelo Sistema de Amortização Constante, em 12 prestações mensais. A taxa é de 1% ao mês sobre o saldo imediatamente anterior a cada pagamento. A primeira prestação vence ao final do primeiro mês, e todas as anteriores à sexta foram pagas corretamente.\n\nO setor financeiro quer reservar o valor exato da sexta prestação. Não há tarifas, seguros, correção monetária, carência ou amortizações extras. Determine primeiro a amortização mensal e o saldo devedor após cinco pagamentos. Qual valor, em reais, deve ser reservado para a sexta prestação?",
    "options": [
      "3.000,00 reais",
      "3.210,00 reais",
      "3.360,00 reais",
      "3.180,00 reais"
    ],
    "answer": 1,
    "explanation": "1. Amortização mensal=36000/12=3000.\n2. Antes da sexta prestação, saldo=36000−5×3000=21000.\n3. Juros=21000×0,01=210.\n4. Prestação=3000+210=3210 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-8-2",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Uma compra de um centro de pesquisas será financiada em duas prestações anuais iguais, pela Tabela Price. O principal é de R$ 6300, a taxa efetiva é de 10% ao ano e a primeira prestação vence exatamente um ano após a contratação. O contrato não inclui tarifas, seguros nem outros encargos.\n\nPela equivalência financeira, cada prestação é de R$ 3630. Um relatório, porém, precisa separar os juros e a amortização da primeira prestação e informar o saldo logo após seu pagamento. Considerando juros incidentes sobre o principal ainda devido, qual será esse saldo devedor?",
    "options": [
      "3.000,00 reais",
      "3.630,00 reais",
      "3.300,00 reais",
      "2.670,00 reais"
    ],
    "answer": 2,
    "explanation": "1. Juros do primeiro ano=6300×0,1=630.\n2. Amortização=3630−630=3000.\n3. Saldo após pagar=6300−3000=3300.\n4. Conferência: 3300×1,1=3630, igual à segunda prestação.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-9-2",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "A equipe de um centro de pesquisas precisa escolher entre dois equipamentos que fornecem exatamente o mesmo serviço durante um ano. A alternativa A exige R$ 15000 hoje e gera economia líquida de R$ 16500 no fim do ano. A alternativa B exige R$ 21000 hoje e gera economia líquida de R$ 23760 no fim do ano. Ambos têm valor residual zero.\n\nA taxa mínima de atratividade é de 10% ao ano. Não há diferença de risco, disponibilidade ou capacidade, e apenas uma alternativa pode ser escolhida. Para verificar se o gasto adicional em B se justifica, calcule o VPL incremental de B menos A. Qual é o resultado?",
    "options": [
      "1.260,00 reais",
      "-600,00 reais",
      "0,00 reais",
      "600,00 reais"
    ],
    "answer": 3,
    "explanation": "1. Investimento adicional=21000−15000=6000.\n2. Ganho adicional=23760−16500=7260.\n3. VPL(B−A)=−6000+7260/1,1=600.\n4. Como é positivo, B é preferida pelo critério, nas hipóteses dadas.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-10-2",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Um contrato de um centro de pesquisas prevê uma receita daqui a um ano equivalente a R$ 3300 em poder de compra de hoje. A projeção de inflação para o ano é de 10%, e a taxa real de desconto adotada é de 10% ao ano. Não haverá recebimentos antes do vencimento nem custos associados a essa receita.\n\nPara evitar misturar valores reais e nominais, a analista decide primeiro converter a receita para moeda do fim do ano e calcular a taxa nominal equivalente. Em seguida, desconta a receita nominal por essa taxa. Qual valor presente deve obter? Use a relação multiplicativa exata entre as taxas.",
    "options": [
      "3.000,00 reais",
      "3.300,00 reais",
      "3.630,00 reais",
      "2.700,00 reais"
    ],
    "answer": 0,
    "explanation": "1. Receita nominal=3300×1,1=3630.\n2. Taxa nominal=(1,1×1,1)−1=21%.\n3. VP=3630/1,21=3000.\n4. Conferência em termos reais: 3300/1,1=3000.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-11-2",
    "subject": "engenharia-economica",
    "topic": "topic-244",
    "prompt": "Uma unidade produtiva ligada a um centro de pesquisas vende um único produto por R$ 80 a unidade. O custo variável é de R$ 50 por unidade e os custos fixos mensais somam R$ 18000. A direção pretende obter lucro operacional mensal de R$ 9000, antes de impostos. Considere preços e custos constantes no intervalo de produção analisado.\n\nToda unidade produzida será vendida, não há mudança de estoque, e a capacidade máxima da instalação é de 1200 unidades por mês. Quantas unidades devem ser vendidas para atingir o lucro desejado, e essa meta cabe na capacidade informada?",
    "options": [
      "1200 unidades; não",
      "1500 unidades; sim",
      "900 unidades; sim",
      "600 unidades; sim"
    ],
    "answer": 2,
    "explanation": "1. Margem unitária=80−50=30 reais.\n2. Receita de contribuição necessária=18000+9000=27000.\n3. Quantidade=27000/30=900.\n4. Como 900≤1200, a meta cabe na capacidade.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-0-3",
    "subject": "geometria-analitica",
    "topic": "topic-226",
    "prompt": "Uma equipe de uma pequena fábrica precisa transportar material entre dois pontos de um terreno plano. No mapa cartesiano, cada unidade representa 10 metros. O depósito está em A=(4, 8) e o destino está em B=(10, 16). O trajeto atual acompanha primeiro uma rua horizontal e depois uma rua vertical, sempre no sentido do destino, sem desvios.\n\nUm novo corredor permitirá ligar A diretamente a B por um segmento de reta. A equipe faz 20 viagens de ida por dia; o retorno não entra nesta estimativa. Considerando apenas as distâncias descritas e supondo o corredor liberado em todas as viagens, quantos metros serão economizados por dia?",
    "options": [
      "2800 m",
      "2000 m",
      "160 m",
      "800 m"
    ],
    "answer": 3,
    "explanation": "1. Trajeto pelas ruas: (6+8)×10=140 m por ida.\n2. Corredor: √(6²+8²)×10=100 m.\n3. Economia por ida: 40 m.\n4. Em 20 viagens, 40×20=800 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-1-3",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "No projeto de um trilho reto para uma pequena fábrica, a direção de movimento é representada pelo vetor v=(3,4), e a origem do sistema coincide com o início do trilho. Uma peça encontra-se no ponto P=(8, 19), com coordenadas em metros. O trilho deve ser tratado como uma reta infinita para esta análise, de modo que não há restrição de comprimento.\n\nA peça será deslocada perpendicularmente até o trilho, chegando ao ponto H. Depois, um sensor medirá a distância de H à origem ao longo do trilho. Qual alternativa apresenta, nessa ordem, a distância PH e a distância da origem a H?",
    "options": [
      "20 m e 5 m",
      "25 m e 20 m",
      "5 m e 100 m",
      "5 m e 20 m"
    ],
    "answer": 3,
    "explanation": "1. P·v=25×4 e v·v=25; logo proj_v(P)=4v=(12,16).\n2. P−H=(−4,3), cuja norma é 5.\n3. ‖H‖=4‖v‖=20.\n4. Conferência: (−4,3)·(3,4)=−12+12=0; o deslocamento PH é perpendicular ao trilho.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-2-3",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Um equipamento móvel de uma pequena fábrica segue a trajetória retilínea r(t)=(4,1,0)+t(1,2,1), com coordenadas em metros e t medido em segundos a partir do início do movimento. Uma barreira de segurança é representada pelo plano x+y+z=21. O equipamento é considerado pontual, move-se com a velocidade indicada na parametrização e não altera sua direção antes de alcançar a barreira.\n\nO sistema deve emitir um alerta quando o equipamento estiver exatamente na barreira. Para programar o alerta, é preciso encontrar o instante de interseção e, em seguida, calcular a coordenada y nesse instante. Qual será essa coordenada y?",
    "options": [
      "8 m",
      "9 m",
      "4 m",
      "17 m"
    ],
    "answer": 1,
    "explanation": "1. Na trajetória, x=4+t, y=1+2t e z=t.\n2. No plano: 4+1+4t=21; portanto t=4.\n3. Substituindo em y: y=1+2×4=9.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-3-3",
    "subject": "geometria-analitica",
    "topic": "topic-233",
    "prompt": "Uma equipe de uma pequena fábrica está delimitando uma região circular de segurança no piso. O levantamento forneceu a equação x²+y²−8x−10y+16=0, com coordenadas em metros. O centro da região ainda não foi marcado no local, e a equipe precisa identificá-lo antes de instalar os sensores.\n\nUm sensor pontual será instalado em S=(7,9). A região permitida inclui tanto o interior quanto a borda do círculo. Após completar os quadrados e comparar a distância do sensor ao centro com o raio, qual é a classificação correta da posição de S?",
    "options": [
      "No interior, pois a distância ao centro é 3 m",
      "No exterior, pois a distância ao centro é 7 m",
      "No centro, pois a distância é zero",
      "Exatamente na borda, pois a distância ao centro é 5 m"
    ],
    "answer": 3,
    "explanation": "1. Complete quadrados: (x−4)²+(y−5)²=25.\n2. Centro=(4,5) e raio=5.\n3. S−C=(3,4), com norma √(9+16)=5.\n4. Distância igual ao raio: sensor na borda.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-4-3",
    "subject": "geometria-analitica",
    "topic": "topic-230",
    "prompt": "Para instalar uma cobertura triangular em uma pequena fábrica, o projeto define três vértices no espaço: A=(4,2,1), B=(7,2,1) e C=(4,6,4), em metros. A cobertura será uma única peça plana, sem sobreposição. O orçamento é calculado pela área efetiva do triângulo no espaço, e não pela área de sua projeção no piso.\n\nA empresa fornece o material por R$ 80 por metro quadrado e cobra mais R$ 200 de instalação fixa. Desconsidere desperdício, impostos e arredondamentos intermediários. Usando os vetores AB e AC, qual é o custo total da cobertura com a instalação?",
    "options": [
      "1.400,00 reais",
      "600,00 reais",
      "1.000,00 reais",
      "800,00 reais"
    ],
    "answer": 3,
    "explanation": "1. AB=(3,0,0) e AC=(0,4,3).\n2. AB×AC=(0,−9,12), de norma 15.\n3. Área triangular=15/2=7,5 m².\n4. Custo=7,5×80+200=800 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-5-3",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Um reservatório esférico de uma pequena fábrica é descrito por (x−4)²+(y−2)²+(z−3)²=25, em metros. A manutenção pretende instalar um aro circular na interseção entre a superfície do reservatório e o plano horizontal z=6. Considere uma esfera ideal, sem espessura, e um aro exatamente ajustado à seção.\n\nPara fazer o pedido da peça, não basta usar o raio da esfera: é necessário considerar a distância do plano ao centro. Usando a relação entre o raio da esfera, essa distância e o raio da seção, qual deve ser o diâmetro do aro?",
    "options": [
      "8 m",
      "10 m",
      "6 m",
      "4 m"
    ],
    "answer": 0,
    "explanation": "1. Centro=(4,2,3), raio R=5.\n2. O plano z=6 dista d=3 do centro.\n3. Raio da seção: √(R²−d²)=√(25−9)=4.\n4. Diâmetro=2×4=8 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-6-3",
    "subject": "engenharia-economica",
    "topic": "topic-240",
    "prompt": "A direção de uma pequena fábrica avalia comprar um equipamento por R$ 40000, pagos hoje. O equipamento gerará economias líquidas de operação de R$ 22000 no fim do primeiro ano e R$ 24200 no fim do segundo ano. Além da economia do segundo ano, será vendido nessa mesma data por R$ 4840. Não existem outros custos, receitas, impostos ou valores recuperáveis.\n\nA taxa mínima de atratividade é de 10% ao ano, e todos os fluxos futuros ocorrem no fim dos períodos informados. Pelo critério do valor presente líquido, qual é o VPL do projeto? Lembre-se de somar a venda ao fluxo final antes de descontá-lo.",
    "options": [
      "-4.000,00 reais",
      "4.000,00 reais",
      "0,00 reais",
      "4.840,00 reais"
    ],
    "answer": 1,
    "explanation": "1. Fluxo em t=0: −40000.\n2. VP do ano 1: 22000/1,1=20000.\n3. VP do ano 2: (24200+4840)/1,1²=24000.\n4. VPL=−40000+20000+24000=4000 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-7-3",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "Para modernizar as instalações, uma pequena fábrica contrata um financiamento de R$ 48000 pelo Sistema de Amortização Constante, em 12 prestações mensais. A taxa é de 1% ao mês sobre o saldo imediatamente anterior a cada pagamento. A primeira prestação vence ao final do primeiro mês, e todas as anteriores à sexta foram pagas corretamente.\n\nO setor financeiro quer reservar o valor exato da sexta prestação. Não há tarifas, seguros, correção monetária, carência ou amortizações extras. Determine primeiro a amortização mensal e o saldo devedor após cinco pagamentos. Qual valor, em reais, deve ser reservado para a sexta prestação?",
    "options": [
      "4.240,00 reais",
      "4.000,00 reais",
      "4.280,00 reais",
      "4.480,00 reais"
    ],
    "answer": 2,
    "explanation": "1. Amortização mensal=48000/12=4000.\n2. Antes da sexta prestação, saldo=48000−5×4000=28000.\n3. Juros=28000×0,01=280.\n4. Prestação=4000+280=4280 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-8-3",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Uma compra de uma pequena fábrica será financiada em duas prestações anuais iguais, pela Tabela Price. O principal é de R$ 8400, a taxa efetiva é de 10% ao ano e a primeira prestação vence exatamente um ano após a contratação. O contrato não inclui tarifas, seguros nem outros encargos.\n\nPela equivalência financeira, cada prestação é de R$ 4840. Um relatório, porém, precisa separar os juros e a amortização da primeira prestação e informar o saldo logo após seu pagamento. Considerando juros incidentes sobre o principal ainda devido, qual será esse saldo devedor?",
    "options": [
      "3.560,00 reais",
      "4.000,00 reais",
      "4.840,00 reais",
      "4.400,00 reais"
    ],
    "answer": 3,
    "explanation": "1. Juros do primeiro ano=8400×0,1=840.\n2. Amortização=4840−840=4000.\n3. Saldo após pagar=8400−4000=4400.\n4. Conferência: 4400×1,1=4840, igual à segunda prestação.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-9-3",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "A equipe de uma pequena fábrica precisa escolher entre dois equipamentos que fornecem exatamente o mesmo serviço durante um ano. A alternativa A exige R$ 20000 hoje e gera economia líquida de R$ 22000 no fim do ano. A alternativa B exige R$ 28000 hoje e gera economia líquida de R$ 31680 no fim do ano. Ambos têm valor residual zero.\n\nA taxa mínima de atratividade é de 10% ao ano. Não há diferença de risco, disponibilidade ou capacidade, e apenas uma alternativa pode ser escolhida. Para verificar se o gasto adicional em B se justifica, calcule o VPL incremental de B menos A. Qual é o resultado?",
    "options": [
      "800,00 reais",
      "1.680,00 reais",
      "-800,00 reais",
      "0,00 reais"
    ],
    "answer": 0,
    "explanation": "1. Investimento adicional=28000−20000=8000.\n2. Ganho adicional=31680−22000=9680.\n3. VPL(B−A)=−8000+9680/1,1=800.\n4. Como é positivo, B é preferida pelo critério, nas hipóteses dadas.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-10-3",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Um contrato de uma pequena fábrica prevê uma receita daqui a um ano equivalente a R$ 4400 em poder de compra de hoje. A projeção de inflação para o ano é de 10%, e a taxa real de desconto adotada é de 10% ao ano. Não haverá recebimentos antes do vencimento nem custos associados a essa receita.\n\nPara evitar misturar valores reais e nominais, a analista decide primeiro converter a receita para moeda do fim do ano e calcular a taxa nominal equivalente. Em seguida, desconta a receita nominal por essa taxa. Qual valor presente deve obter? Use a relação multiplicativa exata entre as taxas.",
    "options": [
      "3.600,00 reais",
      "4.000,00 reais",
      "4.400,00 reais",
      "4.840,00 reais"
    ],
    "answer": 1,
    "explanation": "1. Receita nominal=4400×1,1=4840.\n2. Taxa nominal=(1,1×1,1)−1=21%.\n3. VP=4840/1,21=4000.\n4. Conferência em termos reais: 4400/1,1=4000.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-11-3",
    "subject": "engenharia-economica",
    "topic": "topic-244",
    "prompt": "Uma unidade produtiva ligada a uma pequena fábrica vende um único produto por R$ 80 a unidade. O custo variável é de R$ 50 por unidade e os custos fixos mensais somam R$ 24000. A direção pretende obter lucro operacional mensal de R$ 12000, antes de impostos. Considere preços e custos constantes no intervalo de produção analisado.\n\nToda unidade produzida será vendida, não há mudança de estoque, e a capacidade máxima da instalação é de 1600 unidades por mês. Quantas unidades devem ser vendidas para atingir o lucro desejado, e essa meta cabe na capacidade informada?",
    "options": [
      "800 unidades; sim",
      "1600 unidades; não",
      "2000 unidades; sim",
      "1200 unidades; sim"
    ],
    "answer": 3,
    "explanation": "1. Margem unitária=80−50=30 reais.\n2. Receita de contribuição necessária=24000+12000=36000.\n3. Quantidade=36000/30=1200.\n4. Como 1200≤1600, a meta cabe na capacidade.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-0-4",
    "subject": "geometria-analitica",
    "topic": "topic-226",
    "prompt": "Uma equipe de um laboratório universitário precisa transportar material entre dois pontos de um terreno plano. No mapa cartesiano, cada unidade representa 10 metros. O depósito está em A=(5, 10) e o destino está em B=(11, 18). O trajeto atual acompanha primeiro uma rua horizontal e depois uma rua vertical, sempre no sentido do destino, sem desvios.\n\nUm novo corredor permitirá ligar A diretamente a B por um segmento de reta. A equipe faz 25 viagens de ida por dia; o retorno não entra nesta estimativa. Considerando apenas as distâncias descritas e supondo o corredor liberado em todas as viagens, quantos metros serão economizados por dia?",
    "options": [
      "1000 m",
      "3500 m",
      "2500 m",
      "200 m"
    ],
    "answer": 0,
    "explanation": "1. Trajeto pelas ruas: (6+8)×10=140 m por ida.\n2. Corredor: √(6²+8²)×10=100 m.\n3. Economia por ida: 40 m.\n4. Em 25 viagens, 40×25=1000 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-1-4",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "No projeto de um trilho reto para um laboratório universitário, a direção de movimento é representada pelo vetor v=(3,4), e a origem do sistema coincide com o início do trilho. Uma peça encontra-se no ponto P=(11, 23), com coordenadas em metros. O trilho deve ser tratado como uma reta infinita para esta análise, de modo que não há restrição de comprimento.\n\nA peça será deslocada perpendicularmente até o trilho, chegando ao ponto H. Depois, um sensor medirá a distância de H à origem ao longo do trilho. Qual alternativa apresenta, nessa ordem, a distância PH e a distância da origem a H?",
    "options": [
      "5 m e 25 m",
      "25 m e 5 m",
      "25 m e 25 m",
      "5 m e 125 m"
    ],
    "answer": 0,
    "explanation": "1. P·v=25×5 e v·v=25; logo proj_v(P)=5v=(15,20).\n2. P−H=(−4,3), cuja norma é 5.\n3. ‖H‖=5‖v‖=25.\n4. Conferência: (−4,3)·(3,4)=−12+12=0; o deslocamento PH é perpendicular ao trilho.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-2-4",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Um equipamento móvel de um laboratório universitário segue a trajetória retilínea r(t)=(5,1,0)+t(1,2,1), com coordenadas em metros e t medido em segundos a partir do início do movimento. Uma barreira de segurança é representada pelo plano x+y+z=26. O equipamento é considerado pontual, move-se com a velocidade indicada na parametrização e não altera sua direção antes de alcançar a barreira.\n\nO sistema deve emitir um alerta quando o equipamento estiver exatamente na barreira. Para programar o alerta, é preciso encontrar o instante de interseção e, em seguida, calcular a coordenada y nesse instante. Qual será essa coordenada y?",
    "options": [
      "21 m",
      "10 m",
      "11 m",
      "5 m"
    ],
    "answer": 2,
    "explanation": "1. Na trajetória, x=5+t, y=1+2t e z=t.\n2. No plano: 5+1+4t=26; portanto t=5.\n3. Substituindo em y: y=1+2×5=11.\n4. Conferência: o ponto (10,11,5) satisfaz x+y+z=26, portanto está no plano.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-3-4",
    "subject": "geometria-analitica",
    "topic": "topic-233",
    "prompt": "Uma equipe de um laboratório universitário está delimitando uma região circular de segurança no piso. O levantamento forneceu a equação x²+y²−10x−12y+36=0, com coordenadas em metros. O centro da região ainda não foi marcado no local, e a equipe precisa identificá-lo antes de instalar os sensores.\n\nUm sensor pontual será instalado em S=(8,10). A região permitida inclui tanto o interior quanto a borda do círculo. Após completar os quadrados e comparar a distância do sensor ao centro com o raio, qual é a classificação correta da posição de S?",
    "options": [
      "Exatamente na borda, pois a distância ao centro é 5 m",
      "No interior, pois a distância ao centro é 3 m",
      "No exterior, pois a distância ao centro é 7 m",
      "No centro, pois a distância é zero"
    ],
    "answer": 0,
    "explanation": "1. Complete quadrados: (x−5)²+(y−6)²=25.\n2. Centro=(5,6) e raio=5.\n3. S−C=(3,4), com norma √(9+16)=5.\n4. Distância igual ao raio: sensor na borda.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-4-4",
    "subject": "geometria-analitica",
    "topic": "topic-230",
    "prompt": "Para instalar uma cobertura triangular em um laboratório universitário, o projeto define três vértices no espaço: A=(5,2,1), B=(8,2,1) e C=(5,6,4), em metros. A cobertura será uma única peça plana, sem sobreposição. O orçamento é calculado pela área efetiva do triângulo no espaço, e não pela área de sua projeção no piso.\n\nA empresa fornece o material por R$ 100 por metro quadrado e cobra mais R$ 250 de instalação fixa. Desconsidere desperdício, impostos e arredondamentos intermediários. Usando os vetores AB e AC, qual é o custo total da cobertura com a instalação?",
    "options": [
      "1.000,00 reais",
      "1.750,00 reais",
      "750,00 reais",
      "1.250,00 reais"
    ],
    "answer": 0,
    "explanation": "1. AB=(3,0,0) e AC=(0,4,3).\n2. AB×AC=(0,−9,12), de norma 15.\n3. Área triangular=15/2=7,5 m².\n4. Custo=7,5×100+250=1000 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-5-4",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Um reservatório esférico de um laboratório universitário é descrito por (x−5)²+(y−2)²+(z−3)²=25, em metros. A manutenção pretende instalar um aro circular na interseção entre a superfície do reservatório e o plano horizontal z=6. Considere uma esfera ideal, sem espessura, e um aro exatamente ajustado à seção.\n\nPara fazer o pedido da peça, não basta usar o raio da esfera: é necessário considerar a distância do plano ao centro. Usando a relação entre o raio da esfera, essa distância e o raio da seção, qual deve ser o diâmetro do aro?",
    "options": [
      "4 m",
      "8 m",
      "10 m",
      "6 m"
    ],
    "answer": 1,
    "explanation": "1. Centro=(5,2,3), raio R=5.\n2. O plano z=6 dista d=3 do centro.\n3. Raio da seção: √(R²−d²)=√(25−9)=4.\n4. Diâmetro=2×4=8 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-6-4",
    "subject": "engenharia-economica",
    "topic": "topic-240",
    "prompt": "A direção de um laboratório universitário avalia comprar um equipamento por R$ 50000, pagos hoje. O equipamento gerará economias líquidas de operação de R$ 27500 no fim do primeiro ano e R$ 30250 no fim do segundo ano. Além da economia do segundo ano, será vendido nessa mesma data por R$ 6050. Não existem outros custos, receitas, impostos ou valores recuperáveis.\n\nA taxa mínima de atratividade é de 10% ao ano, e todos os fluxos futuros ocorrem no fim dos períodos informados. Pelo critério do valor presente líquido, qual é o VPL do projeto? Lembre-se de somar a venda ao fluxo final antes de descontá-lo.",
    "options": [
      "6.050,00 reais",
      "-5.000,00 reais",
      "5.000,00 reais",
      "0,00 reais"
    ],
    "answer": 2,
    "explanation": "1. Fluxo em t=0: −50000.\n2. VP do ano 1: 27500/1,1=25000.\n3. VP do ano 2: (30250+6050)/1,1²=30000.\n4. VPL=−50000+25000+30000=5000 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-7-4",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "Para modernizar as instalações, um laboratório universitário contrata um financiamento de R$ 60000 pelo Sistema de Amortização Constante, em 12 prestações mensais. A taxa é de 1% ao mês sobre o saldo imediatamente anterior a cada pagamento. A primeira prestação vence ao final do primeiro mês, e todas as anteriores à sexta foram pagas corretamente.\n\nO setor financeiro quer reservar o valor exato da sexta prestação. Não há tarifas, seguros, correção monetária, carência ou amortizações extras. Determine primeiro a amortização mensal e o saldo devedor após cinco pagamentos. Qual valor, em reais, deve ser reservado para a sexta prestação?",
    "options": [
      "5.600,00 reais",
      "5.300,00 reais",
      "5.000,00 reais",
      "5.350,00 reais"
    ],
    "answer": 3,
    "explanation": "1. Amortização mensal=60000/12=5000.\n2. Antes da sexta prestação, saldo=60000−5×5000=35000.\n3. Juros=35000×0,01=350.\n4. Prestação=5000+350=5350 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-8-4",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Uma compra de um laboratório universitário será financiada em duas prestações anuais iguais, pela Tabela Price. O principal é de R$ 10500, a taxa efetiva é de 10% ao ano e a primeira prestação vence exatamente um ano após a contratação. O contrato não inclui tarifas, seguros nem outros encargos.\n\nPela equivalência financeira, cada prestação é de R$ 6050. Um relatório, porém, precisa separar os juros e a amortização da primeira prestação e informar o saldo logo após seu pagamento. Considerando juros incidentes sobre o principal ainda devido, qual será esse saldo devedor?",
    "options": [
      "5.500,00 reais",
      "4.450,00 reais",
      "5.000,00 reais",
      "6.050,00 reais"
    ],
    "answer": 0,
    "explanation": "1. Juros do primeiro ano=10500×0,1=1050.\n2. Amortização=6050−1050=5000.\n3. Saldo após pagar=10500−5000=5500.\n4. Conferência: 5500×1,1=6050, igual à segunda prestação.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-9-4",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "A equipe de um laboratório universitário precisa escolher entre dois equipamentos que fornecem exatamente o mesmo serviço durante um ano. A alternativa A exige R$ 25000 hoje e gera economia líquida de R$ 27500 no fim do ano. A alternativa B exige R$ 35000 hoje e gera economia líquida de R$ 39600 no fim do ano. Ambos têm valor residual zero.\n\nA taxa mínima de atratividade é de 10% ao ano. Não há diferença de risco, disponibilidade ou capacidade, e apenas uma alternativa pode ser escolhida. Para verificar se o gasto adicional em B se justifica, calcule o VPL incremental de B menos A. Qual é o resultado?",
    "options": [
      "0,00 reais",
      "1.000,00 reais",
      "2.100,00 reais",
      "-1.000,00 reais"
    ],
    "answer": 1,
    "explanation": "1. Investimento adicional=35000−25000=10000.\n2. Ganho adicional=39600−27500=12100.\n3. VPL(B−A)=−10000+12100/1,1=1000.\n4. Como é positivo, B é preferida pelo critério, nas hipóteses dadas.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-10-4",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Um contrato de um laboratório universitário prevê uma receita daqui a um ano equivalente a R$ 5500 em poder de compra de hoje. A projeção de inflação para o ano é de 10%, e a taxa real de desconto adotada é de 10% ao ano. Não haverá recebimentos antes do vencimento nem custos associados a essa receita.\n\nPara evitar misturar valores reais e nominais, a analista decide primeiro converter a receita para moeda do fim do ano e calcular a taxa nominal equivalente. Em seguida, desconta a receita nominal por essa taxa. Qual valor presente deve obter? Use a relação multiplicativa exata entre as taxas.",
    "options": [
      "6.050,00 reais",
      "4.500,00 reais",
      "5.000,00 reais",
      "5.500,00 reais"
    ],
    "answer": 2,
    "explanation": "1. Receita nominal=5500×1,1=6050.\n2. Taxa nominal=(1,1×1,1)−1=21%.\n3. VP=6050/1,21=5000.\n4. Conferência em termos reais: 5500/1,1=5000.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-11-4",
    "subject": "engenharia-economica",
    "topic": "topic-244",
    "prompt": "Uma unidade produtiva ligada a um laboratório universitário vende um único produto por R$ 80 a unidade. O custo variável é de R$ 50 por unidade e os custos fixos mensais somam R$ 30000. A direção pretende obter lucro operacional mensal de R$ 15000, antes de impostos. Considere preços e custos constantes no intervalo de produção analisado.\n\nToda unidade produzida será vendida, não há mudança de estoque, e a capacidade máxima da instalação é de 2000 unidades por mês. Quantas unidades devem ser vendidas para atingir o lucro desejado, e essa meta cabe na capacidade informada?",
    "options": [
      "1500 unidades; sim",
      "1000 unidades; sim",
      "2000 unidades; não",
      "2500 unidades; sim"
    ],
    "answer": 0,
    "explanation": "1. Margem unitária=80−50=30 reais.\n2. Receita de contribuição necessária=30000+15000=45000.\n3. Quantidade=45000/30=1500.\n4. Como 1500≤2000, a meta cabe na capacidade.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-0-5",
    "subject": "geometria-analitica",
    "topic": "topic-226",
    "prompt": "Uma equipe de uma cooperativa precisa transportar material entre dois pontos de um terreno plano. No mapa cartesiano, cada unidade representa 10 metros. O depósito está em A=(6, 12) e o destino está em B=(12, 20). O trajeto atual acompanha primeiro uma rua horizontal e depois uma rua vertical, sempre no sentido do destino, sem desvios.\n\nUm novo corredor permitirá ligar A diretamente a B por um segmento de reta. A equipe faz 30 viagens de ida por dia; o retorno não entra nesta estimativa. Considerando apenas as distâncias descritas e supondo o corredor liberado em todas as viagens, quantos metros serão economizados por dia?",
    "options": [
      "240 m",
      "1200 m",
      "4200 m",
      "3000 m"
    ],
    "answer": 1,
    "explanation": "1. Trajeto pelas ruas: (6+8)×10=140 m por ida.\n2. Corredor: √(6²+8²)×10=100 m.\n3. Economia por ida: 40 m.\n4. Em 30 viagens, 40×30=1200 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-1-5",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "No projeto de um trilho reto para uma cooperativa, a direção de movimento é representada pelo vetor v=(3,4), e a origem do sistema coincide com o início do trilho. Uma peça encontra-se no ponto P=(14, 27), com coordenadas em metros. O trilho deve ser tratado como uma reta infinita para esta análise, de modo que não há restrição de comprimento.\n\nA peça será deslocada perpendicularmente até o trilho, chegando ao ponto H. Depois, um sensor medirá a distância de H à origem ao longo do trilho. Qual alternativa apresenta, nessa ordem, a distância PH e a distância da origem a H?",
    "options": [
      "5 m e 150 m",
      "5 m e 30 m",
      "30 m e 5 m",
      "25 m e 30 m"
    ],
    "answer": 1,
    "explanation": "1. P·v=25×6 e v·v=25; logo proj_v(P)=6v=(18,24).\n2. P−H=(−4,3), cuja norma é 5.\n3. ‖H‖=6‖v‖=30.\n4. Conferência: (−4,3)·(3,4)=−12+12=0; o deslocamento PH é perpendicular ao trilho.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-2-5",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Um equipamento móvel de uma cooperativa segue a trajetória retilínea r(t)=(6,1,0)+t(1,2,1), com coordenadas em metros e t medido em segundos a partir do início do movimento. Uma barreira de segurança é representada pelo plano x+y+z=31. O equipamento é considerado pontual, move-se com a velocidade indicada na parametrização e não altera sua direção antes de alcançar a barreira.\n\nO sistema deve emitir um alerta quando o equipamento estiver exatamente na barreira. Para programar o alerta, é preciso encontrar o instante de interseção e, em seguida, calcular a coordenada y nesse instante. Qual será essa coordenada y?",
    "options": [
      "6 m",
      "25 m",
      "12 m",
      "13 m"
    ],
    "answer": 3,
    "explanation": "1. Na trajetória, x=6+t, y=1+2t e z=t.\n2. No plano: 6+1+4t=31; portanto t=6.\n3. Substituindo em y: y=1+2×6=13.\n4. Conferência: o ponto (12,13,6) satisfaz x+y+z=31, portanto está no plano.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-3-5",
    "subject": "geometria-analitica",
    "topic": "topic-233",
    "prompt": "Uma equipe de uma cooperativa está delimitando uma região circular de segurança no piso. O levantamento forneceu a equação x²+y²−12x−14y+60=0, com coordenadas em metros. O centro da região ainda não foi marcado no local, e a equipe precisa identificá-lo antes de instalar os sensores.\n\nUm sensor pontual será instalado em S=(9,11). A região permitida inclui tanto o interior quanto a borda do círculo. Após completar os quadrados e comparar a distância do sensor ao centro com o raio, qual é a classificação correta da posição de S?",
    "options": [
      "No centro, pois a distância é zero",
      "Exatamente na borda, pois a distância ao centro é 5 m",
      "No interior, pois a distância ao centro é 3 m",
      "No exterior, pois a distância ao centro é 7 m"
    ],
    "answer": 1,
    "explanation": "1. Complete quadrados: (x−6)²+(y−7)²=25.\n2. Centro=(6,7) e raio=5.\n3. S−C=(3,4), com norma √(9+16)=5.\n4. Distância igual ao raio: sensor na borda.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-4-5",
    "subject": "geometria-analitica",
    "topic": "topic-230",
    "prompt": "Para instalar uma cobertura triangular em uma cooperativa, o projeto define três vértices no espaço: A=(6,2,1), B=(9,2,1) e C=(6,6,4), em metros. A cobertura será uma única peça plana, sem sobreposição. O orçamento é calculado pela área efetiva do triângulo no espaço, e não pela área de sua projeção no piso.\n\nA empresa fornece o material por R$ 120 por metro quadrado e cobra mais R$ 300 de instalação fixa. Desconsidere desperdício, impostos e arredondamentos intermediários. Usando os vetores AB e AC, qual é o custo total da cobertura com a instalação?",
    "options": [
      "1.500,00 reais",
      "1.200,00 reais",
      "2.100,00 reais",
      "900,00 reais"
    ],
    "answer": 1,
    "explanation": "1. AB=(3,0,0) e AC=(0,4,3).\n2. AB×AC=(0,−9,12), de norma 15.\n3. Área triangular=15/2=7,5 m².\n4. Custo=7,5×120+300=1200 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-5-5",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Um reservatório esférico de uma cooperativa é descrito por (x−6)²+(y−2)²+(z−3)²=25, em metros. A manutenção pretende instalar um aro circular na interseção entre a superfície do reservatório e o plano horizontal z=6. Considere uma esfera ideal, sem espessura, e um aro exatamente ajustado à seção.\n\nPara fazer o pedido da peça, não basta usar o raio da esfera: é necessário considerar a distância do plano ao centro. Usando a relação entre o raio da esfera, essa distância e o raio da seção, qual deve ser o diâmetro do aro?",
    "options": [
      "6 m",
      "4 m",
      "8 m",
      "10 m"
    ],
    "answer": 2,
    "explanation": "1. Centro=(6,2,3), raio R=5.\n2. O plano z=6 dista d=3 do centro.\n3. Raio da seção: √(R²−d²)=√(25−9)=4.\n4. Diâmetro=2×4=8 m.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-6-5",
    "subject": "engenharia-economica",
    "topic": "topic-240",
    "prompt": "A direção de uma cooperativa avalia comprar um equipamento por R$ 60000, pagos hoje. O equipamento gerará economias líquidas de operação de R$ 33000 no fim do primeiro ano e R$ 36300 no fim do segundo ano. Além da economia do segundo ano, será vendido nessa mesma data por R$ 7260. Não existem outros custos, receitas, impostos ou valores recuperáveis.\n\nA taxa mínima de atratividade é de 10% ao ano, e todos os fluxos futuros ocorrem no fim dos períodos informados. Pelo critério do valor presente líquido, qual é o VPL do projeto? Lembre-se de somar a venda ao fluxo final antes de descontá-lo.",
    "options": [
      "0,00 reais",
      "7.260,00 reais",
      "-6.000,00 reais",
      "6.000,00 reais"
    ],
    "answer": 3,
    "explanation": "1. Fluxo em t=0: −60000.\n2. VP do ano 1: 33000/1,1=30000.\n3. VP do ano 2: (36300+7260)/1,1²=36000.\n4. VPL=−60000+30000+36000=6000 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-7-5",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "Para modernizar as instalações, uma cooperativa contrata um financiamento de R$ 72000 pelo Sistema de Amortização Constante, em 12 prestações mensais. A taxa é de 1% ao mês sobre o saldo imediatamente anterior a cada pagamento. A primeira prestação vence ao final do primeiro mês, e todas as anteriores à sexta foram pagas corretamente.\n\nO setor financeiro quer reservar o valor exato da sexta prestação. Não há tarifas, seguros, correção monetária, carência ou amortizações extras. Determine primeiro a amortização mensal e o saldo devedor após cinco pagamentos. Qual valor, em reais, deve ser reservado para a sexta prestação?",
    "options": [
      "6.420,00 reais",
      "6.720,00 reais",
      "6.360,00 reais",
      "6.000,00 reais"
    ],
    "answer": 0,
    "explanation": "1. Amortização mensal=72000/12=6000.\n2. Antes da sexta prestação, saldo=72000−5×6000=42000.\n3. Juros=42000×0,01=420.\n4. Prestação=6000+420=6420 reais.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-8-5",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Uma compra de uma cooperativa será financiada em duas prestações anuais iguais, pela Tabela Price. O principal é de R$ 12600, a taxa efetiva é de 10% ao ano e a primeira prestação vence exatamente um ano após a contratação. O contrato não inclui tarifas, seguros nem outros encargos.\n\nPela equivalência financeira, cada prestação é de R$ 7260. Um relatório, porém, precisa separar os juros e a amortização da primeira prestação e informar o saldo logo após seu pagamento. Considerando juros incidentes sobre o principal ainda devido, qual será esse saldo devedor?",
    "options": [
      "7.260,00 reais",
      "6.600,00 reais",
      "5.340,00 reais",
      "6.000,00 reais"
    ],
    "answer": 1,
    "explanation": "1. Juros do primeiro ano=12600×0,1=1260.\n2. Amortização=7260−1260=6000.\n3. Saldo após pagar=12600−6000=6600.\n4. Conferência: 6600×1,1=7260, igual à segunda prestação.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-9-5",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "A equipe de uma cooperativa precisa escolher entre dois equipamentos que fornecem exatamente o mesmo serviço durante um ano. A alternativa A exige R$ 30000 hoje e gera economia líquida de R$ 33000 no fim do ano. A alternativa B exige R$ 42000 hoje e gera economia líquida de R$ 47520 no fim do ano. Ambos têm valor residual zero.\n\nA taxa mínima de atratividade é de 10% ao ano. Não há diferença de risco, disponibilidade ou capacidade, e apenas uma alternativa pode ser escolhida. Para verificar se o gasto adicional em B se justifica, calcule o VPL incremental de B menos A. Qual é o resultado?",
    "options": [
      "-1.200,00 reais",
      "0,00 reais",
      "1.200,00 reais",
      "2.520,00 reais"
    ],
    "answer": 2,
    "explanation": "1. Investimento adicional=42000−30000=12000.\n2. Ganho adicional=47520−33000=14520.\n3. VPL(B−A)=−12000+14520/1,1=1200.\n4. Como é positivo, B é preferida pelo critério, nas hipóteses dadas.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-10-5",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Um contrato de uma cooperativa prevê uma receita daqui a um ano equivalente a R$ 6600 em poder de compra de hoje. A projeção de inflação para o ano é de 10%, e a taxa real de desconto adotada é de 10% ao ano. Não haverá recebimentos antes do vencimento nem custos associados a essa receita.\n\nPara evitar misturar valores reais e nominais, a analista decide primeiro converter a receita para moeda do fim do ano e calcular a taxa nominal equivalente. Em seguida, desconta a receita nominal por essa taxa. Qual valor presente deve obter? Use a relação multiplicativa exata entre as taxas.",
    "options": [
      "6.600,00 reais",
      "7.260,00 reais",
      "5.400,00 reais",
      "6.000,00 reais"
    ],
    "answer": 3,
    "explanation": "1. Receita nominal=6600×1,1=7260.\n2. Taxa nominal=(1,1×1,1)−1=21%.\n3. VP=7260/1,21=6000.\n4. Conferência em termos reais: 6600/1,1=6000.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "long-case-11-5",
    "subject": "engenharia-economica",
    "topic": "topic-244",
    "prompt": "Uma unidade produtiva ligada a uma cooperativa vende um único produto por R$ 80 a unidade. O custo variável é de R$ 50 por unidade e os custos fixos mensais somam R$ 36000. A direção pretende obter lucro operacional mensal de R$ 18000, antes de impostos. Considere preços e custos constantes no intervalo de produção analisado.\n\nToda unidade produzida será vendida, não há mudança de estoque, e a capacidade máxima da instalação é de 2400 unidades por mês. Quantas unidades devem ser vendidas para atingir o lucro desejado, e essa meta cabe na capacidade informada?",
    "options": [
      "3000 unidades; sim",
      "1800 unidades; sim",
      "1200 unidades; sim",
      "2400 unidades; não"
    ],
    "answer": 1,
    "explanation": "1. Margem unitária=80−50=30 reais.\n2. Receita de contribuição necessária=36000+18000=54000.\n3. Quantidade=54000/30=1800.\n4. Como 1800≤2400, a meta cabe na capacidade.",
    "level": "Difícil",
    "xp": 10
  }
];
