# Versionamento do Estude Erem

A versão pública fica exclusivamente em `package.json` (`version`). O build interno fica em `appBuild` no mesmo arquivo. `lib/app-version.ts` importa esses valores para a interface; a versão exibida em Configurações → Sobre muda no próximo build/publicação, sem editar a tela.

## Preparar uma versão

Classifique a mudança pelo impacto:

- `patch`: correção ou ajuste pequeno; ao passar de `.59`, aumenta MINOR e zera PATCH.
- `minor`: nova função ou melhoria relevante; ao passar de `59`, aumenta MAJOR e zera os demais.
- `major`: grande reformulação; zera MINOR e PATCH.

Execute, por exemplo:

```sh
node scripts/bump-version.mjs minor --category "Novidades" --note "Novo recurso descrito com clareza."
```

O comando incrementa `version` e `appBuild`, cria a primeira entrada em `lib/changelog.json` e valida os limites. Revise essa entrada e acrescente outras categorias e itens da mesma versão quando necessário. Categorias permitidas: Novidades, Melhorias, Correções, Desempenho, Segurança e Acessibilidade. Omita categorias sem conteúdo. Mantenha entradas em ordem decrescente, uma por versão.

`appBuild` identifica internamente este aplicativo e começa em 1 nesta implantação do sistema. Ele não é o número de versões do serviço de hospedagem. Uma publicação sem mudança pública pode incrementar somente `appBuild` em `package.json`.

Antes de publicar, execute `node scripts/check-version.mjs` e `node scripts/versioning.test.mjs`. O primeiro exige que a entrada mais recente de Novidades corresponda à versão exibida. Assim, não há versões públicas sem histórico.

Termos de Uso e Política de Privacidade ainda não possuem documentos publicados no projeto. A seção Sobre os identifica como documentos em preparação e não encaminha a uma página inexistente.
