/* ============================================
   MODULE: REWARDS (Rewards Club / Rudi's Nest)
   Reads feather progress from the same shared storage
   key the adventure module writes to, but listens via
   a custom event so this module works even if the
   adventure module is disabled (nest just stays at 0).
   ============================================ */

RigodalModules.register('rewards', {

  html: `
    <section class="section rewards-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="rewards.eyebrow">Rudi's nest</div>
        <h2 class="section-title" data-i18n="rewards.title">Rewards Club</h2>
        <p class="section-subtitle" data-i18n="rewards.subtitle">Collect feathers, redeem real perks.</p>

        <div class="nest-card">
          <div class="nest-count" id="nestCount">0</div>
          <div class="nest-label" data-i18n="rewards.nestLabel">Feathers collected</div>
        </div>

        <div class="earn-row"><span data-i18n="rewards.earnBook">📅 Book directly</span><span class="earn-value">+100</span></div>
        <div class="earn-row"><span data-i18n="rewards.earnStay">🌙 Stay 3+ nights</span><span class="earn-value">+30</span></div>
        <div class="earn-row"><span data-i18n="rewards.earnReview">⭐ Leave a review</span><span class="earn-value">+20</span></div>
        <div class="earn-row"><span data-i18n="rewards.earnHunt">🪶 Complete the hunt</span><span class="earn-value">+50</span></div>
        <div class="earn-row"><span data-i18n="rewards.earnReferral">👥 Refer a friend</span><span class="earn-value">+150</span></div>

        <div class="reward-gifts">
          <div class="gift-box" data-cost="40"><div class="gift-icon">🛏️</div><div class="gift-name" data-i18n="rewards.giftLateCheckout">Late Checkout</div><div class="gift-cost">40 🪶</div></div>
          <div class="gift-box" data-cost="120"><div class="gift-icon">🏷️</div><div class="gift-name" data-i18n="rewards.giftDiscount">Next Stay Discount</div><div class="gift-cost">120 🪶</div></div>
          <div class="gift-box" data-cost="80"><div class="gift-icon">🍷</div><div class="gift-name" data-i18n="rewards.giftWine">Local Wine</div><div class="gift-cost">80 🪶</div></div>
          <div class="gift-box" data-cost="150"><div class="gift-icon">🧺</div><div class="gift-name" data-i18n="rewards.giftBasket">Welcome Basket</div><div class="gift-cost">150 🪶</div></div>
        </div>
      </div>
    </section>
  `,

  init: function () {
    const nestCountEl = document.getElementById('nestCount');
    const STORAGE_KEY = 'rigodal_progress';

    function readFeathers() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw).feathers || 0 : 0;
      } catch (e) {
        return 0;
      }
    }

    function updateGiftLocks(feathers) {
      document.querySelectorAll('.gift-box[data-cost]').forEach((box) => {
        const cost = Number(box.dataset.cost);
        box.classList.toggle('is-locked', feathers < cost);
      });
    }

    function render() {
      const feathers = readFeathers();
      nestCountEl.textContent = feathers;
      updateGiftLocks(feathers);
    }

    render();

    // Update live if the adventure module (or anything else) awards feathers
    document.addEventListener('rigodal:feathersChanged', render);
  }
});
