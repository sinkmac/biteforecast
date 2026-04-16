import { describe, expect, it } from "vitest";

import {
  getLocationPageBySlug,
  getLocationPageSlugs,
} from "../../lib/seo/location-pages";

describe("location page registry", () => {
  it("exposes the first three benchmark slugs in the normalized /scotland hierarchy", () => {
    expect(getLocationPageSlugs()).toEqual(
      expect.arrayContaining([
        "glencoe-midges",
        "skye-midges",
        "fort-william-midges",
      ]),
    );
  });

  it("returns the Glencoe content record for the benchmark page", () => {
    const page = getLocationPageBySlug("glencoe-midges");

    expect(page).toBeDefined();
    expect(page?.name).toBe("Glencoe");
    expect(page?.slug).toBe("glencoe-midges");
    expect(page?.planningRiskBand).toBe("Moderate");
    expect(page?.liveCalculatorHref).toBe("/midge-wind-watch/?location=Glencoe");
  });

  it("returns the Skye and Fort William records with moderate planning-band defaults", () => {
    const skye = getLocationPageBySlug("skye-midges");
    const fortWilliam = getLocationPageBySlug("fort-william-midges");

    expect(skye).toBeDefined();
    expect(skye?.name).toBe("Isle of Skye");
    expect(skye?.planningRiskBand).toBe("Moderate");
    expect(skye?.liveCalculatorHref).toBe("/midge-wind-watch/?location=Isle%20of%20Skye");

    expect(fortWilliam).toBeDefined();
    expect(fortWilliam?.name).toBe("Fort William");
    expect(fortWilliam?.planningRiskBand).toBe("Moderate");
    expect(fortWilliam?.liveCalculatorHref).toBe("/midge-wind-watch/?location=Fort%20William");
  });
});
