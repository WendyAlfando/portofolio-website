import { CircleCheck } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import type { Dictionary } from "@/content/types"
import { formatPeriod, type Locale } from "@/lib/i18n"

export default function Experience({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    const { experience } = dict

    return (
        <section
            id="experience"
            aria-labelledby="experience-title"
            className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-20 md:py-28 dark:border-white/10 dark:bg-slate-900/40"
        >
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <SectionHeading
                    index={2}
                    eyebrow={experience.eyebrow}
                    title={experience.title}
                    titleId="experience-title"
                    className="lg:sticky lg:top-28 lg:self-start"
                />

                <div className="relative">
                    <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-slate-300 dark:bg-white/15" />
                    {/* Brand-coloured line that draws itself down the timeline while scrolling */}
                    <span
                        aria-hidden
                        className="draw-y absolute top-2 bottom-2 left-[5px] w-px bg-linear-to-b from-blue-500 via-blue-400 to-amber-400"
                    />
                    <ol className="space-y-12">
                        {experience.items.map((item) => (
                            <li key={`${item.role}-${item.start}`} className="reveal relative pl-8">
                                <span
                                    aria-hidden
                                    className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-blue-500 bg-slate-50 dark:bg-slate-950"
                                />
                                <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                                    {formatPeriod(item.start, item.end, lang, experience.present)}
                                </p>
                                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{item.role}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{item.company}</p>

                                <ul className="mt-4 space-y-2.5">
                                    {item.points.map((point) => (
                                        <li key={point} className="flex gap-3 leading-relaxed text-slate-700 dark:text-slate-300">
                                            <CircleCheck className="mt-1 size-4 shrink-0 text-blue-500" aria-hidden />
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {item.tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}
