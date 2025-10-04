// Terminal Commands Database
const terminalCommands = [
    {
        command: "whoami",
        output: "C++ & Python Developer\nPassionate about algorithms and systems programming"
    },
    {
        command: "ls -la",
        output: "total 8\ndrwxr-xr-x 3 user user 4096 Jan 15 10:30 projects/\ndrwxr-xr-x 2 user user 4096 Jan 15 10:31 skills/\n-rw-r--r-- 1 user user 1024 Jan 15 10:32 resume.pdf"
    },
    {
        command: "cat skills/cpp.txt",
        output: "C++ Expertise:\n- STL Containers & Algorithms\n- Memory Management\n- Template Metaprogramming\n- Performance Optimization\n- Multi-threading & Concurrency"
    },
    {
        command: "python3 --version",
        output: "Python 3.11.0\nNumPy 1.24.0\nPandas 2.0.0\nTensorFlow 2.13.0"
    },
    {
        command: "git log --oneline -5",
        output: "a1b2c3d Add machine learning project\nf4e5g6h Implement data structures\ni7j8k9l Optimize C++ algorithms\nm0n1o2p Create terminal portfolio\nq3r4s5t Initial commit"
    },
    {
        command: "g++ --version",
        output: "g++ (GCC) 12.2.0\nCopyright (C) 2022 Free Software Foundation\nSupports C++17, C++20 features"
    },
    {
        command: "ps aux | grep python",
        output: "user 1234 0.1 2.3 456789 123456 ? S 10:30 0:01 python3 ml_model.py\nuser 5678 0.0 1.1 234567 89012 ? S 10:31 0:00 python3 data_processor.py"
    },
    {
        command: "df -h",
        output: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1       100G   45G   50G  48% /\n/dev/sda2       200G   120G   75G  62% /home"
    }
];

// Dev Quotes Database
const devQuotes = [
    {
        quote: "Code is like humor. When you have to explain it, it's bad.",
        author: "Cory House"
    },
    {
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    },
    {
        quote: "Experience is the name everyone gives to their mistakes.",
        author: "Oscar Wilde"
    },
    {
        quote: "In order to be irreplaceable, one must always be different.",
        author: "Coco Chanel"
    },
    {
        quote: "Java is to JavaScript what car is to Carpet.",
        author: "Chris Heilmann"
    },
    {
        quote: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
        author: "Dan Salomon"
    },
    {
        quote: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
        author: "Antoine de Saint-Exupéry"
    },
    {
        quote: "Ruby is rubbish! PHP is phpantastic!",
        author: "Nikita Popov"
    },
    {
        quote: "Code never lies, comments sometimes do.",
        author: "Ron Jeffries"
    },
    {
        quote: "When I wrote this code, only God and I understood what I did. Now only God knows.",
        author: "Unknown"
    },
    {
        quote: "A good programmer is someone who always looks both ways before crossing a one-way street.",
        author: "Doug Linder"
    },
    {
        quote: "There are only two kinds of programming languages: those people always bitch about and those nobody uses.",
        author: "Bjarne Stroustrup"
    },
    {
        quote: "The best error message is the one that never shows up.",
        author: "Thomas Fuchs"
    },
    {
        quote: "The most disastrous thing that you can ever learn is your first programming language.",
        author: "Alan Kay"
    },
    {
        quote: "The only way to go fast, is to go well.",
        author: "Robert C. Martin"
    },
    {
        quote: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci"
    },
    {
        quote: "Make it work, make it right, make it fast.",
        author: "Kent Beck"
    },
    {
        quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
        author: "Harold Abelson"
    },
    {
        quote: "The best way to get a project done faster is to start sooner.",
        author: "Jim Highsmith"
    },
    {
        quote: "It's not a bug; it's an undocumented feature.",
        author: "Unknown"
    }
];

// DOM Elements - Cached for performance
const quoteElement = document.getElementById('dev-quote');
const quoteBtn = document.querySelector('.quote-btn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const terminalCommand = document.getElementById('terminal-command');
const terminalOutput = document.getElementById('terminal-output');

// Current indices
let currentQuoteIndex = 0;
let currentTerminalIndex = 0;
let terminalInterval;
let isAnimating = false; // Prevent animation conflicts

// Initialize - Optimized
document.addEventListener('DOMContentLoaded', function() {
    // Use requestIdleCallback for non-critical initializations
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            setupScrollAnimations();
            initializeSkillBars();
        });
    } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
            setupScrollAnimations();
            initializeSkillBars();
        }, 100);
    }
    
    // Critical initializations
    displayQuote(0);
    setupEventListeners();
    setupTypingEffect();
    initializeTerminal();
});

// Event Listeners
function setupEventListeners() {
    // Quote button
    quoteBtn.addEventListener('click', generateNewQuote);
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Quote Functions - Optimized
function generateNewQuote() {
    if (isAnimating) return; // Prevent multiple simultaneous animations
    isAnimating = true;
    
    // Add loading state
    quoteBtn.classList.add('quote-loading');
    quoteBtn.disabled = true;
    
    // Use requestAnimationFrame for smooth animations
    requestAnimationFrame(() => {
        quoteElement.style.opacity = '0';
        quoteElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Get random quote (different from current)
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * devQuotes.length);
            } while (newIndex === currentQuoteIndex && devQuotes.length > 1);
            
            currentQuoteIndex = newIndex;
            displayQuote(currentQuoteIndex);
            
            // Fade in new quote
            requestAnimationFrame(() => {
                quoteElement.style.opacity = '1';
                quoteElement.style.transform = 'translateY(0)';
                
                // Remove loading state
                quoteBtn.classList.remove('quote-loading');
                quoteBtn.disabled = false;
                isAnimating = false;
            });
        }, 300);
    });
}

function displayQuote(index) {
    const quote = devQuotes[index];
    quoteElement.innerHTML = `"${quote.quote}"`;
    document.querySelector('.quote-author').textContent = `- ${quote.author}`;
}

// Mobile Menu Functions
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Scroll Animations - Optimized
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smooth animations
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.tech-category, .stat, .social-link, .about-text, .skill-item, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });
}

// Typing Effect
function setupTypingEffect() {
    const titleName = document.querySelector('.title-name');
    const originalText = titleName.textContent;
    titleName.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            titleName.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Parallax Effect for Particles
function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax effect
setupParallaxEffect();

// Add hover effects to tech items
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add click ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .quote-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Add floating animation to profile picture
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    }
});

// Add glow effect on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(16, 0, 43, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(92, 24, 154, 0.3)';
    } else {
        navbar.style.background = 'rgba(16, 0, 43, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add random quote on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        generateNewQuote();
    }, 2000);
});

// Add keyboard navigation for quote button
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && e.target === quoteBtn) {
        e.preventDefault();
        generateNewQuote();
    }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--purple-7)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Terminal Functions
function initializeTerminal() {
    if (terminalCommand && terminalOutput) {
        // Start with first command
        displayTerminalCommand(0);
        
        // Auto-cycle through commands
        terminalInterval = setInterval(() => {
            currentTerminalIndex = (currentTerminalIndex + 1) % terminalCommands.length;
            displayTerminalCommand(currentTerminalIndex);
        }, 4000);
    }
}

function displayTerminalCommand(index) {
    const command = terminalCommands[index];
    
    // Clear previous output
    terminalOutput.textContent = '';
    
    // Type the command
    typeText(terminalCommand, command.command, 50, () => {
        // After command is typed, show output
        setTimeout(() => {
            typeText(terminalOutput, command.output, 30);
        }, 500);
    });
}

function typeText(element, text, speed, callback) {
    element.textContent = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
            if (callback) callback();
        }
    }, speed);
}

// Skill Bar Functions
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Enhanced particle effects
function createParticleBurst() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.style.animation = 'none';
            particle.style.transform = 'scale(2)';
            particle.style.opacity = '1';
            
            setTimeout(() => {
                particle.style.animation = 'float 6s ease-in-out infinite';
                particle.style.transform = 'scale(1)';
                particle.style.opacity = '0.7';
            }, 200);
        }, index * 50);
    });
}

// Add click effect to particles
document.addEventListener('click', function(e) {
    if (Math.random() < 0.3) { // 30% chance
        createParticleBurst();
    }
});

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add floating animation to code snippets
function animateCodeSnippets() {
    const snippets = document.querySelectorAll('.code-snippet');
    
    snippets.forEach((snippet, index) => {
        setTimeout(() => {
            snippet.style.animation = 'codeFloat 15s linear infinite';
        }, index * 2000);
    });
}

// Initialize code snippet animation
setTimeout(animateCodeSnippets, 1000);

// Add mouse trail effect - Optimized with throttling
let mouseTrail = [];
const maxTrailLength = 15; // Reduced for better performance
let lastMouseTime = 0;
const mouseThrottle = 16; // ~60fps

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastMouseTime < mouseThrottle) return; // Throttle mouse events
    lastMouseTime = now;
    
    const trailDot = document.createElement('div');
    trailDot.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: var(--purple-7);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.6;
        animation: fadeOut 1s ease-out forwards;
        will-change: opacity, transform;
    `;
    
    document.body.appendChild(trailDot);
    
    mouseTrail.push(trailDot);
    
    if (mouseTrail.length > maxTrailLength) {
        const oldDot = mouseTrail.shift();
        if (oldDot && oldDot.parentNode) {
            oldDot.parentNode.removeChild(oldDot);
        }
    }
    
    setTimeout(() => {
        if (trailDot && trailDot.parentNode) {
            trailDot.parentNode.removeChild(trailDot);
        }
    }, 1000);
});

// Add fadeOut animation for mouse trail
const trailCSS = `
@keyframes fadeOut {
    0% { opacity: 0.6; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.5); }
}
`;

const trailStyle = document.createElement('style');
trailStyle.textContent = trailCSS;
document.head.appendChild(trailStyle);
