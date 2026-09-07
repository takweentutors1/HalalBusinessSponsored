import {
  FAQ,
  FinalCta,
  Hero,
  LimitedCapacity,
  ListSection,
  MidCta,
  PortfolioAndTestimonials,
  ProcessSteps,
  QualificationFit,
  ScopeComparison,
  StatsBar,
  WhySponsored,
} from "@/components/sections";
import { AudienceIllustration, ProblemIllustration } from "@/components/illustrations";
import {
  BadgeCheckIcon,
  BookIcon,
  BriefcaseIcon,
  ClipboardIcon,
  GalleryIcon,
  HangerIcon,
  MapPinIcon,
  MeatIcon,
  PlatformIconPair,
  RingsIcon,
  ScissorsIcon,
  StarIcon,
  UtensilsIcon,
  WhatsAppIcon,
} from "@/components/icons";
import {
  applyCtaMidPage,
  currentDigitalProblem,
  domainHostingCosts,
  qualifyCta,
  whatHappensAfterLaunch,
  whatTheWebsiteSolves,
  whatsIncluded,
  whatsOutsideScope,
  whoIsNotAFit,
  whoItsFor,
  whoQualifies,
} from "@/lib/content/landing";

// LimitedCapacity reads a real, live count from D1 (spots remaining this
// month) — force-dynamic so that's re-read on every request instead of
// being frozen at build time, which is what would silently happen
// otherwise since D1 access isn't part of Next's fetch()-based static
// analysis.
export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ListSection
        {...whoItsFor}
        variant="grid"
        tone="muted"
        cardStyle="flush"
        illustration={<AudienceIllustration />}
        itemIcons={[
          <UtensilsIcon key="restaurants" />,
          <MeatIcon key="butchers" />,
          <ScissorsIcon key="salons" />,
          <BookIcon key="education" />,
          <RingsIcon key="wedding" />,
          <HangerIcon key="fashion" />,
          <BriefcaseIcon key="professional" />,
        ]}
      />
      <ListSection
        {...currentDigitalProblem}
        variant="grid"
        cardStyle="accent"
        illustration={<ProblemIllustration />}
        itemIcons={[<PlatformIconPair key="instagram-whatsapp" />]}
      />
      <ListSection {...whatTheWebsiteSolves} variant="stack" tone="tint" />
      <WhySponsored />
      <ScopeComparison
        included={whatsIncluded}
        addOns={whatsOutsideScope}
        includedItemIcons={{
          Features: [
            <ClipboardIcon key="business-info" />,
            <WhatsAppIcon key="whatsapp-cta" />,
            <MapPinIcon key="maps" />,
            <GalleryIcon key="gallery" />,
            <StarIcon key="testimonials" />,
            <BadgeCheckIcon key="credentials" />,
          ],
        }}
      />
      <MidCta {...qualifyCta} tone="tint" />
      <ListSection {...domainHostingCosts} variant="stack" tone="muted" />
      <ListSection
        {...whatHappensAfterLaunch}
        variant="grid"
        cardStyle="tinted"
        tintColor="var(--color-surface-base)"
      />
      <QualificationFit qualifies={whoQualifies} notFit={whoIsNotAFit} />
      <MidCta {...applyCtaMidPage} tone="plain" />
      <LimitedCapacity />
      <ProcessSteps />
      <PortfolioAndTestimonials />
      <FAQ />
      <FinalCta />
    </>
  );
}
