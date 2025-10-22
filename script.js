// Flying Flourish Construction Website JavaScript
// Main functionality and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeSystem();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initCounters();
    initSliders();
    initForms();
    initParticleSystem();
    initLazyLoading();
    initAccessibility();
    initFAQAccordion();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize intersection observer for animations
    initIntersectionObserver();
});

// Improved Theme System with auto-detection and hidden toggle
function initThemeSystem() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        // Use system preference if no saved theme
        const systemTheme = systemPrefersDark ? 'dark' : 'light';
        html.setAttribute('data-theme', systemTheme);
    }
    
    updateThemeIcon(html.getAttribute('data-theme'));
    
    // Theme toggle functionality
    if (themeToggle) {
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
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
        icon.textContent = theme === 'light' ? '🌙' : '☀️';
    });
}

// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navbar || !hamburger || !navMenu) return;
    
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
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
}

// Hero Animations
function initHeroAnimations() {
    // Typewriter effect for hero title
    const typedElements = {
        'typed-text': ['Building Nigeria\'s Future', 'Construction Excellence', 'Innovative Solutions'],
        'about-typed': ['About Flying Flourish', 'Our Story', 'Excellence in Construction'],
        'projects-typed': ['Our Projects', 'Building Excellence', 'Nigeria\'s Landmarks']
    };
    
    Object.entries(typedElements).forEach(([id, strings]) => {
        const element = document.getElementById(id);
        if (element) {
            new Typed(`#${id}`, {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    });
}

// Counter Animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-count");
    const speed = 200; // lower = faster
    const updateCount = () => {
      const current = +counter.innerText;
      const increment = target / speed;

      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 20);
      } else {
        // ✅ Only add "+" for 10-count stats
        if (target === 10) {
          counter.innerText = target + "+";
        } else {
          counter.innerText = target;
        }
      }
    };
    updateCount();
  });
});

// Scroll Animations
function initScrollAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) translateX(0)';
                }, parseInt(delay));
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        const animationType = element.getAttribute('data-aos');
        
        // Set initial state based on animation type
        switch(animationType) {
            case 'fade-up':
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                break;
            case 'fade-right':
                element.style.opacity = '0';
                element.style.transform = 'translateX(50px)';
                break;
            case 'fade-left':
                element.style.opacity = '0';
                element.style.transform = 'translateX(-50px)';
                break;
        }
        
        observer.observe(element);
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                
                anime({
                    targets: { count: 0 },
                    count: target,
                    duration: 2000,
                    easing: 'easeOutQuart',
                    update: function(anim) {
                        counter.textContent = Math.floor(anim.animatables[0].target.count);
                    }
                });
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize Sliders
function initSliders() {
    const projectsSlider = document.getElementById('projects-splide');
    if (projectsSlider) {
        new Splide('#projects-splide', {
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
        }).mount();
    }
}
// Newsletter Form Handling
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

    const responseDiv = document.createElement('div');
    responseDiv.id = 'newsletter-response';
    responseDiv.style.marginTop = '10px';
    newsletterForm.appendChild(responseDiv);

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const button = this.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();

        if (!email) {
            responseDiv.style.color = 'red';
            responseDiv.textContent = 'Please enter a valid email address.';
            return;
        }

        // Animate button
        if (window.anime) {
            anime({
                targets: button,
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutQuad'
            });
        }

        // Prepare Mailchimp POST request
        const formData = new FormData();
        formData.append('EMAIL', email);
        formData.append('tags', '3570272,3570273'); // optional tags

        fetch('https://gmail.us7.list-manage.com/subscribe/post?u=4bd4b67aa76e9ad8b4e01742f&id=3c8fd9acba&f_id=0044afe0f0', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Mailchimp doesn't return CORS headers
        })
        .then(() => {
            responseDiv.style.color = 'green';
            responseDiv.textContent = 'Thank you for subscribing! You will receive our latest updates.';
            
            // Clear the input
            emailInput.value = '';

            // Refresh page after 1 second
            setTimeout(() => window.location.reload(), 1000);
        })
        .catch((error) => {
            responseDiv.style.color = 'red';
            responseDiv.textContent = 'Oops! There was a problem submitting your subscription.';
            console.error(error);
        });
    });
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', initNewsletterForm);

    
    // Contact form handling with Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const formData = new FormData(form);

        // Animate form submission
        anime({
            targets: form,
            scale: [1, 0.98, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });

        // Submit data to Formspree
        fetch('https://formspree.io/f/mqaykjoo', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok || !data.errors) {
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
                // Refresh the page after successful submission
                setTimeout(() => window.location.reload(), 500);
            } else {
                alert('Oops! There was a problem sending your message.');
                console.error(data.errors);
            }
        })
        .catch(error => {
            alert('Oops! There was a problem sending your message.');
            console.error(error);
        });
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
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Accessibility Enhancements
function initAccessibility() {
    // Add keyboard navigation for custom elements
    const clickableElements = document.querySelectorAll('[data-clickable]');
    
    clickableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
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
    
    // Function to announce messages
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
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
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animations or load content
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements that should be animated
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
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
window.addEventListener('load', function() {
    // Preload critical resources
    const criticalImages = [
        'fly.jpg',
        'image1.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to logging service here
});

// Resize handler with debouncing
const handleResize = debounce(function() {
    // Handle responsive adjustments
    const width = window.innerWidth;
    
    // Update mobile menu state if needed
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (width > 768 && navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const bars = hamburger.querySelectorAll('.bar');
        if (bars.length >= 3) {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
}, 250);

window.addEventListener('resize', handleResize);

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const faqItem = this.closest('.faq-item');
            
            if (faqItem) {
                // Close all other FAQ items
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        const otherFaqItem = otherQuestion.closest('.faq-item');
                        if (otherFaqItem) {
                            otherFaqItem.classList.remove('active');
                        }
                    }
                });
                
                // Toggle current FAQ item
                this.setAttribute('aria-expanded', !isExpanded);
                if (isExpanded) {
                    faqItem.classList.remove('active');
                } else {
                    faqItem.classList.add('active');
                }
            }
        });
    });
}
