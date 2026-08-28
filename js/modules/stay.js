/* ============================================
   MODULE: STAY (My Stay)
   House guide: Wi-Fi, check-in/out, parking,
   appliances, rules, guestbook.
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
          <button class="hotspot-card" data-sheet="guestbook" data-hotspot="guestbook">
            <span class="hotspot-icon">✍️</span>
            <span class="hotspot-label" data-i18n="stay.guestbook">Guestbook</span>
            <span class="hotspot-preview" data-i18n="stay.guestbookPreview">Leave a note</span>
          </button>
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
        guestbook: `
          <div class="sheet-title">${t('sheet.guestbookTitle')}</div>
          <div class="sheet-body">${t('sheet.guestbookBody')}</div>
          <textarea placeholder="${t('sheet.guestbookPlaceholder')}" style="width:100%; margin-top:12px; padding:12px; border-radius:12px; border:1.5px solid rgba(36,20,23,0.1); min-height:80px; font-family:inherit;"></textarea>
          <button class="btn btn-primary btn-block" style="margin-top:12px;">${t('sheet.guestbookSubmit')}</button>
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

    // Priority order per stage — hotspot ids not listed keep their
    // original relative order and are appended after the priority ones.
    const STAGE_PRIORITY = {
      'before-stay': ['checkin', 'parking', 'wifi'],
      'arriving-soon': ['checkin', 'parking', 'wifi'],
      'during-stay': ['wifi', 'appliances', 'rules'],
      'leaving-soon': ['checkin', 'guestbook'], // checkout times + a nudge to leave a note before heading out
      'after-stay': ['guestbook']
    };

    function reorderHotspots() {
      const grid = document.getElementById('stayHotspotGrid');
      const stage = getStayStage();
      const priority = STAGE_PRIORITY[stage] || [];
      if (priority.length === 0) return; // nothing to reorder, keep default order

      const cards = Array.from(grid.querySelectorAll('[data-hotspot]'));
      cards.sort((a, b) => {
        const aIndex = priority.indexOf(a.dataset.hotspot);
        const bIndex = priority.indexOf(b.dataset.hotspot);
        const aRank = aIndex === -1 ? 999 : aIndex;
        const bRank = bIndex === -1 ? 999 : bIndex;
        return aRank - bRank;
      });

      cards.forEach((card) => grid.appendChild(card)); // re-append in new order
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
