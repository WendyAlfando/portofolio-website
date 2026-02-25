"use client"

import { motion } from "framer-motion"
import { useTranslation } from "@/context/TranslationContext"

interface Item {
    icon: string;
    title: string;
    issuer: string;
    date: string;
}

const orgData: Item[] = [
    {
        icon: "👥",
        title: "Badan Penasihat LDKKA: REVENGER",
        issuer: "HIMSISFO BINUS University",
        date: "June 2023 - January 2024",
    },
    {
        icon: "⚙️",
        title: "Vice Coordinator Equipment LDKCP: PURE",
        issuer: "HIMSISFO BINUS University",
        date: "March 2023 - September 2023",
    },
    {
        icon: "🎯",
        title: "LDKKA Staff Equipment: EONS",
        issuer: "HIMSISFO BINUS University",
        date: "May 2022 - January 2023",
    },
    {
        icon: "🎪",
        title: "Coordinator Equipment DIG IN: EUFORIA",
        issuer: "HIMSISFO BINUS University",
        date: "May 2022 - January 2023",
    }
]

const certData: Item[] = [
    {
        icon: "🐍",
        title: "Python Essentials 1",
        issuer: "Cisco",
        date: "October 2023",
    },
    {
        icon: "🐍",
        title: "Python Essentials 2",
        issuer: "Cisco",
        date: "March 2024",
    },
    {
        icon: "📊",
        title: "Data Analytics Essentials",
        issuer: "Cisco",
        date: "July 2023",
    },
    {
        icon: "🌏",
        title: "ASEAN Data Science Explorers 2023",
        issuer: "ASEAN Foundation & SAP",
        date: "May 2023"
    }
]

export default function Organization() {
    const { t } = useTranslation()

    return (
        <>
            {/* Organization Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-bold font-playfair mb-4 text-slate-900 dark:text-white"
                        >
                            {t('organization-title')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                        >
                            {t('organization-subtitle')}
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {orgData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all"
                            >
                                <div className="text-4xl mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl w-fit">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">
                                    {item.issuer}
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">
                                    {item.date}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-bold font-playfair mb-4 text-slate-900 dark:text-white"
                        >
                            {t('certification-title')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                        >
                            {t('certification-subtitle')}
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all"
                            >
                                <div className="text-4xl mb-4 p-3 bg-white dark:bg-slate-700/50 rounded-xl w-fit shadow-sm">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">
                                    {item.issuer}
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">
                                    {item.date}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
