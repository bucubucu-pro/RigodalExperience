/* ============================================
   MODULE: CHAT (Ask Rigó Rudi)
   Unlike other modules, this one is an overlay, not
   an inline page section. It still registers a small
   inline teaser card (shown in the normal scroll flow)
   PLUS the full-screen overlay markup, injected once
   into a dedicated overlay mount point.

   TO UPGRADE TO REAL AI: replace getRudiResponse()'s
   body with a fetch() call to your AI backend and keep
   everything else as-is.
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
            <button class="chat-suggested-item" data-open-module="chat" data-prompt="Where can I have breakfast?" data-i18n="chat.q1">🍳 Where can I have breakfast?</button>
            <button class="chat-suggested-item" data-open-module="chat" data-prompt="What's open on Sunday?" data-i18n="chat.q2">📅 What's open on Sunday?</button>
            <button class="chat-suggested-item" data-open-module="chat" data-prompt="How do I use the air conditioner?" data-i18n="chat.q3">❄️ How do I use the AC?</button>
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
        <button class="chip" data-chat-prompt="Where can I have breakfast?" data-i18n="chat.suggestBreakfast">🍳 Breakfast spots</button>
        <button class="chip" data-chat-prompt="What's open on Sunday?" data-i18n="chat.suggestSunday">📅 Sunday hours</button>
        <button class="chip" data-chat-prompt="How do I use the air conditioner?" data-i18n="chat.suggestAC">❄️ AC help</button>
        <button class="chip" data-chat-prompt="Where should I park?" data-i18n="chat.suggestParking">🚗 Parking</button>
        <button class="chip" data-chat-prompt="Which winery do you recommend?" data-i18n="chat.suggestWine">🍷 Wine tips</button>
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

    const KNOWLEDGE_BASE = [
      { keys: ['breakfast', 'reggeli'], reply: "For breakfast, I recommend Debrődi Fagyizó for something sweet, or the bakery two streets down (Egri Pékség) for fresh kifli. Both open by 7 AM! 🥐" },
      { keys: ['sunday', 'vasárnap'], reply: "Most restaurants and cafés are open on Sundays, but the CBA supermarket closes early at 2 PM. The castle stays open until 6 PM though! 🏰" },
      { keys: ['air condition', 'ac', 'klíma'], reply: "The AC remote is on the nightstand — press the ❄ button once, then use + / - to set your temperature. It usually cools the room in about 10 minutes. ❄️" },
      { keys: ['park', 'parking'], reply: "Free private parking is right outside the house — just pull into the gated area. No booking needed! 🚗" },
      { keys: ['winery', 'wine', 'bor'], reply: "My top pick is Thummerer Pincészet — ask for their Bikavér. It's a 10 minute walk from the house. 🍷" },
      { keys: ['wifi', 'wi-fi', 'internet'], reply: "You'll find the Wi-Fi network and password in the My Stay tab under 'Wi-Fi' — tap to copy the password instantly. 📶" },
      { keys: ['checkout', 'check-out', 'check out'], reply: "Checkout is by 10:00 AM. There's a handy checklist in the My Stay tab to make sure you don't forget anything! ✅" }
    ];

    function getRudiResponse(userText) {
      const lower = userText.toLowerCase();
      const match = KNOWLEDGE_BASE.find((k) => k.keys.some((key) => lower.includes(key)));
      return match ? match.reply
        : "Great question! I'm still learning that one — for anything urgent, tap Contact Host and the family will get right back to you. 🐦";
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

    function sendMessage(text) {
      if (!text.trim()) return;
      addMessage(text, 'user');
      showTyping();
      setTimeout(() => {
        hideTyping();
        addMessage(getRudiResponse(text), 'rudi');
      }, 700 + Math.random() * 500);
    }

    function openChat(prefillPrompt) {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (rudiFab) rudiFab.classList.add('is-hidden-for-chat');

      if (messagesEl.children.length === 0) {
        addMessage(RIGODAL_I18N.t('chat.greeting'), 'rudi');
      }
      if (prefillPrompt) {
        setTimeout(() => sendMessage(prefillPrompt), 300);
      }
    }

    function closeChat() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (rudiFab) rudiFab.classList.remove('is-hidden-for-chat');
    }

    // Any element anywhere on the page with data-open-module="chat" opens this
    document.querySelectorAll('[data-open-module="chat"]').forEach((btn) => {
      btn.addEventListener('click', () => openChat(btn.dataset.prompt));
    });

    closeBtn.addEventListener('click', closeChat);
    suggestionsEl.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-chat-prompt]');
      if (chip) sendMessage(chip.dataset.chatPrompt);
    });
  }
});
