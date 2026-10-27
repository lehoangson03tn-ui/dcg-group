import './lumiqc.css';

// LUMIQC is a research proposal. Visual data and product screens below are demonstrative concepts.
export function lumiqcPage() {
  return `
<article class="lq" id="lumiqc-top">
  <nav class="lq-context" aria-label="Điều hướng nhanh dự án LUMIQC">
    <div class="lq-wrap lq-context-inner">
      <a class="lq-context-brand" href="/du-an" aria-label="Quay lại danh sách dự án DCG Group">
        <img src="/assets/projects/lumiqc-approved-lotus-logo.webp" alt="" width="28" height="28" loading="eager">
        <span><b>LUMIQC</b><small>DCG VISION / DCG GROUP</small></span>
      </a>
      <div class="lq-context-links">
        <a href="#bai-toan">Bài toán</a><a href="#giai-phap">Giải pháp</a><a href="#quy-trinh">Quy trình</a><a href="#giao-dien">UI Concept</a><a href="#doi-thi">Đội thi</a><a href="#lo-trinh-vecom">Nghiên cứu</a>
      </div>
      <span class="lq-context-status">ĐỀ ÁN VECoM 2026</span>
    </div>
  </nav>

  <section class="lq-hero" aria-labelledby="lq-title">
    <div class="lq-wrap lq-hero-grid">
      <div class="lq-hero-copy">
        <p class="lq-overline lq-overline--teal"><span class="lq-signal" aria-hidden="true"></span> DCG VISION / ĐÀN CÁ GỖ / NTTU</p>
        <h1 class="lq-title" id="lq-title">LUMIQC<span>Truy vết đến từng hộp<br>Giải trình từng quyết định</span></h1>
        <p class="lq-lead">Đề án SaaS quản lý và giải trình chất lượng QA/QC cho chuỗi F&B, kết nối <strong>mã lô – quy tắc bảo quản – hồ sơ ngoại lệ</strong> từ bếp trung tâm đến từng chi nhánh.</p>
        <div class="lq-hero-actions">
          <a class="lq-btn lq-btn--primary" href="#giai-phap">Khám phá giải pháp <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></a>
          <a class="lq-btn lq-btn--secondary" href="#quy-trinh">Xem luồng vận hành <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></a>
        </div>
        <p class="lq-disclaimer"><span class="lq-info-mark" aria-hidden="true">i</span> Đang nghiên cứu và kiểm chứng cho VECoM Digital Business Contest 2026. Chưa phải hệ thống được nghiệm thu thương mại.</p>
        <div class="lq-hero-keys"><span><b>01</b> Truy vết QR</span><span><b>02</b> SOP & thời gian</span><span><b>03</b> Bằng chứng QA/QC</span></div>
      </div>

      <div class="lq-architecture" aria-label="Sơ đồ minh họa ba lớp xử lý của LUMIQC">
        <div class="lq-architecture-head"><span>OPERATIONAL BLUEPRINT</span><span class="lq-concept-mark">MÔ PHỎNG</span></div>
        <div class="lq-architecture-body">
          <div class="lq-sample-item lq-sample-item--trace">
            <div class="lq-sample-top"><span class="lq-sample-tag">01 / TRACE-SAFE</span><span class="lq-state lq-state--trace">ĐÃ ĐỊNH DANH</span></div>
            <div class="lq-sample-row"><div><strong>BOX-DEMO-0892</strong><p>Lô thực phẩm · Mẻ sơ chế · Hộp</p><small>LOT-DEMO-01 / PREP-DEMO-04</small></div>
              <svg class="lq-qr" viewBox="0 0 64 64" aria-hidden="true"><rect x="2" y="2" width="20" height="20"/><rect x="8" y="8" width="8" height="8" fill="currentColor" stroke="none"/><rect x="42" y="2" width="20" height="20"/><rect x="48" y="8" width="8" height="8" fill="currentColor" stroke="none"/><rect x="2" y="42" width="20" height="20"/><rect x="8" y="48" width="8" height="8" fill="currentColor" stroke="none"/><path d="M29 3v7h8v8h-8v8h8m5 2h8m6 0v9h-9v-7m-18 7h8v-8m-8 15h7v8h7v9m8-15h10v-7m-10 16h9v9h-9M27 58h8" fill="none" stroke-width="4"/></svg>
            </div>
          </div>
          <div class="lq-sample-connector"><span>Ghi nhận TAKE / RETURN</span></div>
          <div class="lq-sample-item lq-sample-item--policy">
            <div class="lq-sample-top"><span class="lq-sample-tag">02 / POLICY-TIME TWIN</span><span class="lq-state lq-state--warn">CẢNH BÁO SOP</span></div>
            <div class="lq-sample-row"><div><strong>Giám sát thời gian ngoài bảo quản</strong><p>TAKE → Theo dõi → RETURN</p></div><span class="lq-sample-time">45<span>phút*</span></span></div>
            <div class="lq-meter"><span></span></div><small class="lq-meter-caption">*Ngưỡng ví dụ phục vụ hình dung; phải được xác nhận bằng SOP thực tế.</small>
          </div>
          <div class="lq-sample-connector"><span>Ngoại lệ cần xác minh</span></div>
          <div class="lq-sample-item lq-sample-item--evidence">
            <div class="lq-sample-top"><span class="lq-sample-tag">03 / EVIDENCE GAP RESOLVER</span><span class="lq-state lq-state--hold">HOLD</span></div>
            <div class="lq-sample-row"><div><strong>Hồ sơ kiểm tra ngoại lệ</strong><p>Ảnh hiện trường + nhật ký + người xử lý</p></div></div>
            <div class="lq-outcomes"><span>ĐANG GIỮ / HOLD</span><span>QC XÁC MINH</span><span class="lq-released">RELEASE / BÁO HỦY</span></div>
          </div>
        </div>
        <div class="lq-architecture-foot">MỘT HỒ SƠ · NHIỀU ĐIỂM CHẠM · TRÁCH NHIỆM RÕ RÀNG</div>
      </div>
    </div>
  </section>

  <section class="lq-problem lq-section" id="bai-toan" aria-labelledby="lq-problem-title">
    <div class="lq-wrap lq-editorial lq-balanced-pair lq-balanced-pair--problem">
      <div class="lq-editorial-lede lq-balanced-left"><p class="lq-overline">01 / BÀI TOÁN NGÀNH F&B</p><h2 id="lq-problem-title">Tem giấy không lưu được <em>toàn bộ hành trình chất lượng</em></h2><p>Vấn đề không chỉ là biết thực phẩm hết hạn ngày nào, mà là biết điều gì xảy ra trong suốt quá trình nhận hàng, sơ chế, bảo quản và bàn giao.</p>
        <figure class="lq-photo lq-problem-photo">
          <img src="https://dcg-group-ecosystem.floot.app/_cdn/static/1247c286-08c7-4122-849b-d200a540e841.png" width="1024" height="1024" alt="Ảnh minh họa AI các hộp thực phẩm được phân loại tại khu bếp thương mại" loading="lazy" decoding="async">
          <figcaption>HÌNH MINH HỌA AI / QUẢN LÝ LÔ VÀ HỘP</figcaption>
        </figure></div>
      <div class="lq-fractures lq-balanced-right" aria-label="Ba điểm đứt gãy cần giải quyết">
        <div class="lq-fracture"><div class="lq-fracture-id">01<span>VẬT LÝ / DIGITAL</span></div><div class="lq-fracture-body"><h3>Tem giấy tĩnh, nguyên liệu liên tục thay đổi</h3><p>Một dòng hạn dùng trên tem không cho biết chính xác lịch sử lấy ra và trả lại tủ bảo quản. Việc chia hộp hay đổi ca dễ khiến dữ liệu bị tách rời.</p><div class="lq-fracture-inline"><span>TEM GIẤY</span><span class="lq-break-line" aria-hidden="true"></span><span>TAKE / RETURN</span><span class="lq-break-line" aria-hidden="true"></span><span>THỜI GIAN</span></div></div></div>
        <div class="lq-fracture"><div class="lq-fracture-id">02<span>CA LÀM VIỆC</span></div><div class="lq-fracture-body"><h3>Ảnh, checklist và báo hủy nằm rải rác</h3><p>Nhật ký ca ở sổ tay, ảnh vệ sinh ở nhóm chat và ghi nhận xử lý trong biểu mẫu riêng làm việc đối chiếu tốn nhiều công sức.</p><div class="lq-fracture-inline"><span>CHECKLIST</span><span class="lq-break-line" aria-hidden="true"></span><span>ẢNH HIỆN TRƯỜNG</span><span class="lq-break-line" aria-hidden="true"></span><span>BÀN GIAO</span></div></div></div>
        <div class="lq-fracture"><div class="lq-fracture-id">03<span>GIẢI TRÌNH</span></div><div class="lq-fracture-body"><h3>Chi nhánh và QC trung tâm thiếu hồ sơ ngoại lệ chung</h3><p>Khi có bất thường, cần ghi lại lô/hộp, bằng chứng, quyết định giữ hàng hay cho phép sử dụng và người chịu trách nhiệm ở từng bước.</p><div class="lq-fracture-inline"><span>CHI NHÁNH</span><span class="lq-break-line" aria-hidden="true"></span><span>HOLD / EVIDENCE</span><span class="lq-break-line" aria-hidden="true"></span><span>QC TRUNG TÂM</span></div></div></div>
      </div>
    </div>
  </section>

  <section class="lq-solutions lq-section" id="giai-phap" aria-labelledby="lq-solution-title">
    <div class="lq-wrap">
      <div class="lq-section-intro"><p class="lq-overline">02 / KIẾN TRÚC GIẢI PHÁP</p><h2 id="lq-solution-title">Ba trụ cột cho <em>một chuỗi bằng chứng liền mạch</em></h2><p>Ba lớp hỗ trợ nhau: định danh đối tượng, áp dụng quy tắc theo trạng thái và lưu vết xử lý ngoại lệ. Đây là phạm vi thiết kế CORE, không đồng nghĩa toàn bộ chức năng đã lập trình hay nghiệm thu.</p></div>

      <div class="lq-feature lq-feature--trace lq-balanced-pair lq-balanced-pair--trace">
        <div class="lq-feature-copy lq-balanced-left"><span class="lq-feature-index">01 <i></i> TRACE-SAFE</span><h3>Từ một hộp thực phẩm truy ngược về lô ban đầu</h3><p>Mã QR và nhật ký liên kết lô nguyên liệu, mẻ sơ chế và các hộp tại chi nhánh. Khi chia hộp hoặc xử lý hủy, quan hệ nguồn gốc không bị đánh mất.</p><span class="lq-feature-foot">TRUY VẾT XUÔI & NGƯỢC / THIẾT KẾ CORE</span>
        <figure class="lq-photo lq-feature-photo">
          <img src="https://dcg-group-ecosystem.floot.app/_cdn/static/5aa054db-4c55-4a3a-aaca-4db587ccc349.png" width="1024" height="1024" alt="Ảnh minh họa AI nhân viên quét mã trên hộp thực phẩm trong bếp" loading="lazy" decoding="async">
          <figcaption>MINH HỌA AI / QUÉT MÃ HỘP THỰC PHẨM</figcaption>
        </figure></div>
        <div class="lq-lineage lq-balanced-right" aria-label="Sơ đồ phả hệ truy vết minh họa">
          <span class="lq-diagram-eyebrow">LINEAGE VIEW / DỮ LIỆU GIẢ LẬP</span>
          <div class="lq-lineage-start"><small>NGUYÊN LIỆU ĐẦU VÀO</small><strong>LOT-DEMO-881</strong><span>Kho / Bếp trung tâm</span></div>
          <div class="lq-lineage-branch" aria-hidden="true"></div>
          <div class="lq-lineage-stage"><small>SƠ CHẾ / CHIA MẺ</small><strong>PREP-DEMO-04</strong><span>Nhật ký + quy tắc SOP</span></div>
          <div class="lq-lineage-split" aria-hidden="true"></div>
          <div class="lq-lineage-pair"><div><small>HỘP A</small><strong>BOX-04A</strong><span>Chi nhánh 01</span></div><div><small>HỘP B</small><strong>BOX-04B</strong><span>Chi nhánh 02</span></div></div>
          <p>Liên kết nguồn gốc được giữ khi chia hộp; thao tác sử dụng và hủy tạo thành nhật ký riêng.</p>
        </div>
      </div>

      <div class="lq-feature lq-feature--policy">
        <div class="lq-timechart">
          <div class="lq-timechart-top"><span>POLICY / TIME RULE SIMULATION</span><span class="lq-state lq-state--warn">VÍ DỤ SOP</span></div>
          <div class="lq-timechart-track"><span class="lq-timechart-fill"></span><b class="lq-tick lq-tick--a"></b><b class="lq-tick lq-tick--b"></b><b class="lq-tick lq-tick--c"></b><b class="lq-tick lq-tick--d"></b></div>
          <div class="lq-timechart-events">
            <div><small>08:00</small><strong>SƠ CHẾ</strong><span>Trong bảo quản</span></div>
            <div><small>11:30</small><strong>TAKE</strong><span>Bắt đầu theo dõi</span></div>
            <div><small>12:05</small><strong>CẢNH BÁO</strong><span>Gần ngưỡng minh họa</span></div>
            <div><small>12:10</small><strong>RETURN</strong><span>Ghi nhận sự kiện</span></div>
          </div>
          <div class="lq-timechart-bottom"><span>FEFO / FIFO</span><p>Sắp thứ tự ưu tiên sử dụng theo quy tắc đã duyệt, không tự suy đoán an toàn thực phẩm.</p></div>
          <p class="lq-timechart-note">Các giờ và ngưỡng hiển thị là giả lập, không phải SOP an toàn thực phẩm đã được xác nhận.</p>
        </div>
        <div class="lq-feature-copy"><span class="lq-feature-index">02 <i></i> POLICY-TIME TWIN</span><h3>Kiểm soát thời gian theo quy tắc bảo quản</h3><p>Ghi nhận TAKE / RETURN, theo dõi thời gian bên ngoài điều kiện bảo quản, cảnh báo khi gần ngưỡng theo SOP và hỗ trợ nguyên tắc FEFO / FIFO.</p><span class="lq-feature-foot">QUY TẮC SOP / THIẾT KẾ CORE</span></div>
      </div>

      <div class="lq-feature lq-feature--evidence lq-balanced-pair lq-balanced-pair--evidence">
        <div class="lq-feature-copy lq-balanced-left"><span class="lq-feature-index">03 <i></i> EVIDENCE GAP RESOLVER</span><h3>Mỗi ngoại lệ cần bằng chứng và người chịu trách nhiệm</h3><p>Khi có ngoại lệ, hồ sơ chứa mã hộp, ảnh, nhật ký, người phụ trách và quyết định xử lý. Hàng bị giữ ở trạng thái HOLD cho đến khi được người có thẩm quyền đánh giá.</p><span class="lq-feature-foot">HỒ SƠ NGOẠI LỆ / THIẾT KẾ CORE</span>
        <figure class="lq-photo lq-feature-photo">
          <img src="https://dcg-group-ecosystem.floot.app/_cdn/static/1f2349be-d00c-42ba-aaaa-9e495f514348.png" width="1024" height="1024" alt="Ảnh minh họa AI giám sát viên kiểm tra vệ sinh bằng thiết bị số trong bếp thương mại" loading="lazy" decoding="async">
          <figcaption>MINH HỌA AI / THU THẬP BẰNG CHỨNG</figcaption>
        </figure></div>
        <div class="lq-gate lq-balanced-right" aria-label="Sơ đồ xử lý HOLD, đánh giá bằng chứng và quyết định cuối">
          <div class="lq-gate-header"><span>EXCEPTION CASE / DEMO-017</span><span class="lq-state lq-state--hold">HOLD</span></div>
          <div class="lq-gate-evidence"><span class="lq-gate-index">01</span><div><strong>Chi nhánh ghi nhận ngoại lệ</strong><small>Ảnh hiện trường · Nhật ký TAKE/RETURN · Lý do</small></div></div>
          <div class="lq-gate-evidence"><span class="lq-gate-index">02</span><div><strong>QA/QC trung tâm xem xét</strong><small>Đối chiếu SOP, hồ sơ lô và bằng chứng</small></div></div>
          <div class="lq-gate-decision"><div><span class="lq-state lq-state--release">RELEASE</span><strong>Chấp thuận có căn cứ</strong></div><div><span class="lq-state lq-state--hold">BÁO HỦY</span><strong>Xử lý có kiểm soát</strong></div></div>
          <p>RELEASE không được suy ra tự động chỉ từ ảnh; phải qua người có thẩm quyền và SOP hợp lệ.</p>
        </div>
      </div>

      <div class="lq-operations"><div class="lq-operations-head"><span>OPERATIONS / CORE SCOPE</span><h3>Thống nhất công việc hằng ngày trên một quy trình</h3></div><div class="lq-ops-grid">
        <div><span class="lq-ops-num">01</span><h4>Checklist mở / đóng ca</h4><p>Ghi nhận hạng mục kiểm tra và những việc còn thiếu.</p></div>
        <div><span class="lq-ops-num">02</span><h4>Ảnh vệ sinh hiện trường</h4><p>Liên kết bằng chứng hình ảnh với ca và đối tượng kiểm tra.</p></div>
        <div><span class="lq-ops-num">03</span><h4>Bàn giao hai ca</h4><p>Giữ trạng thái hộp, cảnh báo và việc chưa xử lý.</p></div>
        <div><span class="lq-ops-num">04</span><h4>Báo hủy & QC trung tâm</h4><p>Ghi lý do, số lượng và quyết định xử lý.</p></div>
      </div></div>
    </div>
  </section>

  <section class="lq-workflow lq-section" id="quy-trinh" aria-labelledby="lq-workflow-title">
    <div class="lq-wrap">
      <div class="lq-section-intro lq-section-intro--dark"><p class="lq-overline">03 / LUỒNG VẬN HÀNH LIÊN THÔNG</p><h2 id="lq-workflow-title">Một hành trình nguyên liệu <em>ba cấp độ kiểm soát</em></h2><p>Sơ đồ mô tả luồng thiết kế từ bếp trung tâm đến chi nhánh và bộ phận QA/QC; không mô tả việc đã triển khai tại bếp thật.</p></div>
      <div class="lq-swimlanes lq-flow-v2" aria-label="Ba làn quy trình của kiến trúc LUMIQC">
        <span class="lq-flow-ornament" aria-hidden="true"></span>
        <div class="lq-swimlane lq-swimlane--origin">
          <div class="lq-lane-owner">
            <div class="lq-lane-glyph"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="M4 20h16M6 20V7l6-3 6 3v13M10 20v-5h4v5M9 10h.01M15 10h.01"/></svg></div>
            <div class="lq-lane-owner-copy"><span class="lq-lane-meta">01 / ORIGIN</span><h3>Bếp trung tâm</h3><p>Khởi tạo nguồn gốc và quy tắc</p></div>
          </div>
          <ol class="lq-lane-steps">
            <li class="lq-flow-step">
              <small class="lq-step-number">01</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="m12 3 9 4.5v9L12 21l-9-4.5v-9L12 3ZM3 7.5l9 5 9-5M12 12.5V21"/></svg></span>
              <div class="lq-flow-text"><strong>Tiếp nhận lô</strong><span>Nhật ký nguồn gốc</span></div>
            </li>
            <li class="lq-flow-step">
              <small class="lq-step-number">02</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="M3 6h18M5 10h14M7 14h10M9 18h6M7 6l2 4M17 6l-2 4"/></svg></span>
              <div class="lq-flow-text"><strong>Sơ chế / chia hộp</strong><span>Liên kết lô – mẻ – hộp</span></div>
            </li>
            <li class="lq-flow-step">
              <small class="lq-step-number">03</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M6 6h1M17 6h1M6 17h1M14 14h3v3h-3v4h7v-4h-4M19 12h2"/></svg></span>
              <div class="lq-flow-text"><strong>Gắn QR & SOP</strong><span>Điều chuyển chi nhánh</span></div>
            </li>
          </ol>
        </div>
        <div class="lq-lane-down" aria-hidden="true"><svg viewBox="0 0 24 36"><path d="M12 1v33m-8-8 8 8 8-8"/></svg></div>
        <div class="lq-swimlane lq-swimlane--frontline">
          <div class="lq-lane-owner">
            <div class="lq-lane-glyph"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="M3 10h18l-2-6H5l-2 6ZM5 10v10h14V10M9 20v-6h6v6M3 10c0 2 3 2 4 0 1 2 4 2 5 0 1 2 4 2 5 0 1 2 4 2 4 0"/></svg></div>
            <div class="lq-lane-owner-copy"><span class="lq-lane-meta">02 / FRONTLINE</span><h3>Chi nhánh F&B</h3><p>Ghi nhận sự kiện trong ca</p></div>
          </div>
          <ol class="lq-lane-steps">
            <li class="lq-flow-step">
              <small class="lq-step-number">04</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3M3 12h18"/></svg></span>
              <div class="lq-flow-text"><strong>Quét nhận hàng</strong><span>Kiểm soát FEFO / FIFO</span></div>
            </li>
            <li class="lq-flow-step">
              <small class="lq-step-number">05</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="M4 7h16m-5-5 5 5-5 5M20 17H4m5-5-5 5 5 5"/></svg></span>
              <div class="lq-flow-text"><strong>TAKE / RETURN</strong><span>Thời gian theo SOP</span></div>
            </li>
            <li class="lq-flow-step">
              <small class="lq-step-number">06</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="M9 4h6M9 3H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3M8 10l2 2 3-3M14 11h3M8 17l2 2 3-3M14 18h3"/></svg></span>
              <div class="lq-flow-text"><strong>Checklist & bàn giao</strong><span>Ảnh, nhật ký, cảnh báo</span></div>
            </li>
          </ol>
        </div>
        <div class="lq-lane-down lq-lane-down--warn" aria-hidden="true"><svg viewBox="0 0 24 36"><path d="M12 1v33m-8-8 8 8 8-8"/></svg><span>NẾU PHÁT SINH NGOẠI LỆ</span></div>
        <div class="lq-swimlane lq-swimlane--qc">
          <div class="lq-lane-owner">
            <div class="lq-lane-glyph"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4Z"/><path d="m8 12 3 3 5-6"/></svg></div>
            <div class="lq-lane-owner-copy"><span class="lq-lane-meta">03 / GOVERNANCE</span><h3>QA/QC trung tâm</h3><p>Xác minh và quyết định</p></div>
          </div>
          <ol class="lq-lane-steps">
            <li class="lq-flow-step lq-flow-step--hold">
              <small class="lq-step-number">07</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5M12 17h.01"/></svg></span>
              <div class="lq-flow-text"><strong>HOLD</strong><span>Giữ hàng, yêu cầu bằng chứng</span></div>
            </li>
            <li class="lq-flow-step">
              <small class="lq-step-number">08</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="M13 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h9M13 2v6h6M13 2l6 6v5M7 12h7M7 16h4M18 21l3 3M16 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg></span>
              <div class="lq-flow-text"><strong>Thẩm định hồ sơ</strong><span>Kiểm tra SOP và lịch sử</span></div>
            </li>
            <li class="lq-flow-step lq-lane-outcome lq-flow-step--release">
              <small class="lq-step-number">09</small><span class="lq-flow-symbol"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m7 12 3.5 3.5L17 9"/></svg></span>
              <div class="lq-flow-text"><strong>RELEASE / HỦY</strong><span>Quyết định có người chịu trách nhiệm</span></div>
            </li>
          </ol>
        </div>
      </div>
      <p class="lq-workflow-caption">NGUYÊN TẮC: Trạng thái dữ liệu, trạng thái bảo quản và trường hợp thiếu bằng chứng cần được phân biệt khi đánh giá. Ảnh nền là hình minh họa AI, không phải ảnh bếp triển khai thực tế.</p>
    </div>
  </section>

  <section class="lq-concepts lq-section" id="giao-dien" aria-labelledby="lq-concepts-title">
    <div class="lq-wrap">
      <div class="lq-section-intro"><p class="lq-overline">04 / PRODUCT EXPERIENCE</p><h2 id="lq-concepts-title">Trực quan hóa <em>quy trình qua ba giao diện mô phỏng</em></h2><p>Mỗi bản mô phỏng tập trung vào một nhu cầu: thao tác nhanh tại bếp, thu thập bằng chứng và điều phối xử lý ở QA/QC trung tâm.</p></div>
      <div class="lq-concept-disclaimer"><span class="lq-info-mark" aria-hidden="true">i</span><p><strong>BẢN THIẾT KẾ GIAO DIỆN MẪU · UI CONCEPT / R&D</strong><br>Ba màn hình dưới đây được dựng bằng HTML/CSS để minh họa quy trình nghiệp vụ, <strong>không phải ảnh chụp tính năng đã triển khai thương mại.</strong> Dữ liệu, thời gian và hồ sơ là giả lập.</p></div>
      <div class="lq-tabset" data-lq-tabs>
        <div class="lq-tablist" role="tablist" aria-label="Chọn giao diện minh họa">
          <button type="button" role="tab" id="lq-tab-take" aria-controls="lq-panel-take" aria-selected="true" data-lq-tab="take" tabindex="0"><span>01</span> Quét QR & TAKE/RETURN</button>
          <button type="button" role="tab" id="lq-tab-check" aria-controls="lq-panel-check" aria-selected="false" data-lq-tab="check" tabindex="-1"><span>02</span> Checklist & ảnh ca</button>
          <button type="button" role="tab" id="lq-tab-qc" aria-controls="lq-panel-qc" aria-selected="false" data-lq-tab="qc" tabindex="-1"><span>03</span> QA/QC trung tâm</button>
        </div>

        <div class="lq-tabpanel" role="tabpanel" id="lq-panel-take" aria-labelledby="lq-tab-take" data-lq-panel="take">
          <div class="lq-concept-layout"><div class="lq-mock-stage"><div class="lq-phone"><div class="lq-phone-status"><span>09:41</span><span>●●●</span></div><div class="lq-phone-header"><small>LUMIQC / CHI NHÁNH 01</small><strong>Hồ sơ hộp thực phẩm</strong></div><div class="lq-phone-content"><span class="lq-mock-hint">QR / DEMO DATA</span><div class="lq-mock-item"><span class="lq-mock-qr" aria-hidden="true"></span><div><strong>BOX-DEMO-0892</strong><small>Liên kết LOT-DEMO-01</small></div></div><div class="lq-mock-key"><span>Trạng thái</span><b>ĐANG BẢO QUẢN</b></div><div class="lq-mock-key"><span>Quy tắc</span><b>THEO SOP ĐƯỢC DUYỆT</b></div><div class="lq-mock-progress"><span></span></div><p>Thời gian ngoài bảo quản được ghi nhận khi thực hiện TAKE và RETURN.</p><div class="lq-mock-action">GHI NHẬN TAKE</div><div class="lq-mock-action lq-mock-action--subtle">GHI NHẬN RETURN</div></div></div></div><div class="lq-concept-copy"><span>SCREEN / 01</span><h3>Tại bếp, thao tác nhanh và xác định đúng hộp</h3><p>Thành viên ca quét hộp và ghi nhận sự kiện thay đổi trạng thái. Người vận hành nhìn thấy mã hộp, mẻ liên quan và hướng dẫn ưu tiên sử dụng.</p><ul><li>Không cần quét mỗi lần lấy một phần nhỏ.</li><li>Thời gian dựa trên SOP của đơn vị, không dùng ngưỡng mặc định tùy ý.</li><li>Giao diện được ưu tiên cho màn hình cảm ứng trong môi trường bếp.</li></ul></div></div>
        </div>

        <div class="lq-tabpanel" role="tabpanel" id="lq-panel-check" aria-labelledby="lq-tab-check" data-lq-panel="check" hidden>
          <div class="lq-concept-layout"><div class="lq-mock-stage"><div class="lq-phone"><div class="lq-phone-status"><span>16:30</span><span>●●●</span></div><div class="lq-phone-header"><small>LUMIQC / CA CHIỀU</small><strong>Bàn giao và vệ sinh</strong></div><div class="lq-phone-content"><span class="lq-mock-hint">CHECKLIST / DEMO DATA</span><div class="lq-mock-check"><b>✓</b><div><strong>Kiểm tra khu sơ chế</strong><small>Ghi nhận trong ca</small></div></div><div class="lq-mock-check"><b>✓</b><div><strong>Đối chiếu tủ bảo quản</strong><small>Liên kết nhật ký hộp</small></div></div><div class="lq-mock-check lq-mock-check--pending"><b>·</b><div><strong>Ảnh vệ sinh cuối ca</strong><small>Chưa bổ sung bằng chứng</small></div></div><div class="lq-mock-upload"><span aria-hidden="true">＋</span><strong>Ảnh minh chứng</strong><small>Gắn ca / vị trí / thời điểm</small></div><div class="lq-mock-action">LƯU HỒ SƠ CA</div></div></div></div><div class="lq-concept-copy"><span>SCREEN / 02</span><h3>Kết nối checklist với ảnh và bằng chứng</h3><p>Hạng mục kiểm tra, ảnh vệ sinh và trạng thái bàn giao được hiển thị trong một hồ sơ có người phụ trách.</p><ul><li>Ảnh chỉ là bằng chứng hỗ trợ, không tự chứng minh an toàn vi sinh.</li><li>Những việc còn mở cần được ca kế tiếp nhìn thấy.</li><li>Thiếu thông tin được ghi nhận thành trạng thái riêng.</li></ul></div></div>
        </div>

        <div class="lq-tabpanel" role="tabpanel" id="lq-panel-qc" aria-labelledby="lq-tab-qc" data-lq-panel="qc" hidden>
          <div class="lq-concept-layout lq-concept-layout--dashboard"><div class="lq-mock-stage"><div class="lq-dashboard"><div class="lq-dashboard-header"><strong>lum<span>iqc</span> / QC CENTER</strong><span class="lq-dashboard-demo">UI CONCEPT</span></div><div class="lq-dashboard-kpis"><div><small>HỒ SƠ CHỜ XÁC MINH</small><strong>03</strong></div><div><small>ĐANG GIỮ / HOLD</small><strong>02</strong></div><div><small>CẦN BỔ SUNG</small><strong>01</strong></div></div><div class="lq-dashboard-table"><div class="lq-dashboard-head"><span>MÃ HỒ SƠ</span><span>ĐIỂM BÁN</span><span>TÌNH TRẠNG</span></div><div><strong>CASE-DEMO-017</strong><span>Chi nhánh 01</span><b class="lq-state lq-state--hold">HOLD</b></div><div><strong>CASE-DEMO-021</strong><span>Chi nhánh 02</span><b class="lq-state lq-state--warn">THIẾU ẢNH</b></div><div><strong>CASE-DEMO-024</strong><span>Chi nhánh 03</span><b class="lq-state lq-state--trace">CHỜ QC</b></div></div><div class="lq-dashboard-foot"><span>Liên kết lô / mẻ / hộp</span><span>Ảnh · nhật ký · người phụ trách</span></div></div></div><div class="lq-concept-copy"><span>SCREEN / 03</span><h3>QA/QC trung tâm quyết định dựa trên hồ sơ thống nhất</h3><p>QA/QC đối chiếu mã lô, ảnh, quy tắc và lịch sử thao tác trước khi thực hiện RELEASE hoặc yêu cầu báo hủy theo thẩm quyền.</p><ul><li>HOLD và RELEASE có người chịu trách nhiệm.</li><li>Không dùng kết luận tự động từ Camera AI ở giai đoạn này.</li><li>Các con số trên giao diện là dữ liệu giả lập.</li></ul></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="lq-team lq-section" id="doi-thi" aria-labelledby="lq-team-title">
    <div class="lq-wrap">
      <div class="lq-team-intro">
        <div><p class="lq-overline">05 / ĐỘI NGŨ THỰC HIỆN</p><h2 id="lq-team-title">Đội ĐÀN CÁ GỖ<br><em>Hai thành viên cùng phát triển LUMIQC</em></h2></div>
        <p>Nhóm sinh viên Trường Đại học Nguyễn Tất Thành tham gia VECoM Digital Business Contest 2026 – Nội dung 3. Vuốt ngang hoặc nhấn mũi tên để tìm hiểu về từng thành viên. Vai trò của đội thi được phân biệt với vai trò tại DCG Group.</p>
      </div>
      <div class="lq-team-carousel" role="region" aria-roledescription="Bộ trình chiếu thành viên" aria-label="Hồ sơ thành viên đội ĐÀN CÁ GỖ">
        <div class="lq-team-track lq-team-grid" id="lq-team-track" tabindex="0" aria-label="Dùng phím mũi tên trái hoặc phải để xem thành viên">
          <article class="lq-person lq-team-slide" data-lq-member="0" aria-label="Thành viên 1: Lê Hoàng Sơn">
            <div class="lq-person-media">
              <img class="lq-person-photo lq-person-photo--son" src="https://dcg-group-ecosystem.floot.app/_cdn/static/lumiqc-son-portrait-website.webp" alt="Lê Hoàng Sơn mặc áo sơ mi trắng, ảnh chân dung do thành viên cung cấp" width="850" height="1153" decoding="async" loading="lazy">
              
            </div>
            <div class="lq-person-info">
              <span class="lq-person-count">01 / 02 · TRƯỞNG NHÓM</span>
              <h3>Lê Hoàng Sơn</h3>
              <p class="lq-person-badge">Trưởng nhóm · ĐÀN CÁ GỖ</p>
              <p>Phụ trách định hướng sản phẩm LUMIQC, mô hình kinh doanh, bài toán nghiệp vụ QA/QC và điều phối đề án dự thi.</p>
              <div class="lq-team-detail">
                <p class="lq-team-detail-title">TRÁCH NHIỆM & ĐÓNG GÓP</p>
                <ul>
                  <li>Định hướng đề án và mô hình kinh doanh LUMIQC.</li>
                  <li>Tổng hợp nội dung dự thi VECoM và kế hoạch kiểm chứng.</li>
                  <li>Điều phối xây dựng nội dung, thiết kế và hình ảnh dự án.</li>
                </ul>
              </div>
              <div class="lq-person-meta">
                <span>TRƯỜNG</span><b>Đại học Nguyễn Tất Thành</b>
                <span>CHUYÊN NGÀNH</span><b>Quản trị kinh doanh</b>
                <span>HỆ SINH THÁI</span><b>DCG Group</b>
              </div>
            </div>
          </article>
          <article class="lq-person lq-team-slide" data-lq-member="1" aria-label="Thành viên 2: Trương Quốc Huy" hidden aria-hidden="true">
            <div class="lq-person-media">
              <img class="lq-person-photo lq-person-photo--huy" src="https://dcg-group-ecosystem.floot.app/_cdn/static/30e8b869-4cc0-4d9f-b31f-7ad08d2940bc-lumiqc-truong-quoc-huy-vest-user-confirmed.jpeg" alt="Chân dung biên tập của Trương Quốc Huy mặc vest đen, áo sơ mi trắng và cà vạt đen" width="1122" height="1402" decoding="async" loading="lazy">
              
            </div>
            <div class="lq-person-info">
              <span class="lq-person-count">02 / 02 · THÀNH VIÊN</span>
              <h3>Trương Quốc Huy</h3>
              <p class="lq-person-badge">Thành viên · ĐÀN CÁ GỖ</p>
              <p>Phối hợp nghiên cứu kiến trúc giải pháp và luồng vận hành; kết nối định hướng LUMIQC với DCG Vision.</p>
              <div class="lq-team-detail">
                <p class="lq-team-detail-title">TRÁCH NHIỆM & ĐÓNG GÓP</p>
                <ul>
                  <li>Phối hợp nghiên cứu luồng công nghệ và giải pháp QA/QC.</li>
                  <li>Hỗ trợ hoàn thiện nội dung nghiệp vụ và định hướng triển khai.</li>
                  <li>Tham gia xây dựng và phản biện đề án cùng nhóm.</li>
                </ul>
              </div>
              <div class="lq-person-meta">
                <span>TRƯỜNG</span><b>Đại học Nguyễn Tất Thành</b>
                <span>CHUYÊN NGÀNH</span><b>Quản trị kinh doanh</b>
                <span>VAI TRÒ DCG</span><b>Nhà sáng lập & Tổng giám đốc</b>
              </div>
            </div>
          </article>
        </div>
        <div class="lq-team-navigation" aria-label="Điều hướng thành viên">
          <button type="button" class="lq-team-arrow" data-lq-member-prev aria-controls="lq-team-track" aria-label="Thành viên trước"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7"/></svg></button>
          <div class="lq-team-pagination">
            <span class="lq-team-position" aria-live="polite"><span class="lq-team-index-current">01</span> / 02</span>
            <div class="lq-team-dots" aria-label="Chọn thành viên">
              <button type="button" data-lq-member-dot="0" aria-label="Xem Lê Hoàng Sơn" aria-pressed="true" aria-current="true"></button>
              <button type="button" data-lq-member-dot="1" aria-label="Xem Trương Quốc Huy" aria-pressed="false"></button>
            </div>
          </div>
          <button type="button" class="lq-team-arrow" data-lq-member-next aria-controls="lq-team-track" aria-label="Thành viên tiếp theo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button>
        </div>
      </div>
      
    </div>
  </section>

  <section class="lq-roadmap lq-section" id="lo-trinh-vecom" aria-labelledby="lq-roadmap-title">
    <div class="lq-wrap">
      <div class="lq-section-intro"><p class="lq-overline">06 / TIẾN ĐỘ & TÍNH TRUNG THỰC</p><h2 id="lq-roadmap-title">Phân biệt rõ <em>thiết kế, thử nghiệm và kiểm chứng</em></h2><p>Chúng tôi giới thiệu minh bạch những gì đã được mô hình hóa và những gì vẫn cần chứng minh trước khi có thể triển khai tại nhà hàng.</p></div>
      <div class="lq-roadmap-list">
        <article><div class="lq-roadmap-n"><span>01</span><i class="lq-roadmap-line" aria-hidden="true"></i></div><div><span class="lq-roadmap-label lq-roadmap-label--current">HIỆN TẠI / THIẾT KẾ & MÔ PHỎNG</span><h3>Xây dựng kiến trúc và chuẩn hóa luồng nghiệp vụ</h3><p>Thiết kế ba trụ cột CORE, các tình huống TAKE/RETURN, HOLD/RELEASE, checklist, ảnh vệ sinh, báo hủy và bàn giao. Một số bài kiểm tra logic nội bộ đã thực hiện trong điều kiện mô phỏng.</p></div></article>
        <article><div class="lq-roadmap-n"><span>02</span><i class="lq-roadmap-line" aria-hidden="true"></i></div><div><span class="lq-roadmap-label lq-roadmap-label--pending">CẦN KIỂM CHỨNG / THỰC ĐỊA</span><h3>Đo thao tác và hiệu quả tại bếp thật</h3><p>Kiểm tra thời gian quét khi giờ cao điểm, SOP bảo quản từng nhóm nguyên liệu, khả năng tuân thủ của nhân viên và chi phí triển khai. Chưa coi số liệu mô phỏng là bằng chứng hiệu quả kinh doanh.</p></div></article>
        <article><div class="lq-roadmap-n"><span>03</span></div><div><span class="lq-roadmap-label lq-roadmap-label--future">LONG-TERM R&D / CHƯA THƯƠNG MẠI HÓA</span><h3>Camera AI QC – hướng phát triển dài hạn</h3><p>DCG Vision nghiên cứu khả năng hỗ trợ đánh giá hình ảnh. Camera và AI không được dùng để tự kết luận an toàn vi sinh hoặc thay thế thẩm định QA/QC có thẩm quyền.</p></div></article>
      </div>
    </div>
  </section>

  <section class="lq-closing" aria-labelledby="lq-closing-title">
    <div class="lq-wrap lq-closing-grid">
      <div><div class="lq-brand-lineage"><span>DCG GROUP</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg><span>DCG VISION</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg><span>LUMIQC</span></div><h2 id="lq-closing-title">Từ một đề án sinh viên<br><em>Hướng tới chất lượng có thể giải trình</em></h2><p>Đội ĐÀN CÁ GỖ trân trọng các ý kiến phản biện của giám khảo VECoM, chuyên gia QA/QC và các đơn vị vận hành F&B để tiếp tục hoàn thiện thiết kế sản phẩm.</p><p class="lq-closing-image-note">Ảnh bếp công nghệ được tạo bằng AI để minh họa định hướng sản phẩm.</p></div>
      <div class="lq-closing-actions"><a class="lq-btn lq-btn--light" href="/lien-he?topic=lumiqc">Trao đổi về đề án <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></a><a class="lq-closing-back" href="/">Về DCG Group <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></a></div>
    </div>
  </section>
</article>
`;
}

export function initLumiqcPage() {
  const root = document.querySelector('.lq');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-lq-tab]')];
  const panels = [...root.querySelectorAll('[data-lq-panel]')];
  const activate = tab => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.lqPanel !== tab.dataset.lqTab; });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      activate(tabs[next]);
    });
  });
  // One profile at a time; photo on the left, verified information on the right.
  const teamTrack = root.querySelector('#lq-team-track');
  if (teamTrack) {
    const teamMembers = [...teamTrack.querySelectorAll('[data-lq-member]')];
    const dots = [...root.querySelectorAll('[data-lq-member-dot]')];
    const previous = root.querySelector('[data-lq-member-prev]');
    const next = root.querySelector('[data-lq-member-next]');
    const indexLabel = root.querySelector('.lq-team-index-current');
    let current = 0;
    const setTeamMember = index => {
      current = (index + teamMembers.length) % teamMembers.length;
      teamMembers.forEach((member, i) => {
        member.hidden = i !== current;
        member.setAttribute('aria-hidden', String(i !== current));
      });
      dots.forEach((dot, i) => {
        dot.setAttribute('aria-pressed', String(i === current));
        if (i === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (indexLabel) indexLabel.textContent = String(current + 1).padStart(2, '0');
    };
    previous?.addEventListener('click', () => setTeamMember(current - 1));
    next?.addEventListener('click', () => setTeamMember(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => setTeamMember(i)));
    teamTrack.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); setTeamMember(current + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setTeamMember(current - 1); }
      if (event.key === 'Home') { event.preventDefault(); setTeamMember(0); }
      if (event.key === 'End') { event.preventDefault(); setTeamMember(teamMembers.length - 1); }
    });
    let pointerStart = null;
    const carousel = root.querySelector('.lq-team-carousel');
    carousel?.addEventListener('touchstart', event => {
      const touch = event.changedTouches[0];
      pointerStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
    }, { passive: true });
    carousel?.addEventListener('touchend', event => {
      if (!pointerStart) return;
      const touch = event.changedTouches[0];
      if (!touch) { pointerStart = null; return; }
      const dx = touch.clientX - pointerStart.x;
      const dy = touch.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(dx) >= 55 && Math.abs(dx) > Math.abs(dy) * 1.3)
        setTeamMember(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
    setTeamMember(0);
  }

}
