import { describe, expect, it } from "vitest";

import { buildSevenDayForecast } from "../../lib/calculator/forecast";
import { getLocationPageBySlug } from "../../lib/seo/location-pages";

describe("forecast calendar", () => {
  it("builds ordered forecast entries with day labels and risk bands", () => {
    const glencoe = getLocationPageBySlug("glencoe-midges");

    expect(glencoe).toBeDefined();

    const forecast = buildSevenDayForecast({
      location: glencoe!,
      currentDate: new Date("2026-06-18T12:00:00+01:00"),
      snapshots: [
        {
          dateIso: "2026-06-18",
          targetTimeIso: "2026-06-18T12:00:00+01:00",
          sunriseIso: "2026-06-18T04:30:00+01:00",
          sunsetIso: "2026-06-18T22:10:00+01:00",
          windMph: 12.4,
          humidity: 92,
          temperatureC: 15,
        },
        {
          dateIso: "2026-06-19",
          targetTimeIso: "2026-06-19T21:40:00+01:00",
          sunriseIso: "2026-06-19T04:30:00+01:00",
          sunsetIso: "2026-06-19T22:11:00+01:00",
          windMph: 4.5,
          humidity: 85,
          temperatureC: 16,
        },
      ],
    });

    expect(forecast).toHaveLength(2);
    expect(forecast.map((day) => day.dateIso)).toEqual(["2026-06-18", "2026-06-19"]);
    expect(forecast[0].band).toBe("Low");
    expect(forecast[0].peakTimeMessage).toBeUndefined();
    expect(forecast[1].band).toBe("High");
    expect(forecast[1].peakTimeMessage).toBe("Peak midge time: Dusk approaching");
    expect(forecast[0].label.length).toBeGreaterThan(0);
    expect(forecast[1].label.length).toBeGreaterThan(0);
  });
});
