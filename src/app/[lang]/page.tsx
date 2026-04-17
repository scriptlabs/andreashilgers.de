import Link from "next/link";
import {
  RiArrowRightLine,
  RiCalendarLine,
} from "react-icons/ri";
import { FadeIn, TypingText, PulseCircle } from "@/components/animated-text";
import { getDictionary } from "@/lib/get-dictionary";
import { Dictionary } from "@/lib/dictionary";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="min-h-[calc(100vh-64px)] overflow-y-auto relative py-12 sm:py-0">
      {/* Animated background orbs */}
      <div className="bg-orb bg-orb-primary absolute -top-40 -left-40" />
      <div className="bg-orb bg-orb-accent  absolute -bottom-20 -right-40" />
      <div className="bg-orb bg-orb-mid    absolute top-1/2 right-1/4" />

      {/* Subtle dot-grid texture */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.35] pointer-events-none -z-10" />

      {/* Hero */}
      <section className="h-full flex items-center justify-center relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">

          {/* Availability badge */}
          <FadeIn direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 px-0 py-1.5 text-[var(--primary)] text-sm font-medium mb-6 select-none">
              <PulseCircle />
              {dict.hero.badge}
            </div>
          </FadeIn>

          {/* Name */}
          <FadeIn direction="down" delay={0.3}>
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-normal leading-[1.2] pb-4 mb-3 px-2 sm:px-6">
              <span className="hero-gradient inline-block pr-2 sm:pr-4">{dict.hero.name}</span>
            </h1>
          </FadeIn>

          {/* Role */}
          <FadeIn direction="down" delay={0.5}>
            <p className="text-[10px] sm:text-xs md:text-sm text-[var(--secondary)] font-bold uppercase tracking-[0.2em] sm:tracking-[0.28em] mb-5 max-w-[280px] sm:max-w-none mx-auto leading-relaxed">
              {dict.hero.role}
            </p>
          </FadeIn>

          {/* Typing animation */}
          <FadeIn direction="down" delay={0.7}>
            <div className="h-12 sm:h-8 md:h-10 mb-7">
              <TypingText
                texts={dict.hero.typing_texts}
                speed={80}
                pauseDuration={2500}
                deleteSpeed={40}
                className="text-lg sm:text-xl md:text-2xl font-bold"
              />
            </div>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn direction="up" delay={0.9}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 sm:mb-12">
              <Link
                href={`/${lang}/about`}
                className="btn-primary px-7 py-3.5 sm:py-3 text-base rounded-md font-bold flex items-center justify-center gap-2"
              >
                {dict.hero.cta_primary}
                <RiArrowRightLine size={18} />
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="btn-outline px-7 py-3.5 sm:py-3 text-base rounded-md font-bold flex items-center justify-center gap-2"
              >
                <RiCalendarLine size={18} />
                {dict.hero.cta_secondary}
              </Link>
            </div>
          </FadeIn>

          {/* Stats row */}
          <FadeIn direction="up" delay={1.1}>
            <div className="flex flex-wrap justify-center items-center gap-y-6 sm:gap-y-0 sm:items-stretch mb-8">
              {dict.hero.stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`px-4 sm:px-8 md:px-12 text-center ${idx > 0 ? "sm:border-l border-[var(--border)]" : ""} ${idx === 1 ? "border-x border-[var(--border)] sm:border-x-0" : ""}`}
                >
                  <p className="text-xl sm:text-2xl md:text-3xl font-black hero-gradient leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[var(--secondary)] font-semibold mt-1 sm:mt-0.5 whitespace-nowrap">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>
    </main>
  );
}
