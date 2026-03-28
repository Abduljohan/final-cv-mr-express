import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from "react";

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  setVolume: (v: number) => void;
  togglePlay: () => void;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  isMuted: false,
  volume: 50,
  setVolume: () => {},
  togglePlay: () => {},
  toggleMute: () => {},
});

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bassRef = useRef<BiquadFilterNode | null>(null);
  const trebleRef = useRef<BiquadFilterNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const stereoRef = useRef<StereoPannerNode | null>(null);
  const hasInteractedRef = useRef(false);
  const audioInitRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(50); // 0-100, default 50%

  const initAudioContext = useCallback(() => {
    if (audioInitRef.current || !audioRef.current) return;

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaElementSource(audioRef.current);

      // Bass boost: low shelf at 150Hz, +6dB
      const bass = ctx.createBiquadFilter();
      bass.type = "lowshelf";
      bass.frequency.value = 150;
      bass.gain.value = 6;
      bassRef.current = bass;

      // Treble boost: high shelf at 4kHz, +3dB
      const treble = ctx.createBiquadFilter();
      treble.type = "highshelf";
      treble.frequency.value = 4000;
      treble.gain.value = 3;
      trebleRef.current = treble;

      // Compressor/limiter to prevent clipping
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -6;
      compressor.knee.value = 6;
      compressor.ratio.value = 12;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.15;
      compressorRef.current = compressor;

      // Gain node for volume boost (1.0 - 2.5)
      const gain = ctx.createGain();
      gain.gain.value = 0; // start at 0 for fade-in
      gainRef.current = gain;

      // Stereo widener via slight pan oscillation (subtle)
      const stereo = ctx.createStereoPanner();
      stereo.pan.value = 0;
      stereoRef.current = stereo;

      // Chain: source → bass → treble → compressor → gain → stereo → destination
      source.connect(bass);
      bass.connect(treble);
      treble.connect(compressor);
      compressor.connect(gain);
      gain.connect(stereo);
      stereo.connect(ctx.destination);

      // Subtle stereo widening animation
      const widenStereo = () => {
        if (!stereoRef.current || !audioCtxRef.current) return;
        const t = audioCtxRef.current.currentTime;
        stereoRef.current.pan.setValueAtTime(0, t);
        stereoRef.current.pan.linearRampToValueAtTime(0.15, t + 2);
        stereoRef.current.pan.linearRampToValueAtTime(-0.15, t + 4);
        stereoRef.current.pan.linearRampToValueAtTime(0, t + 6);
      };
      const stereoInterval = setInterval(widenStereo, 6000);
      widenStereo();

      audioInitRef.current = true;

      // Apply current volume
      applyVolume(volume);

      return () => clearInterval(stereoInterval);
    } catch {
      // Fallback: Web Audio API not supported, just use HTML5 audio volume
      console.warn("Web Audio API not available, using fallback");
    }
  }, [volume]);

  // Convert 0-100 volume to gain value (0 to 2.0) with fade
  const applyVolume = useCallback((vol: number) => {
    const normalizedGain = (vol / 100) * 2.0; // max gain 2.0

    if (gainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      gainRef.current.gain.cancelScheduledValues(now);
      gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, now);
      gainRef.current.gain.linearRampToValueAtTime(normalizedGain, now + 0.3);
    } else if (audioRef.current) {
      // Fallback
      audioRef.current.volume = Math.min(vol / 100, 1);
    }
  }, []);

  const fadeIn = useCallback(() => {
    if (gainRef.current && audioCtxRef.current) {
      const targetGain = (volume / 100) * 2.0;
      const now = audioCtxRef.current.currentTime;
      gainRef.current.gain.cancelScheduledValues(now);
      gainRef.current.gain.setValueAtTime(0, now);
      gainRef.current.gain.linearRampToValueAtTime(targetGain, now + 1.5);
    } else if (audioRef.current) {
      audioRef.current.volume = 0;
      let v = 0;
      const interval = setInterval(() => {
        v += 0.05;
        if (v >= Math.min(volume / 100, 1)) {
          audioRef.current!.volume = Math.min(volume / 100, 1);
          clearInterval(interval);
        } else {
          audioRef.current!.volume = v;
        }
      }, 75);
    }
  }, [volume]);

  useEffect(() => {
    const audio = new Audio("/audio/bgmusic.mp3");
    audio.loop = true;
    audio.volume = 1;
    audio.preload = "auto";
    audioRef.current = audio;

    const startMusic = () => {
      if (!audioRef.current || hasInteractedRef.current) return;
      hasInteractedRef.current = true;

      // Try Web Audio API enhancement
      try {
        initAudioContext();
      } catch (e) {
        console.warn("Web Audio init failed, using fallback", e);
      }

      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }

      audioRef.current.play().then(() => {
        fadeIn();
        setIsPlaying(true);
        localStorage.setItem("mrexpress-music", "on");
      }).catch((err) => {
        console.warn("Audio play failed:", err);
      });
    };

    const handleInteraction = () => startMusic();

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "CV MR EXPRESS",
        artist: "Agen Pelni Surabaya",
        album: "Background Music",
        artwork: [{ src: "/logo-mrexpress.png", sizes: "512x512", type: "image/png" }],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume().catch(() => {});
        audioRef.current?.play().then(() => {
          fadeIn();
          setIsPlaying(true);
          localStorage.setItem("mrexpress-music", "on");
        }).catch(() => {});
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.pause();
        setIsPlaying(false);
        localStorage.setItem("mrexpress-music", "off");
      });
    }

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      audio.pause();
      audio.src = "";
      audioCtxRef.current?.close();
    };
  }, [initAudioContext, fadeIn]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(100, v));
    setVolumeState(clamped);
    if (!isMuted) applyVolume(clamped);
  }, [isMuted, applyVolume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("mrexpress-music", "off");
    } else {
      if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
      audioRef.current.play().then(() => {
        fadeIn();
        setIsPlaying(true);
        localStorage.setItem("mrexpress-music", "on");
      }).catch(() => {});
    }
  }, [isPlaying, fadeIn]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (newMuted) {
      applyVolume(0);
    } else {
      applyVolume(volume);
    }
  }, [isMuted, volume, applyVolume]);

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, volume, setVolume, togglePlay, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
};
