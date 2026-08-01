import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'AnthropicAI', 'PerplexityBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.phulwari.co.in/sitemap.xml',
    host: 'https://www.phulwari.co.in',
  };
}
