type HooliganSize = "sm" | "md" | "lg";

type HooliganPose = "asleep" | "one-eye-open" | "smidge-up" | "organised" | "victory";

const SIZE_CLASSES: Record<HooliganSize, string> = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-28 sm:h-32 sm:w-32",
};

const POSE_LABELS: Record<HooliganPose, string> = {
  asleep: "Hooligan asleep: low midge activity",
  "one-eye-open": "Hooligan one eye open: moderate midge activity",
  "smidge-up": "Hooligan rubbing his hands: high midge activity",
  organised: "Hooligan commanding the swarm: severe midge activity",
  victory: "Hooligan in victory pose: extreme midge activity",
};

export function getHooliganPose(indexLevel: number): HooliganPose {
  if (indexLevel <= 2) return "asleep";
  if (indexLevel <= 4) return "one-eye-open";
  if (indexLevel <= 6) return "smidge-up";
  if (indexLevel <= 8) return "organised";
  return "victory";
}

export function getHooliganAdversaryLine(indexLevel: number): string {
  const pose = getHooliganPose(indexLevel);

  switch (pose) {
    case "asleep":
      return "The wee beggars are having a quiet one. Don't get used to it.";
    case "one-eye-open":
      return "The wee beggars are stirring. Take precautions.";
    case "smidge-up":
      return "Smidge up. The wee beggars have been warned you're coming.";
    case "organised":
      return "The wee beggars have organised. Pack the Smidge and cover up.";
    case "victory":
      return "The wee beggars are absolutely steaming. Stay in the car. We mean it.";
  }
}

export function getHooliganIndexFromRiskLevel(levelNumber: number): number {
  if (levelNumber <= 1) return 1;
  if (levelNumber === 2) return 3;
  if (levelNumber === 3) return 5;
  if (levelNumber === 4) return 7;
  return 9;
}

export function HooliganState({
  indexLevel,
  size = "md",
  className = "",
}: {
  indexLevel: number;
  size?: HooliganSize;
  className?: string;
}) {
  const pose = getHooliganPose(indexLevel);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-amber-100/70 bg-[#fff8e9] p-1.5 shadow-[0_0_0_2px_rgba(255,255,255,0.16),0_12px_30px_rgba(0,0,0,0.30)] ${SIZE_CLASSES[size]} ${className}`}
    >
      <svg
        aria-label={POSE_LABELS[pose]}
        className="h-full w-full"
        role="img"
        viewBox="0 90 288 540"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            .h-ink { stroke: #0d0d0d; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; fill: none; }
            .h-inkThin { stroke: #0d0d0d; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; fill: none; }
            .h-body { fill: #2f4732; stroke: #0d0d0d; stroke-width: 7; stroke-linejoin: round; }
            .h-belly { fill: #f6d36f; stroke: #0d0d0d; stroke-width: 5; }
            .h-wing { fill: #dbeee7; stroke: #0d0d0d; stroke-width: 4; opacity: 0.82; }
            .h-eye { fill: #fffef6; stroke: #0d0d0d; stroke-width: 4; }
            .h-pupil { fill: #0d0d0d; }
            .h-accent { fill: #d94a3a; stroke: #0d0d0d; stroke-width: 4; }
            .h-gold { fill: #f6d36f; stroke: #0d0d0d; stroke-width: 4; }
            .h-tourist { fill: #f0c6a4; stroke: #0d0d0d; stroke-width: 5; }
            .h-jacket { fill: #d94a3a; stroke: #0d0d0d; stroke-width: 5; }
            .h-swarm { fill: #0d0d0d; opacity: 0.85; }
            .h-sfx { font-family: Impact, Haettenschweiler, 'Arial Black', sans-serif; font-size: 38px; fill: #d94a3a; stroke: #0d0d0d; stroke-width: 2; paint-order: stroke; }
          `}</style>
        </defs>
        <rect width="288" height="540" x="0" y="90" rx="32" fill="#fff8e9" />
        {pose === "asleep" ? <AsleepPose /> : null}
        {pose === "one-eye-open" ? <OneEyeOpenPose /> : null}
        {pose === "smidge-up" ? <SmidgeUpPose /> : null}
        {pose === "organised" ? <OrganisedPose /> : null}
        {pose === "victory" ? <VictoryPose /> : null}
      </svg>
    </span>
  );
}

function AsleepPose() {
  return (
    <g transform="translate(0 8)">
      <ellipse className="h-wing" cx="126" cy="305" rx="52" ry="96" transform="rotate(-22 126 305)" />
      <ellipse className="h-wing" cx="176" cy="306" rx="52" ry="96" transform="rotate(22 176 306)" />
      <ellipse className="h-body" cx="150" cy="390" rx="63" ry="116" />
      <ellipse className="h-belly" cx="150" cy="420" rx="34" ry="70" />
      <circle className="h-eye" cx="126" cy="282" r="22" />
      <circle className="h-eye" cx="174" cy="282" r="22" />
      <path className="h-inkThin" d="M108 278 Q126 292 144 278" />
      <path className="h-inkThin" d="M156 278 Q174 292 192 278" />
      <path className="h-ink" d="M114 356 C78 376 70 414 48 443" />
      <path className="h-ink" d="M187 356 C224 377 232 414 254 442" />
      <path className="h-ink" d="M114 464 C83 494 64 525 42 558" />
      <path className="h-ink" d="M185 464 C219 494 236 526 258 558" />
      <path className="h-inkThin" d="M134 328 Q150 338 166 328" />
      <path className="h-inkThin" d="M126 184 L108 128" />
      <path className="h-inkThin" d="M174 184 L194 128" />
      <text x="36" y="154" className="h-sfx" transform="rotate(-10 36 154)">Zzz</text>
    </g>
  );
}

function OneEyeOpenPose() {
  return (
    <g transform="translate(0 8)">
      <ellipse className="h-wing" cx="124" cy="310" rx="48" ry="92" transform="rotate(-26 124 310)" />
      <ellipse className="h-wing" cx="178" cy="310" rx="48" ry="92" transform="rotate(22 178 310)" />
      <ellipse className="h-body" cx="150" cy="392" rx="62" ry="116" />
      <ellipse className="h-belly" cx="150" cy="422" rx="34" ry="70" />
      <circle className="h-eye" cx="126" cy="282" r="22" />
      <circle className="h-eye" cx="174" cy="282" r="22" />
      <path className="h-inkThin" d="M109 278 Q126 292 143 278" />
      <circle className="h-pupil" cx="170" cy="282" r="9" />
      <path className="h-inkThin" d="M158 268 Q176 260 194 270" />
      <path className="h-inkThin" d="M130 330 Q150 321 170 330" />
      <path className="h-ink" d="M112 360 C74 382 62 410 42 448" />
      <path className="h-ink" d="M188 360 C226 380 241 410 262 448" />
      <path className="h-ink" d="M116 465 C76 496 60 526 44 570" />
      <path className="h-ink" d="M184 465 C221 500 238 530 258 570" />
      <path className="h-inkThin" d="M125 184 L99 126" />
      <path className="h-inkThin" d="M174 184 L207 130" />
      <path className="h-inkThin" d="M204 210 C235 202 252 214 270 232" />
      <text x="28" y="154" className="h-sfx" transform="rotate(-6 28 154)">...?</text>
    </g>
  );
}

function SmidgeUpPose() {
  return (
    <g transform="translate(0 8)">
      <ellipse className="h-wing" cx="120" cy="286" rx="50" ry="94" transform="rotate(-31 120 286)" />
      <ellipse className="h-wing" cx="181" cy="286" rx="50" ry="94" transform="rotate(31 181 286)" />
      <ellipse className="h-body" cx="150" cy="386" rx="64" ry="118" />
      <ellipse className="h-belly" cx="150" cy="420" rx="35" ry="70" />
      <circle className="h-eye" cx="124" cy="276" r="23" />
      <circle className="h-eye" cx="176" cy="276" r="23" />
      <circle className="h-pupil" cx="130" cy="277" r="9" />
      <circle className="h-pupil" cx="170" cy="277" r="9" />
      <path className="h-inkThin" d="M105 258 Q125 246 145 258" />
      <path className="h-inkThin" d="M157 258 Q177 246 197 258" />
      <path className="h-inkThin" d="M128 330 Q150 346 172 330" />
      <path className="h-ink" d="M112 356 C87 377 102 397 134 395" />
      <path className="h-ink" d="M188 356 C213 377 198 397 166 395" />
      <path className="h-inkThin" d="M129 393 C142 386 156 386 169 393" />
      <path className="h-inkThin" d="M130 412 C144 405 157 405 170 412" />
      <path className="h-ink" d="M116 465 C83 494 68 530 49 574" />
      <path className="h-ink" d="M184 465 C220 494 236 530 256 574" />
      <path className="h-inkThin" d="M124 181 L91 120" />
      <path className="h-inkThin" d="M177 181 L211 120" />
    </g>
  );
}

function OrganisedPose() {
  return (
    <g transform="translate(0 10)">
      <circle className="h-inkThin" cx="144" cy="382" r="104" />
      <path className="h-inkThin" d="M144 248 L144 516" />
      <path className="h-inkThin" d="M12 382 L276 382" />
      <circle className="h-tourist" cx="144" cy="386" r="30" />
      <path className="h-jacket" d="M96 488 C104 430 185 430 194 488 Z" />
      <path className="h-inkThin" d="M126 376 Q144 392 162 376" />
      <path className="h-inkThin" d="M128 402 Q144 416 162 402" />
      <path className="h-ink" d="M96 488 L68 548" />
      <path className="h-ink" d="M194 488 L224 548" />
      <g transform="translate(140 132) scale(.62)">
        <ellipse className="h-wing" cx="120" cy="250" rx="44" ry="82" transform="rotate(-30 120 250)" />
        <ellipse className="h-wing" cx="178" cy="250" rx="44" ry="82" transform="rotate(30 178 250)" />
        <ellipse className="h-body" cx="150" cy="340" rx="60" ry="108" />
        <ellipse className="h-belly" cx="150" cy="365" rx="32" ry="62" />
        <circle className="h-eye" cx="126" cy="246" r="21" />
        <circle className="h-eye" cx="174" cy="246" r="21" />
        <circle className="h-pupil" cx="132" cy="247" r="8" />
        <circle className="h-pupil" cx="168" cy="247" r="8" />
        <path className="h-inkThin" d="M105 231 Q126 218 145 231" />
        <path className="h-inkThin" d="M155 231 Q176 218 195 231" />
        <path className="h-inkThin" d="M128 296 Q150 284 172 296" />
        <path className="h-ink" d="M104 328 C48 298 24 282 -12 244" />
        <path className="h-ink" d="M196 328 C248 298 272 282 308 244" />
        <path className="h-ink" d="M118 430 C90 460 72 490 54 532" />
        <path className="h-ink" d="M182 430 C215 460 234 490 252 532" />
      </g>
      <circle className="h-swarm" cx="38" cy="176" r="5" />
      <circle className="h-swarm" cx="62" cy="206" r="4" />
      <circle className="h-swarm" cx="238" cy="176" r="5" />
      <circle className="h-swarm" cx="250" cy="230" r="4" />
      <circle className="h-swarm" cx="34" cy="316" r="4" />
      <circle className="h-swarm" cx="260" cy="320" r="5" />
      <text x="18" y="112" className="h-sfx" transform="rotate(-5 18 112)">TARGET!</text>
    </g>
  );
}

function VictoryPose() {
  return (
    <g transform="translate(8 8)">
      <path className="h-gold" d="M102 206 L122 164 L142 206 L166 164 L186 206 Z" />
      <ellipse className="h-wing" cx="108" cy="302" rx="46" ry="92" transform="rotate(-30 108 302)" />
      <ellipse className="h-wing" cx="168" cy="302" rx="46" ry="92" transform="rotate(30 168 302)" />
      <ellipse className="h-body" cx="138" cy="388" rx="62" ry="118" />
      <ellipse className="h-belly" cx="138" cy="422" rx="34" ry="70" />
      <circle className="h-eye" cx="114" cy="282" r="22" />
      <circle className="h-eye" cx="164" cy="282" r="22" />
      <circle className="h-pupil" cx="119" cy="280" r="8" />
      <circle className="h-pupil" cx="159" cy="280" r="8" />
      <path className="h-inkThin" d="M96 264 Q115 252 134 264" />
      <path className="h-inkThin" d="M146 264 Q165 252 184 264" />
      <path className="h-inkThin" d="M112 332 Q138 352 164 332" />
      <path className="h-ink" d="M96 354 C54 312 32 266 22 218" />
      <path className="h-ink" d="M180 354 C224 312 246 266 256 218" />
      <path className="h-ink" d="M104 466 C68 500 50 530 34 578" />
      <path className="h-ink" d="M172 466 C210 500 226 530 246 578" />
      <path className="h-inkThin" d="M112 185 L86 128" />
      <path className="h-inkThin" d="M164 185 L196 128" />
      <path className="h-accent" d="M82 492 C96 520 178 520 194 492 C172 548 104 548 82 492 Z" />
      <text x="20" y="130" className="h-sfx" transform="rotate(-8 20 130)">MINE!</text>
    </g>
  );
}
