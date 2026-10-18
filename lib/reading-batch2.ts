import type {Question} from "./study-data";
export const readingBatch2Questions:Question[] = [
  {
    "id": "reading-batch2-1",
    "subject": "fisica",
    "topic": "topic-259",
    "level": "Difícil",
    "prompt": "Um ônibus escolar percorre uma avenida retilínea em duas etapas. Nos primeiros 600 m, mantém 10 m/s; nos 600 m seguintes, mantém 15 m/s. Entre essas etapas, permanece parado durante 20 s para embarque. O cronômetro começa quando ele sai do primeiro ponto e termina quando alcança o destino, incluindo a parada.\n\nUm estudante propõe calcular a média aritmética das duas velocidades e afirma que o resultado representa toda a viagem. Determine a rapidez média do percurso completo e avalie a influência da parada, desprezando os pequenos intervalos de aceleração.",
    "options": [
      "10 m/s; a parada aumenta o tempo total sem aumentar a distância.",
      "12,5 m/s; basta calcular a média das velocidades.",
      "12 m/s; o tempo parado deve ser excluído.",
      "15 m/s; a velocidade final representa a viagem."
    ],
    "answer": 0,
    "explanation": "1. Os tempos em movimento são 600/10 = 60 s e 600/15 = 40 s.\n2. Inclua a parada: 60 + 40 + 20 = 120 s.\n3. A distância total é 1.200 m; a rapidez média é 1.200/120 = 10 m/s.\n4. A média aritmética ignora os tempos distintos. Excluir a parada daria 12 m/s, mas contrariaria o intervalo pedido.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-2",
    "subject": "fisica",
    "topic": "topic-259",
    "level": "Difícil",
    "prompt": "Durante uma atividade de orientação, uma aluna parte de uma marca no chão, caminha 300 m para leste e depois retorna 100 m para oeste pela mesma linha. A primeira etapa dura 150 s e a segunda, 50 s, sem pausa na mudança de sentido. O professor adota o sentido leste como positivo e pede dois resultados diferentes para o intervalo completo.\n\nQual alternativa apresenta, respectivamente, a velocidade média algébrica e a rapidez média? Considere que o deslocamento depende das posições inicial e final, enquanto a distância percorrida contabiliza todos os trechos caminhados.",
    "options": [
      "+2 m/s e 1 m/s.",
      "+1 m/s e 2 m/s.",
      "−1 m/s e 2 m/s.",
      "+1,5 m/s e 1,5 m/s."
    ],
    "answer": 1,
    "explanation": "1. O deslocamento é 300 − 100 = +200 m.\n2. A distância é 300 + 100 = 400 m, em 200 s.\n3. A velocidade média é +200/200 = +1 m/s; a rapidez média é 400/200 = 2 m/s.\n4. Somar os módulos serve para distância, não para deslocamento. O retorno não torna o deslocamento total negativo.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-3",
    "subject": "fisica",
    "topic": "topic-260",
    "level": "Médio",
    "prompt": "Em uma pista fechada, um veículo segue a 20 m/s quando o motorista percebe um sinal de parada. Seu tempo de reação é de 1 s, intervalo durante o qual a velocidade permanece constante. Em seguida, o veículo freia com aceleração constante de módulo 5 m/s² até parar. O piso é plano e as condições permanecem iguais durante a manobra.\n\nUma faixa de segurança está localizada 65 m à frente da posição em que o sinal foi percebido. Qual é a distância total até a parada e o veículo consegue imobilizar-se antes da faixa? Não confunda a distância de frenagem com a distância percorrida durante toda a reação e a frenagem.",
    "options": [
      "40 m; para 25 m antes da faixa.",
      "80 m; ultrapassa a faixa em 15 m.",
      "60 m; para 5 m antes da faixa.",
      "65 m; para exatamente na faixa."
    ],
    "answer": 2,
    "explanation": "1. Durante a reação percorre 20 × 1 = 20 m.\n2. Na frenagem, 0 = 20² − 2 × 5 × d, logo d = 40 m.\n3. A distância total é 20 + 40 = 60 m.\n4. Restam 65 − 60 = 5 m. Usar apenas 40 m ignora o tempo de reação.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-4",
    "subject": "fisica",
    "topic": "topic-260",
    "level": "Difícil",
    "prompt": "Um carrinho de laboratório começa em repouso e acelera uniformemente durante 4 s, atingindo 8 m/s. Depois mantém essa velocidade por 6 s e, por fim, reduz uniformemente a velocidade até parar em mais 2 s. Todo o movimento acontece em linha reta e no mesmo sentido. Um sensor registra o gráfico da velocidade em função do tempo, com esses três trechos.\n\nQual é a distância percorrida nos 12 s do experimento? Resolva pela área sob o gráfico ou separando os três movimentos, lembrando que a velocidade de 8 m/s não foi mantida durante todo o intervalo.",
    "options": [
      "96 m.",
      "64 m.",
      "48 m.",
      "72 m."
    ],
    "answer": 3,
    "explanation": "1. Na aceleração, a área triangular é 4 × 8/2 = 16 m.\n2. No trecho constante, a área retangular é 6 × 8 = 48 m.\n3. Na frenagem, a área triangular é 2 × 8/2 = 8 m.\n4. Some: 16 + 48 + 8 = 72 m. Multiplicar 8 por 12 trata incorretamente todo o gráfico como retângulo.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-5",
    "subject": "fisica",
    "topic": "topic-259",
    "level": "Difícil",
    "prompt": "Dois ciclistas trafegam na mesma direção em uma pista retilínea. No instante em que a observação começa, o ciclista A está 120 m atrás de B. A mantém 8 m/s, enquanto B mantém 5 m/s. Nenhum deles para ou muda a velocidade durante a aproximação, e o tamanho das bicicletas pode ser desprezado.\n\nUm observador divide a separação inicial pela velocidade de A, obtendo 15 s, mas esquece que B também avança. Quanto tempo A leva para alcançar B, contado desde o início da observação, e que distância A percorre nesse intervalo?",
    "options": [
      "40 s e 320 m.",
      "15 s e 120 m.",
      "24 s e 192 m.",
      "40 s e 200 m."
    ],
    "answer": 0,
    "explanation": "1. A separação diminui à rapidez relativa de 8 − 5 = 3 m/s.\n2. O encontro ocorre após 120/3 = 40 s.\n3. A percorre 8 × 40 = 320 m; B percorre 200 m.\n4. A diferença 320 − 200 = 120 m recupera a vantagem inicial. Dividir por 8 trataria B como parado.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-6",
    "subject": "fisica",
    "topic": "topic-259",
    "level": "Médio",
    "prompt": "Uma equipe de filmagem precisa fazer um robô móvel chegar a um ponto situado 900 m adiante, em linha reta, exatamente 90 s após a partida. Nos primeiros 30 s, o robô percorre o trajeto com velocidade constante de 5 m/s. Para o trecho restante, o controlador pode escolher uma nova velocidade constante. Despreze o tempo necessário para efetuar a mudança.\n\nQual velocidade deve ser programada para o restante do caminho? O técnico deve levar em conta simultaneamente a distância já percorrida e o tempo já consumido, em vez de aplicar a rapidez média exigida ao segundo trecho como se a viagem estivesse começando.",
    "options": [
      "10 m/s.",
      "12,5 m/s.",
      "15 m/s.",
      "7,5 m/s."
    ],
    "answer": 1,
    "explanation": "1. O primeiro trecho mede 5 × 30 = 150 m.\n2. Restam 900 − 150 = 750 m e 90 − 30 = 60 s.\n3. A velocidade requerida é 750/60 = 12,5 m/s.\n4. A média global desejada é 10 m/s, mas o trecho inicial foi mais lento; por isso o trecho final exige velocidade maior.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-7",
    "subject": "fisica",
    "topic": "topic-260",
    "level": "Difícil",
    "prompt": "Uma pequena esfera é abandonada do repouso no alto de uma estrutura, a 45 m do solo. Um sensor deve registrar sua passagem por um ponto 20 m abaixo do local de soltura. No modelo adotado, a resistência do ar é desprezível, a aceleração da gravidade vale 10 m/s² e o movimento ocorre verticalmente. A esfera não recebe impulso inicial.\n\nQuanto tempo depois da soltura ela passa pelo sensor e quanto tempo ainda falta, a partir dessa passagem, para atingir o solo? Atenção: a esfera já está em movimento quando cruza o sensor, portanto o trecho final não pode ser calculado como uma nova queda a partir do repouso.",
    "options": [
      "2 s até o sensor e mais √5 s até o solo.",
      "3 s até o sensor e mais 2 s até o solo.",
      "2 s até o sensor e mais 1 s até o solo.",
      "1 s até o sensor e mais 2 s até o solo."
    ],
    "answer": 2,
    "explanation": "1. Desde o repouso, a distância de queda é d = gt²/2 = 5t².\n2. No sensor: 20 = 5t², então t = 2 s.\n3. No solo: 45 = 5t², então o tempo total é 3 s.\n4. O intervalo restante é 3 − 2 = 1 s. Aplicar queda do repouso aos 25 m finais ignora a velocidade adquirida.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-8",
    "subject": "fisica",
    "topic": "topic-260",
    "level": "Difícil",
    "prompt": "Um elevador de carga parte do repouso e sobe com aceleração constante de 1 m/s² durante 3 s. Na etapa seguinte, continua subindo com velocidade constante de 3 m/s durante 4 s. Em seguida, desacelera uniformemente com módulo 1 m/s² até parar, sem inverter o sentido. O deslocamento total deve ser usado para comparar a manobra com a altura do destino.\n\nQual é a altura alcançada e quanto tempo dura a manobra completa? Desconsidere vibrações e trate a carga como um ponto, usando a velocidade média de cada trecho acelerado em vez de manter a velocidade máxima durante toda a viagem.",
    "options": [
      "30 m em 10 s.",
      "21 m em 7 s.",
      "18 m em 10 s.",
      "21 m em 10 s."
    ],
    "answer": 3,
    "explanation": "1. Na partida, a velocidade média é (0 + 3)/2 = 1,5 m/s, percorrendo 4,5 m.\n2. O trecho uniforme mede 3 × 4 = 12 m.\n3. A frenagem dura 3 s e percorre outros 4,5 m.\n4. O total é 21 m e 3 + 4 + 3 = 10 s; usar 3 m/s em todos os trechos superestima a altura.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-9",
    "subject": "fisica",
    "topic": "topic-260",
    "level": "Médio",
    "prompt": "Em uma pista de testes, dois carrinhos começam juntos no mesmo ponto e seguem na mesma direção. A parte com velocidade constante de 4 m/s. B começa do repouso e mantém aceleração de 2 m/s². Os sensores permanecem ativos durante tempo suficiente para que B alcance A novamente, e a extensão da pista não limita o movimento.\n\nExcluindo o instante inicial, quando ocorre o encontro e qual é a velocidade de B nesse momento? Um estudante sugere usar apenas a igualdade de velocidades, mas essa condição indica o instante em que a separação deixa de aumentar, não necessariamente o encontro das posições.",
    "options": [
      "Após 4 s; B está a 8 m/s.",
      "Após 2 s; B está a 4 m/s.",
      "Após 4 s; B está a 4 m/s.",
      "Após 8 s; B está a 16 m/s."
    ],
    "answer": 0,
    "explanation": "1. As posições são xA = 4t e xB = (2t²)/2 = t².\n2. Iguale as posições: t² = 4t, com soluções 0 e 4 s.\n3. No reencontro, vB = 2 × 4 = 8 m/s.\n4. Em t = 2 s, as velocidades são iguais, mas A está a 8 m e B a 4 m: ainda não se encontraram.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-10",
    "subject": "fisica",
    "topic": "topic-259",
    "level": "Difícil",
    "prompt": "Um trem de 180 m de comprimento atravessa um túnel de 420 m, mantendo 20 m/s. O cronômetro é acionado no instante em que a frente do trem entra no túnel e deve parar somente quando o último vagão termina de sair. A via é retilínea, não há aceleração e os comprimentos fornecidos são medidos ao longo da direção de movimento.\n\nQual intervalo será registrado? A equipe quer verificar se uma gravação de 25 s é suficiente para mostrar a travessia inteira, portanto também deve considerar o comprimento do trem, e não apenas o deslocamento da frente até a saída do túnel.",
    "options": [
      "21 s; a gravação é suficiente.",
      "30 s; a gravação de 25 s é insuficiente.",
      "9 s; a gravação é suficiente.",
      "25 s; a gravação termina exatamente na saída completa."
    ],
    "answer": 1,
    "explanation": "1. Para a cauda sair, a frente avança o comprimento do túnel mais o do trem.\n2. O deslocamento necessário é 420 + 180 = 600 m.\n3. O tempo é 600/20 = 30 s.\n4. A gravação ficaria 5 s curta. Os 21 s correspondem somente à frente chegando à saída.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-11",
    "subject": "fisica",
    "topic": "topic-260",
    "level": "Difícil",
    "prompt": "Em uma demonstração de segurança, um carrinho segue inicialmente a 10 m/s e para após 10 m de frenagem, sob desaceleração constante. Em uma segunda tentativa, sua velocidade inicial é 20 m/s, e o sistema de freios produz exatamente a mesma desaceleração. O tempo de reação do operador é desconsiderado nas duas tentativas.\n\nQual será a nova distância de frenagem? O objetivo é avaliar uma afirmação de que dobrar a velocidade inicial necessariamente dobra a distância até parar. Use a relação entre velocidade ao quadrado e deslocamento, sem pressupor que o tempo de frenagem permaneça igual.",
    "options": [
      "20 m; a distância dobra.",
      "10 m; a desaceleração é a mesma.",
      "40 m; a distância fica quatro vezes maior.",
      "80 m; a distância fica oito vezes maior."
    ],
    "answer": 2,
    "explanation": "1. Com velocidade final zero, a distância é d = v₀²/(2a), usando o módulo da desaceleração.\n2. Mantendo a, a razão das distâncias é (20/10)² = 4.\n3. A segunda distância é 4 × 10 = 40 m.\n4. A relação é quadrática, não linear. O tempo de frenagem também aumenta quando a velocidade inicial aumenta.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-12",
    "subject": "fisica",
    "topic": "topic-259",
    "level": "Médio",
    "prompt": "Um sensor registra as posições de um carrinho em uma pista retilínea: no instante 0 s, x = 0 m; em 2 s, x = 6 m; em 5 s, x = 6 m; e em 8 s, x = 0 m. Entre cada par de registros consecutivos, a posição varia linearmente com o tempo. O observador deseja distinguir movimento, repouso e retorno sem confundir o gráfico da posição com um gráfico de velocidade.\n\nQual é a rapidez média nos oito segundos e durante qual intervalo o carrinho permanece parado? Considere a distância efetivamente percorrida, mesmo que a posição final coincida com a inicial.",
    "options": [
      "0 m/s; repouso durante os oito segundos.",
      "0,75 m/s; repouso de 5 s a 8 s.",
      "2 m/s; repouso de 0 s a 2 s.",
      "1,5 m/s; repouso de 2 s a 5 s."
    ],
    "answer": 3,
    "explanation": "1. De 0 a 2 s, o carrinho percorre 6 m.\n2. De 2 a 5 s, a posição permanece em 6 m: está parado.\n3. De 5 a 8 s, retorna 6 m, totalizando 12 m percorridos.\n4. A rapidez média é 12/8 = 1,5 m/s. A velocidade média é zero, mas é outra grandeza.",
    "xp": 10,
    "sourceId": "batch2-motion"
  },
  {
    "id": "reading-batch2-13",
    "subject": "quimica",
    "topic": "topic-261",
    "level": "Difícil",
    "prompt": "Um gás confinado em um cilindro recebe 500 J de calor de uma fonte externa. Durante o processo, ele se expande e realiza 180 J de trabalho sobre um pistão. Não ocorrem outras formas de transferência de energia e o sistema analisado é apenas o gás. A convenção adotada considera positivo o calor recebido e positivo o trabalho realizado sobre o sistema.\n\nQual é a variação da energia interna do gás? Um aluno soma os dois valores positivos, mas precisa avaliar o sentido de cada transferência antes de aplicar a primeira lei da Termodinâmica, expressa nessa convenção por ΔU = q + w.",
    "options": [
      "+320 J.",
      "+680 J.",
      "−320 J.",
      "−680 J."
    ],
    "answer": 0,
    "explanation": "1. O gás recebe calor: q = +500 J.\n2. O gás realiza trabalho sobre o exterior: w = −180 J.\n3. Assim, ΔU = 500 − 180 = +320 J.\n4. Somar 180 como positivo trataria a expansão como trabalho recebido. A energia interna aumenta, mas nem todo calor permanece no gás.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-14",
    "subject": "quimica",
    "topic": "topic-261",
    "level": "Difícil",
    "prompt": "Em uma experiência com um recipiente termicamente isolado, um pistão comprime uma amostra gasosa. O mecanismo externo realiza 750 J de trabalho sobre o gás. Não há troca de calor com o ambiente e nenhuma outra transferência de energia é considerada. O sistema de interesse é o gás, com a convenção ΔU = q + w, em que w é positivo para trabalho recebido.\n\nQual conclusão está correta sobre a energia interna? O estudante deve decidir se isolamento térmico significa necessariamente energia interna constante ou se a ação mecânica do pistão também pode modificar o estado energético do sistema.",
    "options": [
      "A energia interna fica constante porque q = 0.",
      "A energia interna aumenta 750 J, mesmo sem troca de calor.",
      "A energia interna diminui 750 J porque ocorre compressão.",
      "O gás obrigatoriamente recebe 750 J de calor."
    ],
    "answer": 1,
    "explanation": "1. Isolamento térmico implica q = 0, não ausência de trabalho.\n2. A compressão transfere trabalho para o gás: w = +750 J.\n3. Logo, ΔU = 0 + 750 = +750 J.\n4. Chamar essa transferência de calor confunde mecanismos distintos. Um processo adiabático pode alterar a energia interna.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-15",
    "subject": "quimica",
    "topic": "topic-261",
    "level": "Médio",
    "prompt": "Uma amostra de 200 g de água é aquecida de 20 °C até 35 °C em um experimento sem mudança de fase. Para os cálculos, o calor específico da água é considerado constante e igual a 4,2 J/(g·°C). O equipamento fornece energia, mas apenas 70% da energia fornecida chega à água; o restante é transferido ao recipiente e ao ambiente.\n\nQual energia total o equipamento precisa fornecer para produzir essa elevação de temperatura? Diferencie o calor efetivamente absorvido pela água da energia fornecida pelo aparelho, pois os dois valores só seriam iguais em uma transferência com rendimento de 100%.",
    "options": [
      "12.600 J.",
      "8.820 J.",
      "18.000 J.",
      "42.000 J."
    ],
    "answer": 2,
    "explanation": "1. A variação de temperatura é 35 − 20 = 15 °C.\n2. A água absorve q = 200 × 4,2 × 15 = 12.600 J.\n3. Como q = 0,70E, a energia fornecida é E = 12.600/0,70 = 18.000 J.\n4. Multiplicar por 0,70 reduziria novamente a energia já absorvida. O resultado deve ser maior que 12.600 J.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-16",
    "subject": "quimica",
    "topic": "topic-261",
    "level": "Difícil",
    "prompt": "Em um calorímetro ideal, 100 g de água a 80 °C são misturados com 300 g de água a 20 °C. O recipiente não absorve calor, não há perdas para o ambiente nem mudança de fase, e o calor específico é o mesmo para as duas porções. A mistura é mantida até atingir equilíbrio térmico.\n\nQual será a temperatura final? Uma pessoa propõe 50 °C por ser a média aritmética das temperaturas iniciais, mas essa proposta desconsidera que a porção fria tem três vezes a massa da quente. Use a conservação da energia para avaliar a contribuição de cada porção.",
    "options": [
      "50 °C.",
      "65 °C.",
      "25 °C.",
      "35 °C."
    ],
    "answer": 3,
    "explanation": "1. O calor perdido pela porção quente é igual ao recebido pela fria.\n2. Cancele o calor específico: 100(80 − T) = 300(T − 20).\n3. Reorganizando, 8.000 + 6.000 = 400T; então T = 35 °C.\n4. A média deve ponderar as massas. O valor final fica mais próximo de 20 °C, temperatura da maior porção.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-17",
    "subject": "quimica",
    "topic": "topic-261",
    "level": "Difícil",
    "prompt": "A combustão completa de uma substância libera 400 kJ por mol consumido, nas condições do experimento. Uma amostra contém 0,50 mol dessa substância e reage completamente. Um reservatório de água recebe somente 60% da energia liberada, porque o restante é transferido para outras partes do aparelho. A água não sofre mudança de fase.\n\nQual é a variação de entalpia associada à reação dessa amostra e qual energia chega à água? Considere a reação como o sistema para definir o sinal da entalpia e diferencie a energia liberada pela reação da fração aproveitada no aquecimento.",
    "options": [
      "ΔH = −200 kJ; a água recebe 120 kJ.",
      "ΔH = +200 kJ; a água recebe 120 kJ.",
      "ΔH = −400 kJ; a água recebe 240 kJ.",
      "ΔH = −200 kJ; a água recebe 200 kJ."
    ],
    "answer": 0,
    "explanation": "1. Uma reação que libera energia é exotérmica: ΔH molar = −400 kJ/mol.\n2. Para 0,50 mol, ΔH = −400 × 0,50 = −200 kJ.\n3. A água recebe 0,60 × 200 = 120 kJ.\n4. O sinal negativo descreve o sistema reagente; não significa energia negativa recebida pela água. O rendimento não altera a entalpia da reação.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-18",
    "subject": "quimica",
    "topic": "topic-262",
    "level": "Médio",
    "prompt": "Para estudar a Lei de Hess, uma turma recebe duas etapas hipotéticas, ambas nas mesmas condições de temperatura e pressão: A → B, com ΔH = +60 kJ, e B → C, com ΔH = −150 kJ. As letras representam estados de um mesmo sistema, e as duas etapas estão escritas para a mesma quantidade de matéria.\n\nA turma deseja substituir as duas etapas por uma transformação direta A → C. Qual é a variação de entalpia dessa transformação e sua classificação? Considere que a entalpia é uma função de estado, de modo que os valores devem ser combinados algebricamente e o estado intermediário deve desaparecer.",
    "options": [
      "+90 kJ; endotérmica.",
      "−90 kJ; exotérmica.",
      "−210 kJ; exotérmica.",
      "+210 kJ; endotérmica."
    ],
    "answer": 1,
    "explanation": "1. Some A → B e B → C; o estado intermediário B se cancela.\n2. Some também as entalpias com seus sinais: +60 + (−150).\n3. O resultado é −90 kJ para A → C.\n4. O sinal negativo indica liberação líquida de energia. Somar módulos ignora que a primeira etapa absorve energia.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-19",
    "subject": "quimica",
    "topic": "topic-262",
    "level": "Difícil",
    "prompt": "Uma equação termoquímica informa que A → B apresenta ΔH = −80 kJ para a quantidade de matéria indicada na equação. Em outra etapa de um projeto, o pesquisador precisa realizar a transformação inversa, B → A, mas envolvendo o dobro dessa quantidade de matéria. As condições de temperatura e pressão permanecem as mesmas.\n\nQual valor de ΔH deve acompanhar a nova equação? A questão exige duas alterações independentes: inverter a transformação e ajustar a quantidade processada. Não basta conservar o sinal original nem multiplicar apenas os coeficientes químicos, pois a entalpia informada se refere à reação exatamente como escrita.",
    "options": [
      "−160 kJ.",
      "+80 kJ.",
      "+160 kJ.",
      "−40 kJ."
    ],
    "answer": 2,
    "explanation": "1. Inverter a reação troca o sinal: B → A apresenta +80 kJ.\n2. Dobrar a quantidade dobra a variação de entalpia.\n3. Assim, ΔH = 2 × (+80) = +160 kJ.\n4. −160 mantém indevidamente o sentido energético original; +80 deixa de ajustar a quantidade.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-20",
    "subject": "quimica",
    "topic": "topic-262",
    "level": "Difícil",
    "prompt": "Um processo transforma um mol de um reagente em um mol de produto. Os dados de entalpia padrão de formação fornecidos para o exercício são −100 kJ/mol para o reagente e −280 kJ/mol para o produto, nas mesmas condições. A transformação não envolve outras substâncias e os coeficientes estequiométricos são ambos iguais a um.\n\nQual é a variação padrão de entalpia para a transformação de 2 mol do reagente? Use a diferença entre produtos e reagentes e só depois ajuste a quantidade. A presença de dois valores negativos não autoriza somar seus módulos nem concluir automaticamente que a reação é endotérmica.",
    "options": [
      "−180 kJ.",
      "+360 kJ.",
      "−760 kJ.",
      "−360 kJ."
    ],
    "answer": 3,
    "explanation": "1. Para um mol, calcule ΔH = Hf(produto) − Hf(reagente).\n2. Assim, ΔH = −280 − (−100) = −180 kJ.\n3. Para 2 mol, multiplique por 2: −360 kJ.\n4. Somar os valores daria −380 por mol, mas não representa a diferença entre os estados inicial e final.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-21",
    "subject": "quimica",
    "topic": "topic-261",
    "level": "Médio",
    "prompt": "Um material sólido tem capacidade calorífica específica constante de 0,50 J/(g·°C) na faixa estudada. Uma amostra de 400 g recebe 6.000 J de calor, sem perdas para o ambiente e sem mudança de fase. Sua temperatura inicial é 25 °C. O técnico precisa informar a temperatura final, e não apenas o aumento de temperatura.\n\nQual valor deve constar no relatório? Considere que a capacidade calorífica da amostra inteira depende tanto da propriedade específica do material quanto de sua massa. Verifique a unidade do resultado intermediário antes de somá-lo à temperatura de partida.",
    "options": [
      "55 °C.",
      "30 °C.",
      "40 °C.",
      "75 °C."
    ],
    "answer": 0,
    "explanation": "1. A capacidade calorífica da amostra é mc = 400 × 0,50 = 200 J/°C.\n2. O aumento de temperatura é ΔT = 6.000/200 = 30 °C.\n3. Some ao valor inicial: Tf = 25 + 30 = 55 °C.\n4. 30 °C é a variação, não a temperatura final; ignorar a massa confunde capacidade específica com capacidade total.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-22",
    "subject": "quimica",
    "topic": "topic-261",
    "level": "Difícil",
    "prompt": "Em um ciclo completo de um equipamento, uma amostra gasosa volta ao mesmo estado termodinâmico em que começou. Durante o ciclo, recebe 900 J de calor em uma etapa e libera 650 J em outra. Essas são as únicas trocas de calor. A convenção para o gás é ΔU = q + w, com trabalho positivo quando realizado sobre ele.\n\nQual é o trabalho líquido realizado pelo gás sobre o ambiente no ciclo? A análise deve considerar o calor líquido e o fato de que a energia interna depende do estado, não do caminho. Voltar ao estado inicial não significa que cada transferência de energia tenha sido individualmente nula.",
    "options": [
      "0 J.",
      "250 J.",
      "1.550 J.",
      "650 J."
    ],
    "answer": 1,
    "explanation": "1. Como o estado inicial é recuperado, a variação total de energia interna é zero.\n2. O calor líquido recebido é q = 900 − 650 = 250 J.\n3. Pela primeira lei, 0 = 250 + w, de modo que o trabalho recebido é −250 J.\n4. Portanto, o gás realiza 250 J de trabalho líquido sobre o exterior. A energia interna constante no ciclo não exige calor ou trabalho líquidos nulos.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-23",
    "subject": "quimica",
    "topic": "topic-261",
    "level": "Difícil",
    "prompt": "Uma equipe compara duas amostras sólidas, X e Y, de mesma massa, inicialmente à mesma temperatura. Cada uma recebe exatamente 1.200 J de calor, sem perdas e sem mudança de fase. A temperatura de X aumenta 10 °C, enquanto a de Y aumenta 30 °C. Os respectivos calores específicos podem ser considerados constantes durante o experimento.\n\nQue relação existe entre os calores específicos de X e Y? Um estudante afirma que Y possui maior calor específico porque aqueceu mais, mas precisa verificar como a variação de temperatura aparece na expressão q = mcΔT quando o calor recebido e a massa são iguais.",
    "options": [
      "cY = 3cX.",
      "cX = cY.",
      "cX = 3cY.",
      "cX = 9cY."
    ],
    "answer": 2,
    "explanation": "1. As duas amostras recebem o mesmo calor e têm a mesma massa.\n2. Logo, cX × 10 = cY × 30.\n3. Dividindo por 10, obtemos cX = 3cY.\n4. Maior calor específico significa menor aquecimento para o mesmo calor por unidade de massa. A afirmação do estudante inverte essa relação.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  },
  {
    "id": "reading-batch2-24",
    "subject": "quimica",
    "topic": "topic-262",
    "level": "Médio",
    "prompt": "Uma reação hipotética converte R em P por dois caminhos possíveis, todos nas mesmas condições e para a mesma quantidade de matéria. No caminho direto, ΔH = −120 kJ. No caminho em duas etapas, R → I apresenta ΔH = +50 kJ, enquanto a entalpia da etapa I → P é desconhecida. Não há alterações adicionais nos estados inicial e final.\n\nQual deve ser a entalpia da etapa I → P para que os dados sejam coerentes? O pesquisador precisa compensar a energia absorvida na primeira etapa e ainda obter a mesma liberação líquida do caminho direto, respeitando o caráter de função de estado da entalpia.",
    "options": [
      "−70 kJ.",
      "+170 kJ.",
      "+70 kJ.",
      "−170 kJ."
    ],
    "answer": 3,
    "explanation": "1. Os dois caminhos devem apresentar a mesma variação total de entalpia.\n2. Escreva +50 + ΔH₂ = −120.\n3. Então ΔH₂ = −120 − 50 = −170 kJ.\n4. Confira: 50 − 170 = −120 kJ. O valor −70 produziria −20 kJ e não reproduziria o caminho direto.",
    "xp": 10,
    "sourceId": "batch2-thermo"
  }
];
