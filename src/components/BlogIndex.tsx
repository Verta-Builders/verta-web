"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts, getLocalePost } from "@/lib/blog";

export default function BlogIndex() {
    const locale = useLocale();
    const [featured, ...rest] = blogPosts;
    const featuredLocale = getLocalePost(featured, locale);

    const localePath = (path: string) =>
        locale === "el" ? `/el${path}` : path;

    const heading = locale === "el" ? "Το Blog" : "The Blog";
    const subheading =
        locale === "el"
            ? "Insights μηχανικής, ψηφιακή στρατηγική και πρακτική γνώση από την ομάδα VERTA."
            : "Engineering insights, digital strategy, and practical knowledge from the VERTA team. Written to help businesses build smarter in the age of AI.";
    const badgeLabel = locale === "el" ? "VERTA Insights" : "VERTA Insights";
    const featuredLabel = locale === "el" ? "Επιλεγμένο" : "Featured";
    const readLabel = locale === "el" ? "Διάβασε το άρθρο" : "Read article";

    return (
        <section className="min-h-screen bg-dark-950 pt-32 pb-24" aria-label="Blog articles">
            {/* Header */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <span className="text-xs text-dark-500 uppercase tracking-[0.3em]">
                            {badgeLabel}
                        </span>
                        <div className="flex-1 h-px bg-dark-800" />
                    </div>
                    <h1 className="text-[10vw] lg:text-[6vw] font-display font-bold leading-[0.9] tracking-tighter text-white uppercase mb-6">
                        {heading}
                    </h1>
                    <p className="text-lg text-dark-400 max-w-2xl">{subheading}</p>
                </motion.div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                {/* Featured Post */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-16"
                >
                    <Link href={localePath(`/blog/${featured.slug}`)} className="group block">
                        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-dark-800 hover:border-dark-600 transition-colors bg-dark-900">
                            {/* Image */}
                            <div className="relative h-72 lg:h-auto overflow-hidden">
                                <Image
                                    src={featured.image}
                                    alt={featuredLocale.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-900/20" />
                                <div className="absolute top-6 left-6">
                                    <span className="px-3 py-1 bg-white text-dark-950 text-xs font-semibold uppercase tracking-wider rounded-full">
                                        {featuredLabel}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 lg:p-12 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-xs text-dark-500 uppercase tracking-wider px-3 py-1 border border-dark-700 rounded-full">
                                            {locale === "el" ? featured.categoryEl : featured.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-dark-600 text-xs">
                                            <Clock className="w-3 h-3" />
                                            {featured.readTime}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl lg:text-3xl font-display font-bold text-white leading-tight mb-4 group-hover:text-dark-200 transition-colors">
                                        {featuredLocale.title}
                                    </h2>
                                    <p className="text-dark-400 leading-relaxed text-sm lg:text-base mb-6">
                                        {featuredLocale.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {featuredLocale.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="flex items-center gap-1 text-xs text-dark-500 px-2 py-1 bg-dark-800 rounded"
                                            >
                                                <Tag className="w-2.5 h-2.5" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-dark-400 font-medium">{featuredLocale.author.name}</p>
                                        <time className="text-xs text-dark-600" dateTime={featured.date}>
                                            {new Date(featured.date).toLocaleDateString(
                                                locale === "el" ? "el-GR" : "en-US",
                                                { year: "numeric", month: "long", day: "numeric" }
                                            )}
                                        </time>
                                    </div>
                                    <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                                        <span className="text-sm font-medium">{readLabel}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Article Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {rest.map((post, i) => {
                        const postLocale = getLocalePost(post, locale);
                        return (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                            >
                                <Link href={localePath(`/blog/${post.slug}`)} className="group block h-full">
                                    <article className="h-full flex flex-col rounded-xl overflow-hidden border border-dark-800 hover:border-dark-600 transition-colors bg-dark-900">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                                            <Image
                                                src={post.image}
                                                alt={postLocale.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="text-xs text-dark-300 uppercase tracking-wider px-2 py-1 bg-dark-900/70 backdrop-blur-sm rounded">
                                                    {locale === "el" ? post.categoryEl : post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-dark-600 text-xs mb-3">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </div>

                                            <h2 className="text-base font-display font-bold text-white leading-snug mb-3 group-hover:text-dark-200 transition-colors flex-1">
                                                {postLocale.title}
                                            </h2>

                                            <p className="text-dark-500 text-xs leading-relaxed mb-4 line-clamp-3">
                                                {postLocale.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-800">
                                                <time className="text-xs text-dark-600" dateTime={post.date}>
                                                    {new Date(post.date).toLocaleDateString(
                                                        locale === "el" ? "el-GR" : "en-US",
                                                        { month: "short", day: "numeric", year: "numeric" }
                                                    )}
                                                </time>
                                                <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
