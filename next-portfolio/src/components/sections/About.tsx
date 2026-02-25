"use client"

import { motion } from "framer-motion"
import { useTranslation } from "@/context/TranslationContext"
import { Award, Briefcase, TrendingUp, Users } from "lucide-react"

export default function About() {
    const { t } = useTranslation()

    const stats = [
        {
            icon: <Briefcase className="w-6 h-6 text-blue-500" />,
            count: "1",
            label: t('stat-experience'),
        },
        {
            icon: <Award className="w-6 h-6 text-yellow-500" />,
            count: "12",
            label: t('stat-projects'),
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
            count: "25",
            label: t('stat-efficiency'),
        },
        {
            icon: <Users className="w-6 h-6 text-purple-500" />,
            count: "15",
            label: t('stat-clients'),
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    return (
        <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold font-playfair mb-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent"
                    >
                        {t('about-title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        {t('about-subtitle')}
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: About Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300"
                    >
                        {t('about-description').split('. ').map((sentence, idx) => (
                            <p key={idx} className="mb-4 leading-relaxed">
                                {sentence}{idx !== t('about-description').split('. ').length - 1 ? '.' : ''}
                            </p>
                        ))}
                    </motion.div>

                    {/* Right: Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                                        {stat.count}
                                        <span className="text-blue-500">+</span>
                                    </span>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                        {stat.icon}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-tight">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
