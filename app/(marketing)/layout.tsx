import { ScrollHeader } from "@/components/shared/ScrollHeader";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { SectionRadar } from "@/components/shared/SectionRadar";
import { MobileScrollProgress } from "@/components/shared/MobileScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <MobileScrollProgress />
      <ScrollHeader>
        <SiteHeader />
      </ScrollHeader>
      <SectionRadar />
      {children}
      <BackToTop />
    </SmoothScrollProvider>
  );
}
