// Typing effect
new Typed('#type-effect', {
    strings: ['E-commerce solutions', 'Web Experiences', 'Modern Brands'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// Mobile menu toggle
const menuBtn = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuBtn.classList.toggle('is-active');
});

// Scroll background change
window.addEventListener('scroll', () => {
    const btt = document.getElementById('backToTop');
    if(window.scrollY > 400) { btt.style.display = "block"; } 
    else { btt.style.display = "none"; }
});
