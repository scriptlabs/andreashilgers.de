import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, StaggerItem } from "@/components/animated-text";
import { 
  RiCodeSSlashLine, 
  RiTerminalLine, 
  RiCloudLine, 
  RiSettings4Line 
} from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";

export default async function SkillsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'leadership & strategy':
      case 'führung & strategie': return <RiSettings4Line size={24} />;
      case 'architecture & cloud':
      case 'architektur & cloud': return <RiCloudLine size={24} />;
      case 'development & ai':
      case 'entwicklung & ki': return <RiCodeSSlashLine size={24} />;
      default: return <RiTerminalLine size={24} />;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <FadeIn direction="down">
        <h1 className="text-4xl md:text-6xl font-black mb-4 hero-gradient inline-block leading-[1.15] pb-2">
          {dict.skills.title}
        </h1>
        <p className="text-xl text-[var(--secondary)] mb-16">
          {dict.skills.subtitle}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dict.skills.categories.map((category, catIndex) => (
          <FadeIn key={category.name} delay={catIndex * 0.1} className="h-full">
            <div className="card h-full p-8 rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[var(--primary)]/10 text-[var(--primary)] rounded-sm">
                  {getIcon(category.name)}
                </div>
                <h2 className="text-2xl font-bold">{category.name}</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.items.map((item, itemIndex) => (
                  <StaggerItem key={item} index={itemIndex} className="px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-sm text-sm font-medium text-[var(--secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all cursor-default">
                    {item}
                  </StaggerItem>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn direction="up" delay={0.5} className="mt-20">
        <div className="p-10 glass rounded-md border border-[var(--primary)]/10 text-center">
          <h2 className="text-2xl font-bold mb-4">{dict.skills.description}</h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto rounded-full opacity-30" />
        </div>
      </FadeIn>
    </main>
  );
}
