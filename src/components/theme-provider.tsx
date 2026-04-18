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

        const startPlayback = () => {
          if (audioRef.current && audioRef.current.paused && theme === 'pixel' && !isMuted) {
            audioRef.current.play().catch(() => {
              // Still blocked or failed, wait for next interaction
            });
          }
        };

        // Try playing immediately
        startPlayback();

        // Listen for ANY interaction to kickstart the audio
        const interactionEvents = ['click', 'keydown', 'touchstart', 'mousedown', 'pointerdown'];
        interactionEvents.forEach(event => {
          window.addEventListener(event, startPlayback, { once: true });
        });

        return () => {
          interactionEvents.forEach(event => {
            window.removeEventListener(event, startPlayback);
          });
          if (audioRef.current && theme !== 'pixel') {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        };
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          if (theme !== 'pixel') {
            audioRef.current.currentTime = 0;
          }
        }
      }
    }
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
