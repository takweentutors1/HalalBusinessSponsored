/**
 * Decorative illustration for the trust/sponsorship narrative (Why It's
 * Sponsored) — a shield with a checkmark, echoing the "Reviewed by a
 * real person, not an algorithm" trust line elsewhere on the page.
 * aria-hidden since the surrounding copy already carries the meaning.
 * "dark" tone is white-on-translucent, for use on the section's own
 * high-contrast gradient banner rather than a light/white background.
 */
export function TrustIllustration({
  size = 96,
  tone = "light",
}: {
  size?: number;
  tone?: "light" | "dark";
}) {
  const fill = tone === "dark" ? "rgba(255,255,255,0.15)" : "var(--color-primary-pale)";
  const stroke = tone === "dark" ? "white" : "var(--color-primary-accessible)";
  const height = Math.round(size * (132 / 120));

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 132"
      width={size}
      height={height}
      style={{ display: "block", margin: "0 auto" }}
    >
      <path
        d="M60 4 L108 20 V60 C108 92 88 114 60 128 C32 114 12 92 12 60 V20 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M38 64 L54 80 L84 46"
        fill="none"
        stroke={stroke}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
