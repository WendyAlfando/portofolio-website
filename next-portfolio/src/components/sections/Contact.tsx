import { Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import { profile } from "@/content/profile"
import type { Dictionary } from "@/content/types"
import ContactForm from "./ContactForm"

export default function Contact({ dict }: { dict: Dictionary }) {
    const { contact } = dict
    const channels = [
        { icon: Mail, label: contact.channels.email, value: profile.email, href: `mailto:${profile.email}` },
        {
            icon: MessageCircle,
            label: contact.channels.whatsapp,
            value: profile.phone,
            href: `${profile.whatsapp}?text=${encodeURIComponent(contact.whatsappGreeting)}`,
            external: true,
        },
        { icon: Linkedin, label: contact.channels.linkedin, value: "in/wendyalfando", href: profile.linkedin, external: true },
        { icon: Github, label: contact.channels.github, value: "WendyAlfando", href: profile.github, external: true },
        { icon: MapPin, label: contact.channels.location, value: contact.locationValue },
    ]

    return (
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="reveal grid overflow-hidden rounded-3xl border border-slate-200 bg-white lg:grid-cols-[1fr_1.15fr] dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="p-6 sm:p-8 md:p-12">
                        <SectionHeading
                            index={7}
                            eyebrow={contact.eyebrow}
                            title={contact.title}
                            subtitle={contact.subtitle}
                            titleId="contact-title"
                        />

                        <ul className="mt-8 space-y-2">
                            {channels.map(({ icon: Icon, label, value, href, external }) => {
                                const content = (
                                    <>
                                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:text-blue-400 dark:group-hover:text-white">
                                            <Icon className="size-5" aria-hidden />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-400">
                                                {label}
                                            </span>
                                            <span className="block truncate font-medium text-slate-900 dark:text-white">{value}</span>
                                        </span>
                                    </>
                                )
                                return (
                                    <li key={label}>
                                        {href ? (
                                            <a
                                                href={href}
                                                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className="group -mx-2 flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                                            >
                                                {content}
                                            </a>
                                        ) : (
                                            <div className="-mx-2 flex items-center gap-4 p-2">{content}</div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="border-t border-slate-200 bg-slate-50/80 p-6 sm:p-8 md:p-12 lg:border-t-0 lg:border-l dark:border-white/10 dark:bg-slate-900/40">
                        <ContactForm endpoint={profile.contactEndpoint} labels={contact.form} />
                    </div>
                </div>
            </div>
        </section>
    )
}
