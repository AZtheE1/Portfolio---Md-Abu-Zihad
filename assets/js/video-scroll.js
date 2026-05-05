export function initVideoScroll() {
  const video = document.getElementById('hero-video');
  const hero = document.getElementById('home');
  if (!video || !hero) return;

  const setupScrub = () => {
    if (window.innerWidth < 768) {
      video.play();
      return;
    }

    // Direct ScrollTrigger update for maximum responsiveness
    // This avoids the "tweening" overhead and updates frames as fast as the browser allows
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (video.duration && !isNaN(video.duration)) {
          video.currentTime = self.progress * video.duration;
        }
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

  if (video.readyState >= 2) { // 2 = HAVE_CURRENT_DATA, enough to show first frame
    showVideo();
  } else {
    video.addEventListener('loadedmetadata', () => {
      // Metadata is enough to know duration
    }, { once: true });
    
    video.addEventListener('loadeddata', showVideo, { once: true });
    
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
