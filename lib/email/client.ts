/**
 * Hostinger mailbox over SMTP via worker-mailer (Cloudflare's TCP Sockets
 * API under the hood — needs the `nodejs_compat` compatibility flag,
 * already set in wrangler.jsonc). See docs/IMPLEMENTATION_PLAN.md §10
 * item 8: this is the highest-risk piece of the stack, since raw SMTP
 * over Workers is newer than an HTTP email API.
 *
 * KNOWN ISSUE (spiked, not yet resolved — see commit message / PR notes):
 * worker-mailer's internal `import ... from "cloudflare:sockets"` needs to
 * survive as a genuine top-level ESM import in the final Worker bundle for
 * workerd to accept it. But:
 *   - A static top-level import here makes Next's build-time page-data
 *     collection (`next build`/`next dev`) actually execute that import
 *     under plain Node, which can't resolve "cloudflare:sockets" at all
 *     (confirmed — breaks the build entirely, even with
 *     `serverExternalPackages`, which only affects final bundling, not
 *     Next's own build-time introspection).
 *   - A dynamic `import()` avoids that (confirmed — build succeeds), but
 *     OpenNext/esbuild bundles this as a single `outfile` with no code
 *     splitting, so dynamically-reached modules run through esbuild's own
 *     internal module-instantiation shim, which falls back to `require()`
 *     for externals — and workerd rejects dynamic `require()` of
 *     "cloudflare:sockets" at runtime (confirmed via `wrangler dev`).
 * This matches an abandoned upstream PR (opennextjs/opennextjs-cloudflare
 * #723) attempting the same `external: ["cloudflare:*"]` fix — applied
 * here via patch-package (patches/@opennextjs+cloudflare+*.patch), which
 * fixes the build-time error but not this runtime one.
 *
 * Kept as the dynamic-import version below because it's the only one that
 * doesn't break local development. sendEmail() fails closed (see below)
 * rather than crashing the request, so /api/apply keeps working — D1
 * insert succeeds regardless, per §5's "best-effort" design. Per §10 item
 * 8's documented fallback: if this isn't resolved with more investigation
 * time, swap to a small serverless relay (any platform with normal Node
 * SMTP support) that still sends through the same Hostinger mailbox.
 */
import { brand } from "@/lib/config";

export interface SendEmailOptions {
  to: { name?: string; email: string };
  subject: string;
  html: string;
}

/**
 * Returns { sent: false } (rather than throwing) when SMTP credentials
 * aren't configured, or when the send itself fails — so callers can treat
 * "not sent" as a distinct, non-fatal case. The application should still
 * save to D1 even if email isn't working yet.
 */
export async function sendEmail(
  env: CloudflareEnv,
  options: SendEmailOptions,
): Promise<{ sent: boolean; reason?: string }> {
  const { HOSTINGER_SMTP_HOST, HOSTINGER_SMTP_PORT, HOSTINGER_SMTP_USER, HOSTINGER_SMTP_PASSWORD } =
    env;

  if (!HOSTINGER_SMTP_USER || !HOSTINGER_SMTP_PASSWORD) {
    return { sent: false, reason: "smtp-credentials-not-configured" };
  }

  const host = HOSTINGER_SMTP_HOST || "smtp.hostinger.com";
  const port = HOSTINGER_SMTP_PORT ? Number(HOSTINGER_SMTP_PORT) : 465;

  try {
    const { WorkerMailer } = await import("worker-mailer/dist/index.mjs");

    await WorkerMailer.send(
      {
        host,
        port,
        secure: port === 465,
        credentials: {
          username: HOSTINGER_SMTP_USER,
          password: HOSTINGER_SMTP_PASSWORD,
        },
        authType: "plain",
      },
      {
        from: { name: brand.name, email: HOSTINGER_SMTP_USER },
        to: options.to,
        subject: options.subject,
        html: options.html,
      },
    );

    return { sent: true };
  } catch (error) {
    return {
      sent: false,
      reason: `smtp-send-failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
