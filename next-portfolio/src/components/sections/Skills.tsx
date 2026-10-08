import { ChartColumn, Handshake, Workflow } from "lucide-react"
import CountUp from "@/components/ui/CountUp"
import InViewGroup from "@/components/ui/InViewGroup"
import SectionHeading from "@/components/ui/SectionHeading"
import type { Dictionary } from "@/content/types"

// In the same order as skills.groups: process analysis, data analysis, soft skills
const groupIcons = [Workflow, ChartColumn, Handshake]

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
                            <InViewGroup
                                key={group.title}
                                style={{ "--i": index } as React.CSSProperties}
                                className="reveal group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30 dark:hover:shadow-black/30"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 dark:text-blue-400">
                                        <Icon className="size-5" aria-hidden />
                                    </span>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">{group.title}</h3>
                                </div>

                                <ul className="mt-6 space-y-5">
                                    {group.skills.map((skill, skillIndex) => (
                                        <li key={skill.name}>
                                            <div className="mb-2 flex justify-between gap-3 text-sm">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                                                <span className="font-semibold text-blue-700 dark:text-blue-400">
                                                    <CountUp value={`${skill.level}%`} />
                                                </span>
                                            </div>
                                            <div aria-hidden className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                                                <div
                                                    className="skill-fill relative h-full rounded-full bg-linear-to-r from-blue-500 to-blue-400"
                                                    style={
                                                        {
                                                            "--level": skill.level / 100,
                                                            "--delay": `${200 + skillIndex * 100}ms`,
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    <span className="absolute inset-y-0 right-0 w-4 rounded-full bg-white/30 blur-[2px]" />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </InViewGroup>
                        )
                    })}
                </div>

                <div className="reveal mt-10">
                    <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-600 uppercase dark:text-slate-400">
                        {skills.toolsTitle}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                        {skills.tools.map((tool) => (
                            <li
                                key={tool}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-blue-500/40 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/40 dark:hover:text-blue-300"
                            >
                                {tool}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
