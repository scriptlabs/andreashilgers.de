import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, StaggerItem } from "@/components/animated-text";
import Link from "next/link";
import {
  RiUser3Line,
  RiMapPinLine,
  RiGlobalLine,
  RiFocus3Line,
  RiDoubleQuotesL,
  RiShieldUserLine,
  RiLinkedinBoxFill,
  RiArrowRightLine,
  RiCalendarLine,
  RiGamepadLine,
  RiGroupLine,
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
      {/* Header Section */}
      <div className="max-w-3xl mb-16">
        <FadeIn direction="down">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
              <RiShieldUserLine size={14} /> {lang === 'de' ? 'Hintergrund' : 'Background'}
            </div>
            <h1 className="text-5xl md:text-7xl font-black hero-gradient leading-[1.15] pb-2">
              {dict.about.title}
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[var(--secondary)] leading-relaxed mt-6">
            {dict.about.subtitle}
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Story & Vision */}
        <div className="lg:col-span-7 space-y-12">
          <FadeIn direction="right" delay={0.2}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl leading-relaxed text-[var(--foreground)] opacity-90">
                {dict.about.description}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="relative py-10 px-12 md:px-24 rounded-xl bg-gradient-to-br from-[var(--card)] to-[var(--background)] border border-[var(--border)] shadow-xl overflow-hidden group">
              <RiDoubleQuotesL className="absolute top-2 left-2 text-5xl text-[var(--primary)] opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500" />
              <p className="relative z-10 text-base md:text-lg font-medium italic text-[var(--primary)] leading-relaxed text-center">
                {dict.about.quote}
              </p>
              <RiDoubleQuotesL className="absolute bottom-2 right-2 text-5xl text-[var(--primary)] opacity-10 rotate-180 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500" />
            </div>
          </FadeIn>
          
          {/* Detailed Stats in 2-column list style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(dict.about.stats).map(([key, value], index) => (
              <StaggerItem key={key} index={index}>
                <div className="p-8 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors group text-center flex flex-col justify-center h-full">
                  <p className="text-3xl font-black hero-gradient mb-2 group-hover:scale-105 transition-transform origin-center">{value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--secondary)] font-bold">{key}</p>
                </div>
              </StaggerItem>
            ))}
            
            {/* Looking For Card - Spans full width of the grid */}
            <StaggerItem index={4} className="sm:col-span-2">
              <div className="p-8 rounded-md bg-[var(--primary)]/5 border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-[var(--primary)]">
                  <RiFocus3Line size={24} />
                  {dict.about.looking_for.title}
                </h3>
                <p className="text-[var(--foreground)] opacity-80 leading-relaxed italic">
                  &ldquo;{dict.about.looking_for.content}&rdquo;
                </p>
              </div>
            </StaggerItem>
          </div>
        </div>

        {/* Right Column: Key Details & Quick Info */}
        <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
          <FadeIn direction="left" delay={0.3}>
            <div className="p-8 rounded-md bg-[var(--card)] border border-[var(--border)] shadow-xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <RiUser3Line size={24} className="text-[var(--primary)]" />
                {dict.about.details_title}
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: lang === 'de' ? 'Name' : 'Name', value: dict.about.details.name, icon: RiUser3Line },
                  { label: lang === 'de' ? 'Alter' : 'Age', value: dict.about.details.age, icon: RiCalendarLine },
                  { label: lang === 'de' ? 'Standort' : 'Location', value: dict.about.details.location, icon: RiMapPinLine },
                  { label: lang === 'de' ? 'Fokus' : 'Specialization', value: dict.about.details.specialization, icon: RiFocus3Line },
                  { label: lang === 'de' ? 'Sprachen' : 'Languages', value: dict.about.details.languages, icon: RiGlobalLine },
                  { label: lang === 'de' ? 'Hobbies' : 'Hobbies', value: dict.about.details.hobbies, icon: RiGamepadLine },
                  { label: lang === 'de' ? 'Mitgliedschaft' : 'Membership', value: dict.about.details.memberships, icon: RiGroupLine }
                ].filter(d => d.value).map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-sm hover:bg-[var(--primary)]/5 transition-colors border border-transparent hover:border-[var(--primary)]/10">
                    <div className="p-2.5 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)]">
                      <detail.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold mb-0.5">{detail.label}</p>
                      <p className="font-semibold text-[var(--foreground)] whitespace-pre-line text-sm">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 relative z-10">
                <Link
                  href={`/${lang}/contact`}
                  className="w-full btn-outline py-4 rounded-md flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-sm"
                >
                  <RiMailLine size={20} />
                  <span>{lang === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}</span>
                </Link>
              </div>

              <div className="mt-4">
                <a
                  href="https://linkedin.com/in/andreashilgers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-outline py-3 rounded-md flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm font-bold"
                >
                  <RiLinkedinBoxFill size={20} className="text-[#0a66c2]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>

              <div className="mt-4">
                <Link
                  href={`/${lang}/experience`}
                  className="w-full btn-primary py-3 rounded-md flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm font-bold"
                >
                  <span>{lang === 'de' ? 'Meine Erfahrung' : 'My Experience'}</span>
                  <RiArrowRightLine size={18} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </aside>
      </div>
    </main>
  );
}
