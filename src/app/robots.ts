import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/admin/'],
            },
            {
                userAgent: ['AhrefsBot', 'MJ12bot', 'DotBot', 'SemrushBot'],
                disallow: '/',
            }
        ],
        sitemap: 'https://www.verta.builders/sitemap.xml',
    };
}
