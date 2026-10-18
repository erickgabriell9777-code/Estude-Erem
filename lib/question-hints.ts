import {conceptReviews} from "./concept-review";
import type { Question } from "./study-data";
type Hints = readonly [string,string];
// Hints are teaching prompts; never use the correct option or full explanation.
const rules: [RegExp,Hints][] = [
 [/domínio|composição/i,["Observe quais operações podem restringir os valores de entrada.","Verifique denominadores e radicandos separadamente. Em composição, aplique a função interna antes da externa."]],
 [/limites:|limite laws|substituição e indeterminação/i,["Comece tentando substituir o valor para o qual x se aproxima.","Se surgir 0/0, procure fatoração ou o conjugado. Simplifique para valores próximos do ponto antes de substituir novamente."]],
 [/limites no infinito/i,["Observe os termos dominantes quando o módulo de x cresce.","Divida pela maior potência de x relevante. Lembre que √(x²) é |x|, inclusive quando x é negativo."]],
 [/laterais|infinitos/i,["Examine separadamente o comportamento à esquerda e à direita.","Monte uma tabela de sinais perto do ponto. Os limites laterais precisam concordar para existir um limite bilateral."]],
 [/continuidade/i,["Compare o valor da função no ponto com o comportamento perto dele.","Calcule os dois limites laterais e confira se coincidem com f(a). Se houver um parâmetro, imponha essa igualdade."]],
 [/derivada pela definição/i,["A derivada relaciona uma pequena variação na entrada com a variação na saída.","Escreva [f(a+h) − f(a)]/h, simplifique e faça h tender a zero. Para a tangente, use também o ponto (a,f(a))."]],
 [/regras de derivação/i,["Identifique se a expressão é soma, potência, produto ou quociente.","Separe os termos ou fatores antes de derivar. Em produtos e quocientes, não basta derivar numerador e denominador isoladamente."]],
 [/cadeia/i,["Procure uma função dentro de outra.","Nomeie a expressão interna como u. Derive a externa em u e multiplique por du/dx."]],
 [/implícita/i,["Lembre que y depende de x, mesmo quando não está isolado.","Derive os dois lados, incluindo o fator y′ nos termos com y. Reúna esses termos e isole y′."]],
 [/crescimento|concavidade/i,["O comportamento do gráfico pode ser estudado pelos sinais das derivadas.","Localize pontos críticos e compare o sinal de f′ ao redor deles. Para concavidade, examine f″; não use apenas seu valor num único ponto."]],
 [/otimização/i,["Qual grandeza precisa ser máxima ou mínima? Quais valores são permitidos?","Escreva a função objetivo em uma variável. Compare valores nos pontos críticos e nas extremidades do domínio permitido."]],
 [/primitivas|indefinida/i,["Procure uma função cuja derivada volte ao integrando.","Teste a regra da potência termo a termo e acrescente a constante. Se houver uma condição inicial, use-a para determinar C."]],
 [/fundamental|integral definida/i,["Diferencie calcular uma integral de derivar uma função de acumulação.","Para calcular, avalie uma primitiva no limite superior e subtraia o valor no inferior. Se estiver derivando, observe a regra da cadeia no limite variável."]],
 [/integração por substituição/i,["Procure uma expressão interna acompanhada de sua derivada.","Escolha u, calcule du e transforme toda a integral. Em integrais definidas, transforme os limites ou volte à variável original antes de avaliar."]],
 [/taxas relacionadas/i,["Escreva uma equação que relacione as grandezas que mudam.","Derive em relação ao tempo antes de substituir os valores do instante. Para aproximação linear, encontre o valor e a derivada no ponto-base."]],
 [/integração por partes/i,["Procure um produto em que derivar um dos fatores simplifica o problema.","Escolha u e dv; calcule du e v. Organize uv − ∫v du e confira o sinal."]],
 [/frações parciais/i,["Fatore o denominador e compare os graus do numerador e do denominador.","Proponha um termo para cada fator e potência necessária. Elimine os denominadores para encontrar os coeficientes."]],
 [/impróprias/i,["Identifique o ponto problemático: infinito ou integrando ilimitado.","Substitua o extremo problemático por uma variável, calcule a integral limitada e só então tome o limite."]],
 [/volumes|arruelas/i,["Imagine uma seção perpendicular ao eixo de rotação.","Identifique raio externo e interno em função da variável. Integre a diferença das áreas dos discos, com raios ao quadrado."]],
 [/séries/i,["Examine o termo geral e procure uma razão constante entre termos consecutivos.","Verifique as condições de convergência antes de usar uma fórmula de soma. Teste os extremos separadamente quando houver uma variável."]],
 [/parciais/i,["Qual variável está sendo derivada?","Mantenha as outras variáveis constantes. Para derivadas sucessivas, aplique uma derivação de cada vez."]],
 [/concordância/i,["Encontre o núcleo do sujeito antes de escolher a forma verbal.","Não confunda o núcleo com seu complemento. Verifique também se o verbo foi usado de forma impessoal."]],
 [/passiva|vozes verbais/i,["Separe quem realiza a ação de quem recebe a ação.","Procure o sujeito paciente e uma expressão que identifique o agente. Se a mesma pessoa age sobre si, examine a leitura reflexiva."]],
 [/porcent|descont|juros|preço/i,["Identifique o valor que corresponde a 100% em cada etapa.","Transforme a taxa em uma fração decimal. Em alterações sucessivas, aplique cada taxa ao valor atualizado."]],
 [/segundo grau/i,["Organize a equação na forma ax² + bx + c = 0.","Procure fatoração ou calcule o discriminante. Confira se a pergunta pede as raízes, sua soma ou apenas quantas são reais."]],
 [/logaritmos|exponenciais/i,["Diferencie a base, o expoente e o argumento da expressão.","Um logaritmo pode ser convertido numa igualdade de potências. Se estiver derivando uma composição, inclua a derivada da parte interna."]],
 [/média|mediana|moda/i,["Identifique qual medida o enunciado pede; elas resumem dados de modos diferentes.","Prepare os dados: ordene para a mediana, conte frequências para a moda ou some e conte os valores para a média."]],
 [/probabilidade|contagem/i,["Liste os resultados possíveis e as restrições da escolha.","Conte os casos favoráveis e o total quando forem equiprováveis. Só multiplique probabilidades diretamente se a independência estiver estabelecida."]],
 [/quantificadores|negação/i,["Identifique se a afirmação usa todos, nenhum ou existe.","Imagine o menor contraexemplo que torna a frase original falsa. Evite trocar ‘nem todos’ por ‘nenhum’."]],
 [/mol|massa molar|concentração/i,["Anote a grandeza pedida e as unidades fornecidas.","Relacione massa e quantidade de matéria pela massa molar; em concentração, confira o volume total da solução e converta as unidades."]],
 [/simple present|simple past|comparativos/i,["Procure o sujeito e os marcadores de tempo ou comparação.","Verifique a função do auxiliar e a forma do verbo que vem depois. Para comparar, examine a formação do adjetivo e as formas irregulares."]],
 [/ondas|calor|temperatura/i,["Identifique cada grandeza e sua unidade antes de escolher uma fórmula.","Separe relações entre grandezas de definições físicas. Confira se a situação envolve mudança de estado ou de meio de propagação."]],
 [/célula|divisão celular|dna|rna|osmose/i,["Identifique a estrutura ou o processo celular citado.","Separe a função de cada componente e acompanhe o que muda de uma etapa para outra. Evite confundir moléculas, estruturas e processos."]],
];
const bySubject: Record<string,Hints> = {
 portugues:["Leia a frase e identifique a relação gramatical pedida.","Compare cada alternativa com o enunciado completo. Procure o termo a que cada palavra se refere e a função que exerce."],
 matematica:["Separe os dados fornecidos da quantidade que precisa encontrar.","Monte uma expressão com esses dados, respeitando parênteses e unidades. Depois estime se a ordem de grandeza do resultado faz sentido."],
 redacao:["Pergunte qual função esse trecho cumpre no argumento.","Relacione tese, evidência e conclusão. Elimine sugestões que repetem ideias sem desenvolvê-las ou deixam o tema de lado."],
 literatura:["Diferencie a voz do texto, o autor e os recursos de construção de sentido.","Busque uma característica concreta do trecho que sustente a interpretação. Não conclua algo sobre o autor apenas pela fala de uma personagem."],
 historia:["Localize a sociedade, o período e os grupos envolvidos.","Compare mudança e permanência. Desconfie de alternativas que estendem direitos ou acontecimentos a todos sem considerar o contexto."],
 geografia:["Identifique a escala e se a questão trata de processos naturais, sociais ou de ambos.","Observe relações entre espaço, população e ambiente. Nos cálculos, confira as unidades antes de relacionar as grandezas."],
 biologia:["Diferencie a estrutura biológica de sua função.","Acompanhe o processo descrito e verifique qual alternativa explica o mecanismo, não apenas uma palavra associada ao tema."],
 fisica:["Escreva os dados com suas unidades e identifique a grandeza pedida.","Escolha a relação física aplicável e só então substitua os valores. Confira dimensões, sinais e hipóteses da situação."],
 quimica:["Identifique se a pergunta trata de partículas, substâncias ou quantidades.","Use a propriedade que define o conceito pedido. Nos cálculos, mantenha unidades coerentes e confira o que se conserva."],
 filosofia:["Identifique o conceito ou a conclusão que está sendo examinado.","Compare as razões dadas pelas alternativas. Procure pressupostos, possíveis objeções e diferenças de significado."],
 sociologia:["Considere o contexto social e as relações entre grupos e instituições.","Separe descrição, interpretação e julgamento. Uma associação observada não basta para afirmar uma causa."],
 ingles:["Leia a frase inteira e procure pistas de tempo, sujeito e sentido.","Confira se a alternativa combina tanto com a estrutura gramatical quanto com o contexto; não traduza apenas palavra por palavra."],
 espanhol:["Observe o contexto, o sujeito e a forma da palavra.","Teste a alternativa dentro da frase inteira. Palavras parecidas com o português podem ter outro significado."],
 informatica:["Identifique a tarefa que a pessoa pretende realizar.","Relacione a tarefa à função do recurso. Em exemplos de planilha, acompanhe endereços de células e a operação indicada."],
 programacao:["Acompanhe as instruções na ordem em que seriam executadas.","Anote o valor das variáveis depois de cada etapa e avalie condições com esses valores, sem pular repetições."],
 logica:["Traduza a frase em condições simples e identifique os conectivos.","Teste casos que tornam a afirmação falsa. Diferencie uma conclusão necessária de algo que apenas poderia ocorrer."],
 financeira:["Separe entradas, saídas e o período considerado no exercício.","Confira a base das porcentagens e compare valores na mesma unidade e no mesmo período antes de calcular."],
 gerais:["Identifique a categoria ou grandeza mencionada no enunciado.","Compare as definições e as escalas das alternativas. Uma unidade de distância, por exemplo, não deve ser confundida com uma de tempo."],
 estatistica:["Identifique os dados disponíveis e o que a pergunta permite concluir.","Diferencie característica da amostra e da população. Examine a medida solicitada e os limites da interpretação."],
};
export function questionHints(q:Question,topicName:string): Hints {
 if(conceptReviews[q.id])return [conceptReviews[q.id].hint,"Confira o que o enunciado permite concluir e teste cada alternativa contra essas condições."];
 const match=rules.find(([pattern])=>pattern.test(topicName));
 return match?.[1]??bySubject[q.subject]??["Identifique a operação e as condições do problema.","Separe a resolução em etapas, aplique a regra adequada e confira o resultado na expressão original."];
}
