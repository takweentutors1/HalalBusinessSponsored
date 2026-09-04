import type { TermsItem } from "@/lib/content/terms";

export function TermsList({ items }: { items: TermsItem[] }) {
  return (
    <ol
      style={{
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
      }}
    >
      {items.map((item) => (
        <li key={item.id}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--font-size-xl)",
              color: "var(--color-primary-dark)",
              marginBottom: "var(--space-2)",
            }}
          >
            {item.number}. {item.title}
          </h3>
          <p style={{ color: "var(--color-text-secondary)" }}>{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
