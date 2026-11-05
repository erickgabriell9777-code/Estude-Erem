import type {Question,SubjectId} from "./study-data";
// Original authored questions. Explicit, append-only topic IDs preserve study history.
export const notebookTopics:{id:string;subject:SubjectId;name:string;summary:string}[]=[];
export const notebookQuestions:Question[]=[];
export const notebookSources=[
 {id:"notes-linear",title:"Linear Approximations and Differentials",publisher:"OpenStax · Calculus Volume 1",url:"https://openstax.org/books/calculus-volume-1/pages/4-2-linear-approximations-and-differentials",accessedAt:"2026-09-15"},
 {id:"notes-mvt",title:"The Mean Value Theorem",publisher:"OpenStax · Calculus Volume 1",url:"https://openstax.org/books/calculus-volume-1/pages/4-4-the-mean-value-theorem",accessedAt:"2026-09-15"},
 {id:"notes-ode",title:"Separable Equations",publisher:"OpenStax · Calculus Volume 2",url:"https://openstax.org/books/calculus-volume-2/pages/4-3-separable-equations",accessedAt:"2026-09-15"},
 {id:"notes-polar",title:"Polar Coordinates",publisher:"OpenStax · Calculus Volume 2",url:"https://openstax.org/books/calculus-volume-2/pages/7-3-polar-coordinates",accessedAt:"2026-09-15"}
];
function addQuestion(topic:string,row:string[],level:Question["level"]="Médio"){
 const t=notebookTopics.find(t=>t.id===topic)!;
 const [prompt,correct,a,b,c,explanation]=row;
 if(row.length!==6||new Set([correct,a,b,c]).size!==4)throw new Error(`Invalid question: ${prompt}`);
 const rotation=notebookQuestions.length%4,options=[correct,a,b,c];
 for(let j=0;j<rotation;j++)options.unshift(options.pop()!);
 const sourceId=({"topic-197":"notes-linear","topic-198":"notes-mvt","topic-199":"notes-ode","topic-200":"notes-polar"} as Record<string,string>)[topic];
 notebookQuestions.push({id:`notebook-${topic}-${notebookQuestions.filter(q=>q.topic===topic).length}`,topic,subject:t.subject,prompt,options,answer:rotation,explanation,level,xp:10,...(sourceId?{sourceId}:{})});
}
// Each block explores six different skills, with two questions at each difficulty.
const content=String.raw`
@159|portugues|Pontuação e efeitos de sentido|Vírgulas organizam relações sintáticas. Observe vocativos, enumerações e explicações sem separar sujeito e verbo.
Em “Lucas, revise o resumo”, a vírgula separa qual termo?|Vocativo|Sujeito de revise|Objeto direto|Predicado inteiro|Lucas é a pessoa chamada pelo enunciador, por isso funciona como vocativo.
Qual frase pontua adequadamente uma enumeração simples?|Levei lápis, caderno e régua.|Levei, lápis caderno e régua.|Levei lápis caderno, e, régua.|Levei lápis, caderno, e, régua.|A vírgula separa os primeiros itens; o último é ligado por e.
Qual frase evita separar sujeito e verbo por vírgula?|Os livros da estante caíram.|Os livros, da estante caíram.|Os livros da estante, caíram.|Os, livros da estante caíram.|Os livros da estante é o sujeito completo de caíram.
Em “A professora disse: estudem os exemplos”, os dois-pontos introduzem:|O conteúdo do que foi dito|Uma enumeração de sujeitos|Um vocativo oculto|Uma oposição obrigatória|Os dois-pontos apresentam a fala anunciada pelo verbo dizer.
Qual diferença existe entre “Não espere” e “Não, espere”?|A segunda pode negar algo anterior e pedir que se espere|Ambas proíbem esperar sem diferença|A primeira sempre faz uma pergunta|A segunda não contém ordem|A vírgula separa a negação de uma instrução afirmativa na segunda frase.
Em “Os atletas, que chegaram cedo, aqueceram”, a oração entre vírgulas é:|Explicativa|Restritiva|Condicional|Consecutiva|As vírgulas apresentam a chegada cedo como informação adicional sobre os atletas mencionados.
@160|portugues|Regência e pronomes relativos|Relacione verbos e nomes às preposições que exigem. Nos relativos, confira o antecedente e a função na oração.
Complete na norma-padrão: Ela gosta ___ música.|De|A|Por|Em|Gostar exige a preposição de para introduzir seu complemento.
Em “o livro que comprei”, a palavra que retoma:|O livro|Comprei|Eu apenas|Uma compra futura|O pronome relativo recupera o antecedente livro.
Na norma-padrão, preferir se constrói como:|Prefiro chá a café.|Prefiro mais chá do que café.|Prefiro chá do que café.|Prefiro antes chá que café.|Na construção comparativa formal, prefere-se uma coisa a outra.
Complete: Este é o projeto ___ resultados analisamos.|Cujos|Que os|Onde|Cujo os|Cujos relaciona projeto a resultados e concorda com o termo possuído, sem artigo depois.
Qual opção usa onde com antecedente de lugar?|A cidade onde nasci mudou.|A ideia onde concordo mudou.|O motivo onde sorri mudou.|O argumento onde defendo mudou.|Onde retoma um lugar, como cidade, nessa construção.
Complete na norma-padrão: A pesquisadora ___ trabalho me referi chegou.|A cujo|Cujo o|De cujo|Que cujo|Referir-se exige a; cujo expressa a relação entre pesquisadora e trabalho, sem artigo.
@161|matematica|Geometria plana: áreas e perímetros|Perímetro mede contorno; área mede superfície. Identifique a figura, as medidas e a unidade adequada antes de calcular.
Um quadrado tem lado de 7 cm. Qual seu perímetro?|28 cm|49 cm|14 cm|21 cm|O contorno tem quatro lados: 4 × 7 = 28 cm.
Qual é a área de um retângulo de 9 m por 4 m?|36 m²|26 m²|18 m²|13 m²|A área é o produto das dimensões: 9 × 4 = 36 m².
Um triângulo tem base de 12 cm e altura correspondente de 5 cm. Sua área é:|30 cm²|60 cm²|17 cm²|34 cm²|Use base × altura / 2: 12 × 5 / 2 = 30.
Qual é a área de um círculo de raio 4 cm, em função de π?|16π cm²|8π cm²|4π cm²|32π cm²|A = πr² = π × 4² = 16π.
Se dobramos todas as medidas lineares de uma figura plana, sua área fica:|Quatro vezes maior|Duas vezes maior|Igual|Oito vezes maior|Áreas de figuras semelhantes variam com o quadrado da razão linear: 2² = 4.
Um terreno 10 m × 8 m perde um recorte retangular de 3 m × 2 m. A área restante é:|74 m²|86 m²|64 m²|70 m²|Subtraia a área do recorte: 80 − 6 = 74 m².
@162|matematica|Sistemas lineares e modelagem|Use uma equação para cada relação independente. Substituição e eliminação ajudam a encontrar valores que satisfazem todas as condições.
Se x + y = 10 e x = 4, quanto vale y?|6|14|4|10|Substitua x: 4 + y = 10, portanto y = 6.
Qual par satisfaz x + y = 9 e x − y = 3?|x = 6, y = 3|x = 3, y = 6|x = 5, y = 4|x = 9, y = 3|Somar as equações dá 2x = 12; depois y = 3.
Um ingresso inteiro custa 20 reais e uma meia custa 10. Vender x inteiros e y meias rende 100 reais. Qual equação representa a receita?|20x + 10y = 100|x + y = 100|20x − 10y = 100|30xy = 100|Some os valores arrecadados com cada tipo de ingresso.
O sistema x + y = 3 e x + y = 7 possui:|Nenhuma solução|Uma solução|Duas soluções|Infinitas soluções|A mesma soma não pode ser 3 e 7 simultaneamente.
As equações x + 2y = 8 e 2x + 4y = 16 descrevem:|A mesma reta e infinitas soluções|Retas paralelas distintas|Uma única solução obrigatória|Nenhuma solução|A segunda equação é o dobro da primeira, sem acrescentar condição independente.
Três canetas e dois cadernos custam 31 reais; uma caneta e dois cadernos custam 21. Quanto custa cada caneta?|5 reais|10 reais|7 reais|3 reais|Subtraia as relações: duas canetas custam 10 reais, então cada uma custa 5.
@163|redacao|Coesão referencial e progressão|Pronomes, substituições e conectores ligam partes do texto. A progressão acrescenta informação sem perder a relação com o tema.
Em “Lia leu o artigo e o resumiu”, o pronome o substitui:|O artigo|Lia|O ato de ler|Um autor não citado|O retoma o artigo e evita repeti-lo.
Qual conector introduz uma conclusão?|Portanto|Embora|Caso|Enquanto|Portanto sinaliza uma consequência do raciocínio anterior.
Um parágrafo apresenta um problema; o seguinte descreve uma solução relacionada. Há:|Progressão temática|Ausência de tema|Repetição literal obrigatória|Contradição automática|O texto avança do diagnóstico para uma resposta ao problema.
Qual revisão reduz a ambiguidade de “Paula falou com Rita sobre seu projeto”?|Nomear de quem é o projeto|Acrescentar muito ao fim|Trocar falou por disse, mantendo todo o resto|Retirar o ponto final|O possessivo pode ter dois referentes; explicitar o possuidor esclarece a relação.
Uma frase começa com “Por outro lado”. O leitor espera principalmente:|Uma perspectiva diferente da anterior|Uma repetição idêntica|Uma ordem cronológica obrigatória|Uma citação obrigatória|O conector sinaliza contraste ou outro aspecto do mesmo debate.
Qual estratégia melhora um texto que repete a tese sem desenvolvê-la?|Explicar mecanismos e analisar exemplos pertinentes|Repetir a tese em letras maiores|Inserir conectores sem relação lógica|Adicionar frases de outro tema|Progressão exige acrescentar razões e relações que sustentem a posição.
@164|redacao|Contra-argumento e limites da tese|Considere objeções reais, responda com razões e delimite suas afirmações. Evite atacar pessoas ou generalizar além das evidências.
O que é um contra-argumento?|Uma razão que questiona uma posição|Uma palavra difícil|Um título longo|Uma regra de acentuação|Ele apresenta uma objeção à tese ou a uma de suas justificativas.
Qual resposta discute uma ideia sem atacar seu autor?|O dado usado não sustenta essa conclusão.|Você é incapaz de pensar.|Seu nome torna sua ideia errada.|Ninguém da sua cidade sabe nada.|A primeira opção avalia a relação entre evidência e conclusão.
Ao reconhecer uma exceção pertinente, uma tese pode ficar:|Mais precisa e delimitada|Automaticamente falsa|Sem necessidade de argumentos|Obrigatoriamente mais longa|Delimitar o alcance evita afirmar mais do que se consegue sustentar.
Qual objeção é mais pertinente à proposta de aulas só pela internet?|Como atender alunos sem conexão adequada?|Qual a cor preferida do diretor?|Qual o tamanho do título do projeto?|Qual o nome do primeiro aluno?|A disponibilidade de conexão afeta diretamente o acesso às aulas propostas.
Responder apenas a uma versão distorcida da opinião contrária enfraquece o texto porque:|Não enfrenta a objeção real|Torna toda frase uma citação|Aumenta necessariamente a precisão|Dispensa qualquer evidência|Um argumento deve responder ao que foi efetivamente defendido, sem deformá-lo.
Qual formulação evita generalização absoluta sem apoio?|Nas escolas analisadas, a medida coincidiu com melhora.|Toda escola melhorará com certeza.|Nunca existe exceção em educação.|Um exemplo prova todos os casos.|A primeira limita o alcance à amostra e não afirma causalidade indevida.
@165|literatura|Gêneros narrativos: conto e crônica|Compare extensão, concentração do enredo e relação com o cotidiano. As características orientam a leitura, mas não são regras sem exceção.
O conto costuma concentrar-se em:|Um conflito narrativo relativamente delimitado|Uma lista de fórmulas sem enredo|Uma sequência obrigatória de notícias|Um catálogo comercial|O conto tende à concentração de personagens, tempo e conflito.
A crônica frequentemente parte de:|Uma situação cotidiana|Uma demonstração algébrica obrigatória|Uma rubrica teatral apenas|Uma lei física inédita|O cotidiano pode gerar reflexão, humor ou crítica na crônica.
Qual elemento estabelece uma dificuldade que move a narrativa?|Conflito|Número da página|Fonte tipográfica|Sumário|O conflito organiza tensões e motiva ações das personagens.
Tempo cronológico e tempo psicológico diferem porque o segundo enfatiza:|A experiência subjetiva da duração|Só a ordem dos relógios|Sempre séculos exatos|A ausência de personagens|Lembranças e expectativas podem alongar ou condensar a experiência do tempo.
Uma crônica narra um encontro no ônibus e reflete sobre convivência. Essa combinação mostra:|Cotidiano articulado à reflexão|Incompatibilidade entre narrativa e opinião|Obrigação de final fantástico|Ausência de tema|A cena concreta funciona como ponto de partida para uma interpretação mais ampla.
O final de um conto deixa parte do conflito em aberto. O leitor deve:|Construir hipóteses com pistas do texto|Inventar qualquer resposta sem considerar o texto|Concluir que o conto não tem autor|Descartar todo o enredo anterior|A abertura convida à interpretação sustentada nos elementos narrativos.
@166|literatura|Intertextualidade e leitura comparada|Textos dialogam por referências, transformações e retomadas. Investigue como o novo contexto altera o sentido do material retomado.
Intertextualidade é a relação de um texto com:|Outros textos|Somente seu papel|Somente sua margem|Apenas seu preço|A leitura reconhece referências ou transformações de textos anteriores.
Uma paródia costuma retomar uma obra para:|Transformá-la, frequentemente com efeito crítico ou humorístico|Reproduzi-la sempre sem mudanças|Apagar qualquer relação reconhecível|Torná-la obrigatoriamente científica|A paródia depende de uma retomada transformadora, muitas vezes crítica.
Uma epígrafe é geralmente:|Um trecho colocado antes do texto, em diálogo com ele|A assinatura do leitor|Um erro de impressão|Uma lista obrigatória de personagens|A epígrafe pode antecipar questões ou sugerir uma chave de leitura.
Na leitura comparada, qual pergunta é mais produtiva?|Como cada texto trata o mesmo tema?|Qual possui mais letras apenas?|Qual capa custa mais?|Qual elimina a necessidade de leitura?|Comparar escolhas de linguagem e perspectiva ajuda a compreender os sentidos.
Uma narrativa muda um conto antigo para o contexto de uma escola atual. O que analisar?|Permanências e transformações causadas pelo novo contexto|Só se os nomes têm o mesmo tamanho|Apenas a pontuação da primeira linha|Se todo leitor terá opinião idêntica|A atualização pode preservar conflitos e modificar valores e relações.
Reconhecer uma referência literária basta para interpretar seu efeito?|Não; é preciso examinar sua função no novo texto|Sim; localizar o nome encerra a análise|Sim; toda referência tem a mesma função|Não; referências nunca produzem sentidos|Identificar a origem é um passo; o contexto mostra por que ela foi retomada.
@167|historia|Renascimento e Humanismo|Estude a valorização da cultura clássica e das capacidades humanas em contextos europeus dos séculos XIV a XVI, sem apagar continuidades religiosas.
O Renascimento europeu retomou referências de qual tradição?|Greco-romana|Exclusivamente industrial|Apenas digital|Exclusivamente pré-colombiana|Obras e ideias da Antiguidade clássica foram estudadas e reinterpretadas.
Mecenas eram pessoas ou instituições que:|Patrocinavam artistas e estudiosos|Proibiam qualquer produção cultural|Trabalhavam somente como soldados|Eliminavam todas as cidades|O patrocínio ajudava a financiar obras e investigações.
Humanismo renascentista valorizava especialmente:|O estudo das letras e das capacidades humanas|O abandono de toda educação|A proibição de línguas antigas|A inexistência da vida social|Os estudos humanísticos valorizavam textos, história e reflexão sobre o ser humano.
A perspectiva linear na pintura permite:|Representar profundidade numa superfície plana|Eliminar qualquer ponto de vista|Converter tinta em escultura real|Impedir a representação de espaço|Linhas e proporções organizadas criam a impressão de profundidade.
É correto afirmar que toda arte renascentista deixou de ter tema religioso?|Não; muitos temas religiosos permaneceram|Sim; qualquer tema religioso foi proibido|Sim; só existiam paisagens|Não; nenhuma inovação ocorreu|Mudanças culturais coexistiram com encomendas e representações religiosas.
Por que associar cidades mercantis ao patrocínio renascentista?|Riqueza e disputas de prestígio podiam financiar obras|O comércio impedia todo contato cultural|Toda cidade possuía o mesmo governo|Artistas não precisavam de recursos|Recursos e interesses de grupos urbanos ajudam a explicar parte desse patrocínio.
@168|historia|Iluminismo e transformações políticas|Analise críticas ao poder absoluto e debates sobre razão, liberdade e organização política, reconhecendo diferenças entre autores e limites históricos.
O Iluminismo ficou associado à valorização de:|Razão e debate crítico|Obediência sem exame como único método|Ausência de conhecimento|Fim de toda circulação de ideias|Pensadores iluministas defenderam diferentes usos da razão para examinar instituições e saberes.
A separação de poderes procura:|Evitar a concentração de funções de governo|Reunir todas as decisões numa única pessoa|Eliminar qualquer instituição|Proibir a elaboração de normas|Distribuir funções e criar controles limita a concentração de poder.
O absolutismo era criticado por concentrar poder:|No monarca|Em todos os habitantes igualmente|Apenas em associações de estudantes|Em máquinas industriais|Críticas iluministas questionaram justificações e limites do poder monárquico.
A Enciclopédia organizada por Diderot e d’Alembert buscava:|Reunir e difundir conhecimentos|Apagar todos os saberes técnicos|Impedir a leitura pública|Registrar apenas receitas culinárias|O projeto articulava saberes e participação de diferentes colaboradores.
Os iluministas defendiam exatamente as mesmas posições?|Não; existiam diferenças entre seus projetos|Sim; nenhum debate existia|Sim; escreveram uma única obra coletiva|Não; nenhum valorizava a razão|O movimento reuniu autores com divergências políticas, religiosas e sociais.
Ao estudar discursos históricos de liberdade, por que observar quem era excluído?|Para distinguir ideais proclamados e participação efetiva|Para ignorar todas as fontes|Para supor igualdade já universal|Para substituir pesquisa por julgamento sem contexto|A abrangência concreta dos direitos pode ser mais limitada que o discurso geral.
@169|geografia|Relevo, intemperismo e erosão|Intemperismo altera rochas; erosão remove e transporta materiais. Água, vento e gravidade atuam em combinação com clima e cobertura vegetal.
A desagregação ou alteração da rocha no próprio local é:|Intemperismo|Migração|Urbanização|Translação|Intemperismo não exige transporte do material alterado.
Qual processo envolve remoção e transporte de partículas?|Erosão|Condensação|Fusão nuclear|Fotossíntese|A erosão mobiliza materiais por agentes como água e vento.
Raízes que crescem em fraturas podem contribuir para:|Fragmentação da rocha|Criação instantânea de petróleo|Interrupção da gravidade|Desaparecimento de toda água|A pressão exercida pelas raízes pode ampliar fraturas.
A deposição de sedimentos transportados recebe o nome de:|Sedimentação|Sublimação|Evaporação|Rotação|Quando a capacidade de transporte diminui, o material pode se depositar.
Por que retirar a vegetação de uma encosta pode aumentar a erosão?|O solo fica mais exposto à chuva e ao escoamento|A chuva perde toda sua energia|O relevo deixa de existir|A infiltração torna-se sempre infinita|A cobertura intercepta gotas e as raízes ajudam a estabilizar o solo.
Uma rocha sofre dissolução pela água com substâncias ácidas. O processo é principalmente:|Intemperismo químico|Apenas transporte eólico|Somente sedimentação|Metamorfismo obrigatório|A composição mineral é alterada por reações químicas.
@170|geografia|Redes urbanas e organização do espaço|Cidades se conectam por fluxos de pessoas, mercadorias, serviços e informação. Funções e influência não dependem só do tamanho populacional.
Uma rede urbana é formada por:|Cidades e suas conexões|Apenas fios elétricos|Somente áreas rurais isoladas|Apenas limites de estados|Fluxos entre cidades organizam relações de interdependência.
Deslocar-se regularmente de uma cidade para trabalhar em outra é um exemplo de:|Movimento pendular|Êxodo permanente obrigatório|Transumância de rebanhos|Deslocamento tectônico|O movimento pendular envolve deslocamentos recorrentes, geralmente com retorno.
Conurbação ocorre quando:|Manchas urbanas de cidades vizinhas se unem|Uma cidade perde todos os habitantes|Todo campo se torna floresta|Duas capitais ficam em continentes distintos|A continuidade física pode ultrapassar limites administrativos municipais.
Uma cidade concentra hospitais especializados usados por municípios vizinhos. Isso indica:|Influência regional de serviços|Ausência de rede urbana|Obrigação de ser a maior do país|Fim de todo deslocamento|A oferta de serviços atrai fluxos e amplia a área de influência.
Por que população total não basta para explicar a hierarquia urbana?|As funções e a articulação de fluxos também importam|Toda cidade tem influência idêntica|Serviços nunca atraem pessoas|A distância deixou de existir|Centralidade inclui atividades e conexões, além do número de habitantes.
Expandir moradias longe dos empregos sem transporte adequado pode provocar:|Maior dificuldade de acesso às oportunidades|Redução automática de todos os deslocamentos|Fim da desigualdade espacial|Ausência de qualquer custo social|Distâncias e oferta de transporte influenciam tempo, custo e acesso à cidade.
@171|biologia|Evolução e seleção natural|A seleção atua sobre variações herdáveis e sucesso reprodutivo em determinado ambiente. Populações mudam ao longo das gerações.
A seleção natural exige que indivíduos de uma população apresentem:|Variações relevantes para sobrevivência ou reprodução|Características sempre idênticas|Ausência de hereditariedade|Mudanças escolhidas conscientemente|Variações herdáveis podem resultar em diferenças de sucesso reprodutivo.
Na evolução biológica, indivíduos mudam seus genes por vontade para se adaptar?|Não; mudanças não dependem de vontade ou necessidade consciente|Sim; todo gene muda quando necessário|Sim; basta repetir uma ação|Não; populações nunca mudam|A seleção atua sobre variações; não planeja mudanças para atender necessidades.
Uma característica vantajosa em um ambiente pode ser desvantajosa em outro?|Sim|Nunca|Só se não for herdável|Apenas se não houver reprodução|Vantagens dependem das condições e das interações ambientais.
Estruturas homólogas podem indicar:|Ancestralidade comum|Função obrigatoriamente idêntica|Ausência de evolução|Origem sempre independente|Semelhanças estruturais herdadas podem persistir com funções diferentes.
Um alelo aumenta por acaso após uma população diminuir muito. Isso exemplifica:|Deriva genética|Seleção consciente|Uso e desuso obrigatório|Fotossíntese|Em populações pequenas, efeitos aleatórios podem alterar bastante frequências alélicas.
Por que sucesso evolutivo não significa simplesmente ser o mais forte?|Importa a contribuição reprodutiva em um contexto ambiental|Só importa o tamanho corporal|Todo indivíduo reproduz igualmente|Força elimina a hereditariedade|Características distintas podem favorecer descendência conforme o ambiente.
@172|biologia|Ecologia de populações e comunidades|População reúne indivíduos da mesma espécie; comunidade reúne populações. Analise recursos, interações e limites ambientais.
Um conjunto de capivaras da mesma região e período forma uma:|População|Organela|Biosfera inteira|Molécula|População reúne indivíduos da mesma espécie em uma área e período.
Todas as populações que interagem num lago compõem sua:|Comunidade|Célula|Espécie única|Rocha matriz|A comunidade inclui os conjuntos de organismos de diferentes espécies.
Duas espécies utilizam um recurso limitado semelhante. Pode ocorrer:|Competição interespecífica|Ausência obrigatória de interação|Mitose entre espécies|Mutualismo obrigatório|O uso compartilhado de recursos escassos pode gerar competição.
Em uma relação mutualística, o resultado para as duas espécies é:|Benefício para ambas|Prejuízo para ambas|Benefício para uma e prejuízo para outra|Nenhum efeito para ambas|Mutualismo envolve benefícios recíprocos, sem exigir em todos os casos dependência obrigatória.
A capacidade de suporte de um ambiente está relacionada a:|Recursos e condições que sustentam uma população|Um número fixo para todos os ambientes|Quantidade de planetas|Apenas o nome da espécie|Ela depende das condições ambientais e pode variar com o tempo.
Por que remover um predador pode alterar mais de uma população?|As relações alimentares conectam diferentes níveis|Predadores não participam de teias|Todas as espécies são independentes|Só a quantidade de rochas muda|Efeitos indiretos podem se propagar pela teia alimentar.
@173|fisica|Trabalho, energia e potência|Relacione energia transferida, força, deslocamento e tempo. Considere a direção da força ao calcular trabalho.
No SI, potência é medida em:|Watt|Joule|Newton|Metro|Um watt equivale a um joule por segundo.
Uma força constante de 10 N acompanha um deslocamento de 3 m na mesma direção e sentido. O trabalho é:|30 J|13 J|300 J|3 J|W = Fd cos(0) = 10 × 3 = 30 J.
Um aparelho transfere 600 J em 3 s. Sua potência média é:|200 W|1800 W|603 W|300 W|Potência média é energia dividida pelo intervalo: 600/3 = 200.
Dobrar a velocidade de um corpo, mantendo sua massa, faz sua energia cinética:|Quadruplicar|Dobrar|Cair à metade|Permanecer igual|Ec = mv²/2 depende do quadrado da velocidade.
Uma força perpendicular ao deslocamento realiza quanto trabalho nesse deslocamento?|Zero|Sempre positivo|Sempre negativo|Igual ao módulo da força|O produto escalar usa cos(90°) = 0.
Um corpo desce sem atrito sob gravidade. O que ocorre com sua energia mecânica?|Conserva-se, com conversão entre potencial e cinética|Desaparece inteiramente|Aumenta sem fonte|Vira apenas massa|Sem trabalho de forças dissipativas, a soma das energias cinética e potencial permanece constante.
@174|fisica|Óptica geométrica e espelhos|Na reflexão, ângulos são medidos em relação à normal. Compare imagens e trajetórias de raios em situações ideais.
Num espelho plano, o ângulo de reflexão é:|Igual ao de incidência|Sempre o dobro|Sempre zero|Sempre 90 graus|A lei da reflexão usa ângulos medidos em relação à normal.
A imagem de um objeto num espelho plano ideal tem tamanho:|Igual ao do objeto|Sempre dobrado|Sempre reduzido à metade|Sempre nulo|O espelho plano produz imagem com ampliação de módulo 1.
Um raio faz 30° com a normal ao espelho. Qual seu ângulo de reflexão?|30°|60°|90°|15°|Incidência e reflexão têm ângulos iguais em relação à normal.
Um objeto está a 2 m de um espelho plano. A distância entre objeto e imagem é:|4 m|2 m|1 m|8 m|A imagem fica 2 m atrás do plano; a separação total é 4 m.
Um raio passa obliquamente do ar para o vidro, com maior índice de refração. Em geral, ele:|Aproxima-se da normal|Afasta-se sempre da normal|Não pode mudar de direção|Ganha velocidade no vidro|Pela lei de Snell, o ângulo diminui ao entrar no meio de maior índice.
Uma imagem virtual se caracteriza porque:|Resulta do encontro de prolongamentos de raios|Exige luz inexistente|É sempre invisível|Só pode ser maior que o objeto|Os raios não convergem efetivamente no ponto onde a imagem parece estar.
@175|quimica|Soluções e concentração|Relacione quantidade de soluto e volume de solução. Na diluição sem reação nem perda, a quantidade de soluto se conserva.
Numa solução de sal em água em pequena concentração, a água é o:|Solvente|Soluto|Precipitado obrigatório|Catalisador obrigatório|A água constitui o meio em que o sal se dissolve.
Uma solução contém 12 g de soluto em 2 L. Sua concentração comum é:|6 g/L|24 g/L|14 g/L|2 g/L|Divida a massa de soluto pelo volume da solução: 12/2 = 6.
Ao adicionar água a uma solução sem perder soluto, sua concentração tende a:|Diminuir|Aumentar sempre|Ficar sempre igual|Tornar-se obrigatoriamente zero|A mesma quantidade de soluto passa a ocupar um volume maior.
Qual é a concentração molar de 0,5 mol em 2 L de solução?|0,25 mol/L|1 mol/L|2,5 mol/L|4 mol/L|A concentração molar é n/V = 0,5/2 = 0,25.
Diluir 100 mL de solução 2 mol/L até 400 mL produz concentração de:|0,5 mol/L|8 mol/L|2 mol/L|4 mol/L|C₁V₁ = C₂V₂; C₂ = 2 × 100/400 = 0,5.
Misturam-se 1 L de solução 2 mol/L e 1 L de solução 4 mol/L do mesmo soluto, sem reação e com volumes aditivos. A concentração final é:|3 mol/L|6 mol/L|2 mol/L|8 mol/L|Há 2 + 4 = 6 mol em 2 L: 3 mol/L.
@176|quimica|Cinética química e catalisadores|Velocidade de reação depende de condições e do mecanismo. Catalisadores oferecem um caminho com menor energia de ativação.
Qual é o foco central da cinética química?|Velocidades de reações|Só a cor dos elementos|Apenas massas de planetas|Somente a forma dos recipientes|Ela investiga como e quão rapidamente as transformações ocorrem.
Um catalisador participa do mecanismo e ao final do ciclo é:|Regenerado|Sempre consumido integralmente|Transformado obrigatoriamente em gás|Incapaz de participar de etapas|Ele pode participar de etapas intermediárias, mas é regenerado no ciclo catalítico.
Por que pulverizar um sólido pode acelerar sua reação com uma solução?|Aumenta a área de contato exposta|Altera obrigatoriamente seu elemento químico|Elimina qualquer colisão|Reduz a superfície total|Mais superfície disponível pode aumentar as interações entre reagentes.
Aumentar a temperatura geralmente acelera uma reação porque:|Mais partículas conseguem superar a barreira de ativação|Todas as partículas deixam de se mover|A energia de ativação sempre vira zero|A matéria perde seus átomos|A distribuição de energias muda e mais colisões podem ser eficazes.
Um catalisador altera o valor da constante de equilíbrio a temperatura fixa?|Não; acelera a chegada ao equilíbrio|Sim; sempre a multiplica por dez|Sim; torna toda reação irreversível|Não; ele impede todas as reações|Ele modifica velocidades dos caminhos direto e inverso, não a termodinâmica do equilíbrio.
Dobrar uma concentração sempre dobra a velocidade de qualquer reação?|Não; depende da lei de velocidade|Sim; não há exceção|Sim; basta manter o nome do reagente|Não; concentração nunca importa|A dependência da velocidade em relação à concentração varia conforme a reação.
@177|filosofia|Conhecimento: experiência e razão|Compare fontes e justificações do conhecimento. Diferencie possuir uma crença, apresentar razões e reconhecer limites de uma conclusão.
Uma pergunta epistemológica é:|Como justificamos o que afirmamos saber?|Qual o perímetro deste quadrado?|Qual a cor desta capa?|Quantos minutos tem a aula?|A epistemologia investiga conhecimento, justificação e seus limites.
O empirismo atribui papel central à:|Experiência|Ausência de observação|Repetição sem exame|Cor das palavras|Correntes empiristas destacam a experiência na formação do conhecimento.
O racionalismo enfatiza especialmente:|O papel da razão no conhecimento|A impossibilidade de raciocinar|O abandono de toda demonstração|A necessidade de acreditar sem razões|Há diferentes racionalismos, mas a razão ocupa posição central.
Uma crença muito difundida é necessariamente verdadeira?|Não; popularidade não basta para justificá-la|Sim; maioria nunca erra|Sim; toda tradição é demonstração|Não; toda crença comum é falsa|A difusão de uma ideia não garante sua correspondência com os fatos ou sua justificação.
O ceticismo filosófico pode contribuir para a investigação ao:|Examinar os limites das justificações|Proibir qualquer pergunta|Garantir que toda opinião é verdadeira|Substituir argumentos por ameaças|Questionar razões permite perceber pressupostos e limites do conhecimento.
Uma conclusão excede o que as evidências permitem. Qual atitude é mais rigorosa?|Reduzir seu alcance e explicitar a incerteza|Aumentar o tom de certeza|Ocultar evidências contrárias|Trocar a evidência pela fama do autor|O grau de confiança deve acompanhar a força das razões disponíveis.
@178|filosofia|Filosofia política: poder e legitimidade|Diferencie exercer poder e justificá-lo. Examine liberdade, consentimento, bem comum e tensões entre interesses coletivos e individuais.
Dizer que um poder é legítimo envolve discutir:|As razões que justificam seu exercício|Somente a força física disponível|Apenas a idade do governante|A cor de uma bandeira|Legitimidade diz respeito à justificação e ao reconhecimento do poder.
Qual questão é típica da filosofia política?|O que torna uma organização social justa?|Qual é a raiz de 81?|Como classificar uma molécula?|Qual a capital de um país?|Justiça, poder e organização coletiva são temas dessa área.
Teorias do contrato social investigam principalmente:|A justificação da organização política por um acordo|A soma de preços de mercadorias apenas|Contratos de aluguel exclusivamente|A inexistência de vida coletiva|O contrato funciona como recurso teórico para examinar a autoridade política.
Confundir obediência obtida por medo com aceitação justificada ignora a diferença entre:|Coerção e legitimidade|Sujeito e predicado|Massa e volume|Rima e estrofe|Um poder pode impor comportamentos sem ser considerado justificável pelos submetidos.
Uma regra beneficia um grupo e impõe custos a outro. Avaliá-la exige:|Examinar razões, efeitos e critérios de justiça|Considerar só quem fala mais alto|Ignorar quem é afetado|Supor que todo conflito desaparece|A análise política precisa considerar interesses e justificar os critérios de distribuição.
Dizer que liberdade só pode ser pensada sem qualquer vida coletiva é problemático porque:|Instituições e relações sociais também afetam possibilidades de agir|Sociedades eliminam toda escolha de modo idêntico|Liberdade é apenas uma unidade de medida|Nenhuma regra afeta ninguém|O debate político examina como condições sociais limitam ou possibilitam a liberdade.
@179|sociologia|Trabalho e divisão social|A divisão do trabalho organiza funções e interdependências. Analise condições, transformações técnicas e desigualdades sem reduzir trabalho a emprego formal.
Trabalho e emprego formal são conceitos idênticos?|Não; há trabalho fora do emprego formal|Sim; toda atividade útil tem contrato|Sim; só fábricas têm trabalho|Não; emprego nunca envolve trabalho|Atividades domésticas e outras formas de produção podem ser trabalho sem vínculo formal.
Divisão social do trabalho significa:|Distribuição de atividades e funções na sociedade|Separação de palavras por sílabas|Apenas intervalo de almoço|Ausência de qualquer cooperação|A especialização de funções organiza a produção e as relações sociais.
Uma cadeia produtiva depende de agricultores, transportadores e comerciantes. Isso revela:|Interdependência entre atividades|Independência absoluta de cada função|Ausência de divisão do trabalho|Produção sem relações sociais|Etapas e ocupações diferentes se articulam para que o produto circule.
Uma nova máquina modifica tarefas de uma profissão. Uma análise sociológica deve observar:|Efeitos sobre organização, qualificação e condições de trabalho|Só a cor da máquina|Apenas o nome da empresa|Somente a data do manual|Mudanças técnicas se relacionam a decisões, relações e condições sociais.
Por que o trabalho de cuidado sem remuneração importa na análise social?|Sustenta a vida cotidiana e a reprodução social|Não exige tempo de ninguém|Não tem efeitos sobre oportunidades|É sempre distribuído igualmente|Sua distribuição afeta tempo disponível, participação social e desigualdades.
Uma mudança aumenta a produção, mas também a insegurança dos trabalhadores. Avaliá-la exige:|Considerar produtividade e condições sociais conjuntamente|Concluir que mais produção elimina qualquer problema|Ignorar as experiências dos trabalhadores|Tratar técnica como independente de escolhas|Resultados econômicos e impactos sobre as pessoas são dimensões distintas da mudança.
@180|sociologia|Pesquisa social e métodos|Entrevistas, observação e questionários respondem a perguntas diferentes. Avalie amostra, formulação de perguntas, contexto e tratamento dos dados.
Uma entrevista aberta costuma permitir:|Respostas detalhadas com desenvolvimento do entrevistado|Somente números inteiros|Ausência de fala do entrevistado|Resultados automaticamente universais|Ela favorece aprofundamento de experiências e sentidos.
Um questionário com alternativas padronizadas facilita:|Comparar respostas a perguntas iguais|Eliminar todo viés automaticamente|Conhecer qualquer população com uma resposta|Dispensar análise dos dados|A padronização auxilia comparações, mas não garante qualidade por si só.
Qual pergunta de pesquisa é mais delimitada?|Como alunos desta escola usam a biblioteca neste semestre?|Como funciona tudo?|Por que todas as pessoas fazem tudo?|Qual é a explicação única da sociedade?|A primeira explicita grupo, prática, local e período.
Perguntar “Você concorda com essa ótima proposta?” pode gerar:|Indução da resposta|Neutralidade garantida|Amostragem aleatória|Ausência de opinião|O adjetivo ótima sinaliza uma avaliação que pode influenciar o participante.
Uma pesquisa ouve só quem frequenta a escola à noite. Ao falar de todos os turnos, deve reconhecer:|Limitação da amostra|Representatividade automática|Ausência de qualquer seleção|Que o horário nunca importa|Os participantes selecionados podem não representar alunos de outros turnos.
Uma entrevista e um questionário trazem resultados diferentes. O pesquisador deve:|Examinar métodos, contextos e sentidos das diferenças|Apagar o resultado menos conveniente|Concluir que um método nunca serve|Somar frases e percentuais sem critério|Fontes distintas podem captar dimensões diferentes e exigir comparação cuidadosa.
@181|ingles|Present continuous e ações em andamento|Use am, is ou are com verbo em -ing para ações em andamento no contexto indicado. Diferencie ações atuais de hábitos.
Complete: I ___ studying right now.|Am|Is|Are|Be|Com I, usa-se am antes do verbo em -ing.
Complete: They are ___ a new song now.|Learning|Learn|Learns|Learned|O present continuous combina are com learning.
Qual pergunta está no present continuous?|Is she reading now?|Does she reading now?|She is read now?|Is she reads now?|Inverta is e o sujeito, mantendo reading.
Complete a negativa: We ___ watching TV at the moment.|Are not|Does not|Is not|Not are|We pede are; a negação vem depois do auxiliar.
“She studies every day, but today she is resting.” A frase contrasta:|Hábito e ação atual|Duas ações sempre futuras|Dois fatos obrigatoriamente passados|Ausência de tempo verbal|Studies expressa hábito; is resting descreve a situação de hoje.
Qual forma é usual para expressar “Eu sei a resposta” neste contexto?|I know the answer.|I am knowing the answer.|I knows the answer.|I knowing the answer.|Know normalmente expressa estado e, nesse uso, aparece no presente simples.
@182|ingles|Comparativos e superlativos|Compare dois elementos ou destaque um dentro de um grupo. Observe terminações, more, most e formas irregulares.
Complete: This box is ___ than that one. (small)|Smaller|Smallest|More smalling|Small than|Adjetivos curtos como small formam o comparativo com -er.
O superlativo de tall é:|The tallest|The taller|More tall|Tallest than|O superlativo destaca o maior grau dentro do grupo.
Complete: This exercise is ___ difficult than the first.|More|Most|Many|Muchest|Difficult forma o comparativo com more.
Qual é o comparativo irregular de good?|Better|Gooder|Best|More best|Good muda para better no comparativo e best no superlativo.
Complete: Of the three routes, this is the ___. (short)|Shortest|Shorter|More short|Short than|A comparação com todo um grupo pede o superlativo shortest.
Qual frase compara corretamente o preço de dois livros em inglês?|This book is less expensive than that one.|This book is expensiver that one.|This book is the more expensive than.|This book is most cheap than that one.|Less + adjetivo + than expressa inferioridade na comparação.
@183|espanhol|Ser, estar e hay|Diferencie identificação, estado ou localização e existência. O contexto orienta o verbo, evitando regras absolutas sobre duração.
Complete: Mi hermano ___ profesor.|Es|Está|Hay|Están|Ser é usado para identificar a profissão nesse contexto.
Complete: La mochila ___ sobre la mesa.|Está|Es|Hay|Son|Estar indica a localização da mochila.
Complete: En la sala ___ tres sillas.|Hay|Están hay|Es|Soy|Hay apresenta a existência de elementos num lugar.
Como dizer que alguém está cansado agora?|Está cansado.|Es cansar.|Hay cansado.|Son cansado.|Estar + cansado descreve o estado da pessoa.
Qual frase apresenta localização de pessoas já identificadas?|Los estudiantes están en el patio.|Hay los estudiantes patio.|Los estudiantes son en el patio.|Los estudiantes es patio.|O sujeito definido combina com estar para expressar onde está.
Em espanhol, “La reunión es en la biblioteca” pode usar ser porque:|Ser pode indicar onde ocorre um evento|Todo lugar exige ser sem exceção|Biblioteca é sempre uma profissão|Estar não existe no idioma|A localização de eventos admite ser; a regra não se reduz a permanente versus temporário.
@184|espanhol|Pretérito indefinido e marcadores de tempo|Relate acontecimentos concluídos em períodos delimitados, como ayer. Observe flexões regulares e verbos irregulares frequentes.
Complete: Ayer yo ___ con Ana. (hablar)|Hablé|Hablo|Hablaré|Hablando|Ayer marca passado; a primeira pessoa de hablar no indefinido é hablé.
Complete: Nosotros ___ temprano ayer. (comer)|Comimos|Comemos|Comeremos|Comiendo|Comimos expressa uma ação concluída no passado.
Qual marcador costuma indicar um período passado concluído?|Ayer|Mañana|Ahora mismo|Dentro de un mes|Ayer significa ontem.
Complete: Ella ___ una carta la semana pasada. (escribir)|Escribió|Escribo|Escribirá|Escribiendo|A terceira pessoa singular no pretérito é escribió.
Qual forma completa “Ayer ellos ___ al museo”?|Fueron|Van|Irán|Yendo|Fueron é forma do pretérito indefinido de ir nesse contexto.
“Ayer tuve una idea” usa uma forma passada de qual verbo?|Tener|Temer|Tomar|Traer|Tuve é a primeira pessoa do pretérito indefinido de tener.
@185|informatica|Arquivos, formatos e organização|Pastas organizam arquivos; extensões indicam formatos, mas não convertem seu conteúdo. Use nomes claros e cópias adequadas ao objetivo.
Uma aluna quer separar arquivos por matéria e por semestre. Qual estrutura ajuda?|Pastas por matéria com subpastas por semestre|Todos os arquivos com o mesmo nome|Apagar as extensões de todos os arquivos|Guardar tudo somente na lixeira|Uma hierarquia de pastas organiza dois critérios sem depender de nomes iguais.
A extensão .csv costuma indicar:|Dados tabulares em texto com separadores|Uma imagem vetorial obrigatória|Um programa executável sempre|Um vídeo de alta resolução|CSV representa registros e campos textuais separados por delimitadores.
Renomear foto.jpg para foto.pdf converte a imagem em PDF?|Não; mudar a extensão não converte o conteúdo|Sim; qualquer nome converte formatos|Sim; basta usar letras maiúsculas|Não; PDF não pode conter imagens|Uma conversão exige processamento por uma ferramenta adequada.
Qual nome facilita identificar um resumo escolar?|biologia-ecologia-resumo-2026.txt|arquivo-final-final-novo2.txt|semnome.txt|aaaa.txt|Tema, finalidade e data tornam o conteúdo mais reconhecível.
Compactar arquivos num ZIP garante que ficarão protegidos por senha?|Não; compactação e proteção por senha são funções distintas|Sim; todo ZIP tem senha secreta|Sim; o nome zip já criptografa tudo|Não; um ZIP não pode reunir arquivos|Um arquivo compactado pode ou não ter recursos adicionais de proteção.
Uma cópia no mesmo disco protege contra falha completa desse disco?|Não; é preciso uma cópia em outro local adequado|Sim; a pasta já é outro equipamento|Sim; basta alterar o nome|Não; arquivos nunca podem ser copiados|Se o dispositivo falhar, ambas as cópias podem ficar inacessíveis.
@186|informatica|Redes e funcionamento da web|Navegador e servidor trocam solicitações e respostas. Diferencie nomes de domínio, endereços, conexão e proteção do transporte.
O navegador é o programa usado para:|Acessar e apresentar páginas da web|Fornecer energia ao roteador|Substituir fisicamente o processador|Fabricar cabos de rede|Ele solicita recursos e apresenta conteúdo, entre outras funções.
DNS relaciona nomes de domínio principalmente a:|Registros como endereços IP|Somente cores de páginas|Apenas tamanhos de arquivos|Números de páginas de um livro|A resolução DNS ajuda a localizar serviços associados aos nomes.
Uma rede Wi-Fi conectada garante acesso à internet?|Não; pode haver rede local sem saída para a internet|Sim; são exatamente a mesma coisa|Sim; o nome Wi-Fi é prova de acesso|Não; Wi-Fi nunca transporta internet|A conexão com o roteador não garante que ele alcance outros serviços.
Em uma aplicação web, o servidor normalmente:|Recebe solicitações e produz respostas|É sempre a tela do usuário|Existe apenas como um ícone|Dispensa qualquer processamento|Ele pode processar regras, consultar dados e responder ao cliente.
HTTPS garante que toda informação de uma página seja verdadeira?|Não; protege o transporte, mas não verifica a veracidade do conteúdo|Sim; toda página HTTPS é cientificamente correta|Sim; o protocolo revisa cada texto|Não; HTTPS impede qualquer criptografia|Proteção da conexão não equivale a avaliar afirmações ou intenções do site.
Dois aparelhos exibem versões diferentes de uma página após atualização. Uma possível explicação é:|Um deles ainda usa recursos em cache|A web exige imagens diferentes sempre|O domínio deixou de ser texto|O teclado alterou o servidor|Caches podem conservar recursos anteriores até atualização ou revalidação.
@187|programacao|Funções, parâmetros e retorno|Funções agrupam operações; parâmetros recebem entradas e retorno fornece um resultado. Diferencie devolver um valor de apenas exibi-lo.
Um parâmetro de função representa:|Uma entrada recebida pela função|Uma saída sempre impressa|O nome obrigatório de uma variável global|Um erro de sintaxe|Parâmetros permitem usar valores fornecidos em cada chamada.
Se dobro(x) retorna 2 × x, dobro(9) retorna:|18|11|81|9|Substitua x por 9 na expressão 2 × x.
Qual diferença existe entre imprimir um valor e retorná-lo?|Retornar entrega o valor ao código que chamou a função|São sempre a mesma operação|Imprimir encerra todo programa obrigatoriamente|Retornar só muda a cor do terminal|Exibição é um efeito de saída; retorno fornece um resultado à chamada.
Uma função calcula a área de um retângulo. Quais entradas são suficientes?|Base e altura|Apenas a cor|Somente o nome do arquivo|A idade do programador|A área retangular é determinada pelo produto das duas dimensões.
Uma variável local de uma função deve ser acessada de qualquer lugar automaticamente?|Não; seu escopo limita onde pode ser usada|Sim; toda variável é global|Sim; basta usar o mesmo computador|Não; variáveis locais não armazenam valores|Escopo define a região do programa em que uma identificação está disponível.
Uma função devolve sempre a mesma saída para as mesmas entradas e não produz efeitos externos. Ela é chamada de:|Pura|Recursiva obrigatoriamente|Assíncrona obrigatoriamente|Global|Pureza combina determinismo em relação às entradas e ausência de efeitos externos.
@188|programacao|Listas, índices e busca|Listas organizam sequências. Confira a convenção de índices, os limites de acesso e o número de elementos examinados em uma busca.
Numa lista [10, 20, 30] com índices começando em zero, o índice 1 contém:|20|10|30|1|O primeiro elemento tem índice 0 e o segundo, índice 1.
Uma lista com cinco elementos e índices a partir de zero tem último índice:|4|5|6|0|O último índice é quantidade − 1.
Uma busca linear examina elementos:|Sequencialmente até encontrar o alvo ou terminar|Sempre dividindo a lista ordenada ao meio|Sem acessar nenhum elemento|Apenas por ordem alfabética obrigatória|Ela percorre candidatos um a um, sem exigir ordenação.
Qual condição básica permite a busca binária usual numa lista?|A lista estar ordenada segundo a comparação usada|Todos os elementos serem iguais|A lista ter exatamente dois elementos|Os índices começarem em um|A ordem permite descartar uma metade a cada comparação.
Acessar o índice 7 numa lista de tamanho 4, indexada desde zero, é:|Acesso fora dos limites|Acesso ao último elemento|Sempre acesso ao primeiro|Uma forma de ordenar|Os índices válidos são 0, 1, 2 e 3; o comportamento do erro depende da linguagem.
No pior caso, procurar um elemento ausente por busca linear em n elementos exige:|Examinar n elementos|Examinar sempre um elemento|Examinar zero elementos|Examinar n² elementos obrigatoriamente|Sem encontrar o alvo, é preciso percorrer toda a lista.
@189|logica|Equivalências e leis de De Morgan|Construa negações de proposições compostas. Negar uma conjunção troca e por ou; negar uma disjunção troca ou por e.
Como se expressa a negação da conjunção entre p e q?|Não p ou não q|Não p e não q|p ou q|p e não q|Para a conjunção falhar, pelo menos uma das proposições deve ser falsa.
A negação de “p ou q”, usando ou inclusivo, é:|Não p e não q|Não p ou não q|p e q|p ou não q|A disjunção só é falsa quando as duas proposições são falsas.
Negar “Lia leu e Caio escreveu” resulta em:|Lia não leu ou Caio não escreveu|Lia não leu e Caio não escreveu|Lia leu ou Caio escreveu|Lia leu e Caio não escreveu|Basta que pelo menos uma das duas ações não tenha ocorrido para negar a conjunção.
A dupla negação “não é verdade que não p” equivale a:|p|Não p|p e não p|Sempre falso|Na lógica clássica, negar duas vezes recupera o valor da proposição.
Qual expressão equivale a p → q na lógica clássica?|Não p ou q|p e q|p ou não q|Não p e q|A condicional só é falsa quando p é verdadeira e q é falsa, como não p ou q.
Uma condicional e sua contrapositiva têm:|O mesmo valor lógico em todas as valorações|Sempre valores opostos|O mesmo valor apenas se p for falsa|Nenhuma relação lógica|p → q equivale a não q → não p.
@190|logica|Quantificadores e contraexemplos|Diferencie todos, algum e nenhum. Uma afirmação universal é refutada por um caso pertinente; uma existencial precisa de ao menos um caso.
A negação de “Todos os livros são azuis” é:|Existe ao menos um livro que não é azul|Nenhum livro é azul|Todos os livros são vermelhos|Existe um livro azul|Um único livro não azul basta para tornar falsa a afirmação universal.
“Algum estudante trouxe régua” significa que:|Ao menos um estudante trouxe régua|Todos trouxeram régua|Nenhum trouxe régua|Exatamente dois trouxeram régua|O quantificador existencial não determina um número exato acima de um.
Como negar “Existe um número inteiro com a propriedade P”?|Nenhum inteiro tem P|Todo inteiro tem P|Existe inteiro sem P|Exatamente um inteiro tem P|Negar a existência significa afirmar que nenhum elemento do domínio satisfaz a propriedade.
Para refutar “Todo número primo é ímpar”, qual contraexemplo serve?|2|9|15|1|2 é primo e par; os outros exemplos não satisfazem a condição de serem primos.
Verificar cem casos favoráveis prova uma afirmação sobre todos os inteiros?|Não; o domínio contém outros casos|Sim; cem casos são sempre suficientes|Sim; só existem cem inteiros|Não; nenhum caso pode ser verificado|Uma prova universal precisa cobrir o domínio relevante, não apenas uma amostra.
“Todo aluno leu algum livro” exige que seja o mesmo livro para todos?|Não; o livro pode variar entre alunos|Sim; obrigatoriamente um único título|Sim; todos leram todos os livros|Não; significa que ninguém leu|A escolha existencial do livro pode depender de cada aluno.
@191|financeira|Preço unitário e planejamento de compras|Compare custos por unidade equivalente, quantidade necessária e custo total. Os exercícios são simulações de matemática do cotidiano.
Um pacote de 4 cadernos custa 28 reais. O preço por caderno é:|7 reais|24 reais|32 reais|14 reais|Divida o preço total pela quantidade: 28/4 = 7.
Para comparar dois pacotes com quantidades diferentes, é útil calcular:|Preço por unidade equivalente|Apenas o tamanho da embalagem|Somente a cor da etiqueta|O número de letras da marca|Uma unidade comum permite comparar preços de quantidades equivalentes.
Um pacote de 500 g custa 8 reais. Seu preço por quilograma é:|16 reais|4 reais|8 reais|40 reais|Um quilograma corresponde a dois pacotes de 500 g: 2 × 8 = 16.
Um item custa 40 reais com frete de 12; outro custa 48 com frete grátis. Qual tem menor custo total?|O segundo, por 4 reais a menos|O primeiro, por 8 reais a menos|Ambos custam 40 reais|O primeiro, por 4 reais a menos|Os totais são 52 e 48 reais; a diferença é 4.
Comprar mais unidades por preço unitário menor sempre reduz o gasto total?|Não; quantidade e aproveitamento também importam|Sim; mais unidades nunca aumentam o total|Sim; preço total e unitário são idênticos|Não; comparar unidades é impossível|O gasto total pode ser maior e parte do produto pode não ser necessária.
Duas opções equivalentes custam 96 reais por 12 unidades e 70 por 10. Qual é mais barata por unidade?|A de 10 unidades|A de 12 unidades|Têm preço unitário igual|Não é possível dividir os valores|Os preços unitários são 8 e 7 reais, respectivamente.
@192|financeira|Metas, reservas e despesas previstas|Separe objetivos, valores e prazos em um orçamento simples. Diferencie um gasto previsível de um imprevisto, usando exemplos sem produtos financeiros.
Guardar 30 reais por mês durante 5 meses, sem rendimentos, acumula:|150 reais|35 reais|100 reais|300 reais|Multiplique o valor mensal pelo número de meses: 30 × 5 = 150.
Uma despesa anual conhecida deve ser tratada como:|Gasto previsível que pode ser planejado|Um acontecimento impossível de prever|Receita automática|Desconto obrigatório|Conhecer a data permite reservar parte do valor ao longo dos meses.
Uma meta custa 240 reais. Dividi-la igualmente em 8 meses, sem rendimentos, exige guardar por mês:|30 reais|24 reais|32 reais|80 reais|Divida 240 por 8: 30 reais mensais.
Num orçamento fictício, entram 500 reais e saem 420. Qual é o saldo?|80 reais|920 reais|−80 reais|420 reais|O saldo é entradas menos saídas: 500 − 420 = 80.
Qual descrição torna uma meta mais concreta?|Separar 20 reais por mês por 6 meses para um material de 120 reais|Guardar algo quando der, sem objetivo|Comprar tudo sem conferir valores|Ignorar o prazo e o custo|Valor, ritmo e finalidade permitem acompanhar o avanço.
Se um gasto previsto aumenta e a receita não muda, o plano deve ser:|Recalculado para caber no valor disponível|Mantido por obrigação sem considerar o saldo|Considerado automaticamente quitado|Somado à receita como se fosse ganho|Rever valores, prazos ou outras despesas mantém a coerência do orçamento.
@193|gerais|Método científico e evidências|Hipóteses geram previsões examináveis. Controle de variáveis, repetição e crítica ajudam a avaliar explicações sem transformar ciência em certeza absoluta.
Uma hipótese científica útil deve permitir:|Confronto com evidências|Aceitação apenas por fama|Proibição de qualquer teste|Validade por repetição de slogan|Uma explicação precisa gerar consequências que possam ser investigadas.
Repetir um experimento ajuda a avaliar:|A consistência dos resultados|A beleza do relatório apenas|A idade do pesquisador|A quantidade de títulos na capa|Repetições permitem examinar variação e reprodutibilidade.
Ao testar a influência da luz no crescimento de plantas, manter a rega semelhante ajuda a:|Controlar outra variável|Provar antecipadamente a hipótese|Eliminar a necessidade de observação|Garantir que toda planta cresce igual|Controlar fatores reduz explicações alternativas para diferenças observadas.
Um resultado contraria a hipótese inicial. A atitude científica adequada é:|Examinar método e evidências e revisar a hipótese quando necessário|Ocultar o resultado|Alterar dados para concordarem|Declarar que nenhuma observação importa|Hipóteses devem responder a evidências, com avaliação de limitações do estudo.
Correlação entre duas medidas demonstra por si só causalidade?|Não; podem existir outros fatores ou relações|Sim; sempre que dois gráficos sobem|Sim; basta uma tabela grande|Não; correlação impede qualquer investigação|A associação observada não determina sozinha o mecanismo causal.
Uma única medida muito diferente das demais deve ser:|Investigada antes de decidir como tratá-la|Apagada automaticamente|Aceita como verdade única|Usada para alterar todas as outras|O valor pode refletir erro, variabilidade real ou uma condição relevante.
@194|gerais|Unidades, estimativas e ordens de grandeza|Confira unidades e plausibilidade. Estimativas ajudam a detectar erros, mas devem declarar arredondamentos e limites.
Quantos mililitros há em 1,5 litro?|1500|150|15|15000|Um litro equivale a mil mililitros; 1,5 × 1000 = 1500.
Duas horas e meia correspondem a:|150 minutos|120 minutos|250 minutos|90 minutos|Duas horas são 120 minutos e meia hora acrescenta 30.
Para estimar 198 × 51 rapidamente, qual aproximação é razoável?|200 × 50 = 10.000|20 × 5 = 100|2000 × 500 = 1.000.000|2 × 5 = 10|Arredondamentos próximos mantêm a escala do produto.
Uma régua tem marcas de milímetros. Relatar uma medida comum com dez casas decimais pode sugerir:|Precisão não sustentada pelo instrumento|Maior qualidade garantida|Mudança no tamanho real do objeto|Ausência de unidade|O número de algarismos deve ser compatível com a resolução e a incerteza da medição.
Ao converter 3 m² para cm², o resultado é:|30.000 cm²|300 cm²|30 cm²|3.000 cm²|Como 1 m = 100 cm, 1 m² = 10.000 cm².
Somar 5 metros com 3 segundos diretamente é:|Incompatível dimensionalmente|Igual a 8 metros|Igual a 8 segundos|Igual a 15 metros por segundo|Grandezas de dimensões diferentes não se somam como quantidades homogêneas.
@195|estatistica|Quartis, amplitude e dispersão|Medidas de posição e dispersão descrevem aspectos diferentes. Indique a convenção de quartis e compare dados além da média.
Qual é a amplitude dos dados 2, 5, 8 e 11?|9|11|6,5|26|Amplitude é máximo menos mínimo: 11 − 2 = 9.
Dois grupos podem ter a mesma média e dispersões diferentes?|Sim|Nunca|Só se todos os valores forem iguais|Só se não tiverem dados|A média resume o centro, sem determinar como os dados se distribuem.
O desvio padrão descreve principalmente:|Dispersão em torno da média|O maior valor sempre|A quantidade de categorias apenas|A ordem alfabética dos dados|Ele expressa a dispersão usando a mesma unidade dos dados.
Nos dados ordenados 1, 3, 5, 7, 9, 11, usando medianas das metades, Q1 é:|3|5|7|1|A metade inferior é 1, 3, 5; sua mediana é 3.
Se somamos 10 a cada valor de um conjunto, o desvio padrão:|Permanece igual|Aumenta em 10|Multiplica por 10|Vira zero|Transladar todos os dados preserva as distâncias em relação à nova média.
Nos dados 1, 3, 5, 7, 9, 11, usando medianas das metades, a amplitude interquartil é:|6|10|4|8|Q1 = 3 e Q3 = 9; a diferença é 6.
@196|estatistica|Probabilidade condicional e independência|Ao condicionar, restrinja o universo aos casos informados. Independência significa que conhecer um evento não altera a probabilidade do outro.
P(A dado B) considera como universo os casos em que:|B ocorreu|A não ocorreu sempre|Nenhum evento ocorreu|Todos os resultados são impossíveis|A condição B restringe os resultados considerados, quando P(B) > 0.
Uma caixa tem 3 bolas azuis e 2 verdes. Qual é a probabilidade de tirar azul ao acaso?|3/5|2/5|1/3|3/2|Há 3 resultados azuis entre 5 bolas igualmente prováveis.
Ao retirar duas bolas sem reposição, a segunda retirada pode depender da primeira porque:|A composição restante muda|A caixa sempre fica vazia na primeira|Toda probabilidade vira zero|As cores deixam de existir|Retirar uma bola altera as quantidades disponíveis para a próxima retirada.
Dois lançamentos de uma moeda ideal são independentes. Após sair cara no primeiro, a chance de cara no segundo é:|1/2|1|0|1/4|A independência mantém a probabilidade de cara em 1/2.
Se P(A ∩ B) = 0,12 e P(B) = 0,30, qual é P(A dado B)?|0,4|0,036|0,18|2,5|Use P(A dado B) = P(A ∩ B)/P(B) = 0,12/0,30.
Eventos mutuamente exclusivos com probabilidades positivas são independentes?|Não; a ocorrência de um impede o outro|Sim; exclusão é sinônimo de independência|Sim; basta ocorrerem em dias diferentes|Não; ambos precisam ser certos|A interseção tem probabilidade zero, enquanto o produto das probabilidades positivas não é zero.
@197|calculo1|Aproximação linear e diferenciais|Use a reta tangente L(x) = f(a) + f′(a)(x − a) para estimar valores próximos de a. Diferencie aproximação local de igualdade exata.
Qual expressão fornece a linearização de f em a?|f(a) + f′(a)(x − a)|f′(a) + f(a)x²|f(x) + a²|f(a)(x − a)²|A reta tangente passa por (a, f(a)) e tem inclinação f′(a).
Para f(x) = x², a inclinação da tangente em x = 5 é:|10|25|5|2|f′(x) = 2x, então f′(5) = 10.
Qual é a linearização de x² em a = 5?|25 + 10(x − 5)|25 + 5(x − 5)|10 + 25(x − 5)|x² + 5|Use f(5) = 25 e f′(5) = 10 na fórmula da tangente.
Se f′(a) = 6 e dx = 0,02, qual é dy = f′(a)dx?|0,12|6,02|0,0033|12|O diferencial é o produto 6 × 0,02 = 0,12.
A linearização de x² em 5 estima f(5,1) por:|26|26,01|25,1|27|L(5,1) = 25 + 10 × 0,1 = 26; 26,01 é o valor exato, não a aproximação pedida.
Para uma função convexa diferenciável perto de a, a reta tangente tende a estimar valores próximos:|Por baixo do gráfico|Sempre por cima|Com erro sempre nulo|Sem depender da função|Na região convexa, o gráfico fica acima de suas tangentes; a aproximação tende a subestimar.
@198|calculo1|Teoremas de Rolle e do Valor Médio|Verifique continuidade no intervalo fechado e derivabilidade no aberto. Rolle exige ainda valores iguais nas extremidades.
Qual hipótese extra distingue Rolle do Teorema do Valor Médio?|f(a) = f(b)|f(a) > f(b) sempre|f′(x) = 1 em todo ponto|a = b obrigatoriamente|Rolle usa extremidades com o mesmo valor para garantir alguma derivada nula no interior.
O Teorema do Valor Médio garante um c interior com:|f′(c) = (f(b) − f(a))/(b − a)|f′(c) = f(a) + f(b)|f(c) = 0 sempre|f′(c) = b − a sempre|A derivada em algum ponto iguala a taxa média no intervalo, sob as hipóteses do teorema.
Para f(x) = x² em [1, 5], a taxa média é:|6|4|12|25|Calcule (25 − 1)/(5 − 1) = 24/4 = 6.
Para x² em [1, 5], qual c satisfaz o Teorema do Valor Médio?|3|1|5|6|Resolva 2c = 6: c = 3, que pertence ao intervalo aberto.
Por que Rolle não se aplica diretamente a f(x) = valor absoluto de x em [−1, 1]?|A função não é derivável em 0|Ela não é contínua em 0|As extremidades têm valores diferentes|O intervalo não é fechado|A função é contínua e tem extremidades iguais, mas falha a derivabilidade no ponto angular.
Se f é contínua em [a,b] e derivável no interior, com f′ sempre zero no interior, então:|f é constante no intervalo|f cresce estritamente|f diminui estritamente|f é obrigatoriamente x²|Aplicando o Valor Médio a subintervalos, toda diferença de valores é zero.
@199|calculo2|Equações diferenciais separáveis|Separe variáveis quando possível, integre e aplique a condição inicial. Antes de dividir por uma expressão, confira soluções constantes que poderiam ser perdidas.
Uma equação diferencial relaciona uma função com:|Uma ou mais de suas derivadas|Apenas seu nome|Somente a cor de seu gráfico|Nenhuma variável|A incógnita é uma função e a relação envolve suas taxas de variação.
A solução geral de y′ = 4 é:|y = 4x + C|y = 4x² + C|y = x/4 + C|y = C apenas|Uma primitiva da constante 4 é 4x; acrescenta-se a constante de integração.
Resolva y′ = 2x com y(0) = 3.|y = x² + 3|y = 2x + 3|y = x²|y = 3x²|Integrar dá y = x² + C; em x = 0, C = 3.
Qual separação corresponde a y′ = xy quando y ≠ 0?|dy/y = x dx|y dy = dx/x|dy = y dx/x|dy/x = dx/y|Divida por y e multiplique por dx, restringindo aos trechos em que y não é zero.
Ao dividir y′ = xy por y, qual solução deve ser verificada separadamente?|y = 0|y = x|y = x + 1|y = 1 sempre|A divisão exclui y = 0, embora ela satisfaça a equação original.
Qual solução satisfaz y′ = 3y e y(0) = 2?|y = 2e^(3x)|y = 3e^(2x)|y = 2 + 3x|y = e^(3x)|A família é Ce^(3x); a condição inicial determina C = 2.
@200|calculo2|Coordenadas polares e curvas|Use x = r cos θ e y = r sen θ. Ângulos são em radianos; um mesmo ponto admite mais de uma representação polar.
A conversão de polares para cartesianas usa:|x = r cos θ, y = r sen θ|x = r sen θ, y = r cos θ sempre|x = r + θ, y = r − θ|x = rθ, y = r/θ|As projeções de um raio de módulo r fornecem as coordenadas cartesianas.
O ponto polar (3, 0) corresponde a:|(3, 0) cartesiano|(0, 3) cartesiano|(−3, 0) cartesiano|(3, 3) cartesiano|cos 0 = 1 e sen 0 = 0, portanto x = 3 e y = 0.
O ponto polar (2, π/2) corresponde a:|(0, 2) cartesiano|(2, 0) cartesiano|(0, −2) cartesiano|(2, 2) cartesiano|cos(π/2) = 0 e sen(π/2) = 1.
A curva polar r = 5 representa:|Uma circunferência de centro na origem e raio 5|Uma reta horizontal y = 5|Uma parábola|Um único ponto sempre|Todos os pontos estão à distância 5 da origem.
Qual representação polar equivale a (r, θ)?|(−r, θ + π)|(−r, θ) sempre|(r, θ + π) sempre|(r + 1, θ)|Trocar o sinal do raio e girar meio círculo preserva a posição cartesiana.
A área de uma região varrida por r(θ) entre α e β, sem contar sobreposições, usa:|½ ∫ de α a β de r(θ)² dθ|∫ de α a β de r(θ) dθ sempre|2πr para qualquer curva|∫ de α a β de θ² dr|O elemento de área polar é metade do quadrado do raio vezes a variação angular.
`;
let topic="",rowIndex=0;
for(const line of content.trim().split("\n")){
 if(line.startsWith("@")){const [id,subject,name,summary]=line.slice(1).split("|");topic=`topic-${id}`;notebookTopics.push({id:topic,subject:subject as SubjectId,name,summary});rowIndex=0;}
 else if(line.trim())addQuestion(topic,line.split("|"),(["Fácil","Fácil","Médio","Médio","Difícil","Difícil"] as const)[rowIndex++]);
}
// Additional original calculation practice: stable parameters, worked answers and
// plausible arithmetic distractors. These variants supplement conceptual tasks.
function numeric(topic:string,prompt:string,value:number,explanation:string,unit="",level:Question["level"]="Médio"){
 const format=(n:number)=>`${Number(n.toFixed(6)).toLocaleString("pt-BR",{maximumFractionDigits:6})}${unit}`;
 addQuestion(topic,[prompt,format(value),format(value+1),format(value+3),format(value+7),explanation],level);
}
for(let k=1;k<=16;k++){
 const a=k+3,b=k+5;
 numeric("topic-161",`Um painel retangular mede ${a} cm por ${b} cm. Calcule sua área.`,a*b,`Área = base × altura = ${a} × ${b} = ${a*b} cm².`," cm²","Fácil");
 numeric("topic-162",`Resolva o sistema x + y = ${2*k+7} e x − y = 3. Qual é x?`,k+5,`Somando as equações: 2x = ${2*k+10}. Dividindo por 2, x = ${k+5}.`,"","Médio");
 numeric("topic-173",`Uma força de ${a} N atua no sentido de um deslocamento de ${b} m. Qual trabalho realiza?`,a*b,`W = Fd cos 0 = ${a} × ${b} = ${a*b} J.`," J","Fácil");
 numeric("topic-173",`Um motor transfere ${a*b} J em ${a} s. Qual é sua potência média?`,b,`P = energia/tempo = ${a*b}/${a} = ${b} W.`," W","Médio");
 numeric("topic-175",`Dissolvem-se ${a*b} g de soluto até obter ${a} L de solução. Qual é a concentração comum?`,b,`C = massa/volume = ${a*b}/${a} = ${b} g/L.`," g/L","Fácil");
 numeric("topic-175",`Uma solução de ${2*k} g/L é diluída de 100 mL para 200 mL, sem perda de soluto. Qual a concentração final?`,k,`C₂ = C₁V₁/V₂ = ${2*k} × 100/200 = ${k} g/L.`," g/L","Médio");
 numeric("topic-195",`Calcule a amplitude do conjunto ${k}, ${k+4}, ${k+9}, ${3*k+12}.`,2*k+12,`Amplitude = maior − menor = ${3*k+12} − ${k} = ${2*k+12}.`,"","Fácil");
 numeric("topic-195",`Nos dados ordenados ${k}, ${k+2}, ${k+6}, ${k+10}, ${k+14}, ${k+20}, qual é Q3 usando medianas das metades?`,k+14,`A metade superior é ${k+10}, ${k+14}, ${k+20}; sua mediana é ${k+14}.`,"","Médio");
 numeric("topic-191",`Um conjunto de ${a} pastas custa ${a*b} reais. Qual é o preço por pasta?`,b,`Divida o custo pela quantidade: ${a*b}/${a} = ${b} reais.`," reais","Fácil");
 numeric("topic-192",`Uma meta de ${a*12} reais será dividida em 12 depósitos mensais iguais, sem rendimentos. Qual o depósito?`,a,`Valor por mês = ${a*12}/12 = ${a} reais.`," reais","Médio");
 numeric("topic-197",`Para f(x) = x², estime f(${a},1) pela linearização em a = ${a}.`,a*a+0.2*a,`f(a) = ${a*a}; f′(a) = ${2*a}; Δx = 0,1. A aproximação é ${a*a} + ${2*a} × 0,1 = ${(a*a+0.2*a).toLocaleString("pt-BR")}.`,"","Médio");
 numeric("topic-198",`Para f(x) = x² em [${k}, ${k+4}], qual c é garantido pelo Teorema do Valor Médio?`,k+2,`A taxa média é ((${k+4})² − ${k}²)/4 = ${2*k+4}. Como f′(c) = 2c, c = ${k+2}, interior ao intervalo.`,"","Difícil");
 numeric("topic-199",`Se y′ = ${2*a}x e y(0) = ${b}, quanto vale y(1)?`,a+b,`Integre: y = ${a}x² + C. A condição inicial dá C = ${b}; então y(1) = ${a+b}.`,"","Médio");
 numeric("topic-200",`Qual é a área, em unidades quadradas, do setor de raio ${2*a} com ângulo 1/2 radiano?`,a*a,`A = r²θ/2 = ${4*a*a} × (1/2)/2 = ${a*a}.`,"","Difícil");
 numeric("topic-187",`A função calcular(x) retorna 3 × x + ${k}. Qual é calcular(${a})?`,3*a+k,`Substitua x: 3 × ${a} + ${k} = ${3*a+k}.`,"","Fácil");
 numeric("topic-188",`Uma lista contém ${k+10} elementos e começa no índice zero. Qual o índice do último elemento?`,k+9,`Último índice = quantidade − 1 = ${k+10} − 1 = ${k+9}.`,"","Médio");
}
