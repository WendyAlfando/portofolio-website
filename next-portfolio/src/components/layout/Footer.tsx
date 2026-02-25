"use client"

import { useTranslation } from "@/context/TranslationContext"
import { Linkedin, Mail, MessageCircle } from "lucide-react"

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

                    {/* Brand & Social */}
                    <div className="lg:col-span-6">
                        <h3 className="text-3xl font-bold font-playfair text-white mb-4">
                            Wendy Alfando
                        </h3>
                        <p className="text-slate-400 mb-8 max-w-sm">
                            {t('footer-tagline')}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/wendyalfando"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://wa.me/6287771365529"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                                <MessageCircle size={20} />
                            </a>
                            <a
                                href="mailto:wendyalfando02@gmail.com"
                                className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">
                            {t('footer-navigation')}
                        </h4>
                        <ul className="space-y-4">
                            <li><a href="#about" className="hover:text-blue-400 transition-colors">{t('nav-about')}</a></li>
                            <li><a href="#experience" className="hover:text-blue-400 transition-colors">{t('nav-experience')}</a></li>
                            <li><a href="#projects" className="hover:text-blue-400 transition-colors">{t('nav-projects')}</a></li>
                        </ul>
                    </div>

                    {/* Services/Quick Links */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">
                            {t('footer-services')}
                        </h4>
                        <ul className="space-y-4">
                            <li><a href="#skills" className="hover:text-blue-400 transition-colors">{t('nav-skills')}</a></li>
                            {/* <li><a href="#testimonials" className="hover:text-blue-400 transition-colors">{t('nav-testimonials')}</a></li> */}
                            <li><a href="#contact" className="hover:text-blue-400 transition-colors">{t('nav-contact')}</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Wendy Alfando Portfolio. {t('footer-rights')}</p>
                    <p className="mt-4 md:mt-0">
                        {t('footer-made-with')} 🚀
                    </p>
                </div>
            </div>
        </footer>
    )
}
