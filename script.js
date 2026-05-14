// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Typing Text Effect
const typed = new Typed('.typing-text', {
    strings: [
        'premium websites', 
        'UI/UX designs', 
        'E-commerce solutions', 
        'Admin Dashboards'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// Sticky Navbar effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.navbar');
    header.classList.toggle('sticky', window.scrollY > 0);
    
    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

// Back to Top functionality
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Simple Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // You would add CSS for .nav-links.active to show a mobile overlay
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
