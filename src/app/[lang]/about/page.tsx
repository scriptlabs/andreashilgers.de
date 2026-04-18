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
      {/* ── Header Section ── */}
      <header className="max-w-4xl mb-16 md:mb-24">
        <FadeIn direction="down">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest mb-8">
            <RiShieldUserLine size={14} /> {lang === 'de' ? 'Profil' : 'Profile'}
          </div>
          <h1 className="text-5xl md:text-8xl font-black hero-gradient leading-[1.1] mb-8">
            {dict.about.title}
          </h1>
          <p className="text-xl md:text-3xl text-[var(--secondary)] font-medium leading-relaxed">
            {dict.about.subtitle}
          </p>
        </FadeIn>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* ── Left Column: Content ── */}
        <div className="lg:col-span-7 space-y-16">
          
          {/* Biography */}
          <section className="space-y-6">
            <FadeIn direction="up">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--primary)] font-bold mb-4">{lang === 'de' ? 'Über mich' : 'Biography'}</h2>
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--foreground)] opacity-90 font-light">
                {dict.about.description}
              </p>
            </FadeIn>
          </section>

          {/* Details Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[var(--border)]">
            {profileDetails.map((detail, idx) => (
              <StaggerItem key={idx} index={idx}>
                <div className="group">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">{detail.label}</p>
                  <p className="text-lg font-semibold text-[var(--foreground)] leading-tight whitespace-pre-line">{detail.value}</p>
                </div>
              </StaggerItem>
            ))}
          </section>

          {/* Actions */}
          <FadeIn direction="up" className="flex flex-wrap gap-4 pt-8">
            <Link
              href={`/${lang}/experience`}
              className="btn-primary px-8 py-4 rounded-md flex items-center gap-2 font-bold shadow-xl shadow-[var(--primary)]/10"
            >
              <span>{lang === 'de' ? 'Meinen Berufsweg ansehen' : 'Explore my Career'}</span>
              <RiArrowRightLine size={18} />
            </Link>
            <a
              href="https://linkedin.com/in/andreashilgers"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-8 py-4 rounded-md flex items-center gap-2 font-bold"
            >
              <RiLinkedinBoxFill size={22} className="text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>
          </FadeIn>

          {/* Core Values Stats */}
          <section className="pt-16 border-t border-[var(--border)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(dict.about.stats).map(([key, value], index) => (
                <StaggerItem key={key} index={index} className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold opacity-60">
                    {key}
                  </p>
                  <p className="text-lg font-black text-[var(--foreground)]">{value}</p>
                </StaggerItem>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right Column: Image (Sticky) ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 order-first lg:order-last mb-12 lg:mb-0">
          <FadeIn direction="left">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0">
              {/* Elegant frame */}
              <div className="absolute inset-0 border border-[var(--primary)]/10 rounded-2xl translate-x-6 translate-y-6 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/5 to-transparent rounded-2xl -z-10 -translate-x-3 -translate-y-3" />
              
              <div className="h-full w-full relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                <Image
                  src="/images/me.png"
                  alt={dict.about.details.name}
                  fill
                  priority
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Float label */}
              <div className="absolute -bottom-6 -left-6 bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-xl hidden md:block">
                <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-tighter mb-1">Founder & Leader</p>
                <p className="text-sm font-black italic">&quot;Always building.&quot;</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Quote & Looking For ── */}
      <section className="mt-32 space-y-24">
        {/* Large Quote */}
        <FadeIn direction="up">
          <div className="relative py-24 border-y border-[var(--border)] text-center">
            <RiDoubleQuotesL className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] text-[var(--primary)] opacity-[0.03] pointer-events-none" />
            <p className="relative z-10 text-3xl md:text-5xl font-black hero-gradient leading-[1.2] max-w-5xl mx-auto italic">
              {dict.about.quote}
            </p>
          </div>
        </FadeIn>

        {/* Looking For Section */}
        <FadeIn direction="up">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="w-16 h-1 bg-[var(--primary)] mx-auto rounded-full opacity-20" />
            <h3 className="text-2xl font-black text-[var(--foreground)] uppercase tracking-tight">
              {dict.about.looking_for.title}
            </h3>
            <p className="text-xl md:text-2xl text-[var(--secondary)] leading-relaxed italic">
              &ldquo;{dict.about.looking_for.content}&rdquo;
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── CTA ── */}
      <FadeIn direction="up" className="mt-40">
        <div className="p-12 md:p-16 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-4">
              {lang === 'de' ? 'Bereit für das nächste Level?' : 'Ready for the next level?'}
            </h2>
            <p className="text-[var(--secondary)] text-lg max-w-xl">
              {lang === 'de' ? 'Sehen Sie sich die Projekte an, die ich über die Jahre realisiert habe.' : 'Take a look at the projects I have realized over the years.'}
            </p>
          </div>
          <Link
            href={`/${lang}/projects`}
            className="btn-primary px-12 py-5 rounded-md font-bold flex items-center gap-3 shadow-2xl shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg whitespace-nowrap"
          >
            <RiFolderLine size={24} />
            <span>{lang === 'de' ? 'Projekte ansehen' : 'View Projects'}</span>
            <RiArrowRightLine size={24} />
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
