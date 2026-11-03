# Estude Erem 1.3.0 — Plano de implementação

**Estado:** planejamento aprovado; implementação em etapas.  
**Versão de origem:** 1.2.9.  
**Objetivo:** ampliar a experiência de aprendizagem sem duplicar ferramentas existentes, quebrar dados salvos ou aumentar custos desnecessários.

## Princípios de execução
- Preservar contas, histórico, XP, favoritos, anotações, materiais e sessões existentes.
- Reutilizar Supabase, Cloudflare Workers e D1 já presentes; não adicionar serviços pagos sem necessidade.
- Implementar em incrementos pequenos, com testes antes de publicar.
- Manter interface responsiva para celular, tablet e computador.
- Não publicar a versão 1.3.0 até que as entregas desta versão estejam integradas e verificadas.

## Auditoria inicial do repositório
O projeto já possui parte importante do escopo solicitado. Portanto, os itens abaixo não serão recriados do zero:
- Banco de questões com fontes, matérias, assuntos, níveis e explicações; testes existentes validam 6.780 questões-base e expansões temáticas adicionais.
- Sessões de questões com seleção de matérias/assuntos, dificuldade, ordem, histórico, revisão de erros e favoritos/anotações.
- Trilhas de aprendizagem, introdução de assuntos e exemplos resolvidos.
- Ferramentas de flashcards, resumos, mapas mentais, lembretes, cronômetro, simulados, desafios diários, gráficos e análise de erros.
- Leitor de livros/PDF, perfil, XP e personalização visual.
- Infraestrutura de persistência por usuário e controle de concorrência.

## Ordem de implementação

### Etapa 1 — Qualidade e profundidade do estudo (prioridade máxima)
- Auditar a cobertura real por matéria, assunto e dificuldade.
- Identificar assuntos com poucas questões, questões redundantes, alternativas ambíguas e explicações insuficientes.
- Definir meta de cobertura mínima por assunto e dificuldade; expandir primeiro os pontos fracos.
- Melhorar filtros de prática e simulados para respeitar assunto, nível e quantidade disponíveis.
- Validar gabaritos, unicidade, vínculo com assunto e fonte, e distribuição de dificuldade.
- Criar testes automatizados de cobertura e qualidade para impedir regressões.

### Etapa 2 — Experiência de prática
- Revisar fluxo de preparação, resolução, correção e resultado.
- Melhorar feedback de cada alternativa e explicações das respostas.
- Tornar revisão de erros mais útil, com recorrência e progresso por assunto.
- Garantir que o histórico e as estatísticas contem apenas respostas válidas e não dupliquem sessões.

### Etapa 3 — Ferramentas de aprendizagem
- Auditar flashcards, resumos, mapas mentais, cronômetro, lembretes e desafios.
- Corrigir lacunas de usabilidade e persistência.
- Melhorar repetição espaçada dos flashcards e organização dos materiais por matéria/assunto.
- Manter cronômetro e lembretes como ferramentas independentes.

### Etapa 4 — Simulados, redação e assistente
- Melhorar simulados personalizados e modelos ENEM/vestibular.
- Planejar correção de redação por critérios claros e feedback educativo.
- Avaliar assistente de dúvidas com limites de custo, privacidade e proteção contra respostas inventadas.
- Não habilitar integração externa paga sem aprovação explícita.

### Etapa 5 — Interface, acessibilidade e leitor
- Refinar página inicial e navegação sem remover fluxos úteis.
- Testar telas pequenas, tablets em retrato/paisagem e desktop.
- Corrigir gestos, rolagem, seleção e marcação no leitor PDF.
- Melhorar acessibilidade, foco, contraste, tamanho de toque e mensagens de erro.

### Etapa 6 — Estabilidade e lançamento
- Executar lint, testes de estudo, autenticação, ferramentas e runtime Cloudflare.
- Verificar migrações e compatibilidade com dados já salvos.
- Atualizar changelog e versão somente após as etapas implementadas.
- Fazer deploy e validar o ambiente publicado antes de anunciar 1.3.0.

## Critérios de conclusão
- Nenhuma perda de dados de usuário.
- Questões e gabaritos passam nos testes de integridade e cobertura.
- Fluxos principais funcionam em celular e desktop.
- Ferramentas existentes continuam salvando e carregando corretamente.
- Testes automatizados relevantes passam.
- Changelog, versão e build correspondem ao conteúdo realmente publicado.

## Registro de execução
- [x] Escopo 1.3.0 aprovado.
- [x] Auditoria inicial de arquitetura e funcionalidades existentes.
- [ ] Auditoria quantitativa da cobertura do banco por assunto e dificuldade.
- [ ] Implementação da Etapa 1.
- [ ] Implementação e validação das etapas seguintes.
- [ ] Preparação e publicação da versão 1.3.0.
