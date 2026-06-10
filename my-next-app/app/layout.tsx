import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cinzel, Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/src/i18n/language-context";
import { ConditionalFooter } from "@/src/components/ConditionalFooter";
import { WhatsAppFab } from "@/src/components/site/whatsapp-fab";
import { AudioProvider } from "@/src/components/site/audio-player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Criss Cafe & Club Târgu Mureș — Cafenea, Lounge & Social Club",
  description:
    "Cafenea, lounge, pub și social club în inima Târgu Mureșului, pe Piața Trandafirilor.",
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${cormorant.variable} ${jost.variable} ${pinyonScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <AudioProvider>
          <div className="flex flex-1 flex-col">{children}</div>
          <ConditionalFooter />
          <WhatsAppFab />
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
