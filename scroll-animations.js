
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

const socialCards = document.querySelectorAll('.social-card');
socialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

const techBadges = document.querySelectorAll('.badge');
techBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
});
