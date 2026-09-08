/**
 * Decorative illustration for "Who It's For" — a single storefront mark
 * standing in for "a local business," generic enough to cover the full
 * range of business types listed below rather than picking favourites
 * among them. Replaced an earlier three-icon composite (food/salon/
 * education) that read as crowded at this size — one bold mark, matching
 * TrustIllustration's line-art scale, reads cleaner. aria-hidden since
 * the grid of business types below already carries the meaning.
 */
export function AudienceIllustration({ size = 88 }: { size?: number }) {
  const height = Math.round(size * (84 / 96));

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 84"
      width={size}
      height={height}
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* awning */}
      <path
        d="M4 30 L14 6 a6 6 0 0 1 5.6-3.8h56.8A6 6 0 0 1 82 6 L92 30Z"
        fill="var(--color-primary-pale)"
        stroke="var(--color-primary-accessible)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M4 30h88M22 30V6M40 30V6M56 30V6M74 30V6"
        stroke="var(--color-primary-accessible)"
        strokeWidth="2.5"
      />

      {/* storefront body */}
      <rect
        x="10"
        y="30"
        width="76"
        height="46"
        fill="var(--color-surface-base)"
        stroke="var(--color-primary-accessible)"
        strokeWidth="3"
      />

      {/* window */}
      <rect
        x="18"
        y="38"
        width="24"
        height="20"
        rx="2"
        fill="var(--color-primary-pale)"
        stroke="var(--color-primary-accessible)"
        strokeWidth="2.5"
      />
      <path d="M30 38v20" stroke="var(--color-primary-accessible)" strokeWidth="2" />

      {/* door */}
      <rect
        x="54"
        y="46"
        width="22"
        height="30"
        rx="1.5"
        fill="var(--color-primary-light)"
        stroke="var(--color-primary-accessible)"
        strokeWidth="2.5"
      />
      <circle cx="71" cy="61" r="1.8" fill="var(--color-primary-accessible)" />
    </svg>
  );
}
