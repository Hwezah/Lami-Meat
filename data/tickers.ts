// Page-header tickers. Line 1 of each list is the page's original intro sentence (shown in bone);
// the rest scroll beneath it. Every line is placeholder copy until the client signs it off.

export type PageKey = "range" | "ourStory" | "contact" | "cart" | "recipes" | "careers" | "account";

export const tickers: Record<PageKey, string[]> = {
  range: [
    "Two smoked, two fresh — all pure beef. Every pack is weighed, sealed and labelled with its batch number and dates.", // PLACEHOLDER: client to confirm
    "Pure Ugandan beef. No fillers, no water added, nothing to bulk it out.", // PLACEHOLDER: client to confirm
    "Every product comes in 500g and 1kg packs. Larger kitchen quantities on request.", // PLACEHOLDER: client to confirm
    "Smoked lines are fully cooked over wood. They only need warming through.", // PLACEHOLDER: client to confirm
    "Fresh mince is ground the same morning it is packed.", // PLACEHOLDER: client to confirm
    "Smoked products keep for three months frozen at −18°C.", // PLACEHOLDER: client to confirm
    "Fresh mince keeps two days chilled at 0–4°C, or three months frozen.", // PLACEHOLDER: client to confirm
    "Sausages and hot dogs are vacuum-sealed to lock in flavour and keep out air.", // PLACEHOLDER: client to confirm
    "Every label carries a batch number, production date and expiry date.", // PLACEHOLDER: client to confirm
    "Lean mince is trimmed before mincing for less fat in the pan.", // PLACEHOLDER: client to confirm
    "Packs travel frozen in cold boxes from our kitchen to your door.", // PLACEHOLDER: client to confirm
  ],
  ourStory: [
    "LAMI MEAT is a Kampala smokehouse and butchery. We make a short list of beef products and make them properly — every batch, every day.", // PLACEHOLDER: client to confirm
    "Every smoked batch hangs over a real wood fire. No liquid smoke.", // PLACEHOLDER: client to confirm
    "The colour tells us when a batch is ready. We don’t rush it.", // PLACEHOLDER: client to confirm
    "Beef is checked on arrival before it enters the clean room.", // PLACEHOLDER: client to confirm
    "Hairnets, gloves and white coats on every shift, every day.", // PLACEHOLDER: client to confirm
    "Surfaces and tools are cleaned between every batch.", // PLACEHOLDER: client to confirm
    "A small team in Kampala does every cut, weigh and seal by hand.", // PLACEHOLDER: client to confirm
    "Each pack is weighed on calibrated scales before it is sealed.", // PLACEHOLDER: client to confirm
    "Batch records mean every pack can be traced back to its day.", // PLACEHOLDER: client to confirm
    "Four products, made the same way every time. No shortcuts.", // PLACEHOLDER: client to confirm
    "Cold from our room to your kitchen, across Kampala.", // PLACEHOLDER: client to confirm
  ],
  contact: [
    "Tell us what you need. We confirm the order, price and delivery time on WhatsApp — usually within the hour.", // PLACEHOLDER: client to confirm
    "Send your order on WhatsApp. We reply with the total and a delivery time.", // PLACEHOLDER: client to confirm
    "Most messages get a reply within the hour, Monday to Saturday.", // PLACEHOLDER: client to confirm
    "Deliveries run Monday to Saturday, 8am to 6pm.", // PLACEHOLDER: client to confirm
    "Orders travel in cold boxes so they arrive frozen.", // PLACEHOLDER: client to confirm
    "Share your location pin and we will confirm the delivery fee.", // PLACEHOLDER: client to confirm
    "Pay by Mobile Money or cash on delivery.", // PLACEHOLDER: client to confirm
    "No minimum for home orders in central Kampala.", // PLACEHOLDER: client to confirm
    "Restaurants, hotels and shops can set up a regular wholesale order.", // PLACEHOLDER: client to confirm
    "Wholesale accounts can be invoiced. Ask when you enquire.", // PLACEHOLDER: client to confirm
    "Prefer to talk? Call us during opening hours.", // PLACEHOLDER: client to confirm
  ],
  cart: [
    // Line 1 is swapped for "N packs ready to send…" when the cart has items (see components/cart/CartView.tsx).
    "Your cart is empty. Everything you add from the range will wait here until you send it.", // PLACEHOLDER: client to confirm
    "Your cart stays saved on this device until you send it.", // PLACEHOLDER: client to confirm
    "Nothing is charged online. We confirm the total with you first.", // PLACEHOLDER: client to confirm
    "Payment happens only after we confirm price and delivery on WhatsApp.", // PLACEHOLDER: client to confirm
    "Need a change after sending? Reply in the same WhatsApp chat.", // PLACEHOLDER: client to confirm
    "Add or remove packs any time before we confirm.", // PLACEHOLDER: client to confirm
    "Orders are delivered cold across Kampala, Monday to Saturday.", // PLACEHOLDER: client to confirm
    "Packs arrive frozen. Put them straight into the freezer.", // PLACEHOLDER: client to confirm
    "Smoked packs keep three months frozen. Mince keeps two days chilled.", // PLACEHOLDER: client to confirm
    "Add your area so we can quote the delivery fee.", // PLACEHOLDER: client to confirm
    "Ordering for a kitchen? Ask about wholesale pricing.", // PLACEHOLDER: client to confirm
  ],
  recipes: [
    "Simple, weeknight cooking with the range — breakfasts, parties and family dinners. Nothing fussy.", // PLACEHOLDER: client to confirm
    "Our sausages are already smoked. They only need warming through — five to eight minutes in a pan.", // PLACEHOLDER: client to confirm
    "Brown mince in batches. A crowded pan steams the beef instead of searing it.", // PLACEHOLDER: client to confirm
    "Score hot dogs lightly before they hit the grill so they colour evenly.", // PLACEHOLDER: client to confirm
    "Thaw overnight in the fridge, never on the counter.", // PLACEHOLDER: client to confirm
    "Lean mince cooks faster — pull it off the heat as soon as the pink is gone.", // PLACEHOLDER: client to confirm
    "Rest sausages for a minute before slicing to keep the juices in.", // PLACEHOLDER: client to confirm
    "A squeeze of lime and fresh kachumbari cut through the smoke.", // PLACEHOLDER: client to confirm
    "One LAMI pack feeds two to four — every recipe here uses just one.", // PLACEHOLDER: client to confirm
    "Season mince after browning, not before, for a deeper crust.", // PLACEHOLDER: client to confirm
    "Leftover sausage? Slice it into rice, eggs or a morning rolex.", // PLACEHOLDER: client to confirm
    "Keep cooked beef covered in the fridge and eat it within two days.", // PLACEHOLDER: client to confirm
  ],
  careers: [
    "We’re a small team that takes the work seriously — clean, careful and proud of what leaves the room.", // PLACEHOLDER: client to confirm
    "Everyone is trained station by station from their first day.", // PLACEHOLDER: client to confirm
    "Hygiene comes first: clean kit, clean hands, clean room.", // PLACEHOLDER: client to confirm
    "We work Monday to Saturday, with rotas planned in advance.", // PLACEHOLDER: client to confirm
    "Learn every station, from mincing to the smokehouse.", // PLACEHOLDER: client to confirm
    "Good work gets noticed. Many roles grow into team leads.", // PLACEHOLDER: client to confirm
    "We keep equipment safe and maintained, and gear is provided.", // PLACEHOLDER: client to confirm
    "Small team, clear roles, and one standard for everyone.", // PLACEHOLDER: client to confirm
    "We care about timekeeping, honesty and looking out for each other.", // PLACEHOLDER: client to confirm
    "Experience helps, but attitude and care matter most.", // PLACEHOLDER: client to confirm
    "Based in Kampala, serving homes and kitchens across the city.", // PLACEHOLDER: client to confirm
  ],
  account: [
    // The design has no intro sentence on /account; this line comes from the sign-up modal copy.
    "Join LAMI MEAT to save your box and order faster.", // PLACEHOLDER: client to confirm
    "Your cart is saved on this device, ready when you come back.", // PLACEHOLDER: client to confirm
    "Reorder your usual packs in a few taps.", // PLACEHOLDER: client to confirm
    "Your name and area can be filled in for you when you order.", // PLACEHOLDER: client to confirm
    "Members hear about new cuts and recipes first.", // PLACEHOLDER: client to confirm
    "Occasional member offers, never more than once or twice a month.", // PLACEHOLDER: client to confirm
    "We only ask for what we need to deliver your order.", // PLACEHOLDER: client to confirm
    "We never sell or share your details.", // PLACEHOLDER: client to confirm
    "Payment still happens on delivery. No card details are stored here.", // PLACEHOLDER: client to confirm
    "Sign out any time from this page.", // PLACEHOLDER: client to confirm
    "Questions about your account? Message us on WhatsApp.", // PLACEHOLDER: client to confirm
  ],
};
