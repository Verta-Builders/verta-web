import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.verta.builders';
    const locales = ['en', 'el'];
    const lastModified = new Date();

    const staticRoutes = [
        '',
        '/blog',
        '/strategy',
        '/locations/zakynthos',
        '/locations/thessaloniki',
    ];

    // Known blog posts - ideally these should come from a CMS or local files
    const blogSlugs = [
        'what-is-geo-generative-engine-optimization',
        'why-your-business-needs-custom-web-app-2025',
        'ai-integration-modern-business-applications',
        'blockchain-web3-development-for-startups',
        'how-to-choose-digital-agency-greece'
    ];

    const entries: MetadataRoute.Sitemap = [];

    // Base routes and localized versions
    staticRoutes.forEach(route => {
        // En (Default)
        entries.push({
            url: `${baseUrl}${route}`,
            lastModified,
            changeFrequency: route === '' ? 'daily' : 'weekly',
            priority: route === '' ? 1 : 0.8,
        });

        // El
        entries.push({
            url: `${baseUrl}/el${route}`,
            lastModified,
            changeFrequency: route === '' ? 'daily' : 'weekly',
            priority: route === '' ? 0.9 : 0.7,
        });
    });

    // Blog posts
    blogSlugs.forEach(slug => {
        entries.push({
            url: `${baseUrl}/blog/${slug}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
        });
        entries.push({
            url: `${baseUrl}/el/blog/${slug}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    });

    return entries;
}
