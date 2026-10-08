"use client"

import { useEffect, useRef } from "react"

const NUMBER = /^(\D*)(\d+(?:[.,]\d+)?)(.*)$/

/**
 * Counts the number inside `value` (for example "70%", "5+" or "3,91") up from zero when it scrolls into view.
 * The server renders the final value, so crawlers and visitors without JavaScript see it unchanged.
 */
export default function CountUp({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const element = ref.current
        const text = element?.firstChild
        const match = value.match(NUMBER)
        if (!element || !(text instanceof Text) || !match) return
        if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return

        // Numbers already on screen keep their value instead of flashing back to zero
        const { top, bottom } = element.getBoundingClientRect()
        if (top < window.innerHeight && bottom > 0) return

        const [, prefix, digits, suffix] = match
        const target = Number(digits.replace(",", "."))
        if (target === 0) return
        const separator = digits.includes(",") ? "," : "."
        const decimals = digits.split(/[.,]/)[1]?.length ?? 0
        const format = (n: number) => `${prefix}${n.toFixed(decimals).replace(".", separator)}${suffix}`

        let frame = 0
        text.nodeValue = format(0)
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                observer.disconnect()
                const start = performance.now()
                const step = (now: number) => {
                    const progress = Math.min((now - start) / 1200, 1)
                    text.nodeValue = format(target * (1 - (1 - progress) ** 3))
                    if (progress < 1) frame = requestAnimationFrame(step)
                }
                frame = requestAnimationFrame(step)
            },
            { threshold: 0.5 },
        )
        observer.observe(element)

        return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
            text.nodeValue = value
        }
    }, [value])

    return (
        <span ref={ref} className="tabular-nums">
            {value}
        </span>
    )
}
