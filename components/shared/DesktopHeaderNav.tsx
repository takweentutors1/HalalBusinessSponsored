"use client";

import { useLayoutEffect, useState } from "react";
import { HeaderNav } from "./HeaderNav";

/**
 * Desktop-only horizontal pills. Rendered after layout so phones never
 * get the in-page horizontal / vertical desktop nav in the DOM.
 */
export function DesktopHeaderNav() {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    const compact =
      document.documentElement.dataset.compactUi === "true" ||
      window.innerWidth < 1024 ||
      navigator.maxTouchPoints > 0;
    setShow(!compact);
  }, []);

  if (!show) return null;

  return (
    <div className="ui-header-nav-link">
      <HeaderNav />
    </div>
  );
}
