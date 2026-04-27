"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  RiWhatsappLine, RiTelegramLine, RiSlackLine, RiGroupLine, RiGithubFill, RiTicketLine,
  RiRobot2Line, RiTerminalBoxLine, RiSparklingLine, RiMusicLine, RiFlowChart, RiAliensLine,
  RiCommandLine, RiRouteLine, RiGitMergeLine,
  RiCodeSSlashLine, RiSearchLine, RiTestTubeLine, RiShieldCheckLine, RiFileTextLine,
  RiGitRepositoryLine, RiGitPullRequestLine, RiCheckboxCircleLine, RiBook2Line
} from "react-icons/ri";

interface AgenticTopologyProps {
  nodes: Record<string, string>;
  layerLabels: {
    channels: string;
    aiRuntime: string;
    orchestration: string;
    subAgents: string;
    repository: string;
  };
}

const iconMap = {
  whatsapp: RiWhatsappLine,
  telegram: RiTelegramLine,
  slack: RiSlackLine,
  teams: RiGroupLine,
  github: RiGithubFill,
  linear: RiTicketLine,
  nemoclaw: RiAliensLine,
  claude: RiRobot2Line,
  codex: RiTerminalBoxLine,
  gemini: RiSparklingLine,
  n8n: RiFlowChart,
  vibe: RiMusicLine,
  masterAgent: RiCommandLine,
  taskDispatcher: RiRouteLine,
  prManager: RiGitMergeLine,
  coder: RiCodeSSlashLine,
  reviewer: RiSearchLine,
  tester: RiTestTubeLine,
  auditor: RiShieldCheckLine,
  documenter: RiFileTextLine,
  repository: RiGitRepositoryLine,
  pullRequests: RiGitPullRequestLine,
  tests: RiCheckboxCircleLine,
  docs: RiBook2Line,
  tickets: RiTicketLine,
} as Record<string, React.ComponentType>;

const layerStructure = [
  {
    id: "channels",
    items: ["whatsapp", "telegram", "slack", "teams", "github", "linear"],
  },
  {
    id: "aiRuntime",
    items: ["nemoclaw", "claude", "codex", "gemini", "n8n", "vibe"],
  },
  {
    id: "orchestration",
    items: ["masterAgent", "taskDispatcher", "prManager"],
  },
  {
    id: "subAgents",
    items: ["coder", "reviewer", "tester", "auditor", "documenter"],
  },
  {
    id: "repository",
    items: ["repository", "pullRequests", "tests", "docs", "tickets"],
  },
];

export default function AgenticTopology({ nodes, layerLabels }: AgenticTopologyProps) {
  return (
    <div className="w-full space-y-8 py-6">
      {layerStructure.map((layer, layerIdx) => {
        const labelKey = layer.id as keyof typeof layerLabels;
        const label = layerLabels[labelKey];

        return (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: layerIdx * 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Layer label */}
            <div className="px-2">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--primary)]">
                {label}
              </h3>
            </div>

            {/* Layer nodes grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {layer.items.map((nodeId, idx) => {
                const IconComponent = iconMap[nodeId as keyof typeof iconMap] as React.ComponentType<{ size: number }> | undefined;
                const nodeName = nodes[nodeId as keyof typeof nodes];

                return (
                  <motion.div
                    key={nodeId}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="card p-3 md:p-4 rounded-md flex flex-col items-center text-center gap-2 border-transparent hover:border-[var(--primary)]/30 transition-all h-full">
                      {IconComponent && (
                        <div className="text-[var(--primary)] flex-shrink-0">
                          <IconComponent size={24} />
                        </div>
                      )}
                      <p className="text-xs md:text-sm font-semibold text-[var(--foreground)] leading-tight">
                        {nodeName}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {/* Connection flow indicators */}
      <div className="mt-12 pt-8 border-t border-[var(--border)]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xs text-[var(--secondary)] font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-[var(--primary)]" />
            <span>Orchestration Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-[var(--accent)]" />
            <span>Data Pipeline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-emerald-500" />
            <span>Output Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
