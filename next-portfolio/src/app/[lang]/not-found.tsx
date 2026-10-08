import Link from "next/link"
import { lang as rootLang } from "next/root-params"
import { getDictionary } from "@/content"
import { defaultLocale, isLocale, localePath } from "@/lib/i18n"

export default async function NotFound() {
    const value = await rootLang()
    const lang = isLocale(value) ? value : defaultLocale
    const dict = getDictionary(lang)

    return (
        <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
            <p className="text-gradient font-display text-8xl font-bold">404</p>
            <h1 className="mt-6 font-display text-3xl font-bold text-slate-900 dark:text-white">{dict.notFound.title}</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{dict.notFound.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                    href={localePath(lang)}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                    {dict.notFound.home}
                </Link>
                <Link
                    href={localePath(lang, "/blog")}
                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                    {dict.notFound.blog}
                </Link>
            </div>
        </div>
    )
}
