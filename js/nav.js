/* ============================================
   NAV
   Handles: smooth in-page scrolling for nav links,
   and opening "action" modules (like chat) from
   anywhere a data-open-module button appears.

   Uses event delegation on document.body so it works
   even for nav/hero buttons that are generated dynamically
   by moduleRegistry.js AFTER this script has loaded.
   ============================================ */

(function () {
  document.body.addEventListener('click', (e) => {
    const navLink = e.target.closest('[data-nav-link]');
    if (navLink) {
      const href = navLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    // data-open-module is handled by each module's own init() (e.g. chat.js
    // listens for clicks on [data-open-module="chat"]). This nav.js file
    // only needs to handle the generic scrolling case above.
  });
})();
