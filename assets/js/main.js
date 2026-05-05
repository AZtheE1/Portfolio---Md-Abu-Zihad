import { initVideoScroll } from './video-scroll.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initCursor } from './cursor.js';

document.addEventListener('DOMContentLoaded', () => {
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      autoRaf: false,
    });
  } catch (e) {
    console.error('Lenis initialization failed:', e);
  }

  initCursor();
  initVideoScroll();
  initScrollAnimations(lenis);

  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
    });
  }

  // Active nav links
  const sections = document.querySelectorAll('section, #home');
  const navLinks = document.querySelectorAll('nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: [0.3, 0.5] });

  sections.forEach(section => observer.observe(section));

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navUl.classList.toggle('open');
      document.body.style.overflow = hamburger.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navUl.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navUl.contains(e.target) && navUl.classList.contains('open')) {
        hamburger.classList.remove('open');
        navUl.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navUl.classList.contains('open')) {
        hamburger.classList.remove('open');
        navUl.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Form submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;
      const messageDiv = form.querySelector('.form-message');
      
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const subject = formData.get('subject') || '';
      const message = formData.get('message') || '';
      
      btn.textContent = 'Opening Mail...';
      btn.disabled = true;

      // Real mailto functionality
      setTimeout(() => {
        const mailtoLink = `mailto:azihad783@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\n\n' + message)}`;
        window.location.href = mailtoLink;
        
        messageDiv.textContent = 'Mail client opened!';
        messageDiv.style.color = 'var(--teal)';
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        setTimeout(() => messageDiv.textContent = '', 5000);
      }, 500);
    });
  }

  // Smooth anchor scrolls
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Current year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
