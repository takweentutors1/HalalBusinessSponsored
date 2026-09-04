import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { applications } from "@/lib/db/schema";
import { HONEYPOT_FIELD_NAME, applicationSchema } from "@/lib/validation/application";

/**
 * Cloudflare's public "always passes" test secret — pairs with the test
 * site key used as lib/config.ts's turnstileSiteKey fallback. Only used
 * locally before TURNSTILE_SECRET_KEY is provisioned (§10 item 5).
 */
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(token: string, secret: string, remoteIp: string | null) {
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid-json" }, { status: 400 });
  }

  // Honeypot: a bot filled in a field real users never see. Return a
  // generic 200 without touching D1 or email — never tip off the bot
  // with a validation error. See §5.
  const honeypotValue = body[HONEYPOT_FIELD_NAME];
  if (typeof honeypotValue === "string" && honeypotValue.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const result = applicationSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ success: false, fieldErrors }, { status: 400 });
  }

  const turnstileToken = body.turnstileToken;
  if (typeof turnstileToken !== "string" || turnstileToken.length === 0) {
    return NextResponse.json(
      { success: false, error: "missing-turnstile-token" },
      { status: 400 },
    );
  }

  const secret = env.TURNSTILE_SECRET_KEY ?? TURNSTILE_TEST_SECRET;
  const remoteIp = request.headers.get("cf-connecting-ip");
  const verified = await verifyTurnstile(turnstileToken, secret, remoteIp);
  if (!verified) {
    return NextResponse.json(
      { success: false, error: "turnstile-verification-failed" },
      { status: 400 },
    );
  }

  const data = result.data;
  const id = crypto.randomUUID();
  const db = await getDb();

  await db.insert(applications).values({
    id,
    businessName: data.business_name,
    businessType: data.business_type,
    yearsOperating: data.years_operating,
    currentWebsiteUrl: data.current_website_url ?? null,
    instagramHandle: data.instagram_handle ?? null,
    facebookHandle: data.facebook_handle ?? null,
    activityLevel: data.activity_level ?? null,
    googleProfileUrl: data.google_profile_url ?? null,
    googleReviewCount: data.google_review_count ?? null,
    servicesDescription: data.services_description,
    biggestChallenge: data.biggest_challenge,
    contentReadiness: data.content_readiness,
    credentials: data.credentials ?? null,
    contactName: data.contact_name,
    contactEmail: data.contact_email,
    contactPhone: data.contact_phone,
    consentTerms: data.consent_terms,
    consentFeedback: data.consent_feedback,
  });

  // TODO(Hour 8): fire team-notification + applicant-confirmation emails
  // via the Hostinger SMTP client once it exists.

  return NextResponse.json({ success: true, id });
}
