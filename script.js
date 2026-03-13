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

const TRANSLATIONS = {
  en: {
    "header.label":          "Streaming Analytics",
    "header.sub":            "XGBoost · Multiclass · Live DB",
    "nav.dashboard":         "Dashboard",
    "nav.documentation":     "Documentation",
    "nav.eda":               "EDA",
    "nav.github":            "GitHub Repository",
    "footer.text":           "Churn Prediction · Portfolio Project · ",
    "footer.website":        "Personal Website",
    "footer.github":         "GitHub",

    "idx.nav.home":          "Home",
    "idx.nav.about":         "About",
    "idx.nav.projects":      "Projects",
    "idx.hero.eyebrow":      "Data Analyst · São Paulo",
    "idx.hero.body":         "On my journey to becoming a Data Analyst, I created this portfolio to showcase the case studies I've explored and the projects where I've applied my skills.",
    "idx.scroll":            "Scroll",
    "idx.about.label":       "01 — About",
    "idx.meta.degree":       "Degree",
    "idx.meta.degree_val":   "Information Systems, FIAP",
    "idx.meta.postgrad":     "Postgrad",
    "idx.meta.postgrad_val": "Data Analytics, FIAP",
    "idx.meta.currently":    "Currently",
    "idx.meta.currently_val":"IBM — Operation Support",
    "idx.about.p1":          "I'm Laura. I graduated in 2023 with a Bachelor's degree in Information Systems from FIAP, and I am currently enrolled in a postgraduate degree in Data Analytics at the same university, with an expected graduation in early 2026.",
    "idx.about.p2":          "My professional career started in May 2021, when I joined IBM as an intern. Since August 2021, I have been working as a full-time employee in Operation Support. Throughout my experience at IBM, I developed a strong interest in data analysis due to the opportunities I was given to work closely with data, solve problems, and support decision-making processes.",
    "idx.about.p3":          "This growing interest motivated me to deepen my knowledge in the field, which led me to pursue a postgraduate degree in Data Analytics. This portfolio was created to showcase the case studies and projects where I have applied these skills in practice — demonstrating my ability to transform data into meaningful insights.",
    "idx.projects.label":    "02 — Projects",
    "idx.projects.heading":  "Selected<br><em>Work</em>",
    "idx.project1.title":    "Streaming Churn<br>Prediction",
    "idx.project1.desc":     "Predicting if a customer will cancel their subscription using Python, SQL and Machine Learning.",
    "idx.project.link":      "Check it out ↗",
    "idx.footer.location":   "São Paulo, Brazil",
  },

  pt: {
    "header.label":          "Analytics de Streaming",
    "header.sub":            "XGBoost · Multiclasse · BD ao Vivo",
    "nav.dashboard":         "Painel",
    "nav.documentation":     "Documentação",
    "nav.eda":               "EDA",
    "nav.github":            "Repositório GitHub",
    "footer.text":           "Previsão de Churn · Projeto de Portfólio · ",
    "footer.website":        "Site Pessoal",
    "footer.github":         "GitHub",

    "idx.nav.home":          "Início",
    "idx.nav.about":         "Sobre",
    "idx.nav.projects":      "Projetos",
    "idx.hero.eyebrow":      "Analista de Dados · São Paulo",
    "idx.hero.body":         "Na minha jornada para me tornar uma Analista de Dados, criei este portfólio para apresentar os estudos de caso que explorei e os projetos onde apliquei minhas habilidades.",
    "idx.scroll":            "Rolar",
    "idx.about.label":       "01 — Sobre",
    "idx.meta.degree":       "Graduação",
    "idx.meta.degree_val":   "Sistemas de Informação, FIAP",
    "idx.meta.postgrad":     "Pós-graduação",
    "idx.meta.postgrad_val": "Data Analytics, FIAP",
    "idx.meta.currently":    "Atualmente",
    "idx.meta.currently_val":"IBM — Suporte de Operações",
    "idx.about.p1":          "Sou a Laura. Me formei em 2023 com bacharelado em Sistemas de Informação pela FIAP, e atualmente estou cursando pós-graduação em Data Analytics na mesma universidade, com previsão de conclusão no início de 2026.",
    "idx.about.p2":          "Minha carreira profissional começou em maio de 2021, quando entrei na IBM como estagiária. Desde agosto de 2021, atuo como funcionária efetiva no Suporte de Operações. Ao longo da minha experiência na IBM, desenvolvi um forte interesse por análise de dados pelas oportunidades que tive de trabalhar diretamente com dados, resolver problemas e apoiar processos de tomada de decisão.",
    "idx.about.p3":          "Esse interesse crescente me motivou a aprofundar meu conhecimento na área, o que me levou a cursar a pós-graduação em Data Analytics. Este portfólio foi criado para apresentar os estudos de caso e projetos onde apliquei essas habilidades na prática — demonstrando minha capacidade de transformar dados em insights significativos.",
    "idx.projects.label":    "02 — Projetos",
    "idx.projects.heading":  "Trabalhos<br><em>Selecionados</em>",
    "idx.project1.title":    "Previsão de Churn<br>em Streaming",
    "idx.project1.desc":     "Previsão de cancelamento de assinatura de clientes usando Python, SQL e Machine Learning.",
    "idx.project.link":      "Veja o projeto ↗",
    "idx.footer.location":   "São Paulo, Brasil",
  }
};


function getLang() {
  return localStorage.getItem('lang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLang(lang);
  updateToggle(lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

function applyLang(lang) {
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!dict[key]) return;
    const attr = el.getAttribute('data-i18n-attr');
    if (attr) {
      el.setAttribute(attr, dict[key]);
    } else {
      el.innerHTML = dict[key];
    }
  });
}

function updateToggle(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function initI18n() {
  const lang = getLang();
  applyLang(lang);
  updateToggle(lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

document.addEventListener('DOMContentLoaded', initI18n);