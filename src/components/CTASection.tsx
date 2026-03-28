import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTASection = () => (
  <section className="py-20">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="gradient-blue-deep rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2 mb-5">
            <MessageCircle className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Konsultasi Gratis</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Siap Kirim Barang?
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8 text-lg">
            Hubungi kami sekarang untuk konsultasi dan penawaran terbaik pengiriman via Kapal Pelni.
          </p>
          <a
            href="https://wa.me/6282336829960"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-10 py-4 rounded-2xl font-bold text-lg hover-lift shadow-blue-lg"
          >
            Kirim Sekarang via WhatsApp
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
