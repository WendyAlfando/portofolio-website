export const locales = ["id", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "id"

export function isLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value)
}

/** Builds a locale-prefixed URL: localePath("id") → "/id", localePath("en", "/blog") → "/en/blog", localePath("id", "#about") → "/id#about". */
export function localePath(lang: Locale, path = "") {
    return `/${lang}${path}`
}

/** The same page in another language. Blog posts only exist in the language they were written in, so those fall back to the blog index. */
export function switchLocalePath(pathname: string, target: Locale) {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length > 0 && isLocale(segments[0])) segments.shift()
    if (segments[0] === "blog" && segments.length > 1) return localePath(target, "/blog")
    return localePath(target, segments.length ? `/${segments.join("/")}` : "")
}

export const intlLocale: Record<Locale, string> = { id: "id-ID", en: "en-US" }
export const ogLocale: Record<Locale, string> = { id: "id_ID", en: "en_US" }

/** "2023-08" → "Agu 2023" (id) / "Aug 2023" (en) */
export function formatMonthYear(isoMonth: string, lang: Locale) {
    const [year, month] = isoMonth.split("-").map(Number)
    return new Intl.DateTimeFormat(intlLocale[lang], { month: "short", year: "numeric", timeZone: "UTC" })
        .format(new Date(Date.UTC(year, month - 1, 1)))
}

export function formatPeriod(start: string, end: string | undefined, lang: Locale, presentLabel: string) {
    return `${formatMonthYear(start, lang)} – ${end ? formatMonthYear(end, lang) : presentLabel}`
}

/** "2025-02-20" → "20 Februari 2025" / "February 20, 2025" */
export function formatDate(isoDate: string, lang: Locale) {
    return new Intl.DateTimeFormat(intlLocale[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
        .format(new Date(`${isoDate}T00:00:00Z`))
}

/** Whole years since a "YYYY-MM" start date, never less than 1. */
export function yearsSince(isoMonth: string, now = new Date()) {
    const [year, month] = isoMonth.split("-").map(Number)
    let years = now.getUTCFullYear() - year
    if (now.getUTCMonth() + 1 < month) years -= 1
    return Math.max(years, 1)
}
