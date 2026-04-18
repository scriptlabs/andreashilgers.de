"use client";

import Image from "next/image";

interface FloatingComicProps {
  src: string;
  alt: string;
}

export function FloatingComic({ src, alt }: FloatingComicProps) {
  return (
    <div className="fixed bottom-0 right-0 w-[180px] sm:w-[240px] md:w-[320px] lg:w-[420px] aspect-square z-20 pointer-events-none select-none">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-contain object-right-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        />
      </div>
    </div>
  );
}
