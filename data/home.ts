// Home page copy. Testimonials and the rotating-word list are PLACEHOLDER copy pending client review.

export const heroWords = ["Mastered.", "Perfected.", "Trusted.", "Delivered.", "Sealed.", "Loved."];
/** Colour cycles by index % 3: brass → signal red (match the final logo red) → bone. */
export const heroWordColors = ["#B8955A", "#C8372D", "#EFE9DF"];

export const ledger = [
  { num: "No. 01", title: "Smoked over wood", desc: "Sausages and hot dogs hung over a real fire until the colour is right." },
  { num: "No. 02", title: "Minced every morning", desc: "Pure beef, ground, weighed and sealed by hand the same day." },
  { num: "No. 03", title: "Cold to your door", desc: "Kept frozen from our kitchen to your kitchen across Kampala." },
];

/** Short descriptions used on the Home range list (the /range page uses products.json `desc`). */
export const homeRangeDesc: Record<string, string> = {
  "smoked-sausages": "Pure beef, slow-smoked over wood with our house spice.",
  "hot-dogs": "Long, juicy and fully smoked — ready for the bun.",
  "minced-beef": "100% beef, minced the same morning. For sauces, burgers and samosas.",
  "lean-minced-beef": "An extra-lean cut for lighter family meals.",
};

export const steps = [
  { num: "01", title: "Selected", desc: "Beef from trusted Ugandan suppliers, checked on arrival before it enters the room.", img: "/images/team-line.jpg" },
  { num: "02", title: "Weighed & packed", desc: "Our trained team portions every pack by hand on calibrated scales.", img: "/images/team-1.jpg" },
  { num: "03", title: "Sealed & labelled", desc: "Each pack carries its batch number, production and expiry dates.", img: "/images/minced-tray.jpg" },
];

export const testimonials = [
  { name: "Grace N.", where: "Ntinda", text: "You can actually taste the smoke. They’ve become our Saturday breakfast." },
  { name: "David K.", where: "Kira", text: "Clean, lean mince — no water in the pan. One pack fed the whole family." },
  { name: "Aisha M.", where: "Muyenga", text: "The hot dogs were the hit of my son’s birthday. Delivered cold and well packed." },
];
