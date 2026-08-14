/* ════════════════════════════════════════
   VH WEB v3 — SCRIPT.JS
   ════════════════════════════════════════ */

// ── Cursor personalizado ─────────────────
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
});

if (follower) {
  (function animFollower() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%,-50%)`;
    requestAnimationFrame(animFollower);
  })();
}

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor?.classList.add('hover');
    follower?.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('hover');
    follower?.classList.remove('hover');
  });
});

// ── Navbar ao rolar ──────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('stuck', window.scrollY > 50);
});

// ── Menu mobile ──────────────────────────
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
let menuOpen   = false;

burger?.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinks?.classList.toggle('open', menuOpen);
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.transform = 'rotate(-45deg) translate(0, -1px)';
  } else {
    spans.forEach(s => s.style.transform = '');
  }
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    navLinks.classList.remove('open');
    burger?.querySelectorAll('span').forEach(s => s.style.transform = '');
  });
});

// ── Typewriter ────────────────────────────
const words  = ['verdade', 'qualidade', 'resultado', 'profissional'];
const typedEl = document.getElementById('typed');
let wi = 0, ci = 0, deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const word = words[wi];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 90);
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(typeLoop, 300); return; }
    setTimeout(typeLoop, 50);
  }
}
typeLoop();

// ── Reveal (IntersectionObserver) ─────────
document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal') || [])];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 }).observe(el);
});

// ── Contadores animados ───────────────────
document.querySelectorAll('.counter').forEach(el => {
  new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    const target   = +el.dataset.target;
    const duration = 1400;
    const start    = performance.now();
    const easeOut  = t => 1 - Math.pow(1 - t, 3);
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOut(p) * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    })(start);
  }, { threshold: 0.5 }).observe(el);
});

// ── Ano no footer ─────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
