/* ============================================
   MODULE: FAQ
   Add/edit questions in js/data.js -> faqs array.
   ============================================ */

RigodalModules.register('faq', {

  html: `
    <section class="section faq-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="faq.eyebrow">Good to know</div>
        <h2 class="section-title" data-i18n="faq.title">FAQ</h2>
        <div id="faqList"></div>
      </div>
    </section>
  `,

  init: function () {
    const listEl = document.getElementById('faqList');

    function render() {
      listEl.innerHTML = RIGODAL_DATA.faqs.map((item, i) => `
        <div class="faq-item" data-index="${i}">
          <button class="faq-question">
            <span>${item.q}</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer"><div>${item.a}</div></div>
        </div>
      `).join('');
    }

    listEl.addEventListener('click', (e) => {
      const question = e.target.closest('.faq-question');
      if (!question) return;
      question.closest('.faq-item').classList.toggle('is-open');
    });

    render();
    // FAQ content is currently only in English/Hungarian via data.js directly
    // (not the translations.js dictionary) — if you want faqs to switch with
    // the language toggle, move them into translations.js instead and read
    // via RIGODAL_I18N.t() here.
  }
});
