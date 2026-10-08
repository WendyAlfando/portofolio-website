"use client"

import { useState } from "react"
import { LoaderCircle, Send } from "lucide-react"
import type { ContactFormLabels } from "@/content/types"

type Status = "idle" | "sending" | "success" | "error"

const fieldClass =
    "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 transition-shadow focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white"
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300"

export default function ContactForm({ endpoint, labels }: { endpoint: string; labels: ContactFormLabels }) {
    const [status, setStatus] = useState<Status>("idle")

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        setStatus("sending")

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" },
            })
            if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`)
            form.reset()
            setStatus("success")
        } catch {
            setStatus("error")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{labels.title}</h3>

            <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                    {labels.name}
                    <input name="name" type="text" required autoComplete="name" className={fieldClass} />
                </label>
                <label className={labelClass}>
                    {labels.email}
                    <input name="email" type="email" required autoComplete="email" className={fieldClass} />
                </label>
            </div>

            <label className={labelClass}>
                {labels.message}
                <textarea name="message" rows={5} required className={`${fieldClass} resize-y`} />
            </label>

            {/* Honeypot: hidden from people, but spam bots fill it in and Formspree then drops the submission */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {status === "sending" ? (
                    <LoaderCircle className="size-4 animate-spin" aria-hidden />
                ) : (
                    <Send className="size-4" aria-hidden />
                )}
                {status === "sending" ? labels.sending : labels.submit}
            </button>

            <p
                role="status"
                className={`min-h-6 text-center text-sm font-medium ${status === "error" ? "text-red-600 dark:text-red-400" : "text-emerald-700 dark:text-emerald-400"}`}
            >
                {status === "success" ? labels.success : status === "error" ? labels.error : ""}
            </p>
        </form>
    )
}
