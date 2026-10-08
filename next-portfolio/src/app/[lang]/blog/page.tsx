import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Languages } from "lucide-react"
import { getDictionary } from "@/content"
import { getAllPosts } from "@/lib/blog"
import { formatDate, isLocale, localePath } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params
    if (!isLocale(lang)) return {}
    const dict = getDictionary(lang)
    return pageMetadata({ lang, path: "/blog", title: dict.meta.blogTitle, description: dict.meta.blogDescription })
}

export default async function BlogIndexPage({ params }: Props) {
    const { lang } = await params
    if (!isLocale(lang)) notFound()
    const dict = getDictionary(lang)
    const posts = getAllPosts()
    const hasOtherLanguages = posts.some((post) => post.lang !== lang)

    return (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <header>
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
                    {dict.blog.title}
                </h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{dict.blog.subtitle}</p>
                {dict.blog.languageNote && hasOtherLanguages && (
                    <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber-300/70 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
                        <Languages className="size-4 shrink-0" aria-hidden />
                        {dict.blog.languageNote}
                    </p>
                )}
            </header>

            {posts.length === 0 ? (
                <p className="mt-12 text-slate-600 dark:text-slate-400">{dict.blog.empty}</p>
            ) : (
                <ul className="mt-12 divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
                    {posts.map((post) => (
                        <li key={`${post.lang}-${post.slug}`}>
                            <article lang={post.lang} className="group relative py-8">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    <time dateTime={post.date}>{formatDate(post.date, lang)}</time> · {post.readingMinutes}{" "}
                                    {dict.blog.minutes}
                                </p>
                                <h2 className="mt-2 font-display text-2xl font-bold text-balance text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                                    {/* The stretched link makes the whole entry clickable */}
                                    <Link
                                        href={localePath(post.lang, `/blog/${post.slug}`)}
                                        hrefLang={post.lang}
                                        className="after:absolute after:inset-0"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
