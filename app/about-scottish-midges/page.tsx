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
const linkClass = "text-almanac-green underline decoration-emerald-500/60 underline-offset-4";

export const metadata: Metadata = {
  title: "About Scottish Midges — What They Are and Why They're So Bad",
  description:
    "What Scottish midges are, where they come from, when they bite, why the Highlands are so badly affected, and what actually helps.",
  alternates: buildMetadataAlternates("/about-scottish-midges"),
  openGraph: buildOpenGraph({
    title: "About Scottish Midges — What They Are and Why They're So Bad",
    description:
      "What Scottish midges are, where they come from, when they bite, why the Highlands are so badly affected, and what actually helps.",
    url: `${SITE_URL}/about-scottish-midges`,
    type: "article",
  }),
};

export default function AboutScottishMidgesPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-almanac-green underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-green">
            Scottish midge guide
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            About Scottish Midges — What They Are and Why They&apos;re So Bad
          </h1>
          <p className="max-w-3xl text-lg text-almanac-secondary">
            Scottish midges. If you&apos;ve ever tried to enjoy a summer evening in the Highlands and found yourself retreating indoors within minutes, swatting at an invisible cloud of something that bites, you&apos;ve met them. They are small, they are persistent, and they have defeated better people than you.
          </p>
          <p className="max-w-3xl text-lg text-almanac-secondary">
            Here&apos;s what you&apos;re actually dealing with.
          </p>
        </header>

        <section className={sectionClass}>
          <h2 className={headingClass}>What Are Scottish Midges?</h2>
          <p className={paragraphClass}>
            The Scottish midge — <em>Culicoides impunctatus</em>, to use its full name — is a tiny biting insect roughly 1.4mm long. That&apos;s about the size of a pinhead. They are so small they can pass through standard window screens and most netting. They are not mosquitoes. They are not gnats. They are their own particular problem, and Scotland has more of them than almost anywhere else on earth.
          </p>
          <p className={paragraphClass}>
            There are around 35 species of biting midge in Scotland, but <em>Culicoides impunctatus</em> is responsible for the vast majority of bites. It&apos;s the one people mean when they talk about Scottish midges.
          </p>
          <p className={paragraphClass}>
            Only the females bite. They need a blood meal to develop their eggs. Males feed on nectar and plant juices and cause nobody any harm at all. The females, unfortunately, are the ones you encounter.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Where Do They Come From?</h2>
          <p className={paragraphClass}>
            Midges breed in wet, boggy ground — the kind of terrain that covers vast stretches of the Scottish Highlands. The wet, peaty soil of the glens provides ideal breeding conditions. Larvae develop in the top layer of soil, emerging as adults in late spring and continuing through summer and into early autumn.
          </p>
          <p className={paragraphClass}>
            The west coast of Scotland and the Western Isles have particularly severe midge populations because the climate is wetter and the terrain is more boggy. Areas like Skye, Mull, Torridon, and the Great Glen are notorious. The east coast and higher exposed ground tend to be less severe, though nowhere in the Highlands is completely free.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>When Are They Active?</h2>
          <p className={paragraphClass}>
            Midges are most active from late May through to September, with peak activity typically in June and July. Within any given day they are most troublesome at dawn and dusk — the low light, calm air and higher humidity of those hours suit them perfectly.
          </p>
          <p className={paragraphClass}>
            Wind is their enemy. Even a light breeze of 5-7mph significantly reduces midge activity; at around 12mph they effectively disappear. This is why a breezy hilltop can be completely midge-free while the sheltered glen below is intolerable.
          </p>
          <p className={paragraphClass}>
            Rain suppresses them. Bright sunshine suppresses them. The conditions they love are calm, overcast, humid days — the kind of weather Scotland produces in abundance in summer.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Why Are They So Bad in Scotland Specifically?</h2>
          <p className={paragraphClass}>Several factors combine to make Scotland a particularly challenging midge environment:</p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Terrain.</strong> The abundance of boggy, peaty ground across the Highlands provides near-perfect breeding habitat at scale.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Climate.</strong> Scotland&apos;s cool, wet summers — particularly on the west coast — suit midges far better than the drier climates of England or continental Europe.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Latitude.</strong> The long Scottish summer days mean more hours of the low-light conditions that midges prefer. Midsummer dusk in the Highlands comes very late.
          </p>
          <p className={paragraphClass}>
            <strong className="text-stone-100">Land use.</strong> Large areas of the Highlands remain as open moorland and woodland, with minimal drainage — exactly the conditions that allow midge populations to thrive.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>What Happens When They Bite?</h2>
          <p className={paragraphClass}>
            A midge bite causes a small red welt that itches intensely. The irritation comes from the midge&apos;s saliva, which contains anticoagulants to keep the blood flowing while it feeds. The body&apos;s immune response to that saliva produces the itching and inflammation.
          </p>
          <p className={paragraphClass}>
            Most people experience mild to moderate irritation that passes within a day or two. Some people, particularly those encountering Scottish midges for the first time, react more severely with larger welts and prolonged itching. Regular exposure can build some tolerance over time.
          </p>
          <p className={paragraphClass}>Scratching makes it worse. Cold water or antihistamine cream helps.</p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Are They Dangerous?</h2>
          <p className={paragraphClass}>
            Scottish midges are not known to transmit disease to humans in the UK. Unlike mosquitoes in tropical regions, <em>Culicoides impunctatus</em> is not a significant disease vector for people in Scotland. The bites are unpleasant but not medically dangerous for the vast majority of people.
          </p>
          <p className={paragraphClass}>
            They are, however, a significant economic issue for Scottish tourism and outdoor industries. Studies have estimated that midges cost the Scottish economy tens of millions of pounds annually through lost tourism revenue and reduced productivity in outdoor workers.
          </p>
        </section>

        <GuideAffiliatePlacement intro="If you are reading up on Scottish midges before a trip, these are the practical items worth sorting before the first still evening." />

        <section className={sectionClass}>
          <h2 className={headingClass}>Can Anything Be Done?</h2>
          <p className={paragraphClass}>
            Yes — but nothing eliminates them completely in their peak season in their worst locations. The most effective approaches combine repellent, protective clothing, timing, and awareness of weather conditions.
          </p>
          <p className={paragraphClass}>
            DEET-based repellents are the most effective. Saltidin (also called Picaridin) is a good alternative for those who prefer DEET-free options. Smidge is a Scottish-developed midge repellent that has built a strong reputation among hillwalkers and campers for effective, long-lasting protection.
          </p>
          <p className={paragraphClass}>
            Physical barriers — midge hoods, fine mesh head nets, long sleeves and trousers — provide reliable protection when repellents alone aren&apos;t enough.
          </p>
          <p className={paragraphClass}>
            Timing matters enormously. Planning outdoor activities for the middle of the day, avoiding dawn and dusk, and choosing breezy exposed locations over sheltered glens can make a significant difference to your experience.
          </p>
          <p className={paragraphClass}>
            The forecast matters too. Midge activity varies significantly day to day based on wind speed, temperature, humidity and cloud cover. Checking conditions before heading out is the single most useful thing most visitors can do.
          </p>
        </section>

        <p className="border-t border-stone-800 pt-6 text-sm italic text-almanac-muted">
          BiteForecast uses local weather data to estimate midge risk across Scottish locations. Check your forecast before you go.
        </p>

        <section className="rounded-2xl border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">Check your forecast</h2>
          <p className="mt-3 text-stone-100/90">
            Use the <Link className={linkClass} href="/">homepage forecast tool</Link> before you go, or check a local page such as <Link className={linkClass} href="/scotland/glencoe-midges">Glencoe midges</Link> if you are heading west.
          </p>
        </section>
      </article>
    </main>
  );
}
