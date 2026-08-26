/* ============================================
   EXPLORE EGER
   Handles: category filtering, place card rendering,
   navigation handoff to Google/Apple Maps, and
   re-rendering text when the language changes.
   ============================================ */

(function () {
  const listEl = document.getElementById('placeList');
  const filterEl = document.getElementById('filterScroll');
  let activeFilter = 'all';

  function lang() {
    return (window.RIGODAL_I18N && window.RIGODAL_I18N.getLang()) || 'hu';
  }

  function renderPlaces() {
    const currentLang = lang();
    const places = RIGODAL_DATA.places.filter(
      (p) => activeFilter === 'all' || p.category === activeFilter
    );

    listEl.innerHTML = places.map((p) => `
      <div class="place-card">
        <div class="place-thumb">
          ${p.icon}
          <span class="place-status-dot ${p.open ? 'open' : 'closed'}"></span>
        </div>
        <div class="place-info">
          <div class="place-name">${p.name[currentLang]}</div>
          <div class="place-meta">${p.meta[currentLang]}</div>
          <div class="place-rec">"${p.rec[currentLang]}"</div>
        </div>
        <a class="place-nav-btn" href="https://maps.google.com/?q=${p.lat},${p.lng}" target="_blank" rel="noopener" aria-label="Navigate to ${p.name[currentLang]}">➤</a>
      </div>
    `).join('');
  }

  filterEl.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-filter]');
    if (!chip) return;

    filterEl.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    activeFilter = chip.dataset.filter;
    renderPlaces();
  });

  // Re-render place cards in the new language (chips themselves
  // are static HTML with data-i18n, handled by i18n.js already)
  document.addEventListener('rigodal:langchange', renderPlaces);

  renderPlaces();
})();
