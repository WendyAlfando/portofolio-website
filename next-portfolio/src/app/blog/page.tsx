import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Calendar, ArrowRight, Tag } from "lucide-react";

export const metadata = {
    title: "Blog - Wendy Alfando",
    description: "Artikel dan insight tentang Business Analysis, RPA, dan teknologi.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-playfair text-slate-900 dark:text-white mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Berbagi pengalaman dan insight tentang Business Analysis, RPA, dan teknologi.
                    </p>
                </div>

                {/* Posts */}
                <div className="space-y-8">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block group"
                        >
                            <article className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-300 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
                                    <Calendar size={14} />
                                    <time>{new Date(post.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</time>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
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
                                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                                        Baca <ArrowRight size={14} />
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                        <p className="text-lg">Belum ada artikel. Segera hadir!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
