/**
 * Programme Terms page copy — the brief's 14 required items
 * (docs/IMPLEMENTATION_PLAN.md §6). The brief specifies topics, not exact
 * wording, so the body text here is written to stay consistent with the
 * landing page content, the brief's Decisions, and the Non-Negotiable Rules.
 * Capacity figure and brand name pulled from lib/config.ts, never inlined.
 */
import { brand, capacity } from "@/lib/config";

export interface TermsItem {
  id: string;
  number: number;
  title: string;
  body: string;
}

export const termsItems: TermsItem[] = [
  {
    id: "relationship-and-disclosure",
    number: 1,
    title: "Relationship and Disclosure",
    body: `This programme, operated under the ${brand.name} name, is delivered by ${brand.parentCompany}. ${brand.parentCompany} designs, builds and manages every project; ${brand.name} is the name this specific initiative for Muslim-owned businesses operates under. This isn't hidden in the small print — it's stated here, in the footer of every page, and in a short line near the application form.`,
  },
  {
    id: "free-package-scope",
    number: 2,
    title: "Exact Free-Package Scope",
    body: "The starter website covers up to 4–5 pages, responsive design, business information, services and menu where relevant, a contact form and/or WhatsApp call-to-action, Google Maps and social links, a portfolio or gallery where appropriate, existing testimonials where available, relevant halal or business credentials, basic on-page SEO, and basic performance optimisation. See What's Included and What's Outside Scope on the landing page for the full breakdown. Development cost: £0.",
  },
  {
    id: "revision-limits",
    number: 3,
    title: "Revision Limits",
    body: "Up to 2 rounds of revisions are included once the initial build is ready for review. Requests beyond that, or requests that go beyond the agreed scope, are treated as future work and quoted separately.",
  },
  {
    id: "client-content-responsibilities",
    number: 4,
    title: "Client Content Responsibilities",
    body: "You're responsible for providing the text, images, logo and any other content the site needs, promptly enough to keep the project moving. Delays in supplying content will delay the build and, where relevant, the close-out window described below.",
  },
  {
    id: "domain-and-hosting-responsibilities",
    number: 5,
    title: "Domain and Hosting Responsibilities",
    body: "Your business is responsible for purchasing and maintaining its own domain name and hosting. The starter website build is free; domain and hosting are a separate, ongoing cost you pay directly to your chosen provider. The team can guide you toward a suitable option if asked.",
  },
  {
    id: "third-party-costs",
    number: 6,
    title: "Third-Party Costs",
    body: "Any paid plugin, licence, stock asset or other third-party service required or requested beyond the standard build is a separate cost, agreed with you before it's purchased.",
  },
  {
    id: "feedback-expectation",
    number: 7,
    title: "Feedback Expectation",
    body: "Honest completion feedback is expected from every accepted business as part of this exchange — that's the basis on which the build is offered free. A positive review is never required, and critical feedback is just as welcome as positive feedback.",
  },
  {
    id: "portfolio-testimonial-permission",
    number: 8,
    title: "Portfolio & Testimonial Permission",
    body: `We will only ever feature your project, feedback or name in our portfolio or social channels with your specific, separate consent, captured on the project completion form. The consent wording used is: "May we feature your feedback and project in the portfolio and social channels of ${brand.name} and ${brand.parentCompany}?" This is asked alongside five short questions about your experience: your online presence before, the improvement made, your experience working with the team, whether you'd recommend us, and this permission. Separately, and entirely optionally, we may also ask: "Your project was delivered by the ${brand.parentCompany} team through our ${brand.name} initiative. If you were happy with the experience, we would really appreciate a review of the delivery team on Takween's Google profile." Declining either question has no effect on your completed project.`,
  },
  {
    id: "project-completion-close-out",
    number: 9,
    title: "Project Completion and Close-Out Point",
    body: "The project is considered complete once the agreed scope has launched and you've confirmed you're happy with the delivered site. From that point, a short, defined close-out window (see below) applies before the project is formally closed.",
  },
  {
    id: "post-launch-issue-window",
    number: 10,
    title: "Post-Launch Issue-Reporting Window",
    body: "For 14 days after launch, we'll fix genuine issues within the delivered scope at no extra cost — for example, something that doesn't work as agreed, not a request for new features. After that window, or for anything outside the original scope, a fresh quotation applies.",
  },
  {
    id: "ongoing-maintenance-exclusion",
    number: 11,
    title: "Ongoing Maintenance Exclusion",
    body: "This is a one-time build, not a maintenance plan. We don't provide ongoing updates, backups, security monitoring or content changes after the close-out window unless separately agreed and quoted.",
  },
  {
    id: "future-work",
    number: 12,
    title: "Future Work and Additional Functionality",
    body: "Anything beyond the free starter scope — more pages, ecommerce, bookings, custom features, ongoing marketing, or continued support — is available as paid work, scoped and quoted transparently before anything begins. You're never charged without seeing the price first.",
  },
  {
    id: "non-response-delay-policy",
    number: 13,
    title: "Non-Response and Project-Delay Policy",
    body: `If we're unable to reach you, or don't receive the content or feedback needed to continue, for an extended period, we may pause or close the project. We'll always try to contact you first, and a paused project can usually be picked back up — but an indefinite delay may mean forfeiting your place in that month's limited capacity (currently up to ${capacity.count} ${capacity.unit}).`,
  },
  {
    id: "cancellation-termination",
    number: 14,
    title: "Cancellation and Termination Conditions",
    body: "Either side can withdraw from the project before launch, for any reason, with no cost or obligation to the business. If a business no longer qualifies for the programme — for example, misrepresenting eligibility, or being unresponsive per the policy above — we reserve the right to end the project early.",
  },
];
