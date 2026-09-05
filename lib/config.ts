/**
 * Single source of truth for the values the brief calls out as
 * "must never be hardcoded in multiple places": the capacity figure,
 * the [Halal Brand] name/domain, and the disclosure wording.
 * See docs/IMPLEMENTATION_PLAN.md §6, §7 and the brief's Non-Negotiable Rules.
 */

export const brand = {
  /**
   * Finalized to match what was already hardcoded everywhere else (logo
   * wordmark, page titles, PWA manifest, admin panel, emails) — this
   * resolves the brief's former "[Halal Brand]" placeholder dependency
   * without an actual rename, since nothing else was ever using anything
   * different.
   */
  name: "Halal Business Initiative",
  domain: "takweenconnect.co.uk",
  parentCompany: "Takween Digital Services",
} as const;

export const capacity = {
  /** Brief's Decision 3: a real, single editable figure — never a second hardcoded copy. */
  count: 5,
  unit: "Muslim-owned businesses",
  period: "month",
} as const;

export function capacityStatement(): string {
  return `We sponsor up to ${capacity.count} ${capacity.unit} each ${capacity.period}.`;
}

/**
 * Brief's Decision 1: disclosure stated in three places — footer, top of the
 * Programme Terms page, and near the application form's submit button.
 * Kept as one shared source so wording can't drift between locations
 * (see components/shared/Disclosure.tsx).
 */
export const disclosure = {
  footer: `A ${brand.parentCompany} initiative`,
  termsIntro: `This programme is operated by ${brand.parentCompany}.`,
  nearSubmit: `Applications are reviewed by the ${brand.parentCompany} team.`,
  /** Used in the FAQ's "Who actually builds my website?" answer. */
  faqAnswer: `Your project is delivered by the ${brand.parentCompany} team through our ${brand.name}.`,
} as const;

export const costLine =
  "The build is £0. Domain and hosting remain your own, separate cost.";

/**
 * Real widget provisioned via `wrangler turnstile widget create`, scoped to
 * halal-business-website.takweencentreuk.workers.dev. Site keys are public
 * by design (Turnstile embeds them in every page's HTML), so committing the
 * real value here is safe — the paired secret lives only as the
 * TURNSTILE_SECRET_KEY Worker secret, never in source.
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY still overrides this for local dev against
 * a different widget if needed.
 */
export const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAEpDfRi2oBw7wWTd";

/**
 * Custom domain (takweenconnect.co.uk), provisioned via the Workers
 * Custom Domains API — see wrangler.jsonc's routes. Used for
 * sitemap.xml, robots.txt, and OG metadata, which all need absolute
 * URLs. Same domain as brand.domain above.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://takweenconnect.co.uk";
