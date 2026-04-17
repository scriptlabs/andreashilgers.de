"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const targetLang = currentLang === "de" ? "en" : "de";

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <Link 
      href={redirectedPathname(targetLang)} 
      className="flex items-center justify-center w-10 h-10 border border-[var(--border)] rounded-md hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all group overflow-hidden"
      title={targetLang === "de" ? "Zu Deutsch wechseln" : "Switch to English"}
    >
      <div className="relative w-7 h-5 overflow-hidden rounded-[2px] shadow-sm border border-black/5">
        {targetLang === "de" ? (
          // German Flag (Simple CSS/SVG)
          <svg viewBox="0 0 5 3" className="w-full h-full">
            <rect width="5" height="3" y="0" fill="#000"/>
            <rect width="5" height="2" y="1" fill="#D00"/>
            <rect width="5" height="1" y="2" fill="#FFCE00"/>
          </svg>
        ) : (
          // UK Flag (Simple CSS/SVG)
          <svg viewBox="0 0 60 30" className="w-full h-full">
            <rect width="60" height="30" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6"/>
          </svg>
        )}
      </div>
    </Link>
  );
}
