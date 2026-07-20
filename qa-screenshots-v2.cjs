const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const OUTPUT = path.join(__dirname, "qa-screenshots-v2");
const BASE = "https://biteforecast.scot";

const PAGES = [
  { url: `${BASE}/smidge-vs-avon-skin-so-soft`, name: "biteforecast-smidge-vs-avon-v2" },
  { url: `${BASE}/scotland/glencoe-midges`, name: "biteforecast-scotland-glencoe-v2" },
  { url: `${BASE}/midge-season-scotland`, name: "biteforecast-midge-season-v2" },
  { url: `${BASE}/how-to-avoid-midges-scotland`, name: "biteforecast-avoid-midges-v2" },
];

async function screenshot(page, url, name) {
  console.log(`  → ${name}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.evaluate(async () => {
    const scrollHeight = document.body.scrollHeight;
    const step = window.innerHeight;
    for (let y = 0; y < scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUTPUT, `${name}.png`), fullPage: true });
}

(async () => {
  fs.mkdirSync(OUTPUT, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/home/sink/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome",
  });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  for (const p of PAGES) {
    await screenshot(page, p.url, p.name);
  }

  await ctx.close();
  await browser.close();

  const files = fs.readdirSync(OUTPUT).filter(f => f.endsWith(".png"));
  console.log(`\nDone. ${files.length} screenshots saved to ${OUTPUT}/`);
  files.sort().forEach(f => console.log(`  ${f} (${Math.round(fs.statSync(path.join(OUTPUT, f)).size / 1024)} KB)`));
})().catch(err => {
  console.error("FAILED:", err.message);
  process.exit(1);
});