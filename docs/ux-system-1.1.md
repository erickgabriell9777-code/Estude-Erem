# Estude Erem — sistema de interface e interação 1.1

Esta especificação acompanha o código. As regras daqui devem ser preservadas ao criar telas. Não criar estilos locais de botões, controles ou modais se houver um equivalente compartilhado.

## Referências e decisões

- [Goodnotes: modo leitura](https://support.goodnotes.com/hc/en-us/articles/7353757120655-Use-Read-Only-Mode-to-navigate-without-editing): separar navegação e edição. No Estude Erem, o PDF abre em Ler; Marcar revela ferramentas. O documento ocupa a janela, com um único viewport de página. Não reproduzimos a interface do produto.
- [Quizlet: estudar com flashcards](https://help.quizlet.com/hc/en-ca/articles/360030988091-Studying-with-Flashcards): separar pergunta, resposta e autoavaliação. Implementamos intervalos fixos e explícitos (10 minutos, um dia, sete dias), sem chamar isso de algoritmo adaptativo.
- [Quizlet: progresso para estudo direcionado](https://help.quizlet.com/hc/en-us/articles/360048803491-Using-Progress-for-targeted-studying): priorizar revisão relevante. Exibimos cobertura por assunto e erros pendentes; cobertura não equivale a domínio.
- As referências visuais enviadas pelo usuário orientam cartões claros, hierarquia legível, cores suaves e espaço entre controles. Mantemos os temas existentes.

## Sistema global

Cores semânticas existentes: primary, background, card, foreground, muted-foreground, border, ring. Não fixar texto escuro sobre superfícies dependentes do tema. Ilustrações possuem fundo claro próprio.

Espaçamentos: 4, 8, 12, 16, 24 e 32 px. Controles com raio de 12 px; painéis de 20 px. Texto de formulário com pelo menos 16 px para reduzir zoom involuntário em celulares. Botões com alvo de pelo menos 44 px; controles compactos de marcação ficam em uma barra própria.

Componentes: Button, AppPicker, AppDialog, Progress, QuestionMaterial, AnswerFeedback e TopicProgress. O seletor usa modal com busca, lista com rolagem única, fechamento por Escape e devolução do foco ao botão de origem. O teclado é considerado pela altura do visualViewport existente.

## Navegação e telas

Início: cinco matérias, busca e expansão; atalhos de biblioteca, materiais e prática. Tocar em uma matéria abre sua trilha; tocar em um assunto encontrado prepara esse assunto.

Trilha: visão da matéria, base sugerida, próximo passo e unidades expansíveis com até cinco assuntos na sequência existente. São blocos de navegação, não capítulos atribuídos a um livro. Todas as etapas permanecem disponíveis. Praticar três questões sem erros pendentes não significa dominar o assunto; o texto da interface distingue esses conceitos.

Questão: enunciado, eventual figura com descrição textual, ajuda gradual, alternativas, confirmação e correção. Nos novos casos conceituais, cada alternativa possui explicação específica. Nas questões anteriores, a resolução existente é organizada em passos quando contém numeração; não inventamos causas de erro.

Progresso: cobertura e erros por assunto; primeiros seis assuntos, com expansão. Prioridade para pendências. Histórico e gráficos continuam disponíveis.

Flashcard: pergunta e resposta separadas; avaliação somente depois de virar. Intervalos 10 minutos / 1 dia / 7 dias, salvos em due no documento do usuário. Filtro de revisões de hoje inclui cartões novos ou vencidos. Não há promessa de notificação em segundo plano.

Biblioteca/leitor: área de leitura em tela cheia, ferramentas de marcação recolhidas no modo Ler, controle de página e zoom. Desfazer/refazer preservados. A borracha remove apenas marcações. O zoom de documento acompanha a camada de anotações. Uma página PDF é rasterizada por vez, com limite de pixels já existente; não é zoom óptico físico. A mudança de página volta ao topo.

## Estados e responsividade

Celulares pequenos: texto quebra, formulários não excedem largura, grades de livros passam a uma coluna abaixo de 360 px. Tablet/computador: espaço extra expande o conteúdo sem ampliar controles desnecessariamente. Paisagem baixa: o leitor reduz cabeçalho para preservar a página. Modais limitados à área visível; lista de seleção é a única região rolável do seletor.

Carregamento: fallback de ferramentas e leitor; falhas de rede preservam as mensagens e tentativas existentes. Salvamento continua bloqueando operações concorrentes. Não afirmar que leitura offline foi implementada.

## Conteúdo e desempenho

24 casos autorais, distribuídos nas 23 matérias, com 96 justificativas de alternativas e duas figuras vetoriais acessíveis. Total estático: 6.780 questões e 312 assuntos. O lote de 3.200 variações numéricas anterior permanece identificado como tal. A meta de 300 questões por assunto não foi concluída.

Seleção e estado inicial foram separados dos módulos de banco estático para evitar importar o catálogo inteiro junto dos controles da aplicação. Ferramentas e leitor são carregados em módulos separados. As ferramentas são pré-carregadas após dois segundos para restaurar cronômetro e lembretes sem incluir o módulo pesado na entrada inicial. O catálogo JSON ainda é completo; paginação de catálogo no servidor é trabalho futuro, não implementado nesta versão.

## QA de publicação

- TypeScript, build, banco com chaves estrangeiras e reexecução idempotente.
- Integridade, tópicos, alternativas e amostras de gabaritos dos novos casos.
- Testes de sessão, isolamento por usuário, revisões de documentos e temporização existentes.
- Verificação de redução do módulo principal no build, sem equiparar bytes menores a FPS medido.
- Validação visual real em Android, iOS e tablet permanece pendente: a skill de navegador exigida pelo fluxo de Sites não está disponível. Não afirmar que o layout foi validado nesses dispositivos.

Resultado medido no build: módulo study-app de 1.918.050 para 178.918 bytes (sem compressão; cerca de 90,7% menor). Conjunto de arquivos JS do cliente de 3.397.627 para 2.315.646 bytes, incluindo módulos e fallbacks de PDF carregados sob demanda. Esses números não incluem o JSON do catálogo e não são uma medição de tempo em dispositivo.
