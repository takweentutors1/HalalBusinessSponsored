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
