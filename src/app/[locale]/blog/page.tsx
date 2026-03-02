import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogIndex from "@/components/BlogIndex";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isEl = locale === "el";

    return {
        title: isEl
            ? "Blog — Insights Web, AI & Blockchain | VERTA"
            : "Blog — Web Development, AI & Blockchain Insights | VERTA",
        description: isEl
            ? "Ειδικές γνώσεις από την ομάδα μηχανικών της VERTA για ανάπτυξη web, ενσωμάτωση AI, blockchain και ψηφιακή στρατηγική. Πρακτική γνώση για επιχειρήσεις που χτίζουν το μέλλον."
            : "Expert insights from VERTA's engineering team on web development, AI integration, blockchain, and digital strategy. Practical knowledge for businesses building the future.",
        keywords: isEl
            ? ["ανάπτυξη web", "AI", "blockchain", "ψηφιακή στρατηγική", "GEO", "Next.js", "ελληνική εταιρεία"]
            : ["web development blog", "AI integration", "blockchain", "digital agency insights", "GEO optimization", "Next.js", "tech blog Greece"],
        openGraph: {
            title: isEl
                ? "VERTA Blog — Insights Μηχανικής & Ψηφιακή Στρατηγική"
                : "VERTA Blog — Engineering Insights & Digital Strategy",
            description: isEl
                ? "Ειδικό περιεχόμενο για ανάπτυξη web, AI, blockchain και ανάπτυξη επιχείρησης με τεχνολογία."
                : "Expert content on web development, AI, blockchain, and growing your business with technology.",
            type: "website",
            locale: isEl ? "el_GR" : "en_US",
            url: isEl ? "https://www.verta.builders/el/blog" : "https://www.verta.builders/blog",
            images: [{ url: "/blog/geo-optimization.png", width: 1200, height: 630 }],
        },
        alternates: {
            canonical: isEl ? "https://www.verta.builders/el/blog" : "https://www.verta.builders/blog",
            languages: {
                en: "https://www.verta.builders/blog",
                el: "https://www.verta.builders/el/blog",
            },
        },
    };
}

export default function BlogPage() {
    return (
        <>
            <Navigation />
            <main id="main-content" role="main">
                <BlogIndex />
            </main>
            <Footer />
        </>
    );
}
