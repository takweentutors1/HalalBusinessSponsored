import { GSAPReveal } from "@/components/shared/GSAPReveal";
import { Reveal } from "@/components/shared/Reveal";
import {
  AfterLaunchCards,
  BuiltToFeel,
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
  ValueComparison,
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
      {/* 1. Hero — not wrapped in Reveal: loads immediately, matching the
          docs/index.html redesign (only sections below the hero fade in). */}
      <Hero />

      {/* 2. Explain Problem — GSAP-driven internal reveal (ProblemSection.tsx),
          not wrapped in <Reveal>: stacking the plain CSS block-fade on top
          of the section's own ScrollTrigger stagger would double-animate it. */}
      <ProblemSection />

      {/* 3. Problem and Its Solution — GSAP-driven internal reveal
          (collision entrance), same reasoning as ProblemSection above. */}
      <ProblemSolution />

      {/* Agency build vs £0 — see marketValueComparison.approved gate.
          GSAP-driven internal reveal, same reasoning as ProblemSection above. */}
      <ValueComparison />

      {/* GSAP-driven internal reveal, same reasoning as above. */}
      <BuiltToFeel />

      {/* 4. Why It's Sponsored — GSAP-driven internal reveal (glyph spin +
          panels converging from center), same reasoning as above. */}
      <WhySponsored />

      {/* 5. What You Get (Scope Comparison) — GSAP-driven internal reveal,
          same reasoning as above. */}
      <ScopeComparison included={whatsIncluded} addOns={whatsOutsideScope} />

      {/* 6. After Launch — GSAP-driven internal reveal (quickTo tilt cards +
          staggered entrance), same reasoning as above. */}
      <AfterLaunchCards />

      {/* 7. Who It's For (Qualification Fit) — GSAP-driven internal reveal
          (left/right cascade), same reasoning as above. */}
      <QualificationFit qualifies={whoQualifies} notFit={whoIsNotAFit} />

      {/* Limited Capacity — server component (real D1 read), so it can't
          have its own useGSAP hook; GSAPReveal wraps the server-rendered
          children instead, same "wrap, don't convert" pattern as every
          other server-component boundary in this app. */}
      <GSAPReveal variant="scale-up">
        <LimitedCapacity />
      </GSAPReveal>

      {/* 8. How It Works — GSAP-driven internal reveal (step cards +
          scrubbed progress beam), same reasoning as above. */}
      <ProcessSteps />

      <Reveal>
        <PortfolioAndTestimonials />
      </Reveal>

      {/* 9. FAQ */}
      <Reveal>
        <FAQ />
      </Reveal>

      {/* 10. Ready to Apply — GSAP-driven internal reveal (the reassurance
          chips stagger in themselves), same reasoning as Phase 4's sections. */}
      <FinalCta />
    </>
  );
}
