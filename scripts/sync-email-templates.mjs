#!/usr/bin/env node
/**
 * Generates lib/email/templates/*.ts (runtime-importable string exports)
 * from docs/email-templates/*.html (the designer-facing source mockups).
 *
 * Workers has no filesystem access at runtime, so the HTML can't be read
 * from docs/ when a request comes in — it has to be bundled as code.
 * Re-run this whenever docs/email-templates/*.html changes.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const templates = [
  {
    source: "docs/email-templates/applicant-confirmation.html",
    out: "lib/email/templates/applicant-confirmation.ts",
    exportName: "applicantConfirmationTemplate",
  },
  {
    source: "docs/email-templates/team-notification.html",
    out: "lib/email/templates/team-notification.ts",
    exportName: "teamNotificationTemplate",
  },
];

for (const { source, out, exportName } of templates) {
  const html = readFileSync(path.join(rootDir, source), "utf8");
  const banner = `/**\n * GENERATED — do not edit directly.\n * Source: ${source}\n * Regenerate with \`npm run sync-email-templates\` after editing the source mockup.\n */\n`;
  const content = `${banner}export const ${exportName} = ${JSON.stringify(html)};\n`;
  writeFileSync(path.join(rootDir, out), content);
  console.log(`Wrote ${out}`);
}
