const openBtn = document.getElementById('menu-open');
const closeBtn = document.getElementById('menu-close');
const overlay = document.getElementById('nav-overlay');

// Open Menu
openBtn.addEventListener('click', () => {
    overlay.classList.add('show');
});

// Close Menu
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
});

// Close Menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        overlay.classList.remove('show');
    });
});
