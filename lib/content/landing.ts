/**
 * Landing page copy, data-driven per the brief's 16-section table
 * (docs/IMPLEMENTATION_PLAN.md §6). Sections 1–8 populated this pass;
 * 9–16 land next. Capacity figure and brand name are never inlined here —
 * always pulled from lib/config.ts.
 */
import { capacityStatement, costLine, disclosure } from "@/lib/config";

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
