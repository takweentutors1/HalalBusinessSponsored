"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "@/components/ui";
import { finalCta } from "@/lib/content/landing";
import { AmbientParallaxBg } from "@/components/shared/AmbientParallaxBg";

const REASSURANCE_CHIPS = [
  "Selected businesses only",
  "No hidden obligation",
  "Limited monthly places",
];

/** Radius (px) around the button center within which the cursor pulls it;
 * outside this the button just sits at rest. */
const MAGNETIC_RADIUS = 90;
const MAGNETIC_STRENGTH = 0.35;

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const magneticZoneRef = useRef<HTMLDivElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);
  const quickToRef = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Aurora glow: a soft radial gradient drifting behind the text,
      // purely decorative so it just loops forever from mount (no
      // ScrollTrigger needed — unlike everything below the fold in
      // earlier phases, this section's own visibility is already
      // gated by the outer page scroll, not by this loop).
      gsap.to(".final-cta-aurora", {
        xPercent: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Reassurance chips: stagger in, then drift on independent
      // sine-wave loops (staggered delays so they don't move in unison).
      gsap.from(".final-cta-chip", {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".final-cta-chip-row", start: "top 90%" },
      });
      gsap.utils.toArray<HTMLElement>(".final-cta-chip").forEach((chip, i) => {
        gsap.to(chip, {
          y: i % 2 === 0 ? 5 : -5,
          duration: 2.2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.6 + i * 0.15,
        });
      });

      // Magnetic button: quickTo gives a physics-feeling follow rather
      // than a linear snap — cheap enough to drive from a raw mousemove
      // listener at this scale (one button, one zone).
      if (buttonWrapRef.current) {
        quickToRef.current = {
          x: gsap.quickTo(buttonWrapRef.current, "x", { duration: 0.4, ease: "power3" }),
          y: gsap.quickTo(buttonWrapRef.current, "y", { duration: 0.4, ease: "power3" }),
        };
      }
    },
    { scope: sectionRef }
  );

  const handleZoneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !quickToRef.current || !buttonWrapRef.current) return;
    const rect = buttonWrapRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < MAGNETIC_RADIUS) {
      quickToRef.current.x(dx * MAGNETIC_STRENGTH);
      quickToRef.current.y(dy * MAGNETIC_STRENGTH);
    } else {
      quickToRef.current.x(0);
      quickToRef.current.y(0);
    }
  };

  const handleZoneMouseLeave = () => {
    if (prefersReducedMotion() || !quickToRef.current) return;
    quickToRef.current.x(0);
    quickToRef.current.y(0);
  };

  return (
    <section
      ref={sectionRef}
      id={finalCta.id}
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "var(--space-16) var(--space-8)",
        background: "#1a4731",
        color: "white",
      }}
    >
      <AmbientParallaxBg src="/images/bg-finalcta.svg" opacity={0.3} />
      <div
        className="final-cta-aurora"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-20% -10%",
          background:
            "radial-gradient(circle at 50% 40%, rgba(34, 197, 94, 0.35), transparent 60%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 680, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div style={{ marginBottom: "var(--space-2)" }}>
          <span
            className="ui-section-eyebrow"
            style={{ color: "#a7f3d0" }}
          >
            READY TO APPLY?
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            marginBottom: "var(--space-4)",
            color: "white",
            fontSize: "2.625rem", /* 42px */
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {finalCta.title}
        </h2>

        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "var(--space-6)",
            maxWidth: 540,
            margin: "0 auto var(--space-6)",
            lineHeight: 1.6,
          }}
        >
          For selected Muslim-owned businesses in the UK. Defined starter scope. £0 development cost. Honest feedback expected.
        </p>

        {/* Reassurance Chips */}
        <div
          className="final-cta-chip-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--space-3)",
            marginBottom: "var(--space-8)",
          }}
        >
          {REASSURANCE_CHIPS.map((chip) => (
            <span
              key={chip}
              className="final-cta-chip"
              style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                color: "white",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "var(--radius-full)",
                padding: "var(--space-2) var(--space-4)",
                letterSpacing: "0.02em",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Action Button — wrapped in a padded "magnetic zone" so the
            pull effect kicks in slightly before the cursor reaches the
            button itself, not only on direct hover. */}
        <div
          ref={magneticZoneRef}
          onMouseMove={handleZoneMouseMove}
          onMouseLeave={handleZoneMouseLeave}
          style={{ display: "inline-block", padding: "var(--space-8)", margin: "calc(var(--space-8) * -1)" }}
        >
          <div ref={buttonWrapRef} style={{ display: "inline-block" }}>
            <Button
              href="/apply"
              variant="primary"
              style={{
                background: "white",
                color: "#1a4731",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "var(--space-4) var(--space-8)",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span>{finalCta.ctaLabel}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
