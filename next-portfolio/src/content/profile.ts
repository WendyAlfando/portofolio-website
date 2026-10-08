// Facts that are the same in every language. Translated copy lives in ./dictionaries.

export interface Certification {
    title: string
    issuer: string
    /** "YYYY-MM" */
    date: string
    /** Credential or badge URL (for example Credly), shown as a link when present */
    url?: string
}

export const profile = {
    name: "Wendy Alfando",
    jobTitle: "Junior Business Analyst",
    company: "PT Uniair Indotama Cargo",
    university: "Bina Nusantara University",
    /** First day at the company, used for the "years of experience" highlight */
    careerStart: "2024-02",
    email: "wendyalfando02@gmail.com",
    phone: "+62 877-7136-5529",
    whatsapp: "https://wa.me/6287771365529",
    linkedin: "https://www.linkedin.com/in/wendyalfando",
    github: "https://github.com/WendyAlfando",
    sourceCode: "https://github.com/WendyAlfando/portofolio-website",
    cv: "/CV_Wendy_Alfando.pdf",
    photo: "/images/profile.webp",
    contactEndpoint: "https://formspree.io/f/mqazqozk",
}

export const certifications: Certification[] = [
    { title: "Python Essentials 2", issuer: "Cisco Networking Academy", date: "2024-03" },
    { title: "Python Essentials 1", issuer: "Cisco Networking Academy", date: "2023-10" },
    { title: "Data Analytics Essentials", issuer: "Cisco Networking Academy", date: "2023-07" },
    { title: "ASEAN Data Science Explorers 2023", issuer: "ASEAN Foundation & SAP", date: "2023-05" },
]
