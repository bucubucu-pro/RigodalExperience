/* ============================================
   HERO
   Handles: countdown ring, weather chip, Rudi tap greeting.
   ============================================ */

(function () {
  const RING_CIRCUMFERENCE = 377; // 2 * PI * 60 (matches SVG r=60)

  const ring = document.getElementById('countdownRing');
  const valueEl = document.getElementById('countdownValue');
  const unitEl = document.getElementById('countdownUnit');
  const labelEl = document.getElementById('countdownLabel');

  function updateCountdown() {
    const { checkIn, checkOut } = RIGODAL_DATA.booking;
    const now = new Date();
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    let target, label, totalWindowMs;

    if (now < inDate) {
      target = inDate;
      label = 'Check-in in';
      totalWindowMs = 3 * 24 * 60 * 60 * 1000; // assume 3-day lead window for ring fill
    } else if (now < outDate) {
      target = outDate;
      label = 'Check-out in';
      totalWindowMs = outDate - inDate;
    } else {
      labelEl.textContent = 'We hope you enjoyed your stay!';
      valueEl.textContent = '👋';
      unitEl.textContent = '';
      ring.style.strokeDashoffset = 0;
      return;
    }

    const diffMs = target - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    labelEl.textContent = label;
    if (diffDays > 0) {
      valueEl.textContent = diffDays;
      unitEl.textContent = diffDays === 1 ? 'day' : 'days';
    } else {
      valueEl.textContent = diffHours;
      unitEl.textContent = diffHours === 1 ? 'hour' : 'hours';
    }

    const remainingRatio = Math.max(0, Math.min(1, diffMs / totalWindowMs));
    const offset = RING_CIRCUMFERENCE * remainingRatio;
    ring.style.strokeDashoffset = offset;
  }

  updateCountdown();
  setInterval(updateCountdown, 60 * 1000); // refresh every minute

  // --- Weather (placeholder — swap in a real API call later) ---
  // To connect a real API: fetch from a weather service using the
  // guesthouse's fixed lat/lng and update #weatherTemp + emoji.
  function updateWeatherPlaceholder() {
    const temp = document.getElementById('weatherTemp');
    temp.textContent = '24°C';
  }
  updateWeatherPlaceholder();

  // --- Rudi tap greeting ---
  const greetings = [
    "Szia! I've been expecting you 🐦",
    "The garden looks lovely today — go see it!",
    "Need anything? Just tap the chat button.",
    "Fun fact: I know every winery in town 🍷"
  ];
  let greetingIndex = 0;
  const rudiBtn = document.getElementById('rudiTapTarget');
  const greetingBubble = document.getElementById('rudiGreeting');

  rudiBtn.addEventListener('click', () => {
    greetingIndex = (greetingIndex + 1) % greetings.length;
    greetingBubble.style.opacity = 0;
    setTimeout(() => {
      greetingBubble.textContent = greetings[greetingIndex];
      greetingBubble.style.opacity = 1;
    }, 200);
    rudiBtn.style.transform = 'scale(1.15) rotate(8deg)';
    setTimeout(() => { rudiBtn.style.transform = ''; }, 250);
  });
})();
