"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { BlogPost, getRelatedPosts, getLocalePost } from "@/lib/blog";

interface Props {
    post: BlogPost;
}

export default function BlogArticle({ post }: Props) {
    const locale = useLocale();
    const postLocale = getLocalePost(post, locale);
    const relatedPosts = getRelatedPosts(post.slug, 2);

    const localePath = (path: string) =>
        locale === "el" ? `/el${path}` : path;

    // Locale-specific UI strings
    const backLabel = locale === "el" ? "Πίσω στο Blog" : "Back to Blog";
    const tagsLabel = locale === "el" ? "Ετικέτες" : "Tags";
    const authorLabel = locale === "el" ? "Συγγραφέας" : "Author";
    const ctaTitle = locale === "el" ? "Έτοιμος να χτίσεις;" : "Ready to build?";
    const ctaBody =
        locale === "el"
            ? "Ας συζητήσουμε το επόμενο έργο σου. Απαντάμε εντός 24 ωρών."
            : "Let's discuss your next project. We respond within 24 hours.";
    const ctaBtn = locale === "el" ? "Ξεκίνα Τώρα" : "Start a Project";
    const relatedLabel = locale === "el" ? "Σχετικά Άρθρα" : "Related Articles";

    return (
        <article className="min-h-screen bg-dark-950 pt-28 pb-24">
            {/* Hero */}
            <div className="relative h-[50vh] lg:h-[65vh] overflow-hidden mb-16">
                <Image
                    src={post.image}
                    alt={postLocale.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-12 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Back Link */}
                            <Link
                                href={localePath("/blog")}
                                className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm mb-8 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                {backLabel}
                            </Link>

                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-3 py-1 bg-white text-dark-950 text-xs font-semibold uppercase tracking-wider rounded-full">
                                    {locale === "el" ? post.categoryEl : post.category}
                                </span>
                                <div className="flex items-center gap-1 text-dark-400 text-xs">
                                    <Clock className="w-3 h-3" />
                                    {post.readTime}
                                </div>
                                <time className="text-dark-500 text-xs" dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString(
                                        locale === "el" ? "el-GR" : "en-US",
                                        { year: "numeric", month: "long", day: "numeric" }
                                    )}
                                </time>
                            </div>

                            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight max-w-4xl">
                                {postLocale.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Article Body */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-[1fr_340px] gap-16">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Description lead */}
                        <p className="text-xl text-dark-300 leading-relaxed mb-12 border-l-2 border-white/20 pl-6 font-light">
                            {postLocale.description}
                        </p>

                        {/* Article HTML */}
                        <div
                            className="prose-blog"
                            dangerouslySetInnerHTML={{ __html: postLocale.content }}
                        />

                        {/* Tags */}
                        <div className="mt-16 pt-12 border-t border-dark-800">
                            <p className="text-xs text-dark-500 uppercase tracking-widest mb-4">{tagsLabel}</p>
                            <div className="flex flex-wrap gap-2">
                                {postLocale.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1 text-xs text-dark-400 px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-full"
                                    >
                                        <Tag className="w-2.5 h-2.5" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:sticky lg:top-28 h-fit space-y-8"
                    >
                        {/* Author */}
                        <div className="p-6 bg-dark-900 border border-dark-800 rounded-xl">
                            <p className="text-xs text-dark-500 uppercase tracking-widest mb-4">{authorLabel}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    {postLocale.author.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">{postLocale.author.name}</p>
                                    <p className="text-dark-500 text-xs">{postLocale.author.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="p-6 bg-dark-900 border border-dark-800 rounded-xl">
                            <p className="text-white font-bold text-lg mb-2">{ctaTitle}</p>
                            <p className="text-dark-400 text-sm mb-6 leading-relaxed">{ctaBody}</p>
                            <Link
                                href={localePath("/#contact")}
                                className="block w-full px-4 py-3 bg-white text-sm font-semibold uppercase tracking-wider rounded-full text-center hover:bg-dark-200 transition-colors"
                                style={{ color: "#0a0a0a" }}
                            >
                                {ctaBtn}
                            </Link>
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div>
                                <p className="text-xs text-dark-500 uppercase tracking-widest mb-4">
                                    {relatedLabel}
                                </p>
                                <div className="space-y-4">
                                    {relatedPosts.map((related) => {
                                        const relatedLocale = getLocalePost(related, locale);
                                        return (
                                            <Link
                                                key={related.slug}
                                                href={localePath(`/blog/${related.slug}`)}
                                                className="group flex gap-4 p-4 bg-dark-900 border border-dark-800 hover:border-dark-600 rounded-xl transition-colors"
                                            >
                                                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={related.image}
                                                        alt={relatedLocale.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white text-xs font-medium leading-snug line-clamp-2 group-hover:text-dark-200 transition-colors">
                                                        {relatedLocale.title}
                                                    </p>
                                                    <p className="text-dark-600 text-xs mt-1">{related.readTime}</p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-dark-600 flex-shrink-0 group-hover:text-white group-hover:translate-x-1 transition-all self-center" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.aside>
                </div>
            </div>
        </article>
    );
}
