import { ImageResponse } from "next/og"
import { profile } from "@/content/profile"
import { getAllPosts, getPost } from "@/lib/blog"
import { isLocale } from "@/lib/i18n"
import { ogSize, renderOgCard } from "@/lib/og"

export const alt = `Blog — ${profile.name}`
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ lang: post.lang, slug: post.slug }))
}

export default async function PostOpenGraphImage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params
    const post = isLocale(lang) ? getPost(lang, slug) : undefined
    const { element, fonts } = await renderOgCard({
        eyebrow: `Blog · ${profile.name}`,
        title: post?.title ?? profile.name,
        titleSize: 60,
        description: post?.excerpt ?? "",
    })
    return new ImageResponse(element, { ...size, fonts })
}
