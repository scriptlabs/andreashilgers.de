"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

// Typing animation component
interface TypingTextProps {
  texts: string[];
  speed?: number;
  pauseDuration?: number;
  deleteSpeed?: number;
  className?: string;
}

export function TypingText({
  texts,
  speed = 100,
  pauseDuration = 2500,
  deleteSpeed = 40,
  className = "",
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  const handleTyping = useCallback(() => {
    if (texts.length === 0) return;

    const i = loopNum % texts.length;
    const fullText = texts[i];

    if (isDeleting) {
      setDisplayText(prev => fullText.substring(0, prev.length - 1));
      setTypingSpeed(deleteSpeed);
    } else {
      setDisplayText(prev => fullText.substring(0, prev.length + 1));
      setTypingSpeed(speed);
    }

    // Check if word is fully typed
    if (!isDeleting && displayText === fullText) {
      setTimeout(() => setIsDeleting(true), pauseDuration);
    } 
    // Check if word is fully deleted
    else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
      setTypingSpeed(500); // Small pause before next word
    }
  }, [displayText, isDeleting, loopNum, texts, speed, deleteSpeed, pauseDuration]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [handleTyping, typingSpeed]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-[var(--primary)]">{displayText}</span>
      <motion.span
        className="inline-block w-1 h-6 bg-[var(--primary)] rounded-sm ml-1 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </motion.span>
  );
}

// Fade in animation for sections
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger animation for lists
interface StaggerItemProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

export function StaggerItem({ children, index, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover animation for cards
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  transitionDuration?: number;
}

export function HoverCard({
  children,
  className = "",
  hoverScale = 1.05,
  transitionDuration = 0.3,
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1, opacity: 0, y: 10 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      whileHover={{ scale: hoverScale, y: -5 }}
      transition={{ duration: transitionDuration, type: "spring" }}
    >
      {children}
    </motion.div>
  );
}

// Bounce animation for CTA buttons
interface BounceButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function BounceButton({
  children,
  onClick,
  className = "",
}: BounceButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    >
      {children}
    </motion.button>
  );
}

// Progress bar animation for skills
interface AnimatedProgressProps {
  value: number;
  className?: string;
  barClassName?: string;
}

export function AnimatedProgress({
  value,
  className = "",
  barClassName = "",
}: AnimatedProgressProps) {
  const [progress, setProgress] = useState(0);

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        className={`h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full ${barClassName}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        onViewportEnter={() => setProgress(value)}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />
      {/* Hidden value tracker to satisfy the state usage if needed, or remove progress state */}
      <span className="sr-only">{progress}%</span>
    </div>
  );
}

// Floating animation for badges/icons
interface FloatingIconProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FloatingIcon({
  children,
  delay = 0,
  duration = 3,
  className = "",
}: FloatingIconProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Shine effect for cards
interface ShineCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ShineCard({ children, className = "" }: ShineCardProps) {
  return (
    <motion.div
      className={`relative rounded-md ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Shine effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ pointerEvents: "none", borderRadius: "0.375rem" }}
      />
      {children}
    </motion.div>
  );
}
