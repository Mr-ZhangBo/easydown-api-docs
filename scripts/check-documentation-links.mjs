import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'content', 'docs');
const mapPath = path.join(root, 'docs', 'DOCUMENTATION.md');
const locales = ['en', 'zh', 'ja', 'es'];

async function collectEnglishRoutes(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes.push(
        ...(await collectEnglishRoutes(
          path.join(directory, entry.name),
          path.posix.join(prefix, entry.name),
        )),
      );
      continue;
    }

    if (!entry.name.endsWith('.mdx') || /\.(?:zh|ja|es)\.mdx$/.test(entry.name)) {
      continue;
    }

    const basename = entry.name.slice(0, -'.mdx'.length);
    routes.push(basename === 'index' ? prefix : path.posix.join(prefix, basename));
  }

  return routes;
}

const routes = (await collectEnglishRoutes(contentRoot)).sort();
const expected = new Set(
  routes.flatMap((route) =>
    locales.map(
      (locale) =>
        `https://docs.easydown.org/${locale}${route ? `/${route}` : ''}`,
    ),
  ),
);

const markdown = await readFile(mapPath, 'utf8');
const found = [
  ...markdown.matchAll(/https:\/\/docs\.easydown\.org\/(?:en|zh|ja|es)(?:\/[a-z0-9/-]+)?/g),
].map((match) => match[0]);
const uniqueFound = new Set(found);
const missing = [...expected].filter((url) => !uniqueFound.has(url));
const unexpected = [...uniqueFound].filter((url) => !expected.has(url));
const duplicates = found.filter((url, index) => found.indexOf(url) !== index);

if (missing.length || unexpected.length || duplicates.length) {
  if (missing.length) console.error('Missing documentation links:', missing);
  if (unexpected.length) console.error('Unexpected documentation links:', unexpected);
  if (duplicates.length) console.error('Duplicate documentation links:', duplicates);
  process.exitCode = 1;
} else {
  console.log(
    `Documentation map contains ${uniqueFound.size} unique links for ${routes.length} routes across ${locales.length} locales.`,
  );
}
