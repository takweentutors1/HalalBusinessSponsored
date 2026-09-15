import { GSAPReveal } from "@/components/shared/GSAPReveal";
import { Reveal } from "@/components/shared/Reveal";
import {
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
      <div id="the-problem">
        <ProblemSection />
      </div>

      {/* 3. Problem and Its Solution — GSAP-driven internal reveal
          (collision entrance), same reasoning as ProblemSection above. */}
      <div id="solution">
        <ProblemSolution />
      </div>

      {/* Agency build vs £0 — see marketValueComparison.approved gate.
          GSAP-driven internal reveal, same reasoning as ProblemSection above.
          Already carries id="value-comparison" internally (valueComparison.id
          in ValueComparison.tsx) — no wrapper id needed here. */}
      <ValueComparison />

      {/* GSAP-driven internal reveal, same reasoning as above. */}
      <div id="built-to-feel">
        <BuiltToFeel />
      </div>

      {/* 4. Why It's Sponsored — GSAP-driven internal reveal (panels sliding
          in from left/right), same reasoning as above. Already carries
          id="why-its-sponsored" internally — no wrapper id needed. */}
      <WhySponsored />

      {/* 5. What You Get (Scope Comparison) — GSAP-driven internal reveal,
          same reasoning as above. */}
      <div id="scope">
        <ScopeComparison included={whatsIncluded} addOns={whatsOutsideScope} />
      </div>

      {/* 7. Who It's For (Qualification Fit) — GSAP-driven internal reveal
          (left/right cascade), same reasoning as above. Already carries
          id="who-qualifies" internally — no wrapper id needed. */}
      <QualificationFit qualifies={whoQualifies} notFit={whoIsNotAFit} />

      {/* Limited Capacity — server component (real D1 read), so it can't
          have its own useGSAP hook; GSAPReveal wraps the server-rendered
          children instead, same "wrap, don't convert" pattern as every
          other server-component boundary in this app. GSAPReveal forwards
          its id prop straight to the wrapper div, so no extra element needed. */}
      <GSAPReveal id="capacity" variant="scale-up">
        <LimitedCapacity />
      </GSAPReveal>

      {/* 8. How It Works — GSAP-driven internal reveal (step cards +
          scrubbed progress beam), same reasoning as above. Already carries
          id="how-it-works" internally — no wrapper id needed. */}
      <ProcessSteps />

      <Reveal>
        <PortfolioAndTestimonials />
      </Reveal>

      {/* 9. FAQ — <Reveal> doesn't forward an id prop, so the id lives on a
          plain wrapper div instead (kept within page.tsx rather than editing
          Reveal.tsx itself). */}
      <div id="faq">
        <Reveal>
          <FAQ />
        </Reveal>
      </div>

      {/* 10. Ready to Apply — GSAP-driven internal reveal (the reassurance
          chips stagger in themselves), same reasoning as Phase 4's sections. */}
      <FinalCta />
    </>
  );
}
