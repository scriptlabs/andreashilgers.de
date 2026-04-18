import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn } from "@/components/animated-text";
import Link from "next/link";
import Image from "next/image";
import {
  RiDoubleQuotesL,
  RiShieldUserLine,
  RiLinkedinBoxFill,
  RiArrowRightLine,
  RiMailLine,
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
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* ── Header ── */}
      <FadeIn direction="down">
        <div className="flex flex-col items-start gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
            <RiShieldUserLine size={14} /> {lang === 'de' ? 'Hintergrund' : 'Background'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
            {dict.about.title}
          </h1>
        </div>
        <p className="text-xl text-[var(--secondary)] mb-16 max-w-3xl leading-relaxed">
          {dict.about.subtitle}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* ── Left Side: Content ── */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Biography */}
          <FadeIn direction="up">
            <div className="card p-8 md:p-10 rounded-md border-transparent hover:border-[var(--primary)]/10 transition-all">
              <p className="text-lg md:text-xl leading-relaxed text-[var(--foreground)] opacity-90">
                {dict.about.description}
              </p>
            </div>
          </FadeIn>

          {/* Looking For (Moved here) */}
          <FadeIn direction="up" delay={0.2}>
            <div className="p-8 md:p-10 rounded-md border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex flex-col items-start gap-4 shadow-xl">
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-tight text-[var(--primary)]">
                  {dict.about.looking_for.title}
                </h3>
                <p className="text-lg text-[var(--secondary)] leading-relaxed italic">
                  &ldquo;{dict.about.looking_for.content}&rdquo;
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4} className="flex flex-wrap gap-4 pt-4">
            <Link
              href={`/${lang}/experience`}
              className="btn-primary px-8 py-3 rounded-md flex items-center gap-2 font-bold shadow-lg shadow-[var(--primary)]/10"
            >
              <span>{lang === 'de' ? 'Berufsweg ansehen' : 'View Career'}</span>
              <RiArrowRightLine size={18} />
            </Link>
            <a
              href="https://linkedin.com/in/andreashilgers"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-8 py-3 rounded-md flex items-center gap-2 font-bold hover:bg-[#0a66c2]/5 transition-all"
            >
              <RiLinkedinBoxFill size={22} className="text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>
          </FadeIn>
        </div>

        {/* ── Right Side: Image & Stats ── */}
        <aside className="lg:col-span-5 space-y-8">
          {/* Portrait */}
          <FadeIn direction="left">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/10 to-transparent rounded-md -z-10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src="/images/me.png"
                  alt={dict.about.details.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </FadeIn>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(dict.about.stats).map(([key, value]) => (
              <div key={key} className="card p-5 rounded-md border-transparent text-center">
                <p className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold mb-1 opacity-60">
                  {key}
                </p>
                <p className="text-sm font-black text-[var(--foreground)]">{value}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* ── Quote Section ── */}
      <FadeIn direction="up" delay={0.6} className="mt-24">
        <div className="p-12 md:p-16 rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] text-center shadow-xl relative overflow-hidden">
          <RiDoubleQuotesL className="absolute top-6 left-6 text-6xl text-[var(--primary)] opacity-[0.05]" />
          <p className="relative z-10 text-2xl md:text-3xl font-black hero-gradient italic leading-relaxed max-w-4xl mx-auto">
            {dict.about.quote}
          </p>
          <RiDoubleQuotesL className="absolute bottom-6 right-6 text-6xl text-[var(--primary)] opacity-[0.05] rotate-180" />
        </div>
      </FadeIn>

      {/* ── CTA ── */}
      <FadeIn direction="up" delay={0.8} className="mt-8">
        <div className="p-10 rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-1">
              {lang === 'de' ? 'Interesse an einer Zusammenarbeit?' : 'Interested in working together?'}
            </h2>
            <p className="text-[var(--secondary)] text-sm">
              {lang === 'de' ? 'Lassen Sie uns über Ihr nächstes Projekt sprechen.' : 'Let’s talk about your next project and how I can help.'}
            </p>
          </div>
          <Link
            href={`/${lang}/contact`}
            className="btn-primary px-8 py-3 rounded-md font-bold flex items-center gap-2 shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <RiMailLine size={18} />
            <span>{lang === 'de' ? 'Kontakt aufnehmen' : 'Get in Touch'}</span>
            <RiArrowRightLine size={18} />
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
