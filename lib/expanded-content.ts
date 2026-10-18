import type { Question, SubjectId } from './study-data';
type Row = [string, string, string, string, string, string];
export const expandedTopics: {id:string;subject:SubjectId;name:string;summary:string}[]=[];
export const expandedQuestions: Question[]=[];
function add(subject:SubjectId,name:string,summary:string,rows:Row[]) {
 const n=54+expandedTopics.length; const topic=`topic-${n}`;
 expandedTopics.push({id:topic,subject,name,summary});
 rows.forEach(([prompt,correct,...rest],i)=>{const explanation=rest.pop()!;const options=[correct,...rest];const offset=(n+i)%4;for(let j=0;j<offset;j++)options.push(options.shift()!);expandedQuestions.push({id:`expanded-${n}-${i}`,topic,subject,prompt,options,answer:options.indexOf(correct),explanation,level:(['Fácil','Médio','Difícil','Médio'] as const)[i%4],xp:0});});
}
add('portugues','Classes de palavras','Substantivos nomeiam, adjetivos caracterizam e advérbios modificam verbos, adjetivos ou outros advérbios.',[
['Em “A estudante dedicada chegou”, qual palavra é adjetivo?','Dedicada','Estudante','Chegou','A','“Dedicada” atribui uma característica à estudante.'],
['Em “Ela respondeu calmamente”, o advérbio indica:','Modo','Lugar','Tempo','Negação','“Calmamente” informa como a resposta foi dada.'],
['Em “O estudar exige disciplina”, a palavra “estudar” funciona como:','Substantivo','Preposição','Conjunção','Pronome pessoal','O artigo substantiva o infinitivo, que passa a nomear a ação.'],
['Qual frase tem um pronome demonstrativo?','Este livro é meu.','Alguém chegou.','Nós estudamos.','Quem telefonou?','“Este” situa o livro em relação às pessoas do discurso.']]);
add('portugues','Pontuação e sentido','A pontuação organiza a estrutura da frase e pode alterar seu sentido.',[
['Qual sinal normalmente encerra uma pergunta direta?','Interrogação','Vírgula','Dois-pontos','Ponto e vírgula','Perguntas diretas são geralmente encerradas por ?.'],
['Em “Marina, venha aqui”, a vírgula separa:','Um vocativo','Sujeito e verbo','Verbo e objeto','Uma palavra errada','Marina é a pessoa chamada; o vocativo é isolado por vírgula.'],
['Qual frase usa vírgulas para marcar uma informação explicativa?','Recife, capital de Pernambuco, recebe visitantes.','Recife recebe, visitantes.','A capital, recebe visitantes.','Recife recebe visitantes, diariamente sempre.','“Capital de Pernambuco” é um aposto explicativo.'],
['Em “Não, espere”, a vírgula ajuda a indicar:','Uma recusa seguida de um pedido para esperar','Uma ordem para não esperar','Uma pergunta indireta','Uma comparação','Sem a vírgula, “Não espere” expressaria uma ordem diferente.']]);
add('matematica','Frações e proporções','Frações representam partes e razões; proporções igualam duas razões.',[
['Qual fração equivale à metade?','1/2','1/3','2/3','3/4','Uma de duas partes iguais representa metade.'],
['Quanto é 1/3 + 1/6?','1/2','2/9','1/9','2/3','Use denominador 6: 2/6 + 1/6 = 3/6 = 1/2.'],
['Se 4 cadernos custam R$ 28, quanto custam 9 pelo mesmo preço unitário?','R$ 63','R$ 56','R$ 72','R$ 81','Cada caderno custa 28/4 = 7; nove custam 9 × 7 = 63.'],
['Qual é a forma simplificada de 18/24?','3/4','2/3','4/3','9/24','Dividindo numerador e denominador por 6, obtemos 3/4.']]);
add('matematica','Geometria plana','Perímetro mede o contorno; área mede a superfície de uma figura.',[
['Um quadrado de lado 5 cm tem perímetro de:','20 cm','10 cm','25 cm','15 cm','O perímetro é a soma dos quatro lados: 4 × 5.'],
['Um retângulo de 8 m por 3 m tem área de:','24 m²','11 m²','22 m²','48 m²','A área do retângulo é base × altura: 8 × 3.'],
['Um triângulo retângulo tem catetos 6 e 8. Sua hipotenusa mede:','10','14','7','48','Pelo teorema de Pitágoras: √(36 + 64) = 10.'],
['Um triângulo de base 10 cm e altura 4 cm tem área de:','20 cm²','40 cm²','14 cm²','28 cm²','A área é base × altura / 2: 10 × 4 / 2.']]);
add('redacao','Coesão e conectivos','Conectivos mostram relações como adição, oposição, causa e conclusão.',[
['Qual conectivo indica conclusão?','Portanto','Mas','Embora','Ou','“Portanto” introduz uma conclusão a partir do que foi apresentado.'],
['Em “Estudou bastante; contudo, ficou inseguro”, o conectivo expressa:','Oposição','Adição','Finalidade','Alternância','“Contudo” contrapõe a insegurança à expectativa criada pelo estudo.'],
['Qual continuação mantém uma relação coerente de causa?','A rua alagou porque choveu intensamente.','A rua alagou para que choveu.','A rua alagou embora por isso.','A rua alagou ou seja mas.','“Porque” liga o alagamento à causa apresentada.'],
['Em “Lia pegou o livro e o abriu”, o segundo “o” retoma:','O livro','Lia','A ação de pegar','Um lugar','O pronome evita repetir “livro” e mantém a ligação entre as orações.']]);
add('redacao','Parágrafos e revisão','Cada parágrafo desenvolve uma ideia central; revisar envolve sentido, organização e linguagem.',[
['Um parágrafo argumentativo deve desenvolver:','Uma ideia central conectada ao texto','Assuntos sem relação','Somente o título','Uma lista sem explicação','A unidade temática ajuda o leitor a acompanhar o argumento.'],
['Qual problema merece atenção na revisão?','Uma conclusão que contradiz a tese sem explicação','Um exemplo pertinente','Uma frase clara','Uma fonte identificada','Contradições não explicadas enfraquecem a coerência.'],
['Um parágrafo apresenta dado, mas não explica sua relação com a tese. Falta:','Análise do dado','Uma fonte inventada','Repetição do título','Mais adjetivos apenas','O autor precisa mostrar por que a evidência sustenta seu argumento.'],
['Qual ordem costuma ajudar na revisão?','Conferir ideias e organização, depois ajustes de linguagem','Trocar palavras sem ler o texto','Conferir só a letra inicial','Eliminar todos os conectivos','Revisar o sentido global antes dos detalhes evita corrigir frases que serão reescritas.']]);
add('literatura','Gêneros literários','Textos líricos, narrativos e dramáticos organizam a expressão literária de formas distintas.',[
['Um texto escrito para encenação se associa ao gênero:','Dramático','Receita culinária','Verbete técnico','Relatório contábil','O gênero dramático envolve ação representada, frequentemente por diálogos.'],
['O eu lírico de um poema é:','A voz que se expressa no poema','Sempre o autor real','Obrigatoriamente o leitor','Uma personagem histórica comprovada','A voz poética não deve ser confundida automaticamente com o autor.'],
['Um poema narrativo mostra que:','Características de gêneros podem se combinar','Todo poema é peça teatral','Versos impedem uma história','Não há narrador em versos','Um poema pode usar versos e, ao mesmo tempo, contar acontecimentos.'],
['Qual elemento é central em uma narrativa?','Acontecimentos organizados em um enredo','Uma lista de ingredientes','Uma fórmula obrigatória','Somente instruções','O enredo organiza acontecimentos, envolvendo personagens e situações.']]);
add('literatura','Tempo, espaço e enredo','Narrativas articulam acontecimentos, ambientes e diferentes formas de organizar o tempo.',[
['O espaço de uma narrativa indica:','Onde a história acontece','Apenas a quantidade de páginas','Somente a data de publicação','O preço do livro','O espaço pode ser físico, social ou imaginário.'],
['Um retorno a um acontecimento anterior é um:','Flashback','Vocativo','Aposto','Antônimo','O flashback interrompe a sequência presente para recuperar o passado.'],
['Uma cena em que minutos parecem horas para a personagem enfatiza:','Tempo psicológico','Tempo necessariamente cronológico','Ausência de tempo','Data de impressão','O tempo psicológico depende da percepção e da experiência da personagem.'],
['O conflito em uma narrativa é:','Uma tensão que impulsiona os acontecimentos','Sempre uma discussão física','A capa do livro','Uma descrição sem ação obrigatória','O conflito pode ser interno, entre personagens ou com outras circunstâncias.']]);
add('historia','Iluminismo','O Iluminismo valorizou a investigação racional e criticou formas de autoridade e organização social.',[
['Uma característica iluminista é a valorização:','Da razão e do debate crítico','Da proibição de perguntas','Da rejeição de toda investigação','Da obediência sem reflexão','Pensadores iluministas defenderam o uso da razão para examinar ideias e instituições.'],
['A separação dos poderes busca:','Limitar a concentração de poder','Concentrar tudo em uma pessoa','Eliminar todas as regras','Impedir qualquer fiscalização','A divisão de funções permite controles entre diferentes poderes.'],
['Por que o Iluminismo não deve ser tratado como uma opinião única?','Seus pensadores tinham diferenças e debates','Todos escreveram um único livro','Ninguém discutia política','Todos viveram no mesmo lugar','O movimento reuniu autores com posições distintas, apesar de afinidades.'],
['Uma crítica iluminista ao absolutismo questionava:','A concentração de autoridade no monarca','A existência de toda leitura','O uso de qualquer cálculo','A produção de livros em si','O poder absoluto foi alvo de críticas e de propostas de limitação.']]);
add('historia','Brasil colonial e economia','A colonização envolveu exploração econômica, trabalho compulsório e relações entre diferentes grupos.',[
['Uma atividade importante na economia colonial brasileira foi:','Produção de açúcar','Fabricação de computadores','Indústria de aviões','Produção de celulares','O açúcar teve grande importância econômica durante a colonização.'],
['A mineração ganhou destaque no Brasil colonial principalmente no século:','XVIII','X','XXI','V','A descoberta de ouro no final do XVII impulsionou a mineração no XVIII.'],
['A economia colonial pode ser explicada apenas pelo mercado externo?','Não; também havia atividades e trocas internas','Sim; não existia consumo local','Sim; todas as regiões eram idênticas','Não havia comércio algum','Além da exportação, existiam abastecimento, produção e circuitos internos.'],
['Ao estudar povos indígenas na colonização, é adequado reconhecer:','Diversidade de povos e diferentes formas de atuação','Um único povo com cultura idêntica','Ausência de qualquer organização','Uma história sem mudanças','Os povos indígenas eram diversos e atuaram de diferentes maneiras diante da colonização.']]);
add('geografia','Clima e tempo atmosférico','Tempo descreve condições momentâneas; clima envolve padrões observados por longos períodos.',[
['“Hoje está chovendo” descreve:','Tempo atmosférico','Clima de mil anos','Latitude','Relevo','A frase se refere a uma condição momentânea.'],
['O clima de uma região é caracterizado por:','Padrões atmosféricos de longo prazo','Uma única tarde de chuva','Só uma fotografia','Somente o horário local','O clima é analisado com séries de observações ao longo de muitos anos.'],
['Uma semana fria isolada permite concluir que o clima global não aquece?','Não; eventos locais não substituem tendências de longo prazo','Sim; uma semana resume todo o planeta','Sim; frio e calor não podem coexistir','Não existem medições climáticas','Tempo local e tendências climáticas abrangem escalas diferentes.'],
['A altitude pode influenciar a temperatura porque, em geral:','Temperaturas diminuem com a elevação na troposfera','Todo lugar alto é mais quente','A altitude elimina a atmosfera','Não existe variação vertical','A relação tem variações locais, mas a tendência geral na troposfera é de queda de temperatura.']]);
add('geografia','Urbanização e redes urbanas','Urbanização envolve crescimento da população urbana e transformações no espaço e nas relações entre cidades.',[
['Urbanização está relacionada ao aumento:','Da participação da população que vive em cidades','Do número de oceanos','Da duração do dia','Da distância entre planetas','O processo inclui mudanças demográficas e na organização espacial.'],
['O deslocamento frequente entre casa e trabalho em cidades diferentes é chamado de:','Movimento pendular','Deriva continental','Translação','Erosão marinha','O movimento pendular envolve idas e retornos regulares.'],
['Uma rede urbana se forma principalmente por:','Fluxos de pessoas, bens, serviços e informações','Cidades completamente isoladas','Somente limites naturais','Ausência de transporte','As conexões e funções das cidades organizam a rede urbana.'],
['A impermeabilização do solo pode favorecer:','Maior escoamento superficial da água','Absorção ilimitada de chuva','Fim das enchentes sempre','Aumento obrigatório de florestas','Asfalto e concreto reduzem a infiltração e podem ampliar o escoamento.']]);
add('biologia','Ecologia e cadeias alimentares','Cadeias alimentares representam transferências de matéria e energia entre seres vivos.',[
['Em uma cadeia alimentar, uma planta geralmente é:','Produtora','Consumidora terciária','Predadora de topo','Parasita obrigatória','Produtores formam matéria orgânica a partir de fontes inorgânicas.'],
['Fungos decompositores contribuem para:','Reciclagem de nutrientes','Criação de energia do nada','Eliminação de todos os minerais','Paralisação dos ciclos','A decomposição disponibiliza nutrientes presentes na matéria orgânica.'],
['Por que há menos energia disponível em níveis tróficos superiores?','Parte é dissipada como calor e usada no metabolismo','Toda energia se multiplica em cada nível','Consumidores não usam energia','A matéria deixa de existir','A transferência entre níveis não conserva toda a energia como biomassa disponível.'],
['Uma teia alimentar difere de uma cadeia por mostrar:','Várias relações alimentares interligadas','Apenas um organismo','Somente plantas','A ausência de consumidores','Teias representam conexões entre várias cadeias.']]);
add('biologia','Evolução e seleção natural','A seleção natural envolve diferenças hereditárias que influenciam a reprodução em determinado ambiente.',[
['A seleção natural atua sobre:','Variações existentes em populações','Uma vontade consciente de evoluir','Uma meta universal de perfeição','A ausência de diferenças','Indivíduos podem ter características diferentes que afetam sua reprodução.'],
['Uma característica vantajosa em um ambiente:','Pode não ser vantajosa em outro','É sempre superior em qualquer lugar','Nunca depende do contexto','Impede qualquer mudança','O efeito de uma característica depende das condições ambientais.'],
['Dizer que uma população evolui significa que:','Suas características hereditárias mudam ao longo das gerações','Cada indivíduo escolhe novos genes','Todo indivíduo fica maior','Toda espécie se torna humana','A evolução é analisada em populações ao longo das gerações.'],
['Mutações surgem necessariamente porque o organismo precisa delas?','Não; a necessidade não dirige a mutação específica','Sim; todo gene obedece à vontade','Sim; o ambiente planeja os genes','Mutações nunca ocorrem','A seleção pode favorecer certas variantes, mas não cria mutações por necessidade.']]);
add('fisica','Eletricidade básica','Corrente é fluxo de carga, tensão é diferença de potencial e resistência relaciona tensão e corrente.',[
['A unidade de corrente elétrica é:','Ampere','Volt','Ohm','Joule','A corrente elétrica é medida em amperes, símbolo A.'],
['Em um resistor ôhmico de 4 Ω com 12 V, a corrente é:','3 A','48 A','8 A','16 A','Pela lei de Ohm, I = V/R = 12/4 = 3.'],
['Dois resistores de 3 Ω e 6 Ω em série têm resistência equivalente:','9 Ω','2 Ω','18 Ω','3 Ω','Em série, as resistências se somam.'],
['Qual grandeza é medida em volts?','Diferença de potencial','Corrente','Resistência','Massa','O volt é a unidade de diferença de potencial elétrico.']]);
add('fisica','Trabalho e energia','Trabalho relaciona força e deslocamento; energia pode mudar de forma.',[
['Um corpo em movimento possui energia:','Cinética','Somente química','Sempre nula','Exclusivamente térmica','A energia cinética está associada ao movimento.'],
['Uma força de 10 N paralela a um deslocamento de 3 m realiza trabalho de:','30 J','13 J','7 J','3 J','Com força e deslocamento na mesma direção e sentido, W = Fd.'],
['Se a velocidade de um corpo dobra, sua energia cinética fica:','Quatro vezes maior','Duas vezes maior','Pela metade','Inalterada','Ec = mv²/2; dobrar v multiplica v² por 4.'],
['Ao levantar um objeto perto da superfície terrestre, aumenta sua energia:','Potencial gravitacional','Nuclear obrigatoriamente','Elétrica obrigatoriamente','Nula','A energia potencial gravitacional aumenta com a altura em relação a uma referência.']]);
add('quimica','Misturas e separação','Misturas podem apresentar uma ou mais fases; a separação explora propriedades dos componentes.',[
['Água e areia podem ser separadas principalmente por:','Filtração','Fusão nuclear','Eletrização','Magnetização da água','O filtro retém a areia enquanto a água pode atravessá-lo.'],
['Uma mistura homogênea apresenta:','Uma fase observável','Sempre uma substância pura','Obrigatoriamente dois sólidos','Sempre três fases','Mistura homogênea tem uma fase, mas pode conter várias substâncias.'],
['Para separar e recuperar água de uma solução de sal, usa-se:','Destilação simples','Peneiração','Imantação','Filtração comum apenas','A água evapora e depois condensa; o sal fica no recipiente inicial.'],
['Qual mistura tende a apresentar duas fases líquidas?','Água e óleo','Água e pequena quantidade de sal dissolvido','Água e etanol misturados','Ar sem partículas','Água e óleo são líquidos pouco miscíveis e formam fases separadas.']]);
add('quimica','Ligações químicas','Ligações envolvem interações entre átomos e seus elétrons.',[
['Uma ligação covalente envolve principalmente:','Compartilhamento de pares de elétrons','Desaparecimento de prótons','Criação de nêutrons','Fusão de núcleos','Átomos compartilham elétrons nas ligações covalentes.'],
['Na ligação iônica, a atração ocorre entre:','Íons de cargas opostas','Somente átomos sem carga','Dois núcleos fundidos','Íons sempre negativos','Cátions e ânions se atraem eletrostaticamente.'],
['Um sólido iônico tende a conduzir eletricidade quando fundido porque:','Seus íons podem se mover','Os prótons abandonam os núcleos','Não possui cargas','Todos os elétrons desaparecem','A mobilidade de íons permite o transporte de carga.'],
['A ligação metálica ajuda a explicar:','A condução elétrica dos metais','A ausência total de elétrons','A impossibilidade de deformação','A falta de qualquer interação','Elétrons deslocalizados podem transportar carga na estrutura metálica.']]);
add('filosofia','Conhecimento e justificação','A epistemologia examina o conhecimento, suas fontes e suas justificativas.',[
['A área que investiga o conhecimento é:','Epistemologia','Cartografia','Botânica','Morfologia','A epistemologia discute o que sabemos e como justificamos crenças.'],
['Uma crença apoiada em evidências:','Pode ser examinada e revista','Torna qualquer dúvida proibida','Dispensa toda explicação','É sempre infalível','Evidências permitem avaliar uma afirmação e revisá-la diante de novos dados.'],
['Qual situação distingue opinião de justificação?','Apresentar razões examináveis para uma afirmação','Apenas repetir “eu acho”','Aumentar o volume da voz','Recusar qualquer pergunta','Justificar envolve oferecer razões, não apenas declarar uma preferência.'],
['O empirismo enfatiza como fonte de conhecimento:','A experiência','Somente a herança genética','A autoridade sem exame','A adivinhação','O empirismo dá papel central à experiência sensível.']]);
add('filosofia','Argumentos e validade','Validade diz respeito à relação lógica entre premissas e conclusão.',[
['As afirmações que sustentam uma conclusão são chamadas de:','Premissas','Legendas','Sílabas','Parágrafos obrigatórios','Premissas são os pontos de partida de um argumento.'],
['Um argumento dedutivamente válido garante que:','Se as premissas forem verdadeiras, a conclusão também será','Toda premissa seja verdadeira de fato','A conclusão agrade a todos','O argumento seja longo','Validade é a preservação da verdade na passagem das premissas à conclusão.'],
['Um argumento válido pode ter premissas falsas?','Sim','Não, por definição','Somente se não tiver conclusão','Somente em poesia','Validade avalia a forma da inferência, não verifica sozinha os fatos das premissas.'],
['Um contraexemplo é útil para:','Testar uma afirmação geral','Substituir evidências por insultos','Garantir que toda tese é certa','Evitar a análise','Um caso incompatível pode refutar uma afirmação universal.']]);
add('sociologia','Instituições sociais','Instituições organizam práticas, papéis e expectativas na vida coletiva.',[
['Qual é um exemplo de instituição social?','Escola','Uma nuvem','Uma molécula','Uma montanha isolada','A escola organiza práticas de ensino, aprendizagem e convivência.'],
['Um papel social corresponde a:','Expectativas ligadas a uma posição social','Um objeto necessariamente de papel','Uma característica genética fixa','Uma escolha sem contexto','Posições como estudante e professor envolvem expectativas socialmente construídas.'],
['Uma pessoa pode desempenhar diferentes papéis sociais?','Sim, conforme as relações e os contextos','Não; só um durante a vida','Só se mudar de país','Papéis sociais não existem','Uma pessoa pode ser estudante, familiar e integrante de um grupo, entre outros papéis.'],
['Normas sociais podem mudar ao longo do tempo?','Sim, são construídas historicamente','Não, são leis naturais imutáveis','Só mudam por fenômenos astronômicos','Nunca variam entre grupos','Valores e normas são produzidos e transformados nas relações sociais.']]);
add('sociologia','Desigualdade e mobilidade social','A desigualdade envolve acesso desigual a recursos e oportunidades; mobilidade é mudança de posição social.',[
['Desigualdade social envolve diferenças no acesso a:','Recursos e oportunidades','Apenas preferências de cor','Somente estilos musicais','Exclusivamente alturas','Renda, educação e serviços são dimensões relevantes da desigualdade.'],
['Mobilidade social significa:','Mudança de posição na estrutura social','Qualquer viagem de ônibus','Rotação da Terra','Uma troca de endereço sempre','Mudança de endereço não implica necessariamente mudança de posição social.'],
['Comparar renda média sem observar sua distribuição pode:','Ocultar grandes diferenças internas','Mostrar automaticamente todas as desigualdades','Eliminar diferenças reais','Substituir qualquer pesquisa','A mesma média pode corresponder a distribuições muito diferentes.'],
['Analisar oportunidades de estudo exige considerar:','Condições sociais além das escolhas individuais','Somente força de vontade','Apenas a cor do caderno','Nenhum contexto','Acesso, tempo, recursos e condições de vida influenciam oportunidades.']]);
add('ingles','Pronomes e verbo to be','Pronomes pessoais se combinam com am, is e are no presente.',[
['Complete: “I ___ a student.”','am','is','are','be','Com I, a forma do presente é am.'],
['Qual frase está correta?','They are friends.','They is friends.','They am friends.','They be friends.','They combina com are no presente.'],
['Qual pergunta está correta?','Are you ready?','You is ready?','Am you ready?','Is they ready?','Em perguntas com to be, a forma verbal vem antes do sujeito.'],
['A negativa de “She is here” é:','She is not here.','She not is here.','She are not here.','She does not is here.','A negativa usa not depois de is.']]);
add('ingles','Leitura e contexto','O contexto ajuda a interpretar palavras, relações e informações em textos.',[
['Em “Tom is hungry, so he eats”, Tom come porque está:','Com fome','Com sono','Atrasado','Com frio','Hungry significa com fome; so liga a consequência.'],
['Em “It was raining, but we went out”, but expressa:','Contraste','Adição simples','Lugar','Posse','But contrapõe a chuva à decisão de sair.'],
['“Ana used to walk to school” sugere:','Um hábito passado que não é apresentado como atual','Uma decisão para amanhã','Uma ação acontecendo agora','Uma proibição','Used to é empregado para hábitos ou estados passados.'],
['Em “Please turn off the light”, o pedido é para:','Apagar a luz','Acender a luz','Comprar uma lâmpada','Abrir a janela','Turn off significa desligar ou apagar nesse contexto.']]);
add('espanhol','Artigos e plural','Artigos concordam com substantivos e muitas palavras formam plural com -s ou -es.',[
['Qual artigo acompanha “libro”?','El','La','Los','Las','Libro é masculino singular: el libro.'],
['O plural de “la casa” é:','Las casas','Los casa','La casas','El casas','No plural feminino, usamos las e acrescentamos s a casa.'],
['Qual forma plural está correta?','Las ciudades','Las ciudads','Los ciudad','La ciudades','Palavras terminadas em consoante frequentemente recebem -es: ciudad → ciudades.'],
['Complete: “___ estudiantes llegaron.”','Los','El','La','Una','Los concorda com estudantes no plural masculino ou grupo misto.']]);
add('espanhol','Perguntas e localização','Palavras interrogativas ajudam a perguntar por pessoas, lugares, tempo e motivos.',[
['“¿Dónde?” pergunta por:','Lugar','Pessoa','Quantidade','Motivo','Dónde corresponde a onde.'],
['“¿Cuándo empieza la clase?” pergunta:','Quando a aula começa','Onde fica a sala','Quem ensina','Quantos alunos há','Cuándo pergunta por tempo.'],
['Qual resposta combina com “¿Por qué estudias?”?','Porque quiero aprender.','En la biblioteca.','A las ocho.','Soy estudiante.','Por qué pergunta pelo motivo; porque introduz a explicação.'],
['“El libro está debajo de la mesa” indica que o livro está:','Debaixo da mesa','Sobre a mesa','Ao lado da mesa','Dentro da mochila','Debajo de expressa posição inferior a algo.']]);
add('informatica','Arquivos e pastas','Arquivos guardam dados; pastas organizam arquivos e outras pastas.',[
['Uma pasta serve principalmente para:','Organizar arquivos','Aumentar a energia elétrica','Substituir o monitor','Criar memória física','Pastas organizam o armazenamento de arquivos.'],
['Uma extensão como .pdf costuma indicar:','O formato do arquivo','A identidade garantida do autor','Que não pode conter riscos','A velocidade do computador','A extensão sugere o formato, mas não garante autenticidade ou segurança.'],
['Renomear foto.jpg para foto.pdf converte corretamente a imagem?','Não; mudar o nome não converte o formato','Sim, sempre','Sim, se a pasta for nova','Só aumenta a resolução','A conversão exige alterar a estrutura dos dados, não apenas a extensão.'],
['Copiar um arquivo para outra pasta geralmente:','Mantém o original e cria uma cópia','Apaga sempre o original','Muda automaticamente todo o conteúdo','Desliga o aparelho','Copiar e mover são operações distintas.']]);
add('informatica','Internet e navegação','Navegadores acessam páginas; mecanismos de busca ajudam a localizar conteúdo.',[
['Qual ferramenta abre páginas da web?','Navegador','Calculadora simples','Editor de áudio apenas','Desfragmentador','Navegadores interpretam e exibem conteúdo da web.'],
['Uma URL é:','Um endereço de recurso na web','Uma senha obrigatória','Um tipo de monitor','Uma unidade de memória','URLs identificam endereços de páginas e outros recursos.'],
['O cadeado HTTPS garante que todo conteúdo de um site é verdadeiro?','Não; protege a conexão, não a veracidade do conteúdo','Sim, toda informação é verificada','Sim, dispensa conferir o domínio','Garante lucro em qualquer oferta','HTTPS protege o transporte de dados, mas não certifica todas as afirmações de uma página.'],
['Uma guia do navegador permite:','Manter páginas abertas na mesma janela','Criar um disco físico','Duplicar a memória instalada','Desligar a rede','Guias organizam várias páginas dentro de uma janela.']]);
add('programacao','Listas e índices','Listas armazenam sequências; em muitas linguagens o primeiro índice é zero.',[
['Na lista [10, 20, 30], com índice inicial zero, o índice 0 contém:','10','20','30','0','O índice zero aponta para o primeiro elemento.'],
['Na lista [4, 7, 9, 2], qual valor está no índice 2?','9','7','2','4','Os índices são 0, 1, 2 e 3; o terceiro elemento é 9.'],
['Uma lista de 5 elementos, com índices iniciados em zero, tem último índice:','4','5','6','0','O último índice é comprimento − 1.'],
['Adicionar um elemento ao final de uma lista com 3 itens resulta em:','4 itens','2 itens','3 itens sempre','6 itens','A inserção de um item aumenta o comprimento em um.']]);
add('programacao','Funções e depuração','Funções agrupam operações; depurar é investigar e corrigir erros.',[
['Uma função pode ajudar a:','Reutilizar um conjunto de operações','Impedir todo uso de dados','Eliminar todos os erros automaticamente','Dispensar qualquer entrada','Funções organizam e permitem reutilizar lógica.'],
['Se dobro(x) retorna 2 × x, dobro(6) retorna:','12','8','6','36','A função multiplica a entrada por 2.'],
['Um programa executa sem travar, mas calcula a média errada. Isso pode ser:','Um erro lógico','Prova de que o resultado está certo','Ausência de código','Um erro apenas no teclado','Erros lógicos produzem resultados incorretos mesmo quando o programa executa.'],
['Para investigar um erro, um passo útil é:','Reproduzir o problema com uma entrada conhecida','Mudar tudo sem observar','Apagar os dados sem verificar','Ignorar o resultado esperado','Um caso reproduzível permite comparar o comportamento observado ao esperado.']]);
add('logica','Sequências numéricas','Sequências podem ser construídas por regras explícitas de adição, multiplicação ou alternância.',[
['Na sequência que soma 3 a cada termo: 2, 5, 8, o próximo é:','11','10','12','16','Aplicando a regra dada: 8 + 3 = 11.'],
['Na sequência que dobra cada termo: 3, 6, 12, o próximo é:','24','18','15','36','O próximo termo é 12 × 2 = 24.'],
['A sequência começa em 2 e alterna +3 e ×2. Depois de 2, 5, 10, 13 vem:','26','16','23','20','Após +3, aplica-se ×2: 13 × 2 = 26.'],
['Na sequência dos quadrados positivos 1, 4, 9, 16, o próximo é:','25','20','24','32','O próximo termo é 5² = 25.']]);
add('logica','Condicionais e implicações','Uma implicação relaciona antecedente e consequente; não equivale automaticamente à sua inversa.',[
['Em “Se estudo, então aprendo”, o antecedente é:','Estudo','Aprendo','Então','A frase inteira apenas','O antecedente é a condição introduzida por se.'],
['Se p implica q e p é verdadeira, conclui-se:','q é verdadeira','q é falsa','p é falsa','Nada sobre q','Essa forma válida é conhecida como modus ponens.'],
['Se p implica q e q é verdadeira, pode-se concluir p?','Não necessariamente','Sim, sempre','Somente se p for curta','A implicação deixa de existir','Outras condições também podem levar a q; afirmar o consequente não garante p.'],
['Se p implica q e q é falsa, conclui-se:','p é falsa','p é verdadeira','q é verdadeira','As duas são verdadeiras','A forma é modus tollens: a falsidade do consequente implica a do antecedente.']]);
add('financeira','Preço unitário e comparação','Comparar custos por unidade ajuda a analisar embalagens de tamanhos diferentes.',[
['Um pacote de 2 kg custa R$ 12. O preço por kg é:','R$ 6','R$ 12','R$ 24','R$ 10','Divida o preço pela quantidade: 12/2 = 6.'],
['Três cadernos custam R$ 21. Qual o preço unitário?','R$ 7','R$ 6','R$ 18','R$ 24','21 dividido por 3 é 7.'],
['500 g por R$ 8 ou 1 kg por R$ 14: qual tem menor preço por kg?','A embalagem de 1 kg','A embalagem de 500 g','As duas têm o mesmo preço por kg','Não é possível comparar','A menor custa R$ 16/kg; a maior custa R$ 14/kg.'],
['Para comparar corretamente duas embalagens, é preciso:','Usar a mesma unidade de medida','Olhar só o tamanho das letras','Comparar apenas as cores','Ignorar a quantidade','Preços por kg, litro ou unidade tornam a comparação equivalente.']]);
add('financeira','Metas e planejamento','Planejamento envolve definir objetivos, valores e prazos realistas.',[
['Uma meta bem definida inclui:','Objetivo e prazo','Somente uma vontade vaga','Uma promessa de ganho garantido','Apenas o nome de um produto','Definir o objetivo e o prazo ajuda a organizar etapas.'],
['Para juntar R$ 240 em 6 meses, sem juros, é preciso separar por mês:','R$ 40','R$ 60','R$ 24','R$ 144','240/6 = 40 por mês.'],
['Uma meta de R$ 600 já tem R$ 150 guardados. Em 9 meses, sem juros, faltam por mês:','R$ 50','R$ 75','R$ 100','R$ 150','Faltam 450; dividindo por 9, são 50 por mês.'],
['Se os recursos disponíveis mudam, o planejamento deve:','Ser revisto conforme a nova situação','Continuar idêntico obrigatoriamente','Ignorar as despesas','Depender de ganho garantido','Revisar valores, etapas e prazos torna o plano compatível com as condições reais.']]);
add('gerais','Método científico','Investigações científicas formulam perguntas, examinam evidências e revisam explicações.',[
['Uma hipótese científica deve poder ser:','Testada com evidências','Protegida de qualquer exame','Aceita apenas pela popularidade','Confundida com certeza absoluta','Hipóteses precisam permitir confronto com observações ou experimentos.'],
['Repetir um experimento ajuda a:','Avaliar a consistência dos resultados','Garantir qualquer conclusão desejada','Eliminar a necessidade de dados','Substituir o método por opinião','A repetição permite verificar se o resultado se mantém em condições comparáveis.'],
['Um grupo de controle é útil porque:','Permite comparar condições e avaliar uma intervenção','Impede qualquer medição','Garante resultado positivo','Dispensa registrar variáveis','A comparação ajuda a distinguir o efeito estudado de outras influências.'],
['Se novos dados contradizem uma hipótese, é adequado:','Reavaliar a hipótese e o método','Ocultar os dados','Proibir novas medições','Aceitar só opiniões favoráveis','A revisão diante de evidências faz parte da investigação científica.']]);
add('gerais','Medidas e conversões','Conversões permitem expressar a mesma grandeza em diferentes unidades.',[
['Quantos metros há em 1 km?','1.000','100','10','10.000','O prefixo quilo indica mil unidades.'],
['2,5 litros equivalem a:','2.500 mL','250 mL','25 mL','25.000 mL','Cada litro corresponde a 1.000 mililitros.'],
['Uma atividade dura 1 h e 35 min. Quantos minutos são?','95','135','85','75','Uma hora tem 60 minutos: 60 + 35 = 95.'],
['750 cm correspondem a:','7,5 m','75 m','0,75 m','750 m','Divida por 100 para converter centímetros em metros.']]);

// Fixed, reproducible practice variants with computed answers and explanations.
// IDs remain stable so previous answers and the repetition history keep working.
const topicByName=(name:string)=>expandedTopics.find(t=>t.name===name)!.id;
function numeric(id:string,subject:SubjectId,topic:string,prompt:string,value:number,explanation:string,i:number,unit='') {
 const values=[value,value+2,value+5,value+9];
 const label=(n:number)=>`${n.toLocaleString('pt-BR')}${unit}`;
 const options=values.map(label);const offset=i%4;for(let j=0;j<offset;j++)options.push(options.shift()!);
 expandedQuestions.push({id,subject,topic,prompt,options,answer:options.indexOf(label(value)),explanation,level:(['Fácil','Médio','Difícil'] as const)[i%3],xp:0});
}
for(let i=1;i<=18;i++) {
 const n=i+3, percentage=[10,20,25][i%3],total=100+20*i;
 numeric(`practice-percent-${i}`,'matematica','topic-3',`Uma biblioteca tem ${total} livros. ${percentage}% estão emprestados. Quantos livros estão emprestados?`,total*percentage/100,`${percentage}% = ${percentage}/100. Multiplique ${total} por essa fração: ${total*percentage/100} livros.`,i);
 const a=2+i%4,b=3+i,c=a*n+b;
 numeric(`practice-equation-${i}`,'matematica','topic-4',`Resolva a equação ${a}x + ${b} = ${c}. Qual é o valor de x?`,n,`Subtraia ${b}: ${a}x = ${c-b}. Divida por ${a}: x = ${n}.`,i);
 const denominator=3+i%4,numerator=denominator-1,amount=denominator*n;
 numeric(`practice-fraction-${i}`,'matematica',topicByName('Frações e proporções'),`De ${amount} atividades, uma turma concluiu ${numerator}/${denominator}. Quantas atividades foram concluídas?`,n*numerator,`Divida ${amount} por ${denominator} e multiplique por ${numerator}: ${n} × ${numerator} = ${n*numerator}.`,i);
 const height=2+i%5,width=2*n;
 numeric(`practice-area-${i}`,'matematica',topicByName('Geometria plana'),i%2?`Um jardim triangular tem base de ${width} m e altura de ${height} m. Qual sua área?`:`Um painel retangular mede ${width} m por ${height} m. Qual sua área?`,width*height/(i%2?2:1),i%2?`Área do triângulo = base × altura / 2 = ${width} × ${height} / 2 = ${width*height/2} m².`:`Área do retângulo = ${width} × ${height} = ${width*height} m².`,i,' m²');
 const speed=25+3*i,hours=2+i%3,distance=speed*hours;
 numeric(`practice-speed-${i}`,'fisica','topic-22',`Um ônibus percorre ${distance} km em ${hours} horas, incluindo paradas. Qual é a velocidade média da viagem?`,speed,`Use o percurso e o tempo totais: ${distance}/${hours} = ${speed} km/h.`,i,' km/h');
 const resistance=3+i,current=2+i%5,voltage=resistance*current;
 numeric(`practice-ohm-${i}`,'fisica',topicByName('Eletricidade básica'),`Num exercício teórico, um resistor ôhmico de ${resistance} Ω é percorrido por ${current} A. Qual a tensão?`,voltage,`Pela lei de Ohm, V = R × I = ${resistance} × ${current} = ${voltage} V.`,i,' V');
 const force=8+i,displacement=2+i%4;
 numeric(`practice-work-${i}`,'fisica',topicByName('Trabalho e energia'),`Uma força constante de ${force} N atua no mesmo sentido de um deslocamento de ${displacement} m. Qual trabalho ela realiza?`,force*displacement,`Com força paralela ao deslocamento, W = F × d = ${force} × ${displacement} = ${force*displacement} J.`,i,' J');
 const start=i+2,increment=2+i%3,repetitions=3+i%4;
 numeric(`practice-loop-${i}`,'programacao','topic-44',`Um acumulador começa em ${start}. Um laço soma ${increment} em cada uma de ${repetitions} repetições. Qual o valor final?`,start+increment*repetitions,`O acréscimo total é ${increment} × ${repetitions} = ${increment*repetitions}. Somando ao valor inicial, obtemos ${start+increment*repetitions}.`,i);
 const packs=3+i%4,unitPrice=6+i,cost=packs*unitPrice;
 numeric(`practice-unitprice-${i}`,'financeira',topicByName('Preço unitário e comparação'),`Um conjunto com ${packs} canetas iguais custa R$ ${cost}. Qual é o custo de cada caneta?`,unitPrice,`Divida o preço total pela quantidade: ${cost}/${packs} = R$ ${unitPrice} por caneta.`,i,' reais');
 const hh=1+i%4,minutes=3*i;
 numeric(`practice-time-${i}`,'gerais',topicByName('Medidas e conversões'),`Uma oficina dura ${hh} h e ${minutes} min. Qual é a duração total em minutos?`,hh*60+minutes,`${hh} h correspondem a ${hh*60} min. Acrescente ${minutes}: ${hh*60+minutes} min.`,i,' min');
}
