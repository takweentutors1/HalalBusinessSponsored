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
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            color: "var(--color-primary-dark)",
            marginBottom: "var(--space-10)",
          }}
        >
          From Problem to Solution
        </h2>

        <div
          style={{
            border: "1px solid var(--color-border-medium)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {/* Column headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div
              style={{
                background: "var(--color-neutral-900)",
                padding: "var(--space-4) var(--space-6)",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--font-size-base)",
                  letterSpacing: "0.02em",
                }}
              >
                The Problem Today
              </p>
            </div>
            <div
              style={{
                background: "var(--color-primary-accessible)",
                padding: "var(--space-4) var(--space-6)",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--font-size-base)",
                  letterSpacing: "0.02em",
                }}
              >
                The Website Solution
              </p>
            </div>
          </div>

          {/* Row pairs */}
          {Array.from({ length: maxRows }, (_, i) => {
            const problem = currentDigitalProblem.items[i];
            const solution = whatTheWebsiteSolves.items[i];
            const isEven = i % 2 === 0;
            const rowBg = isEven ? "var(--color-surface-base)" : "var(--color-neutral-50)";

            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderTop: "1px solid var(--color-border-light)",
                }}
              >
                {/* Problem cell */}
                <div
                  style={{
                    padding: "var(--space-4) var(--space-6)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-3)",
                    background: rowBg,
                    borderRight: "1px solid var(--color-border-light)",
                  }}
                >
                  {problem ? (
                    <>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          marginTop: 2,
                          width: 20,
                          height: 20,
                          borderRadius: "var(--radius-full)",
                          background: "#fee2e2",
                          color: "#dc2626",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        ✕
                      </span>
                      <span style={{ color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                        {problem}
                      </span>
                    </>
                  ) : null}
                </div>

                {/* Solution cell */}
                <div
                  style={{
                    padding: "var(--space-4) var(--space-6)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-3)",
                    background: isEven ? "var(--color-primary-pale)" : "#e6f9f1",
                  }}
                >
                  {solution ? (
                    <>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          marginTop: 2,
                          width: 20,
                          height: 20,
                          borderRadius: "var(--radius-full)",
                          background: "#dcfce7",
                          color: "var(--color-primary-accessible)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ color: "var(--color-neutral-800)", fontWeight: 600, lineHeight: 1.5 }}>
                        {solution}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
