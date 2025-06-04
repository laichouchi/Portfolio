// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and event listeners
    initNav();
    initScrollAnimations();
    initForm();
    initMobileMenu();
    initPyramidLoader();
    initWaveAnimation();
});

// Navigation effects
function initNav() {
    const nav = document.querySelector('nav');
    
    // Change nav style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate elements when they come into view
                const elements = entry.target.querySelectorAll('.animate-pop-in, .animate-slide-in');
                elements.forEach(el => {
                    el.style.animationDelay = el.style.getPropertyValue('--delay') || '0s';
                    el.classList.add('active');
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Hero animations
    const heroElements = document.querySelectorAll('.hero .animate-pop-in');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('active');
    });
}

// Form handling
function initForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this to a server
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize pyramid loader animation
function initPyramidLoader() {
    const pyramidLoader = document.querySelector('.pyramid-loader');
    if (pyramidLoader) {
        pyramidLoader.style.display = 'block';
    }
}

// Initialize wave animation
function initWaveAnimation() {
    const body = document.body;
    if (body) {
        const waveDiv = document.createElement('div');
        waveDiv.className = 'wave';
        waveDiv.innerHTML = `
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="rgba(106, 17, 203, 0.6)" />
                        <stop offset="50%" stop-color="rgba(159, 89, 223, 0.8)" />
                        <stop offset="100%" stop-color="rgba(209, 160, 255, 0.6)" />
                    </linearGradient>
                </defs>
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" class="shape-fill"></path>
            </svg>
        `;
        // Insert at the beginning of the body to position it at the top
        body.insertBefore(waveDiv, body.firstChild);
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    }
});

// Dynamic year in footer
const yearSpan = document.querySelector('footer p:last-child');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = yearSpan.textContent.replace('2025', currentYear);
}
