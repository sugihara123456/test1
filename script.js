
/* ── 水分比率計算機 ── */
const RATIO_BASE = 3.0;
const RATIO_MIN  = 2.7;
const RATIO_MAX  = 3.3;

function roundTo5(n) {
  return Math.round(n / 5) * 5;
}

function updateRatio() {
  const input = document.getElementById('oat-amount');
  const g = parseFloat(input.value);
  if (!g || g <= 0) return;
  document.getElementById('water-base').textContent = roundTo5(g * RATIO_BASE);
  document.getElementById('water-min').textContent  = roundTo5(g * RATIO_MIN);
  document.getElementById('water-max').textContent  = roundTo5(g * RATIO_MAX);
}

/* ── ダークモード ── */
function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.classList.toggle('light', !dark);
  document.getElementById('theme-toggle').textContent = dark ? '☀️' : '🌙';
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(!isDark);
  localStorage.setItem('theme', !isDark ? 'dark' : 'light');
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    applyTheme(true);
  } else if (saved === 'light') {
    applyTheme(false);
  } else {
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
}

/* ── 言語切り替え ── */
function applyLang(lang) {
  document.documentElement.classList.toggle('lang-en', lang === 'en');
  document.getElementById('btn-jp').classList.toggle('active', lang === 'jp');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang === 'en' ? 'en' : 'ja';
  document.title = lang === 'en'
    ? 'High-Protein Oatmeal Rice Bowl'
    : '高たんぱくオートミール 炊き込みご飯風';
}

function initLang() {
  const saved = localStorage.getItem('lang') || 'jp';
  applyLang(saved);
}

/* ── 初期化 ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  updateRatio();

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  document.getElementById('btn-jp').addEventListener('click', () => {
    applyLang('jp');
    localStorage.setItem('lang', 'jp');
  });
  document.getElementById('btn-en').addEventListener('click', () => {
    applyLang('en');
    localStorage.setItem('lang', 'en');
  });

  document.getElementById('oat-amount').addEventListener('input', updateRatio);
});
