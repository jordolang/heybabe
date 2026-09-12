/**
 * Single source of truth for every piece of copy and product data on the site.
 *
 * NOTE FOR HEY BABE: everything below marked `PLACEHOLDER` is written to be
 * realistic for the permanent-jewelry market but is not your real data yet.
 * Send us real chain names, prices, event minimums and reviews and we swap
 * them here — nothing else in the codebase needs to change.
 */

export const site = {
  name: "hey babe",
  tagline: "Handcrafted & Permanent Fine Jewelry",
  blurb: "Custom 14K Gold-Filled & Sterling Silver",
  url: "https://xoheybabe.com", // PLACEHOLDER — update to the live domain
  email: "xo.heybabe@gmail.com",
  instagram: "xo.heybabe",
  instagramUrl: "https://instagram.com/xo.heybabe",
  // PLACEHOLDER — service area; update with the real city/region.
  serviceArea: "Cincinnati & the Tri-State",
  description:
    "hey babe is a custom permanent jewelry studio. We come to you — weddings, pop-ups, corporate events and private parties — and hand-weld 14K gold-filled and sterling silver chains sized to fit, clasp-free, made to last.",
};

export const nav = [
  { label: "The Ritual", href: "#ritual" },
  { label: "Chains", href: "#chains" },
  { label: "Charms", href: "#charms" },
  { label: "Events", href: "#events" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
] as const;

export const marqueeWords = [
  "special events",
  "pop-ups",
  "corporate",
  "weddings",
  "bachelorettes",
  "birthdays",
  "girls' night",
  "brand activations",
] as const;

export const manifesto = {
  eyebrow: "No clasp. No catch. No taking it off.",
  body: "A chain is measured on your wrist, welded closed with a whisper of light, and worn from that moment on — through the ocean, the shower, the ordinary Tuesday. It is not jewelry you put on. It is jewelry you keep.",
  signature: "that's the whole idea, babe.",
};

export const ritual = [
  {
    n: "01",
    title: "Measure",
    lede: "Pick your chain, we size it to you.",
    body: "You choose from our 14K gold-filled and sterling silver chains. We wrap it, measure to the millimetre, and set the drape exactly how you like it — snug, or with a little movement.",
    image: "/media/images/step-measure.webp",
    alt: "A jeweler measuring a fine gold chain around a customer's wrist",
  },
  {
    n: "02",
    title: "Weld",
    lede: "One spark. Two seconds. Done.",
    body: "A micro-welder fuses the final link closed. No clasp, no seam you can feel. It is quick, it is painless, and it is the part everyone films.",
    image: "/media/images/step-weld.webp",
    alt: "Close-up of a micro-welder sparking as it fuses a gold chain link",
  },
  {
    n: "03",
    title: "Wear",
    lede: "Forever, or until you want it off.",
    body: "Swim in it, sleep in it, live in it. And if you ever need it off, one snip at the weld and we re-weld it for free, for life.",
    image: "/media/images/step-wear.webp",
    alt: "A woman admiring the new gold chain bracelet welded to her wrist",
  },
] as const;

// PLACEHOLDER pricing — market-realistic, pending real numbers.
export const chains = [
  {
    id: "sweetheart",
    name: "Sweetheart",
    metal: "14K Gold-Filled",
    detail: "Fine cable link",
    price: 65,
    note: "The everyday one. Barely there, goes with everything.",
    image: "/media/images/hero-wrist.webp",
    alt: "A fine gold cable chain bracelet on a wrist resting on blush silk",
  },
  {
    id: "bardot",
    name: "Bardot",
    metal: "14K Gold-Filled",
    detail: "Curb link",
    price: 78,
    note: "A little more presence. Flat links that catch the light.",
    image: "/media/images/chain-gold-curb.webp",
    alt: "A 14K gold-filled curb link chain curved on blush pink silk",
  },
  {
    id: "margot",
    name: "Margot",
    metal: "14K Gold-Filled",
    detail: "Paperclip link",
    price: 85,
    note: "Elongated and modern. Our most-photographed chain.",
    image: "/media/images/chain-gold-paperclip.webp",
    alt: "A gold-filled paperclip link chain looped on peach silk",
  },
  {
    id: "stella",
    name: "Stella",
    metal: "14K Gold-Filled",
    detail: "Satellite with beaded stations",
    price: 92,
    note: "Tiny beads set along the chain. Quietly expensive-looking.",
    image: "/media/images/chain-gold-satellite.webp",
    alt: "A gold satellite chain with beaded stations coiled beside a pearl",
  },
  {
    id: "coco",
    name: "Coco",
    metal: "Sterling Silver",
    detail: "Fine cable link",
    price: 58,
    note: "For the silver girls. Dainty, bright, never yellows.",
    image: "/media/images/chain-silver-cable.webp",
    alt: "An ultra-dainty sterling silver cable chain on blush silk",
  },
  {
    id: "juniper",
    name: "Juniper",
    metal: "Sterling Silver",
    detail: "Figaro link",
    price: 72,
    note: "Alternating links with a little rhythm to them.",
    image: "/media/images/chain-silver-figaro.webp",
    alt: "A sterling silver figaro link chain curved on pale blush silk",
  },
  {
    id: "lumen",
    name: "Lumen",
    metal: "14K Gold-Filled",
    detail: "Herringbone",
    price: 98,
    note: "Flat, liquid, mirror-bright. The statement piece.",
    image: "/media/images/chain-gold-herringbone.webp",
    alt: "A flat liquid-looking gold herringbone chain on peach silk",
  },
] as const;

// PLACEHOLDER — charm menu and add-on pricing.
export const charms = {
  intro:
    "Add a charm and it becomes yours specifically. Initials for the people you love, a birthstone for the month it happened, a tiny heart for no reason at all.",
  priceFrom: 14,
  priceTo: 42,
  items: [
    { name: "Initial disc", price: 22 },
    { name: "Birthstone", price: 24 },
    { name: "Heart", price: 18 },
    { name: "Star", price: 18 },
    { name: "Freshwater pearl", price: 26 },
    { name: "Evil eye", price: 20 },
    { name: "Cross", price: 20 },
    { name: "Baguette CZ", price: 32 },
    { name: "Solid 14K accent", price: 42 },
    { name: "Tiny bezel", price: 14 },
  ],
  image: "/media/images/charms.webp",
  alt: "A flat lay of tiny gold and silver charms on blush silk",
  detailImage: "/media/images/charm-detail.webp",
  detailAlt: "Macro view of a heart, star and pearl charm on a fine gold chain",
};

// PLACEHOLDER — event formats, minimums and guest counts.
export const services = [
  {
    id: "weddings",
    kicker: "Weddings",
    title: "The getting-ready favour nobody throws away",
    body: "We set up in the bridal suite while hair and makeup happen. Every bridesmaid leaves with a chain she is still wearing at your first anniversary. Bride's chain is always on us.",
    bullets: ["Bridal suite or reception", "2–4 hours on site", "Bride's chain complimentary"],
    from: 650,
    image: "/media/images/wedding.webp",
    video: "/media/video/wedding.mp4",
    alt: "A bride and three bridesmaids showing matching gold chain bracelets",
  },
  {
    id: "corporate",
    kicker: "Corporate",
    title: "A brand activation people actually queue for",
    body: "Client appreciation, team offsites, store openings, conference booths. We bring the full blush setup, and your guests walk away wearing the memory of it.",
    bullets: ["Branded signage available", "Fast-flow welding, 3–5 min per guest", "Invoiced, W-9 on file"],
    from: 900,
    image: "/media/images/corporate.webp",
    video: "/media/video/corporate.mp4",
    alt: "A permanent jewelry activation station inside a bright modern office",
  },
  {
    id: "popups",
    kicker: "Pop-Ups",
    title: "Bring us into your shop for the weekend",
    body: "Boutiques, salons, coffee shops, markets. We drive traffic, you keep the footfall. Revenue-share or flat fee, whichever suits you.",
    bullets: ["Half or full day", "Rev-share or flat rate", "We promote to our list"],
    from: 0,
    image: "/media/images/popup.webp",
    video: "/media/video/popup.mp4",
    alt: "An elegant blush pop-up jewelry table with velvet trays of fine chains",
  },
  {
    id: "private",
    kicker: "Private Parties",
    title: "Bachelorettes, birthdays, girls' night in",
    body: "Eight of you, a bottle of something cold, and a jeweler in the corner. Everyone leaves linked. It is the easiest party you will ever throw.",
    bullets: ["6 guest minimum", "Your place or ours", "Host chain complimentary at 10+"],
    from: 450,
    image: "/media/images/friends.webp",
    video: "/media/video/friends.mp4",
    alt: "Two friends laughing and showing matching gold permanent bracelets",
  },
] as const;

export const gallery = [
  { src: "/media/images/anklet.webp", alt: "A delicate gold chain anklet in golden hour light", span: "tall" },
  { src: "/media/images/packaging.webp", alt: "Blush jewelry packaging with a fine gold chain", span: "wide" },
  { src: "/media/images/necklace.webp", alt: "A gold and silver layered permanent necklace on a display bust", span: "tall" },
  { src: "/media/images/workspace.webp", alt: "A jeweler's flat lay with micro-welding pen, tweezers and chain spools", span: "wide" },
  { src: "/media/images/mother-daughter.webp", alt: "A mother and daughter showing matching gold chain bracelets", span: "tall" },
  { src: "/media/images/bridal-suite.webp", alt: "A bride having a gold chain welded on in a sunlit bridal suite", span: "wide" },
] as const;

// PLACEHOLDER — written as representative reviews. Swap for real ones.
export const testimonials = [
  {
    quote:
      "She set up in our bridal suite at 9am and by the time we left for photos all eight of us were wearing one. Two years later I have still never taken mine off.",
    name: "Hannah R.",
    context: "Bride",
  },
  {
    quote:
      "We booked hey babe for a client appreciation night and the line did not stop. Easily the best return we have had on an event spend.",
    name: "Marissa D.",
    context: "Marketing Director",
  },
  {
    quote:
      "I came in for one chain and left with an anklet too. She is so careful and so fast — you barely feel the weld and then it is just yours.",
    name: "Kate L.",
    context: "Pop-up guest",
  },
  {
    quote:
      "My daughter and I got matching ones for her sixteenth. She touches hers constantly. Worth every penny.",
    name: "Denise M.",
    context: "Private party",
  },
] as const;

export const faqs = [
  {
    q: "Does the welding hurt?",
    a: "Not at all. The weld happens on the chain, not on you, and we place a small shield between the link and your skin. Most people describe it as a tiny warm click. It is over in about two seconds.",
  },
  {
    q: "How long does permanent jewelry actually last?",
    a: "Indefinitely, with normal wear. Our chains are 14K gold-filled or sterling silver — not plated — so they hold up to water, sweat and daily life. If a chain ever breaks, bring it back and we re-weld it free, for life.",
  },
  {
    q: "Can I take it off?",
    a: "Yes. One small snip at the weld with nail scissors and it comes off cleanly — handy for an MRI or a surgery. Keep it, bring it back, and we re-weld it for free.",
  },
  {
    q: "Can I shower and swim in it?",
    a: "Yes to both. Gold-filled and sterling silver are made for real life. We do suggest taking a beat before hot tubs and heavy chlorine, and a soft polishing cloth keeps silver bright.",
  },
  {
    q: "What is the difference between gold-filled and gold-plated?",
    a: "Plating is a microscopic layer that wears off. Gold-filled is a thick, bonded layer of solid 14K — legally it must be at least 5% gold by weight, roughly 100 times more than plating. It is why we will not sell plated.",
  },
  {
    q: "How much does an event cost?",
    a: "Private parties start around $450 and weddings around $650, which covers travel, setup and a set window of welding time. Guests pay for their own chains, or you can pre-buy a bar-tab style package. Tell us the headcount and we will send exact numbers.",
  },
  {
    q: "How many guests can you get through?",
    a: "Roughly 12 to 15 guests an hour with one jeweler, faster with two. For anything over about 60 guests we bring a second station so nobody is standing around.",
  },
  {
    q: "How far will you travel?",
    a: `We cover ${site.serviceArea} with no travel fee, and we go further for weddings and corporate bookings — just ask and we will quote it.`,
  },
] as const;

export const eventTypes = [
  "Wedding",
  "Bachelorette",
  "Birthday",
  "Corporate / brand event",
  "Boutique pop-up",
  "Private party",
  "Something else",
] as const;
