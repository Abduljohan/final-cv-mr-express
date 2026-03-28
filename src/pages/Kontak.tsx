import SectionWrapper from "@/components/SectionWrapper";
import { Phone, Mail, MapPin, Clock, Send, Anchor } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Kontak = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", pesan: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Halo MR Express, saya ${formData.nama}. ${formData.pesan}`);
    window.open(`https://wa.me/6282336829960?text=${msg}`, "_blank");
  };

  return (
    <div className="pt-24">
      <SectionWrapper>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-4"
          >
            <Anchor className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Kontak</span>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Hubungi <span className="text-gradient-blue">Kami</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Punya pertanyaan atau ingin konsultasi pengiriman? Jangan ragu menghubungi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            {[
              { icon: Phone, label: "Telepon / WhatsApp", value: "0823 3682 9960" },
              { icon: Mail, label: "Email", value: "info@mrexpres.com" },
              { icon: MapPin, label: "Alamat", value: "Surabaya, Jawa Timur, Indonesia" },
              { icon: Clock, label: "Jam Operasional", value: "Senin - Sabtu, 08:00 - 17:00 WIB" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 glass-white rounded-2xl p-5 hover-lift"
              >
                <div className="w-11 h-11 rounded-xl gradient-blue flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{item.label}</div>
                  <div className="text-muted-foreground text-sm">{item.value}</div>
                </div>
              </motion.div>
            ))}

            <div className="rounded-3xl overflow-hidden h-64 shadow-blue">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0!2d112.7!3d-7.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTgnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi CV MR Express"
              />
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-white rounded-3xl p-8 space-y-5 h-fit"
          >
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Kirim Pesan</h3>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Masukkan email Anda"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Pesan</label>
              <textarea
                required
                rows={5}
                value={formData.pesan}
                onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                placeholder="Tulis pesan Anda..."
              />
            </div>
            <button
              type="submit"
              className="w-full gradient-blue text-primary-foreground py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover-lift shadow-blue"
            >
              <Send className="h-4 w-4" />
              Kirim via WhatsApp
            </button>
          </motion.form>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Kontak;
