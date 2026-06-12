import { describe, expect, it } from "vitest";

import { FORECAST_LOCATIONS } from "../../lib/forecast/locations";
import { LOCATION_META_DESCRIPTIONS, OPERATIONAL_FACTS, buildForecastPageTitle } from "../../lib/seo/site-metadata";

describe("site-wide operational facts", () => {
  it("uses one canonical update cadence and horizon", () => {
    expect(OPERATIONAL_FACTS.updateCadenceLabel).toBe("every 3 hours");
    expect(OPERATIONAL_FACTS.forecastHorizonDays).toBe(5);
    expect(OPERATIONAL_FACTS.forecastHorizonLabel).toBe("5-day");
  });

  it("does not duplicate the brand in forecast titles", () => {
    expect(buildForecastPageTitle("Glencoe")).toBe("Glencoe Midge Forecast Today");
    expect(buildForecastPageTitle("Glencoe")).not.toMatch(/BiteForecast/);
  });

  it("keeps location metadata aligned with the 5-day horizon", () => {
    for (const description of Object.values(LOCATION_META_DESCRIPTIONS)) {
      expect(description).not.toMatch(/7-day/i);
    }
  });
});

describe("homepage location inventory", () => {
  it("offers the same location count to the grid and checker", () => {
    expect(FORECAST_LOCATIONS.length).toBeGreaterThan(8);
    expect(FORECAST_LOCATIONS.map((location) => location.slug)).toContain("torridon");
  });
});
