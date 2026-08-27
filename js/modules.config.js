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
    enabled: true,
    inNav: true,
    navIcon: '🪶',
    navLabelKey: 'nav.hunt',
    inHeroActions: true,
    heroIcon: '🪶',
    heroLabelKey: 'hero.actionHunt'
  },
  {
    id: 'rewards',
    enabled: true,
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
    inHeroActions: true,
    heroIcon: '💬',
    heroLabelKey: 'hero.actionContact'
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
    enabled: true,
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
