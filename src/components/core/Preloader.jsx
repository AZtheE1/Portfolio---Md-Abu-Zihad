import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playSound, startAmbientAudio } from './AudioEngine';

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [statusText, setStatusText] = useState('INITIALIZING SPATIAL CORE...');

  const backdropRef = useRef(null);
  const avatarRef = useRef(null);
  const videoRef = useRef(null);

  // Asset preloading simulation & actual video buffer tracking
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
        setStatusText('SYSTEM PRELOAD COMPLETE. BOOTING LAB...');
        setIsReady(true);
      } else {
        setProgress(currentProgress);
        if (currentProgress > 30 && currentProgress < 60) {
          setStatusText('PRELOADING 2.5D ASSETS & SHADERS...');
        } else if (currentProgress >= 60) {
          setStatusText('SYNCHRONIZING AUDIO ENGINE & TIMELINES...');
        }
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Exit sequence animation when preloader hits 100%
  useEffect(() => {
    if (isReady) {
      playSound('holoBeam');

      const tl = gsap.timeline({
        onComplete: () => {
          // Fade in ambient audio over 1.5 seconds
          startAmbientAudio(1500);
          // Unmount preloader from DOM
          if (onComplete) onComplete();
        },
      });

      // Step 1: Avatar walks off toward the left screen margin (xPercent: -150)
      tl.to(avatarRef.current, {
        xPercent: -150,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      })
      // Step 2: White backdrop clips horizontally like a sliding lab shutter
      .to(
        backdropRef.current,
        {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          duration: 1.0,
          ease: 'power3.inOut',
        },
        '-=0.4'
      );
    }
  }, [isReady, onComplete]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 bg-[#FAFAFA] text-slate-900 font-mono flex flex-col items-center justify-center p-6 select-none overflow-hidden"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Background Subtle Lab Shutter Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 pointer-events-none"></div>

      {/* Central Node: Avatar Video Player */}
      <div ref={avatarRef} className="relative flex flex-col items-center max-w-md w-full">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden mb-6 flex items-center justify-center">
          <video
            ref={videoRef}
            src="/assets/avatar/welcome-wave.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          />
          {/* Neon Teal Overlay Pulse Border */}
          <div className="absolute inset-0 rounded-3xl border-2 border-[#008080]/30 pointer-events-none"></div>
        </div>

        {/* Micro-Interaction: Technical Progress Counter & Status */}
        <div className="w-full space-y-3 text-center">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
            <span className="tracking-widest uppercase">LAB_PRELOADER // SYS_BUILD</span>
            <span className="text-[#008080] font-mono text-sm">{progress}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden p-0.5 border border-slate-300">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#008080] to-[#00FFD1] transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-[11px] text-slate-500 tracking-wider font-mono h-4">
            {statusText}
          </p>
        </div>
      </div>

      {/* Bottom Technical Telemetry Footer */}
      <div className="absolute bottom-6 inset-x-6 flex justify-between items-center text-[10px] text-slate-400 font-mono">
        <span>ZIHAD.ARCH // STERILE_LAB_PRELOADER</span>
        <span>LATENCY: &lt;1ms</span>
      </div>
    </div>
  );
};
