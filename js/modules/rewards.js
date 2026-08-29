/* ============================================
   MODULE: REWARDS (Rewards Club / Rudi's Nest)
   Reads feather progress from a shared storage key
   ('rigodal_progress') that a feather-earning module would
   write to, listening via a custom event so this module
   works even if that module is disabled (nest just stays at 0).

   CURRENTLY DISCONNECTED: the treasure hunt was rebuilt as a
   standalone story experience (hunt.html / js/hunt.js) that does
   NOT use feathers or the 'rigodal_progress' key — it uses its own
   'rigodal_hunt_v2' key instead (see js/modules/adventure.js). So
   right now, nothing in the app actually awards feathers; if you
   re-enable this module, the nest will show 0 until something is
   wired up to award feathers again (e.g. reviews, referrals, or a
   feather bonus added to the hunt's completion step in hunt.js).
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
