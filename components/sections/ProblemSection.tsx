"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cardHoverLift, gsap, prefersReducedMotion } from "@/lib/gsap";

interface SourceCard {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const SOURCE_CARDS: SourceCard[] = [
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="3" />
        <circle cx="12" cy="9" r="3" />
        <path d="M8 17c1.5-2 6.5-2 8 0" />
      </svg>
    ),
    title: "Instagram",
    text: "Good for content, but not a complete business presence.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l2-5a8 8 0 1 1 3 3z" />
        <path d="M9 8c1 3 3 5 6 6" />
      </svg>
    ),
    title: "WhatsApp",
    text: "Great for messages, but weak for first-time trust.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h4l3-3v6l-3-3" />
        <path d="M15 8c3 1 5 3 5 6" />
      </svg>
    ),
    title: "Word of mouth",
    text: "Referrals help, but new customers still check you online.",
  },
];

function ArrowDownIcon() {
  return (
    <svg aria-hidden="true" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-accessible)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v14M6 12l6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

/**
 * Below-the-fold section, so unlike Hero.tsx this doesn't need a static
 * .hero-anim-init-style hidden class — by the time a user scrolls this
 * far, hydration has essentially always finished, so gsap.from()'s
 * "instant snap to the from-state, then animate to whatever's already
 * in the DOM" is safe: worst case is an imperceptible flash, and under
 * prefersReducedMotion() the early return just leaves the natural
 * (visible) DOM state alone. Same pattern as GSAPReveal.tsx.
 */
export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".problem-source-card", {
        opacity: 0,
        y: 40,
        rotationX: 15,
        transformPerspective: 800,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".problem-source-grid", start: "top 75%" },
      });

      gsap.to(".problem-arrow", {
        y: 8,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Left-to-right highlight sweep across the search chip, timed to
      // the section scrolling into view — a lighter-weight stand-in for
      // a full typing simulation that doesn't risk mismatched timing
      // against the real (translatable) query text.
      gsap.fromTo(
        ".problem-search-sweep",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power2.inOut",
          delay: 0.3,
          scrollTrigger: { trigger: ".problem-search-box", start: "top 75%" },
        }
      );

      const calloutTl = gsap.timeline({
        scrollTrigger: { trigger: ".problem-callout-negative", start: "top 85%" },
      });
      calloutTl
        .from(".problem-callout-negative", { opacity: 0, y: -16, duration: 0.5, ease: "power2.out" })
        .to(".problem-callout-negative", { x: -6, duration: 0.07, repeat: 5, yoyo: true, ease: "power1.inOut" })
        .from(
          ".problem-callout-positive",
          { opacity: 0, scale: 0.95, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.2"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--color-surface-base)",
        padding: "var(--space-16) var(--space-8) var(--space-12)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <span className="ui-section-eyebrow">THE CURRENT PROBLEM</span>
        <h2 style={{ marginBottom: "var(--space-4)", maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
          Your customers already look for Muslim-owned businesses like yours online.
        </h2>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-base)", maxWidth: 560, margin: "0 auto var(--space-10)", lineHeight: 1.6 }}>
          The problem is what they see when they search for a Muslim-owned business like yours.
        </p>

        {/* Source cards */}
        <div
          className="problem-source-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: "var(--space-5)",
            marginBottom: "var(--space-8)",
          }}
        >
          {SOURCE_CARDS.map((card) => (
            <div
              key={card.title}
              className="problem-source-card"
              onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
              onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
              style={{
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-2xl)",
                padding: "var(--space-6) var(--space-5)",
                boxShadow: "var(--shadow-xl)",
                textAlign: "center",
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
                {card.icon}
              </div>
              <h3 style={{ marginBottom: "var(--space-1)" }}>{card.title}</h3>
              <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "var(--font-size-sm)" }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <div className="problem-arrow" style={{ display: "grid", placeItems: "center", margin: "var(--space-2) 0 var(--space-8)" }}>
          <ArrowDownIcon />
        </div>

        {/* Search box */}
        <div
          className="problem-search-box"
          style={{
            maxWidth: 560,
            margin: "0 auto var(--space-5)",
            padding: "var(--space-6)",
            border: "1px solid var(--color-border-light)",
            borderRadius: "var(--radius-2xl)",
            background: "var(--color-surface-base)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          <p style={{ fontWeight: 800, marginBottom: "var(--space-4)" }}>Then they search for a business like yours.</p>
          <span
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              border: "1px solid var(--color-border-medium)",
              borderRadius: "var(--radius-full)",
              padding: "var(--space-2) var(--space-4)",
              background: "var(--color-surface-base)",
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-sm)",
              overflow: "hidden",
            }}
          >
            <span
              className="problem-search-sweep"
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent, var(--color-accent-pale) 45%, transparent 90%)",
                transform: "scaleX(0)",
                pointerEvents: "none",
              }}
            />
            <SearchIcon />
            Muslim-owned business near me
          </span>
        </div>

        {/* Result callouts */}
        <div
          className="problem-callout-negative"
          style={{ maxWidth: 620, margin: "0 auto var(--space-4)", padding: "var(--space-5)", borderRadius: "var(--radius-lg)", background: "#fff1f2", border: "1px solid #fecdd3" }}
        >
          <p style={{ margin: 0, fontWeight: 700, color: "#b91c1c" }}>
            If they can&apos;t find a proper website, you can look harder to trust than you really are.
          </p>
        </div>
        <div
          className="problem-callout-positive"
          style={{ maxWidth: 620, margin: "0 auto", padding: "var(--space-5)", borderRadius: "var(--radius-lg)", background: "var(--color-accent-pale)", border: "1px solid var(--color-primary-light)" }}
        >
          <p style={{ margin: 0, fontWeight: 700, color: "var(--color-primary-accessible)" }}>
            So they may choose a competitor who looks clearer and more established online.
          </p>
        </div>
      </div>
    </section>
  );
}
