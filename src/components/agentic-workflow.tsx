"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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

const stepIcons = {
  trigger: RiFolderOpenLine,
  ticket: RiTicketLine,
  planning: RiLightbulbFlashLine,
  coding: RiCodeSSlashLine,
  testing: RiTestTubeLine,
  review: RiGitPullRequestLine,
  merge: RiGitMergeLine,
};

export default function AgenticWorkflow({ steps }: AgenticWorkflowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isPixel = theme === "pixel";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="w-full space-y-8">
      {/* Desktop horizontal layout */}
      <div className="hidden lg:block">
        <div className="relative px-6">
          {/* Background progress line */}
          <div className="absolute top-8 left-6 right-6 h-0.5 bg-[var(--border)] rounded-full" />
          <motion.div
            style={{ width: progressWidth }}
            className={isPixel ? "h-1 bg-[var(--primary)]" : "h-0.5 bg-[var(--primary)] rounded-full"}
          />

          {/* Steps */}
          <div className="flex justify-between relative z-10 pt-0">
            {steps.map((step, index) => {
              const Icon = stepIcons[step.id as keyof typeof stepIcons] || RiTicketLine;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center w-full"
                >
                  {/* Step circle */}
                  <div className={isPixel ? "mb-4 font-pixel text-sm font-bold" : "mb-4 font-bold text-sm"}>
                    <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[var(--card)] border-2 border-[var(--primary)] mx-auto">
                      <Icon size={24} className="text-[var(--primary)]" />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-[var(--secondary)]">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Step info */}
                  <h3 className="font-bold text-center text-sm md:text-base">{step.title}</h3>
                  <p className="text-xs text-[var(--secondary)] text-center max-w-[120px] mt-1 leading-tight">
                    {step.description}
                  </p>

                  {/* Connector arrow (not on last step) */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute top-8 left-[calc(50%+40px)] w-[calc((100%/7)-80px)] h-0.5 bg-[var(--border)] origin-left"
                      style={{
                        width: isPixel ? "calc(100% / 7 - 80px)" : "calc(100% / 7 - 80px)",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile vertical layout */}
      <div className="lg:hidden space-y-6 px-4">
        {steps.map((step, index) => {
          const Icon = stepIcons[step.id as keyof typeof stepIcons] || RiTicketLine;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {/* Step circle */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 border-2 border-[var(--primary)] flex items-center justify-center">
                  <Icon size={20} className="text-[var(--primary)]" />
                </div>
              </div>

              {/* Step info */}
              <div className="flex-grow">
                <h3 className="font-bold text-base">{step.title}</h3>
                <p className="text-sm text-[var(--secondary)] mt-1">{step.description}</p>
              </div>

              {/* Vertical connector (not on last step) */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-[var(--border)]" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
