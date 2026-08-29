/* ============================================
   MODULE: ADVENTURE (Treasure Hunt teaser card)
   The actual game lives on its own standalone page (hunt.html),
   built as a treasure-map experience with a Rudi story woven through
   it — see hunt.html / css/hunt.css / js/hunt.js for that.

   This module is intentionally tiny: it just shows a single card on
   the main site that says "Start" or "Continue (X/7)" depending on
   progress, and links out to hunt.html. All the real game logic and
   quest content lives in js/hunt.js, not here — this card only reads
   the same localStorage key (read-only) to know what button text to show.
   ============================================ */

RigodalModules.register('adventure', {

  html: `
    <section class="section adventure-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="adventure.eyebrow">Family adventure</div>
        <h2 class="section-title" data-i18n="adventure.title">Rudi's Grand Adventure</h2>
        <p class="section-subtitle" data-i18n="adventure.subtitle">Help Rudi find his grandmother's lost map.</p>

        <a href="hunt.html" class="btn btn-gold btn-block" id="huntCtaBtn" style="text-align:center;">
          Start the Adventure
        </a>
      </div>
    </section>
  `,

  init: function () {
    // Same storage key js/hunt.js writes to — read-only here, just to
    // decide which button label to show. The actual quest data and
    // completion logic live entirely in hunt.js, not duplicated here.
    const STORAGE_KEY = 'rigodal_hunt_v2';
    const TOTAL_QUESTS = 7;

    function getCompletedCount() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : { completed: [] };
        return Array.isArray(data.completed) ? data.completed.length : 0;
      } catch (e) {
        return 0;
      }
    }

    function renderButton() {
      const btn = document.getElementById('huntCtaBtn');
      const count = getCompletedCount();

      if (count === 0) {
        btn.textContent = RIGODAL_I18N.t('adventure.startBtn');
      } else if (count >= TOTAL_QUESTS) {
        btn.textContent = RIGODAL_I18N.t('adventure.doneBtn');
      } else {
        btn.textContent = RIGODAL_I18N.t('adventure.continueBtn').replace('{count}', count);
      }
    }

    renderButton();
    document.addEventListener('rigodal:langchange', renderButton);
  }
});
