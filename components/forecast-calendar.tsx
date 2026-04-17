import type { ForecastCalendarDay } from "../lib/calculator/forecast";

type ForecastCalendarProps = {
  title: string;
  intro: string;
  days: ForecastCalendarDay[];
};

export function ForecastCalendar({ title, intro, days }: ForecastCalendarProps) {
  if (!days.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-3 max-w-3xl text-stone-300">{intro}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-7">
        {days.map((day) => (
          <article
            key={day.dateIso}
            className="rounded-2xl border border-stone-800 bg-stone-950/80 p-4"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-400">
              {day.label}
            </p>
            <p className="mt-3 text-xl font-semibold text-stone-50">{day.band}</p>
            <p className="mt-2 text-sm text-stone-300">{day.advice}</p>
            {day.peakTimeMessage ? (
              <p className="mt-3 text-xs text-rose-200">{day.peakTimeMessage}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
