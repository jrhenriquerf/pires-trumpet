# Componentes de Midia Maximos Lab

Documentacao base para reutilizar os componentes de galeria e videos em sites institucionais da Maximos Lab.

## Galeria Premium

Use quando o projeto precisa mostrar fotos profissionais, registros de eventos, bastidores, equipe, ambientes, tratamentos, aulas, produtos ou portfolio visual.

### Estrutura de pastas

```txt
assets/gallery/
  concertos/
  masterclasses/
  bastidores/
  gravacoes/
  thumbs/
```

Em outros nichos, renomeie as categorias conforme o projeto. Exemplos: `clinica`, `procedimentos`, `equipe`, `ambientes`, `eventos`, `resultados`.

### Como adicionar nova imagem

1. Salve a imagem principal em WebP dentro da categoria.
2. Gere uma thumbnail menor em `assets/gallery/thumbs/`.
3. Adicione um novo card em `galeria.html` com `data-category`, `data-lightbox-src`, `data-lightbox-alt`, `data-lightbox-title` e `data-lightbox-caption`.
4. Preencha o `alt` da thumbnail com descricao real da imagem.

### Como adicionar categoria

1. Crie uma pasta dentro de `assets/gallery/`.
2. Adicione um botao com `data-gallery-filter="nome-da-categoria"`.
3. Use o mesmo valor em `data-category` nos cards.

### Como otimizar imagens

- Principal: WebP entre 1200px e 1800px de largura.
- Thumbnail: WebP entre 420px e 600px de largura.
- Use `loading="lazy"` no grid.
- Evite carregar imagens grandes direto no card.

### Como trocar placeholders

Substitua o `src` da thumbnail e o `data-lightbox-src` pela imagem real. Mantenha o card e os atributos para preservar filtros e lightbox.

## Media Showcase / Videos

Use quando o projeto precisa mostrar videos do YouTube sem comprometer performance inicial.

### Como adicionar video do YouTube

Edite o array `videos` em `script.js`:

```js
{
  id: "VIDEO_ID",
  title: "Titulo do video",
  description: "Descricao curta.",
  category: "Performance",
  duration: "08:42",
  thumbnail: "assets/videos/thumbnails/video-01.webp"
}
```

O `id` e a parte final da URL do YouTube. Exemplo: em `https://www.youtube.com/watch?v=hT5HPbKTD6c`, o ID e `hT5HPbKTD6c`.

### Como gerar thumbnail

- Use imagem WebP com proporcao 16:9.
- Salve em `assets/videos/thumbnails/`.
- Nomeie de forma simples: `video-01.webp`, `video-02.webp`.

### Por que nao carregar iframe imediatamente

Iframes do YouTube carregam scripts externos pesados. O componente cria o iframe apenas ao clicar em "Assistir", melhorando performance e Lighthouse.

### Como editar categorias

1. Altere ou adicione botoes em `videos.html` com `data-video-filter="Categoria"`.
2. Use o mesmo texto no campo `category` dos objetos do array `videos`.

### Como testar modal

- Clique em "Assistir".
- Confirme que o iframe aparece.
- Feche pelo botao, ESC ou clicando fora.
- Confirme que o iframe e removido do DOM ao fechar e o video para.

## Boas praticas

- Fotos sempre em WebP.
- Thumbnails separadas das imagens principais.
- Videos sempre hospedados no YouTube ou plataforma externa.
- Nao subir videos pesados no GitHub.
- Usar `loading="lazy"` em imagens fora da primeira dobra.
- Testar em mobile.
- Garantir `alt` em todas as imagens.
- Manter categorias simples e reaproveitaveis.
