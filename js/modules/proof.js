/* ============================================
   MODULE: PROOF (Guest Reviews)
   Shows live Booking.com reviews via an embedded Elfsight widget
   instead of hand-picked testimonial postcards. The widget pulls
   directly from the guesthouse's real Booking.com listing and
   updates itself — no manual content editing needed here.

   The Elfsight <script src="platform.js"> tag itself lives once,
   globally, in index.html's <head> — do NOT add another copy of it
   here, only the widget's own <div id="..."> goes in this module.

   TO SWAP TO A DIFFERENT ELFSIGHT WIDGET (e.g. if you add a Google
   Reviews widget too): replace the class name on the div below with
   the new widget's class (Elfsight gives you a class like
   "elfsight-app-XXXXXXXX-XXXX-...") — nothing else needs to change.
   ============================================ */

RigodalModules.register('proof', {

  html: `
    <section class="section proof-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="proof.eyebrow">From our guests</div>
        <h2 class="section-title" data-i18n="proof.title">Guest Reviews</h2>

        <div class="review-widget-frame">
          <div class="elfsight-app-1ce06918-dafe-4085-9e23-ceee5b571f8d" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  `,

  init: function () {
    // No JS logic needed — Elfsight's globally-loaded platform.js
    // (see index.html <head>) detects the div above automatically
    // and renders the live widget into it.
  }
});
