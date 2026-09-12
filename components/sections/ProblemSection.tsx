import type { ReactNode } from "react";

interface ProblemCard {
  icon: ReactNode;
  text: string;
}

const PROBLEM_CARDS: ProblemCard[] = [
  {
    icon: (
      <svg
        aria-hidden="true"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-primary-accessible)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    text: "Instagram and WhatsApp are doing the job a proper website should be doing.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-primary-accessible)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    text: "Customers have to dig through posts and messages for basic information.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-primary-accessible)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    ),
    text: "Your business may be established offline but look less professional online.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-primary-accessible)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    ),
    text: "Business information is spread across too many platforms.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-primary-accessible)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7.5" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    text: "Competitors with a clearer online presence can win trust faster.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-primary-accessible)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    text: "The customer journey is unclear: where to enquire, what to buy, or what happens next.",
  },
];

export function ProblemSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--color-surface-base)",
        padding: "var(--space-16) var(--space-8) var(--space-12)",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto", textAlign: "center" }}>
        <span className="ui-section-eyebrow">THE CURRENT PROBLEM</span>
        <h2
          style={{
            marginBottom: "var(--space-4)",
            maxWidth: 760,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Your customers should not have to piece your business together.
        </h2>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-base)",
            maxWidth: 620,
            margin: "0 auto var(--space-10)",
            lineHeight: 1.6,
          }}
        >
          Many established businesses still rely on scattered social profiles, DMs and outdated websites.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "var(--space-4)",
            textAlign: "left",
          }}
        >
          {PROBLEM_CARDS.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-5) var(--space-5)",
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-4)",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-md)",
                  background: "#e8f8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {card.icon}
              </div>
              <p
                style={{
                  color: "var(--color-text-primary)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: 1.55,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
