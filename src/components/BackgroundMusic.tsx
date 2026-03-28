import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/audio/bgmusic.mp3");
    audio.loop = true;
    audio.volume = 1;
    audio.muted = false;
    audio.preload = "auto";
    audioRef.current = audio;

    const startMusic = () => {
      if (audioRef.current && !hasInteractedRef.current) {
        hasInteractedRef.current = true;
        audioRef.current.muted = false;
        audioRef.current.volume = 1;
        audioRef.current.play().then(() => {
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
        artwork: [
          { src: "/logo-mrexpress.png", sizes: "512x512", type: "image/png" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        if (!audioRef.current) return;
        audioRef.current.muted = false;
        audioRef.current.volume = 1;
        audioRef.current.play().then(() => {
          localStorage.setItem("mrexpress-music", "on");
        }).catch(() => {});
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.pause();
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

  return null;
};

export default BackgroundMusic;
