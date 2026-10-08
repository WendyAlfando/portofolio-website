import { ImageResponse } from "next/og"
import { getDictionary } from "@/content"
import { profile } from "@/content/profile"
import { defaultLocale, isLocale, locales } from "@/lib/i18n"
import { ogSize, renderOgCard } from "@/lib/og"

export const alt = `${profile.name} — Business Analyst · RPA & Quality Assurance`
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }))
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const { hero } = getDictionary(isLocale(lang) ? lang : defaultLocale)
    const { element, fonts } = await renderOgCard({
        eyebrow: hero.kicker,
        title: profile.name,
        titleSize: 88,
        description: `${hero.headline.before}${hero.headline.highlight}${hero.headline.after}`,
    })
    return new ImageResponse(element, { ...size, fonts })
}
