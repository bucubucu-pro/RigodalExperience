/* ============================================
   DATA
   Edit THIS file to change site content.
   Text fields that guests see in multiple languages
   use { en: "...", hu: "..." } objects — just edit
   both sides. Everything else is plain.
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
  places: [
    { id: 1, category: "wine", icon: "🍷", open: true, lat: 47.895, lng: 20.375,
      name: { en: "Thummerer Pincészet", hu: "Thummerer Pincészet" },
      meta: { en: "Wine tasting · 10:00–18:00", hu: "Borkóstoló · 10:00–18:00" },
      rec: { en: "Rudi's pick: try the Bikavér.", hu: "Rudi ajánlja: kóstold meg a Bikavért." } },
    { id: 2, category: "food", icon: "🍽", open: true, lat: 47.902, lng: 20.377,
      name: { en: "HBH Bajor Sörház", hu: "HBH Bajor Sörház" },
      meta: { en: "Hungarian & Bavarian · Open now", hu: "Magyar & bajor konyha · Most nyitva" },
      rec: { en: "Great for families, big portions.", hu: "Remek családoknak, bőséges adagok." } },
    { id: 3, category: "cafe", icon: "☕", open: true, lat: 47.9, lng: 20.378,
      name: { en: "Debrődi Fagyizó", hu: "Debrődi Fagyizó" },
      meta: { en: "Ice cream & coffee", hu: "Fagyi & kávé" },
      rec: { en: "Best gelato in town, ask for pisztácia.", hu: "A város legjobb fagyija, kérd a pisztáciást." } },
    { id: 4, category: "sights", icon: "🏰", open: true, lat: 47.9, lng: 20.381,
      name: { en: "Eger Vár (Castle)", hu: "Egri Vár" },
      meta: { en: "9:00–18:00 · Historic site", hu: "9:00–18:00 · Történelmi helyszín" },
      rec: { en: "Go at sunset for the best light.", hu: "Naplementekor a legszebb." } },
    { id: 5, category: "shop", icon: "🛒", open: true, lat: 47.897, lng: 20.374,
      name: { en: "CBA Szupermarket", hu: "CBA Szupermarket" },
      meta: { en: "7:00–20:00", hu: "7:00–20:00" },
      rec: { en: "Closest grocery to the house.", hu: "A legközelebbi bolt a házhoz." } },
    { id: 6, category: "pharmacy", icon: "🚑", open: false, lat: 47.899, lng: 20.373,
      name: { en: "Egri Gyógyszertár", hu: "Egri Gyógyszertár" },
      meta: { en: "8:00–19:00", hu: "8:00–19:00" },
      rec: { en: "5 min walk from the guesthouse.", hu: "5 perc séta a vendégháztól." } },
    { id: 7, category: "taxi", icon: "🚕", open: true, lat: 47.9, lng: 20.376,
      name: { en: "Eger Taxi", hu: "Eger Taxi" },
      meta: { en: "24/7", hu: "0–24" },
      rec: { en: "Save this number for late nights.", hu: "Mentsd el késő estékre." } },
    { id: 8, category: "family", icon: "👨‍👩‍👧", open: true, lat: 47.89, lng: 20.38,
      name: { en: "Egri Csillag Kalandpark", hu: "Egri Csillag Kalandpark" },
      meta: { en: "Adventure park · 10:00–18:00", hu: "Kalandpark · 10:00–18:00" },
      rec: { en: "Great half-day trip with kids.", hu: "Remek félnapos program gyerekekkel." } }
  ],

  // ---- Treasure hunt quests (in order) ----
  quests: [
    { id: 1, feathers: 10,
      name: { en: "The Hidden Bird", hu: "A rejtett madár" },
      hint: { en: "Find the bird symbol in the garden.", hu: "Találd meg a madár szimbólumot a kertben." } },
    { id: 2, feathers: 10,
      name: { en: "Birdhouse Count", hu: "Madárház-számlálás" },
      hint: { en: "Count all the birdhouses on the property.", hu: "Számold meg az összes madárházat a birtokon." } },
    { id: 3, feathers: 15,
      name: { en: "The Castle Riddle", hu: "A vár rejtvénye" },
      hint: { en: "Solve Rudi's riddle about Eger Castle.", hu: "Fejtsd meg Rudi rejtvényét az egri várról." } },
    { id: 4, feathers: 15,
      name: { en: "The Viewpoint Selfie", hu: "A kilátó szelfi" },
      hint: { en: "Take a selfie at Rudi's favorite viewpoint.", hu: "Készíts szelfit Rudi kedvenc kilátópontján." } }
  ],

  // ---- FAQ content ----
  faqs: [
    { q: { en: "What time is check-in and check-out?", hu: "Mikor lehet be- és kijelentkezni?" },
      a: { en: "Check-in is from 2:00 PM, check-out by 10:00 AM. Need flexibility? Just message Rudi.", hu: "Bejelentkezés 14:00-tól, kijelentkezés 10:00-ig. Rugalmasságra van szükséged? Írj Rudinak." } },
    { q: { en: "Is parking included?", hu: "A parkolás benne van az árban?" },
      a: { en: "Yes, free private parking is available right outside the house.", hu: "Igen, ingyenes privát parkoló áll rendelkezésre közvetlenül a ház előtt." } },
    { q: { en: "Are pets allowed?", hu: "Hozhatok magammal háziállatot?" },
      a: { en: "Small, well-behaved pets are welcome — just let us know in advance.", hu: "Kisebb, jól nevelt háziállatokat szívesen látunk — csak jelezd előre." } },
    { q: { en: "How does the treasure hunt work?", hu: "Hogyan működik a kincsvadászat?" },
      a: { en: "Open the Adventure tab, follow the trail of clues around the house and nearby landmarks, and collect feathers as you go.", hu: "Nyisd meg a Vadászat fület, kövesd a nyomokat a ház körül és a közeli látnivalóknál, és gyűjts tollakat útközben." } },
    { q: { en: "What if I have a tech question about the app?", hu: "Mi van, ha technikai kérdésem van az alkalmazással kapcsolatban?" },
      a: { en: "Ask Rudi directly in the chat — he's trained specifically on this guesthouse and Eger.", hu: "Kérdezd Rudit közvetlenül a chatben — pontosan erre a vendégházra és Egerre lett felkészítve." } }
  ]
};
