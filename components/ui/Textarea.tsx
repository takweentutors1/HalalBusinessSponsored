import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className, rows = 4, ...props }: TextareaProps) {
  const classes = ["ui-textarea", className].filter(Boolean).join(" ");

  return (
    <textarea
      className={classes}
      rows={rows}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}
