import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

// Premium Neo-Moroccan Typography
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dir-Khir - L'entraide de quartier au Maroc",
  description: "Plateforme d'entraide communautaire pour connecter les citoyens marocains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-body antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
