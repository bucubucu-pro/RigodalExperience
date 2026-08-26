/* ============================================
   FAQ
   Handles: accordion render + expand/collapse.
   Add questions in js/data.js -> faqs array.
   ============================================ */

(function () {
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
})();
