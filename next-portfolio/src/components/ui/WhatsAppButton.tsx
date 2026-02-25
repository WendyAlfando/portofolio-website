"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const phoneNumber = "6287771365529";
    const message = encodeURIComponent("Halo Wendy, saya tertarik untuk berdiskusi mengenai...");

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Show tooltip after button appears
    useEffect(() => {
        if (isVisible) {
            const tooltipTimer = setTimeout(() => {
                setShowTooltip(true);
                // Hide tooltip after 5 seconds
                setTimeout(() => setShowTooltip(false), 5000);
            }, 1500);
            return () => clearTimeout(tooltipTimer);
        }
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    className="fixed bottom-6 left-6 z-50 flex items-end gap-3"
                >
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="relative bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl shadow-lg text-sm max-w-[200px]"
                            >
                                <button
                                    onClick={() => setShowTooltip(false)}
                                    className="absolute -top-2 -right-2 w-5 h-5 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center"
                                >
                                    <X size={10} />
                                </button>
                                Ada pertanyaan? Chat via WhatsApp! 👋
                                <div className="absolute -left-2 bottom-3 w-3 h-3 bg-white dark:bg-slate-800 rotate-45" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* WhatsApp Button */}
                    <a
                        href={`https://wa.me/${phoneNumber}?text=${message}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-110 active:scale-95"
                        aria-label="Chat via WhatsApp"
                    >
                        <MessageCircle size={26} className="group-hover:rotate-12 transition-transform" />
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
