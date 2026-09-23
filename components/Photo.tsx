"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * next/image with object-fit: cover that fills its (positioned) parent.
 * If the file is missing from public/images, it falls back to a labelled bone well,
 * so the layout holds until the client photos are dropped in.
 */
export function Photo({ src, alt, priority, sizes = "100vw", className = "" }: { src: string; alt: string; priority?: boolean; sizes?: string; className?: string }) {
  const [broken, setBroken] = useState(false);
  if (broken)
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-bone-2 p-3 text-center font-mono text-[10px] uppercase tracking-[.14em] text-bone-muted ${className}`}>
        {src.split("/").pop()}
      </div>
    );
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-cover ${className}`} onError={() => setBroken(true)} />;
}
