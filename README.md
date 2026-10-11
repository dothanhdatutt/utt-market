# UTT Market - Sàn Thương Mại Điện Tử Sinh Viên & Công Nghệ

Website thương mại điện tử hiện đại, tốc độ cao dành cho cộng đồng sinh viên và công nghệ trường Đại học Công nghệ Giao thông Vận tải (UTT). Dự án được xây dựng theo kiến trúc **Token-Driven Design System**, đạt chuẩn trợ năng quốc tế **WCAG 2.2 AA**, giao diện tối giản tinh tế (không dùng icon thừa), tối ưu cho mật độ hiển thị sản phẩm lớn.

---

## Tính Năng Nổi Bật

1. **Hệ Thống Đăng Nhập & Đăng Ký (Authentication)**:
   - Hỗ trợ đăng nhập bằng Email, Số điện thoại hoặc Mã số sinh viên UTT (`MSV`).
   - Kiểm tra tính hợp lệ dữ liệu thời gian thực (Regex SĐT, mật khẩu bảo mật).
   - Quản lý phiên làm việc (`Session` & `LocalStorage`), tự động cập nhật thanh điều hướng người dùng.
   - Nút ẩn/hiện mật khẩu và đóng mở modal bằng phím `Escape`.

2. **Giỏ Hàng Tương Tác Trực Tiếp (Cart Drawer)**:
   - Thêm sản phẩm, tăng/giảm số lượng, xóa khỏi giỏ.
   - Tự động tính tổng tiền theo định dạng tiền tệ Việt Nam (`₫XXX.XXX`).
   - Áp dụng mã giảm giá tự động khi thu thập Voucher (`-₫50.000`).
   - Xử lý trạng thái giỏ hàng rỗng và thanh toán nhanh.

3. **Tìm Kiếm & Bộ Lọc Nâng Cao**:
   - Gợi ý từ khóa tự động (Auto-suggest) hỗ trợ điều hướng bàn phím (`ArrowUp`, `ArrowDown`, `Enter`, `Esc`).
   - Lọc sản phẩm theo khoảng giá tối thiểu - tối đa (`Min - Max Price`).
   - Lọc nhanh theo: *Gian hàng UTT Mall, Giảm giá từ 45%, Đánh giá cao từ 4.8 sao, Danh mục Điện tử, Làm đẹp, Thời trang*.
   - Khôi phục nhanh danh sách sản phẩm.

4. **Lưu Sản Phẩm Yêu Thích (Wishlist Persistence)**:
   - Lưu trữ danh sách yêu thích bằng cấu trúc `Set` theo ID sản phẩm, bảo toàn trạng thái khi tìm kiếm và đổi bộ lọc.

5. **Flash Sale Real-time Countdown**:
   - Đồng hồ đếm ngược thời gian thực theo từng giây tạo cảm giác gấp rút săn ưu đãi.

6. **Design System State Inspector (Kiểm thử 7 trạng thái component)**:
   - Thanh điều khiển kiểm thử tích hợp sẵn trên giao diện giúp QA/Dev kiểm tra 7 trạng thái:
     1. Default (Mặc định)
     2. Hover (Di chuột)
     3. Focus-Visible (Tiêu điểm bàn phím - viền kép tương phản cao)
     4. Active (Nhấn giữ)
     5. Disabled (Vô hiệu hóa)
     6. Loading (Hiệu ứng vệt sáng Skeleton Shimmer)
     7. Error (Báo lỗi dữ liệu)

---

## Chuẩn Trợ Năng WCAG 2.2 AA

- **Độ tương phản màu sắc**: Tỷ lệ tương phản văn bản đạt ≥ 4.5:1 (AAA cho tiêu đề chính > 16:1).
- **Hỗ trợ bàn phím 100%**: Duyệt toàn bộ luồng mua sắm chỉ bằng phím `Tab`, `Enter`, `Space`, `Arrows` và `Escape`.
- **Skip-Link**: Liên kết ẩn chuyển nhanh tới nội dung chính `#main-content`.
- **ARIA Live Region**: Tự động phát âm thanh/thông báo cho thiết bị đọc màn hình khi giỏ hàng hoặc bộ lọc thay đổi.

---

## Cấu Trúc Dự Án

```
utt-market/
├── assets/
│   └── images/
│       ├── hero-banner.jpg          # Banner 3D UTT Market Super Sale
│       ├── product-headphones.jpg   # Ảnh sản phẩm tai nghe ANC
│       ├── product-smartwatch.jpg   # Ảnh sản phẩm đồng hồ thông minh
│       └── product-skincare.jpg     # Ảnh sản phẩm serum dưỡng da
├── css/
│   ├── tokens.css                   # Biến Design Tokens (Typography, Colors, Spacing)
│   └── style.css                    # Toàn bộ stylesheet giao diện & component
├── js/
│   └── app.js                       # Logic ứng dụng, giỏ hàng, tìm kiếm, đăng nhập
├── index.html                       # Giao diện chính chuẩn SEO & WCAG 2.2 AA
├── server.ps1                       # Server tĩnh siêu nhẹ chạy trên localhost
└── README.md                        # Hướng dẫn dự án
```

---

## Hướng Dẫn Chạy Cục Bộ

### Cách 1: Chạy trực tiếp (Không cần cài đặt)
Nhấp đúp chuột vào tệp `index.html` để mở trực tiếp trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Brave, Safari).

### Cách 2: Chạy qua PowerShell HTTP Server
Mở PowerShell tại thư mục dự án và chạy:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Sau đó truy cập: `http://localhost:3000/`

---

## Bản Quyền
© 2026 UTT Market - Hệ sinh thái Thương mại điện tử sinh viên & cộng đồng Đại học Công nghệ Giao thông Vận tải (54 Triều Khúc, Thanh Xuân, Hà Nội).
