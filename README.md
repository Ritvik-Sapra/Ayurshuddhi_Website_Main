# AyurshuddhiWellness website

Marketing site for AyurshuddhiWellness (Ayurveda and naturopathy clinic, Greater Noida), built from the
Figma file "Explor Template – Rebuild (Mobile-first)". Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm run start` | Production build and server |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint (also enforces the frontend / backend / shared boundaries) |
| `npm run format` | Prettier |
| `npm run test:e2e` | Builds the site and runs the Playwright tests (navigation, forms, reduced motion, axe accessibility checks). First time: `npx playwright install chromium` |

Copy `.env.example` to `.env.local` to configure email, spam protection and lead storage. Every key is optional.

## Routes

`/` · `/ayurveda` · `/panchakarma` (one `[service]` template) · `/services` · `/about` · `/blogs` · `/blogs/dinacharya-daily-routine` · `/contact` · `/privacy-policy` · `/terms` · 404 page

API: `POST /api/book` (consultation booking) and `POST /api/contact` (contact message).

## How the code is organised

One Next.js app, split by responsibility:

```
src/
  app/        routing only: thin page / layout / loading / route files
  frontend/   what visitors see
    components/  layout (nav, menu, footer), ui, cards, sections, forms, skeletons
    content/     typed data files: site.ts, services.ts, blogs.ts, about.ts, legal.ts, home.ts
    styles/      globals.css (design tokens), motion.css, skeleton.css
  backend/    server-only code: handlers (book, contact), services (email, leads, spam), env.ts
  shared/     Zod schemas and constants used by both the forms and the API
```

- **Design tokens** (colours, type scale, radius, motion) are defined once in `src/frontend/styles/globals.css` under `@theme`.
- **Content** lives in `src/frontend/content/*.ts`, not in the components. Pages read it through `content/index.ts`, so a CMS can replace it later.
- **Adding a service page**: add an entry to `serviceDetails` in `content/services.ts` and its slug to `SERVICE_SLUGS` in `shared/constants.ts`. The `[service]` route picks it up.
- **Adding photos or videos**: put licensed files in `public/media/`, set `src` / `videoSrc` in the content files, and record them in `public/ASSETS.md`.

## Loading skeletons

Each route has a `loading.tsx` that renders a plain HTML skeleton (`components/skeletons/Skeletons.tsx`) styled by
`styles/skeleton.css` (no JavaScript, reduced-motion safe). Image slots shimmer until the image loads.
To see them in development, set `SKELETON_DEMO_DELAY_MS=1500` in `.env.local` and navigate between pages. In production the
pages are static, so skeletons only appear on slow connections or once content comes from a CMS.

## Before launch (TODO)

- Photography and licensed videos (see `public/ASSETS.md`); the Framer template videos referenced in Figma are **not** included.
- Real testimonials, article text, and privacy / terms copy (currently placeholders marked `TODO(copy)` / `TODO(legal)`).
- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- Wire email (Resend), lead storage (Supabase) and spam protection (Turnstile / a shared rate limiter) in `src/backend/services/`.
- Home page: add the practitioner, featured services and blog teaser sections from the live site.

## Deploy

Deploys to Vercel as-is (one project, no extra services). Set the variables from `.env.example` in the project settings.
Cloudflare Pages works as a fallback. Note that Vercel's free Hobby plan is for non-commercial use.
