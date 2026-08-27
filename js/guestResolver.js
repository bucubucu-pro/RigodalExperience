/* ============================================
   GUEST RESOLVER
   Single place that decides "who is this guest and
   what are their stay dates?" Everything else in the
   app calls RigodalGuest.get() and doesn't care where
   the data actually came from.

   CURRENT METHOD: URL parameters (?name=...&in=...&out=...)
   read once, then cached in localStorage so the guest
   doesn't need to keep the long link after their first visit.

   FUTURE UPGRADE PATH TO A REAL DATABASE:
   When you're ready, this is the ONLY file that needs to
   change. Replace the body of resolveFromUrl() (or add a
   resolveFromDatabase() function) so it fetches from your
   backend using a short code instead of reading long URL
   params. Every other module already calls
   RigodalGuest.get() and will keep working unmodified.
   ============================================ */

const RigodalGuest = (function () {
  const STORAGE_KEY = 'rigodal_guest';

  function resolveFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const checkIn = params.get('in');
    const checkOut = params.get('out');

    if (!name && !checkIn && !checkOut) return null;

    return {
      guestName: name || RIGODAL_DATA.booking.guestName,
      checkIn: checkIn || RIGODAL_DATA.booking.checkIn,
      checkOut: checkOut || RIGODAL_DATA.booking.checkOut
    };
  }

  function loadCached() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveCached(guest) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guest));
    } catch (e) { /* localStorage unavailable — degrade silently */ }
  }

  // Call this once, as early as possible (before any module reads booking data).
  function init() {
    const fromUrl = resolveFromUrl();

    if (fromUrl) {
      // A personalized link was opened — save it and clean the URL so the
      // long link isn't sitting in the guest's browser history/address bar.
      saveCached(fromUrl);
      RIGODAL_DATA.booking.guestName = fromUrl.guestName;
      RIGODAL_DATA.booking.checkIn = fromUrl.checkIn;
      RIGODAL_DATA.booking.checkOut = fromUrl.checkOut;

      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      return;
    }

    const cached = loadCached();
    if (cached) {
      RIGODAL_DATA.booking.guestName = cached.guestName;
      RIGODAL_DATA.booking.checkIn = cached.checkIn;
      RIGODAL_DATA.booking.checkOut = cached.checkOut;
    }
    // If neither URL nor cache has guest data, RIGODAL_DATA.booking's
    // placeholder defaults (from data.js) are used as-is.
  }

  function get() {
    return RIGODAL_DATA.booking;
  }

  return { init, get };
})();

// Run immediately — must happen before hero.js or any module reads booking data.
RigodalGuest.init();
