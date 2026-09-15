"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export interface CapacityRingAnimatedProps {
  total: number;
  remaining: number;
}

/**
 * GSAP/ScrollTrigger replacement for CapacityRing.tsx's CSS
 * @keyframes-driven draw-in (styles/components.css's
 * ui-capacity-ring-draw / ui-capacity-number-in, now removed — see
 * docs/GSAP_SCROLLTRIGGER_PLAN.md §6.2's CSS cleanup map). Same SVG
 * geometry, same data flow: LimitedCapacity.tsx stays the async server
 * component doing the real D1 read (getAcceptedCountThisMonth) and
 * passes the already-computed remaining/total down as plain props —
 * this component only owns the client-side draw/count animation.
 *
 * The ring's strokeDashoffset and the number's text content are both
 * rendered at their correct final values by default (not hidden/zeroed)
 * — gsap.from() reads that correct value as its animation target, so a
 * skipped animation (reduced motion, no JS, a script error) just means
 * the ring shows the right data immediately with no draw-in, never an
 * incorrect or stuck-hidden state. The count-up number tween has no
 * DOM-attribute equivalent to piggyback on the same way, so its
 * reduced-motion case is a plain early return instead.
 */
export function CapacityRingAnimated({ total, remaining }: CapacityRingAnimatedProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const filledFraction = remaining / total;
  const offset = circumference * (1 - filledFraction);

  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const numberRef = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !svgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 80%", toggleActions: "play none none none" },
      });

      if (circleRef.current) {
        tl.from(circleRef.current, { strokeDashoffset: circumference, duration: 1.2, ease: "power2.out" }, 0);
      }

      if (numberRef.current) {
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: remaining,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              if (numberRef.current) numberRef.current.textContent = String(Math.round(counter.val));
            },
          },
          0
        );
      }
    },
    { scope: svgRef, dependencies: [total, remaining, circumference] }
  );

  return (
    <svg
      ref={svgRef}
      width={120}
      height={120}
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${remaining} of ${total} spots remaining this month`}
      style={{ margin: "0 auto", display: "block" }}
    >
      <defs>
        <linearGradient id="capacityRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent-dark)" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--color-border-light)" strokeWidth="10" />

      <circle
        ref={circleRef}
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="url(#capacityRingGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
      />

      <text
        ref={numberRef}
        x="60"
        y="56"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="30"
        fontWeight={900}
        fill="var(--color-accent)"
      >
        {remaining}
      </text>
      <text x="60" y="75" textAnchor="middle" fontSize="13" fill="var(--color-text-tertiary)">
        of {total} left
      </text>
    </svg>
  );
}
