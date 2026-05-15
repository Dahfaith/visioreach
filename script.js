/* ===================================================
   VisioReach Concepts – Portfolio JavaScript
   Author: VisioReach Concepts
   Version: 1.0
   =================================================== */

'use strict';

/* ─────────────────────────────────────────
   1. NAVBAR – Scroll & Hamburger
───────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const navLinks  = document.querySelectorAll('.nav-link');

// Scrolled state
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveLink();
  toggleBackToTop();
  animateSkillBars();
  animateCounters();
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ─────────────────────────────────────────
   2. ACTIVE NAV LINK – based on scroll position
───────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

/* ─────────────────────────────────────────
   3. TYPING TEXT EFFECT
───────────────────────────────────────── */
const phrases = [
  'premium websites.',
  'digital experiences.',
  'stunning landing pages.',
  'powerful e-commerce stores.',
  'beautiful UI/UX designs.',
  'high-converting dashboards.',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function typeText() {
  const target  = document.getElementById('typedText');
  if (!target) return;

  const current = phrases[phraseIndex];

  if (isDeleting) {
    target.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    target.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === current.length) {
    delay      = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay       = 400;
  }

  typingTimer = setTimeout(typeText, delay);
}

// Start after page load
window.addEventListener('load', () => setTimeout(typeText, 1200));

/* ─────────────────────────────────────────
   4. SCROLL REVEAL ANIMATIONS
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────
   5. SKILL BARS ANIMATION
───────────────────────────────────────── */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const fill  = bar.querySelector('.skill-fill');
      const width = bar.dataset.width || 0;
      if (fill) {
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
      }
    });
  }
}

/* ─────────────────────────────────────────
   6. COUNTER ANIMATION
───────────────────────────────────────── */
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const statsRow = document.querySelector('.stats-row');
  if (!statsRow) return;

  const rect = statsRow.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    countersStarted = true;
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target   = parseInt(el.dataset.count);
      const duration = 1800;
      const step     = 16;
      const increment = target / (duration / step);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, step);
    });
  }
}

/* ─────────────────────────────────────────
   7. PROJECT FILTER
───────────────────────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;

      if (show) {
        card.style.display = '';
        // Tiny re-trigger for animation
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ─────────────────────────────────────────
   8. TESTIMONIALS SLIDER
───────────────────────────────────────── */
const slider     = document.getElementById('testimonialsSlider');
const cards      = slider ? Array.from(slider.querySelectorAll('.testi-card')) : [];
const prevBtn    = document.getElementById('testiPrev');
const nextBtn    = document.getElementById('testiNext');
const dotsWrap   = document.getElementById('testiDots');

let currentSlide = 0;
let slidesPerView = getSlidesPerView();
let autoSlide;

function getSlidesPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  const totalDots = Math.ceil(cards.length / slidesPerView);
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  }
}

function updateDots() {
  if (!dotsWrap) return;
  const dots  = dotsWrap.querySelectorAll('.testi-dot');
  const active = Math.floor(currentSlide / slidesPerView);
  dots.forEach((d, i) => d.classList.toggle('active', i === active));
}

function goToSlide(index) {
  const maxSlide = cards.length - slidesPerView;
  currentSlide   = Math.max(0, Math.min(index * slidesPerView, maxSlide));
  applySlide();
  updateDots();
}

function applySlide() {
  if (!slider) return;
  // Calculate card width including gap
  const gap        = 24;
  const cardWidth  = slider.offsetWidth / slidesPerView - (gap * (slidesPerView - 1) / slidesPerView);
  const offset     = currentSlide * (cardWidth + gap);
  slider.style.transform  = `translateX(-${offset}px)`;
  slider.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
}

function nextSlide() {
  const maxSlide = cards.length - slidesPerView;
  currentSlide   = currentSlide >= maxSlide ? 0 : currentSlide + 1;
  applySlide();
  updateDots();
}

function prevSlide() {
  const maxSlide = cards.length - slidesPerView;
  currentSlide   = currentSlide <= 0 ? maxSlide : currentSlide - 1;
  applySlide();
  updateDots();
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(nextSlide, 4500);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

if (slider && cards.length > 0) {
  slider.style.display        = 'flex';
  slider.style.overflow       = 'hidden';
  slider.style.width          = '100%';

  buildDots();

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });

  // Touch / swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      startAutoSlide();
    }
  });

  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();

  // Recalculate on resize
  window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    currentSlide  = 0;
    buildDots();
    applySlide();
  });
}

/* ─────────────────────────────────────────
   9. BACK TO TOP BUTTON
───────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (backToTop) {
    backToTop.classList.toggle('show', window.scrollY > 400);
  }
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────
   10. CONTACT FORM HANDLER
───────────────────────────────────────── */
function handleFormSubmit() {
  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  const btn     = document.getElementById('sendBtn');
  const success = document.getElementById('formSuccess');

  // Basic validation
  const fields = [name, email, subject, message];
  let valid = true;

  fields.forEach(field => {
    if (!field) return;
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#EF4444';
      field.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.15)';
      valid = false;
    } else {
      field.style.borderColor = 'var(--glass-border)';
      field.style.boxShadow   = '';
    }
  });

  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.style.borderColor = '#EF4444';
    email.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.15)';
    valid = false;
  }

  if (!valid) return;

  // Simulate sending
  if (btn) {
    btn.disabled          = true;
    btn.innerHTML         = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    btn.style.opacity     = '0.7';
  }

  setTimeout(() => {
    if (btn) {
      btn.disabled      = false;
      btn.innerHTML     = '<i class="bx bx-send"></i> Send Message';
      btn.style.opacity = '1';
    }
    if (success) {
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }
    // Clear fields
    fields.forEach(f => { if (f) f.value = ''; });
    const serviceField = document.getElementById('service');
    if (serviceField) serviceField.value = '';
  }, 1800);
}

// Make function globally accessible (called from HTML onclick)
window.handleFormSubmit = handleFormSubmit;

/* ─────────────────────────────────────────
   11. SMOOTH SCROLL for anchor links
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ─────────────────────────────────────────
   12. PARALLAX effect on hero orbs
───────────────────────────────────────── */
const orbs = document.querySelectorAll('.orb');

window.addEventListener('mousemove', (e) => {
  if (window.innerWidth < 768) return;
  const x = (e.clientX / window.innerWidth  - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  orbs.forEach((orb, i) => {
    const intensity = (i + 1) * 10;
    orb.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
  });
}, { passive: true });

/* ─────────────────────────────────────────
   13. NAVBAR HIDE / SHOW on scroll direction
───────────────────────────────────────── */
let lastScrollY  = 0;
let ticking      = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      // Only hide if scrolled down more than nav height
      if (currentY > parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))) {
        if (currentY > lastScrollY + 5) {
          navbar.style.transform = 'translateY(-100%)';
        } else if (currentY < lastScrollY - 5) {
          navbar.style.transform = 'translateY(0)';
        }
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScrollY = currentY;
      ticking     = false;
    });
    ticking = true;
  }
}, { passive: true });

/* Ensure navbar transitions smoothly */
navbar.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s ease, box-shadow 0.3s ease';

/* ─────────────────────────────────────────
   14. CURSOR GLOW EFFECT (desktop only)
───────────────────────────────────────── */
if (window.innerWidth > 1024) {
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,43,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: left, top;
  `;
  document.body.appendChild(cursorGlow);

  let glowX = 0, glowY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  function animateGlow() {
    glowX += (targetX - glowX) * 0.08;
    glowY += (targetY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  document.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursorGlow.style.opacity = '1');
}

/* ─────────────────────────────────────────
   15. INITIAL PAGE LOAD
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Run on load
  updateActiveLink();
  toggleBackToTop();
  animateSkillBars();
  animateCounters();

  // Add transition to navbar after brief delay (prevents flash)
  setTimeout(() => {
    navbar.classList.add('loaded');
  }, 100);
});
