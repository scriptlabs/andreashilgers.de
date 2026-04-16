import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn } from "@/components/animated-text";
import { 
  RiMailLine, 
  RiChat3Line, 
  RiSendPlaneLine, 
  RiGithubFill, 
  RiLinkedinBoxFill, 
  RiTwitterXFill 
} from "react-icons/ri";
import { Dictionary } from "@/lib/dictionary";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <FadeIn direction="down">
        <h1 className="text-4xl md:text-6xl font-black mb-4 hero-gradient inline-block leading-[1.15] pb-2">
          {dict.contact.title}
        </h1>
        <p className="text-xl text-[var(--secondary)] mb-16 max-w-2xl">
          {dict.contact.subtitle}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <FadeIn direction="right" delay={0.2}>
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">{dict.contact.info_title}</h2>
              <p className="text-[var(--foreground)]/70 text-lg leading-relaxed mb-8">
                {dict.contact.description}
              </p>
            </div>

            <div className="space-y-6">
              <a href="mailto:andreas_hilgers@icloud.com" className="flex items-center gap-4 p-6 card rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all group">
                <div className="p-4 bg-[var(--primary)]/10 text-[var(--primary)] rounded-sm group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                  <RiMailLine size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--secondary)] mb-1 font-bold">Email</p>
                  <p className="text-lg font-medium">andreas_hilgers@icloud.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-6 card rounded-md border-transparent">
                <div className="p-4 bg-[var(--accent)]/10 text-[var(--accent)] rounded-sm">
                  <RiChat3Line size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--secondary)] mb-1 font-bold">Social Media</p>
                  <div className="flex gap-4 mt-2">
                    <a href="https://github.com/scriptlabs" target="_blank" rel="noopener noreferrer" className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"><RiGithubFill size={24} /></a>
                    <a href="https://linkedin.com/in/andreashilgers" target="_blank" rel="noopener noreferrer" className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"><RiLinkedinBoxFill size={24} /></a>
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"><RiTwitterXFill size={24} /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Contact Form */}
        <FadeIn direction="left" delay={0.4}>
          <div className="card p-8 md:p-10 rounded-md border-transparent shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">{dict.contact.form.name}</label>
                  <input 
                    type="text" 
                    placeholder={dict.contact.form.placeholder_name}
                    className="w-full px-5 py-4 bg-[var(--muted)] border border-[var(--border)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">{dict.contact.form.email}</label>
                  <input 
                    type="email" 
                    placeholder={dict.contact.form.placeholder_email}
                    className="w-full px-5 py-4 bg-[var(--muted)] border border-[var(--border)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">{dict.contact.form.subject}</label>
                <input 
                  type="text" 
                  placeholder={dict.contact.form.subject}
                  className="w-full px-5 py-4 bg-[var(--muted)] border border-[var(--border)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">{dict.contact.form.message}</label>
                <textarea 
                  rows={5} 
                  placeholder={dict.contact.form.placeholder_message}
                  className="w-full px-5 py-4 bg-[var(--muted)] border border-[var(--border)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
                />
              </div>

              <button className="btn-primary w-full py-4 rounded-sm flex justify-center text-lg shadow-lg shadow-[var(--primary)]/20 font-bold" type="button">
                <RiSendPlaneLine size={20} className="mr-2" />
                {dict.contact.form.submit}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
