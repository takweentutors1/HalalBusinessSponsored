import { ScrollHeader } from "@/components/shared/ScrollHeader";
import { SiteHeader } from "@/components/shared/SiteHeader";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollHeader>
        <SiteHeader />
      </ScrollHeader>
      {children}
    </>
  );
}
