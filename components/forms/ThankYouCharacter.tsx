/**
 * Abstract, non-figurative "character" for the post-submission state —
 * built from the same 8-point star + emerald badge motif as
 * components/shared/Logo.tsx (points recentered on origin, scaled down,
 * used as a subtle chest emblem) rather than a literal mascot figure, to
 * stay consistent with the rest of the brand's geometric visual language.
 */
export function ThankYouCharacter() {
  return (
    <svg
      width={160}
      height={160}
      viewBox="0 0 160 160"
      role="img"
      aria-label="A celebrating star badge"
      style={{ display: "block", margin: "0 auto" }}
    >
      <defs>
        <linearGradient id="thankYouGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary-accessible)" />
          <stop offset="100%" stopColor="var(--color-primary-accessible-dark)" />
        </linearGradient>
      </defs>

      <g className="ui-thankyou-sparkle ui-thankyou-sparkle-1" transform="translate(26, 34)">
        <polygon fill="url(#thankYouGradient)" points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" />
      </g>
      <g className="ui-thankyou-sparkle ui-thankyou-sparkle-2" transform="translate(132, 42)">
        <polygon fill="var(--color-primary-light)" points="0,-7 1.7,-1.7 7,0 1.7,1.7 0,7 -1.7,1.7 -7,0 -1.7,-1.7" />
      </g>
      <g className="ui-thankyou-sparkle ui-thankyou-sparkle-3" transform="translate(124, 120)">
        <polygon fill="url(#thankYouGradient)" points="0,-6 1.5,-1.5 6,0 1.5,1.5 0,6 -1.5,1.5 -6,0 -1.5,-1.5" />
      </g>

      <g className="ui-thankyou-pop">
        <g className="ui-thankyou-bob">
          <circle cx="80" cy="80" r="52" fill="url(#thankYouGradient)" />

          <g
            transform="translate(80, 80) scale(0.5)"
            opacity="0.18"
            fill="#ffffff"
          >
            <polygon points="0,-46 7.65,-18.48 32.53,-32.53 18.48,-7.65 46,0 18.48,7.65 32.53,32.53 7.65,18.48 0,46 -7.65,18.48 -32.53,32.53 -18.48,7.65 -46,0 -18.48,-7.65 -32.53,-32.53 -7.65,-18.48" />
          </g>

          <circle cx="64" cy="76" r="5" fill="#ffffff" />
          <circle cx="96" cy="76" r="5" fill="#ffffff" />
          <path
            d="M60 94 Q80 112 100 94"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
