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
  }
}

export {};
