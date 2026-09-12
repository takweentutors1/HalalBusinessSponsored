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
  headline: "Your business is established. Your website should show it.",
  costLine: "A professional starter website for selected Muslim-owned businesses — at **£0 development cost**.",
  bullets: [
    "No proper website? **We’ll build a professional online home.**",
    "Weak or outdated website? **We’ll rebuild the essentials clearly.**",
  ],
  disclosureLine: "Defined starter scope. No obligation to buy extra services.",
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
  title: "There is a clear reason it costs you £0 to build.",
  intro: "**No catch.** A genuine exchange — not a free trial with strings attached.",
  businessReceives: [
    "**A free**, professional starter website",
    "A stronger online presence that **converts enquiries into customers**",
    "A completed, portfolio-quality project **you own**",
  ],
  initiativeReceives: [
    "A genuine portfolio project to showcase",
    "Honest feedback on the experience",
    "Permission to share the story as a case study, only with consent",
  ],
  feedbackNote: "**Honest feedback is expected.** A positive review never is.",
} as const;

export const whatsIncluded: CategorizedSection = {
  id: "whats-included",
  number: 6,
  title: "What's included",
  categories: [
    {
      title: "Design & Build",
      items: [
        "Up to 4–5 pages",
        "Responsive design",
        "Basic on-page SEO",
        "Basic performance optimisation",
      ],
    },
    {
      title: "Core Features",
      items: [
        "Business info and services",
        "Contact form / WhatsApp CTA",
        "Google Maps and social links",
        "Portfolio/gallery where relevant",
        "Existing testimonials and credentials",
      ],
    },
    {
      title: "Revisions",
      items: ["Up to 2 revision rounds"],
    },
  ],
  note: "Development cost: **£0**.",
};

export const whatsOutsideScope: CategorizedSection = {
  id: "whats-outside-scope",
  number: 7,
  title: "What's outside the free scope",
  categories: [
    {
      title: "Commerce & Bookings",
      items: [
        "Ecommerce / larger catalogues",
        "Online ordering",
        "Advanced booking",
        "Payment integrations",
      ],
    },
    {
      title: "Platforms & Software",
      items: [
        "LMS / student portals",
        "Membership systems",
        "CRM / automation / AI",
        "Custom dashboards or software",
      ],
    },
    {
      title: "Ongoing Work",
      items: [
        "Advanced SEO campaigns",
        "Ongoing marketing",
        "Ongoing maintenance",
        "Future pages or functionality",
      ],
    },
  ],
  note: "You always see the price before any paid work begins.",
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

export const whatHappensAfterLaunch: ListSection = {
  id: "what-happens-after-launch",
  number: 9,
  title: "What happens after your free project is complete?",
  items: [
    "**One-time project** — design, build, revisions and launch, within the agreed scope.",
    "A short **close-out window** covers issues in the delivered scope (see Programme Terms).",
    "Anything outside scope gets a **fresh, transparent quote** — never assumed or added silently.",
  ],
};

export const whoQualifies: ListSection = {
  id: "who-qualifies",
  number: 10,
  title: "Is your business a good fit?",
  intro: "We prioritise established businesses where a starter website can make a clear difference.",
  items: [
    "Already operating with real customers",
    "Muslim-owned or clearly serving the halal/Muslim market",
    "No proper website or a weak/outdated one",
    "Clear products/services and content ready",
    "Willing to provide honest feedback",
  ],
};

export const whoIsNotAFit: ListSection = {
  id: "who-is-not-a-fit",
  number: 11,
  title: "Usually not a fit",
  items: [
    "Not launched yet / no real customers",
    "Main need is a large ecommerce, LMS or custom software build",
    "Expecting unlimited revisions or ongoing free support",
    "Unable to provide basic content",
    "Already has a strong website with no meaningful need",
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

export const processSteps = {
  id: "how-the-process-works",
  number: 13,
  title: "A simple process from application to launch",
  steps: [
    {
      step: "Apply",
      description: "Tell us about your business and current online presence.",
    },
    {
      step: "Review",
      description: "We check programme fit and available capacity.",
    },
    {
      step: "Discovery",
      description: "We confirm goals, pages, branding and content.",
    },
    {
      step: "Build",
      description: "We design and develop the agreed starter website.",
    },
    {
      step: "Review & Launch",
      description: "Included revisions are completed and the site goes live.",
    },
    {
      step: "Feedback",
      description: "You provide honest completion feedback and the project closes.",
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
  title: "Your questions answered",
  items: [
    {
      question: "Is the website really free?",
      answer: `${costLine} Nothing about the build itself is charged.`,
    },
    {
      question: "Do I pay for domain and hosting?",
      answer:
        "You choose and pay for your own domain and hosting. We can guide you toward a suitable option if asked.",
    },
    {
      question: "Do I have to buy anything afterwards?",
      answer:
        "No obligation to buy anything. Once your starter site is live, any further work can be scoped and quoted separately. Nothing is ever assumed or added without your agreement.",
    },
    {
      question: "Is ongoing maintenance included?",
      answer:
        "No — this is a **one-time build**, not a maintenance plan. A short post-launch window covers issues in scope; anything beyond that gets a fresh quote.",
    },
    {
      question: "Do I have to provide feedback?",
      answer:
        "Honest completion feedback is expected from every accepted business — that's part of the exchange. A positive review is never required.",
    },
    {
      question: "Does applying guarantee a free website?",
      answer: `No — places are limited (${capacityStatement()}), so not every applicant is accepted. **Everyone who applies hears back**, either way.`,
    },
    {
      question: "Who actually builds the website?",
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
