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
    
    setTimeout(() => {
      if (parseFloat(window.getComputedStyle(video).opacity) === 0) {
        showVideo();
      }
    }, 800);
  }

  video.addEventListener('error', () => {
    hero.classList.add('video-failed');
    if (video.parentNode) video.parentNode.removeChild(video);
  });

  if (window.innerWidth < 768) {
    video.play();
    return;
  }

  const loop = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    
    if (video.duration) {
      const newTime = scrollProgress * video.duration;
      if (Math.abs(newTime - video.currentTime) > 0.04) {
        video.currentTime = newTime;
      }
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
