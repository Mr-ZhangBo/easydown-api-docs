import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const apiOrigin = process.env.EASYDOWN_API_ORIGIN || 'https://api.easydown.org';
const outputDir = path.resolve('src/generated');

async function readJson(pathname) {
  const response = await fetch(new URL(pathname, apiOrigin), {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`${pathname} returned HTTP ${response.status}`);
  return response.json();
}

const [openapi, capabilities] = await Promise.all([
  readJson('/openapi.json'),
  readJson('/api/v1/capabilities'),
]);

if (openapi.openapi !== '3.1.0') throw new Error('EasyDown must publish OpenAPI 3.1.0');
if (!openapi.paths?.['/api/v1/parse']) throw new Error('Common parse operation is missing');
if (!Array.isArray(capabilities.data?.platforms) || capabilities.data.platforms.length !== 11) {
  throw new Error('Expected 11 platform capabilities');
}
for (const platform of capabilities.data.platforms) {
  const endpoint = `/api/v1/platforms/${platform.id}/parse`;
  if (!openapi.paths?.[endpoint]?.post) throw new Error(`OpenAPI operation missing: ${endpoint}`);
}

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(path.join(outputDir, 'openapi.json'), `${JSON.stringify(openapi, null, 2)}\n`),
  writeFile(path.join(outputDir, 'capabilities.json'), `${JSON.stringify(capabilities, null, 2)}\n`),
]);

console.log(`Synced OpenAPI 3.1 and ${capabilities.data.platforms.length} platform capabilities from ${apiOrigin}`);
