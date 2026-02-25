"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/context/TranslationContext"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
    {
        id: 1,
        content: "Analisis yang dilakukan sangat mendalam dan actionable. Rekomendasi yang diberikan berhasil meningkatkan efisiensi operasional kami secara signifikan. Sangat profesional dan detail dalam setiap laporan.",
        contentEn: "The analysis provided was deep and actionable. The recommendations given managed to significantly increase our operational efficiency. Highly professional and detailed in every report.",
        author: "John Doe",
        role: "CEO, Tech Solutions Inc.",
        initials: "JD",
        color: "bg-blue-500"
    },
    {
        id: 2,
        content: "Kemampuan untuk menerjemahkan data kompleks menjadi insight bisnis yang mudah dipahami sangat luar biasa. Dashboard yang dibuat membantu kami mengambil keputusan lebih cepat dan tepat.",
        contentEn: "The ability to translate complex data into easily understandable business insights is extraordinary. The dashboards created helped us make faster and more accurate decisions.",
        author: "Sarah Anderson",
        role: "Operations Manager, Global Corp",
        initials: "SA",
        color: "bg-emerald-500"
    },
    {
        id: 3,
        content: "Proyek optimasi yang dikerjakan berhasil menghemat biaya operasional hingga 30%. Pendekatan yang sistematis dan komunikasi yang jelas membuat kolaborasi berjalan sangat lancar.",
        contentEn: "The optimization project resulted in a 30% saving on operational costs. The systematic approach and clear communication made the collaboration run very smoothly.",
        author: "Michael Rodriguez",
        role: "Finance Director, Retail Plus",
        initials: "MR",
        color: "bg-purple-500"
    }
]

export default function Testimonials() {
    const { t, currentLang } = useTranslation()
    const [currentIndex, setCurrentIndex] = useState(0)

    const slideLeft = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    }

    const slideRight = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }

    return (
        <section id="testimonials" className="py-24 bg-slate-900 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold font-playfair mb-4 text-white"
                    >
                        {t('testimonials-title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto"
                    >
                        {t('testimonials-subtitle')}
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Slider Container */}
                    <div className="overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl relative">
                        <Quote className="absolute top-8 left-8 w-16 h-16 text-slate-700/50 rotate-180 -z-10" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="flex flex-col items-center text-center gap-8"
                            >
                                <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed font-playfair italic">
                                    "{currentLang === 'id' ? testimonials[currentIndex].content : testimonials[currentIndex].contentEn}"
                                </p>

                                <div className="flex flex-col items-center gap-4">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg ${testimonials[currentIndex].color}`}>
                                        {testimonials[currentIndex].initials}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{testimonials[currentIndex].author}</h4>
                                        <p className="text-slate-400 text-sm">{testimonials[currentIndex].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={slideLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-1/2 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform border border-slate-200"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={slideRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-1/2 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform border border-slate-200"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-8 bg-blue-500" : "w-2 bg-slate-400 dark:bg-slate-600 hover:bg-slate-500 dark:hover:bg-slate-500"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
