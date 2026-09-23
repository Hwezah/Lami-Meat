/** Safe JSON helpers for web storage (private mode / blocked storage never throw). */
export function readJSON<T>(store: "local" | "session", key: string): T | null {
  try {
    const s = store === "local" ? localStorage : sessionStorage;
    return JSON.parse(s.getItem(key) ?? "null") as T | null;
  } catch {
    return null;
  }
}

export function writeJSON(store: "local" | "session", key: string, value: unknown) {
  try {
    const s = store === "local" ? localStorage : sessionStorage;
    if (value === null) s.removeItem(key);
    else s.setItem(key, JSON.stringify(value));
  } catch {}
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
