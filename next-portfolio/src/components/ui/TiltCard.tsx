"use client"

import { useRef } from "react"

/**
 * Tilts toward the mouse in 3D with a soft glare that follows the pointer (styles in globals.css).
 * Mouse only: touch and reduced-motion visitors get a flat card.
 */
export default function TiltCard({ children, className = "", max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
    const frame = useRef(0)

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (event.pointerType !== "mouse" || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return
        const card = event.currentTarget
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        cancelAnimationFrame(frame.current)
        frame.current = requestAnimationFrame(() => {
            card.style.setProperty("--rx", `${((0.5 - y) * max).toFixed(2)}deg`)
            card.style.setProperty("--ry", `${((x - 0.5) * max).toFixed(2)}deg`)
            card.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`)
            card.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`)
            card.dataset.tilting = "true"
        })
    }

    function handlePointerLeave(event: React.PointerEvent<HTMLDivElement>) {
        cancelAnimationFrame(frame.current)
        const card = event.currentTarget
        card.style.setProperty("--rx", "0deg")
        card.style.setProperty("--ry", "0deg")
        delete card.dataset.tilting
    }

    return (
        <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className={`tilt-card ${className}`}>
            {children}
        </div>
    )
}
