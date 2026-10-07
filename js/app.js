/**
 * UTT Market - Storefront Logic & State Controller
 * Features: High-density Rendering, Wishlist Persistence, Cart Management,
 * Price Filtering, Search Autocomplete with Keyboard Nav, Real-time Countdown,
 * Voucher Application, WCAG 2.2 AA Focus Management & 7 Component States Inspector.
 */

// 1. Data Store
const PRODUCTS_DATA = [
  {
    id: 1,
    title: 'Tai nghe Bluetooth không dây Chống ồn chủ động Hybrid ANC Sonic Pro Max',
    price: 349000,
    oldPrice: 699000,
    discount: '-50%',
    rating: 4.9,
    sold: '1.2k',
    isMall: true,
    freeship: true,
    image: './assets/images/product-headphones.jpg',
    category: 'electronics'
  },
  {
    id: 2,
    title: 'Đồng hồ thông minh Smartwatch AMOLED Vỏ Nhôm Đo Nhịp Tim Kháng Nước IP68',
    price: 689000,
    oldPrice: 1290000,
    discount: '-47%',
    rating: 4.8,
    sold: '850',
    isMall: true,
    freeship: true,
    image: './assets/images/product-smartwatch.jpg',
    category: 'electronics'
  },
  {
    id: 3,
    title: 'Tinh chất dưỡng sáng da Aurélia Radiance Drops Amber Serum 30ml Pháp',
    price: 249000,
    oldPrice: 450000,
    discount: '-45%',
    rating: 5.0,
    sold: '2.4k',
    isMall: true,
    freeship: true,
    image: './assets/images/product-skincare.jpg',
    category: 'beauty'
  },
  {
    id: 4,
    title: 'Bàn phím cơ Gaming không dây RGB 3 Mode Hotswap Switch Red êm ái',
    price: 499000,
    oldPrice: 890000,
    discount: '-44%',
    rating: 4.9,
    sold: '640',
    isMall: false,
    freeship: true,
    image: './assets/images/product-headphones.jpg',
    category: 'electronics'
  },
  {
    id: 5,
    title: 'Giày Sneaker Thể Thao Nam Nữ Đế Cao Su Đàn Hồi Thoáng Khí Phong Cách Ulzzang',
    price: 189000,
    oldPrice: 350000,
    discount: '-46%',
    rating: 4.7,
    sold: '3.1k',
    isMall: false,
    freeship: true,
    image: './assets/images/product-smartwatch.jpg',
    category: 'fashion'
  },
  {
    id: 6,
    title: 'Nồi chiên không dầu điện tử Dung tích lớn 6.5L Kính quan sát Công suất 1800W',
    price: 899000,
    oldPrice: 1590000,
    discount: '-43%',
    rating: 4.9,
    sold: '1.9k',
    isMall: true,
    freeship: true,
    image: './assets/images/product-skincare.jpg',
    category: 'home'
  },
  {
    id: 7,
    title: 'Chuột không dây Silent Silent-Click Ergonomic 2.4GHz & Bluetooth 5.2',
    price: 129000,
    oldPrice: 240000,
    discount: '-46%',
    rating: 4.8,
    sold: '4.5k',
    isMall: false,
    freeship: true,
    image: './assets/images/product-headphones.jpg',
    category: 'electronics'
  },
  {
    id: 8,
    title: 'Serum phục hồi da đa tầng Hyaluronic B5 Cấp ẩm chống lão hóa chuyên sâu',
    price: 320000,
    oldPrice: 550000,
    discount: '-42%',
    rating: 4.9,
    sold: '980',
    isMall: true,
    freeship: true,
    image: './assets/images/product-skincare.jpg',
    category: 'beauty'
  },
  {
    id: 9,
    title: 'Áo Khoác Gió Unisex 2 Lớp Chống Nước Cản Gió Chuẩn Form Thể Thao Mùa Thu Đông',
    price: 159000,
    oldPrice: 299000,
    discount: '-47%',
    rating: 4.7,
    sold: '1.5k',
    isMall: false,
    freeship: true,
    image: './assets/images/product-smartwatch.jpg',
    category: 'fashion'
  },
  {
    id: 10,
    title: 'Máy cạo râu điện 3 đầu lưỡi kép kháng nước IPX7 sạc nhanh Type-C',
    price: 219000,
    oldPrice: 390000,
    discount: '-44%',
    rating: 4.8,
    sold: '720',
    isMall: true,
    freeship: true,
    image: './assets/images/product-headphones.jpg',
    category: 'beauty'
  },
  {
    id: 11,
    title: 'Loa Bluetooth Mini Bass Cực Mạnh LED RGB Đổi Màu Hỗ Trợ Thẻ Nhớ TF',
    price: 139000,
    oldPrice: 280000,
    discount: '-50%',
    rating: 4.6,
    sold: '3.8k',
    isMall: false,
    freeship: true,
    image: './assets/images/product-headphones.jpg',
    category: 'electronics'
  },
  {
    id: 12,
    title: 'Đèn Bàn Học LED Chống Cận Thị 3 Chế Độ Sáng Cảm Ứng Tích Hợp Pin Sạc',
    price: 99000,
    oldPrice: 190000,
    discount: '-48%',
    rating: 4.8,
    sold: '5.2k',
    isMall: false,
    freeship: true,
    image: './assets/images/product-skincare.jpg',
    category: 'home'
  }
];

// 2. Global State Store
let cart = [
  { id: 1, title: 'Tai nghe Bluetooth Sonic Pro Max', price: 349000, qty: 1, image: './assets/images/product-headphones.jpg' },
  { id: 3, title: 'Tinh chất Aurélia Radiance Drops 30ml', price: 249000, qty: 2, image: './assets/images/product-skincare.jpg' }
];

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

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; background: #fff; border-radius: 4px; border: 1px solid #e0e0e0;">
        <p style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">Không tìm thấy sản phẩm phù hợp</p>
        <p style="color: #606060; font-size: 12px; margin-bottom: 16px;">Vui lòng thử từ khóa khác hoặc xóa bỏ bộ lọc hiện tại</p>
        <button class="btn btn--primary" onclick="resetFilters()">Xem tất cả sản phẩm</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(product => {
    const isSaved = savedWishlist.has(product.id);
    return `
      <article class="product-card product-card--${currentComponentState}" id="product-${product.id}" tabindex="0" aria-label="${product.title}">
        <div class="product-card__thumb">
          <img src="${product.image}" alt="${product.title}" class="product-card__img" loading="lazy">
          ${product.isMall ? '<span class="badge-tag">UTT Mall</span>' : ''}
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
            <span class="product-card__rating">${product.rating} / 5</span>
            <span class="product-card__sold">Đã bán ${product.sold}</span>
          </div>
          <div class="product-card__actions">
            <button class="product-card__btn" onclick="addToCart(${product.id})" aria-label="Thêm ${product.title} vào giỏ hàng">
              Thêm vào giỏ
            </button>
            <button class="product-card__wishlist ${isSaved ? 'active' : ''}" onclick="toggleWishlist(${product.id}, this)" aria-label="Lưu sản phẩm">
              ${isSaved ? 'Đã lưu' : 'Lưu'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// 5. Component State Inspector (Default, Hover, Focus, Active, Disabled, Loading, Error)
function setComponentState(stateName) {
  currentComponentState = stateName;
  document.querySelectorAll('.state-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.state === stateName);
  });

  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    card.className = `product-card product-card--${stateName}`;
  });

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
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const voucherRow = document.getElementById('cart-voucher-row');
  const voucherAmountEl = document.getElementById('cart-voucher-amount');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const finalTotal = Math.max(0, subtotal - appliedVoucherDiscount);

  if (countEl) countEl.textContent = totalItems;
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
        <p style="font-size: 11px; color: #888;">Khám phá ngay hàng ngàn ưu đãi hấp dẫn trên UTT Market!</p>
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
  showToast(`Đã thêm "${prod.title.substring(0, 28)}..." vào giỏ hàng`);

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

function handleCheckout() {
  if (cart.length === 0) {
    showToast('Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước.');
    return;
  }
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = Math.max(0, cart.reduce((s, i) => s + (i.price * i.qty), 0) - appliedVoucherDiscount);
  
  cart = [];
  appliedVoucherDiscount = 0;
  updateCartUI();
  toggleCartDrawer(false);
  showToast(`Đặt hàng thành công ${count} sản phẩm! Tổng thanh toán: ${formatVND(total)}`);
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
    'Tai nghe bluetooth UTT',
    'Đồng hồ thông minh smartwatch',
    'Serum phục hồi sáng da',
    'Bàn phím cơ gaming UTT',
    'Nồi chiên không dầu điện tử',
    'Áo đồng phục sinh viên UTT'
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
    const raw = localStorage.getItem('utt_market_user');
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

  if (currentUser) {
    if (guestLinks) guestLinks.style.display = 'none';
    if (userLinks) userLinks.style.display = 'inline-flex';
    if (displayNameEl) displayNameEl.textContent = `Chào, ${currentUser.name || 'Thành viên'}`;
  } else {
    if (guestLinks) guestLinks.style.display = 'inline-flex';
    if (userLinks) userLinks.style.display = 'none';
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

  // Open triggers
  document.getElementById('nav-login-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('login');
  });
  document.getElementById('nav-register-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('register');
  });

  // Close triggers
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
        localStorage.setItem('utt_market_user', JSON.stringify(currentUser));
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
      showError('Vui lòng xác nhận đồng ý với Quy chế & Điều khoản của UTT Market.');
      return;
    }

    currentUser = {
      name: name,
      identifier: identifier,
      phone: phone
    };

    try {
      localStorage.setItem('utt_market_user', JSON.stringify(currentUser));
    } catch (err) {}

    updateUserUI();
    closeAuthModal();
    showToast(`Tạo tài khoản thành công! Chào mừng ${currentUser.name} gia nhập UTT Market.`);
  });

  // Logout handler
  document.getElementById('nav-logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    currentUser = null;
    try {
      localStorage.removeItem('utt_market_user');
    } catch (err) {}
    updateUserUI();
    showToast('Bạn đã đăng xuất tài khoản thành công.');
  });
}

// 12. Initializer & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(PRODUCTS_DATA);
  updateCartUI();
  setupSearch();
  startCountdown();
  setupAuth();

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
      document.getElementById('search-suggestions')?.classList.remove('active');
    }
  });
});

