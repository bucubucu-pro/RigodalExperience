/* ============================================
   MODULE: CTA (Book Direct band)
   ============================================ */

RigodalModules.register('cta', {

  html: `
    <section class="section cta-section" data-section>
      <h2 class="section-title" data-i18n="cta.title">Stay with Rudi</h2>
      <p class="section-subtitle" data-i18n="cta.subtitle">Your next Eger memory starts here.</p>
      <a href="#" id="ctaBookBtn" target="_blank" rel="noopener" class="btn btn-gold" style="min-width:220px;" data-i18n="cta.button">Stay with Rudi</a>
    </section>
  `,

  init: function () {
    // Real booking link lives in js/data.js -> business.bookingUrl —
    // edit it there, not here, if the URL ever changes.
    const bookBtn = document.getElementById('ctaBookBtn');
    if (bookBtn && RIGODAL_DATA.business && RIGODAL_DATA.business.bookingUrl) {
      bookBtn.href = RIGODAL_DATA.business.bookingUrl;
    }
  }
});
