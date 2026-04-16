import { describe, expect, it } from "vitest";

import { getLocationPageBySlug } from "../../lib/seo/location-pages";
import {
  buildFallbackCalculatorState,
  buildLiveCalculatorState,
} from "../../lib/calculator/engine";

describe("calculator engine", () => {
  it("falls back to a seasonal estimate with a month-specific notice and moderate affiliate tier", () => {
    const glencoe = getLocationPageBySlug("glencoe-midges");

    expect(glencoe).toBeDefined();

    const result = buildFallbackCalculatorState({
      location: glencoe!,
      currentDate: new Date("2026-06-18T18:00:00+01:00"),
    });

    expect(result.mode).toBe("fallback");
    expect(result.band).toBe("High");
    expect(result.notice).toBe(
      "Live data unavailable — showing seasonal estimate for June",
    );
    expect(result.showNumericScore).toBe(false);
    expect(result.affiliateTier).toBe("moderate");
  });

  it("suppresses the score to Low when wind speeds are at or above 12 mph", () => {
    const glencoe = getLocationPageBySlug("glencoe-midges");

    expect(glencoe).toBeDefined();

    const result = buildLiveCalculatorState({
      location: glencoe!,
      currentDate: new Date("2026-06-18T14:00:00+01:00"),
      snapshot: {
        windMph: 12.4,
        humidity: 92,
        temperatureC: 15,
        targetTimeIso: "2026-06-18T14:00:00+01:00",
        sunriseIso: "2026-06-18T04:30:00+01:00",
        sunsetIso: "2026-06-18T22:10:00+01:00",
      },
    });

    expect(result.mode).toBe("live");
    expect(result.band).toBe("Low");
    expect(result.peakTimeMessage).toBeUndefined();
  });

  it("adds the golden-hour warning text and score modifier near sunset", () => {
    const glencoe = getLocationPageBySlug("glencoe-midges");

    expect(glencoe).toBeDefined();

    const result = buildLiveCalculatorState({
      location: glencoe!,
      currentDate: new Date("2026-06-18T21:40:00+01:00"),
      snapshot: {
        windMph: 4.5,
        humidity: 85,
        temperatureC: 16,
        targetTimeIso: "2026-06-18T21:40:00+01:00",
        sunriseIso: "2026-06-18T04:30:00+01:00",
        sunsetIso: "2026-06-18T22:10:00+01:00",
      },
    });

    expect(result.peakTimeMessage).toBe(
      "Peak midge time: Dusk approaching",
    );
    expect(result.band).toBe("High");
    expect(result.showNumericScore).toBe(false);
  });
});
