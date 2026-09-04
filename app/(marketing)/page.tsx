import {
  FAQ,
  FinalCta,
  Hero,
  LimitedCapacity,
  ListSection,
  PortfolioAndTestimonials,
  ProcessSteps,
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
      <ListSection {...whoItsFor} />
      <ListSection {...currentDigitalProblem} />
      <ListSection {...whatTheWebsiteSolves} />
      <WhySponsored />
      <ListSection {...whatsIncluded} />
      <ListSection {...whatsOutsideScope} />
      <ListSection {...domainHostingCosts} />
      <ListSection {...whatHappensAfterLaunch} />
      <ListSection {...whoQualifies} />
      <ListSection {...whoIsNotAFit} />
      <LimitedCapacity />
      <ProcessSteps />
      <PortfolioAndTestimonials />
      <FAQ />
      <FinalCta />
    </>
  );
}
