import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Ship, MapPin, ArrowRight } from "lucide-react";

const routes = [
  { to: "Ambon", days: 4 },
  { to: "Tual", days: 4 },
  { to: "Ternate", days: 5 },
  { to: "Kaimana", days: 5 },
  { to: "Fak-Fak", days: 6 },
  { to: "Sorong", days: 5 },
  { to: "Manokwari", days: 6 },
  { to: "Nabire", days: 6 },
  { to: "Wasior", days: 6 },
  { to: "Serui", days: 6 },
  { to: "Jayapura", days: 7 },
];

const Routes = () => (
  <SectionWrapper id="rute" className="gradient-light">
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-4"
      >
        <Ship className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-primary">Rute Pengiriman</span>
      </motion.div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
        Dari Surabaya ke <span className="text-gradient-blue">Seluruh Indonesia Timur</span>
      </h2>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Via Kapal Cepat Pelni (Kapal Putih) dengan estimasi pengiriman tercepat.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {routes.map((route, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="glass-white rounded-2xl px-5 py-4 flex items-center justify-between group cursor-default border border-transparent hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.25)] transition-[border,box-shadow] duration-300"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 rounded-xl gradient-blue flex items-center justify-center shrink-0"
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </motion.div>
            <div>
              <div className="text-xs text-muted-foreground">SBY</div>
              <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                <motion.span
                  className="inline-flex"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                >
                  <ArrowRight className="h-3 w-3 text-primary" />
                </motion.span>
                {route.to}
              </div>
            </div>
          </div>
          <motion.div
            className="gradient-blue text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-xl"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {route.days} Hari
          </motion.div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mt-10"
    >
      <a
        href="https://wa.me/6282336829960?text=Halo%20MrExpres%2C%20saya%20ingin%20tanya%20rute%20pengiriman"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 gradient-blue text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover-lift shadow-blue-lg"
      >
        Tanya Rute Lainnya
        <ArrowRight className="h-5 w-5" />
      </a>
    </motion.div>
  </SectionWrapper>
);

export default Routes;
