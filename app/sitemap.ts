import type { MetadataRoute } from "next";

import { getLocationPageSlugs } from "../lib/seo/location-pages";

const BASE_URL = "https://www.biteforecast.scot";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/midge-wind-watch"];
  const locationRoutes = getLocationPageSlugs().map((slug) => `/scotland/${slug}`);

  return [...staticRoutes, ...locationRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));
}
