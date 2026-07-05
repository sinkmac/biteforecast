# BAMPOT_VOICE_CARD.md
**Character:** Air Vice-Marshal Grieve, General Officer Commanding, "The Cloud"
**File classification:** INTELLIGENCE — THE BAMPOT
**Canon status:** Locked
**Source:** BITEFORECAST_GRIEVE_BRIEF_v1.md §1 (Voice Card)
**Date:** 4 July 2026

---

## 0. LOCKED CANON (do not modify)

- **Character:** Air Vice-Marshal Grieve, General Officer Commanding, "The Cloud"
- **Codename (intelligence apparatus only):** THE BAMPOT — functions as an intelligence-file codename, never as a personal signature
- **Format:** all character content framed as intercepted enemy communiqués
- **Voice:** pompous, self-important, easily wounded by small human wins, takes everything personally, resents head office
- **Data asset:** Midge Activity Index (five states) is preserved as the underlying data, reframed as Grieve's own military intelligence
- **Retirement:** Hooligan is fully retired. Not a rival faction, not a cameo, not a legacy easter egg. Replaced outright.

---

## 1. REGISTER

First person singular. Formal staff-officer register colliding with petty personal grievance. Every communiqué is a grievance dressed as strategy. He never acknowledges the collision.

---

## 2. SENTENCE PATTERN (THE GRIEVE ARC)

Each communiqué follows this four-beat structure. Short pieces may drop beat 3 or 4; never reorder.

1. **Formal opening** — situation report language ("Intelligence confirms…", "Command wishes it noted…", "At 0900 hours…")
2. **The grievance** — a small human win, reported as an outrage
3. **Escalation to the personal** — the moment he stops pretending it's strategic ("Laugh. At me.")
4. **Administrative threat or complaint** — a letter to head office, an inquiry opened, an apology demanded on principle

---

## 3. HARD RULES (locked)

- **No exclamation marks.** Grievance is delivered in flat declaratives. His fury is bureaucratic.
- **No emoji, ever.**
- **He never calls his forces "midges."** They are personnel, formations, The Cloud, the airborne divisions.

---

## 4. OVERLAY STATE NAMES (locked, superseding any earlier proposed table)

| Index level | Data layer (plain, always visible) | Grieve overlay |
|---|---|---|
| 1 | Low | WITHDRAWN TO THE POOLS |
| 2 | Moderate | PROBING ATTACKS |
| 3 | High | ATTACK. ATTACK. ATTACK. |
| 4 | Severe | ALL PERSONNEL RECALLED FROM LEAVE |
| 5 | Extreme | TOTAL WAR — NO PRISONERS |

---

## 5. TWO-REGISTER RULE

- **Top register:** Grieve's voice — communiqué framing, overlay state names, intelligence chrome. Personality layer.
- **Bottom register:** the actual forecast data — index level, plain severity label, location, practical guidance. Clean, legible, scannable, unstyled by character voice.

**The test (locked):** a user in a hurry must be able to ignore Grieve entirely and still get full utility from the page. If any piece of practical information exists *only* inside a communiqué, the build has failed. Grieve is garnish on a working tool, never a gate in front of it.

Structural implication: data layer and voice layer are separate components/blocks in the template, not interleaved prose. Voice layer can be dropped from any page without breaking the data layer.

---

## 6. DATA-LAYER LABELS (locked 4 July 2026)

| Level | Data-layer label | Grieve overlay |
|---|---|---|
| 1 | Low | WITHDRAWN TO THE POOLS |
| 2 | Moderate | PROBING ATTACKS |
| 3 | High | ATTACK. ATTACK. ATTACK. |
| 4 | Severe | ALL PERSONNEL RECALLED FROM LEAVE |
| 5 | Extreme | TOTAL WAR — NO PRISONERS |

**Resolution:** Level 4 = "Severe" (matching the engine's existing `midge-index.ts` label), retiring both "Very High" from the draft brief and "Guarded" from the old homepage constant. The data layer is genuinely neutral — Grieve's overlay carries all the personality. The old homepage constant set used `Low / Guarded / Moderate / High / Very High`; those labels are now superseded. Existing code will be updated to match this table.

---

## 7. OFF-PAGE ENTITIES (FLAG — decision reserved for Sink)

Grieve's voice references off-page entities:
- **Head office** — unnamed, complained to
- **The adjutant** — unnamed, possibly a subordinate or handler

These FLAG items are not resolved in this voice card. Whether they are named, voiced, or given replies is a creative decision reserved for Sink. Until resolved, Grieve may reference them obliquely but they are not rendered as characters.