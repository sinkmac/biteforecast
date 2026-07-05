# BiteForecast — Golf Course Intelligence Extension (B2B)
## Status: Pre-validation artifact (not a build brief)
## Date: 4 July 2026
## Author: Seeker pipeline + human lateral connection

---

## 0. DEPENDENCIES (pre-build gates)

The following gates must clear before this document becomes an executable build brief:

- [ ] `BAMPOT_VOICE_CARD.md` committed to `docs/canon/`
- [ ] Grieve two-register structure live on consumer homepage
- [ ] Hooligan fully purged from all live files
- [ ] BD outreach completed (3-5 Highland/West Coast golf courses contacted, interest gauged, willingness to pay confirmed)

Do not begin Phase 1 build until all four gates are cleared. This document is a pre-validation artifact — the concept is well-structured but the execution dependencies are not yet met.

---

## Origin

This came out of Seeker (the AI Scotland Productions signal-scouting pipeline), not a manual brainstorm. A real Reddit thread surfaced a golf course operator complaining about labor costs — approximately £80k/year for course maintenance staff — with the underlying tension being that outdoor venues absorb real operational cost from things they can't predict or control well. Cross-referencing that against BiteForecast's existing domain (midge activity forecasting) produced the lateral connection: **Scottish golf courses, especially Highland and West Coast courses near water, woodland, or damp rough, have well-documented midge problems** that affect play, staff comfort, and visitor experience, particularly on summer evenings.

BiteForecast currently serves individual consumers checking midge risk for personal outdoor plans. This brief extends that same forecasting engine to serve **golf courses as B2B customers** — a different buyer with a real budget line (course management, greenkeeping, visitor experience), not just a different UI skin.

---

## Context: current BiteForecast architecture (do not rebuild, extend)

- **Midge Activity Index (MAI)** — the core forecast metric, already live, already trusted.
- **Voice system: Air Vice-Marshal Grieve, GOC "The Cloud," codename THE BAMPOT.** All site content is framed as intercepted enemy communiqués — pompous, self-important, easily wounded by small human victories. Bureaucratic fury, not exclamation marks. **This voice card is canon — reference `BAMPOT_VOICE_CARD.md` directly, do not improvise Grieve's tone from this brief alone.**
- **Five MAI operational states (locked, do not rename):**
  1. WITHDRAWN TO THE POOLS
  2. PROBING ATTACKS
  3. ATTACK. ATTACK. ATTACK.
  4. ALL PERSONNEL RECALLED FROM LEAVE
  5. TOTAL WAR — NO PRISONERS
- **Two-register rule:** Grieve's voice sits *over* clean, usable data underneath — the entertainment layer never obscures the actual forecast number a person needs. This applies doubly here: a golf course manager needs a fast, legible number, not a joke they have to decode under time pressure.
- Amazon Associates tag: `biteforecast2-21`. AdSense: `ca-pub-2335335210412692`. Awin publisher ID: `2860477`. GitHub: `sinkmac/biteforecast`.

---

## The B2B problem this solves

A golf course (or campsite, outdoor wedding venue, tourism operator) currently has no predictive tool for midge activity beyond staff checking BiteForecast's consumer site manually, if they know it exists at all. The operational cost isn't midges themselves — it's the *decisions* around them: whether to warn golfers at check-in, whether to move tee times, whether to spray, whether to stock repellent at the pro shop, whether a bad midge evening becomes a bad TripAdvisor review. That's a genuine, budget-attached pain point distinct from BiteForecast's existing consumer use case.

---

## What needs to be built

### 1. New route: `/for-courses` (or `/venues` — see naming note below)

A dedicated landing page targeting golf course managers, campsite operators, and outdoor venue operators as a distinct audience from BiteForecast's existing consumer visitor. This is **not** a rebrand of the homepage — it's a new entry point.

Content required (Grieve's voice, per voice card, with the two-register rule applied — mockery on top, real value underneath):
- Headline framing the B2B pain point (course/venue operational disruption from midge activity)
- Explanation of what a location-specific MAI subscription gives them that the free consumer tool doesn't (see feature list below)
- Simple pricing tier structure (see Phase 2)
- A clear CTA to sign up / request access

### 2. Location-specific alert subscription (new feature, core of this build)

Unlike the consumer tool (person checks once, for one day, for one location), venues need:
- A **saved location** tied to their course/venue coordinates (not searched fresh each time)
- A **daily or twice-daily automated alert** (email, or dashboard refresh) showing that day's MAI for their exact location
- A **threshold trigger** — e.g. "alert me specifically when MAI crosses into ATTACK. ATTACK. ATTACK. or higher" — so a busy course manager doesn't have to check manually, only gets pinged when it matters operationally

### 3. Simple operator dashboard

A lightweight, password-or-magic-link-protected page (not full account infrastructure — keep this cheap to build) showing:
- Current MAI for their saved location, large and legible
- 3-5 day forward forecast if the underlying data supports it (check with existing forecast engine's actual forecast horizon before committing to this — don't promise more days than the Met Office DataPoint integration actually provides)
- A simple historical log — "last 7 days" — so an operator can retroactively point to it if a customer complains ("see, we were at TOTAL WAR that evening, we did warn people")

### 4. Pricing structure (draft — confirm with Sink before implementing payment logic)

Suggest a simple flat-rate model rather than usage-based:
- Single course/venue: modest flat monthly fee
- Multi-site operators (e.g. a hospitality group with several venues): tiered by location count

**Do not build actual payment processing in this phase.** Phase 1 is: landing page, subscription signup (email capture + location), automated alert delivery, dashboard. Payment integration is Phase 2, once there's evidence of real demand (a handful of genuine sign-ups or expressed interest).

---

## Phased build order

**Phase 1 — Landing page + lead capture**
- Build `/for-courses` route with Grieve-voiced copy (draft copy to be provided separately, or Hermes may draft against the voice card if instructed — confirm which with Sink before starting)
- Email + location capture form, storing to a simple database table (reuse existing infrastructure, don't stand up new backend services)
- No dashboard yet — just prove the landing page converts signups

**Phase 2 — Automated alerts**
- Daily/twice-daily email job using existing MAI calculation for each saved location
- Threshold-trigger logic (configurable per subscriber, sensible default provided)

**Phase 3 — Dashboard**
- Simple authenticated view (magic link, not full account system) showing current MAI, forward forecast, 7-day history for the subscriber's location

**Phase 4 — Payment (only after Phase 1-3 show real signups)**
- Flat-rate billing via Stripe or similar, gated behind actual demonstrated demand

---

## Naming note — needs Sink's decision before Phase 1 copy is finalized

`/for-courses` risks being too narrow if this expands to campsites and wedding venues later (which the original Seeker/midge connection suggests it should). Consider `/for-venues` or `/for-operators` as a more durable route name from the start, even if golf courses are the only outreach target initially. **Flag this back to Sink rather than deciding unilaterally — naming affects SEO and outreach copy.**

---

## QA checklist (filesystem-evidenced, not narrative)

- [ ] `/for-courses` (or agreed alternative) route live, SSR confirmed via raw HTML fetch of the deployed URL
- [ ] Grieve's voice in landing copy matches `BAMPOT_VOICE_CARD.md` — do not improvise tone independently
- [ ] Email + location capture form submits successfully, confirmed via a real test submission checked in the database, not just "form renders"
- [ ] MAI calculation for a saved location matches the equivalent consumer-site lookup for the same coordinates, on the same day — confirm the two engines return identical numbers before trusting the alert system
- [ ] No payment processing code exists in this phase — confirm by checking there are no Stripe/payment dependencies added
- [ ] Sitemap updated to include the new route

---

## Explicitly out of scope for this brief

- Payment processing (Phase 4, later)
- Full multi-tenant account system — use magic links, not full auth, to keep this cheap
- Campsite/wedding-venue-specific copy — this brief is golf-course-first; broaden later once the naming decision is made
- Any changes to the existing consumer-facing BiteForecast site or its voice/copy

---

## One more thing worth Sink's attention, not Hermes's

This brief exists because Seeker (the signal-scouting pipeline) surfaced a real complaint and a human made the lateral leap to golf-course midges — the pipeline itself didn't know BiteForecast existed. That's worth remembering as you read outreach data later: the first real test of this B2B line is contacting a small number of actual golf courses (Highland/West Coast, near water or woodland) directly to gauge interest, before investing further build time in Phase 2-4. Worth doing that outreach in parallel with Phase 1, not after.