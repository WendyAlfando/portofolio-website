"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

export default function Education() {
    const { t } = useTranslation();

    const education = [
        {
            degree: t('edu-degree'),
            school: "Bina Nusantara University (BINUS)",
            period: "2021 - 2025",
            location: "Jakarta, Indonesia",
            gpa: "3.91 / 4.00",
            honor: "Summa Cum Laude",
            description: t('edu-description'),
            achievements: [
                t('edu-achievement1'),
                t('edu-achievement2'),
                t('edu-achievement3'),
            ]
        }
    ];

    return (
        <section id="education" className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-playfair text-slate-900 dark:text-white">
                        {t('edu-title')}
                    </h2>
                    <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        {t('edu-subtitle')}
                    </p>
                </motion.div>

                {/* Education Card */}
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative bg-white dark:bg-slate-800/50 rounded-2xl p-8 md:p-10 shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden"
                    >
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="relative grid md:grid-cols-3 gap-8">
                            {/* Left Column - Main Info */}
                            <div className="md:col-span-2 space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl shrink-0">
                                        <GraduationCap size={28} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mt-1">
                                            {edu.school}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={16} />
                                        {edu.period}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={16} />
                                        {edu.location}
                                    </span>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {edu.description}
                                </p>

                                {/* Achievements */}
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                        {t('edu-achievements-title')}
                                    </h4>
                                    <ul className="space-y-2">
                                        {edu.achievements.map((achievement, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + i * 0.1 }}
                                                className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm"
                                            >
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                                                {achievement}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Column - Stats */}
                            <div className="flex flex-col items-center justify-center gap-6">
                                {/* GPA Card */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, type: "spring" }}
                                    className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 rounded-2xl w-full border border-blue-100 dark:border-blue-500/20"
                                >
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">GPA</p>
                                    <p className="text-4xl font-bold text-slate-900 dark:text-white font-playfair">
                                        {edu.gpa}
                                    </p>
                                </motion.div>

                                {/* Honor Card */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-500/10 dark:to-yellow-600/10 rounded-2xl w-full border border-yellow-100 dark:border-yellow-500/20"
                                >
                                    <Award size={32} className="text-yellow-500 mx-auto mb-2" />
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                                        {edu.honor}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
