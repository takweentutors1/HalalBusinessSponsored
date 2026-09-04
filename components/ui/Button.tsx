import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

interface SharedProps {
  variant?: ButtonVariant;
}

export type ButtonProps = SharedProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = ["ui-btn", `ui-btn-${variant}`, className].filter(Boolean).join(" ");

  if (props.href !== undefined) {
    const { href, ...rest } = props as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return <Link href={href} className={classes} {...rest} />;
  }

  const { type = "button", ...rest } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={type} className={classes} {...rest} />;
}
