import { Photo } from "./Photo";

/** Photo with the offset 1px brass outline box behind it. */
export function FramedPhoto({ src, alt, aspect = "aspect-[4/5]", offset = 18, line = "border-brass", sizes = "(max-width:920px) 100vw, 50vw", priority }: {
  src: string;
  alt: string;
  aspect?: string;
  offset?: 16 | 18;
  line?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative ${offset === 16 ? "me-4" : "me-[18px]"}`}>
      <div aria-hidden className={`absolute border ${line} ${offset === 16 ? "inset-[16px_-16px_-16px_16px] rtl:inset-[16px_16px_-16px_-16px]" : "inset-[18px_-18px_-18px_18px] rtl:inset-[18px_18px_-18px_-18px]"}`} />
      <div className={`relative w-full overflow-hidden bg-bone-2 ${aspect}`}>
        <Photo src={src} alt={alt} sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
