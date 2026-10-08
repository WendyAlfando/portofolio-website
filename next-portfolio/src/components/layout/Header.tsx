import Link from "next/link"
import { profile } from "@/content/profile"
import type { Dictionary } from "@/content/types"
import { localePath, type Locale } from "@/lib/i18n"
import LanguageSwitch from "./LanguageSwitch"
import MobileNav from "./MobileNav"
import ThemeToggle from "./ThemeToggle"

export function navLinks(lang: Locale, dict: Dictionary) {
    return [
        { href: localePath(lang, "#about"), label: dict.nav.about },
        { href: localePath(lang, "#experience"), label: dict.nav.experience },
        { href: localePath(lang, "#projects"), label: dict.nav.projects },
        { href: localePath(lang, "#skills"), label: dict.nav.skills },
        { href: localePath(lang, "/blog"), label: dict.nav.blog },
        { href: localePath(lang, "#contact"), label: dict.nav.contact },
    ]
}

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    const links = navLinks(lang, dict)

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
                <Link
                    href={localePath(lang)}
                    aria-label={`${profile.name} — ${dict.nav.home}`}
                    className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
                >
                    WA<span className="text-amber-500 dark:text-amber-400">.</span>
                </Link>

                <nav aria-label={dict.nav.primary} className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <LanguageSwitch lang={lang} label={dict.nav.language} />
                    <ThemeToggle label={dict.nav.theme} />
                    <MobileNav
                        links={links}
                        label={dict.nav.primary}
                        openLabel={dict.nav.menuOpen}
                        closeLabel={dict.nav.menuClose}
                    />
                </div>
            </div>
        </header>
    )
}
