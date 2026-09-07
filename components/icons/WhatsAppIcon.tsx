/** Self-authored, simplified WhatsApp glyph (not the trademarked logo file) —
 * recognizable brand-color badge used anywhere copy names WhatsApp. */
export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size}>
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        d="M12 5.5a6.5 6.5 0 0 0-5.6 9.8L5.5 18.5l3.3-.9A6.5 6.5 0 1 0 12 5.5Z"
        fill="none"
        stroke="white"
        strokeWidth="1.3"
      />
      <path
        d="M9.2 9.4c.15-.35.3-.36.45-.36h.35c.12 0 .28-.05.43.33.16.4.55 1.35.6 1.45.05.1.08.22.02.36-.06.13-.09.22-.18.34-.1.12-.2.27-.28.36-.1.1-.2.2-.09.4.12.2.53.9 1.15 1.45.79.72 1.45.94 1.65 1.04.2.1.32.09.44-.05.13-.14.53-.6.67-.82.14-.2.28-.17.46-.1.19.07 1.2.58 1.4.68.2.1.34.15.39.24.05.1.05.53-.13 1.04-.18.5-1.05.98-1.45 1.02-.4.04-.75.2-2.5-.55-2.13-.9-3.48-3.1-3.59-3.25-.1-.14-.85-1.15-.85-2.2 0-1.04.53-1.55.72-1.77Z"
        fill="white"
      />
    </svg>
  );
}
