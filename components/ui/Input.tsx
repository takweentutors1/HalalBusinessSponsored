import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...props }: InputProps) {
  const classes = ["ui-input", className].filter(Boolean).join(" ");

  return <input className={classes} aria-invalid={error || undefined} {...props} />;
}
