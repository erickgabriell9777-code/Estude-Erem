# Cloudflare — implantação fechada

Esta cópia é independente do Sites. O Worker exige Cloudflare Access, verifica a assinatura JWT, emissor, audiência e validade, e permite somente os e-mails exatos configurados pelo proprietário. Os cabeçalhos antigos do ChatGPT não autenticam ninguém. Sem a configuração, o app permanece bloqueado.

## Campos da integração GitHub

| Campo | Valor |
| --- | --- |
| Repositório | `erickgabriell9777-code/Estude-Erem` |
| Branch | `main` |
| Root directory | `/` |
| Build command | `pnpm run build` |
| Deploy command | `pnpm run deploy` |
| Preview builds | Desativado |
| Cloudflare Access | Ativado, **All traffic** |

O `wrangler.jsonc` fornece nome, entrada, compatibilidade e binding D1. O Vite gera `dist/server/wrangler.json`. O script de deploy usa esse arquivo, provisiona/reutiliza `estude-erem-db`, resolve o ID real e aplica somente as migrações ainda não registradas. Não inclui tokens nem um ID fictício de banco. O token do build precisa das permissões Workers e D1 na conta escolhida.

## Configurar a autorização

1. Worker → **Access**: proteger **All traffic**. Para o primeiro teste, permitir a conta Cloudflare do proprietário. Para convidados, criar regras para e-mails específicos no Access; não usar `gmail.com` como domínio permitido.
2. No Cloudflare One/Zero Trust, localizar o **Team domain**, no formato `https://sua-equipe.cloudflareaccess.com`.
3. Na aplicação Access que protege este Worker, copiar a **Application Audience (AUD) tag**.
4. Worker → **Settings → Variables and Secrets**: adicionar as três variáveis abaixo. São configuração de runtime, não variáveis `NEXT_PUBLIC_*`.

| Nome | Valor |
| --- | --- |
| `ACCESS_TEAM_DOMAIN` | URL exata do Team domain, com `https://` |
| `ACCESS_AUD` | AUD exato da aplicação Access |
| `EREM_ALLOWED_EMAILS` | E-mails completos autorizados, separados por vírgula |

O proprietário deve também estar permitido na política do Access. O servidor confere as duas condições.

Na versão 1.2.2, os três valores confirmados pelo proprietário nos prints de 18/10/2026 estão definidos em `vars` no `wrangler.jsonc`. O deploy passa a aplicar essa configuração ao runtime. Alterações futuras nesses três valores devem ser feitas nesse arquivo para não serem substituídas na próxima publicação. As demais variáveis do painel continuam preservadas por `keep_vars`. Esses identificadores de Access não são senhas nem tokens de API; nunca adicionar segredos ao arquivo.

O domínio aceita o hostname da equipe, sua URL HTTPS ou o endereço JWKS completo e normaliza para o emissor HTTPS. Não há inferência de domínio de e-mail: a lista de e-mails continua exigindo endereços completos e exatos.

O token pode chegar pelo cabeçalho `cf-access-jwt-assertion` ou, na ausência dele, pelo cookie `CF_Authorization`. Ambos exigem assinatura, emissor, audiência, validade e e-mail autorizado. A tela de entrada mostra um código de diagnóstico e a versão, com opção de renovar a sessão; não exibe valores de configuração, e-mails ou tokens. Uma falha de configuração, sessão expirada e conta não autorizada têm mensagens distintas.

## Conferência após publicar

- Antes de publicar, executar `pnpm run build && pnpm run test:runtime`. O teste usa Miniflare com arquivos reais e sessões assinadas de uma equipe fictícia local, sem tocar no D1 remoto.
- Sem sessão, a página e `/api/study` devem pedir autenticação ou bloquear.
- Uma conta fora da lista deve ser bloqueada.
- A conta permitida deve abrir o app, responder e salvar uma questão.
- Recarregar a página e confirmar o salvamento antes de convidar outra pessoa.
- Conferir que CSS e JavaScript em `/_next/static/` retornam 200 com os tipos corretos após o login, e que o menu e as matérias respondem ao toque.
- Conferir separadamente os PDFs, pois o serviço de livros exige `BOOKS_ENDPOINT` e o secret `BOOKS_SERVER_KEY`.

O próprio Worker protege também os arquivos estáticos (`run_worker_first: true`). Não remover essa opção. A verificação usa JWT porque Workers com Static Assets não recebem `ctx.access` em todas as configurações.

Após verificar a sessão, `worker.ts` encaminha `/_next/static/` para `env.ASSETS.fetch`. O vinext deixa esses arquivos compilados para o roteador de assets; passar a requisição diretamente ao handler do framework retorna 404 nessa configuração. As demais rotas continuam no vinext. Todas as respostas mantêm `Cache-Control: private, no-store` e a versão em `X-Erem-Version`. Não liberar arquivos antes da autenticação para resolver falhas de estilos.

## Limites desta migração

O banco novo começa sem o progresso pessoal do Sites. A transferência exige backup e associação explícita das identidades. Os PDFs enviados e o segredo do serviço de livros não estão no GitHub. A geração do APK Android e sua distribuição privada ainda estão pendentes. Esta etapa não oferece cadastro público.

## Referências oficiais

- https://developers.cloudflare.com/workers/configuration/cloudflare-access/
- https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/
- https://developers.cloudflare.com/workers/wrangler/configuration/#automatic-provisioning
- https://developers.cloudflare.com/d1/reference/migrations/
- https://developers.cloudflare.com/workers/static-assets/routing/worker-script/
- https://vinext.dev/docs/deploying/cloudflare#middleware-and-static-files
