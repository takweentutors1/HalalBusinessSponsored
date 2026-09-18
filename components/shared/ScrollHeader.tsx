"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Sticky wrapper around SiteHeader. Stays pinned on scroll on both
 * mobile and desktop (no hide-on-downscroll). Also drives the desktop
 * floating-card shrink/shadow via `.ui-header-scroll-wrap/[data-scrolled]`
 * in components.css.
 *
 * Bolted on from the outside — SiteHeader.tsx itself is never touched
 * (standing project rule: the header is treated as stable).
 *
 * If the user prefers reduced motion, [data-scrolled] still updates so
 * the CSS shrink still happens, but the shadow tween is skipped.
 */
export function ScrollHeader({ children }: { children: ReactNode }) {
  const headerWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = headerWrapRef.current;
      if (!el) return;

      gsap.set(el, { yPercent: 0, clearProps: "transform" });

      const trigger = ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const currentScrollY = self.scroll();
          el.dataset.scrolled = currentScrollY > 40 ? "true" : "false";

          if (prefersReducedMotion()) return;

          gsap.to(el, {
            boxShadow:
              currentScrollY > 40
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
                : "none",
            duration: 0.2,
            overwrite: "auto",
          });
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: headerWrapRef }
  );

  return (
    <div
      ref={headerWrapRef}
      className="ui-header-scroll-wrap"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "box-shadow 0.2s ease",
      }}
    >
      {children}
    </div>
  );
}
