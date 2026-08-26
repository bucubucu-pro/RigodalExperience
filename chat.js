/* ============================================
   ASK RIGÓ RUDI (chat)
   Currently: simple keyword-matched responder.
   TO UPGRADE TO REAL AI: replace getRudiResponse()'s body
   with a fetch() call to your AI backend/API and keep
   everything else (rendering, typing indicator) as-is.
   ============================================ */

(function () {
  const overlay = document.getElementById('chatOverlay');
  const messagesEl = document.getElementById('chatMessages');
  const inputEl = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const closeBtn = document.getElementById('chatCloseBtn');
  const suggestionsEl = document.getElementById('chatSuggestions');

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
    return match
      ? match.reply
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
    inputEl.value = '';
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

    if (messagesEl.children.length === 0) {
      addMessage("Szia! I'm Rudi 🐦 Ask me anything about your stay or Eger.", 'rudi');
    }

    if (prefillPrompt) {
      setTimeout(() => sendMessage(prefillPrompt), 300);
    }
  }

  function closeChat() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // --- Event wiring ---
  document.querySelectorAll('[data-open-chat]').forEach((btn) => {
    btn.addEventListener('click', () => openChat(btn.dataset.prompt));
  });

  closeBtn.addEventListener('click', closeChat);
  sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(inputEl.value);
  });

  suggestionsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-chat-prompt]');
    if (chip) sendMessage(chip.dataset.chatPrompt);
  });
})();
