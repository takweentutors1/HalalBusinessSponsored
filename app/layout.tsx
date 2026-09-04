import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Halal Business Initiative",
  description: "A sponsored programme offering free, professional websites to selected Muslim-owned businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
