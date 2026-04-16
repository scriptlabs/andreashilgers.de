import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn } from "@/components/animated-text";
import { Navbar } from "@/components/navbar";
import { RiArrowLeftLine, RiMailLine } from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";

export default async function NotFound({ params }: { params?: Promise<{ lang: string }> }) {
  // Defensive check for params as it can be undefined in some cases in Next.js 16
  const resolvedParams = params ? await params : { lang: 'en' };
  const lang = (resolvedParams?.lang || 'en') as "de" | "en";
  const dict = await getDictionary(lang) as unknown as Dictionary;
  const errorDict = dict.error?.["404"] || {
    title: lang === "de" ? "Seite nicht gefunden" : "Page Not Found",
    description: lang === "de" ? "Hoppla! Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben." : "Oops! The page you're looking for doesn't exist or has been moved.",
    back_home: lang === "de" ? "Zurück zur Startseite" : "Back to Home",
    contact: lang === "de" ? "Kontakt aufnehmen" : "Get In Touch"
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <Navbar dict={dict} lang={lang} />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn direction="down" delay={0.2}>
            <div className="relative inline-block mb-8">
              <span className="text-9xl font-black hero-gradient opacity-20">404</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)]">
                  {errorDict.title}
                </h1>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="down" delay={0.4}>
            <p className="text-xl text-[var(--secondary)] mb-12 max-w-lg mx-auto leading-relaxed text-sm">
              {errorDict.description}
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.6}>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href={`/${lang}`}
                className="btn-primary px-8 py-3 flex items-center gap-2 group text-sm"
              >
                <RiArrowLeftLine size={18} className="group-hover:-translate-x-1 transition-transform" />
                {errorDict.back_home}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="btn-outline px-8 py-3 flex items-center gap-2 text-sm"
              >
                <RiMailLine size={18} />
                {errorDict.contact}
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
