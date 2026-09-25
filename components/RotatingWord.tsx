"use client";

import { useEffect, useState } from "react";
import { heroWordColors } from "@/data/home";
import { useT } from "@/lib/i18n/provider";

/** Home hero word. Cycles every 2.6s; colour by index % 3; blur-up entrance (off under reduced motion). */
export function RotatingWord({ interval = 2600 }: { interval?: number }) {
  const words = useT().home.heroWords;
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);
  return (
    <span key={words[i]} className="inline-block animate-word-in" style={{ color: heroWordColors[i % 3] }}>
      {words[i]}
    </span>
  );
}
