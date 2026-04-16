import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, StaggerItem } from "@/components/animated-text";
import { 
  RiUser3Line, 
  RiMapPinLine, 
  RiGlobalLine,
  RiFocus3Line,
  RiDoubleQuotesL,
  RiMailLine,
  RiShieldUserLine
} from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
      {/* Header Section */}
      <div className="max-w-3xl mb-20 lg:mb-32">
        <FadeIn direction="down">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold mb-6 uppercase tracking-widest">
            <RiShieldUserLine size={14} /> {lang === 'de' ? 'Hintergrund' : 'Background'}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 hero-gradient leading-[1.15] pb-2">
            {dict.about.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--secondary)] leading-relaxed">
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
                <div className="p-8 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors group text-center flex flex-col justify-center">
                  <p className="text-3xl font-black hero-gradient mb-2 group-hover:scale-105 transition-transform origin-center">{value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--secondary)] font-bold">{key}</p>
                </div>
              </StaggerItem>
            ))}
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
                  { label: lang === 'de' ? 'Standort' : 'Location', value: dict.about.details.location, icon: RiMapPinLine },
                  { label: lang === 'de' ? 'Fokus' : 'Specialization', value: dict.about.details.specialization, icon: RiFocus3Line },
                  { label: lang === 'de' ? 'Sprachen' : 'Languages', value: dict.about.details.languages, icon: RiGlobalLine },
                  { label: 'E-Mail', value: dict.about.details.email, icon: RiMailLine, isLink: true }
                ].map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--primary)]/5 transition-colors border border-transparent hover:border-[var(--primary)]/10">
                    <div className="p-2.5 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)]">
                      <detail.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold mb-0.5">{detail.label}</p>
                      {detail.isLink ? (
                        <a href={`mailto:${detail.value}`} className="font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors whitespace-pre-line text-sm">
                          {detail.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-[var(--foreground)] whitespace-pre-line text-sm">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <a 
                  href={`/${lang}/vault`}
                  className="w-full btn-primary py-4 rounded-md flex items-center justify-center gap-3 shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold"
                >
                  <RiShieldUserLine size={20} />
                  <span>{dict.about.download_cv}</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </aside>
      </div>
    </main>
  );
}
