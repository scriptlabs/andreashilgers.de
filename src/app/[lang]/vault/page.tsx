import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { Dictionary } from "@/lib/dictionary";
import VaultClient from "./VaultClient";

export const metadata: Metadata = {
  title: "Secure Document Vault | Andreas Hilgers",
  description: "Access professional documents and certifications in a secure environment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VaultPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return <VaultClient dict={dict} lang={lang} />;
}
