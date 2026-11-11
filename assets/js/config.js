/*
 * ─────────────────────────────────────────────────────────────
 *  WEDDING DETAILS — edit everything about the invitation here.
 *  Placeholder values (date, venue, phones) are examples only.
 * ─────────────────────────────────────────────────────────────
 */
window.WEDDING = {
  // Couple
  partner1: "Nishan",
  partner2: "Anjalika",
  monogram: ["N", "A"], // shown as  N & A

  // Date & time — keep the +05:30 offset (Sri Lanka time) so the countdown is correct everywhere.
  start: "2027-02-20T09:00:00+05:30",
  end: "2027-02-20T15:30:00+05:30",
  timeZone: "Asia/Colombo",

  // Guest greeting. Personalise a link with ?to=Mr.%20Kasun  →  "Dear Mr. Kasun"
  defaultGuest: "Family & Friends",

  // Texts
  intro: "Together with their families",
  invitationLine: "Joyfully invite you to celebrate their wedding day",
  story:
    "So glad we met all those years ago. Now, we’re starting our forever together. Come celebrate our wedding day with us!",

  // Schedule — icon: "rings" | "heart" | "pen" | "car" | "glass"
  events: [
    { title: "Ceremony Begins", time: "9:00 AM", icon: "rings" },
    { title: "Poruwa Ceremony", time: "9:30 AM", icon: "heart" },
    { title: "Registration", time: "10:20 AM", icon: "pen" },
    { title: "Reception Concludes", time: "3:30 PM", icon: "car" },
  ],

  // Venue (example — replace with your real venue)
  venue: {
    hall: "The Grand Ballroom",
    name: "Example Hotel Colombo",
    address: "123 Galle Road, Colombo 03",
    mapsLink: "https://maps.google.com/?q=Galle+Face+Colombo",
    mapEmbedQuery: "Galle Face, Colombo", // what the embedded map shows
  },

  // RSVP — replies are sent to this WhatsApp number (international format, digits only)
  rsvp: {
    deadline: "31st January",
    whatsapp: "94770000000",
  },

  // Footer call buttons (example numbers)
  phones: [
    { name: "Nishan", tel: "+94770000000" },
    { name: "Anjalika", tel: "+94770000001" },
  ],

  // Photos
  heroImage: { src: "assets/images/couple-kiss.jpg", position: "50% 30%" },
  storyImage: { src: "assets/images/couple-tree.jpg", position: "50% 40%" },
  // tall: true makes an arched, double-height tile (layout: tall, small, small, tall, small, small)
  gallery: [
    { src: "assets/images/walk.jpg", tall: true, position: "center" },
    { src: "assets/images/hands.jpg", position: "center 40%" },
    { src: "assets/images/close.jpg", position: "center 20%" },
    { src: "assets/images/couple-kiss.jpg", tall: true, position: "center 30%" },
    { src: "assets/images/teddy.jpg", position: "center 30%" },
    { src: "assets/images/couple-tree.jpg", position: "center 30%" },
  ],

  // Background music (optional). Put an mp3 in assets/music/ and set e.g. "assets/music/song.mp3"
  music: "assets/music/Lovely.mp3",
};
