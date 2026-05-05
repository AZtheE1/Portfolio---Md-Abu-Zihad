export function initVideoScroll() {
  const video = document.getElementById('hero-video');
  const hero = document.getElementById('home');
  if (!video || !hero) return;

  video.addEventListener('canplaythrough', () => {
    video.pause();
    gsap.to(video, { opacity: 1, duration: 0.6 });
  }, { once: true });

  video.addEventListener('error', () => {
    hero.classList.add('video-failed');
    if (video.parentNode) video.parentNode.removeChild(video);
  });

  if (window.innerWidth < 768) {
    return;
  }

  let rafId;
  const loop = () => {
    const scrollProgress = Math.max(0, Math.min(1, window.scrollY / hero.offsetHeight));
    if (video.duration) {
      const newTime = scrollProgress * video.duration;
      if (Math.abs(newTime - video.currentTime) > 0.04) {
        video.currentTime = newTime;
      }
    }
    rafId = requestAnimationFrame(loop);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        rafId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(rafId);
        video.pause();
      }
    });
  });

  observer.observe(hero);
}
