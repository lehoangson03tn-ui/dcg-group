
import './growmatch-page.css';

/**
 * DCG GROWMATCH editorial project page.
 * Existing CEO thoi dai so recognition article is injected verbatim by main.js.
 * Existing DCG GROUP shell, global navigation, brands and footer are unchanged.
 */
export function growmatchPage(recognitionArticle) {
 const before = [
 '<article class="gm" id="growmatch-top">',
 '<nav class="gm-context" aria-label="Điều hướng nhanh DCG GROWMATCH"><div class="gm-container gm-context-inner">',
 '<a href="/du-an" class="gm-context-brand" aria-label="Quay lại trang các dự án"><img src="/assets/dcg-talent-emblem-safe.webp" width="34" height="34" alt=""><span><b>DCG GROWMATCH</b><small>DCG TALENT / DCG GROUP</small></span></a>',
 '<div class="gm-context-links"><a href="#gm-problem">Bài toán</a><a href="#gm-solution">Giải pháp</a><a href="#gm-process">Cách hoạt động</a><a href="#gm-product">Nền tảng</a><a href="#gm-team">Đội ngũ</a><a href="#thanh-tich">Dấu ấn</a><a href="#gm-vecom">Vecom 2026</a></div>',
 '<a class="gm-context-cta" href="https://dcg-growmatch.vercel.app/" target="_blank" rel="noopener noreferrer">Trải nghiệm <span aria-hidden="true">↗</span></a>',
 '</div></nav>',
 '<header class="gm-hero" aria-labelledby="gm-title"><div class="gm-container gm-hero-grid">',
 '<div class="gm-hero-copy"><p class="gm-kicker">DCG TALENT / Ý TƯỞNG KINH DOANH SỐ</p><h1 id="gm-title">DCG GROWMATCH<span>Để năng lực được nhìn thấy, để cơ hội được mở ra</span></h1>',
 '<p class="gm-lead">Nền tảng hỗ trợ tuyển dụng, đánh giá kỹ năng và phát triển nhân sự bằng trí tuệ nhân tạo.</p>',
 '<p class="gm-slogan">Phù hợp trước – Phát triển tiếp – Con người quyết định</p>',
 '<div class="gm-actions"><a class="gm-button gm-button-primary" href="#gm-problem">Khám phá giải pháp <span aria-hidden="true">↗</span></a><a class="gm-button gm-button-outline" href="https://dcg-growmatch.vercel.app/" target="_blank" rel="noopener noreferrer">Mở website sản phẩm <span aria-hidden="true">↗</span></a></div>',
 '<p class="gm-hero-note">Dự án được giới thiệu theo trạng thái phát triển thực tế, không coi ảnh minh họa là kết quả thử nghiệm.</p></div>',
 '<div class="gm-hero-visual"><div class="gm-visual-frame gm-visual-frame--ai"><img src="https://dcg-group-ecosystem.floot.app/_cdn/static/8ff254fb-f2a9-42f3-9de6-73d0e086717b-growmatch-ai-hero-launch.png" width="1672" height="941" alt="Hình minh họa bằng AI về các nhân sự Việt Nam và công nghệ kết nối nghề nghiệp" fetchpriority="high" decoding="async"></div></div>',
 '</div><div class="gm-container gm-hero-floor"><span>01 / KẾT NỐI</span><span>02 / ĐÁNH GIÁ</span><span>03 / PHÁT TRIỂN</span><span>04 / CON NGƯỜI QUYẾT ĐỊNH</span></div></header>',
 '<section class="gm-section" id="gm-problem" aria-labelledby="gm-problem-title"><div class="gm-container">',
 '<div class="gm-head gm-head-split"><div><p class="gm-kicker">01 / BÀI TOÁN THỊ TRƯỜNG</p><h2 id="gm-problem-title">Một bản CV chưa thể phản ánh hết năng lực</h2></div><p>Doanh nghiệp cần thêm cơ sở để hiểu cách ứng viên xử lý công việc. Người mới lại cần không gian luyện tập trước khi bước vào tình huống thật.</p></div>',
 '<div class="gm-three"><article class="gm-tile"><span class="gm-index">01</span><h3>Khó đánh giá kỹ năng</h3><p>Hồ sơ ứng tuyển không phải lúc nào cũng cho thấy cách ứng viên giao tiếp, phản hồi hoặc xử lý tình huống.</p></article>',
 '<article class="gm-tile"><span class="gm-index">02</span><h3>Nhân sự mới cần luyện tập</h3><p>Thực hành tình huống trong môi trường có hướng dẫn giúp người học chuẩn bị trước khi tiếp xúc công việc.</p></article>',
 '<article class="gm-tile"><span class="gm-index">03</span><h3>Quyết định cần căn cứ</h3><p>Nhà tuyển dụng cần thông tin có thể xem lại và giải thích thay vì chỉ dựa vào ấn tượng ban đầu.</p></article></div>',
 '<div class="gm-story-gallery" aria-label="Hình minh họa về chuyển đổi số nhân lực"><img src="https://dcg-group-ecosystem.floot.app/_cdn/static/8d4a5ed3-355c-466a-abc6-ad3ef8daa3bc-growmatch-ai-recruitment.png" width="1448" height="1086" loading="lazy" decoding="async" alt="Hình minh họa AI về cuộc trao đổi tuyển dụng giữa chuyên viên nhân sự và ứng viên"><img src="https://dcg-group-ecosystem.floot.app/_cdn/static/792e49f5-43e5-4b41-91d3-990eade2df07-growmatch-ai-collaboration.png" width="1448" height="1086" loading="lazy" decoding="async" alt="Hình minh họa AI về nhóm người trẻ cộng tác phát triển giải pháp số"></div>',
 '</div></section>',
 '<section class="gm-section gm-section-alt" id="gm-solution" aria-labelledby="gm-solution-title"><div class="gm-container gm-editorial-grid">',
 '<div class="gm-editorial-media"><img src="https://dcg-group-ecosystem.floot.app/_cdn/static/8c85b588-72b1-45e5-bdb2-5c40091391c9-growmatch-ai-voice-coaching.png" alt="Hình minh họa AI về luyện tập hội thoại và nhận phản hồi kỹ năng trên máy tính" loading="lazy" decoding="async" width="1448" height="1086"></div>',
 '<div class="gm-editorial-copy"><p class="gm-kicker">02 / GIẢI PHÁP</p><h2 id="gm-solution-title">Tuyển dụng không dừng lại ở tìm người</h2><p class="gm-pull">Kết nối cơ hội, hiểu kỹ năng và tạo điều kiện để phát triển tiếp.</p><p>DCG GROWMATCH hướng tới một hành trình liên kết giữa ứng viên và doanh nghiệp, từ khám phá vị trí phù hợp đến đánh giá và thực hành tình huống công việc.</p><p>AI có thể hỗ trợ phản hồi và tổng hợp thông tin. Quyết định tuyển dụng và đánh giá cuối cùng vẫn thuộc về con người.</p><a class="gm-text-link" href="#gm-process">Tìm hiểu cách hoạt động <span aria-hidden="true">↗</span></a></div>',
 '</div></section>',
 '<section class="gm-section" id="gm-process" aria-labelledby="gm-process-title"><div class="gm-container"><div class="gm-head"><p class="gm-kicker">03 / CÁCH HOẠT ĐỘNG</p><h2 id="gm-process-title">Bốn bước trong một hành trình nhân sự</h2><p>Luồng dưới đây trình bày định hướng trải nghiệm, không đồng nghĩa mọi thành phần đã được nghiệm thu.</p></div>',
 '<ol class="gm-steps"><li><span>01</span><h3>Kết nối</h3><p>Doanh nghiệp công bố nhu cầu, ứng viên tìm hiểu những cơ hội nghề nghiệp.</p></li><li><span>02</span><h3>Đánh giá</h3><p>Người phụ trách xem xét hồ sơ, kỹ năng và thông tin từ tình huống phù hợp.</p></li><li><span>03</span><h3>Luyện tập</h3><p>Người được cấp quyền thực hành với AI và nhận phản hồi để tiến bộ.</p></li><li><span>04</span><h3>Quyết định</h3><p>Doanh nghiệp tổng hợp bằng chứng và chủ động đưa ra bước tiếp theo.</p></li></ol>',
 '<div class="gm-principle"><strong>AI hỗ trợ, con người quyết định</strong><p>Không để ứng viên tự chấm năng lực và không xem kết quả AI là phán quyết tuyển dụng.</p></div></div></section>',
 '<section class="gm-section gm-section-alt" id="gm-product" aria-labelledby="gm-product-title"><div class="gm-container"><div class="gm-head gm-head-split"><div><p class="gm-kicker">04 / NỀN TẢNG</p><h2 id="gm-product-title">Từ ý tưởng đến trải nghiệm số</h2></div><p>Website sản phẩm độc lập được sử dụng để phát triển và giới thiệu các chức năng. Phạm vi vận hành cần được kiểm tra trên phiên bản thực tế.</p></div>',
 '<div class="gm-product-showcase"><div class="gm-product-shot"><img src="/assets/projects/dcg-growmatch-real-website.webp" width="1600" height="697" alt="Ảnh chụp giao diện trang chủ sản phẩm DCG GROWMATCH" loading="lazy" decoding="async"></div><aside><span class="gm-index">DCG GROWMATCH / PRODUCT</span><h3>Khám phá nền tảng đang phát triển</h3><p>Tiếp cận các khu vực dành cho ứng viên, doanh nghiệp và những hoạt động rèn luyện kỹ năng theo quyền truy cập.</p><p class="gm-evidence">Ảnh là tư liệu giao diện do đội cung cấp. Không dùng ảnh dựng AI làm minh chứng tính năng đã chạy.</p><a class="gm-button gm-button-primary" href="https://dcg-growmatch.vercel.app/" target="_blank" rel="noopener noreferrer">Truy cập sản phẩm <span aria-hidden="true">↗</span></a></aside></div>',
 '<div class="gm-concept-gallery"><div class="gm-concept-image"><img src="https://dcg-group-ecosystem.floot.app/_cdn/static/91d678e8-aba2-4c65-9747-f6c14f0302ca-growmatch-ai-dashboard-concept.png" width="1672" height="941" loading="lazy" decoding="async" alt="Hình AI minh họa ý tưởng bảng điều khiển tuyển dụng, các điểm số trong ảnh là giả lập"></div><div class="gm-concept-copy"><p class="gm-kicker">MINH HỌA ĐỊNH HƯỚNG SẢN PHẨM</p><h3>Trực quan hóa thông tin, hỗ trợ quyết định</h3><p>Giao diện minh họa giúp hình dung cách tập hợp hồ sơ, đánh giá kỹ năng và tiến độ tuyển dụng. Các biểu đồ và tỷ lệ trong hình không phải số liệu thực tế.</p></div></div>',
 '<div class="gm-audiences"><article><span class="gm-index">DÀNH CHO DOANH NGHIỆP</span><h3>Hiểu ứng viên rõ hơn</h3><p>Tìm hiểu hồ sơ, nhu cầu tuyển dụng và thông tin đánh giá kỹ năng trong một hành trình có cấu trúc.</p></article><article><span class="gm-index">DÀNH CHO ỨNG VIÊN</span><h3>Chuẩn bị cho cơ hội tiếp theo</h3><p>Khám phá việc làm, hiểu yêu cầu vị trí và luyện tập khi được doanh nghiệp cấp quyền.</p></article></div></div></section>',
 '<section class="gm-section" id="gm-model" aria-labelledby="gm-model-title"><div class="gm-container gm-model-grid"><div><p class="gm-kicker">05 / MÔ HÌNH KINH DOANH SỐ</p><h2 id="gm-model-title">Giải pháp dành cho nhu cầu thực tế của doanh nghiệp</h2><p>Định hướng thương mại tập trung vào tổ chức có nhu cầu tuyển dụng, hướng dẫn và phát triển năng lực nhân sự. Các gói dịch vụ chỉ được công bố chính thức khi có phương án giá đã duyệt.</p></div><div class="gm-model-details"><div><b>Khách hàng</b><span>Doanh nghiệp và bộ phận tuyển dụng, đào tạo</span></div><div><b>Giá trị</b><span>Hỗ trợ xem xét năng lực và luyện tập tình huống</span></div><div><b>Doanh thu dự kiến</b><span>Dịch vụ cho doanh nghiệp và các gói sử dụng theo phạm vi được phê duyệt</span></div></div></div></section>',
 '<section class="gm-section gm-section-alt" id="gm-team" aria-labelledby="gm-team-title"><div class="gm-container"><div class="gm-head gm-head-split"><div><p class="gm-kicker">06 / ĐỘI NGŨ THỰC HIỆN</p><h2 id="gm-team-title">ĐÀN CÁ GỖ</h2></div><p>Hai thành viên chính thức từ ngành Quản trị kinh doanh, Trường Đại học Nguyễn Tất Thành, lớp 25DQT1A.</p></div>',
 '<div class="gm-team-carousel" role="region" aria-roledescription="Bộ trình chiếu thành viên" aria-label="Hồ sơ hai thành viên đội ĐÀN CÁ GỖ"><div class="gm-team-track" id="gm-team-track" tabindex="0" aria-label="Dùng phím mũi tên trái hoặc phải để chuyển thành viên">',
 '<article class="gm-person gm-team-slide" data-gm-member="0" aria-label="Thành viên 1: Lê Hoàng Sơn"><div class="gm-person-media"><img class="gm-person-photo gm-person-photo--son" src="https://dcg-group-ecosystem.floot.app/_cdn/static/lumiqc-son-portrait-website.webp" width="850" height="1153" alt="Ảnh chân dung Lê Hoàng Sơn mặc áo sơ mi trắng" loading="lazy" decoding="async"></div><div class="gm-person-info"><span class="gm-person-count">01 / 02 · TRƯỞNG NHÓM</span><h3>Lê Hoàng Sơn</h3><span class="gm-person-badge">Trưởng nhóm · ĐÀN CÁ GỖ</span><p>Phụ trách định hướng ý tưởng kinh doanh, nội dung dự án và điều phối hồ sơ giới thiệu DCG GROWMATCH.</p><div class="gm-team-detail"><p class="gm-team-detail-title">TRÁCH NHIỆM & ĐÓNG GÓP</p><ul><li>Định hướng giải pháp và mô hình kinh doanh</li><li>Biên tập nội dung và hồ sơ dự thi</li><li>Điều phối công việc và kết nối các góc nhìn thực tế</li></ul></div><div class="gm-person-meta"><span>TRƯỜNG</span><b>Đại học Nguyễn Tất Thành</b><span>CHUYÊN NGÀNH</span><b>Quản trị kinh doanh</b><span>ĐỘI THI</span><b>ĐÀN CÁ GỖ</b></div></div></article>',
 '<article class="gm-person gm-team-slide" data-gm-member="1" aria-label="Thành viên 2: Trương Quốc Huy" hidden aria-hidden="true"><div class="gm-person-media"><img class="gm-person-photo gm-person-photo--huy" src="https://dcg-group-ecosystem.floot.app/_cdn/static/30e8b869-4cc0-4d9f-b31f-7ad08d2940bc-lumiqc-truong-quoc-huy-vest-user-confirmed.jpeg" width="1122" height="1402" alt="Ảnh chân dung Trương Quốc Huy mặc vest đen" loading="lazy" decoding="async"></div><div class="gm-person-info"><span class="gm-person-count">02 / 02 · THÀNH VIÊN</span><h3>Trương Quốc Huy</h3><span class="gm-person-badge">Thành viên kỹ thuật · ĐÀN CÁ GỖ</span><p>Phối hợp phát triển giải pháp, giao diện và các thành phần kỹ thuật của dự án DCG GROWMATCH.</p><div class="gm-team-detail"><p class="gm-team-detail-title">TRÁCH NHIỆM & ĐÓNG GÓP</p><ul><li>Phối hợp định hướng tính năng và luồng kỹ thuật</li><li>Hỗ trợ phát triển và kiểm thử sản phẩm</li><li>Tham gia hoàn thiện bản trình bày dự án</li></ul></div><div class="gm-person-meta"><span>TRƯỜNG</span><b>Đại học Nguyễn Tất Thành</b><span>CHUYÊN NGÀNH</span><b>Quản trị kinh doanh</b><span>VAI TRÒ DCG</span><b>Nhà sáng lập & Tổng giám đốc</b></div></div></article>',
 '</div><div class="gm-team-navigation" aria-label="Điều hướng thành viên"><button type="button" class="gm-team-arrow" data-gm-member-prev aria-controls="gm-team-track" aria-label="Thành viên trước"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7"/></svg></button><div class="gm-team-pagination"><span class="gm-team-position" aria-live="polite"><span class="gm-team-index-current">01</span> / 02</span><div class="gm-team-dots" aria-label="Chọn thành viên"><button type="button" data-gm-member-dot="0" aria-label="Xem Lê Hoàng Sơn" aria-pressed="true" aria-current="true"></button><button type="button" data-gm-member-dot="1" aria-label="Xem Trương Quốc Huy" aria-pressed="false"></button></div></div><button type="button" class="gm-team-arrow" data-gm-member-next aria-controls="gm-team-track" aria-label="Thành viên tiếp theo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button></div></div>',
 '</div></section>'
 ].join('');
 const after = [
 '<section class="gm-section gm-vecom" id="gm-vecom" aria-labelledby="gm-vecom-title"><div class="gm-container gm-vecom-layout"><div><p class="gm-kicker">08 / Vecom 2026</p><h2 id="gm-vecom-title">Một ý tưởng kinh doanh số, một hành trình tiếp tục kiểm chứng</h2><p>Đội ĐÀN CÁ GỖ giới thiệu DCG GROWMATCH trong định hướng phát triển giải pháp tuyển dụng và nhân sự ứng dụng trí tuệ nhân tạo. Tài liệu dự thi và các kết quả thực nghiệm được phân biệt theo mức độ bằng chứng hiện có.</p><div class="gm-actions"><a class="gm-button gm-button-primary" href="https://dcg-growmatch.vercel.app/" target="_blank" rel="noopener noreferrer">Khám phá DCG GROWMATCH <span aria-hidden="true">↗</span></a><a class="gm-button gm-button-outline" href="/du-an">Các dự án DCG GROUP <span aria-hidden="true">↗</span></a></div></div>',
 '<div class="gm-vecom-panel"><img class="gm-vecom-photo" src="https://dcg-group-ecosystem.floot.app/_cdn/static/792e49f5-43e5-4b41-91d3-990eade2df07-growmatch-ai-collaboration.png" width="1448" height="1086" loading="lazy" decoding="async" alt="Hình minh họa AI về nhóm người trẻ trình bày ý tưởng kinh doanh số"><div class="gm-vecom-signature"><img src="/assets/dcg-group-emblem-safe.webp" alt="" width="58" height="58"><div><span>DCG GROUP / DCG TALENT</span><strong>Phù hợp trước – Phát triển tiếp – Con người quyết định</strong></div></div></div></div></section>',
 '<div class="gm-end-visual" role="img" aria-label="Minh họa AI về mạng kết nối số và tương lai nghề nghiệp" style="background-image:linear-gradient(90deg,rgba(20,45,78,.12),rgba(20,45,78,.0)),url(https://dcg-group-ecosystem.floot.app/_cdn/static/5e705fed-c680-4acc-8e27-c584eadd3cad-growmatch-ai-network-background.png)"></div>',
 '</article>'
 ].join('');
 return before + recognitionArticle + after;
}

/** Same profile-carousel behavior as LUMIQC; independent controls and styles. */
export function initGrowmatchPage() {
 const root = document.querySelector('.gm');
 const track = root?.querySelector('#gm-team-track');
 if (!track) return;
 const members = [...track.querySelectorAll('[data-gm-member]')];
 const dots = [...root.querySelectorAll('[data-gm-member-dot]')];
 const previous = root.querySelector('[data-gm-member-prev]');
 const next = root.querySelector('[data-gm-member-next]');
 const indexLabel = root.querySelector('.gm-team-index-current');
 let current = 0;
 const show = index => {
  current = (index + members.length) % members.length;
  members.forEach((member,i) => {
   member.hidden = i !== current;
   member.setAttribute('aria-hidden', String(i !== current));
  });
  dots.forEach((dot,i) => {
   dot.setAttribute('aria-pressed',String(i === current));
   if(i === current) dot.setAttribute('aria-current','true');
   else dot.removeAttribute('aria-current');
  });
  if(indexLabel) indexLabel.textContent = String(current + 1).padStart(2,'0');
 };
 previous?.addEventListener('click',()=>show(current - 1));
 next?.addEventListener('click',()=>show(current + 1));
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
 track.addEventListener('keydown',event=>{
  const nextIndex = event.key==='ArrowRight'?current+1:event.key==='ArrowLeft'?current-1:event.key==='Home'?0:event.key==='End'?members.length-1:null;
  if(nextIndex === null) return;
  event.preventDefault();
  show(nextIndex);
 });
 const carousel = root.querySelector('.gm-team-carousel');
 let touchStart = null;
 carousel?.addEventListener('touchstart',e=>{
  const touch=e.changedTouches[0];
  touchStart=touch?{x:touch.clientX,y:touch.clientY}:null;
 },{passive:true});
 carousel?.addEventListener('touchend',e=>{
  if(!touchStart) return;
  const touch=e.changedTouches[0];
  if(!touch){touchStart=null;return}
  const dx=touch.clientX-touchStart.x,dy=touch.clientY-touchStart.y;
  touchStart=null;
  if(Math.abs(dx)>=55 && Math.abs(dx)>Math.abs(dy)*1.3)show(current+(dx<0?1:-1));
 },{passive:true});
 show(0);
}
