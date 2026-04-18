import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, StaggerItem } from "@/components/animated-text";
import { 
  RiChat3Line, 
  RiGithubFill, 
  RiLinkedinBoxFill, 
  RiContactsLine,
  RiExternalLinkLine,
  RiLockPasswordLine,
  RiShieldCheckLine
} from "react-icons/ri";
import Link from "next/link";
import { Metadata } from "next";
import { Dictionary } from "@/lib/dictionary";
import { ContactForm } from "@/components/contact-form";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;
  return { title: dict.metadata.titles.contact };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  const socialLinks = [
    {
      name: "LinkedIn",
      handle: "andreashilgers",
      url: "https://linkedin.com/in/andreashilgers",
      icon: <RiLinkedinBoxFill size={28} />,
      color: "text-[#0a66c2]",
      bg: "bg-[#0a66c2]/5"
    },
    {
      name: "GitHub",
      handle: "scriptlabs",
      url: "https://github.com/scriptlabs",
      icon: <RiGithubFill size={28} />,
      color: "text-[var(--foreground)]",
      bg: "bg-[var(--foreground)]/5"
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-16">
        <StaggerItem index={0}>
          <div className="flex flex-col items-start gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
              <RiContactsLine size={14} /> {lang === 'de' ? 'Kontakt' : 'Contact'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
              {dict.contact.title}
            </h1>
          </div>
        </StaggerItem>
        <StaggerItem index={1}>
          <p className="text-xl text-[var(--secondary)] max-w-2xl">
            {dict.contact.subtitle}
          </p>
        </StaggerItem>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Social Cards Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-6">
            <StaggerItem index={2}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <RiChat3Line size={24} className="text-[var(--primary)]" />
                {lang === 'de' ? 'Soziale Netzwerke' : 'Social Channels'}
              </h2>
            </StaggerItem>
            
            <StaggerItem index={3}>
              <p className="text-[var(--foreground)]/70 text-lg leading-relaxed mb-8">
                {dict.contact.description}
              </p>
            </StaggerItem>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {socialLinks.map((social, index) => (
              <StaggerItem key={social.name} index={index + 4}>
                <a 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-6 card rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-sm ${social.bg} ${social.color} flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3`}>
                      {social.icon}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold mb-0.5">{social.name}</p>
                      <p className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{social.handle}</p>
                    </div>
                  </div>
                  <RiExternalLinkLine size={20} className="text-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                </a>
              </StaggerItem>
            ))}
          </div>

          <div className="pt-8">
            <StaggerItem index={7}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <RiShieldCheckLine size={24} className="text-[var(--primary)]" />
                {dict.contact.documents_title}
              </h2>
              <p className="text-[var(--foreground)]/70 text-lg leading-relaxed mb-8">
                {dict.contact.documents_description}
              </p>
            </StaggerItem>
            
            <StaggerItem index={8}>
              <Link 
                href={`/${lang}/vault`}
                className="group flex items-center justify-between p-6 card rounded-md border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-500/[0.02] hover:bg-emerald-500/[0.05] transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center transition-all group-hover:scale-110 group-hover:-rotate-3">
                    <RiLockPasswordLine size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-black mb-0.5">{dict.contact.vault_card_subtitle}</p>
                    <p className="font-bold text-[var(--foreground)] group-hover:text-emerald-500 transition-colors">{dict.contact.vault_card_title}</p>
                  </div>
                </div>
                <RiExternalLinkLine size={20} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
              </Link>
            </StaggerItem>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <FadeIn direction="up" delay={0.4} className="h-full">
            <div className="card p-8 md:p-10 rounded-md border-transparent shadow-2xl relative overflow-hidden h-full group/form flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-1000 group-hover/form:scale-150" />
              
              <div className="relative z-10 mb-8">
                <StaggerItem index={4}>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <RiChat3Line size={24} className="text-[var(--primary)]" />
                    {dict.contact.form.title}
                  </h2>
                </StaggerItem>
                <StaggerItem index={5}>
                  <p className="text-[var(--foreground)]/70 text-sm leading-relaxed">
                    {dict.contact.form.subtitle}
                  </p>
                </StaggerItem>
              </div>

              <div className="relative z-10 flex-grow flex flex-col">
                <ContactForm labels={dict.contact.form} />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
