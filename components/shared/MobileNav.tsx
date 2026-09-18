"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { DEFAULT_HEADER_NAV_ITEMS, type HeaderNavItem } from "./HeaderNav";
import { brand } from "@/lib/config";

interface MobileNavProps {
  items?: HeaderNavItem[];
}

/**
 * Mobile-only overlay menu. Desktop keeps HeaderNav's horizontal pill row
 * (hidden below 640px). This panel is the mobile equivalent: a rounded
 * card with a vertical link list, matching the same items so the two
 * never drift.
 */
export function MobileNav({ items = DEFAULT_HEADER_NAV_ITEMS }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    void import("./SmoothScrollProvider").then(({ getLenis }) => {
      getLenis()?.stop();
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      void import("./SmoothScrollProvider").then(({ getLenis }) => {
        getLenis()?.start();
      });
      document.body.style.overflow = previousOverflow;
      toggleRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const sectionHref = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <div ref={rootRef} className="ui-mobile-nav" data-open={open}>
      <Link
        href="/apply"
        className="ui-mobile-nav-apply"
        aria-label="Apply Now"
      >
        <ApplyIcon />
      </Link>
      <button
        ref={toggleRef}
        type="button"
        className="ui-mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="ui-mobile-nav-sheet"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="ui-mobile-nav-bar" data-open={open} />
        <span className="ui-mobile-nav-bar" data-open={open} />
        <span className="ui-mobile-nav-bar" data-open={open} />
      </button>

      {open ? (
        <>
          <div
            className="ui-mobile-nav-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            id="ui-mobile-nav-sheet"
            className="ui-mobile-nav-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
        <div className="ui-mobile-nav-sheet-top">
          <Link
            href="/"
            aria-label={`${brand.name} — home`}
            className="ui-mobile-nav-sheet-logo"
            onClick={() => setOpen(false)}
          >
            <Logo size={32} showWordmark gradientId="logoGradientMobileNav" />
          </Link>
          <div className="ui-mobile-nav-sheet-actions">
            <Link
              href="/apply"
              className="ui-mobile-nav-apply"
              aria-label="Apply Now"
              onClick={() => setOpen(false)}
            >
              <ApplyIcon />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="ui-mobile-nav-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <ul className="ui-mobile-nav-list">
          <li>
            <Link href="/" className="ui-mobile-nav-link" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={sectionHref(item.id)}
                className="ui-mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}

function ApplyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.5 19.2c.7-3.2 3.3-5.2 6.5-5.2s5.8 2 6.5 5.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
