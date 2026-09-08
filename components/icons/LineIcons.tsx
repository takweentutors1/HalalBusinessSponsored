import type { SVGProps } from "react";

/**
 * Small set of self-authored, Lucide-style line icons (24x24, currentColor
 * stroke) used to anchor business-category and feature list items so they
 * scan faster than a uniform checkmark. Not the Lucide package itself —
 * hand-drawn to match, so there's no extra dependency for a dozen glyphs.
 */
interface IconProps {
  size?: number;
}

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function UtensilsIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <path d="M6 2v7a2 2 0 0 0 2 2v11" />
      <path d="M6 2v7" />
      <path d="M9 2v7" />
      <path d="M16 2c-1.5 1-2 3-2 5s.5 4 2 5v10" />
    </svg>
  );
}

export function MeatIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <path d="M4 4l7 7" />
      <path d="M20.5 3.5c-4-1-9 1-11.7 3.7a5 5 0 1 0 7 7c2.7-2.7 4.7-7.7 3.7-11.7-3-2 0 0 0 0Z" />
      <circle cx="7" cy="17" r="3" />
    </svg>
  );
}

export function ScissorsIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="8.5" y1="7.5" x2="20" y2="19" />
      <line x1="8.5" y1="16.5" x2="20" y2="5" />
    </svg>
  );
}

export function BookIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <path d="M4 5c3-1.5 6-1.5 8 0v14c-2-1.5-5-1.5-8 0Z" />
      <path d="M20 5c-3-1.5-6-1.5-8 0v14c2-1.5 5-1.5 8 0Z" />
    </svg>
  );
}

export function RingsIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M9 9.5 11 4h2l2 5.5" />
    </svg>
  );
}

export function HangerIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 6.4v2" />
      <path d="M12 8.4 4 14.5c-1 .8-.5 2.5.8 2.5h14.4c1.3 0 1.8-1.7.8-2.5Z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
      <line x1="3" y1="12.5" x2="21" y2="12.5" />
    </svg>
  );
}

export function MapPinIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function ClipboardIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2.5" width="6" height="3" rx="1" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="14" y2="15" />
    </svg>
  );
}

export function GalleryIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <rect x="3" y="6" width="15" height="15" rx="2" />
      <path d="M3 16l4-4 3 3 5-5 3 3" />
      <circle cx="9" cy="10" r="1.4" fill="currentColor" stroke="none" />
      <path d="M8 3h11a2 2 0 0 1 2 2v11" />
    </svg>
  );
}

export function StarIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.5l-5.8 3 1.1-6.5-4.8-4.6 6.6-.9Z" />
    </svg>
  );
}

export function MonitorIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="6" y1="8.5" x2="14" y2="8.5" />
      <line x1="6" y1="12" x2="11" y2="12" />
    </svg>
  );
}

export function BadgeCheckIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <path d="M12 2.5l2.2 1.3 2.5-.3 1 2.3 2.3 1-.3 2.5 1.3 2.2-1.3 2.2.3 2.5-2.3 1-1 2.3-2.5-.3L12 21.5l-2.2-1.3-2.5.3-1-2.3-2.3-1 .3-2.5-1.3-2.2 1.3-2.2-.3-2.5 2.3-1 1-2.3 2.5.3Z" />
      <path d="M8.5 12.3l2.3 2.3 4.7-4.8" />
    </svg>
  );
}

export function TagIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <path d="M12.6 3H5.8A2.8 2.8 0 0 0 3 5.8v6.8c0 .5.2 1 .6 1.4l9 9a2 2 0 0 0 2.8 0l7.4-7.4a2 2 0 0 0 0-2.8l-9-9a2 2 0 0 0-1.2-.8Z" />
      <circle cx="8.5" cy="8.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PagesIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <rect x="5.5" y="2.5" width="13" height="19" rx="1.8" />
      <path d="M9 8h6M9 12h6M9 16h3.5" />
    </svg>
  );
}

export function RefreshIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} {...base}>
      <path d="M20.5 11.5a8.5 8.5 0 1 0-2.4 6.9" />
      <path d="M20.5 4.5v6.5H14" />
    </svg>
  );
}
