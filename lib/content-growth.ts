import type { Question, SubjectId } from "./study-data";
// Original exercises. Stable rotation varies answer positions without changing IDs.
type Row = [string,string,string,string,string,string];
export const growthTopics: {id:string;subject:SubjectId;name:string;summary:string}[]=[];
export const growthQuestions: Question[]=[];
function add(subject:SubjectId,name:string,summary:string,rows:Row[]) {
 const topic=`topic-${117+growthTopics.length}`;growthTopics.push({id:topic,subject,name,summary});
 rows.forEach(([prompt,correct,a,b,c,explanation],i)=>{const options=[correct,a,b,c],rotation=growthQuestions.length%4;for(let j=0;j<rotation;j++)options.unshift(options.pop()!);growthQuestions.push({id:`growth-${topic}-${i}`,subject,topic,prompt,options,answer:rotation,explanation,level:(["Fácil","Médio","Médio","Difícil"] as const)[i],xp:10});});
}
add("portugues","Concordância verbal","Observe o núcleo do sujeito e os usos impessoais dos verbos.",[
["Complete: As crianças ___ cedo ontem.","chegaram","chegou","chegava","chegará","O sujeito está no plural; o verbo concorda com crianças."],
["Qual frase tem concordância adequada na norma-padrão?","Faz três semanas que chove.","Fazem três semanas que chove.","Fazem frio hoje.","Houveram muitos atrasos.","Fazer indicando tempo decorrido é impessoal e fica no singular."],
["Complete: A lista de exercícios ___ pronta.","está","estão","estiveram","ficaram","O núcleo é lista, no singular; exercícios integra o complemento."],
["Qual frase está correta na norma-padrão?","Existem alternativas para o problema.","Existe alternativas para o problema.","Houveram alternativas para o problema.","Haviam alternativas para o problema.","Existir concorda com alternativas. Haver no sentido de existir é impessoal."],
]);
add("portugues","Vozes verbais e agente da passiva","Identifique quem realiza a ação e quem a recebe. Na passiva, o agente pode aparecer ou ficar omitido.",[
["Em ‘O mural foi pintado pelos alunos’, qual é o agente da passiva?","Pelos alunos","O mural","Foi","Pintado","Pelos alunos identifica quem realizou a pintura."],
["Qual transformação mantém o sentido de ‘A equipe revisou o texto’?","O texto foi revisado pela equipe.","A equipe foi revisada pelo texto.","O texto revisará a equipe.","A equipe se revisou.","O objeto texto torna-se sujeito paciente; a equipe permanece agente."],
["Em ‘As cartas foram entregues’, o agente da ação está:","Não expresso","Expresso por cartas","Expresso por foram","Expresso por entregues","A frase informa a ação sofrida pelas cartas, mas não identifica quem entregou."],
["Qual oração está na voz reflexiva?","A menina se penteou.","O cabelo foi penteado.","O cabeleireiro penteou a cliente.","O pente caiu.","O sujeito realiza e recebe a ação, marcada pelo pronome se."],
]);
add("matematica","Equações do segundo grau","Use fatoração ou a fórmula quadrática. O discriminante ajuda a identificar a quantidade de raízes reais.",[
["Quais são as soluções de x² = 64?","−8 e 8","Somente 8","−32 e 32","0 e 64","Os quadrados de 8 e −8 são 64."],
["Resolva x² − 9x + 20 = 0.","4 e 5","−4 e −5","2 e 10","−2 e −10","A expressão fatora como (x − 4)(x − 5)."],
["Se o discriminante de uma equação quadrática real é negativo, ela tem:","Nenhuma raiz real","Duas raízes reais diferentes","Uma raiz real dupla","Infinitas raízes reais","A raiz quadrada de um discriminante negativo não é real."],
["Qual é a soma das raízes de 2x² − 14x + 9 = 0?","7","14","9/2","−7","Pelas relações de Viète, a soma é −b/a = 14/2 = 7."],
]);
add("matematica","Potências e logaritmos","Logaritmos respondem a uma pergunta sobre expoentes. Na base a, logₐ(b) = c significa aᶜ = b.",[
["Quanto vale 2⁵?","32","10","25","64","Multiplique cinco fatores iguais a 2: 32."],
["Quanto vale log₂(64)?","6","8","32","4","Como 2⁶ = 64, o logaritmo é 6."],
["Para a ≠ 0, a⁵/a² é igual a:","a³","a⁷","a^(5/2)","a¹⁰","Na divisão de potências de mesma base, subtraia os expoentes."],
["Qual é a solução real de log₃(x − 1) = 2?","10","7","8","9","Converta: x − 1 = 3² = 9. Logo x = 10, que satisfaz x > 1."],
]);
add("redacao","Planejamento do texto","Delimite o tema, formule a tese e organize a função de cada parágrafo antes de escrever.",[
["Qual ação ajuda a começar uma redação argumentativa?","Definir o recorte e a tese","Escrever sem ler a proposta","Copiar um texto pronto","Ignorar o destinatário","O planejamento orienta os argumentos e mantém o texto no tema."],
["O tema é mobilidade urbana. Qual recorte é mais delimitado?","Acessibilidade nas calçadas do bairro","Tudo sobre o planeta","Toda a história humana","Qualquer transporte em qualquer época","O recorte especifica um aspecto e um espaço de discussão."],
["Dois parágrafos repetem o mesmo argumento. Qual revisão ajuda?","Dar funções diferentes aos parágrafos","Repetir também a conclusão","Trocar somente a fonte da letra","Acrescentar palavras sem sentido","Cada parágrafo deve desenvolver uma contribuição para a tese."],
["Um exemplo interessante não se conecta à tese. O autor deve:","Justificar a conexão ou retirar o exemplo","Mantê-lo por ser longo","Transformá-lo no título sem revisão","Ignorar a relação entre ideias","A pertinência depende da função do exemplo no raciocínio."],
]);
add("redacao","Revisão e precisão da escrita","Revise primeiro ideias e organização, depois clareza e aspectos formais. Procure ambiguidades e afirmações sem sustentação.",[
["O que deve ser conferido na revisão do conteúdo?","Se o texto atende ao tema","Só a cor da página","Só o número de letras","Somente o tamanho do título","A adequação ao tema é central antes dos ajustes de apresentação."],
["‘Ana avisou Bia que sua inscrição venceu’ pode ser ambígua porque:","Sua pode remeter a Ana ou Bia","Não contém verbos","Não contém pessoas","Sempre indica a inscrição das duas","O possessivo admite mais de um referente; explicitar o nome resolve."],
["Qual substituição torna uma afirmação mais precisa?","Trocar ‘muitos’ por um dado verificado pertinente","Acrescentar ‘obviamente’ a tudo","Apagar todas as fontes","Trocar evidências por exclamações","Quantificar com dados pertinentes e verificados reduz a vagueza."],
["A conclusão apresenta uma ideia importante que não foi desenvolvida. A melhor revisão é:","Desenvolvê-la antes ou ajustar a conclusão","Manter a surpresa a qualquer custo","Apagar a introdução sempre","Repetir o título cinco vezes","A conclusão deve decorrer da discussão e não depender de argumento ausente."],
]);
add("literatura","Poesia: versos e efeitos de sentido","Verso é uma unidade de organização poética; estrofes agrupam versos. Ritmo, imagens e sons podem construir sentidos.",[
["Como se chama um conjunto de versos organizado num poema?","Estrofe","Capítulo obrigatório","Rubrica","Sumário","Estrofes agrupam versos na organização do poema."],
["Um poema precisa obrigatoriamente ter rimas?","Não","Sim, em todos os versos","Sim, somente no título","Só pode existir com soneto","Versos livres podem explorar ritmo e imagens sem rima regular."],
["Em ‘a chuva cochicha no telhado’, que recurso se destaca?","Personificação","Definição científica","Citação histórica","Sentido exclusivamente literal","Atribuir à chuva o ato de cochichar aproxima-a de uma ação humana."],
["O eu lírico deve ser identificado automaticamente com o autor?","Não, é a voz construída no poema","Sim, sempre","Sim, se usar eu","Somente se não houver rima","A voz poética pertence à construção do texto e pode diferir do autor."],
]);
add("literatura","Teatro e texto dramático","O texto dramático organiza ações para encenação, combinando falas, cenas e indicações de representação.",[
["Qual elemento apresenta instruções de cena num texto teatral?","Rubrica","Índice remissivo","Nota fiscal","Referência bancária","Rubricas indicam ações, gestos, ambiente ou modo de falar."],
["Qual diferença é comum entre texto dramático e romance?","No drama, diálogos e ações cênicas têm papel central","Teatro nunca tem personagens","Romance não admite diálogos","Drama exige sempre um narrador em primeira pessoa","A ação dramática costuma ser construída para encenação."],
["Uma personagem fala sozinha por um trecho prolongado. Isso pode ser um:","Monólogo","Glossário","Prefácio obrigatório","Anexo","No monólogo, uma personagem sustenta a fala sem alternância imediata."],
["Uma mesma fala pode mudar de sentido conforme a encenação porque:","Entonação e gestos também significam","As palavras nunca têm sentido","O palco elimina interpretações","Só o cenário importa","A interpretação combina texto verbal com recursos da atuação."],
]);
add("historia","Grécia antiga: pólis e cidadania","As cidades gregas tinham organizações próprias. A democracia ateniense antiga incluía apenas parte dos habitantes.",[
["A palavra pólis se refere a uma:","Cidade-Estado grega","Moeda romana","Dinastia chinesa","Embarcação medieval","Uma pólis era uma comunidade política com organização própria."],
["Na Atenas clássica, a cidadania política plena abrangia:","Uma parcela restrita da população","Todos os moradores sem exceção","Somente visitantes estrangeiros","Todas as pessoas escravizadas","Mulheres, estrangeiros residentes e pessoas escravizadas eram excluídos da participação política cidadã."],
["Por que não devemos tratar Atenas e Esparta como politicamente idênticas?","Tinham instituições e organizações diferentes","Estavam em continentes opostos","Nenhuma era uma pólis","Foram a mesma cidade","As pólis gregas não possuíam um único modelo político."],
["Comparar democracia ateniense e atual exige:","Considerar diferenças históricas de cidadania e participação","Supor que eram iguais","Ignorar exclusões antigas","Usar apenas o significado atual das palavras","Conceitos e instituições precisam ser analisados em seus contextos."],
]);
add("historia","Independência e formação do Brasil","A separação política de Portugal envolveu disputas e preservou várias estruturas sociais. Independência não significou transformação imediata de toda a sociedade.",[
["Em que ano ocorreu a declaração de independência do Brasil?","1822","1500","1889","1930","A declaração de independência ocorreu em 1822."],
["Qual regime político se estabeleceu no Brasil independente?","Monarquia","República presidencialista imediata","Democracia direta universal","Confederação de pólis","O Brasil tornou-se uma monarquia sob D. Pedro I."],
["A independência de 1822 aboliu a escravidão?","Não","Sim, imediatamente","Sim, em toda a América","Só existiu depois dela","A escravidão persistiu durante décadas após a independência."],
["Por que a independência é estudada como processo?","Envolveu conflitos e negociações em diferentes regiões","Tudo aconteceu num único minuto","Não houve participação regional","Não existem fontes históricas","A mudança política teve etapas e experiências regionais distintas."],
]);
add("geografia","Água: bacias e ciclo hidrológico","A água circula entre atmosfera, superfície e subsolo. Uma bacia hidrográfica reúne áreas drenadas para um sistema de cursos d’água.",[
["A passagem da água líquida para vapor é chamada de:","Evaporação","Condensação","Solidificação","Infiltração","Na evaporação, a água passa ao estado gasoso."],
["A água da chuva que entra no solo passa por:","Infiltração","Fusão","Sublimação obrigatória","Eclipse","Infiltração é a entrada da água nos poros do solo."],
["Uma bacia hidrográfica é delimitada principalmente por:","Divisores de água do relevo","Fusos horários","Linhas de telefone","Limites eleitorais sempre","As elevações separam o escoamento dirigido a sistemas diferentes."],
["A impermeabilização urbana tende a:","Aumentar o escoamento superficial","Eliminar toda a chuva","Aumentar sempre a infiltração","Impedir qualquer inundação","Asfalto e concreto reduzem a infiltração e favorecem o escoamento."],
]);
add("geografia","População e movimentos migratórios","Diferencie totais populacionais, densidade e crescimento. Migrações envolvem fatores econômicos, ambientais, familiares e políticos.",[
["Densidade demográfica relaciona população com:","Área ocupada","Número de feriados","Altitude apenas","Quantidade de oceanos","Calcula-se população dividida pela área."],
["Uma região tem 36 mil habitantes em 120 km². Qual a densidade?","300 hab./km²","30 hab./km²","3.000 hab./km²","120 hab./km²","Divida 36.000 por 120: 300 habitantes por km²."],
["Êxodo rural é o deslocamento predominante:","Do campo para a cidade","Da cidade para o campo","Entre planetas","Apenas entre países","O termo descreve a saída de população rural em direção às cidades."],
["O crescimento vegetativo é calculado por:","Nascimentos menos mortes","Imigrantes menos emigrantes","População dividida pela área","Nascimentos mais imigrantes apenas","O saldo natural considera nascimentos e mortes, sem o saldo migratório."],
]);
add("biologia","Divisão celular","Mitose e meiose têm papéis diferentes. Compare o número de cromossomos e a geração de variabilidade.",[
["A mitose normalmente mantém nas células-filhas:","O número de cromossomos da célula inicial","Sempre metade dos cromossomos","Sempre o dobro dos cromossomos","Nenhum cromossomo","A mitose conserva o número cromossômico, salvo alterações anormais."],
["A meiose está associada à:","Redução do número de cromossomos","Ausência de divisão celular","Produção de energia luminosa","Formação obrigatória de clones idênticos","A meiose reduz a ploidia e participa dos ciclos de reprodução sexuada."],
["Uma célula com 2n = 18 forma produtos meióticos normais com:","9 cromossomos","18 cromossomos","36 cromossomos","2 cromossomos","A redução de diploide para haploide resulta em n = 9."],
["O crossing-over contribui para:","Recombinação genética","Eliminar todos os genes","Impedir toda variabilidade","Duplicar sempre a espécie","A troca de segmentos entre cromossomos homólogos cria combinações de alelos."],
]);
add("biologia","DNA, RNA e síntese proteica","A informação genética pode ser transcrita em RNA e traduzida em proteínas. Diferencie genes, moléculas e etapas.",[
["Qual base é característica do RNA no lugar da timina?","Uracila","Ferro","Glicose","Celulose","O RNA utiliza uracila; o DNA utiliza timina."],
["Produzir RNA usando DNA como molde é:","Transcrição","Tradução","Digestão","Fotólise","A transcrição sintetiza RNA a partir de uma sequência de DNA."],
["Na tradução, ribossomos participam da produção de:","Proteínas","Somente DNA","Celulose diretamente","Água mineral","Ribossomos ligam aminoácidos seguindo a informação do RNA mensageiro."],
["Uma alteração no DNA muda obrigatoriamente o aminoácido codificado?","Não, diferentes códons podem codificar o mesmo aminoácido","Sim, qualquer troca sempre muda","Não existem alterações no DNA","Só depende da cor da célula","A redundância do código genético permite mutações sinônimas."],
]);
add("fisica","Ondas e som","Ondas transportam energia. Relacione frequência, período, comprimento de onda e velocidade.",[
["A unidade de frequência no SI é:","Hertz","Joule","Pascal","Volt","Um hertz corresponde a um ciclo por segundo."],
["Uma onda tem frequência de 5 Hz. Qual é o período?","0,2 s","5 s","10 s","25 s","T = 1/f = 1/5 segundo."],
["Se v = 24 m/s e f = 6 Hz, qual o comprimento de onda?","4 m","144 m","30 m","0,25 m","Use v = λf. Então λ = 24/6 = 4 m."],
["O som não se propaga no vácuo porque:","É uma onda mecânica e exige meio material","É sempre luz","Não transporta energia","Só existe em metais","Ondas sonoras dependem das interações entre partículas do meio."],
]);
add("fisica","Calor e temperatura","Temperatura e calor não são sinônimos. Calor é energia transferida em razão de uma diferença de temperatura.",[
["Calor é melhor definido como:","Energia transferida por diferença de temperatura","Quantidade de frio armazenada","Sinônimo de massa","Sinônimo de temperatura","Calor descreve transferência de energia, não uma substância guardada."],
["Dois corpos em equilíbrio térmico têm:","A mesma temperatura","A mesma massa obrigatoriamente","O mesmo volume obrigatoriamente","Sempre temperatura zero","No equilíbrio térmico, não há transferência líquida de calor entre eles."],
["Sem mudança de fase, Q = mcΔT. Dobrar m mantendo c e ΔT faz Q:","Dobrar","Cair à metade","Ficar igual","Quadruplicar","Na expressão, Q é diretamente proporcional à massa."],
["Durante a fusão de uma substância pura a pressão constante, o calor recebido pode:","Mudar o estado sem aumentar a temperatura","Sempre aumentar a temperatura","Reduzir obrigatoriamente a massa","Eliminar todas as moléculas","Na mudança de fase, a energia corresponde ao calor latente."],
]);
add("quimica","Mol e massa molar","O mol mede quantidade de matéria. A massa molar relaciona massa e número de mols pela expressão n = m/M.",[
["Qual grandeza é medida em mol?","Quantidade de matéria","Velocidade","Temperatura","Carga elétrica","O mol é a unidade de quantidade de matéria."],
["Uma amostra de 36 g tem massa molar de 18 g/mol. Quantos mols há?","2 mol","18 mol","36 mol","0,5 mol","n = m/M = 36/18 = 2 mol."],
["Qual é a massa de 3 mol de uma substância de massa molar 44 g/mol?","132 g","47 g","14,7 g","88 g","Multiplique n por M: 3·44 = 132 g."],
["Duas amostras contêm 1 mol cada, mas de substâncias diferentes. Elas têm necessariamente:","O mesmo número de entidades especificadas","A mesma massa","A mesma cor","O mesmo estado físico","Um mol corresponde ao mesmo número de entidades; as massas molares podem diferir."],
]);
add("quimica","Soluções e concentração","Concentração relaciona a quantidade de soluto com a solução. Na diluição sem perda de soluto, sua quantidade se conserva.",[
["Em água com açúcar dissolvido, o açúcar é o:","Soluto","Solvente","Recipiente","Catalisador obrigatório","O açúcar é a substância dissolvida na água."],
["20 g de soluto em 2 L de solução correspondem a:","10 g/L","40 g/L","2 g/L","20 g/L","Divida a massa do soluto pelo volume total: 20/2 = 10 g/L."],
["Ao adicionar solvente sem perder soluto, a concentração tende a:","Diminuir","Aumentar sempre","Ficar sempre igual","Virar massa molar","O mesmo soluto passa a ocupar um volume maior de solução."],
["100 mL de solução 2 mol/L são diluídos até 400 mL. Qual a concentração final?","0,5 mol/L","8 mol/L","2 mol/L","4 mol/L","Use C₁V₁ = C₂V₂: C₂ = 2·100/400 = 0,5 mol/L."],
]);
add("filosofia","Liberdade e responsabilidade","Examine escolhas considerando alternativas, restrições, razões e consequências. Diferentes tradições filosóficas interpretam a liberdade de maneiras distintas.",[
["Refletir sobre liberdade envolve perguntar:","Quais escolhas e restrições existem","Qual é apenas a cor do objeto","Quantos centímetros tem uma ideia","Qual opinião dispensa razões","A reflexão considera condições de escolha e limites da ação."],
["Ter alternativas disponíveis significa necessariamente agir sem nenhuma influência?","Não","Sim, sempre","Só se ninguém observar","Somente em grupo","Escolhas podem ser influenciadas por contexto, desejos e relações sociais."],
["Responsabilidade por uma decisão costuma envolver analisar:","O conhecimento e o controle que a pessoa tinha","Só a aparência da pessoa","Apenas sua popularidade","Somente o tamanho do grupo","Conhecimento das consequências e possibilidade de agir são aspectos relevantes."],
["Qual atitude torna uma discussão sobre liberdade mais rigorosa?","Definir o sentido de liberdade empregado","Mudar a definição a cada objeção","Proibir exemplos contrários","Tratar toda discordância como ofensa","Distinguir sentidos do conceito evita discutir questões diferentes como se fossem iguais."],
]);
add("filosofia","Filosofia da ciência","Investigue como hipóteses, evidências e críticas participam da construção do conhecimento científico.",[
["Uma hipótese científica deve permitir:","Confronto com evidências","Proteção contra toda crítica","Aceitação pela fama apenas","Ausência de observação","Hipóteses precisam poder ser avaliadas à luz de dados e argumentos."],
["Uma observação incompatível com uma hipótese exige:","Investigar métodos, dados e a própria hipótese","Ocultar o resultado","Declarar que a observação não existe","Proibir novas pesquisas","Resultados inesperados motivam análise e possíveis revisões."],
["Uma explicação que se ajusta a qualquer resultado sem poder ser contrariada tem dificuldade de:","Ser testada empiricamente","Ter muitas palavras","Ser repetida como opinião","Usar um título","Se nenhuma observação pode contrariá-la, falta um teste discriminante."],
["Mudanças em teorias científicas mostram necessariamente que ciência é inútil?","Não, revisão pode refletir melhores evidências","Sim, qualquer revisão elimina todo conhecimento","Sim, toda teoria é apenas preferência","Não existem mudanças científicas","Conhecimento pode ser corrigido e ampliado sem perder sua utilidade."],
]);
add("sociologia","Trabalho e divisão social","O trabalho se organiza de formas históricas diversas. A divisão de tarefas influencia relações, especialização e interdependência.",[
["Divisão social do trabalho se refere à:","Distribuição de atividades e funções na sociedade","Divisão de um número por outro","Separação obrigatória por idade","Ausência de cooperação","Pessoas e grupos realizam funções diferentes na organização social."],
["Maior especialização pode aumentar:","A interdependência entre atividades","A independência absoluta de todos","O fim das trocas","A inexistência de profissões","Atividades especializadas frequentemente dependem de produtos e serviços de outras."],
["O trabalho doméstico não remunerado:","Também contribui para a reprodução da vida social","Não envolve esforço nunca","Não tem efeito econômico ou social","Só existe em cidades grandes","Cuidados e tarefas domésticas sustentam a vida cotidiana mesmo sem salário."],
["Analisar uma mudança tecnológica no trabalho exige considerar:","Quem recebe benefícios e quem enfrenta custos","Apenas a novidade do equipamento","Somente sua cor","Que todos serão afetados igualmente","Os impactos podem variar entre ocupações, grupos e condições sociais."],
]);
add("sociologia","Pesquisa social e interpretação de dados","Compare entrevistas, observação e questionários. Escolha métodos conforme a pergunta e examine os limites das conclusões.",[
["Uma entrevista pode ajudar a conhecer:","Experiências e interpretações das pessoas","Somente fórmulas químicas","A opinião de toda a humanidade automaticamente","A verdade sem contexto","Entrevistas permitem explorar relatos e significados atribuídos às experiências."],
["Um questionário com pergunta tendenciosa pode:","Influenciar as respostas obtidas","Eliminar qualquer viés","Garantir representatividade","Substituir a análise","A formulação da pergunta pode sugerir ou favorecer uma resposta."],
["Observar uma associação entre dois fenômenos prova causalidade?","Não","Sim, sempre","Só se o gráfico for colorido","Só se os números forem grandes","Pode haver outros fatores e explicações para a associação."],
["Combinar entrevistas e dados quantitativos pode servir para:","Examinar aspectos complementares do problema","Dispensar toda interpretação","Garantir ausência de erro","Eliminar a necessidade de método","Métodos distintos podem iluminar dimensões diferentes de uma questão."],
]);
add("ingles","Simple present","Use o presente simples para hábitos e situações gerais. Na terceira pessoa do singular, observe a flexão do verbo e o auxiliar does.",[
["Complete: She ___ English every evening.","studies","study","studying","to study","Na terceira pessoa, study muda para studies."],
["Qual frase emprega corretamente a negativa do simple present?","He does not play chess.","He do not plays chess.","He does not plays chess.","He not play chess.","Após does not, o verbo principal permanece na forma-base."],
["Complete a pergunta: ___ they live here?","Do","Does","Is","Has","Para they no presente simples, use o auxiliar do."],
["Qual frase expressa um hábito?","We usually walk to school.","We walked yesterday.","We are walking right now.","We will walk tomorrow.","Usually e o presente simples indicam uma ação habitual."],
]);
add("ingles","Simple past","O passado simples situa ações em um tempo passado. Há verbos regulares e irregulares; após did, use a forma-base.",[
["Qual é o passado de go?","Went","Goed","Goes","Going","Go é irregular: sua forma passada é went."],
["Complete: We ___ the museum last Saturday.","visited","visits","visiting","visit now","Last Saturday indica passado; visit recebe -ed."],
["Qual pergunta emprega corretamente did no passado?","Did you finish the task?","Did you finished the task?","Do you finished the task?","Were you finish the task?","Após did, use finish, sem flexão de passado."],
["Qual negativa está correta?","They did not see the message.","They did not saw the message.","They does not saw the message.","They not seen the message.","O auxiliar did marca o passado; see fica na forma-base."],
]);
add("espanhol","Presente do indicativo","Pratique formas frequentes do presente e a concordância entre sujeito e verbo.",[
["Complete: Yo ___ español.","hablo","hablas","hablan","hablamos","A forma de hablar para yo é hablo."],
["Complete: Nosotros ___ en Recife.","vivimos","vivo","vives","viven","Para nosotros, vivir se conjuga como vivimos."],
["Complete: Ella ___ un libro interesante.","lee","leo","lees","leemos","Para ella, a forma de leer no presente é lee."],
["Qual frase apresenta concordância adequada?","Ustedes estudian juntos.","Ustedes estudias juntos.","Nosotros estudia juntos.","Yo estudian juntos.","Ustedes exige a terceira pessoa do plural: estudian."],
]);
add("espanhol","Falsos cognatos em contexto","Palavras parecidas em português e espanhol podem ter sentidos diferentes. Leia a frase inteira para interpretar.",[
["Em espanhol, ‘apellido’ normalmente significa:","Sobrenome","Apelido informal","Endereço","Idade","Apellido é o nome de família, não um apelido informal."],
["Em ‘La oficina abre a las ocho’, oficina significa:","Escritório","Somente oficina mecânica","Cozinha","Biblioteca","Nesse contexto, oficina é um escritório."],
["Em espanhol, uma pessoa ‘embarazada’ está:","Grávida","Envergonhada necessariamente","Atrasada","Cansada","Embarazada significa grávida; a semelhança com embaraçada pode confundir."],
["Se alguém pede uma ‘carpeta’ para guardar documentos, pede uma:","Pasta","Carpete","Caneta","Janela","Carpeta significa pasta; o contexto dos documentos confirma o sentido."],
]);
add("informatica","Planilhas: células e fórmulas","Identifique linhas, colunas, intervalos e referências. Fórmulas podem calcular valores e atualizar resultados.",[
["Numa planilha, B4 indica:","Coluna B, linha 4","Coluna 4, linha B","Quatro planilhas","Uma pasta externa","A letra identifica a coluna; o número identifica a linha."],
["Se A1 = 6 e A2 = 9, quanto resulta =A1+A2?","15","69","3","54","A fórmula soma os valores das duas células."],
["O intervalo A1:A3 inclui:","A1, A2 e A3","Somente A1 e A3","Apenas A2","Todas as células da planilha","Os dois-pontos indicam um intervalo contínuo entre os extremos."],
["Em uma referência como $B$2, os símbolos $ indicam:","Fixação de linha e coluna ao copiar a fórmula","Valor obrigatoriamente monetário","Célula apagada","Erro de fórmula","A referência absoluta mantém coluna B e linha 2 quando copiada."],
]);
add("informatica","Organização digital e cópias de segurança","Organize arquivos para encontrá-los e mantenha cópias recuperáveis. Sincronização e backup não são necessariamente a mesma coisa.",[
["Qual nome facilita encontrar um arquivo de estudo?","calculo_limites_resumo.pdf","arquivo_novo_final_final2","semnome","aaa999","Um nome descritivo informa matéria, assunto e finalidade."],
["Uma cópia de segurança serve principalmente para:","Recuperar dados após perda ou problema","Aumentar a tela","Substituir toda atualização","Impedir qualquer erro humano","Backups permitem recuperação quando o original não está disponível."],
["Apagar um arquivo numa pasta sincronizada pode:","Propagar a exclusão a outros dispositivos","Garantir um backup permanente","Criar uma impressão física","Melhorar a resolução do arquivo","Serviços de sincronização podem replicar exclusões; isso difere de guardar versões independentes."],
["Por que testar a restauração de um backup?","Para verificar se os dados realmente podem ser recuperados","Para apagar sempre os originais","Para duplicar senhas em público","Para mudar o tipo de monitor","Uma cópia só é útil se a recuperação funcionar quando necessária."],
]);
add("programacao","Condicionais e repetição","Condicionais escolhem caminhos; laços repetem ações. Acompanhe variáveis e condições para entender o fluxo.",[
["Uma estrutura if é usada para:","Executar um caminho conforme uma condição","Guardar somente imagens","Criar uma rede física","Repetir sempre infinitamente","If testa uma condição e permite executar ações dependendo do resultado."],
["Um contador começa em 0 e aumenta 1 por repetição. Após 4 repetições, vale:","4","0","1","5","As atualizações produzem 1, 2, 3 e 4."],
["Um laço pode não terminar quando:","Sua condição continua verdadeira sem uma saída","Possui variável numérica","Tem apenas uma instrução","Usa uma lista pequena","Se nada torna a condição falsa ou interrompe o laço, ele pode continuar indefinidamente."],
["Se x = 7, a condição x > 3 E x < 6 é:","Falsa","Verdadeira","Sempre indefinida","Igual a 7","A primeira parte é verdadeira, mas 7 < 6 é falsa; a conjunção exige ambas."],
]);
add("programacao","Decomposição e depuração","Divida problemas em partes e procure a causa dos erros com exemplos pequenos. Diferencie falhas de sintaxe e de lógica.",[
["Depurar um programa significa:","Investigar e corrigir erros","Apagar todas as funções","Trocar todo o computador","Mudar apenas a cor do editor","A depuração procura causas de comportamento incorreto."],
["Um programa executa sem falhar, mas calcula uma média errada. Pode haver:","Erro de lógica","Ausência obrigatória de código","Erro de monitor necessariamente","Somente falha de internet","Código sintaticamente válido pode implementar uma regra incorreta."],
["Por que dividir um problema em funções menores?","Para tornar responsabilidades mais claras","Para proibir reutilização","Para garantir velocidade máxima sempre","Para eliminar entradas","Funções focadas ajudam na compreensão, no teste e na reutilização."],
["Qual exemplo é mais útil para investigar um erro?","Um caso pequeno que reproduz o problema","Uma descrição sem entrada nem resultado","Só o nome do aplicativo","Mil arquivos sem relação","Um exemplo reproduzível ajuda a isolar a causa e avaliar a correção."],
]);
add("logica","Quantificadores e negações","Todo e existe têm negações diferentes. Para negar uma afirmação universal, basta a existência de um contraexemplo.",[
["A negação de ‘Todos os cartões são azuis’ é:","Existe pelo menos um cartão que não é azul","Nenhum cartão é azul","Todos são verdes","Existe um cartão azul","Negar todos significa afirmar ao menos uma exceção."],
["A negação de ‘Existe um aluno ausente’ é:","Nenhum aluno está ausente","Todos estão ausentes","Existe um presente","Alguns faltaram","Negar a existência de um ausente significa que não há ausentes."],
["Um único quadrado não vermelho refuta qual afirmação?","Todos os quadrados são vermelhos","Alguns quadrados são vermelhos","Nenhum círculo é vermelho","Existe uma figura","Um contraexemplo basta para refutar a proposição universal correspondente."],
["‘Nem todos os livros foram lidos’ implica:","Pelo menos um livro não foi lido","Nenhum livro foi lido","Exatamente um livro foi lido","Todos foram lidos parcialmente","A expressão nega a universalidade, mas não informa quantos ficaram sem leitura."],
]);
add("logica","Contagem e princípio multiplicativo","Em escolhas sucessivas independentes com quantidades fixas de opções, multiplique. Observe restrições e se a ordem distingue os resultados.",[
["Há 3 camisetas e 2 calças. Quantos pares camiseta-calça podem ser escolhidos?","6","5","3","2","Cada uma das três camisetas combina com duas calças: 3·2 = 6."],
["Uma placa fictícia usa uma letra entre A e B seguida de um dígito entre 1 e 4. Quantas placas?","8","6","4","16","São 2 escolhas de letra e 4 de dígito: 2·4 = 8."],
["Quantas ordens diferentes existem para 3 livros distintos numa prateleira?","6","3","9","12","São 3 escolhas para o primeiro, 2 para o segundo e 1 para o último."],
["Quantos números de dois algarismos distintos podem ser formados com 1, 2, 3 e 4?","12","16","8","6","Há 4 escolhas para a dezena e 3 restantes para a unidade: 12."],
]);
add("financeira","Receitas e despesas no cotidiano","Organize entradas e saídas para entender o saldo. Exercícios usam valores fictícios e não representam recomendações financeiras.",[
["Num registro de orçamento, uma entrada de dinheiro é uma:","Receita","Despesa","Multa obrigatória","Dívida sempre","Receita é uma entrada; despesa é uma saída."],
["Um orçamento fictício tem entradas de R$ 900 e saídas de R$ 740. Qual o saldo?","R$ 160","R$ 1.640","−R$ 160","R$ 740","Subtraia saídas das entradas: 900 − 740 = 160."],
["Uma despesa variável é aquela cujo valor:","Pode mudar entre períodos","É sempre zero","É sempre maior que a renda","Nunca muda","Consumo e outras condições podem alterar o valor entre meses."],
["Qual registro ajuda a entender para onde foi o dinheiro?","Data, categoria e valor de cada despesa","Só a cor da embalagem","Somente o maior gasto do ano","Apenas estimativas sem período","Dados organizados permitem somar e comparar gastos por categoria e tempo."],
]);
add("financeira","Porcentagens e comparação de valores","Compare valores usando a mesma base. Um aumento e uma redução percentuais iguais não se anulam necessariamente.",[
["Quanto é 15% de R$ 200?","R$ 30","R$ 15","R$ 20","R$ 300","Multiplique 200 por 0,15."],
["Um preço fictício passa de R$ 80 para R$ 100. Qual foi o aumento percentual?","25%","20%","80%","10%","O aumento é 20 sobre a base 80: 20/80 = 25%."],
["Dois itens iguais custam juntos R$ 36. Qual o preço de cada?","R$ 18","R$ 36","R$ 72","R$ 16","Divida o total por dois."],
["Após aumentar 50%, um valor de 100 vira 150. Qual redução percentual o faz voltar a 100?","33⅓%","50%","25%","20%","A redução necessária é 50 sobre a nova base 150: 1/3."],
]);
add("gerais","Astronomia: estrelas e galáxias","Diferencie objetos e escalas astronômicas. Ano-luz mede distância, não tempo.",[
["O Sol é uma:","Estrela","Galáxia","Lua","Cometa","O Sol é a estrela do Sistema Solar."],
["A Via Láctea é:","A galáxia que contém o Sistema Solar","Um planeta","Um satélite da Terra","Uma constelação somente","O Sistema Solar está na galáxia Via Láctea."],
["Um ano-luz é uma unidade de:","Distância","Tempo de rotação","Massa","Temperatura","Representa a distância percorrida pela luz no vácuo em um ano."],
["Ver uma estrela muito distante significa receber luz que:","Levou tempo para chegar até nós","Foi emitida necessariamente agora","Não se move","Saiu da Terra e voltou sempre","A velocidade da luz é finita, por isso observamos o passado do objeto."],
]);
add("gerais","Unidades, estimativas e ordem de grandeza","Verifique unidades antes de calcular. Estimativas ajudam a detectar respostas incompatíveis com a escala do problema.",[
["Quantos mililitros há em 3 litros?","3.000","300","30","30.000","Cada litro equivale a 1.000 mL."],
["Uma atividade dura 2 h e 15 min. Quanto tempo em minutos?","135","215","125","150","Duas horas são 120 minutos; somando 15, temos 135."],
["0,004 km correspondem a:","4 m","40 m","400 m","0,4 m","Multiplique quilômetros por 1.000 para obter metros."],
["Uma resposta calcula 50.000 litros para encher um copo comum. A estimativa indica:","Provável erro de unidade ou de cálculo","Resultado plausível para qualquer copo","Que litros não medem volume","Que todo cálculo deve ser ignorado","A escala do resultado é incompatível com o objeto descrito."],
]);
add("estatistica","Probabilidade básica","Probabilidade varia de 0 a 1. Em espaços finitos equiprováveis, divida os casos favoráveis pelo total de casos.",[
["Num espaço finito de resultados equiprováveis, probabilidade 0 indica um evento:","Impossível no modelo considerado","Certo","Com chance de 50%","Mais provável que todos","Nesse espaço finito equiprovável, probabilidade zero significa ausência de casos favoráveis."],
["Ao escolher ao acaso um dos números 1 a 8, qual a chance de obter um par?","1/2","1/8","3/8","1","Quatro dos oito números são pares."],
["Se P(A) = 0,35, quanto vale P(não A)?","0,65","0,35","1,35","0,175","A probabilidade do complemento é 1 − P(A)."],
["Eventos independentes têm probabilidades 1/2 e 1/3. Qual a probabilidade de ambos?","1/6","5/6","2/3","1/5","Na independência, multiplique as probabilidades: (1/2)(1/3)."],
]);
add("estatistica","Dispersão e leitura de gráficos","Medidas de dispersão mostram a variabilidade. Examine também escalas e eixos ao interpretar gráficos.",[
["Qual é a amplitude dos dados 3, 8, 10, 15?","12","15","9","36","Amplitude é máximo menos mínimo: 15 − 3 = 12."],
["Dois conjuntos com a mesma média podem ter dispersões diferentes?","Sim","Não","Só se não tiverem números","Só se a média for zero","A média não determina como os valores se espalham."],
["Num gráfico de barras, começar o eixo vertical acima de zero pode:","Exagerar visualmente diferenças","Garantir ausência de distorção","Mudar os valores reais dos dados","Eliminar a necessidade de legenda","O corte do eixo pode ampliar a impressão de diferença entre barras."],
["Se todos os valores de um conjunto são iguais, o desvio padrão é:","Zero","Um","Igual à soma","Sempre negativo","Não há afastamento em relação à média, então a dispersão é nula."],
]);
add("calculo1","17 · Limites no infinito e assíntotas","Em funções racionais, compare os termos de maior grau. Dividir por uma potência de x ajuda a identificar o comportamento no infinito.",[
["Qual é lim(x → +∞) 5/x?","0","5","+∞","−∞","O denominador cresce sem limite enquanto o numerador permanece fixo."],
["Calcule lim(x → +∞) (3x² + 4)/(2x² − 1).","3/2","0","2/3","+∞","Divida tudo por x². Os termos com 1/x² tendem a zero."],
["Qual é a assíntota horizontal de f(x) = 7 + 2/x?","y = 7","x = 7","y = 2","x = 0","Quando x tende a ±∞, 2/x tende a zero e f tende a 7."],
["Qual é lim(x → −∞) √(x² + 1)/x?","−1","1","0","+∞","Escreva √(x² + 1) = |x|√(1 + 1/x²). Para x negativo, |x|/x = −1."],
]);
add("calculo1","18 · Taxas relacionadas e aproximação linear","Relacione grandezas por uma equação e derive em relação ao tempo. Para aproximações locais, use L(x) = f(a) + f′(a)(x − a).",
[
["Se s(t) = t² + 3t, qual é a velocidade instantânea?","2t + 3","t + 3","2t²","t² + 3","A velocidade é a derivada da posição em relação ao tempo."],
["Um círculo tem raio 3 cm crescendo a 2 cm/s. Qual é dA/dt nesse instante?","12π cm²/s","6π cm²/s","9π cm²/s","4π cm²/s","De A = πr², derive dA/dt = 2πr·dr/dt = 2π·3·2."],
["Qual é a aproximação linear de √x em a = 16?","L(x) = 4 + (x − 16)/8","L(x) = 16 + 4x","L(x) = 4 + 8(x − 16)","L(x) = x/4","f(16) = 4 e f′(16) = 1/8. Substitua na fórmula da reta tangente."],
["Um quadrado tem lado s = 5 m crescendo a 0,4 m/s. Qual é a taxa de crescimento da área?","4 m²/s","2 m²/s","0,16 m²/s","25 m²/s","Como A = s², dA/dt = 2s·ds/dt = 2·5·0,4 = 4."],
]);
add("calculo2","07 · Integrais trigonométricas","Identidades trigonométricas podem simplificar produtos e potências. Use radianos e confira uma primitiva derivando-a.",[
["Qual identidade reduz sen²(x)?","[1 − cos(2x)]/2","1 − cos(x)","[1 + cos(2x)]/2","2sen(x)","A identidade de ângulo duplo permite escrever sen²(x) = (1 − cos(2x))/2."],
["Qual é ∫ sen(x)cos(x) dx?","sen²(x)/2 + C","sen²(x) + C","−cos(x) + C","sen(x) + C","Use u = sen(x), du = cos(x) dx. A integral vira u²/2."],
["Quanto vale ∫ de 0 a π de sen²(x) dx?","π/2","π","0","2π","Integre (1 − cos(2x))/2. O termo de seno zera nos extremos."],
["Qual é ∫ sen³(x) dx?","−cos(x) + cos³(x)/3 + C","cos(x) + C","−cos³(x)/3 + C","sen⁴(x)/4 + C","Escreva sen³(x) = (1 − cos²(x))sen(x) e use u = cos(x)."],
]);
add("calculo2","08 · Séries de potências: início","Uma série de potências tem um intervalo de convergência. Verifique os extremos separadamente e use séries conhecidas dentro de seus domínios válidos.",[
["Para |x| < 1, a série 1 + x + x² + ... soma:","1/(1 − x)","1/(1 + x)","x²","1 − x","É uma série geométrica de primeiro termo 1 e razão x."],
["Qual é o raio de convergência de Σ(x/3)ⁿ, com n de 0 a ∞?","3","1/3","0","∞","A condição geométrica é |x/3| < 1, equivalente a |x| < 3."],
["A série Σ(x/3)ⁿ, n ≥ 0, converge em x = 3?","Não","Sim, para 1","Sim, para 3","Sim, para 0","Em x = 3, cada termo vale 1 e não tende a zero."],
["Qual é o coeficiente de x² na série de Maclaurin de eˣ?","1/2","1","2","0","A expansão é 1 + x + x²/2! + ..., portanto o coeficiente é 1/2."],
]);
