/** Self-authored, simplified Instagram glyph (not the trademarked logo file) —
 * recognizable rounded-square camera badge used anywhere copy names Instagram. */
export function InstagramIcon({ size = 20 }: { size?: number }) {
  const gradientId = "ig-gradient";
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#FFB140" />
          <stop offset="45%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#5851DB" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6" fill={`url(#${gradientId})`} />
      <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="white" />
    </svg>
  );
}
