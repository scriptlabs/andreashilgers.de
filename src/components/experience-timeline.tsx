"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import {
  RiCodeSSlashLine,
  RiGraduationCapLine,
  RiMedalLine,
  RiCalendarLine,
  RiRobot2Line,
} from "react-icons/ri";

interface ExperienceItem {
  id: string;
  type: string;
  company: string;
  companyUrl?: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

interface ExperienceTimelineProps {
  items: ExperienceItem[];
  lang: string;
}

// ─── Variants ────────────────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 22,
      mass: 1,
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const tagContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getIcon(type: string) {
  switch (type) {
    case "edu":  return <RiGraduationCapLine size={18} />;
    case "cert": return <RiMedalLine size={18} />;
    default:     return <RiCodeSSlashLine size={18} />;
  }
}

function getTypeLabel(type: string, lang: string) {
  switch (type) {
    case "edu":  return lang === "de" ? "Ausbildung" : "Education";
    case "cert": return lang === "de" ? "Zertifizierung" : "Certification";
    default:     return lang === "de" ? "Berufserfahrung" : "Work Experience";
  }
}

function getTypeStyles(type: string) {
  switch (type) {
    case "edu":  return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "cert": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default:     return "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20";
  }
}

// Border + text only — used on the dot so bg-[var(--card)] stays solid
function getDotBorderStyles(type: string) {
  switch (type) {
    case "edu":  return "text-blue-500 border-blue-500/30";
    case "cert": return "text-purple-500 border-purple-500/30";
    default:     return "text-[var(--primary)] border-[var(--primary)]/30";
  }
}

function getDotGlow(type: string) {
  switch (type) {
    case "edu":  return "0 0 0 4px rgba(59,130,246,0.08), 0 0 16px rgba(59,130,246,0.18)";
    case "cert": return "0 0 0 4px rgba(168,85,247,0.08), 0 0 16px rgba(168,85,247,0.18)";
    default:     return "0 0 0 4px color-mix(in srgb, var(--primary) 8%, transparent), 0 0 16px color-mix(in srgb, var(--primary) 18%, transparent)";
  }
}

// ─── TimelineEntry ────────────────────────────────────────────────────────────

function TimelineEntry({
  item,
  index,
  lang,
}: {
  item: ExperienceItem;
  index: number;
  lang: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Even index → card on the right (card slides from right, arm points right)
  // Odd index  → card on the left  (card slides from left,  arm points left)
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
    >
      {/* ── Dot with pulse rings + glow ── */}
      <div className="relative shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">

        {/* Outer pulse ring 1 */}
        <motion.div
          className={`absolute inset-0 rounded-full border ${getTypeStyles(item.type)}`}
          initial={{ scale: 1, opacity: 0 }}
          animate={isInView ? { scale: 2.6, opacity: [0, 0.55, 0] } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
        />
        {/* Outer pulse ring 2 */}
        <motion.div
          className={`absolute inset-0 rounded-full border ${getTypeStyles(item.type)}`}
          initial={{ scale: 1, opacity: 0 }}
          animate={isInView ? { scale: 2, opacity: [0, 0.35, 0] } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
        />

        {/* Dot core */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.08 }}
          style={{ boxShadow: isInView ? getDotGlow(item.type) : "none" }}
          className={`flex items-center justify-center w-10 h-10 rounded-full border bg-[var(--card)] ${getDotBorderStyles(item.type)}`}
        >
          {item.id === "exp-research" ? <RiRobot2Line size={18} /> : getIcon(item.type)}
        </motion.div>

        {/* Horizontal connector arm — desktop only */}
        {/* Points away from the center line toward the card */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.28, ease: "easeOut", delay: 0.18 }}
          className={[
            "absolute top-1/2 -translate-y-1/2 h-px w-10 bg-gradient-to-r hidden md:block",
            // even index → flex-row-reverse → card is on LEFT → arm points left
            // odd  index → flex-row        → card is on RIGHT → arm points right
            isLeft
              ? "right-full from-transparent to-[var(--primary)]/40 origin-right"
              : "left-full from-[var(--primary)]/40 to-transparent origin-left",
          ].join(" ")}
        />
      </div>

      {/* ── Card ── */}
      <motion.div
        custom={isLeft}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 card rounded-md shadow-xl transition-colors hover:border-[var(--primary)]/30 relative z-20"
      >
        {/* Company Badge (desktop) */}
        <motion.div
          variants={contentItemVariants}
          className="absolute top-4 right-4 hidden sm:block"
        >
          <a
            href={item.companyUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1.5 rounded-md bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all group/company"
          >
            <span className="text-xs font-bold text-[var(--foreground)] opacity-80 group-hover/company:text-[var(--primary)] transition-colors">
              {item.company}
            </span>
          </a>
        </motion.div>

        <div className="mb-6 pr-0 sm:pr-36">
          <motion.div variants={contentItemVariants} className="flex flex-col items-start gap-3">
            <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-sm border ${getTypeStyles(item.type)}`}>
              {getTypeLabel(item.type, lang)}
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] leading-tight">
              {item.position.includes("\n") ? (
                <>
                  <span className="block">{item.position.split("\n")[0]}</span>
                  <span className="block text-lg font-medium text-[var(--secondary)] mt-1">
                    {item.position.split("\n")[1]}
                  </span>
                </>
              ) : (
                item.position
              )}
            </h3>
          </motion.div>

          <motion.div
            variants={contentItemVariants}
            className="flex items-center gap-2 text-xs font-semibold text-[var(--secondary)] mt-3 opacity-80 uppercase tracking-wider"
          >
            <RiCalendarLine className="text-[var(--primary)]" />
            {item.period}
          </motion.div>
        </div>

        {/* Mobile company */}
        <motion.div variants={contentItemVariants} className="sm:hidden mb-6">
          <a
            href={item.companyUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all"
          >
            <span className="text-xs font-bold text-[var(--foreground)] opacity-80">
              {item.company}
            </span>
          </a>
        </motion.div>

        <motion.p
          variants={contentItemVariants}
          className="text-[var(--foreground)]/70 mb-6 leading-relaxed text-sm"
        >
          {item.description}
        </motion.p>

        <motion.div variants={tagContainerVariants} className="flex flex-wrap gap-2">
          {item.technologies.map((tech: string) => (
            <motion.span
              key={tech}
              variants={tagVariants}
              className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm bg-[var(--muted)] border border-[var(--border)] text-[var(--secondary)]"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

    </div>
  );
}

// ─── ExperienceTimeline ───────────────────────────────────────────────────────

export function ExperienceTimeline({ items, lang }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked progress for the background "ghost" line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="space-y-12 relative">
      {/* Ghost background line — scroll-linked */}
      <div
        className="absolute left-5 -translate-x-px md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Static faint rail */}
        <div className="absolute inset-0 bg-[var(--border)]/40" />
        {/* Scroll-driven bright fill */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/60 to-[var(--primary)]/10"
          style={{ height: lineHeight }}
        />
      </div>

      {items.map((item, index) => (
        <TimelineEntry
          key={item.id}
          item={item}
          index={index}
          lang={lang}
        />
      ))}
    </div>
  );
}
