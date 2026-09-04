import type { HTMLAttributes } from "react";

export type BadgeVariant = "primary" | "success" | "warning" | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "primary", className, ...props }: BadgeProps) {
  const classes = ["ui-badge", `ui-badge-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} {...props} />;
}
