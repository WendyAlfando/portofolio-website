"use client"

import { motion } from "framer-motion"
import { useTranslation } from "@/context/TranslationContext"
import { Briefcase } from "lucide-react"

export default function Experience() {
    const { t } = useTranslation()

    const experiences = [
        {
            titleKey: 'timeline-job1-title',
            dateKey: 'timeline-job1-date',
            descKey: 'timeline-job1-desc',
        },
        {
            titleKey: 'timeline-job2-title',
            dateKey: 'timeline-job2-date',
            descKey: 'timeline-job2-desc',
        },
        {
            titleKey: 'timeline-job3-title',
            dateKey: 'timeline-job3-date',
            descKey: 'timeline-job3-desc',
        },
        {
            titleKey: 'timeline-job4-title',
            dateKey: 'timeline-job4-date',
            descKey: 'timeline-job4-desc',
        }
    ] as const

    return (
        <section id="experience" className="py-24 bg-white dark:bg-slate-900 relative">
            <div className="max-w-5xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold font-playfair mb-4 text-slate-900 dark:text-white"
                    >
                        {t('experience-title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        {t('experience-subtitle')}
                    </motion.p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Main vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/20 dark:bg-blue-500/30 transform md:-translate-x-1/2" />

                    {experiences.map((exp, index) => {
                        const isLeft = index % 2 === 0
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, x: isLeft ? -50 : 50 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center justify-between mb-12 ${isLeft ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-slate-900 transform -translate-x-1/2 mt-1.5 md:mt-0 z-10" />

                                <div className="w-full md:w-5/12 ml-12 md:ml-0" />

                                {/* Content Card */}
                                <div className="w-full md:w-5/12 ml-12 md:ml-0 group">
                                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                                                <Briefcase size={20} />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                {t(exp.titleKey)}
                                            </h3>
                                        </div>
                                        <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full mb-4">
                                            {t(exp.dateKey)}
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {t(exp.descKey)}
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
