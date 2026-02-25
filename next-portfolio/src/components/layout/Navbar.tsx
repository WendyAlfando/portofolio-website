"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/TranslationContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const { t, currentLang, toggleLang } = useTranslation();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t("nav-about"), href: "#about" },
        { name: t("nav-experience"), href: "#experience" },
        { name: t("nav-projects"), href: "#projects" },
        { name: t("nav-skills"), href: "#skills" },
        { name: t("nav-testimonials"), href: "#testimonials" },
        { name: t("nav-contact"), href: "#contact" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="font-playfair text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                        WA.
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`transition-colors font-medium text-sm ${scrolled
                                    ? "text-white hover:text-yellow-400"
                                    : "text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-yellow-400"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className={`flex items-center gap-3 ml-4 border-l pl-4 ${scrolled ? "border-white/20" : "border-slate-300 dark:border-white/20"}`}>
                            {/* Language Toggle Placeholder */}
                            {mounted && (
                                <button
                                    onClick={toggleLang}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all font-bold text-sm ${scrolled
                                        ? "bg-white/10 hover:bg-white/20 text-white"
                                        : "bg-slate-100/80 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white"
                                        }`}
                                >
                                    {currentLang === "id" ? "ID" : "US"}
                                </button>
                            )}

                            {/* Theme Toggle */}
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${scrolled
                                        ? "bg-white/10 hover:bg-white/20 text-yellow-400"
                                        : "bg-slate-100/80 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-blue-500 dark:text-yellow-400"
                                        }`}
                                >
                                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 ${scrolled ? "text-white" : "text-slate-900 dark:text-white"}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="py-4 border-b border-white/10 text-white text-lg font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex items-center gap-4 mt-8 justify-center">
                        {mounted && (
                            <button
                                onClick={toggleLang}
                                className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-white font-bold"
                            >
                                {currentLang === "id" ? "ID" : "US"}
                            </button>
                        )}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-yellow-400"
                            >
                                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
