// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
});

// Scroll Progress
window.addEventListener('scroll', function() {
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isDark = false;

themeToggle.addEventListener('click', function() {
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

// Language Toggle
const languageToggle = document.getElementById('languageToggle');
const languageIcon = languageToggle.querySelector('.language-icon');
let currentLang = 'id';

const translations = {
  id: {
    'nav-about': 'Tentang',
    'nav-experience': 'Pengalaman',
    'nav-projects': 'Proyek',
    'nav-skills': 'Keahlian',
    'nav-testimonials': 'Testimoni',
    'nav-contact': 'Kontak',

    'hero-subtitle': 'Junior Professional',
    'hero-title': 'Junior Business Analyst',
    'hero-description': 'Junior Business Analyst di PT Uniair Indotama Cargo dengan background S1 Information Systems dari Bina Nusantara University. Berpengalaman memimpin analisis untuk multiple RPA implementation projects, Quality Assurance testing, dan pembuatan Business Requirement Documents dengan passion dalam mengubah data menjadi insight bisnis yang berharga.',
    'btn-portfolio': 'Lihat Portofolio',
    'btn-contact': 'Hubungi Saya',

    'about-title': 'Tentang Saya',
    'about-subtitle': 'Fresh graduate dengan foundation kuat dalam leadership, teamwork, dan data processing',
    'about-description': 'Junior Business Analyst dengan 1+ tahun pengalaman di PT Uniair Indotama Cargo, lulusan Summa Cum Laude S1 Information Systems dari Bina Nusantara University (GPA 3.91). Spesialisasi dalam RPA implementation analysis, Quality Assurance testing, dan Business Requirement Documents. Memiliki track record memimpin analisis untuk 5+ RPA projects yang berhasil mengurangi process time hingga 70%. Strong foundation dalam leadership dan teamwork yang terasah melalui berbagai peran organisasi dan mentoring. Passionate dalam mengubah data kompleks menjadi actionable business insights untuk mendukung strategic decision making.',
    'stat-experience': 'Tahun Pengalaman',
    'stat-projects': 'Proyek Selesai',
    'stat-efficiency': 'Rata-rata Peningkatan Efisiensi (%)',
    'stat-clients': 'Klien Puas',

    // Section titles/subtitles yang dipakai di index.html
    'experience-title': 'Pengalaman Profesional',
    'experience-subtitle': 'Perjalanan karir yang membangun keahlian dalam analisis bisnis',
    'projects-title': 'Proyek & Studi Kasus',
    'projects-subtitle': 'Solusi berbasis data yang menghasilkan dampak nyata untuk berbagai industri',
    'skills-title': 'Keahlian & Kompetensi',
    'skills-subtitle': 'Teknologi dan metodologi yang saya kuasai untuk menghasilkan solusi terbaik',
    'testimonials-title': 'Testimoni Klien',
    'testimonials-subtitle': 'Apa kata mereka yang telah bekerja sama dengan saya',
    'organization-title': 'Pengalaman Organisasi',
    'organization-subtitle': 'Leadership dan teamwork yang diasah melalui berbagai peran organisasi',
    'certification-title': 'Sertifikasi & Penghargaan',
    'certification-subtitle': 'Kredensial profesional yang mendukung keahlian saya',
    'contact-title': 'Hubungi Saya',
    'contact-subtitle': 'Mari berdiskusi bagaimana saya dapat membantu mengoptimalkan bisnis Anda',
    'cta-title': 'Siap Mengoptimalkan Bisnis Anda?',
    'cta-description': 'Mari berkolaborasi untuk mengubah data menjadi keputusan bisnis yang menguntungkan',
    'cta-button': 'Mulai Diskusi',

    // Contact card titles
    'contact-email': 'Email',
    'contact-whatsapp': 'WhatsApp',
    'contact-linkedin': 'LinkedIn',
    'contact-instagram': 'Instagram',
    'contact-location': 'Lokasi',
    'contact-location-value': 'Jakarta, Indonesia',
  },
  en: {
    'nav-about': 'About',
    'nav-experience': 'Experience',
    'nav-projects': 'Projects',
    'nav-skills': 'Skills',
    'nav-testimonials': 'Testimonials',
    'nav-contact': 'Contact',

    'hero-subtitle': 'Junior Professional',
    'hero-title': 'Junior Business Analyst',
    'hero-description': 'Junior Business Analyst at PT Uniair Indotama Cargo with an Information Systems background from Bina Nusantara University. Experienced in leading analysis for multiple RPA implementation projects, Quality Assurance testing, and creating Business Requirement Documents with a passion for transforming data into valuable business insights.',
    'btn-portfolio': 'View Portfolio',
    'btn-contact': 'Contact Me',

    'about-title': 'About Me',
    'about-subtitle': 'Fresh graduate with a strong foundation in leadership, teamwork, and data processing',
    'about-description': 'Junior Business Analyst with 1+ years of experience at PT Uniair Indotama Cargo, Summa Cum Laude graduate in Information Systems from Bina Nusantara University (GPA 3.91). Specialized in RPA implementation analysis, Quality Assurance testing, and Business Requirement Documents. Proven track record of leading analysis for 5+ RPA projects that reduced process time by up to 70%. Strong foundation in leadership and teamwork developed through various organizational roles and mentoring. Passionate about turning complex data into actionable business insights for strategic decision making.',
    'stat-experience': 'Years Experience',
    'stat-projects': 'Projects Completed',
    'stat-efficiency': 'Average Efficiency Improvement (%)',
    'stat-clients': 'Satisfied Clients',

    'experience-title': 'Professional Experience',
    'experience-subtitle': 'Career journey building expertise in business analysis',
    'projects-title': 'Projects & Case Studies',
    'projects-subtitle': 'Data-driven solutions delivering real impact across industries',
    'skills-title': 'Skills & Competencies',
    'skills-subtitle': 'Technologies and methodologies I use to deliver the best solutions',
    'testimonials-title': 'Client Testimonials',
    'testimonials-subtitle': 'What clients say about working with me',
    'organization-title': 'Organizational Experience',
    'organization-subtitle': 'Leadership and teamwork honed through various organizational roles',
    'certification-title': 'Certifications & Awards',
    'certification-subtitle': 'Professional credentials that support my expertise',
    'contact-title': 'Contact Me',
    'contact-subtitle': 'Let’s discuss how I can help optimize your business',
    'cta-title': 'Ready to Optimize Your Business?',
    'cta-description': 'Let’s collaborate to turn data into profitable business decisions',
    'cta-button': 'Start Discussion',

    // Contact card titles
    'contact-email': 'Email',
    'contact-whatsapp': 'WhatsApp',
    'contact-linkedin': 'LinkedIn',
    'contact-instagram': 'Instagram',
    'contact-location': 'Location',
    'contact-location-value': 'Jakarta, Indonesia',
  }
};

function switchLanguage() {
  currentLang = currentLang === 'id' ? 'en' : 'id';
  languageIcon.textContent = currentLang === 'id' ? '🇮🇩' : '🇺🇸';
  document.documentElement.lang = currentLang; // update <html lang="...">

  // Pakai innerHTML agar teks dengan markup tetap aman (jika ada)
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

  localStorage.setItem('language', currentLang);
}

// Load saved language
const savedLang = localStorage.getItem('language');
if (savedLang && savedLang !== 'id') {
  currentLang = 'id'; // Set to opposite so switchLanguage() works correctly
  switchLanguage();
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

const observer = new IntersectionObserver(function(entries) {
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
const statsObserver = new IntersectionObserver(function(entries) {
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
  btn.addEventListener('click', function() {
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
const skillsObserver = new IntersectionObserver(function(entries) {
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
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroShapes = document.querySelector('.hero-bg-shapes');
  if (heroShapes) {
    heroShapes.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', function() {
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