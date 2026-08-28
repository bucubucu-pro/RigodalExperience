/* ============================================
   MODULE: STAY (My Stay)
   House guide: Wi-Fi, check-in/out, parking,
   appliances, rules, what's provided, emergency
   info, and a Google review link.
   ============================================ */

RigodalModules.register('stay', {

  html: `
    <section class="section stay-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="stay.eyebrow">Inside the house</div>
        <h2 class="section-title" data-i18n="stay.title">My Stay</h2>
        <p class="section-subtitle" data-i18n="stay.subtitle">Everything you need, right where you need it.</p>

        <div class="stay-hotspot-grid" id="stayHotspotGrid">
          <button class="hotspot-card" data-sheet="wifi" data-hotspot="wifi">
            <span class="hotspot-icon">📶</span>
            <span class="hotspot-label" data-i18n="stay.wifi">Wi-Fi</span>
            <span class="hotspot-preview" data-i18n="stay.wifiPreview">Tap for password</span>
          </button>
          <button class="hotspot-card" data-sheet="checkin" data-hotspot="checkin">
            <span class="hotspot-icon">🚪</span>
            <span class="hotspot-label" data-i18n="stay.checkin">Check-in / out</span>
            <span class="hotspot-preview" data-i18n="stay.checkinPreview">Times & lockbox</span>
          </button>
          <button class="hotspot-card" data-sheet="parking" data-hotspot="parking">
            <span class="hotspot-icon">🚗</span>
            <span class="hotspot-label" data-i18n="stay.parking">Parking</span>
            <span class="hotspot-preview" data-i18n="stay.parkingPreview">Where to park</span>
          </button>
          <button class="hotspot-card" data-sheet="appliances" data-hotspot="appliances">
            <span class="hotspot-icon">📺</span>
            <span class="hotspot-label" data-i18n="stay.appliances">Appliances</span>
            <span class="hotspot-preview" data-i18n="stay.appliancesPreview">TV, AC, dishwasher</span>
          </button>
          <button class="hotspot-card" data-sheet="rules" data-hotspot="rules">
            <span class="hotspot-icon">📖</span>
            <span class="hotspot-label" data-i18n="stay.rules">House Rules</span>
            <span class="hotspot-preview" data-i18n="stay.rulesPreview">Quick read</span>
          </button>
          <button class="hotspot-card" data-sheet="provided" data-hotspot="provided">
            <span class="hotspot-icon">🎁</span>
            <span class="hotspot-label" data-i18n="stay.provided">What's Provided</span>
            <span class="hotspot-preview" data-i18n="stay.providedPreview">Use freely during your stay</span>
          </button>
          <button class="hotspot-card" data-sheet="emergency" data-hotspot="emergency">
            <span class="hotspot-icon">🚨</span>
            <span class="hotspot-label" data-i18n="stay.emergency">Emergency</span>
            <span class="hotspot-preview" data-i18n="stay.emergencyPreview">Numbers & nearest help</span>
          </button>
          <!-- This card links straight out to Google's review box instead
               of opening an in-app sheet — boosts real Google reviews
               instead of collecting notes only we can see. Always pinned
               last in the grid (see reorderHotspots() in init() below). -->
          <a class="hotspot-card" id="reviewCard" href="#" target="_blank" rel="noopener" data-hotspot="review">
            <span class="hotspot-icon">⭐</span>
            <span class="hotspot-label" data-i18n="stay.review">Leave a Review</span>
            <span class="hotspot-preview" data-i18n="stay.reviewPreview">Takes 30 seconds on Google</span>
          </a>
        </div>
      </div>
    </section>
  `,

  init: function () {
    const backdrop = document.getElementById('sheetBackdrop');
    const sheet = document.getElementById('sheet');
    const content = document.getElementById('sheetContent');
    const { wifiName, wifiPassword } = RIGODAL_DATA.booking;
    const t = RIGODAL_I18N.t;

    // Point the review card at the real Google review link (see
    // js/data.js -> business.googleReviewUrl for how to set your own).
    const reviewCard = document.getElementById('reviewCard');
    if (reviewCard && RIGODAL_DATA.business && RIGODAL_DATA.business.googleReviewUrl) {
      reviewCard.href = RIGODAL_DATA.business.googleReviewUrl;
    }

    function sheetTemplates() {
      return {
        wifi: `
          <div class="sheet-title">${t('sheet.wifiTitle')}</div>
          <div class="sheet-body">${t('sheet.wifiBody')}</div>
          <div class="sheet-copy-row">
            <div><div style="font-size:12px;color:var(--color-text-muted)">${t('sheet.wifiNetworkLabel')}</div><code>${wifiName}</code></div>
          </div>
          <div class="sheet-copy-row">
            <div><div style="font-size:12px;color:var(--color-text-muted)">${t('sheet.wifiPasswordLabel')}</div><code id="wifiPassText">${wifiPassword}</code></div>
            <button class="copy-btn" id="copyWifiBtn">${t('sheet.copy')}</button>
          </div>
        `,
        checkin: `
          <div class="sheet-title">${t('sheet.checkinTitle')}</div>
          <ul class="sheet-list">
            <li>${t('sheet.checkinL1')}</li>
            <li>${t('sheet.checkinL2')}</li>
            <li>${t('sheet.checkinL3')}</li>
            <li>${t('sheet.checkinL4')}</li>
          </ul>
        `,
        parking: `
          <div class="sheet-title">${t('sheet.parkingTitle')}</div>
          <div class="sheet-body">${t('sheet.parkingBody')}</div>
        `,
        appliances: `
          <div class="sheet-title">${t('sheet.appliancesTitle')}</div>
          <ul class="sheet-list">
            <li>${t('sheet.appliancesL1')}</li>
            <li>${t('sheet.appliancesL2')}</li>
            <li>${t('sheet.appliancesL3')}</li>
          </ul>
        `,
        rules: `
          <div class="sheet-title">${t('sheet.rulesTitle')}</div>
          <ul class="sheet-list">
            <li>${t('sheet.rulesL1')}</li>
            <li>${t('sheet.rulesL2')}</li>
            <li>${t('sheet.rulesL3')}</li>
            <li>${t('sheet.rulesL4')}</li>
          </ul>
        `,
        emergency: `
          <div class="sheet-title">${t('sheet.emergencyTitle')}</div>
          <ul class="sheet-list">
            <li>🚨 <a href="tel:112" style="color:var(--color-accent-strong);font-weight:700;">${t('sheet.emergencyL1')}</a></li>
            <li>🏥 ${t('sheet.emergencyL2')}</li>
            <li>💊 ${t('sheet.emergencyL3')}</li>
            <li>💬 ${t('sheet.emergencyL4')}</li>
          </ul>
        `,
        provided: `
          <div class="sheet-title">${t('sheet.providedTitle')}</div>
          <div class="sheet-body">${t('sheet.providedBody')}</div>
          <ul class="sheet-list">
            <li>☂️ ${t('sheet.providedL1')}</li>
            <li>🎲 ${t('sheet.providedL2')}</li>
            <li>☕ ${t('sheet.providedL3')}</li>
            <li>🧴 ${t('sheet.providedL4')}</li>
          </ul>
        `
      };
    }

    function openSheet(key) {
      const templates = sheetTemplates();
      content.innerHTML = templates[key] || '<div class="sheet-body">Coming soon.</div>';
      backdrop.classList.add('is-open');
      sheet.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      const copyBtn = document.getElementById('copyWifiBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(wifiPassword).then(() => {
            copyBtn.textContent = t('sheet.copied');
            copyBtn.classList.add('is-copied');
            setTimeout(() => {
              copyBtn.textContent = t('sheet.copy');
              copyBtn.classList.remove('is-copied');
            }, 1500);
          });
        });
      }
    }

    function closeSheet() {
      backdrop.classList.remove('is-open');
      sheet.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-sheet]').forEach((btn) => {
      btn.addEventListener('click', () => openSheet(btn.dataset.sheet));
    });

    backdrop.addEventListener('click', closeSheet);

    // ============================================
    // FEATURE 1: Time-aware hotspot ordering
    // Reorders the hotspot grid based on where the guest is in
    // their stay — the most relevant card always comes first.
    //
    // "review" and "emergency" are exceptions: they're always pinned
    // to the last two positions (review last, emergency second-to-last)
    // regardless of stay stage — review works best as the final "on
    // your way out" card, and emergency is a constant reference point
    // rather than something that should jump around the grid.
    // ============================================
    function getStayStage() {
      const now = new Date();
      const inDate = new Date(RIGODAL_DATA.booking.checkIn);
      const outDate = new Date(RIGODAL_DATA.booking.checkOut);
      const hoursToCheckin = (inDate - now) / (1000 * 60 * 60);
      const hoursToCheckout = (outDate - now) / (1000 * 60 * 60);

      if (now < inDate) return hoursToCheckin <= 24 ? 'arriving-soon' : 'before-stay';
      if (now < outDate) return hoursToCheckout <= 12 ? 'leaving-soon' : 'during-stay';
      return 'after-stay';
    }

    // Priority order per stage for the "flexible" middle cards only —
    // ids not listed keep their original relative order and are
    // appended after the priority ones (but always before the pinned
    // emergency/review cards at the very end — see reorderHotspots()).
    const STAGE_PRIORITY = {
      'before-stay': ['checkin', 'parking', 'wifi'],
      'arriving-soon': ['checkin', 'parking', 'wifi'],
      'during-stay': ['wifi', 'appliances', 'rules'],
      'leaving-soon': ['checkin', 'provided'],
      'after-stay': ['provided']
    };

    const PINNED_LAST = ['emergency', 'review']; // in this exact order

    function reorderHotspots() {
      const grid = document.getElementById('stayHotspotGrid');
      const stage = getStayStage();
      const priority = STAGE_PRIORITY[stage] || [];

      const allCards = Array.from(grid.querySelectorAll('[data-hotspot]'));
      const pinnedCards = PINNED_LAST
        .map((id) => allCards.find((c) => c.dataset.hotspot === id))
        .filter(Boolean);
      const flexibleCards = allCards.filter((c) => !PINNED_LAST.includes(c.dataset.hotspot));

      flexibleCards.sort((a, b) => {
        const aIndex = priority.indexOf(a.dataset.hotspot);
        const bIndex = priority.indexOf(b.dataset.hotspot);
        const aRank = aIndex === -1 ? 999 : aIndex;
        const bRank = bIndex === -1 ? 999 : bIndex;
        return aRank - bRank;
      });

      [...flexibleCards, ...pinnedCards].forEach((card) => grid.appendChild(card));
    }

    // NOTE: the contextual banner and weather tip that used to live here
    // were moved into Rudi's speech bubble in the hero section (see
    // js/modules/hero.js) — showing the same "almost here!" style message
    // in two places was redundant. Only hotspot reordering remains here.

    reorderHotspots();

    // Language switch can change which hotspot labels are prioritized
    // (translation text differs in length etc.) — safe to just re-run.
    document.addEventListener('rigodal:langchange', reorderHotspots);
  }
});
