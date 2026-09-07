/**
 * Decorative illustration for "The Current Digital Problem" — three
 * tilted, overlapping cards (an Instagram-grid card, a chat-bubble card,
 * a blank business-card) with a jagged disconnect between them, evoking
 * a fragmented online presence spread across platforms that don't talk
 * to each other. aria-hidden since the section's own heading/list
 * already carries the meaning.
 */
export function ProblemIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      width={180}
      height={108}
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* back card: blank business card */}
      <g transform="rotate(-6 60 66)">
        <rect
          x="24"
          y="46"
          width="72"
          height="48"
          rx="8"
          fill="var(--color-surface-base)"
          stroke="var(--color-border-medium)"
          strokeWidth="2"
        />
        <rect x="34" y="58" width="36" height="6" rx="3" fill="var(--color-neutral-300)" />
        <rect x="34" y="70" width="24" height="6" rx="3" fill="var(--color-neutral-200)" />
      </g>

      {/* Instagram-esque grid card */}
      <g transform="rotate(8 132 54)">
        <rect
          x="98"
          y="20"
          width="68"
          height="68"
          rx="10"
          fill="var(--color-surface-base)"
          stroke="var(--color-border-medium)"
          strokeWidth="2"
        />
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={108 + col * 18}
              y={30 + row * 18}
              width="14"
              height="14"
              rx="3"
              fill={row === 1 && col === 1 ? "var(--color-primary-light)" : "var(--color-neutral-200)"}
            />
          )),
        )}
      </g>

      {/* chat-bubble card, frontmost */}
      <g transform="rotate(-4 70 90)">
        <path
          d="M40 70 h56 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-38 l-14 10 v-10 h-4 a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8 z"
          fill="var(--color-surface-base)"
          stroke="var(--color-border-medium)"
          strokeWidth="2"
        />
        <rect x="50" y="84" width="34" height="5" rx="2.5" fill="var(--color-neutral-300)" />
        <rect x="50" y="94" width="22" height="5" rx="2.5" fill="var(--color-neutral-200)" />
      </g>

      {/* disconnect marker */}
      <circle cx="150" cy="92" r="11" fill="var(--color-warning)" opacity="0.9" />
      <text
        x="150"
        y="97"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="white"
        fontFamily="var(--font-body)"
      >
        !
      </text>
    </svg>
  );
}
