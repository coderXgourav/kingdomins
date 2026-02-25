import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Search, MapPin, Heart, Phone, Globe } from "lucide-react";

const menuItems = ["Buy", "Rent", "Projects", "Developers", "Areas", "Services", "Blogs", "More"];
const currencyOptions = ["USD", "GBP", "AED", "SAR"];
const languageOptions = [
  { label: "English", code: "en", flag: "🇬🇧" },
  { label: "العربية", code: "ar", flag: "🇦🇪" },
  { label: "Türkçe", code: "tr", flag: "🇹🇷" },
  { label: "Français", code: "fr", flag: "🇫🇷" },
  { label: "中文", code: "zh", flag: "🇨🇳" },
];

interface NavbarProps {
  currency: string;
  onCurrencyChange: (c: string) => void;
  language: string;
  onLanguageChange: (l: string) => void;
}

export default function Navbar({ currency, onCurrencyChange, language, onLanguageChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const currentLang = languageOptions.find((l) => l.code === language) || languageOptions[0];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-background/50 border-b border-border" : "bg-background/90 backdrop-blur-sm border-b border-border/50"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img src="/LOGO.png" alt="Kingdom International" className="h-14 sm:h-16 w-auto" />
            </Link>

            {/* Center menu - desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  to={item === "Buy" || item === "Rent" ? "/properties" : "/"}
                  className="nav-link-underline px-5 py-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors font-body font-medium"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-foreground"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border">
            <div className="px-6 py-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  to={item === "Buy" || item === "Rent" ? "/properties" : "/"}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-body py-2"
                >
                  {item}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex gap-4">
                <select
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  className="bg-secondary text-foreground text-xs font-body px-3 py-2 rounded-lg border border-border"
                >
                  {currencyOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="bg-secondary text-foreground text-xs font-body px-3 py-2 rounded-lg border border-border"
                >
                  {languageOptions.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
                </select>
              </div>
              <div className="pt-4">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-5 py-3 rounded-lg bg-primary text-primary-foreground text-xs tracking-wider uppercase font-body font-semibold"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around h-16">
          <Link to="/properties" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-body">Search</span>
          </Link>
          <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-body">Map</span>
          </Link>
          <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-body">Favorites</span>
          </Link>
          <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-5 h-5" />
            <span className="text-[10px] font-body">Contact</span>
          </Link>
        </div>
      </div>
    </>
  );
}
