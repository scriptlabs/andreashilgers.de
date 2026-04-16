import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, HoverCard } from "@/components/animated-text";
import { RiExternalLinkLine, RiFolderLine } from "react-icons/ri";
import { RiGithubFill } from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <FadeIn direction="down">
        <h1 className="text-4xl md:text-6xl font-black mb-4 hero-gradient inline-block">
          {dict.projects.title}
        </h1>
        <p className="text-xl text-[var(--secondary)] mb-16 max-w-2xl">
          {dict.projects.description}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dict.projects.items.map((project) => (
          <HoverCard key={project.id} className="h-full">
            <div className="card h-full flex flex-col p-8 rounded-md group border-transparent hover:border-[var(--primary)]/20">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-[var(--primary)]/10 text-[var(--primary)] rounded-sm">
                  <RiFolderLine size={24} />
                </div>
                <div className="flex gap-4 text-[var(--secondary)]">
                  <a href={project.link} className="hover:text-[var(--primary)] transition-colors">
                    <RiGithubFill size={20} />
                  </a>
                  <a href={project.link} className="hover:text-[var(--primary)] transition-colors">
                    <RiExternalLinkLine size={20} />
                  </a>
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--foreground)]/70 mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tech.map((tech: string) => (
                  <span key={tech} className="text-xs font-mono text-[var(--secondary)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </HoverCard>
        ))}
      </div>
    </main>
  );
}
