import type { LocationPage } from "../../content/locations/types";
import {
  buildLiveCalculatorState,
  type LiveWeatherSnapshot,
} from "./engine";

export type ForecastWeatherSnapshot = LiveWeatherSnapshot & {
  dateIso: string;
};

export type ForecastCalendarDay = {
  dateIso: string;
  label: string;
  band: ReturnType<typeof buildLiveCalculatorState>["band"];
  advice: string;
  peakTimeMessage?: string;
};

const DAY_LABEL_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Europe/London",
});

export function buildSevenDayForecast(args: {
  location: LocationPage;
  currentDate: Date;
  snapshots: ForecastWeatherSnapshot[];
}): ForecastCalendarDay[] {
  const { location, currentDate, snapshots } = args;

  return snapshots.map((snapshot) => {
    const state = buildLiveCalculatorState({
      location,
      currentDate,
      snapshot,
    });

    return {
      dateIso: snapshot.dateIso,
      label: DAY_LABEL_FORMATTER.format(new Date(snapshot.dateIso)),
      band: state.band,
      advice: state.advice,
      peakTimeMessage: state.peakTimeMessage,
    };
  });
}
