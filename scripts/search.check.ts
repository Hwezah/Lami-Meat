// Regression checks for lib/search.ts. Run: npm test
import { getDict } from "@/lib/i18n/dict";
import { products } from "@/lib/products";
import { searchProducts } from "@/lib/search";
const en = getDict("en"), ar = getDict("ar");
const labels = (p: (typeof products)[number]) => [en.products[p.id].name, p.name, en.common.kinds[p.kind], p.kind, ar.products[p.id].name, ar.common.kinds[p.kind], en.products[p.id].short, p.desc];
const cases: [string, string[]][] = [
  ["sausage", ["smoked-sausages"]], ["Sausages", ["smoked-sausages"]], ["SAUSAGE!!", ["smoked-sausages"]], ["saus", ["smoked-sausages"]], ["sausge", ["smoked-sausages"]], ["sasuage", ["smoked-sausages"]],
  ["hot dog", ["hot-dogs"]], ["hotdog", ["hot-dogs"]], ["hot-dogs", ["hot-dogs"]], ["hotdogs", ["hot-dogs"]], ["frankfurter", ["hot-dogs"]], ["wiener", ["hot-dogs"]],
  ["mince", ["minced-beef","lean-minced-beef"]], ["minced meat", ["minced-beef","lean-minced-beef"]], ["ground beef", ["minced-beef","lean-minced-beef"]], ["keema", ["minced-beef"]], ["minse", ["minced-beef","lean-minced-beef"]],
  ["lean", ["lean-minced-beef"]], ["low-fat mince", ["lean-minced-beef"]], ["lean mince 1kg", ["lean-minced-beef"]], ["I want 2 packs of smoked sausages 500g", ["smoked-sausages"]],
  ["smoked", ["smoked-sausages","hot-dogs"]], ["fresh", ["minced-beef","lean-minced-beef"]], ["burger", ["minced-beef","lean-minced-beef"]], ["samosa", ["minced-beef"]],
  ["نقانق", ["smoked-sausages","hot-dogs"]], ["النقانق", ["smoked-sausages","hot-dogs"]], ["نقانق مدخّنة", ["smoked-sausages"]], ["سجق", ["smoked-sausages"]],
  ["هوت دوغ", ["hot-dogs"]], ["هوتدوج", ["hot-dogs"]], ["لحم مفروم", ["minced-beef","lean-minced-beef"]], ["مفرومة", ["minced-beef","lean-minced-beef"]], ["اللحم المفروم", ["minced-beef","lean-minced-beef"]],
  ["قليل الدهن", ["lean-minced-beef"]], ["مفروم قليل الدسم", ["lean-minced-beef"]], ["كيمة", ["minced-beef"]], ["أريد عبوة نقانق", ["smoked-sausages","hot-dogs"]], ["مدخن", ["smoked-sausages","hot-dogs"]], ["طازج", ["minced-beef","lean-minced-beef"]],
  ["chicken", []], ["pork", []], ["xyz", []], ["500g", []],
];
let fail = 0;
for (const [q, want] of cases) {
  const got = searchProducts(q, labels).map((p) => p.id);
  const ok = want.length === 0 ? got.length === 0 : want.every((w) => got.includes(w)) && got[0] === want[0];
  if (!ok) fail++;
  console.log(ok ? "ok  " : "FAIL", JSON.stringify(q).padEnd(42), "→", got.join(", ") || "(none)");
}
console.log(fail ? `${fail} failing` : "all passing");
if (fail) process.exit(1);
