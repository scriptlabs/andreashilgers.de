import { getDictionary } from "@/lib/get-dictionary";
import { Dictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { FadeIn } from "@/components/animated-text";
import AgenticTopology from "@/components/agentic-topology";
import AgenticWorkflow from "@/components/agentic-workflow";
import AgentSpecs from "@/components/agentic-specs";
import { RiRobot2Line, RiArrowRightLine, RiCommandLine } from "react-icons/ri";
import Link from "next/link";

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang as "de" | "en")) as unknown as Dictionary;
  return { title: dict.metadata.titles.agenticDevelopment };
}

export default async function AgenticDevelopmentPage(
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const dict = (await getDictionary(lang as "de" | "en")) as unknown as Dictionary;
  const ad = dict.agenticDevelopment;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20 relative">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10" 
           style={{ backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Section 1: Hero */}
      <FadeIn direction="down" className="mb-24">
        <div className="flex flex-col items-start gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
            <RiCommandLine size={14} className="animate-pulse" />
            {ad.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
            {ad.title}
          </h1>
        </div>
        <p className="text-xl text-[var(--secondary)] mb-4 max-w-3xl leading-relaxed">
          {ad.subtitle}
        </p>
        <p className="text-base text-[var(--secondary)] max-w-3xl leading-relaxed italic opacity-80">
          {ad.description}
        </p>
      </FadeIn>

      {/* Section 2: System Architecture Topology */}
      <div className="mb-40">
        <FadeIn direction="up">
          <div className="flex flex-col items-start gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-black inline-block leading-[1.15] uppercase tracking-tight">
              {ad.topology.sectionTitle}
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-[var(--primary)]" />
              <p className="text-sm font-mono text-[var(--secondary)] uppercase tracking-[0.2em] opacity-70">
                Pipeline Schematic v2.0
              </p>
            </div>
          </div>
        </FadeIn>

        <AgenticTopology nodes={ad.topology.nodes} layerLabels={ad.topology.layerLabels} layerDescriptions={ad.topology.layerDescriptions} />
      </div>

      {/* Section 3: The Agentic Core (Integrated Specs) */}
      <div className="mb-40 relative">
        <FadeIn direction="up">
          <div className="flex flex-col items-start gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-black inline-block leading-[1.15] uppercase tracking-tight">
              {ad.capabilitiesSection.title}
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-[var(--accent)]" />
              <p className="text-sm font-mono text-[var(--secondary)] uppercase tracking-[0.2em] opacity-70">
                Resource Configuration & Logic Modules
              </p>
            </div>
          </div>
        </FadeIn>

        <AgentSpecs 
          tools={ad.tools} 
          capabilities={ad.capabilities} 
          personas={ad.personas} 
          labels={{
            tools: ad.toolsSection.title,
            capabilities: ad.capabilitiesSection.title,
            personas: ad.personasSection.title
          }}
        />
      </div>

      {/* Section 4: Local Infrastructure & ML */}
      <div className="mb-40">
        <FadeIn direction="up">
          <div className="flex flex-col items-start gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-black inline-block leading-[1.15] uppercase tracking-tight">
              {ad.infrastructure.title}
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-rose-500" />
              <p className="text-sm font-mono text-[var(--secondary)] uppercase tracking-[0.2em] opacity-70">
                Edge Computing & Machine Learning Optimization
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {ad.infrastructure.items.map((item, idx) => (
            <FadeIn key={item.id} direction="up" delay={idx * 0.1}>
              <div className="group bg-[var(--card)] border border-[var(--border)] p-8 rounded-sm hover:border-rose-500/30 transition-all h-full flex flex-col relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 -translate-y-12 translate-x-12 rounded-full blur-2xl" />
                
                <h3 className="font-black text-xl mb-4 uppercase tracking-tighter group-hover:text-rose-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--secondary)] leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span key={t} className="text-[9px] font-mono font-bold px-2 py-1 bg-rose-500/10 text-rose-500 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn direction="up" delay={0.3}>
          <div className="p-8 rounded-sm border border-[var(--border)] bg-[var(--primary)]/5 relative overflow-hidden group">
            <RiCommandLine className="absolute -bottom-4 -right-4 text-[var(--primary)] opacity-5 group-hover:opacity-10 transition-opacity" size={160} />
            <p className="text-sm md:text-base text-[var(--foreground)] leading-relaxed italic relative z-10">
              &quot;{ad.infrastructure.description}&quot;
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Section 5: Workflow Pipeline */}
      <div className="mb-32">
        <FadeIn direction="up">
          <div className="flex flex-col items-start gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-black inline-block leading-[1.15]">
              {ad.workflow.sectionTitle}
            </h2>
            <p className="text-lg text-[var(--secondary)] max-w-2xl font-mono text-sm opacity-70">
              {`// ${ad.workflow.sectionSubtitle}`}
            </p>
          </div>
        </FadeIn>

        <div className="bg-[var(--card)] border border-[var(--border)] p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <RiRobot2Line size={120} />
          </div>
          <AgenticWorkflow steps={ad.workflow.steps} />
        </div>
      </div>

      {/* CTA Footer */}
      <FadeIn direction="up" delay={0.4} className="mt-32">
        <div className="p-12 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5 opacity-50" />
          <div className="relative z-10 text-center sm:text-left">
            <h2 className="text-3xl font-black text-[var(--foreground)] mb-2 tracking-tight">
              {ad.cta.title}
            </h2>
            <p className="text-[var(--secondary)] text-lg max-w-xl">
              {ad.cta.subtitle}
            </p>
          </div>
          <Link
            href={`/${lang}/contact`}
            className="btn-primary px-10 py-4 rounded-md font-bold flex items-center gap-3 shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg relative z-10"
          >
            <RiRobot2Line size={24} />
            <span>{ad.cta.button}</span>
            <RiArrowRightLine size={24} />
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
