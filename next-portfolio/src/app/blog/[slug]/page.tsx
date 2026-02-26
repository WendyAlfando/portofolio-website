import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} - Wendy Alfando`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all mb-10 text-sm font-medium"
                >
                    <ArrowLeft size={16} />
                    Kembali ke Blog
                </Link>

                {/* Article Header */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold font-playfair text-slate-900 dark:text-white mb-4 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User size={14} />
                            {post.author}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
                            >
                                <Tag size={10} />
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Article Content */}
                <article
                    className="prose prose-lg prose-slate dark:prose-invert max-w-none
                        prose-headings:font-playfair prose-headings:font-bold
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300
                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-slate-900 dark:prose-strong:text-white
                        prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-500/5 prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:rounded-r-xl
                        prose-ul:pl-6 prose-li:text-slate-600 dark:prose-li:text-slate-300
                        prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                        prose-hr:border-slate-200 dark:prose-hr:border-slate-800"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                />

                {/* Bottom nav */}
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Lihat artikel lainnya
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Simple markdown to HTML renderer
function renderMarkdown(md: string): string {
    let html = md
        // Headers
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        // Bold and italic
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        // Blockquotes
        .replace(/^> (.*$)/gm, '<blockquote><p>$1</p></blockquote>')
        // Unordered list items
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        // Code
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // Horizontal rule
        .replace(/^---$/gm, '<hr />')
        // Line breaks / paragraphs
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br />');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>.*?<\/li>)(\s*<br \/>)?\s*(<li>)/g, '$1$3');
    html = html.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    return `<p>${html}</p>`;
}
