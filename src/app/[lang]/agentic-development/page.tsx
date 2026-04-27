import { getDictionary } from "@/lib/get-dictionary";
import { Dictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { FadeIn, StaggerItem, ShineCard } from "@/components/animated-text";
import AgenticTopology from "@/components/agentic-topology";
import AgenticWorkflow from "@/components/agentic-workflow";
import { RiRobot2Line, RiArrowRightLine, RiArrowLeftRightLine, RiArrowLeftLine } from "react-icons/ri";
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
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* Section 1: Hero */}
      <FadeIn direction="down">
        <div className="flex flex-col items-start gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
            <RiRobot2Line size={14} />
            {ad.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
            {ad.title}
          </h1>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.2} className="mb-16">
        <p className="text-xl text-[var(--secondary)] mb-4 max-w-3xl leading-relaxed">
          {ad.subtitle}
        </p>
        <p className="text-base text-[var(--secondary)] max-w-3xl leading-relaxed">
          {ad.description}
        </p>
      </FadeIn>

      {/* Section 2: System Architecture Topology */}
      <div className="mb-28">
        <FadeIn direction="down">
          <div className="flex flex-col items-start gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-black inline-block leading-[1.15]">
              {ad.topology.sectionTitle}
            </h2>
            <p className="text-lg text-[var(--secondary)] max-w-2xl">
              {ad.topology.sectionSubtitle}
            </p>
          </div>
        </FadeIn>

        <AgenticTopology nodes={ad.topology.nodes} layerLabels={ad.topology.layerLabels} />
      </div>

      {/* Section 3: Tools Showcase Grid */}
      <div className="mb-28">
        <FadeIn direction="down">
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-[1.15]">Tools & Platforms</h2>
          <p className="text-lg text-[var(--secondary)] mb-12 max-w-2xl">
            Die KI-Engines und Runtimes die unser System antreiben.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {ad.tools.map((tool, index) => (
            <StaggerItem key={tool.id} index={index}>
              <div className="card p-4 sm:p-5 rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all hover:shadow-lg h-full flex flex-col">
                <h3 className="font-bold text-base mb-2">{tool.name}</h3>
                <p className="text-xs text-[var(--secondary)] mb-3 text-center px-2 py-1 rounded-sm bg-[var(--primary)]/5">
                  {tool.role}
                </p>
                <div className="space-y-1 flex-grow">
                  {tool.capabilities.map((cap, i) => (
                    <p key={i} className="text-xs text-[var(--secondary)] leading-tight">
                      • {cap}
                    </p>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>

      {/* Section 4: Agent Capabilities Grid */}
      <div className="mb-28">
        <FadeIn direction="down">
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-[1.15]">Agent Capabilities</h2>
          <p className="text-lg text-[var(--secondary)] mb-12 max-w-2xl">
            Was unsere spezialisierten Agenten können.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ad.capabilities.map((cap, index) => (
            <StaggerItem key={cap.id} index={index}>
              <ShineCard>
                <div className="card p-6 rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all h-full flex flex-col">
                  <h3 className="font-bold text-lg mb-2">{cap.title}</h3>
                  <p className="text-sm text-[var(--secondary)] mb-4 flex-grow">{cap.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cap.outputs.map((output) => (
                      <span
                        key={output}
                        className="text-[10px] font-semibold px-2 py-1 rounded-sm border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)]"
                      >
                        {output}
                      </span>
                    ))}
                  </div>
                </div>
              </ShineCard>
            </StaggerItem>
          ))}
        </div>
      </div>

      {/* Section 5: Workflow Pipeline */}
      <div className="mb-28">
        <FadeIn direction="down">
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-[1.15]">
            {ad.workflow.sectionTitle}
          </h2>
          <p className="text-lg text-[var(--secondary)] mb-12 max-w-2xl">
            {ad.workflow.sectionSubtitle}
          </p>
        </FadeIn>

        <AgenticWorkflow steps={ad.workflow.steps} />
      </div>

      {/* Section 6: Channels & Integrations */}
      <div className="mb-28">
        <FadeIn direction="down">
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-[1.15]">
            {ad.channels.sectionTitle}
          </h2>
          <p className="text-lg text-[var(--secondary)] mb-12 max-w-2xl">
            {ad.channels.sectionSubtitle}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Input Channels */}
          <FadeIn direction="up" delay={0}>
            <div className="card p-6 rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <RiArrowRightLine className="text-[var(--primary)]" size={20} />
                <h3 className="font-bold text-lg">{ad.channels.input.title}</h3>
              </div>
              <p className="text-xs text-[var(--secondary)] font-semibold mb-4 uppercase tracking-wider">
                {ad.channels.input.direction}
              </p>
              <ul className="space-y-2">
                {ad.channels.input.items.map((item) => (
                  <StaggerItem key={item} index={0}>
                    <p className="text-sm text-[var(--foreground)]">• {item}</p>
                  </StaggerItem>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Bidirectional Channels */}
          <FadeIn direction="up" delay={0.1}>
            <div className="card p-6 rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <RiArrowLeftRightLine className="text-[var(--accent)]" size={20} />
                <h3 className="font-bold text-lg">{ad.channels.bidirectional.title}</h3>
              </div>
              <p className="text-xs text-[var(--secondary)] font-semibold mb-4 uppercase tracking-wider">
                {ad.channels.bidirectional.direction}
              </p>
              <ul className="space-y-2">
                {ad.channels.bidirectional.items.map((item) => (
                  <StaggerItem key={item} index={0}>
                    <p className="text-sm text-[var(--foreground)]">• {item}</p>
                  </StaggerItem>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Output Channels */}
          <FadeIn direction="up" delay={0.2}>
            <div className="card p-6 rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <RiArrowLeftLine className="text-emerald-500" size={20} />
                <h3 className="font-bold text-lg">{ad.channels.output.title}</h3>
              </div>
              <p className="text-xs text-[var(--secondary)] font-semibold mb-4 uppercase tracking-wider">
                {ad.channels.output.direction}
              </p>
              <ul className="space-y-2">
                {ad.channels.output.items.map((item) => (
                  <StaggerItem key={item} index={0}>
                    <p className="text-sm text-[var(--foreground)]">• {item}</p>
                  </StaggerItem>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* CTA Footer */}
      <FadeIn direction="up" delay={0.4} className="mt-20">
        <div className="p-8 glass rounded-md border border-[var(--primary)]/10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{ad.cta.title}</h2>
          <p className="text-[var(--secondary)] mb-6">{ad.cta.subtitle}</p>
          <Link
            href={`/${lang}/contact`}
            className="btn-primary px-8 py-3 rounded-md text-base font-bold inline-block"
          >
            {ad.cta.button}
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
