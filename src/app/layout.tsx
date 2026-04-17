import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andreas Hilgers - Senior Full-Stack Developer & Architect",
  description: "Portfolio of Andreas Hilgers, Senior Full-Stack Developer with 10+ years of experience",
  keywords: ["Full-Stack Developer", "Next.js", "TypeScript", "React", "Node.js"],
  authors: [{ name: "Andreas Hilgers" }],
  creator: "Andreas Hilgers",
  publisher: "Andreas Hilgers",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw]`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
