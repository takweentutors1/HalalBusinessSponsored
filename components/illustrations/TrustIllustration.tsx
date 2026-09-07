/**
 * Decorative illustration for the trust/sponsorship narrative (Why It's
 * Sponsored) — a shield with a checkmark, echoing the "Reviewed by a
 * real person, not an algorithm" trust line elsewhere on the page.
 * aria-hidden since the surrounding copy already carries the meaning.
 */
export function TrustIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 132"
      width={96}
      height={106}
      style={{ display: "block", margin: "0 auto" }}
    >
      <path
        d="M60 4 L108 20 V60 C108 92 88 114 60 128 C32 114 12 92 12 60 V20 Z"
        fill="var(--color-primary-pale)"
        stroke="var(--color-primary-accessible)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M38 64 L54 80 L84 46"
        fill="none"
        stroke="var(--color-primary-accessible)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
