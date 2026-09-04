/**
 * Single source of truth for the values the brief calls out as
 * "must never be hardcoded in multiple places": the capacity figure,
 * the [Halal Brand] name/domain, and the disclosure wording.
 * See docs/IMPLEMENTATION_PLAN.md §6, §7 and the brief's Non-Negotiable Rules.
 */

export const brand = {
  /**
   * Sub-brand name/logo/domain not yet decided (brief's open dependency,
   * referenced throughout as "[Halal Brand]"). Placeholder only — does not
   * block building against a staging URL, but blocks Milestone 3 (launch).
   */
  name: "[Halal Brand]",
  domain: "[halal-brand-domain].com",
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
  faqAnswer: `Your project is delivered by the ${brand.parentCompany} team through our ${brand.name} initiative.`,
} as const;

export const costLine =
  "The build is £0. Domain and hosting remain your own, separate cost.";
