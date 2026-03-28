import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SplashScreen from "@/components/SplashScreen";
import BackgroundMusic from "@/components/BackgroundMusic";
import { MusicProvider } from "@/contexts/MusicContext";

import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
import Layanan from "./pages/Layanan";
import Kontak from "./pages/Kontak";
import CaraKirimBarang from "./pages/CaraKirimBarang";
import EstimasiPengiriman from "./pages/EstimasiPengiriman";
import FAQPage from "./pages/FAQPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MusicProvider>
        <Toaster />
        <Sonner />
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tentang" element={<TentangKami />} />
              <Route path="/layanan" element={<Layanan />} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="/cara-kirim-barang-pelni" element={<CaraKirimBarang />} />
              <Route path="/estimasi-pengiriman-surabaya-papua" element={<EstimasiPengiriman />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
          <BackgroundMusic />
        </BrowserRouter>
        </MusicProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
