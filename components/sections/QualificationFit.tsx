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

function DashIcon() {
  return (
    <svg
      aria-hidden="true"
      width={10}
      height={10}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-text-tertiary)"
      strokeWidth={3}
      strokeLinecap="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
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
          <h2
            style={{
              color: "var(--color-primary-dark)",
              marginBottom: "var(--space-2)",
            }}
          >
            Eligibility &amp; Mutual Fit
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-base)",
              maxWidth: 580,
              margin: "0 auto",
            }}
          >
            We carefully select businesses where our sponsorship creates the greatest tangible impact.
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
                color: "var(--color-primary-dark)",
                marginBottom: "var(--space-2)",
              }}
            >
              {qualifies.title}
            </h3>
            {qualifies.intro && (
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--font-size-sm)",
                  marginBottom: "var(--space-4)",
                  lineHeight: 1.5,
                }}
              >
                <RichText text={qualifies.intro} />
              </p>
            )}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {qualifies.items.map((item) => (
                <li
                  key={item}
                  style={{
                    padding: "var(--space-2) 0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-3)",
                    fontSize: "var(--font-size-sm)",
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
              borderTop: "4px solid var(--color-border-medium)",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "var(--font-size-xl)",
                fontFamily: "var(--font-serif)",
                color: "var(--color-text-primary)",
                marginBottom: "var(--space-2)",
              }}
            >
              {notFit.title}
            </h3>
            <p
              style={{
                color: "var(--color-text-tertiary)",
                fontSize: "var(--font-size-sm)",
                marginBottom: "var(--space-4)",
                lineHeight: 1.5,
              }}
            >
              To respect your time, the programme is usually not suitable if any of these apply:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {notFit.items.map((item) => (
                <li
                  key={item}
                  style={{
                    padding: "var(--space-2) 0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-3)",
                    fontSize: "var(--font-size-sm)",
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
                      background: "var(--color-neutral-100)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <DashIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

