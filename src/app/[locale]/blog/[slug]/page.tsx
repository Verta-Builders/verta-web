import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogArticle from "@/components/BlogArticle";
import { getBlogPost, blogPosts, getLocalePost } from "@/lib/blog";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    const locales = ["en", "el"];
    return blogPosts.flatMap((post) =>
        locales.map((locale) => ({ locale, slug: post.slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const post = getBlogPost(slug);
    if (!post) return {};

    const localePost = getLocalePost(post, locale);
    const canonicalBase = locale === "el" ? "https://www.verta.builders/el" : "https://www.verta.builders";

    return {
        title: `${localePost.title} | VERTA Blog`,
        description: localePost.description,
        keywords: localePost.tags,
        authors: [{ name: localePost.author.name }],
        openGraph: {
            title: localePost.title,
            description: localePost.description,
            type: "article",
            publishedTime: post.date,
            authors: [localePost.author.name],
            locale: locale === "el" ? "el_GR" : "en_US",
            images: [{ url: post.image, width: 1200, height: 630, alt: localePost.title }],
            url: `${canonicalBase}/blog/${post.slug}`,
        },
        twitter: {
            card: "summary_large_image",
            title: localePost.title,
            description: localePost.description,
            images: [post.image],
        },
        alternates: {
            canonical: `${canonicalBase}/blog/${post.slug}`,
            languages: {
                en: `https://www.verta.builders/blog/${post.slug}`,
                el: `https://www.verta.builders/el/blog/${post.slug}`,
            },
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug, locale } = await params;
    const post = getBlogPost(slug);
    if (!post) notFound();

    const localePost = getLocalePost(post, locale);

    // Article JSON-LD structured data (GEO-critical)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: localePost.title,
        description: localePost.description,
        image: `https://www.verta.builders${post.image}`,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: locale === "el" ? "el" : "en",
        author: {
            "@type": "Person",
            name: localePost.author.name,
            jobTitle: localePost.author.role,
            worksFor: {
                "@type": "Organization",
                name: "VERTA",
                url: "https://www.verta.builders",
            },
        },
        publisher: {
            "@type": "Organization",
            name: "VERTA",
            logo: {
                "@type": "ImageObject",
                url: "https://www.verta.builders/brand/verta-full-logo-no-bg.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.verta.builders/${locale === "el" ? "el/" : ""}blog/${post.slug}`,
        },
        keywords: localePost.tags.join(", "),
        articleSection: locale === "el" ? post.categoryEl : post.category,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navigation />
            <main id="main-content" role="main">
                <BlogArticle post={post} />
            </main>
            <Footer />
        </>
    );
}
