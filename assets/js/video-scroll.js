export function initVideoScroll() {
  const video = document.getElementById('hero-video');
  const hero = document.getElementById('home');
  if (!video || !hero) return;

  const setupScrub = () => {
    if (window.innerWidth < 768) {
      video.play();
      return;
    }

    // Use GSAP for smooth scrubbing across the entire page
    gsap.to(video, {
      currentTime: video.duration || 0,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrub with 1s delay for fluid feel
      }
    });
  };

  const showVideo = () => {
    video.pause();
    gsap.fromTo(video, { opacity: 0 }, { 
      opacity: 1, 
      duration: 1, 
      delay: 0.2,
      onComplete: setupScrub
    });
  };

  if (video.readyState >= 3) {
    showVideo();
  } else {
    video.addEventListener('loadedmetadata', () => {
      // Ensure duration is known before setup
    }, { once: true });
    
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
}
