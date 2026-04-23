import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn } from "@/components/animated-text";
import { RiShieldLine, RiMailLine, RiMapPinLine, RiCopyrightLine, RiAlertLine, RiArrowRightLine } from "react-icons/ri";
import Link from "next/link";
import { Dictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;
  return { title: dict.metadata.titles.imprint };
}

export default async function ImprintPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      {/* ── Header ── */}
      <FadeIn direction="down">
        <div className="flex flex-col items-start gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
            <RiShieldLine size={14} /> {dict.imprint.title}
          </div>
          <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
            {dict.imprint.title}
          </h1>
        </div>
        <p className="text-xl text-[var(--secondary)] mb-16 leading-relaxed">
          {dict.imprint.subtitle}
        </p>
      </FadeIn>

      <div className="space-y-16">
        {/* Operator Information */}
        <FadeIn direction="up">
          <section className="p-8 rounded-2xl bg-[var(--muted)]/50 border border-[var(--border)]">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-8 flex items-center gap-2">
              <RiShieldLine size={14} /> {dict.imprint.operator_title}
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 text-[var(--secondary)] mt-0.5">
                  <RiMapPinLine size={20} />
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--foreground)]">{dict.imprint.operator_name}</p>
                  <p className="text-[var(--secondary)] whitespace-pre-line leading-relaxed">
                    {dict.imprint.operator_address}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Contact Information */}
        <FadeIn direction="up" delay={0.1}>
          <section className="p-8 rounded-2xl bg-[var(--muted)]/50 border border-[var(--border)]">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-8 flex items-center gap-2">
              <RiMailLine size={14} /> {dict.imprint.contact_title}
            </h2>
            <div className="space-y-6">
              <p className="text-[var(--secondary)] leading-relaxed text-lg">
                {dict.imprint.contact_description}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 text-[var(--primary)] font-bold hover:underline transition-all"
              >
                {dict.imprint.contact_form_link} <RiArrowRightLine />
              </Link>
            </div>
          </section>
        </FadeIn>

        {/* Disclaimer */}
        <FadeIn direction="up" delay={0.2}>
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[var(--foreground)] flex items-center gap-3 tracking-tight">
              <RiAlertLine size={24} className="text-[var(--primary)]" />
              {dict.imprint.disclaimer_title}
            </h2>
            <p className="text-[var(--secondary)] leading-relaxed text-lg">
              {dict.imprint.disclaimer_content}
            </p>
          </section>
        </FadeIn>

        {/* Copyright */}
        <FadeIn direction="up" delay={0.3}>
          <section className="space-y-6 pt-12 border-t border-[var(--border)]">
            <h2 className="text-2xl font-black text-[var(--foreground)] flex items-center gap-3 tracking-tight">
              <RiCopyrightLine size={24} className="text-[var(--primary)]" />
              {dict.imprint.copyright_title}
            </h2>
            <p className="text-[var(--secondary)] leading-relaxed text-lg">
              {dict.imprint.copyright_content}
            </p>
          </section>
        </FadeIn>
      </div>
    </main>
  );
}
