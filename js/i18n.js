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
    const dict = RIGODAL_TRANSLATIONS[lang] || RIGODAL_TRANSLATIONS[DEFAULT_LANG] || {};
    if (dict[key]) return dict[key];

    // Fallback chain: current language -> Hungarian default -> English
    // (the most complete "source" language) -> the raw key as a last resort.
    const huDict = RIGODAL_TRANSLATIONS[DEFAULT_LANG] || {};
    if (huDict[key]) return huDict[key];

    const enDict = RIGODAL_TRANSLATIONS['en'] || {};
    if (enDict[key]) return enDict[key];

    console.warn(`RIGODAL_I18N: missing translation for key "${key}" in every language.`);
    return key;
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
    if (!RIGODAL_TRANSLATIONS[lang]) {
      console.warn(`RIGODAL_I18N: tried to switch to "${lang}" but no translations exist for it. Check that translations.js was uploaded correctly and includes a "${lang}:" block.`);
      return;
    }
    setLang(lang);
    applyToDOM();
    // Let other modules (explore.js, adventure.js, faq.js) know they
    // need to re-render their dynamically-built content in the new language.
    document.dispatchEvent(new CustomEvent('rigodal:langchange', { detail: { lang } }));
  }

  // Apply translations once modules have mounted (module HTML has
  // data-i18n attributes that don't exist until then). Also apply
  // immediately for any static shell text (nav, footer) already in the DOM.
  document.addEventListener('DOMContentLoaded', () => {
    applyToDOM();
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => switchLang(btn.dataset.lang));
    });
  });

  document.addEventListener('rigodal:modulesmounted', applyToDOM);

  return { t, getLang, switchLang, applyToDOM };
})();

// Expose globally for other scripts to use (e.g. window.RIGODAL_I18N.t('chat.greeting'))
window.RIGODAL_I18N = RIGODAL_I18N;
