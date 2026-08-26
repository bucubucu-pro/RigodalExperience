/* ============================================
   ASK RIGÓ RUDI (chat)
   Currently: simple keyword-matched responder.
   TO UPGRADE TO REAL AI: replace getRudiResponse()'s body
   with a fetch() call to your AI backend/API and keep
   everything else (rendering, typing indicator) as-is.

   Free-text input is intentionally hidden in the HTML —
   guests reply via the suggestion chips only. To bring
   the text input back later, remove the `hidden` attribute
   on #chatInputRow in index.html and delete the
   .chat-hint-footer div.
   ============================================ */

(function () {
  const overlay = document.getElementById('chatOverlay');
  const messagesEl = document.getElementById('chatMessages');
  const inputEl = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const closeBtn = document.getElementById('chatCloseBtn');
  const suggestionsEl = document.getElementById('chatSuggestions');
  const rudiFab = document.getElementById('rudiFab');

  function lang() {
    return (window.RIGODAL_I18N && window.RIGODAL_I18N.getLang()) || 'hu';
  }

  function t(key, fallback) {
    return (window.RIGODAL_I18N && window.RIGODAL_I18N.t(key)) || fallback;
  }

  const KNOWLEDGE_BASE = [
    { keys: ['breakfast', 'reggeli'],
      reply: {
        en: "For breakfast, I recommend Debrődi Fagyizó for something sweet, or the bakery two streets down (Egri Pékség) for fresh kifli. Both open by 7 AM! 🥐",
        hu: "Reggelihez ajánlom a Debrődi Fagyizót valami édeshez, vagy a két utcával arrébb lévő pékséget (Egri Pékség) friss kiflihez. Mindkettő 7 órakor nyit! 🥐"
      } },
    { keys: ['sunday', 'vasárnap'],
      reply: {
        en: "Most restaurants and cafés are open on Sundays, but the CBA supermarket closes early at 2 PM. The castle stays open until 6 PM though! 🏰",
        hu: "A legtöbb étterem és kávézó nyitva van vasárnap, de a CBA szupermarket 14:00-kor bezár. A vár viszont 18:00-ig nyitva tart! 🏰"
      } },
    { keys: ['air condition', 'ac', 'klíma'],
      reply: {
        en: "The AC remote is on the nightstand — press the ❄ button once, then use + / - to set your temperature. It usually cools the room in about 10 minutes. ❄️",
        hu: "A klíma távirányítója az éjjeliszekrényen van — nyomd meg egyszer a ❄ gombot, majd a + / - gombokkal állítsd be a hőmérsékletet. Kb. 10 perc alatt lehűl a szoba. ❄️"
      } },
    { keys: ['park', 'parking', 'parkol'],
      reply: {
        en: "Free private parking is right outside the house — just pull into the gated area. No booking needed! 🚗",
        hu: "Ingyenes privát parkoló van közvetlenül a ház előtt — csak hajts be a kerített területre. Nem kell előre foglalni! 🚗"
      } },
    { keys: ['winery', 'wine', 'bor'],
      reply: {
        en: "My top pick is Thummerer Pincészet — ask for their Bikavér. It's a 10 minute walk from the house. 🍷",
        hu: "A kedvencem a Thummerer Pincészet — kérd a Bikavérüket. 10 perc séta a háztól. 🍷"
      } },
    { keys: ['wifi', 'wi-fi', 'internet'],
      reply: {
        en: "You'll find the Wi-Fi network and password in the My Stay tab under 'Wi-Fi' — tap to copy the password instantly. 📶",
        hu: "A Wi-Fi hálózatot és jelszót a Szállásom fülön, a 'Wi-Fi' alatt találod — koppints a jelszó gyors másolásához. 📶"
      } },
    { keys: ['checkout', 'check-out', 'check out', 'kijelentkez'],
      reply: {
        en: "Checkout is by 10:00 AM. There's a handy checklist in the My Stay tab to make sure you don't forget anything! ✅",
        hu: "A kijelentkezés 10:00-ig lehetséges. A Szállásom fülön van egy praktikus lista, hogy semmiről se feledkezz meg! ✅"
      } }
  ];

  const FALLBACK_REPLY = {
    en: "Great question! I'm still learning that one — for anything urgent, tap Contact Host and the family will get right back to you. 🐦",
    hu: "Jó kérdés! Ezt még tanulom — ha sürgős, koppints az 'Írj a házigazdának' gombra, és a család hamarosan válaszol. 🐦"
  };

  function getRudiResponse(userText) {
    const currentLang = lang();
    const lower = userText.toLowerCase();
    const match = KNOWLEDGE_BASE.find((k) => k.keys.some((key) => lower.includes(key)));
    return match ? match.reply[currentLang] : FALLBACK_REPLY[currentLang];
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
    if (!text || !text.trim()) return;
    addMessage(text, 'user');
    if (inputEl) inputEl.value = '';
    showTyping();

    // Simulated latency — swap this timeout for a real fetch() to your AI API
    setTimeout(() => {
      hideTyping();
      addMessage(getRudiResponse(text), 'rudi');
    }, 700 + Math.random() * 500);
  }

  function openChat(prefillPrompt) {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (rudiFab) rudiFab.classList.add('is-hidden-for-chat'); // FAB shouldn't float over the open chat

    if (messagesEl.children.length === 0) {
      const greeting = t('chat.greeting', "Szia! I'm Rudi 🐦 Ask me anything about your stay or Eger.");
      addMessage(greeting, 'rudi');
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

  // --- Event wiring ---
  document.querySelectorAll('[data-open-chat]').forEach((btn) => {
    btn.addEventListener('click', () => openChat(btn.dataset.prompt));
  });

  closeBtn.addEventListener('click', closeChat);

  // Text input is hidden by default (see index.html) but wire it up
  // anyway in case it's ever re-enabled — costs nothing to keep working.
  if (sendBtn) sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage(inputEl.value);
    });
  }

  suggestionsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-chat-prompt]');
    if (chip) sendMessage(chip.dataset.chatPrompt);
  });
})();
