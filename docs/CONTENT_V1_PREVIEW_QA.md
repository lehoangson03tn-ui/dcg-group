# DCG GROUP — Website Content V1.0 Preview QA

Date: 2026-10-14  
Repository: `lehoangson03tn-ui/dcg-group`  
Branch: `content/website-copy-v1-20261014`  
Input basis: `DCG_GROUP_NOI_DUNG_WEBSITE_V1_0(1).md` supplied by the project owner.  
Status: **Preview / pending editorial approval**. Production `main` unchanged.

## Content integrated
- Homepage hero: **Công nghệ có ích. Sáng tạo có bản sắc.**; message **Việt Nam – Kỷ nguyên vươn mình** retained.
- Homepage brand introduction, four brand summaries, needs-to-branch cards, proposed four-step collaboration approach, leadership section, actual two project links, and three preview articles.
- About DCG: origin story, vision, mission, five principles, Vietnamese identity and approved leadership photo/name/title.
- Four brand detail pages: separate introduction, focus areas and FAQs extracted from the provided content. Generic filler leadership biography removed.
- Talent retains its official link to DCG GROWMATCH. Vision retains human-in-the-loop and camera-data cautions.
- Brand directory: accessible category filter, Vietnamese diacritics-insensitive search, empty state, reset and URL query updates.
- Solutions index: redirects users by business need to the four brand pages without pretending unverified commercial services are available.
- Góc nhìn: three full editorial articles with category filter. No fictitious publication date or author attribution.
- Contact: optional organization, email OR phone, branch preselection from home, form validity and copy-to-clipboard behavior. **The form does not transmit messages to any backend.**
- Added routes, sitemap entries, page SEO title/description and navigation/footer link to Góc nhìn.
- Approved Trương Quốc Huy portrait and founder profile retained unchanged.

## Automated browser QA, Chromium emulation
- **32/32 PASS**: responsive homepage at 320, 360, 390, 430, 768, 820, 1024, 1280, 1440 CSS px; 13 main/brand/article/contact routes; brand search; article list/filter/navigation; contact preselection and validation; mobile nav; zero page JS exceptions.
- **14/14 PASS**: responsive header behavior (menu collapses at 820, 900, 1024; desktop links avoid overlap at 1280/1440); category+search combinations; reset; alternative terms; leadership anchor offset; selected source SEO titles; absence of editorial notes on article pages.
- Latest Preview: HTTP 200 for home, About, Ecosystem, Vision, Góc nhìn, article, Contact, XML sitemap; unknown page HTTP 404.
- These are browser simulations, not physical iPhone/iPad tests.

## Important publishing gates / limits
- The owner-supplied copy is a **draft for project-owner editorial approval**, not verified company facts. Content is published only to a reviewable Preview deployment.
- Proposed partnership workflow is explicitly labeled as proposed; actual pricing/services and delivery commitments are NOT asserted.
- Privacy policy and legal terms were NOT published: controller identity, logging, data flows, storage, service provider details and official intake channel remain unverified.
- The form has no server-side submit and does not claim "request sent". No official email, phone or address is invented.
- Articles are editorial writing, not news or research findings; dates and authors are deliberately omitted pending approval.
- The project case studies and commercial metrics remain unverified; no fake testimonials or results.
- SPAs update document title and meta client-side; server-rendered per-route SEO remains pending.
- Native 200% browser zoom, real-device testing, exhaustive WCAG and performance audits remain pending; the previously approved leader photograph is still approximately 785 KB.
- There was no modification to DCG GROWMATCH, Supabase, payment systems or real expenditure.

## Preview URL
https://dcg-group-a3xl2hb43-lehoangson03tn-5265.vercel.app/

## Editorial checklist for the owner
- Review new headline, mission, values, needs/steps, four brand descriptions and FAQs.
- Review the three Góc nhìn articles and approve author/date before formal publication.
- Confirm any real intake contact channel, data practices and commercial service list before enabling contact submissions.
- Review visual fit on a physical smartphone/tablet before production promotion.
