import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            BiteForecast
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Scottish midge planning guides with a live calculator for day-of checks.
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            Start with a place-pattern guide if you are planning ahead, then use the live Midge Wind-Watch calculator before you travel.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Link
            className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 transition hover:border-emerald-300 hover:bg-emerald-500/15"
            href="/scotland/glencoe-midges"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Benchmark place-pattern page
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Glencoe</h2>
            <p className="mt-2 text-stone-300">
              Learn the typical seasonal pattern, the sheltered-glens risk story, and the best and worst windows for visiting.
            </p>
          </Link>

          <Link
            className="rounded-2xl border border-stone-700 bg-stone-900 p-6 transition hover:border-stone-500 hover:bg-stone-800"
            href="/midge-wind-watch"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-400">
              Live route
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Midge Wind-Watch</h2>
            <p className="mt-2 text-stone-300">
              Use the live calculator for current or day-of conditions once the weather-backed scoring flow is wired up.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
