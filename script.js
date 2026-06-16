// ── Custom Cursor ──────────────────────────────
(function () {
  const SIZE = 26;
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.getContext('2d').drawImage(img, 0, 0, SIZE, SIZE);
    const url = canvas.toDataURL();
    const def = `url("${url}") 0 0, auto`;
    const ptr = `url("${url}") 0 0, pointer`;
    document.documentElement.style.cursor = def;
    const s = document.createElement('style');
    s.textContent = `a,button,[data-page],.tab-btn,.btn,.contact-card,.price-card,.extra-card,.special-card,.gallery-item,.hamburger{cursor:${ptr}!important}`;
    document.head.appendChild(s);
  };
  img.src = 'icons8-spider-web-100.png';
})();

// ── Mobile Nav Toggle ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('open');
  navLinksEl.classList.remove('open');
}

// ── Page Navigation ────────────────────────────
function switchPage(pageId) {
  // Hide all pages
  document
    .querySelectorAll('.page')
    .forEach((p) => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-links a[data-page]').forEach((a) => {
    a.classList.toggle('current', a.dataset.page === pageId);
  });

  closeMenu();
}

// Delegate all [data-page] clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-page]');
  if (!link) return;
  e.preventDefault();
  switchPage(link.dataset.page);
});

// ── Service Tabs (within pricing page) ─────────
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((c) => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});
