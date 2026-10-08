import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../globals.css"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import SplashScreen from "@/components/layout/SplashScreen"
import ThemeProvider from "@/components/layout/ThemeProvider"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingActions from "@/components/ui/FloatingActions"
import { getDictionary } from "@/content"
import { profile } from "@/content/profile"
import { fontVariables } from "@/lib/fonts"
import { isLocale, locales } from "@/lib/i18n"
import { siteUrl } from "@/lib/site"

// Only /id and /en exist; any other first segment is a 404
export const dynamicParams = false

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#020617" },
    ],
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    if (!isLocale(lang)) return {}
    const dict = getDictionary(lang)

    return {
        metadataBase: new URL(siteUrl),
        title: { default: dict.meta.title, template: `%s — ${profile.name}` },
        description: dict.meta.description,
        authors: [{ name: profile.name, url: siteUrl }],
        creator: profile.name,
        twitter: { card: "summary_large_image" },
    }
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    if (!isLocale(lang)) notFound()
    const dict = getDictionary(lang)

    return (
        <html lang={lang} className={fontVariables} suppressHydrationWarning>
            <body className="min-h-dvh bg-white font-sans text-slate-700 antialiased dark:bg-slate-950 dark:text-slate-300">
                <SplashScreen label={dict.splash.label} />
                <ThemeProvider>
                    <a
                        href="#main"
                        className="sr-only z-[60] rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
                    >
                        {dict.nav.skipToContent}
                    </a>
                    <Header lang={lang} dict={dict} />
                    <main id="main">{children}</main>
                    <Footer lang={lang} dict={dict} />
                    <FloatingActions
                        whatsappHref={`${profile.whatsapp}?text=${encodeURIComponent(dict.contact.whatsappGreeting)}`}
                        labels={dict.floating}
                    />
                    <CustomCursor />
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
