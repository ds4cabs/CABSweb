import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "CABSweb — AI-native ecosystem for the life sciences community",
    template: "%s · CABSweb",
  },
  description:
    "Talent, knowledge, and innovation ecosystem for the Chinese American Biopharmaceutical Society (CABS). Discover mentors, experts, founders, investors, careers, and knowledge through an AI-powered experience.",
  metadataBase: new URL("https://www.cabsweb.org"),
  openGraph: {
    title: "CABSweb",
    description: "AI-native talent, knowledge, and innovation ecosystem for the global life sciences community.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
