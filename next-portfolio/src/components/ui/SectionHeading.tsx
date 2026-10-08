interface SectionHeadingProps {
    index: number
    eyebrow: string
    title: string
    /** id for the h2, so the section can point at it with aria-labelledby */
    titleId?: string
    subtitle?: string
    className?: string
}

export default function SectionHeading({ index, eyebrow, title, titleId, subtitle, className = "" }: SectionHeadingProps) {
    return (
        <div className={className}>
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                <span aria-hidden className="font-display text-base tracking-normal text-amber-600 dark:text-amber-300">
                    {String(index).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                {eyebrow}
            </p>
            <h2 id={titleId} className="mt-4 font-display text-3xl font-bold tracking-tight text-balance text-slate-900 md:text-4xl dark:text-white">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{subtitle}</p>
            )}
        </div>
    )
}
