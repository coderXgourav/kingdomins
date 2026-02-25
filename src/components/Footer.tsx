import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import { t } from "@/lib/i18n";

interface FooterProps {
  language?: string;
}

const footerColumns = [
  {
    title: "Buy",
    links: ["Properties for Sale", "Guide to Buying", "Signature Collection", "Mortgages", "Property Management", "Legal Services", "Currency Exchange"],
  },
  {
    title: "Sell",
    links: ["List your Property", "Guide to Selling", "Book a Valuation"],
  },
  {
    title: "Off Plan",
    links: ["New Projects", "Guide to Buying Off Plan", "Best Communities", "Top Developers", "Upcoming Roadshows", "Branded Residences"],
  },
  {
    title: "Rent",
    links: ["Properties to Rent", "Guide to Renting", "Short Term Rentals", "Property Management"],
  },
  {
    title: "Services",
    links: ["Properties for Sale", "Leasing", "Mortgages", "Conveyancing", "Property Management", "Holiday Homes", "Currency Exchange"],
  },
  {
    title: "About",
    links: ["About Us", "Meet The Team", "Our Awards", "Careers", "Philanthropy", "News & Blog"],
  },
];

export default function Footer({ language = "en" }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main columns */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-xs font-bold uppercase tracking-widest text-primary-foreground mb-5">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="/"
                      className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10" />

        {/* Bottom section */}
        <div className="pt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left: logo + socials + legal */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-6">
              <img src="/LOGO.png" alt="Kingdom International" className="h-10 w-auto brightness-0 invert" />
              <div className="flex items-center gap-4 text-primary-foreground/60">
                <a href="#" aria-label="Facebook" className="hover:text-primary-foreground transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" aria-label="Instagram" className="hover:text-primary-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-primary-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" aria-label="YouTube" className="hover:text-primary-foreground transition-colors"><Youtube className="w-5 h-5" /></a>
                <a href="#" aria-label="WhatsApp" className="hover:text-primary-foreground transition-colors"><MessageCircle className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-primary-foreground/40 font-body">
              <Link to="/" className="hover:text-primary-foreground/70 transition-colors">Privacy Policy</Link>
              <span>/</span>
              <Link to="/" className="hover:text-primary-foreground/70 transition-colors">Terms & Conditions</Link>
              <span>/</span>
              <Link to="/" className="hover:text-primary-foreground/70 transition-colors">Sitemap</Link>
            </div>
            <p className="text-xs text-primary-foreground/30 font-body">
              {t("footer.rights", language)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
