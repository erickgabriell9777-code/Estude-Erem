import type {Question,SubjectId} from "./study-data";
export const moreEngineeringTopics:{id:string;subject:SubjectId;name:string;summary:string}[] = [
  {
    "id": "topic-246",
    "subject": "geometria-analitica",
    "name": "Projeção ortogonal",
    "summary": "A projeção de u sobre v≠0 é [(u·v)/(v·v)]v. A componente escalar na direção de v é (u·v)/‖v‖."
  },
  {
    "id": "topic-247",
    "subject": "geometria-analitica",
    "name": "Combinações lineares e bases",
    "summary": "Escrever w=au+bv significa resolver um sistema para a e b. Dois vetores do plano formam uma base quando não são paralelos."
  },
  {
    "id": "topic-248",
    "subject": "geometria-analitica",
    "name": "Retas paramétricas no espaço",
    "summary": "Uma reta é r(t)=P+tv, com v≠0. Para testar um ponto, o mesmo parâmetro deve satisfazer todas as coordenadas."
  },
  {
    "id": "topic-249",
    "subject": "geometria-analitica",
    "name": "Posições relativas e interseções",
    "summary": "Retas espaciais podem ser coincidentes, paralelas distintas, concorrentes ou reversas. Retas reversas não se intersectam nem são coplanares."
  },
  {
    "id": "topic-250",
    "subject": "geometria-analitica",
    "name": "Esferas",
    "summary": "A esfera de centro (a,b,c) e raio r tem equação (x−a)²+(y−b)²+(z−c)²=r². Complete quadrados para identificar centro e raio."
  },
  {
    "id": "topic-251",
    "subject": "engenharia-economica",
    "name": "Financiamentos pelo SAC",
    "summary": "No SAC, a amortização é constante: dívida inicial dividida pelo número de parcelas. Os juros incidem sobre o saldo antes de cada pagamento."
  },
  {
    "id": "topic-252",
    "subject": "engenharia-economica",
    "name": "Financiamentos pela Tabela Price",
    "summary": "Com taxa fixa e parcelas postecipadas, A=P i/[1−(1+i)^−n]. Cada prestação reúne juros sobre o saldo e amortização."
  },
  {
    "id": "topic-253",
    "subject": "engenharia-economica",
    "name": "Fluxo de caixa descontado e recuperação",
    "summary": "Cada fluxo no fim do período t vale F_t/(1+i)^t em t=0. O payback descontado acumula esses valores até recuperar o desembolso inicial."
  },
  {
    "id": "topic-254",
    "subject": "engenharia-economica",
    "name": "Análise incremental de alternativas",
    "summary": "Para alternativas mutuamente excludentes com serviço e horizonte comparáveis, analise os fluxos da alternativa mais cara menos os da mais barata. VPL incremental positivo favorece o investimento adicional."
  },
  {
    "id": "topic-255",
    "subject": "engenharia-economica",
    "name": "Fluxos reais, nominais e inflação",
    "summary": "Fluxos em moeda constante devem ser descontados por uma taxa real; fluxos com inflação, por uma taxa nominal coerente. 1+i_nominal=(1+i_real)(1+inflação)."
  }
];
export const moreEngineeringQuestions:Question[] = [
  {
    "id": "engineering-more-1",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "O resíduo u−proj_v(u) é:",
    "options": [
      "Ortogonal a v",
      "Sempre igual a v",
      "Sempre unitário",
      "Paralelo a v em todos os casos"
    ],
    "answer": 0,
    "explanation": "A projeção remove a componente na direção de v.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-2",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "Se u é perpendicular a v≠0, sua projeção sobre v é:",
    "options": [
      "Um vetor unitário",
      "O vetor nulo",
      "O próprio v",
      "O próprio u"
    ],
    "answer": 1,
    "explanation": "Nesse caso u·v=0.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-3",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "Se u já é paralelo a v≠0, proj_v(u) é:",
    "options": [
      "Sempre −u",
      "Sempre v",
      "O próprio u",
      "Sempre zero"
    ],
    "answer": 2,
    "explanation": "Toda a componente de u está na direção projetada.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-4",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "É possível usar a fórmula de projeção sobre v=0?",
    "options": [
      "Sim, sempre dá u",
      "Sim, sempre dá 1",
      "Somente se u for unitário",
      "Não, o denominador seria zero"
    ],
    "answer": 3,
    "explanation": "A fórmula exige v·v>0.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-5",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "Qual a componente escalar de u=(5, 5) na direção de v=(3,4)?",
    "options": [
      "7",
      "8",
      "9",
      "10"
    ],
    "answer": 0,
    "explanation": "u·v=35 e ‖v‖=5. A componente é 35/5=7.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-6",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "Qual a componente escalar de u=(10, 5) na direção de v=(3,4)?",
    "options": [
      "13",
      "10",
      "11",
      "12"
    ],
    "answer": 1,
    "explanation": "u·v=50 e ‖v‖=5. A componente é 50/5=10.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-7",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "Qual a componente escalar de u=(15, 5) na direção de v=(3,4)?",
    "options": [
      "15",
      "16",
      "13",
      "14"
    ],
    "answer": 2,
    "explanation": "u·v=65 e ‖v‖=5. A componente é 65/5=13.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-8",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "Qual a componente escalar de u=(20, 5) na direção de v=(3,4)?",
    "options": [
      "17",
      "18",
      "19",
      "16"
    ],
    "answer": 3,
    "explanation": "u·v=80 e ‖v‖=5. A componente é 80/5=16.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-9",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "Qual a componente escalar de u=(25, 5) na direção de v=(3,4)?",
    "options": [
      "19",
      "20",
      "21",
      "22"
    ],
    "answer": 0,
    "explanation": "u·v=95 e ‖v‖=5. A componente é 95/5=19.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-10",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "Qual a componente escalar de u=(30, 5) na direção de v=(3,4)?",
    "options": [
      "25",
      "22",
      "23",
      "24"
    ],
    "answer": 1,
    "explanation": "u·v=110 e ‖v‖=5. A componente é 110/5=22.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-11",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "A projeção de u=(a,1) sobre v=(1,0) é (3,0). Qual é a?",
    "options": [
      "5",
      "6",
      "3",
      "4"
    ],
    "answer": 2,
    "explanation": "Projetar no eixo x preserva a primeira componente; portanto a=3.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-12",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "A projeção de u=(a,2) sobre v=(1,0) é (5,0). Qual é a?",
    "options": [
      "6",
      "7",
      "8",
      "5"
    ],
    "answer": 3,
    "explanation": "Projetar no eixo x preserva a primeira componente; portanto a=5.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-13",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "A projeção de u=(a,3) sobre v=(1,0) é (7,0). Qual é a?",
    "options": [
      "7",
      "8",
      "9",
      "10"
    ],
    "answer": 0,
    "explanation": "Projetar no eixo x preserva a primeira componente; portanto a=7.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-14",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "A projeção de u=(a,4) sobre v=(1,0) é (9,0). Qual é a?",
    "options": [
      "12",
      "9",
      "10",
      "11"
    ],
    "answer": 1,
    "explanation": "Projetar no eixo x preserva a primeira componente; portanto a=9.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-15",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "A projeção de u=(a,5) sobre v=(1,0) é (11,0). Qual é a?",
    "options": [
      "13",
      "14",
      "11",
      "12"
    ],
    "answer": 2,
    "explanation": "Projetar no eixo x preserva a primeira componente; portanto a=11.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-16",
    "subject": "geometria-analitica",
    "topic": "topic-246",
    "prompt": "A projeção de u=(a,6) sobre v=(1,0) é (13,0). Qual é a?",
    "options": [
      "14",
      "15",
      "16",
      "13"
    ],
    "answer": 3,
    "explanation": "Projetar no eixo x preserva a primeira componente; portanto a=13.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-17",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Dois vetores formam uma base de R² quando:",
    "options": [
      "São linearmente independentes",
      "São ambos nulos",
      "São proporcionais",
      "Têm sempre a mesma direção"
    ],
    "answer": 0,
    "explanation": "Uma base precisa gerar o plano e ter representação única.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-18",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Se u=(1,0) e v=(0,1), as coordenadas de (a,b) nessa base são:",
    "options": [
      "Somente a",
      "a e b",
      "b e a sempre",
      "a+b e a−b"
    ],
    "answer": 1,
    "explanation": "a(1,0)+b(0,1)=(a,b).",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-19",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Uma combinação linear usa:",
    "options": [
      "Apenas vetores de norma 1",
      "Somente coeficientes positivos",
      "Somas de múltiplos escalares de vetores",
      "Apenas produtos de matrizes quadradas"
    ],
    "answer": 2,
    "explanation": "Os coeficientes podem ser escalares reais quaisquer.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-20",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Na mesma base, um vetor tem quantas representações por coordenadas?",
    "options": [
      "Duas necessariamente",
      "Infinitas sempre",
      "Nenhuma",
      "Uma"
    ],
    "answer": 3,
    "explanation": "A independência linear garante unicidade.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-21",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Escreva w=(4,2) como au+bv, com u=(1,0) e v=(1,1). Qual a?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 0,
    "explanation": "Na segunda coordenada, b=2; na primeira, a=4−2=2.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-22",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Escreva w=(7,3) como au+bv, com u=(1,0) e v=(1,1). Qual a?",
    "options": [
      "7",
      "4",
      "5",
      "6"
    ],
    "answer": 1,
    "explanation": "Na segunda coordenada, b=3; na primeira, a=7−3=4.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-23",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Escreva w=(10,4) como au+bv, com u=(1,0) e v=(1,1). Qual a?",
    "options": [
      "8",
      "9",
      "6",
      "7"
    ],
    "answer": 2,
    "explanation": "Na segunda coordenada, b=4; na primeira, a=10−4=6.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-24",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Escreva w=(13,5) como au+bv, com u=(1,0) e v=(1,1). Qual a?",
    "options": [
      "9",
      "10",
      "11",
      "8"
    ],
    "answer": 3,
    "explanation": "Na segunda coordenada, b=5; na primeira, a=13−5=8.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-25",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Escreva w=(16,6) como au+bv, com u=(1,0) e v=(1,1). Qual a?",
    "options": [
      "10",
      "11",
      "12",
      "13"
    ],
    "answer": 0,
    "explanation": "Na segunda coordenada, b=6; na primeira, a=16−6=10.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-26",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Escreva w=(19,7) como au+bv, com u=(1,0) e v=(1,1). Qual a?",
    "options": [
      "15",
      "12",
      "13",
      "14"
    ],
    "answer": 1,
    "explanation": "Na segunda coordenada, b=7; na primeira, a=19−7=12.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-27",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Na base u=(1,1), v=(1,−1), o vetor w=(4,2) tem coordenadas (a,b). Qual é b?",
    "options": [
      "3",
      "4",
      "1",
      "2"
    ],
    "answer": 2,
    "explanation": "a+b=4 e a−b=2; subtraindo, 2b=2, então b=1.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-28",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Na base u=(1,1), v=(1,−1), o vetor w=(8,4) tem coordenadas (a,b). Qual é b?",
    "options": [
      "3",
      "4",
      "5",
      "2"
    ],
    "answer": 3,
    "explanation": "a+b=8 e a−b=4; subtraindo, 2b=4, então b=2.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-29",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Na base u=(1,1), v=(1,−1), o vetor w=(12,6) tem coordenadas (a,b). Qual é b?",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 0,
    "explanation": "a+b=12 e a−b=6; subtraindo, 2b=6, então b=3.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-30",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Na base u=(1,1), v=(1,−1), o vetor w=(16,8) tem coordenadas (a,b). Qual é b?",
    "options": [
      "7",
      "4",
      "5",
      "6"
    ],
    "answer": 1,
    "explanation": "a+b=16 e a−b=8; subtraindo, 2b=8, então b=4.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-31",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Na base u=(1,1), v=(1,−1), o vetor w=(20,10) tem coordenadas (a,b). Qual é b?",
    "options": [
      "7",
      "8",
      "5",
      "6"
    ],
    "answer": 2,
    "explanation": "a+b=20 e a−b=10; subtraindo, 2b=10, então b=5.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-32",
    "subject": "geometria-analitica",
    "topic": "topic-247",
    "prompt": "Na base u=(1,1), v=(1,−1), o vetor w=(24,12) tem coordenadas (a,b). Qual é b?",
    "options": [
      "7",
      "8",
      "9",
      "6"
    ],
    "answer": 3,
    "explanation": "a+b=24 e a−b=12; subtraindo, 2b=12, então b=6.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-33",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na expressão r(t)=P+tv, v é:",
    "options": [
      "Um vetor diretor",
      "O único ponto da reta",
      "O raio da reta",
      "Uma área"
    ],
    "answer": 0,
    "explanation": "Mudar t desloca o ponto na direção de v.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-34",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Qual condição é necessária para r(t)=P+tv representar uma reta?",
    "options": [
      "‖v‖=1 obrigatoriamente",
      "v≠0",
      "P=0",
      "t positivo apenas"
    ],
    "answer": 1,
    "explanation": "Com v=0, obtém-se apenas um ponto.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-35",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Ao trocar v por 2v em r(t), com t real, a reta:",
    "options": [
      "Vira um plano",
      "Desaparece",
      "Permanece a mesma",
      "Sempre muda de direção"
    ],
    "answer": 2,
    "explanation": "O novo parâmetro percorre os mesmos pontos com outra escala.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-36",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Para testar um ponto numa reta paramétrica, é preciso:",
    "options": [
      "Um t diferente em cada coordenada",
      "Somente conferir x",
      "Ignorar o vetor diretor",
      "Um mesmo t nas três coordenadas"
    ],
    "answer": 3,
    "explanation": "As equações devem ser simultaneamente satisfeitas.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-37",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(1,2,3)+t(2,−1,1), qual z quando t=2?",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "answer": 0,
    "explanation": "z=3+2×1=5.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-38",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(1,2,3)+t(2,−1,2), qual z quando t=2?",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "answer": 1,
    "explanation": "z=3+2×2=7.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-39",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(1,2,3)+t(2,−1,3), qual z quando t=2?",
    "options": [
      "11",
      "12",
      "9",
      "10"
    ],
    "answer": 2,
    "explanation": "z=3+2×3=9.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-40",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(1,2,3)+t(2,−1,4), qual z quando t=2?",
    "options": [
      "12",
      "13",
      "14",
      "11"
    ],
    "answer": 3,
    "explanation": "z=3+2×4=11.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-41",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(1,2,3)+t(2,−1,5), qual z quando t=2?",
    "options": [
      "13",
      "14",
      "15",
      "16"
    ],
    "answer": 0,
    "explanation": "z=3+2×5=13.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-42",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(1,2,3)+t(2,−1,6), qual z quando t=2?",
    "options": [
      "18",
      "15",
      "16",
      "17"
    ],
    "answer": 1,
    "explanation": "z=3+2×6=15.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-43",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(1,0,1)+t(2,3,−1), um ponto tem x=9. Qual sua coordenada y?",
    "options": [
      "14",
      "15",
      "12",
      "13"
    ],
    "answer": 2,
    "explanation": "1+2t=9 dá t=4; assim y=3×4=12.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-44",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(2,0,1)+t(2,3,−1), um ponto tem x=10. Qual sua coordenada y?",
    "options": [
      "13",
      "14",
      "15",
      "12"
    ],
    "answer": 3,
    "explanation": "2+2t=10 dá t=4; assim y=3×4=12.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-45",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(3,0,1)+t(2,3,−1), um ponto tem x=11. Qual sua coordenada y?",
    "options": [
      "12",
      "13",
      "14",
      "15"
    ],
    "answer": 0,
    "explanation": "3+2t=11 dá t=4; assim y=3×4=12.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-46",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(4,0,1)+t(2,3,−1), um ponto tem x=12. Qual sua coordenada y?",
    "options": [
      "15",
      "12",
      "13",
      "14"
    ],
    "answer": 1,
    "explanation": "4+2t=12 dá t=4; assim y=3×4=12.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-47",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(5,0,1)+t(2,3,−1), um ponto tem x=13. Qual sua coordenada y?",
    "options": [
      "14",
      "15",
      "12",
      "13"
    ],
    "answer": 2,
    "explanation": "5+2t=13 dá t=4; assim y=3×4=12.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-48",
    "subject": "geometria-analitica",
    "topic": "topic-248",
    "prompt": "Na reta r(t)=(6,0,1)+t(2,3,−1), um ponto tem x=14. Qual sua coordenada y?",
    "options": [
      "13",
      "14",
      "15",
      "12"
    ],
    "answer": 3,
    "explanation": "6+2t=14 dá t=4; assim y=3×4=12.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-49",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Retas reversas existem em:",
    "options": [
      "Espaço tridimensional",
      "Um plano euclidiano",
      "Uma única reta numérica",
      "Somente circunferências"
    ],
    "answer": 0,
    "explanation": "Em um plano, retas distintas são paralelas ou concorrentes.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-50",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Retas coincidentes compartilham:",
    "options": [
      "Dois pontos apenas",
      "Todos os pontos",
      "Um único ponto",
      "Nenhum ponto"
    ],
    "answer": 1,
    "explanation": "Elas são o mesmo conjunto geométrico.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-51",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Duas retas não paralelas no mesmo plano:",
    "options": [
      "Nunca se intersectam",
      "São coincidentes",
      "Se intersectam em um ponto",
      "São necessariamente reversas"
    ],
    "answer": 2,
    "explanation": "A não paralelidade, com coplanaridade, garante interseção única.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-52",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Vetores diretores proporcionais indicam retas:",
    "options": [
      "Sempre perpendiculares",
      "Sempre reversas",
      "Sempre concorrentes distintas",
      "Paralelas ou coincidentes"
    ],
    "answer": 3,
    "explanation": "É necessário verificar um ponto para distinguir coincidência de paralelismo distinto.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-53",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Em que abscissa as retas y=2x+1 e y=−x+4 se encontram?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": 0,
    "explanation": "2x+1=−x+4; logo 3x=3 e x=1.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-54",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Em que abscissa as retas y=2x+2 e y=−x+8 se encontram?",
    "options": [
      "5",
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "explanation": "2x+2=−x+8; logo 3x=6 e x=2.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-55",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Em que abscissa as retas y=2x+3 e y=−x+12 se encontram?",
    "options": [
      "5",
      "6",
      "3",
      "4"
    ],
    "answer": 2,
    "explanation": "2x+3=−x+12; logo 3x=9 e x=3.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-56",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Em que abscissa as retas y=2x+4 e y=−x+16 se encontram?",
    "options": [
      "5",
      "6",
      "7",
      "4"
    ],
    "answer": 3,
    "explanation": "2x+4=−x+16; logo 3x=12 e x=4.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-57",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Em que abscissa as retas y=2x+5 e y=−x+20 se encontram?",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "answer": 0,
    "explanation": "2x+5=−x+20; logo 3x=15 e x=5.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-58",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "Em que abscissa as retas y=2x+6 e y=−x+24 se encontram?",
    "options": [
      "9",
      "6",
      "7",
      "8"
    ],
    "answer": 1,
    "explanation": "2x+6=−x+24; logo 3x=18 e x=6.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-59",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "As retas y=2x+2 e y=2x+b passam pelo mesmo ponto (0,2). Qual é b?",
    "options": [
      "4",
      "5",
      "2",
      "3"
    ],
    "answer": 2,
    "explanation": "Em x=0, y=b. Como o ponto é (0,2), b=2, e as retas coincidem.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-60",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "As retas y=3x+2 e y=3x+b passam pelo mesmo ponto (0,2). Qual é b?",
    "options": [
      "3",
      "4",
      "5",
      "2"
    ],
    "answer": 3,
    "explanation": "Em x=0, y=b. Como o ponto é (0,2), b=2, e as retas coincidem.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-61",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "As retas y=4x+2 e y=4x+b passam pelo mesmo ponto (0,2). Qual é b?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 0,
    "explanation": "Em x=0, y=b. Como o ponto é (0,2), b=2, e as retas coincidem.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-62",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "As retas y=5x+2 e y=5x+b passam pelo mesmo ponto (0,2). Qual é b?",
    "options": [
      "5",
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "explanation": "Em x=0, y=b. Como o ponto é (0,2), b=2, e as retas coincidem.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-63",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "As retas y=6x+2 e y=6x+b passam pelo mesmo ponto (0,2). Qual é b?",
    "options": [
      "4",
      "5",
      "2",
      "3"
    ],
    "answer": 2,
    "explanation": "Em x=0, y=b. Como o ponto é (0,2), b=2, e as retas coincidem.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-64",
    "subject": "geometria-analitica",
    "topic": "topic-249",
    "prompt": "As retas y=7x+2 e y=7x+b passam pelo mesmo ponto (0,2). Qual é b?",
    "options": [
      "3",
      "4",
      "5",
      "2"
    ],
    "answer": 3,
    "explanation": "Em x=0, y=b. Como o ponto é (0,2), b=2, e as retas coincidem.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-65",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Uma esfera é o conjunto dos pontos do espaço que:",
    "options": [
      "Têm distância fixa do centro",
      "Têm a mesma coordenada x",
      "Estão somente dentro de um círculo",
      "Formam sempre um plano"
    ],
    "answer": 0,
    "explanation": "A distância fixa é o raio.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-66",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Se um plano passa pelo centro de uma esfera de raio r, a seção é:",
    "options": [
      "Uma reta",
      "Uma circunferência de raio r",
      "Um ponto",
      "Uma elipse de eixos diferentes"
    ],
    "answer": 1,
    "explanation": "A seção central tem o maior raio possível.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-67",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Um plano a uma distância do centro maior que o raio:",
    "options": [
      "Sempre corta um círculo",
      "Contém o centro",
      "Não intersecta a esfera",
      "É tangente"
    ],
    "answer": 2,
    "explanation": "Não há pontos comuns quando d>r.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-68",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Uma esfera de raio positivo tangencia um plano quando:",
    "options": [
      "A distância é zero",
      "A distância é o dobro do raio",
      "Qualquer distância serve",
      "A distância do centro ao plano é igual ao raio"
    ],
    "answer": 3,
    "explanation": "Nesse caso existe um único ponto de contato.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-69",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Qual o raio da esfera (x−1)²+y²+(z+1)²=9?",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 0,
    "explanation": "O raio é a raiz positiva de 9, isto é, 3.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-70",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Qual o raio da esfera (x−2)²+y²+(z+1)²=16?",
    "options": [
      "7",
      "4",
      "5",
      "6"
    ],
    "answer": 1,
    "explanation": "O raio é a raiz positiva de 16, isto é, 4.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-71",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Qual o raio da esfera (x−3)²+y²+(z+1)²=25?",
    "options": [
      "7",
      "8",
      "5",
      "6"
    ],
    "answer": 2,
    "explanation": "O raio é a raiz positiva de 25, isto é, 5.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-72",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Qual o raio da esfera (x−4)²+y²+(z+1)²=36?",
    "options": [
      "7",
      "8",
      "9",
      "6"
    ],
    "answer": 3,
    "explanation": "O raio é a raiz positiva de 36, isto é, 6.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-73",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Qual o raio da esfera (x−5)²+y²+(z+1)²=49?",
    "options": [
      "7",
      "8",
      "9",
      "10"
    ],
    "answer": 0,
    "explanation": "O raio é a raiz positiva de 49, isto é, 7.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-74",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Qual o raio da esfera (x−6)²+y²+(z+1)²=64?",
    "options": [
      "11",
      "8",
      "9",
      "10"
    ],
    "answer": 1,
    "explanation": "O raio é a raiz positiva de 64, isto é, 8.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-75",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Na esfera de centro (1,0,0) e raio 3, qual a maior abscissa de um ponto?",
    "options": [
      "6",
      "7",
      "4",
      "5"
    ],
    "answer": 2,
    "explanation": "A maior abscissa é x_c+r=1+3=4.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-76",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Na esfera de centro (2,0,0) e raio 4, qual a maior abscissa de um ponto?",
    "options": [
      "7",
      "8",
      "9",
      "6"
    ],
    "answer": 3,
    "explanation": "A maior abscissa é x_c+r=2+4=6.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-77",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Na esfera de centro (3,0,0) e raio 5, qual a maior abscissa de um ponto?",
    "options": [
      "8",
      "9",
      "10",
      "11"
    ],
    "answer": 0,
    "explanation": "A maior abscissa é x_c+r=3+5=8.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-78",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Na esfera de centro (4,0,0) e raio 6, qual a maior abscissa de um ponto?",
    "options": [
      "13",
      "10",
      "11",
      "12"
    ],
    "answer": 1,
    "explanation": "A maior abscissa é x_c+r=4+6=10.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-79",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Na esfera de centro (5,0,0) e raio 7, qual a maior abscissa de um ponto?",
    "options": [
      "14",
      "15",
      "12",
      "13"
    ],
    "answer": 2,
    "explanation": "A maior abscissa é x_c+r=5+7=12.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-80",
    "subject": "geometria-analitica",
    "topic": "topic-250",
    "prompt": "Na esfera de centro (6,0,0) e raio 8, qual a maior abscissa de um ponto?",
    "options": [
      "15",
      "16",
      "17",
      "14"
    ],
    "answer": 3,
    "explanation": "A maior abscissa é x_c+r=6+8=14.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-81",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, com taxa fixa positiva e sem pagamentos extras, as prestações:",
    "options": [
      "Diminuem ao longo do tempo",
      "São necessariamente constantes",
      "Aumentam sempre",
      "São todas iguais à amortização"
    ],
    "answer": 0,
    "explanation": "A amortização é fixa e os juros caem com o saldo.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-82",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, o saldo após uma prestação diminui pelo valor:",
    "options": [
      "Da taxa em porcentagem",
      "Da amortização",
      "Dos juros apenas",
      "Da prestação inteira"
    ],
    "answer": 1,
    "explanation": "A parte dos juros remunera o capital, não reduz o principal.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-83",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "A primeira prestação no SAC é composta por:",
    "options": [
      "Somente amortização",
      "Valor residual e inflação sempre",
      "Amortização e juros sobre a dívida inicial",
      "Somente juros"
    ],
    "answer": 2,
    "explanation": "Antes do primeiro pagamento, o saldo é o principal inicial.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-84",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "Sem juros, as prestações do SAC são:",
    "options": [
      "Sempre crescentes",
      "Sempre decrescentes",
      "Nulas",
      "Iguais à amortização constante"
    ],
    "answer": 3,
    "explanation": "Se i=0, a parcela de juros é zero.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-85",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, uma dívida de R$ 6000 será paga em 6 parcelas mensais, a 2% ao mês. Qual a primeira prestação, em reais?",
    "options": [
      "1120",
      "1121",
      "1122",
      "1123"
    ],
    "answer": 0,
    "explanation": "Amortização=6000/6=1000; juros=6000×0,02=120. Prestação=1120.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-86",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, uma dívida de R$ 12000 será paga em 6 parcelas mensais, a 2% ao mês. Qual a primeira prestação, em reais?",
    "options": [
      "2243",
      "2240",
      "2241",
      "2242"
    ],
    "answer": 1,
    "explanation": "Amortização=12000/6=2000; juros=12000×0,02=240. Prestação=2240.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-87",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, uma dívida de R$ 18000 será paga em 6 parcelas mensais, a 2% ao mês. Qual a primeira prestação, em reais?",
    "options": [
      "3362",
      "3363",
      "3360",
      "3361"
    ],
    "answer": 2,
    "explanation": "Amortização=18000/6=3000; juros=18000×0,02=360. Prestação=3360.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-88",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, uma dívida de R$ 24000 será paga em 6 parcelas mensais, a 2% ao mês. Qual a primeira prestação, em reais?",
    "options": [
      "4481",
      "4482",
      "4483",
      "4480"
    ],
    "answer": 3,
    "explanation": "Amortização=24000/6=4000; juros=24000×0,02=480. Prestação=4480.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-89",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, uma dívida de R$ 30000 será paga em 6 parcelas mensais, a 2% ao mês. Qual a primeira prestação, em reais?",
    "options": [
      "5600",
      "5601",
      "5602",
      "5603"
    ],
    "answer": 0,
    "explanation": "Amortização=30000/6=5000; juros=30000×0,02=600. Prestação=5600.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-90",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, uma dívida de R$ 36000 será paga em 6 parcelas mensais, a 2% ao mês. Qual a primeira prestação, em reais?",
    "options": [
      "6723",
      "6720",
      "6721",
      "6722"
    ],
    "answer": 1,
    "explanation": "Amortização=36000/6=6000; juros=36000×0,02=720. Prestação=6720.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-91",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, dívida inicial de R$ 6000, 6 parcelas e taxa de 2% ao mês. Qual a terceira prestação, em reais?",
    "options": [
      "1082",
      "1083",
      "1080",
      "1081"
    ],
    "answer": 2,
    "explanation": "Após duas amortizações de 1000, o saldo é 4000. Juros=80; prestação=1000+80=1080.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-92",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, dívida inicial de R$ 12000, 6 parcelas e taxa de 2% ao mês. Qual a terceira prestação, em reais?",
    "options": [
      "2161",
      "2162",
      "2163",
      "2160"
    ],
    "answer": 3,
    "explanation": "Após duas amortizações de 2000, o saldo é 8000. Juros=160; prestação=2000+160=2160.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-93",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, dívida inicial de R$ 18000, 6 parcelas e taxa de 2% ao mês. Qual a terceira prestação, em reais?",
    "options": [
      "3240",
      "3241",
      "3242",
      "3243"
    ],
    "answer": 0,
    "explanation": "Após duas amortizações de 3000, o saldo é 12000. Juros=240; prestação=3000+240=3240.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-94",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, dívida inicial de R$ 24000, 6 parcelas e taxa de 2% ao mês. Qual a terceira prestação, em reais?",
    "options": [
      "4323",
      "4320",
      "4321",
      "4322"
    ],
    "answer": 1,
    "explanation": "Após duas amortizações de 4000, o saldo é 16000. Juros=320; prestação=4000+320=4320.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-95",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, dívida inicial de R$ 30000, 6 parcelas e taxa de 2% ao mês. Qual a terceira prestação, em reais?",
    "options": [
      "5402",
      "5403",
      "5400",
      "5401"
    ],
    "answer": 2,
    "explanation": "Após duas amortizações de 5000, o saldo é 20000. Juros=400; prestação=5000+400=5400.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-96",
    "subject": "engenharia-economica",
    "topic": "topic-251",
    "prompt": "No SAC, dívida inicial de R$ 36000, 6 parcelas e taxa de 2% ao mês. Qual a terceira prestação, em reais?",
    "options": [
      "6481",
      "6482",
      "6483",
      "6480"
    ],
    "answer": 3,
    "explanation": "Após duas amortizações de 6000, o saldo é 24000. Juros=480; prestação=6000+480=6480.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-97",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na Tabela Price com taxa fixa, as prestações são:",
    "options": [
      "Constantes",
      "Sempre decrescentes",
      "Sempre crescentes",
      "Iguais aos juros sempre"
    ],
    "answer": 0,
    "explanation": "O modelo fixa o valor da prestação postecipada.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-98",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na Price usual, sem atraso e com taxa positiva, a amortização:",
    "options": [
      "É igual à prestação desde o início",
      "Aumenta conforme o saldo cai",
      "Diminui sempre",
      "É zero em todas as parcelas"
    ],
    "answer": 1,
    "explanation": "Os juros diminuem, liberando uma parte maior da prestação para amortizar.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-99",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na fórmula Price, a taxa deve ter periodicidade:",
    "options": [
      "Sempre diária",
      "Irrelevante",
      "Igual à das prestações",
      "Sempre anual, sem conversão"
    ],
    "answer": 2,
    "explanation": "Use a taxa efetiva correspondente ao intervalo entre pagamentos.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-100",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Uma prestação Price é calculada a partir de:",
    "options": [
      "Somente do principal",
      "Somente do nome do banco",
      "Somente do valor residual",
      "Principal, taxa e número de períodos"
    ],
    "answer": 3,
    "explanation": "Essas três grandezas determinam a série uniforme equivalente.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-101",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Um financiamento Price de R$ 2100, em duas parcelas anuais a 10% ao ano, tem qual prestação anual em reais?",
    "options": [
      "1210",
      "1211",
      "1212",
      "1213"
    ],
    "answer": 0,
    "explanation": "A=P×0,1/[1−1,1^−2]. Para P=2100, A=1210; VP das parcelas equivale ao principal.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-102",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Um financiamento Price de R$ 4200, em duas parcelas anuais a 10% ao ano, tem qual prestação anual em reais?",
    "options": [
      "2423",
      "2420",
      "2421",
      "2422"
    ],
    "answer": 1,
    "explanation": "A=P×0,1/[1−1,1^−2]. Para P=4200, A=2420; VP das parcelas equivale ao principal.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-103",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Um financiamento Price de R$ 6300, em duas parcelas anuais a 10% ao ano, tem qual prestação anual em reais?",
    "options": [
      "3632",
      "3633",
      "3630",
      "3631"
    ],
    "answer": 2,
    "explanation": "A=P×0,1/[1−1,1^−2]. Para P=6300, A=3630; VP das parcelas equivale ao principal.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-104",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Um financiamento Price de R$ 8400, em duas parcelas anuais a 10% ao ano, tem qual prestação anual em reais?",
    "options": [
      "4841",
      "4842",
      "4843",
      "4840"
    ],
    "answer": 3,
    "explanation": "A=P×0,1/[1−1,1^−2]. Para P=8400, A=4840; VP das parcelas equivale ao principal.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-105",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Um financiamento Price de R$ 10500, em duas parcelas anuais a 10% ao ano, tem qual prestação anual em reais?",
    "options": [
      "6050",
      "6051",
      "6052",
      "6053"
    ],
    "answer": 0,
    "explanation": "A=P×0,1/[1−1,1^−2]. Para P=10500, A=6050; VP das parcelas equivale ao principal.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-106",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Um financiamento Price de R$ 12600, em duas parcelas anuais a 10% ao ano, tem qual prestação anual em reais?",
    "options": [
      "7263",
      "7260",
      "7261",
      "7262"
    ],
    "answer": 1,
    "explanation": "A=P×0,1/[1−1,1^−2]. Para P=12600, A=7260; VP das parcelas equivale ao principal.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-107",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na Price, saldo antes de uma parcela é R$ 10000, prestação R$ 1500 e taxa mensal de 2%. Qual a amortização dessa parcela, em reais?",
    "options": [
      "1302",
      "1303",
      "1300",
      "1301"
    ],
    "answer": 2,
    "explanation": "Juros=10000×0,02=200; amortização=1500−200=1300.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-108",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na Price, saldo antes de uma parcela é R$ 20000, prestação R$ 3000 e taxa mensal de 2%. Qual a amortização dessa parcela, em reais?",
    "options": [
      "2601",
      "2602",
      "2603",
      "2600"
    ],
    "answer": 3,
    "explanation": "Juros=20000×0,02=400; amortização=3000−400=2600.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-109",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na Price, saldo antes de uma parcela é R$ 30000, prestação R$ 4500 e taxa mensal de 2%. Qual a amortização dessa parcela, em reais?",
    "options": [
      "3900",
      "3901",
      "3902",
      "3903"
    ],
    "answer": 0,
    "explanation": "Juros=30000×0,02=600; amortização=4500−600=3900.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-110",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na Price, saldo antes de uma parcela é R$ 40000, prestação R$ 6000 e taxa mensal de 2%. Qual a amortização dessa parcela, em reais?",
    "options": [
      "5203",
      "5200",
      "5201",
      "5202"
    ],
    "answer": 1,
    "explanation": "Juros=40000×0,02=800; amortização=6000−800=5200.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-111",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na Price, saldo antes de uma parcela é R$ 50000, prestação R$ 7500 e taxa mensal de 2%. Qual a amortização dessa parcela, em reais?",
    "options": [
      "6502",
      "6503",
      "6500",
      "6501"
    ],
    "answer": 2,
    "explanation": "Juros=50000×0,02=1000; amortização=7500−1000=6500.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-112",
    "subject": "engenharia-economica",
    "topic": "topic-252",
    "prompt": "Na Price, saldo antes de uma parcela é R$ 60000, prestação R$ 9000 e taxa mensal de 2%. Qual a amortização dessa parcela, em reais?",
    "options": [
      "7801",
      "7802",
      "7803",
      "7800"
    ],
    "answer": 3,
    "explanation": "Juros=60000×0,02=1200; amortização=9000−1200=7800.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-113",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Com taxa positiva, o valor presente de uma entrada futura positiva é:",
    "options": [
      "Menor que seu valor futuro",
      "Sempre maior",
      "Sempre igual",
      "Sempre negativo"
    ],
    "answer": 0,
    "explanation": "O divisor (1+i)^t é maior que 1 para t>0.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-114",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "No payback descontado, cada entrada deve ser:",
    "options": [
      "Multiplicada apenas pela inflação",
      "Trazida à mesma data-base",
      "Somada nominalmente sempre",
      "Ignorada após um mês"
    ],
    "answer": 1,
    "explanation": "Comparar valores requer equivalência temporal.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-115",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Se as entradas descontadas não cobrem o investimento no horizonte, então:",
    "options": [
      "O projeto tem lucro garantido",
      "O investimento não existiu",
      "Não há recuperação nesse horizonte",
      "O payback é necessariamente zero"
    ],
    "answer": 2,
    "explanation": "A soma acumulada permaneceu abaixo do desembolso.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-116",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Recuperar o investimento cedo, isoladamente, permite afirmar maior VPL?",
    "options": [
      "Sim, em qualquer caso",
      "Sim, mesmo sem fluxos conhecidos",
      "Somente olhando o preço do ativo",
      "Não"
    ],
    "answer": 3,
    "explanation": "VPL também depende do tamanho e do momento dos demais fluxos.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-117",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Qual o valor presente de R$ 1210 recebidos ao fim de dois anos, a 10% ao ano, em reais?",
    "options": [
      "1000",
      "1001",
      "1002",
      "1003"
    ],
    "answer": 0,
    "explanation": "VP=1210/1,1²=1000.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-118",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Qual o valor presente de R$ 2420 recebidos ao fim de dois anos, a 10% ao ano, em reais?",
    "options": [
      "2003",
      "2000",
      "2001",
      "2002"
    ],
    "answer": 1,
    "explanation": "VP=2420/1,1²=2000.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-119",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Qual o valor presente de R$ 3630 recebidos ao fim de dois anos, a 10% ao ano, em reais?",
    "options": [
      "3002",
      "3003",
      "3000",
      "3001"
    ],
    "answer": 2,
    "explanation": "VP=3630/1,1²=3000.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-120",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Qual o valor presente de R$ 4840 recebidos ao fim de dois anos, a 10% ao ano, em reais?",
    "options": [
      "4001",
      "4002",
      "4003",
      "4000"
    ],
    "answer": 3,
    "explanation": "VP=4840/1,1²=4000.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-121",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Qual o valor presente de R$ 6050 recebidos ao fim de dois anos, a 10% ao ano, em reais?",
    "options": [
      "5000",
      "5001",
      "5002",
      "5003"
    ],
    "answer": 0,
    "explanation": "VP=6050/1,1²=5000.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-122",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Qual o valor presente de R$ 7260 recebidos ao fim de dois anos, a 10% ao ano, em reais?",
    "options": [
      "6003",
      "6000",
      "6001",
      "6002"
    ],
    "answer": 1,
    "explanation": "VP=7260/1,1²=6000.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-123",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Investem-se R$ 1000 hoje para receber R$ 550 em um ano e R$ 605 em dois anos. A 10% ao ano, ao fim de qual ano ocorre a recuperação descontada?",
    "options": [
      "4",
      "5",
      "2",
      "3"
    ],
    "answer": 2,
    "explanation": "Após um ano, acumulam-se 500; após dois, 500+500=1000, cobrindo exatamente o investimento.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-124",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Investem-se R$ 2000 hoje para receber R$ 1100 em um ano e R$ 1210 em dois anos. A 10% ao ano, ao fim de qual ano ocorre a recuperação descontada?",
    "options": [
      "3",
      "4",
      "5",
      "2"
    ],
    "answer": 3,
    "explanation": "Após um ano, acumulam-se 1000; após dois, 1000+1000=2000, cobrindo exatamente o investimento.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-125",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Investem-se R$ 3000 hoje para receber R$ 1650 em um ano e R$ 1815 em dois anos. A 10% ao ano, ao fim de qual ano ocorre a recuperação descontada?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 0,
    "explanation": "Após um ano, acumulam-se 1500; após dois, 1500+1500=3000, cobrindo exatamente o investimento.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-126",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Investem-se R$ 4000 hoje para receber R$ 2200 em um ano e R$ 2420 em dois anos. A 10% ao ano, ao fim de qual ano ocorre a recuperação descontada?",
    "options": [
      "5",
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "explanation": "Após um ano, acumulam-se 2000; após dois, 2000+2000=4000, cobrindo exatamente o investimento.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-127",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Investem-se R$ 5000 hoje para receber R$ 2750 em um ano e R$ 3025 em dois anos. A 10% ao ano, ao fim de qual ano ocorre a recuperação descontada?",
    "options": [
      "4",
      "5",
      "2",
      "3"
    ],
    "answer": 2,
    "explanation": "Após um ano, acumulam-se 2500; após dois, 2500+2500=5000, cobrindo exatamente o investimento.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-128",
    "subject": "engenharia-economica",
    "topic": "topic-253",
    "prompt": "Investem-se R$ 6000 hoje para receber R$ 3300 em um ano e R$ 3630 em dois anos. A 10% ao ano, ao fim de qual ano ocorre a recuperação descontada?",
    "options": [
      "3",
      "4",
      "5",
      "2"
    ],
    "answer": 3,
    "explanation": "Após um ano, acumulam-se 3000; após dois, 3000+3000=6000, cobrindo exatamente o investimento.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-129",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "Para formar o fluxo incremental B−A, deve-se:",
    "options": [
      "Subtrair fluxos nas mesmas datas",
      "Somar todas as receitas e ignorar custos",
      "Subtrair somente os investimentos iniciais",
      "Comparar apenas as taxas anunciadas"
    ],
    "answer": 0,
    "explanation": "O fluxo adicional inclui todos os efeitos diferenciais relevantes.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-130",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "Um custo já incorrido e irrecuperável deve, em regra, na decisão futura:",
    "options": [
      "Determinar sozinho a escolha",
      "Ser excluído da comparação incremental",
      "Ser cobrado duas vezes",
      "Ser tratado como receita"
    ],
    "answer": 1,
    "explanation": "Custo afundado não muda entre as alternativas futuras.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-131",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "Com VPL incremental negativo à TMA, o investimento adicional:",
    "options": [
      "Tem retorno garantido acima da TMA",
      "Não tem custos",
      "Não se justifica por esse critério",
      "É sempre obrigatório"
    ],
    "answer": 2,
    "explanation": "Os ganhos incrementais descontados não cobrem o custo extra.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-132",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "Uma comparação de alternativas exige, entre outros cuidados:",
    "options": [
      "Ignorar vidas úteis",
      "Comparar valores de datas distintas sem ajuste",
      "Escolher sempre o menor desembolso inicial",
      "Serviço e horizontes de comparação coerentes"
    ],
    "answer": 3,
    "explanation": "A equivalência do serviço e do tempo evita comparações inadequadas.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-133",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige investimento adicional de R$ 1000 em relação a A e gera ganho adicional de R$ 1210 daqui a um ano. A 10% ao ano, qual o VPL incremental, em reais?",
    "options": [
      "100",
      "101",
      "102",
      "103"
    ],
    "answer": 0,
    "explanation": "VPL(B−A)=−1000+1210/1,1=100.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-134",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige investimento adicional de R$ 2000 em relação a A e gera ganho adicional de R$ 2420 daqui a um ano. A 10% ao ano, qual o VPL incremental, em reais?",
    "options": [
      "203",
      "200",
      "201",
      "202"
    ],
    "answer": 1,
    "explanation": "VPL(B−A)=−2000+2420/1,1=200.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-135",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige investimento adicional de R$ 3000 em relação a A e gera ganho adicional de R$ 3630 daqui a um ano. A 10% ao ano, qual o VPL incremental, em reais?",
    "options": [
      "302",
      "303",
      "300",
      "301"
    ],
    "answer": 2,
    "explanation": "VPL(B−A)=−3000+3630/1,1=300.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-136",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige investimento adicional de R$ 4000 em relação a A e gera ganho adicional de R$ 4840 daqui a um ano. A 10% ao ano, qual o VPL incremental, em reais?",
    "options": [
      "401",
      "402",
      "403",
      "400"
    ],
    "answer": 3,
    "explanation": "VPL(B−A)=−4000+4840/1,1=400.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-137",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige investimento adicional de R$ 5000 em relação a A e gera ganho adicional de R$ 6050 daqui a um ano. A 10% ao ano, qual o VPL incremental, em reais?",
    "options": [
      "500",
      "501",
      "502",
      "503"
    ],
    "answer": 0,
    "explanation": "VPL(B−A)=−5000+6050/1,1=500.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-138",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige investimento adicional de R$ 6000 em relação a A e gera ganho adicional de R$ 7260 daqui a um ano. A 10% ao ano, qual o VPL incremental, em reais?",
    "options": [
      "603",
      "600",
      "601",
      "602"
    ],
    "answer": 1,
    "explanation": "VPL(B−A)=−6000+7260/1,1=600.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-139",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige R$ 1000 a mais que A hoje. Para VPL incremental zero a 10% ao ano, qual ganho adicional único B deve gerar em um ano, em reais?",
    "options": [
      "1102",
      "1103",
      "1100",
      "1101"
    ],
    "answer": 2,
    "explanation": "O ganho deve igualar o capital adicional capitalizado: 1000×1,1=1100.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-140",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige R$ 2000 a mais que A hoje. Para VPL incremental zero a 10% ao ano, qual ganho adicional único B deve gerar em um ano, em reais?",
    "options": [
      "2201",
      "2202",
      "2203",
      "2200"
    ],
    "answer": 3,
    "explanation": "O ganho deve igualar o capital adicional capitalizado: 2000×1,1=2200.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-141",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige R$ 3000 a mais que A hoje. Para VPL incremental zero a 10% ao ano, qual ganho adicional único B deve gerar em um ano, em reais?",
    "options": [
      "3300",
      "3301",
      "3302",
      "3303"
    ],
    "answer": 0,
    "explanation": "O ganho deve igualar o capital adicional capitalizado: 3000×1,1=3300.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-142",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige R$ 4000 a mais que A hoje. Para VPL incremental zero a 10% ao ano, qual ganho adicional único B deve gerar em um ano, em reais?",
    "options": [
      "4403",
      "4400",
      "4401",
      "4402"
    ],
    "answer": 1,
    "explanation": "O ganho deve igualar o capital adicional capitalizado: 4000×1,1=4400.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-143",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige R$ 5000 a mais que A hoje. Para VPL incremental zero a 10% ao ano, qual ganho adicional único B deve gerar em um ano, em reais?",
    "options": [
      "5502",
      "5503",
      "5500",
      "5501"
    ],
    "answer": 2,
    "explanation": "O ganho deve igualar o capital adicional capitalizado: 5000×1,1=5500.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-144",
    "subject": "engenharia-economica",
    "topic": "topic-254",
    "prompt": "B exige R$ 6000 a mais que A hoje. Para VPL incremental zero a 10% ao ano, qual ganho adicional único B deve gerar em um ano, em reais?",
    "options": [
      "6601",
      "6602",
      "6603",
      "6600"
    ],
    "answer": 3,
    "explanation": "O ganho deve igualar o capital adicional capitalizado: 6000×1,1=6600.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-145",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Fluxos em moeda constante devem usar uma taxa:",
    "options": [
      "Real",
      "Nominal sem ajuste sempre",
      "Igual a zero sempre",
      "De outra periodicidade"
    ],
    "answer": 0,
    "explanation": "A taxa real exclui a inflação, como os fluxos constantes.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-146",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Fluxos nominais que incluem inflação devem ser descontados por taxa:",
    "options": [
      "Obrigatoriamente zero",
      "Nominal coerente",
      "Real sem conversão",
      "Sempre negativa"
    ],
    "answer": 1,
    "explanation": "Misturar bases reais e nominais distorce a avaliação.",
    "level": "Fácil",
    "xp": 10
  },
  {
    "id": "engineering-more-147",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Com inflação positiva e taxa real positiva, a taxa nominal equivalente é:",
    "options": [
      "Igual em todos os casos",
      "Sempre de 100%",
      "Maior que a taxa real",
      "Menor que a taxa real"
    ],
    "answer": 2,
    "explanation": "i_nominal=i_real+inflação+i_real×inflação.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-148",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Dobrar o preço de um bem em moeda nominal significa necessariamente dobrar seu poder de compra?",
    "options": [
      "Sim, independentemente da inflação",
      "Sim, por definição",
      "Somente por ser um bem durável",
      "Não"
    ],
    "answer": 3,
    "explanation": "É preciso considerar a evolução dos preços em geral.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-149",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Uma despesa de R$ 1000 em moeda de hoje aumenta apenas pela inflação de 10% ao ano. Qual seu valor nominal daqui a dois anos, em reais?",
    "options": [
      "1210",
      "1211",
      "1212",
      "1213"
    ],
    "answer": 0,
    "explanation": "Valor nominal=1000×1,1²=1210.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-150",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Uma despesa de R$ 2000 em moeda de hoje aumenta apenas pela inflação de 10% ao ano. Qual seu valor nominal daqui a dois anos, em reais?",
    "options": [
      "2423",
      "2420",
      "2421",
      "2422"
    ],
    "answer": 1,
    "explanation": "Valor nominal=2000×1,1²=2420.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-151",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Uma despesa de R$ 3000 em moeda de hoje aumenta apenas pela inflação de 10% ao ano. Qual seu valor nominal daqui a dois anos, em reais?",
    "options": [
      "3632",
      "3633",
      "3630",
      "3631"
    ],
    "answer": 2,
    "explanation": "Valor nominal=3000×1,1²=3630.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-152",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Uma despesa de R$ 4000 em moeda de hoje aumenta apenas pela inflação de 10% ao ano. Qual seu valor nominal daqui a dois anos, em reais?",
    "options": [
      "4841",
      "4842",
      "4843",
      "4840"
    ],
    "answer": 3,
    "explanation": "Valor nominal=4000×1,1²=4840.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-153",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Uma despesa de R$ 5000 em moeda de hoje aumenta apenas pela inflação de 10% ao ano. Qual seu valor nominal daqui a dois anos, em reais?",
    "options": [
      "6050",
      "6051",
      "6052",
      "6053"
    ],
    "answer": 0,
    "explanation": "Valor nominal=5000×1,1²=6050.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-154",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "Uma despesa de R$ 6000 em moeda de hoje aumenta apenas pela inflação de 10% ao ano. Qual seu valor nominal daqui a dois anos, em reais?",
    "options": [
      "7263",
      "7260",
      "7261",
      "7262"
    ],
    "answer": 1,
    "explanation": "Valor nominal=6000×1,1²=7260.",
    "level": "Médio",
    "xp": 10
  },
  {
    "id": "engineering-more-155",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "A taxa real anual é 1% e a inflação anual é 10%. Qual a taxa nominal anual equivalente, em porcentagem? Arredonde para duas casas.",
    "options": [
      "13,10%",
      "10,10%",
      "11,10%",
      "12,10%"
    ],
    "answer": 2,
    "explanation": "[(1+1/100)×1,1−1]×100=11,10%.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-156",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "A taxa real anual é 2% e a inflação anual é 10%. Qual a taxa nominal anual equivalente, em porcentagem? Arredonde para duas casas.",
    "options": [
      "13,20%",
      "14,20%",
      "11,20%",
      "12,20%"
    ],
    "answer": 3,
    "explanation": "[(1+2/100)×1,1−1]×100=12,20%.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-157",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "A taxa real anual é 3% e a inflação anual é 10%. Qual a taxa nominal anual equivalente, em porcentagem? Arredonde para duas casas.",
    "options": [
      "13,30%",
      "14,30%",
      "15,30%",
      "12,30%"
    ],
    "answer": 0,
    "explanation": "[(1+3/100)×1,1−1]×100=13,30%.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-158",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "A taxa real anual é 4% e a inflação anual é 10%. Qual a taxa nominal anual equivalente, em porcentagem? Arredonde para duas casas.",
    "options": [
      "13,40%",
      "14,40%",
      "15,40%",
      "16,40%"
    ],
    "answer": 1,
    "explanation": "[(1+4/100)×1,1−1]×100=14,40%.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-159",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "A taxa real anual é 5% e a inflação anual é 10%. Qual a taxa nominal anual equivalente, em porcentagem? Arredonde para duas casas.",
    "options": [
      "17,50%",
      "14,50%",
      "15,50%",
      "16,50%"
    ],
    "answer": 2,
    "explanation": "[(1+5/100)×1,1−1]×100=15,50%.",
    "level": "Difícil",
    "xp": 10
  },
  {
    "id": "engineering-more-160",
    "subject": "engenharia-economica",
    "topic": "topic-255",
    "prompt": "A taxa real anual é 6% e a inflação anual é 10%. Qual a taxa nominal anual equivalente, em porcentagem? Arredonde para duas casas.",
    "options": [
      "17,60%",
      "18,60%",
      "15,60%",
      "16,60%"
    ],
    "answer": 3,
    "explanation": "[(1+6/100)×1,1−1]×100=16,60%.",
    "level": "Difícil",
    "xp": 10
  }
];
