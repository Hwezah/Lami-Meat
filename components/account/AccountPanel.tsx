"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { cta, field, fieldLabel } from "@/components/ui";
import { type AuthMode, validateAuth } from "@/lib/auth-validate";
import { countOf, useCart } from "@/lib/cart";
import { useSession } from "@/lib/session";
import { useHydrated } from "@/lib/use-hydrated";

const h1 = "m-0 font-display text-[clamp(46px,6vw,96px)] leading-[.88] font-black tracking-[-0.045em] text-bone uppercase";

/** /account: sign in / create account tabs, then the signed-in state. Shares lm-session with the nav modal. */
export function AccountPanel() {
  const hydrated = useHydrated();
  const { session, signIn, signOut } = useSession();
  const count = countOf(useCart((s) => s.box));
  const [mode, setMode] = useState<AuthMode>("login");
  const [f, setF] = useState({ name: "", email: "", pass: "" });
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (/signup/.test(window.location.hash)) setMode("signup");
  }, []);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => (setF({ ...f, [k]: e.target.value }), setErr(""));
  const switchTo = (m: AuthMode) => (setMode(m), setErr(""));
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
          Good to
          <br />
          <span className="text-brass">see you.</span>
        </h1>
        <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-dark-body mp:mx-auto">Signed in as {session.email}. Your cart is saved on this device.</p>
        <div data-cta-actions className="mt-[30px] flex flex-wrap gap-3">
          <Link href="/cart" className={cta.brass}>
            View cart ({count})
          </Link>
          <Link href="/range" className={cta.outline}>
            The range
          </Link>
        </div>
        <button type="button" onClick={signOut} className="mt-[22px] min-h-11 font-mono text-[11px] tracking-[.14em] text-dark-muted uppercase hover:text-bone">
          Sign out
        </button>
      </div>
    );

  const passField = (
    <label>
      <span className={fieldLabel()}>Password</span>
      <div className="relative">
        <input className={`${field()} pr-[52px]`} type={showPass ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} value={f.pass} onChange={set("pass")} placeholder="At least 6 characters" />
        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-0 min-h-11 -translate-y-1/2 px-1 font-mono text-[10.5px] tracking-[.14em] text-brass uppercase">
          {showPass ? "Hide" : "Show"}
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
            {m === "login" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>
      <h1 className={h1}>
        {mode === "login" ? "Welcome" : "Join"}
        <br />
        <span className="text-brass">{mode === "login" ? "back." : "LAMI."}</span>
      </h1>
      <div className="mt-[clamp(28px,3vw,40px)] flex w-full flex-col gap-[22px] text-left">
        {mode === "signup" && (
          <label>
            <span className={fieldLabel()}>Full name</span>
            <input className={field()} type="text" autoComplete="name" value={f.name} onChange={set("name")} placeholder="Your name" />
          </label>
        )}
        <label>
          <span className={fieldLabel()}>Email</span>
          <input className={field()} type="email" autoComplete="email" value={f.email} onChange={set("email")} placeholder="you@example.com" />
        </label>
        {passField}
      </div>
      {err && <p className="mt-4 text-sm text-error-dark">{err}</p>}
      <div data-cta-actions className="mt-[30px] flex w-full">
        <button type="submit" className={`${cta.brass} w-full`}>
          {mode === "login" ? "Sign in" : "Create account"} →
        </button>
      </div>
    </form>
  );
}

export function AccountEyebrow() {
  return (
    <Eyebrow rule className="mb-[clamp(22px,2.6vw,34px)]">
      Account
    </Eyebrow>
  );
}
