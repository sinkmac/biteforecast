import type { Metadata } from "next";
import Link from "next/link";

import { GuideAffiliatePlacement } from "../../components/affiliate-kit";
import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

const paragraphClass = "text-almanac-secondary";
const sectionClass = "space-y-4";
const headingClass = "text-2xl font-semibold text-almanac-ink";
const subheadingClass = "text-xl font-semibold text-almanac-ink";
const linkClass = "text-almanac-green underline decoration-emerald-500/60 underline-offset-4";

export const metadata: Metadata = {
  title: "Midge Season in Scotland — A Month by Month Guide",
  description:
    "A practical month-by-month guide to midge season in Scotland, including peak months, worst areas, lower-risk areas, and weather conditions that matter.",
  alternates: buildMetadataAlternates("/midge-season-scotland"),
  openGraph: buildOpenGraph({
    title: "Midge Season in Scotland — A Month by Month Guide",
    description:
      "A practical month-by-month guide to midge season in Scotland, including peak months, worst areas, lower-risk areas, and weather conditions that matter.",
    url: `${SITE_URL}/midge-season-scotland`,
    type: "article",
  }),
};

export default function MidgeSeasonScotlandPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-almanac-green underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-green">
            Seasonal guide
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Midge Season in Scotland — A Month by Month Guide
          </h1>
          <p className="max-w-3xl text-lg text-almanac-secondary">
            Timing is everything with Scottish midges. The difference between a miserable experience and a perfectly pleasant one can come down to a few weeks — or even a few hours. Here&apos;s what to expect across the season.
          </p>
        </header>

        <section className={sectionClass}>
          <h2 className={headingClass}>The Midge Calendar</h2>

          <section className={sectionClass}>
            <h3 className={subheadingClass}>March and April — Pre-Season</h3>
            <p className={paragraphClass}>
              Midges are not yet a significant problem. Larvae are developing in the soil but adults haven&apos;t emerged in numbers. Early spring walkers and campers in the Highlands can usually enjoy the outdoors without significant midge pressure.
            </p>
            <p className={paragraphClass}>
              The caveat: an unusually mild, wet spring can bring emergence forward. Don&apos;t assume you&apos;re safe simply because it&apos;s April.
            </p>
          </section>

          <section className={sectionClass}>
            <h3 className={subheadingClass}>May — The Start of the Season</h3>
            <p className={paragraphClass}>
              The first midges typically emerge in late May, particularly on the west coast and in sheltered glens. Numbers are still relatively low and activity is sporadic. This is often considered the sweet spot for Highland travel — the landscape is beautiful, the days are long, and the midges are manageable.
            </p>
            <p className={paragraphClass}>
              The worst of May&apos;s midges tend to appear at dawn and dusk. Midday activity is usually minimal even in peak emergence areas.
            </p>
          </section>

          <section className={sectionClass}>
            <h3 className={subheadingClass}>June — Peak Season Begins</h3>
            <p className={paragraphClass}>
              June marks the beginning of serious midge season. Populations build rapidly, particularly after rain. The summer solstice brings the longest days, which means the low-light periods that midges love — dawn and dusk — extend significantly. In northern Scotland, genuine darkness barely arrives in midsummer.
            </p>
            <p className={paragraphClass}>
              June is typically one of the worst months for midges in the Western Isles and west coast. Skye, Mull, and the Great Glen area can be severely affected in calm, overcast conditions.
            </p>
          </section>

          <section className={sectionClass}>
            <h3 className={subheadingClass}>July — Peak Season</h3>
            <p className={paragraphClass}>
              July is usually the worst month for midges across most of Scotland. Populations are at their highest, conditions are frequently warm and humid, and the long days mean extended periods of midge-friendly light levels.
            </p>
            <p className={paragraphClass}>
              This is also, of course, peak tourist season — the combination that has made Scottish midges a significant concern for outdoor hospitality businesses.
            </p>
            <p className={paragraphClass}>
              That said, July also brings the best weather for wind — and wind suppresses midge activity dramatically. A breezy July day on an exposed hillside can be completely midge-free.
            </p>
          </section>

          <section className={sectionClass}>
            <h3 className={subheadingClass}>August — Still Peak, Gradual Decline</h3>
            <p className={paragraphClass}>
              August remains a high-midge month, particularly in the first half. Populations begin to decline as the season progresses but remain significant through most of the month.
            </p>
            <p className={paragraphClass}>
              August tends to bring drier, windier conditions to Scotland than June and July, which can make outdoor activities more manageable despite continued midge presence. The midges are still there — but the weather is often less perfectly suited to them.
            </p>
          </section>

          <section className={sectionClass}>
            <h3 className={subheadingClass}>September — The Season Winds Down</h3>
            <p className={paragraphClass}>
              September sees a significant reduction in midge populations across most of Scotland. Activity is increasingly confined to sheltered, boggy areas and to the calm conditions of dawn and dusk. Hillwalking and camping in September is often dramatically more pleasant than the same activities in July.
            </p>
            <p className={paragraphClass}>The first frosts, when they arrive, effectively end the active season.</p>
          </section>

          <section className={sectionClass}>
            <h3 className={subheadingClass}>October Onwards — Winter Reprieve</h3>
            <p className={paragraphClass}>
              Midge activity is negligible by October across most of Scotland. The autumn and winter months are the safest for midge-free outdoor experiences. The trade-off is shorter days, colder temperatures, and — in Scotland — an entirely different set of weather challenges.
            </p>
          </section>
        </section>

        <GuideAffiliatePlacement intro="If you are visiting during June, July or August, repellent is worth packing before the forecast turns ugly." />

        <section className={sectionClass}>
          <h2 className={headingClass}>The Worst Areas</h2>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Western Isles and west coast:</strong> The wettest, boggiest terrain and the most midge-prone climate in Scotland. Skye, Mull, the Kintyre peninsula, and the area around Fort William and Glen Coe have particularly severe populations.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Great Glen:</strong> The corridor from Fort William to Inverness, including Loch Ness, is notorious for midges in calm summer conditions.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Torridon and Wester Ross:</strong> Some of the most remote and beautiful landscape in Scotland, but also some of the most significant midge pressure in poor conditions.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Rannoch Moor:</strong> The vast expanse of boggy moorland can be genuinely unpleasant in calm, overcast summer weather.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Cairngorms:</strong> Less severe than the west coast but still significant, particularly in sheltered glens and around lochs.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>The Best Areas for Lower Midge Pressure</h2>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">East coast:</strong> The drier climate and more exposed terrain of the east coast — Aberdeenshire, Angus, the East Neuk of Fife — tends to see far lower midge pressure than the west.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Exposed hilltops and ridges:</strong> Any location with consistent wind is dramatically better. A hilltop walk in July can be completely midge-free while the glen below is intolerable.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Urban areas:</strong> Midges are primarily a rural, outdoor problem. Edinburgh, Glasgow, and other Scottish cities are not significantly affected.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Weather Makes All the Difference</h2>
          <p className={paragraphClass}>The calendar tells you the season. The weather tells you the day.</p>
          <p className={paragraphClass}>The key variables:</p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Wind speed</strong> is the most important factor. At 5-7mph midge activity is noticeably reduced. At 10-12mph it is effectively suppressed. A forecast showing light to moderate winds dramatically changes the picture even in peak July.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Cloud cover</strong> affects activity levels. Overcast, humid conditions are ideal for midges. Bright sunshine suppresses them.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Rain</strong> during the day suppresses activity — midges don&apos;t fly in rain. But the period immediately after rain, when conditions are calm and humid, can see a surge in activity.
          </p>
          <p className={paragraphClass}>
            <strong className="text-almanac-ink">Temperature</strong> matters but is less decisive than wind. Midges are most active in temperatures between 10-18°C — the cool, humid range that Scottish summers frequently deliver.
          </p>
        </section>

        <p className="border-t border-stone-800 pt-6 text-sm italic text-almanac-muted">
          Check your BiteForecast before heading out — local conditions can vary significantly from general forecasts and the difference between a low-risk and high-risk day can be dramatic.
        </p>

        <section className="rounded-2xl border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">Check your forecast</h2>
          <p className="mt-3 text-almanac-secondary/90">
            Use the <Link className={linkClass} href="/">homepage forecast tool</Link> before you go, or check a local page such as <Link className={linkClass} href="/scotland/glencoe-midges">Glencoe midges</Link> if you are heading west.
          </p>
        </section>
      </article>
    </main>
  );
}
