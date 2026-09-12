import { chromium } from "playwright";

const OUT = "/tmp/claude-0/-home-user-heybabe/a641ada7-e341-5ff7-a440-a66e55c7ad48/scratchpad";
const base = "http://localhost:3100";

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(`PAGEERROR ${e.message}`));

await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(2600); // let the preloader clear

const shots = [
  { name: "01-hero", y: 0 },
  { name: "02-hero-scrub", y: 1400 },
  { name: "03-marquee-manifesto", y: 2900 },
  { name: "04-ritual", y: 4200 },
  { name: "05-chains", y: 6600 },
  { name: "06-metal-weld", y: 8200 },
  { name: "07-charms", y: 10600 },
  { name: "08-services", y: 11900 },
  { name: "09-gallery", y: 14200 },
  { name: "10-testimonials-faq", y: 15800 },
  { name: "11-cta-footer", y: 17800 },
];

for (const s of shots) {
  await page.evaluate((y) => window.scrollTo(0, y), s.y);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${s.name}.png` });
}

const height = await page.evaluate(() => document.body.scrollHeight);
console.log("page height:", height);

// Booking page
await page.goto(`${base}/book`, { waitUntil: "networkidle" });
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/12-book.png`, fullPage: false });

// Phone
const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await phone.goto(base, { waitUntil: "networkidle" });
await phone.waitForTimeout(2600);
await phone.screenshot({ path: `${OUT}/13-mobile-hero.png` });
await phone.evaluate(() => window.scrollTo(0, 5200));
await phone.waitForTimeout(1200);
await phone.screenshot({ path: `${OUT}/14-mobile-mid.png` });

// Horizontal overflow check at several widths
for (const w of [360, 390, 768, 1280]) {
  const p = await browser.newPage({ viewport: { width: w, height: 800 } });
  await p.goto(base, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(2400);
  const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`width ${w}: horizontal overflow = ${over}px`);
  await p.close();
}

console.log("console errors:", errors.length ? errors.slice(0, 12) : "none");
await browser.close();
