import { Flag, Users } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import type { Dictionary } from "@/content/types"
import { formatPeriod, type Locale } from "@/lib/i18n"

export default function Organization({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    const { organization } = dict
    const period = (start: string, end: string) => formatPeriod(start, end, lang, "")

    return (
        <section
            id="organizations"
            aria-labelledby="organizations-title"
            className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-20 md:py-28 dark:border-white/10 dark:bg-slate-900/40"
        >
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeading
                    index={6}
                    eyebrow={organization.eyebrow}
                    title={organization.title}
                    subtitle={organization.subtitle}
                    titleId="organizations-title"
                    className="reveal"
                />

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <div className="reveal rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-white/10 dark:bg-slate-950">
                        <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                            <Users className="size-5 text-blue-500" aria-hidden />
                            {organization.mentoringTitle}
                        </h3>
                        <ul className="mt-2 divide-y divide-slate-200 dark:divide-white/10">
                            {organization.mentoring.map((item) => (
                                <li key={item.role} className="py-5">
                                    <p className="text-sm text-blue-700 tabular-nums dark:text-blue-400">{period(item.start, item.end)}</p>
                                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{item.role}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.organization}</p>
                                    <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="reveal rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-white/10 dark:bg-slate-950">
                        <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                            <Flag className="size-5 text-amber-500" aria-hidden />
                            {organization.committeeTitle}
                        </h3>
                        <ul className="mt-2 divide-y divide-slate-200 dark:divide-white/10">
                            {organization.committee.map((item) => (
                                <li key={item.event} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">{item.role}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.event}</p>
                                    </div>
                                    <p className="text-sm text-slate-600 tabular-nums dark:text-slate-400">{period(item.start, item.end)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
