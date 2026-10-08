"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

interface NavLink {
    href: string
    label: string
}

interface MobileNavProps {
    links: NavLink[]
    label: string
    openLabel: string
    closeLabel: string
}

export default function MobileNav({ links, label, openLabel, closeLabel }: MobileNavProps) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) return
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", closeOnEscape)
        return () => window.removeEventListener("keydown", closeOnEscape)
    }, [open])

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? closeLabel : openLabel}
                className="grid size-9 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
            >
                {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>

            {open && (
                <nav
                    id="mobile-nav"
                    aria-label={label}
                    className="menu-in absolute inset-x-0 top-full border-b border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-slate-950"
                >
                    <ul className="mx-auto max-w-6xl px-6 py-3">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-2 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    )
}
