# DCG GROUP — Golden Gate-style Structure v1.0
**Date:** 2026-10-14  
**Branch:** feature/ggg-structure-v1  
**Basis:** DCG_GROUP_LENH_HOAN_THIEN_WEBSITE_GGG_V1_0(1).md  
**Scope:** Corporate DCG GROUP only. Does not change DCG GROWMATCH / Supabase.

## Shipped on branch
- Brand directory at `/he-sinh-thai`: 4 cards, 2 columns for tablet/desktop, 1 column mobile.
- Usable search: case-insensitive, Vietnamese diacritics-insensitive, Enter, clear, empty state, URL query and browser back.
- Four detailed brand pages at `/he-sinh-thai/dcg-*`, with breadcrumbs, areas of focus, collaboration guidance, FAQ, related brands.
- Old brand aliases remain functional: `/talent`, `/studio`, `/vision`, `/entertainment`.
- `/gioi-thieu` introduced; older `/ve-dcg` stays live.
- `/giai-phap`, grounded solution detail pages, `/du-an` and project detail pages.
- Search semantics, accessible menu focus handling, canonical metadata, XML sitemap, robots.txt and explicit HTTP 404 for unknown routes.
- Bright existing DCG design, approved DCG visual assets preserved.

## Validation evidence (Vercel sandbox Chromium, viewport simulation)
- Main test script: 32/32 PASS, includes 360,390,430,768,820,1024,1440 px, functional search, no-results, reset, brand nav/back, menu open/Escape and 16 route checks; 768 px expected 2-column layout.
- Accessibility/functional supplement: 11/11 PASS, including 320 px, keyboard menu focus trap, Escape focus restore, search Enter and copy-only contact form.
- Live preview HTTP: valid routes 200, sitemap.xml 200, robots.txt 200; non-existent route returns 404.
- Browser errors: none observed in test scope.
- Screenshots captured in sandbox for directory 390/820/1440 px. These are viewport emulations, **not physical devices**.

## Known limits / NOT DONE
- Contact form **does not send**: copy-only by design until verified inbox and backend exist.
- No CMS or admin workflow. Avoid publishing unverified news, pricing, customer logos or milestones.
- No approved articles to publish: /tin-tuc remains unpublished.
- Full legal privacy policy and terms need verified processing information/legal review. The limited `/thong-tin-du-lieu` is an operational explanation, not final policy.
- Not yet Lighthouse scored, screen-reader audited, pen-tested, or verified on physical iPhone/iPad.
- SPA HTML shell remains shared across routes. Browser updates title/description/canonical; per-route server-rendered SEO and social metadata still need refinement.
- New source asset ownership, photo rights and real project evidence should be reviewed before external promotion.

## Readiness
Directory/design & public navigation preview: PASS.
Back-end contact/CMS/legal publishing and comprehensive WCAG/performance verification: BLOCKED / NOT VERIFIED, not to be misrepresented as PASS.
