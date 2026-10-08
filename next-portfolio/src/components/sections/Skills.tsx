import { Bot, ClipboardCheck, FileSearch } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import type { Dictionary } from "@/content/types"

// In the same order as skills.groups: business analysis, quality assurance, data & automation
const groupIcons = [FileSearch, ClipboardCheck, Bot]

export default function Skills({ dict }: { dict: Dictionary }) {
    const { skills } = dict

    return (
        <section
            id="skills"
            aria-labelledby="skills-title"
            className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-20 md:py-28 dark:border-white/10 dark:bg-slate-900/40"
        >
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeading
                    index={4}
                    eyebrow={skills.eyebrow}
                    title={skills.title}
                    subtitle={skills.subtitle}
                    titleId="skills-title"
                    className="reveal"
                />

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {skills.groups.map((group, index) => {
                        const Icon = groupIcons[index % groupIcons.length]
                        return (
                            <div
                                key={group.title}
                                className="reveal rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Icon className="size-5" aria-hidden />
                                    </span>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">{group.title}</h3>
                                </div>
                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <li
                                            key={skill}
                                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
