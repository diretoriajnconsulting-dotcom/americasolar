import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Solar América - Indústria e Equipamentos Elétricos",
  description: "Plataforma B2B para comercialização e orçamentos de transformadores e manutenção preventiva.",
  openGraph: {
    title: "Solar América | Alta Performance",
    description: "Sistemas elétricos robustos e transformadores de ponta. Inovação que move a indústria.",
    url: "https://solar-america.vercel.app",
    siteName: "Solar América",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540954388837-de2fb4625b0f?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Solar América - Infraestrutura Elétrica B2B",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} ${manrope.variable} font-body antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
