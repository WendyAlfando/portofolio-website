// Loading Screen
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
});

// Scroll Progress
window.addEventListener('scroll', function () {
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isDark = false;

themeToggle.addEventListener('click', function () {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  isDark = savedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = isDark ? '☀️' : '🌙';
}



// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Enhanced scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, index * 100);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section h2, .section-subtitle, .stat-card, .project-card, .skill-category, .contact-card, .certification-card, .timeline-item').forEach(el => {
  observer.observe(el);
});

// Counter Animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
  }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number[data-count]');
      counters.forEach(counter => {
        animateCounter(counter);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  statsObserver.observe(statsGrid);
}

// Project Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

/* Contact Form Handle (Formspree) */
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const isEnglish = document.documentElement.lang === 'en';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = isEnglish ? 'Sending...' : 'Mengirim...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.textContent = isEnglish ? 'Message sent successfully! I will get back to you soon.' : 'Pesan berhasil dikirim! Saya akan segera menghubungi Anda.';
          formStatus.style.color = 'var(--success)';
          formStatus.style.display = 'block';
          contactForm.reset();
        } else {
          formStatus.textContent = isEnglish ? 'Oops! There was a problem submitting your form.' : 'Oops! Terjadi kesalahan saat mengirim pesan.';
          formStatus.style.color = '#ef4444'; // red
          formStatus.style.display = 'block';
        }
      } catch (error) {
        formStatus.textContent = isEnglish ? 'Oops! There was a problem submitting your form.' : 'Oops! Terjadi kesalahan saat mengirim pesan.';
        formStatus.style.color = '#ef4444';
        formStatus.style.display = 'block';
      } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    });
  }
});

// Testimonial Slider
let currentSlide = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const totalSlides = testimonialDots.length;

function showSlide(index) {
  testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

  testimonialDots.forEach(dot => dot.classList.remove('active'));
  testimonialDots[index].classList.add('active');

  currentSlide = index;
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

// Auto-advance testimonials
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}, 5000);

// Skill bars animation when in view
const skillsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skills-bar div');
      skillBars.forEach(bar => {
        bar.style.animation = 'none';
        bar.offsetHeight; // Trigger reflow
        bar.style.animation = 'grow 2s ease forwards';
      });
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Header scroll class toggle (theme-friendly)
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 100);
});

// Parallax effect for hero background shapes
window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset;
  const heroShapes = document.querySelector('.hero-bg-shapes');
  if (heroShapes) {
    heroShapes.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', function () {
  document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
  .keyboard-navigation *:focus {
    outline: 2px solid var(--gold) !important;
    outline-offset: 2px !important;
  }
`;
document.head.appendChild(style);

// Mobile menu toggle
const menuBtn = document.getElementById('menuButton');
const headerEl = document.querySelector('header');
const mainNav = document.getElementById('mainNav');

if (menuBtn && headerEl && mainNav) {
  menuBtn.addEventListener('click', () => {
    headerEl.classList.toggle('open');
  });

  // Tutup menu saat klik link
  mainNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      headerEl.classList.remove('open');
    }
  });

  // Tutup saat scroll
  window.addEventListener('scroll', () => headerEl.classList.remove('open'));
}