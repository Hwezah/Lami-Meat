"use client";

import { useEffect, useState } from "react";
import { heroWordColors, heroWords } from "@/data/home";

/** Home hero word. Cycles every 2.6s; colour by index % 3; blur-up entrance (off under reduced motion). */
export function RotatingWord({ words = heroWords, interval = 2600 }: { words?: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span key={words[i]} className="inline-block animate-word-in" style={{ color: heroWordColors[i % 3] }}>
      {words[i]}
    </span>
  );
}
