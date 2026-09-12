import { chromium } from "playwright";
const OUT = "/tmp/claude-0/-home-user-heybabe/a641ada7-e341-5ff7-a440-a66e55c7ad48/scratchpad";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
await page.waitForTimeout(2600);

const at = async (sel, offset, name) => {
  await page.evaluate(([s, o]) => {
    const el = document.querySelector(s);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o);
  }, [sel, offset]);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${name}.png` });
};

await at("#ritual", 420, "fix-ritual");
await at("#chains", 120, "fix-chains");
await at("#charms", 120, "fix-charms");
await at("#events", 120, "fix-events");
await at("#stories", 120, "fix-stories");
await at("#faq", 60, "fix-faq");
await at("#charms", -900, "fix-metalband");
await at("#faq", -700, "fix-testimonials");

console.log("errors:", errors.length ? errors : "none");
await browser.close();
