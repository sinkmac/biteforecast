import { describe, expect, it } from "vitest";

import { calculateMidgeIndex } from "../../lib/forecast/midge-index";

describe("calculateMidgeIndex", () => {
  it("scores a cold still humid evening as high enough to warn visitors", () => {
    const index = calculateMidgeIndex({
      temperatureC: 6,
      windMph: 1,
      humidity: 90,
      month: 6,
      time: new Date("2026-06-18T21:30:00+01:00"),
      dawn: new Date("2026-06-18T04:30:00+01:00"),
      dusk: new Date("2026-06-18T22:00:00+01:00"),
      uvIndex: 0,
    });

    expect(index).toBe(6);
  });

  it("scores a hot sunny afternoon as low", () => {
    const index = calculateMidgeIndex({
      temperatureC: 27,
      windMph: 2,
      humidity: 55,
      month: 7,
      time: new Date("2026-07-18T14:00:00+01:00"),
      dawn: new Date("2026-07-18T04:45:00+01:00"),
      dusk: new Date("2026-07-18T21:50:00+01:00"),
      uvIndex: 6,
    });

    expect(index).toBe(1);
  });

  it("scores a windy day low regardless of good temperature and humidity", () => {
    const index = calculateMidgeIndex({
      temperatureC: 16,
      windMph: 14,
      humidity: 92,
      month: 8,
      time: new Date("2026-08-18T20:30:00+01:00"),
      dawn: new Date("2026-08-18T05:30:00+01:00"),
      dusk: new Date("2026-08-18T20:50:00+01:00"),
      uvIndex: 0,
    });

    expect(index).toBe(1);
  });

  it("returns zero in winter months", () => {
    const index = calculateMidgeIndex({
      temperatureC: 16,
      windMph: 1,
      humidity: 92,
      month: 12,
      time: new Date("2026-12-18T15:30:00Z"),
      dawn: new Date("2026-12-18T08:30:00Z"),
      dusk: new Date("2026-12-18T15:45:00Z"),
      uvIndex: 0,
    });

    expect(index).toBe(0);
  });
});
