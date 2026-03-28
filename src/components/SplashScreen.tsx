import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-mrexpress.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step + Math.random() * 1.5, 100);
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setIsExiting(true), 400);
      return () => clearTimeout(t);
    }
  }, [progress]);

  useEffect(() => {
    if (isExiting) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [isExiting, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(135deg, hsl(215 85% 18%) 0%, hsl(200 85% 35%) 50%, hsl(185 80% 50%) 100%)",
          }}
        >
          {/* Wave pattern background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
              <motion.path
                d="M0,400 C360,300 720,500 1440,350 L1440,800 L0,800 Z"
                fill="white"
                initial={{ d: "M0,400 C360,300 720,500 1440,350 L1440,800 L0,800 Z" }}
                animate={{ d: "M0,380 C360,480 720,320 1440,400 L1440,800 L0,800 Z" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              <motion.path
                d="M0,500 C360,450 720,550 1440,480 L1440,800 L0,800 Z"
                fill="white"
                opacity="0.5"
                initial={{ d: "M0,500 C360,450 720,550 1440,480 L1440,800 L0,800 Z" }}
                animate={{ d: "M0,520 C360,570 720,440 1440,510 L1440,800 L0,800 Z" }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Floating ship icon */}
          <motion.div
            className="absolute bottom-32 opacity-20 text-white"
            animate={{ x: ["-10%", "110%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <svg width="80" height="40" viewBox="0 0 80 40" fill="currentColor">
              <path d="M5,30 L15,10 L65,10 L75,30 Z" />
              <rect x="25" y="2" width="8" height="8" rx="1" />
              <rect x="38" y="4" width="6" height="6" rx="1" />
              <path d="M0,32 Q40,38 80,32" strokeWidth="2" stroke="currentColor" fill="none" />
            </svg>
          </motion.div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src={logoImg}
                alt="CV MR Express"
                className="h-16 sm:h-20 mb-4 drop-shadow-lg"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide mb-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              CV MR EXPRESS
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base text-white/70 font-body mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Agen Pelni Surabaya
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="w-56 sm:w-72 h-2 rounded-full overflow-hidden bg-white/15 backdrop-blur-sm"
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              style={{ boxShadow: "0 0 20px hsl(200 85% 50% / 0.3)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, hsl(185 80% 60%), hsl(200 90% 70%), white)",
                  boxShadow: "0 0 12px hsl(185 80% 60% / 0.6)",
                  transition: "width 0.1s ease-out",
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="mt-5 text-xs sm:text-sm text-white/50 font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
            >
              Menyiapkan pengiriman terbaik untuk Anda...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
