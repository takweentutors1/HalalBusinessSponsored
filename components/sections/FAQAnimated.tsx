"use client";

import { useId, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { RichText } from "@/components/shared/RichText";

interface FAQAnimatedProps {
  question: string;
  answer: string;
}

/**
 * Replaces FAQ.tsx's previous native <details>/<summary> markup — browsers
 * can't animate <details> height smoothly (no built-in transition target
 * for the content reveal), so this reimplements the same disclosure
 * pattern as a button + measured-height panel, GSAP-tweened.
 *
 * Rebuilding the accessibility <details> gave for free is the actual
 * risk here, not the animation: a real <button> (native keyboard
 * activation + focus handling) with aria-expanded/aria-controls wired
 * to the panel's id, closed by default — same semantics, just custom
 * markup instead of a browser built-in. Verified against the same
 * zero-axe-violations bar as every other section (see Phase 6 QA).
 */
export function FAQAnimated({ question, answer }: FAQAnimatedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const panelId = useId();

  const toggle = () => {
    const panel = panelRef.current;
    const opening = !isOpen;
    setIsOpen(opening);
    if (!panel) return;

    if (prefersReducedMotion()) {
      gsap.set(panel, { height: opening ? "auto" : 0 });
      if (chevronRef.current) gsap.set(chevronRef.current, { rotate: opening ? 180 : 0 });
      return;
    }

    gsap.killTweensOf(panel);
    if (opening) {
      // 0 -> measured scrollHeight -> "auto" (once settled, so a later
      // window resize or content change isn't stuck at a stale pixel
      // height — matches docs/GSAP_SCROLLTRIGGER_PLAN.md §4.11 exactly).
      gsap.fromTo(
        panel,
        { height: 0 },
        {
          height: panel.scrollHeight,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => gsap.set(panel, { height: "auto" }),
        }
      );
    } else {
      // Can't animate smoothly FROM "auto" — lock it to the current
      // pixel height first, then tween that down to 0.
      gsap.set(panel, { height: panel.scrollHeight });
      gsap.to(panel, { height: 0, duration: 0.4, ease: "power2.out" });
    }

    if (chevronRef.current) {
      gsap.to(chevronRef.current, { rotate: opening ? 180 : 0, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <div
      style={{
        background: "var(--color-surface-base)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-4) var(--space-5)",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
      }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          font: "inherit",
          fontWeight: 700,
          fontSize: "1rem",
          color: "#0f172a",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          textAlign: "left",
          lineHeight: 1.4,
        }}
      >
        <svg
          ref={chevronRef}
          aria-hidden="true"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-primary-accessible)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, transformOrigin: "center" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span>{question}</span>
      </button>
      <div id={panelId} ref={panelRef} role="region" aria-label={question} style={{ height: 0, overflow: "hidden" }}>
        <div
          style={{
            color: "var(--color-text-secondary)",
            marginTop: "var(--space-3)",
            paddingLeft: "var(--space-6)",
            fontSize: "var(--font-size-base)",
            lineHeight: 1.65,
          }}
        >
          <RichText text={answer} />
        </div>
      </div>
    </div>
  );
}
