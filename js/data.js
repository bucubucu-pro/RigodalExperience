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
  places: [
    { id: 1, category: "wine", name: "Thummerer Pincészet", meta: "Wine tasting · 10:00–18:00", rec: "Rudi's pick: try the Bikavér.", open: true, lat: 47.895, lng: 20.375, icon: "🍷" },
    { id: 2, category: "food", name: "HBH Bajor Sörház", meta: "Hungarian & Bavarian · Open now", rec: "Great for families, big portions.", open: true, lat: 47.902, lng: 20.377, icon: "🍽" },
    { id: 3, category: "cafe", name: "Debrődi Fagyizó", meta: "Ice cream & coffee", rec: "Best gelato in town, ask for pisztácia.", open: true, lat: 47.9, lng: 20.378, icon: "☕" },
    { id: 4, category: "sights", name: "Eger Vár (Castle)", meta: "9:00–18:00 · Historic site", rec: "Go at sunset for the best light.", open: true, lat: 47.9, lng: 20.381, icon: "🏰" },
    { id: 5, category: "shop", name: "CBA Szupermarket", meta: "7:00–20:00", rec: "Closest grocery to the house.", open: true, lat: 47.897, lng: 20.374, icon: "🛒" },
    { id: 6, category: "pharmacy", name: "Egri Gyógyszertár", meta: "8:00–19:00", rec: "5 min walk from the guesthouse.", open: false, lat: 47.899, lng: 20.373, icon: "🚑" },
    { id: 7, category: "taxi", name: "Eger Taxi", meta: "24/7", rec: "Save this number for late nights.", open: true, lat: 47.9, lng: 20.376, icon: "🚕" },
    { id: 8, category: "family", name: "Egri Csillag Kalandpark", meta: "Adventure park · 10:00–18:00", rec: "Great half-day trip with kids.", open: true, lat: 47.89, lng: 20.38, icon: "👨‍👩‍👧" }
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
