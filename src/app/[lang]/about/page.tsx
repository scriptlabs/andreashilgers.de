import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, StaggerItem } from "@/components/animated-text";
import Link from "next/link";
import Image from "next/image";
import {
  RiMapPinLine,
  RiGlobalLine,
  RiFocus3Line,
  RiDoubleQuotesL,
  RiShieldUserLine,
  RiLinkedinBoxFill,
  RiArrowRightLine,
  RiCalendarLine,
  RiFolderLine,
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

  const profileDetails = [
    { label: lang === 'de' ? 'Standort' : 'Location', value: dict.about.details.location, icon: RiMapPinLine },
    { label: lang === 'de' ? 'Erfahrung' : 'Experience', value: dict.about.details.experience, icon: RiCalendarLine },
    { label: lang === 'de' ? 'Fokus' : 'Specialization', value: dict.about.details.specialization, icon: RiFocus3Line },
    { label: lang === 'de' ? 'Sprachen' : 'Languages', value: dict.about.details.languages, icon: RiGlobalLine },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      {/* ── Profile Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center mb-24">
        
        {/* Left: Image */}
        <div className="lg:col-span-5 relative group">
          <FadeIn direction="right">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
              {/* Decorative Background Elements */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary)]/10 to-transparent rounded-2xl -z-10 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 border border-[var(--primary)]/10 rounded-xl -z-10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
              
              <div className="h-full w-full relative rounded-xl overflow-hidden shadow-2xl shadow-black/20">
                <Image
                  src="/images/me.png"
                  alt={dict.about.details.name}
                  fill
                  priority
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: Intro & Bio */}
        <div className="lg:col-span-7 space-y-8">
          <FadeIn direction="left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
                <RiShieldUserLine size={14} /> {lang === 'de' ? 'Hintergrund' : 'Background'}
              </div>
              <h1 className="text-4xl md:text-6xl font-black hero-gradient leading-tight">
                {dict.about.title}
              </h1>
              <p className="text-xl md:text-2xl text-[var(--secondary)] font-medium">
                {dict.about.subtitle}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg leading-relaxed text-[var(--foreground)] opacity-80 max-w-2xl">
              {dict.about.description}
            </p>
          </FadeIn>

          {/* Quick Profile Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {profileDetails.map((detail, idx) => (
              <StaggerItem key={idx} index={idx}>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-[var(--muted)]/30 border border-[var(--border)] hover:border-[var(--primary)]/20 transition-colors">
                  <div className="p-2 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
                    <detail.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold mb-0.5">{detail.label}</p>
                    <p className="font-semibold text-sm text-[var(--foreground)] leading-tight whitespace-pre-line">{detail.value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>

          <FadeIn direction="up" delay={0.4} className="flex flex-wrap gap-4 pt-4">
            <Link
              href={`/${lang}/experience`}
              className="btn-primary px-8 py-3 rounded-md flex items-center gap-2 font-bold shadow-xl shadow-[var(--primary)]/10"
            >
              <span>{lang === 'de' ? 'Berufsweg ansehen' : 'View Career'}</span>
              <RiArrowRightLine size={18} />
            </Link>
            <a
              href="https://linkedin.com/in/andreashilgers"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-8 py-3 rounded-md flex items-center gap-2 font-bold hover:bg-[#0a66c2]/5"
            >
              <RiLinkedinBoxFill size={20} className="text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>
          </FadeIn>
        </div>
      </div>

      {/* ── Stats & Quote ── */}
      <div className="space-y-24">
        {/* Quote Block */}
        <FadeIn direction="up">
          <div className="relative py-16 px-8 md:px-24 rounded-2xl bg-gradient-to-br from-[var(--card)] to-[var(--background)] border border-[var(--border)] shadow-xl overflow-hidden text-center">
            <RiDoubleQuotesL className="absolute top-4 left-4 text-7xl text-[var(--primary)] opacity-5" />
            <p className="relative z-10 text-2xl md:text-3xl font-black hero-gradient italic leading-relaxed max-w-4xl mx-auto">
              {dict.about.quote}
            </p>
            <RiDoubleQuotesL className="absolute bottom-4 right-4 text-7xl text-[var(--primary)] opacity-5 rotate-180" />
          </div>
        </FadeIn>

        {/* Core Values / Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {Object.entries(dict.about.stats).map(([key, value], index) => (
            <StaggerItem key={key} index={index} className="text-center group">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--secondary)] font-bold opacity-60 group-hover:text-[var(--primary)] group-hover:opacity-100 transition-all">
                  {key}
                </p>
                <div className="h-px w-8 bg-[var(--primary)]/20 mx-auto group-hover:w-16 transition-all duration-500" />
                <p className="text-xl font-black text-[var(--foreground)] pt-1">{value}</p>
              </div>
            </StaggerItem>
          ))}
        </div>

        {/* Looking For Section */}
        <FadeIn direction="up">
          <div className="p-8 md:p-12 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="shrink-0 p-5 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] shadow-inner">
              <RiFocus3Line size={48} />
            </div>
            
            <div className="space-y-4 relative z-10 text-center md:text-left">
              <h3 className="text-2xl font-black text-[var(--primary)] uppercase tracking-tight">
                {dict.about.looking_for.title}
              </h3>
              <p className="text-lg text-[var(--foreground)] opacity-80 leading-relaxed italic max-w-3xl">
                &ldquo;{dict.about.looking_for.content}&rdquo;
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ── CTA ── */}
      <FadeIn direction="up" className="mt-32">
        <div className="p-10 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-2">
              {lang === 'de' ? 'Bereit für das nächste Level?' : 'Ready for the next level?'}
            </h2>
            <p className="text-[var(--secondary)] text-base">
              {lang === 'de' ? 'Sehen Sie sich die Projekte an, die ich über die Jahre realisiert habe.' : 'Take a look at the projects I have realized over the years.'}
            </p>
          </div>
          <Link
            href={`/${lang}/projects`}
            className="btn-primary px-10 py-4 rounded-md font-bold flex items-center gap-3 shadow-xl shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <RiFolderLine size={20} />
            <span>{lang === 'de' ? 'Projekte ansehen' : 'View Projects'}</span>
            <RiArrowRightLine size={20} />
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
