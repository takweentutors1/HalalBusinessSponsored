"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui";
import { cardHoverLift, gsap, prefersReducedMotion } from "@/lib/gsap";
import { currentDigitalProblem, whatTheWebsiteSolves } from "@/lib/content/landing";

const OUTCOME_STATS = [
  { label: "First impression", value: "Stronger" },
  { label: "Customer journey", value: "Clearer" },
  { label: "Online presence", value: "Professional" },
];

/**
 * Before/After comparison — browser-chrome-style preview blocks (pure CSS,
 * see .ui-site-preview in app/globals.css) plus a 3-stat outcome row,
 * matching the docs/index.html redesign. Renders the first 4 items from
 * currentDigitalProblem / whatTheWebsiteSolves (lib/content/landing.ts)
 * directly rather than a separate hardcoded copy, so this can't drift
 * from those lists the way the previous version had.
 *
 * The "collision" entrance (Before slides from the left, After from the
 * right, meeting in the middle) was in the original GSAP plan's §4.3 but
 * never actually built in the phased rollout — added here as part of
 * giving every card on the site consistent GSAP treatment.
 */
export function ProblemSolution() {
  const beforeItems = currentDigitalProblem.items.slice(0, 4);
  const afterItems = whatTheWebsiteSolves.items.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".problem-solution-before", {
        opacity: 0,
        x: -60,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".problem-solution-cards", start: "top 75%" },
      });
      gsap.from(".problem-solution-after", {
        opacity: 0,
        x: 60,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".problem-solution-cards", start: "top 75%" },
      });
      gsap.from(".problem-solution-stat", {
        opacity: 0,
        scale: 0.88,
        stagger: 0.14,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".problem-solution-stats", start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-surface-elevated)",
        padding: "var(--space-16) var(--space-8)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <span className="ui-section-eyebrow">FROM PROBLEM TO SOLUTION</span>
        <h2 style={{ marginBottom: "var(--space-10)" }}>
          What changes when your Muslim-owned business gets a proper online home.
        </h2>

        <div
          className="problem-solution-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "var(--space-6)",
            alignItems: "stretch",
          }}
        >
          {/* Before card */}
          <div
            className="problem-solution-before"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid #ef4444",
              borderRadius: "var(--radius-2xl)",
              boxShadow: "var(--shadow-xl)",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
              <h3 style={{ margin: 0 }}>Before</h3>
              <span style={{ fontSize: "var(--font-size-xs)", fontWeight: 800, color: "#b91c1c", background: "#fee2e2", padding: "4px 12px", borderRadius: "var(--radius-full)" }}>
                Scattered
              </span>
            </div>
            <div className="ui-site-preview ui-site-preview-before" />
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {beforeItems.map((text) => (
                <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", padding: "var(--space-2) 0" }}>
                  <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2.4} strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                  <span style={{ color: "var(--color-text-secondary)" }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After card */}
          <div
            className="problem-solution-after"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid var(--color-accent)",
              borderRadius: "var(--radius-2xl)",
              boxShadow: "var(--shadow-xl)",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
              <h3 style={{ margin: 0 }}>After</h3>
              <span style={{ fontSize: "var(--font-size-xs)", fontWeight: 800, color: "var(--color-primary-accessible)", background: "var(--color-accent-pale)", padding: "4px 12px", borderRadius: "var(--radius-full)" }}>
                Professional
              </span>
            </div>
            <div className="ui-site-preview ui-site-preview-after" />
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {afterItems.map((text) => (
                <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", padding: "var(--space-2) 0" }}>
                  <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                  <span style={{ color: "var(--color-text-primary)" }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Outcome stats — grid columns are a dedicated CSS class
            (.outcome-stat-grid in app/globals.css) rather than
            auto-fit: three 200px-min cards on a narrow phone (~350-
            400px content width) barely fit two per row, wrapping the
            third onto its own half-empty row. Each card also gets its
            own accent-badge checkmark, echoing the "After" list's
            checkmark bullets above so the stats read as a continuation
            of that list rather than a separate, plainer block. */}
        <div
          className="problem-solution-stats outcome-stat-grid"
          style={{
            display: "grid",
            gap: "var(--space-4)",
            marginTop: "var(--space-6)",
          }}
        >
          {OUTCOME_STATS.map((stat) => (
            <div
              key={stat.label}
              className="problem-solution-stat"
              onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
              onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
              style={{
                textAlign: "center",
                padding: "var(--space-6) var(--space-5)",
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-border-light)",
                borderTop: "4px solid var(--color-accent)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-accent-pale)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <svg aria-hidden="true" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l4 4L19 6" />
                </svg>
              </span>
              <span style={{ display: "block", fontSize: "var(--font-size-sm)", color: "var(--color-text-tertiary)" }}>{stat.label}</span>
              <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-primary-accessible)", marginTop: "var(--space-1)" }}>
                {stat.value}
              </strong>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "var(--space-10)" }}>
          <Button href="/apply" variant="primary">
            Apply for a Free Website
          </Button>
        </div>
      </div>
    </section>
  );
}
