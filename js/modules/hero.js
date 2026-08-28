/* ============================================
   MODULE: HERO
   Welcome screen, countdown, weather, Rudi greeting.
   ============================================ */

RigodalModules.register('hero', {

  html: `
    <section class="hero" id="home" data-section>
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
      </div>

      <div class="hero-content">

        <!-- Rudi's speech bubble: full-width row at the very top of the
             hero. Height is fixed via JS to the tallest of the (up to 3)
             rotating messages, so switching between a short and a long
             message never resizes the box.

             IMPORTANT: this uses a SINGLE text element (#rudiMsgText),
             not several overlapping ones — the message is swapped by
             changing its textContent during a brief fade, never by
             showing/hiding multiple stacked elements. This makes it
             structurally impossible for two messages to ever be visible
             at once, no matter how a transition is timed or screenshotted. -->
        <div class="rudi-bubble-row">
          <div class="speech-bubble rudi-bubble" id="rudiBubble">
            <div class="rudi-bubble-msg" id="rudiMsgText"></div>
          </div>
          <div class="rudi-bubble-dots" id="rudiBubbleDots"></div>
        </div>

        <!-- Status row: Rudi avatar + countdown + weather, all the same
             height, styled like one continuous "glass" info bar. -->
        <div class="hero-status-row">
          <button class="rudi-avatar rudi-avatar-sm" id="rudiTapTarget" aria-label="Tap to hear Rudi speak">
            <svg viewBox="0 0 100 100" fill="none">
              <!-- tail -->
              <path d="M8 62 Q2 58 4 50 Q10 54 16 58 Z" fill="#2A2A2E"/>
              <!-- body -->
              <ellipse cx="46" cy="60" rx="30" ry="26" fill="#302F35"/>
              <!-- backpack -->
              <rect x="16" y="46" width="16" height="26" rx="7" fill="#2563A8"/>
              <rect x="19" y="40" width="10" height="12" rx="4" fill="#8B5E3C"/>
              <path d="M26 50 Q34 54 34 64 Q34 72 27 76" stroke="#D4922E" stroke-width="3" fill="none" stroke-linecap="round"/>
              <rect x="30" y="58" width="6" height="6" rx="1.5" fill="#D4922E"/>
              <!-- head -->
              <circle cx="52" cy="34" r="22" fill="#302F35"/>
              <path d="M46 14 Q49 8 53 13 Q56 9 58 15" stroke="#302F35" stroke-width="4" fill="none" stroke-linecap="round"/>
              <!-- eyes -->
              <circle cx="45" cy="33" r="9" fill="white"/>
              <circle cx="45" cy="34" r="6.4" fill="#8A5A2B"/>
              <circle cx="45" cy="34" r="3.6" fill="#1A1210"/>
              <circle cx="47" cy="31.5" r="1.6" fill="white"/>
              <circle cx="62" cy="33" r="9.5" fill="white"/>
              <circle cx="62" cy="34" r="6.8" fill="#8A5A2B"/>
              <circle cx="62" cy="34" r="3.9" fill="#1A1210"/>
              <circle cx="64.2" cy="31" r="1.7" fill="white"/>
              <!-- beak -->
              <path d="M53 40 Q54 47 61 48 Q56 51 51 49 Q49 44 53 40 Z" fill="#F0A030"/>
              <path d="M53.5 41.5 Q57 44.5 59.5 46" stroke="#C9401E" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <!-- wing holding key -->
              <path d="M74 52 Q86 48 90 38" stroke="#302F35" stroke-width="9" fill="none" stroke-linecap="round"/>
              <g transform="translate(88,26) rotate(35)">
                <circle cx="0" cy="0" r="7" fill="none" stroke="#D4A24C" stroke-width="3.5"/>
                <rect x="-2" y="6" width="4" height="14" fill="#D4A24C"/>
                <rect x="-2" y="16" width="7" height="3.5" fill="#D4A24C"/>
                <rect x="-2" y="20" width="5" height="3.5" fill="#D4A24C"/>
              </g>
              <!-- feet -->
              <path d="M40 84 L38 92 M40 84 L42 92 M40 84 L44 90" stroke="#F0A030" stroke-width="3" stroke-linecap="round"/>
              <path d="M56 84 L54 92 M56 84 L58 92 M56 84 L60 90" stroke="#F0A030" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="countdown-card countdown-card-inline">
            <div class="countdown-label-inline" id="countdownLabel" data-i18n="hero.checkinLabel">Check-in in</div>
            <div class="countdown-row-inline">
              <div class="countdown-ring-wrap-sm">
                <svg viewBox="0 0 100 100">
                  <circle class="countdown-ring-bg" cx="50" cy="50" r="42"/>
                  <circle class="countdown-ring-fg" id="countdownRing" cx="50" cy="50" r="42"
                          stroke-dasharray="264" stroke-dashoffset="100"/>
                </svg>
              </div>
              <div class="countdown-numbers-sm">
                <span class="countdown-value-sm" id="countdownValue">2</span>
                <span class="countdown-unit-sm" id="countdownUnit">days</span>
              </div>
            </div>
          </div>

          <a class="weather-chip-inline" id="weatherChip" href="https://www.idokep.hu/idojaras/Eger" target="_blank" rel="noopener">
            <span class="weather-icon-inline" id="weatherIcon">☀️</span>
            <span class="weather-temp-inline" id="weatherTemp">24°C</span>
          </a>
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
    const RING_CIRCUMFERENCE = 264;

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

    // ============================================
    // WEATHER CHIP
    // Real <a href> link to Időkép's Eger forecast page (a trusted,
    // Hungarian-language weather source) — tapping it takes the guest
    // straight to Eger's current conditions. Data itself is still
    // fetched live from Open-Meteo (see js/weatherService.js); this
    // link is just where the icon/temperature take you if tapped.
    // ============================================
    function renderWeather() {
      const w = RigodalWeather.get();
      const chip = document.getElementById('weatherChip');
      const iconEl = document.getElementById('weatherIcon');
      const tempEl = document.getElementById('weatherTemp');
      if (!w) {
        chip.classList.add('is-hidden');
        return;
      }
      iconEl.textContent = w.icon;
      tempEl.textContent = w.tempC + '°C';
      chip.classList.remove('is-hidden');
    }

    renderWeather();
    document.addEventListener('rigodal:weatherready', renderWeather);

    // ============================================
    // RUDI'S SPEECH — up to 3 rotating, swipeable messages.
    // Replaces the old separate "contextual banner" box:
    // greeting + arrival/checkout/quiet-hours state + weather
    // tip now all live here, in Rudi's own voice.
    // ============================================
    function buildRudiMessages() {
      const messages = [];
      const name = RIGODAL_DATA.booking.guestName;

      // 1. Always: personalized greeting
      const greetingTemplate = RIGODAL_I18N.t('hero.greetingNamed');
      messages.push(name ? greetingTemplate.replace('{name}', name) : RIGODAL_I18N.t('hero.greeting'));

      // 2. Stay-stage contextual message (arriving soon / leaving soon / quiet hours)
      const { checkIn, checkOut } = RIGODAL_DATA.booking;
      const now = new Date();
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const hoursToCheckin = (inDate - now) / (1000 * 60 * 60);
      const hoursToCheckout = (outDate - now) / (1000 * 60 * 60);
      const hour = now.getHours();

      if (now < inDate && hoursToCheckin <= 24) {
        messages.push(RIGODAL_I18N.t('stay.bannerArrivingSoon'));
      } else if (now >= inDate && now < outDate && hoursToCheckout <= 12) {
        messages.push(RIGODAL_I18N.t('stay.bannerLeavingSoon'));
      } else if (hour >= 22 || hour < 7) {
        messages.push(RIGODAL_I18N.t('stay.bannerQuietHours'));
      }

      // 3. Weather tip, if real conditions warrant one
      const w = RigodalWeather.get();
      if (w) {
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(w.weatherCode)) {
          messages.push(RIGODAL_I18N.t('stay.tipRain'));
        } else if (w.tempC >= 28) {
          messages.push(RIGODAL_I18N.t('stay.tipHot'));
        } else if (w.tempC <= 2) {
          messages.push(RIGODAL_I18N.t('stay.tipCold'));
        }
      }

      return messages.slice(0, 3); // hard cap at 3, per design
    }

    const dotsWrap = document.getElementById('rudiBubbleDots');
    const bubble = document.getElementById('rudiBubble');
    const msgText = document.getElementById('rudiMsgText');
    let activeIndex = 0;
    let rotateTimer = null;
    let messages = [];

    function renderDots() {
      dotsWrap.innerHTML = messages.map((_, i) =>
        `<span class="rudi-dot ${i === activeIndex ? 'is-active' : ''}"></span>`
      ).join('');
    }

    // Single-element swap: fade the one text node out, change its
    // content, fade it back in. Because there is only ever ONE message
    // element in the DOM (not several stacked/absolutely-positioned
    // ones), two messages overlapping is not structurally possible —
    // there's nothing for a second message to overlap with.
    function goTo(index, userInitiated) {
      if (messages.length === 0) return;
      activeIndex = ((index % messages.length) + messages.length) % messages.length;

      msgText.classList.add('is-fading');
      setTimeout(() => {
        msgText.textContent = messages[activeIndex];
        msgText.classList.remove('is-fading');
      }, 180);

      renderDots();
      if (userInitiated) restartAutoRotate();
    }

    function restartAutoRotate() {
      if (rotateTimer) clearInterval(rotateTimer);
      if (messages.length <= 1) return;
      rotateTimer = setInterval(() => goTo(activeIndex + 1, false), 10000);
    }

    function renderMessages() {
      messages = buildRudiMessages();
      lockBubbleHeight();
      activeIndex = 0;
      msgText.textContent = messages[0] || '';
      renderDots();
      restartAutoRotate();
    }

    // Measures every candidate message's natural height using the SAME
    // element that will display it (briefly, before any message is
    // shown) so the bubble is sized to the tallest of the (up to 3)
    // messages up front. This means switching between a short and a
    // long message never resizes the box, and text can never overflow.
    function lockBubbleHeight() {
      bubble.style.height = 'auto';
      const prevText = msgText.textContent;
      let maxHeight = 0;

      messages.forEach((m) => {
        msgText.textContent = m;
        maxHeight = Math.max(maxHeight, msgText.offsetHeight);
      });

      msgText.textContent = prevText;

      const bubbleStyles = getComputedStyle(bubble);
      const verticalPadding = parseFloat(bubbleStyles.paddingTop) + parseFloat(bubbleStyles.paddingBottom);
      bubble.style.height = Math.max(maxHeight + verticalPadding, 52) + 'px';
    }

    renderMessages();
    document.addEventListener('rigodal:langchange', renderMessages);
    document.addEventListener('rigodal:weatherready', renderMessages);

    // Swipe support (touch) — drag left/right to move between messages
    let touchStartX = null;
    bubble.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    bubble.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        goTo(activeIndex + (deltaX < 0 ? 1 : -1), true);
      }
      touchStartX = null;
    });

    // Tap Rudi's avatar itself also advances the message (nice on desktop too)
    document.getElementById('rudiTapTarget').addEventListener('click', () => {
      const btn = document.getElementById('rudiTapTarget');
      btn.style.transform = 'scale(1.1) rotate(-6deg)';
      setTimeout(() => { btn.style.transform = ''; }, 250);
      goTo(activeIndex + 1, true);
    });
  }
});
