// Mobile menu drawer toggle (matches projects.html)
function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-menu-drawer');
    if (drawer) {
        drawer.classList.toggle('hidden');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}
window.toggleMobileMenu = toggleMobileMenu;

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Ensure progress bar exists
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        document.body.prepend(progressBar);
    }

    // Luxury Intersection Observer for scroll animations
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    });

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .card, .section');
    animatedElements.forEach(el => {
        if (!el.classList.contains('slide-up') && !el.classList.contains('fade-in')) {
            el.classList.add('slide-up');
        }
        animationObserver.observe(el);
    });

    // Header Elevation & Progress Bar Tracking on Scroll
    const header = document.querySelector('.site-header') || document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Progress bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0 && progressBar) {
            progressBar.style.width = (scrollY / docHeight * 100) + '%';
        }

        // Header elevation
        if (header) {
            header.classList.toggle('scrolled', scrollY > 20);
        }
    }, { passive: true });

    // Legacy mobile menu toggle (if present)
    const menuToggle = document.querySelector('.menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.add('active');
        });
    }

    if (closeSidebar && navLinks) {
        closeSidebar.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    }

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        }
        const drawer = document.getElementById('mobile-menu-drawer');
        const btn = document.getElementById('mobile-menu-btn');
        if (drawer && !drawer.classList.contains('hidden')) {
            if (!drawer.contains(e.target) && (!btn || !btn.contains(e.target))) {
                drawer.classList.add('hidden');
            }
        }
    });
});
