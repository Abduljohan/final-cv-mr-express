import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from "react";

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  isMuted: false,
  togglePlay: () => {},
  toggleMute: () => {},
});

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/bgmusic.mp3");
    audio.loop = true;
    audio.volume = 1;
    audio.preload = "auto";
    audioRef.current = audio;

    const startMusic = () => {
      if (audioRef.current && !hasInteractedRef.current) {
        hasInteractedRef.current = true;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          localStorage.setItem("mrexpress-music", "on");
        }).catch(() => {});
      }
    };

    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("touchstart", startMusic, { once: true });

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "CV MR EXPRESS",
        artist: "Agen Pelni Surabaya",
        album: "Background Music",
        artwork: [{ src: "/logo-mrexpress.png", sizes: "512x512", type: "image/png" }],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current?.play().then(() => {
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
      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("mrexpress-music", "off");
    } else {
      audioRef.current.volume = isMuted ? 0 : 1;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        localStorage.setItem("mrexpress-music", "on");
      }).catch(() => {});
    }
  }, [isPlaying, isMuted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.volume = newMuted ? 0 : 1;
  }, [isMuted]);

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, togglePlay, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
};
