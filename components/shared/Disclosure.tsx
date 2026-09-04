import type { HTMLAttributes } from "react";

export interface DisclosureProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

/**
 * Renders one of the three disclosure placements (footer, Terms page top,
 * near the apply-form submit button) from a single shared component so
 * wording can't drift between locations. Text always comes from
 * lib/config.ts's `disclosure` object, never inlined at the call site.
 */
export function Disclosure({ text, className, ...props }: DisclosureProps) {
  const classes = ["ui-hint", className].filter(Boolean).join(" ");

  return (
    <p className={classes} {...props}>
      {text}
    </p>
  );
}
