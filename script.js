// ── Navbar scroll effect ───────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile menu ────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

// ── Smooth scroll for nav links ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Active nav highlight on scroll ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? '#f5a623' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── Scroll reveal ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.course-card, .testi-card, .result-item, .contact-item, .about-card, .feature-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ── Counter animation ──────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  const duration = 1600;
  const start = performance.now();
  const isFloat = target.toString().includes('.');

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = isFloat
      ? (ease * parseFloat(target)).toFixed(1)
      : Math.floor(ease * parseInt(target));
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.count;
      const suffix = el.dataset.suffix || '';
      animateCounter(el, raw, suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-n').forEach(el => {
  const text = el.textContent.trim();
  const num = text.replace(/[^0-9.]/g, '');
  const suffix = text.replace(/[0-9.]/g, '');
  el.dataset.count = num;
  el.dataset.suffix = suffix;
  el.textContent = '0' + suffix;
  statObserver.observe(el);
});

document.querySelectorAll('.result-item strong').forEach(el => {
  const text = el.textContent.trim();
  if (!isNaN(text.replace(/[^0-9.]/g, ''))) {
    const num = text.replace(/[^0-9.]/g, '');
    const suffix = text.replace(/[0-9.]/g, '');
    el.dataset.count = num;
    el.dataset.suffix = suffix;
    el.textContent = '0' + suffix;
    statObserver.observe(el);
  }
});

// ── Contact form ───────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
    e.target.reset();
  }, 1200);
}

// ── Course card accent color on hover ─────────────────────────
document.querySelectorAll('.course-card').forEach(card => {
  const accent = card.dataset.accent;
  if (accent) {
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--accent', accent);
      card.querySelector('::before');
    });
  }
});
