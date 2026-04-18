import Link from "next/link";
import * as React from "react";
import { RiArrowRightLine, RiLinkedinBoxFill } from "react-icons/ri";
import { FadeIn, TypingText } from "@/components/animated-text";
import { getDictionary } from "@/lib/get-dictionary";
import { Dictionary } from "@/lib/dictionary";
import { FloatingComic } from "@/components/floating-comic";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center pt-12 pb-24 md:pt-20 md:pb-40">
      {/* Background Texture - Clipped strictly to prevent scrollbars */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.3]" />
        
        {/* Animated background orbs */}
        <div className="bg-orb bg-orb-primary absolute -top-40 -left-40 opacity-20" />
        <div className="bg-orb bg-orb-accent  absolute -bottom-20 -right-40 opacity-20" />
      </div>

      {/* Comic Image - Fixed to bottom right (Client Component) */}
      <FloatingComic src="/images/me_comic.png" alt={dict.hero.name} />

      {/* Hero Content - Centered */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        {/* Name */}
        <FadeIn direction="down" delay={0.3}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight pb-2 mb-4 whitespace-nowrap px-4">
            <span className="hero-gradient inline-block px-2">{dict.hero.name}</span>
          </h1>
        </FadeIn>

        {/* Role */}
        <FadeIn direction="down" delay={0.5}>
          <p className="text-xs sm:text-sm md:text-base text-[var(--secondary)] font-bold uppercase tracking-[0.3em] mb-6">
            {dict.hero.role}
          </p>
        </FadeIn>

        {/* Typing animation */}
        <FadeIn direction="down" delay={0.7}>
          <div className="h-12 sm:h-10 mb-10">
            <TypingText
              texts={dict.hero.typing_texts}
              speed={80}
              pauseDuration={2500}
              deleteSpeed={40}
              startDelay={2000}
              className="text-xl sm:text-2xl md:text-3xl font-bold"
            />
          </div>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn direction="up" delay={0.9}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href={`/${lang}/about`}
              className="btn-primary px-8 py-4 text-base rounded-md font-bold flex items-center justify-center gap-2 shadow-xl shadow-[var(--primary)]/20"
            >
              {dict.hero.cta_primary}
              <RiArrowRightLine size={18} />
            </Link>
            <a
              href="https://linkedin.com/in/andreashilgers"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-5 py-4 rounded-md font-bold flex items-center justify-center transition-all hover:bg-[#0a66c2]/5"
              title="LinkedIn Profile"
            >
              <RiLinkedinBoxFill size={24} className="text-[#0a66c2]" />
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
