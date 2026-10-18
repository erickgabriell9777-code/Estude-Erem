import type {Question} from "./study-data";
export const readingBatchQuestions:Question[] = [
  {
    "id": "reading-batch1-1",
    "subject": "financeira",
    "topic": "topic-48",
    "level": "Médio",
    "prompt": "Uma estudante recebe R$ 2.400 por mês e está organizando o orçamento para comprar um computador sem assumir novas parcelas. Seu registro mostra R$ 900 de moradia, R$ 550 de alimentação, R$ 250 de transporte e R$ 200 de outros gastos. Ela pretende separar R$ 400 mensais para a compra.\n\nConsiderando apenas essas entradas e saídas, sem rendimentos ou gastos adicionais, o plano cabe no orçamento? Qual valor permanece livre depois de separar a quantia planejada?",
    "options": [
      "Sim; restam R$ 100.",
      "Sim; restam R$ 500.",
      "Não; faltam R$ 100.",
      "Sim; restam R$ 900."
    ],
    "answer": 0,
    "explanation": "1. Some as despesas: 900 + 550 + 250 + 200 = 1.900.\n2. Subtraia da renda: 2.400 − 1.900 = 500.\n3. Reserve os 400 destinados ao computador: 500 − 400 = 100.\n4. O plano cabe nos valores informados e deixa 100 livres; isso não garante que despesas omitidas estejam cobertas.",
    "xp": 10,
    "sourceId": "batch-bcb"
  },
  {
    "id": "reading-batch1-2",
    "subject": "financeira",
    "topic": "topic-217",
    "level": "Médio",
    "prompt": "Uma pessoa inicia a semana com R$ 150 disponíveis. Na segunda-feira deve pagar R$ 300; na quarta-feira receberá R$ 600; na sexta-feira terá outra despesa de R$ 200. Os valores são certos, mas não há cheque especial nem possibilidade de antecipar o recebimento.\n\nAo analisar somente o saldo de sexta, ela conclui que não terá dificuldade para cumprir os pagamentos. Qual avaliação considera corretamente a ordem das movimentações?",
    "options": [
      "Faltam R$ 300 na segunda-feira e o saldo final é R$ 100.",
      "O saldo final seria R$ 250, mas faltam R$ 150 na segunda-feira.",
      "O saldo final seria R$ 250 e todos os pagamentos cabem nas datas previstas.",
      "O saldo final seria negativo em R$ 150."
    ],
    "answer": 1,
    "explanation": "1. Na segunda há 150 disponíveis para pagar 300.\n2. A diferença de 150 precisa ser resolvida antes do vencimento; o recebimento posterior não paga retroativamente a conta.\n3. O saldo aritmético ao fim seria 150 − 300 + 600 − 200 = 250.\n4. Saldo final positivo e disponibilidade em cada data são condições diferentes.",
    "xp": 10,
    "sourceId": "batch-bcb"
  },
  {
    "id": "reading-batch1-3",
    "subject": "financeira",
    "topic": "topic-192",
    "level": "Difícil",
    "prompt": "Uma família sabe que pagará R$ 1.800 de material e matrícula escolar daqui a seis meses. Já guardou R$ 300 exclusivamente para essa despesa e quer completar o valor com seis depósitos mensais iguais. Para este exercício, ignore inflação, juros e alterações no preço.\n\nQual depósito mensal atende à meta, e como esse gasto deve ser tratado no planejamento, considerando que sua data e seu valor já são conhecidos?",
    "options": [
      "R$ 250 por mês; receita variável.",
      "R$ 350 por mês; despesa já totalmente paga.",
      "R$ 250 por mês; despesa prevista.",
      "R$ 300 por mês; emergência imprevisível."
    ],
    "answer": 2,
    "explanation": "1. Calcule o que falta: 1.800 − 300 = 1.500.\n2. Distribua esse valor em seis depósitos: 1.500 ÷ 6 = 250.\n3. Confira: 300 + 6 × 250 = 1.800.\n4. O gasto é previsto e sazonal; não se torna uma emergência só por ser elevado.",
    "xp": 10,
    "sourceId": "batch-bcb"
  },
  {
    "id": "reading-batch1-4",
    "subject": "financeira",
    "topic": "topic-87",
    "level": "Médio",
    "prompt": "Duas amigas desejam comprar juntas um equipamento de R$ 2.700 para produzir materiais escolares. Elas possuem R$ 900 guardados e podem reservar, ao todo, R$ 300 ao final de cada mês. Não haverá rendimento, alteração no preço ou retirada do dinheiro durante o período.\n\nUma delas divide o preço total por 300 e afirma que serão necessários nove meses. Qual revisão do cálculo considera corretamente a quantia já acumulada?",
    "options": [
      "Faltam nove meses, pois o valor guardado não entra na meta.",
      "Faltam três meses, pois basta repetir o saldo atual.",
      "Faltam doze meses, pois o saldo deve ser somado ao preço.",
      "Faltam seis meses, pois ainda precisam juntar R$ 1.800."
    ],
    "answer": 3,
    "explanation": "1. Identifique a meta total: 2.700.\n2. Desconte os 900 já disponíveis: faltam 1.800.\n3. Divida pelo depósito conjunto mensal: 1.800 ÷ 300 = 6.\n4. Seis depósitos completam a meta; contar nove meses ignoraria o saldo inicial.",
    "xp": 10,
    "sourceId": "batch-bcb"
  },
  {
    "id": "reading-batch1-5",
    "subject": "financeira",
    "topic": "topic-86",
    "level": "Médio",
    "prompt": "Uma república precisa comprar pelo menos 2 kg de arroz para uma refeição coletiva. No mercado, há embalagens de 500 g por R$ 4,80 e de 1 kg por R$ 9,00. O arroz tem a mesma qualidade, não há promoções por quantidade e qualquer sobra terá utilidade.\n\nQual compra atende exatamente à necessidade com menor desembolso, e qual é a economia em relação a comprar somente embalagens de 500 g?",
    "options": [
      "Duas embalagens de 1 kg; economia de R$ 1,20.",
      "Quatro embalagens de 500 g; economia de R$ 1,20.",
      "Duas embalagens de 500 g; economia de R$ 8,40.",
      "Duas embalagens de 1 kg; economia de R$ 0,60."
    ],
    "answer": 0,
    "explanation": "1. Para 2 kg, são necessárias quatro embalagens de 500 g ou duas de 1 kg.\n2. A primeira opção custa 4 × 4,80 = 19,20.\n3. A segunda custa 2 × 9,00 = 18,00.\n4. A economia total é 19,20 − 18,00 = 1,20; compare quantidades equivalentes.",
    "xp": 10,
    "sourceId": "batch-bcb"
  },
  {
    "id": "reading-batch1-6",
    "subject": "financeira",
    "topic": "topic-49",
    "level": "Difícil",
    "prompt": "Um notebook necessário para o curso tem preço de etiqueta de R$ 2.000. A loja oferece pagamento à vista com 8% de desconto ou dez parcelas de R$ 200. A estudante já dispõe do dinheiro e quer comparar apenas o total nominal desembolsado, sem considerar rendimentos, inflação ou a utilidade de manter uma reserva.\n\nQual é a diferença entre os totais e qual interpretação está correta dentro dessas hipóteses?",
    "options": [
      "O pagamento à vista custa R$ 160 a mais.",
      "O parcelamento custa R$ 160 a mais que o pagamento à vista.",
      "O parcelamento custa R$ 16 a mais que o pagamento à vista.",
      "Os totais são iguais porque as parcelas não têm acréscimo sobre a etiqueta."
    ],
    "answer": 1,
    "explanation": "1. Calcule o desconto: 2.000 × 0,08 = 160.\n2. O preço à vista é 2.000 − 160 = 1.840.\n3. O total das parcelas é 10 × 200 = 2.000.\n4. A diferença nominal é 160; a expressão sem acréscimo sobre a etiqueta não elimina o desconto perdido.",
    "xp": 10,
    "sourceId": "batch-bcb"
  },
  {
    "id": "reading-batch1-7",
    "subject": "financeira",
    "topic": "topic-48",
    "level": "Médio",
    "prompt": "Uma família estima renda mensal de R$ 3.000 e despesas de R$ 2.850. Ao conferir os extratos, encontra uma assinatura de R$ 80 e uma tarifa de R$ 40 que ficaram fora do registro. As duas cobranças serão mantidas no próximo mês, e a família quer guardar R$ 200 sem mudar a renda.\n\nQual redução nas despesas corrigidas seria necessária para atingir essa meta mensal?",
    "options": [
      "R$ 120.",
      "R$ 320.",
      "R$ 170.",
      "R$ 50."
    ],
    "answer": 2,
    "explanation": "1. Corrija as despesas: 2.850 + 80 + 40 = 2.970.\n2. O saldo real é 3.000 − 2.970 = 30.\n3. A meta de 200 excede o saldo em 200 − 30 = 170.\n4. Cortar 170 deixaria despesas de 2.800 e permitiria reservar 200.",
    "xp": 10,
    "sourceId": "batch-bcb"
  },
  {
    "id": "reading-batch1-8",
    "subject": "financeira",
    "topic": "topic-150",
    "level": "Médio",
    "prompt": "Uma estudante gastava R$ 500 mensais com entregas de comida. Em abril, reduziu esse gasto em 20%. Em maio, por causa de uma rotina mais intensa, a despesa aumentou 20% em relação ao valor de abril. Nenhuma outra alteração ocorreu nesses dois meses.\n\nEla afirma que voltou exatamente ao valor inicial porque os percentuais são iguais. Qual valor foi gasto em maio e por que a conclusão dela precisa ser revista?",
    "options": [
      "R$ 500; percentuais iguais sempre se anulam.",
      "R$ 520; o aumento sempre supera qualquer desconto.",
      "R$ 400; o segundo percentual não altera o gasto.",
      "R$ 480; os dois percentuais incidem sobre bases diferentes."
    ],
    "answer": 3,
    "explanation": "1. Em abril, 500 × 0,80 = 400.\n2. Em maio, o aumento é calculado sobre 400: 400 × 0,20 = 80.\n3. O novo total é 400 + 80 = 480.\n4. O resultado fica 20 abaixo do inicial porque redução e aumento usam bases distintas.",
    "xp": 10,
    "sourceId": "batch-bcb"
  },
  {
    "id": "reading-batch1-9",
    "subject": "geografia",
    "topic": "topic-16",
    "level": "Difícil",
    "prompt": "Uma equipe planeja uma caminhada entre uma escola e um centro cultural. Na carta impressa, em escala 1:50.000, o percurso marcado mede 6 cm. A equipe estima velocidade média constante de 4 km/h e, apenas para este planejamento inicial, desconsidera paradas, desníveis e desvios.\n\nQual distância real e qual duração aproximada correspondem a esse percurso? Use as medidas fornecidas no texto, pois o tamanho da figura na tela pode variar.",
    "options": [
      "3 km e 45 minutos.",
      "30 km e 45 minutos.",
      "3 km e 90 minutos.",
      "0,3 km e 4,5 minutos."
    ],
    "answer": 0,
    "explanation": "1. Converta a medida pela escala: 6 × 50.000 = 300.000 cm.\n2. Divida por 100.000 para obter 3 km.\n3. O tempo é 3 ÷ 4 = 0,75 hora.\n4. Converta para minutos: 0,75 × 60 = 45.",
    "xp": 10,
    "sourceId": "batch-atlas"
  },
  {
    "id": "reading-batch1-10",
    "subject": "geografia",
    "topic": "topic-16",
    "level": "Médio",
    "prompt": "Um mapa foi produzido em escala 1:100.000. Para uma apresentação, o professor ampliou toda a imagem para 200% das dimensões lineares, incluindo ruas, símbolos e a barra de escala. Uma distância que ocupava 2 cm no original passou a ocupar 4 cm na impressão ampliada.\n\nQual é a nova escala numérica e o que acontece com a validade da escala gráfica que foi ampliada junto com o mapa?",
    "options": [
      "1:100.000; as dimensões impressas não afetam a escala numérica.",
      "1:50.000; a escala gráfica continua proporcionalmente válida.",
      "1:200.000; a escala gráfica continua proporcionalmente válida.",
      "1:50.000; a escala gráfica obrigatoriamente perde a validade."
    ],
    "answer": 1,
    "explanation": "1. A distância real continua sendo 2 × 100.000 = 200.000 cm.\n2. Na nova impressão, ela é representada por 4 cm.\n3. A razão passa a 4:200.000 = 1:50.000.\n4. A barra gráfica foi ampliada na mesma proporção, mantendo sua relação com as distâncias representadas.",
    "xp": 10,
    "sourceId": "batch-atlas"
  },
  {
    "id": "reading-batch1-11",
    "subject": "geografia",
    "topic": "topic-16",
    "level": "Médio",
    "prompt": "Uma área retangular de proteção ambiental aparece em uma carta na escala 1:20.000. Seus lados medem 3 cm e 2 cm no papel. O município precisa estimar a área real para um relatório, usando a aproximação de terreno plano e a equivalência de 1 hectare a 10.000 m².\n\nQual é a área real? Lembre-se de que uma escala linear deve ser aplicada às duas dimensões antes do cálculo da área.",
    "options": [
      "240 hectares.",
      "0,24 hectare.",
      "24 hectares.",
      "12 hectares."
    ],
    "answer": 2,
    "explanation": "1. Cada centímetro representa 20.000 cm, ou 200 m.\n2. Os lados reais são 600 m e 400 m.\n3. A área é 600 × 400 = 240.000 m².\n4. Divida por 10.000: a área corresponde a 24 hectares.",
    "xp": 10,
    "sourceId": "batch-atlas"
  },
  {
    "id": "reading-batch1-12",
    "subject": "geografia",
    "topic": "topic-16",
    "level": "Difícil",
    "prompt": "Dois mapas da mesma cidade foram produzidos para objetivos diferentes. O mapa A usa escala 1:10.000 e o mapa B usa escala 1:250.000. Uma rua de 500 m deve ser identificada com detalhes por uma equipe de vistoria, que usará mapas impressos no tamanho original.\n\nEm qual mapa a rua aparece maior e quais comprimentos ela ocupa, respectivamente, nos mapas A e B?",
    "options": [
      "No mapa B; 0,2 cm em A e 5 cm em B.",
      "No mapa A; 50 cm em A e 2 cm em B.",
      "Em ambos igualmente; 5 cm em cada mapa.",
      "No mapa A; 5 cm em A e 0,2 cm em B."
    ],
    "answer": 3,
    "explanation": "1. Converta a rua: 500 m = 50.000 cm.\n2. No mapa A, 50.000 ÷ 10.000 = 5 cm.\n3. No mapa B, 50.000 ÷ 250.000 = 0,2 cm.\n4. A escala de maior razão, 1:10.000, representa a rua com maior tamanho e potencial de detalhe.",
    "xp": 10,
    "sourceId": "batch-atlas"
  },
  {
    "id": "reading-batch1-13",
    "subject": "geografia",
    "topic": "topic-256",
    "level": "Médio",
    "prompt": "Uma embarcação transmite a posição 20° S, 40° O. Ao registrar os dados, um aluno inverte os dois números e escreve 40° S, 20° O, alegando que ambos os pares localizam o mesmo ponto porque continuam nos mesmos hemisférios. Considere o sistema convencional de coordenadas geográficas.\n\nQual explicação identifica corretamente o problema desse registro?",
    "options": [
      "Latitude e longitude medem posições em relação a referências diferentes; inverter os valores muda o ponto.",
      "Os dois pares são equivalentes porque possuem a mesma soma.",
      "O primeiro valor é sempre altitude, de modo que nenhum par localiza um ponto.",
      "Todo ponto nos hemisférios sul e oeste tem a mesma coordenada."
    ],
    "answer": 0,
    "explanation": "1. A latitude é referida ao Equador.\n2. A longitude é referida ao meridiano de Greenwich.\n3. No primeiro par, a latitude é 20° S e a longitude é 40° O.\n4. Trocá-las altera as duas posições angulares, ainda que os hemisférios permaneçam os mesmos.",
    "xp": 10,
    "sourceId": "batch-atlas"
  },
  {
    "id": "reading-batch1-14",
    "subject": "geografia",
    "topic": "topic-256",
    "level": "Médio",
    "prompt": "Um levantamento registra dois pontos: A em 10° N, 30° O e B em 10° S, 30° O. A equipe quer descrever a relação entre eles sem calcular distância em quilômetros e sem confundir latitude com longitude. As coordenadas são geográficas, não coordenadas cartesianas.\n\nQual afirmação é compatível com esses dados?",
    "options": [
      "Estão separados por 60° de longitude.",
      "Estão no mesmo meridiano, em lados opostos do Equador, separados por 20° de latitude.",
      "Estão no mesmo paralelo e no mesmo hemisfério norte.",
      "Têm longitudes opostas e a mesma latitude."
    ],
    "answer": 1,
    "explanation": "1. As longitudes são iguais: 30° O.\n2. Portanto, os pontos pertencem ao mesmo meridiano.\n3. As latitudes são 10° ao norte e 10° ao sul do Equador.\n4. A separação angular em latitude é 10° + 10° = 20°.",
    "xp": 10,
    "sourceId": "batch-atlas"
  },
  {
    "id": "reading-batch1-15",
    "subject": "geografia",
    "topic": "topic-257",
    "level": "Difícil",
    "prompt": "Uma pesquisadora pretende comparar visualmente as áreas de países em um mapa-múndi. Para esse trabalho, é essencial preservar a proporção entre as áreas representadas, mesmo que o formato de alguns territórios pareça diferente. Outro pesquisador sugere que qualquer projeção serve, desde que todos os países estejam presentes.\n\nQual propriedade cartográfica atende melhor ao objetivo definido?",
    "options": [
      "Ausência completa de todas as deformações.",
      "Apenas centralizar o maior país na folha.",
      "Equivalência de áreas.",
      "Conformidade de ângulos como única exigência."
    ],
    "answer": 2,
    "explanation": "1. Identifique o critério: comparar áreas relativas.\n2. Projeções equivalentes preservam a proporção entre áreas.\n3. Preservar ângulos é outra propriedade e não garante equivalência.\n4. Nenhuma projeção plana elimina simultaneamente todas as deformações da superfície terrestre.",
    "xp": 10,
    "sourceId": "batch-atlas"
  },
  {
    "id": "reading-batch1-16",
    "subject": "geografia",
    "topic": "topic-257",
    "level": "Médio",
    "prompt": "Durante uma apresentação, uma equipe promete construir um único mapa plano do mundo que conserve, em todos os lugares, áreas, formas e distâncias exatamente como na superfície terrestre. O projeto não estabelece prioridade entre essas propriedades e afirma que bastaria melhorar a resolução da imagem.\n\nQual avaliação é conceitualmente adequada, considerando o problema das projeções cartográficas?",
    "options": [
      "A promessa é viável se forem usadas cores suficientes.",
      "A promessa é viável desde que a escala seja escrita no rodapé.",
      "Somente mapas em papel apresentam deformações; mapas digitais nunca apresentam.",
      "A promessa é inviável; mais resolução não elimina as deformações decorrentes da planificação."
    ],
    "answer": 3,
    "explanation": "1. O problema é representar uma superfície curva em um plano.\n2. A projeção estabelece uma transformação geométrica.\n3. Essa transformação exige escolhas e produz deformações.\n4. Resolução melhora a nitidez, mas não remove a limitação geométrica.",
    "xp": 10,
    "sourceId": "batch-atlas"
  },
  {
    "id": "reading-batch1-17",
    "subject": "redacao",
    "topic": "topic-6",
    "level": "Médio",
    "prompt": "Uma turma prepara um texto sobre barreiras ao acesso a bibliotecas públicas. A proposta pede a defesa de um ponto de vista sobre o problema. Durante o planejamento, uma aluna escreve apenas: “Bibliotecas são locais que reúnem livros”. A frase informa o significado do termo, mas ainda não orienta uma argumentação.\n\nQual reformulação apresenta uma tese delimitada, que possa ser sustentada ao longo do texto?",
    "options": [
      "Ampliar horários e melhorar o transporte até as bibliotecas pode reduzir barreiras ao acesso à leitura.",
      "Biblioteca é uma palavra formada por várias letras.",
      "Existem livros grandes e livros pequenos em muitas estantes.",
      "A redação terá introdução, desenvolvimento e conclusão."
    ],
    "answer": 0,
    "explanation": "1. Identifique o tema: dificuldades de acesso às bibliotecas.\n2. Uma tese deve apresentar uma posição discutível.\n3. A alternativa correta aponta medidas e uma relação com o problema.\n4. As demais são definições, observações ou comentários sobre a forma do texto.",
    "xp": 10,
    "sourceId": "batch-inep"
  },
  {
    "id": "reading-batch1-18",
    "subject": "redacao",
    "topic": "topic-7",
    "level": "Difícil",
    "prompt": "Em uma redação sobre mobilidade urbana, um estudante afirma que o transporte coletivo deve receber investimentos. Em seguida, lista três números sobre ônibus, mas não informa a origem dos dados nem explica como eles sustentam sua posição. O parágrafo termina repetindo a tese inicial.\n\nQual revisão melhora a argumentação sem inventar informações ou substituir análise por mera repetição?",
    "options": [
      "Trocar todos os conectivos por palavras raras sem mudar o raciocínio.",
      "Conferir a fonte dos dados e explicar a relação entre as evidências e a necessidade de investimento.",
      "Acrescentar números maiores sem verificar a origem.",
      "Repetir a tese mais três vezes para ocupar o espaço disponível."
    ],
    "answer": 1,
    "explanation": "1. Localize a afirmação que precisa de sustentação.\n2. Verifique se as evidências são confiáveis e pertinentes.\n3. Explique o que os dados permitem concluir sobre o tema.\n4. A relação entre evidência e tese forma o argumento; quantidade de números não substitui raciocínio.",
    "xp": 10,
    "sourceId": "batch-inep"
  },
  {
    "id": "reading-batch1-19",
    "subject": "redacao",
    "topic": "topic-8",
    "level": "Médio",
    "prompt": "Para discutir hábitos de leitura, um aluno entrevista dois colegas que não costumam visitar bibliotecas. Com base somente nessas conversas, escreve que nenhum jovem brasileiro gosta de ler. A atividade não forneceu uma pesquisa representativa nem informações sobre outras formas de leitura.\n\nQual avaliação respeita o alcance das evidências disponíveis?",
    "options": [
      "A ausência de visitas à biblioteca prova ausência de qualquer leitura.",
      "A conclusão fica comprovada se for escrita em linguagem formal.",
      "O relato permite falar dos entrevistados, mas não sustenta a conclusão sobre todos os jovens brasileiros.",
      "Duas entrevistas sempre representam toda a população nacional."
    ],
    "answer": 2,
    "explanation": "1. Identifique a amostra: apenas dois colegas.\n2. Compare a amostra com o grupo sobre o qual a conclusão foi feita.\n3. Visitar biblioteca e gostar de ler também são medidas diferentes.\n4. A conclusão generaliza além dos dados e precisa ser limitada ou apoiada por outras evidências.",
    "xp": 10,
    "sourceId": "batch-inep"
  },
  {
    "id": "reading-batch1-20",
    "subject": "redacao",
    "topic": "topic-58",
    "level": "Médio",
    "prompt": "Um texto apresenta duas informações: a prefeitura abriu novas bibliotecas de bairro; parte dos moradores ainda não consegue frequentá-las por incompatibilidade de horários. A autora quer relacionar a iniciativa positiva à permanência de uma limitação, preservando o sentido das duas frases.\n\nQual articulação expressa essa relação com clareza?",
    "options": [
      "A prefeitura abriu novas bibliotecas; portanto, nenhum morador enfrenta dificuldade de acesso.",
      "A prefeitura abriu novas bibliotecas porque todos os horários são incompatíveis.",
      "A prefeitura abriu novas bibliotecas, logo todos os moradores passaram a frequentá-las.",
      "A prefeitura abriu novas bibliotecas; no entanto, os horários ainda limitam o acesso de parte dos moradores."
    ],
    "answer": 3,
    "explanation": "1. A primeira informação descreve uma ampliação da oferta.\n2. A segunda apresenta uma dificuldade que permanece.\n3. A relação pretendida é de contraste, não de conclusão automática.\n4. No entanto liga os enunciados sem apagar a limitação nem criar uma causa não demonstrada.",
    "xp": 10,
    "sourceId": "batch-inep"
  },
  {
    "id": "reading-batch1-21",
    "subject": "redacao",
    "topic": "topic-121",
    "level": "Difícil",
    "prompt": "Uma estudante planeja uma redação sobre desinformação em saúde. Ela tem uma tese, dois argumentos e uma proposta de ação, mas colocou tudo em uma lista sem decidir a função de cada parte. O objetivo agora é construir uma sequência em que cada parágrafo contribua para a defesa do ponto de vista.\n\nQual organização oferece uma progressão argumentativa coerente?",
    "options": [
      "Apresentar a tese, desenvolver e relacionar os argumentos ao problema, depois propor uma ação compatível com o diagnóstico.",
      "Começar com uma proposta sem relação com o tema e concluir com uma lista de palavras.",
      "Repetir a mesma frase em todos os parágrafos sem acrescentar justificativas.",
      "Organizar os parágrafos exclusivamente pelo número de letras das palavras iniciais."
    ],
    "answer": 0,
    "explanation": "1. Identifique a posição central que será defendida.\n2. Defina o papel de cada argumento na sustentação dessa posição.\n3. Organize os parágrafos para acrescentarem informação relevante.\n4. A proposta final deve responder ao problema discutido, preservando a unidade do texto.",
    "xp": 10,
    "sourceId": "batch-inep"
  },
  {
    "id": "reading-batch1-22",
    "subject": "redacao",
    "topic": "topic-258",
    "level": "Médio",
    "prompt": "Em uma redação sobre dificuldade de acesso a atividades culturais, o desenvolvimento aponta falta de divulgação e horários incompatíveis com a jornada de trabalho. Na conclusão, a autora precisa propor uma intervenção relacionada a esse diagnóstico e que respeite os direitos humanos.\n\nQual proposta responde de modo mais direto aos problemas identificados?",
    "options": [
      "A secretaria deve mudar apenas a cor dos cartazes, sem divulgar horários ou locais.",
      "A secretaria de cultura pode divulgar a programação em canais acessíveis e oferecer horários alternativos, para ampliar a participação.",
      "A escola deve proibir todas as atividades culturais para evitar filas.",
      "Os moradores devem ser punidos coletivamente por não comparecerem."
    ],
    "answer": 1,
    "explanation": "1. Recupere as duas barreiras discutidas: informação e horário.\n2. Procure ações que incidam sobre essas barreiras.\n3. Identifique quem pode executá-las e com qual finalidade.\n4. Divulgação acessível e horários alternativos guardam relação com o diagnóstico e respeitam os participantes.",
    "xp": 10,
    "sourceId": "batch-inep"
  },
  {
    "id": "reading-batch1-23",
    "subject": "redacao",
    "topic": "topic-122",
    "level": "Médio",
    "prompt": "Ao revisar uma redação sobre acesso à internet, um estudante percebe que a introdução defende a ampliação do acesso, mas um parágrafo do desenvolvimento afirma que nenhuma pessoa deveria utilizar a rede. O texto não apresenta essa segunda posição como opinião de terceiros nem explica a aparente mudança.\n\nQual revisão deve vir antes de uma simples troca de palavras por sinônimos?",
    "options": [
      "Adicionar conectivos de conclusão entre quaisquer frases.",
      "Retirar todos os exemplos para esconder a mudança de posição.",
      "Examinar a contradição e reconstruir a relação do parágrafo com a tese.",
      "Manter a contradição e alterar apenas a fonte do título."
    ],
    "answer": 2,
    "explanation": "1. Compare a posição da introdução com a do desenvolvimento.\n2. Identifique se há uma oposição explicada ou uma contradição não resolvida.\n3. Decida qual argumento realmente sustenta a tese e reescreva o trecho.\n4. Só depois refine a expressão; substituições vocabulares não corrigem sozinhas o raciocínio.",
    "xp": 10,
    "sourceId": "batch-inep"
  },
  {
    "id": "reading-batch1-24",
    "subject": "redacao",
    "topic": "topic-164",
    "level": "Difícil",
    "prompt": "Uma redação defende a ampliação de ciclovias. O autor reconhece que a mudança pode reduzir vagas de estacionamento em algumas ruas, mas pretende responder à objeção sem desqualificar quem depende de automóvel. Nenhum levantamento de impacto foi apresentado até esse ponto.\n\nQual desenvolvimento mantém o debate argumentativo e evita afirmar resultados que ainda não foram demonstrados?",
    "options": [
      "Afirmar que toda pessoa que discorda é incapaz de raciocinar.",
      "Garantir, sem dados, que nenhuma rua sofrerá alteração.",
      "Abandonar o tema e apresentar uma lista de destinos turísticos.",
      "Reconhecer o conflito de usos e defender um planejamento apoiado em estudos locais de circulação e acesso."
    ],
    "answer": 3,
    "explanation": "1. Identifique a objeção: disputa pelo espaço viário.\n2. Reconhecê-la não exige abandonar a tese.\n3. Uma resposta pode delimitar condições e solicitar evidências pertinentes.\n4. O planejamento com estudos locais enfrenta a objeção sem ataque pessoal ou garantia infundada.",
    "xp": 10,
    "sourceId": "batch-inep"
  }
];
