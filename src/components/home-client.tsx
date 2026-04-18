"use client";

import * as React from "react";
import Link from "next/link";
import { RiArrowRightLine, RiLinkedinBoxFill, RiGamepadLine } from "react-icons/ri";
import { FadeIn } from "@/components/animated-text";
import { useTheme } from "@/components/theme-provider";
import { SnakeGame } from "./snake-game";

interface HomeClientProps {
  lang: string;
  cta_primary: string;
}

export function HomeClient({ lang, cta_primary }: HomeClientProps) {
  const { theme } = useTheme();
  const [showGame, setShowGame] = React.useState(false);

  return (
    <>
      <FadeIn direction="up" delay={0.9}>
        <div className="flex flex-row justify-center items-center gap-3 sm:gap-4 mb-16">
          <Link
            href={`/${lang}/about`}
            className="btn-primary px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-md font-bold flex items-center justify-center gap-2 shadow-xl shadow-[var(--primary)]/20 whitespace-nowrap"
          >
            {cta_primary}
            <RiArrowRightLine size={18} />
          </Link>
          
          <a
            href="https://linkedin.com/in/andreashilgers"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-4 sm:px-5 py-3 sm:py-4 rounded-md font-bold flex items-center justify-center transition-all hover:bg-[#0a66c2]/5 shrink-0"
            title="LinkedIn Profile"
          >
            <RiLinkedinBoxFill size={24} className="text-[#0a66c2]" />
          </a>

          {/* Easter Egg Game Button */}
          {theme === 'pixel' && (
            <button
              onClick={() => setShowGame(true)}
              className="btn-outline px-4 sm:px-5 py-3 sm:py-4 rounded-md font-bold flex items-center justify-center transition-all hover:bg-[var(--primary)]/10 shrink-0 animate-pulse border-[var(--secondary)] text-[var(--secondary)]"
              title="Play Snake"
            >
              <RiGamepadLine size={24} />
            </button>
          )}
        </div>
      </FadeIn>

      {showGame && <SnakeGame onClose={() => setShowGame(false)} />}
    </>
  );
}
