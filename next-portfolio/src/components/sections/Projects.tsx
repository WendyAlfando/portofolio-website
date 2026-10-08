import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"
import CountUp from "@/components/ui/CountUp"
import SectionHeading from "@/components/ui/SectionHeading"
import TiltCard from "@/components/ui/TiltCard"
import type { Dictionary } from "@/content/types"
import { getAllPosts } from "@/lib/blog"
import { localePath } from "@/lib/i18n"

const labelClass = "text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400"

export default function Projects({ dict }: { dict: Dictionary }) {
    const { projects } = dict
    const { featured, labels } = projects
    // Link the longer write-up in whichever language the post was written in
    const story = featured.storySlug ? getAllPosts().find((post) => post.slug === featured.storySlug) : undefined

    return (
        <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeading
                    index={3}
                    eyebrow={projects.eyebrow}
                    title={projects.title}
                    subtitle={projects.subtitle}
                    titleId="projects-title"
                    className="reveal"
                />

                <article className="reveal mt-12 grid gap-10 rounded-3xl border border-slate-200 bg-linear-to-br from-blue-50 via-white to-amber-50/70 p-6 sm:p-8 md:p-10 lg:grid-cols-[1.35fr_1fr] dark:border-white/10 dark:from-blue-500/10 dark:via-slate-950 dark:to-amber-400/5">
                    <div>
                        <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-400/15 dark:text-amber-300">
                            <Sparkles className="size-3.5" aria-hidden />
                            {projects.featuredLabel}
                        </p>
                        <h3 className="mt-4 font-display text-2xl font-bold text-balance text-slate-900 md:text-3xl dark:text-white">
                            {featured.title}
                        </h3>

                        <dl className="mt-6 space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                            <div>
                                <dt className={labelClass}>{labels.context}</dt>
                                <dd className="mt-1">{featured.context}</dd>
                            </div>
                            <div>
                                <dt className={labelClass}>{labels.role}</dt>
                                <dd className="mt-1">{featured.role}</dd>
                            </div>
                            <div>
                                <dt className={labelClass}>{labels.approach}</dt>
                                <dd>
                                    <ol className="mt-2 space-y-2.5">
                                        {featured.approach.map((step, index) => (
                                            <li key={step} className="flex gap-3">
                                                <span
                                                    aria-hidden
                                                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blue-600 text-xs font-semibold text-white"
                                                >
                                                    {index + 1}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Compact rows on phones, cards side by side on tablets, a column next to the story on desktop */}
                        <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                            {featured.metrics.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 sm:flex-col sm:items-start sm:gap-1 sm:p-5 dark:border-white/10 dark:bg-slate-950/60"
                                >
                                    <dt className="text-sm leading-snug text-slate-600 dark:text-slate-400">{metric.label}</dt>
                                    <dd className="order-first min-w-16 font-display text-3xl font-bold text-blue-600 sm:text-4xl dark:text-blue-400">
                                        <CountUp value={metric.value} />
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-white/10 dark:bg-slate-950/60">
                            <p className={labelClass}>{labels.result}</p>
                            <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">{featured.result}</p>
                        </div>
                        {story && (
                            <Link
                                href={localePath(story.lang, `/blog/${story.slug}`)}
                                hrefLang={story.lang}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
                            >
                                {projects.storyLink}
                                <ArrowUpRight className="size-4" aria-hidden />
                            </Link>
                        )}
                    </div>
                </article>

                <ul className="mt-6 grid gap-6 md:grid-cols-2">
                    {projects.items.map((item, index) => (
                        <li key={item.title} style={{ "--i": index % 2 } as React.CSSProperties} className="reveal">
                            <TiltCard className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-500/40 hover:shadow-xl hover:shadow-slate-900/5 md:p-8 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30 dark:hover:shadow-black/30">
                                <div className="flex items-start justify-between gap-4">
                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-300">
                                        {item.category}
                                    </span>
                                    {item.metric && (
                                        <p className="text-right">
                                            <span className="block font-display text-3xl leading-none font-bold text-blue-600 dark:text-blue-400">
                                                <CountUp value={item.metric.value} />
                                            </span>
                                            <span className="mt-1 block text-xs text-slate-600 dark:text-slate-400">{item.metric.label}</span>
                                        </p>
                                    )}
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{item.summary}</p>
                                <dl className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm dark:border-white/10">
                                    <div>
                                        <dt className="font-semibold text-slate-900 dark:text-white">{labels.approach}</dt>
                                        <dd className="mt-0.5 leading-relaxed text-slate-600 dark:text-slate-400">{item.approach}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold text-slate-900 dark:text-white">{labels.result}</dt>
                                        <dd className="mt-0.5 leading-relaxed text-slate-600 dark:text-slate-400">{item.result}</dd>
                                    </div>
                                </dl>
                            </TiltCard>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
