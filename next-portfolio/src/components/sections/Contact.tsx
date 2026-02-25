"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "@/context/TranslationContext"
import { Mail, MessageCircle, MapPin, Send, Loader2 } from "lucide-react"

export default function Contact() {
    const { t } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("idle")

        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch("https://formspree.io/f/mqazqozk", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            })

            if (response.ok) {
                setSubmitStatus("success")
                    ; (e.target as HTMLFormElement).reset()
            } else {
                setSubmitStatus("error")
            }
        } catch (error) {
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus("idle"), 5000)
        }
    }

    return (
        <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900/50">
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
                        {t('contact-title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        {t('contact-subtitle')}
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.a
                            href="mailto:wendyalfando02@gmail.com"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md hover:-translate-y-1 transition-all group"
                        >
                            <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-500 tracking-wider uppercase mb-1">{t('contact-email')}</h4>
                                <p className="text-slate-900 dark:text-white font-medium">wendyalfando02@gmail.com</p>
                            </div>
                        </motion.a>

                        <motion.a
                            href="https://wa.me/6287771365529?text=Halo%20Wendy%2C%20saya%20tertarik%20diskusi."
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md hover:-translate-y-1 transition-all group"
                        >
                            <div className="w-14 h-14 bg-emerald-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-500 tracking-wider uppercase mb-1">{t('contact-whatsapp')}</h4>
                                <p className="text-slate-900 dark:text-white font-medium">+62 877-7136-5529</p>
                            </div>
                        </motion.a>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 group"
                        >
                            <div className="w-14 h-14 bg-purple-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-500 tracking-wider uppercase mb-1">{t('contact-location')}</h4>
                                <p className="text-slate-900 dark:text-white font-medium">{t('contact-location-value')}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700"
                    >
                        <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white mb-8">
                            {t('contact-form-title')}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {t('contact-form-name')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {t('contact-form-email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {t('contact-form-message')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y text-slate-900 dark:text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        <span>{t('contact-form-submit')}</span>
                                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {submitStatus === "success" && (
                                <p className="text-emerald-500 text-sm font-medium text-center">Pesan berhasil dikirim!</p>
                            )}
                            {submitStatus === "error" && (
                                <p className="text-red-500 text-sm font-medium text-center">Terjadi kesalahan, coba lagi.</p>
                            )}
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
