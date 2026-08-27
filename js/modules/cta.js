/* ============================================
   MODULE: CTA (Book Direct band)
   ============================================ */

RigodalModules.register('cta', {

  html: `
    <section class="section cta-section" data-section>
      <h2 class="section-title" data-i18n="cta.title">Stay with Rudi</h2>
      <p class="section-subtitle" data-i18n="cta.subtitle">Your next Eger memory starts here.</p>
      <a href="#" class="btn btn-gold" style="min-width:220px;" data-i18n="cta.button">Stay with Rudi</a>
      <div class="cta-microcopy" data-i18n="cta.microcopy">🪶 +100 feathers for booking direct</div>
    </section>
  `,

  init: function () {
    // No dynamic behavior yet — booking link target can be set here
    // once a real booking system/URL is available.
  }
});
