import { EMAIL_RE } from "./storage";

export type AuthMode = "login" | "signup";
export type AuthError = "name" | "email" | "pass";

/** Returns the first failing field (map to t.auth.errors[key]), or null when valid. */
export function validateAuth(mode: AuthMode, f: { name: string; email: string; pass: string }): AuthError | null {
  if (mode === "signup" && !f.name.trim()) return "name";
  if (!EMAIL_RE.test(f.email.trim())) return "email";
  if (f.pass.length < 6) return "pass";
  return null;
}
