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

Business facts are taken from hey babe's business card and Instagram profile
[@xo.heybabe](https://instagram.com/xo.heybabe) and are accurate: the product
line (bracelets, anklets, necklaces, handchains), the five bookable formats
(private parties, appointments, pop-ups, weddings, corporate/special events),
the materials (14K gold-filled and sterling silver), the four states served
(CT, RI, MA, NY) and the contact details.

Anything still marked `PLACEHOLDER` is realistic-but-invented content standing
in until the real data arrives:

| What | Where | Status |
| --- | --- | --- |
| Chain names & prices | `chains` | Placeholder — market-realistic |
| Charm menu & prices | `charms` | Placeholder |
| Event minimums | `services[].from` | Placeholder |
| Reviews | `testimonials` | Placeholder — written as representative |
| Domain | `site.url` | Placeholder — set before launch (drives SEO + sitemap) |

---

## Brand assets

`public/brand/` holds hey babe's real logo, lifted from the Instagram profile
image:

- **`wordmark.png`** — the "hey babe" script and its rule, as a transparent
  alpha mask. `src/components/Wordmark.tsx` applies it as a CSS mask over
  `currentColor`, so one asset renders white over the hero footage, ink on the
  cream page and shell in the dark footer. Size it with a height utility
  (`h-[48px]`); the width follows from the aspect ratio.
- **`logo-badge.png`** — the full circular badge, used for the favicon
  (`src/app/icon.png`) and the social card.

If a higher-resolution original of the logo turns up, replace these two files
and nothing else needs to change.

---

## Instagram feed

The gallery section pulls hey babe's latest posts.

**Instagram cannot be scraped.** An unauthenticated request to the profile is
redirected to a login wall, the private web endpoints answer `401
require_login`, and scraping would breach Instagram's terms in any case. So the
feed uses the official Instagram Graph API, which needs a long-lived access
token for the account:

```
INSTAGRAM_ACCESS_TOKEN=IGQ...          # long-lived token for @xo.heybabe
INSTAGRAM_API_VERSION=v21.0            # optional, defaults to v21.0
```

To get the token: at [developers.facebook.com](https://developers.facebook.com)
create an app, add the **Instagram** product, connect the @xo.heybabe
professional account, then generate and exchange a user token for a long-lived
one. Long-lived tokens last 60 days and should be refreshed before they expire.

The feed is re-fetched hourly (`revalidate: 3600`), so new posts appear on the
site by themselves without a redeploy.

**Without a token** — or if the call fails or the token has expired — the
section falls back to the curated local gallery in `galleryFallback`, so it
always renders something rather than collapsing to an empty grid. Nothing
breaks; the feed simply stops being live.

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

(See also `INSTAGRAM_ACCESS_TOKEN` under **Instagram feed** above.)

**Until those are set the form does not pretend to have sent anything** — it
responds `delivered: false` and the UI hands the visitor a pre-filled email
draft instead, so an enquiry is never silently dropped.

The form also carries a honeypot field for spam.

---

## Deploying

Live on Vercel: project **heybabe**, team *Jordan Lang's projects*, linked to
this GitHub repo. Every push deploys automatically — the production branch
(`main`) publishes to the production URL, and every other branch gets its own
preview URL.

Environment variables to set in the Vercel dashboard:

| Variable | Needed for | Effect if unset |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Launch | Canonicals fall back to the deployment URL, **and the site stays `noindex`** |
| `RESEND_API_KEY` / `BOOKING_FROM` | Booking emails | Form hands the visitor a pre-filled mail draft instead |
| `INSTAGRAM_ACCESS_TOKEN` | Live Instagram feed | Falls back to the curated local gallery |

### Search indexing is deliberately off until launch

Preview and `*.vercel.app` builds still carry placeholder pricing, so
`robots.txt` disallows everything and pages are `noindex` until
`NEXT_PUBLIC_SITE_URL` is set. A demo with invented prices ranking under hey
babe's name would do real damage. Setting that variable on the real domain
turns indexing on — there is nothing else to remember.

## SEO

- Per-page metadata, canonical URLs, OpenGraph and Twitter cards
- Generated OG image (`src/app/opengraph-image.tsx`) and favicon
- `JewelryStore` structured data site-wide, `FAQPage` structured data on the
  homepage — the FAQ block targets the highest-intent searches this business
  gets ("does permanent jewelry hurt", "can you shower in it")
- `sitemap.xml` and `robots.txt` generated at build time
