"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

type Language = "id" | "en";
type TranslationKey = keyof typeof translations.id;

interface TranslationContextType {
    currentLang: Language;
    toggleLang: () => void;
    t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
    const [currentLang, setCurrentLang] = useState<Language>("id");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("language");
        if (saved === "en" || saved === "id") {
            setCurrentLang(saved);
            document.documentElement.lang = saved;
        }
    }, []);

    const toggleLang = () => {
        const newLang = currentLang === "id" ? "en" : "id";
        setCurrentLang(newLang);
        localStorage.setItem("language", newLang);
        document.documentElement.lang = newLang;
    };

    const t = (key: TranslationKey): string => {
        // Fallback to "id" during SSR to avoid hydration mismatch while still providing translations
        const langToUse = mounted ? currentLang : "id";
        return translations[langToUse]?.[key] || key;
    };

    return (
        <TranslationContext.Provider value={{ currentLang, toggleLang, t }}>
            {/* Delay rendering children heavily dependent on translations until mounted if needed, but provide context immediately */}
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within a TranslationProvider");
    }
    return context;
}
