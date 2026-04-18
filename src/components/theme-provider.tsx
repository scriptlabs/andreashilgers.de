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

  // Initialize audio object once on mount
  React.useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) setTheme(savedTheme);
    
    const savedMuted = localStorage.getItem("isMuted") === "true";
    setIsMuted(savedMuted);

    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Sync theme and audio state
  React.useEffect(() => {
    if (!mounted || !audioRef.current) return;

    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    localStorage.setItem("isMuted", isMuted.toString());

    const audio = audioRef.current;

    if (theme === 'pixel' && !isMuted) {
      const startPlayback = () => {
        audio.play().catch(() => {
          // Autoplay blocked: play will be retried on next interaction
        });
      };

      startPlayback();

      // Listen for first interaction to satisfy browser policies
      const interactionEvents = ['mousedown', 'keydown', 'touchstart', 'click'];
      
      const handleInteraction = () => {
        startPlayback();
        interactionEvents.forEach(evt => window.removeEventListener(evt, handleInteraction));
      };

      interactionEvents.forEach(event => {
        window.addEventListener(event, handleInteraction, { once: true });
      });

      return () => {
        interactionEvents.forEach(event => {
          window.removeEventListener(event, handleInteraction);
        });
      };
    } else {
      audio.pause();
      // If switching away from theme, reset track
      if (theme !== 'pixel') {
        audio.currentTime = 0;
      }
    }
  }, [theme, isMuted, mounted]);

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
