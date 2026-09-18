"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Fixed header wrapper — `position: sticky` still scrolls away on some
 * mobile browsers when body has overflow-x clipping (and with Lenis).
 * Fixed keeps the bar on screen; a spacer holds the layout gap so
 * content is not hidden underneath.
 *
 * Also drives the desktop floating-card shrink via
 * `.ui-header-scroll-wrap/[data-scrolled]` in components.css.
 */
export function ScrollHeader({ children }: { children: ReactNode }) {
  const headerWrapRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = headerWrapRef.current;
      if (!el) return;

      const trigger = ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          el.dataset.scrolled = self.scroll() > 40 ? "true" : "false";
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: headerWrapRef }
  );

  useEffect(() => {
    const el = headerWrapRef.current;
    const spacer = spacerRef.current;
    if (!el || !spacer) return;

    const syncHeight = () => {
      spacer.style.height = `${el.offsetHeight}px`;
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    window.addEventListener("resize", syncHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, []);

  return (
    <>
      <div
        ref={headerWrapRef}
        className="ui-header-scroll-wrap"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {children}
      </div>
      <div ref={spacerRef} className="ui-header-scroll-spacer" aria-hidden="true" />
    </>
  );
}
