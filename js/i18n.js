/* ============================================
   I18N ENGINE
   Reads RIGODAL_TRANSLATIONS and swaps any element
   with a data-i18n="key" attribute. Also exposes
   window.RIGODAL_I18N.t(key) for use in other JS files
   (e.g. dynamically rendered content in explore.js,
   adventure.js, faq.js).

   To add a language: add it to translations.js, then
   add a matching button in the footer's language switcher
   with data-lang="xx".
   ============================================ */

const RIGODAL_I18N = (function () {
  const STORAGE_KEY = 'rigodal_lang';
  const DEFAULT_LANG = 'hu';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function t(key) {
    const lang = getLang();
    const dict = RIGODAL_TRANSLATIONS[lang] || RIGODAL_TRANSLATIONS[DEFAULT_LANG];
    return dict[key] || RIGODAL_TRANSLATIONS[DEFAULT_LANG][key] || key;
  }

  function applyToDOM() {
    document.documentElement.lang = getLang();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });

    // Update active state on language switch buttons
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === getLang());
    });
  }

  function switchLang(lang) {
    if (!RIGODAL_TRANSLATIONS[lang]) return;
    setLang(lang);
    applyToDOM();
    // Let other modules (explore.js, adventure.js, faq.js) know they
    // need to re-render their dynamically-built content in the new language.
    document.dispatchEvent(new CustomEvent('rigodal:langchange', { detail: { lang } }));
  }

  // Wire up language switch buttons once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    applyToDOM();
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => switchLang(btn.dataset.lang));
    });
  });

  return { t, getLang, switchLang, applyToDOM };
})();

// Expose globally for other scripts to use (e.g. window.RIGODAL_I18N.t('chat.greeting'))
window.RIGODAL_I18N = RIGODAL_I18N;
