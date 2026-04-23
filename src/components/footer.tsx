"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dictionary } from "@/lib/dictionary";

interface FooterProps {
  dict: Dictionary;
  lang: string;
}

export function Footer({ dict, lang }: FooterProps) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  if (isHome) return null;

  return (
    <footer className="py-8 border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--secondary)]">
            © {new Date().getFullYear()} {dict.hero.name}. {dict.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}/imprint`}
              className="text-sm text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
            >
              {dict.footer.imprint}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
