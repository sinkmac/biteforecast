import type { MidgeForecast } from "../lib/forecast/service";

const OVERNIGHT_BANDS: Array<{ min: number; max: number; line: string }> = [
  { min: 0, max: 1, line: "A quiet night ahead. The pools stay still till first light." },
  { min: 2, max: 2, line: "Manageable through to dawn. Nothing this watch hasn't flagged before." },
  { min: 3, max: 4, line: "Head-net conditions from the bank. Not a retreat night." },
  { min: 5, max: 6, line: "Holding at Moderate from dusk to dawn. Tent flaps stay closed tonight." },
  { min: 7, max: 10, line: "As bad as it gets, dusk to dawn. No easing before first light. This is the one the pools remember." },
];

function getOvernightBandLine(index: number): string {
  const band = OVERNIGHT_BANDS.find((b) => index >= b.min && index <= b.max);
  return band?.line ?? OVERNIGHT_BANDS[0].line;
}

export function OvernightWatchCard({ forecast }: { forecast: MidgeForecast }) {
  const { overnightPeak, overnightEstimated } = forecast.current;
  const bandLine = getOvernightBandLine(overnightPeak);
  const isFallback = forecast.mode === "fallback";

  return (
    <section className="rounded-3xl border border-cyan-700/30 bg-cyan-900/15 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        Overnight Watch
      </p>
      <div className="mt-4">
        <p className="text-2xl font-black tracking-tight text-stone-50">
          Peak overnight exposure: <span className="text-cyan-100">{overnightPeak}/10</span>
        </p>
        <p className="mt-3 max-w-2xl text-base leading-7 text-stone-200">
          {bandLine}
        </p>
      </div>

      {/* Honesty framing — standard humility */}
      <p className="mt-4 text-xs leading-5 text-stone-500">
        This is a planning estimate for the overnight window, not a guarantee. Conditions can shift.
      </p>

      {/* Fallback-data honesty framing */}
      {isFallback ? (
        <p className="mt-2 text-xs leading-5 text-amber-200">
          Live data unavailable — this window is an estimate, not tonight&apos;s actual sunset/sunrise.
        </p>
      ) : null}

      {/* Solar edge case / data gap honesty framing */}
      {overnightEstimated ? (
        <p className="mt-2 text-xs leading-5 text-amber-200">
          Data gap — using an estimated overnight window (22:00–03:00) rather than actual sunset/sunrise.
        </p>
      ) : null}

      {/* Short-duration calibration note (A2 bridge — O/W half) */}
      <p className="mt-2 text-xs leading-5 text-stone-500">
        Calibrated for dusk-to-dawn exposure. Short evening trips: see the dog walker guide.
      </p>

      {/* Stockist salvage line (from Nearest Stockist kill) */}
      <p className="mt-2 text-xs leading-5 text-stone-500">
        Buying en route? Repellent is stocked at most Highland petrol stations and outdoor shops.
      </p>
    </section>
  );
}