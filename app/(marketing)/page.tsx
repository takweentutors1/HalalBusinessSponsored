import {
  AfterLaunchCards,
  FAQ,
  FinalCta,
  Hero,
  InfoCallout,
  LimitedCapacity,
  ListSection,
  MidCta,
  PortfolioAndTestimonials,
  ProcessSteps,
  ProblemSolution,
  QualificationFit,
  ScopeComparison,
  StatsBar,
  WhySponsored,
} from "@/components/sections";
import { AudienceIllustration } from "@/components/illustrations";
import {
  BookIcon,
  BriefcaseIcon,
  HangerIcon,
  MeatIcon,
  PlatformIconPair,
  RingsIcon,
  ScissorsIcon,
  UtensilsIcon,
} from "@/components/icons";
import {
  applyCtaMidPage,
  domainHostingCosts,
  qualifyCta,
  whatHappensAfterLaunch,
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

      {/* Who It's For — grid of icon cards with shadows */}
      <ListSection
        {...whoItsFor}
        variant="grid"
        tone="muted"
        cardStyle="boxed"
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

      {/* Problem → Solution side-by-side comparison table */}
      <ProblemSolution />

      <WhySponsored />

      <ScopeComparison
        included={whatsIncluded}
        addOns={whatsOutsideScope}
      />

      <MidCta {...qualifyCta} tone="tint" />

      <InfoCallout />

      <AfterLaunchCards />

      <QualificationFit qualifies={whoQualifies} notFit={whoIsNotAFit} />

      <MidCta {...applyCtaMidPage} tone="tint" />

      <LimitedCapacity />
      <ProcessSteps />
      <PortfolioAndTestimonials />
      <FAQ />
      <FinalCta />
    </>
  );
}
