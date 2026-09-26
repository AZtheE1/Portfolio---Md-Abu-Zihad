import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'portfolio_audio_muted';

// Global Sound Instance Registry
let soundInstances = null;

const initSounds = () => {
  if (typeof window === 'undefined' || soundInstances) return soundInstances;

  try {
    soundInstances = {
      ambientRain: new Howl({
        src: ['/assets/audios/ambient-lab.mp3'],
        loop: true,
        volume: 0.25,
        html5: true,
        autoplay: false,
      }),
      paperRustle: new Howl({
        src: ['/assets/audios/paper-rustle.mp3'],
        volume: 0.5,
      }),
      holoBeam: new Howl({
        src: ['/assets/audios/holo-beam.mp3'],
        volume: 0.4,
      }),
      switchSound: new Howl({
        src: ['/assets/audios/switch.mp3'],
        volume: 0.4,
      }),
      keystroke: new Howl({
        src: ['/assets/audios/keystroke.mp3'],
        volume: 0.35,
      }),
    };
  } catch (e) {
    console.warn('Howler audio initialization warning:', e);
  }

  return soundInstances;
};

const SOUND_ALIAS_MAP = {
  click: 'switchSound',
  hologram: 'holoBeam',
  terminal: 'switchSound',
  hover: 'paperRustle',
  keystroke: 'keystroke',
  ambientRain: 'ambientRain',
  paperRustle: 'paperRustle',
  holoBeam: 'holoBeam',
  switchSound: 'switchSound',
};

// Exportable Sound Triggers
export const playSound = (soundName) => {
  if (typeof window === 'undefined') return;
  const isMuted = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
  if (isMuted) return;

  const targetSound = SOUND_ALIAS_MAP[soundName] || soundName;
  const sounds = initSounds();
  if (sounds && sounds[targetSound]) {
    sounds[targetSound].play();
  }
};

export const playSoundEffect = (type) => playSound(type);

export const startAmbientAudio = (fadeDuration = 1500) => {
  if (typeof window === 'undefined') return;
  const isMuted = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
  const sounds = initSounds();

  if (sounds && sounds.ambientRain) {
    if (!sounds.ambientRain.playing()) {
      sounds.ambientRain.volume(0);
      sounds.ambientRain.play();
    }
    if (!isMuted) {
      sounds.ambientRain.fade(0, 0.25, fadeDuration);
    } else {
      sounds.ambientRain.mute(true);
    }
  }
};

export const stopAmbientAudio = () => {
  const sounds = initSounds();
  if (sounds && sounds.ambientRain) {
    sounds.ambientRain.stop();
  }
};

export const setGlobalMuteState = (muted) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, String(muted));
  const sounds = initSounds();

  if (sounds) {
    Object.values(sounds).forEach((snd) => {
      if (snd) snd.mute(muted);
    });
  }
};

export const AudioEngine = ({ isMuted: externalMuted, onToggleMute }) => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialMute = saved ? saved === 'true' : false;
    setMuted(initialMute);
    initSounds();
    setGlobalMuteState(initialMute);
  }, []);

  useEffect(() => {
    if (externalMuted !== undefined && externalMuted !== muted) {
      setMuted(externalMuted);
      setGlobalMuteState(externalMuted);
    }
  }, [externalMuted]);

  const handleToggle = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    setGlobalMuteState(nextMute);
    if (onToggleMute) onToggleMute(nextMute);
    if (!nextMute) {
      playSound('switchSound');
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={handleToggle}
        className={`group relative p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 flex items-center gap-2 ${
          muted
            ? 'bg-slate-900/90 border-slate-700/80 text-slate-500 hover:text-slate-300 hover:border-slate-500'
            : 'bg-slate-950/80 border-[#00FFD1]/50 text-[#00FFD1] hover:border-[#00FFD1] shadow-[0_0_15px_rgba(0,255,209,0.25)]'
        }`}
        title={muted ? 'Unmute Audio Engine' : 'Mute Audio Engine'}
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-slate-500" />
        ) : (
          <div className="flex items-end gap-0.5 h-4 px-0.5">
            <span className="w-1 bg-[#00FFD1] rounded-full animate-[soundWave_1s_ease-in-out_infinite]"></span>
            <span className="w-1 bg-[#00FFD1] rounded-full animate-[soundWave_1.2s_ease-in-out_infinite_0.2s]"></span>
            <span className="w-1 bg-[#00FFD1] rounded-full animate-[soundWave_0.8s_ease-in-out_infinite_0.4s]"></span>
            <span className="w-1 bg-[#00FFD1] rounded-full animate-[soundWave_1.1s_ease-in-out_infinite_0.1s]"></span>
          </div>
        )}
        <span className="font-mono text-[10px] tracking-wider uppercase hidden sm:inline">
          {muted ? 'AUDIO: OFF' : 'AUDIO: ON'}
        </span>
      </button>
    </div>
  );
};
