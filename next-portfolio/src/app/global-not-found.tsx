// Served for URLs that match no route at all (for example /xyz or /id/xyz).
// It renders outside the [lang] layout, so it brings its own <html>, styles, fonts and theme.
import "./globals.css"
import type { Metadata } from "next"
import { fontVariables } from "@/lib/fonts"

export const metadata: Metadata = {
    title: "404 — Wendy Alfando",
    description: "Halaman tidak ditemukan · Page not found",
}

export default function GlobalNotFound() {
    return (
        <html lang="id" className={`dark ${fontVariables}`} data-splash="seen">
            <body className="grid min-h-dvh place-items-center overflow-hidden bg-slate-950 px-6 font-sans text-slate-300 antialiased">
                <div aria-hidden className="pointer-events-none fixed inset-0">
                    <div className="drift-a absolute top-1/4 left-1/4 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.16),transparent)]" />
                    <div className="drift-b absolute right-1/4 bottom-1/4 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(251_191_36/0.12),transparent)]" />
                </div>
                <main className="relative text-center">
                    <p className="enter-scale text-gradient font-display text-8xl font-bold">404</p>
                    <h1 className="mt-6 font-display text-3xl font-bold text-white">Halaman tidak ditemukan</h1>
                    <p lang="en" className="mt-2 text-slate-400">
                        Page not found
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {/* Plain anchors: this page renders without the app router */}
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a href="/id" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500">
                            Ke beranda
                        </a>
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a
                            href="/en"
                            lang="en"
                            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
                        >
                            Home (English)
                        </a>
                    </div>
                </main>
            </body>
        </html>
    )
}
