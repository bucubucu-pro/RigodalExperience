/* ============================================
   GUEST RESOLVER
   Decides "who is this guest and what are their stay
   dates?" and writes the answer into RIGODAL_DATA.booking
   (mutating it in place) before any other module runs —
   so every module can keep reading RIGODAL_DATA.booking.checkIn
   etc. exactly as before, without knowing where that data
   actually came from.

   CURRENT METHOD: URL parameters (?name=...&in=...&out=...)
   read once, then cached in localStorage so the guest
   doesn't need to keep the long link after their first visit.

   FUTURE UPGRADE PATH TO A REAL DATABASE:
   When you're ready, this is the ONLY file that needs to
   change. Replace the body of resolveFromUrl() (or add a
   resolveFromDatabase() function) so it fetches from your
   backend using a short code instead of reading long URL
   params, then still writes the result into
   RIGODAL_DATA.booking the same way. No other file needs
   to change.

   The get() function below is a small public API for any
   code that would rather not touch RIGODAL_DATA directly —
   not currently used elsewhere, but available if useful.
   ============================================ */

const RigodalGuest = (function () {
  const STORAGE_KEY = 'rigodal_guest';

  // A malformed date string (e.g. a hand-edited link with a typo)
  // would make `new Date(...)` produce an "Invalid Date" — comparisons
  // and math against that silently produce NaN/incorrect results
  // downstream (e.g. the hero countdown ring). Rejecting bad dates
  // right here, at the single source of truth, is simpler than trying
  // to guard against NaN everywhere that reads booking.checkIn/checkOut.
  function isValidDateString(value) {
    return !!value && !isNaN(new Date(value).getTime());
  }

  function resolveFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const checkInRaw = params.get('in');
    const checkOutRaw = params.get('out');

    if (!name && !checkInRaw && !checkOutRaw) return null;

    // Only accept dates that actually parse — anything malformed falls
    // back to the existing placeholder date instead of poisoning the
    // countdown with NaN.
    const checkIn = isValidDateString(checkInRaw) ? checkInRaw : RIGODAL_DATA.booking.checkIn;
    const checkOut = isValidDateString(checkOutRaw) ? checkOutRaw : RIGODAL_DATA.booking.checkOut;

    return {
      guestName: name || RIGODAL_DATA.booking.guestName,
      checkIn: checkIn,
      checkOut: checkOut
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
