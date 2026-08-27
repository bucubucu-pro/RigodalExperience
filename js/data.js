/* ============================================
   DATA
   Edit THIS file to change site content.
   No HTML/JS knowledge needed for most edits below.
   ============================================ */

const RIGODAL_DATA = {

  // ---- Guest / booking info (later: replace with real booking API) ----
  booking: {
    guestName: "Anna",
    checkIn: "2026-08-28T14:00:00",
    checkOut: "2026-08-31T10:00:00",
    wifiName: "RigoDal_Guest",
    wifiPassword: "kismadar2026"
  },

  // ---- Places for Explore Eger ----
  // Curated, real businesses with Google ratings ≥ 4.0, verified against
  // current listings, official sites, and local directories.
  // "gmaps" uses Google's official search deep-link — this always resolves
  // to the correct live listing (avoids wrong/outdated pinned coordinates)
  // and shows Google's own live open/closed status once tapped.
  // "website" is the business's own official site, shown as a second icon.
  // Opening hours are intentionally NOT stored here — without a live,
  // paid Google Places API connection (which needs a server-side proxy,
  // not safe on a static site), hardcoded hours would go stale and
  // mislead guests. Tapping "Maps" always shows accurate live hours instead.
  places: [
    {
      id: 1, category: "wine",
      name: "Thummerer Borszaküzlet",
      rec: "Rudi's pick: ask for the Egri Bikavér — right in the city center.",
      rating: 4.8,
      icon: "🍷",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Thummerer+Borsz%C3%A1k%C3%BCzlet+Szent+J%C3%A1nos+utca+5+Eger",
      website: "https://www.thummerer.hu"
    },
    {
      id: 2, category: "wine",
      name: "Bolyki Pincészet és Szőlőbirtok",
      rec: "Book a tasting in the old quarry cellar — ask for the Bikavér.",
      rating: 4.7,
      icon: "🍷",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Bolyki+Pincészet+Eger",
      website: "https://bolykipinceszet.hu"
    },
    {
      id: 3, category: "food",
      name: "HBH Bajor Sörház",
      rec: "Great for families — big portions, Bavarian & Hungarian classics, right by Dobó tér.",
      rating: 4.5,
      icon: "🍽",
      gmaps: "https://www.google.com/maps/search/?api=1&query=HBH+Bajor+S%C3%B6rh%C3%A1z+Bajcsy-Zsilinszky+%C3%BAt+19+Eger",
      website: "https://hbh-bajor-sorhaz.eatbu.com"
    },
    {
      id: 4, category: "food",
      name: "Macok Bistro & Wine Bar",
      rec: "Eger's most celebrated restaurant — book ahead for dinner.",
      rating: 4.6,
      icon: "🍽",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Macok+Bistro+Eger",
      website: "https://macok.hu"
    },
    {
      id: 5, category: "cafe",
      name: "Cafe Frei Eger",
      rec: "Nearly 100 coffee varieties — try a seasonal praline latte.",
      rating: 4.6,
      icon: "☕",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Cafe+Frei+Servita+utca+3-5+Eger",
      website: "https://www.cafefrei.hu"
    },
    {
      id: 6, category: "sights",
      name: "Egri Vár (Eger Castle)",
      rec: "Go near closing time for golden-hour views from the bastion.",
      rating: 4.7,
      icon: "🏰",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Egri+V%C3%A1r+V%C3%A1r+k%C3%B6z+1+Eger",
      website: "https://www.egrivar.hu/en"
    },
    {
      id: 7, category: "sights",
      name: "Szépasszony-völgy (Valley of the Beautiful Women)",
      rec: "Dozens of wine cellars in one valley — walk it at golden hour.",
      rating: 4.6,
      icon: "🏰",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Szépasszony-völgy+Eger",
      website: null
    },
    {
      id: 8, category: "shop",
      name: "Tesco Szupermarket (Agria Park)",
      rec: "Closest full supermarket to the guesthouse.",
      rating: 4.2,
      icon: "🛒",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Tesco+Szupermarket+T%C3%B6rv%C3%A9nyh%C3%A1z+utca+4+Eger",
      website: "https://www.tesco.hu/aruhazak/eger/torvenyhaz-u.-4"
    },
    {
      id: 9, category: "pharmacy",
      name: "Dobó Téri Kígyó Patika",
      rec: "Right on the main square — easiest to find in an emergency.",
      rating: 4.4,
      icon: "🚑",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Dob%C3%B3+T%C3%A9ri+K%C3%ADgy%C3%B3+Patika+Dob%C3%B3+Istv%C3%A1n+t%C3%A9r+2+Eger",
      website: null
    },
    {
      id: 10, category: "taxi",
      name: "City Taxi Eger",
      rec: "The largest, most established taxi company in town — save the number.",
      rating: 4.3,
      icon: "🚕",
      gmaps: "https://www.google.com/maps/search/?api=1&query=City+Taxi+Eger",
      website: "https://citytaxieger.hu",
      phone: "+3636555555"
    },
    {
      id: 11, category: "family",
      name: "Szépasszonyvölgyi Márai Kalandpark",
      rec: "Adventure playground in the Valley of the Beautiful Women — great half-day trip with kids.",
      rating: 4.6,
      icon: "👨‍👩‍👧",
      gmaps: "https://www.google.com/maps/search/?api=1&query=M%C3%A1rai+Kalandpark+Kisv%C3%B6lgy+utca+56+Eger",
      website: "http://www.marai-eger.hu/kalandpark/"
    },
    {
      id: 12, category: "family",
      name: "Eger Termál (Eger Thermal & Strand Bath)",
      rec: "Slides, kids' pools and a lazy river — a full day out with the family.",
      rating: 4.4,
      icon: "👨‍👩‍👧",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Eger+Termál+Strandfürdő+Petőfi+tér+2+Eger",
      website: "https://www.egertermal.hu"
    }
  ],

  // ---- Treasure hunt quests (in order) ----
  quests: [
    { id: 1, name: "The Hidden Bird", hint: "Find the bird symbol in the garden.", feathers: 10 },
    { id: 2, name: "Birdhouse Count", hint: "Count all the birdhouses on the property.", feathers: 10 },
    { id: 3, name: "The Castle Riddle", hint: "Solve Rudi's riddle about Eger Castle.", feathers: 15 },
    { id: 4, name: "The Viewpoint Selfie", hint: "Take a selfie at Rudi's favorite viewpoint.", feathers: 15 }
  ],

  // ---- Guestbook wall postcards ----
  guestbookPosts: [
    { quote: "Rudi made our kids' trip unforgettable. The treasure hunt was pure joy.", author: "Anna & family, Berlin", stars: 5 },
    { quote: "Best wine recommendations we've ever gotten from a host.", author: "Marco, Milan", stars: 5 },
    { quote: "Felt like visiting family, not renting a room.", author: "Kata, Budapest", stars: 5 }
  ],

  // ---- FAQ content ----
  faqs: [
    { q: "What time is check-in and check-out?", a: "Check-in is from 2:00 PM, check-out by 10:00 AM. Need flexibility? Just message Rudi." },
    { q: "Is parking included?", a: "Yes, free private parking is available right outside the house." },
    { q: "Are pets allowed?", a: "Small, well-behaved pets are welcome — just let us know in advance." },
    { q: "How does the treasure hunt work?", a: "Open the Adventure tab, follow the trail of clues around the house and nearby landmarks, and collect feathers as you go." },
    { q: "What if I have a tech question about the app?", a: "Ask Rudi directly in the chat — he's trained specifically on this guesthouse and Eger." }
  ]
};
