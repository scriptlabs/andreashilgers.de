"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

interface ExperienceItem {
  id: string;
  type: string;
  company: string;
  position: string;
}

interface ExperienceXPTrackerProps {
  items: ExperienceItem[];
  lang: string;
}

export function ExperienceXPTracker({ items, lang }: ExperienceXPTrackerProps) {
  const { theme } = useTheme();
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [floatingXPs, setFloatingXPs] = useState<Array<{ id: string; xp: number }>>([]);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const xpCounterRef = useRef(0);

  // Handle scroll to hide bar at bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop + winHeight) / docHeight;

      setIsAtBottom(scrollPercent > 0.95);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemId = entry.target.getAttribute("data-experience-id");
          if (itemId && entry.isIntersecting) {
            setVisibleItems((prev) => {
              if (!prev.has(itemId)) {
                const newSet = new Set(prev);
                newSet.add(itemId);

                // Calculate XP based on index
                const index = items.findIndex((item) => item.id === itemId);
                const xp = 100 + index * 50;

                // Add floating XP with unique counter
                xpCounterRef.current += 1;
                const floatingId = `xp-${xpCounterRef.current}`;
                setFloatingXPs((prevXPs) => [...prevXPs, { id: floatingId, xp }]);

                // Remove floating XP after animation
                setTimeout(() => {
                  setFloatingXPs((prevXPs) => prevXPs.filter((x) => x.id !== floatingId));
                }, 2000);

                return newSet;
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const timelineItems = document.querySelectorAll("[data-experience-id]");
    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item));
    };
  }, [items]);

  const totalXP = Array.from(visibleItems).reduce((sum, itemId) => {
    const index = items.findIndex((item) => item.id === itemId);
    return sum + (100 + index * 50);
  }, 0);

  const nextLevel = Math.floor(totalXP / 500) + 1;

  // Only show in pixel theme
  if (theme !== "pixel") {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* Floating XP popups */}
      {floatingXPs.map((popup) => (
        <div
          key={popup.id}
          className="fixed left-1/2 top-1/4 pointer-events-none"
          style={{
            animation: `floatXP 2s ease-out forwards`,
            transformOrigin: "center",
            fontFamily: "var(--font-pixel)",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#00f0ff",
            textShadow: "0 0 10px #00f0ff, 0 0 20px #0099ff",
            letterSpacing: "2px",
            transform: "translateX(-50%)",
          }}
        >
          +{popup.xp} XP
        </div>
      ))}

      {/* Score display at bottom full width */}
      <div
        className="fixed bottom-0 left-0 right-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(13, 13, 21, 0.98), rgba(13, 13, 21, 0.9))",
          borderTop: "2px solid #00f0ff",
          boxShadow: "0 -10px 40px rgba(0, 240, 255, 0.2), inset 0 2px 10px rgba(0, 240, 255, 0.1)",
          fontFamily: "var(--font-pixel)",
          color: "#00f0ff",
          textShadow: "0 0 10px #00f0ff",
          letterSpacing: "1px",
          opacity: isAtBottom ? 0 : 1,
          pointerEvents: isAtBottom ? "none" : "auto",
          padding: "0.75rem 1rem max(1rem, env(safe-area-inset-bottom))",
          zIndex: 40,
        }}
      >
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
            <div style={{ minWidth: "35px" }}>
              <div style={{ fontSize: "8px", opacity: 0.5, lineHeight: "1" }}>LV</div>
              <div style={{ fontSize: "14px", fontWeight: "bold", lineHeight: "1" }}>{nextLevel}</div>
            </div>
            <div style={{ fontSize: "8px", opacity: 0.5 }}>|</div>
            <div style={{ flex: 1, minWidth: "45px" }}>
              <div style={{ fontSize: "8px", opacity: 0.5, lineHeight: "1" }}>XP</div>
              <div style={{ fontSize: "12px", fontWeight: "bold", lineHeight: "1" }}>{totalXP}</div>
            </div>
            {nextLevel >= 14 ? (
              <div style={{ fontSize: "14px", animation: "starGlow 2s ease-in-out infinite", minWidth: "20px", textAlign: "center" }}>★</div>
            ) : (
              <div style={{ fontSize: "8px", opacity: 0.6, textAlign: "right", minWidth: "35px" }}>
                <div style={{ lineHeight: "1" }}>{(nextLevel + 1) * 500 - totalXP}</div>
                <div style={{ fontSize: "7px", opacity: 0.5 }}>XP</div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-10">
          <div style={{ fontSize: "11px", opacity: 0.7 }}>[EXPERIENCE_TRACKER]</div>

          <div style={{ display: "flex", gap: "40px", flex: 1 }}>
            <div>
              <div style={{ fontSize: "10px", opacity: 0.6, marginBottom: "4px" }}>TOTAL XP</div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>{totalXP}</div>
            </div>

            <div style={{ borderLeft: "1px solid #00f0ff/30", paddingLeft: "40px" }}>
              <div style={{ fontSize: "10px", opacity: 0.6, marginBottom: "4px" }}>LEVEL</div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>{nextLevel}</div>
            </div>

            {nextLevel >= 14 ? (
              <div style={{ borderLeft: "1px solid #00f0ff/30", paddingLeft: "40px", display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    fontSize: "24px",
                    animation: "starGlow 2s ease-in-out infinite",
                    color: "#00f0ff",
                    textShadow: "0 0 10px #00f0ff, 0 0 20px #0099ff",
                  }}
                >
                  ★
                </div>
                <div>
                  <div style={{ fontSize: "10px", opacity: 0.6 }}>STATUS</div>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>COMPLETED</div>
                </div>
              </div>
            ) : (
              <div style={{ borderLeft: "1px solid #00f0ff/30", paddingLeft: "40px" }}>
                <div style={{ fontSize: "10px", opacity: 0.6, marginBottom: "4px" }}>NEXT LEVEL</div>
                <div style={{ fontSize: "14px" }}>{(nextLevel + 1) * 500 - totalXP} XP</div>
              </div>
            )}
          </div>

          <div style={{ textAlign: "right", fontSize: "10px", opacity: 0.6 }}>
            {lang === "de" ? "▶ PROGRESSION" : "▶ PROGRESSION"}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatXP {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-100px) scale(0.8);
          }
        }

        @keyframes starGlow {
          0%, 100% {
            text-shadow: 0 0 10px #00f0ff, 0 0 20px #0099ff;
            transform: scale(1);
          }
          50% {
            text-shadow: 0 0 20px #00f0ff, 0 0 40px #0099ff, 0 0 60px rgba(0, 240, 255, 0.5);
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
