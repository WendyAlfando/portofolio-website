"use client"

import { useEffect, useState } from "react"
import { ArrowUp, MessageCircle, X } from "lucide-react"
import type { Dictionary } from "@/content/types"

const hiddenClass = "invisible translate-y-4 scale-75 opacity-0"
const shownClass = "visible translate-y-0 scale-100 opacity-100"

/**
 * WhatsApp button that pops in after a few seconds (with a one-time tooltip per session) and a
 * back-to-top button that appears once the page is scrolled. Hidden buttons are invisible, so they
 * are also out of the tab order.
 */
export default function FloatingActions({ whatsappHref, labels }: { whatsappHref: string; labels: Dictionary["floating"] }) {
    const [showWhatsApp, setShowWhatsApp] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [showTop, setShowTop] = useState(false)

    useEffect(() => {
        const timers = [window.setTimeout(() => setShowWhatsApp(true), 3000)]
        let seen = false
        try {
            seen = sessionStorage.getItem("wa-tooltip") === "1"
            sessionStorage.setItem("wa-tooltip", "1")
        } catch {
            // Storage blocked: show the tooltip anyway
        }
        if (!seen) {
            timers.push(window.setTimeout(() => setShowTooltip(true), 4500))
            timers.push(window.setTimeout(() => setShowTooltip(false), 10500))
        }
        return () => timers.forEach((timer) => window.clearTimeout(timer))
    }, [])

    useEffect(() => {
        const update = () => setShowTop(window.scrollY > 400)
        window.addEventListener("scroll", update, { passive: true })
        return () => window.removeEventListener("scroll", update)
    }, [])

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-end justify-between gap-4 p-4 sm:p-6">
            <div className={`flex items-end gap-3 transition duration-500 ${showWhatsApp ? shownClass : hiddenClass}`}>
                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={labels.whatsapp}
                    title={labels.whatsapp}
                    className="pointer-events-auto grid size-14 place-items-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition hover:scale-110 hover:bg-green-600 active:scale-95"
                >
                    <MessageCircle className="size-6" aria-hidden />
                </a>
                <div
                    className={`relative mb-2 max-w-[13rem] rounded-xl bg-white px-4 py-2 text-sm text-slate-700 shadow-lg transition duration-300 dark:bg-slate-800 dark:text-slate-200 ${showTooltip ? "pointer-events-auto visible translate-x-0 opacity-100" : "invisible -translate-x-2 opacity-0"}`}
                >
                    {labels.tooltip}
                    <button
                        type="button"
                        onClick={() => setShowTooltip(false)}
                        aria-label={labels.closeTooltip}
                        className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-100"
                    >
                        <X className="size-3" aria-hidden />
                    </button>
                </div>
            </div>

            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0 })}
                aria-label={labels.backToTop}
                title={labels.backToTop}
                className={`pointer-events-auto grid size-12 place-items-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 ${showTop ? shownClass : hiddenClass}`}
            >
                <ArrowUp className="size-5" aria-hidden />
            </button>
        </div>
    )
}
