/* ============================================
   MODULE CONFIG
   This is your control panel. To turn a module on/off,
   change its "enabled" value. To reorder modules on the
   page, reorder this array. To add a new module, see
   /js/modules/_TEMPLATE.js and add one line here.

   You should rarely need to touch any other file when
   adding, removing, or reordering a module.
   ============================================ */

const RIGODAL_MODULES_CONFIG = [
  {
    id: 'hero',
    enabled: true,
    inNav: false,        // hero is not a nav tab, it's the top of the page
    inHeroActions: false // hero can't link to itself
  },
  {
    id: 'stay',
    enabled: true,
    inNav: true,
    navIcon: '🔑',
    navLabelKey: 'nav.stay',
    inHeroActions: true,
    heroIcon: '🔑',
    heroLabelKey: 'hero.actionStay'
  },
  {
    id: 'explore',
    enabled: true,
    inNav: true,
    navIcon: '🗺️',
    navLabelKey: 'nav.explore',
    inHeroActions: true,
    heroIcon: '🗺️',
    heroLabelKey: 'hero.actionExplore'
  },
  {
    id: 'adventure',
    enabled: true, // The real treasure hunt is built now — see hunt.html
    inNav: true,
    navIcon: '🪶',
    navLabelKey: 'nav.hunt',
    inHeroActions: true,
    heroIcon: '🪶',
    heroLabelKey: 'hero.actionHunt'
  },
  {
    id: 'rewards',
    enabled: false, // Turned off for now — depends on adventure's feather system
    inNav: false,
    inHeroActions: false
  },
  {
    id: 'chat',
    enabled: true,
    inNav: true,
    navIcon: '💬',
    navLabelKey: 'nav.rudi',
    isAction: true, // opens overlay instead of scrolling to a section
    // Not in the hero's 4-card grid anymore — the hero now shows real
    // host contact options (Call + WhatsApp, hardcoded in hero.js)
    // instead of a generic "Contact Host" card that opened the AI chat.
    // Ask Rudi is still one tap away via the bottom nav tab and the
    // floating chat button — nothing about the AI chat itself changed.
    inHeroActions: false
  },
  {
    id: 'proof',
    enabled: true,
    inNav: false,
    inHeroActions: false
  },
  {
    id: 'cta',
    enabled: true,
    inNav: false,
    inHeroActions: false
  },
  {
    id: 'faq',
    // Merged into the "chat" module — the standalone FAQ section
    // served the same purpose (answering common questions), so all
    // of its content now lives inside "Ask Rigó Rudi" as pre-built
    // questions (see KNOWLEDGE_BASE in js/modules/chat.js, ids
    // checkin-times / parking-included / pets / hunt-how / tech-help).
    // The faq.q1-q5/a1-a5 translation keys are kept as-is in
    // translations.js — the chat module reads the a1-a5 answers
    // directly, so nothing there needs to change either.
    enabled: false,
    inNav: false,
    inHeroActions: false
  }

  /* ---- EXAMPLE: adding a new module later looks like this ----
  {
    id: 'events',
    enabled: true,
    inNav: true,
    navIcon: '🎉',
    navLabelKey: 'nav.events',
    inHeroActions: true,
    heroIcon: '🎉',
    heroLabelKey: 'hero.actionEvents'
  },
  */
];

// Small helper: is a given module currently on?
function isModuleEnabled(id) {
  const mod = RIGODAL_MODULES_CONFIG.find((m) => m.id === id);
  return !!mod && mod.enabled;
}
