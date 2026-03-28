import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Anchor, ShieldCheck, Clock, ChevronDown } from "lucide-react";
import logoImg from "@/assets/logo-mrexpress.png";

const badges = [
  { icon: Anchor, text: "Agen Resmi Pelni" },
  { icon: ShieldCheck, text: "Aman & Terpercaya" },
  { icon: Clock, text: "Tepat Waktu" },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Video background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/videos/hero-bg-1.mp4#t=0.5"
        >
          <source src="/videos/hero-bg-2.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: overlayOpacity,
          background: "linear-gradient(135deg, hsl(215 85% 15% / 0.9) 0%, hsl(200 85% 30% / 0.75) 50%, hsl(210 60% 20% / 0.85) 100%)",
        }}
      />
      {/* Bottom gradient for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2]"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(200 30% 97%))" }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-24 lg:pt-36">
        <div className="max-w-2xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <motion.img
              src={logoImg}
              alt="CV MR Express"
              className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] h-auto object-contain mx-auto lg:mx-0"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                filter: "drop-shadow(0 4px 20px hsl(200 85% 50% / 0.5)) drop-shadow(0 0 40px hsl(200 85% 50% / 0.2))",
                maxWidth: "450px",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 border border-white/20"
            style={{ background: "hsl(200 85% 45% / 0.15)", backdropFilter: "blur(12px)" }}
          >
            <Anchor className="h-4 w-4 text-cyan-300" />
            <span className="text-sm font-semibold text-cyan-200">Agen Pelni Surabaya</span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Spesialis melayani pengiriman barang via{" "}
            <strong className="text-white">Kapal Cepat Pelni (Kapal Putih)</strong> ke seluruh
            Indonesia Timur. Murah, cepat, dan aman.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {badges.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white/90 border border-white/10"
                style={{ background: "hsl(200 80% 40% / 0.2)", backdropFilter: "blur(8px)" }}
              >
                <b.icon className="h-4 w-4 text-cyan-300" />
                {b.text}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a
              href="https://wa.me/6282336829960"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-blue text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover-lift shadow-blue-lg text-base"
            >
              Kirim Sekarang via WhatsApp
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#rute"
              className="border-2 border-white/25 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Lihat Rute
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs text-white/40 font-body">Scroll</span>
        <ChevronDown className="h-5 w-5 text-white/40" />
      </motion.div>
    </section>
  );
};

export default Hero;
