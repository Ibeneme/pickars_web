# Pickars Web

The Pickars marketing website, admin console and investor portal, built with
[Next.js](https://nextjs.org) (App Router), React, TypeScript and Tailwind CSS.

| Area            | Routes                                                      | Indexed by search engines |
| --------------- | ----------------------------------------------------------- | ------------------------- |
| Marketing site  | `/`, `/app/*` (features, FAQs, help center, tracking, legal) | Yes                       |
| Admin console   | `/admin/*`                                                  | **No**                    |
| Investor portal | `/investors/*`                                              | **No**                    |

## Getting started

```bash
npm install
cp .env.example .env.local   # then adjust values
npm run dev                  # http://localhost:3000
```

| Script               | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | Start the development server                             |
| `npm run build`      | Production build                                         |
| `npm run start`      | Serve the production build                               |
| `npm run lint`       | ESLint                                                   |
| `npm run typecheck`  | TypeScript, no emit                                      |
| `npm run check:seo`  | Verify every referenced Open Graph / logo asset exists   |

## Environment variables

See [`.env.example`](./.env.example).

| Variable                                | Description                                   |
| --------------------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                  | Canonical origin (canonicals, sitemap, schema) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`  | Google Search Console verification token       |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`    | Bing Webmaster Tools verification token        |

## Project structure

```
app/                  Routes, layouts, robots.ts, sitemap.ts, manifest.ts
  admin/              Private admin console (noindex)
  investors/          Private investor portal (noindex)
  app/                Public marketing pages
components/
  landing-page/       Page sections for the marketing site
  main/               Navbar, footer, app-download CTA
  seo/                <JsonLd /> structured-data component
api/                  Redux store, slices, axios instance
utils/
  constants.ts        Base URL and app-store links
  seo/                Central SEO layer (see below)
scripts/              Tooling (SEO asset check)
```

## SEO architecture

Everything SEO-related is centralised in `utils/seo/` so pages stay tiny and
consistent.

- **`config.ts`** – business facts (name, phone, social profiles, service areas,
  app-store IDs, Open Graph images). Change a fact once; metadata, JSON-LD and
  the footer all update.
- **`metadata.ts`** – `createPageMetadata()` returns a complete `Metadata`
  object (title, description, canonical, Open Graph, Twitter) for a page.
- **`schema.ts`** – JSON-LD builders (`Organization`, `WebSite`,
  `LocalBusiness`, `MobileApplication`, `BreadcrumbList`, `FAQPage`,
  `pageSchema`).
- **`routes.ts`** – public routes for `app/sitemap.ts` and private paths for
  `app/robots.ts`.

### Adding a new public page

```tsx
// app/app/my-page/page.tsx
import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import { createPageMetadata } from "@/utils/seo/metadata";
import { pageSchema } from "@/utils/seo/schema";

const PATH = "/app/my-page";
const DESCRIPTION = "One clear sentence, 120–155 characters.";

export const metadata: Metadata = createPageMetadata({
  title: "Short, keyword-led title", // " | Pickars" is appended automatically
  description: DESCRIPTION,
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: PATH,
          name: "My page",
          description: DESCRIPTION,
          breadcrumbs: [{ name: "My page", path: PATH }],
        })}
      />
      {/* page content – exactly ONE <h1> */}
    </>
  );
}
```

Then add the path to `utils/seo/routes.ts` so it appears in the sitemap.

### Rules of thumb

- Exactly one `<h1>` per page (the hero). Footer and CTA use lower levels.
- Only the above-the-fold image uses `priority`; everything else lazy-loads.
- FAQ structured data must be generated from the same data the page renders.
- Never add ratings/reviews to structured data unless they are real and visible.
- Private areas inherit `noindex` from `app/admin/layout.tsx` and
  `app/investors/layout.tsx`; they also receive an `X-Robots-Tag` header.

## Deployment

Deployed on Vercel (`vercel.json` pins the Next.js framework preset). Only the
**production** environment is crawlable; preview deployments serve a
`Disallow: /` robots file.
