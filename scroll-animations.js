// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation delay to social cards
const socialCards = document.querySelectorAll('.social-card');
socialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add animation delay to tech badges
const techBadges = document.querySelectorAll('.badge');
techBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
});
