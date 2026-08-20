# Contributing to EasyDown API Docs

Thanks for helping improve the EasyDown API documentation.

## Before you start

- Use an issue for substantial content, navigation, or architecture proposals.
- Never commit API tokens, deployment credentials, `.env` files, or Vercel
  project metadata.
- Do not add unsupported platform claims or undocumented API behavior.
- Keep translations accurate and equivalent across all four locales.

## Generated content

The OpenAPI contract and supported URL capabilities come from the public
production API. Files under `src/generated` and generated MDX files under
`content` should not be edited by hand. Update the generator where appropriate,
then run:

```bash
npm run sync:api
```

## Local checks

```bash
npm ci
npm run lint
npm run types:check
npm run check:seo
npm run check:links
npm run build
```

These checks do not consume EasyDown API credits.

## Pull requests

Keep pull requests focused, explain the user-facing change, and include all
affected locales. By contributing, you agree that your contribution is licensed
under the MIT License used by this repository.
