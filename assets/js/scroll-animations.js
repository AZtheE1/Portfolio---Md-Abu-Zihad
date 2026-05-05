export function initScrollAnimations(lenis) {
  gsap.registerPlugin(ScrollTrigger);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000) });
  gsap.ticker.lagSmoothing(0);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(100);
    return;
  }

  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const progressEl = document.getElementById('scroll-progress');
      if (progressEl) progressEl.style.width = (self.progress * 100) + '%';
    }
  });

  // Hero Entrance
  const heroTl = gsap.timeline({ delay: 0.5 });
  heroTl.from('.available-badge', { opacity: 0, y: 20, duration: 0.6 })
        .from('.hero-name', { opacity: 0, y: 30, duration: 0.6 }, "-=0.3")
        .from('.hero-role', { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from('.hero-bio', { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
        .from('.stats-row .stat', { opacity: 0, x: -20, stagger: 0.1, duration: 0.5 }, "-=0.2")
        .from('.tech-pills .pill', { opacity: 0, scale: 0.8, stagger: 0.05, duration: 0.4 }, "-=0.2")
        .from('.hero-cta a, .hero-cta button', { opacity: 0, y: 20, scale: 0.95, stagger: 0.1, duration: 0.5 }, "-=0.2")
        .from('.profile-ring', { opacity: 0, scale: 0.9, duration: 0.8 }, "-=1")
        .from('.info-card', { opacity: 0, x: 20, stagger: 0.12, duration: 0.5 }, "-=0.6");

  // Skills
  gsap.from('#skills .section-header', {
    opacity: 0, y: 30,
    scrollTrigger: { trigger: '#skills', start: 'top 85%' }
  });

  gsap.from('.skill-card', {
    opacity: 0, y: 40, stagger: 0.07,
    scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' }
  });

  // Projects
  gsap.from('.featured-project', {
    opacity: 0, y: 50, duration: 0.7,
    scrollTrigger: { trigger: '.featured-project', start: 'top 85%' }
  });

  gsap.from('.project-card', {
    opacity: 0, y: 35, rotateX: 3, stagger: 0.1,
    scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' }
  });

  // 3D Tilt
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, { rotateY: dx * 0.03, rotateX: -dy * 0.03, duration: 0.4 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5 });
    });
  });

  // Timeline
  document.querySelectorAll('.timeline').forEach(timeline => {
    gsap.to(timeline.querySelector('.timeline-line'), {
      scaleY: 1,
      scrollTrigger: { trigger: timeline, scrub: 1, start: 'top 80%', end: 'bottom 20%' }
    });

    gsap.from(timeline.querySelectorAll('.timeline-item'), {
      opacity: 0, x: -30, stagger: 0.2,
      scrollTrigger: { trigger: timeline, start: 'top 80%' }
    });

    gsap.from(timeline.querySelectorAll('.timeline-dot'), {
      scale: 0, opacity: 0, stagger: 0.2, duration: 0.6, ease: "elastic.out(1, 0.3)",
      scrollTrigger: { trigger: timeline, start: 'top 80%' }
    });
  });
  
  // Contact
  gsap.from('.contact-left', {
    opacity: 0, x: -40, duration: 0.6,
    scrollTrigger: { trigger: '#contact', start: 'top 80%' }
  });
  gsap.from('.contact-form-wrapper', {
    opacity: 0, x: 40, duration: 0.6,
    scrollTrigger: { trigger: '#contact', start: 'top 80%' }
  });

  // Parallax
  gsap.to('.hero-overlay', {
    y: 60, ease: 'none',
    scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.bg-shape-1', {
    y: -50, ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true }
  });
  gsap.to('.bg-shape-2', {
    y: -80, ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true }
  });

  // Typing effect
  const roles = ["Full-Stack Developer", "Software Engineer", "React & NestJS Expert"];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const roleTextEl = document.getElementById('role-text');

  function typeRole() {
    if(!roleTextEl) return;
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      roleTextEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      roleTextEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeRole, typeSpeed);
  }
  setTimeout(typeRole, 1000);
}
