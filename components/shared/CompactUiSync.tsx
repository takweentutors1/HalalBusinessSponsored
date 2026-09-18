"use client";

import { useLayoutEffect } from "react";

function isCompactUi() {
  return (
    window.innerWidth < 1024 ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/**
 * Marks <html data-compact-ui> before paint so mobile never shows the
 * desktop horizontal pills / side radar, even when the CSS viewport is
 * reported wider than a phone (landscape, missing device-width, etc.).
 */
export function CompactUiSync() {
  useLayoutEffect(() => {
    const apply = () => {
      document.documentElement.dataset.compactUi = isCompactUi() ? "true" : "false";
    };
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  return null;
}

export function shouldUseSmoothScroll() {
  if (typeof window === "undefined") return false;
  return !isCompactUi();
}
