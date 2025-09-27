/*  Flying Flourish – Interactive JS  */
/*  script.js – production-ready  */

(() => {
    /* ===== CONFIG ===== */
    const FORM_ENDPOINT = "https://formspree.io/f/mqaykjoo";
    const WHATSAPP_NUMBER = "2348078053533";
    const AUTOPLAY_HERO = false; // user-requested OFF

    /* ===== UTILS ===== */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    /* ===== 3D CARD TILT ===== */
    const tiltCards = $$(".tilt-card");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
        tiltCards.forEach(card => {
            card.addEventListener("mousemove", e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y / rect.height - 0.5) * -15; // ±7.5 deg
                const rotateY = (x / rect.width - 0.5) * 15;   // ±7.5 deg
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
            });
        });
    }

    /* ===== DARK MODE ===== */
    const darkToggle = $(".dark-mode-toggle");
    const html = document.documentElement;

    const setTheme = theme => {
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };
    const initTheme = () => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(saved ? saved : (prefersDark ? "dark" : "light"));
    };
    const toggleTheme = () => {
        const current = html.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
    };

    initTheme();
    darkToggle?.addEventListener("click", toggleTheme);

    /* ===== HERO SLIDER ===== */
    const slider = $(".hero-slider");
    if (slider) {
        const slides = $$(".slide", slider);
        const prevBtn = $(".slider-prev", slider);
        const nextBtn = $(".slider-next", slider);
        const dots = $$(".dot", slider);
        let current = 0;
        let interval;

        const showSlide = index => {
            slides.forEach((s, i) => s.classList.toggle("active", i === index));
            dots.forEach((d, i) => d.classList.toggle("active", i === index));
        };
        const nextSlide = () => {
            current = (current + 1) % slides.length;
            showSlide(current);
        };
        const prevSlide = () => {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        };
        const goToSlide = index => {
            current = index;
            showSlide(current);
        };

        prevBtn?.addEventListener("click", prevSlide);
        nextBtn?.addEventListener("click", nextSlide);
        dots.forEach((dot, i) => dot.addEventListener("click", () => goToSlide(i)));

        /* keyboard */
        slider.addEventListener("keydown", e => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        });
        slider.setAttribute("tabindex", "0");

        /* autoplay (OFF by default) */
        if (AUTOPLAY_HERO) {
            interval = setInterval(nextSlide, 5000);
            slider.addEventListener("mouseenter", () => clearInterval(interval));
            slider.addEventListener("mouseleave", () => interval = setInterval(nextSlide, 5000));
        }

        showSlide(0);
    }

    /* ===== MOBILE NAV ===== */
    const navToggle = $(".nav-toggle");
    const mainNav = $(".main-nav");
    navToggle?.addEventListener("click", () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !expanded);
        mainNav.classList.toggle("open");
    });

    /* ===== FORM HANDLING ===== */
    const contactForm = $("#contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async e => {
            e.preventDefault();
            const form = e.target;
            const status = $(".form-status", form);
            const submitBtn = $("button[type='submit']", form);
            status.textContent = "";

            /* basic validation */
            let valid = true;
            $$("[required]", form).forEach(field => {
                const error = $(".error", field.parentElement);
                if (!field.value.trim()) {
                    error.textContent = "Required";
                    valid = false;
                } else {
                    error.textContent = "";
                }
            });
            if (!valid) return;

            /* disable button */
            submitBtn.disabled = true;
            status.textContent = "Sending...";

            /* collect data */
            const data = new FormData(form);
            data.append("newsletter", $("#newsletter").checked ? "yes" : "no");

            /* send */
            try {
                const res = await fetch(FORM_ENDPOINT, {
                    method: "POST",
                    body: data,
                    headers: { Accept: "application/json" }
                });
                if (res.ok) {
                    status.innerHTML = "✅ Message sent! Redirecting...";
                    setTimeout(() => (window.location.href = "form-success.html"), 1500);
                } else {
                    const body = await res.json();
                    status.innerHTML = `❌ ${body.error || "Unable to send. Try again."}`;
                }
            } catch (err) {
                status.innerHTML = "❌ Network error. Try again.";
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    /* ===== WHATSAPP FLOAT ===== */
    const whatsappBtn = $(".whatsapp-float");
    if (whatsappBtn) {
        whatsappBtn.setAttribute("aria-label", "Chat on WhatsApp");
        whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Flying%20Flourish%2C%20I%20need%20guidance%20on%20my%20building%20project`;
    }

    /* ===== NEWSLETTER (Mailchimp) STYLING HOOK ===== */
    /* CSS already handles glass in style.css; we just ensure inputs exist */
    const newsletterForm = $("#mc-embedded-subscribe-form");
    if (newsletterForm) {
        /* prevent redirect on submit error */
        newsletterForm.addEventListener("submit", () => {
            setTimeout(() => {
                const msg = $(".mc-form-error")?.textContent || "";
                if (msg) alert("Newsletter: " + msg);
            }, 1000);
        });
    }

    /* ===== ACCESSIBILITY ===== */
    /* reduced motion */
    if (prefersReducedMotion) {
        document.documentElement.style.setProperty("--rotate-speed", "0.001s");
    }

    /* focus visible */
    document.addEventListener("keydown", e => {
        if (e.key === "Tab") document.body.classList.add("user-is-tabbing");
    });
    document.addEventListener("mousedown", () => {
        document.body.classList.remove("user-is-tabbing");
    });

    /* ===== YEAR IN FOOTER ===== */
    const yearSpan = $("#year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

})();

// Navbar toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  // Toggle active state
  mainNav.classList.toggle('open');

  // Optional: update aria-expanded for accessibility
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
});
