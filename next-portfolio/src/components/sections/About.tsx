import { Bot, ClipboardCheck, FileSearch } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import type { Dictionary, FocusIcon } from "@/content/types"

const focusIcons: Record<FocusIcon, typeof Bot> = {
    requirements: FileSearch,
    automation: Bot,
    quality: ClipboardCheck,
}

export default function About({ dict }: { dict: Dictionary }) {
    const { about } = dict

    return (
        <section id="about" aria-labelledby="about-title" className="scroll-mt-20 py-20 md:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
                <div className="reveal">
                    <SectionHeading index={1} eyebrow={about.eyebrow} title={about.title} titleId="about-title" />
                    <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                        {about.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="reveal text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
                        {about.focusTitle}
                    </h3>
                    <ul className="mt-5 space-y-4">
                        {about.focus.map((item, index) => {
                            const Icon = focusIcons[item.icon]
                            return (
                                <li
                                    key={item.title}
                                    style={{ "--i": index } as React.CSSProperties}
                                    className="reveal flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                >
                                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Icon className="size-5" aria-hidden />
                                    </span>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                                        <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}
