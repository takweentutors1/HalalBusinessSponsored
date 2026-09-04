/**
 * Landing page copy, data-driven per the brief's 16-section table
 * (docs/IMPLEMENTATION_PLAN.md §6). All 16 sections populated.
 * Capacity figure and brand name are never inlined here — always pulled
 * from lib/config.ts.
 */
import { capacity, capacityStatement, costLine, disclosure } from "@/lib/config";

export interface ListSection {
  id: string;
  number: number;
  title: string;
  intro?: string;
  items: string[];
  note?: string;
}

export const hero = {
  number: 1,
  headline: "Turn your Instagram presence into a professional business presence",
  bullets: [
    `Limited places each month — ${capacityStatement()}`,
    "A defined starter website: a clear, agreed scope, not open-ended.",
    "No obligation to buy anything else, ever.",
  ],
  costLine,
  disclosureLine: disclosure.footer,
  ctaLabel: "Apply for a Sponsored Website",
} as const;

export const whoItsFor: ListSection = {
  id: "who-its-for",
  number: 2,
  title: "Who It's For",
  items: [
    "Halal restaurants, takeaways and catering",
    "Halal butchers and food businesses",
    "Muslim salons and barbers",
    "Islamic education centres, Quran academies and tutors",
    "Muslim wedding service providers",
    "Modest-fashion and Islamic retail",
    "Muslim coaches, consultants and professional services",
  ],
};

export const currentDigitalProblem: ListSection = {
  id: "current-digital-problem",
  number: 3,
  title: "The Current Digital Problem",
  items: [
    "Instagram and WhatsApp acting as the whole online presence",
    "Customers digging through posts and DMs for basic information",
    "Established offline but looking less professional online",
    "Business information spread across too many platforms",
    "Losing trust to competitors with a clearer web presence",
  ],
};

export const whatTheWebsiteSolves: ListSection = {
  id: "what-the-website-solves",
  number: 4,
  title: "What the Website Solves",
  items: [
    "One professional home online",
    "Clearer services, contact and business details",
    "Stronger credibility and first impression",
    "Easier enquiries",
    "A proper place to showcase work and reviews",
  ],
};

export const whyItsSponsored = {
  id: "why-its-sponsored",
  number: 5,
  title: "Why It's Sponsored",
  intro:
    "No catch, stated openly: this is a genuine exchange, not a free trial with strings attached.",
  businessReceives: [
    "A free, professional starter website",
    "A stronger online presence to convert enquiries into customers",
    "A completed, portfolio-quality project they own",
  ],
  initiativeReceives: [
    "A genuine portfolio project to showcase",
    "Honest feedback on the experience",
    "Permission to share the story as a case study, only with consent",
  ],
  feedbackNote:
    "Honest completion feedback is expected from every accepted business. A positive review is never required.",
} as const;

export const whatsIncluded: ListSection = {
  id: "whats-included",
  number: 6,
  title: "What's Included",
  items: [
    "Up to 4–5 pages",
    "Responsive design across mobile, tablet and desktop",
    "Business info, services and menu where relevant",
    "Contact form and/or WhatsApp call-to-action",
    "Google Maps and social links",
    "Portfolio or gallery where appropriate",
    "Existing testimonials, where available",
    "Relevant halal or business credentials",
    "Basic on-page SEO",
    "Basic performance optimisation",
    "Up to 2 revision rounds",
  ],
  note: `Development cost: £0.`,
};

export const whatsOutsideScope: ListSection = {
  id: "whats-outside-scope",
  number: 7,
  title: "What's Outside Scope",
  items: [
    "Ecommerce or large catalogues",
    "Online ordering",
    "Advanced booking",
    "Payment integrations",
    "LMS or student portals",
    "Membership systems",
    "CRM",
    "Automation or AI integrations",
    "Custom dashboards or software",
    "Advanced SEO campaigns",
    "Ongoing marketing",
    "Unlimited revisions",
    "Ongoing maintenance",
    "Future pages or functionality after completion",
  ],
  note: "That isn't part of the free starter scope, but we're happy to scope and quote it separately — you'll always see the price before any paid work begins.",
};

export const domainHostingCosts: ListSection = {
  id: "domain-hosting-costs",
  number: 8,
  title: "Domain, Hosting & Third-Party Costs",
  items: [
    "Your business remains responsible for its own domain and hosting.",
    "Any paid plugin, licence or third-party service is a separate cost.",
    "The team can guide you toward a suitable option if asked.",
  ],
};

export const whatHappensAfterLaunch: ListSection = {
  id: "what-happens-after-launch",
  number: 9,
  title: "What Happens After Launch",
  items: [
    "A one-time project covering the agreed scope: design, development, revisions and launch.",
    "A short, defined close-out window covers issues within the delivered scope (see Programme Terms).",
    "Anything outside that scope gets a fresh, transparent quotation — never assumed or added silently.",
  ],
};

export const whoQualifies: ListSection = {
  id: "who-qualifies",
  number: 10,
  title: "Who Qualifies",
  intro: "This is the public-facing summary — full scoring stays internal to our review process.",
  items: [
    "Already operating with real customers",
    "Muslim-owned, or clearly within the halal/Muslim market",
    "No website, or a visibly weak or outdated one",
    "Clear products or services",
    "Can provide content promptly",
    "A website would materially help the business",
    "Good portfolio potential",
    "Responsive owner",
    "Willing to give honest feedback",
  ],
};

export const whoIsNotAFit: ListSection = {
  id: "who-is-not-a-fit",
  number: 11,
  title: "Who Is Usually Not a Fit",
  items: [
    "Not yet launched, or no real customers",
    "Expects a large custom platform for free",
    "Main need is ecommerce, an LMS, or custom software",
    "Expects unlimited revisions or ongoing free support",
    "Can't provide content or cooperate during the project",
    "Already has a strong site with no real need for a rebuild",
  ],
};

export const limitedCapacity = {
  id: "limited-capacity",
  number: 12,
  title: "Limited Monthly Capacity",
  statement: capacityStatement(),
  count: capacity.count,
  note: "A real, editable figure — never a stale number left live.",
} as const;

export interface ProcessStep {
  step: string;
  description: string;
}

export const processSteps = {
  id: "how-the-process-works",
  number: 13,
  title: "How the Process Works",
  steps: [
    {
      step: "Apply",
      description: "Submit your application with your business details and goals.",
    },
    {
      step: "Review",
      description: "Our team reviews every application against this cohort's criteria.",
    },
    {
      step: "Discovery",
      description: "Accepted businesses have a short call to confirm scope and content.",
    },
    {
      step: "Build",
      description: "We design and build your starter site within the agreed scope.",
    },
    {
      step: "Review & Launch",
      description: "You review the build, we make up to 2 rounds of revisions, then launch.",
    },
    {
      step: "Feedback & Close-Out",
      description:
        "You share honest feedback and we close out the project within the defined window.",
    },
  ] satisfies ProcessStep[],
} as const;

export interface Testimonial {
  quote: string;
  businessName: string;
}

export const portfolioAndTestimonials: {
  id: string;
  number: number;
  title: string;
  testimonials: Testimonial[];
} = {
  id: "portfolio-and-testimonials",
  number: 14,
  title: "Portfolio, Testimonials & Social Proof",
  /**
   * Non-Negotiable Rule: never fabricate testimonials or case studies.
   * Empty until real, consented entries exist — the section renders
   * nothing (not placeholder content) in that state. See
   * components/sections/PortfolioAndTestimonials.tsx.
   */
  testimonials: [],
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq = {
  id: "faq",
  number: 15,
  title: "Frequently Asked Questions",
  items: [
    {
      question: "Is it really free?",
      answer: `${costLine} Nothing about the build itself is charged.`,
    },
    {
      question: "What about domain and hosting?",
      answer:
        "You choose and pay for your own domain and hosting. We can guide you toward a suitable option if asked.",
    },
    {
      question: "Can I buy anything after the site launches?",
      answer:
        "Yes — once your starter site is live, any further work can be scoped and quoted separately. Nothing is ever assumed or added without your agreement.",
    },
    {
      question: "Is ongoing maintenance included?",
      answer:
        "No. This is a one-time build, not a maintenance plan. A short post-launch window covers issues within the agreed scope; anything beyond that gets a fresh quotation.",
    },
    {
      question: "Can I get more done later?",
      answer:
        "The starter site covers a defined scope of up to 4–5 pages. If you need more later, that's future paid work — quoted transparently before anything begins.",
    },
    {
      question: "Do I have to give feedback?",
      answer:
        "Honest completion feedback is expected from every accepted business — that's part of the exchange. A positive review is never required.",
    },
    {
      question: "Does applying guarantee a website?",
      answer: `No. We review every application, but places are limited — ${capacityStatement()} — and not every applicant can be accepted. Everyone who applies hears back either way.`,
    },
    {
      question: "Who actually builds my website?",
      answer: disclosure.faqAnswer,
    },
  ] satisfies FaqItem[],
} as const;

export const finalCta = {
  id: "final-cta",
  number: 16,
  title: "Ready to Apply?",
  bullets: [
    "For selected Muslim-owned businesses",
    "A defined starter site at no development cost",
    `Limited monthly places — ${capacityStatement()}`,
    "Honest feedback expected",
    "No promise of ongoing free maintenance",
  ],
  ctaLabel: "Apply for a Sponsored Website",
} as const;
