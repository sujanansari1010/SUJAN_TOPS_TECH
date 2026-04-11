const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');
const openCart = document.getElementById('openCart');
const closeCart = document.getElementById('closeCart');
const cartPanel = document.getElementById('cartPanel');
const cartBody = document.getElementById('cartBody');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const preloader = document.getElementById('preloader');
const revealElements = document.querySelectorAll('.reveal');

let cart = JSON.parse(localStorage.getItem('coffeeCart')) || {};
let currentTheme = localStorage.getItem('coffeeTheme') || 'dark';

document.documentElement.classList.toggle('light-theme', currentTheme === 'light');
themeToggle.textContent = currentTheme === 'light' ? 'Dark' : 'Light';

function updateCartUI() {
  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = items.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartBody.innerHTML = '';

  if (!items.length) {
    cartBody.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  items.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <strong>${item.name}</strong>
      <p>${item.quantity} × $${item.price.toFixed(2)}</p>
      <div class="cart-item-actions">
        <button type="button" data-action="decrease" data-id="${item.id}">-</button>
        <button type="button" data-action="increase" data-id="${item.id}">+</button>
        <button type="button" data-action="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartBody.appendChild(cartItem);
  });
}

function saveCart() {
  localStorage.setItem('coffeeCart', JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart[product.id];
  if (existing) {
    existing.quantity += 1;
  } else {
    cart[product.id] = { ...product, quantity: 1 };
  }
  saveCart();
  updateCartUI();
}

function handleCartAction(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id;
  if (!action || !id || !cart[id]) return;

  if (action === 'increase') {
    cart[id].quantity += 1;
  } else if (action === 'decrease') {
    cart[id].quantity -= 1;
    if (cart[id].quantity <= 0) delete cart[id];
  } else if (action === 'remove') {
    delete cart[id];
  }
  saveCart();
  updateCartUI();
}

function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light-theme');
  themeToggle.textContent = isLight ? 'Dark' : 'Light';
  localStorage.setItem('coffeeTheme', isLight ? 'light' : 'dark');
}

function toggleNav() {
  mainNav.classList.toggle('show');
}

function closeNav() {
  mainNav.classList.remove('show');
}

function openCartPanel() {
  cartPanel.classList.add('open');
}

function closeCartPanel() {
  cartPanel.classList.remove('open');
}

function showReveal() {
  revealElements.forEach((el, index) => {
    const triggerBottom = window.innerHeight * 0.88;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      setTimeout(() => el.classList.add('visible'), index * 80);
    }
  });
}

function initMenuButtons() {
  const buttons = document.querySelectorAll('.add-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.menu-card');
      const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: parseFloat(card.dataset.price),
      };
      addToCart(product);
    });
  });
}

function handleContactSubmit(event) {
  event.preventDefault();
  formNote.textContent = 'Thanks! We received your message.';
  contactForm.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  initMenuButtons();
  updateCartUI();
  showReveal();
  setTimeout(() => preloader.classList.add('hidden'), 250);
});

window.addEventListener('scroll', showReveal);

navToggle.addEventListener('click', toggleNav);
mainNav.addEventListener('click', closeNav);
openCart.addEventListener('click', openCartPanel);
closeCart.addEventListener('click', closeCartPanel);
cartBody.addEventListener('click', handleCartAction);
themeToggle.addEventListener('click', toggleTheme);
contactForm.addEventListener('submit', handleContactSubmit);
