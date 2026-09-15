"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Thin fill bar pinned to the very top of the viewport, tracking overall
 * page scroll progress — the mobile-native alternative to SectionRadar's
 * dot rail (SectionRadar is tablet/desktop only, hidden below 640px; see
 * app/globals.css). Fixed above the header (SiteHeader/ScrollHeader sit
 * at zIndex 100) so it stays visible even while the header hides itself
 * on downscroll.
 *
 * Not gated behind prefersReducedMotion() for the same reason as
 * SectionRadar's rail fill: `scrub: true` ties the fill directly 1:1 to
 * scroll position (no independent eased animation of its own) and it
 * carries real information (how far down the page you are), not
 * decoration.
 */
export function MobileScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(fill, { scaleX: self.progress });
      },
    });

    return () => {
      trigger.kill();
    };
  });

  return (
    <div
      className="mobile-scroll-progress"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 101,
        background: "var(--color-border-light)",
      }}
    >
      <div
        ref={fillRef}
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, var(--color-primary-accessible), var(--color-accent))",
        }}
      />
    </div>
  );
}
