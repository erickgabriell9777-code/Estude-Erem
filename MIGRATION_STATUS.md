# Estado da migração — 18/10/2026

## Implementado no código

- Origem preservada: aplicativo Sites; cópia independente no GitHub privado.
- Worker Cloudflare com nome e entrada explícitos, sem banco fictício.
- Build portátil e PDF.js reconstruído no build.
- Cloudflare Access: JWT validado com jose (assinatura, emissor, audiência, validade), e-mails exatos autorizados e contexto de identidade isolado por requisição.
- Sem configuração, login ou autorização válidos: app, APIs e assets bloqueados.
- Script de deploy com provisionamento D1 e aplicação das migrações.
- Testes de token inválido, claims incorretos, conta fora da lista e concorrência entre usuários.

## Ainda não confirmado em produção

- Resultado do deploy real e configuração correta do Access na conta Cloudflare.
- Valores de runtime e secrets do serviço de livros.
- Migração dos dados pessoais e arquivos do Sites.
- Login e salvamento no celular após publicação.
- Build e distribuição privada Android.

Veja `docs/cloudflare-private-beta.md` para os passos de configuração. O build com erro mostrado pelo usuário não continha as linhas finais do log; a causa exata daquele build ainda depende do log.
