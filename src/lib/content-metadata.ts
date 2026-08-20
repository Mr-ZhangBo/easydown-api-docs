import contentMeta from '@/generated/content-meta.json';

type ContentDates = {
  datePublished: string;
  dateModified: string;
};

const pageDates = contentMeta.pages as Record<string, ContentDates>;

export function getContentDates(lang: string, slugs: readonly string[]): ContentDates {
  return pageDates[`${lang}:${slugs.join('/')}`] ?? {
    datePublished: contentMeta.datePublished,
    dateModified: contentMeta.dateModified,
  };
}
