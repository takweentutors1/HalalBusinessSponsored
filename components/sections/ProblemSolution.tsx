import { Button } from "@/components/ui";
import { currentDigitalProblem, whatTheWebsiteSolves } from "@/lib/content/landing";

/**
 * Merges "The Current Digital Problem" and "What the Website Solves" into one
 * side-by-side comparison table:
 *   Left  — "The Problem Today"    (dark header, ✗ markers, neutral rows)
 *   Right — "The Website Solution" (green header, ✓ markers, pale rows)
 *
 * This matches the HTML reference design and replaces two stacked ListSection
 * blocks that read as unrelated pages.
 */
export function ProblemSolution() {
  // Zip the two lists together so rows align horizontally.
  const maxRows = Math.max(
    currentDigitalProblem.items.length,
    whatTheWebsiteSolves.items.length
  );

  return (
    <section
      style={{
        background: "var(--color-surface-base)",
        padding: "var(--space-16) var(--space-8)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <span className="ui-section-eyebrow">FROM PROBLEM TO SOLUTION</span>
        <h2
          style={{
            marginBottom: "var(--space-10)",
          }}
        >
          Before vs after your sponsored starter website
        </h2>

        <div
          style={{
            border: "1px solid var(--color-border-light)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            background: "var(--color-surface-base)",
          }}
        >
          {/* Before column */}
          <div
            className="ui-compare-col-before"
            style={{
              padding: "var(--space-8) var(--space-6)",
              background: "#fffaf9",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-6)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  fontFamily: "var(--font-serif)",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Before
              </h3>
              <span
                style={{
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 700,
                  color: "#b91c1c",
                  background: "#fee2e2",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                Scattered
              </span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Instagram/WhatsApp acting as the main online presence",
                "Services and contact details hard to find",
                "Weak or outdated website",
                "No clear place to show reviews or work",
              ].map((text) => (
                <li
                  key={text}
                  style={{
                    padding: "var(--space-3) 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      color: "#dc2626",
                      fontWeight: 700,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After column */}
          <div
            style={{
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-6)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  fontFamily: "var(--font-serif)",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                After
              </h3>
              <span
                style={{
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 700,
                  color: "#166534",
                  background: "#dcfce7",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                Professional
              </span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "One professional home online",
                "Clear services, contact and enquiry path",
                "Stronger credibility and first impression",
                "Portfolio, reviews and business information in one place",
              ].map((text) => (
                <li
                  key={text}
                  style={{
                    padding: "var(--space-3) 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-neutral-800)",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      color: "var(--color-primary-accessible)",
                      fontWeight: 700,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: "var(--space-10)", textAlign: "center" }}>
          <Button href="/apply" variant="primary">
            Apply for a Sponsored Website
          </Button>
        </div>
      </div>
    </section>
  );
}
