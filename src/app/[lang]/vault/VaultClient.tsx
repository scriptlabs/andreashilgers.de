"use client";

import * as React from "react";
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
  RiBankLine,
  RiFileUserLine,
  RiCloseLine,
  RiMailLine,
  RiPhoneLine,
  RiHome4Line,
} from "react-icons/ri";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Dictionary } from "@/lib/dictionary";

// Cache busting version for documents
const DOCS_VERSION = "1.0.1";

interface VaultClientProps {
  dict: Dictionary;
  lang: string;
}

export default function VaultClient({ dict, lang }: VaultClientProps) {
  const [accessCode, setAccessCode] = React.useState("");
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [previewFile, setPreviewFile] = React.useState<{ url: string; title: string } | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === "4242") {
      setIsUnlocked(true);
      setError(false);
      sessionStorage.setItem("vault_unlocked", "true");
    } else {
      setError(true);
      setAccessCode("");
    }
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    setAccessCode("");
    sessionStorage.removeItem("vault_unlocked");
  };

  React.useEffect(() => {
    const wasUnlocked = sessionStorage.getItem("vault_unlocked");
    if (wasUnlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const vaultDict = dict.vault;

  if (!isUnlocked) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <FadeIn direction="down">
            <div className="text-center mb-10">
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

  const documents: Array<{
    id: string;
    title: string;
    provider: string;
    providerUrl: string;
    degree: string;
    type: string;
    file: string;
    wordFile?: string;
    size: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    { 
      id: "cv", 
      title: vaultDict.documents.cv.title, 
      provider: vaultDict.documents.cv.provider,
      providerUrl: `/${lang}`,
      degree: vaultDict.documents.cv.degree,
      type: vaultDict.documents.cv.type,
      file: `/documents/cv.pdf?v=${DOCS_VERSION}`,
      size: "87 KB",
      icon: <RiFileUserLine />, 
      color: "bg-slate-500/10 text-slate-500" 
    },
    { 
      id: "ihk", 
      title: vaultDict.documents.ihk.title, 
      provider: vaultDict.documents.ihk.provider,
      providerUrl: "https://www.ihk.de/aachen/",
      degree: vaultDict.documents.ihk.degree,
      type: vaultDict.documents.ihk.type,
      file: `/documents/ihk-certificate.pdf?v=${DOCS_VERSION}`,
      size: "16 MB",
      icon: <RiGraduationCapLine />, 
      color: "bg-blue-500/10 text-blue-500" 
    },
    { 
      id: "msm", 
      title: vaultDict.documents.msm.title, 
      provider: vaultDict.documents.msm.provider,
      providerUrl: "https://www.msm.nl/",
      degree: vaultDict.documents.msm.degree,
      type: vaultDict.documents.msm.type,
      file: `/documents/msm-project-management.pdf?v=${DOCS_VERSION}`,
      size: "321 KB",
      icon: <RiTaskLine />, 
      color: "bg-emerald-500/10 text-emerald-500" 
    },
    { 
      id: "scrum", 
      title: vaultDict.documents.scrum.title, 
      provider: vaultDict.documents.scrum.provider,
      providerUrl: "https://www.scrumalliance.org/",
      degree: vaultDict.documents.scrum.degree,
      type: vaultDict.documents.scrum.type,
      file: `/documents/scrum-developer-certificate.pdf?v=${DOCS_VERSION}`,
      size: "346 KB",
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

      {/* Contact Info Section */}
      <FadeIn direction="up" delay={0.2} className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
          {/* Address Card */}
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vaultDict.contact_info.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-5 flex items-center gap-3 p-4 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
              <RiHome4Line size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--secondary)] uppercase font-bold tracking-wider mb-0.5 group-hover:text-[var(--primary)] transition-colors">{vaultDict.contact_info.name}</p>
              <p className="text-sm font-medium group-hover:text-[var(--foreground)] transition-colors">{vaultDict.contact_info.address}</p>
            </div>
          </a>
          
          {/* Contact Stack */}
          <div className="md:col-span-5 flex flex-col gap-2">
            <a 
              href={`mailto:${vaultDict.contact_info.email}`}
              className="flex items-center gap-3 p-3 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all group"
            >
              <div className="w-8 h-8 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                <RiMailLine size={16} />
              </div>
              <span className="text-sm font-medium">{vaultDict.contact_info.email}</span>
            </a>
            
            <a 
              href={`tel:${vaultDict.contact_info.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 p-3 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all group"
            >
              <div className="w-8 h-8 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                <RiPhoneLine size={16} />
              </div>
              <span className="text-sm font-medium">{vaultDict.contact_info.phone}</span>
            </a>
          </div>

          {/* Logout Card */}
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button
                className="md:col-span-2 flex flex-col items-center justify-center gap-2 p-4 rounded-md bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all group"
                title={vaultDict.contact_info.logout}
              >
                <RiLockPasswordLine size={24} className="text-red-500 group-hover:text-white transition-colors" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 group-hover:text-white transition-colors text-center">
                  {vaultDict.contact_info.logout}
                </span>
              </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] animate-in fade-in duration-300" />
              <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-[var(--card)] p-8 rounded-md shadow-2xl z-[111] border border-[var(--border)] animate-in zoom-in-95 duration-300 focus:outline-none">
                <AlertDialog.Title className="text-xl font-bold mb-4">
                  {vaultDict.contact_info.logout}
                </AlertDialog.Title>
                <AlertDialog.Description className="text-[var(--secondary)] text-sm mb-8 leading-relaxed">
                  {vaultDict.contact_info.logout_message}
                </AlertDialog.Description>
                <div className="flex justify-end gap-4">
                  <AlertDialog.Cancel asChild>
                    <button className="px-6 py-2.5 rounded-sm text-sm font-bold border border-[var(--border)] hover:bg-[var(--muted)] transition-colors">
                      {vaultDict.contact_info.logout_cancel}
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button 
                      onClick={handleLogout}
                      className="px-6 py-2.5 rounded-sm text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                    >
                      {vaultDict.contact_info.logout_confirm}
                    </button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      </FadeIn>

      <div className="flex flex-col gap-4">
        {documents.map((doc, index) => (
          <StaggerItem key={doc.id} index={index}>
            <div className="card group p-5 rounded-md border-transparent hover:border-[var(--primary)]/20 transition-all hover:shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-md flex items-center justify-center text-3xl shrink-0 ${doc.color} group-hover:scale-105 transition-transform`}>
                    {doc.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[var(--foreground)]">{doc.title}</h3>
                      <span className="text-[10px] font-mono text-[var(--secondary)] opacity-60">({doc.size})</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--secondary)]">
                      <a 
                        href={doc.providerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors"
                      >
                        <RiBankLine size={12} className="text-[var(--primary)]" />
                        <span className="underline decoration-[var(--primary)]/30 underline-offset-4">{doc.provider}</span>
                      </a>
                    </div>
                    <div className="pt-1.5 flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 rounded-sm bg-[var(--primary)]/5 text-[var(--primary)] text-[10px] font-bold border border-[var(--primary)]/10 uppercase tracking-wider">
                        {doc.degree}
                      </span>
                      <span className="px-2 py-0.5 rounded-sm bg-[var(--accent)]/5 text-[var(--accent)] text-[10px] font-bold border border-[var(--accent)]/10 uppercase tracking-wider">
                        {doc.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                  <div className="flex flex-wrap items-center gap-2 ml-19 lg:ml-0">
                    <button
                      onClick={() => setPreviewFile({ url: doc.file, title: doc.title })}
                      className="hidden sm:flex px-4 py-2 rounded-md bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all items-center justify-center gap-2 text-xs font-bold"
                    >
                      <RiEyeLine size={16} />
                      <span>{dict.vault.preview}</span>
                    </button>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a 
                        href={doc.file} 
                        download
                        className="flex-1 sm:flex-none px-4 py-2 rounded-md bg-[var(--muted)] text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold border border-[var(--border)]"
                      >
                        <RiDownloadLine size={16} />
                        <span>{dict.vault.download_pdf}</span>
                      </a>

                      {doc.wordFile && (
                        <a 
                          href={doc.wordFile} 
                          download
                          className="flex-1 sm:flex-none px-4 py-2 rounded-md bg-[var(--muted)] text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold border border-[var(--border)]"
                        >
                          <RiFileUserLine size={16} />
                          <span>{dict.vault.download_word}</span>
                        </a>
                      )}
                    </div>
                  </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </div>

      <FadeIn direction="up" delay={0.6} className="mt-20">
        <div className="p-8 glass rounded-md border border-[var(--primary)]/10 text-center">
          <p className="text-[var(--secondary)] mb-6 text-sm">
            {dict.vault.confidential_notice}
          </p>
          <Link href={`/${lang}/contact`} className="btn-outline px-8 py-3 rounded-md text-sm font-bold">
            {dict.vault.contact_questions}
          </Link>
        </div>
      </FadeIn>

      {/* Preview Dialog */}
      <Dialog.Root open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] max-w-6xl bg-[var(--card)] rounded-md shadow-2xl z-[101] flex flex-col overflow-hidden border border-[var(--border)] animate-in zoom-in-95 duration-300 focus:outline-none">
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
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="btn-primary px-6 py-2 text-sm rounded-md font-bold flex items-center gap-2"
                >
                  <RiDownloadLine size={18} /> {dict.vault.download} PDF
                </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
