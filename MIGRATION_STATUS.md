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

## Observado na conta do proprietário

- O print de 17/10 mostra um build concluído com sucesso, e o Access aparece aplicado a All traffic.
- Os prints de 18/10 mostram as três variáveis de runtime e os problemas de formato; a entrada no app ainda não foi confirmada após a correção.

## Ainda não confirmado em produção

- Aplicação da atualização 1.2.2 pelo build da Cloudflare e login autorizado.
- Secrets do serviço de livros.
- Migração dos dados pessoais e arquivos do Sites.
- Login e salvamento no celular após publicação.
- Build e distribuição privada Android.

Veja `docs/cloudflare-private-beta.md` para os passos de configuração. O build com erro mostrado pelo usuário não continha as linhas finais do log; a causa exata daquele build ainda depende do log.
