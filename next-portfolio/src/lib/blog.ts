import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    author: string;
    tags: string[];
    content: string;
}

export function getAllPosts(): BlogPost[] {
    const files = fs.readdirSync(contentDirectory);

    const posts = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const slug = file.replace(/\.md$/, "");
            const filePath = path.join(contentDirectory, file);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || "",
                date: data.date || "",
                excerpt: data.excerpt || "",
                author: data.author || "",
                tags: data.tags || [],
                content,
            };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || "",
        date: data.date || "",
        excerpt: data.excerpt || "",
        author: data.author || "",
        tags: data.tags || [],
        content,
    };
}
