import type { Metadata } from "next";
import { Geist, Geist_Mono, VT323 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConsoleLogger } from "@/components/console-logger";

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

const pixelFont = VT323({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://andreashilgers.de'),
  title: {
    default: "Andreas Hilgers - Engineering Manager & Senior Full-Stack Developer",
    template: "%s | Andreas Hilgers",
  },
  description: "Portfolio of Andreas Hilgers, Engineering Leader and Senior Full-Stack Developer with 20+ years of experience.",
  keywords: ["Engineering Manager", "Tech Lead", "Full-Stack Developer", "Software Architect", "AI Development"],
  authors: [{ name: "Andreas Hilgers" }],
  creator: "Andreas Hilgers",
  publisher: "Andreas Hilgers",
  openGraph: {
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'de-DE': '/de',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="author" href="/humans.txt" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pixelFont.variable} antialiased`} suppressHydrationWarning>
        <ConsoleLogger />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
