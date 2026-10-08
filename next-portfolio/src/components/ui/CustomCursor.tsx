"use client"

import { useEffect, useRef } from "react"

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary"

/**
 * A small dot that trails the mouse and grows over links and buttons. The normal cursor stays visible.
 * Only for a mouse on desktop, and off with reduced motion.
 */
export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dot = dotRef.current
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
        const animate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches
        if (!dot || !finePointer || !animate) return

        let x = 0
        let y = 0
        let scale = 1
        let targetX = 0
        let targetY = 0
        let targetScale = 1
        let frame = 0

        // Eases toward the pointer and stops scheduling frames once it has caught up
        const render = () => {
            x += (targetX - x) * 0.25
            y += (targetY - y) * 0.25
            scale += (targetScale - scale) * 0.2
            dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
            const settled = Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1 && Math.abs(targetScale - scale) < 0.01
            frame = settled ? 0 : requestAnimationFrame(render)
        }

        const handlePointerMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return
            targetX = event.clientX
            targetY = event.clientY
            if (!dot.dataset.visible) {
                x = targetX
                y = targetY
                dot.dataset.visible = "true"
            }
            const target = event.target instanceof Element ? event.target : null
            targetScale = target?.closest(INTERACTIVE) ? 2.5 : 1
            if (!frame) frame = requestAnimationFrame(render)
        }
        const handlePointerLeave = () => {
            delete dot.dataset.visible
        }

        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", handlePointerLeave)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("pointermove", handlePointerMove)
            document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
        }
    }, [])

    return (
        <div
            ref={dotRef}
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-[90] size-4 rounded-full bg-blue-500 opacity-0 mix-blend-difference transition-opacity duration-200 data-[visible=true]:opacity-100"
        />
    )
}
