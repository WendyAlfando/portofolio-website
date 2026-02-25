"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for the page to fully load, then fade out
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
                >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950" />

                    <div className="relative flex flex-col items-center gap-6">
                        {/* Logo */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.6,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                            }}
                            className="text-6xl md:text-7xl font-playfair font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent"
                        >
                            WA.
                        </motion.div>

                        {/* Loading bar */}
                        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full"
                            />
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            className="text-slate-500 text-sm tracking-widest uppercase"
                        >
                            Portfolio
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
