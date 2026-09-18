import { ScrollHeader } from "@/components/shared/ScrollHeader";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { CompactUiSync } from "@/components/shared/CompactUiSync";
import { SectionRadar } from "@/components/shared/SectionRadar";
import { MobileScrollProgress } from "@/components/shared/MobileScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CompactUiSync />
      <MobileScrollProgress />
      <ScrollHeader>
        <SiteHeader />
      </ScrollHeader>
      <SectionRadar />
      <div className="ui-app-main">{children}</div>
      <BackToTop />
    </SmoothScrollProvider>
  );
}
