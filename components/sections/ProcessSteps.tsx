"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "@/components/ui";
import { processSteps } from "@/lib/content/landing";

function StepCard({
  item,
  index,
}: {
  item: { step: string; description: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className="process-step-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: hovered ? "1px solid var(--color-primary-accessible)" : "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-2xl)",
        padding: "var(--space-6) var(--space-5)",
        background: "var(--color-surface-base)",
        boxShadow: hovered ? "var(--shadow-xl-hover)" : "var(--shadow-xl)",
        transform: hovered ? "translateY(-5px)" : "none",
        // Explicit property list, not "all" — "all" was catching GSAP's
        // own opacity writes for the entrance tween below and fighting
        // them via the CSS transition engine (each GSAP frame-by-frame
        // opacity write re-triggered a new 200ms CSS transition that got
        // interrupted by the next frame, and the visible end state never
        // settled at the tween's actual final value). Verified via GSAP
        // lifecycle logging: the tween itself completed correctly (onEnter
        // → onStart → progress 0→1 → onComplete all fired), but computed
        // opacity stayed stuck at 0 the whole time regardless.
        transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Top row: step number badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "var(--space-4)",
        }}
      >
        <span
          aria-hidden="true"
          className="process-step-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.1rem",
            height: "2.1rem",
            borderRadius: "var(--radius-full)",
            background: "#1a4731",
            color: "white",
            fontWeight: 700,
            fontSize: "var(--font-size-sm)",
            boxShadow: "0 0 0 4px rgba(26, 71, 49, 0.12)",
            flexShrink: 0,
          }}
        >
          {index + 1}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          marginBottom: "var(--space-2)",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.3,
        }}
      >
        {item.step}
      </h3>

      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-base)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {item.description}
      </p>
    </li>
  );
}

/**
 * The plan's "scrubbed progress beam" assumes a single vertical step
 * list with a line literally connecting node 1 → 2 → 3 → 4. The actual
 * layout here is a responsive grid (3 columns desktop, 2 tablet, 1
 * mobile) — a line drawn between node *positions* would have to bend
 * differently at every breakpoint to stay geometrically connected,
 * which isn't practical. Adapted to the same underlying idea instead: a
 * single horizontal progress bar fills as the section scrolls through
 * view, and each step's number badge pops/glows as the fill crosses
 * that step's position — still scroll-scrubbed, still sequential, just
 * not a literal connecting line across a wrapping grid.
 */
export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      // Card entrance — previously missing: the scrub timeline below
      // choreographs the badge pop/border-brighten/beam-fill as you
      // scroll *through* the section, but the cards themselves never
      // had their own reveal, so they'd just be sitting there fully
      // visible before the scrub even started.
      gsap.from(".process-step-item", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-step-grid", start: "top 85%" },
      });

      const badges = gsap.utils.toArray<HTMLElement>(".process-step-badge");
      const beats = badges.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".process-steps-container",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.8,
        },
      });

      tl.fromTo(".process-progress-fill", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: beats }, 0);

      badges.forEach((badge, i) => {
        const card = badge.closest<HTMLElement>(".process-step-item");
        tl.to(badge, { scale: 1.18, boxShadow: "0 0 0 8px rgba(34, 197, 94, 0.28)", duration: 0.25, ease: "power2.out" }, i)
          .to(badge, { scale: 1, boxShadow: "0 0 0 4px rgba(26, 71, 49, 0.12)", duration: 0.25, ease: "power2.inOut" }, i + 0.25);
        if (card) {
          // Hex, not var(--color-primary-accessible) — GSAP resolves CSS
          // custom properties via getComputedStyle, but a literal color
          // value tweens more predictably than relying on that resolution.
          tl.to(card, { borderColor: "#047857", duration: 0.15, ease: "power1.out" }, i)
            .to(card, { borderColor: "var(--color-border-light)", duration: 0.25, ease: "power1.in" }, i + 0.4);
        }
      });
    },
    { scope: sectionRef, dependencies: [processSteps.steps.length] }
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--space-12) var(--space-8)",
        background: "var(--color-surface-base)",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: 960, margin: "0 auto" }}>
        {/* Centered Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <span className="ui-section-eyebrow">HOW IT WORKS</span>
          <h2
            style={{
              marginBottom: "var(--space-2)",
            }}
          >
            {processSteps.title}
          </h2>
        </div>

        <div className="process-steps-container">
          {/* Scroll-scrubbed progress track */}
          <div
            aria-hidden="true"
            style={{
              height: 4,
              borderRadius: "var(--radius-full)",
              background: "var(--color-border-light)",
              marginBottom: "var(--space-8)",
              overflow: "hidden",
            }}
          >
            <div
              className="process-progress-fill"
              style={{
                height: "100%",
                width: "100%",
                transformOrigin: "left center",
                transform: "scaleX(0)",
                background: "linear-gradient(90deg, var(--color-primary-accessible), var(--color-accent))",
              }}
            />
          </div>

          {/* Step Grid (2 desktop, 2 tablet, 1 mobile) */}
          <ol
            className="process-step-grid"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "var(--space-5)",
            }}
          >
            {processSteps.steps.map((item, index) => (
              <StepCard key={item.step} item={item} index={index} />
            ))}
          </ol>
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
