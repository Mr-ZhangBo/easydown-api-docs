# EasyDown API Docs

[![Documentation](https://img.shields.io/badge/docs-docs.easydown.org-047857)](https://docs.easydown.org/en)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Open-source, multilingual documentation for the
[EasyDown social media video downloader API](https://docs.easydown.org/en) and
[MCP server](https://docs.easydown.org/en/mcp). The site documents one API for
TikTok, YouTube, Instagram, X, Threads, RedNote, Bilibili, Douyin, Kuaishou,
Weibo, and Toutiao.

Built with Next.js, Fumadocs, and Fumadocs OpenAPI.

## Documentation

- [API quick start](https://docs.easydown.org/en/quick-start)
- [Authentication](https://docs.easydown.org/en/authentication)
- [Supported video URL formats](https://docs.easydown.org/en/supported-links)
- [OpenAPI reference](https://docs.easydown.org/en/api)
- [MCP server guide](https://docs.easydown.org/en/mcp)
- [Complete multilingual documentation map](docs/DOCUMENTATION.md) — direct
  links to all 84 published URLs across English, Simplified Chinese, Japanese,
  and Spanish

## Features

- Four fully localized documentation sets: English, Simplified Chinese,
  Japanese, and Spanish
- OpenAPI-generated endpoint and schema reference
- Platform-specific API guides for 11 social media platforms
- Safe in-browser API request form that keeps Bearer tokens in React memory
- Canonical URLs, hreflang alternates, structured data, and sitemap validation
- Contract synchronization from the public EasyDown production API

## Development

Requirements: Node.js 20 or later and npm.

```bash
npm ci
npm run dev
```

English is served under `/en`. Simplified Chinese, Japanese, and Spanish use
`/zh`, `/ja`, and `/es`.

## API contract

OpenAPI and supported URL formats are generated from the public production API:

```bash
npm run sync:api
```

The sync reads `GET /openapi.json` and `GET /api/v1/capabilities`. Do not hand
edit files under `src/generated` or generated MDX pages under `content`. The
build synchronizes the contract before compiling so the published documentation
stays aligned with the API.

## Verification

```bash
npm run lint
npm run types:check
npm run check:seo
npm run check:links
npm run build
```

These commands do not call a parse endpoint, consume EasyDown credits, or make
paid third-party requests. The interactive Try it form calls
`https://api.easydown.org` directly and keeps its Bearer token in React memory
only.

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Please
report vulnerabilities through [GitHub private vulnerability reporting](SECURITY.md),
not a public issue.

## Responsible use

This repository contains the documentation frontend, not EasyDown's media
parsing backend. Use the API only for content you are authorized to access and
download, and comply with applicable laws and platform terms. Platform names
and trademarks belong to their respective owners; no affiliation or endorsement
is implied.

## License

Released under the [MIT License](LICENSE).
