/* ========================================
   AV'S CREATION - JAVASCRIPT
   ======================================== */

// ========== NAVBAR ==========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        if (!document.querySelector('.navbar.scrolled[id="navbar"]')
            ?.closest('body')
            ?.querySelector('.page-hero')) {
            navbar.classList.remove('scrolled');
        }
    }
});

// Keep scrolled on inner pages
if (document.querySelector('.page-hero')) {
    navbar.classList.add('scrolled');
}

// Hamburger
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
}

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll(
    '.value-card, .service-card, .tour-card, .why-card, ' +
    '.step-card, .testimonial-card, .section-header, ' +
    '.team-card, .mv-card, .invest-service-card, ' +
    '.package-card, .tour-full-card, .inclusion-card, ' +
    '.contact-card, .stat-full-item, .two-col-text, ' +
    '.two-col-img, .cta-content, .stat-item'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== STATS COUNTER ==========
const statNumbers = document.querySelectorAll('.stat-item h3, .stat-full-item h2');

const countUp = (el, target) => {
    const text = target;
    const hasRupee = text.includes('₹');
    const hasCr = text.includes('Cr');
    const hasPlus = text.includes('+');
    const num = parseInt(text.replace(/[^0-9]/g, ''));

    if (isNaN(num)) return;

    let current = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
        current += step;
        if (current >= num) {
            current = num;
            clearInterval(timer);
        }
        let display = '';
        if (hasRupee) display += '₹';
        display += current;
        if (hasCr) display += 'Cr';
        if (hasPlus) display += '+';
        el.textContent = display;
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.textContent;
            countUp(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#e74c3c';
                setTimeout(() => { input.style.borderColor = ''; }, 3000);
            }
        });

        if (!valid) return;

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            contactForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
        }, 1500);
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== ACTIVE NAV LINK ==========
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});
