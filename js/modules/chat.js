/* ============================================
   MODULE: CHAT (Ask Rigó Rudi)
   Unlike other modules, this one is an overlay, not
   an inline page section. It still registers a small
   inline teaser card (shown in the normal scroll flow)
   PLUS the full-screen overlay markup, injected once
   into a dedicated overlay mount point.

   This module now also absorbs what used to be the separate
   FAQ section — both existed to answer common questions, so
   they're merged into one place, plus several new questions
   covering things guests commonly ask about. The homepage teaser
   shows up to 5 questions relevant to whatever stage of the stay
   the guest is currently in (randomly sampled if more than 5
   match); the full chat overlay always shows every question.

   TO UPGRADE TO REAL AI: replace getReplyByKeyword()'s and
   getReplyById()'s bodies with a fetch() call to your AI
   backend and keep everything else as-is.
   ============================================ */

RigodalModules.register('chat', {

  html: `
    <section class="section chat-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="chat.eyebrow">Always here to help</div>
        <h2 class="section-title" data-i18n="chat.title">Ask Rigó Rudi</h2>
        <p class="section-subtitle" data-i18n="chat.subtitle">Instant answers, day or night.</p>

        <div class="chat-preview-card">
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="chat-avatar">🐦</div>
            <div>
              <div style="font-weight:700;">Rigó Rudi</div>
              <div style="font-size:var(--fs-xs); color:var(--color-success);" data-i18n="chat.online">● Online</div>
            </div>
          </div>
          <!-- Populated by init() — up to 5 questions relevant to the
               guest's current stay stage, randomly sampled if more match. -->
          <div class="chat-suggested-list" id="chatTeaserList"></div>
          <button class="btn btn-primary btn-block" style="margin-top:20px;" data-open-module="chat" data-i18n="chat.startBtn">Start chatting</button>
        </div>
      </div>
    </section>
  `,

  // Overlay markup is separate from the inline `html` above — it gets
  // injected into #overlayMount once, regardless of scroll position.
  overlayHtml: `
    <div class="chat-overlay" id="chatOverlay">
      <div class="chat-header">
        <button class="chat-close-btn" id="chatCloseBtn">✕</button>
        <div class="chat-avatar" id="chatAvatar">🐦</div>
        <div class="chat-header-text">
          <div class="chat-title">Rigó Rudi</div>
          <div class="chat-status" data-i18n="chat.online">● Online</div>
        </div>
      </div>
      <div class="chat-messages" id="chatMessages"></div>
      <!-- Every question lives here, in a horizontally-scrolling grid
           that wraps into multiple rows (see .chat-suggestions in
           chat-overlay.css) so more are visible at a glance. -->
      <div class="chat-suggestions" id="chatSuggestions"></div>
      <div class="chat-input-row" id="chatInputRow" hidden>
        <input type="text" class="chat-input" id="chatInput" placeholder="Ask Rudi anything...">
        <button class="chat-send-btn" id="chatSendBtn">➤</button>
      </div>
      <div class="chat-hint-footer" data-i18n="chat.hintFooter">Tap a question above to chat with Rudi</div>
    </div>
  `,

  init: function () {
    // Inject overlay markup once, into the dedicated overlay mount point
    const overlayMount = document.getElementById('overlayMount');
    if (overlayMount && !document.getElementById('chatOverlay')) {
      overlayMount.insertAdjacentHTML('beforeend', this.overlayHtml);
    }

    const overlay = document.getElementById('chatOverlay');
    const messagesEl = document.getElementById('chatMessages');
    const closeBtn = document.getElementById('chatCloseBtn');
    const suggestionsEl = document.getElementById('chatSuggestions');
    const teaserListEl = document.getElementById('chatTeaserList');
    const rudiFab = document.getElementById('rudiFab');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    // ============================================
    // UNIFIED QUESTION BANK — merges the old separate FAQ section
    // (check-in times, parking-included, pets, hunt-how-it-works,
    // tech help) with the original chat knowledge base (breakfast,
    // Sunday hours, AC, wine, wifi, where-to-park, checkout) into
    // one list. Nothing is duplicated in translations.js: reply
    // text reuses the existing chat.kb.* and faq.a* keys as-is.
    //
    // "category" tags which stage of the stay each question is most
    // relevant for — used only by the homepage teaser (the full
    // overlay always shows everything, unfiltered). "general"
    // questions are relevant in every stage.
    // ============================================
    const KNOWLEDGE_BASE = [
      { id: 'breakfast', category: 'during-stay', keys: ['breakfast', 'reggeli', 'frühstück', 'śniadanie', 'petit-déjeuner', 'petit dejeuner'], chipKey: 'chat.suggestBreakfast', replyKey: 'chat.kb.breakfastReply' },
      { id: 'sunday', category: 'during-stay', keys: ['sunday', 'vasárnap', 'sonntag', 'niedziel', 'dimanche'], chipKey: 'chat.suggestSunday', replyKey: 'chat.kb.sundayReply' },
      { id: 'ac', category: 'during-stay', keys: ['air condition', ' ac', 'klíma', 'klima', 'klimatyzacj', 'climatisation', 'clim'], chipKey: 'chat.suggestAC', replyKey: 'chat.kb.acReply' },
      { id: 'wine', category: 'during-stay', keys: ['winery', 'wine', 'bor', 'wein', 'wino', 'vin'], chipKey: 'chat.suggestWine', replyKey: 'chat.kb.wineReply' },
      { id: 'wifi', category: 'arriving-soon', keys: ['wifi', 'wi-fi', 'internet'], chipKey: 'chat.suggestWifi', replyKey: 'chat.kb.wifiReply' },
      { id: 'parking-where', category: 'arriving-soon', keys: ['park', 'parkolás', 'parkplatz', 'parking'], chipKey: 'chat.suggestParking', replyKey: 'chat.kb.parkingReply' },
      { id: 'checkin-times', category: 'before-stay', keys: ['check-in', 'checkin', 'bejelentkezés', 'einchecken', 'zameldowanie', 'arrivée'], chipKey: 'chat.suggestCheckin', replyKey: 'faq.a1' },
      { id: 'parking-included', category: 'before-stay', keys: ['included', 'benne van', 'inklusive', 'wliczone', 'inclus'], chipKey: 'chat.suggestParkingIncluded', replyKey: 'faq.a2' },
      { id: 'checkout', category: 'leaving-soon', keys: ['checkout', 'check-out', 'check out', 'kijelentkezés', 'auschecken', 'wymeldowanie', 'départ', 'depart'], chipKey: 'chat.suggestCheckout', replyKey: 'chat.kb.checkoutReply' },
      { id: 'pets', category: 'general', keys: ['pet', 'kisállat', 'haustier', 'zwierz', 'animal'], chipKey: 'chat.suggestPets', replyKey: 'faq.a3' },
      { id: 'hunt-how', category: 'general', keys: ['hunt', 'kalandot', 'kaland', 'schatzsuche', 'poszukiwanie', 'chasse'], chipKey: 'chat.suggestHunt', replyKey: 'faq.a4' },
      { id: 'tech-help', category: 'general', keys: ['tech', 'app', 'alkalmazás', 'aplikacj', 'appli'], chipKey: 'chat.suggestTech', replyKey: 'faq.a5' },
      { id: 'early-late', category: 'before-stay', keys: ['early check', 'late check', 'korai', 'késői', 'früher check', 'später check', 'wcześniejsz', 'późniejsz', 'anticipée', 'tardif'], chipKey: 'chat.suggestEarlyLate', replyKey: 'chat.kb.earlyLateReply' },
      { id: 'atm', category: 'arriving-soon', keys: ['atm', 'cash', 'pénz', 'bankomat', 'geldautomat', 'distributeur'], chipKey: 'chat.suggestAtm', replyKey: 'chat.kb.atmReply' },
      { id: 'washing-machine', category: 'during-stay', keys: ['washing', 'laundry', 'mosógép', 'waschmaschine', 'pralk', 'machine à laver'], chipKey: 'chat.suggestWashingMachine', replyKey: 'chat.kb.washingMachineReply' },
      { id: 'extra-bedding', category: 'during-stay', keys: ['pillow', 'blanket', 'párna', 'takaró', 'kissen', 'decke', 'poduszk', 'koc', 'oreiller', 'couverture'], chipKey: 'chat.suggestExtraBedding', replyKey: 'chat.kb.extraBeddingReply' },
      { id: 'host-languages', category: 'before-stay', keys: ['language', 'speak', 'nyelv', 'sprache', 'język', 'langue'], chipKey: 'chat.suggestHostLanguages', replyKey: 'chat.kb.hostLanguagesReply' },
      { id: 'baby-gear', category: 'before-stay', keys: ['crib', 'high chair', 'baba', 'babybett', 'hochstuhl', 'łóżeczk', 'krzesełk', 'lit bébé', 'chaise haute'], chipKey: 'chat.suggestBabyGear', replyKey: 'chat.kb.babyGearReply' },
      { id: 'walk-center', category: 'arriving-soon', keys: ['walk', 'center', 'belváros', 'zentrum', 'centrum', 'centre'], chipKey: 'chat.suggestWalkCenter', replyKey: 'chat.kb.walkCenterReply' }
    ];

    function getReplyByKeyword(userText) {
      const lower = userText.toLowerCase();
      const match = KNOWLEDGE_BASE.find((k) => k.keys.some((key) => lower.includes(key)));
      return RIGODAL_I18N.t(match ? match.replyKey : 'chat.kb.fallbackReply');
    }

    function getReplyById(id) {
      const match = KNOWLEDGE_BASE.find((k) => k.id === id);
      return RIGODAL_I18N.t(match ? match.replyKey : 'chat.kb.fallbackReply');
    }

    // ============================================
    // Stay-stage detection — same thresholds as js/modules/stay.js's
    // getStayStage() (kept as a separate small copy here rather than
    // a shared import, since this project has no build step / module
    // bundler to share code across files without adding a new global).
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

    function shuffle(array) {
      const copy = array.slice();
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    // Picks up to 5 questions relevant to the current stay stage
    // (stage-tagged + always-relevant "general" ones). If more than 5
    // match, 5 are chosen at random each time this runs.
    function pickTeaserQuestions() {
      const stage = getStayStage();
      const pool = KNOWLEDGE_BASE.filter((q) => q.category === stage || q.category === 'general');
      return pool.length > 5 ? shuffle(pool).slice(0, 5) : pool;
    }

    function renderTeaser() {
      const questions = pickTeaserQuestions();
      teaserListEl.innerHTML = questions.map((q) => `
        <button class="chat-suggested-item" data-open-module="chat" data-chat-key="${q.id}">${RIGODAL_I18N.t(q.chipKey)}</button>
      `).join('');
    }

    // Every question, unfiltered, for the full chat overlay
    function renderOverlaySuggestions() {
      suggestionsEl.innerHTML = KNOWLEDGE_BASE.map((q) => `
        <button class="chip" data-chat-key="${q.id}">${RIGODAL_I18N.t(q.chipKey)}</button>
      `).join('');
    }

    function addMessage(text, from) {
      const msg = document.createElement('div');
      msg.className = `chat-msg from-${from}`;
      msg.textContent = text;
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'chat-typing';
      typing.id = 'typingIndicator';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messagesEl.appendChild(typing);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
      const typing = document.getElementById('typingIndicator');
      if (typing) typing.remove();
    }

    function sendMessage(displayText, replyId) {
      if (!displayText || !displayText.trim()) return;
      addMessage(displayText, 'user');
      showTyping();
      setTimeout(() => {
        hideTyping();
        const reply = replyId ? getReplyById(replyId) : getReplyByKeyword(displayText);
        addMessage(reply, 'rudi');
      }, 700 + Math.random() * 500);
    }

    function openChat(prefillKey, prefillLabel) {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (rudiFab) rudiFab.classList.add('is-hidden-for-chat');

      if (messagesEl.children.length === 0) {
        addMessage(RIGODAL_I18N.t('chat.greeting'), 'rudi');
      }
      if (prefillKey) {
        setTimeout(() => sendMessage(prefillLabel, prefillKey), 300);
      }
    }

    function closeChat() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (rudiFab) rudiFab.classList.remove('is-hidden-for-chat');
    }

    // Any element anywhere on the page with data-open-module="chat" opens
    // this. If it also has data-chat-key, its own (translated) label is
    // sent as the user's message and the matching reply is looked up by
    // id — never by re-parsing hardcoded English text. Uses event
    // delegation on document.body so it works for the teaser's chips too,
    // which are (re)rendered dynamically and wouldn't otherwise be caught
    // by a one-time querySelectorAll at init time.
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-open-module="chat"]');
      if (!btn) return;
      const key = btn.dataset.chatKey;
      const label = btn.textContent.trim();
      openChat(key, label);
    });

    closeBtn.addEventListener('click', closeChat);
    suggestionsEl.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-chat-key]');
      if (chip) sendMessage(chip.textContent.trim(), chip.dataset.chatKey);
    });

    // Free-text typing (if the input row is ever re-enabled) still works
    // via keyword matching across all supported languages.
    if (chatInput && chatSendBtn) {
      chatSendBtn.addEventListener('click', () => sendMessage(chatInput.value));
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage(chatInput.value);
      });
    }

    renderTeaser();
    renderOverlaySuggestions();
    document.addEventListener('rigodal:langchange', () => {
      renderTeaser();
      renderOverlaySuggestions();
    });
  }
});
