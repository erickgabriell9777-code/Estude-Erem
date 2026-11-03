# Estude Erem 1.3.0 — Plano de implementação

**Estado:** em desenvolvimento, com validação automatizada em preparação.  
**Versão de origem:** 1.2.9.  
**Objetivo:** ampliar a experiência de aprendizagem sem duplicar ferramentas existentes, quebrar dados salvos ou adicionar custos desnecessários.

## Princípios
- Preservar contas, histórico, XP, favoritos, anotações, materiais e sessões existentes.
- Reutilizar Supabase, Cloudflare Workers e D1 já presentes.
- Implementar em incrementos pequenos e validar antes de publicar.
- Manter interface responsiva para celular, tablet e computador.
- Não anunciar 1.3.0 antes de integrar, testar e validar a publicação.

## Auditoria inicial
O projeto já possui banco de questões com 6.780 questões-base verificadas por testes existentes, sessões de prática, trilhas, flashcards, resumos, mapas mentais, lembretes, cronômetro, simulados, desafios, gráficos, leitor PDF, XP, perfil e persistência por usuário. A atualização deve melhorar e integrar essas ferramentas, não recriá-las.

## Etapa 1 — Qualidade e profundidade do estudo
- [x] Adicionar auditoria por matéria, assunto e dificuldade: `pnpm audit:questions`.
- [x] Adicionar modo estrito para sinalizar assuntos abaixo da meta de 40: `pnpm audit:questions:strict`.
- [x] Balancear sessões mistas por matéria **e assunto**, para evitar que um único assunto ocupe quase toda a sessão.
- [x] Adicionar teste automatizado para distribuição entre vários assuntos da mesma matéria.
- [x] Integrar auditoria, teste de prática e validação de changelog no workflow do GitHub Actions.
- [ ] Executar a auditoria em ambiente CI e revisar o relatório real de cobertura.
- [ ] Expandir primeiro os assuntos abaixo da meta, com questões originais e gabaritos revisados.
- [ ] Validar fontes, alternativas, explicações, unicidade e distribuição de dificuldade.

## Etapa 2 — Experiência de prática
- Revisar preparação, resolução, correção e resultado.
- Melhorar feedback das alternativas e explicações.
- Tornar revisão de erros mais útil, com recorrência e progresso por assunto.
- Garantir que histórico e estatísticas não dupliquem sessões.

## Etapa 3 — Ferramentas de aprendizagem
- Auditar flashcards, resumos, mapas mentais, cronômetro, lembretes e desafios.
- Corrigir lacunas de usabilidade e persistência.
- Melhorar repetição espaçada e organização por matéria/assunto.
- Manter cronômetro e lembretes como ferramentas independentes.

## Etapa 4 — Simulados, redação e assistente
- Melhorar simulados personalizados e modelos ENEM/vestibular.
- Planejar correção de redação com critérios claros e feedback educativo.
- Avaliar assistente de dúvidas com limites de custo, privacidade e prevenção de respostas inventadas.
- Não habilitar integração externa paga sem aprovação explícita.

## Etapa 5 — Interface, acessibilidade e leitor
- Refinar página inicial e navegação sem remover fluxos úteis.
- Testar celulares, tablets em retrato/paisagem e desktop.
- Corrigir rolagem, seleção e marcação no leitor PDF.
- Melhorar acessibilidade, foco, contraste e tamanho de toque.

## Etapa 6 — Estabilidade e lançamento
- Executar lint, testes de estudo, autenticação, ferramentas e runtime Cloudflare.
- Verificar migrações e compatibilidade com dados existentes.
- Atualizar changelog e versão somente após as etapas implementadas.
- Fazer deploy e validar o ambiente publicado antes de anunciar 1.3.0.

## Critérios de conclusão
- Nenhuma perda de dados.
- Questões e gabaritos passam nos testes de integridade e cobertura.
- Fluxos principais funcionam em celular e desktop.
- Ferramentas existentes salvam e carregam corretamente.
- Testes automatizados passam.
- Changelog, versão, build e deploy correspondem ao conteúdo publicado.

## Registro de execução
- [x] Escopo 1.3.0 aprovado.
- [x] Auditoria inicial da arquitetura.
- [x] Ferramenta de auditoria adicionada ao projeto e ao package script.
- [x] Balanceamento das sessões de prática por assunto.
- [x] Teste para o balanceamento entre assuntos.
- [x] Workflow de auditoria e testes atualizado.
- [ ] Executar e revisar relatório de cobertura em CI.
- [ ] Implementar melhorias restantes das etapas 1–5.
- [ ] Executar validação integral e publicar 1.3.0.
