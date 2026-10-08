"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle({ label }: { label: string }) {
    const { resolvedTheme, setTheme } = useTheme()

    function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
        const next = resolvedTheme === "dark" ? "light" : "dark"
        const root = document.documentElement
        const animate =
            "startViewTransition" in document && window.matchMedia("(prefers-reduced-motion: no-preference)").matches
        if (!animate) {
            setTheme(next)
            return
        }

        // Grow the new theme as a circle from the centre of the button
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

        const transition = document.startViewTransition(() => {
            // Flip the class right away so the transition captures the new theme; next-themes then persists it
            root.classList.toggle("dark", next === "dark")
            root.style.colorScheme = next
            setTheme(next)
        })
        transition.ready
            .then(() => {
                root.animate(
                    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                    { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
                )
            })
            .catch(() => {
                // The transition was skipped (for example by a second click); the theme has still changed
            })
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={label}
            title={label}
            className="grid size-9 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
            {/* Both icons are rendered and swapped with CSS, so the server markup never depends on the theme */}
            <Sun className="hidden size-[18px] dark:block" aria-hidden />
            <Moon className="size-[18px] dark:hidden" aria-hidden />
        </button>
    )
}
