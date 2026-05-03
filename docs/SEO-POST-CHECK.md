# SEO implementation — re-check notes

After deployment, re-run your online SEO audit and **PageSpeed Insights** (mobile + desktop) on the live URL.

## What changed in code

- Shorter `<title>` via `siteConfig.homePageTitle` in [`src/data/company.ts`](src/data/company.ts); several page and portfolio `metaTitle` values shortened.
- Social URLs: add your profile links under `company.social` — footer icons and Organization `sameAs` (on the homepage) populate automatically.
- Plain `mailto:` links and visible raw addresses were removed from public pages; UI uses obfuscated text + contact form CTAs. JSON-LD on the homepage still includes `email` for Google local/organization signals (optional to remove if a future audit objects).
- Inline `style=` attributes removed from targeted components; fonts load with a print-media trick + `noscript` fallback.
- Homepage script boot defers heavy animation imports via `requestIdleCallback` when available.
- Link-building checklist: [`docs/SEO-LINK-BUILDING.md`](./SEO-LINK-BUILDING.md).

## Commands used locally

```bash
npm run build
```

Search the repo for regressions:

```bash
rg 'style=' src
rg 'mailto:' src
```

## PageSpeed follow-up

Scores depend on hosting, caching, TLS, and CDN. If specific opportunities remain (LCP image, unused JS, CLS), use the exact Lighthouse recommendations for a second pass.
