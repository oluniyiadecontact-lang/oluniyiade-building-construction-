// Flying Flourish Construction Website JavaScript
// Main functionality and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initCounters();
    initSliders();
    initForms();
    initParticleSystem();
    initLazyLoading();
    initAccessibility();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize intersection observer for animations
    initIntersectionObserver();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Animate theme change
        anime({
            targets: themeToggle,
            rotate: '1turn',
            duration: 600,
            easing: 'easeInOutQuad'
        });
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Update aria-expanded
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        // Animate hamburger
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });
}

// Hero Section Animations
function initHeroAnimations() {
    // Typewriter effect for hero title
    const typed = new Typed('#typed-text', {
        strings: [
            'Building Tomorrow',
            'Constructing Excellence',
            'Shaping Nigeria\'s Future',
            'Flying Flourish'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
    
    // Animate hero elements on load
    anime.timeline({
        easing: 'easeOutExpo'
    })
    .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        delay: 500
    })
    .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 200
    }, '-=600')
    .add({
        targets: '.hero-buttons',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 300
    }, '-=400')
    .add({
        targets: '.hero-stats',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 400
    }, '-=200');
}
document.addEventListener("DOMContentLoaded", function() {
    // Typed text for About Page
    if (document.querySelector("#about-typed")) {
        new Typed("#about-typed", {
            strings: [
                "About Flying Flourish",
                "Our Mission & Vision",
                "Leading with Integrity",
                "Engineering a Better Tomorrow"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 300,
            loop: true
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 1.  SERVICES  PAGE  ---------- */
    if (document.querySelector("#services-typed")) {
        new Typed("#services-typed", {
            strings: [
                "Complete Construction Solutions",
                "Residential, Commercial & Infrastructure",
                "Design → Build → Deliver",
                "Excellence in Every Project"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1800,
            startDelay: 300,
            loop: true
        });
    }

    /* ---------- 2.  BLOG  PAGE  ---------- */
    if (document.querySelector("#blog-typed")) {
        new Typed("#blog-typed", {
            strings: [
                "Insights & Innovations",
                "Nigerian Construction News",
                "Expert Tips & Guides",
                "Stay Updated with Flying Flourish"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1800,
            startDelay: 300,
            loop: true
        });
    }

    /* ---------- 3.  PROJECTS  PAGE  ---------- */
    if (document.querySelector("#projects-typed")) {
        new Typed("#projects-typed", {
            strings: [
                "Showcasing Our Work",
                "Landmark Developments",
                "Quality You Can See",
                "Projects That Define Nigeria"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1800,
            startDelay: 300,
            loop: true
        });
    }

    /* ---------- 4.  CONTACT  PAGE  ---------- */
    if (document.querySelector("#contact-typed")) {
        new Typed("#contact-typed", {
            strings: [
                "Let's Build Together",
                "Get In Touch Today",
                "Ready to Start Your Project?",
                "Flying Flourish is Here for You"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1800,
            startDelay: 300,
            loop: true
        });
    }

    /* ---------- 5.  TERMS  PAGE  ---------- */
    if (document.querySelector("#terms-typed")) {
        new Typed("#terms-typed", {
            strings: [
                "Terms of Service",
                "Project Agreements",
                "Your Rights & Responsibilities",
                "Building Trust with Flying Flourish"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1800,
            startDelay: 300,
            loop: true
        });
    }

});

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // Stats counter animation for About Page
    const counters = document.querySelectorAll(".hero-stats .stat-number");

    const options = {
        threshold: 0.6
    };

    const animateCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-count");
            const current = +counter.innerText;
            const increment = Math.ceil(target / 200); // Adjust speed

            if (current < target) {
                counter.innerText = current + increment;
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});


// Scroll Animations
function initScrollAnimations() {
    // Smooth scroll reveal animations
    const scrollElements = document.querySelectorAll('[data-aos]');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        const animationType = element.getAttribute('data-aos');
        
        switch(animationType) {
            case 'fade-up':
                element.classList.add('fade-in-up');
                break;
            case 'fade-left':
                element.classList.add('fade-in-left');
                break;
            case 'fade-right':
                element.classList.add('fade-in-right');
                break;
            case 'zoom-in':
                anime({
                    targets: element,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: Math.random() * 200
                });
                break;
        }
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('fade-in-up', 'fade-in-left', 'fade-in-right');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check
    handleScrollAnimation();
}

// Slider Initialization
function initSliders() {
    // Projects slider
    if (document.getElementById('projects-splide')) {
        const projectsSplide = new Splide('#projects-splide', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                768: {
                    perPage: 1,
                }
            }
        });
        
        projectsSplide.mount();
    }
    
    // Add hover effects to slider slides
    const splideSlides = document.querySelectorAll('.splide__slide');
    splideSlides.forEach(slide => {
        slide.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        slide.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Form Handling
function initForms() {
    // Newsletter form with AJAX submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Subscribing...';
            
            // Simulate API call with AJAX
            setTimeout(() => {
                // Create success message
                const successDiv = document.createElement('div');
                successDiv.className = 'form-success';
                successDiv.textContent = 'Thank you for subscribing! You have been added to our newsletter.';
                
                // Remove any existing messages
                const existingMessages = this.querySelectorAll('.form-success, .form-error');
                existingMessages.forEach(msg => msg.remove());
                
                // Add success message
                this.appendChild(successDiv);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Subscribe';
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);
                
                // Track subscription
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_subscription', {
                        'event_category': 'engagement',
                        'event_label': 'homepage'
                    });
                }
            }, 1500);
        });
    }
    
    // Contact form (for other pages)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            
            // Simulate Formspree integration with AJAX
            setTimeout(() => {
                // Create success message
                const successDiv = document.createElement('div');
                successDiv.className = 'form-success';
                successDiv.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                
                // Remove any existing messages
                const existingMessages = this.querySelectorAll('.form-success, .form-error');
                existingMessages.forEach(msg => msg.remove());
                
                // Add success message
                this.appendChild(successDiv);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Send Message';
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);
                
                // Track form submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_form_submission', {
                        'event_category': 'engagement',
                        'event_label': 'contact_page'
                    });
                }
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        fontSize: '14px'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Particle System for Background Effects
function initParticleSystem() {
    // Only initialize on larger screens to avoid performance issues
    if (window.innerWidth < 768) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    let particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(70, 130, 180, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(70, 130, 180, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// Accessibility Enhancements
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
    });
    
    // Announce dynamic content changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    
    // Function to announce changes
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Performance
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('service-card')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: Math.random() * 200
                    });
                }
                
                if (entry.target.classList.contains('testimonial-card')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: Math.random() * 300
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const observeElements = document.querySelectorAll('.service-card, .testimonial-card, .about-card');
    observeElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
window.addEventListener('resize', debounce(() => {
    // Handle resize events
    if (window.innerWidth >= 768) {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}, 250));

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Non-critical error caught:', e.message);
});

// Console welcome message
console.log('%c🏗️ Flying Flourish Construction Company', 'color: #008751; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with precision and care, just like our constructions.', 'color: #4682B4; font-size: 14px;');
console.log('%cWebsite developed by AI with attention to detail and performance.', 'color: #666; font-size: 12px;');

// Analytics and Tracking
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Custom analytics
    console.log('Event tracked:', eventName, properties);
}

// Track page views
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});

// Track outbound links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"]');
    if (link && !link.href.includes(window.location.hostname)) {
        trackEvent('click_outbound_link', {
            link_url: link.href,
            link_text: link.textContent.trim()
        });
    }
});

// Track form interactions
function trackFormInteraction(formId, action) {
    trackEvent('form_interaction', {
        form_id: formId,
        action: action
    });
}
// ============================
// ABOUT PAGE ANIMATIONS
// ============================

// 1️⃣ Animate Numbers (Stats Section)
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-count");
        const current = +counter.innerText;

        // Speed factor (lower is faster)
        const increment = target / 150;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  // Use IntersectionObserver so animation starts when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
});


// 2️⃣ AOS (Animate On Scroll) Init
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    });
  }
});


// 3️⃣ Timeline Slide Animation (Extra smooth effect)
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const revealTimeline = () => {
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        item.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealTimeline);
  revealTimeline();
});

// SERVICES-PAGE ANIMATIONS
document.addEventListener('DOMContentLoaded', () => {
  /* 1. Stats counters (if you re-use .stat-number inside services) */
  const counters = document.querySelectorAll('.stat-number');

  const countUp = (el) => {
    const target = +el.dataset.count;
    const inc = target / 200;

    const update = () => {
      const cur = +el.innerText;
      if (cur < target) {
        el.innerText = Math.ceil(cur + inc);
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    };
    update();
  };

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* 2. 3-D tilt on mouse-move for glass cards */
  const cards = document.querySelectorAll('.service-card, .specialized-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -20; // -10deg to +10deg
      const rotateY = (x / rect.width - 0.5) * 20;   // -10deg to +10deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
});

//  PROJECTS-PAGE  JS
document.addEventListener('DOMContentLoaded', () => {
  /* 1.  Filter buttons  */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* 2.  Category tabs  */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => pane.classList.remove('active'));
      document.getElementById(target).classList.add('active');
    });
  });

  /* 3.  3-D tilt on mouse-move  */
  const cards = document.querySelectorAll('.project-card, .category-item, .testimonial-card, .award-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -20;
      const rotateY = (x / rect.width - 0.5) * 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  /* 4.  AOS (Animate-On-Scroll)  --  already init'd globally  */

  /* 5.  Counter (if you re-use .stat-number inside projects)  */
  const counters = document.querySelectorAll('.stat-number');
  const countUp = (el) => {
    const target = +el.dataset.count;
    const inc = target / 200;
    const update = () => {
      const cur = +el.innerText;
      if (cur < target) {
        el.innerText = Math.ceil(cur + inc);
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    };
    update();
  };
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* 6.  Case-study button (placeholder)  */
  document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const project = btn.dataset.project;
      alert(`Case-study page for "${project}" will open soon.`);
      // window.location.href = `case-study-${project}.html`;
    });
  });
});   // end DOMContentLoaded

//  BLOG-PAGE  JS
document.addEventListener('DOMContentLoaded', () => {
  /* 1.  Category filter buttons  */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      articleCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* 2.  3-D tilt on mouse-move  */
  const cards = document.querySelectorAll('.featured-card, .article-card, .testimonial-card, .award-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -20;
      const rotateY = (x / rect.width - 0.5) * 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  /* 3.  "Read More" link smooth scroll (placeholder)  */
  document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const title = link.closest('.article-card').querySelector('h3').innerText;
      alert(`Opening full article: "${title}"`);
      // window.location.href = link.href;  // real link
    });
  });

  /* 4.  AOS (Animate-On-Scroll)  --  already init'd globally  */

  /* 5.  Counter (if you re-use .stat-number inside blog)  */
  const counters = document.querySelectorAll('.stat-number');
  const countUp = (el) => {
    const target = +el.dataset.count;
    const inc = target / 200;
    const update = () => {
      const cur = +el.innerText;
      if (cur < target) {
        el.innerText = Math.ceil(cur + inc);
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    };
    update();
  };
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
});   // end DOMContentLoaded

//  CONTACT-FORM  LIVE  CONTRAST  UPDATE
const observer = new MutationObserver(() => {
    document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea')
        .forEach(el => el.blur()); // force re-render
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

/* OPTIONAL: add to script.js → gives a subtle shake on invalid submit */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('invalid', e => {
    e.preventDefault();
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 300);
  }, true);
}

/* OPTIONAL: add to script.js → force re-colour on open */
document.querySelectorAll('.form-group select').forEach(sel => {
  sel.addEventListener('mousedown', () => {
    sel.classList.add('select-open');
  });
  sel.addEventListener('blur', () => {
    sel.classList.remove('select-open');
  });
});

//  TERMS-PAGE  JS
document.addEventListener('DOMContentLoaded', () => {
  /* 1.  Smooth scroll for internal anchor links (if any)  */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* 2.  3-D tilt on mouse-move for glass cards  */
  const sections = document.querySelectorAll('.terms-section');
  sections.forEach(sec => {
    sec.addEventListener('mousemove', (e) => {
      const rect = sec.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -10;
      const rotateY = (x / rect.width - 0.5) * 10;
      sec.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    sec.addEventListener('mouseleave', () => {
      sec.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
});
