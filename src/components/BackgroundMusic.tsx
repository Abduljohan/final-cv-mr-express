import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import logoImg from "@/assets/logo-mrexpress.png";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        artwork: [
          { src: "/logo-mrexpress.png", sizes: "512x512", type: "image/png" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        if (!audioRef.current) return;
        audioRef.current.muted = false;
        audioRef.current.volume = 1;
        audioRef.current.play().then(() => {
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

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("mrexpress-music", "off");
    } else {
      audioRef.current.muted = false;
      audioRef.current.volume = isMuted ? 0 : 1;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        localStorage.setItem("mrexpress-music", "on");
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.volume = newMuted ? 0 : 1;
  };

  // Equalizer bars animation
  const EqualizerBars = () => (
    <div className="flex items-end gap-[2px] h-4">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-cyan-300"
          animate={isPlaying ? {
            height: ["4px", "14px", "6px", "16px", "4px"],
          } : { height: "4px" }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed bottom-20 left-4 z-50 sm:bottom-6 sm:left-6">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative overflow-hidden rounded-[20px]"
            style={{
              background: "linear-gradient(135deg, hsl(215 85% 15%), hsl(200 85% 35%), hsl(195 100% 45%))",
              boxShadow: "0 8px 32px hsl(200 85% 45% / 0.3), 0 0 60px hsl(200 85% 45% / 0.1)",
              backdropFilter: "blur(20px)",
              width: "260px",
            }}
          >
            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-3 text-white/50 hover:text-white text-lg z-10 transition-colors"
              aria-label="Minimize player"
            >
              ×
            </button>

            {/* Cover */}
            <div className="p-4 pb-2 flex justify-center">
              <div
                className="relative w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: "hsl(200 60% 20% / 0.5)",
                  boxShadow: "0 0 30px hsl(200 85% 50% / 0.3), inset 0 0 20px hsl(200 85% 50% / 0.1)",
                }}
              >
                <img
                  src={logoImg}
                  alt="CV MR EXPRESS"
                  className="w-20 h-20 object-contain"
                  style={{
                    filter: "drop-shadow(0 2px 10px hsl(200 85% 50% / 0.5))",
                  }}
                />
              </div>
            </div>

            {/* Text */}
            <div className="px-4 text-center">
              <h3 className="text-white font-bold text-sm tracking-wide">CV MR EXPRESS</h3>
              <p className="text-cyan-200/70 text-xs mt-0.5">Agen Pelni Surabaya</p>
            </div>

            {/* Equalizer + Controls */}
            <div className="px-4 pb-4 pt-3 flex items-center justify-between">
              <EqualizerBars />

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(195 100% 45%), hsl(210 90% 55%))",
                    boxShadow: "0 4px 15px hsl(200 85% 45% / 0.4)",
                  }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 text-white" fill="white" />
                  ) : (
                    <Play className="h-4 w-4 text-white ml-0.5" fill="white" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="relative w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(215 85% 20%), hsl(200 85% 40%))",
              boxShadow: "0 4px 20px hsl(200 85% 45% / 0.35), 0 0 40px hsl(200 85% 45% / 0.15)",
            }}
            aria-label="Open music player"
          >
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid hsl(195 100% 50% / 0.4)" }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <Music className="h-5 w-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundMusic;
