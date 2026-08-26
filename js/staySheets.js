/* ============================================
   MY STAY - bottom sheets
   Handles: hotspot taps opening detail sheets.
   Add a new hotspot? Add a new key to SHEET_CONTENT
   and a matching data-sheet="key" button in the HTML.
   ============================================ */

(function () {
  const backdrop = document.getElementById('sheetBackdrop');
  const sheet = document.getElementById('sheet');
  const content = document.getElementById('sheetContent');
  const { wifiName, wifiPassword } = RIGODAL_DATA.booking;

  const SHEET_CONTENT = {
    wifi: `
      <div class="sheet-title">📶 Wi-Fi</div>
      <div class="sheet-body">Connect using the network below.</div>
      <div class="sheet-copy-row">
        <div><div style="font-size:12px;color:var(--color-text-muted)">Network</div><code>${wifiName}</code></div>
      </div>
      <div class="sheet-copy-row">
        <div><div style="font-size:12px;color:var(--color-text-muted)">Password</div><code id="wifiPassText">${wifiPassword}</code></div>
        <button class="copy-btn" id="copyWifiBtn">Copy</button>
      </div>
    `,
    checkin: `
      <div class="sheet-title">🚪 Check-in / Check-out</div>
      <ul class="sheet-list">
        <li>🕑 Check-in: from 2:00 PM</li>
        <li>🕙 Check-out: by 10:00 AM</li>
        <li>🔐 Lockbox code sent 1 day before arrival</li>
        <li>💬 Need early/late access? Just ask Rudi.</li>
      </ul>
    `,
    parking: `
      <div class="sheet-title">🚗 Parking</div>
      <div class="sheet-body">Free private parking is available directly in front of the house. Please leave the gate as you found it.</div>
    `,
    appliances: `
      <div class="sheet-title">📺 Appliances</div>
      <ul class="sheet-list">
        <li>📺 TV: remote on the coffee table, HDMI input 1 for streaming stick</li>
        <li>❄️ AC: press the ❄ button, hold + to lower temperature</li>
        <li>🍽 Dishwasher: eco cycle button on the top left, ~90 min</li>
      </ul>
    `,
    rules: `
      <div class="sheet-title">📖 House Rules</div>
      <ul class="sheet-list">
        <li>🚭 No smoking indoors</li>
        <li>🔇 Quiet hours after 10:00 PM</li>
        <li>🐾 Small pets welcome — please ask first</li>
        <li>🎉 No parties or events</li>
      </ul>
    `,
    guestbook: `
      <div class="sheet-title">✍️ Guestbook</div>
      <div class="sheet-body">Leave a note for future guests and for Rudi!</div>
      <textarea placeholder="Write something..." style="width:100%; margin-top:12px; padding:12px; border-radius:12px; border:1.5px solid rgba(36,20,23,0.1); min-height:80px; font-family:inherit;"></textarea>
      <button class="btn btn-primary btn-block" style="margin-top:12px;">Submit note</button>
    `,
    checklist: `
      <div class="sheet-title">✅ Checkout Checklist</div>
      <div id="checklistItems"></div>
    `
  };

  const CHECKLIST_ITEMS = [
    'Gather all keys',
    'Take out the trash',
    'Load dirty towels into the basket',
    'Turn off AC and lights',
    'Lock the front door'
  ];

  function openSheet(key) {
    content.innerHTML = SHEET_CONTENT[key] || '<div class="sheet-body">Coming soon.</div>';
    backdrop.classList.add('is-open');
    sheet.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Wire up copy button if present
    const copyBtn = document.getElementById('copyWifiBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(wifiPassword).then(() => {
          copyBtn.textContent = 'Copied!';
          copyBtn.classList.add('is-copied');
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('is-copied');
          }, 1500);
        });
      });
    }

    // Build checklist interactively if present
    const checklistWrap = document.getElementById('checklistItems');
    if (checklistWrap) {
      checklistWrap.innerHTML = CHECKLIST_ITEMS.map((item, i) => `
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
})();
