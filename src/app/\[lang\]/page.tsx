import * as React from "react";
import { getDictionary } from "@/lib/get-dictionary";
import ThemeSwitcher from "@/components/theme-switcher";
import LanguageSwitcher from "@/components/language-switcher";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "de" | "en" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold">Andreas Hilgers</h1>
        
        <div className="flex gap-4 items-center">
          <LanguageSwitcher currentLang={lang} />
          <ThemeSwitcher />
        </div>
      </header>

      <section className="mb-16">
        <h2 className="text-5xl font-extrabold mb-4">{dict.hero.title}</h2>
        <p className="text-xl text-[var(--secondary)] mb-8">
          {dict.hero.subtitle}
        </p>
        <button className="btn-primary">{dict.hero.cta}</button>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-6">{dict.projects.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">{dict.projects.project1.title}</h3>
            <p className="text-[var(--secondary)]">{dict.projects.project1.description}</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">{dict.projects.project2.title}</h3>
            <p className="text-[var(--secondary)]">{dict.projects.project2.description}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
