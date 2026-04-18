import * as React from "react";
import { FadeIn, TypingText } from "@/components/animated-text";
import { getDictionary } from "@/lib/get-dictionary";
import { Dictionary } from "@/lib/dictionary";
import { FloatingComic } from "@/components/floating-comic";
import { HomeClient } from "@/components/home-client";

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

        {/* Interactive Client Section (CTA Buttons + Easter Egg) */}
        <HomeClient lang={lang} cta_primary={dict.hero.cta_primary} />
      </section>
    </main>
  );
}
