/* ===================================================
   VisioReach Concepts – script.js v3.0
   EmailJS + All interactivity
   =================================================== */

'use strict';

/* ─────────────────────────────────────────
   EmailJS Configuration
   ─────────────────────────────────────────
   SETUP:
   1. Replace YOUR_PUBLIC_KEY  → Account → API Keys
   2. Replace YOUR_SERVICE_ID  → Email Services tab
   3. Replace YOUR_CONTACT_TEMPLATE_ID → your "Contact Us" template
   4. Replace YOUR_AUTOREPLY_TEMPLATE_ID → your "Auto Reply" template

   CONTACT US template variables needed:
     {{from_name}} {{from_email}} {{subject}} {{service}} {{message}}

   AUTO REPLY template variables needed:
     {{from_name}} {{from_email}} {{subject}}
   ───────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY         = 'AyLw7OkdSV9Y-LVmI';          // Account → API Keys
const EMAILJS_SERVICE_ID         = 'service_13qig5j';          // Email Services tab
const EMAILJS_CONTACT_TEMPLATE   = 'template_d6wbo9g'; // Contact Us template
const EMAILJS_AUTOREPLY_TEMPLATE = 'template_h4xuzp4'; // Auto Reply template

// Initialize EmailJS
(function(){
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();


/* ─────────────────────────────────────────
   1. NAVBAR – scroll + hamburger
───────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const navLinks  = document.querySelectorAll('.nav-link');

let lastScrollY = 0;
let ticking     = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const sy = window.scrollY;

      // Scrolled glass effect
      navbar.classList.toggle('scrolled', sy > 20);

      // Hide/show on scroll direction (only after passing nav height)
      if (sy > 80) {
        navbar.style.transform = sy > lastScrollY + 6
          ? 'translateY(-100%)'
          : 'translateY(0)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScrollY = sy;

      updateActiveLink();
      toggleBackToTop();
      animateSkillBars();
      animateCounters();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('active');
  navMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && navMenu.classList.contains('open')) closeMenu();
});

// ESC to close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
});

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('open');
  document.body.style.overflow = '';
}


/* ─────────────────────────────────────────
   2. ACTIVE NAV LINK
───────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top  = sec.offsetTop;
    const h    = sec.offsetHeight;
    const id   = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
  });
}


/* ─────────────────────────────────────────
   3. SMOOTH SCROLL for anchor links
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href   = this.getAttribute('href');
    const target = document.querySelector(href);
    if (!target || href === '#') return;
    e.preventDefault();
    const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ─────────────────────────────────────────
   4. TYPING TEXT EFFECT
───────────────────────────────────────── */
const phrases = [
  'premium websites.',
  'digital experiences.',
  'stunning landing pages.',
  'powerful e-commerce stores.',
  'beautiful UI/UX designs.',
  'high-converting dashboards.',
  'WordPress & Elementor sites.',
  'React-powered apps.',
];

let pIdx = 0, cIdx = 0, isDeleting = false;

function typeText() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const cur = phrases[pIdx];
  el.textContent = isDeleting
    ? cur.substring(0, cIdx - 1)
    : cur.substring(0, cIdx + 1);
  isDeleting ? cIdx-- : cIdx++;

  let delay = isDeleting ? 52 : 90;
  if (!isDeleting && cIdx === cur.length)  { delay = 2000; isDeleting = true; }
  else if (isDeleting && cIdx === 0)       { isDeleting = false; pIdx = (pIdx + 1) % phrases.length; delay = 380; }

  setTimeout(typeText, delay);
}
window.addEventListener('load', () => setTimeout(typeText, 1000));


/* ─────────────────────────────────────────
   5. SCROLL REVEAL
───────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObs.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));


/* ─────────────────────────────────────────
   6. SKILL BARS
───────────────────────────────────────── */
let skillsDone = false;

function animateSkillBars() {
  if (skillsDone) return;
  const sec = document.getElementById('skills');
  if (!sec) return;
  if (sec.getBoundingClientRect().top < window.innerHeight * 0.88) {
    skillsDone = true;
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const fill = bar.querySelector('.skill-fill');
      if (fill) setTimeout(() => { fill.style.width = (bar.dataset.width || 0) + '%'; }, 200);
    });
  }
}


/* ─────────────────────────────────────────
   7. COUNTER ANIMATION
───────────────────────────────────────── */
let countersDone = false;

function animateCounters() {
  if (countersDone) return;
  const row = document.querySelector('.stats-row');
  if (!row) return;
  if (row.getBoundingClientRect().top < window.innerHeight * 0.9) {
    countersDone = true;
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const dur    = 1800;
      const step   = 16;
      const inc    = target / (dur / step);
      let cur      = 0;
      const timer  = setInterval(() => {
        cur += inc;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.floor(cur);
      }, step);
    });
  }
}


/* ─────────────────────────────────────────
   8. PROJECT FILTER
───────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});


/* ─────────────────────────────────────────
   9. TESTIMONIALS SLIDER
───────────────────────────────────────── */
const sliderEl   = document.getElementById('testimonialsSlider');
const cards      = sliderEl ? Array.from(sliderEl.querySelectorAll('.testi-card')) : [];
const prevBtn    = document.getElementById('testiPrev');
const nextBtn    = document.getElementById('testiNext');
const dotsWrap   = document.getElementById('testiDots');

let curSlide = 0;
let perView  = getPerView();
let autoInt;

function getPerView() {
  if (window.innerWidth >= 1025) return 3;
  if (window.innerWidth >= 769)  return 2;
  return 1;
}

function getGap() { return window.innerWidth >= 769 ? 18 : 14; }

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  const total = Math.ceil(cards.length / perView);
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i * perView); startAuto(); });
    dotsWrap.appendChild(dot);
  }
}

function updateDots() {
  if (!dotsWrap) return;
  const dots   = dotsWrap.querySelectorAll('.testi-dot');
  const active = Math.floor(curSlide / perView);
  dots.forEach((d, i) => d.classList.toggle('active', i === active));
}

function applySlide() {
  if (!sliderEl || cards.length === 0) return;
  const gap       = getGap();
  const vw        = sliderEl.parentElement.offsetWidth;
  const cardW     = (vw - gap * (perView - 1)) / perView;
  const offset    = curSlide * (cardW + gap);
  sliderEl.style.transform  = `translateX(-${offset}px)`;
  updateDots();
}

function goTo(idx) {
  const max = Math.max(0, cards.length - perView);
  curSlide  = Math.max(0, Math.min(idx, max));
  applySlide();
}

function next() { goTo(curSlide >= cards.length - perView ? 0 : curSlide + 1); }
function prev() { goTo(curSlide <= 0 ? cards.length - perView : curSlide - 1); }

function startAuto() { stopAuto(); autoInt = setInterval(next, 4500); }
function stopAuto()  { clearInterval(autoInt); }

if (sliderEl && cards.length > 0) {
  buildDots();
  applySlide();

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });

  // Touch swipe
  let txStart = 0;
  sliderEl.addEventListener('touchstart', e => { txStart = e.touches[0].clientX; }, { passive: true });
  sliderEl.addEventListener('touchend',   e => {
    const diff = txStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startAuto(); }
  });

  sliderEl.addEventListener('mouseenter', stopAuto);
  sliderEl.addEventListener('mouseleave', startAuto);

  startAuto();

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newPV = getPerView();
      if (newPV !== perView) { perView = newPV; curSlide = 0; buildDots(); }
      applySlide();
    }, 200);
  });
}


/* ─────────────────────────────────────────
   10. BACK TO TOP
───────────────────────────────────────── */
const btt = document.getElementById('backToTop');
function toggleBackToTop() {
  if (btt) btt.classList.toggle('show', window.scrollY > 400);
}
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ─────────────────────────────────────────
   11. CONTACT FORM  →  visioreach@gmail.com
   Uses EmailJS — free tier: 200 emails/month
───────────────────────────────────────── */
function handleFormSubmit() {
  const name    = document.getElementById('fname');
  const email   = document.getElementById('femail');
  const subject = document.getElementById('fsubject');
  const service = document.getElementById('fservice');
  const message = document.getElementById('fmessage');
  const btn     = document.getElementById('sendBtn');
  const btnText = document.getElementById('btnText');
  const success = document.getElementById('formSuccess');
  const errDiv  = document.getElementById('formError');
  const errMsg  = document.getElementById('errorMsg');

  // Hide any previous feedback
  success.classList.remove('show');
  errDiv.classList.remove('show');

  // Validate required fields
  const required = [name, email, subject, message];
  let valid = true;
  required.forEach(f => {
    if (!f) return;
    const empty = !f.value.trim();
    f.style.borderColor  = empty ? '#F87171' : '';
    f.style.boxShadow    = empty ? '0 0 0 3px rgba(248,113,113,.15)' : '';
    if (empty) valid = false;
  });

  // Email format check
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.style.borderColor = '#F87171';
    email.style.boxShadow   = '0 0 0 3px rgba(248,113,113,.15)';
    valid = false;
  }

  if (!valid) return;

  // Reset field borders
  required.forEach(f => { if (f) { f.style.borderColor = ''; f.style.boxShadow = ''; } });

  // Loading state
  if (btn)  { btn.disabled = true; btn.style.opacity = '.7'; }
  if (btnText) btnText.textContent = 'Sending…';

  // Check if EmailJS is fully configured
  const configured = EMAILJS_PUBLIC_KEY          !== 'YOUR_PUBLIC_KEY'
    && EMAILJS_SERVICE_ID                         !== 'YOUR_SERVICE_ID'
    && EMAILJS_CONTACT_TEMPLATE                   !== 'YOUR_CONTACT_TEMPLATE_ID'
    && EMAILJS_AUTOREPLY_TEMPLATE                 !== 'YOUR_AUTOREPLY_TEMPLATE_ID';

  // Params shared by both templates
  const params = {
    from_name:  name.value.trim(),
    from_email: email.value.trim(),
    subject:    subject.value.trim(),
    service:    service ? service.value || 'Not specified' : 'Not specified',
    message:    message.value.trim(),
    to_email:   'visioreach@gmail.com',
  };

  if (configured && typeof emailjs !== 'undefined') {

    // Send 1: Contact Us template → notifies YOU at visioreach@gmail.com
    const sendContact = emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE, params);

    // Send 2: Auto-Reply template → goes to the CLIENT automatically
    const sendAutoReply = emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_TEMPLATE, params);

    // Wait for both to finish
    Promise.all([sendContact, sendAutoReply])
      .then(() => {
        showSuccess();
        clearForm([name, email, subject, message]);
        if (service) service.value = '';
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        showError('Send failed. Please try WhatsApp or email directly.');
      })
      .finally(() => resetBtn());

  } else {
    // Demo mode — works until you paste in your real IDs
    setTimeout(() => {
      showSuccess();
      clearForm([name, email, subject, message]);
      if (service) service.value = '';
      resetBtn();
    }, 1600);
  }

  function showSuccess() {
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 6000);
  }
  function showError(msg) {
    if (errMsg) errMsg.textContent = msg;
    errDiv.classList.add('show');
    setTimeout(() => errDiv.classList.remove('show'), 6000);
  }
  function resetBtn() {
    if (btn)  { btn.disabled = false; btn.style.opacity = '1'; }
    if (btnText) btnText.textContent = 'Send Message';
  }
  function clearForm(fields) {
    fields.forEach(f => { if (f) f.value = ''; });
  }
}

// Expose globally for onclick
window.handleFormSubmit = handleFormSubmit;

// Clear red border on input
['fname','femail','fsubject','fmessage'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => {
    el.style.borderColor = '';
    el.style.boxShadow   = '';
  });
});


/* ─────────────────────────────────────────
   12. MOUSE PARALLAX on hero orbs (desktop)
───────────────────────────────────────── */
if (window.innerWidth > 1024) {
  const orbs = document.querySelectorAll('.orb');
  let mx = 0, my = 0, ox = 0, oy = 0;

  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - .5) * 2;
    my = (e.clientY / window.innerHeight - .5) * 2;
  }, { passive: true });

  (function animOrbs() {
    ox += (mx - ox) * .06;
    oy += (my - oy) * .06;
    orbs.forEach((orb, i) => {
      const s = (i + 1) * 9;
      orb.style.transform = `translate(${ox * s}px, ${oy * s}px)`;
    });
    requestAnimationFrame(animOrbs);
  })();
}


/* ─────────────────────────────────────────
   13. CURSOR GLOW  (desktop only)
───────────────────────────────────────── */
if (window.innerWidth > 1024) {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position:'fixed', width:'280px', height:'280px', borderRadius:'50%',
    background:'radial-gradient(circle, rgba(255,107,43,.055) 0%, transparent 70%)',
    pointerEvents:'none', zIndex:'0',
    transform:'translate(-50%, -50%)',
    transition:'opacity .3s', willChange:'left,top',
  });
  document.body.appendChild(glow);

  let gx = 0, gy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });

  (function animGlow() {
    gx += (tx - gx) * .08;
    gy += (ty - gy) * .08;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(animGlow);
  })();
}


/* ─────────────────────────────────────────
   14. INIT on DOMContentLoaded
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLink();
  toggleBackToTop();
  animateSkillBars();
  animateCounters();
});
