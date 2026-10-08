"use client"

import { useEffect, useRef } from "react"

/**
 * Lets CSS play a one-time entrance (for example skill bars filling up) when the group scrolls into view.
 * It marks itself data-armed while waiting below the fold and data-in-view once seen. Without JavaScript,
 * with reduced motion, or when already on screen at load, the final state simply shows.
 */
export default function InViewGroup({
    children,
    className = "",
    style,
}: {
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return
        if (element.getBoundingClientRect().top < window.innerHeight) return

        element.dataset.armed = "true"
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                element.dataset.inView = "true"
                observer.disconnect()
            },
            { threshold: 0.3 },
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    )
}
