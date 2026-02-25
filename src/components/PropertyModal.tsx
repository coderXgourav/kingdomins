import { useState } from "react";
import { createPortal } from "react-dom";
import { X, MapPin, Bed, Bath, Maximize, TrendingUp, Heart, Share2, Phone, Star, Building, Send, Download, MessageCircle, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { Link } from "react-router-dom";

interface PropertyModalProps {
  property: Property | null;
  currency: string;
  onClose: () => void;
}

export default function PropertyModal({ property, currency, onClose }: PropertyModalProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", message: "" });

  if (!property) return null;

  const images = property.images.length > 0 ? property.images : [property.image];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our team will contact you shortly.");
    setLeadForm({ name: "", email: "", phone: "", message: "" });
  };

  const prevImg = () => setActiveImg((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImg = () => setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1));

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-background border border-border rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-background/90 border border-border text-muted-foreground hover:text-foreground transition-colors backdrop-blur-sm shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-[16/9] sm:aspect-[16/8] overflow-hidden rounded-t-3xl sm:rounded-t-2xl flex-shrink-0">
          <img
            src={images[activeImg]}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-body font-semibold backdrop-blur-sm">
              {property.city}
            </span>
            {property.status === "off-plan" && (
              <span className="px-3 py-1 rounded-full bg-kingdom-gold/90 text-background text-[10px] uppercase tracking-wider font-body font-semibold backdrop-blur-sm">
                Off-Plan
              </span>
            )}
          </div>

          {/* ROI badge */}
          <div className="absolute top-4 right-12">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-[10px] font-body font-semibold text-primary">
              <TrendingUp className="w-3 h-3" />
              {property.roi}% ROI
            </div>
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/70 backdrop-blur-sm text-foreground hover:bg-background transition-colors shadow"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/70 backdrop-blur-sm text-foreground hover:bg-background transition-colors shadow"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Image dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImg ? "bg-primary-foreground w-4" : "bg-primary-foreground/50"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Left: Details */}
          <div className="sm:col-span-2 space-y-5">
            {/* Title + price */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="font-display text-2xl sm:text-3xl text-foreground leading-tight">{property.title}</h2>
                <div className="font-display text-xl sm:text-2xl text-foreground font-semibold whitespace-nowrap">
                  {formatPrice(property.price, currency)}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-sm font-body">{property.location}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-foreground transition-colors">
                <Heart className="w-4 h-4" /> Wishlist
              </button>
              <button className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border">
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{property.bedrooms}</p>
                  <p className="text-[10px] text-muted-foreground font-body">Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{property.bathrooms}</p>
                  <p className="text-[10px] text-muted-foreground font-body">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{property.area.toLocaleString()} sqft</p>
                  <p className="text-[10px] text-muted-foreground font-body">Area</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-body text-sm font-semibold text-accent">{property.roi}%</p>
                  <p className="text-[10px] text-muted-foreground font-body">ROI</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-display text-base text-foreground mb-2">About This Property</h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-display text-base text-foreground mb-3">Features & Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {property.features.map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-full border border-border text-xs font-body text-muted-foreground">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Developer row */}
            {property.developer && (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
                <Building className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Developer</p>
                  <p className="font-body text-sm font-semibold text-foreground">{property.developer}</p>
                </div>
                {property.completionDate && (
                  <div className="ml-auto text-right">
                    <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Completion</p>
                    <p className="font-body text-sm font-semibold text-foreground">{property.completionDate}</p>
                  </div>
                )}
              </div>
            )}

            {/* View full page link */}
            <Link
              to={`/property/${property.id}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-body font-semibold text-primary hover:underline"
            >
              View Full Property Page <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right: Contact form + agency */}
          <div className="space-y-4">
            {/* Agency card */}
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src="/LOGO.png" alt="Kingdom International" className="w-10 h-10 rounded-lg object-contain bg-background border border-border p-1" />
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">Kingdom International</p>
                  <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Premium Agency</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                ))}
                <span className="text-xs font-body text-muted-foreground ml-1">126 Reviews</span>
              </div>
              <a
                href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-foreground text-xs uppercase tracking-wider font-body font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                CALL AGENT
              </a>
            </div>

            {/* Lead form */}
            <div className="border border-border rounded-xl p-4">
              <h4 className="font-display text-base text-foreground mb-1">Enquire Now</h4>
              <p className="text-[10px] font-body text-muted-foreground mb-4">Get a callback within 24 hours.</p>
              <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                />
                <textarea
                  placeholder="I'm interested in this property..."
                  rows={3}
                  value={leadForm.message}
                  onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground text-xs tracking-wider uppercase font-body font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Enquiry
                </button>
              </form>
              <div className="flex gap-2 mt-3">
                <a
                  href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2 rounded-lg border border-border text-foreground text-[10px] uppercase tracking-wider font-body font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </a>
                <button className="flex-1 px-3 py-2 rounded-lg border border-border text-foreground text-[10px] uppercase tracking-wider font-body font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-1.5">
                  <Download className="w-3 h-3" /> Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  , document.body);
}
