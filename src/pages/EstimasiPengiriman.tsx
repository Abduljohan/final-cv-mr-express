import { motion } from "framer-motion";
import { ArrowRight, Ship, Clock, MapPin, Anchor, Shield, CheckCircle } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { Link } from "react-router-dom";

const routes = [
  { city: "Ambon", days: "4 Hari", distance: "~2.200 km", port: "Pelabuhan Yos Sudarso" },
  { city: "Tual", days: "4 Hari", distance: "~2.400 km", port: "Pelabuhan Tual" },
  { city: "Ternate", days: "5 Hari", distance: "~2.500 km", port: "Pelabuhan Ahmad Yani" },
  { city: "Kaimana", days: "5 Hari", distance: "~2.700 km", port: "Pelabuhan Kaimana" },
  { city: "Sorong", days: "5 Hari", distance: "~3.000 km", port: "Pelabuhan Sorong" },
  { city: "Fak-Fak", days: "6 Hari", distance: "~2.800 km", port: "Pelabuhan Fak-Fak" },
  { city: "Manokwari", days: "6 Hari", distance: "~3.200 km", port: "Pelabuhan Manokwari" },
  { city: "Nabire", days: "6 Hari", distance: "~3.400 km", port: "Pelabuhan Nabire" },
  { city: "Wasior", days: "6 Hari", distance: "~3.300 km", port: "Pelabuhan Wasior" },
  { city: "Serui", days: "6 Hari", distance: "~3.500 km", port: "Pelabuhan Serui" },
  { city: "Jayapura", days: "7 Hari", distance: "~4.000 km", port: "Pelabuhan Jayapura" },
];

const factors = [
  { icon: Ship, title: "Jadwal Kapal", desc: "Jadwal keberangkatan kapal Pelni bervariasi. Kapal Cepat (Kapal Putih) memiliki jadwal tetap setiap minggu dengan waktu tempuh lebih singkat." },
  { icon: MapPin, title: "Rute & Transit", desc: "Beberapa tujuan memerlukan transit di pelabuhan antara. Rute langsung seperti Surabaya–Makassar lebih cepat dibanding rute dengan banyak pemberhentian." },
  { icon: Clock, title: "Cuaca & Kondisi Laut", desc: "Cuaca buruk atau gelombang tinggi dapat memengaruhi jadwal dan waktu tempuh. Musim hujan biasanya menyebabkan sedikit keterlambatan." },
  { icon: Shield, title: "Proses Bongkar Muat", desc: "Waktu bongkar muat di pelabuhan tujuan juga memengaruhi total waktu pengiriman. Pelabuhan sibuk mungkin membutuhkan waktu lebih lama." },
];

const EstimasiPengiriman = () => (
  <div className="pt-24">
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="text-primary text-sm hover:underline mb-4 inline-block">← Kembali ke Beranda</Link>
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-1.5 mb-4">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Artikel</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Estimasi Pengiriman Surabaya ke Papua & Indonesia Timur
          </h1>
          <p className="text-muted-foreground mt-4 leading-relaxed text-lg">
            Informasi lengkap estimasi waktu pengiriman barang dari Surabaya ke berbagai kota di Papua dan Indonesia Timur melalui <strong className="text-foreground">CV MrExpress</strong>, agen resmi Pelni Surabaya.
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Berapa Lama Pengiriman dari Surabaya?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Estimasi waktu pengiriman dari Surabaya ke Indonesia Timur melalui kapal Pelni bervariasi antara <strong className="text-foreground">2 hingga 8 hari</strong>, tergantung kota tujuan, jadwal kapal, dan kondisi cuaca. CV MrExpress menggunakan Kapal Cepat Pelni (Kapal Putih) yang memiliki waktu tempuh lebih singkat dibanding kapal cargo biasa.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Tabel Estimasi Waktu Pengiriman</h2>
          <div className="glass-white rounded-2xl overflow-hidden shadow-blue">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="gradient-blue text-primary-foreground">
                    <th className="px-5 py-3 text-left font-semibold">Kota Tujuan</th>
                    <th className="px-5 py-3 text-left font-semibold">Estimasi</th>
                    <th className="px-5 py-3 text-left font-semibold hidden md:table-cell">Jarak</th>
                    <th className="px-5 py-3 text-left font-semibold hidden lg:table-cell">Pelabuhan</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((r, i) => (
                    <motion.tr
                      key={r.city}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/30"}`}
                    >
                      <td className="px-5 py-3 font-medium text-foreground flex items-center gap-2">
                        <Anchor className="h-4 w-4 text-primary shrink-0" />
                        {r.city}
                      </td>
                      <td className="px-5 py-3 text-primary font-semibold">{r.days}</td>
                      <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{r.distance}</td>
                      <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">{r.port}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">* Estimasi waktu dapat berubah tergantung jadwal kapal dan kondisi cuaca.</p>
        </motion.div>

        {/* Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Faktor yang Mempengaruhi Waktu Pengiriman</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {factors.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-white rounded-2xl p-6 hover-lift"
              >
                <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center mb-3">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Keunggulan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Kenapa Pilih CV MrExpress?</h2>
          <div className="glass-white rounded-2xl p-6 space-y-3">
            {[
              "Agen resmi Pelni Surabaya — terpercaya dan legal",
              "Harga kompetitif dan transparan, tanpa biaya tersembunyi",
              "Pengiriman via Kapal Cepat Pelni (Kapal Putih) yang lebih cepat",
              "Layanan pickup gratis area Surabaya dan sekitarnya",
              "Tracking pengiriman real-time via WhatsApp",
              "Tim profesional dan berpengalaman di bidang logistik kapal",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-white rounded-3xl p-8 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Cek Tarif & Jadwal Pengiriman</h2>
          <p className="text-muted-foreground mb-6">Hubungi CV MrExpress untuk informasi tarif terbaru dan jadwal keberangkatan kapal.</p>
          <a
            href="https://wa.me/6282336829960?text=Halo%20CV%20MrExpress%2C%20saya%20ingin%20tahu%20estimasi%20pengiriman%20ke%20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-blue text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover-lift shadow-blue-lg"
          >
            Tanya Estimasi via WhatsApp
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>

        {/* Related */}
        <div className="mt-10">
          <h3 className="font-display font-bold text-foreground mb-3">Artikel Terkait</h3>
          <Link to="/cara-kirim-barang-pelni" className="text-primary hover:underline text-sm flex items-center gap-1">
            <Ship className="h-4 w-4" /> Cara Kirim Barang via Kapal Pelni dari Surabaya →
          </Link>
        </div>
      </div>
    </SectionWrapper>
  </div>
);

export default EstimasiPengiriman;
