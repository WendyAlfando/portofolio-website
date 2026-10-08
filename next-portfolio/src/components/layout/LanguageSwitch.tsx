"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { locales, switchLocalePath, type Locale } from "@/lib/i18n"

export default function LanguageSwitch({ lang, label }: { lang: Locale; label: string }) {
    const pathname = usePathname()

    return (
        <div role="group" aria-label={label} className="flex rounded-lg border border-slate-200 p-0.5 dark:border-white/10">
            {locales.map((locale) => {
                const active = locale === lang
                return (
                    <Link
                        key={locale}
                        href={switchLocalePath(pathname, locale)}
                        hrefLang={locale}
                        lang={locale}
                        aria-current={active ? "true" : undefined}
                        className={`rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${active
                            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                            }`}
                    >
                        {locale}
                    </Link>
                )
            })}
        </div>
    )
}
