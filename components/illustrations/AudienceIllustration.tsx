/**
 * Decorative illustration for "Who It's For" — three evenly-spaced
 * storefront icons (food, salon/services, education) sharing one style,
 * standing in for the range of business types the programme accepts.
 * aria-hidden since the grid of business types below already carries
 * the meaning.
 */
export function AudienceIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 100"
      width={200}
      height={91}
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* food / restaurant: awning storefront */}
      <g transform="translate(10 10)">
        <rect
          x="4"
          y="26"
          width="52"
          height="34"
          rx="4"
          fill="var(--color-surface-base)"
          stroke="var(--color-primary-accessible)"
          strokeWidth="2.5"
        />
        <path
          d="M0 26 L30 4 L60 26 Z"
          fill="var(--color-primary-pale)"
          stroke="var(--color-primary-accessible)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="24" y="42" width="12" height="18" fill="var(--color-primary-light)" />
      </g>

      {/* salon / services: scissors */}
      <g transform="translate(84 10)">
        <circle
          cx="30"
          cy="30"
          r="30"
          fill="var(--color-primary-pale)"
          stroke="var(--color-primary-accessible)"
          strokeWidth="2.5"
        />
        <g transform="translate(16 16)" stroke="var(--color-primary-accessible)" strokeWidth="2.5" fill="none">
          <circle cx="4" cy="4" r="3.5" />
          <circle cx="4" cy="24" r="3.5" />
          <line x1="7" y1="6.5" x2="27" y2="21.5" strokeLinecap="round" />
          <line x1="7" y1="21.5" x2="27" y2="6.5" strokeLinecap="round" />
        </g>
      </g>

      {/* education: open book */}
      <g transform="translate(158 14)">
        <path
          d="M28 6 C22 2 8 2 2 6 V44 C8 40 22 40 28 44 C34 40 48 40 54 44 V6 C48 2 34 2 28 6 Z"
          fill="var(--color-surface-base)"
          stroke="var(--color-primary-accessible)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line x1="28" y1="6" x2="28" y2="44" stroke="var(--color-primary-accessible)" strokeWidth="2.5" />
        <line x1="8" y1="14" x2="20" y2="12" stroke="var(--color-primary-light)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="22" x2="20" y2="20" stroke="var(--color-primary-light)" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
