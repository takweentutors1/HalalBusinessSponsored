"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll-aware behavior (hide on fast downscroll, reveal on upscroll,
 * shadow once past the hero, plus a floating inset card on desktop via
 * the .ui-header-scroll-wrap/[data-scrolled] hooks in components.css)
 * bolted on from the *outside* — components/shared/SiteHeader.tsx itself
 * is never touched. That's a standing project rule (the header is
 * treated as stable/already-correct), not a stylistic choice, so new
 * header behavior always arrives as a wrapper like this one rather than
 * an edit to SiteHeader.tsx.
 *
 * If the user prefers reduced motion, this renders as an inert sticky
 * wrapper — no hide/show tween, no shadow tween, [data-scrolled] never
 * set — so the header just behaves like a plain `position: sticky`
 * header (desktop still gets the static floating-card look from CSS,
 * just without the scroll-shrink).
 */
export function ScrollHeader({ children }: { children: ReactNode }) {
  const headerWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = headerWrapRef.current;
      if (!el || prefersReducedMotion()) return;

      let lastScrollY = window.scrollY;

      const trigger = ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const currentScrollY = self.scroll();
          const delta = currentScrollY - lastScrollY;

          // Drives the desktop floating-header shrink (see .ui-header-scroll-wrap
          // in components.css) independently of the hide/reveal branches below.
          el.dataset.scrolled = currentScrollY > 40 ? "true" : "false";

          if (currentScrollY > 120 && delta > 4) {
            gsap.to(el, {
              yPercent: -100,
              duration: 0.35,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          } else if (delta < -4 || currentScrollY <= 120) {
            gsap.to(el, {
              yPercent: 0,
              duration: 0.3,
              ease: "power2.out",
              boxShadow:
                currentScrollY > 40
                  ? "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
                  : "none",
              overwrite: "auto",
            });
          }
          lastScrollY = currentScrollY;
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
