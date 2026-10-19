# Estude Erem — Web e Android

Código-fonte do aplicativo de estudos, em repositório privado. A versão 1.2.6 prepara contas com Supabase Auth e Cloudflare Turnstile. O acesso atual permanece fechado até configurar os provedores e validar a entrada real. Veja [a configuração e o estado de ativação do login](docs/account-login.md). A seleção de várias matérias e o caderno ampliado da versão 1.2.5 continuam disponíveis.

## Executar e publicar

Use a versão de Node indicada em `package.json` e pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm run test:access
pnpm run test:study
pnpm run build
pnpm run test:runtime
pnpm run test:accounts
pnpm run deploy
```

A instalação e o build geram os arquivos PDF.js a partir da dependência bloqueada. O deploy usa o Worker compilado e aplica as migrações do D1. Veja [o guia de configuração da versão fechada](docs/cloudflare-private-beta.md), incluindo os campos da Cloudflare e as variáveis de acesso obrigatórias.

O teste de runtime usa o Worker compilado, os arquivos reais do build e um D1 local temporário. Confere o HTML, todos os CSS/JS gerados, os tipos de conteúdo, os bloqueios de acesso, o catálogo e o salvamento de estado. Não usa credenciais nem dados de produção.

Sem configuração de acesso, o Worker bloqueia o app e suas APIs. Não existe login anônimo, mock de produção ou confiança nos cabeçalhos do ChatGPT. O nome antigo `chatgpt-auth.ts` é somente uma ponte de compatibilidade para as rotas existentes.

## Conteúdo preservado

- Interface React, matérias, questões e resoluções.
- Biblioteca, leitor PDF, marcações, ferramentas de estudo e progresso.
- Cadernos e introduções aos assuntos da atualização em desenvolvimento.
- Esquema de banco e migrações SQL.

## Ainda pendente na conta do proprietário

- Validar a publicação real e a política de acesso privada.
- Confirmar a aplicação das variáveis de Access do projeto e configurar os secrets do serviço de livros.
- Transferir e conferir progresso e arquivos do site original, com backup e associação das contas.
- Gerar e distribuir o aplicativo Android para testes privados.

O site original permanece preservado. O repositório inclui o e-mail autorizado e os identificadores de configuração do Access; não contém progresso pessoal, PDFs enviados, senhas nem tokens secretos. O banco novo não importa automaticamente o progresso antigo.
