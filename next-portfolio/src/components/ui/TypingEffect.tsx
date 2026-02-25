"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingEffectProps {
    words: string[];
    className?: string;
}

export default function TypingEffect({ words, className = "" }: TypingEffectProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const type = useCallback(() => {
        const currentWord = words[currentWordIndex];

        if (!isDeleting) {
            // Typing
            setCurrentText(currentWord.substring(0, currentText.length + 1));

            if (currentText === currentWord) {
                // Wait before deleting
                setTimeout(() => setIsDeleting(true), 2000);
                return;
            }
        } else {
            // Deleting
            setCurrentText(currentWord.substring(0, currentText.length - 1));

            if (currentText === "") {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                return;
            }
        }
    }, [currentText, currentWordIndex, isDeleting, words]);

    useEffect(() => {
        const speed = isDeleting ? 50 : 100;
        const timer = setTimeout(type, speed);
        return () => clearTimeout(timer);
    }, [type, isDeleting]);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={currentText}
                className={className}
            >
                {currentText}
                <span className="animate-pulse text-yellow-400">|</span>
            </motion.span>
        </AnimatePresence>
    );
}
