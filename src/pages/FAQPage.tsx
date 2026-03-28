import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle, Ship, Clock, Package, Shield, CreditCard, MapPin, HelpCircle } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

const categories = [
  { id: "semua", label: "Semua", icon: HelpCircle },
  { id: "umum", label: "Umum", icon: HelpCircle },
  { id: "pengiriman", label: "Pengiriman", icon: Package },
  { id: "tarif", label: "Tarif & Pembayaran", icon: CreditCard },
  { id: "rute", label: "Rute & Estimasi", icon: MapPin },
  { id: "keamanan", label: "Keamanan", icon: Shield },
  { id: "kapal", label: "Kapal Pelni", icon: Ship },
];

const faqs = [
  // Umum
  { category: "umum", q: "Apa itu layanan CV MR Express?", a: "CV MR Express adalah agen resmi Pelni di Surabaya yang melayani pengiriman barang via Kapal Cepat Pelni (Kapal Putih) ke seluruh Indonesia Timur dengan harga terjangkau, cepat, dan aman." },
  { category: "umum", q: "Apakah CV MR Express adalah agen resmi Pelni?", a: "Ya, CV MR Express adalah agen resmi yang terdaftar dan berizin untuk melayani pengiriman barang melalui kapal Pelni dari Surabaya." },
  { category: "umum", q: "Kapan jam operasional CV MR Express?", a: "Kami buka Senin–Sabtu pukul 08:00–17:00 WIB. Minggu dan hari libur nasional tutup. Untuk pertanyaan di luar jam kerja, silakan kirim pesan WhatsApp dan kami akan balas saat jam operasional." },
  { category: "umum", q: "Bagaimana cara menghubungi CV MR Express?", a: "Anda bisa menghubungi kami melalui WhatsApp di nomor 0823-3682-9960, atau datang langsung ke kantor kami di Surabaya." },
  { category: "umum", q: "Apakah CV MR Express melayani pengiriman untuk perusahaan/korporat?", a: "Ya, kami melayani pengiriman baik untuk perorangan maupun perusahaan. Untuk pengiriman korporat dalam jumlah besar, kami menyediakan tarif khusus dan layanan prioritas." },

  // Pengiriman
  { category: "pengiriman", q: "Bagaimana cara mengirim barang melalui CV MR Express?", a: "Cukup hubungi kami via WhatsApp, informasikan detail barang (jenis, berat, tujuan), lalu antar barang ke gudang kami atau gunakan layanan pickup. Kami yang urus sisanya!" },
  { category: "pengiriman", q: "Apakah tersedia layanan pickup / jemput barang?", a: "Ya, kami menyediakan layanan pickup untuk area Surabaya dan sekitarnya. Hubungi kami untuk mengatur jadwal penjemputan barang Anda." },
  { category: "pengiriman", q: "Apa saja jenis barang yang bisa dikirim?", a: "Kami melayani pengiriman berbagai jenis barang seperti elektronik, furniture, spare part motor/mobil, bahan bangunan, pakaian & tekstil, makanan kemasan, peralatan rumah tangga, mesin & alat berat, serta barang dagangan." },
  { category: "pengiriman", q: "Barang apa saja yang tidak boleh dikirim?", a: "Barang yang dilarang antara lain: bahan mudah terbakar, bahan peledak, narkotika dan obat terlarang, senjata api, bahan kimia berbahaya, dan barang ilegal lainnya sesuai peraturan yang berlaku." },
  { category: "pengiriman", q: "Berapa berat minimum dan maksimum pengiriman?", a: "Tidak ada berat minimum untuk pengiriman. Untuk berat maksimum, silakan hubungi kami karena tergantung pada jenis barang dan kapasitas kapal yang tersedia." },
  { category: "pengiriman", q: "Apakah bisa mengirim barang dalam jumlah besar (kontainer)?", a: "Ya, kami melayani pengiriman dalam jumlah besar termasuk pengiriman kontainer. Hubungi kami untuk mendapatkan penawaran khusus untuk pengiriman skala besar." },
  { category: "pengiriman", q: "Bagaimana cara melacak status pengiriman?", a: "Setelah barang dimuat ke kapal, kami akan memberikan nomor resi. Anda bisa menghubungi kami via WhatsApp untuk tracking real-time status pengiriman Anda." },
  { category: "pengiriman", q: "Apakah ada layanan packing/pengemasan?", a: "Ya, kami menyediakan layanan packing untuk memastikan barang Anda aman selama perjalanan. Biaya packing tergantung pada jenis dan ukuran barang." },

  // Tarif & Pembayaran
  { category: "tarif", q: "Bagaimana cara cek tarif pengiriman?", a: "Anda bisa menghubungi kami langsung via WhatsApp untuk mendapatkan estimasi tarif berdasarkan berat, volume, dan tujuan pengiriman. Kami memberikan harga terbaik dan transparan." },
  { category: "tarif", q: "Apa saja metode pembayaran yang diterima?", a: "Kami menerima pembayaran melalui transfer bank (BCA, BRI, Mandiri, BNI), dan tunai di kantor kami. Pembayaran dilakukan sebelum barang dimuat ke kapal." },
  { category: "tarif", q: "Apakah ada biaya tambahan selain tarif pengiriman?", a: "Tarif yang kami berikan sudah termasuk biaya dasar pengiriman. Biaya tambahan mungkin berlaku untuk layanan khusus seperti packing, pickup, atau asuransi tambahan. Kami selalu transparan mengenai biaya." },
  { category: "tarif", q: "Bagaimana perhitungan tarif pengiriman?", a: "Tarif dihitung berdasarkan berat aktual atau berat volume (mana yang lebih besar), jarak tujuan, dan jenis barang. Hubungi kami untuk mendapatkan estimasi tarif yang akurat." },
  { category: "tarif", q: "Apakah ada diskon untuk pengiriman rutin?", a: "Ya, kami menyediakan harga khusus untuk pelanggan yang melakukan pengiriman secara rutin atau dalam jumlah besar. Hubungi kami untuk negosiasi tarif khusus." },

  // Rute & Estimasi
  { category: "rute", q: "Kemana saja area layanan pengiriman?", a: "Kami melayani pengiriman ke seluruh Indonesia Timur termasuk Makassar, Ambon, Sorong, Jayapura, Manokwari, Nabire, Serui, Fak-Fak, Kaimana, Timika, Merauke, Ternate, dan kota lainnya." },
  { category: "rute", q: "Berapa lama estimasi pengiriman ke Makassar?", a: "Estimasi pengiriman dari Surabaya ke Makassar adalah 2–3 hari, tergantung jadwal kapal dan kondisi cuaca." },
  { category: "rute", q: "Berapa lama estimasi pengiriman ke Ambon?", a: "Estimasi pengiriman dari Surabaya ke Ambon adalah sekitar 4 hari melalui Kapal Cepat Pelni." },
  { category: "rute", q: "Berapa lama estimasi pengiriman ke Jayapura?", a: "Estimasi pengiriman dari Surabaya ke Jayapura adalah sekitar 7 hari, menjadikannya salah satu rute terjauh yang kami layani." },
  { category: "rute", q: "Berapa lama estimasi pengiriman ke Sorong?", a: "Estimasi pengiriman dari Surabaya ke Sorong adalah sekitar 5 hari via Kapal Cepat Pelni." },
  { category: "rute", q: "Apakah ada jadwal tetap keberangkatan kapal?", a: "Ya, kapal Pelni memiliki jadwal keberangkatan tetap setiap minggu. Jadwal bisa berubah sewaktu-waktu karena cuaca atau kebijakan Pelni. Hubungi kami untuk informasi jadwal terbaru." },

  // Keamanan
  { category: "keamanan", q: "Apakah barang saya aman selama pengiriman?", a: "Ya, kami menjamin keamanan barang Anda. Setiap barang dikemas dengan baik, diasuransikan, dan dipantau hingga sampai tujuan. Kami bertanggung jawab penuh atas keselamatan kiriman." },
  { category: "keamanan", q: "Apakah ada asuransi pengiriman?", a: "Ya, kami menyediakan asuransi pengiriman untuk memberikan perlindungan ekstra terhadap barang Anda. Untuk barang bernilai tinggi, kami sangat menyarankan menggunakan asuransi." },
  { category: "keamanan", q: "Bagaimana jika barang rusak atau hilang?", a: "Kami bertanggung jawab atas keamanan barang. Jika terjadi kerusakan atau kehilangan, kami akan memproses klaim sesuai kebijakan asuransi. Hubungi kami segera jika terjadi masalah." },
  { category: "keamanan", q: "Bagaimana proses pengemasan untuk barang pecah belah?", a: "Untuk barang pecah belah, kami menggunakan bubble wrap berlapis, styrofoam, dan peti kayu. Barang akan diberi label 'FRAGILE' dan ditangani dengan ekstra hati-hati selama proses bongkar muat." },

  // Kapal Pelni
  { category: "kapal", q: "Apa itu Kapal Cepat Pelni (Kapal Putih)?", a: "Kapal Cepat Pelni atau Kapal Putih adalah kapal penumpang dan barang milik PT Pelni yang beroperasi dengan kecepatan tinggi, menjangkau berbagai pelabuhan di Indonesia Timur dengan waktu tempuh lebih singkat dibanding kapal cargo biasa." },
  { category: "kapal", q: "Apa bedanya Kapal Pelni dengan kapal cargo biasa?", a: "Kapal Pelni (Kapal Putih) memiliki jadwal tetap, kecepatan lebih tinggi, dan keamanan lebih terjamin karena dikelola oleh BUMN. Kapal cargo biasa biasanya lebih lambat tapi bisa menampung muatan lebih besar." },
  { category: "kapal", q: "Apakah kapal Pelni beroperasi setiap hari?", a: "Kapal Pelni beroperasi dengan jadwal tetap, biasanya beberapa kali dalam seminggu untuk rute-rute utama. Jadwal spesifik berbeda untuk setiap rute tujuan." },
  { category: "kapal", q: "Bagaimana jika jadwal kapal berubah atau tertunda?", a: "Jika terjadi perubahan jadwal karena cuaca atau kebijakan Pelni, kami akan segera menginformasikan kepada pelanggan via WhatsApp. Barang Anda akan tetap aman di gudang kami sampai kapal berangkat." },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");

  const filtered = faqs.filter((f) => {
    const matchSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "semua" || f.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categoryCount = (catId: string) =>
    catId === "semua"
      ? faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())).length
      : faqs.filter((f) => f.category === catId && (f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))).length;

  return (
    <div className="pt-24">
      <SectionWrapper>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sm font-semibold text-primary glass-blue rounded-full px-4 py-1.5 mb-4"
          >
            Pusat Bantuan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
          >
            Pertanyaan yang Sering Diajukan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg"
          >
            Temukan jawaban untuk pertanyaan umum seputar layanan pengiriman CV MR Express
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto mb-8 relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow text-sm"
          />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => {
            const count = categoryCount(cat.id);
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "gradient-blue text-primary-foreground shadow-blue"
                    : "glass-white text-muted-foreground hover:text-foreground hover:shadow-md"
                }`}
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-primary-foreground/20" : "bg-muted"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            const catLabel = categories.find((c) => c.id === faq.category)?.label;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
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
                  <div className="flex-1 min-w-0">
                    <span className="font-display font-semibold text-foreground text-sm md:text-base block">
                      {faq.q}
                    </span>
                    {activeCategory === "semua" && (
                      <span className="text-xs text-muted-foreground mt-1 inline-block">{catLabel}</span>
                    )}
                  </div>
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
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">
                Tidak ada hasil ditemukan untuk "<strong>{search}</strong>"
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("semua"); }}
                className="text-primary text-sm mt-2 hover:underline"
              >
                Reset pencarian
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <div className="glass-white rounded-3xl p-8 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Masih ada pertanyaan?</h2>
            <p className="text-muted-foreground mb-6">Tim kami siap membantu Anda melalui WhatsApp</p>
            <a
              href="https://wa.me/6282336829960"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gradient-blue text-primary-foreground px-7 py-3.5 rounded-2xl font-semibold hover-lift shadow-blue-lg text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              Hubungi Kami via WhatsApp
            </a>
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
};

export default FAQPage;