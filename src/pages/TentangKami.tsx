import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Target, Eye, Users, Award, Anchor, Ship } from "lucide-react";

const values = [
  { icon: Target, title: "Misi Kami", desc: "Memberikan layanan pengiriman barang via kapal Pelni yang murah, cepat, dan aman ke seluruh Indonesia." },
  { icon: Eye, title: "Visi Kami", desc: "Menjadi agen ekspedisi Pelni terdepan dan terpercaya di Surabaya dan Indonesia." },
  { icon: Users, title: "Tim Profesional", desc: "Didukung tim berpengalaman dalam logistik kapal yang siap melayani dengan sepenuh hati." },
  { icon: Award, title: "Komitmen Kualitas", desc: "Kami berkomitmen menjaga keamanan dan ketepatan waktu setiap pengiriman." },
];

const TentangKami = () => (
  <div className="pt-24">
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-4">
            <Anchor className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Tentang Kami</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            CV. <span className="text-gradient-blue">MR</span> EXPRESS
          </h1>
          <p className="text-lg text-muted-foreground mt-5 leading-relaxed">
            CV MR Express adalah agen resmi Pelni di Surabaya yang spesialis melayani pengiriman barang via Kapal Cepat Pelni (Kapal Putih) ke seluruh Indonesia Timur.
          </p>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Berdiri dengan semangat memberikan layanan logistik terbaik, kami hadir untuk menjadi mitra terpercaya dalam setiap kebutuhan pengiriman Anda dengan harga bersahabat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-blue-lg"
        >
          <div className="absolute -inset-4 gradient-blue rounded-3xl opacity-10 blur-xl" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-[4/3] object-cover rounded-3xl relative z-10"
          >
            <source src="/videos/hero-bg-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 rounded-3xl" style={{ background: "linear-gradient(135deg, hsl(215 85% 15% / 0.3), hsl(200 85% 30% / 0.15))" }} />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-4 z-20 glass-white rounded-2xl p-4 shadow-blue flex items-center gap-3"
          >
            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
              <Ship className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display font-bold text-foreground text-sm">Agen Resmi</div>
              <div className="text-xs text-muted-foreground">Pelni Surabaya</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="gradient-light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-white rounded-3xl p-8 hover-lift"
          >
            <div className="w-12 h-12 rounded-2xl gradient-blue flex items-center justify-center mb-4">
              <v.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{v.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  </div>
);

export default TentangKami;
