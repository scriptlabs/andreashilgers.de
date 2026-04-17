import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn } from "@/components/animated-text";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { RiCodeSSlashLine, RiArrowRightLine, RiFolderLine } from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";

export default async function ExperiencePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <FadeIn direction="down">
        <div className="flex flex-col items-start gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
            <RiCodeSSlashLine size={14} /> {lang === 'de' ? 'Karriere' : 'Career'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
            {dict.experience.title}
          </h1>
        </div>
        <p className="text-xl text-[var(--secondary)] mb-16">
          {dict.experience.subtitle}
        </p>
      </FadeIn>

      <ExperienceTimeline items={[...dict.experience.items].reverse()} lang={lang} />

      {/* CTA */}
      <FadeIn direction="up">
        <div className="mt-24 p-10 rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-1">
              {lang === 'de' ? 'Neugierig auf meine Projekte?' : 'Curious about my projects?'}
            </h2>
            <p className="text-[var(--secondary)] text-sm">
              {lang === 'de'
                ? 'Entdecke ausgewählte Projekte aus über 20 Jahren Entwicklung.'
                : 'Explore selected projects from over 20 years of development.'}
            </p>
          </div>
          <Link
            href={`/${lang}/projects`}
            className="btn-primary px-7 py-3 rounded-md font-bold flex items-center gap-2 shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <RiFolderLine size={18} />
            <span>{lang === 'de' ? 'Projekte ansehen' : 'View Projects'}</span>
            <RiArrowRightLine size={18} />
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
