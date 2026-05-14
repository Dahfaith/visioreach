document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // MOBILE MENU TOGGLE
    // ========================
    const menuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Auto-close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // ========================
    // TYPING EFFECT
    // ========================
    if (typeof Typed !== "undefined" && document.querySelector('#type-effect')) {
        new Typed('#type-effect', {
            strings: [
                'E-commerce solutions',
                'premium websites',
                'modern brands'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    // ========================
    // SMOOTH SCROLL (optional enhancement)
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

});
