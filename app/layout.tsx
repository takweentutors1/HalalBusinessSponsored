import type { Metadata } from "next";
import { Footer } from "@/components/shared/Footer";
import { siteUrl } from "@/lib/config";
import "./globals.css";

const title = "Halal Business Initiative";
const description =
  "A sponsored programme offering free, professional websites to selected Muslim-owned businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Halal Business Initiative",
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
