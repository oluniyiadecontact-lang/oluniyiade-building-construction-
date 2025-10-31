/* =========================================================
 * Flying Flourish – consolidated site logic
 * =======================================================*/

/* ---------- 0.  Helpers ----------------------------------*/
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- 1.  Theme System ----------------------------*/
function initThemeSystem() {
  const html = document.documentElement;
  const toggle = $('#theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const saved = localStorage.getItem('theme');
  const initial = saved || (media.matches ? 'dark' : 'light');
  html.setAttribute('data-theme', initial);
  updateThemeIcon(initial);

  toggle?.addEventListener('click', () => {
    const cur = html.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);

    if (window.anime) {
      anime({ targets: toggle, rotate: '1turn', duration: 600, easing: 'easeInOutQuad' });
    }
  });

  media.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const next = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      updateThemeIcon(next);
    }
  });
}

function updateThemeIcon(theme) {
  $$('.theme-icon').forEach(i => (i.textContent = theme === 'light' ? '🌙' : '☀️'));
}

/* ---------- 2.  Navigation ------------------------------*/
function initNavigation() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const navMenu = $('#nav-menu');
  if (!navbar || !hamburger || !navMenu) return;

  /* scroll shadow */
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 100);
  window.addEventListener('scroll', onScroll, { passive: true });

  /* hamburger */
  const close = () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    const bars = $$('.bar', hamburger);
    bars[0] && (bars[0].style.transform = '');
    bars[1] && (bars[1].style.opacity = '1');
    bars[2] && (bars[2].style.transform = '');
  };

  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open);
    const bars = $$('.bar', hamburger);
    if (open) {
      if (bars[0]) bars[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      if (bars[1]) bars[1].style.opacity = '0';
      if (bars[2]) bars[2].style.transform = 'rotate(-45deg) translate(7px,-6px)';
    } else close();
  });

  /* close on link click or outside click */
  navMenu.addEventListener('click', e => e.target.closest('.nav-link') && close());
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) close();
  });

  /* auto-close on desktop resize */
  const onResize = () => {
    if (window.innerWidth > 768) close();
  };
  window.addEventListener('resize', onResize);
}

/* ---------- 3.  Hero Typed Text -------------------------*/
function initHeroAnimations() {
  if (typeof Typed === 'undefined') return;
  const configs = {
    'typed-text': ['Building Nigeria\'s Future', 'Construction Excellence', 'Innovative Solutions'],
    'about-typed': ['About Flying Flourish', 'Our Story', 'Excellence in Construction'],
    'projects-typed': ['Our Projects', 'Building Excellence', 'Nigeria\'s Landmarks']
  };
  Object.entries(configs).forEach(([id, strings]) => {
    const el = $(`#${id}`);
    if (!el) return;
    new Typed(`#${id}`, { strings, typeSpeed: 50, backSpeed: 30, backDelay: 2000, loop: true, cursorChar: '|' });
  });
}

/* ---------- 4.  Counters --------------------------------*/
function initCounters() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(ent => {
      if (!ent.isIntersecting) return;
      const el = ent.target;
      const final = +el.dataset.count;
      if (window.anime) {
        anime({
          targets: { v: 0 },
          v: final,
          duration: 2000,
          easing: 'easeOutQuart',
          update: a => (el.textContent = Math.floor(a.animatables[0].target.v) + (final === 10 ? '+' : ''))
        });
      } else {
        el.textContent = final + (final === 10 ? '+' : '');
      }
      observer.unobserve(el);
    }),
    { threshold: 0.5 }
  );
  $$('.stat-number[data-count]').forEach(el => observer.observe(el));
}

/* ---------- 5.  Projects Slider -------------------------*/
function initSliders() {
  if (typeof Splide === 'undefined') return;
  const el = $('#projects-splide');
  if (!el) return;
  new Splide('#projects-splide', {
    type: 'loop',
    perPage: 3,
    gap: '2rem',
    autoplay: true,
    interval: 4000,
    pauseOnHover: true,
    breakpoints: { 1024: { perPage: 2 }, 768: { perPage: 1 } }
  }).mount();
}

/* ---------- 6.  FAQ Accordion ---------------------------*/
function initFAQAccordion() {
  $$('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const open = q.getAttribute('aria-expanded') === 'true';
      $$('.faq-question').forEach(x => x.setAttribute('aria-expanded', 'false'));
      $$('.faq-item').forEach(x => x.classList.remove('active'));
      if (!open) {
        q.setAttribute('aria-expanded', 'true');
        q.closest('.faq-item')?.classList.add('active');
      }
    });
  });
}

/* ---------- 7.  Newsletter ------------------------------*/
function initNewsletterForm() {
  const form = $('#newsletter-form');
  if (!form) return;
  const rsp = document.createElement('div');
  rsp.id = 'newsletter-response';
  rsp.style.marginTop = '10px';
  form.appendChild(rsp);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email) {
      rsp.style.color = 'red';
      rsp.textContent = 'Please enter a valid email address.';
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    if (window.anime) anime({ targets: btn, scale: [1, 0.95, 1], duration: 200 });

    const fd = new FormData();
    fd.append('EMAIL', email);
    fd.append('tags', '3570272,3570273');

    fetch('https://gmail.us7.list-manage.com/subscribe/post?u=4bd4b67aa76e9ad8b4e01742f&id=3c8fd9acba&f_id=0044afe0f0', {
      method: 'POST',
      body: fd,
      mode: 'no-cors'
    })
      .then(() => {
        rsp.style.color = 'green';
        rsp.textContent = 'Thank you for subscribing!';
        form.reset();
        setTimeout(() => location.reload(), 1000);
      })
      .catch(() => {
        rsp.style.color = 'red';
        rsp.textContent = 'Sorry, something went wrong.';
      });
  });
}

/* ---------- 8.  Contact Form ----------------------------*/
function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (window.anime) anime({ targets: form, scale: [1, 0.98, 1], duration: 300 });
    fetch('https://formspree.io/f/mqaykjoo', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(r => r.json())
      .then(d => {
        if (d.ok) {
          alert('Thank you for your message! We will get back to you soon.');
          form.reset();
          setTimeout(() => location.reload(), 500);
        } else throw d;
      })
      .catch(() => alert('Sorry, the message could not be sent.'));
  });
}

/* ---------- 9.  Cookie Banner ---------------------------*/
function initCookieConsent() {
  const banner = $('#cookie-consent');
  const accept = $('#accept-cookies');
  const decline = $('#decline-cookies');
  if (!banner || !accept || !decline) return;
  if (localStorage.getItem('cookieConsent')) return (banner.style.display = 'none');
  banner.style.display = 'block';
  accept.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.style.display = 'none';
  });
  decline.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    banner.style.display = 'none';
  });
}

/* ---------- 10.  Smooth Scroll --------------------------*/
function initSmoothScrolling() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const tgt = $(`#${id}`);
      if (!tgt) return;
      e.preventDefault();
      window.scrollTo({ top: tgt.offsetTop - 80, behavior: 'smooth' });
    });
  });
}

/* ---------- 11.  Lazy Loading ---------------------------*/
function initLazyLoading() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    entries => entries.forEach(en => {
      if (en.isIntersecting) {
        const img = en.target;
        img.src = img.dataset.src || img.src;
        io.unobserve(img);
      }
    }),
    { rootMargin: '50px' }
  );
  $$('img[loading="lazy"]').forEach(img => io.observe(img));
}

/* ---------- 12.  Accessibility --------------------------*/
function initAccessibility() {
  const announcer = document.createElement('div');
  Object.assign(announcer.style, { position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' });
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  document.body.appendChild(announcer);
  window.announceToScreenReader = msg => {
    announcer.textContent = msg;
    setTimeout(() => (announcer.textContent = ''), 1000);
  };
  $$('[data-clickable]').forEach(el =>
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    })
  );
}

/* ---------- 13.  Intersection Observer (generic) -------*/
function initIntersectionObserver() {
  const io = new IntersectionObserver(
    entries => entries.forEach(en => en.isIntersecting && en.target.classList.add('visible')),
    { threshold: 0.1, rootMargin: '50px' }
  );
  $$('.fade-in, .slide-in-left, .slide-in-right').forEach(el => io.observe(el));
}

/* ---------- 14.  One & Only DOM Ready ------------------*/
document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initNavigation();
  initHeroAnimations();
  initCounters();
  initSliders();
  initFAQAccordion();
  initNewsletterForm();
  initContactForm();
  initCookieConsent();
  initSmoothScrolling();
  initLazyLoading();
  initAccessibility();
  initIntersectionObserver();
});
