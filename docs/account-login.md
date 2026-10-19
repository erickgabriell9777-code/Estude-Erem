# Contas do Estude Erem — versão 1.2.6

## Estado real

O código integra Supabase Auth e Cloudflare Turnstile. A ativação em produção está pendente: o projeto Supabase possui e-mail habilitado, mas Google, Facebook e telefone estão desabilitados; o widget Turnstile e seu segredo ainda precisam ser configurados. `EREM_ACCESS_MODE=private` preserva o acesso atual até concluir e validar essa configuração. Esta versão não declara o site público.

## Fluxos implementados

- E-mail e senha: cadastro com confirmação, entrada, recuperação e alteração de senha.
- Google e Facebook: OAuth com PKCE e callback fixo em `/auth/callback`.
- Telefone: código SMS em formato internacional e confirmação antes de entrar.
- Turnstile: desafio real, renovado após cada tentativa; widget compacto em telas estreitas.
- Sair pelo perfil; cookies de sessão Secure, HttpOnly e SameSite=Lax.
- Progresso e documentos por identidade verificada; nenhuma identidade compartilhada ou login anônimo.

Os botões só aparecem quando o provedor está habilitado no Supabase. Não colocar botões que simulam entradas ainda não configuradas.

## Configuração externa necessária

1. Cloudflare → Turnstile → adicionar widget gerenciado para `estude-erem.erickgabriell9777.workers.dev`. Guardar `TURNSTILE_SITE_KEY` como variável e `TURNSTILE_SECRET_KEY` como secret no Worker. Não colocar o secret no GitHub.
2. Supabase → Authentication → Bot and Abuse Protection: habilitar CAPTCHA com Turnstile e o secret do mesmo widget. Somente depois marcar `SUPABASE_CAPTCHA_ENABLED=true` no código/configuração de deploy.
3. Supabase → Authentication → URL Configuration: Site URL `https://estude-erem.erickgabriell9777.workers.dev`; permitir callbacks exatos `https://estude-erem.erickgabriell9777.workers.dev/auth/callback` e `https://estude-erem.erickgabriell9777.workers.dev/auth/callback?flow=recovery`. Não usar curingas em produção.
4. Configurar SMTP para entregar confirmações e recuperação aos usuários reais. Verificar limites e remetente do provedor antes de convidar pessoas. Não desativar confirmação para contornar problemas de entrega.
5. Google: criar cliente OAuth Web no Google Cloud, configurar consentimento e callback `https://lttdlxtbjyicmakobfah.supabase.co/auth/v1/callback`; inserir client ID e client secret no provedor Google do Supabase. Revisar usuários de teste/publicação do consentimento.
6. Facebook: configurar app Meta com Facebook Login e o mesmo callback do Supabase; informar app ID e secret no provedor Facebook. Revisar modo de desenvolvimento, permissões e requisitos da Meta antes de convidar outras pessoas.
7. Telefone: configurar provedor SMS compatível e habilitar Phone no Supabase. Esta etapa pode gerar custos por SMS e não foi contratada ou ativada automaticamente.

Não copiar senhas, secrets OAuth, chaves SMS ou secret Turnstile para o chat ou o repositório. A publishable key do Supabase não é um segredo; somente ela é usada neste cliente. Chaves administrativas nunca são enviadas ao navegador.

## Troca do acesso fechado por contas

Concluir as configurações, testar cadastro/confirmação/entrada/recuperação de uma conta real e só então alterar `EREM_ACCESS_MODE=accounts` e publicar. Enquanto o Access antigo ainda estiver habilitado, o proprietário deve entrar na conta Supabase com o mesmo e-mail e abrir o app; a associação ao espaço antigo exige simultaneamente JWT do Access válido e e-mail confirmado no Supabase. A migração `0007_account_identity_links.sql` guarda essa associação. Uma identidade não pode tomar o espaço de outra por metadados ou cabeçalhos.

Remover a restrição All traffic do Cloudflare Access somente após validar o novo login. A proteção das APIs permanece no Worker com JWT Supabase validado; somente a tela de login e os bundles públicos CSS/JS ficam acessíveis sem conta. Dados, PDFs e APIs continuam exigindo sessão. Verificar em navegador anônimo que uma pessoa consegue criar sua própria conta e não lê o progresso do proprietário.

As variáveis declaradas em `wrangler.jsonc` prevalecem em novos deploys: atualizar os flags no repositório ao ativar, além das configurações no painel. O deploy usa `keep_vars` para preservar secrets e variáveis não declaradas.

## Validação

`pnpm exec tsc --noEmit --incremental false`, `pnpm run test:access`, `pnpm run test:study`, `pnpm run build`, `pnpm run test:runtime`, `pnpm run test:accounts`.

Os testes locais usam provedores e chaves fictícios, o Worker compilado e D1 temporário. Exercitam CAPTCHA inválido, origem cruzada, PKCE, cookies, callback inválido, cadastro e SMS aguardando confirmação, sessões verificadas, associação protegida, isolamento de contas e logout. Não criam usuários reais nem enviam mensagens. Eles não substituem validar provedores configurados e entrega real em produção.
