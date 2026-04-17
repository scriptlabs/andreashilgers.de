import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, HoverCard, StaggerItem } from "@/components/animated-text";
import { ProjectDetailModal } from "@/components/project-detail-modal";
import { RiExternalLinkLine, RiCodeView, RiArrowRightLine, RiGithubFill, RiStackLine } from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;
  return { title: dict.metadata.titles.projects };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-16">
        <StaggerItem index={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
            <div className="flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
                <RiCodeView size={14} /> Portfolio
              </div>
              <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
                {dict.projects.title}
              </h1>
            </div>

            <a
              href="https://github.com/scriptlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-6 py-2.5 rounded-md flex items-center gap-3 text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <RiGithubFill size={20} />
              <span>GitHub Profile</span>
            </a>
          </div>
        </StaggerItem>
        
        <StaggerItem index={1}>
          <p className="text-xl text-[var(--secondary)] max-w-2xl">
            {dict.projects.description}
          </p>
        </StaggerItem>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dict.projects.items.map((project, index) => (
          <StaggerItem key={project.id} index={index + 2}>
            <ProjectDetailModal project={project}>
              <HoverCard className="h-full cursor-pointer group/card">
                <div className="card h-full flex flex-col p-8 rounded-md group border-transparent hover:border-[var(--primary)]/20 transition-all active:scale-[0.98]">
                  {/* Link icons row */}
                  <div className="flex items-center justify-end gap-3 text-[var(--secondary)] mb-6">
                    {project.githubLink && project.githubLink !== "#" && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-[var(--primary)] transition-colors p-1"
                      >
                        <RiGithubFill size={18} />
                      </a>
                    )}
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-[var(--primary)] transition-colors p-1"
                      >
                        <RiExternalLinkLine size={18} />
                      </a>
                    )}
                  </div>

                  <div className="flex-grow">
                    {/* Category + title (left) alongside logo (right, full height) */}
                    <div className="flex items-stretch gap-4 mb-3">
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--primary)]/70 mb-2">
                          {project.category}
                        </div>
                        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      {project.logo && (
                        <div className="shrink-0 w-12 flex items-center justify-end overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={project.logo} 
                            alt={`${project.title} logo`} 
                            className="max-w-full max-h-full object-contain object-right transition-transform duration-500 group-hover/card:scale-110" 
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[var(--foreground)]/70 mb-6 leading-relaxed text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="text-xs font-mono text-[var(--secondary)]">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs font-mono text-[var(--secondary)]/50">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--primary)]/50 group-hover:text-[var(--primary)] transition-colors flex items-center gap-1">
                      Details <RiArrowRightLine size={10} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </HoverCard>
            </ProjectDetailModal>
          </StaggerItem>
        ))}

        {/* CTA card — Skills */}
        <StaggerItem index={dict.projects.items.length + 2} className="h-full">
          <FadeIn direction="up" delay={(dict.projects.items.length + 2) * 0.1} className="h-full">
            <Link href={`/${lang}/skills`} className="block h-full group/cta">
              <div className="card h-full flex flex-col items-center justify-center p-8 rounded-md border border-dashed border-[var(--primary)]/30 hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/5 transition-all group text-center min-h-[220px] active:scale-[0.98]">
                <div className="p-3 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] mb-4 transition-transform group-hover/cta:scale-110 group-hover/cta:rotate-3">
                  <RiStackLine size={24} />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mb-2">
                  {lang === "de" ? "Alle Fähigkeiten & Technologien" : "All Skills & Technologies"}
                </h3>
                <p className="text-sm text-[var(--secondary)] mb-5 leading-relaxed">
                  {lang === "de"
                    ? "Entdecke den vollständigen Tech-Stack über alle Domänen hinweg."
                    : "Explore the full tech stack across all domains."}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--primary)] group-hover:gap-3 transition-all">
                  {lang === "de" ? "Fähigkeiten ansehen" : "View Skills"} <RiArrowRightLine size={14} />
                </span>
              </div>
            </Link>
          </FadeIn>
        </StaggerItem>
      </div>
    </main>
  );
}
