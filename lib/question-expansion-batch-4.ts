import type { Question } from "./study-data";
type Row=[string,string[],number,string];
const groups:{subject:string;topic:string;prefix:string;sourceId:string;rows:Row[]}[]=[
{subject:"espanhol",topic:"topic-38",prefix:"exp4-falsos",sourceId:"exp4-spanish",rows:[
["Em espanhol, “embarazada” significa:",["Grávida","Envergonhada","Embarcada","Cansada"],0,"“Embarazada” significa grávida; “envergonhada” é “avergonzada”."],
["A palavra espanhola “exquisito” costuma significar:",["Delicioso ou refinado","Esquisito no sentido de estranho","Perigoso","Barato"],0,"“Exquisito” geralmente indica algo delicioso, excelente ou refinado."],
["Em espanhol, “carpeta” corresponde a:",["Pasta para guardar documentos","Carpete de chão","Carteira de dinheiro","Cartão de identificação"],0,"“Carpeta” é uma pasta ou fichário; “tapete” pode ser “alfombra”."],
["A palavra “vaso”, em espanhol, geralmente significa:",["Copo ou recipiente","Vaso de planta exclusivamente","Vasilha sanitária","Vidro de janela"],0,"“Vaso” é normalmente um copo ou recipiente para líquidos."],
["Em espanhol, “largo” significa:",["Comprido","Largo no sentido de amplo","Lento","Alto"],0,"“Largo” indica comprimento; “ancho” expressa largura."],
["A palavra “apellido” significa:",["Sobrenome","Apelido carinhoso","Primeiro nome","Assinatura"],0,"“Apellido” significa sobrenome; “apodo” é apelido."],
["Em espanhol, “oficina” significa:",["Escritório","Oficina mecânica em todos os contextos","Cozinha","Sala de aula"],0,"“Oficina” costuma ser escritório ou local de trabalho administrativo."],
["A palavra espanhola “asistir” pode significar:",["Comparecer ou estar presente","Ajudar obrigatoriamente","Assistir televisão","Assinar um documento"],0,"“Asistir a una clase” significa comparecer a uma aula."],
["Em espanhol, “sensible” significa:",["Sensível","Sensato","Insensível","Razoável em qualquer contexto"],0,"“Sensible” corresponde a sensível; “sensato” é “sensato” ou “juicioso”."],
["A palavra “contestó” em espanhol significa:",["Respondeu","Contestou uma prova necessariamente","Protestou","Desafiou"],0,"“Contestar” é responder; o contexto determina se a resposta é formal ou informal."],
["Em espanhol, “éxito” significa:",["Sucesso","Êxito de uma saída física","Excesso","Fracasso"],0,"“Éxito” significa sucesso; “saída” é “salida”."],
["A palavra espanhola “constipado” pode indicar:",["Resfriado","Prisão de ventre em todos os países","Constipação intestinal sempre","Cansaço"],0,"Em muitos contextos, “estar constipado” significa estar resfriado; usos regionais variam."],
["Em espanhol, “tienda” geralmente significa:",["Loja","Tenda de campanha","Teto","Cozinha"],0,"“Tienda” é loja; “tenda” pode ser “tienda de campaña”."],
["A palavra “rojo” corresponde a qual cor?",["Vermelho","Roxo","Rosa","Laranja"],0,"“Rojo” significa vermelho; “roxo” é “morado” ou “púrpura”."],
["Em espanhol, “cena” significa:",["Jantar","Cena de filme","Almoço","Lanche da manhã"],0,"“Cena” é a refeição noturna; “cena” no sentido teatral é “escena”."],
["A palavra espanhola “aceite” significa:",["Óleo ou azeite","Aceitação","Açúcar","Vinagre"],0,"“Aceite” é óleo ou azeite, dependendo do contexto."],
["Em espanhol, “polvo” significa:",["Poeira ou pó","Polvo marinho","Polvilho","Pólvora sempre"],0,"“Polvo” pode significar poeira ou pó; o animal polvo é “pulpo”."],
["A palavra “rato” em espanhol pode significar:",["Um intervalo de tempo","Roedor exclusivamente","Rato de computador","Uma razão matemática"],0,"“Un rato” significa um período ou momento de tempo; o roedor é “ratón”."],
["Em espanhol, “taza” corresponde a:",["Xícara","Taça de vinho","Tábua","Tampa"],0,"“Taza” é xícara; “taça” pode ser “copa”."],
["A palavra espanhola “sitio” pode significar:",["Lugar ou local","Sítio rural obrigatoriamente","Site apenas na internet","Sinal de trânsito"],0,"“Sitio” é lugar ou local; a tradução depende do contexto."]
]},
{subject:"literatura",topic:"topic-9",prefix:"exp4-figuras",sourceId:"exp4-literature",rows:[
["Em “A cidade acordou cedo”, atribui-se ação humana à cidade. A figura é:",["Personificação","Hipérbole","Eufemismo","Pleonasmo"],0,"A personificação atribui características ou ações humanas a seres não humanos."],
["“Esperei um século por sua resposta” é exemplo de:",["Hipérbole","Metonímia","Antítese","Eufemismo"],0,"A hipérbole exagera intencionalmente para intensificar uma ideia."],
["Em “seus olhos são estrelas”, ocorre:",["Metáfora","Comparação explícita","Onomatopeia","Ironia"],0,"A metáfora estabelece uma associação implícita entre elementos, sem conectivo comparativo."],
["“Correu como o vento” apresenta:",["Comparação","Metáfora pura","Paradoxo","Anáfora"],0,"A comparação aproxima elementos por meio de um termo comparativo, como “como”."],
["A repetição de uma palavra no início de versos sucessivos é:",["Anáfora","Assonância","Metonímia","Hipérbato"],0,"A anáfora repete termos ou expressões no início de segmentos sucessivos."],
["Em “tic-tac”, a palavra imita um som. Trata-se de:",["Onomatopeia","Antítese","Sinestesia","Eufemismo"],0,"A onomatopeia reproduz ou sugere sons por meio de palavras."],
["A aproximação de ideias opostas, como “triste alegria”, caracteriza:",["Antítese","Pleonasmo","Gradação","Catacrese"],0,"A antítese coloca ideias de sentidos contrários em contraste."],
["“Ele partiu desta para melhor” suaviza a ideia da morte por meio de:",["Eufemismo","Hipérbole","Ironia","Paronomásia"],0,"O eufemismo substitui uma expressão direta por outra considerada mais suave."],
["Em “Li Machado de Assis”, o autor é mencionado no lugar de sua obra. O recurso é:",["Metonímia","Metáfora","Prosopopeia","Aliteração"],0,"A metonímia substitui um termo por outro com relação de proximidade, como autor pela obra."],
["A repetição expressiva de sons consonantais é chamada de:",["Aliteração","Assonância","Anáfora","Hipérbole"],0,"A aliteração repete sons consonantais para produzir efeito sonoro."],
["A repetição de sons vocálicos recebe o nome de:",["Assonância","Aliteração","Ironia","Antítese"],0,"A assonância é a repetição de sons vocálicos em palavras próximas."],
["Em “Ouvi uma voz doce”, há mistura de sensações auditiva e gustativa:",["Sinestesia","Metonímia","Eufemismo","Elipse"],0,"A sinestesia combina sensações ligadas a sentidos diferentes."],
["Uma afirmação que sugere o contrário do que diz, com intenção crítica, pode ser:",["Ironia","Pleonasmo","Gradação","Comparação"],0,"A ironia produz sentido por contraste entre o enunciado e a intenção comunicativa."],
["“Sussurrou, falou, gritou” organiza ações em intensidade crescente. É:",["Gradação","Antítese","Metonímia","Eufemismo"],0,"A gradação apresenta uma sequência progressiva ou regressiva de intensidade."],
["A expressão “vi com meus próprios olhos” contém:",["Pleonasmo","Paradoxo","Sinestesia","Onomatopeia"],0,"O pleonasmo repete uma ideia; pode ser expressivo ou redundante, conforme o contexto."],
["Uma sequência de ideias aparentemente incompatíveis que produz reflexão é:",["Paradoxo","Comparação","Aliteração","Eufemismo"],0,"O paradoxo aproxima ideias contraditórias para expressar um sentido mais complexo."],
["Quando o texto se dirige diretamente a uma pessoa ou entidade, ocorre:",["Apóstrofe","Anáfora","Assonância","Metonímia"],0,"A apóstrofe é uma interpelação direta a alguém ou algo personificado."],
["A omissão de um termo que pode ser recuperado pelo contexto é:",["Elipse","Hipérbole","Catacrese","Ironia"],0,"A elipse omite um elemento subentendido, sem impedir a compreensão."],
["“O silêncio gritava no quarto” combina sentidos em tensão. O efeito central é:",["Paradoxo e personificação","Somente comparação literal","Eufemismo obrigatório","Metonímia de autor"],0,"A formulação une silêncio e grito, criando tensão expressiva e atribuindo ação ao silêncio."],
["A figura que substitui uma expressão por outra com base em semelhança implícita é:",["Metáfora","Metonímia","Eufemismo","Assonância"],0,"A metáfora cria uma relação de semelhança sem explicitar o conectivo comparativo."]
]},
{subject:"informatica",topic:"topic-41",prefix:"exp4-planilhas",sourceId:"exp4-spreadsheets",rows:[
["Em uma planilha, qual fórmula soma os valores de A1 até A5?",["=SOMA(A1:A5)","=MEDIA(A1-A5)","=CONTAR(A1;A5)","=MAXIMO(A1+A5)"],0,"A função SOMA adiciona os valores do intervalo indicado por dois-pontos."],
["Qual função calcula a média aritmética de B2 até B6?",["=MÉDIA(B2:B6)","=SOMA(B2:B6)","=MÁXIMO(B2:B6)","=CONT.VALORES(B2:B6)"],0,"MÉDIA soma os valores numéricos e divide pela quantidade considerada."],
["Para encontrar o maior valor de C1:C10, utiliza-se:",["=MÁXIMO(C1:C10)","=MÍNIMO(C1:C10)","=SOMA(C1:C10)","=CONT.NÚM(C1:C10)"],0,"MÁXIMO retorna o maior valor numérico do intervalo."],
["A função MÍNIMO serve para:",["Retornar o menor valor numérico de um intervalo","Somar todas as células","Contar textos e números","Ordenar linhas alfabeticamente"],0,"MÍNIMO identifica o menor valor numérico dentro do intervalo."],
["Em muitas planilhas, uma fórmula começa com:",["Sinal de igual (=)","Sinal de porcentagem (%)","Ponto e vírgula (;)","Dois-pontos (:)"],0,"O sinal de igual indica que a célula deve interpretar o conteúdo como fórmula."],
["Qual referência é absoluta em uma planilha?",["$A$1","A1","A$","1A"],0,"O cifrão antes da coluna e da linha fixa ambas ao copiar a fórmula."],
["Ao copiar a fórmula =A1+B1 uma linha para baixo, com referências relativas, ela tende a virar:",["=A2+B2","=A1+B1","=$A$1+$B$1","=B1+C1"],0,"Referências relativas se ajustam à nova posição quando a fórmula é copiada."],
["A função SE permite:",["Retornar resultados diferentes conforme uma condição","Somar somente números pares automaticamente","Criar um gráfico sem dados","Ordenar células por cor"],0,"SE avalia um teste lógico e retorna um resultado para verdadeiro e outro para falso."],
["Para contar quantas células numéricas existem em A1:A20, usa-se:",["=CONT.NÚM(A1:A20)","=SOMA(A1:A20)","=MÉDIA(A1:A20)","=MÁXIMO(A1:A20)"],0,"CONT.NÚM conta células que contêm números."],
["Para contar células não vazias, incluindo texto, a função adequada é:",["=CONT.VALORES(A1:A20)","=CONT.NÚM(A1:A20)","=MÍNIMO(A1:A20)","=SOMA(A1:A20)"],0,"CONT.VALORES contabiliza células preenchidas, inclusive com texto."],
["O erro #DIV/0! normalmente indica:",["Tentativa de divisão por zero ou por célula vazia usada como divisor","Texto muito longo","Coluna estreita","Arquivo sem nome"],0,"O erro aparece quando o divisor é zero ou não contém um valor numérico válido."],
["O intervalo A1:A5 representa:",["As células de A1 até A5 na mesma coluna","A célula A1 dividida por A5","Todas as células da planilha","As colunas A até E na linha 1"],0,"Os dois-pontos indicam um intervalo contínuo entre a primeira e a última referência."],
["Qual recurso exibe apenas registros que atendem a critérios sem apagar os demais?",["Filtro","Mesclar células","Quebra de texto","Congelar painel"],0,"O filtro oculta temporariamente linhas que não atendem aos critérios definidos."],
["A classificação crescente de nomes organiza os textos:",["De A a Z","De Z a A","Do maior número ao menor","Por cor obrigatoriamente"],0,"A ordenação crescente de texto normalmente segue a ordem alfabética A–Z."],
["Para calcular 15% do valor em A2, uma fórmula possível é:",["=A2*15%","=A2+15","=A2/15%","=15-A2"],0,"Multiplicar o valor por 15% calcula quinze centésimos desse valor."],
["Uma referência como B3 identifica:",["Coluna B e linha 3","Linha B e coluna 3","Planilha B do arquivo 3","Terceiro arquivo da coluna B"],0,"A letra identifica a coluna e o número identifica a linha."],
["Qual recurso representa dados visualmente em barras ou linhas?",["Gráfico","Validação de dados","Comentário","Congelamento de painéis"],0,"Gráficos transformam valores da tabela em representações visuais para comparação e análise."],
["Ao usar preenchimento automático em uma sequência 1, 2, 3, a planilha pode:",["Continuar a sequência com 4, 5 e assim por diante","Apagar os valores anteriores sempre","Converter números em texto obrigatoriamente","Criar uma senha"],0,"O preenchimento automático reconhece padrões simples e pode estender a sequência."],
["A função CONT.SE é usada para:",["Contar células que atendem a um critério","Somar todas as células","Encontrar o menor número","Calcular a média ponderada automaticamente"],0,"CONT.SE conta quantas células de um intervalo satisfazem uma condição."],
["Separar dados em diferentes planilhas dentro do mesmo arquivo ajuda a:",["Organizar conjuntos relacionados em abas distintas","Duplicar automaticamente todo o arquivo","Impedir o uso de fórmulas","Apagar referências entre células"],0,"Abas permitem organizar dados relacionados em folhas diferentes do mesmo arquivo."]
]}
];
const levels=["Fácil","Médio","Difícil"];
export const expansionBatch4Questions:Question[]=groups.flatMap(group=>group.rows.map((row,index)=>{
 const shift=(index*3+1)%4;
 return {id:`${group.prefix}-${String(index+1).padStart(2,"0")}`,subject:group.subject as Question["subject"],topic:group.topic,level:levels[index%3],prompt:row[0],options:row[1].map((_,i)=>row[1][(i+shift)%4]),answer:(4-shift)%4,explanation:row[3],sourceId:group.sourceId,xp:10};
}));
