"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/provider";
import { EMAIL_RE, readJSON, writeJSON } from "@/lib/storage";

/** "The LAMI letter". Stores { email, at } in localStorage["lm-newsletter"].
 *  TODO(prod): POST to the ESP (Mailchimp / Brevo) and keep localStorage as a UI flag only. */
export function Newsletter() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [bad, setBad] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (readJSON<{ email: string }>("local", "lm-newsletter")?.email) setDone(true);
  }, []);

  if (done) return <div className="border-b border-brass py-3.5 text-[15.5px] text-bone">{t.home.subscribed}</div>;

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const em = email.trim();
    if (!EMAIL_RE.test(em)) return setBad(true);
    writeJSON("local", "lm-newsletter", { email: em, at: Date.now() });
    setDone(true);
  };

  return (
    <form onSubmit={subscribe} noValidate>
      <div className="flex border-b border-brass mp:flex-col mp:items-stretch mp:gap-2.5">
        <input
          value={email}
          onChange={(e) => (setEmail(e.target.value), setBad(false))}
          type="email"
          placeholder={t.home.emailPlaceholder}
          aria-label={t.home.emailPlaceholder}
          className="min-w-0 flex-1 bg-transparent px-0.5 py-3.5 font-display text-base text-bone outline-none mp:text-center"
        />
        <button type="submit" className="inline-flex items-center gap-2 py-3.5 pe-1 ps-4 font-display text-[13.5px] font-extrabold tracking-[.1em] text-brass uppercase mp:mx-auto mp:w-[80vw] mp:max-w-full mp:justify-center">
          {t.home.subscribe}
        </button>
      </div>
      {bad && <p className="mt-2.5 text-[13px] text-error-dark mp:text-center">{t.home.emailBad}</p>}
    </form>
  );
}
