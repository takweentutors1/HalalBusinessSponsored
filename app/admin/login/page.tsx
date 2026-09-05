import type { Metadata } from "next";
import { Button, Card, FormField, Input } from "@/components/ui";
import { Logo } from "@/components/shared/Logo";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Incorrect username or password.",
  "not-configured":
    "Admin login isn't configured yet — set ADMIN_USERNAME and ADMIN_PASSWORD via wrangler secret put.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? (ERROR_MESSAGES[error] ?? "Something went wrong. Try again.") : null;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-8)",
        background:
          "linear-gradient(135deg, var(--color-primary-pale) 0%, var(--color-surface-base) 100%)",
      }}
    >
      <Card style={{ maxWidth: 400, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--space-4)" }}>
            <Logo size={56} showWordmark={false} animated />
          </div>
          <h1 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-2)" }}>
            Admin Login
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
            Halal Business Initiative — internal review access
          </p>
        </div>

        <form action={login}>
          <FormField label="Username" required>
            <Input name="username" autoComplete="username" autoFocus />
          </FormField>
          <FormField label="Password" required>
            <Input type="password" name="password" autoComplete="current-password" />
          </FormField>

          {errorMessage && (
            <p className="ui-error" role="alert" style={{ marginBottom: "var(--space-4)" }}>
              {errorMessage}
            </p>
          )}

          <Button type="submit" variant="primary" style={{ width: "100%" }}>
            Log in
          </Button>
        </form>
      </Card>
    </main>
  );
}
