/* ============================================
   FAQ
   Handles: accordion render + expand/collapse, and
   re-rendering text when the language changes.
   Add questions in js/data.js -> faqs array.
   ============================================ */

(function () {
  const listEl = document.getElementById('faqList');

  function lang() {
    return (window.RIGODAL_I18N && window.RIGODAL_I18N.getLang()) || 'hu';
  }

  function render() {
    const currentLang = lang();

    listEl.innerHTML = RIGODAL_DATA.faqs.map((item, i) => `
      <div class="faq-item" data-index="${i}">
        <button class="faq-question">
          <span>${item.q[currentLang]}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer"><div>${item.a[currentLang]}</div></div>
      </div>
    `).join('');
  }

  listEl.addEventListener('click', (e) => {
    const question = e.target.closest('.faq-question');
    if (!question) return;
    question.closest('.faq-item').classList.toggle('is-open');
  });

  document.addEventListener('rigodal:langchange', render);

  render();
})();
