import { describe, expect, it } from "vitest";

import {
  BANDS,
  getBandAdvice,
  getBandForScore,
  normalizeScore,
} from "../../lib/scoring/bands";

describe("normalizeScore", () => {
  it("clamps values into the 0 to 100 range", () => {
    expect(normalizeScore(-5)).toBe(0);
    expect(normalizeScore(42)).toBe(42);
    expect(normalizeScore(120)).toBe(100);
  });
});

describe("getBandForScore", () => {
  it("maps locked MVP boundaries to the correct public bands", () => {
    expect(getBandForScore(0)).toBe(BANDS.low);
    expect(getBandForScore(19)).toBe(BANDS.low);
    expect(getBandForScore(20)).toBe(BANDS.guarded);
    expect(getBandForScore(39)).toBe(BANDS.guarded);
    expect(getBandForScore(40)).toBe(BANDS.moderate);
    expect(getBandForScore(64)).toBe(BANDS.moderate);
    expect(getBandForScore(65)).toBe(BANDS.high);
    expect(getBandForScore(84)).toBe(BANDS.high);
    expect(getBandForScore(85)).toBe(BANDS.veryHigh);
    expect(getBandForScore(100)).toBe(BANDS.veryHigh);
  });
});

describe("getBandAdvice", () => {
  it("returns the locked supporting copy for each public band", () => {
    expect(getBandAdvice(BANDS.low)).toBe(
      "Likely manageable unless you stop in very sheltered damp spots.",
    );
    expect(getBandAdvice(BANDS.guarded)).toBe(
      "Could get annoying if the air drops still, especially later in the day.",
    );
    expect(getBandAdvice(BANDS.moderate)).toBe(
      "Expect nuisance in sheltered spots, especially toward dusk.",
    );
    expect(getBandAdvice(BANDS.high)).toBe(
      "Sheltered stops are likely to be uncomfortable without protection.",
    );
    expect(getBandAdvice(BANDS.veryHigh)).toBe(
      "Strong nuisance likely in sheltered areas — change timing, location, or kit if you can.",
    );
  });
});
