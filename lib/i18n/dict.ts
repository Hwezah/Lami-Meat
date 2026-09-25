import type { Locale } from "./config";
import { ar } from "./ar";
import { en, type Dict } from "./en";

export type { Dict };
const dicts: Record<Locale, Dict> = { en, ar };
export const getDict = (l: Locale): Dict => dicts[l];
