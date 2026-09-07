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
      <ListSection {...whoItsFor} variant="grid" tone="muted" illustration={<AudienceIllustration />} />
      <ListSection {...currentDigitalProblem} variant="grid" illustration={<ProblemIllustration />} />
      <ListSection {...whatTheWebsiteSolves} variant="grid" tone="tint" />
      <WhySponsored />
      <CategorizedSection {...whatsIncluded} />
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
