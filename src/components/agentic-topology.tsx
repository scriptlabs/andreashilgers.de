"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiWhatsappLine, RiTelegramLine, RiSlackLine, RiGroupLine, RiGithubFill, RiTicketLine, RiGlobalLine, RiTerminalLine,
  RiRobot2Line, RiTerminalBoxLine, RiSparklingLine, RiMusicLine, RiFlowChart, RiAliensLine,
  RiCommandLine, RiRouteLine, RiGitMergeLine,
  RiCodeSSlashLine, RiSearchLine, RiTestTubeLine, RiShieldCheckLine, RiFileTextLine,
  RiGitRepositoryLine, RiGitPullRequestLine, RiCheckboxCircleLine, RiBook2Line,
  RiBrainLine, RiBroadcastLine, RiStackLine, RiDatabase2Line, RiCpuLine,
  RiPulseLine
} from "react-icons/ri";
import { VscCopilot } from "react-icons/vsc";
import { useTheme } from "@/components/theme-provider";

interface AgenticTopologyProps {
  nodes: Record<string, string>;
  layerLabels: {
    channels: string;
    aiRuntime: string;
    orchestration: string;
    subAgents: string;
    repository: string;
  };
  layerDescriptions?: {
    channels: string;
    aiRuntime: string;
    orchestration: string;
    subAgents: string;
    repository: string;
  };
}

type IconType = React.ComponentType<{ size?: number; className?: string }>;

interface LayerItem {
  id: string;
  icon: IconType;
}

interface LayerConfig {
  id: keyof AgenticTopologyProps["layerLabels"];
  badge: string;
  icon: IconType;
  gradient: string;
  glow: string;
  ring: string;
  text: string;
  items: LayerItem[];
}

const LAYERS: LayerConfig[] = [
  {
    id: "channels",
    badge: "01",
    icon: RiBroadcastLine,
    gradient: "from-sky-500/15 via-blue-500/5 to-transparent",
    glow: "rgba(59,130,246,0.35)",
    ring: "ring-sky-500/30",
    text: "text-sky-500",
    items: [
      { id: "whatsapp", icon: RiWhatsappLine },
      { id: "telegram", icon: RiTelegramLine },
      { id: "slack", icon: RiSlackLine },
      { id: "teams", icon: RiGroupLine },
      { id: "web", icon: RiGlobalLine },
      { id: "cli", icon: RiTerminalLine },
      { id: "github", icon: RiGithubFill },
      { id: "linear", icon: RiTicketLine },
    ],
  },
  {
    id: "aiRuntime",
    badge: "02",
    icon: RiBrainLine,
    gradient: "from-violet-500/15 via-fuchsia-500/5 to-transparent",
    glow: "rgba(168,85,247,0.4)",
    ring: "ring-violet-500/30",
    text: "text-violet-500",
    items: [
      { id: "ollama", icon: RiCpuLine },
      { id: "lmstudio", icon: RiTerminalBoxLine },
      { id: "nemoclaw", icon: RiAliensLine },
      { id: "claude", icon: RiRobot2Line },
      { id: "codex", icon: RiTerminalBoxLine },
      { id: "copilot", icon: VscCopilot },
      { id: "gemini", icon: RiSparklingLine },
      { id: "n8n", icon: RiFlowChart },
      { id: "vibe", icon: RiMusicLine },
    ],
  },
  {
    id: "orchestration",
    badge: "03",
    icon: RiCpuLine,
    gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    glow: "rgba(249,115,22,0.4)",
    ring: "ring-amber-500/30",
    text: "text-amber-500",
    items: [
      { id: "masterAgent", icon: RiCommandLine },
      { id: "taskDispatcher", icon: RiRouteLine },
      { id: "prManager", icon: RiGitMergeLine },
    ],
  },
  {
    id: "subAgents",
    badge: "04",
    icon: RiStackLine,
    gradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    glow: "rgba(16,185,129,0.4)",
    ring: "ring-emerald-500/30",
    text: "text-emerald-500",
    items: [
      { id: "coder", icon: RiCodeSSlashLine },
      { id: "reviewer", icon: RiSearchLine },
      { id: "tester", icon: RiTestTubeLine },
      { id: "auditor", icon: RiShieldCheckLine },
      { id: "documenter", icon: RiFileTextLine },
    ],
  },
  {
    id: "repository",
    badge: "05",
    icon: RiDatabase2Line,
    gradient: "from-rose-500/15 via-pink-500/5 to-transparent",
    glow: "rgba(244,63,94,0.4)",
    ring: "ring-rose-500/30",
    text: "text-rose-500",
    items: [
      { id: "repository", icon: RiGitRepositoryLine },
      { id: "pullRequests", icon: RiGitPullRequestLine },
      { id: "tests", icon: RiCheckboxCircleLine },
      { id: "docs", icon: RiBook2Line },
      { id: "tickets", icon: RiTicketLine },
    ],
  },
];

// Color pairs used by ConnectionFlow to render gradient connectors
const FLOW_GRADIENTS = [
  { from: "#3b82f6", to: "#a855f7" }, // channels → aiRuntime
  { from: "#a855f7", to: "#f97316" }, // aiRuntime → orchestration
  { from: "#f97316", to: "#10b981" }, // orchestration → subAgents
  { from: "#10b981", to: "#f43f5e" }, // subAgents → repository
];

export default function AgenticTopology({ nodes, layerLabels, layerDescriptions }: AgenticTopologyProps) {
  const { theme } = useTheme();
  const isPixel = theme === "pixel";
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      {/* Ambient floating background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden>
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)" }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)" }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, rgba(244,63,94,0.4), transparent 70%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Live status pill above the stack */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center mb-10"
      >
        <div className="inline-flex items-center gap-4 px-4 py-2 rounded-sm bg-[var(--card)] border border-[var(--border)] shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono font-bold text-[var(--secondary)] uppercase tracking-widest">System Status</span>
          </div>
          <div className="h-4 w-[1px] bg-[var(--border)]" />
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--primary)]">
            <RiPulseLine size={14} className="animate-pulse" />
            <span>ACTIVE_NODE_MESH</span>
          </div>
        </div>
      </motion.div>

      {/* Layer Stack with connection flows between */}
      <div className="relative space-y-0 max-w-5xl mx-auto">
        {LAYERS.map((layer, layerIdx) => (
          <React.Fragment key={layer.id}>
            <LayerCard
              layer={layer}
              layerIdx={layerIdx}
              label={layerLabels[layer.id]}
              description={layerDescriptions?.[layer.id]}
              nodes={nodes}
              isPixel={isPixel}
              isHovered={hoveredLayerId === layer.id}
              onHover={setHoveredLayerId}
            />
            {layerIdx < LAYERS.length - 1 && (
              <ConnectionFlow
                fromColor={FLOW_GRADIENTS[layerIdx].from}
                toColor={FLOW_GRADIENTS[layerIdx].to}
                isPixel={isPixel}
                delay={layerIdx * 0.15}
                active={hoveredLayerId === LAYERS[layerIdx].id || hoveredLayerId === LAYERS[layerIdx + 1].id}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Live Console Log - Innovative Element */}
      <div className="mt-12 max-w-5xl mx-auto bg-black/90 p-4 rounded-sm border border-[var(--border)] shadow-2xl font-mono text-[10px] text-emerald-500/80 overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          </div>
          <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold">Kernel Activity Stream</span>
        </div>
        <div className="space-y-1 h-24 overflow-hidden relative">
          <LogLine text="INITIALIZING_SECURE_ENCLAVE..." delay={0} />
          <LogLine text="CONNECTING_TO_LLM_RUNTIME_V4.2..." delay={1000} />
          <LogLine text="ORCHESTRATOR_READY: DISPATCHING_SUBAGENTS..." delay={2000} />
          <LogLine text="LISTENING_ON_CHANNELS: SLACK, WHATSAPP, TELEGRAM" delay={3000} />
          <LogLine text="PULLING_LATEST_CHANGES_FROM_ORIGIN/MAIN" delay={4000} />
          <LogLine text="RUNNING_STATIC_ANALYSIS_ON_STAGED_FILES" delay={5000} />
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-10 pt-6 border-t border-[var(--border)] max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10 text-[10px] font-mono font-bold text-[var(--secondary)] uppercase tracking-widest">
          <FlowDot from="#3b82f6" to="#a855f7" label="Input Orchestration" />
          <FlowDot from="#f97316" to="#10b981" label="Agent Reasoning" />
          <FlowDot from="#10b981" to="#f43f5e" label="Code Production" />
        </div>
      </div>
    </div>
  );
}

function LogLine({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: [0, 1, 1, 0.5], x: 0 }}
      transition={{ duration: 4, repeat: Infinity, delay: delay / 1000, ease: "linear" }}
      className="flex gap-3"
    >
      <span className="text-white/20">[{new Date().toLocaleTimeString()}]</span>
      <span className="text-[var(--primary)]">SYS_LOG:</span>
      <span className="text-emerald-400">{text}</span>
    </motion.div>
  );
}

function FlowDot({ from, to, label }: { from: string; to: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-1 rounded-full"
        style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
      />
      <span>{label}</span>
    </div>
  );
}

interface LayerCardProps {
  layer: LayerConfig;
  layerIdx: number;
  label: string;
  description?: string;
  nodes: Record<string, string>;
  isPixel: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

function LayerCard({ layer, layerIdx, label, description, nodes, isPixel, isHovered, onHover }: LayerCardProps) {
  const LayerIcon = layer.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: layerIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      onMouseEnter={() => onHover(layer.id)}
      onMouseLeave={() => onHover(null)}
      className="relative py-8"
    >
      {/* Subtle Horizontal Layer Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-50" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Layer Info - Slimmer and more elegant */}
        <div className="lg:col-span-3 flex items-start gap-4">
          <div className={`relative flex-shrink-0 w-10 h-10 ${isPixel ? "rounded-none" : "rounded-lg"} flex items-center justify-center bg-[var(--background)] border border-[var(--border)] ${layer.text} shadow-sm transition-transform duration-500 ${isHovered ? 'scale-110 shadow-lg' : ''}`}
               style={{ boxShadow: isHovered ? `0 0 20px ${layer.glow}40` : '' }}>
            <LayerIcon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-black text-[var(--secondary)] opacity-60">
              <span className={layer.text}>{layer.badge}</span>
              <span>/ LAYER</span>
            </div>
            <h3 className="font-black text-sm md:text-base text-[var(--foreground)] uppercase tracking-tight">
              {label}
            </h3>
          </div>
        </div>

        {/* Node Grid - High Density, Compact Chips */}
        <div className="lg:col-span-9">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {layer.items.map((item, idx) => {
              const NodeIcon = item.icon;
              const nodeName = nodes[item.id] ?? item.id;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  className="group relative"
                >
                  <div className="relative px-3 py-1.5 bg-[var(--card)] border border-[var(--border)] rounded-sm flex items-center gap-2.5 transition-all duration-300 group-hover:border-[var(--primary)]/40 group-hover:shadow-md overflow-hidden">
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-[var(--primary)] transition-opacity" />
                    
                    <NodeIcon size={14} className={`${layer.text} opacity-70 group-hover:opacity-100 transition-opacity`} />
                    <span className="text-[11px] font-bold text-[var(--secondary)] group-hover:text-[var(--foreground)] transition-colors whitespace-nowrap">
                      {nodeName}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ConnectionFlowProps {
  fromColor: string;
  toColor: string;
  isPixel: boolean;
  delay: number;
  active: boolean;
}

function ConnectionFlow({ fromColor, toColor, isPixel, delay, active }: ConnectionFlowProps) {
  const lanes = [
    { x: 20, pathDelay: 0 },
    { x: 40, pathDelay: 0.2 },
    { x: 60, pathDelay: 0.4 },
    { x: 80, pathDelay: 0.6 },
  ];

  return (
    <div className="relative h-12 sm:h-14 w-full pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 56"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`grad-${fromColor.replace("#", "")}-${toColor.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {lanes.map((lane, i) => (
          <motion.line
            key={i}
            x1={lane.x}
            y1="0"
            x2={lane.x}
            y2="56"
            stroke={`url(#grad-${fromColor.replace("#", "")}-${toColor.replace("#", "")})`}
            strokeWidth={isPixel ? "1.5" : "1.2"}
            strokeDasharray={isPixel ? "2 1" : "1 1.5"}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: active ? 1 : 0.5 }}
            transition={{ duration: 0.9, delay: delay + i * 0.12, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        ))}
      </svg>

      {/* Animated pulse particles flowing from top to bottom */}
      {lanes.map((lane, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute top-0"
          style={{ left: `${lane.x}%`, transform: "translateX(-50%)" }}
          animate={{ y: ["0%", "calc(100% - 8px)"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: delay + lane.pathDelay,
            ease: "easeInOut",
            times: [0, 0.1, 0.8, 1],
          }}
        >
          <div
            className={isPixel ? "w-2 h-2" : "w-2 h-2 rounded-full"}
            style={{
              background: i % 2 === 0 ? fromColor : toColor,
              boxShadow: `0 0 12px ${i % 2 === 0 ? fromColor : toColor}, 0 0 24px ${i % 2 === 0 ? fromColor : toColor}60`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
