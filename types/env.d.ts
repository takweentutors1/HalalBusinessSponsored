/**
 * Augments the generated CloudflareEnv (worker-configuration.d.ts) with
 * secrets that live in `wrangler secret put` / .dev.vars rather than
 * wrangler.jsonc bindings, so `wrangler types` never needs to know about
 * them and won't overwrite this file.
 */
declare global {
  interface CloudflareEnv {
    /**
     * Cloudflare Turnstile secret key. Falls back to Cloudflare's public
     * "always passes" test secret in app/api/apply/route.ts when unset,
     * so local dev works before this is provisioned (see
     * docs/IMPLEMENTATION_PLAN.md §10 item 5). Never use that fallback
     * in production — set the real value via `wrangler secret put`.
     */
    TURNSTILE_SECRET_KEY?: string;

    /**
     * Hostinger (Titan Mail) SMTP credentials — §10 item 6. If unset,
     * lib/email/client.ts skips sending and logs a warning instead of
     * throwing, so the rest of /api/apply keeps working before these are
     * provisioned. Defaults assume Hostinger's standard SMTP host/port
     * once USER/PASSWORD are set.
     */
    HOSTINGER_SMTP_HOST?: string;
    HOSTINGER_SMTP_PORT?: string;
    HOSTINGER_SMTP_USER?: string;
    HOSTINGER_SMTP_PASSWORD?: string;
    /** Internal mailbox that receives the team-notification email. */
    TEAM_NOTIFICATION_EMAIL?: string;

    /**
     * Admin login credentials — checked by app/admin/login against a
     * signed session cookie (lib/admin/auth.ts), the code-only alternative
     * to Cloudflare Access actually used (§10 item 5's original pick
     * assumed a Zero Trust org already on the account). Unlike other
     * secrets here, there's no safe test-value fallback: proxy.ts fails
     * closed (redirects to login, which always rejects) if either is unset.
     */
    ADMIN_USERNAME?: string;
    ADMIN_PASSWORD?: string;
    /**
     * Signs the session cookie. Optional — falls back to ADMIN_PASSWORD
     * if unset (see lib/admin/auth.ts). Set a dedicated value for real
     * separation between the login password and the cookie-signing key.
     */
    ADMIN_SESSION_SECRET?: string;
  }
}

export {};
