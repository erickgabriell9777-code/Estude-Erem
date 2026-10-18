import type {SubjectId} from './study-data';
export const readingSources = [
{"id": "batch2-motion", "title": "Física Universitária · Cinemática", "publisher": "OpenStax / LibreTexts", "url": "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_(OpenStax)/02%3A_Cinematica", "accessedAt": "2026-09-28"},
{"id": "batch2-thermo", "title": "Química Geral 2 · Módulo 1", "publisher": "Carlos Vital Paixão de Melo · UFES", "url": "https://acervo.sead.ufes.br/arquivos/visualizacao-quimica-geral-2.pdf", "accessedAt": "2026-09-28"},
{id:'batch-bcb',title:'Caderno de Educação Financeira · 2ª edição, 2026',publisher:'Banco Central do Brasil',url:'https://www.bcb.gov.br/content/cidadaniafinanceira/documentos_cidadania/Cuidando_do_seu_dinheiro_Gestao_de_Financas_Pessoais/caderno_cidadania_financeira.pdf',accessedAt:'2026-09-28'},
{id:'batch-atlas',title:'Atlas Geográfico Escolar · 9ª edição',publisher:'IBGE',url:'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102069.pdf',accessedAt:'2026-09-28'},
{id:'batch-inep',title:'A Redação do Enem 2026 · apresentação da Cartilha do Participante',publisher:'Inep',url:'https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/a-redacao-do-enem-2026-cartilha-do-a-participante',accessedAt:'2026-09-28'}
];
export const readingTopics:{id:string;subject:SubjectId;name:string;summary:string}[]=[
{id:'topic-256',subject:'geografia',name:'Coordenadas geográficas',summary:'Latitude indica a posição ao norte ou ao sul do Equador; longitude, a leste ou a oeste de Greenwich. Não confunda referências nem unidades.'},
{id:'topic-257',subject:'geografia',name:'Projeções cartográficas',summary:'Representar uma superfície curva em um plano exige deformações. Projeções equivalentes conservam proporções de áreas; conformes conservam ângulos localmente.'},
{id:'topic-258',subject:'redacao',name:'Intervenção e diagnóstico do problema',summary:'Relacione a proposta ao problema discutido, identifique uma ação e seus responsáveis, e respeite os direitos humanos.'}
];

readingTopics.push(
{"id": "topic-259", "subject": "fisica", "name": "Percursos, encontros e velocidade média", "summary": "Diferencie distância e deslocamento, inclua paradas e compare movimentos usando o mesmo referencial."},{"id": "topic-260", "subject": "fisica", "name": "Movimento acelerado e gráficos", "summary": "Relacione posição, velocidade e aceleração; interprete áreas e inclinações em gráficos de movimento."},{"id": "topic-261", "subject": "quimica", "name": "Balanços de energia e calorimetria", "summary": "Aplique a primeira lei com sinais consistentes e diferencie calor, trabalho, temperatura e energia interna."},{"id": "topic-262", "subject": "quimica", "name": "Entalpia e caminhos de reação", "summary": "Use a Lei de Hess, ajuste quantidades e sentidos de reação e interprete o sinal da variação de entalpia."}
);
