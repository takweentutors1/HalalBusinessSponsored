# Halal Business Sponsored Website

Next.js app for Takween Digital Services' Halal Business Initiative — a
sponsored landing page, Programme Terms page, and application system. Deployed
to Cloudflare Workers via `@opennextjs/cloudflare`. Full architecture and
decisions are documented in [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md).

## Prerequisites

- Node.js 22+
- A Cloudflare account with `wrangler` logged in (`npx wrangler login`)

## Setup

```bash
npm install                    # also runs patch-package via postinstall
cp .dev.vars.example .dev.vars # fill in real values — see below
```

`.dev.vars` is gitignored. Every value in `.dev.vars.example` is optional for
local dev **except** `ADMIN_USERNAME`/`ADMIN_PASSWORD` — the admin login
(`/admin/login`) fails closed (rejects every attempt) if those two aren't set.

### Provisioning Cloudflare resources (first time only)

D1 database and KV namespace already exist for this project
(`halal-business-db`, `RATE_LIMIT_KV` — see `wrangler.jsonc` for IDs). To
recreate them from scratch on a different account:

```bash
npx wrangler d1 create halal-business-db
npx wrangler kv namespace create RATE_LIMIT_KV
# then update the IDs in wrangler.jsonc
npm run db:migrate:local   # applies drizzle/*.sql to local D1
```

## Running locally

```bash
npm run dev
```

This uses plain `next dev` (fast refresh), with `initOpenNextCloudflareForDev()`
in `next.config.ts` proxying Cloudflare bindings (D1, KV) so they work under
Node too. **Exception:** anything touching `worker-mailer` (SMTP sending) only
works under a real Workers runtime — see the note in `lib/email/client.ts`.

To test against the actual Workers runtime (needed for real email-sending
behavior, or before deploying):

```bash
npm run preview   # opennextjs-cloudflare build && preview via wrangler
```

## Database migrations

Schema lives in `lib/db/schema.ts` (Drizzle). After changing it:

```bash
npm run db:generate        # generates drizzle/*.sql from the schema
npm run db:migrate:local   # applies to local D1
npm run db:migrate:remote  # applies to the real, deployed D1 — confirm first
```

## Email templates

`docs/email-templates/*.html` are the source mockups (open directly in a
browser to preview with `{{placeholders}}` visible). `lib/email/templates/*.ts`
are the generated runtime versions Workers actually sends — regenerate after
editing the source:

```bash
npm run sync-email-templates
```

## Deploying

```bash
npm run deploy   # opennextjs-cloudflare build && deploy via wrangler
```

Secrets (Turnstile, Hostinger SMTP, admin login) are set per-environment
via `wrangler secret put <NAME>` — never committed, never in `wrangler.jsonc`.

## Known limitations

- **Email sending doesn't work yet.** `lib/email/client.ts` documents a
  confirmed, unresolved conflict between OpenNext's single-file Worker
  bundling and `worker-mailer`'s use of `cloudflare:sockets` — matches an
  abandoned upstream PR. Submissions still save to D1 and show the applicant
  a confirmation regardless; email failures are logged, not fatal.
- **`/admin/*` uses a signed session cookie set by `/admin/login`**, not
  Cloudflare Access — Access needs a Zero Trust org already provisioned on
  the account. See `docs/IMPLEMENTATION_PLAN.md` §2/§10 item 5.
- **`[Halal Brand]` name/domain aren't decided yet** (brief's open dependency).
  `lib/config.ts`'s `brand.name`/`brand.domain` are placeholders; `siteUrl`
  points at the current `*.workers.dev` staging URL until a real domain is
  bound.
