import { describe, expect, it } from "vitest";

import {
  getLocationPageBySlug,
  getLocationPageSlugs,
} from "../../lib/seo/location-pages";

describe("location page registry", () => {
  it("exposes the Glencoe benchmark slug in the normalized /scotland hierarchy", () => {
    expect(getLocationPageSlugs()).toContain("glencoe-midges");
  });

  it("returns the Glencoe content record for the benchmark page", () => {
    const page = getLocationPageBySlug("glencoe-midges");

    expect(page).toBeDefined();
    expect(page?.name).toBe("Glencoe");
    expect(page?.slug).toBe("glencoe-midges");
    expect(page?.planningRiskBand).toBe("Moderate");
    expect(page?.liveCalculatorHref).toBe("/midge-wind-watch/?location=Glencoe");
  });
});
