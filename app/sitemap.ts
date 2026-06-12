import type { MetadataRoute } from "next";

import { getLocationPageSlugs } from "../lib/seo/location-pages";
import { FORECAST_LOCATIONS } from "../lib/forecast/locations";

const BASE_URL = "https://www.biteforecast.scot";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/how-we-calculate",
    "/how-the-index-works",
    "/midge-hotspots",
    "/midge-repellents",
    "/smidge-vs-avon-skin-so-soft",
    "/about-scottish-midges",
    "/midge-season-scotland",
    "/how-to-avoid-midges-scotland",
    "/contact",
    "/midge-wind-watch",
    "/privacy-policy",
    "/affiliate-disclosure",
    "/terms",
  ];
  const locationRoutes = getLocationPageSlugs().map((slug) => `/scotland/${slug}`);
  const forecastRoutes = FORECAST_LOCATIONS.map((location) => `/forecast/${location.slug}`);

  return [...staticRoutes, ...locationRoutes, ...forecastRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));
}
