/* ============================================
   MODULE: EXPLORE (Explore Eger)
   Filterable local place recommendations.
   ============================================ */

RigodalModules.register('explore', {

  html: `
    <section class="section explore-section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="explore.eyebrow">The village map</div>
        <h2 class="section-title" data-i18n="explore.title">Explore Eger</h2>
        <p class="section-subtitle" data-i18n="explore.subtitle">Rudi's personal recommendations, curated for you.</p>
      </div>

      <div class="filter-scroll" id="filterScroll">
        <button class="chip is-active" data-filter="all" data-i18n="explore.filterAll">✨ All</button>
        <button class="chip" data-filter="wine" data-i18n="explore.filterWine">🍷 Wineries</button>
        <button class="chip" data-filter="food" data-i18n="explore.filterFood">🍽 Restaurants</button>
        <button class="chip" data-filter="cafe" data-i18n="explore.filterCafe">☕ Cafés</button>
        <button class="chip" data-filter="sights" data-i18n="explore.filterSights">🏰 Attractions</button>
        <button class="chip" data-filter="shop" data-i18n="explore.filterShop">🛒 Supermarkets</button>
        <button class="chip" data-filter="pharmacy" data-i18n="explore.filterPharmacy">🚑 Pharmacy</button>
        <button class="chip" data-filter="taxi" data-i18n="explore.filterTaxi">🚕 Taxi</button>
        <button class="chip" data-filter="family" data-i18n="explore.filterFamily">👨‍👩‍👧 Family</button>
      </div>

      <div class="container" id="placeList"></div>
    </section>
  `,

  init: function () {
    const listEl = document.getElementById('placeList');
    const filterEl = document.getElementById('filterScroll');
    let activeFilter = 'all';

    function renderPlaces() {
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
            <div class="place-name">${p.name}</div>
            <div class="place-meta">${p.meta}</div>
            <div class="place-rec">"${p.rec}"</div>
          </div>
          <a class="place-nav-btn" href="https://maps.google.com/?q=${p.lat},${p.lng}" target="_blank" rel="noopener" aria-label="Navigate to ${p.name}">➤</a>
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

    renderPlaces();
  }
});
