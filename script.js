/* ============================================
   ALFRED LAW — GLOBAL JS
   Nav, animations, scroll behaviour
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Nav Toggle ──────────────────────
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks  = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Theme Toggle ───────────────────────────
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
    });
  }

  // ── Active Nav Link ────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      a.classList.add('active');
    }
  });

  // ── Scroll Fade-Up Animations ──────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── Stagger children ──────────────────────
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    parent.querySelectorAll('.fade-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });

});
