import { BANDS } from "../../lib/scoring/bands";

import type { SeasonalBandByMonth } from "./types";

export const STANDARD_SEASONAL_BANDS: SeasonalBandByMonth = {
  1: BANDS.low,
  2: BANDS.low,
  3: BANDS.low,
  4: BANDS.guarded,
  5: BANDS.moderate,
  6: BANDS.high,
  7: BANDS.high,
  8: BANDS.moderate,
  9: BANDS.guarded,
  10: BANDS.low,
  11: BANDS.low,
  12: BANDS.low,
};
