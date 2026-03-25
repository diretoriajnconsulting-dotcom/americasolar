import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Solar América - Transformadores Elétricos | João Pessoa – PB",
  description:
    "Fabricante de transformadores a seco e a óleo. Atendemos indústrias, shoppings, usinas renováveis e obras críticas em todo o Brasil.",
  openGraph: {
    title: "Solar América | Transformadores de Alta Performance",
    description:
      "Especialistas em transformadores elétricos. ISO 9001:2015. João Pessoa – PB.",
    url: "https://solaramerica.ind.br",
    siteName: "Solar América",
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
    <html lang="pt-BR" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col bg-white text-black">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
