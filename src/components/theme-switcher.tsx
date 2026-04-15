"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, TreePine } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const icons: Record<string, React.ReactNode> = {
    light: <Sun size={20} />,
    dark: <Moon size={20} />,
    forest: <TreePine size={20} />,
    system: <Monitor size={20} />,
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 border rounded-full hover:bg-[var(--card)] transition-colors">
          {icons[theme || 'system']}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-[var(--card)] p-2 rounded-lg border shadow-lg min-w-[120px] z-50 animate-in fade-in zoom-in duration-200">
          <DropdownMenu.Item onClick={() => setTheme('light')} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded outline-none">
            <Sun size={16} /> Light
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setTheme('dark')} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded outline-none">
            <Moon size={16} /> Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setTheme('forest')} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded outline-none">
            <TreePine size={16} /> Forest
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setTheme('system')} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white rounded outline-none">
            <Monitor size={16} /> System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
