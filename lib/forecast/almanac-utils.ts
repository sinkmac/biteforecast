import { getRiskLabel } from "./risk-bands";

/**
 * Generate plain-English advice for the location detail page
 * Based on current score, time of day, and location character.
 */

export function getPlainEnglishAdvice(
  score: number,
  currentTime: Date,
  locationName: string,
): string {
  const hour = currentTime.getHours();
  const label = getRiskLabel(score);
  const band = label === "Low" ? "low" : label === "Moderate" ? "moderate" : "high";

  // Dusk window: ~19:00–22:00 in Scottish summer
  const isDuskWindow = hour >= 18 && hour < 22;
  const isNight = hour >= 22 || hour < 4;
  const isAfternoon = hour >= 12 && hour < 18;

  if (band === "low") {
    if (isDuskWindow) return "Should be fine through the evening — low risk even at dusk. Enjoy the late light.";
    if (isNight) return "Quiet night ahead. Low risk — no need to worry about the cloud.";
    return "Low risk right now. A pleasant time to be out and about.";
  }

  if (band === "moderate") {
    if (isDuskWindow) return `Fine for now — but ${locationName} turns busier around dusk. If you're staying out, have repellent to hand.`;
    if (isNight) return "Moderate through the night. Not the worst, but damp spots will still have activity.";
    if (isAfternoon) return `Moderate risk — worth checking again before evening. ${locationName} can shift fast when the air stills.`;
    return `Moderate right now. ${locationName} can catch you out in still, sheltered spots — don't let the sun fool you.`;
  }

  // High
  if (isDuskWindow) return `The glen is busy right now. If you're camping, pitch early, eat early, and have the repellent within reach through dusk.`;
  if (isNight) return `Active through the night. Shelters, loch edges and damp grass will keep the cloud busy until dawn.`;
  if (isAfternoon) return `Already elevated this afternoon. ${locationName} is primed — expect it to rise further toward dusk.`;
  return `High risk — ${locationName} is fully active. Reconsider exposed activities until the wind picks up or the temperature drops.`;
}

/**
 * Haversine distance between two lat/lng points in km.
 */
function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export type NearbyPoint = {
  name: string;
  slug: string;
  score: number;
  color: string;
};

/**
 * Get nearby forecast points sorted by distance from the given location.
 */
export function getNearbyPoints(
  currentSlug: string,
  currentLat: number,
  currentLng: number,
  allLocations: Array<{ name: string; slug: string; lat: number; lng: number }>,
  getScoreForSlug: (slug: string) => number,
  getColorForScore: (score: number) => string,
  limit = 4
): NearbyPoint[] {
  return allLocations
    .filter((loc) => loc.slug !== currentSlug)
    .map((loc) => ({
      name: loc.name,
      slug: loc.slug,
      score: getScoreForSlug(loc.slug),
      color: getColorForScore(getScoreForSlug(loc.slug)),
      distance: haversineKm(currentLat, currentLng, loc.lat, loc.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ distance: _d, ...rest }) => rest);
}