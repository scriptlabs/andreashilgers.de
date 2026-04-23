"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

interface ProjectMemoryCardProps {
  children: React.ReactNode;
  project: {
    category?: string;
  };
}

export function ProjectMemoryCard({ children, project }: ProjectMemoryCardProps) {
  const { theme } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [cardHeight, setCardHeight] = useState("280px");

  useEffect(() => {
    const updateHeight = () => {
      setCardHeight(window.innerWidth < 640 ? "240px" : "280px");
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Only apply memory style in pixel theme
  if (theme !== "pixel") {
    return <>{children}</>;
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!isFlipped && !isFlipping) {
      e.stopPropagation();
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipped(true);
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div
      className="w-full cursor-pointer"
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      {!isFlipped ? (
        <div
          className="w-full rounded-md p-4 sm:p-8 flex flex-col items-center justify-center"
          style={{
            height: cardHeight,
            background:
              "linear-gradient(135deg, #161625 0%, #1a1a2e 50%, #0d0d15 100%)",
            border: "2px solid #00f0ff",
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.1)",
            animation: isFlipping ? "flipReveal 0.6s ease-out forwards" : "none",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="text-center"
            style={{
              fontFamily: "var(--font-pixel)",
              color: "#00f0ff",
              textShadow: "0 0 10px #00f0ff, 0 0 20px #0099ff",
              letterSpacing: "2px",
            }}
          >
            <div style={{ marginBottom: "8px", fontSize: "clamp(12px, 3vw, 14px)" }}>▮▯▮</div>
            <div style={{ fontSize: "clamp(12px, 3vw, 14px)" }}>{project?.category || "CARD"}</div>
            <div style={{ marginTop: "6px", fontSize: "8px", opacity: 0.7 }}>
              [CLICK TO FLIP]
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            animation: "flipShow 0.6s ease-out forwards",
            transformStyle: "preserve-3d",
            height: cardHeight,
            width: "100%",
          }}
        >
          {children}
        </div>
      )}

      <style>{`
        @keyframes flipReveal {
          from {
            transform: rotateY(0deg);
            backfaceVisibility: visible;
          }
          to {
            transform: rotateY(90deg);
            backfaceVisibility: hidden;
          }
        }

        @keyframes flipShow {
          from {
            transform: rotateY(-90deg);
            backfaceVisibility: hidden;
          }
          to {
            transform: rotateY(0deg);
            backfaceVisibility: visible;
          }
        }
      `}</style>
    </div>
  );
}
