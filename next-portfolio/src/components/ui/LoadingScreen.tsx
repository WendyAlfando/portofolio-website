"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Wait for fonts to fully load before rendering text
        const showLogo = async () => {
            try {
                await document.fonts.ready;
            } catch {
                // Fallback wait
                await new Promise(r => setTimeout(r, 300));
            }
            setShowContent(true);
        };

        showLogo();

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
                >
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />

                    {/* Pulsing glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"
                    />

                    {/* Only render text content AFTER fonts are loaded */}
                    {showContent && (
                        <div className="relative flex flex-col items-center gap-8">
                            {/* Logo with gradient */}
                            <motion.h1
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: 0.6,
                                    type: "spring",
                                    stiffness: 180,
                                    damping: 14
                                }}
                                className="text-6xl md:text-7xl font-playfair font-bold"
                                style={{
                                    background: "linear-gradient(to right, #FACC15, #FDE68A)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                WA.
                            </motion.h1>

                            {/* Loading bar */}
                            <div className="w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full bg-gradient-to-r from-yellow-400 to-blue-400 rounded-full"
                                />
                            </div>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 0.5, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-slate-500 text-xs tracking-[0.3em] uppercase"
                            >
                                Portfolio
                            </motion.p>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
