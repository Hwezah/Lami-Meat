import { EMAIL_RE } from "./storage";

export type AuthMode = "login" | "signup";

/** Returns the first error message, or null when the fields are valid. */
export function validateAuth(mode: AuthMode, f: { name: string; email: string; pass: string }): string | null {
  if (mode === "signup" && !f.name.trim()) return "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) return "Enter a valid email address.";
  if (f.pass.length < 6) return "Password must be at least 6 characters.";
  return null;
}
