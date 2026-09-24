# Akshar Immigration — Design System

Visual direction for Phase 1 + 2 (implemented in Tailwind / CSS variables).

## Concept

**Calm authority** — licensed immigration firm for South Asian diaspora families.
Deep ink navy + warm parchment surfaces + a single saffron/gold accent.
Not purple gradients, not cream+terracotta cliché, not dark-mode glow.

## Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#0B1F3A` | Primary text, nav, hero overlays |
| `--ink-soft` | `#1A3358` | Secondary surfaces |
| `--parchment` | `#F7F3EB` | Page background |
| `--parchment-deep` | `#EBE4D6` | Section alternates |
| `--gold` | `#C4A35A` | Accents, CTAs, underlines |
| `--gold-hot` | `#D4B56A` | Hover |
| `--mist` | `#8A9BB0` | Muted labels |
| `--success` | `#2F6B4F` | Trust / success |

## Typography

- **Display:** Fraunces (serif) — brand name, hero headlines
- **Body:** Source Sans 3 — UI, paragraphs
- Avoid Inter, Roboto, Arial, system-ui as primary stacks

## Motion (intentional, sparse)

1. Hero: brand + headline fade/rise once on load
2. Destination tiles: staggered reveal on scroll
3. Pathway tabs: opacity crossfade (CSS), content stays in DOM

## Layout rules

- Homepage first viewport: brand, one headline, one sentence, CTA group, full-bleed hero only
- Destination-first nav (countries)
- No card grids in hero; cards only for interactive tool steps
- Persistent WhatsApp (+44 7918 036171) + AI chat above it

## Reference

Evolved from aksharimmigrationconsultancy.com copy/IA cues; structure follows Locked Decisions (destination-first, hybrid pathway tabs).
