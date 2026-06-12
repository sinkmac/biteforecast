# BiteForecast midge index model

Status: implemented for the June 2026 plausibility fix. Values are documented here so they can be reviewed against live-season observations.

## Why this pass exists

A live Glencoe page showed an overnight headline peak around 1am. That was not plausible enough for a public planning number: still and humid overnight conditions were able to outrank dusk because the model treated time of day too weakly.

The fix adds an explicit biological time-of-day curve and a stronger overnight/temperature/wind suppression layer.

## Inputs used

BiteForecast is weather-proxy only. It uses:

- temperature
- wind speed
- relative humidity
- time of day versus sunrise/sunset
- UV/sunlight proxy where available
- season/month

It does not use:

- trap counts
- on-the-ground midge counts
- live biting reports
- campsite-specific sensor readings

## Implemented operational constants

| Model rule | Value | Rationale / source context |
|---|---:|---|
| Winter months | November–March return 0 | Highland midge activity is seasonal, with meaningful visitor nuisance concentrated in warmer months. |
| Temperature floor | Below 7°C returns 0 | Conservative suppression for cold nights so still humid conditions do not create false overnight peaks. Scottish midge literature and forecast practice treat warmth as a necessary condition for nuisance activity. |
| Dusk window | 1 hour before to 90 minutes after sunset | Midges are crepuscular; dusk is the strongest visitor-facing nuisance window. |
| Dawn window | 1 hour either side of sunrise | Dawn can be active, but is weighted slightly below dusk for visitor recommendation purposes. |
| Overnight dead zone | Strong suppression outside dusk/dawn windows, especially 00:00–03:59 | Prevents still, humid 1am weather from becoming the daily headline peak unless broader data later justifies it. |
| UV / bright midday | UV >= 4 suppresses activity | Bright/sunny midday is less plausible as a peak nuisance window than damp low-light periods. |
| Wind suppression | 8–12 mph progressively suppresses; 12+ mph strongly suppresses | Moving air is treated as the strongest practical suppressor; this matches established Scottish midge forecast guidance and field advice. |

## Sources / reference points

- APS Biocontrol / Smidge, Scottish Midge Forecast: https://www.smidgeup.com/midge-forecast/
- APS Biocontrol / Smidge, Midge Facts: https://www.smidgeup.com/beasties/midges/midge-facts/
- Scottish biting midge literature around Culicoides impunctatus, including work by A. Blackwell and collaborators. The model constants should be rechecked against primary papers before treating the exact numeric cutoffs as final scientific claims.
- Open-Meteo weather API: https://open-meteo.com/

## Plausibility tests now enforced

`tests/unit/midge-index.test.ts` checks:

- cold clear/still/humid night is low regardless of humidity
- warm still humid dusk outranks the overnight dead zone
- hot sunny afternoon stays low
- sustained strong wind suppresses otherwise favourable conditions
- winter months return zero

`tests/unit/site-consistency.test.ts` checks:

- one update cadence: every 3 hours
- one forecast horizon: 5-day
- forecast page title helper does not duplicate the brand
- location metadata no longer advertises a 7-day horizon

## Spatial volatility note

The live anomaly noted in the brief — Drumnadrochit at 9/10 while neighbours sat at 2–4 — is more likely to be a model artefact than a reliable microclimate claim unless supported by local observations. The new wind/time/temperature suppressors reduce single-hour spikes driven only by humidity and stillness.

Short-distance variation can still be real in sheltered, damp terrain. The site now states clearly that BiteForecast is weather-proxy only and does not use trap or ground-count data.

## Follow-up review

After a week of live-season observations, inspect the worst overnight peaks across all locations. If overnight peaks still appear, they should be reviewed against actual temperature, wind, sunrise/sunset and local shelter before further tuning.