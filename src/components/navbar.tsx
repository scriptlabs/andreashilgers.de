"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { 
  RiMoonLine, 
  RiSunLine, 
  RiTreeLine, 
  RiGlobalLine, 
  RiLockPasswordLine, 
  RiMenuLine, 
  RiCloseLine 
} from "react-icons/ri";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dictionary } from "@/lib/dictionary";

interface NavbarProps {
  dict: Dictionary;
  lang: string;
}

export function Navbar({ dict, lang }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.experience, href: `/${lang}/experience` },
    { label: dict.nav.projects, href: `/${lang}/projects` },
    { label: dict.nav.skills, href: `/${lang}/skills` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ];

  const getThemeIcon = () => {
    if (!mounted) return <RiSunLine size={20} className="opacity-50" />;
    switch (theme) {
      case 'dark':
        return <RiMoonLine size={20} />;
      case 'forest':
        return <RiTreeLine size={20} />;
      default:
        return <RiSunLine size={20} />;
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--card)]/95 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href={`/${lang}`} className="flex items-center gap-2 group">
              <span className="text-2xl font-black gradient-text">AH</span>
              <span className="hidden sm:inline text-sm text-[var(--secondary)] group-hover:text-[var(--primary)] transition-colors">Andreas Hilgers</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.href === `/${lang}` 
                  ? pathname === item.href 
                  : pathname === item.href || pathname.startsWith(item.href + '/');
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                        : 'text-[var(--foreground)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-md hover:bg-[var(--background)] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
              </button>

              {/* Language Switcher - Desktop */}
              <div className="hidden md:block">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      className="p-2.5 rounded-md hover:bg-[var(--background)] transition-colors"
                      aria-label="Change language"
                    >
                      <RiGlobalLine size={20} />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="bg-[var(--card)] p-2 rounded-md border border-[var(--border)] shadow-lg min-w-[140px] z-50"
                      align="end"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item asChild className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors text-sm">
                        <Link href={pathname.replace(`/${lang}`, "/de")}>
                          <span>🇩🇪</span>
                          <span className="ml-2">Deutsch</span>
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors text-sm">
                        <Link href={pathname.replace(`/${lang}`, "/en")}>
                          <span>🇬🇧</span>
                          <span className="ml-2">English</span>
                        </Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>

              {/* Theme Switcher - Desktop */}
              <div className="hidden md:block">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      className="p-2.5 rounded-md hover:bg-[var(--background)] transition-colors"
                      aria-label="Change theme"
                    >
                      {getThemeIcon()}
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="bg-[var(--card)] p-2 rounded-md border border-[var(--border)] shadow-lg min-w-[160px] z-50"
                      align="end"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item onClick={() => setTheme('light')} className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors text-sm">
                        <RiSunLine size={16} /> Light
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => setTheme('dark')} className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors text-sm">
                        <RiMoonLine size={16} /> Dark
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => setTheme('forest')} className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors text-sm">
                        <RiTreeLine size={16} /> Forest
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>

              {/* Vault Link */}
              <Link
                href={`/${lang}/vault`}
                className="p-2.5 rounded-md hover:bg-[var(--background)] transition-colors text-[var(--secondary)] hover:text-[var(--primary)]"
                aria-label={dict.nav.vault}
              >
                <RiLockPasswordLine size={18} />
              </Link>

              {/* Hire Me Badge */}
              <Link
                href="mailto:andreas_hilgers@icloud.com"
                className="hidden lg:block bg-[var(--primary)] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--card)] z-40 lg:hidden">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-md hover:bg-[var(--background)] transition-colors"
                aria-label="Close menu"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = item.href === `/${lang}` 
                  ? pathname === item.href 
                  : pathname === item.href || pathname.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-5 py-3 rounded-md text-lg font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                        : 'text-[var(--foreground)] hover:bg-[var(--primary)]/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="w-full flex items-center justify-between px-5 py-3 rounded-md text-lg font-medium text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-colors">
                      <span className="flex items-center gap-3">
                        <span>{lang === 'de' ? '🇩🇪' : '🇬🇧'}</span>
                        Language
                      </span>
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-[var(--card)] p-2 rounded-md border border-[var(--border)] shadow-lg min-w-[140px] z-50" align="start">
                      <DropdownMenu.Item asChild className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors">
                        <Link href={pathname.replace(`/${lang}`, "/de")} onClick={() => setMobileMenuOpen(false)}>
                          <span>🇩🇪</span>
                          <span className="ml-2">Deutsch</span>
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors">
                        <Link href={pathname.replace(`/${lang}`, "/en")} onClick={() => setMobileMenuOpen(false)}>
                          <span>🇬🇧</span>
                          <span className="ml-2">English</span>
                        </Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="w-full flex items-center justify-between px-5 py-3 rounded-md text-lg font-medium text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-colors">
                      <span className="flex items-center gap-3">
                        {getThemeIcon()}
                        Theme
                      </span>
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-[var(--card)] p-2 rounded-md border border-[var(--border)] shadow-lg min-w-[160px] z-50" align="start">
                      <DropdownMenu.Item onClick={() => { setTheme('light'); setMobileMenuOpen(false); }} className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors">
                        <RiSunLine size={16} /> Light
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => { setTheme('dark'); setMobileMenuOpen(false); }} className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors">
                        <RiMoonLine size={16} /> Dark
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => { setTheme('forest'); setMobileMenuOpen(false); }} className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-[var(--primary)]/5 rounded-md transition-colors">
                        <RiTreeLine size={16} /> Forest
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <Link
                  href={`/${lang}/vault`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 rounded-md text-lg font-medium text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-colors"
                >
                  <RiLockPasswordLine size={20} />
                  {dict.nav.vault}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
