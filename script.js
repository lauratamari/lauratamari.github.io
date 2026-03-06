// ── Canvas grid (preserved from original) ───────────────
const canvas = document.getElementById("grid");
const ctx    = canvas.getContext("2d");

let width  = canvas.width  = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouse = { x: -9999, y: -9999 };
const squareSize = 80;
const grid = [];

function initGrid() {
  grid.length = 0;
  for (let x = 0; x < width; x += squareSize) {
    for (let y = 0; y < height; y += squareSize) {
      grid.push({ x, y, alpha: 0, fading: false, lastTouched: 0 });
    }
  }
}

function getCellAt(x, y) {
  return grid.find(c =>
    x >= c.x && x < c.x + squareSize &&
    y >= c.y && y < c.y + squareSize
  );
}

window.addEventListener("resize", () => {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initGrid();
});

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  const cell = getCellAt(mouse.x, mouse.y);
  if (cell && cell.alpha === 0) {
    cell.alpha = 1;
    cell.lastTouched = Date.now();
    cell.fading = false;
  }
});

function drawGrid() {
  ctx.clearRect(0, 0, width, height);
  const now = Date.now();

  for (const cell of grid) {
    if (cell.alpha > 0 && !cell.fading && now - cell.lastTouched > 500) {
      cell.fading = true;
    }
    if (cell.fading) {
      cell.alpha -= 0.02;
      if (cell.alpha <= 0) { cell.alpha = 0; cell.fading = false; }
    }
    if (cell.alpha > 0) {
      const cx = cell.x + squareSize / 2;
      const cy = cell.y + squareSize / 2;
      const g  = ctx.createRadialGradient(cx, cy, 5, cx, cy, squareSize);
      g.addColorStop(0, `rgba(26,25,21,${cell.alpha})`);
      g.addColorStop(1, `rgba(26,25,21,0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth   = 1.3;
      ctx.strokeRect(cell.x + .5, cell.y + .5, squareSize - 1, squareSize - 1);
    }
  }
  requestAnimationFrame(drawGrid);
}

initGrid();
drawGrid();

// ── Hamburger ────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navMenu   = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

// ── Scroll reveal ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  ".about-grid, .projects-heading, .project-card, .about-text-col p, .about-meta"
);
revealEls.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings slightly
      setTimeout(() => entry.target.classList.add("visible"), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Navbar shadow on scroll ───────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.borderBottomColor = window.scrollY > 10 ? "var(--border)" : "transparent";
}, { passive: true });