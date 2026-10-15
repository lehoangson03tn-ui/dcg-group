# DCG GROUP — Image provenance and display registry
**Editorial direction:** “Tinh thần Việt trong đời sống đương đại”  
**Date:** 2026-10-15 · **Scope:** DCG GROUP public website `dcg-group.vercel.app`.

## Usage policy

- No generative AI photos are used in this collection.
- Licensed Unsplash photographs are **illustrations**, **not** DCG's premises, equipment, staff, customers or completed projects.
- Each of the four Unsplash pages was checked for the words **“Free to use under the Unsplash License”** (standard free license, not Unsplash+). License: https://unsplash.com/license — commercial website use is permitted, attribution recommended (we credit authors in captions).
- These four photos are genuine photography, but photo authenticity cannot be independently guaranteed beyond the original photographers' source pages. Do not claim their subjects are DCG personnel.
- Downloaded JPG originals (`*-licensed-source.jpg`) are preserved unchanged in this repository; WebP files are derived only by resize/compression, without filters, gradients, overlays, facial retouching or object insertion.
- **Event photos** and the approved founder portrait are kept byte-for-byte and are never cropped.
- The original five `public/assets/hero-*.webp` files remain as rollback artifacts only, no longer used in page markup. Their origin/rights were not established and must not be republished without review.
- Images and logo files have separate provenance categories; logos and their source artwork are never replaced by photographs.

## Approved website image mapping

| Content image | Source and photographer | License / status | Usage positions | Desktop & mobile display | Alt / visible credit |
| --- | --- | --- | --- | --- | --- |
| `editorial/hcm-city-1600.webp` / `-960.webp` | [Ho Chi Minh City skyline](https://unsplash.com/photos/city-skyline-during-day-time-In5ENUxUrO8) · jet dela cruz | Unsplash License; real Vietnam city photograph, *illustration only* | Homepage hero and About (DCG GROUP) | Desktop 16:9/cover with focus **50% 52%**; mobile 4:5 only where layout provides portrait space, center 50% 50%; do not add DCG logos to buildings | “Thành phố Hồ Chí Minh nhìn từ trên cao, ảnh minh họa” · photo by jet dela cruz |
| `recognition/FBA1C8B9-ED38-42D6-8EF9-50CBECBFA44D.jpeg` | User-selected real event image, associated with [NTTU event coverage](https://ntt.edu.vn/nttu-tim-kiem-nha-quan-tri-tuong-lai-qua-cuoc-thi-ceo-thoi-dai-so/); exact photographer not independently verified | Owner-provided/selected documentary image; NTTU marks retained. **No automatic broad third-party reuse right asserted.** | DCG TALENT ecosystem brand / brand detail and DCG GROWMATCH project intro, plus original achievement article | `object-fit: contain`, natural **3:2**, no cropping, full watermark, image width and height 1536×1024 | “Tư liệu tham dự cuộc thi CEO thời đại số của đội ĐÀN CÁ GỖ, DCG GROWMATCH” · real group documentation |
| `editorial/studio-crew-1600.webp` / `-960.webp` | [Filmmaker operating a camera](https://unsplash.com/photos/filmmaker-operating-a-camera-indoors-with-another-person-behind-skQLP2oB09k) · Jamie Webster | Unsplash License; **external photo illustration, not DCG Studio crew** | DCG STUDIO brand row, detail, solutions | Desktop 16:10 cover focus **50% 48%**, tablet 16:10, mobile 16:10 or contain if subject clipped | “Người vận hành máy quay trong quá trình sản xuất video, ảnh minh họa” · Jamie Webster |
| `editorial/food-kitchen-1600.webp` / `-960.webp` | [People working in a commercial kitchen](https://unsplash.com/photos/people-working-in-a-commercial-kitchen-YFK5dBI6Ftc) · Adhitya Sibikumar | Unsplash License; **external industry illustration, not an actual LUMIQC deployment** | DCG VISION brand row, detail and LUMIQC project | Desktop 16:10 cover focus **50% 50%**, mobile contain where needed; no detection rectangles/UI overlays | “Nhân viên làm việc trong bếp chuyên nghiệp, ảnh minh họa hoạt động chế biến thực phẩm” · Adhitya Sibikumar |
| `editorial/vietnam-live-stage-1600.webp` / `-960.webp` | [Live performance, Ho Chi Minh City](https://unsplash.com/photos/people-watching-a-band-performing-on-stage-during-nighttime-2L6FJbsWtCg) · Tony Pham | Unsplash License; **real event in Vietnam, not an event of DCG Entertainment** | DCG ENTERTAINMENT brand row, detail, solutions | Desktop 16:10 cover focus **50% 46%**; mobile 16:10 / contain if faces obscured | “Khán giả xem biểu diễn âm nhạc tại Thành phố Hồ Chí Minh, ảnh minh họa” · Tony Pham |
| `recognition/NTTU_0058.jpeg` | User-selected full-resolution NTTU prize-giving image | Owner-approved documentary image; original byte-for-byte, watermark preserved | **Only** DCG GROWMATCH recognition thumbnail + full article, not the main Talent or DCG home banner | Full 3:2, contain, **no cropping** | “Đội thi ĐÀN CÁ GỖ tại lễ trao giải CEO thời đại số” |
| `dcg-founder-portrait.png` | Owner-approved portrait of Trương Quốc Huy | Owner-selected portrait; retain unmodified | Founder section on Home and About | Natural portrait **640×910**, contain; no face retouch | “Chân dung Trương Quốc Huy, Nhà sáng lập DCG GROUP” |

## Brand logos (protected)

All approved `dcg-*-emblem-*.webp` and `dcg-entertainment-emblem-transparent-preserved.png` assets stay in place. They are not stock imagery, and are not to be treated as replaceable photos. **No logo rework** in this change.

## Unfilled future documentary needs

1. Original DCG GROUP team and office activity photographs with written permission for corporate publication (current event documentation is not a substitute for day-to-day team footage).
2. Original DCG STUDIO production-workflow photographs; current footage is explicitly a licensed third-party illustration.
3. Original DCG VISION / LUMIQC equipment or pilot testing photographs, **only** after tests exist; current kitchen photograph makes no claim of deployment.
4. Original DCG ENTERTAINMENT rehearsal/performance images produced or licensed by DCG; current concert image is illustrative.

**Publication caution:** A standard Unsplash license permits use of images, but does not by itself guarantee rights to brands, private locations or an individual's endorsement. Context must remain non-endorsing and the illustrative nature visible. Do not use the pictures as client testimonials.

## Photo sourcing and content checks

The source IDs are pinned in `tools/import_editorial_photos.py` and the original source JPEGs are preserved. All replacements should be reviewed against this registry before merging, with browser checks at 390/768/834/1024/1440px, image decoded dimensions and actual URL access. Do not substitute `source.unsplash.com` random image endpoints, Unsplash+ content, or unlicensed Google/blog/reposted images.
