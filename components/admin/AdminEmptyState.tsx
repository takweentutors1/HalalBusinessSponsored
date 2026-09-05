export interface AdminEmptyStateProps {
  title?: string;
  description?: string;
}

/**
 * Illustration reuses the Logo's 8-point star motif (see
 * components/shared/Logo.tsx) so the admin area stays visually consistent
 * with the rest of the brand system, rather than introducing a new icon
 * style just for this one screen.
 */
export function AdminEmptyState({
  title = "No applications yet",
  description = "New submissions will appear here as soon as someone applies.",
}: AdminEmptyStateProps) {
  return (
    <div style={{ textAlign: "center", padding: "var(--space-16) var(--space-8)" }}>
      <svg
        width={140}
        height={140}
        viewBox="0 0 140 140"
        aria-hidden="true"
        role="img"
        style={{ margin: "0 auto var(--space-6)", display: "block" }}
      >
        <defs>
          <linearGradient id="adminEmptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary-accessible)" />
            <stop offset="100%" stopColor="var(--color-primary-accessible-dark)" />
          </linearGradient>
        </defs>

        <circle cx="70" cy="70" r="68" fill="var(--color-primary-pale)" />
        <ellipse cx="70" cy="103" rx="32" ry="7" fill="url(#adminEmptyGradient)" opacity="0.12" />

        <g className="ui-admin-empty-float">
          <rect
            x="48"
            y="35"
            width="44"
            height="56"
            rx="6"
            fill="var(--color-surface-base)"
            stroke="url(#adminEmptyGradient)"
            strokeWidth="2"
          />
          <line x1="56" y1="48" x2="84" y2="48" stroke="var(--color-border-medium)" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="58" x2="84" y2="58" stroke="var(--color-border-medium)" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="68" x2="72" y2="68" stroke="var(--color-border-medium)" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g className="ui-admin-empty-pulse" transform="translate(96, 28)">
          <polygon
            fill="url(#adminEmptyGradient)"
            points="8,0 9.8,5.4 15,3 11.6,7.5 17,9 11.6,10.5 15,15 9.8,12.6 8,18 6.2,12.6 1,15 4.4,10.5 -1,9 4.4,7.5 1,3 6.2,5.4"
          />
        </g>
      </svg>

      <h2 style={{ marginBottom: "var(--space-2)" }}>{title}</h2>
      <p style={{ color: "var(--color-text-secondary)" }}>{description}</p>
    </div>
  );
}
