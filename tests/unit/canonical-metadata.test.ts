import { describe, expect, it } from "vitest";

import {
  SITE_URL,
  buildCanonicalUrl,
  buildMetadataAlternates,
} from "../../lib/seo/site-metadata";

describe("canonical metadata helpers", () => {
  it("builds the homepage canonical URL without a trailing slash", () => {
    expect(buildCanonicalUrl("/")).toBe(SITE_URL);
  });

  it("builds stable canonical URLs for fixed routes", () => {
    expect(buildCanonicalUrl("/midge-wind-watch")).toBe(
      "https://www.biteforecast.scot/midge-wind-watch",
    );
    expect(buildCanonicalUrl("/privacy-policy")).toBe(
      "https://www.biteforecast.scot/privacy-policy",
    );
    expect(buildCanonicalUrl("/terms")).toBe(
      "https://www.biteforecast.scot/terms",
    );
  });

  it("builds stable canonical URLs for dynamic location pages", () => {
    expect(buildCanonicalUrl("/scotland/glencoe-midges")).toBe(
      "https://www.biteforecast.scot/scotland/glencoe-midges",
    );
  });

  it("returns Next metadata alternates using the canonical URL", () => {
    expect(buildMetadataAlternates("/midge-wind-watch")).toEqual({
      canonical: "https://www.biteforecast.scot/midge-wind-watch",
    });
  });
});
