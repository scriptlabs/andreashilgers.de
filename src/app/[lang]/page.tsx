"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, TreePine } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold">Andreas Hilgers</h1>
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-2 border rounded-full hover:bg-[var(--card)] transition-colors">
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-[var(--card)] p-2 rounded-lg border shadow-lg min-w-[120px] z-50">
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
      </header>

      <section className="mb-16">
        <h2 className="text-5xl font-extrabold mb-4">Willkommen auf meinem Portfolio</h2>
        <p className="text-xl text-[var(--secondary)] mb-8">
          Ich bin Software-Entwickler mit Leidenschaft für moderne Webtechnologien und barrierefreie Interfaces.
        </p>
        <button className="btn-primary">Meine Projekte ansehen</button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Projekt 1</h3>
          <p className="text-[var(--secondary)]">Eine moderne Webanwendung mit Next.js und Radix UI.</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Projekt 2</h3>
          <p className="text-[var(--secondary)]">Barrierefreies Design und performante Schnittstellen.</p>
        </div>
      </section>
    </main>
  );
}
