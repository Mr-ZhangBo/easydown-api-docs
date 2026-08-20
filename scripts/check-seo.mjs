import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { platformSeoContent } from './platform-seo-content.mjs';

const root = path.resolve('content/docs');
const locales = ['en', 'zh', 'ja', 'es'];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  }));
  return nested.flat();
}

function localeAndRoute(file) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const match = relative.match(/\.(zh|ja|es)\.mdx$/);
  const locale = match?.[1] ?? 'en';
  const route = relative.replace(/\.(zh|ja|es)(?=\.mdx$)/, '').replace(/\.mdx$/, '');
  return { locale, route };
}

function proseOnly(content) {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/^---[\s\S]*?---/m, '');
}

const files = (await walk(root)).filter((file) => file.endsWith('.mdx'));
const failures = [];
const pages = new Map();

for (const file of files) {
  const content = await readFile(file, 'utf8');
  const { locale, route } = localeAndRoute(file);
  const title = content.match(/^title:\s*"([^"]+)"/m)?.[1];
  const description = content.match(/^description:\s*"([^"]+)"/m)?.[1];
  pages.set(`${route}:${locale}`, { content, title, description, file, locale, route });

  if (!title || title.length < 6 || title.length > 80) failures.push(`${file}: invalid title length`);
  if (!description || description.length < 45 || description.length > 190) failures.push(`${file}: invalid description length`);
  if (/\n\+\s+--(?:url|header|data)/.test(content)) failures.push(`${file}: patch marker found in curl example`);
  if (/\{(?:id|user)\}/.test(proseOnly(content))) failures.push(`${file}: URL placeholder in prose must use inline code`);

  if (locale === 'en' && /\]\(\/(?:api|supported-links|errors|media-downloads|authentication|quick-start|billing|mcp)(?:\/|\))/.test(content)) {
    failures.push(`${file}: English internal link would redirect instead of using the /en canonical path`);
  }

  if (route.startsWith('api/') && route !== 'api/common' && route !== 'api/index') {
    const prefix = `/${locale}`;
    for (const href of [`${prefix}/api`, `${prefix}/api/common`, `${prefix}/supported-links`, `${prefix}/errors`, `${prefix}/media-downloads`, `${prefix}/authentication`, `${prefix}/billing`]) {
      if (!content.includes(`](${href})`)) failures.push(`${file}: missing related link ${href}`);
    }
  }

  if (locale === 'en' && /^api\/(?!common$|index$)/.test(route) && !title?.includes('Video Downloader API')) {
    failures.push(`${file}: English platform title must align with the verified Video Downloader API target`);
  }

  if (route === 'api/bilibili' && (!content.includes('bilibili.tv') || !content.includes('bili.im'))) {
    failures.push(`${file}: missing Bilibili international exclusion`);
  }
}

for (const [platform, seo] of Object.entries(platformSeoContent)) {
  const troubleshooting = seo.troubleshooting.es;
  const repeatedSections = new Set([seo.intro.es, seo.media.es, seo.proxy.es, seo.limits.es]);
  if (new Set(troubleshooting).size !== troubleshooting.length) {
    failures.push(`${platform}: Spanish troubleshooting contains duplicate items`);
  }
  for (const item of troubleshooting) {
    if (repeatedSections.has(item)) failures.push(`${platform}: Spanish troubleshooting repeats another section verbatim`);
  }
}

if (files.length !== 84) failures.push(`expected 84 MDX pages, found ${files.length}`);

const routes = [...new Set([...pages.values()].map((page) => page.route))];
for (const route of routes) {
  for (const locale of locales) {
    if (!pages.has(`${route}:${locale}`)) failures.push(`${route}: missing ${locale} page`);
  }
  const englishTitle = pages.get(`${route}:en`)?.title;
  for (const locale of locales.slice(1)) {
    if (pages.get(`${route}:${locale}`)?.title === englishTitle) failures.push(`${route}: ${locale} title duplicates English`);
  }
}

for (const locale of locales) {
  if (pages.get(`index:${locale}`)?.title === pages.get(`api/common:${locale}`)?.title) {
    failures.push(`${locale}: homepage and common API titles compete for the same keyword`);
  }
}

const contentMetadata = JSON.parse(await readFile(path.resolve('src/generated/content-meta.json'), 'utf8'));
if (Object.keys(contentMetadata.pages ?? {}).length !== files.length) {
  failures.push(`content metadata must contain one timestamp entry per localized page`);
}
for (const page of pages.values()) {
  const pagePath = page.route === 'index' ? '' : page.route.replace(/\/index$/, '');
  const dates = contentMetadata.pages?.[`${page.locale}:${pagePath}`];
  if (!dates || !Date.parse(dates.datePublished) || !Date.parse(dates.dateModified)) {
    failures.push(`${page.file}: missing valid page-level publication dates`);
  } else if (Date.parse(dates.dateModified) < Date.parse(dates.datePublished)) {
    failures.push(`${page.file}: dateModified predates datePublished`);
  }
}

const englishResiduals = [
  'Use this endpoint',
  'Only public content is supported',
  'A response is charged only',
  'Common questions',
  'Related guides',
  'Response fields',
  'Limits and behavior',
  'Accepted examples',
  'Supported URL formats',
  'Tokens can be restricted',
  'Successful commercial responses include',
];

for (const page of pages.values()) {
  if (page.locale === 'en') continue;
  const prose = proseOnly(page.content);
  for (const phrase of englishResiduals) {
    if (prose.includes(phrase)) failures.push(`${page.file}: untranslated prose "${phrase}"`);
  }
}

if (failures.length > 0) {
  console.error(`SEO validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${files.length} localized MDX pages across ${routes.length} routes`);
