/* ============================================
   MODULE: HERO
   Welcome screen, countdown, weather, Rudi greeting.
   ============================================ */

RigodalModules.register('hero', {

  html: `
    <section class="hero" id="home" data-section>
      <div class="hero-topbar">
        <div class="weather-chip" id="weatherChip">
          <span>☀️</span><span id="weatherTemp">24°C</span>
        </div>
      </div>

      <div class="hero-scene" id="heroScene">
        <div class="hero-stars"></div>
        <div class="hero-hill"></div>
        <div class="hero-house">
          <svg viewBox="0 0 200 160" fill="none">
            <path d="M20 90 L100 30 L180 90 V150 H20 Z" fill="#E8C67D"/>
            <path d="M10 95 L100 25 L190 95 L180 100 L100 40 L20 100 Z" fill="#5C1A2E"/>
            <rect x="45" y="105" width="28" height="28" rx="3" fill="#5C1A2E" class="hero-window"/>
            <rect x="90" y="105" width="28" height="28" rx="3" fill="#5C1A2E" class="hero-window"/>
            <rect x="135" y="105" width="28" height="28" rx="3" fill="#5C1A2E" class="hero-window"/>
            <rect x="88" y="55" width="24" height="34" fill="#3E0F1F" class="hero-window"/>
          </svg>
        </div>
        <button class="hero-rudi" id="rudiTapTarget" aria-label="Tap to hear Rudi greet you">
          <svg viewBox="0 0 60 60" fill="none">
            <ellipse cx="30" cy="36" rx="18" ry="16" fill="#5C1A2E"/>
            <circle cx="30" cy="18" r="13" fill="#5C1A2E"/>
            <path d="M30 18 L44 22 L30 26 Z" fill="#D4A24C"/>
            <circle cx="35" cy="15" r="2.4" fill="white"/>
          </svg>
        </button>
      </div>

      <div class="hero-content">
        <div class="hero-speech">
          <div class="speech-bubble" id="rudiGreeting" data-i18n="hero.greeting">Szia! I've been expecting you 🐦</div>
        </div>

        <div class="countdown-card">
          <div class="countdown-label" id="countdownLabel" data-i18n="hero.checkinLabel">Check-in in</div>
          <div class="countdown-ring-wrap">
            <svg viewBox="0 0 140 140">
              <circle class="countdown-ring-bg" cx="70" cy="70" r="60"/>
              <circle class="countdown-ring-fg" id="countdownRing" cx="70" cy="70" r="60"
                      stroke-dasharray="377" stroke-dashoffset="150"/>
            </svg>
            <div class="countdown-numbers">
              <div class="countdown-value" id="countdownValue">2</div>
              <div class="countdown-unit" id="countdownUnit">days</div>
            </div>
          </div>
        </div>

        <!-- Populated automatically from modules.config.js (inHeroActions: true) -->
        <div class="hero-actions" id="heroActionsContainer"></div>
      </div>

      <div class="hero-scroll-cue">
        <span data-i18n="hero.scrollCue">Scroll to explore</span>
        <span>↓</span>
      </div>
    </section>
  `,

  init: function () {
    const RING_CIRCUMFERENCE = 377;

    const ring = document.getElementById('countdownRing');
    const valueEl = document.getElementById('countdownValue');
    const unitEl = document.getElementById('countdownUnit');
    const labelEl = document.getElementById('countdownLabel');

    function updateCountdown() {
      const { checkIn, checkOut } = RIGODAL_DATA.booking;
      const now = new Date();
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);

      let target, labelKey, totalWindowMs;

      if (now < inDate) {
        target = inDate;
        labelKey = 'hero.checkinLabel';
        totalWindowMs = 3 * 24 * 60 * 60 * 1000;
      } else if (now < outDate) {
        target = outDate;
        labelKey = 'hero.checkoutLabel';
        totalWindowMs = outDate - inDate;
      } else {
        labelEl.textContent = RIGODAL_I18N.t('hero.thanksLabel');
        labelEl.removeAttribute('data-i18n');
        valueEl.textContent = '👋';
        unitEl.textContent = '';
        ring.style.strokeDashoffset = 0;
        return;
      }

      const diffMs = target - now;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      labelEl.setAttribute('data-i18n', labelKey);
      labelEl.textContent = RIGODAL_I18N.t(labelKey);

      if (diffDays > 0) {
        valueEl.textContent = diffDays;
        unitEl.textContent = RIGODAL_I18N.t(diffDays === 1 ? 'hero.day' : 'hero.days');
      } else {
        valueEl.textContent = diffHours;
        unitEl.textContent = RIGODAL_I18N.t(diffHours === 1 ? 'hero.hour' : 'hero.hours');
      }

      const remainingRatio = Math.max(0, Math.min(1, diffMs / totalWindowMs));
      ring.style.strokeDashoffset = RING_CIRCUMFERENCE * remainingRatio;
    }

    updateCountdown();
    setInterval(updateCountdown, 60 * 1000);
    document.addEventListener('rigodal:langchange', updateCountdown);

    // Weather placeholder — swap for a real API call later
    document.getElementById('weatherTemp').textContent = '24°C';

    // Personalize Rudi's greeting with the guest's name, if we have one
    // (comes from guestResolver.js — a personalized link or cached visit).
    function renderGreeting() {
      const name = RIGODAL_DATA.booking.guestName;
      const template = RIGODAL_I18N.t('hero.greetingNamed');
      greetingBubble.textContent = name ? template.replace('{name}', name) : RIGODAL_I18N.t('hero.greeting');
      greetingBubble.removeAttribute('data-i18n'); // now dynamically set, don't let i18n overwrite it
    }

    // Rudi tap greeting
    const greetingKeys = ['hero.greeting']; // add more keys here for a rotation
    let greetingIndex = 0;
    const rudiBtn = document.getElementById('rudiTapTarget');
    const greetingBubble = document.getElementById('rudiGreeting');

    renderGreeting();
    document.addEventListener('rigodal:langchange', renderGreeting);

    rudiBtn.addEventListener('click', () => {
      greetingIndex = (greetingIndex + 1) % greetingKeys.length;
      rudiBtn.style.transform = 'scale(1.15) rotate(8deg)';
      setTimeout(() => { rudiBtn.style.transform = ''; }, 250);
    });
  }
});
