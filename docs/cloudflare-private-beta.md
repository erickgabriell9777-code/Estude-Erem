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

O proprietário deve também estar permitido na política do Access. O servidor confere as duas condições. Variáveis do painel são preservadas em novos deploys por `keep_vars`.

## Conferência após publicar

- Sem sessão, a página e `/api/study` devem pedir autenticação ou bloquear.
- Uma conta fora da lista deve ser bloqueada.
- A conta permitida deve abrir o app, responder e salvar uma questão.
- Recarregar a página e confirmar o salvamento antes de convidar outra pessoa.
- Conferir separadamente os PDFs, pois o serviço de livros exige `BOOKS_ENDPOINT` e o secret `BOOKS_SERVER_KEY`.

O próprio Worker protege também os arquivos estáticos (`run_worker_first: true`). Não remover essa opção. A verificação usa JWT porque Workers com Static Assets não recebem `ctx.access` em todas as configurações.

## Limites desta migração

O banco novo começa sem o progresso pessoal do Sites. A transferência exige backup e associação explícita das identidades. Os PDFs enviados e o segredo do serviço de livros não estão no GitHub. A geração do APK Android e sua distribuição privada ainda estão pendentes. Esta etapa não oferece cadastro público.

## Referências oficiais

- https://developers.cloudflare.com/workers/configuration/cloudflare-access/
- https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/
- https://developers.cloudflare.com/workers/wrangler/configuration/#automatic-provisioning
- https://developers.cloudflare.com/d1/reference/migrations/
