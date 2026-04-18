"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "./theme-provider";

interface FloatingComicProps {
  src: string;
  alt: string;
}

export function FloatingComic({ src, alt }: FloatingComicProps) {
  const { theme } = useTheme();
  
  // Use me_dark.png if Pixel theme is active, otherwise use the passed src (me_comic.png)
  const activeSrc = theme === 'pixel' ? '/images/me_dark.png' : src;

  return (
    <div className="fixed bottom-0 right-0 w-[180px] sm:w-[240px] md:w-[320px] lg:w-[420px] aspect-square z-20 pointer-events-none select-none">
      <motion.div 
        key={activeSrc} // Use key to trigger re-animation on source change
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="relative w-full h-full"
      >
        <Image
          src={activeSrc}
          alt={alt}
          fill
          priority
          sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 320px, 420px"
          className="object-contain object-right-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        />
      </motion.div>
    </div>
  );
}
