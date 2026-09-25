import { products, type Product } from "./products";

/**
 * Product search for the search sheet. Matches English and Arabic, ignoring case, accents,
 * Arabic diacritics/letter variants and punctuation; tolerates plurals, partial words,
 * spacing ("hot dog" / "hotdog" / "hot-dog") and small typos; knows common synonyms.
 */

/** Extra words people might type, per product id (English + Arabic). */
const ALIASES: Record<string, string[]> = {
  "smoked-sausages": [
    "smoked sausage", "sausage", "smokies", "smoky", "smokey", "beef sausage", "links", "kielbasa", "breakfast", "stew", "beans",
    "نقانق", "سجق", "مقانق", "نقانق مدخنه", "مدخن", "فطور",
  ],
  "hot-dogs": [
    "hot dog", "hotdog", "frank", "frankfurter", "wiener", "weiner", "vienna", "bun", "kachumbari", "party", "grill",
    "هوت دوغ", "هوتدوغ", "هوت دوج", "هوتدوج", "نقانق", "فرانكفورتر", "خبز",
  ],
  "minced-beef": [
    "mince", "minced", "mincemeat", "mince meat", "minced meat", "ground beef", "ground meat", "keema", "kima", "burger", "samosa", "sambusa", "bolognese", "pasta", "sauce", "meatballs", "kofta", "kebab",
    "لحم مفروم", "مفروم", "لحمه مفرومه", "كيمه", "قيمه", "برغر", "برجر", "سمبوسه", "سمبوسك", "كفته", "معكرونه", "صلصه",
  ],
  "lean-minced-beef": [
    "lean", "extra lean", "low fat", "lowfat", "light", "healthy", "mince", "minced", "mincemeat", "mince meat", "minced meat", "ground beef", "ground meat", "keema", "burger",
    "قليل الدهن", "قليل الدسم", "خفيف", "صحي", "لحم مفروم", "مفروم", "برغر",
  ],
};

/** Words that carry no meaning for matching (normalized form). */
const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "for", "with", "some", "any", "i", "im", "want", "need", "looking", "buy", "get", "order", "please", "pack", "packs", "pkt", "me", "to",
  "من", "في", "و", "او", "اريد", "ابغي", "ابي", "عايز", "بدي", "عبوه", "عبوات", "لو", "سمحت", "على",
]);

/** Sizes, quantities and bare numbers never decide a match. */
const isQuantity = (w: string) => /^\d+([.,]\d+)?(g|gm|gms|gr|gram|grams|kg|kgs|kilo|kilos|غ|غم|غرام|كغ|كيلو)?$/.test(w) || /^(g|kg|kilo|غرام|كيلو|كغ|غ)$/.test(w);

/** Lowercase, strip accents and Arabic diacritics/tatweel, unify Arabic letter variants, drop punctuation. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "") // combining marks: Latin accents + Arabic tashkeel (fatha, shadda, sukun…)
    .replace(/ـ/g, "") // tatweel ـ
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)) // Arabic-Indic digits → 0-9
    .replace(/[^\p{L}\p{N}]+/gu, " ") // punctuation, hyphens, emoji → space
    .trim()
    .replace(/\s+/g, " ");
}

/** Light stemming so plurals and verb forms meet: sausages→sausage, minced→minc, dogs→dog; Arabic "ال" prefix. */
function stem(w: string): string {
  if (/^\p{Script=Arabic}/u.test(w)) return w.length > 4 && w.startsWith("ال") ? w.slice(2) : w;
  return w.replace(/(ies)$/, "y").replace(/(es|s|ed|ing|e)$/, "") || w;
}

/** Edit distance (insert, delete, substitute, swap two neighbours) ≤ max? Optimal-string-alignment variant. */
function within(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return false;
  }
  return d[a.length][b.length] <= max;
}

type Index = { product: Product; words: string[]; stems: string[]; compact: string; nameWords: Set<string> };

function build(p: Product, labels: string[]): Index {
  const nameText = normalize(labels.slice(0, 2).join(" "));
  const text = normalize([...labels, ...(ALIASES[p.id] ?? [])].join(" "));
  const words = [...new Set(text.split(" "))];
  return { product: p, words, stems: words.map(stem), compact: text.replace(/ /g, ""), nameWords: new Set(nameText.split(" ").map(stem)) };
}

/** Score one query token against a product: 0 = no match. Name hits outrank alias/description hits. */
function scoreToken(tok: string, ix: Index): number {
  const st = stem(tok);
  let best = 0;
  ix.stems.forEach((w, i) => {
    const raw = ix.words[i];
    let s = 0;
    if (w === st || raw === tok) s = 10;
    else if (tok.length >= 2 && (raw.startsWith(tok) || (st.length >= 4 && w.startsWith(st)))) s = 7; // partial word ("saus")
    else if (tok.length >= 5 && within(st, w, tok.length >= 8 ? 2 : 1)) s = 5; // typo / swapped letters ("sausge", "sasuage", "minse")
    if (s && ix.nameWords.has(w)) s += 3;
    best = Math.max(best, s);
  });
  if (!best && tok.length >= 3 && ix.compact.includes(tok)) best = 4; // "hotdog" vs "hot dog", joined words
  return best;
}

/**
 * Returns products ranked by relevance. `labels(p)` supplies the visible texts to search
 * (localized name first, then English name, kind, description…).
 */
export function searchProducts(query: string, labels: (p: Product) => string[]): Product[] {
  const q = normalize(query);
  if (!q) return [];
  const raw = q.split(" ");
  const tokens = raw.filter((w) => !STOP.has(w) && !isQuantity(w));
  const compactQuery = raw.join("");
  if (!tokens.length) return [];

  return products
    .map((p) => {
      const ix = build(p, labels(p));
      const scores = tokens.map((t) => scoreToken(t, ix));
      // Every meaningful word must match…
      let total = scores.every((s) => s > 0) ? scores.reduce((a, b) => a + b, 0) : 0;
      // …or the whole query typed without spaces ("hotdogs", "groundbeef") appears.
      const compactStem = stem(compactQuery);
      if (!total && compactQuery.length >= 4 && (ix.compact.includes(compactQuery) || (compactStem.length >= 5 && ix.compact.includes(compactStem)))) total = 6;
      return { p, total };
    })
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total)
    .map((r) => r.p);
}
