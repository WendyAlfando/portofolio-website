"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
}

const LINK_DISTANCE = 130
const POINTER_RADIUS = 110

/**
 * Drifting dots linked by faint lines that move away from the mouse. Kept cheap: at most 80 particles,
 * paused while off screen, sharp on high-density displays, and drawn once without motion for reduced motion.
 */
export default function ParticleBackground({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const colorRef = useRef("255, 255, 255")
    const redrawRef = useRef<() => void>(() => {})
    const { resolvedTheme } = useTheme()

    // A theme change only swaps the colour, so the particles keep their positions
    useEffect(() => {
        colorRef.current = resolvedTheme === "light" ? "15, 23, 42" : "255, 255, 255"
        redrawRef.current()
    }, [resolvedTheme])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext("2d")
        if (!canvas || !context) return

        const animate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches
        const pointer = { x: -1000, y: -1000 }
        let width = 0
        let height = 0
        let particles: Particle[] = []
        let frame = 0
        let visible = true

        const draw = () => {
            const color = colorRef.current
            context.clearRect(0, 0, width, height)
            context.lineWidth = 1
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const distance = Math.hypot(dx, dy)
                    if (distance >= LINK_DISTANCE) continue
                    context.strokeStyle = `rgba(${color}, ${0.16 * (1 - distance / LINK_DISTANCE)})`
                    context.beginPath()
                    context.moveTo(particles[a].x, particles[a].y)
                    context.lineTo(particles[b].x, particles[b].y)
                    context.stroke()
                }
            }
            context.fillStyle = `rgba(${color}, 0.5)`
            for (const particle of particles) {
                context.beginPath()
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                context.fill()
            }
        }
        redrawRef.current = draw

        const step = () => {
            for (const particle of particles) {
                const dx = particle.x - pointer.x
                const dy = particle.y - pointer.y
                const distance = Math.hypot(dx, dy)
                if (distance < POINTER_RADIUS && distance > 0) {
                    const push = (1 - distance / POINTER_RADIUS) * 2
                    particle.x += (dx / distance) * push
                    particle.y += (dy / distance) * push
                }
                particle.x += particle.vx
                particle.y += particle.vy
                if (particle.x < 0 || particle.x > width) particle.vx *= -1
                if (particle.y < 0 || particle.y > height) particle.vy *= -1
            }
            draw()
            frame = requestAnimationFrame(step)
        }

        const start = () => {
            if (animate && visible && !frame) frame = requestAnimationFrame(step)
        }
        const stop = () => {
            cancelAnimationFrame(frame)
            frame = 0
        }

        const resize = () => {
            const rect = canvas.getBoundingClientRect()
            const ratio = Math.min(window.devicePixelRatio || 1, 2)
            width = rect.width
            height = rect.height
            canvas.width = Math.round(width * ratio)
            canvas.height = Math.round(height * ratio)
            context.setTransform(ratio, 0, 0, ratio, 0, 0)
            const count = Math.min(80, Math.round((width * height) / 14000))
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 0.8,
            }))
            draw()
        }

        const handlePointerMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            pointer.x = event.clientX - rect.left
            pointer.y = event.clientY - rect.top
        }
        const handlePointerLeave = () => {
            pointer.x = -1000
            pointer.y = -1000
        }

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas)
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (visible) start()
            else stop()
        })
        visibilityObserver.observe(canvas)
        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", handlePointerLeave)

        return () => {
            stop()
            resizeObserver.disconnect()
            visibilityObserver.disconnect()
            window.removeEventListener("pointermove", handlePointerMove)
            document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
            redrawRef.current = () => {}
        }
    }, [])

    return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none ${className}`} />
}
