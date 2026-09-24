# Akshar Immigration Platform

```
immigration/
├── akshar-immigration/   # Next.js site (Phase 1 + 2)
├── akshar-studio/        # Sanity Studio (7 schemas)
└── design-system.md      # Visual direction
```

## Run the site

```bash
cd akshar-immigration
cp .env.example .env.local
npm run dev
```

Opens at http://localhost:3000 — uses seed content until Sanity credentials are set.

## Run Studio

```bash
cd akshar-studio
cp .env.example .env
# set SANITY_STUDIO_PROJECT_ID
npm run dev
```

Requires Node 20+. Prefer upgrading to Node 22+ before installing Sanity v4+.

## What you still need to provide

| Item | When |
|------|------|
| Sanity project ID + dataset | Phase 1 live CMS |
| HubSpot private app token + portal ID | Phase 2 lead capture |
| Gemini API key (Google AI Studio) | AI chat |
| Cal.com booking URL + webhook secret | Booking tool |
| GA4 measurement ID | Analytics |
