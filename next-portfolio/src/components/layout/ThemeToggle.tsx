"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle({ label }: { label: string }) {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
