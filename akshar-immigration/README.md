# Akshar Immigration Website

Phase 1 public site + Phase 2 tools. Sanity CMS (sibling `../akshar-studio`).

## Quick start

```bash
cd akshar-immigration
cp .env.example .env.local
npm install
npm run dev
```

Without Sanity credentials, the app serves **seed content** so pages still work.

## Studio

```bash
cd ../akshar-studio
cp .env.example .env
# set SANITY_STUDIO_PROJECT_ID
npm run dev
```

## Env (Phase 1 minimum)

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (optional for public reads)

Phase 2: HubSpot, Gemini, Cal.com — see `.env.example`.
