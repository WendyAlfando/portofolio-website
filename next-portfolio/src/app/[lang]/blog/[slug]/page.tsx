import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getDictionary } from "@/content"
import { profile } from "@/content/profile"
import { getAllPosts, getPost } from "@/lib/blog"
import { formatDate, isLocale, localePath } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

type Props = { params: Promise<{ lang: string; slug: string }> }

// Each post is generated only under the language it was written in
export const dynamicParams = false

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ lang: post.lang, slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params
    const post = isLocale(lang) ? getPost(lang, slug) : undefined
    if (!post) return {}
    return pageMetadata({
        lang: post.lang,
        path: `/blog/${post.slug}`,
        title: post.title,
        description: post.excerpt,
        translated: false,
        article: { publishedTime: post.date, tags: post.tags },
    })
}

function MarkdownLink({ href = "", children }: { href?: string; children?: React.ReactNode }) {
    if (href.startsWith("/")) return <Link href={href}>{children}</Link>
    if (/^https?:\/\//.test(href)) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        )
    }
    return <a href={href}>{children}</a>
}

export default async function BlogPostPage({ params }: Props) {
    const { lang, slug } = await params
    if (!isLocale(lang)) notFound()
    const post = getPost(lang, slug)
    if (!post) notFound()
    const dict = getDictionary(lang)

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        inLanguage: post.lang,
        keywords: post.tags.join(", "),
        url: absoluteUrl(localePath(post.lang, `/blog/${post.slug}`)),
        author: { "@type": "Person", name: profile.name, url: absoluteUrl(localePath(lang)) },
    }

    return (
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
            />

            <Link
                href={localePath(lang, "/blog")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
            >
                <ArrowLeft className="size-4" aria-hidden />
                {dict.blog.back}
            </Link>

            <header className="mt-8">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    <time dateTime={post.date}>{formatDate(post.date, lang)}</time> · {post.readingMinutes} {dict.blog.minutes}
                </p>
                <h1 className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight text-balance text-slate-900 md:text-5xl dark:text-white">
                    {post.title}
                </h1>
                <p className="mt-5 text-xl leading-relaxed text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <li key={tag} className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                            {tag}
                        </li>
                    ))}
                </ul>
            </header>

            <div className="prose prose-lg mt-12 max-w-none prose-slate dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-blue-700 prose-blockquote:border-blue-500 dark:prose-a:text-blue-400">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{ a: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink> }}
                >
                    {post.content}
                </Markdown>
            </div>

            <footer className="mt-16 flex items-center gap-4 rounded-2xl border border-slate-200 p-5 dark:border-white/10">
                {/* Zoomed in on the face of the head-and-shoulders portrait */}
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={profile.photo}
                        alt=""
                        fill
                        sizes="112px"
                        className="origin-[50%_30%] scale-175 object-cover object-top"
                    />
                </div>
                <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{dict.blog.writtenBy}</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                        <Link href={localePath(lang)} className="hover:text-blue-700 dark:hover:text-blue-400">
                            {profile.name}
                        </Link>
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{dict.footer.tagline}</p>
                </div>
            </footer>
        </article>
    )
}
