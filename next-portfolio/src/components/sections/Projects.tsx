"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/context/TranslationContext"

interface Project {
    id: string
    category: "all" | "rpa" | "testing" | "systems"
    icon: string
    titleKey: any // using any for TranslationKey ease here
    roleLabelKey: any
    roleKey: any
    analysisLabelKey: any
    analysisKey: any
    resultLabelKey: any
    resultKey: any
    metric1Value: string
    metric1Key: any
    metric2Value: string
    metric2Key: any
}

const projectsData: Project[] = [
    {
        id: "p1",
        category: "rpa",
        icon: "🤖",
        titleKey: "project1-title",
        roleLabelKey: "project1-role-label",
        roleKey: "project1-role",
        analysisLabelKey: "project1-analysis-label",
        analysisKey: "project1-analysis",
        resultLabelKey: "project1-result-label",
        resultKey: "project1-result",
        metric1Value: "5+",
        metric1Key: "project1-metric1",
        metric2Value: "-70%",
        metric2Key: "project1-metric2",
    },
    {
        id: "p2",
        category: "testing",
        icon: "🔍",
        titleKey: "project2-title",
        roleLabelKey: "project2-scope-label",
        roleKey: "project2-scope",
        analysisLabelKey: "project2-approach-label",
        analysisKey: "project2-approach",
        resultLabelKey: "project2-result-label",
        resultKey: "project2-result",
        metric1Value: "95%",
        metric1Key: "project2-metric1",
        metric2Value: "+30%",
        metric2Key: "project2-metric2",
    },
    {
        id: "p3",
        category: "systems",
        icon: "🌐",
        titleKey: "project3-title",
        roleLabelKey: "project3-scope-label",
        roleKey: "project3-scope",
        analysisLabelKey: "project3-approach-label",
        analysisKey: "project3-approach",
        resultLabelKey: "project3-result-label",
        resultKey: "project3-result",
        metric1Value: "100%",
        metric1Key: "project3-metric1",
        metric2Value: "Zero",
        metric2Key: "project3-metric2",
    },
    {
        id: "p4",
        category: "testing",
        icon: "📋",
        titleKey: "project4-title",
        roleLabelKey: "project4-scope-label",
        roleKey: "project4-scope",
        analysisLabelKey: "project4-approach-label",
        analysisKey: "project4-approach",
        resultLabelKey: "project4-result-label",
        resultKey: "project4-result",
        metric1Value: "95%",
        metric1Key: "project4-metric1",
        metric2Value: "+25%",
        metric2Key: "project4-metric2",
    },
    {
        id: "p5",
        category: "systems",
        icon: "🤝",
        titleKey: "project5-title",
        roleLabelKey: "project5-scope-label",
        roleKey: "project5-scope",
        analysisLabelKey: "project5-approach-label",
        analysisKey: "project5-approach",
        resultLabelKey: "project5-result-label",
        resultKey: "project5-result",
        metric1Value: "+30%",
        metric1Key: "project5-metric1",
        metric2Value: "CRM",
        metric2Key: "project5-metric2",
    },
    {
        id: "p6",
        category: "rpa",
        icon: "📊",
        titleKey: "project6-title",
        roleLabelKey: "project6-scope-label",
        roleKey: "project6-scope",
        analysisLabelKey: "project6-approach-label",
        analysisKey: "project6-approach",
        resultLabelKey: "project6-result-label",
        resultKey: "project6-result",
        metric1Value: "10+",
        metric1Key: "project6-metric1",
        metric2Value: "100%",
        metric2Key: "project6-metric2",
    }
]

export default function Projects() {
    const { t } = useTranslation()
    const [filter, setFilter] = useState<"all" | "rpa" | "testing" | "systems">("all")

    const filteredProjects = projectsData.filter(
        (p) => filter === "all" || p.category === filter
    )

    const filters = [
        { id: "all", label: "filter-all" },
        { id: "rpa", label: "filter-rpa" },
        { id: "testing", label: "filter-testing" },
        { id: "systems", label: "filter-systems" },
    ]

    return (
        <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900/50">
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
                        {t('projects-title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10"
                    >
                        {t('projects-subtitle')}
                    </motion.p>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id as any)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === f.id
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 -translate-y-1"
                                    : "bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {t(f.label as any)}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} t={t} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

function ProjectCard({ project, t }: { project: Project; t: any }) {
    // Setup mouse tracking for the 3D Tilt effect
    const [rx, setRx] = useState(0)
    const [ry, setRy] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const maxRotation = 15 // maximum degrees
        const rY = ((mouseX / width) - 0.5) * maxRotation
        const rX = ((mouseY / height) - 0.5) * -maxRotation

        setRy(rY)
        setRx(rX)
    }

    const handleMouseLeave = () => {
        setRx(0)
        setRy(0)
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            // Apply 3D perspective to parent
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX: rx, rotateY: ry }}
                transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
                className="h-full bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 flex flex-col items-start gap-4 transition-shadow hover:shadow-2xl"
            >
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                    {project.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                    {t(project.titleKey)}
                </h3>

                <div className="flex-1 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>
                        <strong className="text-slate-900 dark:text-slate-100">{t(project.roleLabelKey)}</strong> {t(project.roleKey)}
                    </p>
                    <p>
                        <strong className="text-slate-900 dark:text-slate-100">{t(project.analysisLabelKey)}</strong> {t(project.analysisKey)}
                    </p>
                    <p>
                        <strong className="text-slate-900 dark:text-slate-100">{t(project.resultLabelKey)}</strong> {t(project.resultKey)}
                    </p>
                </div>

                <div className="flex w-full mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex-1">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{project.metric1Value}</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t(project.metric1Key)}</div>
                    </div>
                    <div className="flex-1 border-l border-slate-100 dark:border-slate-700 pl-4">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{project.metric2Value}</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t(project.metric2Key)}</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
