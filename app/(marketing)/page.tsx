import { Hero, ListSection, WhySponsored } from "@/components/sections";
import {
  currentDigitalProblem,
  domainHostingCosts,
  whatTheWebsiteSolves,
  whatsIncluded,
  whatsOutsideScope,
  whoItsFor,
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
    </>
  );
}
