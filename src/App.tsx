import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle scroll-to-top and page titles
function ScrollToTopAndSetTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set page title based on route
    switch (pathname) {
      case "/":
        document.title = "Kingdom International - Premium Real Estate Investments";
        break;
      case "/properties":
        document.title = "Properties - Kingdom International";
        break;
      case pathname.match(/^\/property\//)?.input || "":
        document.title = "Property Details - Kingdom International";
        break;
      default:
        document.title = "Kingdom International - Premium Real Estate Investments";
    }
  }, [pathname]);

  return null;
}

const App = () => {
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopAndSetTitle />
          <Navbar currency={currency} onCurrencyChange={setCurrency} language={language} onLanguageChange={setLanguage} />
          <Routes>
            <Route path="/" element={<Index currency={currency} language={language} />} />
            <Route path="/properties" element={<Properties currency={currency} />} />
            <Route path="/property/:id" element={<PropertyDetail currency={currency} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer language={language} />
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
