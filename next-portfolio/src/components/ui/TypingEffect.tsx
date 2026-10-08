"use client"

import { useEffect, useState } from "react"

/**
 * Types and deletes each word in turn. The first word is server-rendered and stays put with reduced motion;
 * screen readers get the full list once instead of the changing text.
 */
export default function TypingEffect({ words, className = "" }: { words: string[]; className?: string }) {
    const [text, setText] = useState(words[0] ?? "")

    useEffect(() => {
        if (words.length < 2 || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return

        let index = 0
        let length = words[0].length
        let deleting = true
        let timer = 0

        const tick = () => {
            const word = words[index]
            if (deleting) {
                length -= 1
                setText(word.slice(0, length))
                if (length === 0) {
                    deleting = false
                    index = (index + 1) % words.length
                    timer = window.setTimeout(tick, 350)
                    return
                }
                timer = window.setTimeout(tick, 45)
            } else {
                length += 1
                setText(word.slice(0, length))
                if (length === word.length) {
                    deleting = true
                    timer = window.setTimeout(tick, 2000)
                    return
                }
                timer = window.setTimeout(tick, 85)
            }
        }

        // Hold the first word (it is already on screen) before deleting it
        timer = window.setTimeout(tick, 2200)
        return () => window.clearTimeout(timer)
    }, [words])

    return (
        <span className={className}>
            <span aria-hidden>{text}</span>
            <span aria-hidden className="ml-0.5 text-amber-400 motion-safe:animate-pulse">
                |
            </span>
            <span className="sr-only">{words.join(", ")}</span>
        </span>
    )
}
