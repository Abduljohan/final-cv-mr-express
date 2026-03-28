import { DollarSign, Zap, ShieldCheck, Headphones, Truck, Clock } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

const features = [
  { icon: DollarSign, title: "Harga Murah", desc: "Tarif bersahabat untuk semua jenis pengiriman barang." },
  { icon: Zap, title: "Pengiriman Cepat", desc: "Via kapal cepat Pelni dengan estimasi waktu terbaik." },
  { icon: ShieldCheck, title: "Aman & Amanah", desc: "Barang dijamin aman dengan penanganan profesional." },
  { icon: Clock, title: "Tepat Waktu", desc: "Komitmen pengiriman sesuai estimasi yang dijanjikan." },
  { icon: Truck, title: "Jemput di Lokasi", desc: "Layanan penjemputan barang langsung ke alamat Anda." },
  { icon: Headphones, title: "Layanan Responsif", desc: "Tim siap membantu via WhatsApp kapan saja." },
];

const Keunggulan = () => (
  <SectionWrapper>
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-4"
      >
        <ShieldCheck className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-primary">Keunggulan</span>
      </motion.div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
        Kenapa Pilih <span className="text-gradient-blue">MR Express?</span>
      </h2>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Murah, cepat, dan aman — tiga pilar layanan kami untuk kepuasan pelanggan.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="group glass-white rounded-3xl p-7 hover-lift"
        >
          <div className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center mb-5 group-hover:shadow-blue-lg transition-shadow">
            <f.icon className="h-7 w-7 text-primary-foreground" />
          </div>
          <h3 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default Keunggulan;
