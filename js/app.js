/**
 * Nova Market - Storefront Logic & State Controller
 * Features: High-density Rendering, Wishlist Persistence, Cart Management,
 * Price Filtering, Search Autocomplete with Keyboard Nav, Real-time Countdown,
 * Voucher Application, WCAG 2.2 AA Focus Management & 7 Component States Inspector.
 */

// 1. Data Store
const PRODUCTS_DATA = [
  {
    id: 101,
    title: 'Sách bài tập Toán đại cương',
    price: 10000,
    oldPrice: 25000,
    discount: '-60%',
    rating: 5.0,
    sold: '128',
    isMall: true,
    freeship: true,
    image: './assets/images/book-toan-daicuong-bt.jpg',
    category: 'books',
    description: 'Sách bài tập Toán đại cương (Mã học phần: DC1CB51) dành cho sinh viên. Bìa xanh dày dặn, tổng hợp đầy đủ bài tập giải tích, chuỗi số, đại số tuyến tính kèm đáp án và hướng dẫn giải từng bước.',
    specs: [
      { label: 'Loại tài liệu', value: 'Sách bài tập học phần' },
      { label: 'Môn học', value: 'Toán đại cương (DC1CB51)' },
      { label: 'Tình trạng', value: 'Mới 95%, không rách nát, chữ in rõ' },
      { label: 'Giao hàng', value: 'Freeship ký túc xá & khuôn viên trường' }
    ]
  },
  {
    id: 102,
    title: 'Tập bài giảng học phần Toán đại cương',
    price: 20000,
    oldPrice: 40000,
    discount: '-50%',
    rating: 4.9,
    sold: '96',
    isMall: false,
    freeship: true,
    image: './assets/images/book-toan-daicuong-bg.jpg',
    category: 'books',
    description: 'Tập bài giảng học phần Toán đại cương (Mã học phần: DC1CB51) do Bộ môn Toán ứng dụng biên soạn. Tóm tắt lý thuyết trọng tâm, định lý, công thức cô đọng và ví dụ mẫu chuẩn đề thi học kỳ.',
    specs: [
      { label: 'Loại tài liệu', value: 'Tập bài giảng chính thức' },
      { label: 'Môn học', value: 'Toán đại cương (DC1CB51)' },
      { label: 'Tình trạng', value: 'Đầy đủ bài học, bảo quản sạch đẹp' },
      { label: 'Năm ấn hành', value: 'Hà Nội - 2024' }
    ]
  },
  {
    id: 103,
    title: 'Sách bài tập Nguyên lý kế toán',
    price: 15000,
    oldPrice: 35000,
    discount: '-57%',
    rating: 5.0,
    sold: '115',
    isMall: true,
    freeship: true,
    image: './assets/images/book-nguyenly-ketoan-bt.jpg',
    category: 'books',
    description: 'Sách bài tập Nguyên lý kế toán - Nhà xuất bản Tài Chính. Tuyển tập bài tập định khoản nghiệp vụ kế toán, lập bảng cân đối số phát sinh, sơ đồ chữ T và lập báo cáo tài chính căn bản.',
    specs: [
      { label: 'Loại tài liệu', value: 'Sách bài tập chuyên ngành' },
      { label: 'Môn học', value: 'Nguyên lý kế toán' },
      { label: 'NXB', value: 'Nhà xuất bản Tài Chính' },
      { label: 'Tình trạng', value: 'Còn mới, bìa xanh chữ rõ' }
    ]
  },
  {
    id: 104,
    title: 'Giáo trình Kế toán quản trị',
    price: 15000,
    oldPrice: 35000,
    discount: '-57%',
    rating: 4.8,
    sold: '84',
    isMall: false,
    freeship: true,
    image: './assets/images/book-ketoan-quantri.jpg',
    category: 'books',
    description: 'Giáo trình Kế toán quản trị - Khoa Kế toán kiểm toán. Cung cấp kiến thức sâu về phân loại chi phí, điểm hòa vốn CVP, định giá bán sản phẩm, lập dự toán ngân sách hoạt động kinh doanh.',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình đại học' },
      { label: 'Môn học', value: 'Kế toán quản trị' },
      { label: 'Tình trạng', value: 'Bìa vàng gáy xanh, trang ruột sạch đẹp' }
    ]
  },
  {
    id: 105,
    title: 'Giáo trình Marketing căn bản',
    price: 20000,
    oldPrice: 55000,
    discount: '-64%',
    rating: 4.9,
    sold: '142',
    isMall: false,
    freeship: true,
    image: './assets/images/book-marketing.jpg',
    category: 'books',
    description: 'Giáo trình Marketing căn bản chuẩn chương trình đào tạo khối ngành kinh tế. Nội dung bao quát mô hình 4P/7P, phân đoạn thị trường STP, nghiên cứu hành vi người tiêu dùng và định vị thương hiệu.',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình kinh tế' },
      { label: 'Môn học', value: 'Marketing căn bản' },
      { label: 'Tình trạng', value: 'Mới 90%, bìa dày dặn' }
    ]
  },
  {
    id: 106,
    title: 'Giáo trình Tiếng Nhật - Đồng giá 20k',
    price: 20000,
    oldPrice: 50000,
    discount: '-60%',
    rating: 5.0,
    sold: '210',
    isMall: false,
    freeship: true,
    image: './assets/images/book-tieng-nhat.jpg',
    category: 'books',
    description: 'Bộ giáo trình Tiếng Nhật Minna no Nihongo sơ cấp 1 & 2, luyện thi năng lực Nhật ngữ JLPT N5 - N4, sách giải thích ngữ pháp, từ vựng, bài tập chuẩn chỉnh. Đồng giá 20.000₫ mỗi cuốn!',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình ngoại ngữ' },
      { label: 'Trình độ', value: 'Sơ cấp Minna no Nihongo / JLPT N4 - N5' },
      { label: 'Tình trạng', value: 'Sách tuyển chọn, sạch sẽ dễ học' }
    ]
  },
  {
    id: 107,
    title: 'Tập bài giảng môn Pháp luật Việt Nam đại cương',
    price: 25000,
    oldPrice: 45000,
    discount: '-44%',
    rating: 4.8,
    sold: '91',
    isMall: false,
    freeship: true,
    image: './assets/images/book-phapluat-daicuong.jpg',
    category: 'books',
    description: 'Tập bài giảng môn Pháp luật Việt Nam đại cương (Lưu hành nội bộ) - Khoa Luật Chính trị. Tổng hợp các chế định pháp luật cơ bản: Hiến pháp, Dân sự, Hình sự, Luật lao động và cơ chế phòng chống tham nhũng.',
    specs: [
      { label: 'Loại tài liệu', value: 'Tập bài giảng lưu hành nội bộ' },
      { label: 'Môn học', value: 'Pháp luật Việt Nam đại cương' },
      { label: 'Năm ấn hành', value: 'Hà Nội - 2025' },
      { label: 'Tình trạng', value: 'Mới tinh 98%' }
    ]
  },
  {
    id: 108,
    title: 'Sách Tiếng Anh Voices',
    price: 50000,
    oldPrice: 130000,
    discount: '-62%',
    rating: 5.0,
    sold: '78',
    isMall: true,
    freeship: true,
    image: './assets/images/book-voices.jpg',
    category: 'books',
    description: 'Giáo trình tiếng Anh đại học VOICES - National Geographic Learning. Bản in màu chuẩn quốc tế cực đẹp, tích hợp chủ đề giao tiếp hiện đại, ngữ pháp nâng cao và kỹ năng thuyết trình tự tin.',
    specs: [
      { label: 'Loại tài liệu', value: 'Sách tiếng Anh học thuật' },
      { label: 'Nhà xuất bản', value: 'National Geographic Learning' },
      { label: 'Tình trạng', value: 'In màu sắc nét, không gập góc' }
    ]
  },
  {
    id: 109,
    title: 'Giáo trình Triết học Mác - Lênin',
    price: 30000,
    oldPrice: 70000,
    discount: '-57%',
    rating: 4.9,
    sold: '165',
    isMall: true,
    freeship: true,
    image: './assets/images/book-triet-hoc.jpg',
    category: 'books',
    description: 'Giáo trình Triết học Mác - Lênin dùng cho sinh viên đại học, cao đẳng (Bộ Giáo dục và Đào tạo). Sách chuẩn bìa đỏ in chữ mạ vàng, trình bày đầy đủ chủ nghĩa duy vật biện chứng và duy vật lịch sử.',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình đại cương quốc gia' },
      { label: 'Cơ quan biên soạn', value: 'Bộ Giáo dục và Đào tạo' },
      { label: 'NXB', value: 'Chính trị Quốc gia Sự Thật' },
      { label: 'Tình trạng', value: 'Mới 98%, nguyên vẹn' }
    ]
  },
  {
    id: 110,
    title: 'Giáo trình Nguyên lý kế toán',
    price: 20000,
    oldPrice: 45000,
    discount: '-56%',
    rating: 4.8,
    sold: '88',
    isMall: false,
    freeship: true,
    image: './assets/images/book-nguyenly-ketoan-bt.jpg',
    category: 'books',
    description: 'Giáo trình lý thuyết Nguyên lý kế toán căn bản. Cung cấp nền tảng vững chắc về phương pháp chứng từ, kiểm kê, tính giá các đối tượng kế toán và nguyên tắc lập báo cáo tài chính.',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình lý thuyết cơ sở ngành' },
      { label: 'Môn học', value: 'Nguyên lý kế toán' },
      { label: 'Tình trạng', value: 'Bìa đẹp, giấy sáng rõ' }
    ]
  },
  {
    id: 111,
    title: 'Giáo trình Kinh tế học',
    price: 15000,
    oldPrice: 40000,
    discount: '-63%',
    rating: 4.9,
    sold: '76',
    isMall: false,
    freeship: true,
    image: './assets/images/book-kinh-te.jpg',
    category: 'books',
    description: 'Giáo trình Kinh tế học đại cương tổng hợp kiến thức cả Kinh tế vi mô và Kinh tế vĩ mô. Phân tích cơ chế cung - cầu thị trường, hành vi doanh nghiệp, GDP, lạm phát và chính sách tiền tệ.',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình cơ sở ngành' },
      { label: 'Môn học', value: 'Kinh tế học đại cương' },
      { label: 'Tình trạng', value: 'Mới 92%, không viết bậy' }
    ]
  },
  {
    id: 112,
    title: 'Giáo trình Tài chính học',
    price: 15000,
    oldPrice: 40000,
    discount: '-63%',
    rating: 4.8,
    sold: '62',
    isMall: false,
    freeship: true,
    image: './assets/images/book-kinh-te.jpg',
    category: 'books',
    description: 'Giáo trình Tài chính học và Lý thuyết tài chính tiền tệ. Phân tích hệ thống ngân hàng, thị trường chứng khoán, chính sách ngân sách nhà nước và quản trị tài chính cơ bản.',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình đại học' },
      { label: 'Môn học', value: 'Tài chính học' },
      { label: 'Tình trạng', value: 'Nguyên vẹn, chữ rõ ràng' }
    ]
  },
  {
    id: 113,
    title: 'Giáo trình Kinh tế chính trị Mác - Lênin',
    price: 20000,
    oldPrice: 45000,
    discount: '-56%',
    rating: 4.9,
    sold: '110',
    isMall: false,
    freeship: true,
    image: './assets/images/book-triet-hoc.jpg',
    category: 'books',
    description: 'Giáo trình Kinh tế chính trị Mác - Lênin do Bộ Giáo dục và Đào tạo ban hành. Nghiên cứu sâu về hàng hóa, tiền tệ, quy luật giá trị thặng dư, CNTB độc quyền và thể chế kinh tế thị trường định hướng XHCN.',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình lý luận chính trị' },
      { label: 'Môn học', value: 'Kinh tế chính trị Mác - Lênin' },
      { label: 'Tình trạng', value: 'Chuẩn bìa đỏ, mới 95%' }
    ]
  },
  {
    id: 114,
    title: 'Giáo trình Tư tưởng Hồ Chí Minh',
    price: 20000,
    oldPrice: 45000,
    discount: '-56%',
    rating: 5.0,
    sold: '135',
    isMall: false,
    freeship: true,
    image: './assets/images/book-triet-hoc.jpg',
    category: 'books',
    description: 'Giáo trình Tư tưởng Hồ Chí Minh dành cho sinh viên đại học trên toàn quốc. Trình bày khoa học về tư tưởng độc lập dân tộc gắn liền với CNXH, đại đoàn kết toàn dân và xây dựng Nhà nước của dân, do dân, vì dân.',
    specs: [
      { label: 'Loại tài liệu', value: 'Giáo trình lý luận chính trị' },
      { label: 'Môn học', value: 'Tư tưởng Hồ Chí Minh' },
      { label: 'Tình trạng', value: 'Mới 98%, bảo quản sạch sẽ' }
    ]
  },
  {
    id: 13,
    title: 'Pass áo cũ UTT đẹp mới mặc 1 lần',
    price: 50000,
    oldPrice: 150000,
    discount: '-67%',
    rating: 5.0,
    sold: '1',
    isMall: false,
    freeship: true,
    image: './assets/images/product-ao-utt.jpg',
    category: 'fashion',
    description: 'Áo đồng phục polo Trường Đại học Công nghệ Giao thông Vận tải (UTT) chính hãng Biluxury cao cấp. Tình trạng áo mới 99%, mới mặc đúng 1 lần duy nhất trong ngày khai giảng chụp ảnh kỷ yếu rồi giặt sạch cất tủ cẩn thận. Áo không có bất kỳ vết ố, sờn chỉ hay xù lông nào, cổ áo và bo tay vẫn giữ nguyên form cứng cáp như mới đập hộp. Chất vải cá sấu mè thể thao co giãn 4 chiều mềm mịn, siêu thoáng khí và thấm hút mồ hôi cực tốt. Phù hợp cho các bạn sinh viên, tân sinh viên UTT mặc đi học trên giảng đường, đi thực tập hoặc tham gia các sự kiện của trường.',
    specs: [
      { label: 'Thương hiệu', value: 'Biluxury x UTT (Hàng thiết kế độc quyền)' },
      { label: 'Size', value: 'M (US M / VN 39 - Phù hợp 50kg - 65kg, cao 1m60 - 1m72)' },
      { label: 'Tình trạng', value: 'Mới 99% (Mới mặc 1 lần, thơm tho sạch sẽ)' },
      { label: 'Kiểu dáng', value: 'Polo Body Fit trẻ trung, tôn dáng' },
      { label: 'Màu sắc', value: 'Thân trắng phối tay xanh Navy, viền cổ cam UTT' },
      { label: 'Họa tiết', value: 'Thêu logo UTT - University of Transport Technology sắc nét' },
      { label: 'Chất liệu', value: 'Thun cá sấu Poly-Spandex kháng khuẩn, co giãn 4 chiều' },
      { label: 'Địa chỉ nhận hàng', value: 'Campus UTT 54 Triều Khúc hoặc Ký túc xá UTT (Hỗ trợ ship COD toàn quốc)' }
    ]
  }
];

// 2. Global State Store
let cart = []; // Start with an empty cart — items are added by the user

const savedWishlist = new Set();
let currentFilter = 'all';
let currentSearchQuery = '';
let minPriceFilter = null;
let maxPriceFilter = null;
let appliedVoucherDiscount = 0;
let currentComponentState = 'default';
let activeSuggestionIndex = -1;

// 3. Formatting Helpers
function formatVND(amount) {
  return '₫' + Math.max(0, amount).toLocaleString('vi-VN');
}

// 4. Render Product Grid
function renderProducts(items) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  // Update product count feedback bar
  const countBar = document.getElementById('product-count-bar');
  if (countBar) {
    if (items.length === PRODUCTS_DATA.length) {
      countBar.textContent = `Hiển thị tất cả ${items.length} sản phẩm`;
    } else {
      countBar.textContent = `Tìm thấy ${items.length} / ${PRODUCTS_DATA.length} sản phẩm phù hợp`;
    }
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; background: #fff; border-radius: 8px; border: 1px dashed #e0e0e0;">
        <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
        <p style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">Không tìm thấy sản phẩm phù hợp</p>
        <p style="color: #606060; font-size: 13px; margin-bottom: 16px;">Vui lòng thử từ khóa khác hoặc xóa bỏ bộ lọc hiện tại</p>
        <button class="btn btn--primary" onclick="resetFilters()">Xem tất cả sản phẩm</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(product => {
    const isSaved = savedWishlist.has(product.id);
    const stateClass = currentComponentState !== 'default' ? ` product-card--${currentComponentState}` : '';
    return `
      <article class="product-card${stateClass}" id="product-${product.id}" tabindex="0" aria-label="${product.title}, ${formatVND(product.price)}" onclick="openProductModal(${product.id})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProductModal(${product.id});}">
        <div class="product-card__thumb">
          <img src="${product.image}" alt="${product.title}" class="product-card__img" loading="lazy">
          ${product.isMall ? '<span class="badge-tag">Nova Mall</span>' : ''}
          <span class="badge-tag badge-tag--discount">${product.discount}</span>
          ${product.freeship ? '<span class="badge-tag badge-tag--freeship">Freeship MAX</span>' : ''}
        </div>
        <div class="product-card__body">
          <h3 class="product-card__title" title="${product.title}">${product.title}</h3>
          <div class="product-card__price-row">
            <span class="product-card__price-current">${formatVND(product.price)}</span>
            <span class="product-card__price-old">${formatVND(product.oldPrice)}</span>
          </div>
          <div class="product-card__meta">
            <span class="product-card__rating">⭐ ${product.rating}</span>
            <span class="product-card__sold">Đã bán ${product.sold}</span>
          </div>
          <div class="product-card__actions">
            <button class="product-card__btn" onclick="event.stopPropagation(); addToCart(${product.id})" aria-label="Thêm ${product.title} vào giỏ hàng">
              🛒 Thêm vào giỏ
            </button>
            <button class="product-card__wishlist ${isSaved ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id}, this)" aria-label="${isSaved ? 'Bỏ lưu' : 'Lưu'} sản phẩm">
              ${isSaved ? '❤️ Đã lưu' : '🤍 Lưu'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// 4.1 Product Details Modal & Description Viewer
function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const overlay = document.getElementById('product-modal-overlay');
  const body = document.getElementById('product-modal-body');
  const catEl = document.getElementById('modal-breadcrumb-category');
  if (!modal || !overlay || !body) return;

  const catNames = {
    'fashion': 'Thời Trang & Đồng Phục',
    'electronics': 'Thiết Bị Điện Tử & Số',
    'beauty': 'Làm Đẹp & Sức Khỏe',
    'home': 'Nhà Cửa & Đời Sống',
    'books': 'Sách & Giáo Trình Học Tập'
  };

  if (catEl) {
    catEl.textContent = catNames[product.category] || 'Sản Phẩm Nova';
  }

  const defaultDesc = product.description || `Sản phẩm chính hãng chất lượng cao tại hệ thống Nova Market. Cam kết nguồn gốc xuất xứ rõ ràng, kiểm định nghiêm ngặt bởi ban quản lý sàn, hỗ trợ đổi trả nhanh chóng trong vòng 30 ngày cho khách hàng Nova Market.`;

  const specsList = product.specs || [
    { label: 'Thương hiệu', value: product.isMall ? 'Nova Official Mall' : 'Cộng đồng Nova Market' },
    { label: 'Tình trạng', value: 'Mới 100% chính hãng' },
    { label: 'Giao hàng', value: 'Freeship toàn quốc & Giao hàng hoả tốc' },
    { label: 'Bảo hành', value: '12 tháng chính hãng' }
  ];

  const specsRows = specsList.map(s => `
    <tr>
      <td>${s.label}:</td>
      <td>${s.value}</td>
    </tr>
  `).join('');

  body.innerHTML = `
    <div class="product-modal__gallery">
      <div class="product-modal__main-img-wrap">
        <img src="${product.image}" alt="${product.title}" class="product-modal__main-img" id="modal-product-img">
        <div class="product-modal__badges">
          ${product.isMall ? '<span class="badge-tag">Nova Mall</span>' : ''}
          <span class="badge-tag badge-tag--discount">${product.discount}</span>
          ${product.freeship ? '<span class="badge-tag badge-tag--freeship">Freeship MAX</span>' : ''}
        </div>
      </div>
      <div class="product-modal__guarantee">
        <strong>Cam kết uy tín Nova Market:</strong><br>
        100% ảnh thật, kiểm tra hàng trước khi thanh toán, đổi trả trong vòng 30 ngày.
      </div>
    </div>

    <div class="product-modal__info">
      <h2 class="product-modal__title" id="product-modal-title">${product.title}</h2>
      
      <div class="product-modal__ratings-row">
        <span class="product-modal__rating-score">${product.rating} ★★★★★</span>
        <span class="product-modal__sold">Đã bán: ${product.sold}</span>
        <span style="color: #2e7d32; font-weight: 500;">Còn hàng sẵn sàng giao</span>
      </div>

      <div class="product-modal__price-box">
        <span class="product-modal__price-current">${formatVND(product.price)}</span>
        <span class="product-modal__price-old">${formatVND(product.oldPrice)}</span>
        <span class="product-modal__discount-tag">${product.discount}</span>
      </div>

      <div>
        <div class="product-modal__section-heading">Thông Số &amp; Tình Trạng Sản Phẩm:</div>
        <table class="product-modal__specs-table">
          <tbody>
            ${specsRows}
          </tbody>
        </table>
      </div>

      <div>
        <div class="product-modal__section-heading">Mô Tả Chi Tiết:</div>
        <div class="product-modal__desc-content">
          ${defaultDesc}
        </div>
      </div>

      <div class="product-modal__qty-row">
        <span style="font-weight: 600;">Số lượng:</span>
        <div class="product-modal__qty-selector">
          <button type="button" class="product-modal__qty-btn" onclick="adjustModalQty(-1)" aria-label="Giảm">-</button>
          <input type="number" id="modal-qty-input" class="product-modal__qty-input" value="1" min="1" max="99" readonly>
          <button type="button" class="product-modal__qty-btn" onclick="adjustModalQty(1)" aria-label="Tăng">+</button>
        </div>
      </div>

      <div class="product-modal__actions-row">
        <button type="button" class="product-modal__btn-add" onclick="addModalProductToCart(${product.id}, false)">
          Thêm Vào Giỏ Hàng
        </button>
        <button type="button" class="product-modal__btn-buy" onclick="addModalProductToCart(${product.id}, true)">
          Mua Ngay
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('product-modal-close')?.focus();

  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = `Đang mở mô tả chi tiết: ${product.title}`;
  }
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  const overlay = document.getElementById('product-modal-overlay');
  if (!modal || !overlay) return;

  modal.classList.remove('active');
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'true');
  if (window.location.hash.startsWith('#product-')) {
    history.replaceState(null, null, ' ');
  }
}

function adjustModalQty(delta) {
  const input = document.getElementById('modal-qty-input');
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(99, val + delta));
  input.value = val;
}

function addModalProductToCart(productId, buyNow) {
  const input = document.getElementById('modal-qty-input');
  const qty = input ? (parseInt(input.value) || 1) : 1;
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      qty: qty,
      image: prod.image
    });
  }

  updateCartUI();
  const shortTitle = prod.title.length > 28 ? prod.title.substring(0, 28) + '...' : prod.title;
  showToast(`✅ Đã thêm ${qty} x "${shortTitle}" vào giỏ hàng`);

  if (buyNow) {
    closeProductModal();
    openCheckoutModal();
  }
}

// 5. Component State Inspector (Default, Hover, Focus, Active, Disabled, Loading, Error)
function setComponentState(stateName) {
  currentComponentState = stateName;
  document.querySelectorAll('.state-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.state === stateName);
  });

  // Re-render with new state applied — this preserves all onclick handlers
  filterProducts();

  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = `Chế độ hiển thị component chuyển sang: ${stateName}`;
  }

  showToast(`Đã áp dụng trạng thái: ${stateName.toUpperCase()}`);
}

// 6. Cart Management
function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const countHeaderEl = document.getElementById('cart-drawer-count');
  const mobCountEl = document.getElementById('mob-cart-count');
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const voucherRow = document.getElementById('cart-voucher-row');
  const voucherAmountEl = document.getElementById('cart-voucher-amount');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const finalTotal = Math.max(0, subtotal - appliedVoucherDiscount);

  if (countEl) countEl.textContent = totalItems;
  if (mobCountEl) mobCountEl.textContent = totalItems;
  if (countHeaderEl) countHeaderEl.textContent = `(${totalItems})`;
  if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
  if (totalEl) totalEl.textContent = formatVND(finalTotal);

  if (voucherRow && voucherAmountEl) {
    if (appliedVoucherDiscount > 0 && cart.length > 0) {
      voucherRow.style.display = 'flex';
      voucherAmountEl.textContent = `-${formatVND(appliedVoucherDiscount)}`;
    } else {
      voucherRow.style.display = 'none';
    }
  }

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <p style="font-weight: bold; margin-bottom: 4px;">Giỏ hàng của bạn đang trống</p>
        <p style="font-size: 11px; color: #888;">Khám phá ngay hàng ngàn ưu đãi hấp dẫn trên Nova Market!</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item__thumb">
      <div class="cart-item__info">
        <div class="cart-item__title">${item.title}</div>
        <div class="cart-item__price">${formatVND(item.price)}</div>
        <div class="cart-item__controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Giảm số lượng">-</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Tăng số lượng">+</button>
          <button class="cart-item__remove" onclick="removeFromCart(${item.id})" aria-label="Xóa khỏi giỏ">Xóa</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      qty: 1,
      image: prod.image
    });
  }

  updateCartUI();
  const shortTitle2 = prod.title.length > 28 ? prod.title.substring(0, 28) + '...' : prod.title;
  showToast(`✅ Đã thêm "${shortTitle2}" vào giỏ hàng`);

  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = `Đã thêm sản phẩm ${prod.title} vào giỏ hàng. Tổng số sản phẩm hiện tại: ${cart.reduce((s, i) => s + i.qty, 0)}`;
  }
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== productId);
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCartUI();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng');
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer || !overlay) return;

  if (open) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.getElementById('cart-close-btn')?.focus();
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.getElementById('cart-btn')?.focus();
  }
}

// ==========================================================================
// 6. CHECKOUT, DELIVERY ADDRESS & PAYMENT SYSTEM
// ==========================================================================
let selectedPaymentMethod = 'cod';
let checkoutVoucherDiscount = 0;

const ADDRESS_PRESETS = {
  utt: {
    name: 'Nguyễn Văn An',
    phone: '0988123456',
    city: 'Hà Nội',
    district: 'Quận Thanh Xuân',
    address: 'Số 54 Phố Triều Khúc, Phường Thanh Xuân Nam (Trụ sở chính ĐH Công Nghệ GTVT)',
    note: 'Giao tại sảnh nhà H1 hoặc bảo vệ, gọi trước 10 phút'
  },
  ktx: {
    name: 'Trần Thị Mai',
    phone: '0976654321',
    city: 'Hà Nội',
    district: 'Quận Thanh Xuân',
    address: 'Ký Túc Xá Sinh Viên UTT, 54 Triều Khúc, Tòa nhà KTX, Phòng 302',
    note: 'Giao sau giờ tan học chiều hoặc gửi bác quản lý KTX'
  },
  home: {
    name: 'Lê Quốc Bảo',
    phone: '0912345678',
    city: 'Hà Nội',
    district: 'Quận Đống Đa',
    address: 'Số 12 Ngõ 95 Chùa Bộc, Phường Trung Liệt',
    note: 'Giao trong giờ hành chính, bấm chuông cổng'
  }
};

const CITY_DISTRICTS = {
  'Hà Nội': ['Quận Thanh Xuân', 'Quận Đống Đa', 'Quận Cầu Giấy', 'Quận Nam Từ Liêm', 'Quận Bắc Từ Liêm', 'Quận Hà Đông', 'Quận Hai Bà Trưng', 'Quận Ba Đình', 'Quận Hoàng Mai', 'Huyện Thanh Trì'],
  'TP. Hồ Chí Minh': ['Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 10', 'Quận Bình Thạnh', 'Quận Tân Bình', 'Thành phố Thủ Đức', 'Quận Gò Vấp'],
  'Đà Nẵng': ['Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn', 'Quận Liên Chiểu'],
  'Hải Phòng': ['Quận Hồng Bàng', 'Quận Ngô Quyền', 'Quận Lê Chân', 'Quận Hải An'],
  'Cần Thơ': ['Quận Ninh Kiều', 'Quận Bình Thủy', 'Quận Cái Răng', 'Quận Ô Môn'],
  'Bình Dương': ['TP. Thủ Dầu Một', 'TP. Thuận An', 'TP. Dĩ An', 'Thị xã Bến Cát'],
  'Đồng Nai': ['TP. Biên Hòa', 'TP. Long Khánh', 'Huyện Long Thành'],
  'Thái Nguyên': ['TP. Thái Nguyên', 'TP. Sông Công', 'Thị xã Phổ Yên'],
  'Quảng Ninh': ['TP. Hạ Long', 'TP. Cẩm Phả', 'TP. Uông Bí', 'Thị xã Quảng Yên']
};

function handleCityChange() {
  const citySelect = document.getElementById('checkout-city');
  const districtSelect = document.getElementById('checkout-district');
  if (!citySelect || !districtSelect) return;

  const city = citySelect.value;
  const districts = CITY_DISTRICTS[city] || ['Quận / Huyện trung tâm'];
  districtSelect.innerHTML = districts.map(d => `<option value="${d}">${d}</option>`).join('');
}

function applyAddressPreset(presetKey) {
  const preset = ADDRESS_PRESETS[presetKey];
  if (!preset) return;

  const nameInput = document.getElementById('checkout-name');
  const phoneInput = document.getElementById('checkout-phone');
  const citySelect = document.getElementById('checkout-city');
  const addressInput = document.getElementById('checkout-address');
  const noteInput = document.getElementById('checkout-note');

  if (nameInput) nameInput.value = (currentUser && currentUser.name) ? currentUser.name : preset.name;
  if (phoneInput) phoneInput.value = (currentUser && currentUser.phone) ? currentUser.phone : preset.phone;
  if (citySelect) {
    citySelect.value = preset.city;
    handleCityChange();
    const districtSelect = document.getElementById('checkout-district');
    if (districtSelect) districtSelect.value = preset.district;
  }
  if (addressInput) addressInput.value = preset.address;
  if (noteInput) noteInput.value = preset.note;

  // Clear any validation errors
  ['name', 'phone', 'address'].forEach(f => {
    const err = document.getElementById(`err-checkout-${f}`);
    if (err) { err.textContent = ''; err.style.display = 'none'; }
  });

  showToast(`✅ Đã áp dụng mẫu địa chỉ: ${presetKey === 'utt' ? 'ĐH Công Nghệ GTVT' : presetKey === 'ktx' ? 'KTX UTT' : 'Nhà Riêng'}`);
}

function handlePaymentMethodChange(method) {
  selectedPaymentMethod = method;

  // Update card active classes
  document.querySelectorAll('.payment-method-card').forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) {
      const isMatched = radio.value === method;
      radio.checked = isMatched;
      card.classList.toggle('active', isMatched);
    }
  });

  // Render detail sub-box
  const detailContainer = document.getElementById('payment-detail-container');
  if (!detailContainer) return;

  const total = Math.max(0, cart.reduce((s, i) => s + (i.price * i.qty), 0) - checkoutVoucherDiscount);
  const formattedTotal = formatVND(total);
  const orderRef = 'NOVA' + Math.floor(100000 + Math.random() * 900000);

  if (method === 'cod') {
    detailContainer.style.display = 'block';
    detailContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: #334155;">
        <span style="font-size: 26px;">💵</span>
        <div>
          <strong style="color: #0369a1; display: block; margin-bottom: 2px;">Thanh toán khi nhận hàng (COD)</strong>
          <span>Quý khách sẽ thanh toán đúng số tiền <strong>${formattedTotal}</strong> cho nhân viên bưu tá khi nhận và đồng kiểm kiện hàng.</span>
        </div>
      </div>
    `;
  } else if (method === 'vietqr') {
    detailContainer.style.display = 'block';
    detailContainer.innerHTML = `
      <div class="vietqr-box">
        <div class="vietqr-image-wrap">
          <svg class="vietqr-mock-qr" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#ffffff" rx="4"/>
            <rect x="8" y="8" width="28" height="28" fill="#081730" rx="3"/>
            <rect x="12" y="12" width="20" height="20" fill="#ffffff"/>
            <rect x="16" y="16" width="12" height="12" fill="#f57224"/>
            <rect x="64" y="8" width="28" height="28" fill="#081730" rx="3"/>
            <rect x="68" y="12" width="20" height="20" fill="#ffffff"/>
            <rect x="72" y="16" width="12" height="12" fill="#f57224"/>
            <rect x="8" y="64" width="28" height="28" fill="#081730" rx="3"/>
            <rect x="12" y="68" width="20" height="20" fill="#ffffff"/>
            <rect x="16" y="72" width="12" height="12" fill="#f57224"/>
            <rect x="42" y="14" width="6" height="18" fill="#081730"/>
            <rect x="42" y="38" width="16" height="6" fill="#081730"/>
            <rect x="14" y="42" width="18" height="6" fill="#081730"/>
            <rect x="48" y="48" width="14" height="14" fill="#0d2854" rx="2"/>
            <rect x="68" y="44" width="24" height="6" fill="#081730"/>
            <rect x="44" y="68" width="18" height="18" fill="#081730"/>
            <rect x="68" y="68" width="8" height="8" fill="#f57224"/>
            <rect x="82" y="78" width="10" height="10" fill="#081730"/>
          </svg>
          <span class="vietqr-note">Quét mã bằng mọi App Ngân hàng</span>
        </div>
        <div class="vietqr-info-list">
          <div class="vietqr-row">
            <span class="vietqr-label">Ngân hàng thụ hưởng:</span>
            <span class="vietqr-val">🏦 MB Bank (Quân Đội)</span>
          </div>
          <div class="vietqr-row">
            <span class="vietqr-label">Số tài khoản:</span>
            <span class="vietqr-val">
              <span>0988 888 999</span>
              <button type="button" class="copy-btn" onclick="copyText('0988888999')">Sao chép</button>
            </span>
          </div>
          <div class="vietqr-row">
            <span class="vietqr-label">Chủ tài khoản:</span>
            <span class="vietqr-val">NOVA MARKET VIETNAM</span>
          </div>
          <div class="vietqr-row">
            <span class="vietqr-label">Số tiền:</span>
            <span class="vietqr-val" style="color: #f57224;">${formattedTotal}</span>
          </div>
          <div class="vietqr-row">
            <span class="vietqr-label">Nội dung CK:</span>
            <span class="vietqr-val">
              <span id="vietqr-code">${orderRef}</span>
              <button type="button" class="copy-btn" onclick="copyText('${orderRef}')">Sao chép</button>
            </span>
          </div>
        </div>
      </div>
    `;
  } else if (method === 'momo') {
    detailContainer.style.display = 'block';
    detailContainer.innerHTML = `
      <div class="momo-box">
        <div class="momo-qr-wrap">
          <span style="font-size: 42px;">🟣</span>
        </div>
        <div class="momo-info">
          <strong style="color: #be185d; display: block; margin-bottom: 4px; font-size: 13px;">Thanh toán Ví MoMo</strong>
          <p style="margin: 0 0 6px 0;">Mở ứng dụng <strong>MoMo</strong> &rarr; Chọn <strong>Quét mã</strong> hoặc chuyển ví số: <strong>0988 888 999</strong>.</p>
          <div style="font-size: 11px; color: #64748b;">Số tiền cần thanh toán: <strong style="color: #f57224;">${formattedTotal}</strong></div>
        </div>
      </div>
    `;
  } else if (method === 'card') {
    detailContainer.style.display = 'block';
    detailContainer.innerHTML = `
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Nhập Thông Tin Thẻ Thanh Toán Quốc Tế / Nội Địa:</div>
        <div class="credit-card-form">
          <div class="full">
            <label class="checkout-label">Số Thẻ (16 chữ số)</label>
            <input type="text" id="cc-number" class="checkout-input" placeholder="4111 •••• •••• 4444" maxlength="19" oninput="formatCardNumber(this)" style="padding-left: 12px;">
          </div>
          <div>
            <label class="checkout-label">Ngày Hết Hạn</label>
            <input type="text" id="cc-exp" class="checkout-input" placeholder="MM/YY" maxlength="5" oninput="formatCardExp(this)" style="padding-left: 12px;">
          </div>
          <div>
            <label class="checkout-label">Mã Bảo Mật CVV / CVC</label>
            <input type="password" id="cc-cvv" class="checkout-input" placeholder="•••" maxlength="4" style="padding-left: 12px;">
          </div>
          <div class="full">
            <label class="checkout-label">Tên In Trên Thẻ (Không dấu)</label>
            <input type="text" id="cc-name" class="checkout-input" placeholder="NGUYEN VAN AN" style="text-transform: uppercase; padding-left: 12px;">
          </div>
        </div>
      </div>
    `;
  } else if (method === 'vnpay') {
    detailContainer.style.display = 'block';
    detailContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: #334155;">
        <span style="font-size: 28px;">⚡</span>
        <div>
          <strong style="color: #b45309; display: block; margin-bottom: 3px;">Cổng Thanh Toán VNPAY-QR</strong>
          <span>Sau khi xác nhận đặt hàng, hệ thống sẽ mở cổng liên kết VNPAY để quý khách quét mã bằng 32+ ứng dụng Mobile Banking hoặc ví ZaloPay.</span>
        </div>
      </div>
    `;
  }
}

function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  let formatted = '';
  for (let i = 0; i < val.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' ';
    formatted += val[i];
  }
  input.value = formatted;
}

function formatCardExp(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) {
    input.value = val.substring(0, 2) + '/' + val.substring(2);
  } else {
    input.value = val;
  }
}

function copyText(txt) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(txt).then(() => {
      showToast(`📋 Đã sao chép: ${txt}`);
    }).catch(() => {
      showToast(`Đã sao chép: ${txt}`);
    });
  } else {
    showToast(`Đã sao chép: ${txt}`);
  }
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước.');
    return;
  }

  const modal = document.getElementById('checkout-modal');
  const overlay = document.getElementById('checkout-modal-overlay');
  const mainContent = document.getElementById('checkout-main-content');
  const successView = document.getElementById('checkout-success-view');

  if (!modal || !overlay) return;

  // Sync voucher discount with cart drawer
  checkoutVoucherDiscount = appliedVoucherDiscount || 0;

  // Show main content, hide success view
  if (mainContent) mainContent.style.display = 'block';
  if (successView) successView.style.display = 'none';

  // Load saved address or currentUser info
  try {
    const saved = localStorage.getItem('nova_saved_address');
    if (saved) {
      const addr = JSON.parse(saved);
      if (addr.name) document.getElementById('checkout-name').value = addr.name;
      if (addr.phone) document.getElementById('checkout-phone').value = addr.phone;
      if (addr.city) {
        document.getElementById('checkout-city').value = addr.city;
        handleCityChange();
        if (addr.district) document.getElementById('checkout-district').value = addr.district;
      }
      if (addr.address) document.getElementById('checkout-address').value = addr.address;
      if (addr.note) document.getElementById('checkout-note').value = addr.note;
    } else if (currentUser) {
      if (currentUser.name) document.getElementById('checkout-name').value = currentUser.name;
      if (currentUser.phone) document.getElementById('checkout-phone').value = currentUser.phone;
    }
  } catch (e) {}

  // Render items in summary
  renderCheckoutSummary();

  // Reset payment method details
  handlePaymentMethodChange(selectedPaymentMethod);

  // Open modal
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('checkout-name')?.focus();
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkout-modal-overlay');
  const modal = document.getElementById('checkout-modal');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (modal) modal.setAttribute('aria-hidden', 'true');
}

function renderCheckoutSummary() {
  const listEl = document.getElementById('checkout-items-list');
  const countEl = document.getElementById('checkout-items-count');
  const subtotalEl = document.getElementById('checkout-bill-subtotal');
  const totalEl = document.getElementById('checkout-bill-total');
  const discountRow = document.getElementById('checkout-bill-discount-row');
  const discountEl = document.getElementById('checkout-bill-discount');
  const btnTotalText = document.getElementById('btn-place-order-text');

  if (!listEl) return;

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const finalTotal = Math.max(0, subtotal - checkoutVoucherDiscount);

  if (countEl) countEl.textContent = `${totalQty} sản phẩm`;
  if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
  if (totalEl) totalEl.textContent = formatVND(finalTotal);

  if (checkoutVoucherDiscount > 0) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountEl) discountEl.textContent = `-${formatVND(checkoutVoucherDiscount)}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  if (btnTotalText) {
    btnTotalText.textContent = `Xác Nhận & Đặt Hàng (${formatVND(finalTotal)})`;
  }

  listEl.innerHTML = cart.map(item => `
    <div class="checkout-item-row">
      <img src="${item.image}" alt="${item.title}" class="checkout-item-img">
      <div class="checkout-item-info">
        <div class="checkout-item-name" title="${item.title}">${item.title}</div>
        <div class="checkout-item-meta">
          <span>SL: <strong>x${item.qty}</strong></span>
          <span class="checkout-item-price">${formatVND(item.price * item.qty)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function applyCheckoutVoucher() {
  const input = document.getElementById('checkout-voucher-code');
  const msgEl = document.getElementById('checkout-voucher-msg');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  if (!code) {
    showToast('Vui lòng nhập mã giảm giá');
    return;
  }

  if (code === 'NOVA50K') {
    if (subtotal < 100000) {
      if (msgEl) {
        msgEl.style.display = 'block';
        msgEl.style.color = '#dc2626';
        msgEl.textContent = 'Mã NOVA50K áp dụng cho đơn từ ₫100.000 trở lên.';
      }
      return;
    }
    checkoutVoucherDiscount = 50000;
    appliedVoucherDiscount = 50000;
  } else if (code === 'FREESHIP') {
    checkoutVoucherDiscount = 30000;
    appliedVoucherDiscount = 30000;
  } else if (code === 'UTT2026' || code === 'NOVA100K') {
    checkoutVoucherDiscount = 100000;
    appliedVoucherDiscount = 100000;
  } else {
    if (msgEl) {
      msgEl.style.display = 'block';
      msgEl.style.color = '#dc2626';
      msgEl.textContent = `Mã "${code}" không hợp lệ hoặc đã hết lượt.`;
    }
    return;
  }

  if (msgEl) {
    msgEl.style.display = 'block';
    msgEl.style.color = '#16a34a';
    msgEl.textContent = `✅ Áp dụng mã ${code} thành công! Đã giảm ${formatVND(checkoutVoucherDiscount)}.`;
  }

  renderCheckoutSummary();
  updateCartUI();
  showToast(`🎉 Áp dụng mã ${code} thành công: Giảm ${formatVND(checkoutVoucherDiscount)}`);
}

function useQuickVoucher(code) {
  const input = document.getElementById('checkout-voucher-code');
  if (input) {
    input.value = code;
    applyCheckoutVoucher();
  }
}

function handleCheckout() {
  if (cart.length === 0) {
    showToast('Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước.');
    return;
  }
  toggleCartDrawer(false);
  openCheckoutModal();
}

function submitOrder() {
  const nameEl = document.getElementById('checkout-name');
  const phoneEl = document.getElementById('checkout-phone');
  const cityEl = document.getElementById('checkout-city');
  const districtEl = document.getElementById('checkout-district');
  const addressEl = document.getElementById('checkout-address');
  const noteEl = document.getElementById('checkout-note');
  const saveCheckbox = document.getElementById('checkout-save-address');

  const nameVal = nameEl ? nameEl.value.trim() : '';
  const phoneVal = phoneEl ? phoneEl.value.trim() : '';
  const cityVal = cityEl ? cityEl.value : 'Hà Nội';
  const districtVal = districtEl ? districtEl.value : 'Quận Thanh Xuân';
  const addressVal = addressEl ? addressEl.value.trim() : '';
  const noteVal = noteEl ? noteEl.value.trim() : '';

  let hasError = false;

  // Validate Name
  const errName = document.getElementById('err-checkout-name');
  if (!nameVal || nameVal.length < 2) {
    if (errName) { errName.textContent = 'Vui lòng nhập họ và tên người nhận'; errName.style.display = 'block'; }
    hasError = true;
  } else if (errName) {
    errName.style.display = 'none';
  }

  // Validate Phone
  const errPhone = document.getElementById('err-checkout-phone');
  const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  if (!phoneVal || !phoneRegex.test(phoneVal.replace(/\s+/g, ''))) {
    if (errPhone) { errPhone.textContent = 'Vui lòng nhập số điện thoại hợp lệ (10 chữ số)'; errPhone.style.display = 'block'; }
    hasError = true;
  } else if (errPhone) {
    errPhone.style.display = 'none';
  }

  // Validate Address
  const errAddr = document.getElementById('err-checkout-address');
  if (!addressVal || addressVal.length < 4) {
    if (errAddr) { errAddr.textContent = 'Vui lòng nhập số nhà, tên đường hoặc ngõ chi tiết'; errAddr.style.display = 'block'; }
    hasError = true;
  } else if (errAddr) {
    errAddr.style.display = 'none';
  }

  // Validate Card if payment is card
  if (selectedPaymentMethod === 'card') {
    const ccNum = document.getElementById('cc-number')?.value.replace(/\s+/g, '');
    const ccExp = document.getElementById('cc-exp')?.value;
    const ccCvv = document.getElementById('cc-cvv')?.value;
    if (!ccNum || ccNum.length < 15 || !ccExp || !ccCvv) {
      showToast('Vui lòng điền đầy đủ thông tin thẻ thanh toán');
      return;
    }
  }

  if (hasError) {
    showToast('Vui lòng kiểm tra lại thông tin người nhận và địa chỉ');
    return;
  }

  // Save address if checked
  if (saveCheckbox && saveCheckbox.checked) {
    try {
      const toSave = {
        name: nameVal,
        phone: phoneVal,
        city: cityVal,
        district: districtVal,
        address: addressVal,
        note: noteVal
      };
      localStorage.setItem('nova_saved_address', JSON.stringify(toSave));
    } catch (e) {}
  }

  const btnSubmit = document.getElementById('btn-place-order');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `<span>Đang Xử Lý Đơn Hàng... ⏳</span>`;
  }

  setTimeout(() => {
    // Generate Order
    const orderId = 'NOVA-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const total = Math.max(0, subtotal - checkoutVoucherDiscount);
    const orderDate = new Date().toLocaleString('vi-VN');

    const paymentMethodTitles = {
      cod: '💵 Thanh toán khi nhận hàng (COD)',
      vietqr: '🏦 Chuyển khoản QR Ngân hàng (MB Bank)',
      momo: '🟣 Ví Điện Tử MoMo',
      card: '💳 Thẻ Tín Dụng / Quốc Tế (Visa/Master)',
      vnpay: '⚡ Cổng VNPAY-QR'
    };

    const newOrder = {
      id: orderId,
      date: orderDate,
      customer: {
        name: nameVal,
        phone: phoneVal,
        fullAddress: `${addressVal}, ${districtVal}, ${cityVal}`,
        note: noteVal
      },
      paymentMethod: paymentMethodTitles[selectedPaymentMethod] || 'COD',
      items: [...cart],
      subtotal: subtotal,
      discount: checkoutVoucherDiscount,
      total: total,
      status: 'Đang chuẩn bị hàng'
    };

    // Store in Order History
    try {
      const existing = JSON.parse(localStorage.getItem('nova_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('nova_orders', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }

    // Clear Cart
    cart = [];
    appliedVoucherDiscount = 0;
    checkoutVoucherDiscount = 0;
    updateCartUI();

    // Show Success View
    const mainContent = document.getElementById('checkout-main-content');
    const successView = document.getElementById('checkout-success-view');

    if (mainContent) mainContent.style.display = 'none';
    if (successView) {
      successView.style.display = 'flex';
      successView.innerHTML = `
        <div class="success-icon-wrap">✓</div>
        <h3 class="success-title">Đặt Hàng Thành Công!</h3>
        <p class="success-subtitle">Cảm ơn <strong>${nameVal}</strong> đã mua sắm tại Nova Market. Đơn hàng của bạn đã được tiếp nhận và đang được đóng gói chuyển đi!</p>

        <div class="success-order-card">
          <div class="success-card-row">
            <span class="success-card-label">Mã đơn hàng:</span>
            <span class="success-order-id">#${orderId}</span>
          </div>
          <div class="success-card-row">
            <span class="success-card-label">Người nhận hàng:</span>
            <span class="success-card-val">${nameVal} (${phoneVal})</span>
          </div>
          <div class="success-card-row">
            <span class="success-card-label">Địa chỉ nhận hàng:</span>
            <span class="success-card-val">${addressVal}, ${districtVal}, ${cityVal}</span>
          </div>
          <div class="success-card-row">
            <span class="success-card-label">Phương thức thanh toán:</span>
            <span class="success-card-val">${paymentMethodTitles[selectedPaymentMethod]}</span>
          </div>
          <div class="success-card-row">
            <span class="success-card-label">Dự kiến giao hàng:</span>
            <span class="success-card-val" style="color: #16a34a;">2 - 3 ngày tới (Tiêu chuẩn Nova Express)</span>
          </div>
          <div class="success-card-row">
            <span class="success-card-label">Tổng thanh toán:</span>
            <span class="success-card-val" style="font-size: 16px; color: #f57224; font-weight: 800;">${formatVND(total)}</span>
          </div>
        </div>

        <div class="success-actions">
          <button type="button" class="btn-continue-shop" onclick="closeCheckoutModal()">Tiếp Tục Mua Sắm</button>
          <button type="button" class="btn-view-order-history" onclick="closeCheckoutModal(); openOrdersModal();">Xem Đơn Hàng Của Tôi</button>
        </div>
      `;
    }

    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = `<span>Xác Nhận &amp; Đặt Hàng</span>`;
    }

    showToast(`🎉 Chúc mừng! Đơn hàng #${orderId} đã được đặt thành công!`);
  }, 650);
}

// 6.1 Order History Modal Controls
function openOrdersModal() {
  const overlay = document.getElementById('orders-modal-overlay');
  const modal = document.getElementById('orders-modal');
  const body = document.getElementById('orders-modal-body');
  if (!overlay || !modal || !body) return;

  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('nova_orders') || '[]');
  } catch (e) {}

  if (orders.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #64748b;">
        <span style="font-size: 48px; display: block; margin-bottom: 12px;">📦</span>
        <h4 style="font-size: 16px; color: #1e293b; margin-bottom: 6px;">Bạn chưa có đơn hàng nào</h4>
        <p style="font-size: 13px; margin-bottom: 16px;">Hãy khám phá các sản phẩm ưu đãi hấp dẫn trên Nova Market và đặt hàng ngay hôm nay!</p>
        <button type="button" class="btn-continue-shop" onclick="closeOrdersModal()">Mua Sắm Ngay</button>
      </div>
    `;
  } else {
    body.innerHTML = orders.map(ord => `
      <div class="order-history-card">
        <div class="order-card-top">
          <div>
            <span class="order-id-badge">#${ord.id}</span>
            <div class="order-date-text">Ngày đặt: ${ord.date}</div>
          </div>
          <span class="order-status-pill order-status--shipping">${ord.status}</span>
        </div>

        <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">
          <strong>Người nhận:</strong> ${ord.customer?.name} - ${ord.customer?.phone} | <strong>Địa chỉ:</strong> ${ord.customer?.fullAddress}
        </div>
        <div style="font-size: 11.5px; color: #64748b; margin-bottom: 10px;">
          <strong>Thanh toán:</strong> ${ord.paymentMethod}
        </div>

        <div class="order-items-preview">
          ${(ord.items || []).map(item => `
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; border-bottom: 1px dashed #f1f5f9; padding-bottom: 4px;">
              <span style="max-width: 70%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                • ${item.title} <strong style="color: #f57224;">x${item.qty}</strong>
              </span>
              <span style="font-weight: 600; color: #1e293b;">${formatVND(item.price * item.qty)}</span>
            </div>
          `).join('')}
        </div>

        <div class="order-card-bottom">
          <span style="font-size: 12px; color: #64748b;">Giao hàng tiêu chuẩn: <strong style="color: #16a34a;">MIỄN PHÍ</strong></span>
          <div>
            <span style="font-size: 12px; color: #64748b;">Tổng tiền: </span>
            <span class="order-total-val">${formatVND(ord.total)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'false');
}

function closeOrdersModal() {
  const overlay = document.getElementById('orders-modal-overlay');
  const modal = document.getElementById('orders-modal');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (modal) modal.setAttribute('aria-hidden', 'true');
}

// 7. Search & Filter Controls
function filterProducts() {
  let filtered = [...PRODUCTS_DATA];

  // Category filter
  if (currentFilter === 'mall') {
    filtered = filtered.filter(p => p.isMall);
  } else if (currentFilter === 'discount') {
    filtered = filtered.filter(p => parseInt(p.discount.replace(/[^0-9]/g, '')) >= 45);
  } else if (currentFilter === 'rating') {
    filtered = filtered.filter(p => p.rating >= 4.8);
  } else if (currentFilter !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilter);
  }

  // Price range filter
  if (minPriceFilter !== null && !isNaN(minPriceFilter)) {
    filtered = filtered.filter(p => p.price >= minPriceFilter);
  }
  if (maxPriceFilter !== null && !isNaN(maxPriceFilter)) {
    filtered = filtered.filter(p => p.price <= maxPriceFilter);
  }

  // Text search
  if (currentSearchQuery.trim()) {
    const q = currentSearchQuery.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
  }

  renderProducts(filtered);
}

function resetFilters() {
  currentFilter = 'all';
  currentSearchQuery = '';
  minPriceFilter = null;
  maxPriceFilter = null;
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  if (minInput) minInput.value = '';
  if (maxInput) maxInput.value = '';
  
  const clearPriceBtn = document.getElementById('price-clear-btn');
  if (clearPriceBtn) clearPriceBtn.style.display = 'none';

  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.filter-chip[data-filter="all"]')?.classList.add('active');

  document.querySelectorAll('.category-nav__link').forEach(c => c.classList.remove('active'));
  document.querySelector('.category-nav__link[data-category="all"]')?.classList.add('active');

  renderProducts(PRODUCTS_DATA);
  showToast('Đã khôi phục toàn bộ danh sách sản phẩm');
}

function setupSearch() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const suggestionsBox = document.getElementById('search-suggestions');
  if (!input) return;

  const sampleKeywords = [
    'Sách bài tập Toán đại cương',
    'Tập bài giảng Toán đại cương',
    'Nguyên lý kế toán',
    'Giáo trình Triết học Mác - Lênin',
    'Giáo trình Tiếng Nhật',
    'Sách Tiếng Anh Voices',
    'Kinh tế chính trị Mác - Lênin',
    'Tư tưởng Hồ Chí Minh',
    'Giáo trình Marketing căn bản',
    'Pháp luật Việt Nam đại cương'
  ];

  input.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    activeSuggestionIndex = -1;
    if (clearBtn) clearBtn.style.display = currentSearchQuery ? 'inline-block' : 'none';

    if (currentSearchQuery.trim().length > 0 && suggestionsBox) {
      const matches = sampleKeywords.filter(k => k.toLowerCase().includes(currentSearchQuery.toLowerCase()));
      if (matches.length > 0) {
        suggestionsBox.innerHTML = matches.map((m, idx) => `
          <div class="suggestion-item" role="option" id="suggest-${idx}" onclick="selectSuggestion('${m}')">
            ${m}
          </div>
        `).join('');
        suggestionsBox.classList.add('active');
      } else {
        suggestionsBox.classList.remove('active');
      }
    } else if (suggestionsBox) {
      suggestionsBox.classList.remove('active');
    }

    filterProducts();
  });

  // Keyboard navigation for suggestions
  input.addEventListener('keydown', (e) => {
    const items = suggestionsBox?.querySelectorAll('.suggestion-item');
    if (!items || items.length === 0 || !suggestionsBox.classList.contains('active')) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
      updateSuggestionHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
      updateSuggestionHighlight(items);
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < items.length) {
        e.preventDefault();
        selectSuggestion(items[activeSuggestionIndex].textContent.trim());
      }
    } else if (e.key === 'Escape') {
      suggestionsBox.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (suggestionsBox) suggestionsBox.classList.remove('active');
      filterProducts();
      document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      currentSearchQuery = '';
      clearBtn.style.display = 'none';
      if (suggestionsBox) suggestionsBox.classList.remove('active');
      filterProducts();
      input.focus();
    });
  }
}

function updateSuggestionHighlight(items) {
  items.forEach((item, idx) => {
    item.classList.toggle('highlighted', idx === activeSuggestionIndex);
  });
}

function selectSuggestion(keyword) {
  const input = document.getElementById('search-input');
  const suggestionsBox = document.getElementById('search-suggestions');
  if (input) input.value = keyword;
  currentSearchQuery = keyword;
  activeSuggestionIndex = -1;
  if (suggestionsBox) suggestionsBox.classList.remove('active');
  filterProducts();
  document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
}

// 8. Flash Sale Countdown Timer
function startCountdown() {
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');
  if (!hoursEl || !minsEl || !secsEl) return;

  let totalSeconds = 2 * 3600 + 45 * 60 + 30;

  setInterval(() => {
    if (totalSeconds <= 0) totalSeconds = 24 * 3600;
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// 9. Toast Notifications
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.role = 'alert';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 200);
  }, 2600);
}

// 10. Voucher collection button handler
function collectVoucher(btn) {
  appliedVoucherDiscount = 50000;
  btn.textContent = 'Đã thu thập';
  btn.disabled = true;
  btn.classList.add('btn--disabled');
  updateCartUI();
  showToast('Đã thu thập voucher 50.000₫! Giảm giá tự động áp dụng vào giỏ hàng.');
}

// 11. Wishlist toggle with Set persistence
function toggleWishlist(productId, btn) {
  if (savedWishlist.has(productId)) {
    savedWishlist.delete(productId);
    btn.classList.remove('active');
    btn.textContent = 'Lưu';
    showToast('Đã bỏ lưu sản phẩm');
  } else {
    savedWishlist.add(productId);
    btn.classList.add('active');
    btn.textContent = 'Đã lưu';
    showToast('Đã lưu vào danh sách yêu thích');
  }
}

// 13. Authentication System (Login & Register)
let currentUser = null;

function loadStoredUser() {
  try {
    const raw = localStorage.getItem('nova_market_user') || localStorage.getItem('utt_market_user');
    if (raw) {
      currentUser = JSON.parse(raw);
      updateUserUI();
    }
  } catch (e) {
    console.error('Error loading stored user', e);
  }
}

function updateUserUI() {
  const guestLinks = document.getElementById('auth-guest-links');
  const userLinks = document.getElementById('auth-user-links');
  const displayNameEl = document.getElementById('user-display-name');

  // Header auth elements (mobile + desktop)
  const headerAuthGuest = document.getElementById('header-auth-guest');
  const headerAuthUser = document.getElementById('header-auth-user');
  const headerUserName = document.getElementById('header-user-name');
  const headerDropdownName = document.getElementById('header-dropdown-name');
  const mobAuthLabel = document.getElementById('mob-auth-label');

  if (currentUser) {
    if (guestLinks) guestLinks.style.display = 'none';
    if (userLinks) userLinks.style.display = 'inline-flex';
    if (displayNameEl) displayNameEl.textContent = `Chào, ${currentUser.name || 'Thành viên'}`;

    if (headerAuthGuest) headerAuthGuest.style.display = 'none';
    if (headerAuthUser) headerAuthUser.style.display = 'block';
    if (headerUserName) headerUserName.textContent = currentUser.name || 'Tài khoản';
    if (headerDropdownName) headerDropdownName.textContent = currentUser.name || 'Thành viên';
    if (mobAuthLabel) mobAuthLabel.textContent = currentUser.name || 'Tài khoản';
  } else {
    if (guestLinks) guestLinks.style.display = 'inline-flex';
    if (userLinks) userLinks.style.display = 'none';

    if (headerAuthGuest) headerAuthGuest.style.display = 'block';
    if (headerAuthUser) {
      headerAuthUser.style.display = 'none';
      const dropdown = document.getElementById('header-user-dropdown');
      if (dropdown) dropdown.classList.remove('active');
    }
    if (mobAuthLabel) mobAuthLabel.textContent = 'Đăng Nhập';
  }
}

function openAuthModal(tab = 'login') {
  const modal = document.getElementById('auth-modal');
  const overlay = document.getElementById('auth-overlay');
  if (!modal || !overlay) return;

  switchAuthTab(tab);
  modal.classList.add('active');
  overlay.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  const loginErr = document.getElementById('login-error-msg');
  const regErr = document.getElementById('register-error-msg');
  if (loginErr) loginErr.style.display = 'none';
  if (regErr) regErr.style.display = 'none';

  if (tab === 'login') {
    document.getElementById('login-identifier')?.focus();
  } else {
    document.getElementById('register-name')?.focus();
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  const overlay = document.getElementById('auth-overlay');
  if (!modal || !overlay) return;

  modal.classList.remove('active');
  overlay.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

function switchAuthTab(tabName) {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const panelLogin = document.getElementById('panel-login');
  const panelRegister = document.getElementById('panel-register');

  const isLogin = tabName === 'login';

  tabLogin?.classList.toggle('active', isLogin);
  tabLogin?.setAttribute('aria-selected', isLogin ? 'true' : 'false');
  tabRegister?.classList.toggle('active', !isLogin);
  tabRegister?.setAttribute('aria-selected', !isLogin ? 'true' : 'false');

  if (panelLogin) panelLogin.style.display = isLogin ? 'block' : 'none';
  if (panelRegister) panelRegister.style.display = !isLogin ? 'block' : 'none';
}

function setupAuth() {
  loadStoredUser();

  // Open triggers (Top Bar)
  document.getElementById('nav-login-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('login');
  });
  document.getElementById('nav-register-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('register');
  });

  // Open triggers (Main Header - always visible on mobile & desktop)
  document.getElementById('header-login-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('login');
  });

  // Open triggers (Mobile Bottom Bar)
  document.getElementById('mob-nav-auth')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser) {
      const dropdown = document.getElementById('header-user-dropdown');
      if (dropdown) {
        dropdown.classList.toggle('active');
        if (dropdown.classList.contains('active')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        showToast(`Tài khoản hiện tại: ${currentUser.name}`);
      }
    } else {
      openAuthModal('login');
    }
  });

  document.getElementById('mob-nav-cart')?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCartDrawer(true);
  });

  // Header user button dropdown toggle
  document.getElementById('header-user-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('header-user-dropdown');
    dropdown?.classList.toggle('active');
  });

  // Close header user dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const authUser = document.getElementById('header-auth-user');
    if (authUser && !authUser.contains(e.target)) {
      document.getElementById('header-user-dropdown')?.classList.remove('active');
    }
  });

  // Close triggers (Modal)
  document.getElementById('auth-close-btn')?.addEventListener('click', closeAuthModal);
  document.getElementById('auth-overlay')?.addEventListener('click', closeAuthModal);

  // Tab switches
  document.getElementById('tab-login')?.addEventListener('click', () => switchAuthTab('login'));
  document.getElementById('tab-register')?.addEventListener('click', () => switchAuthTab('register'));
  document.getElementById('switch-to-register')?.addEventListener('click', () => switchAuthTab('register'));
  document.getElementById('switch-to-login')?.addEventListener('click', () => switchAuthTab('login'));

  // Toggle password visibility
  document.querySelectorAll('.auth-toggle-pwd').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Ẩn';
      } else {
        input.type = 'password';
        btn.textContent = 'Hiện';
      }
    });
  });

  // Login form submit
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    const errorBox = document.getElementById('login-error-msg');

    if (!identifier || !password) {
      if (errorBox) {
        errorBox.textContent = 'Vui lòng điền đầy đủ tài khoản và mật khẩu.';
        errorBox.style.display = 'block';
      }
      return;
    }

    if (password.length < 6) {
      if (errorBox) {
        errorBox.textContent = 'Mật khẩu phải chứa ít nhất 6 ký tự.';
        errorBox.style.display = 'block';
      }
      return;
    }

    let displayName = identifier;
    if (identifier.includes('@')) {
      displayName = identifier.split('@')[0];
    }

    currentUser = {
      name: displayName,
      identifier: identifier
    };

    const remember = document.getElementById('login-remember')?.checked;
    if (remember) {
      try {
        localStorage.setItem('nova_market_user', JSON.stringify(currentUser));
      } catch (err) {}
    }

    updateUserUI();
    closeAuthModal();
    showToast(`Đăng nhập thành công! Chào mừng ${currentUser.name} quay trở lại.`);
  });

  // Register form submit
  document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name')?.value.trim();
    const identifier = document.getElementById('register-identifier')?.value.trim();
    const phone = document.getElementById('register-phone')?.value.trim();
    const password = document.getElementById('register-password')?.value;
    const confirmPassword = document.getElementById('register-confirm-password')?.value;
    const terms = document.getElementById('register-terms')?.checked;
    const errorBox = document.getElementById('register-error-msg');

    const showError = (msg) => {
      if (errorBox) {
        errorBox.textContent = msg;
        errorBox.style.display = 'block';
      }
    };

    if (!name || !identifier || !phone || !password || !confirmPassword) {
      showError('Vui lòng điền đầy đủ tất cả các trường thông tin.');
      return;
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      showError('Số điện thoại không hợp lệ (yêu cầu từ 9 đến 11 chữ số).');
      return;
    }

    if (password.length < 6) {
      showError('Mật khẩu bảo mật phải có ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      showError('Mật khẩu xác nhận không khớp với mật khẩu đã nhập.');
      return;
    }

    if (!terms) {
      showError('Vui lòng xác nhận đồng ý với Quy chế & Điều khoản của Nova Market.');
      return;
    }

    currentUser = {
      name: name,
      identifier: identifier,
      phone: phone
    };

    try {
      localStorage.setItem('nova_market_user', JSON.stringify(currentUser));
    } catch (err) {}

    updateUserUI();
    closeAuthModal();
    showToast(`Tạo tài khoản thành công! Chào mừng ${currentUser.name} gia nhập Nova Market.`);
  });

  // Logout handlers
  const handleLogout = (e) => {
    e.preventDefault();
    currentUser = null;
    try {
      localStorage.removeItem('nova_market_user');
      localStorage.removeItem('utt_market_user');
    } catch (err) {}
    document.getElementById('header-user-dropdown')?.classList.remove('active');
    updateUserUI();
    showToast('Bạn đã đăng xuất tài khoản thành công.');
  };

  document.getElementById('nav-logout-btn')?.addEventListener('click', handleLogout);
  document.getElementById('header-logout-btn')?.addEventListener('click', handleLogout);
}

// 12. Hero Banner Auto-sliding Carousel
function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  const track = document.getElementById('hero-slider-track');
  const prevBtn = document.getElementById('hero-slider-prev');
  const nextBtn = document.getElementById('hero-slider-next');
  const dots = document.querySelectorAll('.hero-slider__dot');
  const slides = document.querySelectorAll('.hero-slide');

  if (!slider || !track || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;
  const slideInterval = 3500; // 3.5 seconds per slide

  function goToSlide(index) {
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, idx) => {
      const isActive = idx === currentSlide;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Next / Prev Button Clicks
  nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
    startAutoSlide();
  });

  prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
    startAutoSlide();
  });

  // Dots click handler
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const slideIdx = parseInt(dot.dataset.slide, 10);
      if (!isNaN(slideIdx)) {
        goToSlide(slideIdx);
        startAutoSlide();
      }
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  // Keyboard navigation when slider is focused
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      startAutoSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      startAutoSlide();
    }
  });

  // Touch Swipe Support for Mobile & Tablets
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoSlide();
  }, { passive: true });

  // Initial auto-slide start
  startAutoSlide();
}

// 13. Initializer & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(PRODUCTS_DATA);
  updateCartUI();
  setupSearch();
  startCountdown();
  setupAuth();
  initHeroSlider();

  // Handle direct product link via hash (e.g. #product-13)
  function checkProductHash() {
    if (window.location.hash.startsWith('#product-')) {
      const pid = parseInt(window.location.hash.replace('#product-', ''));
      if (!isNaN(pid)) {
        openProductModal(pid);
      }
    }
  }
  checkProductHash();
  window.addEventListener('hashchange', checkProductHash);

  // Filter chips click handler
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      filterProducts();
    });
  });

  // Category navigation & sidebar links
  document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.category;
      currentFilter = cat;

      document.querySelectorAll('.filter-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.filter === cat);
      });
      document.querySelectorAll('.category-nav__link').forEach(c => {
        c.classList.toggle('active', c.dataset.category === cat);
      });

      filterProducts();
      document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Price range filter
  document.getElementById('price-apply-btn')?.addEventListener('click', () => {
    const minVal = parseFloat(document.getElementById('price-min')?.value);
    const maxVal = parseFloat(document.getElementById('price-max')?.value);

    if (isNaN(minVal) && isNaN(maxVal)) {
      showToast('Vui lòng nhập số tiền cần lọc');
      return;
    }
    if (!isNaN(minVal) && !isNaN(maxVal) && minVal > maxVal) {
      showToast('Mức giá thấp nhất không được lớn hơn mức giá cao nhất');
      return;
    }

    minPriceFilter = !isNaN(minVal) ? minVal : null;
    maxPriceFilter = !isNaN(maxVal) ? maxVal : null;

    const clearBtn = document.getElementById('price-clear-btn');
    if (clearBtn) clearBtn.style.display = 'inline-block';

    filterProducts();
    showToast('Đã áp dụng khoảng giá lọc thành công');
  });

  document.getElementById('price-clear-btn')?.addEventListener('click', () => {
    minPriceFilter = null;
    maxPriceFilter = null;
    const minInput = document.getElementById('price-min');
    const maxInput = document.getElementById('price-max');
    if (minInput) minInput.value = '';
    if (maxInput) maxInput.value = '';
    document.getElementById('price-clear-btn').style.display = 'none';
    filterProducts();
    showToast('Đã xóa bộ lọc giá');
  });

  // State switcher buttons
  document.querySelectorAll('.state-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      setComponentState(pill.dataset.state);
    });
  });

  // Cart drawer buttons
  document.getElementById('cart-btn')?.addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('cart-close-btn')?.addEventListener('click', () => toggleCartDrawer(false));
  document.getElementById('cart-overlay')?.addEventListener('click', () => toggleCartDrawer(false));

  // Top utility links feedback
  document.querySelectorAll('.top-bar__link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.id === 'nav-login-btn' || link.id === 'nav-register-btn' || link.id === 'nav-logout-btn') {
        return; // Handled by setupAuth
      }
      const text = link.textContent.trim();
      if (link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        showToast(`Tính năng "${text}" đang sẵn sàng phục vụ!`);
      }
    });
  });

  // Keyboard navigation & accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleCartDrawer(false);
      closeAuthModal();
      closeProductModal();
      closeCheckoutModal();
      closeOrdersModal();
      document.getElementById('search-suggestions')?.classList.remove('active');
    }
  });
});

