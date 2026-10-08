import Link from "next/link"
import { ArrowUp } from "lucide-react"
import SocialLinks from "@/components/ui/SocialLinks"
import { profile } from "@/content/profile"
import type { Dictionary } from "@/content/types"
import type { Locale } from "@/lib/i18n"
import { navLinks } from "./Header"

const linkClass = "text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
const external = { target: "_blank", rel: "noopener noreferrer" }

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
                <div>
                    <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{profile.name}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{dict.footer.tagline}</p>
                    <SocialLinks label={dict.hero.socialLabel} className="mt-6" />
                </div>

                <nav aria-labelledby="footer-nav-title">
                    <h2 id="footer-nav-title" className="text-sm font-semibold text-slate-900 dark:text-white">
                        {dict.footer.navTitle}
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm">
                        {navLinks(lang, dict).map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={linkClass}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{dict.footer.linksTitle}</h2>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li>
                            <a href={profile.cv} download className={linkClass}>
                                {dict.footer.cv}
                            </a>
                        </li>
                        <li>
                            <a href={profile.linkedin} {...external} className={linkClass}>
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href={profile.github} {...external} className={linkClass}>
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href={profile.sourceCode} {...external} className={linkClass}>
                                {dict.footer.source}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-slate-200 dark:border-white/10">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
                    <p>
                        © {new Date().getFullYear()} {profile.name}. {dict.footer.builtWith}
                    </p>
                    {/* "#top" scrolls to the start of the document without needing a matching element */}
                    <a href="#top" className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white">
                        {dict.footer.backToTop}
                        <ArrowUp className="size-4" aria-hidden />
                    </a>
                </div>
            </div>
        </footer>
    )
}
