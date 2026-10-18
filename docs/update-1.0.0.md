# Estude Erem 1.0.0

## Decisões de produto

Pedido retomado em 5/10/2026: Home com cinco matérias em cartões e Ver mais; decisão direta ao trocar de atividade; ampliação em todas as matérias. Flashcards ficam para a próxima etapa, conforme a orientação de revisar depois.

Referências consultadas: [Khan Academy — cursos na Home](https://support.khanacademy.org/hc/en-us/articles/115003342971-How-do-I-edit-the-My-Courses-section-on-my-Home-page), para tornar as matérias fáceis de encontrar; [Goodnotes — organização de documentos](https://support.goodnotes.com/hc/en-us/articles/15303674514191-Organize-folders-and-documents-in-Goodnotes), para manter materiais em uma área própria; [Quizlet — conjuntos de flashcards](https://help.quizlet.com/hc/en-au/articles/360032006352-What-are-flashcard-sets), como referência de organização para etapa posterior. Essas referências orientam a hierarquia, sem reprodução de telas ou conteúdos.

## Conteúdo desta entrega

Banco local: 6.756 exercícios, 311 assuntos, 23 matérias. Acréscimo: 3.254 exercícios em 49 novos assuntos de prática. Destes, 3.200 são variações paramétricas de 40 famílias, com 80 conjuntos de dados por família; 54 são questões editoriais de texto-base nas nove matérias restantes. Não afirmar que são 3.254 conceitos inéditos ou questões extraídas de livros. O próximo lote deve aprofundar assuntos existentes e ampliar variedade conceitual antes de multiplicar mais parâmetros.

A navegação padrão de cinco matérias destaca Português, Matemática, Cálculo I, Física e Química. A busca e os filtros acessam todas as matérias. Acesso a livros e materiais fica abaixo dos cartões principais. Progresso tem resumo compacto.

## Validação

Checagem de tipos, build, integridade de IDs/enunciados/alternativas, vínculos entre questões e assuntos, amostras de gabarito numérico nos dois extremos de todas as 40 famílias e fluxo do modelo encerrar/reiniciar mantendo estatísticas. O teste anti-repetição verifica que uma nova sessão inédita não inclui as 20 questões já selecionadas e marcadas como vistas.

Payload JSON do catálogo estático: aproximadamente 3,55 MiB antes da compressão. O cache é apenas do catálogo público por 60 segundos; estado, sessão e anotações de usuários não são compartilhados. Verificação visual em aparelhos permanece necessária: o ambiente não disponibilizou a skill de navegador exigida pelo fluxo de Sites.
