"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export default function CustomCursor() {
    const [isTouchDevice, setIsTouchDevice] = useState(true) // assume touch until proven otherwise
    const [isHovering, setIsHovering] = useState(false)
    const [isHidden, setIsHidden] = useState(true)

    const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 })

    useEffect(() => {
        // Check if it's a touch device
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            setIsTouchDevice(false)
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            if (isHidden) setIsHidden(false)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null

            setIsHovering(isClickable)
        }

        const handleMouseLeave = () => {
            setIsHidden(true)
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseover", handleMouseOver)
        document.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseover", handleMouseOver)
            document.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [cursorX, cursorY, isHidden])

    if (isTouchDevice) return null

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-blue-500 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
            />
        </>
    )
}
