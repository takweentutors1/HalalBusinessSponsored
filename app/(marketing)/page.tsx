import {
  CategorizedSection,
  FAQ,
  FinalCta,
  Hero,
  LimitedCapacity,
  ListSection,
  MidCta,
  PortfolioAndTestimonials,
  ProcessSteps,
  QualificationFit,
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
        illustration={<ProblemIllustration />}
        itemIcons={[<PlatformIconPair key="instagram-whatsapp" />]}
      />
      <ListSection {...whatTheWebsiteSolves} variant="grid" tone="tint" />
      <WhySponsored />
      <CategorizedSection
        {...whatsIncluded}
        categoryItemIcons={{
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
      <CategorizedSection {...whatsOutsideScope} polarity="negative" tone="plain" />
      <MidCta {...qualifyCta} tone="tint" />
      <ListSection {...domainHostingCosts} variant="grid" tone="muted" />
      <ListSection {...whatHappensAfterLaunch} variant="grid" />
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
