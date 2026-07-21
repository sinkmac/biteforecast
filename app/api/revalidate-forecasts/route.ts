import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { FORECAST_LOCATIONS } from "../../../lib/forecast/locations";

export async function POST() {
  const paths = FORECAST_LOCATIONS.map((loc) => `/forecast/${loc.slug}`);

  for (const path of paths) {
    revalidatePath(path);
  }
  revalidatePath("/");

  return NextResponse.json({
    revalidated: true,
    paths: paths.length + 1,
  });
}