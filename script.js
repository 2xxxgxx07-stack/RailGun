document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar immediate reveal
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add('appear');
    }

    // Intersection Observer for scroll animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px" 
    });

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Animate progress bars when they appear (for about/skills pages)
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.progress-fill');
                if (fill) {
                    const targetWidth = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                        fill.style.width = targetWidth;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });

    const progressItems = document.querySelectorAll('.progress-item');
    progressItems.forEach(item => {
        progressObserver.observe(item);
    });

    // Mobile menu toggle
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

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        }
    });

    // Subscribe form handling with interactive notification
    const subscribeForm = document.querySelector('.subscribe-form-row');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = subscribeForm.querySelector('.subscribe-input-box');
            if (input && input.value) {
                const email = input.value;
                input.value = '';
                
                // Show custom stylish toast
                const toast = document.createElement('div');
                toast.innerHTML = `<i data-lucide="check-circle" style="color: #d4f056; width: 1.25rem; height: 1.25rem;"></i> <span>Thank you! We received your message: <strong>${email}</strong></span>`;
                toast.style.position = 'fixed';
                toast.style.bottom = '30px';
                toast.style.right = '30px';
                toast.style.background = '#101610';
                toast.style.color = '#fff';
                toast.style.border = '1px solid #d4f056';
                toast.style.padding = '14px 24px';
                toast.style.borderRadius = '9999px';
                toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(212, 240, 86, 0.2)';
                toast.style.display = 'flex';
                toast.style.alignItems = 'center';
                toast.style.gap = '10px';
                toast.style.zIndex = '9999';
                toast.style.fontSize = '0.9rem';
                toast.style.animation = 'slide-up 0.4s ease';

                document.body.appendChild(toast);
                if (window.lucide) {
                    lucide.createIcons({ root: toast });
                }
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => toast.remove(), 500);
                }, 4000);
            }
        });
    }
});
