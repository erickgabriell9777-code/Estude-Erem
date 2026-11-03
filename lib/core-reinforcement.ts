import type {Question,SubjectId} from './study-data';
export const coreQuestions:Question[]=[];
function add(subject:SubjectId,topic:number,prompt:string,value:number,explanation:string){const answer=coreQuestions.length%4;const options=[value,value+1,value-1,value+2].map(String);for(let i=0;i<answer;i++)options.unshift(options.pop()!);coreQuestions.push({id:`core-numeric-${coreQuestions.length}`,subject,topic:`topic-${topic}`,level:'Médio',prompt,options,answer,explanation,xp:10});}
for(let k=1;k<=25;k++){
 add('calculo1',96,`Para f(x) = ${k+2}x − ${k}, determine f(3).`,2*k+6,`Substitua x por 3: ${k+2}·3 − ${k} = ${2*k+6}.`);
 add('calculo1',97,`Um ângulo de ${180*k} graus equivale a quantos múltiplos de π radianos?`,k,`Multiplique por π/180: ${180*k}·π/180 = ${k}π radianos.`);
 add('calculo1',101,`Pela definição de derivada, qual é a inclinação da reta tangente a f(x) = x² no ponto x = ${k+1}?`,2*(k+1),`O quociente [(${k+1}+h)² − (${k+1})²]/h simplifica para ${2*(k+1)} + h. Seu limite quando h → 0 é ${2*(k+1)}.`);
 add('calculo1',105,`Se f(x) = ${k+2}ln(x), qual é o valor de f′(1)?`,k+2,`Para x > 0, f′(x) = ${k+2}/x. Em x = 1, f′(1) = ${k+2}.`);
 add('calculo1',106,`A função f(x) = x² − ${2*(k+1)}x + 7 tem mínimo em qual valor de x?`,k+1,`f′(x) = 2x − ${2*(k+1)}. Igualando a zero, x = ${k+1}. Como f″(x) = 2 > 0, trata-se de mínimo.`);
 add('calculo1',107,`Um retângulo tem perímetro ${4*(k+2)} m. Qual deve ser o lado, em metros, se sua área for máxima?`,k+2,`Se um lado mede x, o outro mede ${2*(k+2)} − x. A área A(x) = x(${2*(k+2)} − x) tem máximo em x = ${k+2}, formando um quadrado.`);
 add('calculo1',108,`Se F′(x) = ${k+2} e F(0) = ${k}, determine F(2).`,3*k+4,`Uma primitiva é F(x) = ${k+2}x + C. A condição F(0) = ${k} dá C = ${k}. Logo F(2) = ${3*k+4}.`);
 add('calculo1',155,`Determine lim(x → +∞) [${3*(k+1)}x² + 5]/[3x² − 2].`,k+1,`Dividindo por x², obtemos [${3*(k+1)} + 5/x²]/[3 − 2/x²]. Os termos com x no denominador tendem a zero; o limite é ${k+1}.`);
 add('calculo1',156,`O lado de um quadrado mede ${k+2} cm e cresce 2 cm/s. A que taxa sua área aumenta, em cm²/s?`,4*(k+2),`Como A = l², dA/dt = 2l·dl/dt = 2·${k+2}·2 = ${4*(k+2)} cm²/s.`);
 add('matematica',5,`Uma compra de R$ ${100*(k+1)} recebe desconto de 15%. Qual é o valor do desconto em reais?`,15*(k+1),`Calcule 0,15·${100*(k+1)} = ${15*(k+1)}. Esse é o desconto, não o preço final.`);
 add('matematica',119,`Qual é a maior raiz de x² − ${2*k+3}x + ${k*(k+3)} = 0?`,k+3,`A equação se fatora como (x − ${k})(x − ${k+3}) = 0. A maior raiz é ${k+3}.`);
 add('matematica',120,`Resolva log₂(2^${k+2}).`,k+2,`Logaritmo e exponenciação de mesma base são operações inversas: log₂(2^${k+2}) = ${k+2}.`);
 add('fisica',21,`Converta ${k+2} km para metros.`,1000*(k+2),`Cada quilômetro corresponde a 1.000 metros: ${k+2}·1.000 = ${1000*(k+2)} m.`);
 add('fisica',23,`Um corpo de massa ${k+2} kg sofre aceleração de 3 m/s². Qual é a força resultante, em newtons?`,3*(k+2),`A segunda lei de Newton fornece F = ma = ${k+2}·3 = ${3*(k+2)} N.`);
 add('fisica',131,`Uma onda tem frequência ${k+2} Hz e comprimento de onda 4 m. Qual é sua velocidade, em m/s?`,4*(k+2),`Use v = λf: 4·${k+2} = ${4*(k+2)} m/s.`);
 add('fisica',132,`Um material tem capacidade térmica ${k+2} J/°C. Quanto calor, em joules, é necessário para elevar sua temperatura em 5 °C sem mudança de fase?`,5*(k+2),`Para capacidade térmica C, Q = CΔT = ${k+2}·5 = ${5*(k+2)} J.`);
 add('quimica',24,`Um átomo tem número atômico ${k+2}. Quantos prótons há em seu núcleo?`,k+2,`O número atômico Z é definido como o número de prótons. Portanto Z = ${k+2} significa ${k+2} prótons.`);
 add('quimica',25,`Um átomo neutro tem Z = ${k+2} e A = ${2*k+5}. Quantos nêutrons possui?`,k+3,`A = Z + N. Logo N = ${2*k+5} − ${k+2} = ${k+3}.`);
 add('quimica',26,`Na reação 2 H₂ + O₂ → 2 H₂O, quantos mols de H₂ reagem completamente com ${k+1} mols de O₂?`,2*(k+1),`Os coeficientes indicam proporção 2:1. São necessários 2·${k+1} = ${2*(k+1)} mols de H₂.`);
 add('quimica',133,`Uma amostra contém ${k+1} mols de água. Usando massa molar 18 g/mol, qual é sua massa em gramas?`,18*(k+1),`m = nM = ${k+1}·18 = ${18*(k+1)} g.`);
 add('quimica',134,`Uma solução contém ${4*(k+1)} g de soluto em 2 L de solução. Qual é a concentração comum em g/L?`,2*(k+1),`C = m/V = ${4*(k+1)}/2 = ${2*(k+1)} g/L.`);
}
const concepts=`
@portugues|0
Em “As crianças chegaram cedo”, qual é o núcleo do sujeito?|crianças|chegaram|cedo|As|O núcleo é o substantivo “crianças”; o artigo é seu determinante.
Em “Choveu durante a noite”, como se classifica o sujeito?|Oração sem sujeito|Sujeito oculto|Sujeito composto|Sujeito simples|O verbo chover, no sentido de fenômeno natural, é impessoal.
Em “Pedro e Ana estudaram”, o sujeito é:|Composto|Indeterminado|Inexistente|Oculto|Há dois núcleos: Pedro e Ana.
Na frase “Os livros antigos desapareceram”, o predicado é:|desapareceram|Os livros|livros antigos|Os livros antigos|O sujeito é “Os livros antigos”; o predicado informa o que ocorreu com ele.
Em “Estamos prontos”, o sujeito recuperado pela desinência é:|Nós|Eles|Vós|Ninguém|A terminação de “estamos” corresponde à primeira pessoa do plural.
Em “Há muitas vagas”, o verbo haver indica existência e a oração tem:|Sujeito inexistente|Sujeito “vagas”|Sujeito “muitas”|Dois sujeitos|Haver no sentido de existir é impessoal; “muitas vagas” não é sujeito.
Em “A aluna permaneceu tranquila”, o núcleo do predicado nominal é:|tranquila|aluna|permaneceu|A|O predicativo “tranquila” atribui um estado à aluna; permaneceu funciona como verbo de ligação.
@portugues|1
Qual frase emprega corretamente a crase?|Vou à biblioteca.|Vou à pé.|Escrevo à lápis.|Cheguei à Recife.|“Ir a” exige preposição e “a biblioteca” admite artigo feminino; a fusão resulta em “à”.
Em “Entregou o trabalho a ela”, a crase é:|Inadequada antes de “ela”|Obrigatória antes de qualquer pronome|Facultativa porque “ela” é verbo|Obrigatória antes de sujeito|O pronome pessoal “ela” não admite artigo definido feminino.
Complete: “A reunião começa ___ oito horas”.|às|a|desde|pelos|A indicação de horário determinado admite a fusão de a com as: às oito horas.
Por que “a prazo” não recebe crase?|“Prazo” é masculino e não há fusão com artigo feminino.|Toda locução proíbe crase.|A palavra tem só duas sílabas.|Não existe preposição na frase.|A crase em “à” exige a fusão de dois sons a; não há artigo feminino antes de “prazo”.
Qual expressão tem crase como locução adverbial feminina?|à tarde|a pé|a cavalo|a prazo|“À tarde” é uma locução adverbial feminina de tempo.
Complete: “Refiro-me ___ decisão da banca”.|à|há|as|ao|Referir-se exige preposição a; decisão vem com artigo a: à decisão.
Em “Daqui a duas semanas”, usa-se crase?|Não, pois se indica tempo futuro sem artigo feminino definido.|Sim, antes de todo numeral.|Sim, porque “semanas” é feminino.|Sim, porque o verbo está oculto.|A expressão de tempo futuro “daqui a” não apresenta a fusão que produz a crase.
@biologia|18
Qual estrutura controla a entrada e a saída de substâncias da célula?|Membrana plasmática|Nucléolo|Centríolo|Cromossomo|A membrana tem permeabilidade seletiva e participa das trocas com o meio.
Qual organela realiza grande parte da respiração celular aeróbia em eucariontes?|Mitocôndria|Lisossomo|Complexo golgiense|Vacúolo contrátil|A mitocôndria abriga etapas importantes da respiração e da produção de ATP.
Ribossomos participam diretamente de qual processo?|Síntese de proteínas|Duplicação exclusiva de lipídios|Digestão de todo o DNA|Armazenamento de luz|Ribossomos traduzem a sequência do RNA mensageiro em cadeia polipeptídica.
Uma célula procariótica se distingue por não apresentar:|Núcleo delimitado por membrana|Material genético|Membrana plasmática|Ribossomos|Procariontes têm DNA, mas não possuem núcleo envolvido por carioteca.
A parede celular das plantas é rica em:|Celulose|Glicogênio|Queratina|Hemoglobina|A celulose é um componente estrutural importante da parede celular vegetal.
O complexo golgiense atua principalmente na:|Modificação e no direcionamento de substâncias celulares|Produção de energia solar|Duplicação de cromossomos|Formação de todas as membranas sem proteínas|Ele modifica, organiza e encaminha proteínas e outros materiais em vesículas.
Os lisossomos contêm enzimas relacionadas à:|Digestão intracelular|Fotossíntese|Produção de amido a partir da luz|Condução de impulsos exclusivamente|Suas enzimas degradam materiais no interior celular.
@biologia|19
O oxigênio liberado na fotossíntese deriva diretamente da:|Água|Glicose|Clorofila|Molécula de CO₂|A fotólise da água fornece elétrons e libera oxigênio nas reações luminosas.
Nas plantas, as reações luminosas ocorrem nas membranas dos:|Tilacoides|Lisossomos|Centríolos|Ribossomos|Os tilacoides contêm os fotossistemas e componentes da cadeia transportadora de elétrons.
O ciclo de Calvin ocorre no:|Estroma do cloroplasto|Núcleo da célula|Interior do lisossomo|Meio extracelular|No estroma, o carbono é fixado com uso dos produtos das reações luminosas.
Qual pigmento absorve energia luminosa nos fotossistemas?|Clorofila|Hemoglobina|Melanina apenas|Queratina|A clorofila participa da absorção da luz e da transferência de energia no fotossistema.
Qual é a fonte principal de carbono incorporado no ciclo de Calvin?|CO₂|O₂|N₂|H₂|O dióxido de carbono fornece carbono para a produção de compostos orgânicos.
Por que uma planta também precisa respirar?|Para disponibilizar energia química utilizável pelas células.|Porque a fotossíntese não produz matéria orgânica.|Porque só animais produzem ATP.|Para eliminar todos os carboidratos sem obter energia.|A respiração celular transforma a energia dos compostos orgânicos em formas utilizáveis, como ATP.
Aumentar a luz sempre aumenta indefinidamente a fotossíntese?|Não; outros fatores e a saturação limitam a taxa.|Sim; não existe limite.|Sim, mesmo sem água e CO₂.|Não; luz nunca interfere.|Concentração de CO₂, temperatura, água e saturação da maquinaria podem limitar o processo.
@biologia|20
No cruzamento Aa × aa, qual é a chance de um descendente ser aa?|50%|25%|75%|100%|O primeiro genitor produz gametas A ou a; o segundo só a. Metade das combinações é aa.
Em dominância completa, o heterozigoto Aa expressa:|O fenótipo dominante|Sempre um fenótipo intermediário|Os dois fenótipos obrigatoriamente em manchas|Nenhum fenótipo|Na dominância completa, um alelo dominante é suficiente para o fenótipo correspondente.
Dois alelos de um mesmo gene em um indivíduo diploide se separam durante:|A formação dos gametas|Toda síntese de proteína|A fotossíntese|A fecundação apenas|A segregação dos alelos na formação dos gametas fundamenta a primeira lei de Mendel.
O conjunto de alelos de um indivíduo para um caráter é seu:|Genótipo|Fenótipo|Ecossistema|Cariótipo completo necessariamente|Genótipo descreve a constituição genética; fenótipo é a manifestação observável.
Um indivíduo AA é classificado como:|Homozigoto|Heterozigoto|Hemizigoto obrigatoriamente|Triploide|Os dois alelos representados são iguais.
No cruzamento AA × aa, todos os descendentes previstos têm genótipo:|heterozigoto Aa|homozigoto dominante AA|homozigoto recessivo aa|genótipo A|Um genitor fornece somente A e o outro somente a.
O ambiente pode influenciar o fenótipo?|Sim, a manifestação de muitos caracteres depende de genética e ambiente.|Não, nenhum caráter depende do ambiente.|Sim, mas elimina todos os genes.|Não, o fenótipo é sempre idêntico ao DNA.|Alimentação, temperatura e outros fatores podem influenciar a manifestação de características.
@quimica|70
Água e óleo em repouso constituem, em condições comuns, uma mistura:|Heterogênea com duas fases|Homogênea com uma fase|De dois elementos químicos puros|Sem qualquer fase|Os líquidos são pouco miscíveis e formam duas regiões visíveis.
Para separar areia da água, uma técnica adequada é:|Filtração|Destilação fracionada de gases|Fusão nuclear|Cromatografia obrigatória|O filtro retém partículas sólidas enquanto o líquido atravessa.
Para recuperar água líquida de uma solução de sal não volátil, usa-se:|Destilação simples|Catação|Peneiração|Imantação|A água evapora e depois condensa; o sal permanece majoritariamente no recipiente inicial.
A separação magnética é útil quando um componente:|É atraído por um ímã|Tem qualquer cor azul|Está sempre dissolvido|É necessariamente gasoso|A diferença na resposta ao campo magnético permite a separação.
A decantação depende principalmente de:|Diferença de densidade e separação de fases|Igualdade de todas as densidades|Transformação de átomos|Mudança obrigatória de composição química|A gravidade permite sedimentação ou separação entre fases de densidades distintas.
Uma solução de açúcar totalmente dissolvido em água é:|Mistura homogênea|Substância simples|Mistura com cristais visíveis obrigatórios|Elemento químico|A solução tem aspecto uniforme em uma fase e contém mais de uma substância.
@quimica|71
A ligação iônica envolve predominantemente:|Atração eletrostática entre íons de cargas opostas|Compartilhamento igual de todos os elétrons em qualquer caso|Fusão de núcleos|Ausência de forças elétricas|Cátions e ânions se atraem eletrostaticamente.
Na ligação covalente, os átomos:|Compartilham pares de elétrons|Trocam prótons continuamente|Perdem obrigatoriamente todos os elétrons|Deixam de possuir núcleos|Pares de elétrons compartilhados participam da ligação entre os átomos.
A boa condutividade elétrica dos metais se relaciona a:|Elétrons deslocalizados que podem se mover pelo material|Ausência de elétrons|Prótons livres fora do núcleo|Moléculas de água obrigatórias|A ligação metálica permite mobilidade de elétrons deslocalizados.
O NaCl sólido conduz bem eletricidade em condições usuais?|Não, os íons estão presos em posições da rede.|Sim, porque os íons se movem livremente no sólido.|Sim, porque não há cargas.|Não, porque não contém íons.|No sólido, falta mobilidade iônica; fundido ou em solução aquosa, há íons móveis.
Uma molécula com ligação covalente polar pode ser apolar no conjunto?|Sim, se sua geometria permitir cancelamento dos dipolos.|Não, toda ligação polar torna a molécula polar.|Sim, mas somente sem elétrons.|Não, geometria nunca importa.|A polaridade molecular depende também da soma vetorial dos momentos dipolares.
A molécula de CO₂ é linear. Seus dipolos de ligação resultam em:|Momento dipolar resultante nulo|Carga elétrica total positiva obrigatória|Uma molécula necessariamente polar|Ausência de ligações covalentes|Os dois dipolos iguais e opostos se cancelam na geometria linear.
@portugues|117
Complete: “Os estudantes ___ os exercícios ontem”.|resolveram|resolveu|resolvemos|resolvestes|O sujeito está na terceira pessoa do plural; “resolveram” concorda com ele.
Complete: “___ dois anos que estudo aqui”.|Faz|Fazem|Fizeram|Faziam|Fazer indicando tempo decorrido é impessoal e fica no singular.
Complete: “___ muitas dúvidas na aula”.|Havia|Haviam|Houveram|Haveriam|Haver no sentido de existir é impessoal: havia muitas dúvidas.
Qual construção mantém a concordância padrão?|Existem várias soluções.|Existe várias soluções.|Houveram várias soluções.|Fazem três dias.|Existir é pessoal e concorda com o sujeito plural “várias soluções”.
Em “A maioria dos alunos chegou”, o verbo no singular concorda com:|O núcleo “maioria”|O termo “alunos”|Um sujeito inexistente|A palavra “dos”|O núcleo singular “maioria” permite a concordância no singular.
Complete: “Eu e você ___ o projeto”.|concluímos|concluíram|concluiu|concluístes|A presença de “eu” no sujeito composto leva o verbo à primeira pessoa do plural.
`;
let subject:SubjectId='portugues',topic=0;for(const row of concepts.trim().split('\n')){if(row.startsWith('@')){const p=row.slice(1).split('|');subject=p[0] as SubjectId;topic=Number(p[1]);continue}const [prompt,right,a,b,c,explanation]=row.split('|');const answer=coreQuestions.length%4;const options=[right,a,b,c];for(let i=0;i<answer;i++)options.unshift(options.pop()!);coreQuestions.push({id:`core-concept-${coreQuestions.length}`,subject,topic:`topic-${topic}`,level:'Médio',prompt,options,answer,explanation,xp:10});}
