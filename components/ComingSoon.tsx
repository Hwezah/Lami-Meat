/** Scaffold placeholder for page sections not yet built. Remove as each page is completed. */
export function ComingSoon({ design, sections }: { design: string; sections: string[] }) {
  return (
    <section className="lm-section">
      <div className="lm-wrap border border-dashed border-brass/40 p-[clamp(24px,4vw,48px)]">
        <div className="lm-eyebrow text-brass">Scaffold · to build</div>
        <p className="mt-3 text-dark-body">
          Rebuild from <code className="font-mono text-bone">design/{design}</code>:
        </p>
        <ul className="mt-3 list-disc pl-5 text-dark-body">
          {sections.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
