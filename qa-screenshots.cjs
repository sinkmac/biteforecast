const { chromium } = require("playwright-core");

const fs = require("fs");
const path = require("path");

const OUTPUT = path.join(__dirname, "qa-screenshots");
const BASE = "https://biteforecast.scot";
const COOL_BASE = "https://cool.biteforecast.scot";

const LOCATIONS = [
  "glencoe", "fort-william", "isle-of-skye-portree", "loch-lomond-balloch",
  "cairngorms-aviemore", "arisaig", "glenfinnan", "torridon",
  "applecross", "isle-of-mull-craignure", "loch-ness-drumnadrochit",
  "glen-affric", "rannoch-moor", "knoydart-inverie", "kinlochleven",
  "isle-of-arran-brodick", "pitlochry", "inveraray", "dunoon", "helensburgh",
];

async function screenshot(page, url, name) {
  console.log(`  → ${name}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUTPUT, `${name}.png`), fullPage: true });
}

(async () => {
  fs.mkdirSync(OUTPUT, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: "/home/sink/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome",
  });

  // === biteforecast.scot ===
  console.log("=== biteforecast.scot ===");
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  await screenshot(page, BASE, "biteforecast-homepage");

  for (const loc of LOCATIONS) {
    await screenshot(page, `${BASE}/forecast/${loc}`, `biteforecast-${loc}`);
  }

  await screenshot(page, `${BASE}/about`, "biteforecast-about");
  await screenshot(page, `${BASE}/guide`, "biteforecast-guide");
  await screenshot(page, `${BASE}/how-the-index-works`, "biteforecast-how-it-works");
  await screenshot(page, `${BASE}/midge-wind-watch`, "biteforecast-wind-watch");
  await screenshot(page, `${BASE}/contact`, "biteforecast-contact");

  await ctx.close();

  // === cool.biteforecast.scot ===
  console.log("\n=== cool.biteforecast.scot ===");
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page2 = await ctx2.newPage();
  await screenshot(page2, COOL_BASE, "cool-biteforecast-dashboard");
  await ctx2.close();

  await browser.close();

  const files = fs.readdirSync(OUTPUT).filter(f => f.endsWith(".png"));
  console.log(`\nDone. ${files.length} screenshots saved to ${OUTPUT}/`);
  files.sort().forEach(f => console.log(`  ${f}`));
})().catch(err => {
  console.error("FAILED:", err.message);
  process.exit(1);
});