"use client";

import Link from "next/link";
import { FadeIn, HoverCard, StaggerItem } from "@/components/animated-text";
import { ProjectDetailModal } from "@/components/project-detail-modal";
import { ProjectMemoryCard } from "@/components/project-memory-card";
import { RiExternalLinkLine, RiArrowRightLine, RiGithubFill, RiStackLine } from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";

interface ProjectsGridProps {
  dict: Dictionary;
  lang: string;
}

export function ProjectsGrid({ dict, lang }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {dict.projects.items.map((project, index) => (
        <StaggerItem key={project.id} index={index + 2} className="h-full">
          <ProjectMemoryCard project={project}>
            <ProjectDetailModal project={project}>
              <HoverCard className="h-full cursor-pointer group/card">
                <div className="card h-full flex flex-col p-4 sm:p-8 rounded-md group border-transparent hover:border-[var(--primary)]/20 transition-all active:scale-[0.98]">
                  {/* Link icons row */}
                  <div className="flex items-center justify-end gap-3 text-[var(--secondary)] mb-3 sm:mb-6">
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
                    <div className="flex items-stretch gap-2 sm:gap-4 mb-2 sm:mb-3">
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--primary)]/70 mb-2">
                          {project.category}
                        </div>
                        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      {project.logo && (
                        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-md border border-[var(--border)] bg-white/70 backdrop-blur-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-500 group-hover/card:scale-110"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[var(--foreground)]/70 mb-3 sm:mb-6 leading-relaxed text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto gap-2">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 2).map((tech: string) => (
                        <span key={tech} className="text-[9px] sm:text-xs font-mono text-[var(--secondary)]">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 2 && (
                        <span className="text-[9px] sm:text-xs font-mono text-[var(--secondary)]/50">
                          +{project.tech.length - 2}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-[var(--primary)]/50 group-hover:text-[var(--primary)] transition-colors flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                      Details <RiArrowRightLine size={8} className="sm:w-[10px] transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </HoverCard>
            </ProjectDetailModal>
          </ProjectMemoryCard>
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
              <span className="btn-primary w-full py-3 rounded-md font-bold flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
                {lang === "de" ? "Fähigkeiten ansehen" : "View Skills"} <RiArrowRightLine size={16} />
              </span>
            </div>
          </Link>
        </FadeIn>
      </StaggerItem>
    </div>
  );
}
