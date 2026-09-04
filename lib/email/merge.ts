/**
 * Replaces {{placeholder}} merge fields in the templates from
 * lib/email/templates/ with real values. Missing keys resolve to an
 * empty string rather than throwing — a blank field is a much smaller
 * problem in an email than a failed send.
 */
export function renderTemplate(template: string, data: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => data[key] ?? "");
}
