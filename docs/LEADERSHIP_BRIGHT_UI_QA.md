# DCG GROUP — Leadership and light UI validation

Date: 2026-10-14
Scope: DCG GROUP only, repository `lehoangson03tn-ui/dcg-group`.
The two unrelated files sent mistakenly by the user were excluded.

## Leadership source
- **Trương Quốc Huy** — **Founder & CEO**.
- “Nhà sáng lập & Tổng giám đốc DCG GROUP”.
- Portrait copied as-is from the user-confirmed `lehoangson03tn-ui/dcg-growmatch/public/images/ceo-founder-dcg.png`, original 640 × 910 RGB PNG.
- Single source of truth: `src/main.js` → `leadership`.
- Displayed on home `#lanh-dao` and about `/gioi-thieu#ban-lanh-dao`; menu/footer links exist.
- Image uses `object-fit: contain` with a 4:5 portrait container and no simulated alterations.

## Browser-based tests (Chromium emulation; not physical device checks)
- 27/27: exact name/title, leadership home/about, 360/390/430/768/820/1024/1280/1440 px, anchor offsets, menu, footer, contact, search and navigation.
- Additional 10/10: 320/360/390/430/720/768/820/1024/1280/1440 px, image decoded 640×910, object-fit contain, no horizontal overflow, anchor below fixed header.
- Approximation of 200% desktop browser zoom: reflow at 720 CSS-pixel effective viewport; physical browser zoom not verified.
- Color contrast: key text/background samples evaluated against 4.5:1, including leadership, navigation, footer and solution cards; insufficient footer and solution card text contrast identified and corrected.
- Vercel Preview deployment built successfully; production main was intentionally left unchanged pending user review.

## What this does not prove
- No independent verification of the subject's civil identity; user explicitly confirmed the supplied source portrait.
- No real-device iPhone/iPad screenshots, screen reader assessment, independent full-site WCAG audit, video performance profiling or formal legal review.
- Portrait PNG is lazy-loaded below the fold, approximately 785 KB; further lossless/visually lossless optimization is recommended for a final performance gate.

## QA screenshots
- Generated in Vercel sandbox via Chromium at mobile/desktop viewports, not by physical devices.

## Visual comparison files (same nominal viewport width)

| Viewport | Before — public site without leadership section | After — preview leadership section |
|---|---|---|
| 390 CSS px | [Before mobile](qa/leadership/before-mobile-390.jpg) | [After mobile](qa/leadership/after-mobile-390.jpg) |
| 1440 CSS px | [Before desktop](qa/leadership/before-desktop-1440.jpg) | [After desktop](qa/leadership/after-desktop-1440.jpg) |

**Comparison limitation:** "before" is a representative screenshot of the earlier public /gioi-thieu page at the section where leadership was previously absent, whereas "after" is the new /gioi-thieu#ban-lanh-dao section. The viewport widths match; content and scroll positions do not match pixel-for-pixel. The images are sourced from browser emulation.

## Continued QA after user photo confirmation

- Public Vercel preview at commit `722de4dd`: HTTP 200 for home, /gioi-thieu, /he-sinh-thai, /lien-he; owner-confirmed portrait loads as image/png HTTP 200, 785058 bytes.
- 10/10 additional viewport checks pass at 320, 360, 390, 430, 720, 768, 820, 1024, 1280 and 1440 CSS px (portrait resolution 640 × 910, object-fit contain, no horizontal overflow, header offset correct).
- Text contrast sampling on home, Giới thiệu, Hệ sinh thái, Giải pháp, Dự án and Liên hệ: no sampled ordinary text below 4.5:1 after footer and solution-card fixes. This sampling is **not** a complete page-wide WCAG audit.
- Responsive proxy for 200% zoom: viewport reduced to 720 CSS px at nominal 1440 px: **PASS**. Applying `zoom: 200%` to the root HTML element without changing media-query viewport causes 44 px horizontal overflow: **FAIL, but this is not equivalent to normal browser zoom**. Browser keyboard zoom in headless Chromium could not be verified, so **native 200% browser zoom: BLOCKED / not verified**.
- Real iPhone/iPad tests, screen reader audit, legal disclosure and portrait compression to modern format still outstanding.
- QA assets and preview remain on a feature branch pending user visual signoff; `main` and production not modified.
