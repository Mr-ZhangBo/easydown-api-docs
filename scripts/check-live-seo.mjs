const baseUrl = new URL(process.env.SEO_BASE_URL ?? 'https://docs.easydown.org');
const expectedAlternates = ['en', 'zh-Hans', 'ja', 'es', 'x-default'];
const expectIndexable = process.env.SEO_EXPECT_INDEXABLE !== 'false';

function attribute(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]+)"`, 'i'))?.[1];
}

async function fetchText(url, options) {
  const response = await fetch(url, options);
  return { response, text: await response.text() };
}

const sitemapUrl = new URL('/sitemap.xml', baseUrl);
const { response: sitemapResponse, text: sitemap } = await fetchText(sitemapUrl);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);

const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const canonicalUrl = match[1];
  return { canonicalUrl, fetchUrl: new URL(new URL(canonicalUrl).pathname, baseUrl).toString() };
});
if (pages.length === 0) throw new Error('Sitemap contains no URLs');

const failures = [];
const internalLinks = new Set();

for (let index = 0; index < pages.length; index += 8) {
  await Promise.all(pages.slice(index, index + 8).map(async ({ canonicalUrl, fetchUrl }) => {
    const { response, text: html } = await fetchText(fetchUrl);
    const canonicalTag = html.match(/<link rel="canonical"[^>]+>/)?.[0];
    const canonical = canonicalTag ? attribute(canonicalTag, 'href') : undefined;
    const alternateTags = [...html.matchAll(/<link rel="alternate"[^>]+>/g)].map((match) => match[0]);
    const alternates = alternateTags.map((tag) => attribute(tag, 'hrefLang'));
    const h1Count = (html.match(/<h1\b/g) ?? []).length;
    const lang = html.match(/<html lang="([^"]+)"/)?.[1];
    const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1];
    const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

    if (response.status !== 200) failures.push(`${fetchUrl}: HTTP ${response.status}`);
    if (canonical !== canonicalUrl) failures.push(`${fetchUrl}: canonical does not match the sitemap URL`);
    if (h1Count !== 1) failures.push(`${fetchUrl}: expected one H1, found ${h1Count}`);
    if (expectIndexable && robots !== 'index, follow') failures.push(`${fetchUrl}: production robots is ${robots ?? 'missing'}`);
    if (!expectIndexable && !robots?.includes('noindex')) failures.push(`${fetchUrl}: preview page must be noindex`);
    if (!lang) failures.push(`${fetchUrl}: missing html lang`);
    for (const expected of expectedAlternates) {
      if (!alternates.includes(expected)) failures.push(`${fetchUrl}: missing hreflang ${expected}`);
    }
    try {
      const graph = JSON.parse(jsonLd ?? '')['@graph'];
      const article = graph?.find((item) => item['@type'] === 'TechArticle');
      if (!article?.mainEntityOfPage || !article?.dateModified || !article?.publisher) {
        failures.push(`${fetchUrl}: incomplete TechArticle structured data`);
      }
    } catch {
      failures.push(`${fetchUrl}: invalid JSON-LD`);
    }

    for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (!match[1].startsWith('/_next')) internalLinks.add(new URL(match[1], baseUrl).toString());
    }
  }));
}

for (const url of internalLinks) {
  const response = await fetch(url, { redirect: 'manual' });
  if (response.status !== 200) failures.push(`${url}: internal link returned HTTP ${response.status}`);
}

if (failures.length > 0) {
  console.error(`Live SEO validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Live SEO validation passed for ${pages.length} pages and ${internalLinks.size} internal links`);
