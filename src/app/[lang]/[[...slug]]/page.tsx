import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMDXComponents } from '@/components/mdx';
import { getContentDates } from '@/lib/content-metadata';
import { documentLanguages, isLanguage, languages, localizedPath, type Language } from '@/lib/i18n';
import { source } from '@/lib/source';
import { appName, siteUrl } from '@/lib/shared';

type PageParams = { lang: string; slug?: string[] };
type Props = { params: Promise<PageParams> };

const openGraphLocales: Record<Language, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
  es: 'es_ES',
};

function canonicalUrl(lang: string, slug: readonly string[] = []) {
  return new URL(localizedPath(lang, slug), siteUrl).toString();
}

function languageAlternates(slug: readonly string[] = []) {
  return {
    en: canonicalUrl('en', slug),
    'zh-Hans': canonicalUrl('zh', slug),
    ja: canonicalUrl('ja', slug),
    es: canonicalUrl('es', slug),
    'x-default': canonicalUrl('en', slug),
  };
}

function socialImageUrl(lang: Language, slug: readonly string[] = []) {
  const url = new URL('/api/og', siteUrl);
  url.searchParams.set('lang', lang);
  if (slug.length > 0) url.searchParams.set('slug', slug.join('/'));
  return url.toString();
}

function pageBreadcrumbs(lang: Language, slugs: readonly string[]) {
  return slugs.flatMap((_, index) => {
    const ancestorSlugs = slugs.slice(0, index + 1);
    const ancestor = source.getPage(ancestorSlugs, lang);
    if (!ancestor) return [];
    return [{
      '@type': 'ListItem',
      position: index + 2,
      name: ancestor.data.title,
      item: canonicalUrl(lang, ancestorSlugs),
    }];
  });
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const MDX = page.data.body;
  const url = canonicalUrl(lang, page.slugs);
  const homePage = source.getPage([], lang);
  const breadcrumbs = pageBreadcrumbs(lang, page.slugs);
  const image = socialImageUrl(lang, page.slugs);
  const dates = getContentDates(lang, page.slugs);
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'EasyDown',
        url: 'https://easydown.org',
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: appName,
        url: siteUrl,
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'TechArticle',
        headline: page.data.title,
        description: page.data.description,
        inLanguage: documentLanguages[lang],
        url,
        image,
        datePublished: dates.datePublished,
        dateModified: dates.dateModified,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        isPartOf: { '@id': websiteId },
        author: { '@id': organizationId },
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homePage?.data.title ?? appName, item: canonicalUrl(lang) },
          ...breadcrumbs,
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c') }}
      />
      <main className="min-w-0 [grid-area:main]">
        <DocsPage toc={page.data.toc} full={page.data.full}>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
          <DocsBody>
            <MDX
              components={getMDXComponents({
                a: createRelativeLink(source, page),
              })}
            />
          </DocsBody>
        </DocsPage>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return source.generateParams('slug', 'lang');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const canonical = canonicalUrl(lang, page.slugs);
  const image = socialImageUrl(lang, page.slugs);
  const indexable = process.env.VERCEL_ENV === 'production';

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical,
      languages: languageAlternates(page.slugs),
    },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: 'article',
      title: page.data.title,
      description: page.data.description,
      url: canonical,
      siteName: appName,
      locale: openGraphLocales[lang],
      alternateLocale: languages
        .filter((language) => language !== lang)
        .map((language) => openGraphLocales[language]),
      images: [{ url: image, width: 1200, height: 630, alt: page.data.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [image],
    },
  };
}
