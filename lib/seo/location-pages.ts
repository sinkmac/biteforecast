import { glencoeLocationPage } from "../../content/locations/glencoe";
import type { LocationPage } from "../../content/locations/types";

const LOCATION_PAGES: LocationPage[] = [glencoeLocationPage];

export function getLocationPageSlugs(): string[] {
  return LOCATION_PAGES.map((page) => page.slug);
}

export function getLocationPageBySlug(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((page) => page.slug === slug);
}
