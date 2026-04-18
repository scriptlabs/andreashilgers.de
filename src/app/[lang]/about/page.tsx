import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn } from "@/components/animated-text";
import Link from "next/link";
import Image from "next/image";
import {
  RiArrowRightLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;
  return { title: dict.metadata.titles.about };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 md:py-40">
      
      {/* ── Intro ── */}
      <section className="mb-20 md:mb-32">
        <FadeIn direction="up">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            {dict.about.title}
          </h1>
          <p className="text-2xl md:text-3xl text-[var(--secondary)] font-light leading-snug">
            {dict.about.subtitle}
          </p>
        </FadeIn>
      </section>

      {/* ── Image ── */}
      <FadeIn direction="up" delay={0.2} className="mb-24 md:mb-40">
        <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden grayscale">
          <Image
            src="/images/me.png"
            alt={dict.about.details.name}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      </FadeIn>

      {/* ── Narrative ── */}
      <section className="space-y-32">
        
        <FadeIn direction="up">
          <div className="space-y-8">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-[var(--primary)]">{lang === 'de' ? 'Hintergrund' : 'Background'}</h2>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-[var(--foreground)] opacity-90">
              {dict.about.description}
            </p>
          </div>
        </FadeIn>

        {/* Quote */}
        <FadeIn direction="up">
          <div className="py-20 border-y border-[var(--border)]">
            <p className="text-3xl md:text-5xl font-black tracking-tighter leading-tight italic">
              &ldquo;{dict.about.quote}&rdquo;
            </p>
          </div>
        </FadeIn>

        {/* Facts & Personal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-10">
            <h3 className="text-xs uppercase tracking-[0.3em] font-black text-[var(--primary)]">Professional</h3>
            <div className="space-y-6">
              {[
                { label: 'Location', value: dict.about.details.location },
                { label: 'Experience', value: dict.about.details.experience },
                { label: 'Focus', value: dict.about.details.specialization },
                { label: 'Languages', value: dict.about.details.languages }
              ].map((fact, i) => (
                <div key={i} className="group border-b border-[var(--border)] pb-4">
                  <p className="text-[10px] uppercase font-bold text-[var(--secondary)] mb-1">{fact.label}</p>
                  <p className="font-bold whitespace-pre-line">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h3 className="text-xs uppercase tracking-[0.3em] font-black text-[var(--primary)]">{lang === 'de' ? 'Menschliches' : 'Beyond the Code'}</h3>
            <div className="space-y-6">
              {[
                { label: 'Hobbies', value: dict.about.details.hobbies },
                { label: 'Memberships', value: dict.about.details.memberships },
                { label: 'Status', value: dict.about.details.family }
              ].map((fact, i) => (
                <div key={i} className="group border-b border-[var(--border)] pb-4">
                  <p className="text-[10px] uppercase font-bold text-[var(--secondary)] mb-1">{fact.label}</p>
                  <p className="font-bold">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision */}
        <FadeIn direction="up">
          <div className="space-y-8 max-w-2xl">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-[var(--primary)]">{dict.about.looking_for.title}</h2>
            <p className="text-xl md:text-2xl leading-relaxed font-light italic">
              {dict.about.looking_for.content}
            </p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn direction="up" className="pt-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 group">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                {lang === 'de' ? 'Mein Werdegang' : 'My Career Path'}
              </h2>
              <p className="text-[var(--secondary)] text-xl font-light">
                {lang === 'de' 
                  ? 'Entdecken Sie zwei Jahrzehnte technischer Entwicklung.' 
                  : 'Explore two decades of technical evolution.'}
              </p>
            </div>
            
            <Link
              href={`/${lang}/experience`}
              className="inline-flex items-center gap-4 text-2xl font-black hover:text-[var(--primary)] transition-colors group/link"
            >
              <span>{lang === 'de' ? 'Berufsweg ansehen' : 'View Career'}</span>
              <RiArrowRightLine size={32} className="group-hover/link:translate-x-2 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        {/* External */}
        <div className="flex gap-8 pt-10">
          <a
            href="https://linkedin.com/in/andreashilgers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[var(--primary)] transition-colors"
          >
            <RiLinkedinBoxFill size={18} className="text-[#0a66c2]" />
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
