import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.phulwari.co.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/about/corevalues',
    '/about/facilities',
    '/about/mission',
    '/about/whychooseus',
    '/activities/art-craft',
    '/activities/gymnastics-mma',
    '/activities/music-dance',
    '/activities/play-zone',
    '/activities/roller-skating',
    '/activities/yoga-cricket',
    '/batch-galary/batch',
    '/batch-galary/gallery',
    '/birthdays',
    '/kids-and-child-birthday-party',
    '/contact',
    '/events/birthday',
    '/events/summer',
    '/events/winter',
    '/mothers',
    '/mothers/fitness',
    '/mothers/toddler-program',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
