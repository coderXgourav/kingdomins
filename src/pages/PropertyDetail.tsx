import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ChevronRight, MapPin, Bed, Bath, Maximize, TrendingUp, Heart, Share2, Flag, Phone, Star, Home, Building, Send, Download, MessageCircle } from "lucide-react";
import { properties, formatPrice } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import heroVideo from "@/assets/luxury-showcase.mp4";
import apartment360 from "@/assets/apartment-360.mp4";

interface PropertyDetailPageProps {
  currency: string;
}

export default function PropertyDetailPage({ currency }: PropertyDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  const propertyIndex = properties.findIndex((p) => p.id === id);
  const nextProperty = properties[propertyIndex + 1] || properties[0];
  const [mainImage, setMainImage] = useState(0);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", message: "" });

  const bannerVideo = property && parseInt(property.id) % 2 === 0 ? apartment360 : heroVideo;

  const allImages = property
    ? [...property.images, ...properties.filter((p) => p.id !== property.id).flatMap((p) => [p.image]).slice(0, 3)]
    : [];

  if (!property) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <p className="font-body text-muted-foreground">Property not found.</p>
        <Link to="/properties" className="text-primary font-body text-sm mt-4 inline-block">← Back to listings</Link>
      </div>
    );
  }

  const similar = properties.filter((p) => p.id !== property.id && p.city === property.city).slice(0, 3);
  if (similar.length === 0) similar.push(...properties.filter((p) => p.id !== property.id).slice(0, 3));

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our team will contact you shortly.");
    setLeadForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation bar */}
      <div className="pt-20 border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/properties")} className="flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> BACK TO SEARCH
          </button>
          <Link to={`/property/${nextProperty.id}`} className="flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
            NEXT PROPERTY <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* IMAGE GRID — matching reference layout */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-auto lg:h-[500px]">
          {/* Large main image / video */}
          <div className="lg:col-span-1 lg:row-span-2 rounded-xl overflow-hidden relative group h-64 lg:h-full">
            <video
              src={bannerVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          {/* 4 grid images */}
          {allImages.slice(0, 4).map((img, idx) => (
            <div
              key={idx}
              className={`rounded-xl overflow-hidden cursor-pointer group relative h-40 lg:h-auto ${idx === 3 ? "" : ""}`}
              onClick={() => setMainImage(idx)}
            >
              <img
                src={img}
                alt={`View ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {idx === 3 && (
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <span className="px-2 py-1 rounded bg-foreground/70 text-primary-foreground text-xs font-body backdrop-blur-sm">
                    1/{allImages.length}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Property ID row */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-4">
        <p className="text-xs font-body text-muted-foreground">
          Property-ID {property.id.padStart(6, "0")} | {property.city}
        </p>
      </div>

      {/* Price + Actions + Agency row */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Price + Location */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <h1 className="font-display text-3xl sm:text-4xl text-foreground">
                {formatPrice(property.price, currency)}
              </h1>
              {property.status === "off-plan" && (
                <span className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-[10px] uppercase tracking-wider font-body font-semibold">
                  Off-Plan
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 mb-4">
              <button className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                <Heart className="w-4 h-4" /> Wishlist
              </button>
              <button className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                <Flag className="w-4 h-4" /> Report
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-body text-sm text-foreground">{property.location}</p>
                <p className="font-body text-xs text-muted-foreground">{property.city}</p>
              </div>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{property.type}</p>
                  <p className="text-[10px] text-muted-foreground font-body">Property type</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{property.bedrooms + property.bathrooms}</p>
                  <p className="text-[10px] text-muted-foreground font-body">Rooms</p>
                </div>
              </div>
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
                  <p className="text-[10px] text-muted-foreground font-body">Property area</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{property.roi}%</p>
                  <p className="text-[10px] text-muted-foreground font-body">Expected ROI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Agency card */}
          <div className="border border-border rounded-xl p-5 h-fit">
            <div className="flex items-center gap-3 mb-3">
              <img src="/LOGO.png" alt="Kingdom International" className="w-12 h-12 rounded-lg object-contain bg-background border border-border p-1" />
              <div>
                <p className="font-display text-sm font-semibold text-foreground">Kingdom International</p>
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Agency Profile ›</p>
              </div>
            </div>
            <p className="text-xs font-body text-muted-foreground mb-2">Premium Real Estate Advisory</p>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
              ))}
              <span className="text-xs font-body text-muted-foreground ml-1">126 Reviews</span>
            </div>
            <a
              href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 rounded-lg border border-border text-foreground text-xs uppercase tracking-wider font-body font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              CALL +971 4 123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Description + Features */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-display text-xl text-foreground mb-3">About This Property</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{property.description}</p>
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground mb-3">Features & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((f) => (
                  <span key={f} className="px-4 py-2 rounded-full border border-border text-xs font-body text-muted-foreground">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            {property.developer && (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
                <Building className="w-5 h-5 text-primary" />
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
          </div>

          {/* LEAD FORM — sticky sidebar */}
          <div className="space-y-6">
            <div className="border border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-display text-lg text-foreground mb-1">Interested in this property?</h3>
              <p className="text-xs font-body text-muted-foreground mb-5">Fill the form & our agent will contact you within 24 hours.</p>
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                />
                <textarea
                  placeholder="I'm interested in this property..."
                  rows={3}
                  value={leadForm.message}
                  onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-lg bg-primary text-primary-foreground text-xs tracking-wider uppercase font-body font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Enquiry
                </button>
              </form>

              <div className="flex gap-2 mt-4">
                <a
                  href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border text-foreground text-[10px] uppercase tracking-wider font-body font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <button className="flex-1 px-4 py-2.5 rounded-lg border border-border text-foreground text-[10px] uppercase tracking-wider font-body font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEAD MAGNET BANNER */}
      <section className="bg-primary/5 border-y border-primary/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-wider font-body text-primary font-semibold mb-2">Free Investment Guide</p>
            <h3 className="font-display text-2xl text-foreground mb-2">
              Get Our Exclusive Property Investment Report
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
              Discover top-performing markets, ROI projections, and expert insights for {property.city} real estate. Download our complimentary report now.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 max-w-xs px-4 py-3 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
              />
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground text-xs uppercase tracking-wider font-body font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
          <div className="w-48 h-48 rounded-xl bg-primary/10 flex items-center justify-center">
            <div className="text-center">
              <Download className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-xs font-body text-muted-foreground">PDF Report</p>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
          <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-8">
            Similar <span className="italic text-gradient-steel">Properties</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} currency={currency} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
