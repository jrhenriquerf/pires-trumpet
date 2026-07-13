const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
}

function initNavigation() {
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  navToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

function trapFocus(container, event) {
  const focusable = [...container.querySelectorAll('button, [href], iframe, [tabindex]:not([tabindex="-1"])')]
    .filter((el) => !el.hasAttribute("disabled"));
  if (!focusable.length || event.key !== "Tab") return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

const assetBase = document.body.dataset.assetBase || "";
const currentLang = document.documentElement.lang?.startsWith("en") ? "en" : "pt";
let videos = [];
let videoCategories = [];

const embeddedData = {
  "gallery.json": {
  "albums": [
    {
      "id": "fit",
      "title": {
        "pt": "FIT 2024",
        "en": "FIT 2024"
      },
      "description": {
        "pt": "Momentos do festival, encontros, aulas e convivência musical.",
        "en": "Festival moments, meetings, classes and musical community."
      },
      "path": "assets/gallery/eventos/fit",
      "thumbPath": "assets/gallery/thumbs/albums",
      "thumbPrefix": "fit",
      "images": []
    },
    {
      "id": "unicamp",
      "title": {
        "pt": "UNICAMP",
        "en": "UNICAMP"
      },
      "description": {
        "pt": "Registros de atividades acadêmicas, trocas e apresentações.",
        "en": "Academic activities, exchanges and performance records."
      },
      "path": "assets/gallery/eventos/unicamp",
      "thumbPath": "assets/gallery/thumbs/albums",
      "thumbPrefix": "unicamp",
      "images": []
    },
    {
      "id": "gsu-masterclass",
      "title": {
        "pt": "GSU Masterclass",
        "en": "GSU Masterclass"
      },
      "description": {
        "pt": "Encontro acadêmico com foco em trompete, repertório e performance.",
        "en": "Academic meeting focused on trumpet, repertoire and performance."
      },
      "path": "assets/gallery/masterclasses/gsu masterclass",
      "thumbPath": "assets/gallery/thumbs/albums",
      "thumbPrefix": "gsu-masterclass",
      "images": []
    },
    {
      "id": "bastidores-victor",
      "title": {
        "pt": "Bastidores",
        "en": "Backstage"
      },
      "description": {
        "pt": "Retratos, preparação, rotina e momentos fora do palco.",
        "en": "Portraits, preparation, routine and off-stage moments."
      },
      "path": "assets/gallery/bastidores/victor pires",
      "thumbPath": "assets/gallery/thumbs/albums",
      "thumbPrefix": "bastidores-victor",
      "images": []
    },
    {
      "id": "familia",
      "title": {
        "pt": "Família",
        "en": "Family"
      },
      "description": {
        "pt": "Memórias pessoais que fazem parte da trajetória.",
        "en": "Personal memories that are part of the journey."
      },
      "path": "assets/gallery/familia",
      "thumbPath": "assets/gallery/thumbs/albums",
      "thumbPrefix": "familia",
      "images": []
    }
  ]
}
,
  "gallery-index.json": {
  "assets/gallery/concertos": [
    "concerto-01.webp",
    "concerto-02.webp",
    "concerto-03.webp"
  ],
  "assets/gallery/eventos/fit": [
    "IMG-20240803-WA0050.jpg",
    "IMG-20240805-WA0031.jpg",
    "IMG-20240809-WA0017.jpg",
    "IMG-20240809-WA0057.jpg",
    "IMG-20240809-WA0059.jpg",
    "IMG-20240809-WA0061.jpg",
    "IMG-20240809-WA0075.jpg",
    "IMG-20240809-WA0077.jpg",
    "IMG-20240809-WA0080.jpg",
    "IMG-20240809-WA0087.jpg",
    "IMG-20240809-WA0089.jpg",
    "IMG-20240809-WA0109.jpg",
    "IMG-20240809-WA0111.jpg",
    "IMG-20240809-WA0113.jpg",
    "IMG_20240810_204019_933.jpg",
    "IMG_20240810_204019_957.jpg",
    "IMG_20240810_204019_982.jpg",
    "IMG_20240810_204020_038.jpg",
    "PXL_20240804_202721002.jpg",
    "Smith Photo 4.jpg"
  ],
  "assets/gallery/eventos/unicamp": [
    "IMG_20240626_104258_716.jpg",
    "IMG_20240626_104305_275.jpg",
    "IMG_20240626_104308_319.jpg",
    "IMG_20240626_104311_895.jpg",
    "IMG_20240626_104316_753.jpg",
    "IMG_20240628_015839_622.webp",
    "IMG_20240628_015839_650.webp",
    "IMG_20240628_015839_754.webp"
  ],
  "assets/gallery/masterclasses": [
    "masterclass-01.webp",
    "masterclass-02.webp",
    "masterclass-03.webp"
  ],
  "assets/gallery/masterclasses/gsu masterclass": [
    "WhatsApp Image 2024-11-15 at 01.16.14_ac9c214b.jpg",
    "WhatsApp Image 2024-11-15 at 01.16.17_61f204c5.jpg",
    "WhatsApp Image 2024-11-15 at 01.16.45_6f49eb8f.jpg",
    "WhatsApp Image 2024-11-15 at 01.16.45_72545ce1.jpg",
    "WhatsApp Image 2024-11-15 at 01.16.45_e42a8508.jpg"
  ],
  "assets/gallery/bastidores/victor pires": [
    "00EB1D56-C7E4-41B2-8DF9-80582D29E2F4.JPG",
    "05151B10-6DF9-4D9E-90E6-92E8DB691D08.JPG",
    "3C4DEFCB-A86A-4188-9848-582A8FD8BDB3.JPG",
    "3EF15085-0B6E-4078-9CF9-499CDD1CAEEF.JPG",
    "BFD0E1F8-3BDF-484A-AD7E-669BC8C00660.JPG",
    "D7DB8C3A-A778-43CB-9094-ABEC10E8095E.JPG",
    "EC8F1E1C-4D0D-437F-A3C6-51BA90866C75.JPG",
    "IMG_2777.jpg",
    "IMG_2824.jpg",
    "IMG_3203.jpg",
    "IMG_3208.jpg",
    "IMG_3225.jpg",
    "IMG_3230.jpg",
    "IMG_3240.jpg",
    "IMG_3259.jpg"
  ],
  "assets/gallery/familia": [
    "411117501_6123346961101888_7556852480349010220_n.jpg",
    "70957438_1893361534100473_1805161040678223872_n.jpg",
    "IMG-20250223-WA0026.jpg"
  ],
  "assets/gallery/gravacoes": [
    "gravacao-01.webp"
  ]
}
,
  "videos.json": {
  "categories": [
    {
      "id": "Performance",
      "label": {
        "pt": "Performance",
        "en": "Performance"
      }
    },
    {
      "id": "Excertos",
      "label": {
        "pt": "Excertos",
        "en": "Excerpts"
      }
    }
  ],
  "videos": [
    {
      "platform": "youtube",
      "id": "hT5HPbKTD6c",
      "category": "Excertos",
      "title": {
        "pt": "FIT 2024 - Quicksilver",
        "en": "FIT 2024 - Quicksilver"
      },
      "description": {
        "pt": "O trecho é Quicksilver de Peter Graham, executado por Philip Smith e Victor Pires. Conduzido por Ellie Neufeld com a Banda Sinfonica Municipal de Bauru.",
        "en": "The piece is Quicksilver by Peter Graham, performed by Philip Smith and Victor Pires. Conducted by Ellie Neufeld with the Banda Sinfonica Municipal de Bauru."
      },
      "thumbnail": "assets/videos/thumbnails/video-01.webp"
    },
    {
      "platform": "youtube",
      "id": "aSD_yM4bgy0",
      "category": "Performance",
      "title": {
        "pt": "Legend - George Enesco",
        "en": "Legend - George Enesco"
      },
      "description": {
        "pt": "O trecho é Legend de George Enesco, executado por Victor Pires.",
        "en": "The piece is Legend by George Enesco, performed by Victor Pires."
      },
      "thumbnail": "assets/videos/thumbnails/video-02.webp"
    },
    {
      "platform": "youtube",
      "id": "E0tx9_kCJBw",
      "category": "Excertos",
      "title": {
        "pt": "Quintet (3rd Mov.) Por Malcolm Arnold - Bulldog Brass Society",
        "en": "Quintet (3rd Mov.) by Malcolm Arnold - Bulldog Brass Society"
      },
      "description": {
        "pt": "O trecho é Quintet (3rd Mov.) de Malcolm Arnold, executado por Trompetes - Marco Cubillas & Victor Pires, Trompa - Anthony Parrish, Trombone - Danny Alford, Tuba Hunter Kane.",
        "en": "The piece is Quintet (3rd Mov.) by Malcolm Arnold, performed by Trumpets - Marco Cubillas & Victor Pires, French Horn - Anthony Parrish, Trombone - Danny Alford, Tuba Hunter Kane."
      },
      "thumbnail": "assets/videos/thumbnails/video-03.webp"
    }
  ]
}

};

function dataUrl(file) {
  return `${assetBase}data/${file}`;
}

function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:|data:)/.test(path)) return path;
  return assetBase + encodeURI(path).replace(/#/g, "%23");
}

async function fetchJson(file) {
  try {
    const response = await fetch(dataUrl(file), { cache: "no-cache" });
    if (!response.ok) throw new Error(`Could not load ${file}`);
    return response.json();
  } catch (error) {
    if (embeddedData[file]) return embeddedData[file];
    throw error;
  }
}

function textFor(value, fallback = "") {
  if (value && typeof value === "object") return value[currentLang] || value.pt || value.en || fallback;
  return value || fallback;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[char]));
}

function thumbFor(album, imageName, index) {
  if (typeof imageName === "object" && imageName.thumb) return imageName.thumb;
  if (album.thumbPath && album.thumbPrefix) return `${album.thumbPath}/${album.thumbPrefix}-${String(index + 1).padStart(2, "0")}.webp`;
  return `${album.path}/${typeof imageName === "string" ? imageName : imageName.src}`;
}

function imageSrcFor(album, imageName) {
  if (typeof imageName === "object") return imageName.src || imageName.path || "";
  return `${album.path}/${imageName}`;
}

async function getAlbumImages(album, galleryIndex) {
  const explicit = Array.isArray(album.images) ? album.images : [];
  if (explicit.length) return explicit;
  return galleryIndex?.[album.path] || [];
}

function renderGalleryToolbar(albums) {
  const toolbar = document.querySelector("[data-gallery-toolbar]");
  if (!toolbar) return;
  const allLabel = currentLang === "en" ? "All" : "Todos";
  toolbar.innerHTML = [
    `<button class="is-active" type="button" data-gallery-filter="all">${allLabel}</button>`,
    ...albums.map((album) => `<button type="button" data-gallery-filter="${escapeHtml(album.id)}">${escapeHtml(textFor(album.title))}</button>`)
  ].join("");
}

function renderGalleryAlbum(album, images, order) {
  const title = textFor(album.title);
  const description = textFor(album.description);
  const photoLabel = currentLang === "en" ? "photos" : "fotos";
  const albumLabel = currentLang === "en" ? "Album" : "Álbum";
  const openLabel = currentLang === "en" ? "Open image" : "Abrir imagem";
  const cards = images.map((imageName, index) => {
    const itemTitle = `${title} ${String(index + 1).padStart(2, "0")}`;
    const fullSrc = imageSrcFor(album, imageName);
    const thumbSrc = thumbFor(album, imageName, index);
    const alt = `${itemTitle} | Victor Atanazio Pires`;
    return `
      <article class="premium-gallery-card album-photo-card" data-gallery-item data-category="${escapeHtml(album.id)}">
        <button type="button" data-lightbox-src="${assetUrl(fullSrc)}" data-lightbox-alt="${escapeHtml(alt)}" data-lightbox-title="${escapeHtml(itemTitle)}" data-lightbox-caption="${escapeHtml(description)}" aria-label="${openLabel}: ${escapeHtml(itemTitle)}">
          <img src="${assetUrl(thumbSrc)}" data-full="${assetUrl(fullSrc)}" alt="${escapeHtml(alt)}" loading="lazy" />
          <span>${escapeHtml(title)}</span>
        </button>
      </article>
    `;
  }).join("");

  return `
    <section class="gallery-album" data-gallery-album="${escapeHtml(album.id)}">
      <div class="gallery-album-heading">
        <span>${albumLabel} ${String(order).padStart(2, "0")}</span>
        <div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
        <small>${images.length} ${photoLabel}</small>
      </div>
      <div class="premium-gallery-grid album-gallery-grid">${cards}</div>
    </section>
  `;
}

function initGalleryFilters() {
  const buttons = document.querySelectorAll("[data-gallery-filter]");
  const items = document.querySelectorAll("[data-gallery-item]");
  const albums = document.querySelectorAll("[data-gallery-album]");
  if (!buttons.length || !items.length) return;

  function applyFilter(category) {
    items.forEach((item) => {
      const isVisible = category === "all" || item.dataset.category === category;
      item.classList.toggle("is-hidden", !isVisible);
    });
    albums.forEach((album) => {
      const hasVisibleItems = [...album.querySelectorAll("[data-gallery-item]")].some((item) => !item.classList.contains("is-hidden"));
      album.classList.toggle("is-hidden", !hasVisibleItems);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.galleryFilter;
      buttons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
      applyFilter(category);
    });
  });
}

function initGalleryLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  if (!lightbox) return;

  const cards = [...document.querySelectorAll("[data-lightbox-src]")];
  const image = lightbox.querySelector("[data-lightbox-image]");
  const title = lightbox.querySelector("[data-lightbox-title]");
  const caption = lightbox.querySelector("[data-lightbox-caption]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const prevButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  if (!cards.length || !image || !closeButton) return;
  let activeIndex = 0;
  let lastFocus = null;

  function visibleCards() {
    return cards.filter((card) => !card.closest("[data-gallery-item]")?.classList.contains("is-hidden"));
  }

  function open(index) {
    const list = visibleCards();
    const card = list[index];
    if (!card) return;
    activeIndex = index;
    lastFocus = document.activeElement;
    image.src = card.dataset.lightboxSrc;
    image.alt = card.dataset.lightboxAlt || "";
    title.textContent = card.dataset.lightboxTitle || "";
    caption.textContent = card.dataset.lightboxCaption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    lastFocus?.focus();
  }

  function move(step) {
    const list = visibleCards();
    if (!list.length) return;
    activeIndex = (activeIndex + step + list.length) % list.length;
    open(activeIndex);
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => open(visibleCards().indexOf(card)));
  });
  closeButton.addEventListener("click", close);
  prevButton?.addEventListener("click", () => move(-1));
  nextButton?.addEventListener("click", () => move(1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
    trapFocus(lightbox, event);
  });
}

async function initDynamicGallery() {
  const root = document.querySelector("[data-gallery-root]");
  if (!root) return;
  try {
    const [galleryData, galleryIndex] = await Promise.all([fetchJson("gallery.json"), fetchJson("gallery-index.json").catch(() => ({}))]);
    const renderedAlbums = [];
    for (const album of galleryData.albums || []) {
      const images = await getAlbumImages(album, galleryIndex);
      if (!images.length) continue;
      renderedAlbums.push({ album, images });
    }
    renderGalleryToolbar(renderedAlbums.map((entry) => entry.album));
    root.innerHTML = renderedAlbums.map((entry, index) => renderGalleryAlbum(entry.album, entry.images, index + 1)).join("");
    initGalleryFilters();
    initGalleryLightbox();
  } catch (error) {
    console.error(error);
    root.innerHTML = `<p class="media-error">${currentLang === "en" ? "Gallery could not be loaded." : "Não foi possível carregar a galeria."}</p>`;
  }
}

function youtubeVideoId(video) {
  if (video.id) return video.id;
  const url = video.url || "";
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return match?.[1] || "";
}

function youtubeThumbnail(video, quality = "maxresdefault") {
  const id = youtubeVideoId(video);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : "";
}

function videoEmbedUrl(video) {
  if (video.platform === "youtube") return `https://www.youtube.com/embed/${youtubeVideoId(video)}?autoplay=1`;
  if (video.platform === "vimeo") return `https://player.vimeo.com/video/${video.id}?autoplay=1`;
  return video.url || "";
}

function videoThumbnail(video) {
  if (video.thumbnail) return assetUrl(video.thumbnail);
  if (video.platform === "youtube") return youtubeThumbnail(video, "maxresdefault");
  return "";
}

function videoThumbnailFallback(video) {
  if (video.thumbnail) return "";
  if (video.platform === "youtube") return youtubeThumbnail(video, "hqdefault");
  return "";
}

function renderVideoToolbar() {
  const toolbar = document.querySelector("[data-video-toolbar]");
  if (!toolbar) return;
  const allLabel = currentLang === "en" ? "All" : "Todos";
  toolbar.innerHTML = [
    `<button class="is-active" type="button" data-video-filter="all">${allLabel}</button>`,
    ...videoCategories.map((category) => `<button type="button" data-video-filter="${escapeHtml(category.id)}">${escapeHtml(textFor(category.label, category.id))}</button>`)
  ].join("");
}

function getVideoCategoryLabel(categoryId) {
  const category = videoCategories.find((item) => item.id === categoryId);
  return textFor(category?.label, categoryId);
}

function getVideoAlt(title) {
  return currentLang === "en" ? `Video thumbnail: ${title}` : `Thumbnail do vídeo ${title}`;
}

function renderVideos(filter = "all") {
  const grid = document.querySelector("[data-video-grid]");
  if (!grid) return;
  const filtered = filter === "all" ? videos : videos.filter((video) => video.category === filter);
  const watchLabel = currentLang === "en" ? "Watch" : "Assistir";
  grid.innerHTML = filtered.map((video, index) => {
    const title = textFor(video.title);
    const description = textFor(video.description);
    const originalIndex = videos.indexOf(video);
    return `
      <article class="video-card">
        <button class="video-thumb" type="button" data-video-index="${originalIndex}" aria-label="${watchLabel}: ${escapeHtml(title)}">
          <img src="${videoThumbnail(video)}" alt="${escapeHtml(getVideoAlt(title))}" loading="lazy"${videoThumbnailFallback(video) ? ` onerror="this.onerror=null;this.src='${videoThumbnailFallback(video)}'"` : ""} />
        </button>
        <div class="video-card-copy">
          <div class="video-card-meta"><span>${escapeHtml(getVideoCategoryLabel(video.category))}</span><span>${escapeHtml(video.platform || "Video")}</span></div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(description)}</p>
          <button class="button" type="button" data-video-index="${originalIndex}">${watchLabel}</button>
        </div>
      </article>
    `;
  }).join("");
}

function initVideoFilters() {
  const buttons = document.querySelectorAll("[data-video-filter]");
  if (!buttons.length) return;
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
      renderVideos(button.dataset.videoFilter);
    });
  });
}

function closeVideoModal() {
  const modal = document.querySelector("[data-video-modal]");
  const frame = document.querySelector("[data-video-frame]");
  if (!modal || !frame) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  frame.innerHTML = "";
  window.lastVideoFocus?.focus();
}

function initVideoModal() {
  const modal = document.querySelector("[data-video-modal]");
  const frame = document.querySelector("[data-video-frame]");
  const closeButton = document.querySelector("[data-video-close]");
  const title = document.querySelector("[data-video-title]");
  const description = document.querySelector("[data-video-description]");
  const category = document.querySelector("[data-video-category]");
  if (!modal || !frame) return;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-video-index]");
    if (!trigger) return;
    const video = videos[Number(trigger.dataset.videoIndex)];
    if (!video) return;
    const videoTitle = textFor(video.title);
    const embedUrl = videoEmbedUrl(video);
    if (!embedUrl) return;
    window.lastVideoFocus = document.activeElement;
    frame.innerHTML = `<iframe src="${embedUrl}" title="${escapeHtml(videoTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    title.textContent = videoTitle;
    description.textContent = textFor(video.description);
    category.textContent = getVideoCategoryLabel(video.category);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton?.focus();
  });

  closeButton?.addEventListener("click", closeVideoModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeVideoModal();
  });
  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") closeVideoModal();
    trapFocus(modal, event);
  });
}

async function initDynamicVideos() {
  const grid = document.querySelector("[data-video-grid]");
  if (!grid) return;
  try {
    const data = await fetchJson("videos.json");
    videos = data.videos || [];
    videoCategories = data.categories || [];
    renderVideoToolbar();
    renderVideos();
    initVideoFilters();
  } catch (error) {
    console.error(error);
    grid.innerHTML = `<p class="media-error">${currentLang === "en" ? "Videos could not be loaded." : "Não foi possível carregar os vídeos."}</p>`;
  }
}

initNavigation();
initYear();
initDynamicGallery();
initDynamicVideos();
initVideoModal();
