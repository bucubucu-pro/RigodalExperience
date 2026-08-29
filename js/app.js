/* ============================================
   APP BOOTSTRAP
   Runs last, after all modules have registered
   themselves. Kicks off the module engine, which:
     - mounts enabled modules' HTML
     - builds nav + hero action buttons from config
     - runs each module's init()
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  RigodalModules.init();
  console.log('RigóDal Companion loaded 🐦 — modules active:',
    RIGODAL_MODULES_CONFIG.filter((m) => m.enabled).map((m) => m.id));
});

// Register the service worker — enables "Add to Home Screen" / install
// prompts and offline fallback. Safe no-op in browsers without support.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}
