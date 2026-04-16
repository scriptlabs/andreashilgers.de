import { Navbar } from "@/components/navbar";
import { getDictionary } from "@/lib/get-dictionary";
import { Dictionary } from "@/lib/dictionary";

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "de" | "en") as unknown as Dictionary;

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <div className="pt-16 min-h-screen">{children}</div>
    </>
  );
}
