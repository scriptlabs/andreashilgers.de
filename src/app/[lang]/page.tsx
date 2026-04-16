import Link from "next/link";
import { 
  RiBriefcase4Line, 
  RiCodeSSlashLine, 
  RiMailLine, 
  RiGithubFill, 
  RiLinkedinBoxFill 
} from "react-icons/ri";
import { FadeIn, TypingText } from "@/components/animated-text";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === "en";

  const enDict = {
    nav: { home: "Home", about: "About", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact", vault: "Vault" },
    hero: {
      greeting: "Hi there,",
      name: "Andreas Hilgers",
      role: "Senior Full-Stack Developer & Architect",
      description: "I design and build scalable, high-performance web applications with a focus on exceptional user experience, accessibility, and modern architecture.",
      subdescription: "Passionate about transforming complex problems into elegant, maintainable solutions.",
      cta_primary: "View My Work",
      cta_secondary: "Get In Touch",
      typing_texts: ["Full-Stack Developer", "Next.js Expert", "TypeScript Enthusiast", "UI/UX Architect", "Cloud Specialist"]
    },
    about: { subtitle: "Who I am and what I do" },
    experience: { subtitle: "My journey through the tech industry" },
    projects: { subtitle: "My work and achievements" },
    skills: { subtitle: "My technical expertise" },
    contact: { subtitle: "Get in touch with me" }
  };
  const deDict = {
    nav: { home: "Start", about: "Über mich", experience: "Erfahrung", projects: "Projekte", skills: "Fähigkeiten", contact: "Kontakt", vault: "Tresor" },
    hero: {
      greeting: "Hallo,",
      name: "Andreas Hilgers",
      role: "Senior Full-Stack Entwickler & Architekt",
      description: "Ich entwerfe und entwickelte skalierbare, hochperformante Webanwendungen mit Fokus auf herausragende Benutzererfahrung, Barrierefreiheit und moderne Architektur.",
      subdescription: "Leidenschaftlich dabei, komplexe Probleme in elegante, wartbare Lösungen zu verwandeln.",
      cta_primary: "Meine Arbeit",
      cta_secondary: "Kontakt aufnehmen",
      typing_texts: ["Full-Stack Entwickler", "Next.js Experte", "TypeScript Enthusiast", "UI/UX Architekt", "Cloud Spezialist"]
    },
    about: { subtitle: "Wer ich bin und was ich mache" },
    experience: { subtitle: "Mein Weg durch die Tech-Branche" },
    projects: { subtitle: "Meine Arbeiten und Erfolge" },
    skills: { subtitle: "Meine technischen Fähigkeiten" },
    contact: { subtitle: "Kontaktieren Sie mich" }
  };
  const dict = isEn ? enDict : deDict;

  return (
    <main className="h-[calc(100vh-64px)] overflow-hidden">
      {/* Hero Section */}
      <section className="h-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--primary)]/5 to-[var(--background)] -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn direction="down" delay={0.2}>
            <p className="text-[var(--primary)] font-mono font-medium text-lg mb-6">
              {dict.hero.greeting}
            </p>
          </FadeIn>
          
          <FadeIn direction="down" delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.15] pb-2">
              <span className="hero-gradient">Andreas Hilgers</span>
            </h1>
          </FadeIn>
          
          <FadeIn direction="down" delay={0.6}>
            <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
              {dict.hero.role}
            </div>
          </FadeIn>
          
          <FadeIn direction="down" delay={0.8}>
            <TypingText
              texts={dict.hero.typing_texts}
              speed={80}
              pauseDuration={2500}
              deleteSpeed={40}
              className="text-xl md:text-2xl font-medium text-[var(--primary)] mb-8"
            />
          </FadeIn>
          
          <FadeIn direction="down" delay={1}>
            <p className="text-lg md:text-xl text-[var(--secondary)]/80 leading-relaxed max-w-2xl mx-auto mb-10">
              {dict.hero.description}
            </p>
          </FadeIn>
          
          {/* CTA Buttons */}
          <FadeIn direction="up" delay={1.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href={`/${lang}/about`} className="btn-primary px-8 py-3 text-lg rounded-md font-bold">
                <span>{dict.nav.about}</span>
              </Link>
              <Link href={`/${lang}/projects`} className="btn-outline px-8 py-3 text-lg rounded-md font-bold">
                <RiBriefcase4Line size={20} /> {dict.nav.projects}
              </Link>
            </div>
          </FadeIn>
          
          {/* Social Links */}
          <FadeIn direction="up" delay={1.4}>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/scriptlabs" target="_blank" rel="noopener noreferrer" className="p-3 border border-[var(--border)] rounded-sm hover:border-[var(--primary)] hover:scale-110 transition-all group">
                <RiGithubFill size={24} className="text-[var(--secondary)] group-hover:text-[var(--primary)]" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/andreashilgers" target="_blank" rel="noopener noreferrer" className="p-3 border border-[var(--border)] rounded-sm hover:border-[var(--primary)] hover:scale-110 transition-all group">
                <RiLinkedinBoxFill size={24} className="text-[var(--secondary)] group-hover:text-[var(--primary)]" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <Link href={`/${lang}/contact`} className="p-3 border border-[var(--border)] rounded-sm hover:border-[var(--primary)] hover:scale-110 transition-all group">
                <RiMailLine size={24} className="text-[var(--secondary)] group-hover:text-[var(--primary)]" />
                <span className="sr-only">Contact</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
