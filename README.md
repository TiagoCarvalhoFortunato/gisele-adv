# Gisele Gomes Duarte — Advocacia

Landing page estática em HTML, CSS e JavaScript, sem dependências de produção ou etapa de build.

## Visualizar

Abra `index.html` no navegador ou execute nesta pasta:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Acesse http://127.0.0.1:8000.

## Publicar

Envie `index.html`, `styles.css`, `script.js` e a pasta `assets` à hospedagem. Os metadados canonical e Open Graph estão preparados para `https://www.giselegomesduarte.com/`; altere-os se utilizar outro domínio. Nenhuma publicação foi realizada.

## Conteúdo e origem

Informações profissionais, contatos, fotografias, títulos dos artigos e depoimentos conferidos em https://www.giselegomesduarte.com/ em 30/09/2026. A identidade visual e as ilustrações arquitetônicas em CSS foram criadas para esta página.

- WhatsApp original: https://wa.me/5518996575961.
- Depoimentos originais: https://www.giselegomesduarte.com/#section-69c3211c6817c. Três relatos transcritos e atribuídos aos autores, sem notas ou métricas adicionadas.
- Artigos originais: https://www.giselegomesduarte.com/#section-63f8ffbb9bd33. Os três links abrem os textos no site original.
- Fotografia principal: arquivo `2000_69c317401ae4c.jpg` do CDN do site original, convertido para WebP.
- Fotografia do livro: arquivo `400_69c323dd639dd.jpg` do mesmo CDN, convertido para WebP.
- Fontes: Cormorant Garamond e Inter, servidas localmente.

## Interações e acessibilidade

Menu responsivo com estado anunciado, fechamento por Escape, clique externo e navegação; carrossel manual com botões, setas do teclado e gesto horizontal; links de WhatsApp com mensagem preenchida; destaque da seção ativa; link de pular para conteúdo; foco visível; respeito à preferência de movimento reduzido. A foto principal carrega prioritariamente e a foto abaixo da dobra usa lazy loading.

## Revisão

Capturas em `review/`. `review/results.json` registra as verificações em 1440, 768, 390 e 320 pixels. `review.cjs` usa Playwright e o Edge local para validar carregamento, fontes, ausência de rolagem horizontal, âncoras, menu e carrossel. O código de revisão é opcional e não deve ser enviado à hospedagem.
