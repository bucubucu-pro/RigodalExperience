/* ============================================
   NAV
   Handles: smooth in-page scrolling for nav links.
   ============================================ */

(function () {
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
