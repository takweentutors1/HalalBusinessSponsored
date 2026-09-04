import type { SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({ error, className, children, ...props }: SelectProps) {
  const classes = ["ui-input", className].filter(Boolean).join(" ");

  return (
    <select className={classes} aria-invalid={error || undefined} {...props}>
      {children}
    </select>
  );
}
