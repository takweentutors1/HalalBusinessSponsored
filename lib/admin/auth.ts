/**
 * Admin session handling — a signed, stateless cookie rather than a
 * sessions table, since this is a single shared admin login with no
 * per-user accounts. Replaces the HTTP Basic Auth approach (native
 * browser prompt) with a real, designed login page (app/admin/login).
 */
export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function verifyCredentials(
  username: string,
  password: string,
  env: Pick<CloudflareEnv, "ADMIN_USERNAME" | "ADMIN_PASSWORD">,
): boolean {
  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) return false;
  return (
    timingSafeEqual(username, env.ADMIN_USERNAME) && timingSafeEqual(password, env.ADMIN_PASSWORD)
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return bufferToHex(signature);
}

/** Falls back to ADMIN_PASSWORD so sessions work without a second secret
 * to provision — set ADMIN_SESSION_SECRET separately for real separation
 * between the login password and the cookie-signing key. */
function getSigningSecret(env: CloudflareEnv): string | undefined {
  return env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD;
}

export async function createSessionCookieValue(
  username: string,
  env: CloudflareEnv,
): Promise<string | null> {
  const secret = getSigningSecret(env);
  if (!secret) return null;
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = `${username}.${expiresAt}`;
  const signature = await sign(secret, payload);
  return `${payload}.${signature}`;
}

export async function verifySessionCookieValue(
  value: string,
  env: CloudflareEnv,
): Promise<string | null> {
  const secret = getSigningSecret(env);
  if (!secret) return null;

  const parts = value.split(".");
  if (parts.length !== 3) return null;
  const [username, expiresAtRaw, signature] = parts;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  const expectedSignature = await sign(secret, `${username}.${expiresAtRaw}`);
  if (!timingSafeEqual(expectedSignature, signature)) return null;

  return username;
}

export const SESSION_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000;
