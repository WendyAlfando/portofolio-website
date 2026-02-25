"use client"

import { motion } from "framer-motion"
import { useTranslation } from "@/context/TranslationContext"

interface Skill {
    name: string;
    percentage: number;
}

interface SkillCategory {
    title: string;
    icon: string;
    skills: Skill[];
}

const skillsData: SkillCategory[] = [
    {
        title: "Data Analysis",
        icon: "📊",
        skills: [
            { name: "Power BI", percentage: 90 },
            { name: "SQL", percentage: 85 },
            { name: "Excel Advanced", percentage: 95 },
            { name: "Python", percentage: 75 },
            { name: "RPA Tools", percentage: 80 },
        ]
    },
    {
        title: "Process Analysis",
        icon: "🔄",
        skills: [
            { name: "Business Process Mapping", percentage: 88 },
            { name: "Requirements Gathering", percentage: 92 },
            { name: "Gap Analysis", percentage: 85 },
            { name: "Process Optimization", percentage: 87 },
            { name: "Quality Assurance & Testing", percentage: 85 },
        ]
    },
    {
        title: "Soft Skills",
        icon: "🤝",
        skills: [
            { name: "Leadership", percentage: 90 },
            { name: "Problem Solving", percentage: 95 },
            { name: "Communication", percentage: 88 },
            { name: "Teamwork", percentage: 92 },
            { name: "Time Management", percentage: 85 },
        ]
    }
]

export default function Skills() {
    const { t } = useTranslation()

    return (
        <section id="skills" className="py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold font-playfair mb-4 text-slate-900 dark:text-white"
                    >
                        {t('skills-title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        {t('skills-subtitle')}
                    </motion.p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                                <span className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-2xl">
                                    {category.icon}
                                </span>
                                {category.title}
                            </h3>

                            <div className="space-y-6">
                                {category.skills.map((skill, sIdx) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                {skill.name}
                                            </span>
                                            <span className="text-blue-600 dark:text-blue-400 font-bold">
                                                {skill.percentage}%
                                            </span>
                                        </div>
                                        <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.percentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.3 + (sIdx * 0.1), ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full relative"
                                            >
                                                {/* Glowing Tip */}
                                                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 rounded-full blur-[2px]" />
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
