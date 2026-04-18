import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import {
  RiArrowRightLine,
  RiCalendarLine,
  RiLinkedinBoxFill,
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
    <main className="min-h-[calc(100vh-64px)] overflow-x-hidden relative py-12 sm:py-0 flex items-center justify-center">
      {/* Background Container to prevent unwanted scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="bg-orb bg-orb-primary absolute -top-40 -left-40" />
        <div className="bg-orb bg-orb-accent  absolute -bottom-20 -right-40" />
        <div className="bg-orb bg-orb-mid    absolute top-1/2 right-1/4" />
        
        {/* Subtle dot-grid texture */}
        <div className="absolute inset-0 bg-dot-grid opacity-[0.35]" />
      </div>

      {/* Hero */}
      <section className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1">
              {/* Availability badge */}
              <FadeIn direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 text-[var(--primary)] text-xs sm:text-sm font-bold mb-10 select-none border border-[var(--primary)]/20 bg-[var(--primary)]/5 rounded-md">
                  <PulseCircle />
                  {dict.hero.badge}
                </div>
              </FadeIn>

              {/* Name */}
              <FadeIn direction="down" delay={0.3}>
                <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-normal leading-[1.1] pb-4 mb-3 sm:px-0">
                  <span className="hero-gradient inline-block pr-2 sm:pr-4">{dict.hero.name}</span>
                </h1>
              </FadeIn>

              {/* Role */}
              <FadeIn direction="down" delay={0.5}>
                <p className="text-[10px] sm:text-xs md:text-sm text-[var(--secondary)] font-bold uppercase tracking-[0.2em] sm:tracking-[0.28em] mb-5 leading-relaxed">
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
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
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
                  <a
                    href="https://linkedin.com/in/andreashilgers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-7 py-3.5 sm:py-3 text-base rounded-md font-bold flex items-center justify-center gap-2"
                    title="LinkedIn Profile"
                  >
                    <RiLinkedinBoxFill size={20} className="text-[#0a66c2]" />
                    <span className="sm:hidden">LinkedIn</span>
                  </a>
                </div>
              </FadeIn>

              {/* Stats row */}
              <FadeIn direction="up" delay={1.1}>
                <div className="flex justify-center lg:justify-start items-center sm:items-stretch mb-8 overflow-x-auto no-scrollbar">
                  {dict.hero.stats.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className={`px-3 sm:px-6 md:px-8 text-center lg:text-left ${idx > 0 ? "border-l border-[var(--border)]" : ""}`}
                    >
                      <p className="text-lg sm:text-2xl md:text-3xl font-black hero-gradient leading-tight">
                        {stat.value}
                      </p>
                      <p className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[var(--secondary)] font-semibold mt-1 sm:mt-0.5 whitespace-nowrap">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Visual */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
              <FadeIn direction="left" delay={0.5}>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
                  {/* Decorative backdrop for the comic image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/10 to-transparent rounded-full blur-2xl animate-pulse" />
                  
                  <div className="relative w-full h-full animate-float">
                    <Image
                      src="/images/me_comic.png"
                      alt={dict.hero.name}
                      fill
                      priority
                      className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
