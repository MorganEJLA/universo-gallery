const screens = [
  {
    title: "Home",
    desc: "Landing page with hero, featured events, journal, and a warm brand foundation.",
    src: "images/landing-page.png",
  },
  {
    title: "Pastry Case",
    desc: "Archive-style browse page—category cards and visual hierarchy for browsing desserts.",
    src: "images/pastry-case-popup.png",
  },
  {
    title: "Browse All Locales",
    desc: "Search + A–Z filter layout for locales, tuned for quick scanning and discovery.",
    src: "images/locale-all.png",
  },
  {
    title: "Locale — Açores",
    desc: "Locale page hero + narrative layout with related content sections.",
    src: "images/locale-landing.png",
  },
  {
    title: "Single Locale Detail",
    desc: "Locale Detail page with overview, image, and related artisans",
    src: "images/single-locale.png",
  },
  {
    title: "Artisans Gallery",
    desc: "Artisans overview page with card grid layout.",
    src: "images/artisans-landing.png",
  },

  {
    title: "Single Artisan Detail",
    desc: "Artisan Detail page with profile, story, and related locale",
    src: "images/single-artisan.png",
  },
  {
    title: "Mobile Landing",
    desc: "Landing page optimized for mobile devices.",
    src: "images/mobile-landing.png",
  },
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");

const lightbox = document.getElementById("lightbox");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbImg = document.getElementById("lbImg");
const lbOpen = document.getElementById("lbOpen");

function render(items) {
  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = `<p style="color: rgba(59,42,33,0.72);">No matches. Try “library”, “locales”, “Açores”, etc.</p>`;
    return;
  }

  items.forEach((item, idx) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("data-idx", idx);

    card.innerHTML = `
      <img src="${item.src}" alt="${item.title} screenshot" loading="lazy" />
      <div class="card__meta">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(item));
    grid.appendChild(card);
  });
}

function openLightbox(item) {
  lbTitle.textContent = item.title;
  lbDesc.textContent = item.desc;
  lbImg.src = item.src;
  lbImg.alt = `${item.title} screenshot`;
  lbOpen.href = item.src;

  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightbox.addEventListener("click", (e) => {
  if (e.target.dataset.close === "true") closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.getAttribute("aria-hidden") === "false") {
    closeLightbox();
  }
});

search?.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = screens.filter((s) => {
    return (
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.src.toLowerCase().includes(q)
    );
  });
  render(filtered);
});

document.getElementById("year").textContent = new Date().getFullYear();

render(screens);
