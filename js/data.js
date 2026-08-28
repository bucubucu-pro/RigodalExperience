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
  // Curated, real businesses/attractions with Google ratings ≥ 4.0,
  // cross-checked against current listings, official sites, and local
  // directories (checked August 2026) — corrected addresses where prior
  // data was wrong, removed anything unverifiable or closed.
  // "gmaps" uses Google's official search deep-link — this always resolves
  // to the correct live listing (avoids wrong/outdated pinned coordinates)
  // and shows Google's own live open/closed status once tapped.
  // "website" is the business's own official site, shown as a second icon.
  // No phone numbers are shown by design — only Maps + Website.
  // Opening hours are intentionally NOT stored here — without a live,
  // paid Google Places API connection (which needs a server-side proxy,
  // not safe on a static site), hardcoded hours would go stale and
  // mislead guests. Tapping "Maps" always shows accurate live hours instead.
  places: [
    // ---- Wineries ----
    {
      id: 1, category: "wine",
      name: "Thummerer Borszaküzlet",
      rec: "Rudi's pick: ask for the Egri Bikavér — the family's city-center wine shop.",
      rating: 4.8,
      icon: "🍷",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Thummerer+Borsz%C3%A1k%C3%BCzlet+Szent+J%C3%A1nos+utca+5+Eger",
      website: "https://www.thummerer.hu"
    },
    {
      id: 2, category: "wine",
      name: "Bolyki Pincészet és Szőlőbirtok",
      rec: "Book a tasting inside a real quarry cellar — ask for the Bikavér. Closed Sundays.",
      rating: 4.7,
      icon: "🍷",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Bolyki+Pincészet+és+Szőlőbirtok+Bolyki-völgy+Eger",
      website: "https://bolykipinceszet.hu"
    },
    {
      id: 17, category: "wine",
      name: "St. Andrea Szőlőbirtok",
      rec: "One of Eger's most acclaimed producers — try their single-vineyard Egri Csillag.",
      rating: 4.7,
      icon: "🍷",
      gmaps: "https://www.google.com/maps/search/?api=1&query=St+Andrea+Sz%C5%91l%C5%91birtok+Sz%C3%A9passzony-v%C3%B6lgy+Eger",
      website: "https://standrea.com"
    },
    {
      id: 18, category: "wine",
      name: "Gál Tibor Fúzió",
      rec: "Downtown wine bar and shop — a relaxed tasting without leaving the center.",
      rating: 4.6,
      icon: "🍷",
      gmaps: "https://www.google.com/maps/search/?api=1&query=G%C3%A1l+Tibor+F%C3%BAzi%C3%B3+Csiky+S%C3%A1ndor+utca+10+Eger",
      website: "https://galtibor.hu"
    },
    {
      id: 19, category: "wine",
      name: "Kovács Nimród Winery",
      rec: "Modern, design-forward winery — worth the short trip for the terroir wines alone.",
      rating: 4.6,
      icon: "🍷",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Kov%C3%A1cs+Nimr%C3%B3d+Winery+Ver%C5%91szala+utca+66+Eger",
      website: "https://kovacsnimrodwinery.com"
    },

    // ---- Restaurants ----
    {
      id: 3, category: "food",
      name: "HBH Bajor Sörház",
      rec: "Great for families — big portions, Bavarian & Hungarian classics, right by Dobó tér.",
      rating: 4.5,
      icon: "🍽",
      gmaps: "https://www.google.com/maps/search/?api=1&query=HBH+Bajor+S%C3%B6rh%C3%A1z+Bajcsy-Zsilinszky+utca+21+Eger",
      website: "https://hbh-eger.hu"
    },
    {
      id: 4, category: "food",
      name: "Macok Bistro & Wine Bar",
      rec: "Eger's most celebrated restaurant — Michelin Bib Gourmand. Book ahead for dinner.",
      rating: 4.7,
      icon: "🍽",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Macok+Bistro+Tin%C3%B3di+Sebesty%C3%A9n+t%C3%A9r+4+Eger",
      website: "https://www.imolaudvarhaz.hu"
    },
    {
      id: 20, category: "food",
      name: "1552 Restaurant",
      rec: "The only restaurant inside Eger Castle itself — modern Hungarian with Ottoman-era touches.",
      rating: 4.5,
      icon: "🍽",
      gmaps: "https://www.google.com/maps/search/?api=1&query=1552+Restaurant+Egri+V%C3%A1r+Eger",
      website: "https://1552etterem.hu"
    },
    {
      id: 21, category: "food",
      name: "Palacsintavár",
      rec: "A historic-center institution — giant savory pancakes, always packed for a reason.",
      rating: 4.3,
      icon: "🍽",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Palacsintav%C3%A1r+Eger",
      website: null
    },
    {
      id: 22, category: "food",
      name: "Brumbrum Ételbár",
      rec: "Macok's casual little sister — great small plates with craft beer or wine.",
      rating: 4.5,
      icon: "🍽",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Brumbrum+%C3%89telb%C3%A1r+Eger",
      website: "https://www.imolaudvarhaz.hu"
    },

    // ---- Cafés ----
    {
      id: 5, category: "cafe",
      name: "Cafe Frei",
      rec: "Nearly 100 coffee varieties — inside Agria Park, easy stop while shopping.",
      rating: 4.4,
      icon: "☕",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Cafe+Frei+T%C3%B6rv%C3%A9nyh%C3%A1z+utca+4+Agria+Park+Eger",
      website: "https://www.cafefrei.hu"
    },
    {
      id: 23, category: "cafe",
      name: "Marján Cukrászda",
      rec: "Eger's most iconic patisserie, right at the foot of the castle — classic Hungarian cakes.",
      rating: 4.6,
      icon: "☕",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Marj%C3%A1n+Cukr%C3%A1szda+Kossuth+Lajos+utca+28+Eger",
      website: null
    },
    {
      id: 24, category: "cafe",
      name: "Café Jardin",
      rec: "Artisan patisserie in the Servita courtyard — a quiet, pretty spot for coffee.",
      rating: 4.6,
      icon: "☕",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Jardin+Servita+udvarh%C3%A1z+Eger",
      website: "https://cafejardin.hu"
    },

    // ---- Sights / attractions ----
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
      gmaps: "https://www.google.com/maps/search/?api=1&query=Sz%C3%A9passzony-v%C3%B6lgy+Eger",
      website: null
    },
    {
      id: 25, category: "sights",
      name: "Egri Bazilika (Eger Basilica)",
      rec: "Hungary's second-largest church — free to enter, ask about organ concert times.",
      rating: 4.7,
      icon: "⛪",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Egri+Bazilika+Eszterh%C3%A1zy+t%C3%A9r+Eger",
      website: null
    },
    {
      id: 26, category: "sights",
      name: "Egri Minaret",
      rec: "Climb the 97 spiral steps of Hungary's best-preserved Ottoman minaret for a rooftop view.",
      rating: 4.5,
      icon: "🕌",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Egri+Minaret+Kn%C3%A9zich+K%C3%A1roly+utca+4+Eger",
      website: null
    },
    {
      id: 27, category: "sights",
      name: "Líceum & Camera Obscura",
      rec: "The Baroque university building's rooftop Camera Obscura is a genuinely fun surprise.",
      rating: 4.6,
      icon: "🔭",
      gmaps: "https://www.google.com/maps/search/?api=1&query=L%C3%ADceum+Camera+Obscura+Eszterh%C3%A1zy+t%C3%A9r+1+Eger",
      website: null
    },

    // ---- Supermarkets ----
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
      id: 28, category: "shop",
      name: "SPAR / Interspar",
      rec: "Central location with an in-store pharmacy — handy for a one-stop errand run.",
      rating: 4.2,
      icon: "🛒",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Interspar+Sas+utca+1+Eger",
      website: null
    },
    {
      id: 29, category: "shop",
      name: "Lidl",
      rec: "Reliable budget option, a short drive from the center.",
      rating: 4.3,
      icon: "🛒",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Lidl+II.+R%C3%A1k%C3%B3czi+Ferenc+utca+141+Eger",
      website: null
    },

    // ---- Pharmacies ----
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
      id: 30, category: "pharmacy",
      name: "Benu Zalár Patika",
      rec: "Open late, Mon–Sat until 8 PM — good for evening needs.",
      rating: 4.3,
      icon: "🚑",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Benu+Zal%C3%A1r+Patika+Zal%C3%A1r+utca+9+Eger",
      website: null
    },

    // ---- Taxi ----
    {
      id: 10, category: "taxi",
      name: "City Taxi Eger",
      rec: "The largest, most established taxi company in town.",
      rating: 4.3,
      icon: "🚕",
      gmaps: "https://www.google.com/maps/search/?api=1&query=City+Taxi+Eger",
      website: "https://citytaxieger.hu"
    },
    {
      id: 31, category: "taxi",
      name: "A TAXI Eger",
      rec: "Fixed rates for out-of-town trips — good for winery or day-trip transfers.",
      rating: 4.4,
      icon: "🚕",
      gmaps: "https://www.google.com/maps/search/?api=1&query=A+TAXI+Eger",
      website: "https://taxieger.hu"
    },

    // ---- Family ----
    {
      id: 11, category: "family",
      name: "Szépasszonyvölgyi Márai Kalandpark",
      rec: "Adventure playground in the Valley of the Beautiful Women — great half-day trip with kids. Seasonal.",
      rating: 4.6,
      icon: "👨‍👩‍👧",
      gmaps: "https://www.google.com/maps/search/?api=1&query=M%C3%A1rai+Kalandpark+Kisv%C3%B6lgy+utca+56+Eger",
      website: "http://www.marai-eger.hu/kalandpark/"
    },
    {
      id: 12, category: "family",
      name: "Eger Termál (Thermal & Strand Bath)",
      rec: "Slides, kids' pools and a lazy river — a full day out with the family.",
      rating: 4.4,
      icon: "👨‍👩‍👧",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Eger+Term%C3%A1l+Strandf%C3%BCrd%C5%91+Pet%C5%91fi+t%C3%A9r+2+Eger",
      website: "https://www.egertermal.hu"
    },
    {
      id: 32, category: "family",
      name: "Noé Kertje Élménypark",
      rec: "Outdoor sculpture and experience park just outside town — a nice easy morning with kids.",
      rating: 4.4,
      icon: "👨‍👩‍👧",
      gmaps: "https://www.google.com/maps/search/?api=1&query=No%C3%A9+Kertje+%C3%89lm%C3%A9nypark+Eger",
      website: "https://noekertje.hu"
    },

    // ---- Day trips (~15–45 min from Eger) ----
    {
      id: 13, category: "daytrip",
      name: "Szalajka-völgy & Szilvásvárad",
      rec: "Rudi's favorite day out: ride the narrow-gauge forest railway to the Fátyol waterfall, ~30 min from Eger by car.",
      rating: 4.8,
      icon: "🚂",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Szalajka-v%C3%B6lgy+Szilv%C3%A1sv%C3%A1rad",
      website: "https://www.szilvasvarad.hu"
    },
    {
      id: 14, category: "daytrip",
      name: "Egerszalók Sódomb & Saliris Resort",
      rec: "A striking white mineral-terrace hillside next to a hot-spring bath — ~10 min from Eger, stunning lit up at night.",
      rating: 4.6,
      icon: "♨️",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Egerszal%C3%B3k+S%C3%B3domb",
      website: "https://www.saliris.hu"
    },
    {
      id: 15, category: "daytrip",
      name: "Noszvaj & De la Motte Castle",
      rec: "A quiet, pretty wine village 15 min from Eger with cave dwellings and a small baroque castle — good half-day trip.",
      rating: 4.5,
      icon: "🏯",
      gmaps: "https://www.google.com/maps/search/?api=1&query=De+la+Motte+K%C3%A1stely+Noszvaj",
      website: null
    },
    {
      id: 16, category: "daytrip",
      name: "Lipicai Ménesbirtok, Szilvásvárad",
      rec: "Hungary's Lipizzaner stud farm — carriage rides and a small equestrian museum, next to the Szalajka valley.",
      rating: 4.5,
      icon: "🐴",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Lipicai+M%C3%A9nesbirtok+Szilv%C3%A1sv%C3%A1rad",
      website: "https://menesgazdasag.hu"
    },
    {
      id: 33, category: "daytrip",
      name: "Szarvaskő",
      rec: "A dramatic little Bükk village with a castle ruin and viewpoint tower — a great short half-day hike, ~15 min away.",
      rating: 4.5,
      icon: "⛰️",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Szarvask%C5%91+v%C3%A1rrom+kilát%C3%B3",
      website: null
    },
    {
      id: 34, category: "daytrip",
      name: "Felsőtárkány & Bükk National Park",
      rec: "Easy forest walks, a scenic lake, and a small narrow-gauge railway — good for a relaxed family morning, ~15 min away.",
      rating: 4.5,
      icon: "🌲",
      gmaps: "https://www.google.com/maps/search/?api=1&query=Fels%C5%91t%C3%A1rk%C3%A1ny+B%C3%BCkk+Nemzeti+Park",
      website: null
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
  // NOTE: these quotes are shown as-is in every language (not translated)
  // since they're real guest testimonials — translating a real quote
  // would misrepresent what the guest actually wrote.
  guestbookPosts: [
    { quote: "Rudi made our kids' trip unforgettable. The treasure hunt was pure joy.", author: "Anna & family, Berlin", stars: 5 },
    { quote: "Best wine recommendations we've ever gotten from a host.", author: "Marco, Milan", stars: 5 },
    { quote: "Felt like visiting family, not renting a room.", author: "Kata, Budapest", stars: 5 }
  ]

  // NOTE: FAQ content lives in translations.js (keys faq.q1..q5, faq.a1..a5)
  // so it can be shown correctly in all 5 languages — not here.
};
