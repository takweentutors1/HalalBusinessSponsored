"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export interface UseSectionSpyOptions {
  /** Section element ids to track. */
  ids: string[];
  /**
   * Viewport band that counts as "active", in ScrollTrigger's own
   * start/end position syntax. Defaults mirror the "-20% 0px -70% 0px"
   * rootMargin band used by the IntersectionObserver-based spies in
   * HeaderNav.tsx/SectionRadar.tsx (a thin band between 20% and 30%
   * down from the top of the viewport), so swapping either of those
   * over to this hook later wouldn't change which section reads as
   * active at a given scroll position.
   */
  start?: string;
  end?: string;
}

/**
 * ScrollTrigger-based alternative to an IntersectionObserver spy: one
 * ScrollTrigger per tracked id, each just watching whether its section
 * is inside the active band — no separate observer/scroll-listener
 * running alongside whatever other ScrollTriggers the page already
 * has. Once a section enters the band it stays "active" until another
 * one enters (same last-matched-wins semantics as the IO-based spies;
 * leaving a band doesn't clear activeId on its own), so there's no gap
 * between sections where nothing reads as active.
 */
export function useSectionSpy({ ids, start = "top 20%", end = "bottom 30%" }: UseSectionSpyOptions): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const triggers = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start,
          end,
          onToggle: (self) => {
            if (self.isActive) setActiveId(id);
          },
        });
      })
      .filter((t): t is ScrollTrigger => t !== null);

    return () => {
      for (const t of triggers) t.kill();
    };
  }, [ids, start, end]);

  return activeId;
}
