import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/shared/Footer";
import { brand, siteUrl } from "@/lib/config";
import "./globals.css";

const title = brand.name;
const description =
  "A free programme offering professional websites to selected Muslim-owned businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${brand.name}`,
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#047857",
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
