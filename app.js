const labels = {
  apertura: "Apertura",
  pantallas: "Pantallas",
  influencers: "Influencers y tendencias",
  convivencia: "Convivencia digital",
  ventas: "Ventas y alimentación",
  parqueadero: "Parqueadero",
  cierre: "Cierre"
};

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const root = document.querySelector("#capsule-root");
  if (root && window.CAPSULAS) {
    const today = getLocalIsoDate();
    const visibleToday = window.CAPSULAS.filter(item => item.publishDate && item.publishDate <= today);
    renderCapsules(root, visibleToday);
    setupDialog();
  }
});

function getLocalIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderCapsules(root, items) {
  const grouped = items.reduce((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});

  const order = ["apertura", "pantallas", "influencers", "convivencia", "ventas", "parqueadero", "cierre"];
  const sections = order
    .filter(category => grouped[category]?.length)
    .map(category => `
      <section class="category-section" id="${category}">
        <div class="category-header">
          <h2>${labels[category] || category}</h2>
          <span>${grouped[category].length} pieza${grouped[category].length === 1 ? "" : "s"}</span>
        </div>
        <div class="capsule-grid">
          ${grouped[category].map(cardTemplate).join("")}
        </div>
        <div class="category-actions">
          <a class="button ghost back-to-top" href="#top" aria-label="Volver al inicio">Volver arriba</a>
        </div>
      </section>
    `).join("");

  const releaseNote = items.length
    ? `
      <section class="capsule-release-note" aria-label="Actualizaciones de cápsulas">
        <p>
          Seguiremos publicando nuevos bloques de cápsulas periódicamente para
          continuar fortaleciendo la corresponsabilidad entre familia y escuela.
        </p>
      </section>
    `
    : "";

  root.innerHTML = `${sections}${releaseNote}`;
}

function cardTemplate(item) {
  return `
    <article class="capsule-card">
      <button class="capsule-button" data-image="${item.image}" data-caption="${escapeHtml(item.title)} · ${escapeHtml(item.question)}">
        <img src="${item.image}" alt="${escapeHtml(item.question)}" loading="lazy">
      </button>
      <div class="capsule-meta">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.question)}</p>
      </div>
    </article>
  `;
}

function setupDialog() {
  const dialog = document.querySelector("#imageDialog");
  const image = document.querySelector("#dialogImage");
  const caption = document.querySelector("#dialogCaption");
  const close = document.querySelector(".dialog-close");

  document.addEventListener("click", event => {
    const button = event.target.closest(".capsule-button");
    if (!button || !dialog || !image || !caption) return;

    image.src = button.dataset.image;
    image.alt = button.dataset.caption;
    caption.textContent = button.dataset.caption;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      window.open(button.dataset.image, "_blank", "noopener");
    }
  });

  if (close && dialog) {
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
