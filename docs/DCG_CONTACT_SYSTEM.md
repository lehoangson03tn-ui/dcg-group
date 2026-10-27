# DCG Group – Hệ thống tiếp nhận liên hệ (27/10/2026)

## Phạm vi
- Trang công khai: `/lien-he`, nút `GỬI LỜI NHẮN`. LUMIQC dùng `/lien-he?topic=lumiqc` để chọn đúng chủ đề.
- Endpoint nhận: `https://mbynmifozkuvwoghvewi.supabase.co/functions/v1/dcg-contact-submit`.
- Edge Function: `dcg-contact-submit` (public function, `verify_jwt=false`, tự kiểm tra origin, dữ liệu, honeypot, rate limit).
- Supabase table: `public.dcg_contact_messages`, **riêng biệt với tất cả bảng GROWMATCH**. Tuy cùng Supabase project, bảng contact không có khóa ngoại/tương tác với nghiệp vụ tuyển dụng.
- Chỉ Edge Function giữ service role phía máy chủ được đọc/ghi bảng. RLS đã bật, không cấp SELECT/INSERT trực tiếp cho anon hoặc authenticated.
- Khách nhận kết quả **thành công chỉ sau khi lưu bản ghi trả về id**; nếu có lỗi phải hiện trạng thái lỗi.
- Quản trị viên xem thư trong Supabase Dashboard → Table Editor → `dcg_contact_messages`, thay đổi cột `status` theo trạng thái xử lý.

## Cấu hình email thông báo – CHƯA KÍCH HOẠT NẾU THIẾU BIẾN BÍ MẬT
Supabase Dashboard → project `mbynmifozkuvwoghvewi` → Edge Functions → Secrets.

Cần đặt đủ ba secret máy chủ:
- `RESEND_API_KEY`: API key của tài khoản Resend được cấp phép gửi email.
- `DCG_CONTACT_TO_EMAIL`: địa chỉ email quản trị DCG **do chủ dự án xác nhận**.
- `DCG_CONTACT_FROM_EMAIL`: người gửi thuộc domain đã xác minh ở Resend (ví dụ minh họa: `DCG Group <contact@verified-domain.example>`; không sử dụng giá trị ví dụ).

Không nhập các khóa này vào GitHub, tệp JavaScript hoặc phía trình duyệt; không gửi khóa bí mật qua tin nhắn.

Khi cấu hình đúng, Edge Function gửi một email chứa nội dung liên hệ mới và reply-to là địa chỉ người gửi; cột `notification_status` được đánh dấu `sent` hoặc `failed`. **Dù email thất bại, lời nhắn vẫn được lưu**, nên luôn kiểm tra Table Editor.

## Chống spam & dữ liệu
- Giới hạn kích thước dữ liệu, chuẩn hóa Unicode, email hợp lệ, trường honeypot, giới hạn 4 yêu cầu/giờ theo mã băm IP có khóa.
- Chỉ chấp nhận Origin thuộc domain DCG Group và localhost dev. Origin có thể bị giả mạo bởi công cụ tự động nên đây không phải xác thực mạnh.
- Tùy chọn chống bot nghiêm ngặt: `DCG_TURNSTILE_SECRET` (chỉ đặt **sau** khi frontend được triển khai widget Turnstile và gửi `turnstileToken`; nếu đặt một phía sẽ chặn mọi lượt gửi).
- Hệ thống chỉ lưu mã HMAC của IP, không lưu IP thuần. Dữ liệu gồm họ tên, email, nội dung, lĩnh vực, trạng thái xử lý.
- Chưa có cơ chế tự động xóa theo hạn; phải định nghĩa quy trình giữ và xóa dữ liệu, cùng thông tin người quản trị tiếp nhận yêu cầu quyền riêng tư trước khi công bố chính sách hoàn chỉnh.
- Không mở public SELECT/INSERT qua Supabase Data API; không triển khai dashboard công khai với service_role.

## Kiểm thử và phát hành
- Mã nguồn Vite `npm run build`.
- Playwright `tests/lumiqc-rename-qa.mjs` kiểm tra biểu mẫu, consent, lựa chọn LUMIQC, luồng gửi bằng mock API. Mock test **không thay thế kiểm thử HTTP đầu-cuối** trên Production.
- Sau khi Vercel cho phép deploy: xác nhận Production SHA bằng Vercel và tự gửi một tin thử được đánh dấu TEST, kiểm tra lưu DB, cột notification_status và email nếu đã cấu hình.
- Không báo "đã gửi email" nếu `RESEND_API_KEY`, `DCG_CONTACT_TO_EMAIL`, `DCG_CONTACT_FROM_EMAIL` chưa đủ hoặc chưa test.

## Tách biệt hệ thống
- Đang sử dụng cùng Supabase project với GROWMATCH để tránh phát sinh dự án/billing; **không dùng bảng tuyển dụng GROWMATCH**. Nếu sau này cần tách vật lý hoặc phân quyền độc lập toàn dự án, tạo Supabase project mới sau khi chủ dự án xác nhận tổ chức và chi phí.
