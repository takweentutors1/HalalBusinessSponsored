"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Inlines public/images/hero-map-bg.svg as JSX (not <img>) so GSAP can
 * target individual paths/nodes directly by class, and animates it on
 * mount — draws the dashed pathway in via strokeDashoffset, pops the
 * milestone/network nodes in with an elastic ease, then sets the nodes
 * drifting in a slow float loop.
 *
 * Uses gsap.from() rather than gsap.fromTo()/gsap.set() + static
 * opacity="0" markup: if prefersReducedMotion() short-circuits (or a
 * script error ever stops this running), the SVG just renders at its
 * authored default appearance — fully visible — instead of getting
 * stuck permanently hidden behind a pre-animation state that only
 * GSAP itself would ever clear. Same fail-safe pattern as
 * GSAPReveal.tsx.
 *
 * Purely decorative background art (aria-hidden) — the icons/labels in
 * it aren't real content, matching how Hero.tsx's own browser mockup
 * graphic is treated.
 */
export function HeroMapAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!svgRef.current || prefersReducedMotion()) return;
      const svg = svgRef.current;

      // Solid gradient path has no authored dasharray — the classic
      // "line draws itself in" trick needs one set to the path's own
      // length first (a static value, not tweened), so the animated
      // dashoffset has a full-length dash to reveal.
      const drawPath = svg.querySelector<SVGPathElement>(".map-pathway-draw");
      if (drawPath) {
        const length = drawPath.getTotalLength();
        gsap.set(drawPath, { strokeDasharray: length });
        gsap.from(drawPath, {
          strokeDashoffset: length,
          opacity: 0,
          duration: 2.2,
          ease: "power2.out",
          delay: 0.4,
        });
      }

      // Dashed overlay already has its own "8 12" pattern authored —
      // leave that alone and only animate the offset, so the dashes
      // sweep in along the curve instead of the pattern being replaced
      // by one giant dash (which is what the same trick would do here).
      const dashPath = svg.querySelector<SVGPathElement>(".map-pathway-dash");
      if (dashPath) {
        const length = dashPath.getTotalLength();
        gsap.from(dashPath, {
          strokeDashoffset: length,
          opacity: 0,
          duration: 2.2,
          ease: "power2.out",
          delay: 0.4,
        });
      }

      const nodes = svg.querySelectorAll<SVGElement>(".map-node");
      gsap.from(nodes, {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.7)",
        delay: 0.9,
      });

      nodes.forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 === 0 ? 6 : -6,
          duration: 2.5 + i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.3 + i * 0.15,
        });
      });
    },
    { scope: svgRef }
  );

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        <defs>
          <filter id="heroMapGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroMapSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroMapIconBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>

          <linearGradient id="heroMapPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a8e6cf" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#086942" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a8e6cf" stopOpacity="0.15" />
          </linearGradient>

          <pattern id="heroMapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#a8e6cf" strokeWidth="0.3" strokeOpacity="0.2" />
          </pattern>
        </defs>

        {/* Subtle grid background */}
        <rect width="1200" height="800" fill="url(#heroMapGrid)" opacity="0.5" />

        {/* Left-side ambient progress icons — static texture, not animated */}
        <g transform="translate(140, 200)" filter="url(#heroMapIconBlur)" opacity="0.3">
          <rect x="-20" y="-25" width="40" height="50" rx="4" stroke="#086942" strokeWidth="1.5" fill="none" />
          <line x1="-12" y1="-15" x2="12" y2="-15" stroke="#086942" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="-12" y1="-7" x2="8" y2="-7" stroke="#086942" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="-12" y1="1" x2="12" y2="1" stroke="#086942" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="-12" y1="9" x2="6" y2="9" stroke="#086942" strokeWidth="1" strokeOpacity="0.4" />
        </g>
        <g transform="translate(100, 380)" filter="url(#heroMapIconBlur)" opacity="0.25">
          <circle cx="0" cy="0" r="22" stroke="#086942" strokeWidth="1.5" fill="none" />
          <polygon points="0,-15 4,0 0,15 -4,0" fill="#086942" fillOpacity="0.3" />
          <circle cx="0" cy="0" r="3" fill="#086942" fillOpacity="0.5" />
        </g>
        <g transform="translate(180, 540)" filter="url(#heroMapIconBlur)" opacity="0.25">
          <rect x="-20" y="-18" width="40" height="38" rx="4" stroke="#086942" strokeWidth="1.5" fill="none" />
          <line x1="-20" y1="-6" x2="20" y2="-6" stroke="#086942" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="-12" y1="-25" x2="-12" y2="-14" stroke="#086942" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="-25" x2="12" y2="-14" stroke="#086942" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="-12" y="0" width="8" height="6" rx="1" fill="#086942" fillOpacity="0.3" />
          <rect x="4" y="0" width="8" height="6" rx="1" fill="#086942" fillOpacity="0.2" />
          <rect x="-12" y="10" width="8" height="6" rx="1" fill="#086942" fillOpacity="0.2" />
        </g>
        <ellipse cx="140" cy="370" rx="100" ry="180" fill="#d7f5e4" opacity="0.25" filter="url(#heroMapSoftGlow)" />

        {/* Central curving pathway — animated: drawn in via strokeDashoffset */}
        <path
          className="map-pathway-draw"
          d="M -50,450 C 200,420 350,300 500,340 S 750,500 900,380 S 1100,250 1250,300"
          stroke="url(#heroMapPathGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="map-pathway-dash"
          d="M -50,450 C 200,420 350,300 500,340 S 750,500 900,380 S 1100,250 1250,300"
          stroke="#a8e6cf"
          strokeWidth="1"
          fill="none"
          strokeDasharray="8 12"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Pathway milestone dots — animated: pop in + float */}
        <circle className="map-node" cx="200" cy="400" r="4" fill="#10b981" opacity="0.7" filter="url(#heroMapGlow)" />
        <circle className="map-node" cx="500" cy="340" r="5" fill="#086942" opacity="0.8" filter="url(#heroMapGlow)" />
        <circle className="map-node" cx="900" cy="380" r="4" fill="#10b981" opacity="0.7" filter="url(#heroMapGlow)" />

        <line x1="188" y1="412" x2="212" y2="412" stroke="#086942" strokeWidth="1" opacity="0.4" />
        <line x1="488" y1="352" x2="512" y2="352" stroke="#086942" strokeWidth="1" opacity="0.4" />
        <line x1="888" y1="392" x2="912" y2="392" stroke="#086942" strokeWidth="1" opacity="0.4" />

        {/* Right-side network — static connection lines, animated nodes */}
        <ellipse cx="1000" cy="300" rx="160" ry="140" fill="#e3f8ee" opacity="0.3" filter="url(#heroMapSoftGlow)" />

        <line x1="920" y1="240" x2="1000" y2="200" stroke="#a8e6cf" strokeWidth="1" opacity="0.5" />
        <line x1="1000" y1="200" x2="1080" y2="250" stroke="#a8e6cf" strokeWidth="1" opacity="0.5" />
        <line x1="1080" y1="250" x2="1060" y2="340" stroke="#a8e6cf" strokeWidth="1" opacity="0.5" />
        <line x1="1060" y1="340" x2="960" y2="360" stroke="#a8e6cf" strokeWidth="1" opacity="0.5" />
        <line x1="960" y1="360" x2="920" y2="240" stroke="#a8e6cf" strokeWidth="1" opacity="0.5" />

        <line x1="1000" y1="200" x2="1060" y2="340" stroke="#a8e6cf" strokeWidth="0.5" opacity="0.3" />
        <line x1="920" y1="240" x2="1080" y2="250" stroke="#a8e6cf" strokeWidth="0.5" opacity="0.3" />
        <line x1="920" y1="240" x2="960" y2="360" stroke="#a8e6cf" strokeWidth="0.5" opacity="0.3" />
        <line x1="1000" y1="200" x2="960" y2="360" stroke="#a8e6cf" strokeWidth="0.5" opacity="0.25" />
        <line x1="1080" y1="250" x2="960" y2="360" stroke="#a8e6cf" strokeWidth="0.5" opacity="0.25" />

        {/* Network nodes — each outer+inner pair grouped so the float
            animation moves them together rather than desyncing them. */}
        <g className="map-node">
          <circle cx="1000" cy="200" r="8" fill="#086942" opacity="0.7" filter="url(#heroMapGlow)" />
          <circle cx="1000" cy="200" r="3" fill="#ffffff" opacity="0.9" />
        </g>
        <g className="map-node">
          <circle cx="1080" cy="250" r="6" fill="#10b981" opacity="0.6" filter="url(#heroMapGlow)" />
          <circle cx="1080" cy="250" r="2.5" fill="#ffffff" opacity="0.8" />
        </g>
        <g className="map-node">
          <circle cx="920" cy="240" r="6" fill="#10b981" opacity="0.6" filter="url(#heroMapGlow)" />
          <circle cx="920" cy="240" r="2.5" fill="#ffffff" opacity="0.8" />
        </g>
        <g className="map-node">
          <circle cx="1060" cy="340" r="7" fill="#086942" opacity="0.65" filter="url(#heroMapGlow)" />
          <circle cx="1060" cy="340" r="3" fill="#ffffff" opacity="0.85" />
        </g>
        <g className="map-node">
          <circle cx="960" cy="360" r="5" fill="#10b981" opacity="0.55" filter="url(#heroMapGlow)" />
          <circle cx="960" cy="360" r="2" fill="#ffffff" opacity="0.75" />
        </g>

        {/* Satellite nodes — static, secondary detail */}
        <circle cx="1040" cy="170" r="3" fill="#a8e6cf" opacity="0.5" />
        <circle cx="1120" cy="300" r="2.5" fill="#a8e6cf" opacity="0.4" />
        <circle cx="880" cy="300" r="2.5" fill="#a8e6cf" opacity="0.4" />
        <line x1="1040" y1="170" x2="1000" y2="200" stroke="#a8e6cf" strokeWidth="0.5" opacity="0.35" />
        <line x1="1120" y1="300" x2="1080" y2="250" stroke="#a8e6cf" strokeWidth="0.5" opacity="0.35" />
        <line x1="880" y1="300" x2="920" y2="240" stroke="#a8e6cf" strokeWidth="0.5" opacity="0.35" />

        {/* Decorative floating dots — static */}
        <circle cx="350" cy="150" r="2" fill="#a8e6cf" opacity="0.3" />
        <circle cx="650" cy="120" r="1.5" fill="#d7f5e4" opacity="0.4" />
        <circle cx="800" cy="600" r="2" fill="#a8e6cf" opacity="0.25" />
        <circle cx="450" cy="650" r="1.5" fill="#d7f5e4" opacity="0.3" />
        <circle cx="700" cy="200" r="1" fill="#10b981" opacity="0.2" />
      </svg>
    </div>
  );
}
