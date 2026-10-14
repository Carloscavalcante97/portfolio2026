import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { BackgroundCanvas } from "@/components/background-canvas";
import { Header } from "@/components/header";
import { SectionNav } from "@/components/section-nav";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Antônio Cavalcante | Software Engineer",
  description:
    "Engenheiro de software full-stack na Souv: APIs em NestJS, apps em Next.js e React Native, dados em Python e um pipeline de agentes de IA que reduziu o tempo de correção em ~75%.",
  openGraph: {
    title: "Antônio Cavalcante | Software Engineer",
    description:
      "Full-stack de ponta a ponta: NestJS, Next.js, React Native, Python para dados e agentes de IA em produção.",
    type: "website",
    locale: "pt_BR",
    siteName: "Antônio Cavalcante",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <BackgroundCanvas />
            <Header />
            {children}
            <SectionNav />
            <WhatsAppButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
