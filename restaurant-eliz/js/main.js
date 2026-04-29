/* ================================================
   RESTAURANT ELiZ — Shared JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR ---- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function updateNav() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
    });
  });

  // Active nav link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---- MENU TABS ---- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.menu-panel').forEach(panel => {
        panel.style.display = panel.dataset.tab === tab ? 'grid' : 'none';
      });
    });
  });

  /* ---- GALLERY LIGHTBOX ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.querySelector('img').src;
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    document.getElementById('lightboxClose')?.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- CART ---- */
  let cart = JSON.parse(localStorage.getItem('eliz-cart') || '[]');

  function saveCart() {
    localStorage.setItem('eliz-cart', JSON.stringify(cart));
  }

  function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartItems) return;

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

    if (cartCount) cartCount.textContent = totalQty;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="cart-empty"><i class="fas fa-shopping-bag" style="display:block;font-size:2rem;margin-bottom:8px;color:var(--teal-light)"></i>Your cart is empty</p>';
    } else {
      cartItems.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">€${(item.price * item.qty).toFixed(2)}</div>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
          </div>
        </div>
      `).join('');
    }

    if (cartSubtotal) cartSubtotal.textContent = '€' + subtotal.toFixed(2);
    if (cartTotal) cartTotal.textContent = '€' + (subtotal > 0 ? (subtotal + 2.99).toFixed(2) : '0.00');
  }

  window.addToCart = function(name, price, btn) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price: parseFloat(price), qty: 1 });
    }
    saveCart();
    renderCart();
    if (btn) {
      btn.textContent = 'Added!';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = '+ Add to Cart';
        btn.classList.remove('added');
      }, 1500);
    }
  };

  window.changeQty = function(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart();
    renderCart();
  };

  window.clearCart = function() {
    cart = [];
    saveCart();
    renderCart();
  };

  renderCart();

  /* ---- RESERVATION FORM ---- */
  const resForm = document.getElementById('reservationForm');
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = resForm.querySelector('[name="name"]')?.value;
      const guests = resForm.querySelector('[name="guests"]')?.value;
      const date = resForm.querySelector('[name="date"]')?.value;
      const time = resForm.querySelector('[name="time"]')?.value;
      document.getElementById('confirmName').textContent = name;
      document.getElementById('confirmGuests').textContent = guests;
      document.getElementById('confirmDate').textContent = new Date(date).toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
      document.getElementById('confirmTime').textContent = time;
      resForm.style.display = 'none';
      document.getElementById('reservationSuccess').classList.add('show');
    });
  }

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      document.getElementById('contactSuccess').classList.add('show');
    });
  }

  /* ---- ORDER CHECKOUT ---- */
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Please add items to your cart first.');
        return;
      }
      document.getElementById('orderSuccess').classList.add('show');
      clearCart();
    });
  }

  /* ---- EVENT FORM ---- */
  const eventForm = document.getElementById('eventForm');
  if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      eventForm.style.display = 'none';
      document.getElementById('eventSuccess').classList.add('show');
    });
  }

  /* ---- COUNTER ANIMATION ---- */
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let count = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = Math.floor(count).toLocaleString() + (el.dataset.suffix || '');
          if (count >= target) clearInterval(timer);
        }, 25);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
  });

  /* ---- DATE INPUT MIN DATE ---- */
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(d => d.setAttribute('min', today));

  /* ---- PAGE HERO BG LOAD ---- */
  document.querySelectorAll('.page-hero-bg').forEach(bg => {
    const img = new Image();
    const url = bg.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    img.onload = () => bg.classList.add('loaded');
    img.src = url;
  });

});
