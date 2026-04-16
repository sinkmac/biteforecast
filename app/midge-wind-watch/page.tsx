import Link from "next/link";

export default function MidgeWindWatchPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
          ← Back to BiteForecast
        </Link>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Midge Wind-Watch
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Live calculator route scaffold</h1>
          <p className="text-lg text-stone-300">
            This route is reserved for the live weather-backed scoring experience. The current build focuses on the repository skeleton, locked score bands, and the Glencoe benchmark page.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6 text-stone-300">
          <p className="font-medium text-stone-100">Current build note</p>
          <p className="mt-2">
            Use the Glencoe place-pattern page for planning content. The interactive scoring flow will be added on top of this scaffold as the Next.js build continues.
          </p>
        </div>
      </div>
    </main>
  );
}
