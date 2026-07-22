import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { FORECAST_LOCATIONS } from "../../../lib/forecast/locations";
import { getMidgeForecastForLocation } from "../../../lib/forecast/service";

export async function POST() {
  // Step 1: Pre-fetch ALL forecast data to warm the shared in-memory cache.
  // This is the key fix: every route revalidated below reads from the
  // same data snapshot instead of independently timing Open-Meteo calls.
  await Promise.allSettled(
    FORECAST_LOCATIONS.map((loc) => getMidgeForecastForLocation(loc)),
  );

  // Step 2: Revalidate all paths. Since the cache is now warm, each
  // background re-render picks the same data.
  const paths = FORECAST_LOCATIONS.map((loc) => `/forecast/${loc.slug}`);

  for (const path of paths) {
    revalidatePath(path);
  }
  revalidatePath("/");

  // Step 3: Warm-up fetch to each path to trigger the background re-render
  // NOW rather than lazily on the next visitor. This way all pages get
  // regenerated in sequence during the cron run using the same warm cache.
  const siteUrl =
    process.env.SITE_URL ||
    process.env.DEPLOY_PRIME_URL ||
    "https://biteforecast.scot";

  await Promise.allSettled(
    paths.map((p) =>
      fetch(`${siteUrl}${p}`, { cache: "no-store" }).catch(() => {}),
    ),
  );
  // Also warm the homepage
  await fetch(siteUrl, { cache: "no-store" }).catch(() => {});

  return NextResponse.json({
    revalidated: true,
    paths: paths.length + 1,
  });
}