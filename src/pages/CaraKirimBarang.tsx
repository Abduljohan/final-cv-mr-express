import { motion } from "framer-motion";
import { ArrowRight, Package, FileText, Ship, MapPin, Phone, CheckCircle, Clock, Shield } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { Link } from "react-router-dom";


const steps = [
  { icon: Phone, title: "1. Hubungi Kami via WhatsApp", desc: "Informasikan jenis barang, berat/volume, dan kota tujuan pengiriman. Tim kami akan memberikan estimasi tarif dan jadwal keberangkatan kapal Pelni terdekat." },
  { icon: Package, title: "2. Siapkan & Kemas Barang", desc: "Kemas barang Anda dengan aman. Gunakan kardus tebal, bubble wrap, atau peti kayu untuk barang pecah belah. Pastikan label alamat tujuan terpasang jelas." },
  { icon: MapPin, title: "3. Antar ke Gudang atau Gunakan Pickup", desc: "Antar barang ke gudang CV MrExpress di Surabaya, atau gunakan layanan jemput barang (pickup) untuk area Surabaya dan sekitarnya." },
  { icon: FileText, title: "4. Proses Administrasi & Dokumen", desc: "Tim kami akan memproses surat jalan, manifest pengiriman, dan dokumen pendukung lainnya. Anda akan mendapatkan nomor resi untuk tracking." },
  { icon: Ship, title: "5. Barang Dimuat ke Kapal Pelni", desc: "Barang Anda akan dimuat ke Kapal Cepat Pelni (Kapal Putih) sesuai jadwal keberangkatan. Proses pemuatan dilakukan dengan hati-hati oleh tim profesional." },
  { icon: CheckCircle, title: "6. Barang Sampai di Tujuan", desc: "Barang akan tiba di pelabuhan tujuan sesuai estimasi waktu. Penerima bisa mengambil barang di pelabuhan atau menggunakan layanan antar lokal." },
];

const tips = [
  "Pastikan barang dikemas rapat dan kuat untuk menghindari kerusakan selama perjalanan laut.",
  "Cantumkan nama pengirim, nama penerima, dan nomor telepon yang bisa dihubungi.",
  "Hindari mengirim barang terlarang seperti bahan mudah terbakar, bahan peledak, atau narkotika.",
  "Untuk barang bernilai tinggi, kami sarankan menggunakan asuransi pengiriman.",
  "Kirim barang minimal 1-2 hari sebelum jadwal keberangkatan kapal untuk memastikan proses loading berjalan lancar.",
];

const CaraKirimBarang = () => (
  <div className="pt-24">
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="text-primary text-sm hover:underline mb-4 inline-block">← Kembali ke Beranda</Link>
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-1.5 mb-4">
            <Ship className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Artikel</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Cara Kirim Barang via Kapal Pelni dari Surabaya
          </h1>
          <p className="text-muted-foreground mt-4 leading-relaxed text-lg">
            Panduan lengkap cara mengirim barang menggunakan jasa <strong className="text-foreground">CV MrExpress</strong>, agen resmi Pelni Surabaya. Kirim barang ke Ambon, Ternate, Sorong, Jayapura, dan seluruh Indonesia Timur dengan mudah, cepat, dan aman.
          </p>
        </motion.div>

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Mengapa Memilih Kapal Pelni untuk Pengiriman Barang?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Kapal Pelni (Kapal Putih) merupakan salah satu moda transportasi laut paling efisien dan terjangkau untuk pengiriman barang ke wilayah Indonesia Timur. Dengan rute yang mencakup puluhan pelabuhan, CV MrExpress sebagai agen Pelni Surabaya menawarkan solusi pengiriman yang murah, cepat, dan aman untuk berbagai jenis barang.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Langkah-Langkah Kirim Barang via CV MrExpress</h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-white rounded-2xl p-6 hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl gradient-blue flex items-center justify-center shrink-0">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Tips Pengiriman Aman
          </h2>
          <div className="glass-white rounded-2xl p-6 space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Jenis Barang */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Jenis Barang yang Bisa Dikirim</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            CV MrExpress melayani pengiriman berbagai jenis barang melalui kapal Pelni, antara lain:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Elektronik", "Furniture", "Spare Part Motor/Mobil", "Bahan Bangunan", "Pakaian & Tekstil", "Makanan Kemasan", "Peralatan Rumah Tangga", "Mesin & Alat Berat", "Barang Dagangan"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass-blue rounded-xl px-4 py-3 text-sm font-medium text-primary text-center"
              >
                {item}
              </motion.div>
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
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Siap Kirim Barang?</h2>
          <p className="text-muted-foreground mb-6">Hubungi CV MrExpress sekarang untuk konsultasi gratis dan estimasi tarif pengiriman.</p>
          <a
            href="https://wa.me/6282336829960?text=Halo%20CV%20MrExpress%2C%20saya%20ingin%20kirim%20barang%20via%20kapal%20Pelni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-blue text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover-lift shadow-blue-lg"
          >
            Kirim Sekarang via WhatsApp
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>

        {/* Related */}
        <div className="mt-10">
          <h3 className="font-display font-bold text-foreground mb-3">Artikel Terkait</h3>
          <Link to="/estimasi-pengiriman-surabaya-papua" className="text-primary hover:underline text-sm flex items-center gap-1">
            <Clock className="h-4 w-4" /> Estimasi Pengiriman Surabaya ke Papua →
          </Link>
        </div>
      </div>
    </SectionWrapper>
  </div>
);

export default CaraKirimBarang;
