import {
  AfterLaunchCards,
  FAQ,
  FinalCta,
  Hero,
  LimitedCapacity,
  PortfolioAndTestimonials,
  ProblemSection,
  ProcessSteps,
  ProblemSolution,
  QualificationFit,
  ScopeComparison,
  WhySponsored,
} from "@/components/sections";
import {
  whatsIncluded,
  whatsOutsideScope,
  whoIsNotAFit,
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
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Explain Problem */}
      <ProblemSection />

      {/* 3. Problem and Its Solution */}
      <ProblemSolution />

      {/* 4. Why It's Sponsored */}
      <WhySponsored />

      {/* 5. What You Get (Scope Comparison) */}
      <ScopeComparison
        included={whatsIncluded}
        addOns={whatsOutsideScope}
      />

      {/* 6. After Launch */}
      <AfterLaunchCards />

      {/* 7. Who It's For (Qualification Fit) */}
      <QualificationFit qualifies={whoQualifies} notFit={whoIsNotAFit} />

      {/* Limited Capacity */}
      <LimitedCapacity />

      {/* 8. How It Works */}
      <ProcessSteps />

      <PortfolioAndTestimonials />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. Ready to Apply */}
      <FinalCta />
    </>
  );
}
