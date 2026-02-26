"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-blue-500/30 px-6 overflow-hidden">
            {/* Floating background shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="relative text-center">
                {/* Glitch-style 404 */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
                    className="relative mb-6"
                >
                    <h1 className="text-[10rem] md:text-[14rem] font-bold font-playfair leading-none select-none"
                        style={{
                            background: "linear-gradient(135deg, #3B82F6, #FACC15)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        404
                    </h1>
                    {/* Shadow of 404 */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-full blur-xl" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-2xl md:text-3xl font-bold mb-4"
                >
                    Halaman Tidak Ditemukan
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10 text-lg leading-relaxed"
                >
                    Maaf, halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan atau dihapus.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20 dark:shadow-white/10 group"
                    >
                        <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                        Kembali ke Beranda
                    </Link>
                    <button
                        onClick={() => typeof window !== 'undefined' && window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Halaman Sebelumnya
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
