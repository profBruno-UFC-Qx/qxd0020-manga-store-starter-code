# O que está implementado?

No frontend, temos a tela inicial recuperando e mostrando as informações de todos os mangás cadastrados.

Além disso foi adicionado o VueRouter. No momento temos duas páginas:

- `/` que mostra a página principal com todos os mangás
- `/mangas/:id` que mostra os detalhes de um mangá 


# Possíveis dúvidas ou problema

## .env
Foi adicionado o arquivo .env do Strapi. O correto não seria adicioná-lo no GitHub. O fiz somente para simplificar a nossa vida.
https://github.com/profBruno-UFC-Qx/qxd0020-manga-store-starter-code/blob/881c05180a90b0b922aee6b37cec4c7c589a4a32/backend/.env#L1

## Strapi Transformer
Foi instalado um [plugin do Strapi](https://market.strapi.io/plugins/strapi-plugin-transformer) para simplificar o formato do JSON de resposta da API REST do Strapi.

A configuração é feita no arquivo de plugin:
https://github.com/profBruno-UFC-Qx/qxd0020-manga-store-starter-code/blob/881c05180a90b0b922aee6b37cec4c7c589a4a32/backend/config/plugins.js#L3

## Axios
O Axios está instalado e configurado para recuperar as informações do backend.
https://github.com/profBruno-UFC-Qx/qxd0020-manga-store-starter-code/blob/5adb9babdd4479a30675f54343e34e53ecfe0d99/frontend/src/api/index.ts#L5

## OnMounted

No app.vue estamos usando o hook **OnMounted** se você quiser entender melhor o que é um hook e o funcionamento do **OnMounted** confira a [documentação oficial](https://vuejs.org/guide/essentials/lifecycle.html).
https://github.com/profBruno-UFC-Qx/qxd0020-manga-store-starter-code/blob/5adb9babdd4479a30675f54343e34e53ecfe0d99/frontend/src/App.vue#L9

## Router

- Arquivo de configuração do router e suas rotas
- No informamos que a aplicação fará uso do Vue-router
