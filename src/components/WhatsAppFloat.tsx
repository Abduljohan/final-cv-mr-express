import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppFloat = () => (
  <motion.a
    href="https://wa.me/6282336829960"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-4 shadow-lg animate-pulse-blue hover-lift"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: "spring", stiffness: 200 }}
    aria-label="Chat WhatsApp"
    style={{ boxShadow: "0 0 20px rgba(37, 211, 102, 0.4)" }}
  >
    <MessageCircle className="h-6 w-6 text-primary-foreground" />
  </motion.a>
);

export default WhatsAppFloat;