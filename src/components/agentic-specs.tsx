"use client";

import React from "react";
import { 
  RiCpuLine, RiSettings4Line, RiUserSettingsLine, 
  RiArrowRightUpLine
} from "react-icons/ri";
import { StaggerItem } from "./animated-text";

interface Tool {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
}

interface Capability {
  id: string;
  title: string;
  description: string;
  outputs: string[];
}

interface Persona {
  id: string;
  title: string;
  role: string;
  instructions: string;
  skills: string[];
}

interface AgentSpecsProps {
  tools: Tool[];
  capabilities: Capability[];
  personas: Persona[];
  labels: {
    tools: string;
    capabilities: string;
    personas: string;
  };
}

type IconType = React.ComponentType<{ size?: number; className?: string }>;

interface SpecItem {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
}

export default function AgentSpecs({ tools, capabilities, personas, labels }: AgentSpecsProps) {
  return (
    <div className="space-y-24">
      {/* Section: Engines & Tools */}
      <SpecSection 
        title={labels.tools} 
        icon={RiCpuLine}
        items={tools.map(t => ({
          id: t.id,
          title: t.name,
          subtitle: t.role,
          tags: t.capabilities,
          description: ""
        }))}
      />

      {/* Section: Core Capabilities */}
      <SpecSection 
        title={labels.capabilities} 
        icon={RiSettings4Line}
        items={capabilities.map(c => ({
          id: c.id,
          title: c.title,
          subtitle: "Module",
          tags: c.outputs,
          description: c.description
        }))}
      />

      {/* Section: Personas */}
      <SpecSection 
        title={labels.personas} 
        icon={RiUserSettingsLine}
        fixedHeight
        items={personas.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: p.role,
          tags: p.skills,
          description: p.instructions
        }))}
      />
    </div>
  );
}

function SpecSection({
  title,
  icon: Icon,
  items,
  fixedHeight = false,
}: {
  title: string;
  icon: IconType;
  items: SpecItem[];
  fixedHeight?: boolean;
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/20">
          <Icon size={20} />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight hero-gradient">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <StaggerItem key={item.id} index={idx} className="h-full">
            <div
              className={`group relative bg-[var(--card)] border border-[var(--border)] p-5 rounded-sm h-full flex flex-col transition-all duration-300 hover:border-[var(--primary)]/40 hover:shadow-xl ${
                fixedHeight ? "" : "hover:-translate-y-1"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-mono text-[var(--primary)] font-bold opacity-70 group-hover:opacity-100 uppercase tracking-widest">
                  {item.subtitle}
                </span>
                <RiArrowRightUpLine size={14} className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h4 className="text-base font-black text-[var(--foreground)] mb-2 uppercase tracking-tight group-hover:text-[var(--primary)] transition-colors">
                {item.title}
              </h4>
              
              {item.description && (
                <p
                  className={`text-xs text-[var(--secondary)] leading-relaxed mb-4 transition-all duration-500 ${
                    fixedHeight ? "line-clamp-3" : "line-clamp-3 group-hover:line-clamp-none"
                  }`}
                >
                  {item.description}
                </p>
              )}
              
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                {item.tags.slice(0, 4).map((tag: string) => (
                  <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 bg-[var(--background)] border border-[var(--border)] text-[var(--secondary)] rounded-sm group-hover:text-[var(--foreground)] group-hover:border-[var(--primary)]/20 transition-colors">
                    {tag}
                  </span>
                ))}
                {item.tags.length > 4 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 text-[var(--primary)]">+ {item.tags.length - 4}</span>
                )}
              </div>
            </div>
          </StaggerItem>
        ))}
      </div>
    </div>
  );
}
