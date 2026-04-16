import { fortWilliamLocationPage } from "../../content/locations/fort-william";
import { glencoeLocationPage } from "../../content/locations/glencoe";
import { skyeLocationPage } from "../../content/locations/skye";
import type { LocationPage } from "../../content/locations/types";

const LOCATION_PAGES: LocationPage[] = [
  glencoeLocationPage,
  skyeLocationPage,
  fortWilliamLocationPage,
];

export function getLocationPageSlugs(): string[] {
  return LOCATION_PAGES.map((page) => page.slug);
}

export function getLocationPageBySlug(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((page) => page.slug === slug);
}
