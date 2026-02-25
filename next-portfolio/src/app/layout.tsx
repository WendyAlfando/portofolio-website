import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import { TranslationProvider } from "@/context/TranslationContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollToTop from "@/components/ui/ScrollToTop";
import LoadingScreen from "@/components/ui/LoadingScreen";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wendy Alfando - Junior Business Analyst",
  description: "Portfolio of Wendy Alfando — Junior Business Analyst specializing in RPA implementation, QA testing, and business process optimization. Summa Cum Laude graduate from BINUS University.",
  keywords: ["Business Analyst", "RPA", "Quality Assurance", "Portfolio", "Wendy Alfando", "BINUS University"],
  authors: [{ name: "Wendy Alfando" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://portofolio-website-pi.vercel.app",
    siteName: "Wendy Alfando Portfolio",
    title: "Wendy Alfando - Junior Business Analyst",
    description: "Junior Business Analyst specializing in RPA implementation, QA testing, and business process optimization.",
    images: [
      {
        url: "/images/Profile.png",
        width: 800,
        height: 800,
        alt: "Wendy Alfando - Junior Business Analyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wendy Alfando - Junior Business Analyst",
    description: "Junior Business Analyst specializing in RPA implementation, QA testing, and business optimization.",
    images: ["/images/Profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <TranslationProvider>
            <LoadingScreen />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <ScrollToTop />
            <WhatsAppButton />
          </TranslationProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
