import {
  CategorizedSection,
  FAQ,
  FinalCta,
  Hero,
  LimitedCapacity,
  ListSection,
  PortfolioAndTestimonials,
  ProcessSteps,
  QualificationFit,
  StatsBar,
  WhySponsored,
} from "@/components/sections";
import {
  currentDigitalProblem,
  domainHostingCosts,
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
      <ListSection {...whoItsFor} variant="grid" tone="muted" />
      <ListSection {...currentDigitalProblem} variant="grid" />
      <ListSection {...whatTheWebsiteSolves} variant="grid" tone="tint" />
      <WhySponsored />
      <CategorizedSection {...whatsIncluded} />
      <CategorizedSection {...whatsOutsideScope} polarity="negative" tone="plain" />
      <ListSection {...domainHostingCosts} variant="grid" tone="muted" />
      <ListSection {...whatHappensAfterLaunch} variant="grid" />
      <QualificationFit qualifies={whoQualifies} notFit={whoIsNotAFit} />
      <LimitedCapacity />
      <ProcessSteps />
      <PortfolioAndTestimonials />
      <FAQ />
      <FinalCta />
    </>
  );
}
