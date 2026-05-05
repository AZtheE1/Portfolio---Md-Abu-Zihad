import { calculateScrollProgress } from './utils.js';

export function initVideoScroll() {
  const video = document.getElementById('hero-video');
  const hero = document.getElementById('home');
  if (!video || !hero) return;

  const showVideo = () => {
    video.pause();
    gsap.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.2 });
  };

  if (video.readyState >= 3) {
    showVideo();
  } else {
    video.addEventListener('loadeddata', showVideo, { once: true });
    video.addEventListener('canplaythrough', showVideo, { once: true });
  }

  video.addEventListener('error', () => {
    hero.classList.add('video-failed');
    if (video.parentNode) video.parentNode.removeChild(video);
  });

  if (window.innerWidth < 768) {
    return;
  }

  let rafId;
  const loop = () => {
    const scrollProgress = calculateScrollProgress(window.scrollY, hero.offsetHeight);
    if (video.duration) {
      const newTime = scrollProgress * video.duration;
      if (Math.abs(newTime - video.currentTime) > 0.04) {
        video.currentTime = newTime;
      }
    }
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);

  gsap.to('#hero-video', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'bottom 60%',
      end: 'bottom top',
      scrub: true,
    }
  });
}
