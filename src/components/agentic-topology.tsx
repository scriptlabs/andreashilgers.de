"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiWhatsappLine, RiTelegramLine, RiSlackLine, RiGroupLine, RiGithubFill, RiTicketLine,
  RiRobot2Line, RiTerminalBoxLine, RiSparklingLine, RiMusicLine, RiFlowChart, RiAliensLine,
  RiCommandLine, RiRouteLine, RiGitMergeLine,
  RiCodeSSlashLine, RiSearchLine, RiTestTubeLine, RiShieldCheckLine, RiFileTextLine,
  RiGitRepositoryLine, RiGitPullRequestLine, RiCheckboxCircleLine, RiBook2Line
} from "react-icons/ri";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

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

type NodeId = keyof typeof nodeData;

const nodeData = {
  whatsapp: { icon: RiWhatsappLine, layer: "channels", x: 80 },
  telegram: { icon: RiTelegramLine, layer: "channels", x: 200 },
  slack: { icon: RiSlackLine, layer: "channels", x: 320 },
  teams: { icon: RiGroupLine, layer: "channels", x: 440 },
  github: { icon: RiGithubFill, layer: "channels", x: 560 },
  linear: { icon: RiTicketLine, layer: "channels", x: 680 },
  nemoclaw: { icon: RiAliensLine, layer: "aiRuntime", x: 80 },
  claude: { icon: RiRobot2Line, layer: "aiRuntime", x: 200 },
  codex: { icon: RiTerminalBoxLine, layer: "aiRuntime", x: 320 },
  gemini: { icon: RiSparklingLine, layer: "aiRuntime", x: 440 },
  n8n: { icon: RiFlowChart, layer: "aiRuntime", x: 560 },
  vibe: { icon: RiMusicLine, layer: "aiRuntime", x: 680 },
  masterAgent: { icon: RiCommandLine, layer: "orchestration", x: 200 },
  taskDispatcher: { icon: RiRouteLine, layer: "orchestration", x: 500 },
  prManager: { icon: RiGitMergeLine, layer: "orchestration", x: 800 },
  coder: { icon: RiCodeSSlashLine, layer: "subAgents", x: 100 },
  reviewer: { icon: RiSearchLine, layer: "subAgents", x: 280 },
  tester: { icon: RiTestTubeLine, layer: "subAgents", x: 460 },
  auditor: { icon: RiShieldCheckLine, layer: "subAgents", x: 640 },
  documenter: { icon: RiFileTextLine, layer: "subAgents", x: 820 },
  repository: { icon: RiGitRepositoryLine, layer: "repository", x: 120 },
  pullRequests: { icon: RiGitPullRequestLine, layer: "repository", x: 300 },
  tests: { icon: RiCheckboxCircleLine, layer: "repository", x: 480 },
  docs: { icon: RiBook2Line, layer: "repository", x: 660 },
  tickets: { icon: RiTicketLine, layer: "repository", x: 840 },
} as const;

const LAYER_POSITIONS = {
  channels: 60,
  aiRuntime: 195,
  orchestration: 330,
  subAgents: 465,
  repository: 600,
};

export default function AgenticTopology({ nodes, layerLabels }: AgenticTopologyProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const { theme } = useTheme();
  const isPixel = theme === "pixel";

  const getNodeConnections = (nodeId: string): string[] => {
    const connections: Record<string, string[]> = {
      whatsapp: ["masterAgent"],
      telegram: ["masterAgent"],
      slack: ["masterAgent"],
      teams: ["masterAgent"],
      github: ["taskDispatcher"],
      linear: ["taskDispatcher"],
      masterAgent: ["coder", "reviewer", "tester", "auditor", "documenter"],
      taskDispatcher: ["coder", "reviewer", "tester", "auditor", "documenter"],
      prManager: ["coder", "reviewer", "tester", "auditor", "documenter"],
      coder: ["repository", "pullRequests"],
      reviewer: ["pullRequests"],
      tester: ["tests"],
      auditor: ["tests"],
      documenter: ["docs"],
    };
    return connections[nodeId] || [];
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 1000 680"
        className="w-full h-auto min-w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* SVG connection paths */}
        {Object.entries(nodeData).map(([sourceId, sourceData]) => {
          const targets = getNodeConnections(sourceId);
          return targets.map((targetId) => {
            const target = nodeData[targetId as NodeId];
            const x1 = sourceData.x;
            const y1 = LAYER_POSITIONS[sourceData.layer as keyof typeof LAYER_POSITIONS];
            const x2 = target.x;
            const y2 = LAYER_POSITIONS[target.layer as keyof typeof LAYER_POSITIONS];
            const path = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}`;

            return (
              <motion.path
                key={`${sourceId}-${targetId}`}
                d={path}
                stroke={isPixel ? "var(--primary)" : "var(--border)"}
                strokeWidth={isPixel ? 3 : 2}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={isPixel ? "8 4" : "0"}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: hoveredNodeId === sourceId ? 0.9 : 0.4 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className={cn(
                  "transition-opacity duration-300",
                  hoveredNodeId === sourceId ? "opacity-100" : ""
                )}
              />
            );
          });
        })}
      </svg>

      {/* HTML node cards overlaid */}
      <div className="relative mt-4 space-y-8">
        {Object.entries(LAYER_POSITIONS).map(([layer]) => {
          const layerNodes = Object.entries(nodeData).filter(([, data]) => data.layer === layer);
          const layerLabel = layerLabels[layer as keyof typeof layerLabels];

          return (
            <div key={layer} className="space-y-3">
              <div className="text-xs uppercase tracking-widest font-bold text-[var(--secondary)] ml-4">
                {layerLabel}
              </div>
              <div className="flex flex-wrap gap-3 px-2">
                {layerNodes.map(([nodeId]) => {
                  const nodeDataEntry = nodeData[nodeId as NodeId];
                  const Icon = nodeDataEntry.icon;

                  return (
                    <motion.div
                      key={nodeId}
                      onMouseEnter={() => setHoveredNodeId(nodeId)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="card p-3 md:p-4 rounded-md flex flex-col items-center text-center min-w-[100px] border-transparent hover:border-[var(--primary)]/20 transition-all cursor-pointer group">
                        <div className="text-[var(--primary)] mb-2 transition-transform group-hover:scale-110">
                          <Icon size={24} />
                        </div>
                        <p className="text-xs md:text-sm font-semibold leading-tight">
                          {nodes[nodeId]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
