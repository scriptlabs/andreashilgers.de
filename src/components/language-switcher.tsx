"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-full hover:bg-[var(--card)] transition-colors text-sm font-medium uppercase">
          <Languages size={18} />
          {currentLang}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-[var(--card)] p-2 rounded-lg border shadow-lg min-w-[120px] z-50 animate-in fade-in zoom-in duration-200">
          <DropdownMenu.Item asChild className="outline-none">
            <Link href={redirectedPathname("de")} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded">
              Deutsch
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className="outline-none">
            <Link href={redirectedPathname("en")} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded">
              English
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
