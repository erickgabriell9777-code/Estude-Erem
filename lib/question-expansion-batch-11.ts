import type { Question } from "./study-data";

// Lote 11: 80 questões de aprofundamento sobre instrumentos e práticas de medição.
const rows: [string, string[], number, string, "Fácil" | "Médio" | "Difícil"][] = [
  [
    "Qual instrumento é projetado para medir dimensões externas, internas e profundidades?",
    [
      "régua",
      "paquímetro",
      "balança",
      "termômetro"
    ],
    1,
    "Paquímetro é utilizado para medir dimensões externas, internas e profundidades.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se verificar o diâmetro de um eixo pequeno. Qual instrumento é a escolha mais adequada?",
    [
      "régua",
      "paquímetro",
      "balança",
      "termômetro"
    ],
    1,
    "A escolha adequada é o paquímetro, pois sua finalidade é medir dimensões externas, internas e profundidades.",
    "Médio"
  ],
  [
    "Qual associação entre paquímetro e sua grandeza está correta?",
    [
      "régua",
      "paquímetro",
      "balança",
      "termômetro"
    ],
    1,
    "A associação correta é paquímetro — dimensões externas, internas e profundidades; sua indicação é expressa usualmente em milímetro.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de dimensões externas, internas e profundidades. Qual equipamento deve selecionar?",
    [
      "régua",
      "paquímetro",
      "balança",
      "termômetro"
    ],
    1,
    "Para medir dimensões externas, internas e profundidades, deve-se selecionar o paquímetro; a unidade usual é milímetro.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir pequenas espessuras e diâmetros com alta resolução?",
    [
      "trena",
      "micrômetro",
      "barômetro",
      "cronômetro"
    ],
    1,
    "Micrômetro é utilizado para medir pequenas espessuras e diâmetros com alta resolução.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se medir a espessura de uma lâmina fina. Qual instrumento é a escolha mais adequada?",
    [
      "trena",
      "micrômetro",
      "barômetro",
      "cronômetro"
    ],
    1,
    "A escolha adequada é o micrômetro, pois sua finalidade é medir pequenas espessuras e diâmetros com alta resolução.",
    "Médio"
  ],
  [
    "Qual associação entre micrômetro e sua grandeza está correta?",
    [
      "trena",
      "micrômetro",
      "barômetro",
      "cronômetro"
    ],
    1,
    "A associação correta é micrômetro — pequenas espessuras e diâmetros com alta resolução; sua indicação é expressa usualmente em milímetro.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de pequenas espessuras e diâmetros com alta resolução. Qual equipamento deve selecionar?",
    [
      "trena",
      "micrômetro",
      "barômetro",
      "cronômetro"
    ],
    1,
    "Para medir pequenas espessuras e diâmetros com alta resolução, deve-se selecionar o micrômetro; a unidade usual é milímetro.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir massa?",
    [
      "balança",
      "dinamômetro",
      "amperímetro",
      "luxímetro"
    ],
    0,
    "Balança é utilizado para medir massa.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se determinar a massa de uma amostra. Qual instrumento é a escolha mais adequada?",
    [
      "balança",
      "dinamômetro",
      "amperímetro",
      "luxímetro"
    ],
    0,
    "A escolha adequada é a balança, pois sua finalidade é medir massa.",
    "Médio"
  ],
  [
    "Qual associação entre balança e sua grandeza está correta?",
    [
      "balança",
      "dinamômetro",
      "amperímetro",
      "luxímetro"
    ],
    0,
    "A associação correta é balança — massa; sua indicação é expressa usualmente em quilograma ou grama.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de massa. Qual equipamento deve selecionar?",
    [
      "balança",
      "dinamômetro",
      "amperímetro",
      "luxímetro"
    ],
    0,
    "Para medir massa, deve-se selecionar a balança; a unidade usual é quilograma ou grama.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir temperatura?",
    [
      "higrômetro",
      "termômetro",
      "tacômetro",
      "proveta"
    ],
    1,
    "Termômetro é utilizado para medir temperatura.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se acompanhar a temperatura de uma solução. Qual instrumento é a escolha mais adequada?",
    [
      "higrômetro",
      "termômetro",
      "tacômetro",
      "proveta"
    ],
    1,
    "A escolha adequada é o termômetro, pois sua finalidade é medir temperatura.",
    "Médio"
  ],
  [
    "Qual associação entre termômetro e sua grandeza está correta?",
    [
      "higrômetro",
      "termômetro",
      "tacômetro",
      "proveta"
    ],
    1,
    "A associação correta é termômetro — temperatura; sua indicação é expressa usualmente em grau Celsius ou kelvin.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de temperatura. Qual equipamento deve selecionar?",
    [
      "higrômetro",
      "termômetro",
      "tacômetro",
      "proveta"
    ],
    1,
    "Para medir temperatura, deve-se selecionar o termômetro; a unidade usual é grau Celsius ou kelvin.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir intervalos de tempo?",
    [
      "cronômetro",
      "voltímetro",
      "barômetro",
      "paquímetro"
    ],
    0,
    "Cronômetro é utilizado para medir intervalos de tempo.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se medir a duração de uma etapa experimental. Qual instrumento é a escolha mais adequada?",
    [
      "cronômetro",
      "voltímetro",
      "barômetro",
      "paquímetro"
    ],
    0,
    "A escolha adequada é o cronômetro, pois sua finalidade é medir intervalos de tempo.",
    "Médio"
  ],
  [
    "Qual associação entre cronômetro e sua grandeza está correta?",
    [
      "cronômetro",
      "voltímetro",
      "barômetro",
      "paquímetro"
    ],
    0,
    "A associação correta é cronômetro — intervalos de tempo; sua indicação é expressa usualmente em segundo.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de intervalos de tempo. Qual equipamento deve selecionar?",
    [
      "cronômetro",
      "voltímetro",
      "barômetro",
      "paquímetro"
    ],
    0,
    "Para medir intervalos de tempo, deve-se selecionar o cronômetro; a unidade usual é segundo.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir pressão atmosférica?",
    [
      "pluviômetro",
      "barômetro",
      "sonômetro",
      "bureta"
    ],
    1,
    "Barômetro é utilizado para medir pressão atmosférica.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se acompanhar variações da pressão do ar. Qual instrumento é a escolha mais adequada?",
    [
      "pluviômetro",
      "barômetro",
      "sonômetro",
      "bureta"
    ],
    1,
    "A escolha adequada é o barômetro, pois sua finalidade é medir pressão atmosférica.",
    "Médio"
  ],
  [
    "Qual associação entre barômetro e sua grandeza está correta?",
    [
      "pluviômetro",
      "barômetro",
      "sonômetro",
      "bureta"
    ],
    1,
    "A associação correta é barômetro — pressão atmosférica; sua indicação é expressa usualmente em pascal ou hectopascal.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de pressão atmosférica. Qual equipamento deve selecionar?",
    [
      "pluviômetro",
      "barômetro",
      "sonômetro",
      "bureta"
    ],
    1,
    "Para medir pressão atmosférica, deve-se selecionar o barômetro; a unidade usual é pascal ou hectopascal.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir umidade do ar?",
    [
      "higrômetro",
      "anemômetro",
      "ohmímetro",
      "pipeta"
    ],
    0,
    "Higrômetro é utilizado para medir umidade do ar.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se avaliar a umidade relativa de uma sala. Qual instrumento é a escolha mais adequada?",
    [
      "higrômetro",
      "anemômetro",
      "ohmímetro",
      "pipeta"
    ],
    0,
    "A escolha adequada é o higrômetro, pois sua finalidade é medir umidade do ar.",
    "Médio"
  ],
  [
    "Qual associação entre higrômetro e sua grandeza está correta?",
    [
      "higrômetro",
      "anemômetro",
      "ohmímetro",
      "pipeta"
    ],
    0,
    "A associação correta é higrômetro — umidade do ar; sua indicação é expressa usualmente em porcentagem de umidade relativa.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de umidade do ar. Qual equipamento deve selecionar?",
    [
      "higrômetro",
      "anemômetro",
      "ohmímetro",
      "pipeta"
    ],
    0,
    "Para medir umidade do ar, deve-se selecionar o higrômetro; a unidade usual é porcentagem de umidade relativa.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir corrente elétrica?",
    [
      "voltímetro",
      "amperímetro",
      "ohmímetro",
      "wattímetro"
    ],
    1,
    "Amperímetro é utilizado para medir corrente elétrica.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se medir a corrente que atravessa um circuito. Qual instrumento é a escolha mais adequada?",
    [
      "voltímetro",
      "amperímetro",
      "ohmímetro",
      "wattímetro"
    ],
    1,
    "A escolha adequada é o amperímetro, pois sua finalidade é medir corrente elétrica.",
    "Médio"
  ],
  [
    "Qual associação entre amperímetro e sua grandeza está correta?",
    [
      "voltímetro",
      "amperímetro",
      "ohmímetro",
      "wattímetro"
    ],
    1,
    "A associação correta é amperímetro — corrente elétrica; sua indicação é expressa usualmente em ampere.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de corrente elétrica. Qual equipamento deve selecionar?",
    [
      "voltímetro",
      "amperímetro",
      "ohmímetro",
      "wattímetro"
    ],
    1,
    "Para medir corrente elétrica, deve-se selecionar o amperímetro; a unidade usual é ampere.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir diferença de potencial elétrico?",
    [
      "amperímetro",
      "voltímetro",
      "termômetro",
      "luxímetro"
    ],
    1,
    "Voltímetro é utilizado para medir diferença de potencial elétrico.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se medir a tensão entre dois pontos. Qual instrumento é a escolha mais adequada?",
    [
      "amperímetro",
      "voltímetro",
      "termômetro",
      "luxímetro"
    ],
    1,
    "A escolha adequada é o voltímetro, pois sua finalidade é medir diferença de potencial elétrico.",
    "Médio"
  ],
  [
    "Qual associação entre voltímetro e sua grandeza está correta?",
    [
      "amperímetro",
      "voltímetro",
      "termômetro",
      "luxímetro"
    ],
    1,
    "A associação correta é voltímetro — diferença de potencial elétrico; sua indicação é expressa usualmente em volt.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de diferença de potencial elétrico. Qual equipamento deve selecionar?",
    [
      "amperímetro",
      "voltímetro",
      "termômetro",
      "luxímetro"
    ],
    1,
    "Para medir diferença de potencial elétrico, deve-se selecionar o voltímetro; a unidade usual é volt.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir resistência elétrica?",
    [
      "ohmímetro",
      "barômetro",
      "dinamômetro",
      "proveta"
    ],
    0,
    "Ohmímetro é utilizado para medir resistência elétrica.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se verificar a resistência de um componente isolado. Qual instrumento é a escolha mais adequada?",
    [
      "ohmímetro",
      "barômetro",
      "dinamômetro",
      "proveta"
    ],
    0,
    "A escolha adequada é o ohmímetro, pois sua finalidade é medir resistência elétrica.",
    "Médio"
  ],
  [
    "Qual associação entre ohmímetro e sua grandeza está correta?",
    [
      "ohmímetro",
      "barômetro",
      "dinamômetro",
      "proveta"
    ],
    0,
    "A associação correta é ohmímetro — resistência elétrica; sua indicação é expressa usualmente em ohm.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de resistência elétrica. Qual equipamento deve selecionar?",
    [
      "ohmímetro",
      "barômetro",
      "dinamômetro",
      "proveta"
    ],
    0,
    "Para medir resistência elétrica, deve-se selecionar o ohmímetro; a unidade usual é ohm.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir iluminância?",
    [
      "sonômetro",
      "luxímetro",
      "tacômetro",
      "higrômetro"
    ],
    1,
    "Luxímetro é utilizado para medir iluminância.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se avaliar a iluminação de uma mesa de estudo. Qual instrumento é a escolha mais adequada?",
    [
      "sonômetro",
      "luxímetro",
      "tacômetro",
      "higrômetro"
    ],
    1,
    "A escolha adequada é o luxímetro, pois sua finalidade é medir iluminância.",
    "Médio"
  ],
  [
    "Qual associação entre luxímetro e sua grandeza está correta?",
    [
      "sonômetro",
      "luxímetro",
      "tacômetro",
      "higrômetro"
    ],
    1,
    "A associação correta é luxímetro — iluminância; sua indicação é expressa usualmente em lux.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de iluminância. Qual equipamento deve selecionar?",
    [
      "sonômetro",
      "luxímetro",
      "tacômetro",
      "higrômetro"
    ],
    1,
    "Para medir iluminância, deve-se selecionar o luxímetro; a unidade usual é lux.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir nível de pressão sonora?",
    [
      "barômetro",
      "sonômetro",
      "pluviômetro",
      "micrômetro"
    ],
    1,
    "Sonômetro é utilizado para medir nível de pressão sonora.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se avaliar o nível de ruído em um ambiente. Qual instrumento é a escolha mais adequada?",
    [
      "barômetro",
      "sonômetro",
      "pluviômetro",
      "micrômetro"
    ],
    1,
    "A escolha adequada é o sonômetro, pois sua finalidade é medir nível de pressão sonora.",
    "Médio"
  ],
  [
    "Qual associação entre sonômetro e sua grandeza está correta?",
    [
      "barômetro",
      "sonômetro",
      "pluviômetro",
      "micrômetro"
    ],
    1,
    "A associação correta é sonômetro — nível de pressão sonora; sua indicação é expressa usualmente em decibel.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de nível de pressão sonora. Qual equipamento deve selecionar?",
    [
      "barômetro",
      "sonômetro",
      "pluviômetro",
      "micrômetro"
    ],
    1,
    "Para medir nível de pressão sonora, deve-se selecionar o sonômetro; a unidade usual é decibel.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir velocidade de rotação?",
    [
      "tacômetro",
      "anemômetro",
      "termômetro",
      "bureta"
    ],
    0,
    "Tacômetro é utilizado para medir velocidade de rotação.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se verificar a rotação de um motor. Qual instrumento é a escolha mais adequada?",
    [
      "tacômetro",
      "anemômetro",
      "termômetro",
      "bureta"
    ],
    0,
    "A escolha adequada é o tacômetro, pois sua finalidade é medir velocidade de rotação.",
    "Médio"
  ],
  [
    "Qual associação entre tacômetro e sua grandeza está correta?",
    [
      "tacômetro",
      "anemômetro",
      "termômetro",
      "bureta"
    ],
    0,
    "A associação correta é tacômetro — velocidade de rotação; sua indicação é expressa usualmente em rotações por minuto.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de velocidade de rotação. Qual equipamento deve selecionar?",
    [
      "tacômetro",
      "anemômetro",
      "termômetro",
      "bureta"
    ],
    0,
    "Para medir velocidade de rotação, deve-se selecionar o tacômetro; a unidade usual é rotações por minuto.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir precipitação acumulada?",
    [
      "higrômetro",
      "pluviômetro",
      "luxímetro",
      "paquímetro"
    ],
    1,
    "Pluviômetro é utilizado para medir precipitação acumulada.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se registrar a quantidade de chuva em um dia. Qual instrumento é a escolha mais adequada?",
    [
      "higrômetro",
      "pluviômetro",
      "luxímetro",
      "paquímetro"
    ],
    1,
    "A escolha adequada é o pluviômetro, pois sua finalidade é medir precipitação acumulada.",
    "Médio"
  ],
  [
    "Qual associação entre pluviômetro e sua grandeza está correta?",
    [
      "higrômetro",
      "pluviômetro",
      "luxímetro",
      "paquímetro"
    ],
    1,
    "A associação correta é pluviômetro — precipitação acumulada; sua indicação é expressa usualmente em milímetro de chuva.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de precipitação acumulada. Qual equipamento deve selecionar?",
    [
      "higrômetro",
      "pluviômetro",
      "luxímetro",
      "paquímetro"
    ],
    1,
    "Para medir precipitação acumulada, deve-se selecionar o pluviômetro; a unidade usual é milímetro de chuva.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir velocidade do vento?",
    [
      "barômetro",
      "anemômetro",
      "sonômetro",
      "voltímetro"
    ],
    1,
    "Anemômetro é utilizado para medir velocidade do vento.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se medir a velocidade do vento em uma estação. Qual instrumento é a escolha mais adequada?",
    [
      "barômetro",
      "anemômetro",
      "sonômetro",
      "voltímetro"
    ],
    1,
    "A escolha adequada é o anemômetro, pois sua finalidade é medir velocidade do vento.",
    "Médio"
  ],
  [
    "Qual associação entre anemômetro e sua grandeza está correta?",
    [
      "barômetro",
      "anemômetro",
      "sonômetro",
      "voltímetro"
    ],
    1,
    "A associação correta é anemômetro — velocidade do vento; sua indicação é expressa usualmente em metro por segundo.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de velocidade do vento. Qual equipamento deve selecionar?",
    [
      "barômetro",
      "anemômetro",
      "sonômetro",
      "voltímetro"
    ],
    1,
    "Para medir velocidade do vento, deve-se selecionar o anemômetro; a unidade usual é metro por segundo.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir força?",
    [
      "balança",
      "dinamômetro",
      "termômetro",
      "ohmímetro"
    ],
    1,
    "Dinamômetro é utilizado para medir força.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se medir a força exercida ao puxar uma mola. Qual instrumento é a escolha mais adequada?",
    [
      "balança",
      "dinamômetro",
      "termômetro",
      "ohmímetro"
    ],
    1,
    "A escolha adequada é o dinamômetro, pois sua finalidade é medir força.",
    "Médio"
  ],
  [
    "Qual associação entre dinamômetro e sua grandeza está correta?",
    [
      "balança",
      "dinamômetro",
      "termômetro",
      "ohmímetro"
    ],
    1,
    "A associação correta é dinamômetro — força; sua indicação é expressa usualmente em newton.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de força. Qual equipamento deve selecionar?",
    [
      "balança",
      "dinamômetro",
      "termômetro",
      "ohmímetro"
    ],
    1,
    "Para medir força, deve-se selecionar o dinamômetro; a unidade usual é newton.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir volume de líquidos?",
    [
      "proveta",
      "paquímetro",
      "amperímetro",
      "tacômetro"
    ],
    0,
    "Proveta é utilizado para medir volume de líquidos.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se obter uma leitura aproximada do volume de uma solução. Qual instrumento é a escolha mais adequada?",
    [
      "proveta",
      "paquímetro",
      "amperímetro",
      "tacômetro"
    ],
    0,
    "A escolha adequada é o proveta, pois sua finalidade é medir volume de líquidos.",
    "Médio"
  ],
  [
    "Qual associação entre proveta e sua grandeza está correta?",
    [
      "proveta",
      "paquímetro",
      "amperímetro",
      "tacômetro"
    ],
    0,
    "A associação correta é proveta — volume de líquidos; sua indicação é expressa usualmente em mililitro.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de volume de líquidos. Qual equipamento deve selecionar?",
    [
      "proveta",
      "paquímetro",
      "amperímetro",
      "tacômetro"
    ],
    0,
    "Para medir volume de líquidos, deve-se selecionar o proveta; a unidade usual é mililitro.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir volume variável dispensado com controle?",
    [
      "pipeta volumétrica",
      "bureta",
      "béquer",
      "termômetro"
    ],
    1,
    "Bureta é utilizado para medir volume variável dispensado com controle.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se adicionar solução gota a gota durante uma titulação. Qual instrumento é a escolha mais adequada?",
    [
      "pipeta volumétrica",
      "bureta",
      "béquer",
      "termômetro"
    ],
    1,
    "A escolha adequada é o bureta, pois sua finalidade é medir volume variável dispensado com controle.",
    "Médio"
  ],
  [
    "Qual associação entre bureta e sua grandeza está correta?",
    [
      "pipeta volumétrica",
      "bureta",
      "béquer",
      "termômetro"
    ],
    1,
    "A associação correta é bureta — volume variável dispensado com controle; sua indicação é expressa usualmente em mililitro.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de volume variável dispensado com controle. Qual equipamento deve selecionar?",
    [
      "pipeta volumétrica",
      "bureta",
      "béquer",
      "termômetro"
    ],
    1,
    "Para medir volume variável dispensado com controle, deve-se selecionar o bureta; a unidade usual é mililitro.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir transferência de um volume fixo?",
    [
      "proveta",
      "bureta",
      "pipeta volumétrica",
      "pluviômetro"
    ],
    2,
    "Pipeta volumétrica é utilizado para medir transferência de um volume fixo.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se transferir exatamente um volume nominal de solução. Qual instrumento é a escolha mais adequada?",
    [
      "proveta",
      "bureta",
      "pipeta volumétrica",
      "pluviômetro"
    ],
    2,
    "A escolha adequada é a pipeta volumétrica, pois sua finalidade é medir transferência de um volume fixo.",
    "Médio"
  ],
  [
    "Qual associação entre pipeta volumétrica e sua grandeza está correta?",
    [
      "proveta",
      "bureta",
      "pipeta volumétrica",
      "pluviômetro"
    ],
    2,
    "A associação correta é pipeta volumétrica — transferência de um volume fixo; sua indicação é expressa usualmente em mililitro.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de transferência de um volume fixo. Qual equipamento deve selecionar?",
    [
      "proveta",
      "bureta",
      "pipeta volumétrica",
      "pluviômetro"
    ],
    2,
    "Para medir transferência de um volume fixo, deve-se selecionar a pipeta volumétrica; a unidade usual é mililitro.",
    "Difícil"
  ],
  [
    "Qual instrumento é projetado para medir grandezas elétricas como tensão, corrente e resistência?",
    [
      "multímetro",
      "micrômetro",
      "barômetro",
      "higrômetro"
    ],
    0,
    "Multímetro é utilizado para medir grandezas elétricas como tensão, corrente e resistência.",
    "Fácil"
  ],
  [
    "Em uma atividade prática, deseja-se realizar diferentes verificações elétricas com um único aparelho. Qual instrumento é a escolha mais adequada?",
    [
      "multímetro",
      "micrômetro",
      "barômetro",
      "higrômetro"
    ],
    0,
    "A escolha adequada é o multímetro, pois sua finalidade é medir grandezas elétricas como tensão, corrente e resistência.",
    "Médio"
  ],
  [
    "Qual associação entre multímetro e sua grandeza está correta?",
    [
      "multímetro",
      "micrômetro",
      "barômetro",
      "higrômetro"
    ],
    0,
    "A associação correta é multímetro — grandezas elétricas como tensão, corrente e resistência; sua indicação é expressa usualmente em volt, ampere e ohm.",
    "Médio"
  ],
  [
    "Um técnico precisa obter uma medida de grandezas elétricas como tensão, corrente e resistência. Qual equipamento deve selecionar?",
    [
      "multímetro",
      "micrômetro",
      "barômetro",
      "higrômetro"
    ],
    0,
    "Para medir grandezas elétricas como tensão, corrente e resistência, deve-se selecionar o multímetro; a unidade usual é volt, ampere e ohm.",
    "Difícil"
  ]
];
export const expansionBatch11Questions: Question[] = rows.map(([prompt, options, answer, explanation, level], index) => ({
 id: `exp11-measurement-${String(index+1).padStart(2,"0")}`, subject:"gerais", topic:"topic-52", level, prompt, options, answer, explanation,
 xp:level==="Difícil"?15:10, sourceId:"exp11-metrology"
}));
