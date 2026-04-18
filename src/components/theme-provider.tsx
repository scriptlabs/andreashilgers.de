"use client";

import * as React from "react";

type Theme = "light" | "dark" | "forest" | "pixel" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("system");
  const [isMuted, setIsMuted] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    const savedMuted = localStorage.getItem("isMuted") === "true";
    setIsMuted(savedMuted);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement;
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      localStorage.setItem("isMuted", isMuted.toString());

      // Handle Pixel Theme Music
      if (theme === 'pixel' && !isMuted) {
        if (!audioRef.current) {
          audioRef.current = new Audio('/sounds/music.mp3');
          audioRef.current.loop = true;
          audioRef.current.volume = 0.15;
        }
        
        const playMusic = () => {
          audioRef.current?.play().catch(() => console.log("Autoplay blocked, waiting for interaction"));
        };

        playMusic();
        window.addEventListener('click', playMusic, { once: true });
        window.addEventListener('keydown', playMusic, { once: true });
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          if (theme !== 'pixel') {
            audioRef.current.currentTime = 0;
          }
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [theme, mounted, isMuted]);

  const value = React.useMemo(() => ({ 
    theme, 
    setTheme, 
    isMuted, 
    setIsMuted 
  }), [theme, isMuted]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
