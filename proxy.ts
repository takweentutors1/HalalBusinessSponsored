import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: "/admin/:path*",
};

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
  });
}

/**
 * Gates /admin/* with HTTP Basic Auth, checked against ADMIN_USERNAME /
 * ADMIN_PASSWORD secrets (set via `wrangler secret put`, .dev.vars
 * locally). Chosen over Cloudflare Access (§10 item 5's original pick) as
 * a code-only alternative that doesn't need a Zero Trust org provisioned
 * on the account. Fails closed: if the secrets aren't set at all, every
 * request is rejected rather than silently letting anyone in — unlike the
 * Turnstile/SMTP fallbacks elsewhere, there's no safe "test" credential
 * to fall back to for something gating real applicant data.
 */
export async function proxy(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
    return unauthorized();
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorized();
  }

  let username: string;
  let password: string;
  try {
    const decoded = atob(authHeader.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    username = decoded.slice(0, separatorIndex);
    password = decoded.slice(separatorIndex + 1);
  } catch {
    return unauthorized();
  }

  const validUsername = timingSafeEqual(username, env.ADMIN_USERNAME);
  const validPassword = timingSafeEqual(password, env.ADMIN_PASSWORD);
  if (!validUsername || !validPassword) {
    return unauthorized();
  }

  // Pass the authenticated username through to Server Actions/route
  // handlers as x-admin-user, so e.g. the review form can default the
  // reviewer field to whoever is actually logged in (see
  // app/admin/applications/[id]/actions.ts).
  const forwardedHeaders = new Headers(request.headers);
  forwardedHeaders.set("x-admin-user", username);
  return NextResponse.next({ request: { headers: forwardedHeaders } });
}
