import fs from "node:fs"
import path from "node:path"
import { parse } from "yaml"
import { isLocale, type Locale } from "./i18n"

const postsDirectory = path.join(process.cwd(), "src/content/blog")

export interface Post {
    slug: string
    lang: Locale
    title: string
    date: string
    excerpt: string
    tags: string[]
    content: string
    readingMinutes: number
}

function readPost(file: string): Post {
    const raw = fs.readFileSync(path.join(postsDirectory, file), "utf8")
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!match) throw new Error(`${file}: missing frontmatter`)

    const data = (parse(match[1]) ?? {}) as Record<string, unknown>
    const lang = String(data.lang ?? "")
    if (typeof data.title !== "string" || typeof data.date !== "string" || !isLocale(lang)) {
        throw new Error(`${file}: frontmatter needs a title, a date ("YYYY-MM-DD") and lang ("id" or "en")`)
    }

    const content = match[2].trim()
    const words = content.split(/\s+/).filter(Boolean).length

    return {
        slug: file.replace(/\.md$/, ""),
        lang,
        title: data.title,
        date: data.date,
        excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        content,
        readingMinutes: Math.max(1, Math.round(words / 200)),
    }
}

export function getAllPosts(): Post[] {
    return fs
        .readdirSync(postsDirectory)
        .filter((file) => file.endsWith(".md"))
        .map(readPost)
        .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(lang: Locale, slug: string) {
    return getAllPosts().find((post) => post.lang === lang && post.slug === slug)
}
