# GSAP Modernization — Application Form & Admin Panel

**Document Type:** Technical Architecture & Implementation Blueprint
**Target Project:** Takween Connect / HalalBusiness (`/Users/pc/HalalBusiness`)
**Scope:** `components/forms/**`, `components/admin/**`, `app/admin/**` — everything *not* covered by `docs/GSAP_SCROLLTRIGGER_PLAN.md` (the marketing landing page).
**Status:** Specification only — **do not implement** until explicitly instructed to proceed.

## 1. What's actually there today (audited, not assumed)

Every existing animation in this part of the app is CSS-only (`styles/components.css`), and every one of them already has a matching `@media (prefers-reduced-motion: reduce)` override. This plan is a **replacement/extension of working code**, not a fix for broken or missing motion — treat every change below as an upgrade decision, not a bug fix.

| Area | File | Current motion |
|---|---|---|
| Step transition | `ApplicationForm.tsx` | `key={step}` remount + `.ui-step-enter` CSS keyframe (280ms slide+fade, one-shot, **enter only — no exit**) |
| Progress bar | `StepIndicator.tsx` | `.ui-step-progress-fill` — CSS `width` transition (300ms) |
| Step fields | `Step*.tsx` (5 files) | None — plain server-renderable components, no animation of their own |
| Success state | `ThankYouCharacter.tsx` | Already fully animated: pop-in, infinite bob loop, staggered sparkle pulses |
| Form inputs | `FormField.tsx`, `Input.tsx`, etc. | No animation classes in the TSX |
| Admin list rows | `applications/page.tsx` | `.ui-admin-row-enter` — CSS keyframe, staggered via inline `animationDelay` (40ms × index, capped 400ms) |
| Admin detail save | `applications/[id]/page.tsx` + `actions.ts` | **Zero client JS.** Plain `<form action={serverAction}>`, no `useActionState`/`useFormStatus`, no pending indicator — the only feedback is the page revalidating |
| Admin stat cards | `StatCard.tsx` | `.ui-admin-fade-up` CSS keyframe, no stagger coordination between cards |
| Admin empty state | `AdminEmptyState.tsx` | Already animated: floating illustration + pulsing sparkle, both infinite CSS loops |
| Admin login | `login/page.tsx` + `actions.ts` | **Zero client JS.** Plain `<form action={login}>`, errors shown via redirect + query param, no pending state, no error-shake |

## 2. Where GSAP is worth it vs. where it isn't

Not everything here should move to GSAP — being honest about that is the point of this plan.

**Leave as CSS (no action):**
- `ThankYouCharacter.tsx`'s pop/bob/sparkle loop — decorative, infinite, already correct. GSAP buys nothing here.
- `AdminEmptyState.tsx`'s float/pulse loop — same reasoning.
- `Logo.tsx`'s continuous spin — unrelated to this scope, already fine.

**Worth converting (visual quality upgrade):**
- Step transitions — direction-aware (forward vs. back) instead of one fixed animation both ways.
- Progress bar fill — GSAP tween instead of CSS `width` transition, opens the door to a completion pulse per step.
- Admin row stagger and stat-card mount — GSAP gives finer control (e.g., a subtle scale-in) than the CSS keyframe, though this is a lateral move, not a fix.

**Worth building (closes a real functional gap, not just decoration):**
- Admin review save (`[id]/page.tsx`) has **no pending feedback at all** today — clicking "Save" gives no visual response until the page revalidates. This is the one place in this plan where the recommendation is "add a missing UX state," not "swap the animation engine."
- Admin login has the same gap, plus no error-shake on a failed attempt.

## 3. Architecture constraints (same rules as the marketing site)

- **Admin's `[id]` page and `login` page are currently zero-client-JS Server Components.** Adding GSAP-driven pending states means introducing client wrapper components around just the interactive bits (the submit button, the form shell) — not converting the whole page to `"use client"`, which would lose the direct-D1-read-in-a-Server-Component pattern these pages currently use correctly. Same boundary discipline as `docs/GSAP_SCROLLTRIGGER_PLAN.md` §1.1.
- **React 19's `useActionState`/`useFormStatus` are already available** (package.json has `react: 19.2.8`) — the pending-state work below is built on those, not a custom fetch-based rewrite. `ApplicationForm.tsx` is the one exception already using client-side `fetch` instead of a Server Action; it keeps that pattern, GSAP just gets a real `status` state to react to (which already exists).
- **Every new animation gated by `prefersReducedMotion()`** (`lib/gsap.ts`), matching the exact bar every marketing-page phase was held to — no exceptions, including the admin panel (internal tool or not, accessibility isn't optional).
- **`ApplicationForm.tsx`'s step remount (`key={step}`) makes a true crossfade (old step visible while new one enters) structurally harder than it looks** — React unmounts the outgoing step synchronously on key change, before any exit animation could run. Doing this properly means tracking an "outgoing step" separately in state and deferring its removal to a GSAP `onComplete` callback — a real refactor of the transition mechanism, not just adding a class. Flagged here so it's a deliberate decision at execution time, not a surprise mid-implementation.

## 4. Phase-by-phase blueprint

### Phase A — Step transitions (`ApplicationForm.tsx`, `StepIndicator.tsx`)
- Direction-aware slide: forward navigation slides the incoming step in from the right (fading in), back navigation from the left. Requires knowing the navigation direction (already inferable — compare new `step` to previous).
- Deferred-unmount refactor (see §3) if a true crossfade is wanted; otherwise keep the enter-only model but make it direction-aware, which is a much smaller change.
- `StepIndicator`'s fill bar: `gsap.to(fillEl, { width: pct + '%', duration: 0.4, ease: 'power2.out' })` replacing the CSS transition; add a brief scale-pop on the just-completed step's numbered circle.

### Phase B — Field-level feedback (`FormField.tsx` + step components)
- Shake animation (`gsap.to(el, { x: '+=6', duration: 0.06, repeat: 5, yoyo: true })`) triggered when a field transitions from valid → invalid, layered on top of the existing `aria-invalid`/`.ui-error` styling (not replacing it — the accessible error text stays, this is a supplementary visual cue).
- Decision needed: trigger shake on blur-with-error, or only on submit-attempt? Recommend submit-attempt only, to avoid shaking a field while the user is still mid-typing.

### Phase C — Submit → success transition (`ApplicationForm.tsx` + `ThankYouCharacter.tsx`)
- Replace the current hard swap (form unmounts, success card mounts) with a crossfade: fade/scale the form card out, fade/scale the success card in. `ThankYouCharacter`'s own internal animation is untouched — this only smooths the container-level swap around it.

### Phase D — Admin review save pending state (`applications/[id]/page.tsx`, `actions.ts`)
- New thin client wrapper (e.g. `components/admin/SaveReviewButton.tsx`) using `useFormStatus()` to read `pending` from the enclosing form — button shows a spinner/disabled state via GSAP while `pending` is true.
- On successful save (post-revalidate), a brief GSAP confirmation flash (e.g., a checkmark that draws in and fades) rather than the current silent page settle.
- The Server Action (`saveReview`) itself is untouched — this is purely a client-side pending/feedback layer on top of the existing mutation.

### Phase E — Admin login feedback (`login/page.tsx`, `actions.ts`)
- Same `useFormStatus`-driven pending state on the sign-in button.
- Error-shake: when the page loads with an `error` query param present (already how errors surface today), shake the login card once on mount via GSAP — no change to the error-detection logic itself, just a motion cue layered on top.

### Phase F — Admin list & stat card polish (`applications/page.tsx`, `StatCard.tsx`)
- Lowest priority — lateral move, not a fix. Only worth doing if the goal is "one consistent animation engine across the whole app" rather than "fix what's actually lacking." Convert the row stagger and stat-card mount to GSAP `stagger` if/when that consistency goal is explicit; otherwise leave the CSS as-is.

## 5. Suggested execution order

1. **Phase D + E first** — these are the only genuine functional gaps (no pending feedback anywhere in admin today); highest value for the effort.
2. **Phase A** — most visible/frequent-use polish (every applicant sees step transitions).
3. **Phase C** — one-time-per-applicant moment, but a meaningful first impression.
4. **Phase B** — smaller, can slot in alongside Phase A.
5. **Phase F** — only if visual-engine consistency across admin is an explicit goal; otherwise skip.

Each phase should land in a working, deployable state on its own — same standard as every phase of the marketing-page plan.
