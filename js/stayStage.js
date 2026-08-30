/* ============================================
   STAY STAGE
   Figures out "where is the guest in their stay right now?" —
   before-stay / arriving-soon / during-stay / leaving-soon / after-stay.

   This used to be copy-pasted separately into stay.js, chat.js, and
   hero.js — which meant changing a threshold (e.g. "arriving soon"
   starting 24h before check-in) meant editing 3 files and hoping you
   didn't miss one. Now there's exactly one place to edit: the two
   threshold constants below.

   Every module that needs to know the current stage calls the global
   RigodalStayStage.get() function.
   ============================================ */

const RigodalStayStage = (function () {
  // Edit these two numbers to change when "arriving soon" / "leaving
  // soon" kick in, site-wide — every module that reads the stage
  // (My Stay's hotspot ordering, the hero's rotating messages, Ask
  // Rudi's homepage question picks) will automatically follow.
  const ARRIVING_SOON_HOURS = 24;
  const LEAVING_SOON_HOURS = 12;

  function get() {
    const now = new Date();
    const inDate = new Date(RIGODAL_DATA.booking.checkIn);
    const outDate = new Date(RIGODAL_DATA.booking.checkOut);
    const hoursToCheckin = (inDate - now) / (1000 * 60 * 60);
    const hoursToCheckout = (outDate - now) / (1000 * 60 * 60);

    if (now < inDate) return hoursToCheckin <= ARRIVING_SOON_HOURS ? 'arriving-soon' : 'before-stay';
    if (now < outDate) return hoursToCheckout <= LEAVING_SOON_HOURS ? 'leaving-soon' : 'during-stay';
    return 'after-stay';
  }

  return { get };
})();
