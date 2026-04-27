import type { MetadataRoute } from "next";

import { getLocationPageSlugs } from "../lib/seo/location-pages";

const BASE_URL = "https://www.biteforecast.scot";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/how-we-calculate",
    "/midge-hotspots",
    "/midge-repellents",
    "/contact",
    "/midge-wind-watch",
    "/privacy-policy",
    "/terms",
  ];
  const locationRoutes = getLocationPageSlugs().map((slug) => `/scotland/${slug}`);

  return [...staticRoutes, ...locationRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));
}
