import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-mrexpress.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const OperatingStatus = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isOpen = day >= 1 && day <= 6 && hour >= 8 && hour < 17;
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
      <span className="text-sm">{isOpen ? "Buka Sekarang" : "Tutup"}</span>
    </div>
  );
};

const Footer = () => (
  <footer className="gradient-blue-deep text-primary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <img src={logoImg} alt="CV MR Express" className="h-12 w-auto object-contain brightness-0 invert" />
          </div>
          <p className="text-sm text-primary-foreground/60 leading-relaxed">
            Layanan pengiriman barang terpercaya via kapal cepat Pelni ke seluruh Indonesia Timur.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              {
                name: "Facebook",
                href: "https://www.facebook.com/cvmrexpress7",
                icon: <Facebook className="h-5 w-5" />,
                color: "#1877F2",
              },
              {
                name: "Instagram",
                href: "https://www.instagram.com/cvmrexpress7",
                icon: <Instagram className="h-5 w-5" />,
                color: "#E1306C",
                gradient: "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)",
              },
              {
                name: "TikTok",
                href: "https://www.tiktok.com/@cvmrexpress7",
                icon: (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.86a8.28 8.28 0 0 0 4.76 1.49v-3.4a4.85 4.85 0 0 1-1-.26Z" />
                  </svg>
                ),
                color: "#00f2ea",
              },
            ].map((s, i) => (
              <Tooltip key={s.name}>
                <TooltipTrigger asChild>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                    aria-label={s.name}
                    style={{
                      color: s.color,
                      animationDelay: `${i * 100}ms`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = s.gradient || s.color;
                      el.style.color = "#fff";
                      el.style.boxShadow = `0 0 20px ${s.color}66`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "hsl(0 0% 100% / 0.1)";
                      el.style.color = s.color;
                      el.style.boxShadow = "none";
                    }}
                  >
                    {s.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent><p>{s.name}</p></TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Navigasi</h4>
          <div className="flex flex-col gap-2.5">
            {[
              { to: "/", label: "Beranda" },
              { to: "/tentang", label: "Tentang Kami" },
              { to: "/layanan", label: "Layanan" },
              { to: "/kontak", label: "Kontak" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <h4 className="font-display font-semibold mb-3 mt-6">Artikel</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/cara-kirim-barang-pelni" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Cara Kirim Barang via Pelni
            </Link>
            <Link to="/estimasi-pengiriman-surabaya-papua" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Estimasi Pengiriman ke Papua
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Kontak</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Surabaya, Jawa Timur</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span>0823 3682 9960</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span>info@mrexpres.com</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Jam Operasional</h4>
          <div className="text-sm text-primary-foreground/60 space-y-2">
            <div className="flex justify-between"><span>Senin - Sabtu</span><span>08:00 - 17:00</span></div>
            <div className="flex justify-between"><span>Minggu</span><span>Tutup</span></div>
            <div className="mt-3"><OperatingStatus /></div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-primary-foreground/40">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Waktu Indonesia Barat</span>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-sm text-primary-foreground/40 space-y-1">
        <p>&copy; {new Date().getFullYear()} CV MR Express. Semua hak dilindungi.</p>
        <p>
          Developed by{" "}
          <a
            href="https://tretandevelopment.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/60 hover:text-primary-foreground transition-colors underline underline-offset-2"
          >
            Tretan Development
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;