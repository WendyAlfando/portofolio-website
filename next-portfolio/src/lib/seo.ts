import type { Metadata } from "next"
import { profile } from "@/content/profile"
import { defaultLocale, localePath, locales, ogLocale, type Locale } from "./i18n"

interface PageMetadataOptions {
    lang: Locale
    /** Path after the locale prefix, e.g. "" or "/blog" */
    path?: string
    title: string
    description: string
    absoluteTitle?: boolean
    /** Blog posts exist in one language only, so they get no hreflang alternates */
    translated?: boolean
    article?: { publishedTime: string; tags: string[] }
}

export function pageMetadata({
    lang,
    path = "",
    title,
    description,
    absoluteTitle = false,
    translated = true,
    article,
}: PageMetadataOptions): Metadata {
    const url = localePath(lang, path)
    const shared = { url, title, description, siteName: profile.name, locale: ogLocale[lang] }

    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        alternates: {
            canonical: url,
            languages: translated
                ? {
                    ...Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)])),
                    "x-default": localePath(defaultLocale, path),
                }
                : undefined,
        },
        openGraph: article
            ? { ...shared, type: "article", publishedTime: article.publishedTime, authors: [profile.name], tags: article.tags }
            : { ...shared, type: "website" },
    }
}
