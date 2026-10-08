import { Award, ExternalLink, GraduationCap } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import { certifications } from "@/content/profile"
import type { Dictionary } from "@/content/types"
import { formatMonthYear, type Locale } from "@/lib/i18n"

export default function Education({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    const { education } = dict

    return (
        <section id="education" aria-labelledby="education-title" className="scroll-mt-20 py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeading
                    index={5}
                    eyebrow={education.eyebrow}
                    title={education.title}
                    titleId="education-title"
                    className="reveal"
                />

                <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <article className="reveal rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-white/10 dark:bg-white/[0.03]">
                        <span className="grid size-12 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <GraduationCap className="size-6" aria-hidden />
                        </span>
                        <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{education.degree}</h3>
                        <p className="mt-1 font-medium text-blue-700 dark:text-blue-400">{education.school}</p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            {education.period} · {education.location}
                        </p>
                        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">{education.description}</p>

                        <dl className="mt-6 grid grid-cols-2 gap-3">
                            <div className="flex flex-col rounded-xl border border-slate-200 p-4 dark:border-white/10">
                                <dt className="text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-400">
                                    {education.gpaLabel}
                                </dt>
                                <dd className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{education.gpa}</dd>
                            </div>
                            <div className="flex flex-col rounded-xl border border-amber-300/70 bg-amber-50 p-4 dark:border-amber-400/30 dark:bg-amber-400/10">
                                <dt className="text-xs font-semibold tracking-wider text-amber-900 uppercase dark:text-amber-300">
                                    {education.honorLabel}
                                </dt>
                                <dd className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{education.honor}</dd>
                            </div>
                        </dl>
                    </article>

                    <div className="reveal rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-white/10 dark:bg-white/[0.03]">
                        <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                            <Award className="size-5 text-amber-500" aria-hidden />
                            {education.certificationsTitle}
                        </h3>
                        <ul className="mt-2 divide-y divide-slate-200 dark:divide-white/10">
                            {certifications.map((cert) => (
                                <li key={cert.title} className="flex items-start justify-between gap-4 py-4">
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {cert.url ? (
                                                <a
                                                    href={cert.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {cert.title}
                                                    <ExternalLink className="size-3.5" aria-hidden />
                                                </a>
                                            ) : (
                                                cert.title
                                            )}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{cert.issuer}</p>
                                    </div>
                                    <p className="shrink-0 text-sm text-slate-600 tabular-nums dark:text-slate-400">
                                        {formatMonthYear(cert.date, lang)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
