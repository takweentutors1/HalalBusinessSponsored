"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface AmbientParallaxBgProps {
  /** Path to SVG in public/ (e.g. "/images/bg-problem.svg") */
  src: string;
  /** Opacity of the background layer (0 to 1, default: 0.8) */
  opacity?: number;
  /** Parallax intensity as a percentage shift (default: 12) */
  shiftPercent?: number;
  /** Optional custom styling on the outer container */
  className?: string;
  /** Optional style overrides for background sizing */
  backgroundSize?: string;
  /** Optional style overrides for background position */
  backgroundPosition?: string;
}

/**
 * AmbientParallaxBg — renders an ambient background layer behind a section
 * that drifts vertically at a fraction of the scroll velocity using GSAP
 * ScrollTrigger scrub.
 *
 * Performance & Design Safeguards:
 * 1. pointer-events: none and aria-hidden="true" (zero accessibility impact).
 * 2. Positioned absolutely with z-index: 0, staying behind all interactive elements.
 * 3. yPercent transform utilizes GPU layer compositing (will-change: transform).
 * 4. Respects prefersReducedMotion: disables parallax translation if active.
 */
export function AmbientParallaxBg({
  src,
  opacity = 0.8,
  shiftPercent = 12,
  className = "",
  backgroundSize = "contain",
  backgroundPosition = "center center",
}: AmbientParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !layerRef.current || !containerRef.current) return;

      gsap.fromTo(
        layerRef.current,
        { yPercent: -shiftPercent },
        {
          yPercent: shiftPercent,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [shiftPercent] }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={["ambient-parallax-wrap", className].filter(Boolean).join(" ")}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        ref={layerRef}
        style={{
          position: "absolute",
          top: "-15%",
          left: 0,
          right: 0,
          height: "130%",
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition,
          backgroundSize,
          opacity,
          willChange: "transform",
        }}
      />
    </div>
  );
}
