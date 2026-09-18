# Prévias de compartilhamento

As páginas incluem Open Graph no HTML inicial, sem depender de JavaScript.
As imagens JPEG em `assets/og/victor-pires-share.jpg` (PT) e
`assets/og/victor-pires-share-en.jpg` (EN) têm 1200 × 630 pixels.

Para recriar as imagens, execute da raiz do projeto com Node.js e Playwright disponíveis:

```sh
node scripts/render-social-card.cjs
```

Opcionalmente, defina `CHROME_PATH` para usar um navegador Chromium instalado.
O script usa a foto e o logo existentes em `site-assets/`.

A origem publicada atualmente é `https://jrhenriquerf.github.io/pires-trumpet/`.
Ao migrar para um domínio próprio, atualize canonical, hreflang, og:url,
og:image, twitter:image, robots.txt e sitemap.xml em conjunto.

WhatsApp e outras plataformas podem manter uma prévia anterior em cache.
A apresentação final do cartão é controlada pelo aplicativo de destino.
