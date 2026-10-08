import type { Dictionary } from "../types"

export const id: Dictionary = {
    meta: {
        title: "Wendy Alfando — Business Analyst · RPA & Quality Assurance",
        description:
            "Portofolio Wendy Alfando, Junior Business Analyst di PT Uniair Indotama Cargo: analisis kebutuhan, implementasi RPA, dan quality assurance. Lulusan Sistem Informasi BINUS, Summa Cum Laude.",
        blogTitle: "Blog",
        blogDescription: "Catatan Wendy Alfando seputar business analysis, RPA, dan karier.",
    },
    nav: {
        home: "Beranda",
        about: "Tentang",
        experience: "Pengalaman",
        projects: "Studi kasus",
        skills: "Keahlian",
        blog: "Blog",
        contact: "Kontak",
        primary: "Navigasi utama",
        menuOpen: "Buka menu",
        menuClose: "Tutup menu",
        theme: "Ganti tema terang/gelap",
        language: "Pilih bahasa",
        skipToContent: "Langsung ke konten",
    },
    hero: {
        kicker: "Business Analyst · RPA & Quality Assurance",
        typing: ["Business Analyst", "RPA Specialist", "QA Tester", "Problem Solver"],
        headline: {
            before: "Mengubah proses manual yang berulang menjadi ",
            highlight: "alur kerja otomatis",
            after: " yang terdokumentasi dan teruji.",
        },
        summary:
            "Junior Business Analyst di PT Uniair Indotama Cargo. Saya memimpin analisis kebutuhan untuk 5+ proyek RPA, menyusun BRD dan flowchart, serta menjalankan QA testing untuk sistem internal. Lulusan S1 Sistem Informasi BINUS dengan predikat Summa Cum Laude.",
        ctaPrimary: "Lihat studi kasus",
        ctaCv: "Unduh CV",
        photoAlt: "Foto Wendy Alfando",
        socialLabel: "Profil dan kontak",
    },
    highlights: [
        { value: "{years}+", label: "tahun di PT Uniair Indotama Cargo" },
        { value: "5+", label: "proyek RPA dianalisis" },
        { value: "70%", label: "pengurangan waktu proses tertinggi" },
        { value: "3,91", label: "IPK · Summa Cum Laude" },
    ],
    about: {
        eyebrow: "Tentang",
        title: "Menjembatani kebutuhan bisnis dan tim teknis",
        paragraphs: [
            "Saya senang membedah proses bisnis: memahami cara kerja yang berjalan sekarang, menemukan bagian yang lambat atau rawan salah, lalu merancang solusinya bersama tim teknis.",
            "Sejak Februari 2024 saya bekerja di PT Uniair Indotama Cargo, dimulai sebagai Business Analyst Intern dan kini sebagai Junior Business Analyst. Sehari-hari saya menggali kebutuhan pengguna, memetakan proses, menulis Business Requirement Document, dan menguji bahwa sistem yang dibangun benar-benar sesuai kebutuhan.",
            "Bagian yang paling saya nikmati: mengubah data dan proses yang rumit menjadi insight yang jelas dan bisa langsung ditindaklanjuti tim.",
        ],
        focusTitle: "Fokus kerja",
        focus: [
            {
                icon: "requirements",
                title: "Analisis & dokumentasi kebutuhan",
                description:
                    "Wawancara stakeholder, pemetaan proses as-is, dan gap analysis, dituangkan ke BRD dan flowchart yang siap dipakai tim developer.",
            },
            {
                icon: "automation",
                title: "Otomasi proses dengan RPA",
                description:
                    "Memilih proses yang repetitif dan berbasis aturan, menimbang cost-benefit, lalu menyusun requirement bot sampai siap diimplementasikan.",
            },
            {
                icon: "quality",
                title: "Quality assurance",
                description:
                    "Functional, integration, dan user acceptance testing agar sistem berjalan sesuai kebutuhan sebelum dirilis.",
            },
        ],
    },
    experience: {
        eyebrow: "Pengalaman",
        title: "Perjalanan kerja",
        present: "Sekarang",
        items: [
            {
                role: "Junior Business Analyst",
                company: "PT Uniair Indotama Cargo",
                start: "2025-04",
                points: [
                    "Memimpin analisis kebutuhan untuk 5+ proyek implementasi RPA, dari pemetaan proses hingga requirement untuk tim developer.",
                    "Ikut memangkas waktu proses hingga 70% dan meningkatkan akurasi operasional lewat otomasi pekerjaan yang repetitif.",
                    "Menganalisis kebutuhan bisnis dan menyajikan insight untuk mendukung pengambilan keputusan.",
                ],
                tags: ["RPA", "Requirements", "Process mapping"],
            },
            {
                role: "Business Analyst Intern",
                company: "PT Uniair Indotama Cargo",
                start: "2024-02",
                end: "2025-02",
                points: [
                    "Menyusun Business Requirement Document (BRD) dan flowchart untuk kebutuhan proyek.",
                    "Menjalankan QA testing untuk empat sistem: integrasi Host-to-Host CEISA, HRIS UniairOne, InMaterai, dan CRM.",
                    "Membantu mengidentifikasi dan menuntaskan 95% bug HRIS UniairOne sebelum rilis.",
                ],
                tags: ["BRD", "QA testing", "UAT"],
            },
        ],
    },
    projects: {
        eyebrow: "Studi kasus",
        title: "Proyek yang pernah saya kerjakan",
        subtitle:
            "Semua proyek dikerjakan di PT Uniair Indotama Cargo. Detail internal perusahaan sengaja tidak ditampilkan.",
        featuredLabel: "Studi kasus utama",
        labels: { context: "Konteks", role: "Peran saya", approach: "Pendekatan", result: "Hasil" },
        storyLink: "Baca cerita lengkapnya di blog",
        featured: {
            title: "Analisis & implementasi RPA untuk proses operasional",
            context:
                "Banyak proses operasional masih dikerjakan manual: berulang, berbasis aturan, memakan waktu, dan rawan salah input.",
            role: "Business Analyst yang memimpin analisis untuk 5+ proyek RPA.",
            approach: [
                "Process discovery dan wawancara stakeholder untuk memetakan proses as-is.",
                "Memilih proses yang layak diotomasi lewat cost-benefit analysis.",
                "Menuangkan alur dan aturan bisnis ke BRD serta flowchart sebagai requirement untuk tim developer.",
            ],
            result:
                "Requirement 5+ proyek RPA berhasil diserahkan ke tim developer. Waktu proses berkurang hingga 70% dan akurasi operasional meningkat.",
            metrics: [
                { value: "5+", label: "proyek RPA" },
                { value: "70%", label: "pengurangan waktu proses tertinggi" },
                { value: "10+", label: "proses bisnis terdokumentasi" },
            ],
            storySlug: "rpa-menghemat-waktu",
        },
        items: [
            {
                category: "Quality assurance",
                title: "QA & testing HRIS UniairOne",
                summary: "Pengujian platform HRIS internal dengan fokus pada fungsionalitas dan pengalaman pengguna.",
                approach: "Functional testing, performance testing, user acceptance testing, dan evaluasi UI/UX.",
                result: "95% bug teridentifikasi dan diselesaikan sebelum rilis, sistem jadi lebih andal.",
                metric: { value: "95%", label: "bug tuntas sebelum rilis" },
            },
            {
                category: "Integrasi sistem",
                title: "Integration testing Host-to-Host CEISA",
                summary:
                    "Memastikan integrasi Host-to-Host dengan CEISA, sistem kepabeanan Bea Cukai, berjalan mulus dengan sistem internal perusahaan.",
                approach: "Integration testing, validasi API, dan UI testing, disertai masukan perbaikan untuk tim pengembang.",
                result: "Integrasi berhasil tanpa isu kritis, dengan alur data yang lebih efisien.",
                metric: { value: "0", label: "isu kritis" },
            },
            {
                category: "Quality assurance",
                title: "Quality assurance sistem InMaterai",
                summary: "Pengujian end-to-end sistem InMaterai dari sisi fungsionalitas, keamanan, dan pengalaman pengguna.",
                approach: "Pengujian website, validasi input, verifikasi fungsi menu, dan security testing.",
                result: "Tingkat penyelesaian bug 95% dan fitur keamanan yang diperkuat.",
                metric: { value: "95%", label: "bug terselesaikan" },
            },
            {
                category: "Quality assurance",
                title: "Testing & peningkatan sistem CRM",
                summary: "Pengujian dan perbaikan CRM dengan fokus pada pengelolaan data pelanggan dan antarmuka.",
                approach: "UI testing, verifikasi fungsi, dan pengujian integritas data.",
                result: "Antarmuka lebih rapi, pengelolaan data lebih baik, dan sistem lebih efisien.",
            },
        ],
    },
    skills: {
        eyebrow: "Keahlian",
        title: "Keahlian & kompetensi",
        subtitle: "Tools dan kemampuan yang saya pakai sehari-hari, berdasarkan penilaian pribadi.",
        groups: [
            {
                title: "Analisis proses",
                skills: [
                    { name: "Requirements Gathering", level: 92 },
                    { name: "Business Process Mapping", level: 88 },
                    { name: "Process Optimization", level: 87 },
                    { name: "Gap Analysis", level: 85 },
                    { name: "Quality Assurance & Testing", level: 85 },
                ],
            },
            {
                title: "Analisis data",
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
                    { name: "Kerja sama tim", level: 92 },
                    { name: "Kepemimpinan", level: 90 },
                    { name: "Komunikasi", level: 88 },
                    { name: "Manajemen waktu", level: 85 },
                ],
            },
        ],
        toolsTitle: "Metode & jenis testing di proyek",
        tools: [
            "Wawancara stakeholder",
            "Cost-benefit analysis",
            "Business Requirement Document (BRD)",
            "Flowchart",
            "Functional testing",
            "Integration testing",
            "User acceptance testing (UAT)",
            "Validasi API",
            "Performance testing",
            "Security testing",
            "Evaluasi UI/UX",
        ],
    },
    education: {
        eyebrow: "Pendidikan",
        title: "Pendidikan & sertifikasi",
        degree: "S1 Sistem Informasi",
        school: "Bina Nusantara University (BINUS)",
        period: "2021 – 2025",
        location: "Jakarta",
        description:
            "Fokus pada analisis bisnis, pemrograman, dan manajemen data. Aktif di organisasi kampus dan program mentoring.",
        gpaLabel: "IPK",
        gpa: "3,91 / 4,00",
        honorLabel: "Predikat",
        honor: "Summa Cum Laude",
        certificationsTitle: "Sertifikasi",
    },
    organization: {
        eyebrow: "Organisasi",
        title: "Organisasi & kepemimpinan",
        subtitle: "Mentoring dan kepanitiaan selama kuliah di BINUS.",
        mentoringTitle: "Mentoring",
        committeeTitle: "Kepanitiaan HIMSISFO BINUS",
        mentoring: [
            {
                role: "Mentor (study buddy)",
                organization: "BINUS University",
                start: "2023-09",
                end: "2024-09",
                description:
                    "Mendampingi mahasiswa yang belum mencapai standar prestasi untuk menemukan cara belajar yang efektif dan menjaga motivasi.",
            },
            {
                role: "Freshmen Partner, BINUSIAN 2026",
                organization: "BINUS University",
                start: "2022-09",
                end: "2023-08",
                description: "Mendampingi mahasiswa baru selama tahun pertama dan memberi informasi seputar perkuliahan.",
            },
        ],
        committee: [
            { role: "Badan Penasihat", event: "LDKKA: REVENGER", start: "2023-06", end: "2024-01" },
            { role: "Wakil Koordinator Perlengkapan", event: "LDKCP: PURE", start: "2023-03", end: "2023-09" },
            { role: "Koordinator Perlengkapan", event: "DIG IN: EUFORIA", start: "2022-05", end: "2023-01" },
            { role: "Staf Perlengkapan", event: "LDKKA: EONS", start: "2022-05", end: "2023-01" },
        ],
    },
    contact: {
        eyebrow: "Kontak",
        title: "Mari terhubung",
        subtitle:
            "Punya pertanyaan, tawaran kerja sama, atau ingin berdiskusi soal analisis bisnis dan otomasi proses? Kirim pesan lewat form ini atau hubungi saya langsung.",
        channels: { email: "Email", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub", location: "Lokasi" },
        locationValue: "Jakarta, Indonesia",
        whatsappGreeting: "Halo Wendy, saya ingin berdiskusi.",
        form: {
            title: "Kirim pesan",
            name: "Nama",
            email: "Email",
            message: "Pesan",
            submit: "Kirim pesan",
            sending: "Mengirim…",
            success: "Terima kasih! Pesan Anda sudah terkirim.",
            error: "Pesan gagal terkirim. Coba lagi, atau kirim email langsung.",
        },
    },
    blog: {
        title: "Blog",
        subtitle: "Catatan seputar business analysis, RPA, dan karier.",
        back: "Semua artikel",
        minutes: "menit baca",
        empty: "Belum ada artikel.",
        writtenBy: "Ditulis oleh",
    },
    footer: {
        tagline: "Business Analyst · RPA & Quality Assurance",
        navTitle: "Navigasi",
        linksTitle: "Tautan",
        cv: "Unduh CV",
        source: "Source code situs ini",
        builtWith: "Dibuat dengan Next.js dan Tailwind CSS.",
        backToTop: "Kembali ke atas",
    },
    notFound: {
        title: "Halaman tidak ditemukan",
        description: "Halaman yang Anda cari tidak ada atau sudah dipindahkan.",
        home: "Kembali ke beranda",
        blog: "Lihat blog",
    },
    floating: {
        whatsapp: "Chat via WhatsApp",
        tooltip: "Ada pertanyaan? Chat via WhatsApp! 👋",
        closeTooltip: "Tutup",
        backToTop: "Kembali ke atas",
    },
    splash: {
        label: "Portofolio",
    },
}
