import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { profile } from "@/content/profile"
import { siteUrl } from "./site"

export const ogSize = { width: 1200, height: 630 }

const ogPhoto = readFile(join(process.cwd(), "public/images/profile-og.png"))
    .then((buffer) => `data:image/png;base64,${buffer.toString("base64")}`)

/**
 * Fetches a Google Font as TTF, subset to the given text, for use in ImageResponse.
 * Returns null when offline so image generation falls back to the default font instead of failing the build.
 */
async function loadGoogleFont(family: string, text: string): Promise<ArrayBuffer | null> {
    try {
        const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
            .then((res) => res.text())
        const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
        if (!url) return null
        const font = await fetch(url)
        return font.ok ? await font.arrayBuffer() : null
    } catch {
        return null
    }
}

interface OgCardProps {
    /** Small line above the title */
    eyebrow: string
    title: string
    /** Larger titles (names) get a bigger font than article titles */
    titleSize: number
    description: string
}

/** Shared 1200×630 social card: text on the left, portrait on the right, brand glows behind. */
export async function renderOgCard({ eyebrow, title, titleSize, description }: OgCardProps) {
    const summary = description.length > 150 ? `${description.slice(0, 147).trimEnd()}…` : description
    const host = new URL(siteUrl).host
    const [display, sans, photo] = await Promise.all([
        loadGoogleFont("Playfair+Display:wght@700", `${title}WA.`),
        loadGoogleFont("Geist:wght@400", `${eyebrow}${summary}${host}`),
        ogPhoto,
    ])
    // Use the brand fonts only when both loaded: a lone subset font would mix serif glyphs into the body text
    const fonts =
        display && sans
            ? [
                { name: "Geist", data: sans, weight: 400 as const, style: "normal" as const },
                { name: "Playfair", data: display, weight: 700 as const, style: "normal" as const },
            ]
            : undefined
    const displayFont = fonts ? "Playfair" : undefined

    const element = (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                backgroundColor: "#020617",
                backgroundImage:
                    "radial-gradient(circle at 12% 10%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 92% 95%, rgba(251,191,36,0.22), transparent 45%)",
                color: "#f8fafc",
                fontFamily: fonts ? "Geist" : undefined,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: 800,
                    padding: "60px 0 56px 72px",
                }}
            >
                <div style={{ display: "flex", fontSize: 40, fontWeight: 700, fontFamily: displayFont }}>
                    WA<span style={{ color: "#fbbf24" }}>.</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 26, color: "#93c5fd" }}>{eyebrow}</div>
                    <div style={{ marginTop: 16, fontSize: titleSize, fontWeight: 700, lineHeight: 1.1, fontFamily: displayFont }}>
                        {title}
                    </div>
                    <div style={{ marginTop: 22, fontSize: 26, lineHeight: 1.45, color: "#cbd5e1" }}>{summary}</div>
                </div>
                <div style={{ display: "flex", fontSize: 22, color: "#94a3b8" }}>{host}</div>
            </div>
            <div style={{ display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
                <img src={photo} width={352} height={440} alt={profile.name} />
            </div>
        </div>
    )

    return {
        element,
        fonts,
    }
}
