import {conceptQuestions} from "./concept-review";
import { expansionBatch1Questions } from "./question-expansion-batch-1";
import { expansionBatch2Questions } from "./question-expansion-batch-2";
import { expansionBatch3Questions } from "./question-expansion-batch-3";
import { expansionBatch4Questions } from "./question-expansion-batch-4";
import { expansionBatch5Questions } from "./question-expansion-batch-5";
import { expansionBatch6Questions } from "./question-expansion-batch-6";
import { expansionBatch7Questions } from "./question-expansion-batch-7";
import { expansionBatch9Questions } from "./question-expansion-batch-9";
import { expansionBatch10Questions } from "./question-expansion-batch-10";
import { expansionBatch11Questions } from "./question-expansion-batch-11";
import { expansionBatch12Questions } from "./question-expansion-batch-12";
import { expansionBatch13Questions } from "./question-expansion-batch-13";
import { expansionBatch8Questions } from "./question-expansion-batch-8";
import {readingUpdateQuestions} from "./reading-update";
import {practiceQuestions} from "./practice-expansion";
import {coverageBatchQuestions} from "./coverage-batch";
import {portugueseDepthQuestions} from "./portuguese-depth";
import {readingBatch2Questions} from "./reading-batch2";
import {readingBatchQuestions} from "./reading-batch";
import {longCaseQuestions} from "./long-case-questions";
import {moreEngineeringQuestions} from "./engineering-more";
import {engineeringQuestions} from "./engineering-content";
import {coreQuestions} from "./core-reinforcement";
import {curriculumQuestions} from "./curriculum-expansion";
import { bookQuestions } from "./book-catalogue";
import { notebookQuestions } from "./content-notebook-expansion";
import { growthQuestions } from "./content-growth";
import { calculusQuestions } from "./calculus-content";
import { researchedQuestions } from "./researched-content";
import { expandedQuestions } from "./expanded-content";
import { baseQuestions, type Question } from "./study-data";
// Each pair expands one topic with the two remaining difficulty levels.
type Extra = [number, string, string[], number, string];
const extra: Extra[] = [
  [0,"Qual é o sujeito em “Chegaram cedo os estudantes”?",["Cedo","Os estudantes","Chegaram","Sujeito inexistente"],1,"Mesmo depois do verbo, “os estudantes” indica quem chegou."],
  [0,"Em “Há muitas dúvidas”, no sentido de existir, o sujeito é:",["Muitas dúvidas","Oculto","Inexistente","Há"],2,"O verbo haver com sentido de existir é impessoal: a oração não tem sujeito."],
  [1,"Qual expressão está escrita corretamente?",["De pé","A pé","À estudar","À ele"],1,"“A pé” não recebe crase porque “pé” é uma palavra masculina."],
  [1,"Qual frase apresenta uma crase corretamente marcada?",["Falei à uma amiga.","Começou à chover.","Referiu-se àquela situação.","Mandou à todos."],2,"A preposição exigida por “referir-se a” se combina com o a inicial de “aquela”."],
  [2,"Qual palavra pode introduzir uma ideia de concessão?",["Embora","Porque","Portanto","Para que"],0,"“Embora” apresenta uma circunstância que não impede a ação principal."],
  [2,"Em “Mesmo que chova, iremos”, qual relação aparece?",["Conclusão","Concessão","Comparação","Consequência"],1,"A possibilidade de chuva não impede o plano de ir: é uma relação concessiva."],
  [3,"Uma turma de 40 alunos tem 25% ausentes. Quantos estão ausentes?",["5","10","15","25"],1,"25% corresponde a um quarto; 40 dividido por 4 é 10."],
  [3,"18 corresponde a 15% de qual número?",["90","100","120","150"],2,"Se 0,15x = 18, então x = 18/0,15 = 120."],
  [4,"Se x + 4 = 9, quanto vale x?",["4","5","9","13"],1,"Subtraindo 4 dos dois lados, temos x = 5."],
  [4,"Qual a solução de 2(x − 3) = x + 5?",["2","5","8","11"],3,"Distribua o 2: 2x − 6 = x + 5. Subtraindo x e somando 6, x = 11."],
  [5,"R$ 100 com aumento de 10% passa a custar:",["R$ 90","R$ 100","R$ 110","R$ 120"],2,"10% de 100 é 10. O novo preço é 100 + 10 = 110."],
  [5,"Dois descontos sucessivos de 10% em R$ 100 deixam o preço em:",["R$ 80","R$ 81","R$ 90","R$ 99"],1,"Depois do primeiro desconto, são R$ 90. O segundo tira R$ 9: restam R$ 81."],
  [6,"Qual frase funciona como tese de um texto argumentativo?",["A biblioteca abre às 8h.","Ampliar o acesso às bibliotecas favorece a formação dos leitores.","A biblioteca tem duas portas.","Ontem fui à biblioteca."],1,"A frase apresenta uma posição que pode ser sustentada com argumentos."],
  [6,"Uma tese bem delimitada evita principalmente:",["Uma posição clara","Argumentos pertinentes","Defender uma ideia ampla demais sem foco","A relação com o tema"],2,"Delimitar a tese torna mais claro o que o texto pretende defender e o que precisa demonstrar."],
  [7,"O papel de um argumento é:",["Sustentar uma ideia","Substituir toda a tese","Somente repetir o título","Eliminar a conclusão"],0,"O argumento oferece razões para aceitar a ideia defendida."],
  [7,"Um texto cita que uma medida melhorou três escolas. O argumento fica mais sólido se:",["Concluir que funciona sempre","Explicar o contexto e os limites desses resultados","Omitir de onde vêm os dados","Trocar a evidência por um elogio"],1,"Explicar contexto e limites evita extrapolar os dados e mostra como eles sustentam a tese."],
  [8,"O que é uma evidência em uma argumentação?",["Um apoio verificável para uma afirmação","Qualquer opinião repetida","Um adjetivo forte","Uma promessa sem dados"],0,"Uma evidência fornece apoio que pode ser examinado, como dados ou exemplos documentados."],
  [8,"Uma pesquisa com os amigos de uma pessoa representa automaticamente toda uma cidade?",["Sim, sempre","Não, a amostra pode ser enviesada","Sim, se todos concordarem","Só depende do título"],1,"Um grupo de amigos pode compartilhar características e não representar a diversidade da cidade."],
  [9,"“Ele é rápido como o vento” usa principalmente:",["Comparação","Eufemismo","Ironia","Onomatopeia"],0,"A expressão usa “como” para aproximar explicitamente duas características."],
  [9,"Em “As paredes ouviam a conversa”, há:",["Metonímia obrigatória","Personificação","Sentido literal","Ausência de figura"],1,"Atribui-se às paredes uma ação humana: ouvir. Isso caracteriza personificação."],
  [10,"“Eu entrei na sala” indica narração em:",["Primeira pessoa","Segunda pessoa","Terceira pessoa","Nenhuma pessoa"],0,"O pronome “eu” marca a primeira pessoa."],
  [10,"Um narrador que conhece pensamentos de diferentes personagens pode ser:",["Obrigatoriamente personagem","Onisciente","Sempre leitor","Uma fala sem narrador"],1,"O narrador onisciente pode ter acesso aos pensamentos e sentimentos de várias personagens."],
  [11,"O relato de uma personagem pode conter enganos?",["Sim","Nunca","Somente fora da ficção","Somente se não houver enredo"],0,"Narradores podem interpretar mal ou desconhecer parte dos acontecimentos."],
  [11,"Um narrador contradiz seu relato anterior sem perceber. Isso pode levar o leitor a:",["Confiar automaticamente em tudo","Questionar a confiabilidade do relato","Ignorar todo o texto","Concluir que não há autor"],1,"Contradições podem ser pistas de que o narrador tem memória limitada ou distorce os fatos."],
  [12,"Uma mudança associada à Revolução Industrial foi:",["Ampliação da produção mecanizada","Fim de todas as cidades","Abandono de todas as máquinas","Desaparecimento do comércio"],0,"As máquinas e as fábricas ampliaram e transformaram a produção de mercadorias."],
  [12,"A expansão das fábricas contribuiu para a urbanização porque:",["Parte da população passou a buscar trabalho nas cidades","Todas as pessoas permaneceram no campo","As cidades proibiram trabalhadores","O trabalho urbano desapareceu"],0,"A concentração de empregos industriais atraiu trabalhadores para os centros urbanos."],
  [13,"Qual exemplo pode ser uma fonte histórica?",["Uma carta preservada","Somente um livro didático","Apenas um texto sem autor","Somente um monumento"],0,"Cartas, objetos, imagens e relatos, entre muitos outros registros, podem ser analisados como fontes."],
  [13,"Uma entrevista feita hoje sobre um acontecimento vivido décadas atrás deve:",["Ser descartada por ser oral","Ser usada sem análise","Considerar a memória e comparar outros registros","Ser tratada como prova de todos os detalhes"],2,"A história oral é valiosa, mas a memória tem limites; contexto e comparação ajudam na análise."],
  [14,"Ao ler uma carta antiga, qual pergunta ajuda a analisá-la?",["Quem a escreveu e para quem?","Quantos emojis tem?","Por que não usa aplicativo?","A letra é bonita?"],0,"Autoria e destinatário ajudam a entender o propósito e a perspectiva do documento."],
  [14,"Duas fontes descrevem o mesmo evento de modos diferentes. O melhor caminho é:",["Destruir uma delas","Comparar perspectivas e contextos","Escolher a mais curta","Ignorar ambas sempre"],1,"Diferenças podem revelar interesses, posições e experiências distintas sobre o mesmo evento."],
  [15,"O movimento da Terra ao redor do Sol é chamado de:",["Rotação","Translação","Erosão","Evaporação"],1,"Translação é o movimento orbital da Terra em torno do Sol."],
  [15,"Um ponto da Terra passa sucessivamente por áreas iluminadas e escuras principalmente porque:",["O Sol orbita a Terra diariamente","A Terra gira sobre seu eixo","A Lua bloqueia o Sol toda noite","A Terra para de se mover"],1,"A rotação muda a orientação de cada região em relação à luz solar."],
  [16,"Para que serve a escala de um mapa?",["Relacionar distâncias do mapa e do espaço real","Mostrar somente a temperatura","Definir a população","Substituir a legenda"],0,"A escala expressa a relação de redução usada na representação do espaço."],
  [16,"Em escala 1:50.000, uma distância real de 3 km mede no mapa:",["1,5 cm","3 cm","6 cm","60 cm"],2,"3 km equivalem a 300.000 cm. Dividindo por 50.000, resultam 6 cm."],
  [17,"As estações são iguais nos hemisférios Norte e Sul ao mesmo tempo?",["Sim, sempre","Não, são opostas","Só em janeiro","Não existem no Sul"],1,"A inclinação terrestre faz os hemisférios receberem a luz de modo diferente ao longo do ano."],
  [17,"No verão de um hemisfério, seus dias tendem a ser:",["Mais longos que no inverno","Sempre de 12 horas","Mais curtos que no inverno","Sem luz solar"],0,"O hemisfério inclinado em direção ao Sol recebe luz por mais tempo diariamente."],
  [18,"Qual estrutura delimita a célula?",["Membrana plasmática","DNA","Ribossomo","Cromossomo"],0,"A membrana plasmática separa o meio interno do externo e participa do controle de trocas."],
  [18,"Uma diferença entre células procarióticas e eucarióticas é que as procarióticas:",["Não possuem DNA","Não possuem membrana plasmática","Não têm núcleo delimitado por membrana","São sempre maiores"],2,"Procariontes possuem DNA, mas ele não fica dentro de um núcleo delimitado por membrana."],
  [19,"Qual fonte de energia é usada na fotossíntese?",["Luz","Som","Gravidade apenas","Energia de motores"],0,"A luz fornece energia para as reações fotossintéticas."],
  [19,"Por que não é correto dizer que plantas só respiram à noite?",["Elas nunca respiram","A respiração celular também ocorre de dia","A luz destrói as células","A fotossíntese é idêntica à respiração"],1,"A respiração celular ocorre de dia e à noite; a fotossíntese depende de luz."],
  [20,"Na notação mendeliana, Aa representa um indivíduo:",["Heterozigoto","Homozigoto dominante","Homozigoto recessivo","Sem alelos"],0,"Aa apresenta dois alelos diferentes para o gene: é heterozigoto."],
  [20,"No cruzamento Aa × aa, qual proporção esperada de aa?",["0%","25%","50%","100%"],2,"O primeiro genitor fornece A ou a; o segundo só a. Esperam-se metade Aa e metade aa."],
  [21,"Qual é a unidade de energia no Sistema Internacional?",["Newton","Joule","Segundo","Quilograma"],1,"O joule (J) é a unidade de energia e trabalho no SI."],
  [21,"Uma velocidade de 72 km/h equivale a:",["10 m/s","20 m/s","36 m/s","72 m/s"],1,"Para converter km/h em m/s, divida por 3,6: 72/3,6 = 20."],
  [22,"50 km percorridos em 1 hora correspondem a uma velocidade média de:",["25 km/h","50 km/h","100 km/h","150 km/h"],1,"A velocidade média é distância dividida pelo tempo: 50/1 = 50 km/h."],
  [22,"Uma viagem tem 60 km em 1 h e mais 60 km em 2 h. A velocidade média total é:",["30 km/h","40 km/h","45 km/h","60 km/h"],1,"A distância total é 120 km e o tempo total é 3 h: 120/3 = 40 km/h."],
  [23,"Sem força resultante, um corpo em movimento tende a:",["Manter sua velocidade vetorial","Acelerar sempre","Parar imediatamente","Mudar de direção sozinho"],0,"Pela inércia, a velocidade vetorial se mantém quando a força resultante é nula."],
  [23,"Aplicando a mesma força resultante ao dobro da massa, a aceleração fica:",["Dobrada","Pela metade","Igual","Quadruplicada"],1,"Como a = F/m, dobrar a massa com a mesma força reduz a aceleração à metade."],
  [24,"Qual símbolo representa o hidrogênio?",["H","He","Hg","Ho"],0,"H é hidrogênio. He é hélio; Hg é mercúrio; Ho é hólmio."],
  [24,"O que determina a identidade de um elemento químico?",["Seu estado físico","O número de prótons","A cor do recipiente","O número de ligações apenas"],1,"O número atômico, igual ao número de prótons, identifica o elemento químico."],
  [25,"A carga elétrica do elétron é:",["Positiva","Negativa","Nula","Sempre variável"],1,"Elétrons têm carga negativa; prótons, positiva; nêutrons não têm carga elétrica líquida."],
  [25,"Um átomo neutro com 11 prótons perde um elétron. Ele se torna:",["Um ânion −1","Um cátion +1","Neutro com 12 elétrons","Outro elemento"],1,"Agora há 11 prótons e 10 elétrons, gerando carga líquida +1. O número de prótons não mudou."],
  [26,"Ao balancear uma equação, buscamos igualar nos dois lados:",["O número de átomos de cada elemento","O volume dos recipientes","A cor das substâncias","O número de palavras"],0,"O balanceamento respeita a conservação dos átomos de cada elemento."],
  [26,"Na equação N₂ + 3H₂ → 2NH₃, quantos átomos de H há em cada lado?",["2","3","6","9"],2,"3H₂ contém 3 × 2 = 6 átomos de H; 2NH₃ contém 2 × 3 = 6."],
  [27,"Refletir sobre as consequências de uma escolha é uma questão:",["Que pode ser ética","Sempre gramatical","Somente geométrica","Sem relação com ações"],0,"As consequências das ações podem ser consideradas em uma avaliação ética."],
  [27,"Um dilema ético pode envolver:",["Conflito entre valores relevantes","Somente erro de conta","Ausência de qualquer escolha","Uma única regra sem contexto"],0,"Dilemas podem exigir ponderar valores e deveres que entram em tensão."],
  [28,"Qual atividade combina com o diálogo socrático?",["Fazer perguntas sobre uma ideia","Proibir qualquer dúvida","Repetir uma opinião sem avaliar","Encerrar toda conversa"],0,"O questionamento ajuda a examinar o que acreditamos e por quê."],
  [28,"Ao pedir a definição de justiça e testar exemplos contrários, o diálogo busca:",["Somente humilhar alguém","Examinar a consistência do conceito","Evitar conceitos","Substituir argumentos por autoridade"],1,"Testar exemplos e contraexemplos permite refinar uma definição e detectar contradições."],
  [29,"Um raciocínio com um erro que enfraquece seu argumento pode ser uma:",["Falácia","Unidade de medida","Fonte primária","Conjugação"],0,"Falácias são falhas de argumentação que podem tornar um raciocínio enganoso ou inválido."],
  [29,"“Sua proposta é ruim porque você é antipático” exemplifica:",["Ataque pessoal","Evidência pertinente","Definição científica","Conclusão necessária"],0,"A frase critica uma característica da pessoa, em vez de avaliar as razões da proposta."],
  [30,"Aprender regras de convivência na família é exemplo de:",["Socialização","Fotossíntese","Urbanização obrigatória","Isolamento completo"],0,"A família é um dos contextos em que aprendemos normas, valores e práticas sociais."],
  [30,"A socialização termina necessariamente na infância?",["Sim","Não, continua ao longo da vida","Só ocorre na escola","Só ocorre no trabalho"],1,"Novas relações e instituições continuam a influenciar aprendizagens e comportamentos na vida adulta."],
  [31,"Costumes e valores de um grupo fazem parte de sua:",["Cultura","Massa corporal","Latitude","Temperatura"],0,"A cultura inclui práticas, valores, conhecimentos e significados compartilhados e transformados socialmente."],
  [31,"Qual atitude ajuda a evitar uma análise etnocêntrica?",["Compreender práticas no contexto em que surgem","Definir uma cultura como naturalmente superior","Ignorar o significado local","Usar apenas o próprio costume como regra"],0,"Contextualizar práticas permite examinar seus significados sem tomar automaticamente a própria cultura como padrão superior."],
  [32,"Quando duas variáveis mudam de modo associado, falamos em:",["Correlação","Causalidade sempre comprovada","Ausência de relação","Certeza absoluta"],0,"Correlação é associação entre variáveis e, por si só, não demonstra causa e efeito."],
  [32,"Vendas de sorvete e uso de ventiladores sobem juntos. Qual fator pode explicar ambos?",["O calor","O sorvete ligar ventiladores","Um dado isolado provar tudo","A cor das embalagens"],0,"Uma terceira variável, a temperatura, pode influenciar as duas medidas."],
  [33,"“Window” corresponde a qual palavra em português?",["Porta","Janela","Livro","Caderno"],1,"“Window” significa janela."],
  [33,"Qual frase usa “borrow” com o sentido correto?",["Can I borrow your pen?","The sky borrows blue.","I borrow to school.","She is borrow."],0,"“Borrow” significa pegar emprestado. A frase pergunta se pode pegar a caneta emprestada."],
  [34,"Complete: “I ___ English.”",["studies","study","studying","to studies"],1,"Com “I”, usamos a forma “study” no presente simples afirmativo."],
  [34,"Qual pergunta está correta no presente simples?",["Does she studies?","Do she study?","Does she study?","She does studies?"],2,"Depois de “does”, o verbo principal fica na forma base: study."],
  [35,"“Yesterday” significa:",["Amanhã","Hoje","Ontem","Sempre"],2,"“Yesterday” indica o dia anterior: ontem."],
  [35,"Qual é o passado de “go” em “I ___ to school yesterday”?",["goed","went","goes","going"],1,"“Go” é irregular. Seu passado simples é “went”."],
  [36,"“Buenos días” é usado para dizer:",["Bom dia","Boa noite","Obrigado","Desculpe"],0,"“Buenos días” é uma saudação equivalente a bom dia."],
  [36,"Qual resposta é adequada a “¿Cómo estás?”?",["Estoy bien, gracias.","Me llamo libro.","Son las tres lápices.","Hasta ayer mañana."],0,"A pergunta significa “Como você está?”. “Estoy bien, gracias” responde “Estou bem, obrigado”."],
  [37,"Complete: “Yo ___ estudiante.”",["soy","eres","somos","son"],0,"Com “yo”, a forma do verbo ser é “soy”."],
  [37,"Qual sequência está correta?",["Yo eres; tú soy","Yo soy; tú eres; ellos son","Nosotros son; ellos somos","Tú es; ella eres"],1,"As formas do presente incluem yo soy, tú eres, él/ella es, nosotros somos e ellos son."],
  [38,"Um falso cognato é uma palavra que:",["Parece com outra de outro idioma, mas tem sentido diferente","Tem sempre o mesmo significado","Não existe no dicionário","Não pode ser traduzida"],0,"A semelhança de forma pode levar a uma tradução equivocada quando os significados diferem."],
  [38,"Em espanhol, “oficina” geralmente significa:",["Escritório","Padaria","Farmácia","Quarto"],0,"“Oficina” costuma significar escritório. Uma oficina mecânica pode ser chamada de “taller”."],
  [39,"Um SSD é usado principalmente para:",["Armazenar arquivos e programas","Exibir imagens","Digitar textos","Captar som"],0,"O SSD é um dispositivo de armazenamento que mantém dados quando o aparelho é desligado."],
  [39,"Por que RAM e armazenamento não são a mesma coisa?",["A RAM é temporária; o armazenamento mantém arquivos","Ambos só mostram imagens","A RAM sempre mantém tudo desligada","Armazenamento é um tipo de teclado"],0,"A RAM guarda dados em uso; dispositivos como SSDs mantêm arquivos mesmo sem energia."],
  [40,"Uma senha deve ser:",["Fácil de adivinhar","Compartilhada publicamente","Única para a conta e difícil de adivinhar","Sempre “123456”"],2,"Usar senhas únicas reduz o impacto do vazamento de uma senha em outras contas."],
  [40,"Você recebe um link suspeito pedindo seu código de acesso. A atitude adequada é:",["Enviar o código","Abrir o serviço pelo endereço oficial e verificar","Repassar aos amigos","Desativar a proteção"],1,"Verificar pelo canal oficial evita confiar em mensagens que podem tentar roubar credenciais."],
  [41,"Em uma planilha, fórmulas normalmente começam com:",["=","?","#","!"],0,"O sinal de igual indica que a célula contém uma fórmula."],
  [41,"Com A1 = 10, A2 = 20 e A3 = 30, =MÉDIA(A1:A3) retorna:",["10","20","30","60"],1,"A média aritmética é (10 + 20 + 30)/3 = 20."],
  [42,"Se pontos começa em 5 e recebe pontos + 2, seu novo valor é:",["2","5","7","52"],2,"Somando os valores numéricos, 5 + 2 = 7."],
  [42,"Depois de a = 3, b = a e a = 7, qual o valor numérico de b, em atribuição por valor?",["3","7","10","0"],0,"b recebeu o valor 3. A alteração posterior de a não altera esse valor já atribuído a b."],
  [43,"Uma condição pode resultar em:",["Verdadeiro ou falso","Somente texto longo","Somente números negativos","Sempre verdadeiro"],0,"As condicionais escolhem caminhos conforme o resultado lógico de uma expressão."],
  [43,"Se x = 4, qual caminho será escolhido por “se x > 5, A; senão, B”?",["A","B","Os dois obrigatoriamente","Nenhum"],1,"Como 4 > 5 é falso, a execução segue para o caminho B."],
  [44,"Um laço serve para:",["Repetir um conjunto de instruções","Desligar sempre o programa","Impedir toda repetição","Criar somente imagens"],0,"Laços permitem repetir instruções conforme uma condição ou uma sequência."],
  [44,"Um contador começa em 0 e é incrementado uma vez em cada uma de 4 repetições. Quanto termina?",["0","3","4","5"],2,"Os incrementos produzem 1, 2, 3 e 4."],
  [45,"Todos os quadrados são retângulos. É válido concluir que todos os retângulos são quadrados?",["Sim","Não","Somente se forem azuis","Sempre, por definição"],1,"A inclusão de um conjunto em outro não implica que eles sejam iguais."],
  [45,"Todo A é B, e nenhum B é C. O que se conclui?",["Todo A é C","Nenhum A é C","Todo C é A","Nada sobre A e C"],1,"Como A está contido em B e B não se cruza com C, A também não se cruza com C."],
  [46,"A negação de “Está chovendo” é:",["Está muito chovendo","Não está chovendo","Está frio","Sempre chove"],1,"Negar uma proposição afirma que seu conteúdo não é verdadeiro."],
  [46,"A negação de “Nenhum aluno faltou” é:",["Todos faltaram","Pelo menos um aluno faltou","Todos chegaram cedo","Nenhum estudou"],1,"A negação de uma afirmação universal negativa é uma afirmação existencial positiva."],
  [47,"Uma proposição p E q é verdadeira quando:",["As duas são verdadeiras","Apenas p é verdadeira","Pelo menos uma é falsa","As duas são falsas"],0,"O conectivo E exige que ambas as proposições sejam verdadeiras."],
  [47,"Se p é falsa e q é verdadeira, p OU q, no sentido inclusivo, é:",["Verdadeira","Falsa","Indeterminada","Igual a p E q"],0,"O OU inclusivo é verdadeiro se pelo menos uma das proposições for verdadeira."],
  [48,"Para montar um orçamento, o primeiro registro útil é:",["Receitas e despesas","Somente desejos","Só o saldo de outra pessoa","Apenas compras futuras"],0,"Comparar o que entra e o que sai ajuda a compreender o próprio orçamento."],
  [48,"Receita de R$ 900, despesa fixa de R$ 500 e variável de R$ 320 deixam:",["R$ 80","R$ 180","R$ 400","R$ 820"],0,"As despesas somam R$ 820. O saldo é 900 − 820 = R$ 80."],
  [49,"5% de desconto sobre R$ 100 correspondem a:",["R$ 5","R$ 10","R$ 50","R$ 95"],0,"5% de 100 são 5. Esse é o valor do desconto, não o preço final."],
  [49,"Um preço caiu de R$ 250 para R$ 200. Qual foi o desconto percentual?",["10%","20%","25%","50%"],1,"A redução foi de R$ 50. Dividindo 50 por 250, obtemos 0,20 = 20%."],
  [50,"Em juros compostos, os juros do período seguinte incidem sobre:",["O saldo acumulado","Somente o primeiro centavo","Sempre um valor zero","Apenas a taxa"],0,"Os juros são calculados sobre o montante que inclui os acréscimos dos períodos anteriores."],
  [50,"Em um exercício, R$ 200 crescem 5% em um período. Qual o montante?",["R$ 205","R$ 210","R$ 220","R$ 250"],1,"200 × 1,05 = 210. O acréscimo é de R$ 10."],
  [51,"Qual é o planeta mais próximo do Sol?",["Terra","Marte","Mercúrio","Saturno"],2,"Mercúrio tem a órbita mais próxima do Sol entre os oito planetas."],
  [51,"Por que a Lua é um satélite natural da Terra?",["Porque emite luz própria como o Sol","Porque orbita naturalmente a Terra","Porque é um planeta maior","Porque foi construída"],1,"A Lua é um corpo natural que orbita a Terra e reflete a luz solar."],
  [52,"Qual instrumento mede a temperatura?",["Termômetro","Barômetro","Bússola","Régua"],0,"O termômetro é usado para medir temperatura."],
  [52,"Para medir um intervalo curto de tempo em uma corrida, o instrumento apropriado é:",["Barômetro","Bússola","Cronômetro","Voltímetro"],2,"O cronômetro mede intervalos de tempo; os outros instrumentos medem outras grandezas."],
  [53,"Antes de compartilhar uma notícia, é melhor:",["Ler além do título e verificar a origem","Confiar no número de compartilhamentos","Ignorar a data","Repassar imediatamente"],0,"Ler o conteúdo e verificar origem e data ajuda a evitar conclusões fora de contexto."],
  [53,"Uma imagem verdadeira pode acompanhar uma informação enganosa quando:",["É usada com data ou contexto incorreto","É bem iluminada","Tem boa resolução","Foi tirada de dia"],0,"Mesmo sem montagem, uma imagem pode induzir ao erro se for atribuída a outro evento ou período."],
];
const seen: Record<number, number> = {};
const additions: Question[] = extra.map(([index, prompt, options, answer, explanation]) => {
  const base = baseQuestions[index];
  const levels = (["Fácil", "Médio", "Difícil"] as const).filter(l => l !== base.level);
  const variant = seen[index] ?? 0; seen[index] = variant + 1;
  return { ...base, id: `${base.id}-v${variant + 1}`, level: levels[variant], prompt, options, answer, explanation };
});
const rank = { Fácil: 0, Médio: 1, Difícil: 2 };
export const questions: Question[] = [...baseQuestions, ...additions, ...expandedQuestions, ...researchedQuestions, ...calculusQuestions, ...growthQuestions, ...notebookQuestions, ...bookQuestions, ...curriculumQuestions, ...coreQuestions, ...engineeringQuestions, ...moreEngineeringQuestions, ...longCaseQuestions, ...readingBatchQuestions, ...readingBatch2Questions, ...coverageBatchQuestions, ...portugueseDepthQuestions, ...practiceQuestions, ...readingUpdateQuestions, ...conceptQuestions, ...expansionBatch1Questions, ...expansionBatch2Questions, ...expansionBatch3Questions, ...expansionBatch4Questions, ...expansionBatch5Questions, ...expansionBatch6Questions, ...expansionBatch7Questions, ...expansionBatch8Questions, ...expansionBatch9Questions, ...expansionBatch10Questions, ...expansionBatch11Questions, ...expansionBatch12Questions].sort((a, b) => Number(a.topic.slice(6)) - Number(b.topic.slice(6)) || rank[a.level] - rank[b.level]);
export {defaultSettings, type Settings} from "./question-selection";
import {defaultSettings,eligibleQuestions as selectEligible,createQuestionList as selectQuestionList,type Settings} from "./question-selection";
export function eligibleQuestions(settings:Settings,bank:Question[]=questions,seenCounts?:Record<string,number>){return selectEligible(settings,bank,seenCounts);}
export function createQuestionList(settings: Settings, random: () => number = Math.random, seenCounts: Record<string, number> = {}, bank: Question[] = questions) {
  return selectQuestionList(settings, random, seenCounts, bank);
}
