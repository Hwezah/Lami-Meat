"use client";

import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import Link from "@/components/LocaleLink";
import { cta, field, fieldLabel } from "@/components/ui";
import { type AuthError, type AuthMode, validateAuth } from "@/lib/auth-validate";
import { countOf, useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n/provider";
import { useSession } from "@/lib/session";
import { useHydrated } from "@/lib/use-hydrated";

const h1 = "m-0 font-display text-[clamp(46px,6vw,96px)] leading-[.88] font-black tracking-[-0.045em] text-bone uppercase";

/** /account: sign in / create account tabs, then the signed-in state. Shares lm-session with the nav modal. */
export function AccountPanel() {
  const t = useT();
  const A = t.account;
  const hydrated = useHydrated();
  const { session, signIn, signOut } = useSession();
  const count = countOf(useCart((s) => s.box));
  const [mode, setMode] = useState<AuthMode>("login");
  const [f, setF] = useState({ name: "", email: "", pass: "" });
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState<AuthError | null>(null);

  useEffect(() => {
    if (/signup/.test(window.location.hash)) setMode("signup");
  }, []);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => (setF({ ...f, [k]: e.target.value }), setErr(null));
  const switchTo = (m: AuthMode) => (setMode(m), setErr(null));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const bad = validateAuth(mode, f);
    if (bad) return setErr(bad);
    const email = f.email.trim();
    signIn({ name: mode === "signup" ? f.name.trim() : email.split("@")[0], email });
    setF({ name: "", email: "", pass: "" });
  };

  if (!hydrated) return <div className="min-h-[420px]" />;

  if (session)
    return (
      <div>
        <h1 className={h1}>
          {A.good1}
          <br />
          <span className="text-brass">{A.good2}</span>
        </h1>
        <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-dark-body mp:mx-auto">{A.signedIn(session.email)}</p>
        <div data-cta-actions className="mt-[30px] flex flex-wrap gap-3">
          <Link href="/cart" className={cta.brass}>
            {A.viewCart(count)}
          </Link>
          <Link href="/range" className={cta.outline}>
            {A.theRange}
          </Link>
        </div>
        <button type="button" onClick={signOut} className="mt-[22px] min-h-11 font-mono text-[11px] tracking-[.14em] text-dark-muted uppercase hover:text-bone">
          {t.auth.signOut}
        </button>
      </div>
    );

  const passField = (
    <label>
      <span className={fieldLabel()}>{t.auth.password}</span>
      <div className="relative">
        <input className={`${field()} pe-[52px]`} type={showPass ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} value={f.pass} onChange={set("pass")} placeholder={t.auth.passPlaceholder} />
        <button type="button" onClick={() => setShowPass(!showPass)} aria-label={t.auth.togglePass} className="absolute top-1/2 end-0 min-h-11 -translate-y-1/2 px-1 font-mono text-[10.5px] tracking-[.14em] text-brass uppercase">
          {showPass ? t.auth.hide : t.auth.show}
        </button>
      </div>
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="mb-[clamp(26px,3vw,38px)] flex gap-6 mp:justify-center" role="tablist">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => switchTo(m)}
            className={`min-h-11 border-b-[1.5px] pb-2 font-display text-sm font-extrabold tracking-[.08em] uppercase ${mode === m ? "border-brass text-bone" : "border-transparent text-dark-faint hover:text-dark-body"}`}
          >
            {m === "login" ? t.auth.signIn : t.auth.createAccount}
          </button>
        ))}
      </div>
      <h1 className={h1}>
        {mode === "login" ? A.welcome1 : A.join1}
        <br />
        <span className="text-brass">{mode === "login" ? A.welcome2 : A.join2}</span>
      </h1>
      <div className="mt-[clamp(28px,3vw,40px)] flex w-full flex-col gap-[22px] text-start">
        {mode === "signup" && (
          <label>
            <span className={fieldLabel()}>{t.auth.fullName}</span>
            <input className={field()} type="text" autoComplete="name" value={f.name} onChange={set("name")} placeholder={t.auth.namePlaceholder} />
          </label>
        )}
        <label>
          <span className={fieldLabel()}>{t.auth.email}</span>
          <input className={field()} type="email" autoComplete="email" value={f.email} onChange={set("email")} placeholder={t.auth.emailPlaceholder} dir="ltr" />
        </label>
        {passField}
      </div>
      {err && <p className="mt-4 text-sm text-error-dark">{t.auth.errors[err]}</p>}
      <div data-cta-actions className="mt-[30px] flex w-full">
        <button type="submit" className={`${cta.brass} w-full`}>
          {mode === "login" ? t.auth.signIn : t.auth.createAccount} {t.common.arrow}
        </button>
      </div>
    </form>
  );
}

export function AccountEyebrow() {
  const t = useT();
  return (
    <Eyebrow rule className="mb-[clamp(22px,2.6vw,34px)]">
      {t.account.eyebrow}
    </Eyebrow>
  );
}
