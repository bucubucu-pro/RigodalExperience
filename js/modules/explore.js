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

      <div class="filter-scroll-wrap">
        <div class="filter-scroll" id="filterScroll">
          <button class="chip is-active" data-filter="all" data-i18n="explore.filterAll">✨ All</button>
          <button class="chip" data-filter="daytrip" data-i18n="explore.filterDaytrip">🚂 Day Trips</button>
          <button class="chip" data-filter="wine" data-i18n="explore.filterWine">🍷 Wineries</button>
          <button class="chip" data-filter="food" data-i18n="explore.filterFood">🍽 Restaurants</button>
          <button class="chip" data-filter="cafe" data-i18n="explore.filterCafe">☕ Cafés</button>
          <button class="chip" data-filter="sights" data-i18n="explore.filterSights">🏰 Attractions</button>
          <button class="chip" data-filter="family" data-i18n="explore.filterFamily">👨‍👩‍👧 Family</button>
          <button class="chip" data-filter="shop" data-i18n="explore.filterShop">🛒 Supermarkets</button>
          <button class="chip" data-filter="pharmacy" data-i18n="explore.filterPharmacy">🚑 Pharmacy</button>
          <button class="chip" data-filter="taxi" data-i18n="explore.filterTaxi">🚕 Taxi</button>
        </div>
      </div>

      <div class="container" id="placeList"></div>
    </section>
  `,

  init: function () {
    const listEl = document.getElementById('placeList');
    const filterEl = document.getElementById('filterScroll');
    let activeFilter = 'all';

    const PAGE_SIZE = 5;
    let visibleCount = PAGE_SIZE;

    function placeCardHtml(p) {
      return `
        <div class="place-card">
          <div class="place-thumb">
            ${p.icon}
          </div>
          <div class="place-info">
            <div class="place-name">${p.name}</div>
            ${p.rating ? `<div class="place-meta">⭐ ${p.rating.toFixed(1)} on Google</div>` : ''}
            <div class="place-rec">"${p.rec}"</div>
          </div>
          <div class="place-actions">
            <a class="place-nav-btn" href="${p.gmaps}" target="_blank" rel="noopener" aria-label="Open ${p.name} in Google Maps">📍</a>
            ${p.website ? `<a class="place-nav-btn place-web-btn" href="${p.website}" target="_blank" rel="noopener" aria-label="Visit ${p.name} website">🌐</a>` : ''}
          </div>
        </div>
      `;
    }

    function renderPlaces() {
      const allMatches = RIGODAL_DATA.places.filter(
        (p) => activeFilter === 'all' || p.category === activeFilter
      );
      const shown = allMatches.slice(0, visibleCount);
      const remaining = allMatches.length - shown.length;

      let html = shown.map(placeCardHtml).join('');

      if (remaining > 0) {
        html += `
          <button class="show-more-btn" id="showMoreBtn">
            <span data-i18n="explore.showMore">Show more</span> (${remaining})
          </button>
        `;
      }

      listEl.innerHTML = html;

      const showMoreBtn = document.getElementById('showMoreBtn');
      if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
          visibleCount += PAGE_SIZE;
          renderPlaces();
        });
      }
    }

    filterEl.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-filter]');
      if (!chip) return;

      filterEl.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeFilter = chip.dataset.filter;
      visibleCount = PAGE_SIZE; // reset paging whenever the filter changes
      renderPlaces();
    });

    renderPlaces();
  }
});
