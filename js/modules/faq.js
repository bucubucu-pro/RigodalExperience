/* ============================================
   MODULE: FAQ
   Questions/answers live in translations.js (keys faq.q1..q5,
   faq.a1..a5) so they switch correctly with the language
   toggle — NOT in data.js, which isn't translated.
   To add a question: add faq.q6/faq.a6 (etc.) to every
   language block in translations.js, then add 6 to
   QUESTION_COUNT below.
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
    const QUESTION_COUNT = 5; // matches faq.q1..q5 / faq.a1..a5 in translations.js

    function render() {
      let html = '';
      for (let i = 1; i <= QUESTION_COUNT; i++) {
        html += `
          <div class="faq-item" data-index="${i}">
            <button class="faq-question">
              <span data-i18n="faq.q${i}">${RIGODAL_I18N.t('faq.q' + i)}</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer"><div data-i18n="faq.a${i}">${RIGODAL_I18N.t('faq.a' + i)}</div></div>
          </div>
        `;
      }
      listEl.innerHTML = html;
    }

    listEl.addEventListener('click', (e) => {
      const question = e.target.closest('.faq-question');
      if (!question) return;
      question.closest('.faq-item').classList.toggle('is-open');
    });

    render();
    // Language switch doesn't need to re-render here: the data-i18n
    // attributes above are picked up automatically by i18n.js's
    // applyToDOM() on every language change.
  }
});
