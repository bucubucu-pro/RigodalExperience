/* ============================================
   MODULE: CHAT (Ask Rigó Rudi)
   Unlike other modules, this one is an overlay, not
   an inline page section. It still registers a small
   inline teaser card (shown in the normal scroll flow)
   PLUS the full-screen overlay markup, injected once
   into a dedicated overlay mount point.

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
          <div class="chat-suggested-list">
            <button class="chat-suggested-item" data-open-module="chat" data-chat-key="breakfast" data-i18n="chat.q1">🍳 Where can I have breakfast?</button>
            <button class="chat-suggested-item" data-open-module="chat" data-chat-key="sunday" data-i18n="chat.q2">📅 What's open on Sunday?</button>
            <button class="chat-suggested-item" data-open-module="chat" data-chat-key="ac" data-i18n="chat.q3">❄️ How do I use the AC?</button>
          </div>
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
      <div class="chat-suggestions" id="chatSuggestions">
        <button class="chip" data-chat-key="breakfast" data-i18n="chat.suggestBreakfast">🍳 Breakfast spots</button>
        <button class="chip" data-chat-key="sunday" data-i18n="chat.suggestSunday">📅 Sunday hours</button>
        <button class="chip" data-chat-key="ac" data-i18n="chat.suggestAC">❄️ AC help</button>
        <button class="chip" data-chat-key="parking" data-i18n="chat.suggestParking">🚗 Parking</button>
        <button class="chip" data-chat-key="wine" data-i18n="chat.suggestWine">🍷 Wine tips</button>
      </div>
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
    const rudiFab = document.getElementById('rudiFab');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    // Knowledge base keywords stay language-agnostic (checked against
    // free-typed text, in any language), but the REPLIES are pulled live
    // from translations.js via RIGODAL_I18N.t() — so the chatbot always
    // answers in whichever language is currently active. Each entry also
    // has an "id" so suggestion chips can jump straight to a reply without
    // relying on keyword matching at all.
    const KNOWLEDGE_BASE = [
      { id: 'breakfast', keys: ['breakfast', 'reggeli', 'frühstück', 'śniadanie', 'petit-déjeuner', 'petit dejeuner'], replyKey: 'chat.kb.breakfastReply' },
      { id: 'sunday', keys: ['sunday', 'vasárnap', 'sonntag', 'niedziel', 'dimanche'], replyKey: 'chat.kb.sundayReply' },
      { id: 'ac', keys: ['air condition', ' ac', 'klíma', 'klima', 'klimatyzacj', 'climatisation', 'clim'], replyKey: 'chat.kb.acReply' },
      { id: 'parking', keys: ['park', 'parkolás', 'parkplatz', 'parking'], replyKey: 'chat.kb.parkingReply' },
      { id: 'wine', keys: ['winery', 'wine', 'bor', 'wein', 'wino', 'vin'], replyKey: 'chat.kb.wineReply' },
      { id: 'wifi', keys: ['wifi', 'wi-fi', 'internet'], replyKey: 'chat.kb.wifiReply' },
      { id: 'checkout', keys: ['checkout', 'check-out', 'check out', 'kijelentkezés', 'auschecken', 'wymeldowanie', 'départ', 'depart'], replyKey: 'chat.kb.checkoutReply' }
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

    // Any element anywhere on the page with data-open-module="chat" opens this.
    // If it also has data-chat-key, its own (translated) label is sent as
    // the user's message and the matching reply is looked up by id —
    // never by re-parsing hardcoded English text.
    document.querySelectorAll('[data-open-module="chat"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.chatKey;
        const label = btn.textContent.trim();
        openChat(key, label);
      });
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
  }
});
