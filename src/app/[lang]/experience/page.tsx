import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn } from "@/components/animated-text";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { RiCodeSSlashLine, RiArrowRightLine, RiFolderLine } from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;
  return { title: dict.metadata.titles.experience };
}

export default async function ExperiencePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <FadeIn direction="down">
        <div className="flex flex-col items-start gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
            <RiCodeSSlashLine size={14} /> {lang === 'de' ? 'Berufsweg' : 'Journey'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
            {dict.experience.title}
          </h1>
        </div>
        <p className="text-xl text-[var(--secondary)] mb-16 max-w-2xl">
          {dict.experience.subtitle}
        </p>
      </FadeIn>

      <ExperienceTimeline items={dict.experience.items} lang={lang} />

      <FadeIn direction="up" delay={0.4} className="mt-20 text-center">
        <div className="inline-block">
          <Link
            href={`/${lang}/projects`}
            className="btn-primary px-8 py-4 rounded-md font-bold flex items-center gap-3 shadow-xl shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
