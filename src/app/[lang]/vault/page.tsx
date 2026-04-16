"use client";

import * as React from "react";
import { getDictionary } from "@/lib/get-dictionary";
import { Lock, Unlock, FileText, Award, UserCheck, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export default function VaultPage() {
  const params = useParams();
  const lang = params.lang as string;
  const [dict, setDict] = React.useState<Dictionary | null>(null);
  const [code, setCode] = React.useState("");
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getDictionary(lang as "de" | "en").then(setDict);
  }, [lang]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // The "secret code" is just a demo. In a real app, this should be handled via a secure API.
    if (code === "4242") {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!dict) return null;

  if (!isUnlocked) {
    return (
      <main className="section-container min-h-[70vh] flex items-center justify-center">
        <div className="card max-w-md w-full text-center space-y-6 p-12">
          <div className="mx-auto w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)]">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{dict.vault.title}</h1>
            <p className="text-[var(--secondary)]">{dict.vault.description}</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={dict.vault.placeholder}
              className={`w-full p-3 rounded-lg border bg-[var(--background)] focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all ${error ? 'border-red-500 animate-shake' : 'border-[var(--border)]'}`}
            />
            <button type="submit" className="btn-primary w-full justify-center">
              {dict.vault.button}
            </button>
            {error && <p className="text-red-500 text-sm font-medium">{dict.vault.error}</p>}
          </form>
          <p className="text-xs text-[var(--secondary)]">Hint: The code is 4242 (Demo)</p>
        </div>
      </main>
    );
  }

  const documents = [
    { title: dict.vault.documents.resume, icon: <FileText size={20} />, type: "PDF" },
    { title: dict.vault.documents.certificates, icon: <Award size={20} />, type: "PDF Bundle" },
    { title: dict.vault.documents.references, icon: <UserCheck size={20} />, type: "PDF" },
  ];

  return (
    <main className="section-container animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
          <Unlock size={24} />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{dict.vault.title}</h1>
          <p className="text-[var(--secondary)]">Vertrauliche Unterlagen von Andreas Hilgers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, i) => (
          <div key={i} className="card group cursor-pointer hover:border-[var(--primary)] transition-all">
            <div className="flex flex-col h-full space-y-4">
              <div className="p-3 bg-[var(--background)] rounded-lg w-fit group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors">
                {doc.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{doc.title}</h3>
                <p className="text-sm text-[var(--secondary)]">{doc.type}</p>
              </div>
              <div className="flex items-center text-[var(--primary)] font-medium text-sm group-hover:translate-x-1 transition-transform">
                Download / View <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 border border-dashed rounded-[2rem] text-center">
        <p className="text-[var(--secondary)]">
          Weitere Unterlagen können auf Anfrage zur Verfügung gestellt werden.
        </p>
      </div>
    </main>
  );
}
