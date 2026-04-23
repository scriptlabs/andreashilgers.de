import { getDictionary } from "@/lib/get-dictionary";
import { StaggerItem } from "@/components/animated-text";
import { ProjectsGrid } from "@/components/projects-grid";
import { RiCodeView, RiGithubFill } from "react-icons/ri";
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

      <ProjectsGrid dict={dict} lang={lang} />
    </main>
  );
}
