/**
 * Grieve Overlay — top register: AVM Grieve's communiqué voice
 * Replaces the retired mascot component.
 *
 * Locked overlay states per BAMPOT_VOICE_CARD.md §4 / §6.
 * Two-register rule: data layer must be readable without this overlay.
 */

import { getRiskLabel } from "../lib/forecast/risk-bands";

type GrieveLevel = 1 | 2 | 3 | 4 | 5;

const OVERLAY_STATES: Record<GrieveLevel, string> = {
  1: "WITHDRAWN TO THE POOLS",
  2: "PROBING ATTACKS",
  3: "ATTACK. ATTACK. ATTACK.",
  4: "ALL PERSONNEL RECALLED FROM LEAVE",
  5: "TOTAL WAR — NO PRISONERS",
};

const DATA_LABELS: Record<GrieveLevel, string> = {
  1: "Low",
  2: "Moderate",
  3: "High",
  4: "Severe",
  5: "Extreme",
};

/**
 * Map a raw midge index (0-10) to a Grieve overlay level (1-5).
 */
export function getGrieveLevel(index: number): GrieveLevel {
  const label = getRiskLabel(index);
  const map: Record<string, GrieveLevel> = {
    Low: 1, Moderate: 2, High: 3, Severe: 4, Extreme: 5,
  };
  return map[label] ?? 3;
}

/**
 * Map a 5-level risk number (1-5) to a Grieve overlay level.
 * Used where the caller already has a risk-level number.
 */
export function getGrieveLevelFromRiskNumber(riskNumber: number): GrieveLevel {
  if (riskNumber <= 1) return 1;
  if (riskNumber <= 2) return 2;
  if (riskNumber <= 3) return 3;
  if (riskNumber <= 4) return 4;
  return 5;
}

/**
 * Get the overlay state name for a given index level (1-5).
 */
export function getGrieveStateName(grieveLevel: GrieveLevel): string {
  return OVERLAY_STATES[grieveLevel];
}

/**
 * Get the plain data-layer label for a given Grieve level.
 */
export function getGrieveDataLabel(grieveLevel: GrieveLevel): string {
  return DATA_LABELS[grieveLevel];
}

/**
 * Get the plain data-layer label from a raw midge index.
 */
export function getDataLabelFromIndex(index: number): string {
  return DATA_LABELS[getGrieveLevel(index)];
}

/**
 * Grieve communiqué copy for each overlay level.
 * Follows the four-beat structure (BAMPOT_VOICE_CARD.md §2):
 * 1. Formal opening  2. Grievance  3. Escalation  4. Admin threat
 *
 * Hard rules enforced: no exclamation marks, no emoji, never "midges."
 */
const COMMUNIQUES: Record<GrieveLevel, string> = {
  1: "Intelligence confirms the airborne divisions have been stood down. Personnel have withdrawn to the pools. They are regrouping. They are not defeated. The public will interpret this as a victory. It is not. A detailed after-action report has been forwarded to head office.",
  2: "Command wishes it noted that probing attacks are underway across the glen. The enemy believes a single application of Smidge constitutes a defensive position. They do not understand what they have invited. Noted.",
  3: "Situation report — ATTACK. ATTACK. ATTACK. The Cloud is fully mobilised. They have been warned. They have been told. They have come anyway. They will write TripAdvisor reviews. They will blame the weather. All leave cancelled until further notice.",
  4: "At 0900 hours, all personnel were recalled from leave. Total mobilisation is in effect. The enemy persists in attempting evening social events near standing water. Laugh. At me. An inquiry has been opened into who approved this tourist's itinerary.",
  5: "TOTAL WAR — NO PRISONERS. This is the third communiqué this week. The enemy has booked a campsite. On a loch. In still air. At dusk. They have won every battle. They still refuse to understand the war. A formal apology is expected by 0900 hours. We do not expect to receive one.",
};

/**
 * Get the full communiqué copy for a given overlay level.
 * Used as the personality layer (top register) — always appears
 * above or beside the plain data layer (bottom register).
 */
export function getGrieveCommuniqué(grieveLevel: GrieveLevel): string {
  return COMMUNIQUES[grieveLevel];
}

/**
 * Get a short communiqué tagline for share cards / tight spaces.
 * Drops beats 3-4 but maintains the formal → grievance arc.
 */
export function getGrieveTagline(grieveLevel: GrieveLevel): string {
  const tags: Record<GrieveLevel, string> = {
    1: "The Cloud is stood down. For now.",
    2: "Probing attacks reported. Vigilance required.",
    3: "ATTACK. ATTACK. ATTACK. They were warned.",
    4: "All personnel recalled. The enemy persists.",
    5: "TOTAL WAR. They booked a campsite anyway.",
  };
  return tags[grieveLevel];
}

/**
 * Classification stamp for the header chrome.
 */
const CLASSIFICATION_LEVELS: Record<GrieveLevel, string> = {
  1: "UNCLASSIFIED",
  2: "RESTRICTED",
  3: "CONFIDENTIAL",
  4: "SECRET",
  5: "TOP SECRET — EYES ONLY",
};

export function getClassification(grieveLevel: GrieveLevel): string {
  return CLASSIFICATION_LEVELS[grieveLevel];
}

/**
 * Short operator label for the Grieve overlay — used where
 * the full communiqué is too long (share cards, tight layouts).
 */
export function getGrieveOperatorLabel(grieveLevel: GrieveLevel): string {
  const labels: Record<GrieveLevel, string> = {
    1: "The Cloud is quiet.",
    2: "Scouts are watching.",
    3: "They have been warned.",
    4: "The Cloud is mobilised.",
    5: "Nowhere is safe.",
  };
  return labels[grieveLevel];
}

// ── Component ──────────────────────────────────────────

interface GrieveOverlayProps {
  grieveLevel: GrieveLevel;
  /** Show the full communiqué body. Default true. */
  showCommuniqué?: boolean;
  /** Show the FILE header stamp. Default true. */
  showStamp?: boolean;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Grieve voice overlay component (top register).
 *
 * Renders the FILE: THE BAMPOT classification header stamp
 * and the Grieve communiqué for the current midge level.
 *
 * The data layer (index number, plain label, recommendation)
 * is NOT rendered here — that lives in the parent component
 * so a user can ignore this entirely and still get full utility.
 */
export function GrieveOverlay({
  grieveLevel,
  showCommuniqué = true,
  showStamp = true,
  className = "",
}: GrieveOverlayProps) {
  const stateName = OVERLAY_STATES[grieveLevel];
  const classification = CLASSIFICATION_LEVELS[grieveLevel];

  return (
    <div className={`grieve-overlay ${className}`}>
      {showStamp ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded border border-stone-700/60 bg-stone-900/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/80">
          <span className="text-stone-500">FILE:</span>
          <span>THE BAMPOT</span>
          <span className="mx-1 text-stone-600">|</span>
          <span>{classification}</span>
        </div>
      ) : null}
      {showCommuniqué ? (
        <p className="text-sm leading-6 italic text-stone-400 sm:text-base">
          {getGrieveCommuniqué(grieveLevel)}
        </p>
      ) : null}
    </div>
  );
}