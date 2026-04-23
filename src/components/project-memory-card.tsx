"use client";

import React, { useState } from "react";
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
          className="w-full rounded-md p-8 flex flex-col items-center justify-center h-[280px]"
          style={{
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
              fontSize: "14px",
              color: "#00f0ff",
              textShadow: "0 0 10px #00f0ff, 0 0 20px #0099ff",
              letterSpacing: "2px",
            }}
          >
            <div style={{ marginBottom: "12px" }}>▮▯▮</div>
            <div>{project?.category || "CARD"}</div>
            <div style={{ marginTop: "8px", fontSize: "10px", opacity: 0.7 }}>
              [CLICK TO FLIP]
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            animation: "flipShow 0.6s ease-out forwards",
            transformStyle: "preserve-3d",
            height: "280px",
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
