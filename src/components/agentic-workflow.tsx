"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  RiFolderOpenLine, RiTicketLine, RiLightbulbFlashLine, RiCodeSSlashLine,
  RiTestTubeLine, RiGitPullRequestLine, RiGitMergeLine
} from "react-icons/ri";
import { useTheme } from "@/components/theme-provider";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

interface AgenticWorkflowProps {
  steps: WorkflowStep[];
}

const STEP_META: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>; color: string }> = {
  trigger: { icon: RiFolderOpenLine, color: "text-sky-500" },
  ticket: { icon: RiTicketLine, color: "text-violet-500" },
  planning: { icon: RiLightbulbFlashLine, color: "text-amber-500" },
  coding: { icon: RiCodeSSlashLine, color: "text-emerald-500" },
  testing: { icon: RiTestTubeLine, color: "text-teal-500" },
  review: { icon: RiGitPullRequestLine, color: "text-pink-500" },
  merge: { icon: RiGitMergeLine, color: "text-rose-500" },
};

const FALLBACK_META = { icon: RiTicketLine, color: "text-[var(--primary)]" };

export default function AgenticWorkflow({ steps }: AgenticWorkflowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isPixel = theme === "pixel";

  return (
    <div ref={containerRef} className="relative w-full space-y-4">
      {steps.map((step, index) => {
        const meta = STEP_META[step.id] ?? FALLBACK_META;
        const Icon = meta.icon;
        const pidHex = (((index + 1) * 173) % 4096).toString(16).padStart(3, "0");

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative flex items-stretch group"
            style={{ paddingLeft: `${index * 2}rem` }}
          >
            {/* Connection Line - Waterfall Style */}
            {index > 0 && (
              <div
                className="absolute top-[-1rem] w-[2px] h-[calc(100%+1rem)] bg-gradient-to-b from-[var(--primary)]/20 to-transparent ml-[1.25rem] -translate-x-full"
                style={{ left: `${(index - 1) * 2 + 1.25}rem` }}
              />
            )}

            <div className="flex gap-4 md:gap-6 w-full">
              {/* Step Icon Node */}
              <div className="flex-shrink-0 relative">
                <div className={`w-10 h-10 md:w-12 md:h-12 bg-black border border-[var(--border)] ${isPixel ? "" : "rounded-sm"} flex items-center justify-center ${meta.color} z-10 relative group-hover:border-[var(--primary)] transition-colors shadow-xl`}>
                  <Icon size={20} />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black border border-[var(--border)] flex items-center justify-center text-[7px] font-mono text-[var(--secondary)]">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content Block - Technical Schematic Style */}
              <div className="flex-grow bg-[var(--card)] border border-[var(--border)] p-4 md:p-6 rounded-sm relative overflow-hidden group-hover:border-[var(--primary)]/30 transition-all shadow-sm group-hover:shadow-xl">
                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h3 className="font-black text-sm md:text-base uppercase tracking-tighter text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {step.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-mono text-[var(--secondary)] uppercase px-1.5 py-0.5 border border-[var(--border)] rounded-sm">
                      PID: 0x{pidHex}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`} />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-[var(--secondary)] leading-relaxed mb-4 max-w-2xl">
                  {step.description}
                </p>

                {/* Technical Meta Footer */}
                <div className="flex items-center gap-4 pt-3 border-t border-[var(--border)]/50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-[var(--primary)]" />
                    <span className="text-[8px] font-mono text-[var(--secondary)] uppercase tracking-widest">In: Request_Packet</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-emerald-500" />
                    <span className="text-[8px] font-mono text-[var(--secondary)] uppercase tracking-widest">Out: Success_Flag</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
