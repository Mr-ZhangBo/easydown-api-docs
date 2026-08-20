import type { MetadataRoute } from 'next';
import { getContentDates } from '@/lib/content-metadata';
import { documentLanguages, localizedPath, type Language } from '@/lib/i18n';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => {
    const alternates = Object.fromEntries(
      (['en', 'zh', 'ja', 'es'] as Language[]).map((lang) => [
        documentLanguages[lang],
        new URL(localizedPath(lang, page.slugs), siteUrl).toString(),
      ]),
    );
    const lang = (page.locale ?? 'en') as Language;
    const dates = getContentDates(lang, page.slugs);
    return {
      url: new URL(localizedPath(lang, page.slugs), siteUrl).toString(),
      lastModified: new Date(dates.dateModified),
      alternates: { languages: { ...alternates, 'x-default': alternates.en } },
    };
  });
}
