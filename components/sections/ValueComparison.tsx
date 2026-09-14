"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cardHoverLift, gsap, prefersReducedMotion } from "@/lib/gsap";
import { marketValueComparison } from "@/lib/config";
import { valueComparison } from "@/lib/content/landing";

/**
 * "Agency build vs £0" comparison from the docs/index.html redesign.
 * The agency price range is a real-world market claim, not something we
 * can verify ourselves, so it stays behind marketValueComparison.approved
 * (lib/config.ts) — flip that once Takween confirms £2,000–£5,000 is a
 * genuine range to publish. Until then this renders the same layout with
 * non-numeric copy instead of a specific figure, so nothing false ships.
 */
export function ValueComparison() {
  const { agency, free } = valueComparison;
  const agencyPriceLabel = marketValueComparison.approved
    ? `${marketValueComparison.currency}${marketValueComparison.agencyLow.toLocaleString()}–${marketValueComparison.currency}${marketValueComparison.agencyHigh.toLocaleString()}`
    : agency.fallbackPrice;

  const sectionRef = useRef<HTMLElement>(null);
  const priceWrapRef = useRef<HTMLDivElement>(null);
  const strikeRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Card-level entrance — previously missing entirely: the strike/
      // glow effects below animate parts *within* the cards, but the
      // cards themselves never had their own reveal once <Reveal> was
      // removed from around this section in an earlier phase (it was
      // removed because the strike/glow already looked like "enough"
      // motion, but the cards popping in with zero fade was a real gap).
      gsap.from(".value-agency-card, .value-free-card", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ui-value-wrap", start: "top 75%" },
      });

      // Strikethrough line is sized to the price element's own rendered
      // box at animation time (not a hardcoded width) — the price text
      // reflows across breakpoints (clamp() font-size) and between the
      // "£2,000–£5,000" / "Thousands" labels, so a fixed-length line
      // would drift out of alignment.
      const priceEl = priceWrapRef.current;
      const line = strikeRef.current;
      if (priceEl && line) {
        const { width, height } = priceEl.getBoundingClientRect();
        line.setAttribute("x1", "0");
        line.setAttribute("y1", String(height * 0.55));
        line.setAttribute("x2", String(width));
        line.setAttribute("y2", String(height * 0.45));
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: priceEl, start: "top 70%" },
        });
      }

      // £0 card: scale pop + a separate blurred glow layer pulsing
      // behind it — box-shadow itself isn't reliably tweenable by GSAP
      // (its CSSPlugin doesn't smoothly interpolate multi-part shadow
      // strings), so .value-free-glow is a dedicated element instead.
      const glowTl = gsap.timeline({
        delay: 0.4,
        scrollTrigger: { trigger: ".value-free-card", start: "top 70%" },
      });
      glowTl
        .to(".value-free-card", { scale: 1.04, duration: 0.5, ease: "power2.out" })
        .to(
          ".value-free-glow",
          { opacity: 0.55, duration: 0.5, ease: "power2.out" },
          "<"
        )
        .to(".value-free-glow", {
          opacity: 0.25,
          scale: 1.08,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={valueComparison.id}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--color-surface-base)",
        padding: "var(--space-16) var(--space-8)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <span className="ui-section-eyebrow">{valueComparison.eyebrow}</span>
        <h2 style={{ marginBottom: "var(--space-4)" }}>{valueComparison.title}</h2>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-base)",
            maxWidth: 620,
            margin: "0 auto var(--space-10)",
            lineHeight: 1.6,
          }}
        >
          {valueComparison.intro}
        </p>

        <div
          className="ui-value-wrap"
          style={{
            display: "grid",
            gap: "var(--space-6)",
            alignItems: "center",
          }}
        >
          {/* Agency card */}
          <div
            className="value-agency-card"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              padding: "var(--space-8) var(--space-6)",
              textAlign: "center",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid var(--color-neutral-400)",
              borderRadius: "var(--radius-2xl)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <p style={{ fontWeight: 800, color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
              {agency.label}
            </p>
            <div
              ref={priceWrapRef}
              style={{
                position: "relative",
                display: "inline-block",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-neutral-600)",
                margin: "var(--space-2) 0",
              }}
            >
              {agencyPriceLabel}
              <svg
                aria-hidden="true"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
              >
                <line ref={strikeRef} className="value-strike-line" stroke="#dc2626" strokeWidth={3} strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>{agency.description}</p>
          </div>

          <div
            aria-hidden="true"
            className="ui-value-vs"
            style={{
              fontWeight: 800,
              // --color-neutral-400 (used elsewhere for decorative borders)
              // is only ~2.5:1 against white — fails AA for this real text
              // node. --color-neutral-600 keeps it visually secondary while
              // passing comfortably (axe-verified, see Phase 5 QA pass).
              color: "var(--color-neutral-600)",
              fontSize: "var(--font-size-lg)",
            }}
          >
            VS
          </div>

          {/* Free card */}
          <div
            className="value-free-card"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              position: "relative",
              padding: "var(--space-8) var(--space-6)",
              textAlign: "center",
              background: "var(--color-accent-pale)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid var(--color-accent)",
              borderRadius: "var(--radius-2xl)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div
              className="value-free-glow"
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -14,
                borderRadius: "calc(var(--radius-2xl) + 14px)",
                background: "var(--color-accent)",
                filter: "blur(24px)",
                opacity: 0,
                zIndex: -1,
              }}
            />
            <p style={{ fontWeight: 800, color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
              {free.label}
            </p>
            <div
              style={{
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-primary-accessible)",
                margin: "var(--space-2) 0",
              }}
            >
              {free.price}
            </div>
            <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>{free.description}</p>
          </div>
        </div>

        {!marketValueComparison.approved && (
          <p
            style={{
              marginTop: "var(--space-6)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-tertiary)",
              fontStyle: "italic",
            }}
          >
            {valueComparison.unapprovedNote}
          </p>
        )}
      </div>
    </section>
  );
}
