import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import CountUp from "@/components/ui/CountUp"
import ParticleBackground from "@/components/ui/ParticleBackground"
import SocialLinks from "@/components/ui/SocialLinks"
import TypingEffect from "@/components/ui/TypingEffect"
import { profile } from "@/content/profile"
import type { Dictionary } from "@/content/types"
import { yearsSince } from "@/lib/i18n"

// Load-in order for the .enter animation
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties

export default function Hero({ dict }: { dict: Dictionary }) {
    const { hero } = dict
    const years = String(yearsSince(profile.careerStart))

    return (
        <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
            {/* Decorative background: a fading grid and two slowly drifting glows, no JavaScript involved */}
            <div
                aria-hidden
                className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="drift-a absolute -top-48 -left-40 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.18),transparent)]" />
                <div className="drift-b absolute top-1/4 -right-48 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(251_191_36/0.12),transparent)]" />
            </div>
            <ParticleBackground className="absolute inset-0 -z-10 size-full [mask-image:linear-gradient(to_bottom,black_65%,transparent)]" />

            <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-10 pb-12 md:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pt-20 lg:pb-16">
                <div>
                    <p
                        className="enter inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        style={delay(0)}
                    >
                        <span aria-hidden className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full rounded-full bg-blue-400 opacity-75 motion-safe:animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-blue-500" />
                        </span>
                        {hero.kicker}
                    </p>

                    <p className="enter mt-5 h-6 text-sm font-medium text-blue-600 dark:text-blue-400" style={delay(40)}>
                        <TypingEffect words={hero.typing} />
                    </p>

                    <h1
                        id="hero-title"
                        className="enter mt-2 font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
                        style={delay(80)}
                    >
                        {profile.name}
                    </h1>

                    <p
                        className="enter mt-5 max-w-xl text-xl leading-snug font-medium text-pretty text-slate-800 sm:text-2xl dark:text-slate-100"
                        style={delay(160)}
                    >
                        {hero.headline.before}
                        <span className="text-gradient text-gradient-animated">{hero.headline.highlight}</span>
                        {hero.headline.after}
                    </p>

                    <p className="enter mt-5 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400" style={delay(240)}>
                        {hero.summary}
                    </p>

                    <div className="enter mt-8 flex flex-wrap items-center gap-3" style={delay(320)}>
                        <a
                            href="#projects"
                            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-600/30"
                        >
                            {hero.ctaPrimary}
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </a>
                        <a
                            href={profile.cv}
                            download
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                        >
                            <Download className="size-4" aria-hidden />
                            {hero.ctaCv}
                        </a>
                    </div>

                    <div className="enter mt-8" style={delay(400)}>
                        <SocialLinks label={hero.socialLabel} />
                    </div>
                </div>

                {/* Floats gently; the arch inside fades its bottom into the page so the portrait has no hard edge */}
                <div className="float-y relative order-first mx-auto w-44 sm:w-56 lg:order-none lg:w-full lg:max-w-sm">
                    <div
                        className="enter-scale group relative aspect-[4/5] overflow-hidden rounded-t-full border border-b-0 border-slate-200 bg-linear-to-b from-blue-100 via-slate-50 to-white [mask-image:linear-gradient(to_bottom,black_78%,transparent)] dark:border-white/10 dark:from-blue-500/25 dark:via-slate-900 dark:to-slate-950"
                        style={delay(120)}
                    >
                        <Image
                            src={profile.photo}
                            alt={hero.photoAlt}
                            fill
                            sizes="(min-width: 1024px) 384px, (min-width: 640px) 224px, 176px"
                            loading="eager"
                            fetchPriority="high"
                            className="object-cover object-top pt-[6%] transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 pb-16 lg:pb-24">
                <dl
                    className="enter grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-4 dark:border-white/10 dark:bg-white/10"
                    style={delay(480)}
                >
                    {dict.highlights.map((item) => (
                        <div key={item.label} className="group flex flex-col gap-1 bg-white p-5 md:p-6 dark:bg-slate-950">
                            <dt className="text-sm leading-snug text-slate-600 dark:text-slate-400">{item.label}</dt>
                            <dd className="order-first font-display text-3xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 md:text-4xl dark:text-white dark:group-hover:text-blue-400">
                                <CountUp value={item.value.replace("{years}", years)} />
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
