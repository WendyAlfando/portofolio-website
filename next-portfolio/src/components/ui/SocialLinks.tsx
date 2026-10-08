import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { profile } from "@/content/profile"

const links = [
    { label: "LinkedIn", href: profile.linkedin, icon: Linkedin, external: true },
    { label: "GitHub", href: profile.github, icon: Github, external: true },
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false },
    { label: "WhatsApp", href: profile.whatsapp, icon: MessageCircle, external: true },
]

export default function SocialLinks({ label, className = "" }: { label: string; className?: string }) {
    return (
        <ul aria-label={label} className={`flex items-center gap-2 ${className}`}>
            {links.map(({ label: name, href, icon: Icon, external }) => (
                <li key={name}>
                    <a
                        href={href}
                        aria-label={name}
                        title={name}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-blue-500/50 hover:text-blue-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-blue-400/50 dark:hover:text-blue-400"
                    >
                        <Icon className="size-[18px]" aria-hidden />
                    </a>
                </li>
            ))}
        </ul>
    )
}
