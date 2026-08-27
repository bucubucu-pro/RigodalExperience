/* ============================================
   MODULE REGISTRY ENGINE
   Each module file (js/modules/*.js) calls
   RigodalModules.register({...}) to describe itself.
   This engine then, on page load:
     1. Reads modules.config.js for enabled/order/nav info
     2. Injects each enabled module's HTML into <main>
     3. Builds the nav bar + hero quick-actions from config
     4. Calls each module's init() function, in order
     5. Skips anything disabled — no HTML/JS runs for it

   You should not need to edit this file when adding
   or removing modules. Edit modules.config.js instead.
   ============================================ */

const RigodalModules = (function () {
  const registered = {}; // id -> { html, init }

  function register(moduleId, definition) {
    registered[moduleId] = definition;
  }

  function getEnabledConfigsInOrder() {
    return RIGODAL_MODULES_CONFIG.filter((cfg) => cfg.enabled);
  }

  function buildNav() {
    const navContainer = document.getElementById('tabBar');
    if (!navContainer) return;

    const navConfigs = getEnabledConfigsInOrder().filter((cfg) => cfg.inNav);

    navContainer.innerHTML = navConfigs.map((cfg, i) => {
      const labelText = window.RIGODAL_I18N ? window.RIGODAL_I18N.t(cfg.navLabelKey) : cfg.navLabelKey;
      const label = `<span data-i18n="${cfg.navLabelKey}">${labelText}</span>`;
      const activeClass = i === 0 ? 'is-active' : '';

      if (cfg.isAction) {
        return `
          <button class="tab-item ${activeClass}" data-tab data-open-module="${cfg.id}">
            <span class="tab-icon">${cfg.navIcon}</span>${label}
          </button>`;
      }

      return `
        <a href="#module-${cfg.id}" class="tab-item ${activeClass}" data-tab data-nav-link>
          <span class="tab-icon">${cfg.navIcon}</span>${label}
        </a>`;
    }).join('');
  }

  function buildHeroActions() {
    const heroContainer = document.getElementById('heroActionsContainer');
    if (!heroContainer) return;

    const heroConfigs = getEnabledConfigsInOrder().filter((cfg) => cfg.inHeroActions);

    heroContainer.innerHTML = heroConfigs.map((cfg) => {
      const labelText = window.RIGODAL_I18N ? window.RIGODAL_I18N.t(cfg.heroLabelKey) : cfg.heroLabelKey;
      const label = `<span class="hero-action-label" data-i18n="${cfg.heroLabelKey}">${labelText}</span>`;

      if (cfg.isAction) {
        return `
          <button class="hero-action-card" data-open-module="${cfg.id}">
            <span class="hero-action-icon">${cfg.heroIcon}</span>${label}
          </button>`;
      }

      return `
        <a href="#module-${cfg.id}" class="hero-action-card" data-nav-link>
          <span class="hero-action-icon">${cfg.heroIcon}</span>${label}
        </a>`;
    }).join('');
  }

  function mountModules() {
    const main = document.getElementById('moduleMount');
    if (!main) return;

    const enabled = getEnabledConfigsInOrder();
    const htmlParts = [];

    enabled.forEach((cfg) => {
      const mod = registered[cfg.id];
      if (!mod) {
        console.warn(`Module "${cfg.id}" is enabled in config but has no matching js/modules/${cfg.id}.js file (or it didn't register itself).`);
        return;
      }
      // Wrap each module's HTML in a labeled anchor point so nav links
      // (#module-stay, #module-explore, etc.) work automatically.
      htmlParts.push(`<div id="module-${cfg.id}" data-module="${cfg.id}">${mod.html}</div>`);
    });

    main.innerHTML = htmlParts.join('\n');

    // Now that HTML is in the DOM, run each module's init logic (event
    // wiring, rendering dynamic content, etc.) in the same order.
    enabled.forEach((cfg) => {
      const mod = registered[cfg.id];
      if (mod && typeof mod.init === 'function') {
        try {
          mod.init();
        } catch (err) {
          console.error(`Error initializing module "${cfg.id}":`, err);
        }
      }
    });

    // Note: no event dispatched here — it now fires once at the very
    // end of init(), after nav + hero actions are also built, so every
    // dynamically-generated element (module HTML AND nav/hero buttons)
    // exists before i18n/scrollEngine try to wire themselves up.
  }

  function init() {
    mountModules();
    buildNav();
    buildHeroActions();
    document.dispatchEvent(new CustomEvent('rigodal:modulesmounted'));
  }

  return { register, init, isEnabled: isModuleEnabled };
})();
