export function TopBar() {
  return (
    <div className="flex flex-wrap justify-center gap-x-7 gap-y-2.5 border-b border-bone/10 px-[18px] py-[9px] text-center font-mono text-[11px] uppercase tracking-[.14em] text-brass">
      <span>Smokehouse &amp; butchery · Kampala</span>
      <span className="max-md:hidden">Cold delivery Mon–Sat</span>
    </div>
  );
}
