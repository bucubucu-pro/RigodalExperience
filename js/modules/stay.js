/* ============================================
   MODULE: STAY (My Stay)
   House guide: Wi-Fi, check-in/out, parking,
   appliances, rules, guestbook, checkout checklist.
   ============================================ */

RigodalModules.register('stay', {

  html: `
    <section class="section stay-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="stay.eyebrow">Inside the house</div>
        <h2 class="section-title" data-i18n="stay.title">My Stay</h2>
        <p class="section-subtitle" data-i18n="stay.subtitle">Everything you need, right where you need it.</p>

        <div class="stay-hotspot-grid">
          <button class="hotspot-card is-pulsing" data-sheet="wifi">
            <span class="hotspot-icon">📶</span>
            <span class="hotspot-label" data-i18n="stay.wifi">Wi-Fi</span>
            <span class="hotspot-preview" data-i18n="stay.wifiPreview">Tap for password</span>
          </button>
          <button class="hotspot-card" data-sheet="checkin">
            <span class="hotspot-icon">🚪</span>
            <span class="hotspot-label" data-i18n="stay.checkin">Check-in / out</span>
            <span class="hotspot-preview" data-i18n="stay.checkinPreview">Times & lockbox</span>
          </button>
          <button class="hotspot-card" data-sheet="parking">
            <span class="hotspot-icon">🚗</span>
            <span class="hotspot-label" data-i18n="stay.parking">Parking</span>
            <span class="hotspot-preview" data-i18n="stay.parkingPreview">Where to park</span>
          </button>
          <button class="hotspot-card" data-sheet="appliances">
            <span class="hotspot-icon">📺</span>
            <span class="hotspot-label" data-i18n="stay.appliances">Appliances</span>
            <span class="hotspot-preview" data-i18n="stay.appliancesPreview">TV, AC, dishwasher</span>
          </button>
          <button class="hotspot-card" data-sheet="rules">
            <span class="hotspot-icon">📖</span>
            <span class="hotspot-label" data-i18n="stay.rules">House Rules</span>
            <span class="hotspot-preview" data-i18n="stay.rulesPreview">Quick read</span>
          </button>
          <button class="hotspot-card" data-sheet="guestbook">
            <span class="hotspot-icon">✍️</span>
            <span class="hotspot-label" data-i18n="stay.guestbook">Guestbook</span>
            <span class="hotspot-preview" data-i18n="stay.guestbookPreview">Leave a note</span>
          </button>
        </div>

        <button class="btn btn-primary btn-block" data-sheet="checklist">
          ✅ <span data-i18n="stay.checklistBtn">Checkout Checklist</span>
        </button>
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
        `,
        checklist: `
          <div class="sheet-title">${t('sheet.checklistTitle')}</div>
          <div id="checklistItems"></div>
        `
      };
    }

    function checklistItems() {
      return [
        t('sheet.checklist1'), t('sheet.checklist2'), t('sheet.checklist3'),
        t('sheet.checklist4'), t('sheet.checklist5')
      ];
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

      const checklistWrap = document.getElementById('checklistItems');
      if (checklistWrap) {
        checklistWrap.innerHTML = checklistItems().map((item, i) => `
          <div class="checklist-item" data-index="${i}">
            <div class="checklist-checkbox"></div>
            <div class="checklist-text">${item}</div>
          </div>
        `).join('');

        checklistWrap.querySelectorAll('.checklist-item').forEach((el) => {
          el.addEventListener('click', () => {
            el.classList.toggle('is-checked');
            el.querySelector('.checklist-checkbox').classList.toggle('is-checked');
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
  }
});
