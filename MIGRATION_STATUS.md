# Estado da migração — 18/10/2026

## Implementado no código

- Origem preservada: aplicativo Sites; cópia independente no GitHub privado.
- Worker Cloudflare com nome e entrada explícitos, sem banco fictício.
- Build portátil e PDF.js reconstruído no build.
- Cloudflare Access: JWT validado com jose (assinatura, emissor, audiência, validade), e-mails exatos autorizados e contexto de identidade isolado por requisição.
- Sem configuração, login ou autorização válidos: app, APIs e assets bloqueados.
- Script de deploy com provisionamento D1 e aplicação das migrações.
- Testes de token inválido, claims incorretos, conta fora da lista e concorrência entre usuários.
- Configuração de runtime do beta incluída no projeto com os valores confirmados pelo proprietário; correção do domínio sem HTTPS e do e-mail incompleto vistos nos prints.
- Recuperação de sessão por botão, validação de JWT também pelo cookie de Access e diagnósticos específicos sem expor valores privados.
- Versão 1.2.3: encaminhamento explícito dos arquivos compilados CSS/JS para ASSETS após autenticar. Corrige os 404 em `/_next/static/` que deixavam o HTML sem estilos nem interação.
- Teste de integração do Worker compilado com assets reais, D1 temporário, catálogo, gravação de perfil e isolamento entre contas.

## Observado na conta do proprietário

- O print de 17/10 mostra um build concluído com sucesso, e o Access aparece aplicado a All traffic.
- O print de 18/10 às 16:24 mostra o HTML do app no domínio Workers, sem estilo e sem o conteúdo carregado pelo JavaScript. A falha foi reproduzida localmente: HTML 200, CSS compilado 404.

## Validado localmente na versão 1.2.3

- Build de produção, TypeScript e testes de autenticação.
- Worker compilado: CSS/JS completos com bytes e Content-Type corretos; página, catálogo e APIs acessíveis somente com sessão autorizada.
- Testes não substituem a conferência no domínio publicado. A tentativa de iniciar um navegador local foi bloqueada pela indisponibilidade do download do navegador; não houve validação visual nesta etapa.

## Ainda não confirmado em produção

- Aplicação da atualização 1.2.3 pelo build da Cloudflare e tela completa no celular.
- Secrets do serviço de livros.
- Migração dos dados pessoais e arquivos do Sites.
- Login e salvamento no celular após publicação.
- Build e distribuição privada Android.

Veja `docs/cloudflare-private-beta.md` para os passos de configuração. O registro Failed antigo mostrado na lista de deploys não identifica a causa da falha visual atual.
