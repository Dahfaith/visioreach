// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle Logic
    const menuBtn = document.querySelector('.menu-circle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        // Toggle the active class for the sliding drawer
        navLinks.classList.toggle('active');
        
        // Change icon between 'bars' and 'times' (X)
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // 2. Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-links a, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Smoothly scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Auto-close mobile menu after selection
                navLinks.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // 3. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Add background and shadow when scrolling down
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            // Make transparent at the very top
            navbar.style.background = 'transparent';
            navbar.style.borderBottom = 'none';
            navbar.style.backdropFilter = 'none';
        }
    });

    // 4. Contact Form Feedback (Visual Only)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            // Visual confirmation for the user
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = 'Message Sent! ✓';
                submitBtn.style.background = '#22c55e'; // Success Green
                contactForm.reset();

                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = ''; // Revert to CSS default
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
