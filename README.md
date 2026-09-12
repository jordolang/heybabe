# hey babe — Handcrafted & Permanent Fine Jewelry

Marketing site for **hey babe**, a custom permanent jewelry studio working
weddings, pop-ups, corporate events and private parties.

Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion
and Lenis. Everything is statically rendered except the booking endpoint.

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Node 20+.

---

## Editing the content

**Almost every word and price on the site lives in one file:
[`src/data/site.ts`](src/data/site.ts).** Chain names, prices, charm menu,
event formats and minimums, reviews, FAQs, contact details and the service
area are all there. Change them there and the whole site updates — no
component edits needed.

Anything in that file marked `PLACEHOLDER` is realistic-but-invented content
standing in until the real data arrives. Currently that means:

| What | Where | Status |
| --- | --- | --- |
| Chain names & prices | `chains` | Placeholder — market-realistic |
| Charm menu & prices | `charms` | Placeholder |
| Event minimums | `services[].from` | Placeholder |
| Reviews | `testimonials` | Placeholder — written as representative |
| Service area | `site.serviceArea` | Placeholder — set to the real region |
| Domain | `site.url` | Placeholder — set before launch (drives SEO + sitemap) |

Contact details (`xo.heybabe@gmail.com`, `@xo.heybabe`) are taken from the
business card and are real.

---

## Photography and video

All imagery in `public/media` is **AI-generated placeholder art** built to
match the brand's palette and subject matter. It is production-quality and
safe to launch with, but it is meant to be swapped for real photography of
hey babe's own work as it becomes available.

To replace any asset: drop a `.png` into `public/media/images/` (or a
`<name>.raw.mp4` into `public/media/video/`) and run:

```bash
node tools/media.mjs
```

That script:

- converts PNGs to sized, optimised WebP and deletes the source
- encodes each raw video into a small ambient loop (`<name>.mp4`)
- encodes an **all-keyframe** copy (`<name>.scrub.mp4`) for the clips listed
  in `SCRUB`, so scroll-scrubbing can seek to any frame without stalling
- extracts a `<name>-poster.webp` poster frame

Keep the output filenames the same and nothing else needs touching.

---

## The scroll effects

- **`src/components/ScrollVideo.tsx`** — pins a video to the viewport and maps
  scroll position onto its playhead, so scrolling scrubs the footage forwards
  and backwards. Seeks are eased in a `requestAnimationFrame` loop rather than
  written straight from the scroll handler, which is what keeps it fluid.
  Used for the hero and the weld band. A portrait encode is swapped in below
  820px so phones get a full-frame vertical shot.
- **`src/components/SmoothScroll.tsx`** — Lenis, driven from the same rAF loop
  as the animations so pinned sections don't lag the page by a frame.
- **`src/components/VideoLoop.tsx`** — ambient loops that only decode while
  on screen.

Every one of these checks `prefers-reduced-motion` and degrades to a static,
readable equivalent.

---

## Booking form

`POST /api/book` validates the enquiry and emails it on. Delivery uses
[Resend](https://resend.com); set these environment variables in production:

```
RESEND_API_KEY=re_xxxxxxxx
BOOKING_FROM=bookings@yourdomain.com   # must be a verified sender
BOOKING_TO=xo.heybabe@gmail.com        # optional, defaults to site.email
```

**Until those are set the form does not pretend to have sent anything** — it
responds `delivered: false` and the UI hands the visitor a pre-filled email
draft instead, so an enquiry is never silently dropped.

The form also carries a honeypot field for spam.

---

## Deploying

Deploys to Vercel as-is: import the repo, add the environment variables above,
and set `site.url` in `src/data/site.ts` to the live domain so the sitemap,
canonical URLs and social cards are correct.

---

## SEO

- Per-page metadata, canonical URLs, OpenGraph and Twitter cards
- Generated OG image (`src/app/opengraph-image.tsx`) and favicon
- `JewelryStore` structured data site-wide, `FAQPage` structured data on the
  homepage — the FAQ block targets the highest-intent searches this business
  gets ("does permanent jewelry hurt", "can you shower in it")
- `sitemap.xml` and `robots.txt` generated at build time
