# BITEFORECAST_GRIEVE_BRIEF_v1.md
**Status:** Canon — build brief for Hermes
**Date:** 4 July 2026
**Author:** Claude (strategy/editorial) → Hermes (execution only)
**Lane rule:** Execution-only. Hermes builds exactly what is specified below. Anything marked ⚠️ FLAG is a decision reserved for Sink — do not resolve it, do not improvise around it, halt that item and report.

*Note: this document has been reassembled from source fragments after the original session ended before sending. Substance and locked canon below are recovered verbatim where found; a small number of connective passages are reconstructed to standard house format. Sink should skim before sending to Hermes.*

---

## 0. LOCKED CANON (do not modify)

- **Character:** Air Vice-Marshal Grieve, General Officer Commanding, "The Cloud"
- **Codename (intelligence apparatus only):** THE BAMPOT — functions as an intelligence-file codename, never as a personal signature
- **Format:** all character content framed as intercepted enemy communiqués
- **Voice:** pompous, self-important, easily wounded by small human wins, takes everything personally, resents head office
- **Data asset:** Midge Activity Index (five states) is preserved as the underlying data, reframed as Grieve's own military intelligence
- **Retirement:** Hooligan is fully retired. Not a rival faction, not a cameo, not a legacy easter egg. Replaced outright.

---

## 1. VOICE CARD — GRIEVE

### 1.1 Register
First person singular. Formal staff-officer register colliding with petty personal grievance. Every communiqué is a grievance dressed as strategy. He never acknowledges the collision.

### 1.2 Sentence pattern (the Grieve arc)
Each communiqué follows this four-beat structure. Short pieces may drop beat 3 or 4; never reorder.
1. **Formal opening** — situation report language ("Intelligence confirms…", "Command wishes it noted…", "At 0900 hours…")
2. **The grievance** — a small human win, reported as an outrage
3. **Escalation to the personal** — the moment he stops pretending it's strategic ("Laugh. At me.")
4. **Administrative threat or complaint** — a letter to head office, an inquiry opened, an apology demanded on principle

### 1.3 Hard rules (locked)
- **No exclamation marks.** Grievance is delivered in flat declaratives. His fury is bureaucratic.
- **No emoji, ever.**
- **He never calls his forces "midges."** They are personnel, formations, The Cloud, the airborne divisions.

### 1.4 Locked overlay state names (final, superseding any earlier proposed table)
| Index level | Data layer (plain, always visible) | Grieve overlay |
|---|---|---|
| 1 | Low | WITHDRAWN TO THE POOLS |
| 2 | Moderate | PROBING ATTACKS |
| 3 | High | ATTACK. ATTACK. ATTACK. |
| 4 | Severe | ALL PERSONNEL RECALLED FROM LEAVE |
| 5 | Extreme | TOTAL WAR — NO PRISONERS |

---

## 2. PAGE INVENTORY & CONVERSION PRIORITY

### 2.1 Inventory pass (Hermes, first action)
Produce a complete file listing of live pages and templates. During this pass, run:
```
grep -ril "hooligan" .
```
Every hit outside `/docs/canon/archive/` must be listed in the completion report and either converted or removed in the phase that touches that page. **No file ships still referencing Hooligan.** Also grep for the banned vocabulary list (§1.3) across live copy.

### 2.2 Default conversion priority
⚠️ FLAG — no current BiteForecast analytics available. Priority order below is a default assumption based on commodity-content exposure. Sink to confirm or reorder against actual traffic before Hermes begins.

**Convert first (Phase 1):**
- Forecast homepage / Midge Activity Index display — highest assumed traffic, highest commodity exposure, and where the two-register structure lives or dies
- Site-wide chrome: header/footer/meta descriptions carrying Hooligan voice

**Convert second (Phase 2):**
- Guide pages (repellent guides etc.) — high commodity exposure, **but these carry live affiliate wiring; see QA §5 before touching**
- Index explainer / "how the forecast works" page — reframed as a captured briefing document
- New build: Communiqué archive page (intercept file structure, chrome per §1.4)

**Leave alone this phase:**
- Privacy, affiliate disclosure, and any legal/compliance pages — plain register, no character voice, ever
- AdSense placements and configuration — untouched

### 2.3 Hooligan archive (Phase 1, day one)

**Note (4 July 2026):** No standalone `HOOLIGAN_VOICE_CARD.md` ever existed in this repo. The Hooligan character existed only as inline SVG code in `components/hooligan-state.tsx`, constants in `components/biteforecast-home-tool.tsx`, and references across ~12 source files. Archive action taken:

- `public/hooligan-character-sheet.svg` → `docs/canon/archive/hooligan-character-sheet.svg`
- `.netlify/static/hooligan-character-sheet.svg` → `docs/canon/archive/hooligan-character-sheet-netlify-static.svg`
- `components/hooligan-state.tsx` — to be replaced (not simply archived) by the Grieve-state component during Phase 1 homepage refactor

⚠️ FLAG — Hooligan has visual assets (mascot SVG, five-state graphics). SVGs have been archived. Whether anything visually replaces them — insignia, letterhead, classification stamps — is a creative decision not made here. Phase 1 can ship with typographic chrome only (file headers, stamps in text) if speed is preferred; visual identity is Phase 2 at earliest.

---

## 3. TWO-REGISTER STRUCTURE (confirmed)

- **Top register:** Grieve's voice — communiqué framing, overlay state names, intelligence chrome. Personality layer.
- **Bottom register:** the actual forecast data — index level, plain severity label, location, practical guidance. Clean, legible, scannable, unstyled by character voice.

**The test (locked):** a user in a hurry must be able to ignore Grieve entirely and still get full utility from the page. If any piece of practical information exists *only* inside a communiqué, the build has failed. Grieve is garnish on a working tool, never a gate in front of it.

Structural implication for Hermes: data layer and voice layer are separate components/blocks in the template, not interleaved prose. Voice layer can be dropped from any page without breaking the data layer.

---

## 4. PHASED BUILD ORDER

### Phase 1 — ships this week
1. Commit this brief to the repo as canon (path per portfolio convention, alongside existing voice cards)
2. Archive `HOOLIGAN_VOICE_CARD.md` per §2.3
3. Full page inventory + Hooligan/banned-vocab grep report delivered to Sink
4. Convert forecast homepage to two-register structure, with data-layer plain labels live and Grieve overlay using locked state names (§1.4)
5. Convert site-wide chrome (header/footer/meta) off Hooligan register
6. Typographic intelligence chrome (FILE: THE BAMPOT header treatment) on homepage only

### Phase 2 — next
7. Guide page conversions (after affiliate-tag QA protocol in §5 is agreed)
8. Communiqué archive page (new build)
9. Index explainer conversion
10. Visual identity work, if commissioned (⚠️ flagged, §2.2)
11. Reveal-beat communiqué — Grieve discovering his own codename — reserved to be written collaboratively by Sink/Claude, slotted in by Hermes. Not to be generated independently.

### Explicitly ambiguous — do not interpret
⚠️ FLAG — **Content cadence.** Are communiqués a recurring generated/written content stream (pipeline, like DFS) or static site copy refreshed occasionally? Not specified in canon; Sink to decide.

⚠️ FLAG — **Head office and the adjutant.** Sample voice work implies off-page entities (head office, an adjutant). Whether these are ever named, voiced, or given replies is a creative decision, not made here.

---

## 5. QA / VERIFICATION CHECKLIST (filesystem-evidenced, not narrative self-report)

- [ ] `grep -ril "hooligan" .` returns zero hits outside `/docs/canon/archive/`
- [ ] Homepage two-register structure confirmed via raw HTML fetch of the live/deployed URL — data layer values present and correct independent of any Grieve copy
- [ ] Banned vocabulary list (§1.3) — zero live hits for "midges" used in Grieve's own voice (data-layer/plain copy may still use "midge" normally, per house SEO convention — this rule applies to Grieve's voice only)
- [ ] **Affiliate tag protection:** confirm every affiliate link on any converted page still carries the correct tag (`biteforecast2-21`) — this project has a known prior incident of a wrong/stale tag (`biteforecas00-21`) propagating via copy-paste; check explicitly before and after touching any guide/affiliate-bearing page
- [ ] No file ships referencing Hooligan by name, confirmed by the Phase 1 grep report being empty or fully resolved
- [ ] Overlay state names on live pages match §1.4 exactly — no drift or improvisation

---

## Outstanding sign-offs (resolved 4 July 2026)

1. ~~Repo name and current path of `HOOLIGAN_VOICE_CARD.md`~~ — RESOLVED: file never existed. SVGs archived. See §2.3 note above.
2. ~~Whether Hooligan's visual assets are archived~~ — RESOLVED: SVGs archived (see §2.3). Visual replacement deferred to Phase 2; Phase 1 ships typographic chrome only.
3. ~~Content cadence~~ — RESOLVED: static copy for now. Not a recurring pipeline. Revisit after rebrand lands.
4. ~~Whether "head office" / the adjutant are ever named or voiced~~ — RESOLVED: references only for Phase 1. Not named or voiced. Door left open.
5. ~~Conversion priority~~ — RESOLVED: keep default order (homepage + site-wide chrome first per §2.2). No analytics to reorder against.
6. ~~Sign off on locked overlay names in §1.4~~ — RESOLVED: labels locked with Level 4 = "Severe" (matching engine), retiring "Very High" (brief) and "Guarded" (old homepage constant).
7. ~~Data-layer label reconciliation~~ — RESOLVED: §1.4 updated to `Low / Moderate / High / Severe / Extreme`. BAMPOT_VOICE_CARD.md §6 records the resolution text.