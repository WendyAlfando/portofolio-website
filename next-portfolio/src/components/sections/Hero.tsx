"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslation } from "@/context/TranslationContext"
import ParticleBackground from "@/components/ui/ParticleBackground"
import TypingEffect from "@/components/ui/TypingEffect"
import { ArrowRight, Download, Briefcase } from "lucide-react"

export default function Hero() {
    const { t } = useTranslation()

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Dynamic Particle Background */}
            <ParticleBackground />

            {/* Decorative Gradient Orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Side: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium text-sm w-fit"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        {t('hero-subtitle')}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                        className="text-sm text-blue-500 dark:text-blue-400 font-medium h-6"
                    >
                        <TypingEffect
                            words={[t('typing-word1'), t('typing-word2'), t('typing-word3'), t('typing-word4')]}
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold font-playfair leading-tight text-slate-900 dark:text-white"
                    >
                        <span className="block">Wendy Alfando</span>
                        <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 pb-2 leading-relaxed bg-gradient-to-r from-blue-600 dark:from-blue-400 to-yellow-500 bg-clip-text text-transparent">
                            {t('hero-title')}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
                    >
                        {t('hero-description')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex flex-wrap items-center gap-4 mt-4"
                    >
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20 dark:shadow-white/10 group"
                        >
                            <Briefcase size={20} className="group-hover:-translate-y-1 transition-transform" />
                            {t('btn-portfolio')}
                        </a>

                        <a
                            href="/CV_Wendy_Alfando.pdf"
                            target="_blank"
                            download
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-900/5 dark:hover:bg-white/5 hover:scale-105 active:scale-95 transition-all group"
                        >
                            <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                            {t('btn-cv')}
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Side: Image blending into background */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative lg:ml-auto flex justify-center lg:justify-end"
                >
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative w-[22rem] h-[22rem] md:w-[30rem] md:h-[30rem] group"
                    >
                        {/* Glow behind the photo */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-yellow-500/10 rounded-full blur-3xl scale-110" />

                        {/* Profile image — no border, edges fade to transparent */}
                        <div
                            className="relative w-full h-full"
                            style={{
                                WebkitMaskImage: "radial-gradient(ellipse 75% 80% at 50% 45%, black 40%, transparent 100%)",
                                maskImage: "radial-gradient(ellipse 75% 80% at 50% 45%, black 40%, transparent 100%)",
                            }}
                        >
                            <Image
                                src="/images/Profile.png"
                                alt="Wendy Alfando"
                                fill
                                priority
                                sizes="(max-width: 768px) 352px, 480px"
                                className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
