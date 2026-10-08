import type { Metadata } from "next"
import { notFound } from "next/navigation"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Education from "@/components/sections/Education"
import Experience from "@/components/sections/Experience"
import Hero from "@/components/sections/Hero"
import Organization from "@/components/sections/Organization"
import Projects from "@/components/sections/Projects"
import Skills from "@/components/sections/Skills"
import { getDictionary } from "@/content"
import { profile } from "@/content/profile"
import { isLocale, localePath, type Locale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params
    if (!isLocale(lang)) return {}
    const dict = getDictionary(lang)
    return pageMetadata({ lang, title: dict.meta.title, description: dict.meta.description, absoluteTitle: true })
}

function personJsonLd(lang: Locale) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        url: absoluteUrl(localePath(lang)),
        image: absoluteUrl(profile.photo),
        jobTitle: profile.jobTitle,
        worksFor: { "@type": "Organization", name: profile.company },
        alumniOf: { "@type": "CollegeOrUniversity", name: profile.university },
        address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
        email: `mailto:${profile.email}`,
        sameAs: [profile.linkedin, profile.github],
        knowsAbout: ["Business analysis", "Requirements engineering", "Robotic process automation", "Quality assurance"],
    }
}

export default async function HomePage({ params }: Props) {
    const { lang } = await params
    if (!isLocale(lang)) notFound()
    const dict = getDictionary(lang)

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)).replace(/</g, "\\u003c") }}
            />
            <Hero dict={dict} />
            <About dict={dict} />
            <Experience lang={lang} dict={dict} />
            <Projects dict={dict} />
            <Skills dict={dict} />
            <Education lang={lang} dict={dict} />
            <Organization lang={lang} dict={dict} />
            <Contact dict={dict} />
        </>
    )
}
