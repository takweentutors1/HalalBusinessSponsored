import { ScrollHeader } from "@/components/shared/ScrollHeader";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { SectionRadar } from "@/components/shared/SectionRadar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollHeader>
        <SiteHeader />
      </ScrollHeader>
      <SectionRadar />
      {children}
    </SmoothScrollProvider>
  );
}
