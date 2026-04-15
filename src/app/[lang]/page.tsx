import { getDictionary } from "@/lib/get-dictionary";
import { Github, Linkedin, ExternalLink, Code2, Cpu, Globe } from "lucide-react";
import Link from "next/link";

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const skills = [
    { name: "React / Next.js", level: 95, icon: <Globe size={18} /> },
    { name: "TypeScript", level: 90, icon: <Code2 size={18} /> },
    { name: "Node.js / Bun", level: 85, icon: <Cpu size={18} /> },
    { name: "PostgreSQL / MongoDB", level: 80, icon: <Cpu size={18} /> },
    { name: "Cloud / DevOps", level: 75, icon: <Globe size={18} /> },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A high-performance online store built with Next.js 15, Tailwind CSS, and Stripe integration.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
      code: `export function Cart() {
  const { items } = useCart();
  return (
    <div className="p-4">
      {items.map(item => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  );
}`,
      link: "#",
      github: "#"
    },
    {
      title: "AI SaaS Dashboard",
      description: "A dashboard for managing AI agents with real-time streaming and data visualization.",
      tags: ["React", "OpenAI", "Socket.io", "D3.js"],
      code: `const agent = new AIAgent({
  model: "gpt-4o",
  tools: [search, browser]
});

await agent.run("Analyze the market...");`,
      link: "#",
      github: "#"
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="section-container min-h-[80vh] flex flex-col justify-center items-start">
        <div className="space-y-4 max-w-3xl">
          <p className="text-[var(--primary)] font-mono font-medium">{dict.hero.greeting}</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            {dict.hero.name}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary)]">
            {dict.hero.role}
          </h2>
          <p className="text-xl text-[var(--secondary)] leading-relaxed">
            {dict.hero.description}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="#projects" className="btn-primary">
              {dict.hero.cta_projects}
            </Link>
            <Link href="https://linkedin.com/in/andreashilgers" target="_blank" className="btn-outline">
              <Linkedin size={20} /> LinkedIn
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container bg-[var(--card)] rounded-[3rem] my-12">
        <div className="space-y-2 mb-12">
          <h2 className="text-4xl font-bold">{dict.sections.projects.title}</h2>
          <p className="text-[var(--secondary)]">{dict.sections.projects.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <div key={i} className="flex flex-col space-y-6">
              <div className="card h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div className="flex gap-2">
                    <Link href={project.github} className="p-2 hover:text-[var(--primary)] transition-colors"><Github size={20} /></Link>
                    <Link href={project.link} className="p-2 hover:text-[var(--primary)] transition-colors"><ExternalLink size={20} /></Link>
                  </div>
                </div>
                <p className="text-[var(--secondary)] mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[var(--background)] border rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Code Preview */}
                <div className="mt-auto bg-[#1e1e1e] rounded-lg p-4 font-mono text-sm text-gray-300 overflow-hidden shadow-inner">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <pre className="overflow-x-auto">
                    <code>{project.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">{dict.sections.skills.title}</h2>
            <p className="text-[var(--secondary)]">
              {dict.sections.skills.subtitle}
            </p>
            <div className="space-y-6 pt-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="flex items-center gap-2">{skill.icon} {skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square card flex items-center justify-center p-12 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-20">
             <Cpu size={200} className="text-[var(--foreground)] animate-pulse" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-container border-t text-center text-[var(--secondary)] text-sm">
        <p>© {new Date().getFullYear()} Andreas Hilgers. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="https://github.com" className="hover:text-[var(--primary)] transition-colors">GitHub</Link>
          <Link href="https://linkedin.com/in/andreashilgers" className="hover:text-[var(--primary)] transition-colors">LinkedIn</Link>
          <Link href="mailto:contact@andreashilgers.de" className="hover:text-[var(--primary)] transition-colors">Email</Link>
        </div>
      </footer>
    </main>
  );
}
