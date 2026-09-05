export interface CapacityRingProps {
  total: number;
  remaining: number;
}

/**
 * Pure CSS/SVG progress ring — no animation library, matches the
 * zero-new-dependencies approach used elsewhere (Logo spin, admin empty
 * state). The ring's fill and center number are driven by real data from
 * getAcceptedCountThisMonth(), not a fixed value, so the "--ring-offset"
 * custom property differs per render — that's why the draw-in keyframe
 * reads it from a CSS variable instead of a hardcoded percentage.
 */
export function CapacityRing({ total, remaining }: CapacityRingProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const filledFraction = remaining / total;
  const offset = circumference * (1 - filledFraction);

  return (
    <svg
      width={120}
      height={120}
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${remaining} of ${total} spots remaining this month`}
      style={{ margin: "0 auto", display: "block" }}
    >
      <defs>
        <linearGradient id="capacityRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary-accessible)" />
          <stop offset="100%" stopColor="var(--color-primary-accessible-dark)" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--color-border-light)" strokeWidth="10" />

      <circle
        className="ui-capacity-ring"
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="url(#capacityRingGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        transform="rotate(-90 60 60)"
        style={
          {
            "--ring-circumference": circumference,
            "--ring-offset": offset,
          } as React.CSSProperties
        }
      />

      <text
        x="60"
        y="56"
        textAnchor="middle"
        className="ui-capacity-number"
        fontFamily="var(--font-display)"
        fontSize="28"
        fontWeight={700}
        fill="var(--color-primary-accessible)"
      >
        {remaining}
      </text>
      <text x="60" y="75" textAnchor="middle" fontSize="12" fill="var(--color-text-tertiary)">
        of {total} left
      </text>
    </svg>
  );
}
