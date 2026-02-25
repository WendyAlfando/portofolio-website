"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [isFontReady, setIsFontReady] = useState(false);

    useEffect(() => {
        // Wait for fonts to load before showing the logo
        if (document.fonts) {
            document.fonts.ready.then(() => {
                setIsFontReady(true);
            });
        } else {
            // Fallback if document.fonts not available
            setTimeout(() => setIsFontReady(true), 300);
        }

        // Fade out loading screen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
                >
                    {/* Subtle animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />

                    {/* Pulsing glow behind logo */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"
                    />

                    <div className="relative flex flex-col items-center gap-8">
                        {/* Logo - only show when font is ready */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isFontReady ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                            transition={{
                                duration: 0.7,
                                type: "spring",
                                stiffness: 150,
                                damping: 15
                            }}
                            className="text-6xl md:text-7xl font-playfair font-bold text-yellow-400"
                        >
                            WA.
                        </motion.div>

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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isFontReady ? 0.5 : 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="text-slate-500 text-xs tracking-[0.3em] uppercase"
                        >
                            Portfolio
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
