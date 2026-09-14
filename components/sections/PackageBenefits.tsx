import { cardHoverLift } from "@/lib/gsap";

interface BenefitTile {
  icon: React.ReactNode;
  title: string;
  body: string;
}

const TILES: BenefitTile[] = [
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M10 18h4" />
      </svg>
    ),
    title: "Mobile responsive",
    body: "Designed to work smoothly across mobile, tablet and desktop.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16v14H4z" />
        <path d="M4 9h16M8 5v4" />
      </svg>
    ),
    title: "Professional design",
    body: "A clean, polished layout that helps your business look credible and established.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L5 14h6l-1 8 8-12h-6z" />
      </svg>
    ),
    title: "Performance basics",
    body: "Essential speed and performance optimisation for a smoother browsing experience.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16v14H4z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
    title: "4–5 core pages",
    body: "Enough space to present your business, services, trust signals and contact details clearly.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l4 4M8.5 11h5" />
      </svg>
    ),
    title: "Basic SEO setup",
    body: "Essential on-page structure to help search engines understand your website.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 14-5" />
        <path d="M18 3v4h-4" />
        <path d="M20 12a8 8 0 0 1-14 5" />
        <path d="M6 21v-4h4" />
      </svg>
    ),
    title: "Up to 2 revision rounds",
    body: "Two focused rounds to refine the agreed starter website before launch.",
  },
];

/**
 * "At a glance" 6-tile summary of the free package, sitting directly above
 * ScopeComparison's detailed included/add-ons breakdown — from the
 * docs/index.html redesign. Purely a visual summary of the same facts
 * ScopeComparison already states in detail (lib/content/landing.ts's
 * whatsIncluded), so it deliberately doesn't duplicate that as a second
 * data source — just restates it as scannable tiles.
 */
export function PackageBenefits() {
  return (
    <div
      className="package-benefit-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
        gap: "var(--space-5)",
        marginBottom: "var(--space-10)",
      }}
    >
      {TILES.map((tile) => (
        <div
          key={tile.title}
          className="package-benefit-tile"
          onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
          onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
          style={{
            textAlign: "center",
            background: "var(--color-surface-base)",
            border: "1px solid var(--color-border-light)",
            borderRadius: "var(--radius-2xl)",
            padding: "var(--space-6) var(--space-5)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "var(--radius-lg)",
              background: "var(--color-accent-pale)",
              display: "grid",
              placeItems: "center",
              margin: "0 auto var(--space-4)",
            }}
          >
            {tile.icon}
          </div>
          <h3 style={{ marginBottom: "var(--space-2)", fontSize: "1.05rem" }}>{tile.title}</h3>
          <p style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>{tile.body}</p>
        </div>
      ))}
    </div>
  );
}
