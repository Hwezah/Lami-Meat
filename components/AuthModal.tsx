"use client";

import { useEffect, useState } from "react";
import { type AuthMode, validateAuth } from "@/lib/auth-validate";
import { useSession } from "@/lib/session";
import { useUI } from "@/lib/ui";
import { CloseIcon } from "./Icons";

export const fieldCls =
  "w-full rounded-lm border-[1.5px] border-ink/16 bg-[#F7F3EC] px-3.5 py-[13px] font-display text-[15px] text-ink placeholder:text-dark-muted focus:border-brass-deep-2 focus:shadow-[0_0_0_3px_rgba(184,149,90,.25)] focus:outline-none";
const labCls = "mb-[7px] block font-mono text-[10.5px] uppercase tracking-[.1em] text-bone-muted";
const h2Cls = "m-0 mb-1.5 font-display text-[26px] font-black uppercase tracking-[-0.03em] text-ink";
const subCls = "m-0 mb-[22px] text-sm leading-normal text-bone-muted";
const linkCls = "font-bold text-brass-deep";

/** Nav account icon modal: sign in / create account / sign-out confirmation. UI stub (see lib/session.ts). */
export function AuthModal() {
  const modal = useUI((s) => s.auth);
  const { openAuth, closeAuth } = useUI();
  const { session, signIn, signOut } = useSession();
  const [f, setF] = useState({ name: "", email: "", pass: "" });
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    setShowPass(false);
    setF((v) => ({ ...v, pass: "" }));
  }, [modal]);

  if (!modal) return null;

  const submit = (mode: AuthMode) => {
    const e = validateAuth(mode, f);
    if (e) return setErr(e);
    const email = f.email.trim();
    signIn({ name: mode === "signup" ? f.name.trim() : email.split("@")[0], email });
    setF({ name: "", email: "", pass: "" });
    closeAuth();
  };

  const input = (key: keyof typeof f, type: string, placeholder: string) => (
    <input className={fieldCls} type={type} placeholder={placeholder} value={f[key]} onChange={(e) => (setF({ ...f, [key]: e.target.value }), setErr(""))} />
  );
  const pass = (placeholder: string) => (
    <div className="relative">
      <input className={`${fieldCls} pr-11`} type={showPass ? "text" : "password"} placeholder={placeholder} value={f.pass} onChange={(e) => (setF({ ...f, pass: e.target.value }), setErr(""))} />
      <button type="button" onClick={() => setShowPass(!showPass)} aria-label="Toggle password" className="absolute top-1/2 right-2 -translate-y-1/2 px-1.5 font-mono text-[10px] uppercase text-bone-muted">
        {showPass ? "Hide" : "Show"}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-5">
      <div onClick={closeAuth} className="absolute inset-0 bg-black/62 backdrop-blur-[3px]" />
      <div role={modal === "signout" ? "alertdialog" : "dialog"} aria-modal="true" className="relative w-[400px] max-w-full rounded-lm border border-brass bg-bone p-7 shadow-[0_30px_70px_-20px_rgba(0,0,0,.5)] max-[560px]:w-[calc(100vw-28px)]">
        <button onClick={closeAuth} aria-label="Close" className="absolute top-3.5 right-3.5 flex size-12 items-center justify-center rounded-lm text-bone-muted hover:bg-bone-2 hover:text-ink">
          <CloseIcon />
        </button>

        {modal === "signout" ? (
          <>
            <h2 className={h2Cls}>Sign out?</h2>
            <p className={subCls}>You&apos;re signed in as {session?.email}. Your saved meat box stays on this device.</p>
            <div className="flex gap-[11px]">
              <button onClick={closeAuth} className="flex-1 rounded-lm border-[1.5px] border-ink/16 p-[13px] font-display text-[14.5px] font-bold text-ink">
                Cancel
              </button>
              <button onClick={() => (signOut(), closeAuth())} className="flex-1 rounded-lm bg-ink p-[13px] font-display text-[14.5px] font-bold text-bone">
                Sign out
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={(e) => (e.preventDefault(), submit(modal))} noValidate>
            <h2 className={h2Cls}>{modal === "login" ? "Sign in" : "Create account"}</h2>
            <p className={subCls}>{modal === "login" ? "Welcome back. Enter your details to continue." : "Join LAMI MEAT to save your box and order faster."}</p>
            <div className="flex flex-col gap-3.5">
              {modal === "signup" && (
                <label>
                  <span className={labCls}>Full name</span>
                  {input("name", "text", "Jane Doe")}
                </label>
              )}
              <label>
                <span className={labCls}>Email</span>
                {input("email", "email", "you@example.com")}
              </label>
              <label>
                <span className={labCls}>Password</span>
                {pass(modal === "login" ? "••••••••" : "At least 6 characters")}
              </label>
              {err && <div className="text-[13px] font-semibold text-error-bone">{err}</div>}
              <button type="submit" className="mt-0.5 w-full rounded-lm bg-ink p-[15px] font-display text-[15px] font-bold tracking-[.08em] text-bone uppercase hover:bg-brass-deep-2">
                {modal === "login" ? "Sign in" : "Create account"}
              </button>
            </div>
            <div className="mt-5 text-center text-[13.5px] text-bone-muted">
              {modal === "login" ? (
                <>
                  New here?{" "}
                  <button type="button" className={linkCls} onClick={() => openAuth("signup")}>
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button type="button" className={linkCls} onClick={() => openAuth("login")}>
                    Sign in
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
