"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { 
  RiMoonLine, 
  RiSunLine, 
  RiTreeLine, 
  RiLockPasswordLine, 
  RiMenuLine, 
  RiCloseLine 
} from "react-icons/ri";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dictionary } from "@/lib/dictionary";
import LanguageSwitcher from "./language-switcher";

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
                <LanguageSwitcher currentLang={lang} />
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
                href={`/${lang}/contact`}
                className="hidden lg:block bg-[var(--primary)] text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-[var(--primary-hover)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {dict.nav.hire_me}
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
                <Link 
                  href={pathname.replace(`/${lang}`, lang === "de" ? "/en" : "/de")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-5 py-3 rounded-md text-lg font-medium text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-5 overflow-hidden rounded-[2px] shadow-sm flex items-center border border-black/5">
                      {lang === "de" ? (
                        <svg viewBox="0 0 60 30" className="w-full h-full">
                          <rect width="60" height="30" fill="#012169"/>
                          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                          <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10"/>
                          <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 5 3" className="w-full h-full">
                          <rect width="5" height="3" y="0" fill="#000"/>
                          <rect width="5" height="2" y="1" fill="#D00"/>
                          <rect width="5" height="1" y="2" fill="#FFCE00"/>
                        </svg>
                      )}
                    </span>
                    {lang === 'de' ? 'English' : 'Deutsch'}
                  </span>
                </Link>

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
