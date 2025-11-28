// ---------- Menu toggle ----------
const menuBtn = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
if (menuBtn) {
  menuBtn.addEventListener('click', (e) => {
    mainMenu.classList.toggle('active');
    e.stopPropagation();
  });
}

// ---------- User dropdown ----------
const userIcon = document.getElementById('userIcon');
const userDropdown = document.getElementById('userDropdown');
if (userIcon) {
  userIcon.addEventListener('click', (e) => {
    userDropdown.classList.toggle('active');
    e.stopPropagation();
  });
}

// ---------- Close dropdowns on outside click ----------
document.addEventListener('click', () => {
  if (mainMenu) mainMenu.classList.remove('active');
  if (userDropdown) userDropdown.classList.remove('active');
});

// ---------- Cart counter ----------
let cartCount = 0;
const cartBubble = document.querySelector('.cart-count');
function addToCart() {
  cartCount++;
  if (cartBubble) cartBubble.textContent = cartCount;
}

/* ---------- MODAL CONTROL ---------- */
const openButtons = document.querySelectorAll('[data-open]');
const closeButtons = document.querySelectorAll('.modal-close');
const overlays = document.querySelectorAll('.modal-overlay');

openButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const modalId = btn.getAttribute('data-open');
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal-overlay');
    if (modal) modal.classList.remove('active');
  });
});

overlays.forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

/* ---------- TABS ---------- */
const tabButtons = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const targetEl = document.getElementById(target);
    if (targetEl) targetEl.classList.add('active');
  });
});

/* ---------- SWITCH: SignIn → Account ---------- */
document.addEventListener('click', e => {
  if (e.target.matches('[data-switch="account-modal"]')) {
    const signin = document.getElementById('signin-modal');
    const account = document.getElementById('account-modal');
    if (signin) signin.classList.remove('active');
    if (account) account.classList.add('active');
    // Atveriam Details tab
    const detailsTab = document.querySelector('[data-tab="details"]');
    const detailsContent = document.getElementById('details');
    if (detailsTab) detailsTab.click();
  }
});

/* ---------- FORMS (localStorage) ---------- */
const detailsForm = document.getElementById('detailsForm');
if (detailsForm) {
  detailsForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(detailsForm).entries());
    localStorage.setItem('userDetails', JSON.stringify(data));
    alert('Details saved!');
  });
}

const addressForm = document.getElementById('addressForm');
if (addressForm) {
  addressForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(addressForm).entries());
    let addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    addresses.push(data);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    alert('Address saved!');
    addressForm.reset();
  });
}
