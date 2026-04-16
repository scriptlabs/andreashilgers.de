import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, StaggerItem } from "@/components/animated-text";
import { 
  RiBriefcase4Line, 
  RiGraduationCapLine, 
  RiAwardLine,
  RiCalendarLine
} from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";

export default async function ExperiencePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  const getIcon = (type: string) => {
    switch (type) {
      case 'edu': return <RiGraduationCapLine size={18} />;
      case 'cert': return <RiAwardLine size={18} />;
      default: return <RiBriefcase4Line size={18} />;
    }
  };

  const getTypeLabel = (type: string, currentLang: string) => {
    switch (type) {
      case 'edu': return currentLang === 'de' ? 'Ausbildung' : 'Education';
      case 'cert': return currentLang === 'de' ? 'Zertifizierung' : 'Certification';
      default: return currentLang === 'de' ? 'Berufserfahrung' : 'Work Experience';
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'edu': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'cert': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20';
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <FadeIn direction="down">
        <h1 className="text-4xl md:text-6xl font-black mb-4 hero-gradient inline-block">
          {dict.experience.title}
        </h1>
        <p className="text-xl text-[var(--secondary)] mb-16">
          {dict.experience.subtitle}
        </p>
      </FadeIn>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--primary)]/20 before:to-transparent">
        {dict.experience.items.map((item, index) => (
          <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Dot/Icon */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border bg-[var(--card)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${getTypeStyles(item.type)}`}>
              {getIcon(item.type)}
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 card rounded-md shadow-xl transition-all hover:border-[var(--primary)]/30">
              <StaggerItem index={index}>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[var(--foreground)] leading-tight">
                    {item.position.includes('\n') ? (
                      <>
                        <span className="block">{item.position.split('\n')[0]}</span>
                        <span className="block text-lg font-medium text-[var(--secondary)] mt-1">{item.position.split('\n')[1]}</span>
                      </>
                    ) : (
                      item.position
                    )}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--secondary)] mt-2 opacity-80 uppercase tracking-wider">
                    <RiCalendarLine className="text-[var(--primary)]" />
                    {item.period}
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-sm font-medium text-[var(--primary)]">
                    {item.company}
                  </div>
                  <div className={`text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-sm border ${getTypeStyles(item.type)}`}>
                    {getTypeLabel(item.type, lang)}
                  </div>
                </div>

                <p className="text-[var(--foreground)]/70 mb-6 leading-relaxed text-sm">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech: string) => (
                    <span key={tech} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm bg-[var(--muted)] border border-[var(--border)] text-[var(--secondary)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
