import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { localePath, locales } from "@/lib/i18n"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
    const translatedPages = ["", "/blog"].flatMap((path) =>
        locales.map((lang) => ({
            url: absoluteUrl(localePath(lang, path)),
            lastModified: new Date(),
            alternates: {
                languages: Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(localePath(locale, path))])),
            },
        })),
    )

    const posts = getAllPosts().map((post) => ({
        url: absoluteUrl(localePath(post.lang, `/blog/${post.slug}`)),
        lastModified: new Date(`${post.date}T00:00:00Z`),
    }))

    return [...translatedPages, ...posts]
}
