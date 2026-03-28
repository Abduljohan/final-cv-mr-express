import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

const faqs = [
  { q: "Apa itu layanan CV MR Express?", a: "CV MR Express adalah agen resmi Pelni di Surabaya yang melayani pengiriman barang via Kapal Cepat Pelni (Kapal Putih) ke seluruh Indonesia Timur dengan harga terjangkau, cepat, dan aman." },
  { q: "Berapa lama estimasi pengiriman?", a: "Estimasi pengiriman bervariasi tergantung tujuan, mulai dari 2 hari (Makassar) hingga 7 hari (Jayapura). Jadwal keberangkatan mengikuti jadwal kapal Pelni." },
  { q: "Apakah barang saya aman selama pengiriman?", a: "Ya, kami menjamin keamanan barang Anda. Setiap barang dikemas dengan baik, diasuransikan, dan dipantau hingga sampai tujuan. Kami bertanggung jawab penuh atas keselamatan kiriman." },
  { q: "Bagaimana cara mengirim barang melalui CV MR Express?", a: "Cukup hubungi kami via WhatsApp, informasikan detail barang (jenis, berat, tujuan), lalu antar barang ke gudang kami atau gunakan layanan pickup. Kami yang urus sisanya!" },
  { q: "Apakah tersedia layanan pickup / jemput barang?", a: "Ya, kami menyediakan layanan pickup untuk area Surabaya dan sekitarnya. Hubungi kami untuk mengatur jadwal penjemputan barang Anda." },
  { q: "Bagaimana cara cek tarif pengiriman?", a: "Anda bisa menghubungi kami langsung via WhatsApp untuk mendapatkan estimasi tarif berdasarkan berat, volume, dan tujuan pengiriman. Kami memberikan harga terbaik dan transparan." },
  { q: "Kemana saja area layanan pengiriman?", a: "Kami melayani pengiriman ke seluruh Indonesia Timur termasuk Makassar, Ambon, Sorong, Jayapura, Manokwari, Nabire, Serui, Fak-Fak, Kaimana, Timika, Merauke, dan kota lainnya." },
  { q: "Kapan jam operasional CV MR Express?", a: "Kami buka Senin–Sabtu pukul 08:00–17:00 WIB. Minggu dan hari libur nasional tutup. Untuk pertanyaan di luar jam kerja, silakan kirim pesan WhatsApp dan kami akan balas saat jam operasional." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SectionWrapper id="faq">
      <div className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-semibold text-primary glass-blue rounded-full px-4 py-1.5 mb-4"
        >
          FAQ
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground"
        >
          Pertanyaan yang Sering Diajukan
        </motion.h2>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="max-w-xl mx-auto mb-8 relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari pertanyaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow text-sm"
        />
      </motion.div>

      {/* Accordion */}
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {filtered.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl overflow-hidden transition-shadow duration-300 ${
                isOpen
                  ? "glass-white shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.3)] ring-1 ring-primary/10"
                  : "glass-white shadow-blue"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 md:py-5 text-left gap-3 group"
              >
                <span className="font-display font-semibold text-foreground text-sm md:text-base">
                  {faq.q}
                </span>
                <motion.span
                  className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full gradient-blue flex items-center justify-center text-primary-foreground shadow-blue cursor-pointer"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ scale: 1.12, boxShadow: "0 0 16px hsl(var(--primary) / 0.4)" }}
                  whileTap={{ scale: 0.92 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8 text-sm">
            Tidak ada hasil ditemukan untuk "{search}"
          </p>
        )}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <p className="text-muted-foreground mb-4">Masih ada pertanyaan?</p>
        <a
          href="https://wa.me/6282336829960"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 gradient-blue text-primary-foreground px-7 py-3.5 rounded-2xl font-semibold hover-lift shadow-blue-lg text-sm"
        >
          <MessageCircle className="h-5 w-5" />
          Hubungi Kami via WhatsApp
        </a>
      </motion.div>
    </SectionWrapper>
  );
};

export default FAQ;
