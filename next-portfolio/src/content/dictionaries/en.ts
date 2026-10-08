import type { Dictionary } from "../types"

export const en: Dictionary = {
    meta: {
        title: "Wendy Alfando — Business Analyst · RPA & Quality Assurance",
        description:
            "Portfolio of Wendy Alfando, Junior Business Analyst at PT Uniair Indotama Cargo: requirements analysis, RPA implementation, and quality assurance. Information Systems graduate from BINUS University, Summa Cum Laude.",
        blogTitle: "Blog",
        blogDescription: "Notes by Wendy Alfando on business analysis, RPA, and careers.",
    },
    nav: {
        home: "Home",
        about: "About",
        experience: "Experience",
        projects: "Case studies",
        skills: "Skills",
        blog: "Blog",
        contact: "Contact",
        primary: "Main navigation",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        theme: "Toggle light/dark theme",
        language: "Choose language",
        skipToContent: "Skip to content",
    },
    hero: {
        kicker: "Business Analyst · RPA & Quality Assurance",
        typing: ["Business Analyst", "RPA Specialist", "QA Tester", "Problem Solver"],
        headline: {
            before: "Turning manual, repetitive processes into ",
            highlight: "automated workflows",
            after: " that are documented and tested.",
        },
        summary:
            "Junior Business Analyst at PT Uniair Indotama Cargo. I lead requirements analysis for 5+ RPA projects, write BRDs and process flowcharts, and run QA testing for internal systems. Information Systems graduate from BINUS University, Summa Cum Laude.",
        ctaPrimary: "View case studies",
        ctaCv: "Download CV",
        photoAlt: "Portrait of Wendy Alfando",
        socialLabel: "Profiles and contact",
    },
    highlights: [
        { value: "{years}+", label: "years at PT Uniair Indotama Cargo" },
        { value: "5+", label: "RPA projects analyzed" },
        { value: "70%", label: "largest cut in process time" },
        { value: "3.91", label: "GPA · Summa Cum Laude" },
    ],
    about: {
        eyebrow: "About",
        title: "Bridging business needs and technical teams",
        paragraphs: [
            "I enjoy taking business processes apart: understanding how work gets done today, finding the steps that are slow or error-prone, and designing the fix together with the technical team.",
            "I joined PT Uniair Indotama Cargo in February 2024, first as a Business Analyst Intern and now as a Junior Business Analyst. Day to day, I gather user requirements, map processes, write Business Requirement Documents, and test that what gets built actually meets those needs.",
            "The part I enjoy most is turning complex data and processes into clear insights a team can act on right away.",
        ],
        focusTitle: "What I focus on",
        focus: [
            {
                icon: "requirements",
                title: "Requirements analysis & documentation",
                description:
                    "Stakeholder interviews, as-is process mapping, and gap analysis, captured in BRDs and flowcharts developers can build from.",
            },
            {
                icon: "automation",
                title: "Process automation with RPA",
                description:
                    "Picking repetitive, rule-based processes, weighing cost against benefit, and specifying bot requirements through to implementation.",
            },
            {
                icon: "quality",
                title: "Quality assurance",
                description:
                    "Functional, integration, and user acceptance testing so systems behave as intended before release.",
            },
        ],
    },
    experience: {
        eyebrow: "Experience",
        title: "Where I've worked",
        present: "Present",
        items: [
            {
                role: "Junior Business Analyst",
                company: "PT Uniair Indotama Cargo",
                start: "2025-04",
                points: [
                    "Lead requirements analysis for 5+ RPA implementation projects, from process mapping to developer-ready requirements.",
                    "Helped cut process time by up to 70% and improve operational accuracy by automating repetitive work.",
                    "Analyze business needs and present insights that support decision-making.",
                ],
                tags: ["RPA", "Requirements", "Process mapping"],
            },
            {
                role: "Business Analyst Intern",
                company: "PT Uniair Indotama Cargo",
                start: "2024-02",
                end: "2025-02",
                points: [
                    "Wrote Business Requirement Documents (BRDs) and flowcharts for project requirements.",
                    "Ran QA testing for four systems: the Host-to-Host CEISA integration, UniairOne HRIS, InMaterai, and the CRM.",
                    "Helped identify and resolve 95% of UniairOne HRIS bugs before release.",
                ],
                tags: ["BRD", "QA testing", "UAT"],
            },
        ],
    },
    projects: {
        eyebrow: "Case studies",
        title: "Selected work",
        subtitle: "All projects were done at PT Uniair Indotama Cargo. Internal company details are intentionally left out.",
        featuredLabel: "Featured case study",
        labels: { context: "Context", role: "My role", approach: "Approach", result: "Outcome" },
        storyLink: "Read the full story on the blog (in Indonesian)",
        featured: {
            title: "RPA analysis & implementation for operational processes",
            context:
                "Many operational processes were still done by hand: repetitive, rule-based, time-consuming, and prone to input errors.",
            role: "Business Analyst leading the analysis for 5+ RPA projects.",
            approach: [
                "Process discovery and stakeholder interviews to map the as-is process.",
                "Selecting the processes worth automating through cost-benefit analysis.",
                "Capturing flows and business rules in BRDs and flowcharts as requirements for the developers.",
            ],
            result:
                "Delivered requirements for 5+ RPA projects to the development team. Process time dropped by up to 70% and operational accuracy improved.",
            metrics: [
                { value: "5+", label: "RPA projects" },
                { value: "70%", label: "largest cut in process time" },
                { value: "10+", label: "business processes documented" },
            ],
            storySlug: "rpa-menghemat-waktu",
        },
        items: [
            {
                category: "Quality assurance",
                title: "UniairOne HRIS QA & testing",
                summary: "Testing the internal HRIS platform with a focus on functionality and user experience.",
                approach: "Functional testing, performance testing, user acceptance testing, and UI/UX evaluation.",
                result: "95% of bugs identified and resolved before release, for a more reliable system.",
                metric: { value: "95%", label: "bugs resolved before release" },
            },
            {
                category: "System integration",
                title: "Host-to-Host CEISA integration testing",
                summary:
                    "Making sure the Host-to-Host integration with CEISA, Indonesia's customs system, works smoothly with the company's internal systems.",
                approach: "Integration testing, API validation, and UI testing, plus improvement feedback for the developers.",
                result: "Integration completed with zero critical issues and a more efficient data flow.",
                metric: { value: "0", label: "critical issues" },
            },
            {
                category: "Quality assurance",
                title: "InMaterai system quality assurance",
                summary: "End-to-end testing of the InMaterai system covering functionality, security, and user experience.",
                approach: "Website testing, input validation, menu functionality checks, and security testing.",
                result: "A 95% bug resolution rate and strengthened security features.",
                metric: { value: "95%", label: "bugs resolved" },
            },
            {
                category: "Quality assurance",
                title: "CRM testing & improvement",
                summary: "Testing and improving the CRM with a focus on customer data management and the interface.",
                approach: "UI testing, functionality checks, and data integrity testing.",
                result: "A cleaner interface, better data management, and a more efficient system.",
            },
        ],
    },
    skills: {
        eyebrow: "Skills",
        title: "Skills & competencies",
        subtitle: "The tools and abilities I use day to day, self-assessed.",
        groups: [
            {
                title: "Process analysis",
                skills: [
                    { name: "Requirements Gathering", level: 92 },
                    { name: "Business Process Mapping", level: 88 },
                    { name: "Process Optimization", level: 87 },
                    { name: "Gap Analysis", level: 85 },
                    { name: "Quality Assurance & Testing", level: 85 },
                ],
            },
            {
                title: "Data analysis",
                skills: [
                    { name: "Excel Advanced", level: 95 },
                    { name: "Power BI", level: 90 },
                    { name: "SQL", level: 85 },
                    { name: "RPA Tools", level: 80 },
                    { name: "Python", level: 75 },
                ],
            },
            {
                title: "Soft skills",
                skills: [
                    { name: "Problem solving", level: 95 },
                    { name: "Teamwork", level: 92 },
                    { name: "Leadership", level: 90 },
                    { name: "Communication", level: 88 },
                    { name: "Time management", level: 85 },
                ],
            },
        ],
        toolsTitle: "Methods & testing used in projects",
        tools: [
            "Stakeholder interviews",
            "Cost-benefit analysis",
            "Business Requirement Documents (BRD)",
            "Flowcharts",
            "Functional testing",
            "Integration testing",
            "User acceptance testing (UAT)",
            "API validation",
            "Performance testing",
            "Security testing",
            "UI/UX evaluation",
        ],
    },
    education: {
        eyebrow: "Education",
        title: "Education & certifications",
        degree: "Bachelor of Information Systems",
        school: "Bina Nusantara University (BINUS)",
        period: "2021 – 2025",
        location: "Jakarta",
        description:
            "Focused on business analysis, programming, and data management. Active in campus organizations and mentoring programs.",
        gpaLabel: "GPA",
        gpa: "3.91 / 4.00",
        honorLabel: "Honors",
        honor: "Summa Cum Laude",
        certificationsTitle: "Certifications",
    },
    organization: {
        eyebrow: "Organizations",
        title: "Organizations & leadership",
        subtitle: "Mentoring and event committees during my studies at BINUS.",
        mentoringTitle: "Mentoring",
        committeeTitle: "HIMSISFO BINUS committees",
        mentoring: [
            {
                role: "Mentor (study buddy)",
                organization: "BINUS University",
                start: "2023-09",
                end: "2024-09",
                description:
                    "Coached students who had not yet met BINUS academic standards to find effective study habits and stay motivated.",
            },
            {
                role: "Freshmen Partner, BINUSIAN 2026",
                organization: "BINUS University",
                start: "2022-09",
                end: "2023-08",
                description: "Supported new students through their first year and answered their questions about university life.",
            },
        ],
        committee: [
            { role: "Advisory Board", event: "LDKKA: REVENGER", start: "2023-06", end: "2024-01" },
            { role: "Vice Coordinator, Equipment", event: "LDKCP: PURE", start: "2023-03", end: "2023-09" },
            { role: "Coordinator, Equipment", event: "DIG IN: EUFORIA", start: "2022-05", end: "2023-01" },
            { role: "Staff, Equipment", event: "LDKKA: EONS", start: "2022-05", end: "2023-01" },
        ],
    },
    contact: {
        eyebrow: "Contact",
        title: "Let's connect",
        subtitle:
            "Have a question, a collaboration in mind, or want to talk about business analysis and process automation? Send a message here or reach me directly.",
        channels: { email: "Email", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub", location: "Location" },
        locationValue: "Jakarta, Indonesia",
        whatsappGreeting: "Hi Wendy, I'd like to get in touch.",
        form: {
            title: "Send a message",
            name: "Name",
            email: "Email",
            message: "Message",
            submit: "Send message",
            sending: "Sending…",
            success: "Thank you! Your message has been sent.",
            error: "Your message couldn't be sent. Please try again, or email me directly.",
        },
    },
    blog: {
        title: "Blog",
        subtitle: "Notes on business analysis, RPA, and careers.",
        back: "All articles",
        minutes: "min read",
        empty: "No articles yet.",
        writtenBy: "Written by",
        languageNote: "Articles are currently written in Indonesian.",
    },
    footer: {
        tagline: "Business Analyst · RPA & Quality Assurance",
        navTitle: "Navigate",
        linksTitle: "Links",
        cv: "Download CV",
        source: "Source code for this site",
        builtWith: "Built with Next.js and Tailwind CSS.",
        backToTop: "Back to top",
    },
    notFound: {
        title: "Page not found",
        description: "The page you're looking for doesn't exist or has moved.",
        home: "Back to home",
        blog: "Visit the blog",
    },
    floating: {
        whatsapp: "Chat on WhatsApp",
        tooltip: "Got a question? Chat on WhatsApp! 👋",
        closeTooltip: "Close",
        backToTop: "Back to top",
    },
    splash: {
        label: "Portfolio",
    },
}
