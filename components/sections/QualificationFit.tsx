import { Button } from "@/components/ui";
import { RichText } from "@/components/shared/RichText";
import type { ListSection as ListSectionContent } from "@/lib/content/landing";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a4731"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      aria-hidden="true"
      width={11}
      height={11}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dc2626"
      strokeWidth={3}
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function QualificationFit({
  qualifies,
  notFit,
}: {
  qualifies: ListSectionContent;
  notFit: ListSectionContent;
}) {
  return (
    <section
      id={qualifies.id}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--color-surface-base)",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 960,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-8)",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <span className="ui-section-eyebrow">WHO IT&apos;S FOR</span>
          <h2
            style={{
              marginBottom: "var(--space-2)",
            }}
          >
            {qualifies.title}
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-base)",
              maxWidth: 580,
              margin: "0 auto",
            }}
          >
            We prioritise established businesses where a starter website can make a clear difference.
          </p>
        </div>

        {/* Dual Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "var(--space-6)",
            alignItems: "stretch",
          }}
        >
          {/* Who Qualifies Card */}
          <div
            style={{
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid #1a4731",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "var(--font-size-xl)",
                fontFamily: "var(--font-serif)",
                color: "#0f172a",
                marginBottom: "var(--space-4)",
              }}
            >
              Good fit
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {qualifies.items.slice(0, 5).map((item) => (
                <li
                  key={item}
                  style={{
                    padding: "var(--space-2) 0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-3)",
                    fontSize: "var(--font-size-base)",
                    lineHeight: 1.55,
                    color: "var(--color-text-primary)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "var(--radius-full)",
                      background: "rgba(26, 71, 49, 0.1)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <CheckIcon />
                  </span>
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who Is Usually Not a Fit Card */}
          <div
            style={{
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid #ef4444",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "var(--font-size-xl)",
                fontFamily: "var(--font-serif)",
                color: "#0f172a",
                marginBottom: "var(--space-4)",
              }}
            >
              Usually not a fit
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {notFit.items.slice(0, 6).map((item) => (
                <li
                  key={item}
                  style={{
                    padding: "var(--space-2) 0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-3)",
                    fontSize: "var(--font-size-base)",
                    lineHeight: 1.55,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "var(--radius-full)",
                      background: "#fee2e2",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <CrossIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Centered CTA */}
        <div style={{ marginTop: "var(--space-10)", textAlign: "center" }}>
          <Button href="/apply" variant="primary">
            Apply for a Free Website
          </Button>
        </div>
      </div>
    </section>
  );
}

