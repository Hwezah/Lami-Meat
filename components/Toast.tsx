"use client";

import Link from "next/link";
import { useUI } from "@/lib/ui";

export function Toast() {
  const toast = useUI((s) => s.toast);
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-80 -translate-x-1/2 mp:right-4 mp:left-4 mp:translate-none" role="status" aria-live="polite">
      <div className="flex items-center gap-3.5 rounded-lm bg-bone py-3.5 pr-4 pl-5 text-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,.7)] mp:flex-col mp:items-stretch mp:text-center">
        <span className="text-sm font-semibold">{toast.msg}</span>
        <Link href="/cart" className="rounded-lm bg-ink px-4 py-2.5 text-center text-[13px] font-bold whitespace-nowrap text-bone">
          View cart →
        </Link>
      </div>
    </div>
  );
}
