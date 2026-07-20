# Remaining light-text-on-light-background audit

## Rule
Any `text-stone-50/100/200/300`, `text-white`, or `text-rose-100/200` on a
background of `bg-almanac-card` (#fcfaf4), `bg-almanac-bg` (#f7f4ec),
or any light/non-dark surface is invisible. Same classes on explicit dark
backgrounds (bg-stone-900/950, bg-amber-500/10, bg-almanac-ink) are correct.

---

## GROUP A — CORRECT (on dark backgrounds)

Every occurrence in these files is inside an explicit dark container and
should NOT be changed:

| File | Text color(s) | Background | Verdict |
|---|---|---|---|
| `components/affiliate-kit.tsx` | text-stone-100, text-stone-200 | bg-stone-950/70, bg-amber-500/10 | CORRECT (dark bg) |
| `components/biteforecast-home-tool.tsx` | text-stone-50, text-stone-100, text-stone-200, text-stone-300, text-white | bg-stone-950 | CORRECT (dark bg) |
| `components/faq-block.tsx` | text-stone-100, text-stone-300 | bg-stone-900 | CORRECT (dark bg) |
| `components/forecast-calendar.tsx` | text-stone-50, text-stone-300, text-rose-200 | bg-stone-900, bg-stone-950/80 | CORRECT (dark bg) |
| `components/grieve-overlay.tsx` | text-stone-500 | bg-stone-900/80 | CORRECT (dark bg) |
| `lib/guide/markdown.ts` | text-stone-100, text-stone-300, text-stone-50 | bg-stone-900 | CORRECT (dark bg — template strings in guide pages) |
| `lib/seo/site-metadata.ts` | text-rose-200 | — | JUST a color constant definition |

## GROUP B — BUG (light text on paper/card background)

### File: app/how-to-avoid-midges-scotland/page.tsx
| Line | Class | Context |
|---|---|---|
| 64,67,70,80,101,111,114,123,133,136,139,142,150,153,156,164,167,170,173,176 | `text-stone-100` (20 strong elements) | Inside sections with `bg-almanac-card` — INVISIBLE |
| 198 | `text-stone-100/90` | Final summary paragraph in `bg-almanac-card` section — BARELY VISIBLE |

### File: app/about-scottish-midges/page.tsx
| Line | Class | Context |
|---|---|---|
| 92,95,98,101 | `text-stone-100` (strong labels) | Inside `bg-almanac-card` section — INVISIBLE |
| 153 | `text-stone-100/90` | Bottom paragraph — BARELY VISIBLE |

### File: app/midge-season-scotland/page.tsx
| Line | Class | Context |
|---|---|---|
| 127,130,133,136,139,146,149,152,161,164,167,170 | `text-stone-100` (12 strong labels) | Inside `bg-almanac-card` sections — INVISIBLE |
| 180 | `text-stone-100/90` | Bottom paragraph — BARELY VISIBLE |

### File: app/how-we-calculate/page.tsx
| Line | Class | Context |
|---|---|---|
| 128 | `text-stone-100` | Table cell score — INVISIBLE |
| 129 | `text-stone-200` | Table cell label — INVISIBLE |
| 152 | `text-stone-100/90` | Bottom section body — BARELY VISIBLE |

### File: app/midge-hotspots/page.tsx
| Line | Class | Context |
|---|---|---|
| 140 | `text-stone-100` | Location name in card — INVISIBLE |
| 149 | `text-stone-100/90` | Bottom paragraph — BARELY VISIBLE |

### File: app/scotland/[slug]/page.tsx
| Line | Class | Context |
|---|---|---|
| 113 | `text-stone-100` | Band advice text — INVISIBLE |
| 140 | `text-stone-100/90` | Bottom section body — BARELY VISIBLE |
| 166,177,181,185,189 | `text-stone-100` (5 items) | Pattern labels and section headers — INVISIBLE |
| 248 | `text-stone-100/90` | Bottom paragraph — BARELY VISIBLE |

### File: app/smidge-vs-avon-skin-so-soft/page.tsx
| Line | Class | Context |
|---|---|---|
| 96 | `text-stone-100` | Table cell factor label — INVISIBLE |
| 124,126,132 | `text-stone-100` (strong elements) | Verdict paragraph emphasis — INVISIBLE |
| 137 | `text-stone-100/90` | Bottom paragraph — BARELY VISIBLE |

### File: app/midge-repellents/page.tsx
| Line | Class | Context |
|---|---|---|
| 117 | `text-stone-100/90` | Bottom section — BARELY VISIBLE |

### File: app/privacy-policy/page.tsx
| Line | Class | Context |
|---|---|---|
| 171 | `text-stone-100/90` | Bottom section — BARELY VISIBLE |

### File: app/terms/page.tsx
| Line | Class | Context |
|---|---|---|
| 55, 169 | `text-stone-100/90` | Body sections — BARELY VISIBLE |

### File: app/midge-wind-watch/page.tsx
| Line | Class | Context |
|---|---|---|
| 182 | `text-rose-100` | Overnight Watch peak time message inside `bg-rose-500/10` — INVISIBLE |

### File: app/guide/[slug]/page.tsx
| Line | Class | Context |
|---|---|---|
| 84 | `text-stone-200` | Guide article intro paragraph — INVISIBLE |

---

## Summary

| Severity | Count | Fix |
|---|---|---|
| INVISIBLE (text-stone-100 on almanac-card) | ~50+ elements across 8 files | Replace with `text-almanac-ink` or `text-almanac-secondary` |
| BARELY VISIBLE (text-stone-100/90 on almanac-card) | ~10 paragraphs across 9 files | Replace with `text-almanac-secondary` |
| INVISIBLE (text-stone-200 on almanac-card) | 2 elements in how-we-calculate + guide | Replace with `text-almanac-secondary` |
| INVISIBLE (text-rose-100 on rose tint) | 1 element in midge-wind-watch | Replace with `text-almanac-secondary` |

~60+ elements total. The pattern is consistent: these are all pages that got the almanac-card background via the bulk-conversion sed but the near-white text classes (100, 200, rose-100) were not caught because that earlier pass only converted `text-stone-300/400/500`.

Ready for your review — then I'll apply the fix across all flagged files in one batch.