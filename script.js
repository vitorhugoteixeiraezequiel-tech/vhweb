/* ════════════════════════════════════════
   VH WEB — SCRIPT.JS
   ════════════════════════════════════════ */

// ── Cursor personalizado ─────────────────
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
});

// Follower suave
(function animFollower() {
  fx += (mx - fx - 18) * 0.12;
  fy += (my - fy - 18) * 0.12;
  follower.style.transform = `translate(${fx}px, ${fy}px)`;
  requestAnimationFrame(animFollower);
})();

// Hover effect em links e botões
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    follower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    follower.classList.remove('hover');
  });
});

// Esconde cursor fora da janela
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  follower.style.opacity = '1';
});

// ── Navbar ao rolar ──────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 50);
});

// ── Menu mobile ──────────────────────────
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
let menuOpen   = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinks.classList.toggle('open', menuOpen);
  const [s1, s2] = burger.querySelectorAll('span');
  if (menuOpen) {
    s1.style.transform = 'rotate(45deg) translate(6px, 6px)';
    s2.style.transform = 'rotate(-45deg) translate(0, -1px)';
  } else {
    s1.style.transform = s2.style.transform = '';
  }
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    navLinks.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => s.style.transform = '');
  });
});

// ── Reveal ao rolar (Intersection Observer) ──
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // delay escalonado por index dentro do pai
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── Contadores animados ───────────────────
const counters = document.querySelectorAll('.counter');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = +el.dataset.target;
    const duration = 1400;
    const start  = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    (function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    })(start);

    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ── Ano no footer ─────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Parallax suave nos orbs ───────────────
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - .5) * 30;
  const y = (e.clientY / window.innerHeight - .5) * 30;
  document.querySelectorAll('.hero__orb--1').forEach(o => {
    o.style.transform = `translate(${x * .4}px, ${y * .4}px)`;
  });
  document.querySelectorAll('.hero__orb--2').forEach(o => {
    o.style.transform = `translate(${-x * .3}px, ${-y * .3}px)`;
  });
});
