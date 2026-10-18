import type { Question, SubjectId } from "./study-data";
// Authored exercises, not reproduced textbook questions. Each reference supports
// the concept taught. IDs and topic order remain stable across catalogue releases.
type Row = [Question["level"], string, string[], number, string];
export const calculusTopics: {id:string;subject:SubjectId;name:string;summary:string}[] = [];
export const calculusQuestions: Question[] = [];
export const calculusSources: {id:string;title:string;publisher:string;url:string;accessedAt:string}[] = [];
function add(subject: SubjectId, name: string, summary: string, volume: number, chapter: string, rows: Row[]) {
 const topic = `topic-${95 + calculusTopics.length}`;
 const sourceId = `calculus-source-${topic}`;
 calculusSources.push({id:sourceId,title:`Calculus Volume ${volume} — ${chapter.split('-').slice(0,2).join('.')}`,publisher:"OpenStax / Rice University",url:`https://openstax.org/books/calculus-volume-${volume}/pages/${chapter}`,accessedAt:"2026-09-15"});
 calculusTopics.push({id:topic,subject,name,summary});
 rows.forEach(([level,prompt,options,answer,explanation],i)=>calculusQuestions.push({id:`calc-${topic}-${i}`,subject,topic,level,prompt,options,answer,explanation,sourceId,xp:10}));
}
add("calculo1","01 · Funções, domínio e composição","Comece pelo domínio: denominadores não podem ser zero e raízes quadradas reais exigem radicando não negativo. Em f(g(x)), aplique g primeiro. ℝ representa os números reais.",1,"1-1-review-of-functions",[
 ["Fácil","Se f(x) = 3x − 4, quanto vale f(5)?",["7","11","15","19"],1,"Substitua x por 5: 3·5 − 4 = 11."],
 ["Fácil","Qual é o domínio real de g(x) = √(x − 6)?",["x ≥ 6","x > 0","Todos os reais","x ≤ 6"],0,"Exija x − 6 ≥ 0. Logo, x ≥ 6; o zero da raiz é permitido."],
 ["Médio","Se f(x) = x² e g(x) = x − 3, qual é f(g(x))?",["x² − 3","x² − 9","(x − 3)²","x − 9"],2,"Primeiro g produz x − 3; depois f eleva todo esse resultado ao quadrado."],
 ["Difícil","Qual é o domínio de h(x) = √(x + 2)/(x − 5)?",["x ≥ −2","x > −2 e x ≠ 5","x ≠ 5","x ≥ −2 e x ≠ 5"],3,"Combine x + 2 ≥ 0 com x − 5 ≠ 0. Ambas as restrições precisam valer."],
]);
add("calculo1","02 · Álgebra e gráficos de funções","Revise fatoração e funções afins e quadráticas. Simplificar uma fração não recupera pontos excluídos do domínio original. O coeficiente de x numa função afim indica sua inclinação.",1,"1-2-basic-classes-of-functions",[
 ["Fácil","Qual é a inclinação da reta y = −4x + 9?",["9","4","−4","−9"],2,"Em y = mx + b, a inclinação é m. Aqui, m = −4."],
 ["Fácil","Quais são as raízes de x² − 49?",["0 e 49","−7 e 7","7 e 49","−49 e 49"],1,"Fatore como (x − 7)(x + 7) e iguale cada fator a zero."],
 ["Médio","Para x ≠ 6, (x² − 36)/(x − 6) simplifica para:",["x − 6","x² + 6","x + 6","1"],2,"Use x² − 36 = (x − 6)(x + 6). Cancele o fator não nulo."],
 ["Difícil","Qual é o vértice de y = (x − 4)² + 7?",["(4, 7)","(−4, 7)","(4, −7)","(7, 4)"],0,"O quadrado é mínimo quando x = 4. Nesse ponto, y = 7."],
]);
add("calculo1","03 · Trigonometria e radianos","Em Cálculo, use radianos nas fórmulas trigonométricas usuais. Uma volta mede 2π. A identidade sen²(x) + cos²(x) = 1 ajuda a simplificar expressões.",1,"1-3-trigonometric-functions",[
 ["Fácil","Quanto vale sen(π/2)?",["0","1","−1","π/2"],1,"π/2 radianos corresponde a 90°. No círculo unitário, a coordenada vertical vale 1."],
 ["Fácil","120° equivalem a quantos radianos?",["π/3","3π/2","2π/3","2π"],2,"Multiplique 120 por π/180 e simplifique: 2π/3."],
 ["Médio","Qual é o período de sen(4x)?",["4π","2π","π","π/2"],3,"O período é 2π/4 = π/2."],
 ["Difícil","Para sen(x) ≠ 0, (1 − cos²(x))/sen(x) é igual a:",["sen(x)","cos(x)","1","−sen(x)"],0,"Troque 1 − cos²(x) por sen²(x); depois divida por sen(x)."],
]);
add("calculo1","04 · Limites: substituição e indeterminação","Tente substituição direta. Se surgir 0/0, isso não é a resposta: simplifique por fatoração ou racionalização e tente novamente. O limite considera valores próximos do ponto.",1,"2-3-the-limit-laws",[
 ["Fácil","Calcule lim(x → 3) (2x² − 5).",["1","6","13","18"],2,"Polinômios permitem substituição direta: 2·9 − 5 = 13."],
 ["Médio","Calcule lim(x → 7) (x² − 49)/(x − 7).",["0","7","Não existe","14"],3,"Fatore e cancele x − 7 para x ≠ 7. Resta x + 7, cujo limite é 14."],
 ["Médio","Calcule lim(x → 0) (√(16 + x) − 4)/x.",["1/8","4","8","0"],0,"Multiplique pelo conjugado. Resta 1/(√(16 + x) + 4), que tende a 1/8."],
 ["Difícil","Encontrar 0/0 por substituição direta significa:",["Limite igual a zero","Forma indeterminada","Limite sempre infinito","Limite inexistente sempre"],1,"0/0 exige outra análise. Simplificações podem revelar um limite finito, infinito ou inexistente."],
]);
add("calculo1","05 · Limites laterais e infinitos","Compare esquerda e direita: o limite bilateral exige concordância. +∞ descreve crescimento sem limite, não um número real. Uma assíntota vertical pode aparecer quando a função cresce em módulo perto de um ponto.",1,"2-2-the-limit-of-a-function",[
 ["Fácil","Se o limite pela esquerda é 4 e pela direita é 9, o limite bilateral:",["É 13","É 6,5","Não existe","É 4"],2,"Os dois limites laterais são diferentes; não há um único valor bilateral."],
 ["Médio","Qual é lim(x → 2⁺) 1/(x − 2)?",["−∞","0","1","+∞"],3,"À direita de 2, o denominador é positivo e aproxima-se de zero."],
 ["Médio","Qual é lim(x → 2⁻) 1/(x − 2)?",["−∞","+∞","2","0"],0,"À esquerda, x − 2 é negativo e muito pequeno em módulo; o quociente decresce sem limite."],
 ["Difícil","Qual é lim(x → 0) |x|/x?",["1","Não existe","0","−1"],1,"Para x positivo, vale 1; para x negativo, −1. Os limites laterais não coincidem."],
]);
add("calculo1","06 · Continuidade","Em x = a, continuidade exige f(a) definida, limite existente e igualdade entre ambos. Uma descontinuidade removível pode ser corrigida escolhendo o valor do ponto conforme o limite.",1,"2-4-continuity",[
 ["Fácil","Se lim(x → a) f(x) = 8, qual valor de f(a) garante continuidade em a?",["0","a","Qualquer valor","8"],3,"Continuidade exige f(a) igual ao limite, portanto 8."],
 ["Médio","Defina f(x) = (x² − 81)/(x − 9) para x ≠ 9. Qual f(9) torna f contínua?",["18","9","81","0"],0,"Simplifique para x + 9 fora do ponto. O limite em 9 é 18."],
 ["Médio","Se f(x) = 2x + k para x < 1 e f(x) = 5 para x ≥ 1, qual k garante continuidade?",["2","3","5","7"],1,"O limite esquerdo é 2 + k. Igualando a 5, obtemos k = 3."],
 ["Difícil","Uma função contínua em [1, 4] satisfaz f(1) = −2 e f(4) = 6. Podemos garantir:",["Uma única raiz","Nenhuma raiz","Ao menos uma raiz em (1, 4)","Raiz em x = 2"],2,"Pelo teorema do valor intermediário, a função assume 0 entre valores de sinais opostos."],
]);
add("calculo1","07 · Derivada pela definição e reta tangente","A derivada é o limite da taxa média de variação: f′(a) = lim(h → 0) [f(a+h) − f(a)]/h. Quando existe, fornece a inclinação da tangente.",1,"3-1-defining-the-derivative",[
 ["Fácil","Geometricamente, f′(a) representa:",["Área total","Inclinação da tangente em a","Sempre f(a)","Domínio de f"],1,"A derivada descreve a inclinação instantânea do gráfico."],
 ["Médio","Para f(x) = x² + 4, qual é [f(a+h) − f(a)]/h, com h ≠ 0?",["2a","a + h","2a + h","h²"],2,"Expanda (a+h)²; subtraia a² e divida 2ah + h² por h."],
 ["Médio","Qual é a reta tangente a f(x) = x² + 4 em x = 3?",["y = 6x + 13","y = 3x + 4","y = 6x − 9","y = 6x − 5"],3,"A inclinação é 6 e o ponto é (3,13). Use y − 13 = 6(x − 3)."],
 ["Difícil","A derivada de |x − 2| em x = 2:",["Não existe","Vale 0","Vale 1","Vale −1"],0,"As inclinações laterais são −1 e 1. O encontro forma um vértice sem derivada."],
]);
add("calculo1","08 · Regras de derivação","Derive somas termo a termo. Para potências, (xⁿ)′ = nxⁿ⁻¹. Produtos usam u′v + uv′; quocientes usam (u′v − uv′)/v², onde v ≠ 0.",1,"3-3-differentiation-rules",[
 ["Fácil","Qual é a derivada de 5x³ − 8x + 2?",["15x² − 8","5x² − 8","15x³ − 8","15x² + 2"],0,"Derive cada termo: 5·3x², −8 e 0."],
 ["Médio","Qual é a derivada de x²(x + 4)?",["2x(x + 4)","3x² + 8x","2x + 1","x² + 4"],1,"Expanda para x³ + 4x² e derive: 3x² + 8x."],
 ["Médio","Qual é a derivada de (x + 2)/(x − 3), para x ≠ 3?",["1","5/(x − 3)²","−5/(x − 3)²","−1/(x − 3)"],2,"O numerador da regra do quociente é (x − 3) − (x + 2) = −5."],
 ["Difícil","Qual é a derivada de 3/√x, para x > 0?",["3/(2√x)","−3/x²","3x^(−3/2)","−3/(2x^(3/2))"],3,"Escreva 3x^(−1/2). Multiplique pelo expoente e diminua-o em 1."],
]);
add("calculo1","09 · Regra da cadeia","Em f(g(x)), derive a função externa mantendo a interna e multiplique pela derivada da interna. Identificar essas duas camadas evita esquecer um fator.",1,"3-6-the-chain-rule",[
 ["Fácil","Qual é a função interna de (4x + 3)⁵?",["x⁵","5","4x + 3","4"],2,"A potência recebe 4x + 3 como entrada."],
 ["Médio","Qual é a derivada de (4x + 3)⁵?",["5(4x + 3)⁴","20(4x + 3)⁵","4(4x + 3)⁴","20(4x + 3)⁴"],3,"Derive a quinta potência e multiplique pela derivada interna, 4."],
 ["Médio","Qual é a derivada de sen(5x), em radianos?",["5cos(5x)","cos(5x)","−5cos(5x)","5sen(5x)"],0,"A derivada do seno é cosseno. Multiplique ainda por (5x)′ = 5."],
 ["Difícil","Qual é a derivada de √(x² + 7)?",["1/(2√(x² + 7))","x/√(x² + 7)","2x√(x² + 7)","√(2x)"],1,"A derivada externa é 1/(2√u). Multiplique por 2x e simplifique."],
]);
add("calculo1","10 · Derivação implícita","Quando y depende de x, derivar y² em relação a x produz 2y·y′. Derive os dois lados da equação e isole y′; use também produto e cadeia quando necessário.",1,"3-8-implicit-differentiation",[
 ["Fácil","Se y = y(x), qual é d(y³)/dx?",["3y²","3x²","y′","3y²y′"],3,"A regra da cadeia exige multiplicar 3y² pela derivada de y."],
 ["Médio","Em x² + 2y² = 18, com y ≠ 0, qual é y′?",["−x/(2y)","−2x/y","x/(2y)","−x/y"],0,"Derive: 2x + 4yy′ = 0. Isole y′ = −x/(2y)."],
 ["Médio","Na curva xy = 12, qual é a inclinação em (3, 4)?",["4/3","−4/3","−3/4","12"],1,"Pelo produto, y + xy′ = 0. Então y′ = −y/x = −4/3."],
 ["Difícil","Em y + y³ = x, qual é y′?",["1 + 3y²","1/(3y²)","1/(1 + 3y²)","1 − 3y²"],2,"Derive: y′ + 3y²y′ = 1. Fatore y′ e divida por 1 + 3y²."],
]);
add("calculo1","11 · Exponenciais e logaritmos","Use (eˣ)′ = eˣ e (ln x)′ = 1/x para x > 0. Para outras bases positivas, diferentes de 1, aparecem fatores ln(a). Combine com a regra da cadeia.",1,"3-9-derivatives-of-exponential-and-logarithmic-functions",[
 ["Fácil","Qual é a derivada de e^(2x)?",["e^(2x)","2e^(2x)","2x·e^(2x)","eˣ"],1,"A exponencial permanece; multiplique pela derivada de 2x, que é 2."],
 ["Médio","Qual é a derivada de ln(5x), para x > 0?",["5/x","ln(5)","1/x","1/(5x)"],2,"Pela cadeia, 5/(5x) = 1/x."],
 ["Médio","Qual é a derivada de 7ˣ?",["x·7^(x−1)","7ˣ","7ˣ/ln(7)","7ˣ·ln(7)"],3,"Para base a constante, a derivada de aˣ é aˣ·ln(a)."],
 ["Difícil","Qual é a derivada de ln(x² + 9)?",["2x/(x² + 9)","1/(x² + 9)","2/x","ln(2x)"],0,"Derive a função interna e divida pela própria interna."],
]);
add("calculo1","12 · Crescimento, extremos e concavidade","O sinal de f′ indica crescimento ou decrescimento. O sinal de f″ indica concavidade. Um ponto crítico é candidato a extremo; derivada zero, sozinha, não garante máximo ou mínimo.",1,"4-5-derivatives-and-the-shape-of-a-graph",[
 ["Fácil","Se f′(x) > 0 em um intervalo, f é:",["Crescente","Decrescente","Constante","Sempre negativa"],0,"Derivada positiva indica aumento de f com x."],
 ["Médio","Para f(x) = x² − 10x, qual é o ponto de mínimo?",["(0, 0)","(5, −25)","(−5, 75)","(10, 0)"],1,"Resolva 2x − 10 = 0: x = 5. Como f″ = 2 > 0, há mínimo; f(5) = −25."],
 ["Médio","Se f″(x) < 0 em um intervalo, o gráfico tem concavidade:",["Para cima","Nula","Para baixo","Necessariamente crescente"],2,"Segunda derivada negativa indica inclinações decrescentes e concavidade para baixo."],
 ["Difícil","Em f(x) = x³, o ponto x = 0 é:",["Máximo local","Mínimo local","Descontinuidade","Inflexão sem extremo local"],3,"f′ = 3x² não muda de sinal; f″ = 6x muda. Há inflexão, mas não extremo."],
]);
add("calculo1","13 · Problemas de otimização","Escreva a quantidade a maximizar ou minimizar em função de uma variável. Determine o domínio, procure pontos críticos e confira extremos do intervalo e o contexto.",1,"4-7-applied-optimization-problems",[
 ["Fácil","Antes de derivar num problema de otimização, convém:",["Ignorar unidades","Escolher qualquer número","Definir a função objetivo e restrições","Eliminar o domínio"],2,"A função traduz o objetivo; as restrições determinam os valores permitidos."],
 ["Médio","Um retângulo tem perímetro 28 m. Quais lados maximizam sua área?",["5 m e 9 m","6 m e 8 m","4 m e 10 m","7 m e 7 m"],3,"Se um lado é x, o outro é 14 − x. A′ = 14 − 2x zera em 7 e A″ = −2."],
 ["Médio","Qual é o mínimo de C(x) = (x − 6)² + 11 em [0, 10]?",["11","6","0","27"],0,"O quadrado é não negativo e zera em x = 6, que pertence ao intervalo."],
 ["Difícil","Qual é o máximo de f(x) = x³ − 3x em [−2, 3]?",["2","18","0","6"],1,"Avalie os críticos ±1 e as pontas −2, 3: os valores são 2, −2, −2 e 18."],
]);
add("calculo1","14 · Primitivas e integral indefinida","Integrar indefinidamente procura uma função cuja derivada é o integrando. Acrescente + C. Na regra da potência, aumente o expoente em 1 e divida pelo novo expoente, exceto quando o inicial é −1.",1,"4-10-antiderivatives",[
 ["Fácil","Qual é ∫ 8x dx?",["8x² + C","8 + C","4x² + C","x⁸ + C"],2,"A primitiva de x é x²/2; multiplique por 8."],
 ["Fácil","Por que aparece + C em uma integral indefinida?",["Toda integral vale zero","C é sempre 1","Substitui x","Constantes têm derivada zero"],3,"Primitivas que diferem por uma constante têm a mesma derivada."],
 ["Médio","Qual é ∫ (6x² − 5) dx?",["2x³ − 5x + C","12x − 5 + C","6x³ − 5x + C","2x³ + C"],0,"Integre separadamente: 6x³/3 e −5x."],
 ["Difícil","Se F′(x) = 4x e F(2) = 13, qual é F(x)?",["4x² − 3","2x² + 5","2x² + 13","4x + 5"],1,"Integre: F = 2x² + C. Em x = 2, 8 + C = 13, então C = 5."],
]);
add("calculo1","15 · Integral definida e teorema fundamental","Para uma primitiva F de uma função contínua f, ∫ de a a b f(x) dx = F(b) − F(a). A integral é área com sinal. Ela também permite derivar funções definidas por acumulação.",1,"5-3-the-fundamental-theorem-of-calculus",[
 ["Fácil","Calcule ∫ de 0 a 3 de 2x dx.",["6","9","3","18"],1,"Uma primitiva é x². Calcule 3² − 0² = 9."],
 ["Médio","Se F(x) = ∫ de 2 a x de (t² + 1) dt, qual é F′(x)?",["2x","x³/3 + x","x² + 1","0"],2,"O teorema fundamental devolve o integrando avaliado no limite superior x."],
 ["Médio","Quanto vale ∫ de −3 a 3 de x dx?",["9","−9","6","0"],3,"A primitiva é x²/2. Os valores nas extremidades são iguais e se cancelam."],
 ["Difícil","Se G(x) = ∫ de 0 a x² de (t + 4) dt, qual é G′(x)?",["2x(x² + 4)","x² + 4","2x + 4","x⁴/2 + 4x²"],0,"Avalie o integrando em x² e multiplique por (x²)′ = 2x."],
]);
add("calculo1","16 · Integração por substituição","Escolha u como uma expressão interna; transforme também o diferencial. Em integrais definidas, mude os limites para u ou retorne à variável original antes de avaliar.",1,"5-5-substitution",[
 ["Fácil","Se u = x² + 6, qual é du?",["2x dx","x dx","2 dx","(x² + 6) dx"],0,"Derive u em relação a x: du/dx = 2x."],
 ["Médio","Qual é ∫ 2x(x² + 6)³ dx?",["(x² + 6)³ + C","(x² + 6)⁴/4 + C","6x²(x² + 6)² + C","(x² + 6)⁴ + C"],1,"Com u = x² + 6 e du = 2x dx, integre u³: u⁴/4 + C."],
 ["Médio","Qual é ∫ cos(3x) dx, usando radianos?",["3sen(3x) + C","−sen(3x) + C","sen(3x)/3 + C","cos(3x)/3 + C"],2,"Faça u = 3x; então dx = du/3. Integre cos(u) e retorne a x."],
 ["Difícil","Calcule ∫ de 0 a 2 de 2x/(x² + 1) dx.",["ln(2)","5","ln(4)","ln(5)"],3,"Use u = x² + 1; os limites viram 1 e 5. A integral é ln(5) − ln(1)."],
]);
add("calculo2","01 · Integração por partes","A fórmula ∫u dv = uv − ∫v du vem da regra do produto. Escolha u e dv para que a integral restante fique mais simples. Revise primitivas e regra do produto antes deste assunto.",2,"3-1-integration-by-parts",[
 ["Fácil","Qual fórmula expressa integração por partes?",["∫u dv = uv + ∫v du","∫u dv = uv − ∫v du","∫u dv = u/v","∫u dv = u′v′"],1,"A regra do produto, integrada, permite isolar ∫u dv com uma subtração."],
 ["Médio","Para ∫ x cos(x) dx, uma escolha conveniente é:",["u = cos(x), dv = dx","u = x, dv = dx","u = x, dv = cos(x) dx","u = 1, dv = x dx"],2,"Assim du = dx e v = sen(x); a integral restante é simples."],
 ["Médio","Qual é ∫ x cos(x) dx, em radianos?",["x sen(x) − cos(x) + C","sen(x) + C","x cos(x) + C","x sen(x) + cos(x) + C"],3,"Por partes: x sen(x) − ∫sen(x) dx = x sen(x) + cos(x) + C."],
 ["Difícil","Calcule ∫ de 0 a 1 de x eˣ dx.",["1","e","e − 1","0"],0,"Uma primitiva é (x − 1)eˣ. Avaliando: 0 − (−1) = 1."],
]);
add("calculo2","02 · Frações parciais","Fatore o denominador e decomponha a função racional em frações mais simples. Se o grau do numerador não for menor, comece pela divisão polinomial. Fatores repetidos exigem termos para cada potência.",2,"3-4-partial-fractions",[
 ["Fácil","Se o numerador tem grau maior que o denominador, comece por:",["Divisão polinomial","Ignorar o numerador","Extrair qualquer raiz","Derivar ambos"],0,"A divisão separa uma parte polinomial e uma fração própria."],
 ["Médio","Qual decomposição representa 1/[(x − 1)(x + 2)]?",["1/(x − 1) − 1/(x + 2)","1/[3(x − 1)] − 1/[3(x + 2)]","1/[3(x − 1)] + 1/[3(x + 2)]","3/(x − 1)"],1,"Iguale 1 = A(x + 2) + B(x − 1): A = 1/3 e B = −1/3."],
 ["Médio","A forma geral para decompor 1/[x(x + 1)²] inclui:",["A/x + B/(x + 1)","A/x² + B/(x + 1)","A/x + B/(x + 1) + C/(x + 1)²","A/(x + 1)³"],2,"O fator repetido exige termos de primeira e segunda potências."],
 ["Difícil","Qual é ∫ 1/[(x − 1)(x + 2)] dx?",["ln|x − 1| + C","ln|x + 2| + C","ln|(x − 1)/(x + 2)| + C","(1/3)ln|(x − 1)/(x + 2)| + C"],3,"Integre a decomposição: (1/3)ln|x − 1| − (1/3)ln|x + 2| + C."],
]);
add("calculo2","03 · Integrais impróprias","Limites infinitos ou integrandos ilimitados exigem limites. Convergência significa obter um valor finito. Quando há uma singularidade interna, avalie separadamente os dois lados.",2,"3-7-improper-integrals",[
 ["Fácil","Como se define ∫ de 2 a ∞ de f(x) dx?",["Substituindo x por ∞","Pelo limite de ∫ de 2 a b quando b → ∞","Sempre como zero","Como f(2)"],1,"O limite de integrais sobre intervalos finitos dá sentido à expressão."],
 ["Médio","Quanto vale ∫ de 2 a ∞ de 1/x² dx?",["2","1","1/2","Diverge"],2,"A primitiva é −1/x. O limite de −1/b + 1/2 é 1/2."],
 ["Médio","A integral ∫ de 1 a ∞ de 1/x dx:",["Vale 1","Vale 0","Vale π","Diverge"],3,"Sua avaliação até b é ln(b), que cresce sem limite."],
 ["Difícil","Quanto vale ∫ de 0 a 4 de 1/√x dx?",["4","2","8","Diverge"],0,"Use limite inferior ε → 0⁺: [2√x] de ε a 4 tende a 4."],
]);
add("calculo2","04 · Volumes por discos e arruelas","Ao girar uma região em torno de um eixo, use cortes perpendiculares. Discos têm área πR²; arruelas têm área π(R² − r²). Integre a área da seção ao longo do sólido.",2,"2-2-determining-volumes-by-slicing",[
 ["Fácil","Uma seção circular de raio R tem área:",["2πR","πR","πR²","R²/π"],2,"A fórmula da área do disco é π vezes o quadrado do raio."],
 ["Médio","Gire 0 ≤ y ≤ x, de x = 0 a x = 2, em torno do eixo x. Qual integral dá o volume?",["∫ de 0 a 2 de x dx","2π∫ de 0 a 2 de x dx","π∫ de 0 a 2 de x dx","π∫ de 0 a 2 de x² dx"],3,"Cada disco tem raio x, logo área πx²."],
 ["Médio","Qual volume resulta da rotação de 0 ≤ y ≤ x, 0 ≤ x ≤ 2, em torno do eixo x?",["8π/3","4π","2π","16π/3"],0,"Integre πx²: π[x³/3] de 0 a 2 = 8π/3."],
 ["Difícil","Uma arruela de raios externo 4 e interno 2 tem área:",["4π","12π","16π","20π"],1,"Subtraia as áreas: π(4² − 2²) = 12π."],
]);
add("calculo2","05 · Introdução às séries","Uma série soma termos de uma sequência. Estude as somas parciais. Numa série geométrica com |r| < 1, a soma é a/(1 − r), em que a é o primeiro termo.",2,"5-2-infinite-series",[
 ["Fácil","Na série 6 + 3 + 3/2 + ..., qual é a razão geométrica?",["1/2","2","3","6"],0,"Divida um termo pelo anterior: 3/6 = 1/2."],
 ["Médio","Quanto soma 6 + 3 + 3/2 + 3/4 + ...?",["9","12","6","Diverge"],1,"Use a/(1 − r) = 6/(1 − 1/2) = 12."],
 ["Médio","Se os termos aₙ não tendem a zero, a série Σaₙ:",["Converge sempre","Vale zero","Diverge","É geométrica"],2,"Termos tendendo a zero são condição necessária para convergência."],
 ["Difícil","Se aₙ → 0, isso garante que Σaₙ converge?",["Sim, sempre","Só se os termos forem positivos","Só se forem menores que 1","Não"],3,"A condição é necessária, mas insuficiente: a série harmônica é um contraexemplo."],
]);
add("calculo2","06 · Funções de várias variáveis: derivadas parciais","Algumas faculdades incluem este tema em Cálculo II; outras, no III. Ao derivar parcialmente em x, mantenha y constante. Revise regras de derivação antes de começar.",3,"4-3-partial-derivatives",[
 ["Fácil","Ao calcular ∂f/∂x para f(x,y), tratamos y como:",["Igual a x","Constante","Sempre zero","Uma integral"],1,"A derivada parcial varia somente x; as outras variáveis ficam fixas."],
 ["Médio","Se f(x,y) = 4x² + 3y², qual é ∂f/∂x?",["8x + 6y","4x","8x","6y"],2,"Derive 4x² em x; 3y² é constante nessa operação."],
 ["Médio","Para f(x,y) = xy², qual é ∂f/∂y?",["y²","x","2y","2xy"],3,"Mantenha x constante e derive y² para obter 2xy."],
 ["Difícil","Para f(x,y) = x²y³, quanto vale ∂²f/(∂y∂x) em (1,2)?",["24","12","8","6"],0,"Primeiro derive em x: 2xy³. Depois em y: 6xy². Em (1,2), vale 24."],
]);
