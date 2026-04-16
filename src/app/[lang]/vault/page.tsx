"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";
import { FadeIn, StaggerItem } from "@/components/animated-text";
import { 
  RiLockPasswordLine, 
  RiShieldCheckLine, 
  RiDownloadLine,
  RiEyeLine,
  RiInformationLine,
  RiArrowLeftLine,
  RiTaskLine,
  RiGraduationCapLine,
  RiAwardLine,
  RiMapPinLine,
  RiBankLine,
  RiFileUserLine,
  RiCloseLine
} from "react-icons/ri";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Dictionary } from "@/lib/dictionary";

export default function VaultPage() {
  const params = useParams();
  const lang = (params.lang as "de" | "en") || "de";
  const [dict, setDict] = React.useState<Dictionary | null>(null);
  const [accessCode, setAccessCode] = React.useState("");
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [previewFile, setPreviewFile] = React.useState<{ url: string; title: string } | null>(null);

  React.useEffect(() => {
    async function loadDict() {
      const d = await getDictionary(lang) as unknown as Dictionary;
      setDict(d);
      setIsLoading(false);
    }
    loadDict();
  }, [lang]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === "2026") {
      setIsUnlocked(true);
      setError(false);
      sessionStorage.setItem("vault_unlocked", "true");
    } else {
      setError(true);
      setAccessCode("");
    }
  };

  React.useEffect(() => {
    const wasUnlocked = sessionStorage.getItem("vault_unlocked");
    if (wasUnlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  if (isLoading || !dict) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
    </div>;
  }

  const vaultDict = dict.vault;

  if (!isUnlocked) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <FadeIn direction="down">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--primary)]/10 text-[var(--primary)] rounded-md mb-6">
                <RiLockPasswordLine size={40} />
              </div>
              <h1 className="text-3xl font-bold mb-3 leading-[1.15] pb-1">{vaultDict.title}</h1>
              <p className="text-[var(--secondary)] text-sm">{vaultDict.description}</p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="card p-8 rounded-md border-[var(--primary)]/10 shadow-2xl relative overflow-hidden">
              <form onSubmit={handleUnlock} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">{vaultDict.placeholder}</label>
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="••••"
                    className={`w-full px-5 py-4 bg-[var(--muted)] border ${error ? 'border-red-500' : 'border-[var(--border)]'} rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-center text-2xl tracking-widest`}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {vaultDict.error}
                    </p>
                  )}
                </div>

                <button 
                  type="submit"
                  className="btn-primary w-full py-4 rounded-md flex justify-center text-lg shadow-lg shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {vaultDict.button}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-start gap-3 text-xs text-[var(--secondary)] leading-relaxed">
                <RiInformationLine size={16} className="shrink-0 text-[var(--primary)]" />
                <p>{vaultDict.hint}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4} className="mt-8 text-center">
            <Link href={`/${lang}`} className="text-sm text-[var(--secondary)] hover:text-[var(--primary)] transition-colors flex items-center justify-center gap-2">
              <RiArrowLeftLine /> {vaultDict.back_to_site}
            </Link>
          </FadeIn>
        </div>
      </main>
    );
  }

  const documents = [
    { 
      id: "cv", 
      title: vaultDict.documents.cv.title, 
      location: vaultDict.documents.cv.location,
      provider: vaultDict.documents.cv.provider,
      providerUrl: `/${lang}`,
      degree: vaultDict.documents.cv.degree,
      type: vaultDict.documents.cv.type,
      file: "/documents/cv.pdf",
      size: "124 KB",
      icon: <RiFileUserLine />, 
      color: "bg-slate-500/10 text-slate-500" 
    },
    { 
      id: "ihk", 
      title: vaultDict.documents.ihk.title, 
      location: vaultDict.documents.ihk.location,
      provider: vaultDict.documents.ihk.provider,
      providerUrl: "https://www.ihk.de/aachen/",
      degree: vaultDict.documents.ihk.degree,
      type: vaultDict.documents.ihk.type,
      file: "/documents/ihk-certificate.pdf",
      size: "15.3 MB",
      icon: <RiGraduationCapLine />, 
      color: "bg-blue-500/10 text-blue-500" 
    },
    { 
      id: "msm", 
      title: vaultDict.documents.msm.title, 
      location: vaultDict.documents.msm.location,
      provider: vaultDict.documents.msm.provider,
      providerUrl: "https://www.msm.nl/",
      degree: vaultDict.documents.msm.degree,
      type: vaultDict.documents.msm.type,
      file: "/documents/msm-project-management.pdf",
      size: "313 KB",
      icon: <RiTaskLine />, 
      color: "bg-emerald-500/10 text-emerald-500" 
    },
    { 
      id: "scrum", 
      title: vaultDict.documents.scrum.title, 
      location: vaultDict.documents.scrum.location,
      provider: vaultDict.documents.scrum.provider,
      providerUrl: "https://www.scrumalliance.org/",
      degree: vaultDict.documents.scrum.degree,
      type: vaultDict.documents.scrum.type,
      file: "/documents/scrum-developer-certificate.pdf",
      size: "338 KB",
      icon: <RiAwardLine />, 
      color: "bg-purple-500/10 text-purple-500" 
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <FadeIn direction="down">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-500/10 text-emerald-500 text-xs font-bold mb-4 uppercase tracking-wider">
              <RiShieldCheckLine size={14} /> {vaultDict.unlocked_title}
            </div>
            <h1 className="text-4xl md:text-6xl font-black hero-gradient inline-block leading-[1.15] pb-2">
              {vaultDict.title}
            </h1>
          </div>
        </FadeIn>
      </div>

      <div className="flex flex-col gap-6">
        {documents.map((doc, index) => (
          <StaggerItem key={doc.id} index={index}>
            <div className="card group p-6 rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-md flex items-center justify-center text-4xl shrink-0 ${doc.color}`}>
                    {doc.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[var(--foreground)]">{doc.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--secondary)]">
                      <a 
                        href={doc.providerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors"
                      >
                        <RiBankLine size={14} className="text-[var(--primary)]" />
                        <span className="underline decoration-[var(--primary)]/30 underline-offset-4">{doc.provider}</span>
                      </a>
                      <div className="flex items-center gap-1.5">
                        <RiMapPinLine size={14} className="text-[var(--primary)]" />
                        {doc.location}
                      </div>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 rounded-sm bg-[var(--primary)]/5 text-[var(--primary)] text-xs font-semibold border border-[var(--primary)]/10">
                        {doc.degree}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-sm bg-[var(--accent)]/5 text-[var(--accent)] text-xs font-semibold border border-[var(--accent)]/10">
                        {doc.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-22 lg:ml-0">
                  <button
                    onClick={() => setPreviewFile({ url: doc.file, title: doc.title })}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-md bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    <RiEyeLine size={18} />
                    <span>Vorschau</span>
                  </button>
                  <a 
                    href={doc.file} 
                    download 
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-md bg-[var(--muted)] text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    <RiDownloadLine size={18} />
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </div>

      <FadeIn direction="up" delay={0.6} className="mt-20">
        <div className="p-8 glass rounded-md border border-[var(--primary)]/10 text-center">
          <p className="text-[var(--secondary)] mb-6 text-sm">
            Diese Dokumente sind vertraulich. Bitte behandeln Sie diese mit Diskretion.
          </p>
          <Link href={`/${lang}/contact`} className="btn-outline px-8 py-3 rounded-md text-sm">
            Fragen zu den Dokumenten?
          </Link>
        </div>
      </FadeIn>

      {/* Preview Dialog */}
      <Dialog.Root open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] max-w-6xl bg-[var(--card)] rounded-md shadow-2xl z-[101] flex flex-col overflow-hidden border border-[var(--border)] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <Dialog.Title className="text-xl font-bold hero-gradient">
                {previewFile?.title}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors text-[var(--secondary)]">
                  <RiCloseLine size={24} />
                </button>
              </Dialog.Close>
            </div>
            
            <div className="flex-grow bg-[#525659]">
              {previewFile && (
                <iframe
                  src={`${previewFile.url}#toolbar=0`}
                  className="w-full h-full border-none"
                  title={previewFile.title}
                />
              )}
            </div>

            <div className="p-4 bg-[var(--card)] border-t border-[var(--border)] flex justify-center sm:justify-end gap-4">
               <a 
                  href={previewFile?.url} 
                  download 
                  className="btn-primary px-6 py-2 text-sm rounded-sm"
                >
                  <RiDownloadLine size={18} /> Download PDF
                </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
