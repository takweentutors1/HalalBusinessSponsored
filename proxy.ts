import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionCookieValue } from "@/lib/admin/auth";

export const config = {
  matcher: "/admin/:path*",
};

/**
 * Gates /admin/* with a signed session cookie, set by the login form at
 * /admin/login (app/admin/login) rather than the browser's native HTTP
 * Basic Auth prompt. /admin/login itself must stay reachable — everything
 * else redirects there if the session is missing or expired.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const { env } = await getCloudflareContext({ async: true });
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const username = sessionCookie ? await verifySessionCookieValue(sessionCookie, env) : null;

  if (!username) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Forwarded so e.g. the review form can default the reviewer field to
  // whoever is actually logged in (see app/admin/(dashboard)/applications/[id]/actions.ts).
  const forwardedHeaders = new Headers(request.headers);
  forwardedHeaders.set("x-admin-user", username);
  return NextResponse.next({ request: { headers: forwardedHeaders } });
}
