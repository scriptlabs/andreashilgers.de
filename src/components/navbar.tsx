"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, TreePine, Globe, Lock } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  dict: any;
  lang: string;
}

export function Navbar({ dict, lang }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.projects, href: `/${lang}#projects` },
    { label: dict.nav.experience, href: `/${lang}#experience` },
    { label: dict.nav.skills, href: `/${lang}#skills` },
  ];

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="text-xl font-bold gradient-text">
              AH
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-2 rounded-full hover:bg-[var(--card)] transition-colors">
                  <Globe size={20} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-[var(--card)] p-2 rounded-lg border shadow-lg min-w-[120px] z-50" align="end">
                  <DropdownMenu.Item asChild className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded">
                    <Link href={pathname.replace(`/${lang}`, "/de")}>Deutsch</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded">
                    <Link href={pathname.replace(`/${lang}`, "/en")}>English</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* Theme Switcher */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-2 rounded-full hover:bg-[var(--card)] transition-colors">
                  {theme === 'dark' ? <Moon size={20} /> : theme === 'forest' ? <TreePine size={20} /> : <Sun size={20} />}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-[var(--card)] p-2 rounded-lg border shadow-lg min-w-[120px] z-50" align="end">
                  <DropdownMenu.Item onClick={() => setTheme('light')} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded">
                    <Sun size={16} /> Light
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setTheme('dark')} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded">
                    <Moon size={16} /> Dark
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setTheme('forest')} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded">
                    <TreePine size={16} /> Forest
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setTheme('system')} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded">
                    <Monitor size={16} /> System
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* Secret Vault Link */}
            <Link href={`/${lang}/vault`} className="p-2 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--secondary)] hover:text-[var(--primary)]">
              <Lock size={18} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
