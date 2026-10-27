import './lumiqc.css';

// Public-facing competition showcase. Scope and test status must not be presented as commercial validation.
export function lumiqcPage() {
  return `
<div class="lc-site">
  <section class="lc-hero" aria-labelledby="lc-hero-title">
    <div class="lc-container lc-hero-grid">
      <div class="lc-hero-copy">
        <nav class="lc-crumb" aria-label="Đường dẫn trang"><a href="/">DCG GROUP</a><span aria-hidden="true">/</span><a href="/du-an">DỰ ÁN</a><span aria-hidden="true">/</span><span>LUMIQC</span></nav>
        <p class="lc-kicker"><span class="lc-kicker-dot" aria-hidden="true"></span> ĐỀ ÁN KINH DOANH SỐ · VECOM 2026</p>
        <h1 id="lc-hero-title">LUMIQC<span>Chất lượng có bằng chứng.</span></h1>
        <p class="lc-hero-lead">Giải pháp số hóa quy trình QA/QC cho chuỗi nhà hàng, giúp đội ngũ vận hành truy vết thực phẩm, kiểm soát thời gian, ghi nhận ngoại lệ và phối hợp xử lý trên một luồng thông tin thống nhất.</p>
        <div class="lc-actions"><a class="lc-button lc-button--gold" href="#giai-phap">Khám phá giải pháp <span aria-hidden="true">↗</span></a><a class="lc-button lc-button--outline" href="#doi-thi">Gặp gỡ đội thi <span aria-hidden="true">↗</span></a></div>
        <div class="lc-hero-identity"><span>THƯƠNG HIỆU NGHIÊN CỨU</span><strong>DCG VISION</strong><i aria-hidden="true"></i><span>ĐỘI ĐẠI DIỆN</span><strong>ĐÀN CÁ GỖ</strong></div>
      </div>
      <div class="lc-hero-art">
        <div class="lc-hero-art-top"><span>DCG GROUP / R&D</span><span>2026 — VN</span></div>
        <div class="lc-hero-logo-frame"><img src="/assets/projects/lumiqc-approved-lotus-logo.webp" width="900" height="900" loading="eager" fetchpriority="high" decoding="async" alt="Biểu trưng hoa sen của dự án LUMIQC"></div>
        <div class="lc-hero-art-bottom"><span>LUMIQC</span><span>FOOD QUALITY · EVIDENCE · TRACEABILITY</span></div>
      </div>
    </div>
  </section>

  <div class="lc-factstrip" aria-label="Thông tin đề án"><div class="lc-container lc-factgrid">
    <div><span class="lc-fact-number">03</span><p>Trụ cột giải pháp</p></div>
    <div><span class="lc-fact-number">02</span><p>Thành viên đội thi</p></div>
    <div><span class="lc-fact-number">2026</span><p>VECoM Digital Business Contest</p></div>
    <div class="lc-fact-uni"><strong>NTTU</strong><p>Đại học Nguyễn Tất Thành</p></div>
  </div></div>

  <section class="lc-section lc-intro" id="tong-quan" aria-labelledby="lc-intro-title">
    <div class="lc-container lc-intro-grid">
      <div><p class="lc-overline">01 / BỐI CẢNH</p><h2 id="lc-intro-title">Khi chất lượng không thể chỉ nằm trên <em>một tờ tem giấy.</em></h2></div>
      <div class="lc-intro-copy"><p class="lc-large">Một lô thực phẩm đi qua bếp trung tâm, giao nhận, sơ chế, bảo quản và sử dụng. Mỗi lần chuyển trạng thái đều cần có căn cứ để người chịu trách nhiệm biết điều gì đã diễn ra.</p>
      <p>Trong vận hành nhà hàng, việc ghi chép rời rạc và thiếu liên kết giữa ca làm việc khiến quá trình xác minh một sự cố trở nên khó khăn. LUMIQC được thiết kế để gom mã lô, quy tắc SOP, dấu thời gian, hình ảnh và nhật ký xử lý vào cùng một hồ sơ.</p>
      <p class="lc-note">Đây là bài toán nghiên cứu và giả thuyết sản phẩm của nhóm, chưa phải kết luận từ triển khai thương mại tại chuỗi nhà hàng.</p></div>
    </div>
  </section>

  <section class="lc-section lc-capabilities" id="giai-phap" aria-labelledby="lc-cap-title">
    <div class="lc-container">
      <div class="lc-section-heading"><div><p class="lc-overline">02 / GIẢI PHÁP CỐT LÕI</p><h2 id="lc-cap-title">Ba lớp năng lực.<br><em>Một chuỗi bằng chứng.</em></h2></div><p>Thay vì chỉ giám sát bằng camera, LUMIQC kết hợp truy vết, quy tắc bảo quản và cơ chế xử lý khi dữ liệu hoặc thao tác phát sinh bất thường.</p></div>
      <div class="lc-pillar-grid">
        <article class="lc-pillar"><span class="lc-pillar-index">01 / TRACE-SAFE</span><div class="lc-pillar-icon" aria-hidden="true">⌗</div><h3>Truy vết theo lô, mẻ và hộp</h3><p>Kết nối QR từ bếp trung tâm đến chi nhánh, ghi nhận giao nhận, chia hộp, sử dụng hoặc hủy để tra lại lịch sử liên quan.</p><span class="lc-pill">QR · CHUYỂN GIAO · NHẬT KÝ</span></article>
        <article class="lc-pillar"><span class="lc-pillar-index">02 / POLICY-TIME TWIN</span><div class="lc-pillar-icon" aria-hidden="true">◷</div><h3>Quy tắc và thời gian bảo quản</h3><p>Hỗ trợ ghi nhận TAKE/RETURN, theo dõi thời gian ngoài điều kiện bảo quản và đưa ra cảnh báo theo SOP được đơn vị vận hành phê duyệt.</p><span class="lc-pill">TAKE/RETURN · TIMER · FEFO</span></article>
        <article class="lc-pillar"><span class="lc-pillar-index">03 / EVIDENCE GAP RESOLVER</span><div class="lc-pillar-icon" aria-hidden="true">✓</div><h3>Hồ sơ ngoại lệ có người chịu trách nhiệm</h3><p>Ghi nhận ảnh, lý do, người phụ trách và trạng thái HOLD/RELEASE; chuyển việc cần xác minh đến quản lý hoặc QA/QC trung tâm.</p><span class="lc-pill">HOLD/RELEASE · ẢNH · XỬ LÝ</span></article>
      </div>
    </div>
  </section>

  <section class="lc-section lc-flow" aria-labelledby="lc-flow-title">
    <div class="lc-container">
      <div class="lc-section-heading"><div><p class="lc-overline">03 / HÀNH TRÌNH VẬN HÀNH</p><h2 id="lc-flow-title">Từ lô nguyên liệu<br><em>đến quyết định tại ca.</em></h2></div><p>Luồng minh họa trong thiết kế sản phẩm, không phải bằng chứng rằng hệ thống đã được triển khai ở một nhà hàng thực tế.</p></div>
      <ol class="lc-steps">
        <li><span>01</span><div><h3>Tạo mã & tiếp nhận</h3><p>Bếp trung tâm tạo hồ sơ lô; chi nhánh ghi nhận hàng được giao.</p></div></li>
        <li><span>02</span><div><h3>Lấy ra & trả lại</h3><p>TAKE/RETURN gắn thời gian và quy tắc bảo quản theo SOP.</p></div></li>
        <li><span>03</span><div><h3>Kiểm tra trong ca</h3><p>Checklist mở/đóng ca, ảnh vệ sinh và nhật ký thao tác.</p></div></li>
        <li><span>04</span><div><h3>Xử lý ngoại lệ</h3><p>HOLD/RELEASE, báo hủy hoặc chuyển QC xác minh khi thiếu bằng chứng.</p></div></li>
        <li><span>05</span><div><h3>Bàn giao có căn cứ</h3><p>Ca sau nhìn được tình trạng, đầu việc còn mở và người phụ trách.</p></div></li>
      </ol>
    </div>
  </section>

  <section class="lc-section lc-people" id="doi-thi" aria-labelledby="lc-people-title">
    <div class="lc-container">
      <div class="lc-team-top"><div><p class="lc-overline">04 / CON NGƯỜI PHÍA SAU ĐỀ ÁN</p><h2 id="lc-people-title">Đội ĐÀN CÁ GỖ</h2><p>Những thành viên thuộc DCG Group cùng đại diện nhóm sinh viên Trường Đại học Nguyễn Tất Thành phát triển và trình bày đề án LUMIQC tại VECoM Digital Business Contest 2026 – Nội dung 3: Ý tưởng kinh doanh số.</p></div><span class="lc-team-stamp">DCG GROUP<br>×<br>VECoM 2026</span></div>
      <div class="lc-team-grid">
        <article class="lc-person">
          <div class="lc-person-visual lc-person-visual--type"><div aria-hidden="true">LHS</div><span>ĐÀN CÁ GỖ / TEAM LEAD</span></div>
          <div class="lc-person-copy"><p class="lc-person-num">01 / TRƯỞNG NHÓM DỰ THI</p><h3>Lê Hoàng Sơn</h3><p class="lc-person-role">Định hướng sản phẩm & quản trị đề án</p><p>Phụ trách bài toán khách hàng, mô hình kinh doanh, định hướng chức năng và điều phối hồ sơ dự thi LUMIQC.</p><span class="lc-person-affiliation">DCG GROUP · NTTU</span></div>
        </article>
        <article class="lc-person">
          <div class="lc-person-visual lc-person-visual--photo"><img src="/assets/dcg-founder-portrait.png" width="640" height="910" alt="Chân dung Trương Quốc Huy, Nhà sáng lập DCG Group và thành viên đội ĐÀN CÁ GỖ" loading="lazy" decoding="async"><span>ĐÀN CÁ GỖ / TEAM MEMBER</span></div>
          <div class="lc-person-copy"><p class="lc-person-num">02 / THÀNH VIÊN DỰ THI</p><h3>Trương Quốc Huy</h3><p class="lc-person-role">Nhà sáng lập & Tổng giám đốc DCG Group</p><p>Tham gia nghiên cứu giải pháp, phối hợp phát triển dự án và chuẩn bị nội dung trình bày tại cuộc thi.</p><span class="lc-person-affiliation">DCG GROUP · NTTU</span></div>
        </article>
      </div>
      <p class="lc-team-note">LUMIQC là đề án do đội ĐÀN CÁ GỖ thực hiện, đồng thời được giới thiệu trong hệ sinh thái DCG Group. Trang này không đại diện cho xác nhận nghiệm thu hoặc bảo trợ thương mại của nhà trường hay Ban Tổ chức.</p>
    </div>
  </section>

  <section class="lc-section lc-research" id="tien-do" aria-labelledby="lc-research-title">
    <div class="lc-container lc-research-grid">
      <div><p class="lc-overline">05 / TỪ Ý TƯỞNG ĐẾN KIỂM CHỨNG</p><h2 id="lc-research-title">Đang xây dựng.<br><em>Đang kiểm chứng.</em></h2><p>LUMIQC phân biệt rõ tầm nhìn sản phẩm với các hạng mục đã có bằng chứng. Nhóm tiếp tục hoàn thiện nguyên mẫu, quy trình nghiệp vụ và kế hoạch thử nghiệm.</p></div>
      <div class="lc-evidence-list">
        <article><span class="lc-evidence-mark">✓</span><div><h3>Đã xác định trong thiết kế</h3><p>Ba trụ cột giải pháp; QR; TAKE/RETURN; checklist; hồ sơ ảnh; HOLD/RELEASE; bàn giao; kiểm soát trung tâm.</p></div></article>
        <article><span class="lc-evidence-mark">◷</span><div><h3>Đã thử nghiệm giới hạn</h3><p>Có các tình huống và lượt mô phỏng nội bộ để kiểm tra logic quy trình. Kết quả không đồng nghĩa sản phẩm đã vận hành tại bếp thật.</p></div></article>
        <article><span class="lc-evidence-mark">↗</span><div><h3>Cần kiểm chứng thực địa</h3><p>Đo thao tác tại bếp, tổn thất có thể phòng tránh, mức sẵn sàng sử dụng, giá sẵn lòng chi trả và thử nghiệm tích hợp.</p></div></article>
        <article><span class="lc-evidence-mark">◎</span><div><h3>Camera QC là hướng phát triển</h3><p>Hình ảnh có thể làm bằng chứng hỗ trợ con người; AI Camera QC tự động là hướng nghiên cứu R&D, chưa được công bố như tính năng đã nghiệm thu.</p></div></article>
      </div>
    </div>
  </section>

  <section class="lc-outro" aria-labelledby="lc-outro-title"><div class="lc-container lc-outro-grid">
    <div><p class="lc-overline">DCG GROUP · ĐÀN CÁ GỖ</p><h2 id="lc-outro-title">Chúng tôi muốn mọi quyết định về chất lượng đều có thể <em>giải thích bằng bằng chứng.</em></h2><p>Đề án LUMIQC là bước nghiên cứu để biến định hướng ấy thành quy trình công nghệ thực tế.</p></div>
    <div class="lc-outro-action"><a class="lc-button lc-button--gold" href="/he-sinh-thai/dcg-vision">Khám phá DCG VISION <span aria-hidden="true">↗</span></a><a href="/du-an">Xem các dự án khác <span aria-hidden="true">↗</span></a></div>
  </div></section>
</div>
`;
}
