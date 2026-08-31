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

  // The footer is static shell HTML (not a module), but its contact
  // links should still come from the single source of truth in
  // js/data.js -> business, not be hardcoded here too. Edit the
  // phone/whatsapp/email values in data.js, not in index.html.
  const biz = RIGODAL_DATA.business || {};
  const footerCall = document.getElementById('footerCallLink');
  const footerWhatsapp = document.getElementById('footerWhatsappLink');
  const footerEmail = document.getElementById('footerEmailLink');
  if (footerCall && biz.phone) footerCall.href = 'tel:' + biz.phone;
  if (footerWhatsapp && biz.whatsappNumber) footerWhatsapp.href = 'https://wa.me/' + biz.whatsappNumber;
  if (footerEmail && biz.email) footerEmail.href = 'mailto:' + biz.email;
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
