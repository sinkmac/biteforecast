import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

const paragraphClass = "text-stone-300";
const sectionClass = "space-y-4";
const headingClass = "text-2xl font-semibold text-stone-50";
const linkClass = "text-emerald-300 underline decoration-emerald-500/60 underline-offset-4";
const affiliateLinkClass = "text-emerald-300 underline decoration-emerald-500/60 underline-offset-4";

export const metadata: Metadata = {
  title: "How to Avoid Midges in Scotland — What Actually Works",
  description:
    "Practical advice on avoiding Scottish midges: forecast checks, timing, repellents, clothing, camp choice, tent setup, and bite relief.",
  alternates: buildMetadataAlternates("/how-to-avoid-midges-scotland"),
  openGraph: buildOpenGraph({
    title: "How to Avoid Midges in Scotland — What Actually Works",
    description:
      "Practical advice on avoiding Scottish midges: forecast checks, timing, repellents, clothing, camp choice, tent setup, and bite relief.",
    url: `${SITE_URL}/how-to-avoid-midges-scotland`,
    type: "article",
  }),
};

export default function HowToAvoidMidgesScotlandPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-50">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Practical midge advice
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            How to Avoid Midges in Scotland — What Actually Works
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            There is no way to completely eliminate midges from a Scottish summer. Anyone telling you otherwise is selling something. But there is a significant difference between an experience ruined by midges and one that&apos;s merely occasionally inconvenient — and that difference comes down to preparation, timing, and the right kit.
          </p>
          <p className="max-w-3xl text-lg text-stone-300">Here&apos;s what actually works.</p>
        </header>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. Check the Forecast Before You Go</h2>
          <p className={paragraphClass}>
            This is the single most useful thing you can do. Midge activity varies enormously from day to day based on wind, cloud cover, humidity, and temperature. A forecast showing moderate winds (10mph+) means a dramatically better day outdoors than one showing calm, overcast conditions — even in peak July.
          </p>
          <p className={paragraphClass}>
            BiteForecast provides location-specific midge risk estimates based on local weather data. Check it before planning outdoor activities, particularly if you&apos;re choosing between locations or deciding whether to pitch a tent for the night.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. Choose Your Timing Carefully</h2>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Within the season:</strong> May and September are significantly better than June, July, and August. If you have flexibility on when to visit the Highlands, late May or early September offers much of the beauty with a fraction of the midge pressure.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Within the day:</strong> Midges are most active at dawn and dusk. The middle of the day — particularly in sunny or breezy conditions — is dramatically safer. Plan sunrise walks for later in summer when you&apos;re already into peak midge hours at 5am.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Watch the weather:</strong> A breezy day is always better than a calm one. Rain during the day suppresses activity, though the calm period after rain can see a surge.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Use an Effective Repellent</h2>
          <p className={paragraphClass}>Not all repellents are equal against Scottish midges. Here&apos;s what works:</p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">DEET</strong> remains the gold standard. Products containing 30-50% DEET provide reliable, long-lasting protection. Apply to exposed skin and reapply after swimming or heavy sweating. DEET is effective against midges, mosquitoes, and ticks — useful across Scottish outdoor activities.
          </p>
          <p className={paragraphClass}>
            <a className={affiliateLinkClass} href="https://amzn.to/4mBlUbS" rel="sponsored nofollow noopener" target="_blank">
              <strong>Smidge</strong>
            </a>{" "}
            is a Scottish-developed midge repellent using Saltidin (Picaridin) as its active ingredient rather than DEET. It has developed a strong reputation among hillwalkers, campers, and outdoor workers in Scotland for effective, comfortable protection without the feel and smell of DEET. Many Scottish outdoor enthusiasts now prefer it. Available at outdoor shops across Scotland and online.
          </p>
          <p className={paragraphClass}>
            <a className={affiliateLinkClass} href="https://amzn.to/4tX26lN" rel="sponsored nofollow noopener" target="_blank">
              <strong>Avon Skin So Soft</strong>
            </a>{" "}
            has a near-legendary status as a midge repellent in Scotland, particularly among hillwalkers and military personnel who train in the Highlands. It is not technically formulated as an insect repellent — it&apos;s a moisturiser — but something in its formulation discourages midges reliably enough that it has been standard kit in parts of the British Army for decades. The dry oil spray version is the one most commonly used for midges.
          </p>
          <p className={paragraphClass}>
            <a className={affiliateLinkClass} href="https://amzn.to/3QhUkUT" rel="sponsored nofollow noopener" target="_blank">
              <strong>Lifesystems Expedition products</strong>
            </a>{" "}
            offer high-strength DEET formulations designed for severe conditions. The Expedition 100+ provides maximum-strength protection for the most challenging midge environments.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">What doesn&apos;t work:</strong> Electronic repellers, ultrasonic devices, vitamin B supplements, and most &quot;natural&quot; alternatives have little to no evidence of effectiveness against <em>Culicoides impunctatus</em>. Save your money.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Wear the Right Clothing</h2>
          <p className={paragraphClass}>
            Physical barriers are reliable where repellent alone isn&apos;t enough — particularly in severe conditions.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Cover up.</strong> Long sleeves, long trousers, and socks eliminate most bite opportunity. Midges target exposed skin. A full covering in calm conditions is often more practical than heavy repellent application.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Light colours.</strong> Midges are attracted to dark colours. Light-coloured clothing won&apos;t eliminate the problem but marginally reduces attraction.
          </p>
          <p className={paragraphClass}>
            <a className={affiliateLinkClass} href="https://amzn.to/42i5LOY" rel="sponsored nofollow noopener" target="_blank">
              <strong>A midge hood or head net</strong>
            </a>{" "}
            is the most effective piece of kit for the face and neck — the areas where midge bites are most unpleasant and where repellent can be hardest to apply effectively. Fine mesh hoods that fit over a cap are widely available at Scottish outdoor shops. They look slightly eccentric but they work.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Tightly woven fabrics.</strong> Standard loosely woven fabrics can allow biting through the material. Tightly woven technical fabrics provide better protection.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Choose Your Camp Spot Wisely</h2>
          <p className={paragraphClass}>
            If you&apos;re wild camping or staying at a campsite in the Highlands, location matters enormously.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Wind exposure is the priority.</strong> A slightly exposed spot with consistent airflow will be dramatically more comfortable than a sheltered, boggy hollow — even if the hollow looks more picturesque. Midges cannot fly effectively in even moderate wind.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Avoid boggy ground.</strong> Wet, peaty areas are breeding habitat. Camping near a bog in July is asking for trouble.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Elevation helps.</strong> Higher ground is generally windier and cooler — less comfortable for midges, more comfortable for you in calm conditions.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Water&apos;s edge can go either way.</strong> A lochside with a breeze off the water can be midge-free. A sheltered lochside in calm conditions can be one of the worst places to be.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. Inside Your Tent</h2>
          <p className={paragraphClass}>Standard tent mesh does not keep midges out. They are small enough to pass through most netting.</p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Purpose-made midge-proof mesh</strong> is available for some tents and is worth using if you&apos;re camping in peak season in the worst areas.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Keep the tent closed.</strong> A calm evening in the Western Isles means midges everywhere — don&apos;t leave doors or vents open longer than necessary.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">A small battery-powered fan</strong> inside a tent creates enough airflow to deter midges and makes warm nights more comfortable.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. After the Bite</h2>
          <p className={paragraphClass}>Despite your best efforts, bites happen. What helps:</p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Don&apos;t scratch.</strong> It makes the itching worse and the welt larger. Easier said than done.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Cold water</strong> applied immediately reduces the initial reaction.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Antihistamine cream</strong> (hydrocortisone or similar) reduces itching and inflammation. Worth carrying in your kit.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Oral antihistamines</strong> help if you&apos;re particularly reactive or have been heavily bitten.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">After-bite sticks</strong> containing ammonia or antihistamine provide quick relief.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>The Honest Summary</h2>
          <p className={paragraphClass}>
            Midges are part of the Scottish Highlands experience. They are worst in certain places, at certain times, in certain conditions — and much more manageable than their reputation suggests if you&apos;re prepared. The people who have the worst experiences are usually the ones who didn&apos;t know to check the forecast, didn&apos;t bring repellent, and happened to camp in a sheltered glen on a calm July evening.
          </p>
          <p className={paragraphClass}>Check the forecast. Bring Smidge. Carry a head net. Pick a breezy spot. You&apos;ll be fine.</p>
        </section>

        <p className="border-t border-stone-800 pt-6 text-sm italic text-stone-400">
          BiteForecast provides location-specific midge risk estimates for eight Scottish locations based on live weather data. Check before you go.
        </p>

        <p className="rounded-2xl border border-stone-800 bg-stone-900 p-4 text-sm text-stone-400">
          This page contains affiliate links. We may earn a small commission if you purchase through a link, at no cost to you.
        </p>

        <section className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
          <h2 className="text-2xl font-semibold">Check your forecast</h2>
          <p className="mt-3 text-stone-100/90">
            Use the <Link className={linkClass} href="/">homepage forecast tool</Link> before you go, or check a local page such as <Link className={linkClass} href="/scotland/glencoe-midges">Glencoe midges</Link> if you are heading west.
          </p>
        </section>
      </article>
    </main>
  );
}
