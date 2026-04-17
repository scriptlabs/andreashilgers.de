import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://andreashilgers.de';
  const languages = ['de', 'en'];
  const pages = ['', 'about', 'experience', 'projects', 'skills', 'contact'];

  const routes = languages.flatMap((lang) =>
    pages.map((page) => ({
      url: `${baseUrl}/${lang}${page ? `/${page}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  return routes;
}
