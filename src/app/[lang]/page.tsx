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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--primary)]/5 to-[var(--background)] -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn direction="down" delay={0.2}>
            <p className="text-[var(--primary)] font-mono font-medium text-lg mb-6">
              {dict.hero.greeting}
            </p>
          </FadeIn>
          
          <FadeIn direction="down" delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
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
              <Link href={`/${lang}/about`} className="btn-primary px-8 py-3 text-lg rounded-md">
                <span>{dict.nav.about}</span>
              </Link>
              <Link href={`/${lang}/projects`} className="btn-outline px-8 py-3 text-lg rounded-md">
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
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="p-3 border border-[var(--border)] rounded-sm hover:border-[var(--primary)] hover:scale-110 transition-all group">
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
        
        {/* Scroll Down Indicator */}
        <FadeIn direction="down" delay={1.6}>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-[var(--primary)] rounded-sm flex justify-center">
              <div className="w-1 h-3 bg-[var(--primary)] rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Preview Cards */}
      <section className="py-24 bg-[var(--muted)]/30 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn direction="down" delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[var(--foreground)]">
              {dict.hero.subdescription}
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FadeIn direction="up" delay={0.4} className="h-full">
              <Link
                href={`/${lang}/about`}
                className="card group p-8 text-left h-full flex flex-col hover:scale-102 transition-transform rounded-md"
              >
                <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <svg className="w-7 h-7 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">{dict.nav.about}</h3>
                <p className="text-[var(--secondary)] text-base mb-6 flex-grow">{dict.about.subtitle}</p>
                <span className="text-[var(--primary)] font-medium flex items-center gap-2">
                  Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.5} className="h-full">
              <Link
                href={`/${lang}/experience`}
                className="card group p-8 text-left h-full flex flex-col hover:scale-102 transition-transform rounded-md"
              >
                <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <RiBriefcase4Line size={28} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">{dict.nav.experience}</h3>
                <p className="text-[var(--secondary)] text-base mb-6 flex-grow">{dict.experience.subtitle}</p>
                <span className="text-[var(--primary)] font-medium flex items-center gap-2">
                  View timeline <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.6} className="h-full">
              <Link
                href={`/${lang}/projects`}
                className="card group p-8 text-left h-full flex flex-col hover:scale-102 transition-transform rounded-md"
              >
                <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <RiCodeSSlashLine size={28} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">{dict.nav.projects}</h3>
                <p className="text-[var(--secondary)] text-base mb-6 flex-grow">{dict.projects.subtitle}</p>
                <span className="text-[var(--primary)] font-medium flex items-center gap-2">
                  See my work <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.7} className="h-full">
              <Link
                href={`/${lang}/skills`}
                className="card group p-8 text-left h-full flex flex-col hover:scale-102 transition-transform rounded-md"
              >
                <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-[var(--accent)]/20 transition-colors">
                  <svg className="w-7 h-7 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">{dict.nav.skills}</h3>
                <p className="text-[var(--secondary)] text-base mb-6 flex-grow">{dict.skills.subtitle}</p>
                <span className="text-[var(--primary)] font-medium flex items-center gap-2">
                  My expertise <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.8} className="h-full md:col-span-2 lg:col-span-1">
              <Link
                href={`/${lang}/contact`}
                className="card group p-8 text-left h-full flex flex-col hover:scale-102 transition-transform rounded-md"
              >
                <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <RiMailLine size={28} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">{dict.nav.contact}</h3>
                <p className="text-[var(--secondary)] text-base mb-6 flex-grow">{dict.contact.subtitle}</p>
                <span className="text-[var(--primary)] font-medium flex items-center gap-2">
                  Get in touch <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
