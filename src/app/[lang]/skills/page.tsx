import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn } from "@/components/animated-text";
import Link from "next/link";
import {
  RiStackLine,
  RiLayoutLine,
  RiServerLine,
  RiDatabase2Line,
  RiCloudLine,
  RiRobot2Line,
  RiTeamLine,
  RiMailLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;
  return { title: dict.metadata.titles.skills };
}

type CategoryConfig = {
  icon: React.ReactNode;
  accent: string;
  bg: string;
  border: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
};

const categoryConfigs: Record<string, CategoryConfig> = {
  frontend: {
    icon: <RiLayoutLine size={22} />,
    accent: "text-[var(--primary)]",
    bg: "bg-[var(--primary)]/10",
    border: "border-[var(--primary)]/20",
    pillBg: "bg-[var(--primary)]/5",
    pillText: "text-[var(--primary)]/80",
    pillBorder: "border-[var(--primary)]/15",
  },
  backend: {
    icon: <RiServerLine size={22} />,
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    pillBg: "bg-blue-500/5",
    pillText: "text-blue-500/80",
    pillBorder: "border-blue-500/15",
  },
  database: {
    icon: <RiDatabase2Line size={22} />,
    accent: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    pillBg: "bg-purple-500/5",
    pillText: "text-purple-500/80",
    pillBorder: "border-purple-500/15",
  },
  cloud: {
    icon: <RiCloudLine size={22} />,
    accent: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    pillBg: "bg-cyan-500/5",
    pillText: "text-cyan-500/80",
    pillBorder: "border-cyan-500/15",
  },
  ai: {
    icon: <RiRobot2Line size={22} />,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    pillBg: "bg-emerald-500/5",
    pillText: "text-emerald-500/80",
    pillBorder: "border-emerald-500/15",
  },
  leadership: {
    icon: <RiTeamLine size={22} />,
    accent: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    pillBg: "bg-orange-500/5",
    pillText: "text-orange-500/80",
    pillBorder: "border-orange-500/15",
  },
};

const fallbackConfig: CategoryConfig = {
  icon: <RiStackLine size={22} />,
  accent: "text-[var(--primary)]",
  bg: "bg-[var(--primary)]/10",
  border: "border-[var(--primary)]/20",
  pillBg: "bg-[var(--primary)]/5",
  pillText: "text-[var(--primary)]/80",
  pillBorder: "border-[var(--primary)]/15",
};

export default async function SkillsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">

      {/* ── Header ── */}
      <FadeIn direction="down">
        <div className="flex flex-col items-start gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
            <RiStackLine size={14} /> {lang === "de" ? "Kompetenzen" : "Expertise"}
          </div>
          <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
            {dict.skills.title}
          </h1>
        </div>
        <p className="text-xl text-[var(--secondary)] mb-16 max-w-3xl">
          {dict.skills.subtitle}
        </p>
      </FadeIn>

      {/* ── Stats row ── */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {dict.skills.stats.map((stat) => (
            <div
              key={stat.label}
              className="card rounded-md p-6 text-center border-transparent hover:border-[var(--primary)]/20 transition-all"
            >
              <div className="text-3xl font-black hero-gradient inline-block leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-[var(--secondary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ── Category grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dict.skills.categories.map((category, catIndex) => {
          const cfg = categoryConfigs[category.icon] ?? fallbackConfig;

          return (
            <FadeIn key={category.name} delay={catIndex * 0.07} className="h-full">
              <div className={`card h-full flex flex-col p-7 rounded-md border hover:shadow-lg transition-all ${cfg.border} hover:border-opacity-40`}>

                {/* Card header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`shrink-0 p-2.5 rounded-sm ${cfg.bg} ${cfg.accent}`}>
                    {cfg.icon}
                  </div>
                  <div className="min-w-0">
                    <h2 className={`text-base font-black uppercase tracking-wide ${cfg.accent}`}>
                      {category.name}
                    </h2>
                    <p className="text-xs text-[var(--secondary)] leading-relaxed mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px w-full mb-5 ${cfg.bg}`} />

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-sm border transition-colors cursor-default
                        ${cfg.pillBg} ${cfg.pillText} ${cfg.pillBorder}
                        hover:${cfg.bg} hover:border-opacity-40`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* ── Footer quote ── */}
      <FadeIn direction="up" delay={0.4} className="mt-20">
        <div className="p-10 rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] text-center shadow-xl">
          <p className="text-lg text-[var(--secondary)] italic max-w-2xl mx-auto leading-relaxed px-8 md:px-16">
            &ldquo;{dict.skills.description}&rdquo;
          </p>
          <div className="w-16 h-0.5 bg-[var(--primary)] mx-auto mt-6 rounded-full opacity-40" />
        </div>
      </FadeIn>

      {/* ── CTA ── */}
      <FadeIn direction="up" delay={0.5} className="mt-8">
        <div className="p-10 rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-1">
              {dict.skills.cta.title}
            </h2>
            <p className="text-[var(--secondary)] text-sm">
              {dict.skills.cta.subtitle}
            </p>
          </div>
          <Link
            href={`/${lang}/contact`}
            className="btn-primary px-7 py-3 rounded-md font-bold flex items-center gap-2 shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <RiMailLine size={18} />
            <span>{dict.skills.cta.button}</span>
            <RiArrowRightLine size={18} />
          </Link>
        </div>
      </FadeIn>

    </main>
  );
}
