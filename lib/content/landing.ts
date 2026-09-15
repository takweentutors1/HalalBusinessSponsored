/**
 * Landing page copy, data-driven per the brief's 16-section table
 * (docs/IMPLEMENTATION_PLAN.md §6). All 16 sections populated.
 * Capacity figure and brand name are never inlined here — always pulled
 * from lib/config.ts.
 */
import { capacity, capacityStatement, disclosure } from "@/lib/config";

export interface ListSection {
  id: string;
  number: number;
  title: string;
  intro?: string;
  items: string[];
  note?: string;
}

export interface CategorizedSection {
  id: string;
  number: number;
  title: string;
  categories: { title: string; items: string[] }[];
  note?: string;
}

/** Three glanceable facts shown right below the Hero — all restating
 * values that already appear elsewhere (whatsIncluded, costLine), never a
 * separate source of truth. */
export const statsBar = [
  { value: "£0", label: "Development Cost" },
  { value: "4–5", label: "Pages Included" },
  { value: "2", label: "Revision Rounds" },
] as const;

export const hero = {
  number: 1,
  topline: "Free websites for UK Halal Muslim businesses at £0 development cost",
  headline: "Your business is established. Your website should show it.",
  headlineHighlight: "Your website should show it.",
  costLine: "A professional starter website for selected Muslim-owned businesses — at **£0 development cost**.",
  bullets: [
    "No proper website? **We’ll build your professional online home.**",
    "Outdated website? **We’ll rebuild the essentials clearly.**",
  ],
  /** From the docs/index.html redesign's hero-urgency strip — 3 short
   * reassurance/urgency facts shown as a row under the hero bullets. */
  urgencyItems: [
    { label: "Apply in ~2 minutes", note: "Short application" },
    { label: "Fast-track build", note: "Once content is ready" },
    { label: "Limited monthly places", note: "Selected businesses only" },
  ],
  disclosureLine: "No obligation to buy extra services.",
  ctaLabel: "Apply for a Free Website",
  ctaHref: "/apply",
  secondaryCtaLabel: "See If You Qualify",
  secondaryCtaHref: "#who-qualifies",
  /**
   * Non-Negotiable Rule: never fabricate reviews/stats. No real ones exist
   * yet, so this is an honest, non-numeric trust line — not a star rating —
   * reusing the same claim already made on /apply, not a new one invented
   * for the Hero.
   */
  trustLine: "Reviewed by a real person, not an algorithm.",
  /** Copy for the decorative "browser window" mockup graphic beside the
   * hero copy — purely illustrative, matching docs/index.html's mock-hero. */
  mockVisual: {
    pill: "Local business",
    heading: "A modern website that makes the business feel established.",
    body: "Clear services, stronger trust, and one obvious enquiry path.",
  },
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
    "Customers jump between social profiles and messages",
    "Services and trust signals are difficult to find",
    "Your online presence looks weaker than the business",
  ],
};

export const whatTheWebsiteSolves: ListSection = {
  id: "what-the-website-solves",
  number: 4,
  title: "What the Website Solves",
  items: [
    "One clear home for services, reviews and enquiries",
    "Stronger credibility across mobile and desktop",
    "A stronger reason for customers to choose you",
  ],
};

/**
 * From the docs/index.html redesign — not one of the brief's original 16
 * numbered sections, so it deliberately has no `number` field (unlike
 * ListSection/CategorizedSection above). The £2,000–£5,000 agency figure
 * is gated by lib/config.ts's marketValueComparison.approved; see
 * components/sections/ValueComparison.tsx for how the fallback copy
 * below is used when that's false.
 */
export const valueComparison = {
  id: "value-comparison",
  intro:
    "For selected businesses, Takween Connect covers the development cost of the agreed starter scope.",
  agency: {
    label: "Comparable agency build",
    fallbackPrice: "Thousands",
    description:
      "Professional design, multiple pages, responsive development and optimisation.",
  },
  free: {
    label: "Takween Connect development cost",
    price: "£0",
    description: "Professional design, multiple pages, responsive development and optimisation.",
  },
} as const;

export const whyItsSponsored = {
  id: "why-its-sponsored",
  number: 5,
  title: "A genuine exchange not a hidden upsell.",
  intro:
    "We're building real portfolio work in this niche while helping selected Muslim-owned businesses improve their online presence.",
  youGet: {
    heading: "You get",
    body: "A professionally built starter website at £0 development cost. While other agency builds can commonly sit around £2,000–£5,000.",
  },
  weGet: {
    heading: "We get",
    body: "A real project, honest feedback, and portfolio value where permission is given.",
  },
} as const;

export const whatsIncluded: CategorizedSection = {
  id: "whats-included",
  number: 6,
  title: "Included",
  categories: [
    {
      title: "Website",
      items: ["Up to 4–5 pages", "Mobile-responsive design", "Services, contact and enquiry journey"],
    },
    {
      title: "Essentials",
      items: ["Basic on-page SEO", "Basic performance optimisation", "2 revision rounds"],
    },
  ],
  note: "**£0 development cost.** Domain and hosting remain the business's responsibility.",
};

export const whatsOutsideScope: CategorizedSection = {
  id: "whats-outside-scope",
  number: 7,
  title: "Only if you need more",
  categories: [
    {
      title: "Advanced features",
      items: [
        "Ecommerce, payments or advanced booking",
        "LMS, memberships, CRM or automation",
        "Custom dashboards or software",
      ],
    },
    {
      title: "Ongoing work",
      items: ["Maintenance, future pages or advanced SEO", "Additional integrations or future functionality"],
    },
  ],
  note: "Nothing extra is added unless you ask for it and approve the price first.",
};

/** Mid-page CTA after What's Included / Outside Scope — lets a reader who
 * already has scope questions self-route to the qualification criteria
 * instead of scrolling on regardless. */
export const qualifyCta = {
  label: "Check If Your Business Qualifies",
  supportingText: "Not sure if your business is eligible? See the criteria below.",
  href: "#who-qualifies",
} as const;

export const domainHostingCosts: ListSection = {
  id: "domain-hosting-costs",
  number: 8,
  title: "Domain, Hosting & Third-Party Costs",
  items: [
    "**You** keep ownership of your domain and hosting.",
    "Paid plugins, licences or third-party services are a **separate cost**.",
    "We'll guide you to a suitable option, if asked.",
  ],
};

export const whoQualifies: ListSection = {
  id: "who-qualifies",
  number: 10,
  title: "Is your Muslim-owned business a good fit?",
  items: [
    "UK Muslim-owned business already trading with real customers",
    "No proper website or an outdated one",
    "Clear services and enough content to build from",
  ],
};

export const whoIsNotAFit: ListSection = {
  id: "who-is-not-a-fit",
  number: 11,
  title: "Usually not a fit",
  items: [
    "Not launched yet / no real customers",
    "Main need is a large ecommerce or custom software build",
    "Expecting unlimited revisions or ongoing free support",
  ],
};

/** Mid-page CTA after Who Qualifies — a reader who just self-confirmed fit
 * against the criteria is at peak intent, so offer Apply immediately
 * rather than only at the very bottom of the page. */
export const applyCtaMidPage = {
  label: "Apply for a Free Website",
  supportingText: "Meet the criteria? Applications only take a few minutes.",
  href: "/apply",
} as const;

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

/**
 * Trimmed to the docs/index.html redesign's exact 4 steps (was 6, with
 * separate Discovery and Feedback steps) — Discovery folds into Build,
 * Feedback folds into Review & Launch's wrap-up. Confirmed as the wanted
 * outcome when matching the redesign exactly.
 */
export const processSteps = {
  id: "how-the-process-works",
  number: 13,
  title: "A simple 4-step process",
  subtitle: "Keep the experience short and easy to understand.",
  steps: [
    {
      step: "Apply",
      description: "Tell us about your business and current online presence.",
    },
    {
      step: "Review",
      description: "We check fit, scope and available capacity.",
    },
    {
      step: "Build",
      description: "We confirm essentials, build the website and collect feedback.",
    },
    {
      step: "Launch",
      description: "Final revisions are completed and the website goes live.",
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

/**
 * Restored to the original 7 questions from draft 2 (see
 * docs/Brief_HalalBusinessSponsoredWebsite_Numan.docx §15), plus "who
 * builds the website?" — the +1 answered via the disclosure line. A
 * prior pass trimmed this to 5 to match docs/index.html's redesign
 * exactly, dropping "is ongoing maintenance included?" and "do I have
 * to give feedback?" on the reasoning that AfterLaunchCards and
 * WhySponsored's feedbackNote already cover that ground — reinstated
 * here since the FAQ section is where a reader actually expects to
 * find those answers.
 */
export const faq = {
  id: "faq",
  number: 15,
  title: "Your questions answered.",
  items: [
    {
      question: "Is the website really free?",
      answer: "Yes. Design and development within the agreed starter scope is free.",
    },
    {
      question: "Do I pay for domain and hosting?",
      answer:
        "Yes. Domain, hosting and optional paid third-party tools remain your responsibility.",
    },
    {
      question: "Do I have to buy anything afterwards?",
      answer: "No. Additional services are optional and only quoted if you request them.",
    },
    {
      question: "Is ongoing maintenance included?",
      answer:
        "No. This is a one-time build. A short post-launch window covers issues within the agreed scope; anything beyond that is quoted separately.",
    },
    {
      question: "Do I have to give feedback?",
      answer:
        "Yes. Honest completion feedback is expected from every accepted business. A positive review is never required.",
    },
    {
      question: "Does applying guarantee acceptance?",
      answer:
        "No. Applications are reviewed against fit and available monthly capacity.",
    },
    {
      question: "Who builds the website?",
      answer: disclosure.faqAnswer,
    },
  ] satisfies FaqItem[],
} as const;

export const finalCta = {
  id: "final-cta",
  number: 16,
  title: "Give your business a stronger professional home online.",
  bullets: [
    "For selected **Muslim-owned** businesses",
    "A defined starter site at **no cost**",
    `**Limited spots** — ${capacityStatement()}`,
    "Honest feedback expected",
    "No promise of ongoing free maintenance",
  ],
  ctaLabel: "Apply for a Free Website",
} as const;
