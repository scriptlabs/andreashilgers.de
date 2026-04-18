import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, StaggerItem } from "@/components/animated-text";
import Link from "next/link";
import Image from "next/image";
import {
  RiDoubleQuotesL,
  RiShieldUserLine,
  RiLinkedinBoxFill,
  RiArrowRightLine,
  RiUser3Line,
  RiMapPinLine,
  RiCalendarLine,
  RiFocus3Line,
  RiGamepadLine,
  RiGroupLine,
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* ── Left Column: Content ── */}
        <div className="lg:col-span-7 space-y-24 order-last lg:order-first">
          
          {/* Biography */}
          <section className="space-y-12">
            <FadeIn direction="up">
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--foreground)] opacity-90 font-light">
                {dict.about.description}
              </p>
            </FadeIn>

            {/* Actions */}
            <FadeIn direction="up" delay={0.2} className="flex flex-wrap gap-4">
              <Link
                href={`/${lang}/experience`}
                className="btn-primary px-8 py-3.5 rounded-md flex items-center gap-2 font-bold shadow-xl shadow-[var(--primary)]/20"
              >
                <span>{lang === 'de' ? 'Berufsweg ansehen' : 'View Career'}</span>
                <RiArrowRightLine size={18} />
              </Link>
              <a
                href="https://linkedin.com/in/andreashilgers"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-8 py-3.5 rounded-md flex items-center gap-2 font-bold hover:bg-[#0a66c2]/5 transition-all"
              >
                <RiLinkedinBoxFill size={22} className="text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
            </FadeIn>
          </section>

          {/* Looking For */}
          <section className="pt-20 border-t border-[var(--border)]">
            <FadeIn direction="up">
              <div className="space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">
                  {dict.about.looking_for.title}
                </h3>
                <p className="text-2xl md:text-4xl font-black text-[var(--foreground)] leading-tight italic tracking-tight opacity-90">
                  &ldquo;{dict.about.looking_for.content}&rdquo;
                </p>
              </div>
            </FadeIn>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 border-t border-[var(--border)]">
            {Object.entries(dict.about.stats).map(([key, value], index) => (
              <StaggerItem key={key} index={index} className="space-y-1 group">
                <p className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold opacity-60 group-hover:text-[var(--primary)] transition-colors">
                  {key}
                </p>
                <p className="text-base font-black text-[var(--foreground)]">{value}</p>
              </StaggerItem>
            ))}
          </section>
        </div>

        {/* ── Right Column: Sidebar ── */}
        <aside className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
          {/* Portrait */}
          <FadeIn direction="left">
            <div className="relative group">
              {/* Elegant frame */}
              <div className="absolute inset-0 border border-[var(--primary)]/10 rounded-2xl translate-x-6 translate-y-6 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/5 to-transparent rounded-2xl -z-10 -translate-x-3 -translate-y-3" />
              
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                <Image
                  src="/images/me.png"
                  alt={dict.about.details.name}
                  fill
                  priority
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </FadeIn>

          {/* Profile Facts (Steckbrief) */}
          <FadeIn direction="up" delay={0.2}>
            <div className="p-8 rounded-2xl bg-[var(--muted)]/50 border border-[var(--border)]">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--secondary)] mb-8 flex items-center gap-2">
                <RiUser3Line size={14} className="text-[var(--primary)]" /> {lang === 'de' ? 'Fakten' : 'Facts'}
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: lang === 'de' ? 'Name' : 'Name', value: dict.about.details.name, icon: RiUser3Line },
                  { label: lang === 'de' ? 'Alter' : 'Age', value: dict.about.details.age, icon: RiCalendarLine },
                  { label: lang === 'de' ? 'Standort' : 'Location', value: dict.about.details.location, icon: RiMapPinLine },
                  { label: lang === 'de' ? 'Fokus' : 'Focus', value: dict.about.details.specialization, icon: RiFocus3Line },
                  { label: lang === 'de' ? 'Hobbys' : 'Hobbies', value: dict.about.details.hobbies, icon: RiGamepadLine },
                  { label: lang === 'de' ? 'Mitglied' : 'Member', value: dict.about.details.memberships, icon: RiGroupLine },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="shrink-0 text-[var(--secondary)] group-hover:text-[var(--primary)] transition-colors mt-0.5">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[var(--secondary)] opacity-50 tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-sm font-bold text-[var(--foreground)] leading-tight">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </aside>
      </div>

      {/* ── Quote Section ── */}
      <FadeIn direction="up" delay={0.4} className="mt-32 md:mt-48">
        <div className="relative py-24 md:py-40 text-center border-y border-[var(--border)] overflow-hidden">
          <RiDoubleQuotesL className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] text-[var(--primary)] opacity-[0.03] pointer-events-none" />
          <p className="relative z-10 text-3xl md:text-6xl font-black hero-gradient leading-[1.1] italic tracking-tighter max-w-5xl mx-auto">
            {dict.about.quote}
          </p>
        </div>
      </FadeIn>

      {/* ── CTA ── */}
      <FadeIn direction="up" delay={0.6} className="mt-20">
        <div className="p-12 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black text-[var(--foreground)] mb-2 tracking-tight">
              {lang === 'de' ? 'Mein Werdegang' : 'My Career Path'}
            </h2>
            <p className="text-[var(--secondary)] text-lg">
              {lang === 'de' ? 'Erfahren Sie mehr über meine beruflichen Stationen und meine technische Entwicklung.' : 'Learn more about my professional milestones and technical evolution.'}
            </p>
          </div>
          <Link
            href={`/${lang}/experience`}
            className="btn-primary px-10 py-4 rounded-md font-bold flex items-center gap-3 shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg"
          >
            <RiCalendarLine size={24} />
            <span>{lang === 'de' ? 'Berufsweg ansehen' : 'View Experience'}</span>
            <RiArrowRightLine size={24} />
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
