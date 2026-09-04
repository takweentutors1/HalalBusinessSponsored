import { Card } from "@/components/ui";
import { portfolioAndTestimonials } from "@/lib/content/landing";

/**
 * Non-Negotiable Rule: never fabricate testimonials, case studies, or
 * statistics. Where none exist yet, this section is held back entirely —
 * not filled with placeholder content that looks real. Renders null until
 * lib/content/landing.ts's `testimonials` array has real, consented entries.
 */
export function PortfolioAndTestimonials() {
  const { testimonials, title } = portfolioAndTestimonials;

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--space-8)" }}>
        {title}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        {testimonials.map((testimonial) => (
          <Card key={testimonial.businessName}>
            <p style={{ marginBottom: "var(--space-3)" }}>&ldquo;{testimonial.quote}&rdquo;</p>
            <p style={{ fontWeight: 600 }}>{testimonial.businessName}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
