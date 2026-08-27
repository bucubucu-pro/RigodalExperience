/* ============================================
   MODULE TEMPLATE
   Copy this file to create a new module.

   STEPS TO ADD A NEW MODULE:
   1. Copy this file to js/modules/yourModuleName.js
   2. Change 'template' to your module's id everywhere below
   3. Write your HTML in the `html` string
   4. Write your behavior in `init()`
   5. Add one entry to js/modules.config.js
   6. Add a <script src="js/modules/yourModuleName.js"> tag
      in index.html, near the other module scripts
      (order doesn't matter for modules, but must load
      before app.js)
   7. (Optional) Add translation keys to js/translations.js

   That's it — no other file needs to change.
   ============================================ */

RigodalModules.register('template', {

  // This HTML gets injected into the page automatically,
  // wrapped in a <div id="module-template">. Keep IDs used in
  // this HTML unique to this module (prefix them) to avoid
  // clashing with other modules, e.g. "template-title" not "title".
  html: `
    <section class="section" data-section>
      <div class="container">
        <div class="section-eyebrow" data-i18n="template.eyebrow">Eyebrow text</div>
        <h2 class="section-title" data-i18n="template.title">Module Title</h2>
        <p class="section-subtitle" data-i18n="template.subtitle">Subtitle text</p>

        <div id="templateContent">
          <!-- dynamic content rendered by init() goes here -->
        </div>
      </div>
    </section>
  `,

  // Runs once, right after this module's HTML is inserted into the page.
  // Wire up event listeners and render any dynamic content here.
  init: function () {
    const content = document.getElementById('templateContent');
    if (!content) return;

    content.innerHTML = `<p>Hello from the template module!</p>`;

    // Example: listen for language change and re-render translated content
    document.addEventListener('rigodal:langchange', () => {
      // re-render anything that has hardcoded (non data-i18n) text here
    });
  }
});
