/**
 * Renders inline `**bold**` markers as <strong> so content strings in
 * lib/content/landing.ts can flag their own anchor words instead of every
 * list/section component re-deciding what to emphasize.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
