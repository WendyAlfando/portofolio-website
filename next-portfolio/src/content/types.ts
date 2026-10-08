export interface Metric {
    value: string
    label: string
}

export type FocusIcon = "requirements" | "automation" | "quality"

export interface ExperienceItem {
    role: string
    company: string
    /** "YYYY-MM" */
    start: string
    /** "YYYY-MM", omitted for the current role */
    end?: string
    points: string[]
    tags: string[]
}

export interface FeaturedCaseStudy {
    title: string
    context: string
    role: string
    approach: string[]
    result: string
    metrics: Metric[]
    /** Slug of a blog post that tells the longer story */
    storySlug?: string
}

export interface CaseStudy {
    category: string
    title: string
    summary: string
    approach: string
    result: string
    metric?: Metric
}

export interface MentoringItem {
    role: string
    organization: string
    start: string
    end: string
    description: string
}

export interface CommitteeItem {
    role: string
    event: string
    start: string
    end: string
}

export interface ContactFormLabels {
    title: string
    name: string
    email: string
    message: string
    submit: string
    sending: string
    success: string
    error: string
}

export interface Dictionary {
    meta: {
        title: string
        description: string
        blogTitle: string
        blogDescription: string
    }
    nav: {
        home: string
        about: string
        experience: string
        projects: string
        skills: string
        blog: string
        contact: string
        primary: string
        menuOpen: string
        menuClose: string
        theme: string
        language: string
        skipToContent: string
    }
    hero: {
        kicker: string
        /** Roles cycled by the typing effect */
        typing: string[]
        headline: { before: string; highlight: string; after: string }
        summary: string
        ctaPrimary: string
        ctaCv: string
        photoAlt: string
        socialLabel: string
    }
    /** "{years}" in a value is replaced with the years since profile.careerStart */
    highlights: Metric[]
    about: {
        eyebrow: string
        title: string
        paragraphs: string[]
        focusTitle: string
        focus: { icon: FocusIcon; title: string; description: string }[]
    }
    experience: {
        eyebrow: string
        title: string
        present: string
        items: ExperienceItem[]
    }
    projects: {
        eyebrow: string
        title: string
        subtitle: string
        featuredLabel: string
        labels: { context: string; role: string; approach: string; result: string }
        storyLink: string
        featured: FeaturedCaseStudy
        items: CaseStudy[]
    }
    skills: {
        eyebrow: string
        title: string
        subtitle: string
        /** level is a self-assessed percentage (0–100) */
        groups: { title: string; skills: { name: string; level: number }[] }[]
        toolsTitle: string
        tools: string[]
    }
    education: {
        eyebrow: string
        title: string
        degree: string
        school: string
        period: string
        location: string
        description: string
        gpaLabel: string
        gpa: string
        honorLabel: string
        honor: string
        certificationsTitle: string
    }
    organization: {
        eyebrow: string
        title: string
        subtitle: string
        mentoringTitle: string
        committeeTitle: string
        mentoring: MentoringItem[]
        committee: CommitteeItem[]
    }
    contact: {
        eyebrow: string
        title: string
        subtitle: string
        channels: { email: string; whatsapp: string; linkedin: string; github: string; location: string }
        locationValue: string
        whatsappGreeting: string
        form: ContactFormLabels
    }
    blog: {
        title: string
        subtitle: string
        back: string
        minutes: string
        empty: string
        writtenBy: string
        /** Shown when the posts are written in another language */
        languageNote?: string
    }
    footer: {
        tagline: string
        navTitle: string
        linksTitle: string
        cv: string
        source: string
        builtWith: string
        backToTop: string
    }
    notFound: {
        title: string
        description: string
        home: string
        blog: string
    }
    floating: {
        whatsapp: string
        tooltip: string
        closeTooltip: string
        backToTop: string
    }
    splash: {
        label: string
    }
}
