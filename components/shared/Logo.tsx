export interface LogoProps {
  size?: number;
  animated?: boolean;
  showWordmark?: boolean;
}

/**
 * Icon: an 8-pointed geometric star (a classic Islamic architectural/tile
 * motif — decorative geometry, not a religious symbol) in a circular
 * emerald badge. Same shape as public/icons/mark.svg, reproduced inline
 * here (not <img>) so the optional rotation animation can target it
 * directly and so it inherits no extra network request.
 */
export function Logo({ size = 32, animated = false, showWordmark = true }: LogoProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        minWidth: 0,
        maxWidth: "100%",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" role="img">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary-accessible)" />
            <stop offset="100%" stopColor="var(--color-primary-accessible-dark)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="url(#logoGradient)" />
        <g className={animated ? "ui-logo-spin" : undefined}>
          <polygon
            fill="#ffffff"
            points="50,4 57.65,31.52 82.53,17.47 68.48,42.35 96,50 68.48,57.65 82.53,82.53 57.65,68.48 50,96 42.35,68.48 17.47,82.53 31.52,57.65 4,50 31.52,42.35 17.47,17.47 42.35,31.52"
          />
          <circle cx="50" cy="50" r="9" fill="url(#logoGradient)" />
        </g>
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--font-size-lg)",
            color: "var(--color-primary-accessible)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Halal Business Initiative
        </span>
      )}
    </span>
  );
}
