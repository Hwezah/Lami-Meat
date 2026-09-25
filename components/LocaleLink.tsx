"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { localizeHref } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/provider";

/** next/link that prefixes internal paths with the current locale ("/range" → "/ar/range"). */
export default function LocaleLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const locale = useLocale();
  return <Link href={typeof href === "string" ? localizeHref(href, locale) : href} {...rest} />;
}
