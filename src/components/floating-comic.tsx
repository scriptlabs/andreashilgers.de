"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FloatingComicProps {
  src: string;
  alt: string;
}

export function FloatingComic({ src, alt }: FloatingComicProps) {
  return (
    <div className="fixed bottom-0 right-0 w-[180px] sm:w-[240px] md:w-[320px] lg:w-[420px] aspect-square z-20 pointer-events-none select-none">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1] // Custom ease-out expo
        }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-contain object-right-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        />
      </motion.div>
    </div>
  );
}
