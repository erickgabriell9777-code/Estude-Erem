# Estude Erem — migração privada para Web e Android

Código-fonte do aplicativo de estudos, copiado do projeto Sites em 18/10/2026 UTC. Repositório privado de desenvolvimento. Não há implantação independente ou APK nesta etapa.

## Conteúdo preservado

- Interface React, matérias, banco de questões e resolução.
- Biblioteca e leitor PDF, marcações, ferramentas de estudo e progresso.
- Atualização de cadernos e introduções aos assuntos ainda não publicada no site original.
- Esquema de banco e migrações SQL. Dados pessoais do banco não foram exportados.

## Instalação

Use Node.js conforme `package.json` e a versão do pnpm indicada no campo `packageManager`. Execute `pnpm install --frozen-lockfile` e depois `pnpm run postinstall` se o gerenciador não executar esse script automaticamente. Os recursos PDF.js são reconstruídos da dependência bloqueada, sem armazenar binários gerados no Git.

## Estado de migração — NÃO implantar fora do Sites ainda

A autenticação atual em `app/chatgpt-auth.ts` depende de cabeçalhos autenticados pelo dispatcher do Sites. Esses cabeçalhos NÃO são confiáveis se recebidos diretamente da internet. Substituir essa autenticação e remover o mock de desenvolvimento antes da hospedagem independente.

O backend usa Cloudflare Workers/D1. A biblioteca usa um serviço externo configurado por variáveis de ambiente; nenhuma credencial foi incluída. O identificador original do Sites fica preservado apenas para rastreabilidade, sem configurar publicação automática.

## Próximas entregas

1. Login independente, cadastro público desativado e autorização no servidor.
2. Hospedagem independente em conta do proprietário, inicialmente fechada.
3. Transferência conferida de dados e arquivos, com cópia de segurança e mapeamento de usuários.
4. Aplicativo Android conectado à mesma estrutura e distribuição de teste privada.

O site original deve permanecer fechado e preservado até a validação da nova hospedagem.
