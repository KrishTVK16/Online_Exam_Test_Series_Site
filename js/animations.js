/**
 * ONLINE EXAM TEST SERIES WEBSITE
 * Animations JavaScript
 */

// ===================================
// INTERSECTION OBSERVER
// ===================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// COUNTER ANIMATION
// ===================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-counter'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    const isDecimal = target % 1 !== 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (isDecimal) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1) + suffix;
            } else {
                element.textContent = target.toLocaleString() + suffix;
            }
        }
    };

    requestAnimationFrame(updateCounter);
}

// ===================================
// STAGGERED CARD ANIMATIONS
// ===================================

function initStaggeredAnimations() {
    const cardGroups = document.querySelectorAll('[data-stagger]');

    cardGroups.forEach(group => {
        const cards = group.querySelectorAll('.card, .stat-card');

        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
        });
    });
}

// ===================================
// PARALLAX SCROLLING
// ===================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    const handleScroll = () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    };

    // Throttle scroll handler for performance
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===================================
// PROGRESS BAR ANIMATION
// ===================================

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar[data-progress]');

    if (progressBars.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => observer.observe(bar));
}

// ===================================
// CIRCULAR PROGRESS ANIMATION
// ===================================

function animateCircularProgress(element, percentage) {
    const circle = element.querySelector('.progress-circle');
    const text = element.querySelector('.circular-progress-text');

    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);

    // Animate text
    if (text) {
        let current = 0;
        const increment = percentage / 60; // 1 second at 60fps

        const updateText = () => {
            current += increment;
            if (current < percentage) {
                text.textContent = Math.floor(current) + '%';
                requestAnimationFrame(updateText);
            } else {
                text.textContent = percentage + '%';
            }
        };

        requestAnimationFrame(updateText);
    }
}

// ===================================
// PAGE LOAD ANIMATIONS
// ===================================

function initPageLoadAnimations() {
    // Add fade-in class to body
    document.body.classList.add('fade-in');

    // Animate hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.classList.add('fade-in-up');
    }

    // Animate header
    const header = document.querySelector('.header');
    if (header) {
        header.classList.add('fade-in-down');
    }
}

// ===================================
// TYPEWRITER EFFECT (Optional)
// ===================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');

    if (!progressBar) return;

    window.addEventListener('scroll', function () {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===================================
// HOVER TILT EFFECT (Optional)
// ===================================

function initTiltEffect() {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===================================
// INITIALIZE ALL ANIMATIONS
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    initPageLoadAnimations();
    initScrollAnimations();
    initCounterAnimations();
    initStaggeredAnimations();
    initParallax();
    initProgressBars();
    initScrollProgress();
    // initTiltEffect(); // Optional

    // Initialize password strength if on auth pages
    if (typeof initPasswordStrength === 'function') {
        initPasswordStrength();
    }

    // Initialize accordion if present
    if (typeof initAccordion === 'function') {
        initAccordion();
    }
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.animations = {
        animateCircularProgress,
        typeWriter
    };
}
